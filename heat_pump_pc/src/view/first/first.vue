<template>
  <div class="body">
    <Row style="height: 100%">
      <Col span="24" style="height:865px">
        <div id="map"></div>
      </Col>
    </Row>
  </div>
</template>

<script>
import $ from 'jquery'
import infoBox from '@/utils/InfoBox.min.js'
import { cooperateDistribution } from '../../api/api'
export default {
  data () {
    return {
      map: '',
      list: [],
      lastInfoWindow: null
    }
  },
  methods: {
    loadmap () {
      const map = new BMap.Map('map', { enableMapClick: false })
      this.map = map
      // 设置地图中心坐标
      map.centerAndZoom('北京', 6)
      // 设置地图鼠标滚轮放大缩小
      map.enableScrollWheelZoom()
    },
    getDistribution () {
      cooperateDistribution().then((res) => {
        if (res.data.code === 1000) {
          this.list = res.data.content
          let pointArr = []
          for (let i = 0; i < this.list.length; i++) {
            let s = {}
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
            s.point = new BMap.Point(gpsX, gpsY)
            pointArr.push(s.point)
            let map = this.map
            this.addMarker(map, s, pointArr)
          }
          // 将标注移动到视野
          this.map.setViewport(pointArr)
          this.map.setZoom(6)
        } else if (res.data.code === 2001) {
          this.$Message.error(res.data.message)
          this.list = []
        } else {
          this.list = []
        }
      })
    },
    addMarker (map, s, pointArr) {
      var thi = this
      var marker
      var myIcon = new BMap.Icon(require('@/assets/location.png'), new BMap.Size(40, 55), {anchor: new BMap.Size(14, 25), infoWindowAnchor: new BMap.Size(16, -16)})
      marker = new BMap.Marker(s.point, {icon: myIcon})
      map.addOverlay(marker)
      // map.setViewport(pointArr)
      var sContent = '<div style="position: relative">' +
        "<div style='border-bottom: 1px solid #81E8D1;line-height:30px;font-size:16px;margin-bottom: 10px'>" + s.name + '</div>' +
        "<div style='height:25px;'>烤房总数：&nbsp;" + s.total + '</div>' +
        "<div style='height:25px;'>运行烤房数量：&nbsp;" + s.runNum + '</div>' +
        "<div style='height:25px;'>故障烤房数量：&nbsp;" + s.errorNum + '</div>' +
        "<div style='height:25px;'>停用烤房数量：&nbsp;" + s.stopNum + '</div>' +
        '<div style="word-wrap:break-word">合作社地址：&nbsp;' + s.address + '</div>' +
        "<div style='line-height:30px;text-align: center;font-size: 16px;cursor:pointer' id='checkBtn'>查看详情>></div>" +
        "<div style='position: absolute;bottom:-36px;left:0;right:0;margin-left: auto;margin-right: auto;width:0;height: 0;border-top:20px solid #00A47E;border-left:10px solid transparent;border-right:10px solid transparent'>" + '</div>' +
        '</div>'
      var opts = {
        boxStyle: {
          width: '300px',
          // height: '240px',
          background: '#00A47E',
          borderRadius: '8px',
          padding: '10px 20px 20px',
          color: '#fff',
          fontSize: '14px'
        },
        enableAutoPan: true,
        align: 1,
        closeIconUrl: require('@/assets/close.png'),
        closeIconMargin: '3px 10px',
        closeIconZIndex: 1,
        closeIconWidth: '15px'
      }
      var infoWindow =  new BMapLib.InfoBox(map, sContent, opts)
      // var infoWindow = new BMap.InfoWindow(sContent)// 创建信息窗口对象
      marker.addEventListener('mouseover', function (e) {
        marker.setTop(true)
        marker.enableDragging()
        if (thi.lastInfoWindow) {
          // 判断上一个窗体是否存在，若存在则执行close
          thi.lastInfoWindow.close()
        }
        thi.lastInfoWindow = infoWindow
        infoWindow.open(marker)
        $('#checkBtn').click(function () {
          let par = {
            companyId: s.companyId,
            cooperationId: s.id
          }
          console.log(par)
          thi.$router.push({name: 'tobacco_show', params: {firstParam: par}})
        })
      })
      marker.addEventListener('mouseout', function (e) {
        marker.setTop(false)
        // infoWindow.close(marker)
        // this.closeInfoWindow(infoWindow)
      })
      marker.addEventListener('click', function (e) {
        infoWindow.open(marker)
      })
    }
  },
  mounted () {
    this.loadmap()
  },
  created: function () {
    this.getDistribution()
  }
}
</script>

<style scoped>
  .body {
    font-family: '微软雅黑';
  }
  #map{
    width: 100%;
    height: 100%;
  }
  .BMap_pop{
    width: 300px;
    background: #00A47E;
  }
</style>
