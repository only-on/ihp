<template>
  <div class="body">
    <div class="body-top">
      <div class="head">
        <Row>
          <div class="head-title">
            <Icon type="android-apps" size="20" style="margin-right: 10px;" color="#666666"></Icon>
            <span style="margin-right: 20px;font-size: 16px;color: #666666">烤房群信息</span>
          </div>
          <Button  @click="back" style="background-color: #82C225;color:#fff;width: 100px;height: 30px;float: right">返回</Button>
        </Row>
      </div>
      <div class="farm">
        <Form :model="reviewForm" :label-width="150"  >
          <Row type="flex" justify="center">
            <Col span="12">
            <!--编号手动输入-->
            <FormItem label="烤房群名称" >{{reviewForm.name}}
            </FormItem>
            </Col>
            <Col span="12">
            <!--编号手动输入-->
            <FormItem label="网关编号" >{{reviewForm.gatewayId}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="12">
            <!--编号手动输入-->
            <FormItem label="烤房群地址" >{{reviewForm.regionAddress + reviewForm.addressDetail}}
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="经纬度" >{{reviewForm.addressY}}，{{reviewForm.addressX}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="12">
            <FormItem label="管理员" >
              <div v-for="(item, index) in reviewForm.roleList" :key="index">
                <Row type="flex" justify="center" v-show="item.type === 1">
                  <Col span="12" >
                  <!--编号手动输入-->
                  <FormItem label="" >{{item.name}}
                  </FormItem>
                  </Col>
                  <Col span="12" pull="10">
                  <FormItem label="手机号码" >{{item.tel}}
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="负责人" >
              <div v-for="(item, index) in reviewForm.roleList" :key="index">
                <Row type="flex" justify="center" v-show="item.type === 2">
                  <Col span="12">
                  <!--编号手动输入-->
                  <FormItem label="" >{{item.name}}
                  </FormItem>
                  </Col>
                  <Col span="12" pull="10">
                  <FormItem label="手机号码" >{{item.tel}}
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="用户信息" >
              <div v-for="(item, index) in reviewForm.userList" :key="index">
                <Row type="flex" justify="center" >
                  <Col span="8" >
                  <!--编号手动输入-->
                  <FormItem label="用户姓名" >{{item.realName}}
                  </FormItem>
                  </Col>
                  <Col span="8" >
                  <FormItem label="手机号码" >{{item.tel}}
                  </FormItem>
                  </Col>
                  <Col span="8" >
                  <FormItem label="地址" >{{item.regionAddress + item.addressDetail}}
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="body-top-head">
      <Button type="text" @click="add">
        <Icon type="plus-circled" size="26" color="#82C225" style="margin-right: 5px"></Icon>
        <span style="font-size: 20px;color: #82C225">新增烤房</span>
      </Button>
      <Input  v-model="param.keyword" icon="close-circled" @on-click="backKeyword"   placeholder="输入烤房名称/烤房编号搜索" style="width: 300px; float: right;margin-right: 20px" @on-change="keywordChange()"></Input>
    </div>
    <div class="content">
      <Table border size="small" :columns="columns1" :data="dataTable" ref="selection" @on-selection-change="select"></Table>
      <div class="pages-block">
        <div class="pages-right">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator ></Page>
        </div>
      </div>
    </div>
    <Modal
      v-model="modaladd"
      title="创建烤房信息"
      :mask-closable="false"
      ok-text="提交"
      @on-ok="okAdd"
      @on-cancel="cancel">
      <Form :model="addModel" :label-width="150" ref="addModel" :rules="ruleValidate">
        <Row type="flex" justify="center">
          <Col span="24">
          <!--编号手动输入-->
          <FormItem label="烤房编号" prop="number">
            <Input  v-model="addModel.number"   placeholder="烤烟房编号 " style="width:200px" @on-blur="checkId(addModel.number)"></Input>
            <span v-if = "idNotice" class="tip"> 请输入小于247的正整数</span>
            <!--<InputNumber :max="200" :min="1" v-model="addModel.number"   placeholder="烤烟房编号 " style="width:200px" "></InputNumber>-->
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="烤房名称" prop="name">
            <Input  v-model="addModel.name"   placeholder="烤烟房名称 " style="width:200px" @on-blur="checkName(addModel.name)"></Input>
            <span v-if = "nameNotice" class="tip"> 名称不超过6个字符</span>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <Modal
      v-model="modaledit"
      title="编辑烤房信息"
      :mask-closable="false"
      ok-text="提交"
      @on-ok="okEdit"
      @on-cancel="cancel">
      <Form :model="updateModel" :label-width="150"  >
        <Row type="flex" justify="center">
          <Col span="24">
          <!--编号手动输入-->
          <FormItem label="烤房编号" >
            <Input  v-model="updateModel.number"   placeholder="烤烟房编号 " style="width:200px" @on-blur="updateId(updateModel.number)"></Input>
            <span v-if = "idNotice" class="tip"> 请输入小于247的正整数</span>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="烤房名称" >
            <Input  v-model="updateModel.name"   placeholder="烤烟房名称 " style="width:200px" @on-blur="updateName(updateModel.name)"></Input>
            <span v-if = "nameNotice" class="tip"> 名称不超过6个字符</span>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getToboccoDetail, getTobocco, delToboccoDetail, addToboccoHouse, updataToboccoHouse } from '../../../api/api'
export default {
  data () {
    return {
      reviewForm: {},
      addModel: {
        houseGroupId: '',
        number: '',
        name: ''
      },
      updateModel: {
        houseGroupId: '',
        number: '',
        id: '',
        name: ''
      },
      idNotice: false,
      nameNotice: false,
      nameLen: false,
      modaladd: false,
      modaledit: false,
      tabTop: '',
      size: [10, 20, 30, 40, 50],
      selectDate: [],
      total: 0,
      page: 1,
      rows: 10,
      param: {
        houseGroupId: '',
        pageNum: 1,
        pageSize: 100,
        keyword: ''
      },
      columns1: [
        {
          title: '烤房ID',
          key: 'id',
          align: 'center'
        },
        {
          title: '烤房编号',
          key: 'number',
          align: 'center'
        },
        {
          title: '烤房名称',
          key: 'name',
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
                  color: '#82C225',
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.edit(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text'
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
      dataTable: [],
      ruleValidate: {
        name: [
          {required: true, message: '烤房名称不能为空', trigger: 'blur'}
        ],
        number: [
          {required: true, message: '烤房编号不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created: function () {
    this.getToboccoDetail()
    this.addModel.houseGroupId = this.$route.params.id
    this.updateModel.houseGroupId = this.$route.params.id
  },
  methods: {
    back () {
      this.$router.push({name: 'tobaccoGroup_manage', params: {param: this.$route.params.param}})
    },
    getToboccoDetail () {
      let p = {
        id: this.$route.params.id
      }
      getToboccoDetail(p).then((res) => {
        if (res.data.code === 1000) {
          this.reviewForm.name = res.data.content.name
          this.reviewForm.gatewayId = res.data.content.gatewayId
          this.reviewForm.regionAddress = res.data.content.regionAddress
          this.reviewForm.addressDetail = res.data.content.addressDetail
          this.reviewForm.addressX = res.data.content.addressX
          this.reviewForm.addressY = res.data.content.addressY
          this.dataTable = res.data.content.houseList
          this.reviewForm.roleList = res.data.content.roleList
          this.reviewForm.userList = res.data.content.userList
          this.param.houseGroupId = this.$route.params.id
          this.getTableDatas(this.param)
        }
      })
    },
    backKeyword () {
      this.param.keyword = ''
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    keywordChange () {
      this.param.keyword = this.param.keyword.trim()
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    // 新增
    add () {
      this.modaladd = true
      this.idNotice = false
      this.nameNotice = false
      this.addModel.name = ''
      this.addModel.number = ''
    },
    // 校验烤烟房编号
    checkId (id) {
      var validate = /^[0-9]*[1-9][0-9]*$/
      if (id !== '' && id !== undefined) {
        if (validate.test(id)) {
          if (id > 247) {
            this.idNotice = true
          } else {
            this.idNotice = false
          }
        } else {
          this.idNotice = true
        }
      } else {
        this.idNotice = true
      }
    },
    // 校验烤烟房名称
    checkName (name) {
      if (name !== '' && name !== undefined) {
        if (name.trim().length === 0 || name.trim().length > 5) {
          this.nameNotice = true
          if (name.trim().length > 30) {
            this.nameLen = true
          }
        } else {
          this.nameNotice = false
        }
      } else {
        this.nameNotice = true
      }
    },
    cancel () {},
    okAdd () {
      this.$refs['addModel'].validate((valid) => {
        if (valid) {
          if (!this.idNotice) {
            if (this.addModel.name.trim().length !== 0) {
              if (!this.nameLen) {
                addToboccoHouse(this.addModel).then((res) => {
                  if (res.data.code === 1000) {
                    this.getTableDatas(this.param)
                    this.$Message.success('烤烟房创建成功！')
                  } else {
                    this.$Message.error(res.data.message)
                  }
                })
              } else {
                this.nameLen = true
                this.$Message.error('烤烟房名称不能超过30个字符！')
              }
            } else {
              this.$Message.error('烤烟房名称为空！')
            }
          } else {
            this.$Message.error('请输入小于247的正整数！')
          }
        } else {
          this.$Message.error('信息验证失败!')
        }
      })
    },
    // 校验烤烟房编号
    updateId (id) {
      var validate = /^[0-9]*[1-9][0-9]*$/
      if (id !== '' && id !== undefined) {
        if (validate.test(id)) {
          if (id > 247) {
            this.idNotice = true
          } else {
            this.idNotice = false
          }
        } else {
          this.idNotice = true
        }
      } else {
        this.idNotice = true
      }
    },
    // 校验烤烟房名称
    updateName (name) {
      if (name !== '' && name !== undefined) {
        if (name.trim().length === 0 || name.trim().length > 5) {
          this.nameNotice = true
        } else {
          this.nameNotice = false
        }
      } else {
        this.nameNotice = true
      }
    },
    okEdit () {
      if (!this.idNotice) {
        if (this.updateModel.name.trim().length !== 0) {
          if (!this.nameLen) {
            updataToboccoHouse(this.updateModel).then((res) => {
              if (res.data.code === 1000) {
                this.getTableDatas(this.param)
                this.$Message.success('烤烟房修改成功！')
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            this.$Message.error('烤烟房名称不能超过30个字符！')
          }
        } else {
          this.$Message.error('烤烟房名称为空！')
        }
      } else {
        this.$Message.error('请输入小于247的正整数！')
      }
    },
    // 编辑
    edit (index) {
      this.modaledit = true
      this.idNotice = false
      this.nameNotice = false
      this.updateModel.name = index.name
      this.updateModel.id = index.id
      this.updateModel.number = index.number
    },
    select (selection) {
      for (var i = 0; i < selection.length; i++) {
        this.selectDate[i] = selection[i].actId
      }
    },
    remove (id) {
      // console.log(id)
      var th = this
      th.$Modal.confirm({
        title: '删除烤烟群信息',
        content: `确定删除烤房？`,
        onOk: function () {
          let par = {
            id: id
          }
          delToboccoDetail(par).then((res) => {
            if (res.data.code === 1000) {
              if (th.param.pageNum > 1 && th.dataTable.length === 1) {
                th.param.pageNum = th.param.pageNum - 1
              }
              th.getTableDatas(th.param)
              th.$Message.success('烤烟房删除成功！')
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
    getTableDatas: function (param) {
      let vm = this
      vm.$Loading.start()
      getTobocco(param).then((res) => {
        vm.$Loading.finish()
        if (res.data.code !== 1000) {
          vm.dataTable = []
          vm.total = 0
        } else if (res.data.code === 1000) {
          // console.log(res.data)
          vm.dataTable = res.data.content.list
          vm.total = res.data.content.total
          vm.$refs.tablePage.currentPage = vm.page
        }
      })
    },
    // 点击分页页码
    change (page) {
      this.page = page
      this.param.pageNum = this.page
      this.getTableDatas(this.param)
    },
    // 改变当前显示的行数
    doPageSizeChange: function (size) {
      this.rows = size
      this.param.pageSize = this.rows
      this.getTableDatas(this.param)
    }
  }
}
</script>
<style scoped>
  .body{
    overflow-x: hidden;
  }
  .body-top{
    background: #fff;
    border-bottom: 10px solid rgba(130,194,37,0.2);
  }
  .body-top-head{
    /*上、右、下、左*/
    padding: 30px 10px 0px 20px;
    margin-bottom: 20px;
  }
  .head{
    margin: 20px;
    margin-bottom: 0;
    padding: 10px;
    background: #F8F8F9;
    border: 1px solid #dcdcdc;
    border-bottom: 0px;
    font-size: 14pt;
  }
  .farm {
    margin: 20px;
    margin-top: 0px;
    padding: 10px;
    border: 1px solid #dcdcdc;
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
  .tip{
    color: red;
    margin-left: 5px;
  }
</style>
