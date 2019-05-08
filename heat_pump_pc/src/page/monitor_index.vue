<template>
<div class="body">
  <Row type="flex" justify="center">
    <Col span="5">
      <div class="left-content" >
        <div class="card-title">
          实时温度状态
        </div>
        <Row type="flex" justify="center">
          <Col span="12" >
          <div class="card-content-vip">
            <img src="../assets/water.png" height="26" width="26"/>
            <div class="card-content-title">烤房湿度
            </div>
            <div class="card-content">
              {{temperature.houseHumidity}}
            </div>
          </div>
          </Col>
          <Col span="12" >
          <div class="card-content-vip">
            <img src="../assets/temperature.png" height="26" width="26"/>
            <div class="card-content-title">烤房温度
            </div>
            <div class="card-content">
              {{temperature.houseTemperature}}
            </div>
          </div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="12" >
          <div class="card-content-vip">
            <img src="../assets/temperature.png" height="26" width="26"/>
            <div class="card-content-title">环境温度
            </div>
            <div class="card-content">
              {{temperature.environmentTemperature}}
            </div>
          </div>
          </Col>
          <Col span="12" >
          <div class="card-content-vip">
            <img src="../assets/temperature.png" height="26" width="26"/>
            <div class="card-content-title">超温温度
            </div>
            <div class="card-content">
              {{temperature.overtemperature}}
            </div>
          </div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="12" >
          <div class="card-content-vip-only">
            <img src="../assets/temperature.png" height="26" width="26"/>
            <div class="card-content-title-only">排气温度
            </div>
          </div>
          </Col>
          <Col span="12" >
          </Col>
        </Row>
        <Row>
          <Col span="8" push="4">
          <div class="card-content-title-three">1#压缩机
          </div>
          </Col>
          <Col span="8" push="3" >
          <div class="card-content-title-three">2#压缩机
          </div>
          </Col>
          <Col span="8"  push="2">
          <div class="card-content-title-three">3#压缩机
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="8" push="4">
          <div class="card-content-three">
            {{temperature.dischargeTemperature1}}
          </div>
          </Col>
          <Col span="8" push="3">
          <div class="card-content-three">
            {{temperature.dischargeTemperature2}}
          </div>
          </Col>
          <Col span="8" push="2">
          <div class="card-content-three">
            {{temperature.dischargeTemperature3}}
          </div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="12" >
          <div class="card-content-vip-only">
            <img src="../assets/temperature.png" height="26" width="26"/>
            <div class="card-content-title-only">吸气温度
            </div>
          </div>
          </Col>
          <Col span="12" >
          </Col>
        </Row>
        <Row>
          <Col span="8" push="4">
          <div class="card-content-title-three">1#压缩机
          </div>
          </Col>
          <Col span="8" push="3" >
          <div class="card-content-title-three">2#压缩机
          </div>
          </Col>
          <Col span="8"  push="2">
          <div class="card-content-title-three">3#压缩机
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="8" push="4">
          <div class="card-content-three">
            {{temperature.suctionTemperature1}}
          </div>
          </Col>
          <Col span="8" push="3">
          <div class="card-content-three">
            {{temperature.suctionTemperature2}}
          </div>
          </Col>
          <Col span="8" push="2">
          <div class="card-content-three">
            {{temperature.suctionTemperature3}}
          </div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="12" >
          <div class="card-content-vip-only">
            <img src="../assets/temperature.png" height="26" width="26"/>
            <div class="card-content-title-only">盘管温度
            </div>
          </div>
          </Col>
          <Col span="12" >
          </Col>
        </Row>
        <Row>
          <Col span="8" push="4">
          <div class="card-content-title-three">1#压缩机
          </div>
          </Col>
          <Col span="8" push="3" >
          <div class="card-content-title-three">2#压缩机
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="8" push="4">
          <div class="card-content-three">
            {{temperature.coilTemperature1}}
          </div>
          </Col>
          <Col span="8" push="3">
          <div class="card-content-three">
            {{temperature.coilTemperature2}}
          </div>
          </Col>
        </Row>
      </div>
      <div class="left-content" >
        <div class="card-title">
          实时输出状态
        </div>
        <div style="margin: 5%;">
          <Row style="margin-bottom: 8px">
            <img src="../assets/wind.png" height="26" width="26" style="float: left"/>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left">烤房风机正传</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(255,206,85,1);margin-left: 30px" v-show="output.fanTurn">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(78,167,196,1);margin-left: 30px" v-show="!output.fanTurn">已停止</div>
          </Row>
          <Row style="margin-bottom: 8px">
            <img src="../assets/wind.png" height="26" width="26" style="float: left"/>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left">烤房风机反传</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(255,206,85,1);margin-left: 30px" v-show="output.fanReversal">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(78,167,196,1);margin-left: 30px" v-show="!output.fanReversal">已停止</div>
          </Row>
          <Row style="margin-bottom: 8px">
            <img src="../assets/wind.png" height="26" width="26" style="float: left"/>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left">进风风机</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(255,206,85,1);margin-left: 30px" v-show="output.fanAirIn">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(78,167,196,1);margin-left: 30px" v-show="!output.fanAirIn">已停止</div>
          </Row>
          <Row style="margin-bottom: 8px">
            <img src="../assets/wind.png" height="26" width="26" style="float: left"/>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left">出风风机</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(255,206,85,1);margin-left: 30px" v-show="output.fanAirOut">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(78,167,196,1);margin-left: 30px" v-show="!output.fanAirOut">已停止</div>
          </Row>
          <Row style="margin-bottom: 8px">
            <img src="../assets/wind.png" height="26" width="26" style="float: left"/>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left" >排热风机</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(255,206,85,1);margin-left: 30px" v-show="output.fanHeatExtraction">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(78,167,196,1);margin-left: 30px" v-show="!output.fanHeatExtraction">已停止</div>
          </Row>
          <Row style="margin-bottom: 8px">
            <img src="../assets/hot.png" height="26" width="26" style="float: left"/>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left" >辅助加热</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(255,206,85,1);margin-left: 30px" v-show="output.auxiliaryHeating">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;float: left;color: rgba(78,167,196,1);margin-left: 30px" v-show="!output.auxiliaryHeating">已停止</div>
          </Row>
          <Row style="margin-bottom: 8px">
            <Col span="6">
            <div class="card-content-title-three">
              &nbsp;
            </div>
            </Col>
            <Col span="6">
            <div class="card-content-title-three">
              1#压缩机
            </div>
            </Col>
            <Col span="6">
            <div class="card-content-title-three">
              2#压缩机
            </div>
            </Col>
            <Col span="6">
            <div class="card-content-title-three">
              3#压缩机
            </div>
            </Col>
          </Row>
          <Row style="margin-bottom: 8px">
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;">压缩机</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px" v-show="output.compressor1">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(78,167,196,1);margin-left: 10px" v-show="!output.compressor1">已停止</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px" v-show="output.compressor2">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(78,167,196,1);margin-left: 10px" v-show="!output.compressor2">已停止</div>

            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px" v-show="output.compressor3">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(78,167,196,1);margin-left: 10px" v-show="!output.compressor3">已停止</div>

            </Col>
          </Row>
          <Row style="margin-bottom: 8px">
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;">回气加热</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px" v-show="output.returnAirHeat1">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(78,167,196,1);margin-left: 10px" v-show="!output.returnAirHeat1">已停止</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px" v-show="output.returnAirHeat2">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(78,167,196,1);margin-left: 10px" v-show="!output.returnAirHeat2">已停止</div>

            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px" v-show="output.returnAirHeat3">运行中</div>
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(78,167,196,1);margin-left: 10px" v-show="!output.returnAirHeat3">已停止</div>

            </Col>
          </Row>
          <Row style="margin-bottom: 5px">
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;">累计运行（h）</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px">{{output.compressorRunningTime1}}</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px">{{output.compressorRunningTime2}}</div>

            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px">{{output.compressorRunningTime3}}</div>

            </Col>
          </Row>
          <Row>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;">膨胀阀开度（%）</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px">{{output.electronicExpansionValve1}}</div>
            </Col>
            <Col span="6">
            <div style="font-size: 14px;font-weight: 400;min-width: 60px;color: rgba(255,206,85,1);margin-left: 10px">{{output.electronicExpansionValve2}}</div>

            </Col>
          </Row>
        </div>
      </div>
    </Col>
    <Col span="14">
      <div class="main-center">
        <Row type="flex" justify="center">
          <Col span="8">
          <div class="main-left-line">
            <div class="main-left-line-top"></div>
            <div class="main-left-line-bottom"></div>
          </div>
          </Col>
          <Col span="8" >
          <div class="main-center-text">
            种植烘烤可追溯物联网系统
          </div>
          </Col>
          <Col span="8" >
          <div class="main-right-line">
            <div class="main-right-line-top"></div>
            <div class="main-right-line-bottom"></div>
          </div>
          </Col>
        </Row>
      </div>
    <div  class="main-center" style="margin-bottom: 5px;">
      <Button @click="loginout"  class="btn-loginout" style="border: 1px solid #28D4FF !important;color: #fff !important;">退出监控中心</Button>
    </div>
      <div class="main-center" style="padding-top: 0px;margin-bottom: 5px">
        <Select style="width:200px;float: left;" placeholder="分公司" :transfer="true" v-model="companyId" @on-change="companyChange">
          <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select v-show="cooperationList.length > 1" style="width:200px;float: left;margin-left: 10px" placeholder="合作社" :transfer="true" v-model="cooperationId" @on-change="cooperationChange">
          <Option v-for="item in cooperationList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select  v-show="houseList.length > 1" style="width:200px;float: left;margin-left: 10px" placeholder="运行烤房" :transfer="true" v-model="houseId" @on-change="houseChange" :label-in-value="true">
          <Option v-for="item in houseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <!--<Button @click="loginout"  class="btn-loginout" style="border: 1px solid #28D4FF !important;color: #fff !important;">退出监控中心</Button>-->
      </div>
    <div class="main-center" style="padding: 0px">
      <div style="font-size: 18px;margin-top: 15px;color: #ccc;text-align: center" >
        &nbsp;
        <span v-show="houseList.length < 2" >
        {{houseName}}
        </span>
        &nbsp;</div>
    </div>
      <div class="main-center">
        <div class="main-content-map">
          <!--<div class="card-title">-->
            <!--地域分布-->
          <!--</div>-->
          <div class="main-content-left-top"></div>
          <div class="main-content-right-top"></div>
          <div class="main-content-left-bottom"></div>
          <div class="main-content-right-bottom"></div>
          <div class="main-map" id="map">
          </div>
          <!--<div class="mask-map"></div>-->
        </div>
      </div>
      <div class="main-center" style="padding-top: 0px">
        <!--<div class="main-content-notice">-->
         <div class="main-content-notice">
           <div class="box3Notice">
             <Col class="textAlarm" v-for="(item,index) in newsListNotice" :key="index" v-if="newsListNotice.length !== 0">
             正在烘烤：{{item.companyName}}{{item.cooperationName}}{{item.name}}  已烘烤时间：{{item.elapsedTime}}
             </Col>
             <Col class="textAlarm1" v-if="newsListNotice.length === 0">
             暂无烤房信息
             </Col>
           </div>
           <div class="box4Notice" ></div>
         </div>
        <!--</div>-->
      </div>
    </Col>
    <Col span="5">
      <div class="right-content">
        <div class="card-title">
          烤房统计
        </div>
        <div class="card-bar" id="card-bar"></div>
      </div>
    <div class="right-content">
      <div class="card-title">
        烤房图片
      </div>
      <div style="height: 200px">
        <Carousel autoplay v-model="value3">
          <CarouselItem v-if="imgList.length > 0" v-for="(item, index) in imgList" :key="index">
            <div class="demo-carousel">
              <!--{{item.url}}-->
              <img :src="item.url" style="width: 100%;height: 200px"/>
            </div>
          </CarouselItem>
          <CarouselItem v-if="imgList.length === 0">
            <div class="demo-carousel">
              <!--{{item.url}}-->
              <div class="textAlarm1" style="color: #FF9600;height: 200px;padding-top: 50px">
                暂无照片
              </div>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
      <div class="right-content">
        <div class="card-title">
          烤房视频
        </div>
        <div class="card-content-video">
          <div class="textAlarm1" style="color: #FF9600;height: 200px;padding-top: 50px" v-show="videoList.url === undefined">
            暂无视频
          </div>
          <!--<video class="videoClass" id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay style="height: 100%;width: 100%;margin-top: 0px;padding-top: 0px">-->
            <!--<source :src="http_url" type="application/x-mpegURL" />-->
          <!--</video>-->
          <!--v-show="videoList.url !== undefined"-->
          <div id="playWind" class="playWind" style="height: 26vh;width: 100%;text-align: center" v-show="videoList.url !== undefined">
            <img src="../assets/videoBackgroup.jpg" style="height: 100%;width: 100%"/>
          </div>
          <div class="mask-video" v-show="videoList.url !== undefined">
            <Icon type="md-play" color="#fff" size="60" @click="playVideo(videoList)"/>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</div>
