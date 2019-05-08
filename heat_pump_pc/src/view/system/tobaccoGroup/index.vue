<template>
  <div class="body">
    <div class="body-top">
      <Button @click="add" type="text" style="color:#82C225;">
        <Icon type="plus-circled" size="26" color="#82C225" style="margin-right: 5px"></Icon>
        <span style="margin-right: 20px;font-size: 20px;color: #82C225">创建烤房群</span>
      </Button>
      <Input  v-model="param.keyword" icon="close-circled" @on-click="backKeyword"  placeholder="输入烤烟群/网关编号/地址搜索" style="width: 300px; float: right;margin-right: 20px" @on-change="keywordChange()"></Input>
    </div>
    <div class="head">
      <Row>
        <Col span="16">
        <div class="head-title">
          <Icon type="android-apps" size="20" style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">烤房群管理</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Table border size="small" :columns="columns1" :data="dataTable" ref="selection" @on-selection-change="select"></Table>
      <div class="pages-block">
        <div class="pages-right">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator ></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getToboccoList, delTobocco } from '../../../api/api'
  export default {
    data () {
      return {
        tabTop: '',
        size: [10, 20, 30, 40, 50],
        selectDate: [],
        total: 0,
        page: 1,
        rows: 10,
        param: {
          pageNum: 1,
          pageSize: 10,
          keyword: ''
        },
        columns1: [
          {
            title: 'ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '网关编号',
            key: 'gatewayId',
            align: 'center'
          },
          {
            title: '烤房群名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            align: 'center',
            render: (h, params) => {
              let address = params.row.regionAddress + params.row.addressDetail
              if (address === '') {
                address = '-'
              }
              return h('div', address)
            }
          },
          {
            title: '经度',
            key: 'addressY',
            align: 'center',
            ellipsis: true
          },
          {
            title: '纬度',
            key: 'addressX',
            align: 'center',
            ellipsis: true
          },
          {
            title: '操作',
            key: 'action',
            width: 380,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#82C225'
                  },
                  on: {
                    click: () => {
                      this.checkDetail(params.row.id)
                    }
                  }
                }, '查看'),
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
                      this.edit(params.row.id)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#82C225'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#82C225'
                  },
                  on: {
                    click: () => {
                      this.manageHouse(params.row.id)
                    }
                  }
                }, '烤房管理'),
                h('Button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#82C225'
                  },
                  on: {
                    click: () => {
                      this.sendGroup(params.row.id)
                    }
                  }
                }, '分配用户')
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
    },
    methods: {
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
        this.$router.push({name: 'tobaccoGroup_create'})
      },
      // 分配烤房群
      sendGroup (index) {
        this.$router.push({name: 'tobacco_manage', params: {id: index, param: this.param}})
      },
      // 查看详情manageHouse
      checkDetail (index) {
        this.$router.push({name: 'tobaccoGroup_check', params: {id: index, param: this.param}})
      },
      // 烤房管理
      manageHouse (index) {
        this.$router.push({name: 'tobaccoGroup_manageHouse', params: {id: index, param: this.param}})
      },
      // 编辑
      edit (index) {
        this.$router.push({name: 'tobaccoGroup_edit', params: {id: index, param: this.param}})
      },
      select (selection) {
        for (var i = 0; i < selection.length; i++) {
          this.selectDate[i] = selection[i].actId
        }
      },
      remove (id) {
        // console.log(id)
        var th = this
        th.$Modal.confirm({
          title: '删除烤烟群信息',
          content: `确定删除烤烟群？`,
          onOk: function () {
            let par = {
              id: id
            }
            delTobocco(par).then((res) => {
              if (res.data.code === 1000) {
                if (th.param.pageNum > 1 && th.dataTable.length === 1) {
                  th.param.pageNum = th.param.pageNum - 1
                }
                th.getTableDatas(th.param)
                th.$Message.success('烤烟群删除成功！')
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
        let vm = this
        vm.$Loading.start()
        getToboccoList(param).then((res) => {
          vm.$Loading.finish()
          if (res.data.code !== 1000) {
            vm.dataTable = []
            vm.total = 0
          } else if (res.data.code === 1000) {
            // console.log(res.data)
            vm.dataTable = res.data.content.list
            vm.total = res.data.content.total
            vm.$refs.tablePage.currentPage = vm.page
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
  }
  .body-top{
    height: 70px;
    /*上、右、下、左*/
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
    border-bottom: 0px;
    font-size: 14pt;
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
</style>
