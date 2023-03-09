import axios from 'axios'
import {apiUrl} from './config'

const axiosApi = axios.create({
  baseURL: apiUrl,
  withCredentials: true
})

export default axiosApi
