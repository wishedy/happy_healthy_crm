import { json2Query } from '@/utils/common'
const Resource = require('./create-api')
const { api } = Resource
export function getDemoList (params) {
  console.log(params)
  return api.get(`/api/usrUser/query?${json2Query(params)}`)
}
