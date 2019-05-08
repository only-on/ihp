<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">编辑烤房群</span>
        </div>
        <Button  @click="back" style="background-color: #82C225;color:#fff;width: 100px;height: 30px;float: right">返回</Button>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="updateModel" :label-width="150" ref="updateModel" :rules="ruleValidate">
          <Row type="flex" justify="center">
            <Col span="24" push="3">
            <FormItem label="烤房群名称" prop="name">
              <Input  v-model="updateModel.name"   placeholder="烤房群名称" style="width: 200px; float: left" @on-change="checkToname(updateModel.name)"></Input>
              <span v-if="nameNotice" class="notice">名称不超过30个字符</span>
              <br>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24"  push="3">
            <FormItem label="添加人员">
              <Row v-for="(item, index) in updateModel.roleList" :key="index" style="margin-bottom: 10px">
                <Col span="24">角色
                <Select v-model="item.type" style="width:100px;margin-left: 10px;margin-right: 10px;">
                  <Option value="1" label="管理员">
                    <span>管理员</span>
                  </Option>
                  <Option value="2" label="负责人">
                    <span>负责人</span>
                  </Option>
                </Select>
                姓名<Input type="text"  placeholder="姓名" style="width: 100px;margin-right: 10px;margin-left: 10px" v-model="item.name" @on-change="nameVal(index)"></Input>
                手机号码<Input type="text" @on-change="phoneVal(item.tel,index)"  placeholder="手机号码" style="width: 200px;margin-right: 10px;margin-left: 10px" v-model="item.tel"></Input>

                <Button type="text" style="color:#82C225;" @click="handleRemove(index)">删除</Button>
                </Col>
                <span class="notice" v-if="item.phoneNotice">请输入正确的手机号码</span>
                <span class="notice" v-if="item.nameNotice">请完善人员姓名</span>
                <span class="notice" v-if="item.telNotice">请完善人员手机号码</span>
              </Row>
              <Row type="flex" justify="start">
                <Col span="12">
                <Button  type="dashed"  @click="handleAdd" icon="plus-round">添加</Button>
                </Col>
              </Row>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24"  push="3">
            <FormItem label="网关编号" prop="gatewayId">
              <Input  v-model="updateModel.gatewayId"  style="width: 200px; float: left"  placeholder="网关编号 " @on-blur="checkGate(updateModel.gatewayId)"></Input>
              <span v-if="gateNotice" class="notice">请输入数字</span>
              <br>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" style="margin-bottom: 10px">
            <Col span="12"  pull="3">
            <FormItem label="详细地址" prop="addressDetail">
              <Input v-model="addressDetail" disabled placeholder="请在地图上搜索并选择地址"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center" style="height: 520px">
            <Col span="14">
            <div id="outer-box">
              <div id="container" class="map" tabindex="0"></div>
              <div id="panel" class="scrollbar1">
                <div id="searchBar">
                  <input id="searchInput" placeholder="输入关键字搜索地址" />
                </div>
                <div id="searchResults"></div>
              </div>
            </div>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="12" >
            <FormItem>
              <Button  @click="submit" style="background-color: #82C225;color:#fff;width: 100px">提交</Button>
              <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px; margin-left: 30px;">取消</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { updateTobocco, getToboccoDetail } from '../../../api/api'
