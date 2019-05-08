<template>
  <div class="body">
    <div class="head">
      <Row>
        <Col span="24">
        <div class="head-title">
          <Icon type="android-apps" size="20"  style="margin-right: 10px;" color="#666666"></Icon>
          <span style="margin-right: 20px;font-size: 16px;color: #666666">新增用户</span>
        </div>
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
              <FormItem label="手机号码" prop="tel">
                <Input  v-model="updateModel.tel"  style="width: 200px; float: left"  @on-change="phoneVal(updateModel.tel)" placeholder="必填 "></Input>
                <span class="notice" v-if="phoneNotice">请输入正确的手机号码</span><br>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="用户密码"  prop="password">
                <Input  v-model="updateModel.password" placeholder="必填 " style="width: 200px; float: left" @on-change="passwordVal(updateModel.password)"></Input>
                <span class="notice" v-if="passwordNotice">密码不能为空</span>
                <span class="notice" v-if="passwordsNotice">密码必须是6-20位</span><br>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="真实姓名" prop="realName">
                <Input  v-model="updateModel.realName"   placeholder="必填" style="width: 200px; float: left" @on-change="userVal(updateModel.realName)"></Input>
                <span v-if="userNotice" class="notice">真实姓名不能为空</span>
                <br>
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
              <FormItem label="用户年龄" class="selfClass">
                <InputNumber  v-model="updateModel.age"  placeholder="" style="width: 60px; float: left;margin-right: 5px" :min="1" :max="100" @on-change="ageVal(updateModel.age)"></InputNumber>
                <span style="float: left">岁</span>
                <span v-if="ageNotice" class="notice">年龄不能为空</span>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="用户区域" class="selfClass">
                <region @region="regionChange" style="float:left;"></region>
                <span class="notice" v-if="addressNotice">请选择具体区县</span><br>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="详细地址" prop="addressDetail">
                <Input  v-model="updateModel.addressDetail"  placeholder="村 街道 " style="width: 450px; float: left" @on-change="addressVal(updateModel.addressDetail)"></Input>
                <span v-if="addressDetailNotice" class="notice">用户详细地址不能为空</span>
                <br>
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
                :label="'角色 ' + item.index"
                :prop="'roleList.' + index + '.value'"
                :rules="{required: true, message: '角色 ' + item.index +' 不能为空', trigger: 'blur'}">
                <Row>
                  <Col span="24">
                  <div  @click="rowChange(index)">
                    <Select :transfer="true" v-model="item.companyId" style="width:200px;float: left;text-align: left" placeholder="分公司" @on-change="selectChange">
                      <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                  </div>
                  <Select :transfer="true" v-model="item.cooperationId" clearable style="width:200px;float: left;text-align: left" placeholder="合作社" @on-change="cooperativeSelectChange">
                    <Option v-for="items in item.cooperativeList" :value="items.id" :key="items.id">{{ items.name }}</Option>
                  </Select>
                  <Select :transfer="true" v-model="item.roleId" style="width:100px;float: left;text-align: left" placeholder="角色">
                    <Option v-for="item in rolesList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                  <Button @click="handleRemove(index)" style="color: #82C225">删除</Button>
                  </Col>
                </Row>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem>
                <Button  @click="handleAdd" style="background-color: #82C225;color:#fff !important;width: 100px">新增角色</Button>
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
              <FormItem label="身份证号码" prop="idcard">
                <Input  v-model="updateModel.idcard"  style="width: 200px; float: left"  @on-change="idCardVal(updateModel.idcard)" placeholder="必填"></Input>
                <span class="notice" v-if="idCardNotice">请输入合法身份证号</span><br>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="23" push="1">
              <FormItem label="身份证正面" prop="upload_file" class="selfClass">
                <Row>
                  <div  class="file">
                    <input type="file" @change="handleUploadface"   style="height: 30px;" >上传个人身份证正面
                  </div>
                  <span class="notice" v-if="faceCardNotice">请上传合法身份证正面照片</span>
                </Row>
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
                <Row>
                  <div  class="file">
                    <input type="file" @change="handleUploadBack"   style="height: 30px;" >上传个人身份证反面
                  </div>
                  <span class="notice" v-if="backCardNotice">请上传合法身份证反面照片</span>
                </Row>
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
                <Row>
                  <div  class="file">
                    <input type="file" @change="handleUploadHand"   style="height: 30px;" >上传手持身份证自拍
                  </div>
                  <span class="notice" v-if="handleCardNotice">请上传合法手持身份证照片</span>
                </Row>
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
              <FormItem label="个人简介" class="selfClass">
                <Input v-model="updateModel.intro" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="个人简介" style="width: 500px"></Input>
              </FormItem>
              </Col>
            </Row>
          </div>
          <Row type="flex" justify="center">
            <Col span="23" push="1">
            <FormItem>
              <Button  @click="submit" style="background-color: #82C225;color:#fff !important;width: 100px">提交</Button>
              <Button  @click="back" style="background-color: #848484;color:#fff !important;width: 100px; margin-left: 30px;">取消</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadImg, addUser, cooperativeList, companyList } from '../../../api/api'
