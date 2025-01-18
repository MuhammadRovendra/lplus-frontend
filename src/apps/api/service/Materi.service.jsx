
import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  ADD_USER,
  GET_MATERI_CATEGORY,
  GET_MATERI_ID,
  DELETE_USER,
} = API_ENDPOINT

class ServiceMateri {
  static async addUser(data) {
    const response = await api.post(ADD_USER, data)
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
  static async getMateriByKategori(id) {
    const response  = await api.get(GET_MATERI_CATEGORY(id))
    return response.data
  }
  static async getMateriById(id) {
    const response  = await api.get(GET_MATERI_ID(id))
    return response.data
  }
  static async deleteUser(id) {
    const response = await api.delete(DELETE_USER(id))
    return response.data
  }
}

export default ServiceMateri