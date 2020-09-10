import { json2Query } from '@/utils/common'
const Resource = require('./create-api')
const { api } = Resource
export function getDemoList (params) {
  console.log(params)
  return api.get(`/api/usrUser/query?${json2Query(params)}`)
}
export function getQuestions (params) {
  console.log(params)
  return api.get(`/api/paperInfo/query?${json2Query(params)}`)
}
export function getQuestionsType (params) {
  console.log(params)
  return api.get(`/api/paperType/query?${json2Query(params)}`)
}
export function addQuestionsType (params) {
  console.log(params)
  return api.post('/api/paperType/insert', params)
}
export function updateQuestionsType (params) {
  console.log(params)
  return api.post('/api/paperType/update', params)
}
export function addQuestions (params) {
  console.log(params)
  return api.post('/api/paperInfo/insert', params)
}
export function updateQuestions (params) {
  console.log(params)
  return api.post('/api/paperInfo/update', params)
}
export function addBanner (params) {
    console.log(params)
    return api.post('/api/sysBanner/insert', params)
}
export function getBanner (params) {
    console.log(params)
    return api.get(`/api/sysBanner/query?${json2Query(params)}`)
}
export function updateBanner (params) {
    console.log(params)
    return api.post(`/api/sysBanner/update`,params)
}
