import api from 'axios'
const service = api.create({
  headers: {
    'token': sessionStorage.getItem('token')
  }
})
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers['token'] = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    if (res.data.code === 2002) {
      window.location.href = res.request.responseURL.substr(0, res.request.responseURL.lastIndexOf('/sys') + 1)
    }
    return res
  },
  res => {
    return Promise.reject(res)
  }
)
export default service
