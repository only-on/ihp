<template>
  <div class="body">
    <div class="body-top">
      <Button @click="add" type="text" style="color:#82C225;">
        <Icon type="plus-circled" size="26" color="#82C225" style="margin-right: 5px"></Icon>
        <span style="margin-right: 20px;font-size: 20px;color: #82C225">新增用户</span>
      </Button>
      <Input  v-model="param.keyword" icon="close-circled" @on-click="backKeyword" ref="search" placeholder="输入用户姓名/电话/地址搜索" style="width: 300px; float: right;margin-right: 20px;" @on-change="keywordChange()">
      </Input>
    </div>
    <div class="head">
      <Row>
        <Col span="16">
        <div class="head-title">
          <Icon type="android-apps" size="20" style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">用户管理</span>
        </div>
        </Col>
      </Row>
    </div>
    <div class="select">
      <RadioGroup v-model="state" @on-change="statusChange">
        <Radio label="" style="margin-right: 20px">全部</Radio>
        <!--<Radio label="0" style="margin-right: 20px">未审核</Radio>-->
        <!--<Radio label="1" style="margin-right: 20px">审核通过</Radio>-->
        <!--<Radio label="2" style="margin-right: 20px">审核驳回</Radio>-->
        <Radio label="3" style="margin-right: 20px">普通用户</Radio>
        <Radio label="4" style="margin-right: 20px">专家用户</Radio>
      </RadioGroup>
      <Select v-model="param.companyId" clearable style="width:200px" placeholder="分公司" @on-change="selectChange" :transfer="true" >
        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Select v-model="param.cooperationId" clearable style="width:200px" placeholder="合作社" @on-change="cooperativeSelectChange" :transfer="true" >
        <Option v-for="item in cooperativeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Select v-model="param.roleId" clearable style="width:100px;text-align: left" placeholder="角色" @on-change="roleSelectChange" :transfer="true" >
        <Option v-for="item in rolesList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
    <Modal
      v-model="review"
      title="用户审核"
      :mask-closable="false"
      ok-text="返回"
      cancel-text=""
      @on-ok="back"
      @on-cancel="back">
      <Form :model="reviewForm" :label-width="150"  >
        <Row type="flex" justify="center">
          <Col span="24" push="1">
          <h3 style="margin: 15px 0">认证信息</h3>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <!--编号手动输入-->
          <FormItem label="用户姓名" >{{reviewForm.realName}}
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="手机号码" >{{reviewForm.tel}}
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="身份证号" >{{reviewForm.idcard}}
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="身份证正面" >
            <Row>
              <Col span="6">
              <a :href=reviewForm.faceCardImage target="_blank">
                <img :src=reviewForm.faceCardImage style="width: 100px;height: 100px" alt="加载失败">
              </a>
              </Col>
            </Row>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="身份证反面" >
            <Row>
              <Col span="6">
              <a :href=reviewForm.backCardImage target="_blank">
                <img :src=reviewForm.backCardImage style="width: 100px;height: 100px" alt="加载失败">
              </a>
              </Col>
            </Row>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="手持身份证" >
            <Row>
              <Col span="6">
              <a :href=reviewForm.idcardInHandImage target="_blank">
                <img :src=reviewForm.idcardInHandImage style="width: 100px;height: 100px" alt="加载失败">
              </a>
              </Col>
            </Row>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="用户类型" >
            <RadioGroup v-model="reviewForm.userType" class="radio">
              <Radio label="0">普通用户</Radio>
              <Radio label="1">专家用户</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" style="width:400px">
          <Col span="24">
          <FormItem label="个人简介" >
            <Input v-model="reviewForm.intro" type="textarea" :autosize="{minRows: 3,maxRows: 7}" placeholder=""></Input>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem>
            <Button  @click="cancel" style="background-color: #848484;color:#fff !important;width: 100px;padding:5px">驳回</Button>
            <Button  @click="submitReview" style="background-color: #82C225;color:#fff !important;width: 100px; margin-left: 30px;padding:5px">通过</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getUserList, delUser, getUserDetail, reviewUser, cooperativeList, companyList } from '../../../api/api'
