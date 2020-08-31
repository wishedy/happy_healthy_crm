import { getAxios } from './axios'
export const api = getAxios({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  }
})
