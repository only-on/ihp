<template>
  <div class="body">
    <div class="body-top">
      <Button @click="add" type="text" style="color:#82C225;">
        <Icon type="plus-circled" size="26" color="#82C225" style="margin-right: 5px"></Icon>
        <span style="margin-right: 20px;font-size: 20px;color: #82C225">新增告警</span>
      </Button>
      <Input  v-model="param.keyword" icon="close-circled" @on-click="backKeyword"  placeholder="输入告警名称/告警级别搜索" style="width: 300px; float: right;margin-right: 20px;" @on-change="keywordChange()">
      </Input>
    </div>
    <div class="head">
      <Row>
        <Col span="16">
        <div class="head-title">
          <Icon type="android-apps" size="20" style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">告警管理</span>
        </div>
        </Col>
      </Row>
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
import { alarmList, alarmDel } from '../../../api/api'
export default {
  data () {
    return {
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
        keyword: ''
      },
      columns1: [
        {
          title: '告警编号',
          key: 'number',
          // width: 80,
          align: 'center'
        },
        {
          title: '告警名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '告警级别',
          key: 'level',
          align: 'center',
          render: (h, params) => {
            let color = params.row.level === 0 ? '#f5d835' : params.row.level === 1 ? '#f19a2a' : '#f13c2a'
            let level = params.row.level === 0 ? '一般' : params.row.level === 1 ? '重要' : '严重'
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: color
                }
              }, level)
            ])
          }
        },
        {
          title: '告警描述',
          key: 'description',
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
                    this.edit(params.row)
                  }
                }
              }, '修改'),
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
  },
  methods: {
    // 新增
    add () {
      this.$router.push({name: 'alarm_create'})
    },
    // 编辑
    edit (index) {
      this.$router.push({name: 'alarm_edit', params: {row: index, param: this.param}})
    },
    remove (id) {
      // console.log(id)
      var th = this
      th.$Modal.confirm({
        title: '删除告警信息',
        content: `确定删除告警？`,
        onOk: function () {
          let par = {
            id: id
          }
          alarmDel(par).then((res) => {
            if (res.data.code === 1000) {
              if (th.param.pageNum > 1 && th.dataTable.length === 1) {
                th.param.pageNum = th.param.pageNum - 1
              }
              th.getTableDatas(th.param)
              th.$Message.success('告警删除成功！')
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
    // 查询公用方法
    getTableDatas: function (param) {
      let vm = this
      vm.$Loading.start()
      alarmList(param).then((res) => {
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
    border-bottom: none;
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
