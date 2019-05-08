<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">编辑资讯</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="formItem" :label-width="150" ref="formItem" :rules="ruleValidate">
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="来源/作者" prop="source">
              <Input  v-model="formItem.source" style="width: 300px" placeholder="请输入来源/作者"></Input><br>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="资讯标题" prop="title">
              <Input  v-model="formItem.title" style="width: 300px" placeholder="请输入资讯标题"></Input><br>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="资讯图片">
              <Row>
                <div  class="file">
                  <input type="file" @change="handleUpload"   style="height: 30px;" >上传资讯图片
                </div>
                <span class="notice" v-if="faceCardNotice">请上传资讯图片</span>
              </Row>
              <Row v-show="img !== ''">
                <Col span="4">
                <a :href=img target="_blank">
                  <img :src=img style="width: 100px;height: 100px" alt="暂未传照片">
                </a>
                </Col>
              </Row>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="资讯类型" prop="">
              <RadioGroup v-model="formItem.contentType" @on-change="radioChange">
                <Radio label="0">推送链接</Radio>
                <Radio label="1">富文本信息</Radio>
              </RadioGroup>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" v-if="formItem.contentType === '0'">
            <Col span="24">
            <FormItem label="推送链接" prop="content">
              <Input  v-model="formItem.content"   style="width: 300px" placeholder="请输入推送链接"></Input><br>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" v-if="formItem.contentType === '1'">
            <Col span="24">
            <FormItem label="资讯详情">
              <vue-editor style="width: 80%" v-model="formItem.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24" >
            <FormItem label="是否立即发布">
              <i-switch v-model="formItem.post" size="large">
                <span slot="true" style="padding-left: 8px"> 是</span>
                <span slot="false" style="padding-left: 8px">否</span>
              </i-switch>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24" >
            <FormItem>
              <Button  @click="submit" style="background-color: #82C225;color:#fff;width: 100px">提交</Button>
              <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px; margin-left: 30px;">取消</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import { uploadImg, editNews, newsDetail } from '../../../api/api'
  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        faceCardNotice: false,
        img: '',
        formItem: {
          id: '',
          post: true,
          contentType: '0',
          titleImageId: '',
          title: '',
          source: '',
          content: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '资讯标题不能为空', trigger: 'blur'},
            {type: 'string', max: 200, message: '资讯标题不能超过200个字', trigger: 'blur'}
          ],
          source: [
            {required: true, message: '来源/作者不能为空', trigger: 'blur'}
          ],
          text: [
            {required: true, message: '资讯详情不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      radioChange () {
        this.formItem.content = ''
      },
      handleUpload (file) {
        var formData = new FormData()
        for (var image of file.target.files) {
          formData.append('file', image)
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        uploadImg(formData, config).then((res) => {
          if (res.data.code === 1000) {
            this.faceCardNotice = false
            this.formItem.titleImageId = res.data.content.id
            this.img = res.data.content.url
          }
        })
      },
      submitVal () {
        if (this.formItem.title.trim() !== '') {
          if (this.formItem.source.trim() !== '') {
            if (this.formItem.content.trim() !== '') {
              if (this.formItem.titleImageId !== '') {
                return true
              } else {
                this.faceCardNotice = true
                this.$Message.error('资讯图片不能为空！')
                return false
              }
            } else {
              this.$Message.error('资讯详情/推送链接不能为空！')
              return false
            }
          } else {
            this.$Message.error('来源/作者不能为空！')
            return false
          }
        } else {
          this.$Message.error('资讯标题不能为空！')
          return false
        }
      },
      //  新增
      submit () {
        if (this.submitVal()) {
          this.$refs['formItem'].validate((valid) => {
            if (valid) {
              editNews(this.formItem).then((res) => {
                if (res.data.code === 1000) {
                  this.$router.push({name: 'news'})
                  this.$Message.success('资讯修改成功！')
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
      back () {
        this.$router.push({name: 'news', params: {param: this.$route.params.param}})
      },
      // 富文本图片上传————————————————————————————————————————————
      handleImageAdded (file, Editor, cursorLocation) {
        // console.log(file)
        var formData = new FormData()
        formData.append('file', file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        uploadImg(formData, config).then((res) => {
          let url = res.data.content.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
        })
      }
    },
    created: function () {
      let p = {
        id: this.$route.params.id
      }
      newsDetail(p).then((res) => {
        // console.log(res)
        if (res.data.code === 1000) {
          this.formItem.id = res.data.content.id
          this.formItem.post = res.data.content.post
          this.formItem.contentType = res.data.content.contentType + ''
          this.formItem.titleImageId = res.data.content.titleImageId
          this.formItem.title = res.data.content.title
          this.formItem.source = res.data.content.source
          this.formItem.content = res.data.content.content
          this.img = res.data.content.titleImage.url
        }
      })
    }
  }
</script>

<style scoped>
  .cancel{
    color:#d7d7d7;
    background-color: #fff;
    margin-left: 15px;
  }
  .cancel:hover{
    border-color: #48B089;
    color:#48B089;
  }
  .radio{
    float: left;
  }
  .input{
    width: 200px;
    float: left;
  }
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
  .noticeText {
    color: #c1c1c1;
  }
  .notice{
    color: #ED3F14;
    float: left;
    margin-left: 5px;
  }
  .ivu-switch-checked {
    background-color: #82C225;
    border-color: #82C225;
  }
</style>
