<template>
  <div class="headTop">
    <Row>
      <img src="../../assets/logo.png" alt="" style="height: 40px;width: 40px;margin-left: 10px;float: left;margin-right: 10px;margin-top:10px">
      <div class="headTextTop">种植烘烤可追溯物联网系统
      </div>
      <div style="float: right"  class="headTextTop" >
        <Icon type="md-power" @click.native="logout"></Icon>
      </div>
    </Row>
  </div>
</template>
<script>
import {userlogout} from '../../api/api'
export default {
  data () {
    return {}
  },
  created: function () {},
  methods: {
    logout () {
      userlogout().then((res) => {
        if (res.data.code === 1000) {
          sessionStorage.removeItem('token')
          this.$router.push({path: '/'})
        } else {
          this.$Message.error(res.data.message)
        }
      })
    }
  }
}
</script>
<style  scoped>
  .headTop{
    width: 100%;
    height:60px;
    background-color: #005945;
  }
  .headTextTop{
    float:left;
    color: #fff;
    text-align:left;
    line-height:60px;
    /*padding-left:10px;*/
    padding-right:40px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
  }
  .ivu-menu-light {
    background: transparent;
  }
  .ivu-menu-horizontal {
    height: 60px;
    line-height: 60px;
  }

  .ivu-menu-item,
  .ivu-menu-submenu .ivu-menu-submenu-title {
    height: 35px;
    /*line-height: 35px;*/
    /*float: right;*/
  }
  .ivu-menu-item:hover {
    background-color: #7B7E86;
  }
  .ivu-menu-item-selected {
    background-color: #7B7E86;
  }
  /*鼠标滑过css*/
  .ivu-menu-item:hover,
  .ivu-menu-submenu .ivu-menu-item:hover,
  .ivu-menu-submenu-title:hover {
    background-color: #7B7E86;
  }
  .ivu-menu-submenu .ivu-menu-item:hover,
  .ivu-menu-submenu-title:hover {
    background-color: #7B7E86;
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
    border-bottom: 0px solid #FFFFFF;
    color: #FFFFFF;
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu{
    border-bottom: 0px;
    color: #FFFFFF;
  }
  .ivu-icon{
    font-size: 25px;
  }
  .text {
    font-size: 17px;
  }

  /*菜单选中激活*/
  .ivu-menu-vertical {
  .ivu-menu-item.sm-active,
  .ivu-menu-item.sm-active {
    color: #48B089;
  }
  }
  .ivu-menu-horizontal.ivu-menu-light:after{
    height: 0px;
  }
</style>
