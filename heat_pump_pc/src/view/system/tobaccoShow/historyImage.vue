<template>
    <div>
      <Row>
        <Select v-model="param.userId" style="width:200px;margin-right: 20px" placeholder="操作员" clearable @on-change="changeUser" :transfer="true">
          <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <DatePicker type="datetimerange" placeholder="日期和时间" style="width: 300px" @on-change="selectDate" :transfer="true"></DatePicker>
        <br>
      </Row>
      <div class="content">
        <div class="empty" v-if="isEmpty">暂无数据</div>
        <div class="imageItem" v-if="!isEmpty" v-for="(item, index) in imageList" :key="index" :style="{'visibility': item.url === -1 ? 'hidden': 'visible'}">
          <a :href="item.url" target="_blank">
            <img :src="item.url" alt="" style="width: 370px;height: 220px;">
          </a>
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
        </div>
      </div>
      <div style="text-align: center;margin-top: 10px">
        <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
              ref="tablePage" show-elevator :transfer="true"></Page>
      </div>
    </div>
</template>

<script>
import { operateList, houseImage } from '../../../api/api'
export default {
  data () {
    return {
      isEmpty: true,
      param: {
        pageNum: 1,
        pageSize: 8,
        userId: '',
        startTime: '',
        endTime: '',
        houseId: ''
      },
      size: [8, 16, 32, 40, 48],
      total: 0,
      page: 1,
      rows: 8,
      userList: [],
      imageList: []
    }
  },
  methods: {
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
      this.getImage(this.param)
    },
    // 改变当前显示的行数
    doPageSizeChange: function (size) {
      this.rows = size
      this.param.pageSize = this.rows
      this.getImage(this.param)
    },
    // 烤房图片
    getImage (par) {
      let vm = this
      houseImage(par).then((res) => {
        if (res.data.code === 1000) {
          vm.imageList = res.data.content.list
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
  .imageItem{
    width: 370px;
    height: 220px;
    position: relative;
    margin-bottom: 30px;
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
  }
  .imageItem:hover .tip{
    height:0px;
    color: transparent;
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
