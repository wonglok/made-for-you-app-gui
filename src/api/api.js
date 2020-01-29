import EventEmitter from 'events'
import axios from 'axios'

// import slugify from 'slugify'

export const guiURL = `https://creativecodelab.com`
export var apiURL = `https://api-ec2-3-91-80-85.creativecodelab.com/`

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

export const cloneSite = async ({ site, userID }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/apis/cloneSite`,
    headers: getHeaders(),
    data: {
      siteID: site._id,
      userID
    }
  }).then(onResOK, onResError)
}

export const createSiteOnly = ({ title, userID }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/sites`,
    headers: getHeaders(),
    data: {
      userID: userID,
      title
    }
  }).then(onResOK, onResError)
}

export const createSite = async ({ title, owner }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/sites`,
    headers: getHeaders(),
    data: {
      userID: owner._id,
      title
    }
  }).then(onResOK)
    .then(async (site) => {
      let moduleObj = await createModule({
        key: 'home',
        type: 'page',
        userID: Token.Profile._id,
        siteID: site._id
      })
      let value = `env.run = async (api) => {
  console.log('Happy Happy');
  api.mounter.innerHTML = 'Happy Createive Coding';
};
`

      let code = await createCode({ key: 'main', type: 'js', value: value, siteID: site._id, userID: Token.Profile._id, moduleID: moduleObj._id })
      moduleObj.codes.push(code)
      await updateModule({ mod: moduleObj, userID: Token.Profile._id })
      return site
    })
    .catch(onResError)
}

export const updateSite = ({ site, userID }) => {
  return axios({
    method: 'PUT',
    baseURL: apiURL,
    url: `/sites/${site._id}?userID=${userID}`,
    headers: getHeaders(),
    data: site
  }).then(onResOK, onResError)
}

export const removeSite = async ({ userID, site }) => {
  let modules = await getSiteModules({ siteID: site._id })
  let all = modules.map((mod) => {
    return removeModule({ mod, userID })
  })
  await Promise.all(all)
  return axios({
    method: 'DELETE',
    baseURL: apiURL,
    url: `/sites/${site._id}?userID=${userID}`,
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

export const makeSiteApp = async ({ siteID, userID = false, getSiteFn = getSite, getSiteModulesFn = getSiteModules }) => {
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
  let app = new Proxy({
    bus
  }, notifier)

  app.userID = userID
  app.siteID = siteID
  app.previewURL = ''
  app.mode = 'code'
  app.dirtyFiles = {}

  setInterval(() => {
    let hasDirty = Object.keys(app.dirtyFiles).length > 0
    if (hasDirty) {
      window.onbeforeunload = function () {
        return 'You havent save some file(s). Are you sure you want to leave?'
      }
    } else {
      window.onbeforeunload = false
    }
  })

  app.current = new Proxy({}, {
    get (obj, prop) {
      if (prop === 'module') {
        return app.modules.find(m => m._id === app.selected.moduleID) || false
      }
      if (prop === 'code') {
        let mod = app.modules.find(m => m._id === app.selected.moduleID) || false
        if (mod) {
          return mod.codes.find(c => c._id === app.selected.codeID) || false
        } else {
          return false
        }
      }
      return obj[prop]
    }
  })

  app.selected = {
    moduleID: false,
    codeID: false
  }

  app.site = await getSiteFn({ siteID })
  app.modules = await getSiteModulesFn({ siteID })
    .then((mods) => {
      let pages = mods.filter(m => m.type === 'page')
      if (pages[0]) {
        let prefer = pages.find(e => e.key === 'home')
        if (!prefer) {
          prefer = pages[0]
        }
        app.selected.moduleID = prefer._id
        let codes = pages[0].codes
        if (codes && codes[0]) {
          app.selected.codeID = codes[0]._id
        }
      }
      return mods
    }, () => [])

  // bus.on('set:mode', (newVal, oldVal) => {
  //   console.log(newVal, oldVal)
  // })

  return app
}

export const getSite = ({ siteID }) => {
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/sites/${siteID}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const getFeatured = () => {
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/featureds?active=true`// ,
    // headers: getHeaders()
    // data: {
    //   type,
    //   key
    // }
  }).then(onResOK, onResError)
}

// ----- Module Start --------
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

export const removeModule = async ({ mod, userID }) => {
  let all = []
  for (var codeKN in mod.codes) {
    all.push(removeCode({
      codeID: mod.codes[codeKN]._id,
      userID
    }))
  }
  for (var valueKN in mod.values) {
    all.push(removeValue({
      valueID: mod.values[valueKN]._id,
      userID
    }))
  }
  await Promise.all(all)
  return axios({
    method: 'DELETE',
    baseURL: apiURL,
    url: `/modules/${mod._id}?userID=${userID}`,
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
// ----- Module End --------

// ----- Code Start --------
export const createCode = ({ key, type, value = '', siteID, userID, moduleID }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/codes`,
    headers: getHeaders(),
    data: {
      type,
      siteID,
      userID,
      moduleID,
      key,
      value
    }
  }).then(onResOK, onResError)
}

export const updateCode = ({ code, userID }) => {
  return axios({
    method: 'PUT',
    baseURL: apiURL,
    url: `/codes/${code._id}?userID=${userID}`,
    headers: getHeaders(),
    data: code
  }).then(onResOK, onResError)
}

export const removeCode = ({ codeID, userID }) => {
  return axios({
    method: 'DELETE',
    baseURL: apiURL,
    url: `/codes/${codeID}?userID=${userID}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const getCode = ({ codeID }) => {
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/codes/${codeID}`,
    headers: getHeaders()
    // data: {
    //   type,
    //   key
    // }
  }).then(onResOK, onResError)
}

// ----- Code End --------

// ----- Code Start --------
export const createValue = ({ siteID, userID, moduleID, key, value, type }) => {
  return axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/values`,
    headers: getHeaders(),
    data: {
      type,
      siteID,
      userID,
      moduleID,
      key,
      value
    }
  }).then(onResOK, onResError)
}

export const updateValue = ({ value, userID }) => {
  return axios({
    method: 'PUT',
    baseURL: apiURL,
    url: `/values/${value._id}?userID=${userID}`,
    headers: getHeaders(),
    data: value
  }).then(onResOK, onResError)
}

export const removeValue = ({ valueID, userID }) => {
  return axios({
    method: 'DELETE',
    baseURL: apiURL,
    url: `/values/${valueID}?userID=${userID}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}
// ----- Code End --------

export const getApprovedTimeStoreListing = ({ userID = '' }) => {
  let qs = ''
  if (userID) {
    qs = `&userID=${userID}`
  }
  // http://localhost:1337/packages?approvalStatus_null=false
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/packages?approvalStatus_null=false&approvalStatus.approved=true${qs}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const getMyTimeStore = ({ userID }) => {
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/packages?userID=${userID}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const getTimeStoreItem = ({ itemID }) => {
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/packages/${itemID}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}
