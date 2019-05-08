<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">新增分公司</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="updateModel" :label-width="200" ref="updateModel" :rules="ruleValidate">
          <!--用户基本信息---------------------------------------------------------------------------------------------------->
          <div style="text-align: center">
            <FormItem label="名称" prop="title">
              <Input  v-model="updateModel.title"  style="width:450px;float: left"  placeholder="请输入分公司名称 " @on-change="titleVal(updateModel.title)"></Input>
              <!--<span v-if="titleNotice" class="notice">标题不能为数字</span>-->
              <span v-if="titleNotices" class="notice">名称不能为空</span>
              <br>
            </FormItem>
            <FormItem label="公司区域" prop="regions">
              <region @region="regionChange" style="float:left;"></region>
              <span class="notice" v-if="addressNotice">请选择具体镇/街道</span><br>
            </FormItem>
            <FormItem label="详细地址" prop="address">
              <Input  v-model="updateModel.address"  placeholder="村 街道 " style="width: 450px;float: left"></Input><br>
            </FormItem>
          </div>
          <div style="text-align: left">
            <FormItem>
              <Button  @click="submit" style="background-color: #82C225;color:#fff !important;width: 100px;margin-top: 20px">提交</Button>
              <Button  @click="back" style="background-color: #848484;color:#fff !important;width: 100px; margin-left: 30px;margin-top: 20px">取消</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { addCompany } from '../../../api/api'
import region from '../../../components/region'
export default {
  components: {
    region
  },
  data () {
    return {
      addressNotice: false,
      titleNotice: false,
      titleNotices: false,
      updateModel: {
        title: '',
        regions: '',
        address: ''
      },
      ruleValidate: {
        title: [
          {required: true, message: '名称不能为空', trigger: 'blur'},
          {type: 'string', max: 200, message: '名称不能超过200个字', trigger: 'blur'}
        ],
        regions: [
          {required: true, message: '区域不能为空', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '详细地址不能为空', trigger: 'blur'},
          {type: 'string', max: 200, message: '详细地址不能超过200个字', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 区域---------------------------------------------------------------------------------------------
    regionChange (data) {
      // console.log(data)
      if (data.length < 4) {
        this.addressNotice = true
      } else {
        this.addressNotice = false
        // this.updateModel.regionAddress = data[0].label + data[1].label + data[2].label
        this.updateModel.regions = data[3].value
        // console.log(this.updateModel.regionAddress)
      }
    },
    titleVal (string) {
      // var validate = /^\d+$/
      if (string !== '' && string !== undefined) {
        // if (validate.test(string.trim())) {
        //   this.titleNotice = true
        // } else {
        //   this.titleNotice = false
        //   if (string.trim() === '') {
        //     this.titleNotices = true
        //   } else {
        //     this.titleNotices = false
        //   }
        // }
        if (string.trim() === '') {
          this.titleNotices = true
        } else {
          this.titleNotices = false
        }
      } else {
        this.titleNotice = true
      }
    },
    submit () {
      if (this.submitVal()) {
        let para = {
          name: this.updateModel.title,
          regionId: this.updateModel.regions,
          addressDetail: this.updateModel.address
        }
        addCompany(para).then((res) => {
          if (res.data.code === 1000) {
            this.$router.push({name: 'companys_manage'})
            this.$Message.success('分公司创建成功！')
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    submitVal () {
      if (this.titleNotices) {
        this.$Message.error('分公司名称不可以为空')
        return false
      } else if (this.updateModel.title.trim() === '') {
        this.titleNotices = true
        this.$Message.error('分公司名称不可以为空')
        return false
      } else if (this.updateModel.title.length > 200) {
        this.$Message.error('分公司名称不能超过200个字!')
        return false
      } else if (this.updateModel.regions === '') {
        this.$Message.error('分公司区域不能为空!')
        return false
      } else if (this.updateModel.address === '') {
        this.$Message.error('分公司地址不能为空!')
        return false
      } else if (this.updateModel.address.length > 200) {
        this.$Message.error('分公司地址不能超过200个字!')
        return false
      } else {
        return true
      }
    },
    back () {
      this.$router.push({name: 'companys_manage'})
    }
  },
  created: function () {}
}
</script>
<style scoped>
  .notice{
    color: #ED3F14;
    float: left;
    margin-left: 5px;
  }
  .layout-content-form{
    width:100%;
    background:#ffffff;
    padding:20px;
    padding-bottom :50px;
    text-align: center;
  }
  .body{
    background: #fff;
    min-width: 750px;
  }
  .head{
    margin:30px;
    padding: 10px;
    background: #F8F8F9;
  }
  .head-title{
    float:left;
    padding:10px 12px;
  }
  .content{
    margin: 30px;
  }
  .notice{
    color:red;
    margin-left: 10px;
  }
</style>
