<template>
  <div>
    <Row>
      <Select v-model="param.userId" style="width:200px;margin-right: 20px" placeholder="操作员" clearable @on-change="changeUser" :transfer="true">
        <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <DatePicker type="datetimerange" placeholder="日期和时间" style="width: 300px" @on-change="selectDate" :transfer="true" v-model="time"></DatePicker>
      <br>
    </Row>
    <div class="content">
      <div class="empty" v-if="isEmpty">暂无数据</div>
      <div class="videoItem" v-if="!isEmpty" v-for="(item, index) in imageList" :key="index" :style="{'visibility': item.url === -1 ? 'hidden': 'visible'}">
        <div style="width:370px;height: 220px" class="videoImg">
          <img src="../../../assets/videoBackgroup.jpg" height="220" width="370"/>
          <!--<video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="item.playerOptions" v-if="item.url !== -1"></video-player>-->
        </div>
        <div class="tip">
          <Row class="tipInfo">
            <img src="../../../assets/person.png" alt="" style="float: left;margin-right: 10px">
            <div style="float:left">{{item.userName}}</div>
          </Row>
          <Row class="tipInfo">
            <img src="../../../assets/date.png" alt="" style="float: left;margin-right: 10px">
            <div style="float:left">{{item.createTime}}</div>
          </Row>
        </div>
        <div class="tipPlay">
            <Icon type="md-play" color="#fff" size="60" @click="play(item)"/>
        </div>
      </div>
    </div>
    <div style="text-align: center;margin-top: 10px">
      <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
            ref="tablePage" show-elevator ></Page>
    </div>
  </div>
</template>

<script>
import { operateList, houseVideo } from '../../../api/api'
import { videoPlayer } from 'vue-video-player'
import videoImg from '../../../assets/video.jpg'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      time: [],
      videoImg: videoImg,
      isEmpty: true,
      param: {
        pageNum: 1,
        pageSize: 10,
        userId: '',
        startTime: '',
        endTime: '',
        houseId: ''
      },
      size: [10, 20, 30, 40, 50],
      total: 0,
      page: 1,
      rows: 10,
      userList: [],
      imageList: [],
      playerOptions: {
        // autoplay: false, 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4',
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }],
        poster: require('../../../assets/logo.png'),
        notSupportedMessage: '此视频暂无法播放，请稍后再试'
        // controlBar: {
        //   timeDivider: true,
        //   durationDisplay: true,
        //   remainingTimeDisplay: false,
        //   fullscreenToggle: true  //全屏按钮
        // }
      }
    }
  },
  methods: {
    play (vv) {
      let video = {
        videoId: vv,
        param: this.param
      }
      this.$router.push({name: 'tobacco_video', params: {item: this.$route.params.item, param: this.$route.params.param, video: video}})
    },
    getUser () {
      // 操作员下拉
      operateList().then((res) => {
        if (res.data.code === 1000) {
          this.userList = res.data.content
        } else {
          this.userList = []
        }
      })
    },
    changeUser (change) {
      if (change !== undefined) {
        this.param.userId = change
      } else {
        this.param.userId = ''
      }
      this.getImage(this.param)
    },
    selectDate (change) {
      if (change[0] !== '' && change[1] !== '') {
        this.param.startTime = change[0]
        this.param.endTime = change[1]
      } else {
        this.param.startTime = ''
        this.param.endTime = ''
      }
      this.getImage(this.param)
    },
    // 点击分页页码
    change (page) {
      this.page = page
      this.param.pageNum = this.page
      this.getTableDatas(this.param)
    },
    // 改变当前显示的行数
    doPageSizeChange: function (size) {
      this.rows = size
      this.param.pageSize = this.rows
      this.getTableDatas(this.param)
    },
    // 烤房视频
    getImage (par) {
      let vm = this
      houseVideo(par).then((res) => {
        if (res.data.code === 1000) {
          vm.imageList = res.data.content.list
          for (let j = 0; j < vm.imageList.length; j++) {
            let play = {
              autoplay: false,
              muted: false,
              loop: false,
              preload: 'auto',
              language: 'zh-CN',
              aspectRatio: '16:9',
              fluid: true,
              sources: [{
                type: 'video/mp4',
                src: vm.imageList[j].url
              }],
              poster: vm.videoImg,
              notSupportedMessage: '此视频暂无法播放，请稍后再试'
            }
            vm.imageList[j].playerOptions = play
          }
          vm.total = res.data.content.total
          let num = vm.imageList.length % 4
          if (num !== 0) {
            for (let i = 0; i < (4 - num); i++) {
              vm.imageList.push({url: -1})
            }
          }
          if (vm.total === 0) {
            vm.isEmpty = true
          } else {
            vm.isEmpty = false
          }
        } else {
          vm.imageList = []
          vm.total = 0
          vm.isEmpty = true
        }
      })
    }
  },
  created: function () {
    if (this.$route.params.item !== undefined) {
      this.param.houseId = this.$route.params.item.id
    }
    if (this.$route.params.video !== undefined) {
      this.param = this.$route.params.video.param
      this.time.push(this.param.startTime)
      this.time.push(this.param.endTime)
    }
    this.getUser()
    this.getImage(this.param)
  }
}
</script>

<style scoped>
  .content{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around;
    min-height: 500px;
  }
  .videoItem{
    width: 370px;
    height: 220px;
    position: relative;
    margin-bottom: 30px;
  }
  .tipPlay{
    height: 60px;
    width: 60px;
    /*background-color: red;*/
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    /*height:60px;*/
    transition: height .5s;
    z-index: 9999;
    text-align: center;
    opacity: 0;
  }
  .videoImg{
    position: relative;
  }
  .videoItem:hover .tipPlay{
    opacity: 1;
  }
  .tip{
    position: absolute;
    bottom:0;
    width: 100%;
    height:75px;
    background: #005945;
    transition: height .5s;
    font-size: 14px;
    color: #fff;
    z-index: 999;
    opacity: 1;
  }
  .videoItem:hover .tip{
    opacity: 0;
    /*height:0px;*/
    /*color: transparent;*/
  }
  .tipInfo:first-child{
    padding: 15px 15px 5px;
  }
  .tipInfo:last-child{
    padding: 0 15px 0;
  }
  .empty{
    position: absolute;
    top:0;bottom:0;
    margin-top: auto;margin-bottom: auto;
    height: 30px;
    font-size:22px;
  }
</style>