</template>

<script>
import $ from 'jquery'
import infoBox from '@/utils/InfoBox.min.js'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import ezuikit from '../../static/ezuikit.js'
import { getCompanySelect, getCooperationMap, getTemperature, getOutputInfor, getImg, getVideo, getCooperationSelect, getHouseSelect, getHouseRunningInfor } from '../api/api'
export default {
  data () {
    return {
      flag: true,
      houseList: [],
      cooperationList: [],
      houseId: '',
      cooperationId: '',
      showVideo: false,
      imgList: [],
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover'
      },
      index: 0,
      time: '',
      echartsDates: {
        x: [],
        totalY: [],
        runningY: []
      },
      cooperationName: '',
      houseName: '',
      rtmp_url: '',
      http_url: '',
      ez_url: '',
      token: '',
      player: '',
      output: {
        houseId: '',
        auxiliaryHeating: false,
        compressor1: false,
        compressor2: false,
        compressor3: false,
        compressorRunningTime1: '-',
        compressorRunningTime2: '-',
        compressorRunningTime3: '-',
        compressorStatus1: false,
        compressorStatus2: false,
        compressorStatus3: false,
        electronicExpansionValve1: '-',
        electronicExpansionValve2: '-',
        fanAirIn: false,
        fanAirOut: false,
        fanHeatExtraction: false,
        fanReversal: false,
        fanTurn: false,
        returnAirHeat1: false,
        returnAirHeat2: false,
        returnAirHeat3: false,
        unitStatus: false
      },
      temperature: {
        houseId: '',
        houseTemperature: '-',
        overtemperature: '-',
        suctionTemperature1: '-',
        suctionTemperature2: '-',
        suctionTemperature3: '-',
        houseHumidity: '-',
        environmentTemperature: '-',
        dischargeTemperature3: '-',
        dischargeTemperature2: '-',
        dischargeTemperature1: '-',
        coilTemperature3: '-',
        coilTemperature2: '-',
        coilTemperature1: '-'
      },
      province: '',
      companyId: '',
      title: '绿地领海大厦合作社绿地领海804烤房',
      pointArray: [],
      lastInfoWindow: null,
      markersArr: [],
      map: '',
      list: [],
      companyList: [],
      cardTime: null,
      count: 0,
      userId: '',
      userMapTime: 1000,
      mytimerMap: null,
      areaNotice: '',
      mytimerNotice: null,
      timeNotice: 150,
      box3Notice: '',
      box4Notice: '',
      newsListNotice: [],
      videoList: {},
      mytimerHouse: null
    }
  },
  created: function () {
  },
  mounted () {
    this.index = 0
    this.loadmap()
    this.getCompanylist()
    if (this.$route.params.params !== undefined) {
      this.flag = false
      this.companyId = this.$route.params.params.companyId
      this.cooperationId = this.$route.params.params.cooperationId
      this.houseId = this.$route.params.params.houseId
    }
    let th = this
    this.$nextTick(() => {
      th.areaNotice = document.querySelector('.main-content-notice')
    })
  },
  destroyed: function () {
    // console.log(8888)
    window.clearTimeout(this.mytimerNotice)
    window.clearInterval(this.mytimerHouse)
  },
  methods: {
    loadmap () {
      const map = new BMap.Map('map', { enableMapClick: false })
      this.map = map
      map.disableDragging()
      // 设置地图中心坐标
      map.centerAndZoom('北京', 6)
      // this.addBoundary(map)
      // 设置地图鼠标滚轮放大缩小
      // map.enableScrollWheelZoom()
    },
    getDistribution () {
      this.pointArray = []
      this.markersArr = []
      this.echartsDates = {
        x: [],
        totalY: [],
        runningY: []
      }
      this.map.clearOverlays()
      let par = {
        companyId: this.companyId
      }
      getCooperationMap(par).then((res) => {
        if (res.data.code === 1000) {
          // console.log(res.data.content)
          this.list = res.data.content
          this.province = this.list[0].province
          let s = {}
          let pointArr = []
          this.echartsDates = {
            x: [],
            totalY: [],
            runningY: []
          }
          for (let i = 0; i < this.list.length; i++) {
            s.total = this.list[i].count
            s.runNum = this.list[i].runCount
            s.errorNum = this.list[i].troubleCount
            s.stopNum = this.list[i].disableCount
            s.address = this.list[i].address
            let gpsX = this.list[i].address_x
            let gpsY = this.list[i].address_y
            s.name = this.list[i].name
            s.id = this.list[i].id
            s.companyId = this.list[i].companyId
            this.echartsDates.x.push(this.list[i].name)
            this.echartsDates.totalY.push(this.list[i].count)
            this.echartsDates.runningY.push(this.list[i].runCount)
            s.point = new BMap.Point(gpsX, gpsY)
            pointArr.push(s.point)
            this.pointArray.push(s.point)
            let map = this.map
            this.addMarker(map, s, pointArr)
          }
          this.addBoundary(this.map)
          this.getCoooperationHouseInfor()
        } else {
          this.list = []
          this.echartsDates = {
            x: [],
            totalY: [],
            runningY: []
          }
        }
        this.drawLine('card-bar', this.echartsDates)
      })
    },
    addBoundary (map) {
      var bdary = new BMap.Boundary()
      bdary.get(this.province, function (rs) {
        // map.clearOverlays()
        var count = rs.boundaries.length
        if (count === 0) {
          // alert('未能获取当前输入行政区域')
          // return ;
        }
        var pointArray = []
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: '#3B9BFF'})
          map.addOverlay(ply)
          pointArray = pointArray.concat(ply.getPath())
        }
        // map.setViewport(pointArray)
      })
    },
    addMarker (map, s, pointArr) {
      var thi = this
      var marker
      var myIcon = new BMap.Icon(require('@/assets/标注1.png'), new BMap.Size(45, 60), {anchor: new BMap.Size(14, 25), infoWindowAnchor: new BMap.Size(8, -16)})
      marker = new BMap.Marker(s.point, {icon: myIcon})
      map.addOverlay(marker)
      thi.markersArr.push(marker)
      // 将标注移动到视野
      // map.setViewport(pointArr)
    },
    addInfoWindow (index) {
      var sContent = '<div style="position: relative">' +
        "<div style='border-bottom: 1px solid #009CFF;line-height:30px;font-size:16px;margin-bottom: 10px'>" + this.list[index].name + '</div>' +
        "<div style='height:25px;'>烤房总数：&nbsp;" + this.list[index].count + '</div>' +
        "<div style='height:25px;'>运行烤房数量：&nbsp;" + this.list[index].runCount + '</div>' +
        "<div style='height:25px;'>故障烤房数量：&nbsp;" + this.list[index].troubleCount + '</div>' +
        "<div style='height:25px;'>停用烤房数量：&nbsp;" + this.list[index].disableCount + '</div>' +
        '<div style="word-wrap:break-word">合作社地址：&nbsp;' + this.list[0].address + '</div>' +
        "<div style='position: absolute;bottom:-34px;left:0;right:0;margin-left: auto;margin-right: auto;width:0;height: 0;border-top:20px solid #040e2e;border-left:10px solid transparent;border-right:10px solid transparent'>" + '</div>' +
        '</div>'
      var opts = {
        boxStyle: {
          width: '300px',
          background: '#040e2e',
          borderRadius: '8px',
          padding: '10px 20px 20px',
          color: '#fff',
          fontSize: '14px',
          border: '1px solid #009CFF'
        }
      }
      if (this.lastInfoWindow) {
        // 判断上一个窗体是否存在，若存在则执行close
        this.lastInfoWindow.close()
      }
      let pointArray = []
      let gpsX = this.list[index].address_x
      let gpsY = this.list[index].address_y
      pointArray.push(new BMap.Point(gpsX, gpsY))
      var infoWindow =  new BMapLib.InfoBox(this.map, sContent, opts)
      infoWindow.open(this.markersArr[index])
      // this.map.setViewport(this.pointArray)
      this.map.centerAndZoom(pointArray, 20)
      // this.map.setViewport(this.pointArray)
      this.lastInfoWindow = infoWindow
    },
    getCompanylist () {
      getCompanySelect().then((res) => {
        if (res.data.code === 1000) {
          this.companyList = res.data.content
          if (this.companyId === '') {
            this.companyId = this.companyList[0].id
          }
          // console.log(this.companyId)
          this.getCooperationlist(this.companyId)
          this.getNewsList(this.companyId)
        }
      })
    },
    companyChange (change) {
      this.houseName = ''
      this.list = []
      window.clearTimeout(this.mytimerNotice)
      window.clearInterval(this.mytimerHouse)
      this.getDistribution()
      this.getCooperationlist(this.companyId)
      this.getNewsList(this.companyId)
    },
    getCooperationlist (par) {
      if (this.flag === true) {
        this.cooperationId = ''
      }
      this.cooperationList = []
      let para = {
        companyId: par
      }
      getCooperationSelect(para).then((res) => {
        if (res.data.code === 1000) {
          this.cooperationList = res.data.content
          // console.log(this.cooperationId)
          // console.log(this.cooperationId === '')
          if (this.cooperationId === '' || this.cooperationId === undefined) {
            this.cooperationId = this.cooperationList[0].id
          }
          this.gethouselist(this.cooperationId)
          this.getDistribution()
        } else {
          this.houseId = ''
          this.houseList = []
        }
      })
    },
    cooperationChange (change) {
      this.houseName = ''
      window.clearInterval(this.mytimerHouse)
      this.gethouselist(this.cooperationId)
      this.getCoooperationHouseInfor()
    },
    gethouselist (par) {
      if (this.flag === true) {
        this.houseId = ''
      }
      this.houseList = []
      let para = {
        cooperationId: par
      }
      getHouseSelect(para).then((res) => {
        if (res.data.code === 1000) {
          // console.log(res.data.content)
          this.houseList = res.data.content
          if (this.houseId === '') {
            this.houseId = this.houseList[0].id
            this.houseName = this.houseList[0].name
          }
        }
        this.getHouseInfor(this.houseId)
      })
    },
    houseChange (change) {
      // console.log(change)
      this.houseId = change.value
      this.houseName = change.label
      window.clearInterval(this.mytimerHouse)
      this.getHouseInfor(change.value)
    },
    getCoooperationHouseInfor () {
      let vm = this
      for (let i = 0; i < vm.list.length; i++) {
        if (vm.list[i].id === vm.cooperationId) {
          vm.addInfoWindow(i)
        }
      }
    },
    getHouseInfor (id) {
      window.clearInterval(this.mytimerHouse)
      if (id !== '') {
        for (let d of this.houseList) {
          if (d.id === id) {
            this.getImgList(id, d.bakeId)
            this.getUrl(d.bakeId)
          }
        }
        let vm = this
        vm.$nextTick(() => {
          vm.getTemperatureFunction(id)
          vm.getOutputInforFunction(id)
          vm.mytimerHouse = setInterval(function () {
            vm.getTemperatureFunction(id)
            vm.getOutputInforFunction(id)
          }, 10000)
        })
      } else {
        this.temperature = {
          houseId: '',
          houseTemperature: '-',
          overtemperature: '-',
          suctionTemperature1: '-',
          suctionTemperature2: '-',
          suctionTemperature3: '-',
          houseHumidity: '-',
          environmentTemperature: '-',
          dischargeTemperature3: '-',
          dischargeTemperature2: '-',
          dischargeTemperature1: '-',
          coilTemperature3: '-',
          coilTemperature2: '-',
          coilTemperature1: '-'
        }
        this.output = {
          houseId: '',
          auxiliaryHeating: false,
          compressor1: false,
          compressor2: false,
          compressor3: false,
          compressorRunningTime1: '-',
          compressorRunningTime2: '-',
          compressorRunningTime3: '-',
          compressorStatus1: false,
          compressorStatus2: false,
          compressorStatus3: false,
          electronicExpansionValve1: '-',
          electronicExpansionValve2: '-',
          fanAirIn: false,
          fanAirOut: false,
          fanHeatExtraction: false,
          fanReversal: false,
          fanTurn: false,
          returnAirHeat1: false,
          returnAirHeat2: false,
          returnAirHeat3: false,
          unitStatus: false
        }
        this.imgList = []
        this.videoList = {}
      }
    },
    getTemperatureFunction (id) {
      this.temperature = {
        houseId: '',
        houseTemperature: '-',
        overtemperature: '-',
        suctionTemperature1: '-',
        suctionTemperature2: '-',
        suctionTemperature3: '-',
        houseHumidity: '-',
        environmentTemperature: '-',
        dischargeTemperature3: '-',
        dischargeTemperature2: '-',
        dischargeTemperature1: '-',
        coilTemperature3: '-',
        coilTemperature2: '-',
        coilTemperature1: '-'
      }
      let par = {
        houseId: id
      }
      getTemperature(par).then((res) => {
        if (res.data.code === 1000) {
          let dates = res.data.content
          if (dates !== undefined) {
            this.temperature = {
              houseId: dates.houseId === null && dates.houseId === '' ? '' : dates.houseId,
              houseTemperature: dates.houseTemperature === null && dates.houseTemperature === '' ? '-' : dates.houseTemperature,
              overtemperature: dates.overtemperature === null && dates.overtemperature === '' ? '-' : dates.overtemperature,
              suctionTemperature1: dates.suctionTemperature1 === null && dates.suctionTemperature1 === '' ? '-' : dates.suctionTemperature1,
              suctionTemperature2: dates.suctionTemperature2 === null && dates.suctionTemperature2 === '' ? '-' : dates.suctionTemperature2,
              suctionTemperature3: dates.suctionTemperature3 === null && dates.suctionTemperature3 === '' ? '-' : dates.suctionTemperature3,
              houseHumidity: dates.houseHumidity === null && dates.houseHumidity === '' ? '-' : dates.houseHumidity,
              environmentTemperature: dates.environmentTemperature === null && dates.environmentTemperature === '' ? '-' : dates.environmentTemperature,
              dischargeTemperature3: dates.dischargeTemperature3 === null && dates.dischargeTemperature3 === '' ? '-' : dates.dischargeTemperature3,
              dischargeTemperature2: dates.dischargeTemperature2 === null && dates.dischargeTemperature2 === '' ? '-' : dates.dischargeTemperature2,
              dischargeTemperature1: dates.dischargeTemperature1 === null && dates.dischargeTemperature1 === '' ? '-' : dates.dischargeTemperature1,
              coilTemperature3: dates.coilTemperature3 === null && dates.coilTemperature3 === '' ? '-' : dates.coilTemperature3,
              coilTemperature2: dates.coilTemperature2 === null && dates.coilTemperature2 === '' ? '-' : dates.coilTemperature2,
              coilTemperature1: dates.coilTemperature1 === null && dates.coilTemperature1 === '' ? '-' : dates.coilTemperature1
            }
          }
          // this.mytimerHouseTemperrature = setTimeout(this.getTemperatureFunction(id), 100000)
        }
      })
    },
    getOutputInforFunction (id) {
      this.output = {
        houseId: '',
        auxiliaryHeating: false,
        compressor1: false,
        compressor2: false,
        compressor3: false,
        compressorRunningTime1: '-',
        compressorRunningTime2: '-',
        compressorRunningTime3: '-',
        compressorStatus1: false,
        compressorStatus2: false,
        compressorStatus3: false,
        electronicExpansionValve1: '-',
        electronicExpansionValve2: '-',
        fanAirIn: false,
        fanAirOut: false,
        fanHeatExtraction: false,
        fanReversal: false,
        fanTurn: false,
        returnAirHeat1: false,
        returnAirHeat2: false,
        returnAirHeat3: false,
        unitStatus: false
      }
      let par = {
        houseId: id
      }
      getOutputInfor(par).then((res) => {
        if (res.data.code === 1000) {
          let dates = res.data.content
          if (dates !== undefined) {
            this.output = {
              houseId: dates.houseId,
              auxiliaryHeating: dates.auxiliaryHeating,
              compressor1: dates.compressor1,
              compressor2: dates.compressor2,
              compressor3: dates.compressor3,
              compressorRunningTime1: dates.compressorRunningTime1,
              compressorRunningTime2: dates.compressorRunningTime2,
              compressorRunningTime3: dates.compressorRunningTime3,
              compressorStatus1: dates.compressorStatus1,
              compressorStatus2: dates.compressorStatus2,
              compressorStatus3: dates.compressorStatus3,
              electronicExpansionValve1: dates.electronicExpansionValve1,
              electronicExpansionValve2: dates.electronicExpansionValve2,
              fanAirIn: dates.fanAirIn,
              fanAirOut: dates.fanAirOut,
              fanHeatExtraction: dates.fanHeatExtraction,
              fanReversal: dates.fanReversal,
              fanTurn: dates.fanTurn,
              returnAirHeat1: dates.returnAirHeat1,
              returnAirHeat2: dates.returnAirHeat2,
              returnAirHeat3: dates.returnAirHeat3,
              unitStatus: dates.unitStatus
            }
          }
          // this.mytimerHouseOutput = setTimeout(this.getOutputInforFunction(id), 10000)
        }
      })
    },
    getImgList (id, backId) {
      this.imgList = []
      let para = {
        houseId: id,
        bakeId: backId
      }
      getImg(para).then((res) => {
        if (res.data.code === 1000) {
          this.imgList = res.data.content
        } else {
          this.imgList = []
        }
      })
    },
    getUrl (id) {
      this.videoList = {}
      let para = {
        bakeId: id
      }
      getVideo(para).then((res) => {
        if (res.data.code === 1000) {
          this.videoList = {
            token: res.data.content.accessToken,
            url: res.data.content.address
          }
        } else {
          this.videoList = {}
        }
      })
    },
    playVideo (item) {
      let c = {
        companyId: this.companyId,
        cooperationId: this.cooperationId,
        houseId: this.houseId,
        company: this.companyId,
        cooperation: this.cooperationId,
        house: this.houseName
      }
      this.$router.push({name: 'monitor_video', params: {params: c, item: item}})
    },
    loginout () {
      clearTimeout(this.mytimerNotice)
      this.$router.push({path: '/'})
    },
    // mytimerHouse
    getNewsList (id) {
      let vm = this
      vm.newsListNotice = []
      let par = {
        companyId: id
      }
      getHouseRunningInfor(par).then((res) => {
        // console.log(res)
        if (res.data.code === 1000) {
          let data = res.data.content
          if (data !== undefined && data.length > 0) {
            vm.newsListNotice = data
            vm.mytimerNotice = setTimeout(vm.stockUpNotice, vm.timeNotice)
          } else {
            vm.newsListNotice = []
          }
        }
      })
    },
    // 公告滚动
    stockUpNotice () {
      let vm = this
      vm.$nextTick(() => {
        vm.box3Notice = document.querySelector('.box3Notice')
        vm.box4Notice = document.querySelector('.box4Notice')
        if (vm.box4Notice !== null && vm.box3Notice !== null) {
          if (vm.newsListNotice.length <= 3 && vm.newsListNotice.length >= 0) {
            vm.box4Notice.innerHTML = ''
          } else if (vm.newsListNotice.length > 3) {
            vm.box4Notice.innerHTML = vm.box3Notice.innerHTML
          }
        }
        if (vm.areaNotice !== null && vm.newsListNotice.length > 3) {
          if (vm.areaNotice.scrollTop >= vm.box3Notice.offsetHeight) {
            vm.areaNotice.scrollTop = 0
          } else {
            vm.areaNotice.scrollTop = vm.areaNotice.scrollTop + 2
          }
        }
        vm.mytimerNotice = setTimeout(vm.stockUpNotice, vm.timeNotice)
      })
    },
    // 图表
    drawLine (id, edata) {
      let vm = this
      if (document.getElementById(id) === null) {
        return false
      }
      let _chart = {}
      _chart[id] = echarts.init(document.getElementById(id))
      vm.chart = Object.assign({}, vm.chart, _chart)
      vm['chart'][id].setOption({
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        grid: {
          left: '8%',
          right: '15%',
          width: 'auto',
          height: 'auto',
          containLabel: true
        },
        legend: {
          top: 0,
          right: 14,
          itemGap: 10,
          itemWidth: 30,
          itemHeight: 10,
          textStyle: {
            color: '#fff',
            fontWeight: 'lighter'
          },
          data: ['总烤房数', '正在运行烤房数']
        },
        xAxis: {
          type: 'category',
          interval: 0,
          name: '合作社',
          nameTextStyle: {
            fontSize: 12,
            color: '#fff'
          },
          axisLabel: {
            show: true,
            textStyle: {
              align: 'left',
              fontSize: 12,
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          boundaryGap: false,
          data: edata.x
          // data: edata.xAxis !== undefined ? edata.xAxis : []
        },
        yAxis: [{
          name: '数量(个)',
          type: 'value',
          nameTextStyle: {
            fontSize: 12,
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          }
        }],
        color: ['#5594ed', '#fff'],
        series: [{
          name: '总烤房数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(143,161,255, 1)'
              }, {
                offset: 0.8,
                color: 'rgba(143,161,255, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(143,161,255)',
              borderColor: 'rgba(143,161,255, 0.27)',
              borderWidth: 12

            }
          },
          data: edata.totalY
        }, {
          name: '正在运行烤房数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(228, 184, 51, 1)'
              }, {
                offset: 0.8,
                color: 'rgba(228, 184, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(228, 184, 51)',
              borderColor: 'rgba(228, 184, 51,0.2)',
              borderWidth: 12

            }
          },
          data: edata.runningY
        }
        ]
      })
    }
  }
}
</script>