export default {
  data () {
    return {
      nameNotice: false,
      gateNotice: false,
      addressDetail: '',
      updateModel: {
        id: '',
        gatewayId: '',
        name: '',
        addressDetail: '',
        roleList: [
          {
            name: '',
            telNotice: false,
            nameNotice: false,
            phoneNotice: false,
            tel: '',
            type: ''
          }
        ],
        province: '',
        city: '',
        district: ''
      },
      ruleValidate: {
        name: [
          {required: true, message: '烤房群名称不能为空', trigger: 'blur'}
        ],
        gatewayId: [
          {required: true, message: '网关编号不能为空', trigger: 'blur'}
        ],
        addressDetail: [
          {required: true, message: '地址不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.loadmap()
  },
  methods: {
    nameVal (index) {
      if (this.updateModel.roleList[index].name !== '') {
        this.updateModel.roleList[index].nameNotice = false
      }
    },
    // 网关编号校验
    checkGate (string) {
      var validate = /^[0-9]*[1-9][0-9]*$/
      if (string !== '' && string !== undefined) {
        if (validate.test(string.trim())) {
          this.gateNotice = false
        } else {
          this.gateNotice = true
        }
      } else {
        this.gateNotice = true
      }
    },
    // 烤烟房名称验证
    checkToname (string) {
      if (string !== '' && string !== undefined) {
        if (string.trim().length === 0 || string.trim().length > 30) {
          this.nameNotice = true
        } else {
          this.nameNotice = false
        }
      } else {
        this.nameNotice = true
      }
    },
    // 手机号码验证
    phoneVal (string, index) {
      if (string !== '' && string !== undefined) {
        var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (!validataPrice.test(string.trim())) {
          this.updateModel.roleList[index].phoneNotice = true
          this.updateModel.roleList[index].telNotice = false
        } else {
          // this.updateModel.roleList[index].telNotice = true
          this.updateModel.roleList[index].phoneNotice = false
        }
      } else {
        this.updateModel.roleList[index].telNotice = true
        this.updateModel.roleList[index].phoneNotice = true
      }
    },
    handleAdd () {
      if (this.updateModel.roleList.length > 0) {
        if (this.updateModel.roleList[this.updateModel.roleList.length - 1].name === '') {
          this.updateModel.roleList[this.updateModel.roleList.length - 1].nameNotice = true
        } else if (this.updateModel.roleList[this.updateModel.roleList.length - 1].tel === '') {
          this.updateModel.roleList[this.updateModel.roleList.length - 1].telNotice = true
        } else {
          var s = {
            name: '',
            tel: '',
            telNotice: false,
            nameNotice: false,
            phoneNotice: false,
            type: '1'
          }
          this.updateModel.roleList[this.updateModel.roleList.length - 1].telNotice = false
          this.updateModel.roleList.push(s)
        }
      } else {
        var s = {
          name: '',
          tel: '',
          telNotice: false,
          nameNotice: false,
          phoneNotice: false,
          type: '1'
        }
        this.updateModel.roleList.push(s)
      }
    },
    handleRemove (index) {
      this.updateModel.roleList.splice(index, 1)
    },
    submitManVal () {
      if (this.nameNotice) {
        this.$Message.error('烤房群名称不超过30个字符！')
        return false
      } else if (this.updateModel.roleList.length > 0 && this.updateModel.roleList[0].name === '' && this.updateModel.roleList[0].tel !== '') {
        this.updateModel.roleList[0].nameNotice = true
        this.$Message.error('请完善人员姓名！')
        this.nameNotice = true
        return false
      } else if (this.updateModel.roleList.length > 0 && this.updateModel.roleList[0].name !== '' && this.updateModel.roleList[0].tel === '') {
        this.updateModel.roleList[0].telNotice = true
        this.$Message.error('请完善人员手机号码！')
        this.telNotice = true
        return false
      } else if (this.updateModel.roleList.length > 1 && this.updateModel.roleList[this.updateModel.roleList.length - 1].name === '') {
        this.updateModel.roleList[this.updateModel.roleList.length - 1].nameNotice = true
        this.$Message.error('请完善人员姓名！')
        return false
      } else if (this.updateModel.roleList.length > 1 && this.updateModel.roleList[this.updateModel.roleList.length - 1].tel === '') {
        this.updateModel.roleList[this.updateModel.roleList.length - 1].telNotice = true
        this.$Message.error('请完善人员手机号码！')
        return false
      } else if (this.gateNotice) {
        this.$Message.error('网关编号请输入数字！')
        return false
      } else if (this.updateModel.roleList.length > 0 && this.updateModel.roleList[0].name === '' && this.updateModel.roleList[0].tel === '') {
        this.updateModel.roleList = []
        return true
      } else {
        return true
      }
    },
    //  新增
    submit () {
      if (this.submitManVal()) {
        this.$refs['updateModel'].validate((valid) => {
          if (valid) {
            updateTobocco(this.updateModel).then((res) => {
              if (res.data.code === 1000) {
                this.$router.push({name: 'tobaccoGroup_manage'})
                this.$Message.success('烤烟群修改成功！')
              } else {
                this.$Message.error(res.data.message)
              }
            })
          } else {
            this.$Message.error('信息验证失败!')
          }
        })
      }
    },
    back () {
      this.$router.push({name: 'tobaccoGroup_manage', params: {param: this.$route.params.param}})
    },
    loadmap () {
      let thi = this
      const map = new AMap.Map('container', {
        zoom: 13
      })
      var clickEventListener = map.on('click', function(e) {
        // console.log(e.lnglat.getLng() + '高德111111111111111')
        // console.log(e.lnglat.getLat() + '高德111111111111111')
        var PI = 3.14159265358979324 * 3000.0 / 180.0
        var x = e.lnglat.getLng()
        var y = e.lnglat.getLat()
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * PI)
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * PI)
        thi.updateModel.addressY = (z * Math.cos(theta) + 0.0065).toFixed(6)
        thi.updateModel.addressX = (z * Math.sin(theta) + 0.006).toFixed(6)
        // console.log(thi.updateModel.addressX + '纬度')
        // console.log(thi.updateModel.addressY)、
        // thi.updateModel.addressX = e.lnglat.getLat()
        // thi.updateModel.addressY = e.lnglat.getLng()
        var lng = e.lnglat.getLng()
        var lat = e.lnglat.getLat()
        var lnglatXY = [lng, lat]
        AMap.service('AMap.Geocoder',function() {
          var geocoder = new AMap.Geocoder({
          })
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // console.log(result)
              // console.log(result.regeocode.formattedAddress)
              // var address = result.regeocode.formattedAddress;
              thi.updateModel.province = result.regeocode.addressComponent.province
              thi.updateModel.city = result.regeocode.addressComponent.city
              thi.updateModel.district = result.regeocode.addressComponent.district
              var d = result.regeocode.addressComponent.province + result.regeocode.addressComponent.city + result.regeocode.addressComponent.district
              thi.updateModel.addressDetail = result.regeocode.formattedAddress.replace(d, '')
              // console.log(thi.updateModel.addressDetail)
              thi.addressDetail = result.regeocode.formattedAddress
            } else {
            }
          })
        })
      })
      AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
        var poiPicker = new PoiPicker({
          input: 'searchInput',
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          searchResultsContainer: 'searchResults'
        })
        poiPicker.on('poiPicked', function (poiResult) {
          // console.log(poiResult.item.location.toString())
          // console.log(poiResult.item.location)
          // console.log(poiResult.item.pname + poiResult.item.cityname + poiResult.item.adname + poiResult.item.address + poiResult.item.name)
          if (poiResult.item.pname !== undefined) {
            thi.updateModel.province = poiResult.item.pname
            thi.updateModel.city = poiResult.item.cityname
            thi.updateModel.district = poiResult.item.adname
            thi.updateModel.addressDetail = poiResult.item.address + poiResult.item.name
            thi.addressDetail = poiResult.item.pname + poiResult.item.cityname + poiResult.item.adname + poiResult.item.address + poiResult.item.name
          }
          var PI = 3.14159265358979324 * 3000.0 / 180.0
          var x = poiResult.item.location.lng
          var y = poiResult.item.location.lat
          var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * PI)
          var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * PI)
          thi.updateModel.addressY = (z * Math.cos(theta) + 0.0065).toFixed(6)
          thi.updateModel.addressX = (z * Math.sin(theta) + 0.006).toFixed(6)
          // console.log(thi.updateModel.addressX + '纬度')
          // console.log(thi.updateModel.addressY)
          // poiPicker.hideSearchResults()
          var source = poiResult.source
          var poi = poiResult.item
          if (source !== 'search') {
            poiPicker.searchByKeyword(poi.name)
          } else {
          }
        })
      })
    }
  },
  created: function () {
    let p = {
      id: this.$route.params.id
    }
    getToboccoDetail(p).then((res) => {
      if (res.data.code === 1000) {
        this.updateModel.id = res.data.content.id
        this.updateModel.name = res.data.content.name
        this.updateModel.gatewayId = res.data.content.gatewayId
        this.updateModel.regionAddress = res.data.content.regionAddress
        this.updateModel.addressDetail = res.data.content.addressDetail
        this.updateModel.addressX = res.data.content.addressX
        this.updateModel.addressY = res.data.content.addressY
        this.updateModel.roleList = res.data.content.roleList
        for(let s of this.updateModel.roleList) {
          s.type = s.type + ''
        }
        this.addressDetail = res.data.content.regionAddress + res.data.content.addressDetail
      }
    })
  }
}
</script>
<style scoped>
  .notice{
    color: #ED3F14;
    float: left;
    margin-left: 5px;
  }
  .layout-content-form{
    width:100%;
    background:#ffffff;
    padding:20px;
    padding-bottom :0px;
  }
  .body{
    background: #fff;
    overflow-x: hidden;
  }
  .head{
    margin:30px;
    margin-top: 10px;
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


  #outer-box {
    height: 300px;
    width: 100%;
    padding: 300px;
    padding-bottom: 50px;
  }

  #container {
    height: 500px;
    width: 100%;
  }

  #panel {
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 0px;
    height: 500px;
    overflow: hidden;
    width: 300px;
    z-index: 999;
    overflow-x: hidden;
    background: #fff;
  }
  #searchBar {
    height: 30px;
    background: #ccc;
  }

  #searchInput {
    width: 300px;
    height: 30px;
    line-height: 30%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border:1px solid #ccc;
    padding: 0 5px;
  }

  #searchResults {
    width: 300px;
    overflow-x: hidden;
    height: 500px;
  }

  .amap_lib_placeSearch,
  .amap-ui-poi-picker-sugg-container {
    border: none!important;
  }

  .amap_lib_placeSearch .poibox.highlight {
    background-color: #CAE1FF;
  }

  .poi-more {
    display: none!important;
  }
</style>
