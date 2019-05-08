<template>
  <div class="body">
    <img src="../assets/backgroup.png"/>
    <div class="body-content">
      <div class="title">
        种植烘烤可追溯物联网系统
      </div>
      <div class="mainContent">
        <Form :model="form" :label-width="0" ref="form" style="margin-top: 0px;margin-bottom: 0px">
          <Row type="flex" justify="center">
            <Col span="">
            <FormItem label="">
              <Input type="text" v-model="form.userId" placeholder="请输入手机号码" size="large" style="width: 403px;">
              <Icon type="md-person" slot="prepend" color="#fff" size="20"></Icon>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="" >
            <FormItem label="">
              <Input type="password" v-model="form.password" placeholder="请输入密码" @on-enter="submit" size="large" style="width: 403px;">
              <Icon type="ios-lock" slot="prepend" color="#fff" size="20"></Icon>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="">
            <FormItem>
              <Button @click="submitMonitor"  class="btn-list">登录监控中心</Button>
              <Button @click="submit"  class="btn-list">登录数据平台</Button>
            </FormItem>
            </Col>
          </Row>
          <Alert type="warning" show-icon v-show="showNotice">
            请正确填写账号和密码！
          </Alert>
        </Form>
        <div class="bottom-right"></div>
        <div class="bottom1-right"></div>
      </div>
    </div>
    <div class="layout-footer-center" >CopyRight © 东莞市永淦节能科技有限公司 .All Rights Reserved 2019 - 2020</div>
  </div>
</template>
<script>
import { userLogin } from '../api/api'
import * as types from '../store/types'
import store from '../store/store'
export default {
  data () {
    return {
      showNotice: false,
      single: false,
      form: {
        userId: '',
        password: ''
      },
      token: ''
    }
  },
  created: function () {
    sessionStorage.removeItem('token')
  },
  methods: {
    submitMonitor () {
      this.$Message.success('欢迎使用监控中心')
      this.$router.push({path: '/monitor'})
      // let par = {
      //   tel: this.form.userId,
      //   password: this.form.password
      // }
      // userLogin(par).then((res) => {
      //   if (res.data.code === 1000) {
      //     store.commit(types.LOGIN, res.data.content.token)
      //     sessionStorage.setItem('token', res.data.content.token)
      //     this.$Message.success('登录成功! 欢迎使用监控中心')
      //     this.$router.push({path: '/monitor'})
      //   } else {
      //     this.$Message.error(res.data.message)
      //   }
      // })
    },
    submit () {
      if (this.form.userId !== '') {
        if (this.form.password !== '') {
          let par = {
            tel: this.form.userId,
            password: this.form.password
          }
          userLogin(par).then((res) => {
            if (res.data.code === 1000) {
              store.commit(types.LOGIN, res.data.content.token)
              store.commit(types.ROLE, res.data.content.roleId)
              sessionStorage.setItem('token', res.data.content.token)
              sessionStorage.setItem('roleId', res.data.content.roleId)
              this.$Message.success('登录成功! 欢迎使用数据中心')
              this.$router.push({path: '/first'})
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          this.$Message.error('请输入密码')
        }
      } else {
        this.$Message.error('请输入手机号码')
      }
    }
  }
}
</script>

<style scoped>
  .body{
    width:100vw;
    height:100vh;
    position: relative;
    background: linear-gradient(-5deg,#358875, #00A57F);
    /*overflow: auto;*/
  }
  .body>img{
    opacity: 0.8;
    width: 100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin: auto;
  }
  .mainContent {
    text-align:center;
    width: 600px;
    max-height: 400px;
    min-height: 320px;
    margin: auto;
    border-radius: 10px;
    background-color: #fff;
    padding-top: 80px;
    position: relative;
  }
  .title {
    /*position: absolute;*/
    /*top: 100px;*/
    text-align:center;
    color:rgba(255,255,255,1);
    line-height: 72px;
    text-shadow:1px 2px 6px rgba(16,80,65,0.38);
    font-size: 40px;
    font-weight: bold;
    font-family: BDZYJT--GB1-0;
    margin-bottom: 30px;
  }
  .body-content {
    width: 600px;
    max-height: 500px;
    padding: 20px 0;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
  }
  .btn-list {
    width:171px;
    background:linear-gradient(0deg,rgba(23,131,106,1),rgba(0,164,126,1));
    border-radius:6px;
    color: #F7F7F7 !important;
    font-size: 20px;
    height: 41px;
    padding: 3px;
    margin-top: 20px;
  }
  .btn-list:first-child {
    margin-right: 50px;
  }
  .layout-footer-center[data-v-a4c1603c]{
    position: absolute;
    background-color: #005945 !important;
    text-align: center;
    right: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    font-size:14px;
    color: #fff;
    height: 60px;
    padding-top: 20px;
  }
  .bottom-right {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 50px solid #0F9C7B;
    border-left: 300px solid transparent;
    opacity: 0.2;
  }
  .bottom1-right {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 100px solid #0F9C7B;
    border-left: 150px solid transparent;
    opacity: 0.2;
  }
</style>
