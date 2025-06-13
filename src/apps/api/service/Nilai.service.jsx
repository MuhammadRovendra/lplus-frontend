
import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  ADD_USER,
  ADD_USER_BUNDLE,
  GET_BUNDLE_BY_ID,
  UPDATE_RATING_BUNDLE_BY_USER,
  GET_NILAI_BY_USER_BY_KATEGORI,
  GET_NILAI_BY_USER,
  UPDATE_NILAI_BY_USER,
  UPDATE_LIKE_BY_USER,
  GET_MATERI_ID,
  DELETE_USER,
} = API_ENDPOINT

class ServiceNilai {
  static async addNilai(data) {
    const response = await api.post(ADD_USER, data)
    return response.data
  }
  static async CreateUserBundle(data) {
    const response = await api.post(ADD_USER_BUNDLE, data)
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
  static async getNilai(id) {
    const response  = await api.get(GET_NILAI_BY_USER(id))
    return response.data
  }
  static async getNilaiByUserByKategori(idUser, idBundle) {
    const response  = await api.get(GET_NILAI_BY_USER_BY_KATEGORI(idUser, idBundle))
    return response.data
  }
  static async getByID(id) {
    const response  = await api.get(GET_BUNDLE_BY_ID(id))
    return response.data
  }
  static async updateNilai(id, data) {
    const response  = await api.put(UPDATE_NILAI_BY_USER(id), data)
    return response.data
  }
  static async updateRatingBundle(id, data) {
    const response  = await api.put(UPDATE_RATING_BUNDLE_BY_USER(id), data)
    return response.data
  }
  static async updateLike(id, data) {
    const response  = await api.put(UPDATE_LIKE_BY_USER(id), data)
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

export default ServiceNilai