export default {
  data () {
    return {
      rolesList: [
        {
          id: '1',
          name: '管理员'
        },
        {
          id: '2',
          name: '操作员'
        }
      ],
      cooperativeList: [],
      companyList: [],
      reviewModal: false,
      state: '',
      reviewForm: {},
      review: false,
      tabTop: '',
      size: [10, 20, 30, 40, 50],
      total: 0,
      page: 1,
      rows: 10,
      param: {
        status: '',
        pageNum: 1,
        pageSize: 10,
        keyword: '',
        cooperationId: '',
        companyId: '',
        roleId: '',
        userType: ''
      },
      columns1: [
        {
          title: '编号',
          key: 'id',
          width: 80,
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
          width: 120,
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '角色信息',
          key: 'createTime',
          align: 'center',
          render: (h, params) => {
            let roles = params.row.userRoleInfoVOList
            let role = ''
            for (let item of roles) {
              let cname = item.cooperationName === null ? '' : item.cooperationName
              role += item.companyName + cname + item.roleName + '<br>'
            }
            return h('div', {
              domProps: {
                innerHTML: role
              }
            })
          }
        },
        {
          title: '用户类型',
          key: 'userType',
          width: 100,
          align: 'center',
          render: (h, params) => {
            let status = params.row.userType === 0 ? '普通用户' : '专家用户'
            return h('div', status)
          }
        },
        // {
        //   title: '个人状态',
        //   key: 'status',
        //   width: 100,
        //   align: 'center',
        //   render: (h, params) => {
        //     let status = params.row.status === 0 ? '未审核' : params.row.status === 1 ? '审核通过' : params.row.status === 2 ? '审核驳回' : '-'
        //     return h('div', status)
        //   }
        // },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 260,
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
              // h('Button', {
              //   props: {
              //     type: 'text',
              //     size: 'small'
              //   },
              //   style: {
              //     color: '#82C225',
              //     marginRight: '10px',
              //     display: params.row.status === 1 || params.row.status === null ? 'none' : 'inline'
              //   },
              //   on: {
              //     click: () => {
              //       this.send(params.row)
              //     }
              //   }
              // }, '审核'),
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
              }, '删除')
            ])
          }
        }
      ],
      dataTable: []
    }
  },
  created: function () {
    if (this.$route.params.param !== undefined && this.$route.params.param !== undefined) {
      this.param = this.$route.params.param
      this.page = this.param.pageNum
    }
    this.getTableDatas(this.param)
    this.getCompanylist()
    let par = {
      companyId: ''
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
        this.param.cooperationId = change
      } else {
        this.param.cooperationId = ''
      }
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    roleSelectChange (change) {
      if (change !== undefined) {
        this.param.roleId = change
      } else {
        this.param.roleId = ''
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
        this.param.cooperationId = ''
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
    // 分配烤房群
    sendGroup (index) {
      this.$router.push({name: 'tobacco_manage', params: {id: index, param: this.param}})
    },
    back () {},
    // 审核驳回
    cancel () {
      if (this.reviewForm.intro !== null && (this.reviewForm.intro.length !== 0 && this.reviewForm.intro.length > 120)) {
        this.$Message.error('个人简介不能超过120字')
      } else {
        let par = {
          userId: this.reviewForm.id,
          status: 2,
          userType: this.reviewForm.userType
        }
        reviewUser(par).then((res) => {
          if (res.data.code === 1000) {
            this.review = false
            this.getTableDatas(this.param)
            this.$Message.success('用户驳回成功！')
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    // 审核通过
    submitReview () {
      if (this.reviewForm.intro !== null && (this.reviewForm.intro.length !== 0 && this.reviewForm.intro.length > 120)) {
        this.$Message.error('个人简介不能超过120字')
      } else {
        let par = {
          userId: this.reviewForm.id,
          status: 1,
          userType: this.reviewForm.userType,
          intro: this.reviewForm.intro
        }
        reviewUser(par).then((res) => {
          if (res.data.code === 1000) {
            this.review = false
            this.getTableDatas(this.param)
            this.$Message.success('用户审核通过！')
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    // 审核弹框
    send (row) {
      this.reviewForm = {}
      let param = {
        userId: row.id
      }
      getUserDetail(param).then((res) => {
        if (res.data.code === 1000) {
          this.reviewForm.id = res.data.content.id
          this.reviewForm.realName = res.data.content.realName
          this.reviewForm.idcard = res.data.content.idcard
          this.reviewForm.tel = res.data.content.tel
          this.reviewForm.faceCardImage = res.data.content.faceCardUrl
          this.reviewForm.backCardImage = res.data.content.backCardUrl
          this.reviewForm.idcardInHandImage = res.data.content.idcardInHandUrl
          this.reviewForm.userType = res.data.content.userType.toString()
          this.reviewForm.intro = res.data.content.intro
          this.review = true
        }
      })
    },
    // 审核状态筛选
    statusChange () {
      this.param.keyword = this.param.keyword.trim()
      this.param.pageSize = 10
      this.param.pageNum = 1
      this.page = 1
      if (this.state === '3') {
        this.param.userType = '0'
        this.param.status = ''
      } else if (this.state === '4') {
        this.param.userType = '1'
        this.param.status = ''
      } else {
        this.param.userType = ''
        this.param.status = this.state
      }
      var thi = this
      thi.getTableDatas(thi.param)
    },
    backKeyword () {
      this.param.keyword = ''
      this.param.pageSize = 10
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    keywordChange () {
      this.param.keyword = this.param.keyword.trim()
      this.param.pageSize = 10
      this.param.pageNum = 1
      this.page = 1
      var thi = this
      thi.getTableDatas(thi.param)
    },
    // 新增
    add () {
      this.$router.push({name: 'user_create'})
    },
    // 查看详情
    checkDetail (index) {
      this.$router.push({name: 'user_check', params: {id: index, param: this.param}})
    },
    // 编辑
    edit (index) {
      this.$router.push({name: 'user_edit', params: {id: index, param: this.param}})
    },
    remove (id) {
      // console.log(id)
      var th = this
      th.$Modal.confirm({
        title: '删除用户信息',
        content: `确定删除用户？`,
        onOk: function () {
          let par = {
            userId: id
          }
          delUser(par).then((res) => {
            if (res.data.code === 1000) {
              if (th.param.pageNum > 1 && th.dataTable.length === 1) {
                th.param.pageNum = th.param.pageNum - 1
              }
              th.getTableDatas(th.param)
              th.$Message.success('用户删除成功！')
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
      getUserList(param).then((res) => {
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
