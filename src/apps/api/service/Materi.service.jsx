
import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  ADD_MATERI,
  GET_MATERI_CATEGORY,
  GET_MATERI,
  GET_MATERI_ID,
  DELETE_MATERI,
} = API_ENDPOINT

class ServiceMateri {
  static async addMateri(data, token) {
    const response = await api.post(ADD_MATERI, data, {
      headers: {
        "Authorization": `Bearer ${token}`  
      }
    })
    return response.data
  }
  // static async updateStatus(id, data , token) {
  //   const response = await api.put(UPDATE_STATUS_USER(id), data, {
  //     headers: {
  //       "Authorization": `Bearer ${token}`  
  //     }
  //   })
  //   return response.data
  // }
  static async getAll(token) {
    const response  = await api.get(GET_MATERI, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    })
    return response.data
  }
  static async getMateriByKategori(id) {
    const response  = await api.get(GET_MATERI_CATEGORY(id))
    return response.data
  }
  static async getMateriById(id) {
    const response  = await api.get(GET_MATERI_ID(id))
    return response.data
  }
  static async daleteMateri(id, token) {
    const response = await api.delete(DELETE_MATERI(id), {
      headers: {
        "Authorization": `bearer ${token}`
      }
    })
    return response.data
  }
}

export default ServiceMateri