import EventEmitter from 'events'
import axios from 'axios'
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
      owner,
      title
    }
  }).then(onResOK, onResError)
}

export const removeVisuals = async () => {
  console.log('TODO: removeVisuals')
}

export const removePages = async () => {
  console.log('TODO: removePages')
}

export const removeSite = async ({ site }) => {
  await Promise.all([
    removeVisuals(site),
    removePages(site)
  ])
  return axios({
    method: 'DELETE',
    baseURL: apiURL,
    url: `/sites/${site._id}`,
    headers: getHeaders()
  }).then(onResOK, onResError)
}

export const listSite = ({ owner, pageAt = 0, perPage = 25, search = '' }) => {
  console.log(owner)
  let qs = `_start=${pageAt * perPage}&_limit=${perPage}${search ? `&title_contains=` + encodeURIComponent(search) : ''}&_sort=createdAt:DESC`
  return axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/sites?owner._id=${owner._id}&${qs}`,
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
    msg = err.response.data.message[0].messages[0].message
  }
  return Promise.reject(msg)
}

// export const createCard = async ({ title }) => {
//   let finderID = CreationDevice.finder
//   let creationID = CreationDevice.uuid
//   let displayName = title
//   const cardResp = await axios({
//     method: 'POST',
//     baseURL: apiURL,
//     url: `/cards`,
//     data: {
//       finderID,
//       displayName
//     }
//   })

//   await axios({
//     method: 'POST',
//     baseURL: apiURL,
//     url: `/card-secrets`,
//     data: {
//       creationID,
//       finderID,
//       password: '',
//       card: cardResp.data
//     }
//   })

//   return cardResp.data
// }

// export const listRenderables = async ({ pageAt = 0, perPage = 25, search = '' }) => {
//   let qs = `_start=${pageAt * perPage}&_limit=${perPage}${search ? `&displayName_contains=` + encodeURIComponent(search) : ''}`
//   // let creationID = CreationDevice.uuid
//   const resp = await axios({
//     method: 'GET',
//     baseURL: apiURL,
//     url: `/renderables?${qs}`,
//     data: {
//     }
//   })

//   return resp.data
// }

// export const getCard = async ({ cardID }) => {
//   // let creationID = CreationDevice.uuid
//   const resp = await axios({
//     method: 'GET',
//     baseURL: apiURL,
//     url: `/cards/${cardID}`,
//     data: {
//     }
//   })

//   return resp.data
// }

// export const getDeviceCards = async () => {
//   let finderID = CreationDevice.finder
//   let qs = `finderID=${encodeURIComponent(finderID)}`
//   const resp = await axios({
//     method: 'GET',
//     baseURL: apiURL,
//     url: `/cards?${qs}`,
//     data: {
//     }
//   })

//   return resp.data
// }

// export const prepareCardHeader = ({ cardID }) => {
//   let creationID = CreationDevice.uuid
//   let headers = {
//     'X-Creation-ID': creationID,
//     'X-Card-ID': cardID
//   }
//   if (Token.JWT) {
//     headers['Authorization'] = `Bearer ${Token.JWT}`
//   }
//   return headers
// }

// export const updateCard = ({ cardID, data }) => {
//   let headers = prepareCardHeader({ cardID })

//   return axios({
//     method: 'PUT',
//     baseURL: apiURL,
//     url: `/cards/${cardID}`,
//     headers,
//     data: {
//       ...data
//     }
//   }).then((resp) => {
//     return resp.data
//   })
// }

// export const checkAdmin = async ({ cardID }) => {
//   let headers = prepareCardHeader({ cardID })
//   const resp = await axios({
//     method: 'POST',
//     baseURL: apiURL,
//     url: `/cards-checkAdmin`,
//     headers,
//     data: {
//     }
//   })

//   return resp.data
// }

// export class SiteEditor {
//   constructor ({ cardID }) {
//     this.cardID = cardID
//     this.card = false
//     this.canEdit = false
//     this.ready = false

//     this.init()
//   }

//   init () {
//     let finallyLogic = () => {
//       if (this.card) {
//         this.ready = true
//       } else {
//         this.ready = false
//       }
//     }
//     return Promise.all([
//       this.getCard(),
//       this.checkAdmin()
//     ]).then(finallyLogic, finallyLogic)
//   }

//   getCard () {
//     return getCard({ cardID: this.cardID }).then(card => {
//       this.card = card
//       return card
//     })
//   }

//   authorise ({ identifier, password }) {
//     return authorise({ identifier, password })
//       .then(() => {
//         return this.checkAdmin()
//       })
//   }

//   checkAdmin () {
//     return checkAdmin({ cardID: this.cardID })
//       .then(() => {
//         this.canEdit = true
//       }, () => {
//         this.canEdit = false
//       })
//   }

//   listRenderables ({ pageAt = 0, perPage = 25, search = '' }) {
//     return listRenderables({ pageAt, perPage, search })
//       .then(r => {
//         console.log(r)
//         return r
//       })
//   }

//   syncUp ({ card = this.card } = { card: this.card }) {
//     clearTimeout(this.tout)
//     window.onbeforeunload = () => { return 'unsaved changes' }
//     this.tout = setTimeout(() => {
//       updateCard({ cardID: this.cardID, data: card })
//         .then(() => {
//           window.onbeforeunload = undefined
//         })
//     }, 150)
//   }
// }

export const makeEditorApp = async () => {
  let bus = new EventEmitter()
  let handler = {
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
  let api = new Proxy({}, handler)
  api.previewURL = ''
  api.mode = 'code'

  bus.on('set:mode', (newVal, oldVal) => {
    console.log(newVal, oldVal)
  })

  return api
}
