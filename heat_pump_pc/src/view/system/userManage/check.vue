<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">查看用户</span>
        </div>
        <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px;float: right;margin-top: 8px">返回</Button>
        </Col>
      </Row>
    </div>
    <div class="content">
      <div class="layout-content-form">
        <Form :model="updateModel" :label-width="150" ref="updateModel" :rules="ruleValidate">
          <!--用户基本信息---------------------------------------------------------------------------------------------------->
          <div>
            <Row type="flex" justify="center">
              <Col span="24" >
              <h3 style="margin: 15px 0">基本信息</h3>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="手机号码" prop="tel">{{updateModel.tel}}
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="真实姓名" prop="realName">{{updateModel.realName}}
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="用户性别" class="selfClass">
                <RadioGroup v-model="updateModel.sex" class="radio">
                  <Radio label="0">女</Radio>
                  <Radio label="1">男</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="用户年龄" class="selfClass">{{updateModel.age}}
              </FormItem>
              </Col>
            </Row>
            <!--<Row type="flex" justify="center">-->
              <!--<Col span="23" push="1">-->
              <!--<FormItem label="用户区域" class="selfClass">-->
                <!--<region @region="regionChange" style="float:left;" :regionIds="regionIds"></region>-->
                <!--<span class="notice" v-if="addressNotice">请选择具体区县</span><br>-->
              <!--</FormItem>-->
              <!--</Col>-->
            <!--</Row>-->
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="详细地址" prop="addressDetail">{{updateModel.addressDetail}}
              </FormItem>
              </Col>
            </Row>
          </div>
          <!--用户角色信息---------------------------------------------------------------------------------------------------->
          <div>
            <Row type="flex" justify="center">
              <Col span="24" >
              <h3 style="margin: 15px 0">角色信息</h3>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem
                v-for="(item, index) in updateModel.roleList"
                v-if="item.status"
                :key="index"
                :label="'角色 ' + (item.index + 1)"
                :prop="'roleList.' + index + '.value'"
                :rules="{required: true, message: '角色 ' + item.index +' 不能为空', trigger: 'blur'}">
                <Row>
                  <Col span="24">
                  {{item.companyName}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.cooperationName}}
                  <span v-show="item.cooperationName !== null">
                  &nbsp;&nbsp;-&nbsp;&nbsp;
                  </span>
                  {{item.roleName}}
                  <!--<div  @click="rowChange(index)">-->
                    <!--<Select :transfer="true" v-model="item.companyId" style="width:200px;float: left;text-align: left" placeholder="分公司" @on-change="selectChange">-->
                      <!--<Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>-->
                    <!--</Select>-->
                  <!--</div>-->
                  <!--<Select :transfer="true" v-model="item.cooperationId" clearable style="width:200px;float: left;text-align: left" placeholder="合作社" @on-change="cooperativeSelectChange">-->
                    <!--<Option v-for="items in item.cooperativeList" :value="items.id" :key="items.id">{{ items.name }}</Option>-->
                  <!--</Select>-->
                  <!--<Select :transfer="true" v-model="item.roleId" style="width:100px;float: left;text-align: left" placeholder="角色">-->
                    <!--<Option v-for="item in rolesList" :value="item.id" :key="item.id">{{ item.name }}</Option>-->
                  <!--</Select>-->
                  <!--<Button @click="handleRemove(index)" style="color: #82C225">删除</Button>-->
                  </Col>
                </Row>
              </FormItem>
              </Col>
            </Row>
          </div>
          <!--用户认证信息---------------------------------------------------------------------------------------------------->
          <div>
            <Row type="flex" justify="center">
              <Col span="24">
              <h3 style="margin: 15px 0">认证信息</h3>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="真实姓名" class="selfClass">{{updateModel.realName}}
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="身份证号码" prop="idcard">{{updateModel.idcard}}
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="身份证正面" prop="upload_file" class="selfClass">
                <Row v-show="faceCard !== ''">
                  <a :href=faceCard target="_blank">
                    <img :src=faceCard style="width: 100px;height: 100px" alt="上传照片">
                  </a>
                </Row>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="身份证反面" prop="upload_file" class="selfClass">
                <Row  v-show="backCard !== ''">
                  <a :href=backCard target="_blank">
                    <img :src=backCard style="width: 100px;height: 100px"  alt="上传照片">
                  </a>
                </Row>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="手持身份证" prop="upload_file" class="selfClass">
                <Row v-show="idcardInHand !== ''">
                  <a :href=idcardInHand target="_blank">
                    <img :src=idcardInHand style="width: 100px;height: 100px"  alt="上传照片">
                  </a>
                </Row>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="用户类型" class="selfClass">
                <RadioGroup v-model="updateModel.userType" class="radio">
                  <Radio label="0">普通用户</Radio>
                  <Radio label="1">专家用户</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="个人简介" class="selfClass">{{updateModel.intro}}
              </FormItem>
              </Col>
            </Row>
          </div>
          <Row type="flex" justify="center">
            <Col span="23" push="1">
            <FormItem>
              <Button  @click="back" style="background-color: #848484;color:#fff;width: 100px;">返回</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserDetail } from '../../../api/api'
