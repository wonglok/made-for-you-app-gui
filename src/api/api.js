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
  uuid: null,
  note: 'CreationDevice'
}

export const CardList = {
  list: []
}

window.CardList = CardList

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

export const initCardList = () => {
  let stringFromLS = localStorage.getItem(apiURL + '@CardList')
  if (stringFromLS === null || !isJSON(stringFromLS)) {
    localStorage.setItem(apiURL + '@CardList', JSON.stringify({
      list: []
    }))
    stringFromLS = localStorage.getItem(apiURL + '@CardList')
  }
  let data = JSON.parse(stringFromLS)
  for (var kn in data) {
    CardList[kn] = data[kn]
  }
  console.log(CardList)

  setInterval(() => {
    let json = JSON.stringify(CardList)
    if (json !== localStorage.getItem(apiURL + '@CardList')) {
      localStorage.setItem(apiURL + '@CardList', json)
    }
  }, 500)
}

export const createCard = async ({ title }) => {
  let creationID = CreationDevice.uuid
  let displayName = title
  const cardResp = await axios({
    method: 'POST',
    baseURL: apiURL,
    url: `/cards`,
    data: {
      creationID,
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

  CardList.list.push(cardResp.data._id)

  return cardResp.data
}

export const listRenderables = async ({ pageAt = 0, perPage = 25, search = '' }) => {
  let qs = `_start=${pageAt * perPage}&_limit=${perPage}${search ? `&displayName_contains=` + encodeURIComponent(search) : ''}`
  // let creationID = CreationDevice.uuid
  const resp = await axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/renderables?${qs}`,
    data: {
    }
  })

  return resp.data
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

export const getDeviceCards = async () => {
  let IDs = CardList.list
  let qs = IDs.reduce((acc, item, key) => {
    acc += `&id_in=${encodeURIComponent(item)}`
    return acc
  }, '')
  const resp = await axios({
    method: 'GET',
    baseURL: apiURL,
    url: `/cards?${qs}`,
    data: {
    }
  })

  return resp.data
}

export const updateCard = ({ cardID, password, data }) => {
  let creationID = CreationDevice.uuid
  return axios({
    method: 'PUT',
    baseURL: apiURL,
    url: `/cards/${cardID}`,
    data: {
      ...data,
      cardID,
      password,
      creationID
    }
  }).then((resp) => {
    return resp.data
  })
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

export const makeCardEditor = ({ cardID }) => {
  let api = {
    password: '',
    card: false,
    dirtJSON: false,
    canEdit: false,
    isCreationDevice: false,
    notFound: false,
    saving: false,
    ready: false
  }

  api.listRenderables = ({ pageAt, perPage, search = '' }) => {
    return listRenderables({ pageAt, perPage, search })
  }

  api.loadCard = ({ _id = cardID }) => {
    return getCard({ cardID: _id })
      .then((data) => {
        api.card = data
        api.dirtJSON = JSON.stringify(api.card)
      }, () => {
      })
  }

  api.checkAdmin = async ({ password = '' }) => {
    return checkAdmin({ cardID, password, creationID: CreationDevice.uuid })
      .then(() => {
        api.canEdit = true
      }, () => {
        api.canEdit = false
      })
  }

  api.checkDevice = async () => {
    return checkAdmin({ cardID, password: '', creationID: CreationDevice.uuid })
      .then(() => {
        api.isCreationDevice = true
      }, () => {
        api.isCreationDevice = false
      })
  }

  api.updatePW = async ({ password = '', newPassword = '' }) => {
    return setAdminPW({ cardID: cardID, password, newPassword })
  }

  api.updateCard = () => {
    if (api.card && api.canEdit) {
      api.saving = true
      return updateCard({ cardID, password: api.password, data: api.card })
        .then(() => {
          api.saving = false
        })
        .catch(() => {
          api.saving = false
        })
    }
  }

  // auto save
  setInterval(() => {
    if (api.card && api.dirtJSON !== JSON.stringify(api.card)) {
      api.dirtJSON = JSON.stringify(api.card)
      api.updateCard()
    }
  }, 1000)

  // init
  api.bootup = () => {
    api.ready = false
    api.loadCard({ _id: cardID })
      .then(() => {}, () => {
        api.notFound = true
      })
    checkAdmin({ cardID, password: '', creationID: CreationDevice.uuid })
      .then(() => {
        api.canEdit = true
        api.isCreationDevice = true
      }, () => {
        api.canEdit = false
        api.isCreationDevice = false
      })
      .then(() => {
        setTimeout(() => {
          api.ready = true
        }, 10)
      })
  }

  api.bootup()
  return api
}
