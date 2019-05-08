<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">编辑告警</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="updateModel" :label-width="150" ref="updateModel" :rules="ruleValidate">
          <!--用户基本信息---------------------------------------------------------------------------------------------------->
          <div>
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="告警编号" prop="number">
                <Input  v-model="updateModel.number"  style="width:550px; float: left"  placeholder="请输入告警编号 " @on-change="titleVal(updateModel.number)"></Input>
                <span v-if="titleNotice" class="notice">请输入正整数</span>
                <br>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="告警名称" prop="name">
                <Input  v-model="updateModel.name"  style="width:550px; float: left"  placeholder="请输入告警名称 " @on-change="nameVal(updateModel.name)"></Input>
                <span v-if="nameNotice" class="notice">告警名称不能为数字</span>
                <br>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="告警级别" prop="level">
                <RadioGroup v-model="updateModel.level">
                  <Radio label="0" style="margin-right: 20px">一般</Radio>
                  <Radio label="1" style="margin-right: 20px">重要</Radio>
                  <Radio label="2" style="margin-right: 20px">严重</Radio>
                </RadioGroup>
                <br>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="24">
              <FormItem label="告警描述">
                <Input v-model="updateModel.description" type="textarea" :rows="10" style="width: 550px" placeholder="请输入告警描述..." @on-change="checkCon(updateModel.description)"></Input>
                <div>{{wordNum}}/200</div>
              </FormItem>
              </Col>
            </Row>
          </div>
          <Row type="flex" justify="center">
            <Col span="24" >
            <FormItem>
              <Button  @click="submit" style="background-color: #82C225;color:#fff;width: 100px;margin-top: 20px">提交</Button>
              <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px; margin-left: 30px;margin-top: 20px">取消</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { alarmUpdate } from '../../../api/api'
export default {
  data () {
    return {
      wordNum: 0,
      titleNotice: false,
      nameNotice: false,
      conNotice: false,
      updateModel: {
        id: '',
        number: '',
        name: '',
        level: '0',
        description: ''
      },
      ruleValidate: {
        number: [
          {required: true, message: '告警编号不能为空', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '告警名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    titleVal (string) {
      var validate = /^[0-9]*[1-9][0-9]*$/
      if (string !== '' && string !== undefined) {
        if (validate.test(string.trim())) {
          this.titleNotice = false
        } else {
          this.titleNotice = true
        }
      } else {
        this.titleNotice = true
      }
    },
    nameVal (string) {
      var validate = /^\d+$/
      if (string !== '' && string !== undefined) {
        if (validate.test(string.trim())) {
          this.nameNotice = true
        } else {
          this.nameNotice = false
        }
      } else {
        this.nameNotice = true
      }
    },
    checkCon (change) {
      this.wordNum = change.length
      if (change !== '' && change !== undefined) {
        if (change.trim().length === 0) {
          this.conNotice = true
        } else {
          this.conNotice = false
        }
      } else {
        this.conNotice = true
      }
    },
    submit () {
      if (this.submitVal()) {
        this.$refs['updateModel'].validate((valid) => {
          if (valid) {
            alarmUpdate(this.updateModel).then((res) => {
              if (res.data.code === 1000) {
                this.$router.push({name: 'alarm'})
                this.$Message.success('告警修改成功！')
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            this.$Message.error('信息验证失败!')
          }
        })
      }
    },
    submitVal () {
      // console.log(this.updateModel.description)
      if (this.titleNotice) {
        this.$Message.error('告警编号请输入正整数!')
        return false
      } else if (this.nameNotice) {
        this.$Message.error('告警名称不能为数字!')
        return false
      } else if (this.wordNum > 200) {
        this.$Message.error('告警描述不能超过200字!')
        return false
      } else {
        return true
      }
    },
    back () {
      this.$router.push({name: 'alarm', params: {param: this.$route.params.param}})
    }
  },
  created: function () {
    this.updateModel.id = this.$route.params.row.id
    this.updateModel.number = this.$route.params.row.number + ''
    this.updateModel.name = this.$route.params.row.name
    this.updateModel.level = this.$route.params.row.level + ''
    this.updateModel.description = this.$route.params.row.description
    this.wordNum = this.$route.params.row.description.length
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
  }
  .body{
    background: #fff;
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
