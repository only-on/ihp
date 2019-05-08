<template>
    <div class="body">
      <Row style="background:#eee;height:100px;padding-top: 30px;text-align: center;font-size: 16px;">
        <span style="font-size: 24px">
          {{title}}
        </span>
        <!--<Button @click="stopPlay">停止播放</Button>-->

        <Button style="background: #fff;color: #005945;width: 100px;border-radius: 8px;font-size:16px;padding-right:20px;float: right;margin-right: 30px" icon="ios-arrow-back" @click="back">返回</Button>
      </Row>
      <Row type="flex" justify="center">
        <div id="playWind" class="playWind" style="width: 800px; height: 600px;text-align: center;margin-top: 30px"></div>
      </Row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      play: {},
      token: '',
      url: ''
    }
  },
  methods: {
    stopPlay () {
      this.play.stop()
    },
    back () {
      // console.log(111)
      this.play.stop()
      this.$router.push({name: 'monitor', params: {params: this.$route.params.params}})
    }
  },
  created: function () {
  },
  // destroyed: function () {
  //   // console.log(8888)
  //   this.play.stop()
  // },
  mounted () {
    this.$nextTick(function () {
      // console.log(this.$route.params)
      this.title = this.$route.params.params.house
      this.url = this.$route.params.item.url
      this.token = this.$route.params.item.token
      this.play = new EZUIKit.EZUIPlayer({
        id: 'playWind',
        autoplay: true,
        url: this.url,
        accessToken: this.token,
        decoderPath: '../../static/ezopen/',
        width: 800,
        height: 600
      })
    })
  }
}
</script>

<style scoped>
.body{
  height: 100%;
  width: 100%;
}
</style>
