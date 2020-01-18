import EventEmitter from 'events'
import axios from 'axios'
import BezierEasing from 'bezier-easing'

// import slugify from 'slugify'

export const guiURL = `https://madeforyouapp.com`
export var apiURL = `https://api-ec2-3-91-80-85.madeforyouapp.com`

if (process.env.NODE_ENV === 'development') {
  apiURL = `http://` + location.hostname + ':1337'
}

// console.log(apiURL)

export const getCardByID = async ({ id }) => {
  // const pagination = `&_start=0&_limit=15`
  const resp = await axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/cards/?_id=${id}`
  })
  return resp.data
}

export const CreationDevice = {
  finder: null,
  uuid: null
}
window.CreationDevice = CreationDevice

export const Token = {
  NS: 'StrapiJwtProfile@' + apiURL,
  JWT: false,
  Profile: false
}

export const genUUID = () => {
  const generator = require('uuid/v4')
  return generator()
}

export const isJSON = (json, version) => {
  let result = true

  try {
    let data = JSON.parse(json)
    if (data) {
      result = true
    }
  } catch (e) {
    result = false
  }

  return result
}

// export const initCreationDevice = () => {
//   let NameSpace = apiURL + '@CreationDevice@'
//   let stringFromLS = localStorage.getItem(NameSpace)
//   if (stringFromLS === null || !isJSON(stringFromLS)) {
//     localStorage.setItem(NameSpace, JSON.stringify({
//       uuid: genUUID(),
//       finder: genUUID()
//     }))
//     stringFromLS = localStorage.getItem(NameSpace)
//   }
//   let data = JSON.parse(stringFromLS)
//   for (var kn in data) {
//     CreationDevice[kn] = data[kn]
//   }
//   // console.log(CreationDevice)
// }

export const initJWT = () => {
  let NameSpace = Token.NS
  let stringFromLS = localStorage.getItem(NameSpace)
  if (stringFromLS === null || !isJSON(stringFromLS)) {
    localStorage.setItem(NameSpace, JSON.stringify({
      JWT: false,
      Profile: false
    }))
    stringFromLS = localStorage.getItem(NameSpace)
  }
  let data = JSON.parse(stringFromLS)
  for (var kn in data) {
    Token[kn] = data[kn]
  }
  // console.log(Token)
}

export const saveToken = () => {
  let NameSpace = Token.NS
  localStorage.setItem(NameSpace, JSON.stringify(Token))
}

export const authorise = async ({ identifier, password }) => {
  const resp = await axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/auth/local`,
    data: {
      identifier,
      password
    }
  })

  Token.JWT = resp.data.jwt
  Token.Profile = resp.data.user
  saveToken()
  return resp.data
}
export const register = async ({ username, email, password }) => {
  const resp = await axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/auth/local/register`,
    data: {
      username,
      email,
      password
    }
  })

  Token.JWT = resp.data.jwt
  Token.Profile = resp.data.user
  saveToken()
  return resp.data
}

export const logout = () => {
  Token.JWT = false
  Token.Profile = false
  saveToken()
}

export const checkLogin = async () => {
  return !!Token.Profile
}

export const getHeaders = () => {
  let headers = {}
  if (Token.JWT) {
    headers['Authorization'] = `Bearer ${Token.JWT}`
  }
  return headers
}

export const checkUsernameTaken = async ({ username }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/apis/checkUsernameTaken`,
    headers: getHeaders(),
    data: {
      username
    }
  }).then(onResOK, onResError)
}

export const createSite = ({ title, owner }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/sites`,
    headers: getHeaders(),
    data: {
      userID: owner._id,
      title
    }
  }).then(onResOK, onResError)
}

export const removeSite = async ({ owner, site }) => {
  return axios({
    method: 'DELETE',
    baseURL: apiURL,
    url: `/sites/${site._id}?userID=${owner._id}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const listSite = ({ owner, pageAt = 0, perPage = 25, search = '' }) => {
  console.log(owner)
  let qs = `_start=${pageAt * perPage}&_limit=${perPage}${search ? `&title_contains=` + encodeURIComponent(search) : ''}&_sort=createdAt:DESC`
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/sites?userID=${owner._id}&${qs}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const onResOK = (resp) => {
  return resp.data
}

export const onResError = (err) => {
  let msg = ''
  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data.message &&
    err.response.data.message[0] &&
    err.response.data.message[0].messages &&
    err.response.data.message[0].messages[0] &&
    err.response.data.message[0].messages[0].message
  ) {
    msg = err.response.data.message[0].messages[0]
  }
  return Promise.reject(msg)
}

export const makeEditorApp = async ({ siteID, userID }) => {
  let bus = new EventEmitter()
  let notifier = {
    get (obj, prop) {
      return obj[prop]
    },
    set (obj, prop, val) {
      let old = obj[prop]
      obj[prop] = val
      bus.emit(`set:${prop}`, val, old)
      return true
    }
  }
  let api = new Proxy({
    bus
  }, notifier)
  api.userID = userID
  api.siteID = siteID
  api.previewURL = ''
  api.mode = 'module'

  api.current = new Proxy({}, {
    get (obj, prop) {
      if (prop === 'module') {
        return api.modules.find(m => m._id === api.selected.moduleID) || false
      }
      return obj[prop]
    }
  })

  api.selected = {
    moduleID: false
  }

  api.site = await getSite({ siteID })
  api.modules = await getSiteModules({ siteID })
    .then((mods) => {
      let pages = mods.filter(m => m.type === 'page')
      if (pages[0]) {
        api.selected.moduleID = pages[0]._id
      }
      return mods
    }, () => [])

  // bus.on('set:mode', (newVal, oldVal) => {
  //   console.log(newVal, oldVal)
  // })

  return api
}

export const bezierMaker = ([b0, b1, b2, b3]) => {
  return BezierEasing(b0, b1, b2, b3)
}

export const getSite = ({ siteID }) => {
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/sites/${siteID}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const createModule = ({ key, type, siteID, userID }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/modules`,
    headers: getHeaders(),
    data: {
      type,
      siteID,
      userID,
      key
    }
  }).then(onResOK, onResError)
}

export const updateModule = ({ mod, userID }) => {
  return axios({
    method: 'PUT',
    baseURL: apiURL,
    url: `/modules/${mod._id}?userID=${userID}`,
    headers: getHeaders(),
    data: mod
  }).then(onResOK, onResError)
}

export const removeModule = ({ moduleID, userID }) => {
  return axios({
    method: 'DELETE',
    baseURL: apiURL,
    url: `/modules/${moduleID}?userID=${userID}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const getSiteModules = ({ siteID }) => {
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/modules?siteID=${siteID}&_sort=createdAt:DESC`,
    headers: getHeaders()
    // data: {
    //   type,
    //   key
    // }
  }).then(onResOK, onResError)
}
