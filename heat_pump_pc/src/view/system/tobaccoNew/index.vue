<template>
  <div class="body">
    <div class="body-top">
      <Button @click="add" type="text" style="color:#82C225;">
        <Icon type="plus-circled" size="26" color="#82C225" style="margin-right: 5px"></Icon>
        <span style="margin-right: 20px;font-size: 20px;color: #82C225">新增烤房</span>
      </Button>
      <Input  v-model="param.keyword" icon="ios-close-circle" @on-click="backKeyword" placeholder="输入名称/烤房地址搜索" style="width: 300px; float: right;margin-right: 20px;" @on-change="keywordChange()">
      </Input>
    </div>
    <div class="head">
      <Row>
        <Col span="16">
        <div class="head-title">
          <Icon type="android-apps" size="20" style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">烤房管理</span>
        </div>
        </Col>
      </Row>
    </div>

    <div class="select">
      <Select v-model="param.companyId" clearable style="width:200px" placeholder="分公司" @on-change="selectChange">
        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Select v-model="param.cooperativeId" clearable style="width:200px" placeholder="合作社" @on-change="cooperativeSelectChange">
        <Option v-for="item in cooperativeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    <div class="content">
      <Table border size="small" :columns="columns1" :data="dataTable" ></Table>
      <div class="pages-block">
        <div class="pages-right">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTobaccoList, cooperativeList, delTobacco, companyList } from '../../../api/api'
export default {
  data () {
    return {
      cooperativeList: [],
      companyList: [],
      reviewForm: {},
      review: false,
      tabTop: '',
      size: [10, 20, 30, 40, 50],
      total: 0,
      page: 1,
      rows: 10,
      param: {
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        companyId: '',
        cooperativeId: ''
      },
      columns1: [
        {
          title: '编号',
          key: 'id',
          // width: 80,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '网关',
          key: 'gatewayId',
          align: 'center'
        },
        {
          title: 'dtu编号',
          key: 'number',
          align: 'center'
        },
        {
          title: '合作社',
          key: 'cooperationName',
          align: 'center'
        },
        {
          title: '分公司',
          key: 'companyName',
          align: 'center'
        },
        {
          title: '烤房地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 260,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#82C225',
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.carmera(params.row.id)
                  }
                }
              }, '分配摄像头'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#82C225',
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.edit(params.row.id)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#82C225'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      dataTable: []
    }
  },
  created: function () {
    if (this.$route.params.param !== '' && this.$route.params.param !== undefined) {
      this.param = this.$route.params.param
      this.page = this.param.pageNum
    }
    this.getTableDatas(this.param)
    this.getCompanylist()
    let par = {
      companyId: this.param.companyId
    }
    this.getCooperativelist(par)
  },
  methods: {
    getCooperativelist (par) {
      cooperativeList(par).then((res) => {
        if (res.data.code === 1000) {
          this.cooperativeList = res.data.content
        } else {
          this.cooperativeList = []
        }
      })
    },
    getCompanylist () {
      companyList().then((res) => {
        if (res.data.code === 1000) {
          this.companyList = res.data.content
        } else {
          this.companyList = []
        }
      })
    },
    cooperativeSelectChange (change) {
      if (change !== undefined) {
        this.param.cooperativeId = change
      } else {
        this.param.cooperativeId = ''
      }
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    selectChange (change) {
      if (change !== undefined) {
        this.param.companyId = change
      } else {
        this.param.companyId = ''
        this.param.cooperativeId = ''
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
    backKeyword () {
      this.param.keyword = ''
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    keywordChange () {
      this.param.keyword = this.param.keyword.trim()
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    // 新增
    add () {
      this.$router.push({name: 'tobacco_create'})
    },
    // 分配摄像头
    carmera (index) {
      this.$router.push({name: 'tobacco_carmera', params: {id: index, param: this.param}})
    },
    // 编辑
    edit (index) {
      this.$router.push({name: 'tobacco_edit', params: {id: index, param: this.param}})
    },
    remove (id) {
      // console.log(id)
      var th = this
      th.$Modal.confirm({
        title: '删除烤房信息',
        content: `确定删除烤房？`,
        onOk: function () {
          let par = {
            id: id
          }
          delTobacco(par).then((res) => {
            if (res.data.code === 1000) {
              if (th.param.pageNum > 1 && th.dataTable.length === 1) {
                th.param.pageNum = th.param.pageNum - 1
              }
              th.getTableDatas(th.param)
              th.$Message.success('烤房删除成功！')
            } else {
              th.$Message.error(res.data.message)
            }
          })
        },
        onCancel: function () {
          th.$Message.success('取消删除操作成功！')
        }
      })
    },
    // 查询公用方法
    getTableDatas: function (param) {
      param.cooperationId = param.cooperativeId
      let vm = this
      vm.$Loading.start()
      getTobaccoList(param).then((res) => {
        vm.$Loading.finish()
        if (res.data.code === 1000) {
          vm.dataTable = res.data.content.list
          vm.total = res.data.content.total
          vm.$refs.tablePage.currentPage = vm.page
        } else {
          vm.dataTable = []
          vm.total = 0
        }
      })
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
    }
  }
}
</script>
<style scoped>
  .body{
    min-width: 600px;
  }
  .body-top{
    height: 70px;
    padding: 15px 10px 20px 20px;
    background: #fff;
    border-bottom: 10px solid rgba(130,194,37,0.2);
  }
  .head{
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    padding: 10px;
    background: #F8F8F9;
    border: 1px solid #dcdcdc;
    font-size: 14pt;
  }
  .select {
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px;
    background: #fff;
    font-size: 14pt;
    border: 1px solid #dcdcdc;
    border-top: 0px;
    border-bottom: 0px;
  }
  .ivu-btn{
    padding: 0px;
  }
  .head-title{
    float:left;
    padding:5px 12px;
  }
  .content{
    margin-left: 20px;
    margin-right: 20px;
  }
  .ivu-input{
    position:relative !important;
  }
</style>
