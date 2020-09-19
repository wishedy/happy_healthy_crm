import { json2Query } from '@/utils/common'
const Resource = require('./create-api')
const { api } = Resource
export function getConsumerList (params) {
  console.log(params)
  return api.get(`/api/user/query?${json2Query(params)}`)
}
export function getIndentList (params) {
  console.log(params)
  return api.get(`/api/orders/query?${json2Query(params)}`)
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
  return api.post('/api/sysBanner/update', params)
}
export function updateArticle (params) {
  console.log(params)
  return api.post('/api/sysArticle/update', params)
}
export function addArticle (params) {
  console.log(params)
  return api.post('/api/sysArticle/insert', params)
}
export function getArticle (params) {
  console.log(params)
  return api.get(`/api/sysArticle/query?${json2Query(params)}`)
}
export function getSample (params) {
  console.log(params)
  return api.get(`/api/paperInfo/selectQuestionById?${json2Query(params)}`)
}
export function addSample (params) {
  console.log(params)
  return api.post('/api/questionInfo/insert', params)
}
export function deleteSample (params) {
  console.log(params)
  return api.post('/api/questionInfo/delete', params)
}
export function updateSampleOrderBy (params) {
  console.log(params)
  return api.post('/api/questionInfo/updateOrderBy', params)
}
export function getUserList (params) {
  console.log(params)
  return api.get(`/api/sysUser/query?${json2Query(params)}`)
}
export function resetUserPassWord (params) {
  console.log(params)
  return api.get(`api/sysUser/resetPassword?${json2Query(params)}`)
}
export function updatePassWord (params) {
  console.log(params)
  return api.post('/api/sysUser/updatePassword', params)
}
export function updateAdminInfo (params) {
  console.log(params)
  return api.post('/api/sysUser/update', params)
}
