<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">新增公告</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="updateModel" :label-width="150" ref="updateModel" :rules="ruleValidate">
          <!--用户基本信息---------------------------------------------------------------------------------------------------->
          <div>
            <FormItem label="标题" prop="title">
              <Input  v-model="updateModel.title"  style="width:550px; float: left"  placeholder="请输入标题 " @on-change="titleVal(updateModel.title)"></Input>
              <span v-if="titleNotice" class="notice">标题不能为数字</span>
              <span v-if="titleNotices" class="notice">标题不能为空</span>
              <br>
            </FormItem>
            <FormItem label="内容"  prop="content">
              <Input v-model="updateModel.content" type="textarea" :rows="10" style="width: 550px" placeholder="请输入内容..." @on-change="checkCon(updateModel.content)"></Input>
              <div>{{wordNum}}/500</div>
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
import { addNotice } from '../../../api/api'
export default {
  data () {
    return {
      wordNum: 0,
      titleNotice: false,
      titleNotices: false,
      updateModel: {
        title: '',
        content: ''
      },
      ruleValidate: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'},
          {type: 'string', max: 200, message: '标题不能超过200个字', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '内容不能为空', trigger: 'blur'},
          {type: 'string', max: 500, message: '内容不能超过500个字', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    titleVal (string) {
      var validate = /^\d+$/
      if (string !== '' && string !== undefined) {
        if (validate.test(string.trim())) {
          this.titleNotice = true
        } else {
          this.titleNotice = false
          if (string.trim() === '') {
            this.titleNotices = true
          } else {
            this.titleNotices = false
          }
        }
      } else {
        this.titleNotice = true
      }
    },
    checkCon (change) {
      this.wordNum = change.length
    },
    submit () {
      if (this.submitVal()) {
        this.$refs['updateModel'].validate((valid) => {
          if (valid) {
            addNotice(this.updateModel).then((res) => {
              if (res.data.code === 1000) {
                this.$router.push({name: 'notice'})
                this.$Message.success('公告创建成功！')
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
      if (this.titleNotice || this.titleNotices) {
        this.$Message.error('公告标题不可以为空')
        return false
      } else if (this.updateModel.content.trim() === '') {
        this.$Message.error('公告内容不可以为空')
        return false
      } else if (this.wordNum > 500) {
          this.$Message.error('公告内容不能超过500字!')
          return false
      } else {
        return true
      }
    },
    back () {
      this.$router.push({name: 'notice'})
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