import region from '../../../components/region'
export default {
  components: {
    region
  },
  data () {
    return {
      regionIds: '',
      rowIndex: '',
      cooperativeList: [],
      companyList: [],
      rolesList: [
        {
          id: 1,
          name: '管理员'
        },
        {
          id: 2,
          name: '操作员'
        }
      ],
      index: 1,
      faceCard: '',
      backCard: '',
      idcardInHand: '',
      updateModel: {
        id: '',
        password: '',
        realName: '',
        tel: '',
        regionId: '',
        addressDetail: '',
        regionAddress: '',
        age: null,
        sex: '0',
        idcard: '',
        faceCardId: '',
        backCardId: '',
        idcardInHandId: '',
        userType: '0',
        intro: '',
        roleList: [
          {
            roleId: 1,
            companyId: '',
            cooperationId: '',
            index: 1,
            status: 1,
            cooperativeList: []
          }
        ]
      },
      ruleValidate: {
        realName: [
          {required: true, message: '用户姓名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '用户密码不能为空', trigger: 'blur'}
        ],
        tel: [
          {required: true, message: '联系电话不能为空', trigger: 'blur'}
        ],
        addressDetail: [
          {required: true, message: '用户详细地址不能为空', trigger: 'blur'}
        ],
        idcard: [
          {required: true, message: '身份证号码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    back () {
      this.$router.push({name: 'user_manage', params: {param: this.$route.params.param}})
    }
  },
  created: function () {
    this.updateModel.id = this.$route.params.id
    let param = {
      userId: this.$route.params.id
    }
    getUserDetail(param).then((res) => {
      if (res.data.code === 1000) {
        this.updateModel.tel = res.data.content.tel
        this.updateModel.realName = res.data.content.realName
        this.updateModel.sex = res.data.content.sex + ''
        this.updateModel.age = res.data.content.age
        if (res.data.content.regionVO.provinceName !== undefined) {
          this.updateModel.addressDetail = res.data.content.regionVO.provinceName + res.data.content.regionVO.cityName + res.data.content.regionVO.districtsName + res.data.content.regionVO.streetName + res.data.content.address
        }
        this.updateModel.idcard = res.data.content.idcard
        // this.updateModel.headImage = res.data.content.headImageUrl
        this.faceCard = res.data.content.faceCardUrl !== null ? res.data.content.faceCardUrl : ''
        this.backCard = res.data.content.backCardUrl !== null ? res.data.content.backCardUrl : ''
        this.idcardInHand = res.data.content.idcardInHandUrl !== null ? res.data.content.idcardInHandUrl : ''
        this.headImage = res.data.content.headImageUrl !== null ? res.data.content.headImageUrl : ''
        this.updateModel.faceCardId = res.data.content.faceCardImageId
        this.updateModel.backCardId = res.data.content.backCardImageId
        this.updateModel.idcardInHandId = res.data.content.idcardInHandId
        this.updateModel.userType = res.data.content.userType + ''
        this.updateModel.intro = res.data.content.intro
        this.regionIds = res.data.content.regionIds.slice(1)
        this.updateModel.regionId = res.data.content.regionIds[res.data.content.regionIds.length - 1]
        // this.updateModel.roleList = res.data.content.intro
        this.updateModel.roleList = []
        let arr = res.data.content.roleInfoVOS
        for (let i = 0; i < arr.length; i++) {
          let oo = {
            roleName: arr[i].roleName,
            companyName: arr[i].companyName,
            cooperationName: arr[i].cooperationName,
            index: i,
            status: 1
          }
          this.updateModel.roleList.push(oo)
        }
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
    padding-bottom :50px;
  }
  .body{
    background: #fff;
  }
  .head{
    margin:30px;
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
  .notice{
    color:red;
    margin-left: 10px;
  }
</style>
