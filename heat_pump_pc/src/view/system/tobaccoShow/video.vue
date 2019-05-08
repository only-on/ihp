<template>
    <div class="body">
      <Row style="background:#eee;height:100px;padding-top: 10px;text-align: center;font-size: 16px;position: relative">
        <Button style="background: #fff;color: #005945;width: 100px;border-radius: 8px;font-size:16px;padding-right:20px;position: absolute;right:20px;bottom:15px" icon="ios-arrow-back" @click="back">返回</Button>
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
      decoder: {},
      token: '',
      url: ''
    }
  },
  methods: {
    back () {
      this.decoder.stop()
      this.$router.push({name: 'tobacco_history', params: {item: this.$route.params.item, param: this.$route.params.param, video: this.$route.params.video}})
    }
  },
  created: function () {
  },
  mounted () {
    this.$nextTick(function () {
      this.url = this.$route.params.video.videoId.url
      this.token = this.$route.params.video.videoId.token
      this.decoder = new EZUIKit.EZUIPlayer({
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
}
</style>
