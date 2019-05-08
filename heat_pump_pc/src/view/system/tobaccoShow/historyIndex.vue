<template>
    <div class="body">
      <Row style="background:#eee;height:100px;padding-top: 10px;text-align: center;font-size: 16px;position: relative">
        <span>{{fullName}}</span>
        <span style="font-weight: 600">{{' / ' + tobaccoName}}</span>
        <Row type="flex" justify="start" style="height: 46px;position: absolute;bottom:0">
          <Button :class="!isDefault ? 'btn1 btn' : 'btn2 btn'" @click="changeBtn" >
            历史视频
            <span class="itemBorder" v-if="videoIs"></span>
          </Button>
          <Button :class="isDefault ? 'btn1 btn' : 'btn2 btn'" @click="changeDefault">
            历史图片
            <span class="itemBorder" v-if="imageIs"></span>
          </Button>
        </Row>
        <Button style="background: #fff;color: #005945;width: 100px;border-radius: 8px;font-size:16px;padding-right:20px;position: absolute;right:20px;bottom:15px" icon="ios-arrow-back" @click="back">返回</Button>
      </Row>
      <div style="padding: 30px 20px">
        <historyImage v-if="isDefault"></historyImage>
        <historyVideo v-if="!isDefault"></historyVideo>
      </div>
    </div>
</template>

<script>
import historyImage from './historyImage.vue'
import historyVideo from './historyVideo.vue'
export default {
  components: {
    historyImage,
    historyVideo
  },
  data () {
    return {
      isDefault: false,
      imageIs: false,
      videoIs: true,
      fullName: '',
      tobaccoName: ''
    }
  },
  methods: {
    changeBtn () {
      this.isDefault = !this.isDefault
      this.imageIs = false
      this.videoIs = true
    },
    changeDefault () {
      this.isDefault = true
      this.imageIs = true
      this.videoIs = false
    },
    back () {
      this.$router.push({name: 'tobacco_show', params: {pageParam: this.$route.params.param}})
    }
  },
  created: function () {
    if (this.$route.params.item !== undefined) {
      this.fullName = this.$route.params.item.companyName + ' / ' + this.$route.params.item.cooperationName
      this.tobaccoName = this.$route.params.item.houseName
    }
  }
}
</script>

<style scoped>
.body{
}
.btn{
  background: #eee !important;
  border-radius:18px 18px 0px 0px !important;
  /*border-radius: 0 !important;*/
  border:0 !important;
  padding-left:50px !important;
  padding-right: 50px !important;
  font-size: 16px !important;
  font-weight: 600;
  position: relative;
}
.btn2{
  background: #eee !important;
}
.btn1{
  background:#fff !important;
  color: #01A37F !important;
}
  .itemBorder{
    position: absolute;
    width: 64px;
    height: 3px;
    background:#01A37F;
    bottom:0;left:0;right: 0;
    margin-left: auto;
    margin-right: auto
  }
</style>
