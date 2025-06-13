
import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  ADD_KATEGORI,
  GET_CATEGORY,
  UPDATE_STATUS_USER,
  UPDATE_STATUS_KATEGORI,
  GET_CATEGORY_BY_ID,
  DELETE_KATEGORI,
} = API_ENDPOINT

class ServiceKategori {
  static async addKategori(data, token) {
    const response = await api.post(ADD_KATEGORI, data, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    return response.data
  }
  static async udpateStatusKategori(id, data, token) {
    const response = await api.put(UPDATE_STATUS_KATEGORI(id), data, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    return response.data
  }
  static async updateStatus(id, data , token) {
    const response = await api.put(UPDATE_STATUS_USER(id), data, {
      headers: {
        "Authorization": `Bearer ${token}`  
      }
    })
    return response.data
  }
  static async getKategori() {
    const response  = await api.get(GET_CATEGORY)
    return response.data
  }
  static async getByID(id) {
    const response  = await api.get(GET_CATEGORY_BY_ID(id))
    return response.data
  }
  static async deleteKategori(id, token) {
    const response = await api.delete(DELETE_KATEGORI(id), {
      headers: {
        "Authorization": `bearer ${token}`
      }
    })
    return response.data
  }
}

export default ServiceKategori