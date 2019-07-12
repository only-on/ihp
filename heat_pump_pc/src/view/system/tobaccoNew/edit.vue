<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">编辑烤房</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="updateModel" :label-width="200" ref="updateModel" :rules="ruleValidate">
          <!--用户基本信息---------------------------------------------------------------------------------------------------->
          <div style="text-align: center">
            <FormItem label="分公司" prop="companyId">
              <Select v-model="updateModel.companyId" clearable style="width:200px;float: left;text-align: left" placeholder="分公司"  @on-change="selectChange">
                <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="合作社" prop="cooperativeId">
              <Select v-model="updateModel.cooperativeId" clearable style="width:200px;float: left;text-align: left" placeholder="合作社" @on-change="cooperativeSelectChange">
                <Option v-for="item in cooperativeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="网关编号" class="selfClass">
              <!--<Input  v-model="updateModel.title"  style="width:450px;float: left"  placeholder="请输入烤房名称 " @on-change="titleVal(updateModel.title)"></Input>-->
              <InputNumber  v-model="updateModel.gatewayId"  style="width: 200px; float: left" :formatter="value => `${value}`.replace('.', '')"
                            :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
              <br>
            </FormItem>
            <FormItem label="设备编号" class="selfClass">
              <!--<Input  v-model="updateModel.title"  style="width:450px;float: left"  placeholder="请输入烤房名称 " @on-change="titleVal(updateModel.title)"></Input>-->
              <InputNumber  v-model="updateModel.number"  style="width: 200px; float: left" :formatter="value => `${value}`.replace('.', '')"
                            :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
              <br>
            </FormItem>
            <FormItem label="烤房名称" prop="title">
              <Input  v-model="updateModel.title"  style="width:450px;float: left"  placeholder="请输入名称 " @on-change="titleVal(updateModel.title)"></Input>
              <!--<span v-if="titleNotice" class="notice">标题不能为数字</span>-->
              <span v-if="titleNotices" class="notice">名称不能为空</span>
              <br>
            </FormItem>
            <FormItem label="烤房区域" prop="regions">
              <region @region="regionChange" style="float:left;" :regionIds="regionIds"></region>
              <span class="notice" v-if="addressNotice">请选择具体镇/街道</span><br>
            </FormItem>
            <FormItem label="详细地址" prop="address">
              <Input  v-model="updateModel.address"  placeholder="村 街道 " style="width: 450px;float: left"></Input><br>
            </FormItem>
          </div>
          <div style="text-align: left">
            <FormItem>
              <Button  @click="submit" style="background-color: #82C225;color:#fff;width: 100px;margin-top: 20px">提交</Button>
              <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px; margin-left: 30px;margin-top: 20px">取消</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { tobaccoDetail, companyList, cooperativeList, editTobacco } from '../../../api/api'
