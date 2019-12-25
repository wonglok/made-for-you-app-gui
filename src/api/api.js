import axios from 'axios'
// import slugify from 'slugify'

export const guiURL = `https://madeforyouapp.com`
export var apiURL = `http://api-ec2-3-91-80-85.madeforyouapp.com`

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
  uuid: null,
  note: 'CreationDevice'
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

export const initCreationDevice = () => {
  let stringFromLS = localStorage.getItem(apiURL + '@CreationDevice')
  if (stringFromLS === null || !isJSON(stringFromLS)) {
    localStorage.setItem(apiURL + '@CreationDevice', JSON.stringify({
      uuid: genUUID()
    }))
    stringFromLS = localStorage.getItem(apiURL + '@CreationDevice')
  }
  let data = JSON.parse(stringFromLS)
  for (var kn in data) {
    CreationDevice[kn] = data[kn]
  }
  console.log(CreationDevice)
}

export const createCard = async ({ title }) => {
  let creationID = CreationDevice.uuid
  let displayName = title
  const cardResp = await axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/cards`,
    data: {
      displayName
    }
  })

  await axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/card-secrets`,
    data: {
      creationID,
      password: '',
      card: cardResp.data
    }
  })

  return cardResp.data
}

export const getCard = async ({ cardID }) => {
  // let creationID = CreationDevice.uuid
  const resp = await axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/cards/${cardID}`,
    data: {
    }
  })

  return resp.data
}

export const updateCard = async ({ cardID, password, data }) => {
  let creationID = CreationDevice.uuid
  const resp = await axios({
    method: 'PUT',
    baseURL: apiURL,
    url: `/cards/${cardID}`,
    data: {
      ...data,
      password,
      creationID
    }
  })

  return resp.data
}

export const checkAdmin = async ({ cardID, password }) => {
  let creationID = CreationDevice.uuid
  const resp = await axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/cards-checkAdmin`,
    data: {
      password,
      creationID,
      cardID
    }
  })

  return resp.data
}

export const setAdminPW = async ({ cardID, password, newPassword }) => {
  let creationID = CreationDevice.uuid
  const resp = await axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/cards-setAdminPW`,
    data: {
      password,
      newPassword,
      creationID,
      cardID
    }
  })

  return resp.data
}

export const makeEditor = ({ cardID }) => {
  let api = {
    card: false,
    canEdit: false
  }

  api.loadCard = ({ _id = cardID }) => {
    getCard({ cardID: _id })
      .then((data) => {
        api.card = data
      }, () => {
      })
  }

  return api
}