<style scoped>
  .body {
    background: #040e2e;
    padding:0 20px;
    padding-top: 2vh;
    padding-bottom: 1vh;
    height: 100%;
    color: rgba(254,254,255,1);
    font-family: MicrosoftYaHei;
    min-width: 1000px;
    overflow-x: hidden;
  }
  .left-content {
    border: 1px solid #009CFF;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .left-content:first-child {
    border: 1px solid #009CFF;
    min-height: 47vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .left-content:last-child {
    border: 1px solid #009CFF;
    min-height: 48vh;
    text-align: left;
    margin-bottom: 0.8vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .right-content {
    border: 1px solid #009CFF;
    min-height: 31vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .right-content:last-child {
    border: 1px solid #009CFF;
    min-height: 32vh;
    text-align: left;
    margin-bottom: 1vh;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .card-title {
    height: 34px;
    padding: 5px;
    padding-left: 20px;
    font-size: 18px;
    font-weight:400;
    color:rgba(199,236,255,1);
    background: -webkit-linear-gradient(right, rgba(0,98,175,0), rgba(0,98,175,1));
    background: -o-linear-gradient(left, rgba(0,98,175,0), rgba(0,98,175,1));
    background: -moz-linear-gradient(left, rgba(0,98,175,0), rgba(0,98,175,1));
    background: linear-gradient(to left, rgba(0,98,175,0), rgba(0,98,175,1));
  }
  .main-center {
    padding: 10px 20px 20px 20px;
  }
  .main-left-line {
    margin-top: 12px;
    width: 100%;
    height: 18px;
    border-bottom: 3px solid rgba(0,98,175,0.8);
    border-top: 3px solid rgba(0,98,175,0.8);
    border-image: linear-gradient(right, rgba(0,98,175,1), rgba(0,98,175,0)) 50 10 !important;
    border-image: -webkit-linear-gradient(right, rgba(0,98,175,1), rgba(0,98,175,0))  50 10 !important;
    border-image: -moz-linear-gradient(right, rgba(0,98,175,1), rgba(0,98,175,0))  50 10 !important;
  }
  .main-left-line-bottom {
    transform: rotate(42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
    position: absolute;
    right:-13px;
    top:33px;
  }
  .main-left-line-top {
    position: absolute;
    right:-14px;
    top:7px;
    transform: rotate(-42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
  }
  .main-center-text {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    background-image: -webkit-linear-gradient(top, #fff, #28D4FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow:
      0 0 80px #009CFF,
      0 0 120px rgba(0,98,175,1);
  }
  .main-right-line {
    margin-top: 12px;
    width: 100%;
    height: 18px;
    border-bottom: 3px solid rgba(0,98,175,0.8);
    border-top: 3px solid rgba(0,98,175,0.8);
    border-image: linear-gradient(left, rgba(0,98,175,1), rgba(0,98,175,0)) 50 10 !important;
    border-image: -webkit-linear-gradient(left, rgba(0,98,175,1), rgba(0,98,175,0))  50 10 !important;
    border-image: -moz-linear-gradient(left, rgba(0,98,175,1), rgba(0,98,175,0))  50 10 !important;
  }
  .main-right-line-bottom {
    transform: rotate(-42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
    position: absolute;
    left:-13px;
    top:32px;
  }
  .main-right-line-top {
    position: absolute;
    left:-13px;
    top:7px;
    transform: rotate(42deg);
    width: 16px;
    background:linear-gradient(to left,rgba(0,98,175,1), rgba(0,98,175,1));height:2px;
  }
  .main-content-map {
    position: relative;
    border: 1px solid #009CFF;
    text-align: left;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
    /*background: url("../../assets/mapBackgroup.png") no-repeat center center;*/
  }
  .main-map {
    width: 100%;
    height: 60vh;
  }
  .mask-map {
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: absolute;*/
    /*top:0px;*/
    /*display: flex;*/
    /*!*z-index: 9999;*!*/
    /*opacity: 1;*/
  }
  .main-content-map:hover .mask-map{
    /*opacity: 1;*/
  }
  .main-content-notice {
    text-align: center;
    color: #FF9600;
    font-size: 20px;
    height: 5vh;
    min-height: 100px;
    overflow: hidden;
    border: 1px solid #009CFF;
    box-shadow: 0px 0px 15px 5px rgba(199,236,255,0.2) inset;
  }
  .btn-loginout {
    color: rgba(254,254,255,1);
    font-size: 14px;
    padding: 5px;
    float: right;
    /*margin-bottom: 10px;*/
    border: 1px solid #28D4FF;
    background: #040e2e;
  }
  .main-content-left-top {
    position: absolute;
    top: -3px;
    left: -3px;
    width: 20px;
    height: 20px;
    border-top: 2px solid #28D4FF;
    border-left: 2px solid #28D4FF;
  }
  .main-content-right-top {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 20px;
    height: 20px;
    border-top: 2px solid #28D4FF;
    border-right: 2px solid #28D4FF;
  }
  .main-content-left-bottom {
    position: absolute;
    bottom: -3px;
    left: -3px;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid #28D4FF;
    border-left: 2px solid #28D4FF;
  }
  .main-content-right-bottom {
    position: absolute;
    bottom: -3px;
    right: -3px;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid #28D4FF;
    border-right: 2px solid #28D4FF;
  }
  .card-content-vip {
    margin: 10%;
    position: relative;
  }
  .card-content-vip-only {
    margin: 3% 10% 3% 10%;
    position: relative;
  }
  .card-content-title {
    font-size: 14px;
    font-weight: 400;
    left: 30%;
    top: -20%;
    min-width: 60px;
    position: absolute;
  }
  .card-content-title-only {
    font-size: 14px;
    font-weight: 400;
    left: 30%;
    top: 5%;
    min-width: 60px;
    position: absolute;
  }
  .card-content-title-three {
    font-size: 12px;
    font-weight:bold;
    color:rgba(199,236,255,1);
    /*left: 50%;*/
    /*min-width: 60px;*/
    /*position: relative;*/
  }
  .card-content-three {
    font-size: 16px;
    font-weight:bold;
    color:rgba(255,206,85,1);
  }
  .card-content {
    font-size: 16px;
    font-weight:bold;
    color:rgba(255,206,85,1);
    left: 40%;
    top: 50%;
    min-width: 50px;
    position: absolute;
  }
  .card-bar {
    height: 250px;
  }
  .card-content-video {
    width: 100%;
    height: 100%;
    padding: 10px;
    position: relative;
    text-align: center;
  }
  .mask-video{
    width: 60px;
    height: 60px;
    position: absolute;
    left:0px;
    top:0px;
    bottom: 0;
    right: 0;
    margin: auto;
    opacity: 0;
  }
  .card-content-video:hover .mask-video{
    opacity: 1;
  }
  .textAlarm{
    padding: 5px 20px;
    font-size: 14px;
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .textAlarm1{
    text-align: center;
    font-size: 16px;
    margin-top: 20px;
  }
  .ivu-select-item-selected, .ivu-select-item-selected:hover{
    background-color: #009CFF !important;
    border-color: #009CFF !important;
  }
</style>
