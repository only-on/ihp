<template>
    <div class="body">
      <Row style="margin-bottom: 30px">
        <Select v-model="param.companyId" clearable style="width:200px;margin-right: 10px" placeholder="分公司" @on-change="selectCompany">
          <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select v-model="param.cooperationId" clearable style="width:200px;margin-right: 10px" placeholder="合作社" @on-change="selectCooperate">
          <Option v-for="item in cooperativeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Select v-model="param.workStatus" clearable style="width:200px" placeholder="状态" @on-change="selectStatus">
          <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Row>
      <div class="content">
        <div class="empty" v-if="isEmpty">暂无数据</div>
        <div class="tobaccoItem" v-if="!isEmpty"  v-for ="(item, index) in tobaccoList" :key="index" :style="{'visibility': item.workStatus === -1 ? 'hidden' : 'visible'}" @click="checkDetail(item)">
          <div class="tabaccoTop" align="center" :style="{'background': item.workStatus === 1 ? '#85BE3B' : item.workStatus === 2 ? '#EF4A4A' :'#999' }">
            <img src="../../../assets/tobacco.png" alt="" class="image">
          </div>
          <div class="nameText">{{item.cooperationName }}</div>
          <div class="nameText">{{item.houseName}}</div>
          <Row style="padding-top: 15px">
            <div  :style="{'color': item.workStatus === 1 ? '#2F8B75' : item.workStatus === 2 ? '#EF4A4A' :'#999' }" class="statusLog">
              <span style="font-size: 16px">{{item.workStatus === 1 ? '运行中' : item.workStatus === 2 ? '故障中' : '停用中'}}</span>
              <Icon :type="item.workStatus === 1 ? 'md-refresh' : item.workStatus === 2 ? 'md-warning' : 'md-remove-circle'" size="24" style="margin-top: -3px"/>
            </div>
            <div style="float: right;font-size: 14px;color:#666">
              <div style="margin-top:4px">
                图片
                <span style="margin-right:5px">{{item.imageCount}}</span>
                视频
                <span>{{item.videoCount}}</span>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <div style="text-align: center;margin-top: 10px">
        <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
              ref="tablePage" show-elevator ></Page>
      </div>
    </div>
</template>

<script>
import { companyOperate, cooperationOperate, tobasscoShow } from '../../../api/api'
export default {
  data () {
    return {
      isEmpty: false,
      param: {
        pageNum: 1,
        pageSize: 10,
        companyId: '',
        cooperationId: '',
        workStatus: ''
      },
      size: [10, 20, 30],
      total: 0,
      page: 1,
      rows: 10,
      cooperativeList: [],
      companyList: [],
      statusList: [
        {
          id: 1,
          name: '运行中'
        },
        {
          id: 2,
          name: '故障中'
        },
        {
          id: 0,
          name: '停用中'
        }
      ],
      tobaccoList: []
    }
  },
  methods: {
    checkDetail (item) {
      this.$router.push({name: 'tobacco_history', params: {item: item, param: this.param}})
    },
    getCompanylist (param) {
      companyOperate().then((res) => {
        if (res.data.code === 1000) {
          this.companyList = res.data.content
          if (param !== undefined) {
            let par = {
              companyId: param
            }
            this.getCooperativelist(par)
          }
        } else {
          this.companyList = []
        }
      })
    },
    getCooperativelist (par) {
      cooperationOperate(par).then((res) => {
        if (res.data.code === 1000) {
          this.cooperativeList = res.data.content
        } else {
          this.cooperativeList = []
        }
      })
    },
    selectCompany (change) {
      this.param.cooperationId = ''
      if (change !== undefined) {
        this.param.companyId = change
      } else {
        this.param.companyId = ''
      }
      let par = {
        companyId: this.param.companyId
      }
      this.getCooperativelist(par)
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    selectCooperate (change) {
      if (change !== undefined) {
        this.param.cooperationId = change
      } else {
        this.param.cooperationId = ''
      }
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    selectStatus (change) {
      if (change !== undefined) {
        this.param.workStatus = change
      } else {
        this.param.workStatus = ''
      }
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
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
    getTableDatas (param) {
      let vm = this
      tobasscoShow(param).then((res) => {
        if (res.data.code === 1000) {
          vm.tobaccoList = res.data.content.list
          vm.total = res.data.content.total
          let num = this.tobaccoList.length % 5
          if (num !== 0) {
            for (let i = 0; i < (5 - num); i++) {
              this.tobaccoList.push({workStatus: -1})
            }
          }
          if (vm.total === 0) {
            vm.isEmpty = true
          } else {
            vm.isEmpty = false
          }
        } else {
          vm.tobaccoList = []
          vm.total = 0
          vm.isEmpty = true
        }
      })
    }
  },
  created: function () {
    // 首页路由
    if (this.$route.params !== undefined && this.$route.params.pageParam === undefined) {
      this.param.companyId = this.$route.params.companyId
      this.param.cooperationId = this.$route.params.cooperationId
    }
    // 历史图片返回路由
    if (this.$route.params.pageParam !== undefined) {
      this.param = this.$route.params.pageParam
    }
    this.getCompanylist(this.param.companyId)
    this.getTableDatas(this.param)
  }
}
</script>

<style scoped>
.body{
  padding: 20px;
}
.content{
  /*height: 500px;*/
  /*width: 100%;*/
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
  min-height: 500px;
  position: relative;
}
.tobaccoItem{
  width: 260px;
  height: 230px;
  margin-right: 40px;
  margin-bottom: 25px;
  background: #fff;
  box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius:16px;
  padding: 15px 18px;
  cursor: pointer;
}
.tabaccoTop{
  border-radius: 30px;
  width:100px;
  height:100px;
  margin: 0 auto;
  line-height: 100px
}
.image{
  width:48px;
  height: 48px;
  vertical-align: middle;
}
  .nameText{
    text-align: center;
    line-height:30px;
    font-size: 16px;
    font-weight: 600
  }
  .statusLog{
    float: left;
  }
  .empty{
    position: absolute;
    top:0;bottom:0;
    margin-top: auto;margin-bottom: auto;
    height: 30px;
    font-size:22px;
  }
</style>
