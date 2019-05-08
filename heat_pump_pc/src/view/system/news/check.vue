<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">查看资讯</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="formItem" :label-width="150" ref="formItem">
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="来源/作者" prop="source">{{formItem.source}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="资讯标题" prop="title">{{formItem.title}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="资讯图片">
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
            <FormItem label="资讯类型" prop="">{{formItem.contentType === 0 ? '推送链接' : formItem.contentType === 1 ? '富文本信息' : '-'}}

            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" v-if="formItem.contentType === 0">
            <Col span="24">
            <FormItem label="推送链接" prop="content">{{formItem.content}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" v-if="formItem.contentType === 1">
            <Col span="24">
            <FormItem label="资讯详情">
              <vue-editor style="width: 80%" v-model="formItem.content" disabled></vue-editor>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24" >
            <FormItem label="是否发布">{{formItem.post === true ? '已发布' : '未发布'}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24" >
            <FormItem>
              <Button  @click="back" style="background-color: #82C225;color:#fff;width: 100px">返回</Button>
              <!--<Button  @click="back" style="background-color: #848484;color:#fff;width: 100px; margin-left: 30px;">返回</Button>-->
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
import { newsDetail } from '../../../api/api'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      img: '',
      formItem: {
        post: true,
        contentType: 0,
        titleImageId: '',
        title: '',
        source: '',
        content: ''
      }
    }
  },
  methods: {
    back () {
      this.$router.push({name: 'news', params: {param: this.$route.params.param}})
    }
  },
  created: function () {
    let p = {
      id: this.$route.params.id
    }
    newsDetail(p).then((res) => {
      // console.log(res)
      if (res.data.code === 1000) {
        this.formItem.post = res.data.content.post
        this.formItem.contentType = res.data.content.contentType
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
