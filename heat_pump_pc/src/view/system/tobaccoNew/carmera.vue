<template>
  <div class="body">
    <div class="body-top">
      <Button @click="add" type="text" style="color:#82C225;">
        <Icon type="plus-circled" size="26" color="#82C225" style="margin-right: 5px"></Icon>
        <span style="margin-right: 20px;font-size: 20px;color: #82C225">新增摄像头</span>
      </Button>
      <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px; height: 30px;float: right;margin-right: 20px">返回</Button>
    </div>
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20" style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">摄像头列表</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Table border size="small" :columns="columns1" :data="dataTable" ></Table>
    </div>
    <Modal v-model="review" width="580">
      <p slot="header" style="color:#666">新增摄像头</p>
      <div style="text-align:center;padding: 10px 30px">
        <Form :model="reviewForm" :label-width="130">
          <Row type="flex">
            <FormItem label="名称" class="selfClass">
              <Input v-model="reviewForm.name" style="width: 200px;float: left"></Input>
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="序列号"  class="selfClass">
              <Input v-model="reviewForm.deviceSerial" style="width: 200px;float: left"></Input>
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="验证码"  class="selfClass">
              <Input v-model="reviewForm.validateCode" style="width: 200px;float: left" @on-change="touppercase(reviewForm.validateCode)"></Input>
              <div v-if="userNotice" style="color: #ed3f14">验证码必须是六位大写字母</div>
            </FormItem>
          </Row>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button @click="save" style="background: #3392F0;color: #fff;width: 100px;height: 30px">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getCarmera, deleCarmera, addCarmera } from '../../../api/api'
export default {
  data () {
    return {
      userNotice: false,
      houseId: '',
      reviewForm: {
        name: '',
        houseId: '',
        deviceSerial: '',
        validateCode: ''
      },
      review: false,
      columns1: [
        {
          title: '编号',
          key: 'id',
          // width: 80,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '序列号',
          key: 'deviceSerial',
          align: 'center'
        },
        {
          title: '验证码',
          key: 'validateCode',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#82C225'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      dataTable: []
    }
  },
  created: function () {
    this.houseId = this.$route.params.id
    let par = {
      houseId: this.$route.params.id
    }
    this.getTableDatas(par)
  },
  methods: {
    touppercase (string) {
      if (string !== '' && string !== undefined) {
        var validataPrice = /^[A-Z]*$/
        if (!validataPrice.test(string.trim())) {
          this.userNotice = true
        } else {
          if (string.trim().length !== 6) {
            this.userNotice = true
          } else {
            this.userNotice = false
          }
        }
      }
    },
    validateForm (date) {
      if (date.name.length > 0 || date.name !== '') {
        if (date.deviceSerial !== '') {
          if (date.validateCode !== '') {
            if (date.validateCode.length === 6 && this.userNotice === false) {
              return true
            } else {
              this.$Message.error('验证码必须是六位大写字母')
              return false
            }
          } else {
            this.$Message.error('验证码不能为空')
            return false
          }
        } else {
          this.$Message.error('序列号不能为空')
          return false
        }
      } else {
        this.$Message.error('名称不能为空')
        return false
      }
    },
    save () {
      this.reviewForm.name = this.reviewForm.name.trim()
      this.reviewForm.deviceSerial = this.reviewForm.deviceSerial.trim()
      this.reviewForm.validateCode = this.reviewForm.validateCode.trim()
      this.reviewForm.houseId = this.houseId
      if (this.validateForm(this.reviewForm)) {
        addCarmera(this.reviewForm).then((res) => {
          if (res.data.code === 1000) {
            this.review = false
            let par = {
              houseId: this.houseId
            }
            this.getTableDatas(par)
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    back () {
      this.$router.push({name: 'tobacco_manage', params: {param: this.$route.params.param}})
    },
    // 新增
    add () {
      this.reviewForm.name = ''
      this.reviewForm.deviceSerial = ''
      this.reviewForm.validateCode = ''
      this.reviewForm.houseId = this.houseId
      this.review = true
    },
    remove (id) {
      // console.log(id)
      var th = this
      th.$Modal.confirm({
        title: '删除摄像头信息',
        content: `确定删除摄像头？`,
        onOk: function () {
          let par = {
            id: id
          }
          deleCarmera(par).then((res) => {
            if (res.data.code === 1000) {
              let par = {
                houseId: th.$route.params.id
              }
              th.getTableDatas(par)
              th.$Message.success('摄像头删除成功！')
            } else {
              th.$Message.error(res.data.message)
            }
          })
        },
        onCancel: function () {
          th.$Message.success('取消删除操作成功！')
        }
      })
    },
    // 查询公用方法
    getTableDatas: function (para) {
      let vm = this
      vm.$Loading.start()
      getCarmera(para).then((res) => {
        vm.$Loading.finish()
        if (res.data.code === 1000) {
          vm.dataTable = res.data.content
        } else {
          vm.dataTable = []
        }
      })
    }
  }
}
</script>
<style scoped>
  .body{
    min-width: 600px;
  }
  .body-top{
    height: 70px;
    padding: 15px 10px 20px 20px;
    background: #fff;
    border-bottom: 10px solid rgba(130,194,37,0.2);
  }
  .head{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    padding: 10px;
    background: #F8F8F9;
    border: 1px solid #dcdcdc;
    border-bottom: 0px;
    font-size: 14pt;
  }
  .select {
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px;
    background: #fff;
    font-size: 14pt;
    border: 1px solid #dcdcdc;
    border-top: 0px;
    border-bottom: 0px;
  }
  .ivu-btn{
    padding: 0px;
  }
  .head-title{
    float:left;
    padding:5px 12px;
  }
  .content{
    margin-left: 20px;
    margin-right: 20px;
  }
  .ivu-input{
    position:relative !important;
  }
</style>