import region from '../../../components/region'
export default {
  components: {
    region
  },
  data () {
    return {
      pName: '',
      cName: '',
      dName: '',
      tName: '',
      rowIndex: '',
      cooperativeList: [],
      companyList: [],
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
      index: 1,
      handleCardNotice: false,
      backCardNotice: false,
      faceCardNotice: false,
      addressNotice: false,
      passwordsNotice: false,
      userNotice: false,
      idCardNotice: false,
      phoneNotice: false,
      passwordNotice: false,
      ageNotice: false,
      addressDetailNotice: false,
      password: '',
      faceCard: '',
      backCard: '',
      idcardInHand: '',
      updateModel: {
        password: '123456',
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
            roleId: '1',
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
    cooperativeSelectChange (change) {
      if (change === undefined) {
        this.updateModel.roleList[this.rowIndex].cooperationId = ''
      }
    },
    rowChange (index) {
      this.rowIndex = index
    },
    selectChange (change) {
      let par = {
        companyId: change
      }
      if (change !== undefined) {
        par.companyId = change
      } else {
        par.companyId = ''
      }
      // console.log(par)
      cooperativeList(par).then((res) => {
        if (res.data.code === 1000) {
          this.updateModel.roleList[this.rowIndex].cooperativeList = res.data.content
        } else {
          this.updateModel.roleList[this.rowIndex].cooperativeList = []
        }
      })
    },
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
        }
      })
    },
    handleAdd () {
      this.updateModel.roleList.push({
        roleId: '1',
        companyId: '',
        cooperationId: '',
        index: this.updateModel.roleList.length + 1,
        status: 1,
        cooperativeList: this.cooperativeList
      })
    },
    handleRemove (index) {
      this.updateModel.roleList[index].status = 0
    },
    // 身份证照片验证
    submitRegionVal () {
      if (this.phoneNotice || this.updateModel.tel === '') {
        this.$Message.error('请输入正确的电话号码')
        return false
      } else if (this.passwordNotice || this.updateModel.password === '') {
        this.$Message.error('密码不能为空')
        return false
      } else if (this.passwordsNotice) {
        this.$Message.error('密码必须是6-20位')
        return false
        // userNotice
      } else if (this.userNotice || this.updateModel.realName === '') {
        this.$Message.error('真实姓名不能为空')
        return false
      } else if (this.ageNotice || this.updateModel.age === null) {
        this.$Message.error('年龄不能为空')
        return false
      } else if (this.updateModel.regionId === '') {
        this.addressNotice = true
        this.$Message.error('用户区域不能为空')
        return false
      } else if (this.addressDetailNotice || this.updateModel.addressDetail.trim() === '') {
        this.$Message.error('用户详细地址不能为空')
        return false
      } else if (this.idCardNotice || this.updateModel.idcard === '') {
        this.$Message.error('请输入合法的身份证号')
        return false
      } else if (this.updateModel.faceCardId === '') {
        this.$Message.error('请上传合法身份证正面照片')
        this.faceCardNotice = true
        return false
      } else if (this.updateModel.backCardId === '') {
        this.$Message.error('请上传合法身份证反面照片')
        this.backCardNotice = true
        return false
      } else if (this.updateModel.idcardInHandId === '') {
        this.$Message.error('请上传合法手持身份证照片')
        this.handleCardNotice = true
        return false
      } else if (this.updateModel.intro.length === 0 || this.updateModel.intro === '') {
        this.$Message.error('个人简介不能为空')
        return false
      } else if (this.updateModel.intro.length > 120) {
        this.$Message.error('个人简介不能超过120字')
        return false
      } else {
        return true
      }
    },
    // 角色验证
    submitVal () {
      let flag = true
      let lists = []
      for (let item of this.updateModel.roleList) {
        if (item.status === 1) {
          lists.push(item)
        }
      }
      if (lists.length > 0) {
        let arr = this.updateModel.roleList
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].companyId === '' && arr[i].status === 1) {
            let index = i + 1
            this.$Message.error('角色' + index + '的分公司不能为空')
            flag = false
            return false
          }
        }
        for (let k = 0; k < arr.length; k++) {
          for (let j = 0; j < arr.length; j++) {
            if (k !== j && arr[k].companyId === arr[j].companyId && arr[k].cooperationId === arr[j].cooperationId && arr[k].status === 1 && arr[j].status === 1) {
              let indexi = k + 1
              let indexj = j + 1
              this.$Message.error('角色' + indexj + '角色' + indexi + '的信息冲突')
              flag = false
              return false
            }
            if (k !== j && arr[k].companyId === arr[j].companyId && arr[k].roleId === arr[j].roleId && arr[k].status === 1 && arr[j].status === 1 && arr[k].cooperationId === arr[j].cooperationId) {
              let indexk = k + 1
              let indexkj = j + 1
              this.$Message.error('角色' + indexkj + '角色' + indexk + '的信息冲突')
              flag = false
              return false
            }
          }
        }
        let list = []
        for (let item of this.updateModel.roleList) {
          if (item.status === 1) {
            list.push(item)
          }
        }
        this.updateModel.roleList = list
      } else {
        this.$Message.error('角色信息不能为空')
        flag = false
      }
      if (flag) {
        if (this.submitRegionVal()) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    //  新增
    submit () {
      if (this.submitVal()) {
        // this.updateModel.userype = parseInt(this.updateModel.userType)
        let vm = this
        console.log(vm.updateModel)
        addUser(vm.updateModel).then((res) => {
          if (res.data.code === 1000) {
            vm.$router.push({name: 'user_manage'})
            vm.$Message.success('用户创建成功！')
          } else {
            vm.$Message.error(res.data.message)
          }
        })
      }
    },
    back () {
      this.$router.push({name: 'user_manage'})
    },
    // 用户名验证
    userVal (string) {
      if (string !== '' && string !== undefined) {
        if (string.replace(/(^\s*)|(\s*$)/g, '').length !== 0 && string.trim() !== '') {
          this.userNotice = false
        } else {
          this.userNotice = true
        }
      } else {
        this.userNotice = true
      }
    },
    ageVal (string) {
      if (string !== '' && string !== undefined && string !== null) {
        this.ageNotice = false
      } else {
        this.ageNotice = true
      }
    },
    // 手机号码验证
    phoneVal (string) {
      if (string !== '' && string !== undefined) {
        var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (!validataPrice.test(string.trim())) {
          this.phoneNotice = true
        } else {
          this.phoneNotice = false
        }
      } else {
        this.phoneNotice = true
      }
    },
    passwordVal (string) {
      // console.log(string.length)
      if (string !== '' && string !== undefined) {
        if (string.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
          this.passwordNotice = true
        } else if (string.length > 5 && string.length < 21) {
          this.passwordsNotice = false
          this.passwordNotice = false
        } else {
          this.passwordsNotice = true
        }
      } else {
        this.passwordNotice = true
      }
    },
    // 详细地址
    addressVal (string) {
      if (string !== '' && string !== undefined) {
        if (string.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
          this.addressDetailNotice = true
        } else {
          this.addressDetailNotice = false
        }
      } else {
        this.addressDetailNotice = true
      }
    },
    idCardVal (string) {
      // console.log(string)
      if (string !== '' && string !== undefined) {
        var validataPrice = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
        if (!validataPrice.test(string.trim())) {
          this.idCardNotice = true
        } else {
          this.idCardNotice = false
        }
      } else {
        this.idCardNotice = true
      }
    },
    // 图片--------------------------------------------------------------------------------------------------------------------
    handleUploadface (file) {
      var formData = new FormData()
      for (var image of file.target.files) {
        formData.append('file', image)
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadImg(formData, config).then((res) => {
        if (res.data.code === 1000) {
          this.faceCardNotice = false
          // this.$Message.success('图片上传成功')
          this.updateModel.faceCardId = res.data.content.id
          this.faceCard = res.data.content.url
        }
      })
    },
    handleUploadBack (file) {
      var formData = new FormData()
      for (var image of file.target.files) {
        formData.append('file', image)
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadImg(formData, config).then((res) => {
        if (res.data.code === 1000) {
          this.backCardNotice = false
          // this.$Message.success('图片上传成功')
          this.updateModel.backCardId = res.data.content.id
          this.backCard = res.data.content.url
        }
      })
    },
    handleUploadHand (file) {
      var formData = new FormData()
      for (var image of file.target.files) {
        formData.append('file', image)
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadImg(formData, config).then((res) => {
        if (res.data.code === 1000) {
          this.handleCardNotice = false
          // this.$Message.success('图片上传成功')
          this.updateModel.idcardInHandId = res.data.content.id
          this.idcardInHand = res.data.content.url
        } else {
          this.updateModel.idcardInHandId = ''
          this.idcardInHand = ''
        }
      })
    },
    // 区域---------------------------------------------------------------------------------------------
    regionChange (data) {
      // console.log(data)
      if (data.length < 4) {
        this.addressNotice = true
      } else {
        this.addressNotice = false
        let pname = data[0] === undefined ? this.pName : data[0].label
        let cname = data[1] === undefined ? this.cName : data[1].label
        let dname = data[2] === undefined ? this.dName : data[2].label
        let tname = data[3] === undefined ? this.tName : data[3].label
        this.updateModel.regionAddress = pname + cname + dname + tname
        this.updateModel.regionId = data[3].value
        // console.log(this.updateModel.regionAddress)
      }
    }
  },
  created: function () {
    this.getCompanylist()
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