import region from '@/components/region'
export default {
  components: {
    region
  },
  data () {
    return {
      cooperativeList: [],
      companyList: [],
      regionIds: '',
      addressNotice: false,
      titleNotice: false,
      titleNotices: false,
      updateModel: {
        title: '',
        regions: '',
        address: '',
        companyId: '',
        cooperativeId: '',
        gatewayId: null,
        number: null
      },
      ruleValidate: {
        title: [
          {required: true, message: '烤房名称不能为空', trigger: 'blur'},
          {type: 'string', max: 200, message: '烤房名称不能超过200个字', trigger: 'blur'}
        ],
        companyId: [
          {required: true, message: '分公司不能为空', trigger: 'blur'}
        ],
        cooperativeId: [
          {required: true, message: '合作社不能为空', trigger: 'blur'}
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
    cooperativeSelectChange (change) {
      if (change !== undefined) {
        this.updateModel.cooperativeId = change
      } else {
        this.updateModel.cooperativeId = ''
      }
    },
    selectChange (change) {
      if (change !== undefined) {
        this.updateModel.companyId = change
      } else {
        this.updateModel.companyId = ''
        this.updateModel.cooperativeId = ''
      }
      let par = {
        companyId: this.updateModel.companyId
      }
      this.getCooperativelist(par)
    },
    getCooperativelist (par) {
      cooperativeList(par).then((res) => {
        if (res.data.code === 1000) {
          this.cooperativeList = res.data.content
        } else {
          this.cooperativeList = []
        }
      })
    },
    getCompanylist () {
      companyList().then((res) => {
        if (res.data.code === 1000) {
          this.companyList = res.data.content
        }
      })
    },
    // 区域---------------------------------------------------------------------------------------------
    regionChange (data) {
      // console.log(data)
      if (data.length < 4) {
        this.addressNotice = true
        this.updateModel.regions = ''
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
          id: this.updateModel.id,
          name: this.updateModel.title,
          regionId: this.updateModel.regions,
          addressDetail: this.updateModel.address,
          companyId: this.updateModel.companyId,
          gatewayId: this.updateModel.gatewayId,
          cooperationId: this.updateModel.cooperativeId,
          number: this.updateModel.number
        }
        editTobacco(para).then((res) => {
          if (res.data.code === 1000) {
            this.$router.push({name: 'tobacco_manage', params: {param: this.$route.params.param}})
            this.$Message.success('烤房修改成功！')
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    submitVal () {
      if (this.updateModel.companyId === '' || this.updateModel.companyId === undefined) {
        this.$Message.error('分公司不能为空!')
        return false
      } else if (this.updateModel.cooperativeId === '' || this.updateModel.cooperativeId === undefined) {
        this.$Message.error('合作社不可以为空')
        return false
      } else if (this.updateModel.gatewayId === '' || this.updateModel.gatewayId === null) {
        this.$Message.error('网关编号不可以为空')
        return false
      } else if (this.updateModel.number === '' || this.updateModel.number === null) {
        this.$Message.error('设备编号不可以为空')
        return false
      } else if (this.updateModel.number.length > 4) {
        this.$Message.error('设备编号不可以超过四位')
        return false
      } else if (this.titleNotices) {
        this.$Message.error('烤房名称不可以为空')
        return false
      } else if (this.updateModel.title.trim() === '') {
        this.titleNotices = true
        this.$Message.error('烤房名称不可以为空')
        return false
      } else if (this.updateModel.title.length > 200) {
        this.$Message.error('烤房名称不能超过200个字!')
        return false
      } else if (this.updateModel.regions === '') {
        this.$Message.error('烤房区域不能为空!')
        return false
      } else if (this.updateModel.address === '') {
        this.$Message.error('烤房地址不能为空!')
        return false
      } else if (this.updateModel.address.length > 200) {
        this.$Message.error('烤房地址不能超过200个字!')
        return false
      } else {
        return true
      }
    },
    back () {
      this.$router.push({name: 'tobacco_manage', params: {param: this.$route.params.param}})
    }
  },
  created: function () {
    this.updateModel.id = this.$route.params.id
    this.getCompanylist()
    let p = {
      id: this.updateModel.id
    }
    tobaccoDetail(p).then((res) => {
      if (res.data.code === 1000) {
        // console.log(res.data)
        this.updateModel.title = res.data.content.name
        this.updateModel.companyId = res.data.content.companyId
        this.updateModel.gatewayId = res.data.content.gatewayId - 0
        this.updateModel.number = res.data.content.number - 0
        this.updateModel.address = res.data.content.addressDetail
        this.regionIds = res.data.content.regionIds.slice(1)
        this.updateModel.regions = res.data.content.regionIds[res.data.content.regionIds.length - 1]
        let par = {
          companyId: this.updateModel.companyId
        }
        this.getCooperativelist(par)
        this.updateModel.cooperativeId = res.data.content.cooperationId
        // console.log(this.regionIds)
      }
    })
  }
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
