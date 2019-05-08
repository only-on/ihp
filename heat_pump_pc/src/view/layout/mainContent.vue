<template>
  <div class="main-content">
    <transition mode="out-in" enter-active-class="bounceInleft" leave-active-class="bounceOutRight">
      <router-view class="tab-content animated"></router-view>
    </transition>
    <!--<Footer class="layout-footer-center" >CopyRight © 上海烟草机械有限责任公司 .All Rights Reserved 2018 - 2019</Footer>-->
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
  .el-tabs__item {
    color: #fff
  }

  .main-content {
    width: 100% -200px;
    position: fixed;
    top:60px;
    right: 0;
    bottom: 0;
    left: 200px;
    overflow: auto;
    z-index: 1;
    border: 10px solid rgba(130,194,37,0.2);
    background-color: #fff;
    transition: left .45s cubic-bezier(.23, 1, .32, 1);
    .tabs-content {
      height: 100%;
    }
  }

  .panels {
    height: 40px;
    background: #fff;
    margin-left: -16px;
  }

  .panels {
    span {
      display: inline-block;
      line-height: 40px;
      color: #48576a;
      padding-left: 15px;
      i:last-child {
        color: rgba(130,194,37,0.2)
      }
    }
  }
  .slide-right {
    left: 0;
    margin-left: 0px;
    background-color: #fff;
    border-left: 1px solid rgba(130,194,37,0.2);
    transition: left .45s cubic-bezier(.23, 1, .32, 1);
  }
  .layout-footer-center{
    background-color: #fff;
    text-align: center;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
