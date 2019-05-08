<template>
  <div class="body">
    <div class="body-top">
      <div class="head" >
        <Row>
          <Col span="24">
          <div class="head-title">
            <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
            <span style="margin-right: 20px;font-size: 16px;color: #666666">烤房群分配</span>
          </div>
          <Button  @click="back" style="background-color: #82C225;color:#fff;width: 100px;height: 30px;float: right;padding: 5px">返回</Button>
          </Col>
        </Row>
      </div>
      <div class="farm">
        <Form v-model="reviewForm" :label-width="150">
          <Row type="flex" justify="center">
            <Col span="12">
            <!--编号手动输入-->
            <FormItem label="烤房群名称" >{{reviewForm.name}}
            </FormItem>
            </Col>
            <Col span="12">
            <!--编号手动输入-->
            <FormItem label="网关编号" >{{reviewForm.gatewayId}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="12">
            <!--编号手动输入-->
            <FormItem label="烤房群地址" >{{reviewForm.regionAddress + reviewForm.addressDetail}}
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="经纬度" >{{reviewForm.addressY}}，{{reviewForm.addressX}}
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="12">
            <FormItem label="管理员" >
              <div v-for="(item, index1) in reviewForm.roleList" :key="index1">
                <Row type="flex" justify="center" v-show="item.type === 1">
                  <Col span="12" >
                  <!--编号手动输入-->
                  <FormItem label="" >{{item.name}}
                  </FormItem>
                  </Col>
                  <Col span="12" pull="10">
                  <FormItem label="手机号码" >{{item.tel}}
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="负责人" >
              <div v-for="(item, index2) in reviewForm.roleList" :key="index2">
                <Row type="flex" justify="center" v-show="item.type === 2">
                  <Col span="12">
                  <!--编号手动输入-->
                  <FormItem label="" >{{item.name}}
                  </FormItem>
                  </Col>
                  <Col span="12" pull="10">
                  <FormItem label="手机号码" >{{item.tel}}
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24">
            <FormItem label="用户信息" >
              <div v-for="(item, index3) in reviewForm.userList" :key="index3">
                <Row type="flex" justify="center">
                  <Col span="4" >
                  <!--编号手动输入-->
                  <FormItem label="用户姓名" >{{item.realName}}
                  </FormItem>
                  </Col>
                  <Col span="4" >
                  <FormItem label="手机号码" >{{item.tel}}
                  </FormItem>
                  </Col>
                  <Col span="8" >
                  <FormItem label="地址" >{{item.regionAddress + item.addressDetail}}
                  </FormItem>
                  </Col>
                  <Col span="8" >
                  <FormItem label="" >
                    <Button  @click="removeGroup(item.id)" type="text" style="color:#82C225">删除</Button>
                  </FormItem>
                  </Col>
                </Row>
              </div>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <!--<div class="head">-->
      <!--<Row>-->
        <!--<Col span="24">-->
        <!--<Button @click="add" type="text" style="color:#82C225;">-->
          <!--<Icon type="plus-circled" size="26" color="#82C225" style="margin-right: 5px"></Icon>-->
          <!--<span style="margin-right: 20px;font-size: 20px;color: #82C225">烤房群分配用户</span>-->
        <!--</Button>-->
        <!--&lt;!&ndash;<div class="head-title">&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</div>-->
    <div class="content" >
      <div class="layout-content-form">
        <Form :label-width="150"  >
          <!--选择烤烟群----------------------------------------------------------------------------------->
          <Row type="flex" justify="center" style="margin: 20px 0px 20px 0px;">
            <Col span="24">
            <h1>选择需要新增用户</h1>
            </Col>
          </Row>
          <Row type="flex"  justify="space-around" class="code-row-bg">
            <Col span="10">
            <Input  v-model="param.keyword" icon="close-circled" @on-click="backKeyword"  @on-change="search()" placeholder="输入用户姓名/手机号码/地址" style="margin-bottom: 10px"></Input>
            </Col>
            <Col span="1">
            </Col>
            <Col span="10">
            <h2>已选择用户列表</h2>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" class="code-row-bg">
            <Col span="10">
            <Table border height="460" :columns="columnsAllGroup" :data="dataTableAllGroup" ref="selection" @on-select-cancel="cancel" @on-selection-change="select" style="margin-bottom: 20px"></Table>
            </Col>
            <Icon type="arrow-right-a" size="75" style="margin-top: 200px" color="#D2D2D2"></Icon>
            <Col span="10">
            <Table border height="460" :columns="columnsSendGroup" :data="dataTableSendGroup"></Table>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Button  @click="submit" style="background-color: #82C225;color:#fff;width: 100px">确定</Button>
            <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px; margin-left: 30px;">返回</Button>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { getToboccoDetail, toboccoList, addtoboccoUser, delUserToboccoList } from '../../../api/api'
  export default {
    data () {
      return {
        showAdd: false,
        groupIdList: [],
        reviewForm: {
          name: '',
          gatewayId: '',
          regionAddress: '',
          addressDetail: '',
          addressX: '',
          addressY: '',
          roleList: [],
          userList: []
        },
        size: [10, 50, 100, 500, 1000],
        total: 0,
        page: 1,
        rows: 10,
        param: {
          groupId: '',
          pageNum: 1,
          pageSize: 100,
          keyword: ''
        },
        selection: [],
        columnsSendGroup: [
          {
            title: '用户姓名',
            key: 'realName',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'tel',
            align: 'center'
          },
          {
            title: '地址',
            key: 'name',
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
            title: '操作',
            key: 'action',
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
                      this.remove(params.row.userId)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        columnsAllGroup: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户姓名',
            key: 'realName',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'tel',
            align: 'center'
          },
          {
            title: '地址',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              let address = params.row.regionAddress + params.row.addressDetail
              if (address === '') {
                address = '-'
              }
              return h('div', address)
            }
          },
        ],
        dataTableAllGroup: [],
        dataTableSendGroup: []
      }
    },
    methods: {
      add () {
        this.groupIdList = []
        this.dataTableSendGroup = []
        this.getTableDatas(this.param)
        this.showAdd = false
      },
      backKeyword () {
        this.param.keyword = ''
        this.param.pageNum = 1
        this.page = 1
        var thi = this
        thi.getTableDatas(thi.param)
      },
      search () {
        this.param.keyword = this.param.keyword.trim()
        this.page = 1
        this.param.pageNum = 1
        var thi = this
        thi.getTableDatas(thi.param)
      },
      cancel (selection, row) {
        for (var j = 0; j < this.dataTableSendGroup.length; j++) {
          if (row.id === this.dataTableSendGroup[j].id) {
            this.dataTableSendGroup.splice(j, 1)
          }
        }
      },
      select (selection) {
        for (var i = 0; i < selection.length; i++) {
          var flag = true
          var tepm = selection[i]
          for (var j = 0; j < this.dataTableSendGroup.length; j++) {
            if (tepm.id === this.dataTableSendGroup[j].id) {
              flag = false
              break
            }
          }
          if (flag) {
            this.dataTableSendGroup.push(tepm)
          }
        }
      },
      //  新增
      submit () {
        if (this.dataTableSendGroup.length > 0) {
          for (var i = 0; i < this.dataTableSendGroup.length; i++) {
            this.groupIdList[i] = this.dataTableSendGroup[i].id
          }
          // this.groupIdList = Array.from(new Set(this.groupIdList))
          let para = {
            userIdList: this.groupIdList.join(','),
            groupId: this.$route.params.id
          }
          addtoboccoUser(para).then((res) => {
            if (res.data.code === 1000) {
              this.$Message.success('用户分配成功！')
              // this.showAdd = true
              this.groupIdList = []
              this.dataTableSendGroup = []
              this.getTableDatas(this.param)
              this.getToboccoDetailAll()
              // this.$router.push({name: 'user_manage', params: {param: this.$route.params.param}})
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          this.$Message.error("请选择需要分配的用户！")
        }
      },
      // 删除分配
      removeGroup (index) {
        var th = this
        let p = {
          userId: index,
          groupId: this.param.groupId
        }
        delUserToboccoList(p).then((res) => {
          th.$Loading.finish()
          if (res.data.code === 1000) {
            th.getTableDatas(th.param)
            th.$Message.success('用户删除成功！')
            this.getToboccoDetailAll()
          } else {
            th.$Message.error(res.data.message)
          }
        })
      },
      remove (index) {
        this.dataTableSendGroup.splice(index, 1)
      },
      // 点击分页页码
      change (page) {
        // console.log(this.userChooce)
        this.page = page
        this.paramHouse.pageNum = this.page
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.paramHouse.pageSize = this.rows
      },
      // 查询所有烤烟房公用方法
      getTableDatas: function (param) {
        let vm = this
        vm.$Loading.start()
        toboccoList(param).then((res) => {
          vm.$Loading.finish()
          if (res.data.code !== 1000) {
            vm.dataTableAllGroup = []
          } else if (res.data.code === 1000) {
            vm.dataTableAllGroup = res.data.content.list
          }
        })
      },
      back () {
        this.$router.push({name: 'tobaccoGroup_manage', params: {param: this.$route.params.param}})
      },
      getToboccoDetailAll () {
        let p = {
          id: this.$route.params.id
        }
        let vm = this
        // console.log(p)
        getToboccoDetail(p).then((res) => {
          if (res.data.code === 1000) {
            // console.log(res)
            vm.reviewForm.name = res.data.content.name
            vm.reviewForm.gatewayId = res.data.content.gatewayId
            vm.reviewForm.regionAddress = res.data.content.regionAddress
            vm.reviewForm.addressDetail = res.data.content.addressDetail
            vm.reviewForm.addressX = res.data.content.addressX
            vm.reviewForm.addressY = res.data.content.addressY
            vm.reviewForm.roleList = res.data.content.roleList
            vm.reviewForm.userList = res.data.content.userList
          }
        })
      }
    },
    created: function () {
      // console.log(this.$route.params.id)
      this.getToboccoDetailAll()
      this.param.groupId = this.$route.params.id
      this.getTableDatas(this.param)
    },
  }
</script>
<style scoped>
  .layout-content-form{
    width:100%;
    background:#ffffff;
    padding:20px;
    padding-bottom :50px;
  }
  .body{
    background: #fff;
  }
  .body-top{
    background: #fff;
    border-bottom: 10px solid rgba(130,194,37,0.2);
  }
  .head{
    margin:30px;
    margin-bottom: 0px;
    padding: 10px;
    background: #F8F8F9;
    border: 1px solid #dcdcdc;
    border-bottom: none;
  }
  .farm {
    margin: 30px;
    margin-top: 0px;
    padding: 10px;
    border: 1px solid #dcdcdc;
  }
  .body-top-head{
    /*上、右、下、左*/
    padding: 30px 10px 0px 20px;
    margin-bottom: 20px;
  }
  .head-title{
    float:left;
    padding:10px 12px;
  }
  .content{
    margin: 30px;
  }
</style>
