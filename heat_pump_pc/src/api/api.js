import axios from './index'
import Qs from 'qs'
let base = '/sys'
// 上传图片
export const uploadImg = params => { return axios.post(`${base}/file/image_upload`, params) }
// 区域选择
export const getRegion = params => { return axios.get(`${base}/region/get_all_region`, {params: params}) }
// 用户列表
export const getUserList = params => { return axios.post(`${base}/user/list`, Qs.stringify(params)) }
// 用户列表删除
export const delUser = params => { return axios.get(`${base}/user/delete`, {params: params}) }
// 用户详情
export const getUserDetail = params => { return axios.get(`${base}/user/detail`, {params: params}) }
// 用户新增
export const addUser = params => { return axios.post(`${base}/user/create`, params) }
// 用户编辑
export const updateUser = params => { return axios.post(`${base}/user/update`, params) }
// 用户审核
export const reviewUser = params => { return axios.get(`${base}/user/update_status`, {params: params}) }
// 烤烟群列表
export const getToboccoList = params => { return axios.post(`${base}/house_group/list`, Qs.stringify(params)) }
// 烤烟群删除
export const delTobocco = params => { return axios.get(`${base}/house_group/delete`, {params: params}) }
// 烤烟群详情
export const getToboccoDetail = params => { return axios.get(`${base}/house_group/detail`, {params: params}) }
// 烤烟群的烤房列表
export const getTobocco = params => { return axios.post(`${base}/house/list`, Qs.stringify(params)) }
// 烤房删除
export const delToboccoDetail = params => { return axios.get(`${base}/house/delete`, {params: params}) }
// 烤房 新增
export const addToboccoHouse = params => { return axios.post(`${base}/house/create`, Qs.stringify(params)) }
// 烤房 编辑
export const updataToboccoHouse = params => { return axios.post(`${base}/house/update`, Qs.stringify(params)) }
// 烤烟群新增
export const addTobocco = params => { return axios.post(`${base}/house_group/create`, params) }
// 烤烟群编辑
export const updateTobocco = params => { return axios.post(`${base}/house_group/update`, params) }
// 分配烤房群用户列表
export const toboccoList = params => { return axios.post(`${base}/user/wait_allocation_list`, Qs.stringify(params)) }
// 分配用户
export const addtoboccoUser = params => { return axios.post(`${base}/house_group/allocation_user`, Qs.stringify(params)) }
// 分配烤房群  用户烤房群列表删除
export const delUserToboccoList = params => { return axios.get(`${base}/house_group/delete_user`, {params: params}) }
// 告警列表
export const alarmList = params => { return axios.get(`${base}/alarm/list`, {params: params}) }
// 新增告警
export const alarmAdd = params => { return axios.post(`${base}/alarm/create`, Qs.stringify(params)) }
// 编辑告警
export const alarmUpdate = params => { return axios.post(`${base}/alarm/update`, Qs.stringify(params)) }
// 删除告警
export const alarmDel = params => { return axios.get(`${base}/alarm/delete`, {params: params}) }
// 公告列表
export const noticeList = params => { return axios.post(`${base}/notice/list`, Qs.stringify(params)) }
// 删除公告
export const delNotice = params => { return axios.get(`${base}/notice/delete`, {params: params}) }
// 新增公告
export const addNotice = params => { return axios.post(`${base}/notice/create`, Qs.stringify(params)) }
// 修改公告
export const editNotice = params => { return axios.post(`${base}/notice/update`, Qs.stringify(params)) }
// 资讯列表
export const newsList = params => { return axios.post(`${base}/information/list`, Qs.stringify(params)) }
// 删除资讯
export const delNews = params => { return axios.get(`${base}/information/delete`, {params: params}) }
// 新增资讯
export const addNews = params => { return axios.post(`${base}/information/create`, Qs.stringify(params)) }
// 资讯详情
export const newsDetail = params => { return axios.get(`${base}/information/detail`, {params: params}) }
// 修改资讯
export const editNews = params => { return axios.post(`${base}/information/update`, Qs.stringify(params)) }
// 分公司列表
export const getCompanyList = params => { return axios.post(`${base}/company/select`, Qs.stringify(params)) }
// 分公司新增
export const addCompany = params => { return axios.post(`${base}/company/insert`, Qs.stringify(params)) }
// 分公司删除
export const delCompany = params => { return axios.post(`${base}/company/delete`, Qs.stringify(params)) }
// 分公司详情
export const companyDetail = params => { return axios.get(`${base}/company/detail`, {params: params}) }
// 分公司编辑
export const editCompany = params => { return axios.post(`${base}/company/update`, Qs.stringify(params)) }
// 合作社列表
export const getCooperativeList = params => { return axios.post(`${base}/cooperation/select`, Qs.stringify(params)) }
// 合作社删除
export const delCooperative = params => { return axios.post(`${base}/cooperation/delete `, Qs.stringify(params)) }
// 分公司新增
export const addCooperative = params => { return axios.post(`${base}/cooperation/insert`, Qs.stringify(params)) }
// 分公司详情
export const cooperativeDetail = params => { return axios.get(`${base}/cooperation/detail`, {params: params}) }
// 分公司编辑
export const editCooperation = params => { return axios.post(`${base}/cooperation/update`, Qs.stringify(params)) }
// 分公司下拉
export const companyList = params => { return axios.get(`${base}/company/drop_down`, {params: params}) }
// 合作社下拉
export const cooperativeList = params => { return axios.get(`${base}/cooperation/cooperation_drop_down`, {params: params}) }
// 烤房列表
export const getTobaccoList = params => { return axios.post(`${base}/house/list`, Qs.stringify(params)) }
// 烤房删除
export const delTobacco = params => { return axios.get(`${base}/house/delete`, {params: params}) }
// 烤房新增
export const addTobacco = params => { return axios.post(`${base}/house/create`, Qs.stringify(params)) }
// 烤房详情
export const tobaccoDetail = params => { return axios.get(`${base}/house/detail`, {params: params}) }
// 烤房编辑
export const editTobacco = params => { return axios.post(`${base}/house/update`, Qs.stringify(params)) }
// 合作社分布
export const cooperateDistribution = params => { return axios.get(`${base}/cooperation/get_cooperation_distribution`, {params: params}) }
// 可操作的公司下拉
export const companyOperate = params => { return axios.get(`${base}/house/house_current_query_company_drop_down`, {params: params}) }
// 可操作的合作社下拉
export const cooperationOperate = params => { return axios.get(`${base}/house/house_current_query_cooperation_drop_down`, {params: params}) }
// 操作员下拉
export const operateList = params => { return axios.get(`${base}/house/user_drop_down`, {params: params}) }
// 烤房历史图片
export const houseImage = params => { return axios.get(`${base}/house/house_image`, {params: params}) }
// 烤房历史视频
export const houseVideo = params => { return axios.get(`${base}/house/house_video`, {params: params}) }
// 烤房展示
export const tobasscoShow = params => { return axios.get(`${base}/house/select_web_house_current`, {params: params}) }
// 登录
export const userLogin = params => { return axios.post(`${base}/user/login`, Qs.stringify(params)) }
// 注销
export const userlogout = params => { return axios.get(`${base}/user/logout`, {params: params}) }
// 监控中心分公司下拉列表
export const getCompanySelect = params => { return axios.post(`${base}/monitor/get_company`, params) }
// 监控中心合作社分布地图
export const getCooperationMap = params => { return axios.post(`${base}/monitor/get_cooperation`, Qs.stringify(params)) }
// 监控中心烤房实时温度信息
export const getTemperature = params => { return axios.post(`${base}/monitor/get_house_status`, Qs.stringify(params)) }
// 监控中心烤房实时输出信息
export const getOutputInfor = params => { return axios.post(`${base}/monitor/get_house_output`, Qs.stringify(params)) }
// 监控中心烤房图片
export const getImg = params => { return axios.post(`${base}/monitor/get_house_image`, Qs.stringify(params)) }
// 监控中心烤房视频
export const getVideo = params => { return axios.post(`${base}/monitor/get_video_url`, Qs.stringify(params)) }
// 烤房摄像头删除
export const deleCarmera = params => { return axios.post(`${base}/camera/delete`, Qs.stringify(params)) }
// 烤房摄像头列表
export const getCarmera = params => { return axios.post(`${base}/camera/list`, Qs.stringify(params)) }
// 烤房摄像头新增
export const addCarmera = params => { return axios.post(`${base}/camera/add`, Qs.stringify(params)) }
// 监控中心合作社下拉列表
export const getCooperationSelect = params => { return axios.post(`${base}/monitor/get_cooperations`, Qs.stringify(params)) }
// 监控中心烤房下拉列表
export const getHouseSelect = params => { return axios.post(`${base}/monitor/get_houses`, Qs.stringify(params)) }
// 监控中心烤房烤房滚动
export const getHouseRunningInfor = params => { return axios.post(`${base}/monitor/get_run_time`, Qs.stringify(params)) }
