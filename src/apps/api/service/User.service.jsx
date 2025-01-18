
import API_ENDPOINT from '../global'
import { api } from '../global/config'

const { 
  ADD_USER,
  GET_USER,
  GET_USER_BY_ID,
  RENAME,
  REPASSWORD,
  UPDATE_STATUS_USER,
  DELETE_USER,
  LOGIN_USER,
  LOGOUT_USER
} = API_ENDPOINT

class ServiceUser {
  static async addUser(data) {
    const response = await api.post(ADD_USER, data)
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
  static async getUser(token) {
    const response  = await api.get(GET_USER, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
  static async getUserById(id, token) {
    const response  = await api.get(GET_USER_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
  static async rename(id, data, token) {
    const response  = await api.put(RENAME(id), data,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
  static async repassword(id, data, token) {
    const response  = await api.put(REPASSWORD(id), data,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
  static async deleteUser(id) {
    const response = await api.delete(DELETE_USER(id))
    return response.data
  }
  static async loginUser(data ) {
    const response  = await api.post(LOGIN_USER, data)
    return response.data
  }
  static async logoutUser(data ) {
    const response  = await api.post(LOGOUT_USER, data)
    return response.data
  }
}

export default ServiceUser