
export const checkInvalid = (val) => {
  if (((typeof val === 'string') && (val.length === 0)) || (val === undefined) || (val === 'undefined') || (val === 'null') || (typeof val === 'undefined') || (val == null)) {
    return true
  } else {
    return false
  }
}

export const formatDate = (t) => {
  const now = new Date(t)
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

export const createTime = (dateObj, type) => {
  let timeStr = ''
  const addZero = (str) => {
    if (parseInt(str, 10) < 10) {
      return '0' + parseInt(str, 10)
    } else {
      return parseInt(str, 10)
    }
  }
  type === 0 ? timeStr = dateObj.getFullYear() + '-' + addZero(dateObj.getMonth() + 1) + '-' + addZero(dateObj.getDate()) + ' ' + addZero(dateObj.getHours()) + ':' + addZero(dateObj.getMinutes()) + ':' + addZero(dateObj.getSeconds()) : timeStr = dateObj.getFullYear() + '-' + addZero(dateObj.getMonth() + 1) + '-' + addZero(dateObj.getDate()) + ' ' + 23 + ':' + 59 + ':' + 59
  return timeStr
}

export const isEmptyObject = (obj) => {
  for (const n in obj) { return false }
  return true
}

export const TopicStatus = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 用户学位0脱单动态，1话题动态，2普通动态
    case 0:
      str = '待审核'
      break
    case 1:
      str = '驳回'
      break
    case 2:
      str = '通过'
      break
  }
  return str
}

export const recommendResourceType = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 推荐的资源类型0文章，1话题
    case 0:
      str = '文章'
      break
    case 1:
      str = '话题'
      break
  }
  return str
}

export const recommendPosition = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 推荐的位置0遇见栏目，1首页栏目，2消息栏目
    case 0:
      str = '遇见栏目'
      break
    case 1:
      str = '首页栏目'
      break
    case 2:
      str = '消息栏目'
      break
  }
  return str
}

export const recommendGrade = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 推荐的位置0遇见栏目，1首页栏目，2消息栏目
    case 0:
      str = '按序推荐'
      break
    case 1:
      str = '优先推荐'
      break
  }
  return str
}

export const recommendType = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 推荐的位置0遇见栏目，1首页栏目，2消息栏目
    case 0:
      str = '全站推送'
      break
    case 1:
      str = '单独推送'
      break
  }
  return str
}

export const sexFormat = (type) => {
  return parseInt(type, 10) === 0 ? '女' : '男'
}

export const dynamicType = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 用户学位0脱单动态，1话题动态，2普通动态
    case 0:
      str = '脱单动态'
      break
    case 1:
      str = '话题动态'
      break
    case 2:
      str = '普通动态'
      break
  }
  return str
}

export const listNum = (str) => {
  if (str && str.indexOf(',') > -1) {
    return str.split(',').length
  } else {
    return 0
  }
}

export const formatterValid = (type) => {
  return parseInt(type, 10) === 0 ? '无效' : '有效'
}

export const auditType = (type) => {
  return parseInt(type, 10) === 0 ? '新建' : '结束'
}

export const auditResult = (type) => {
  return parseInt(type, 10) === 0 ? '驳回' : '通过'
}

export const jsGetAge = (strBirthday) => {
  let returnAge
  const strBirthdayArr = strBirthday.split('-')
  const birthYear = strBirthdayArr[0]
  const birthMonth = strBirthdayArr[1]
  const birthDay = strBirthdayArr[2]

  const d = new Date()
  const nowYear = d.getFullYear()
  const nowMonth = d.getMonth() + 1
  const nowDay = d.getDate()

  if (nowYear === birthYear) {
    returnAge = 0// 同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay// 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - birthMonth// 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1// 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge// 返回周岁年龄
}

export const customerDegree = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 用户学位0大学专科，1大学本科，2研究生，3博士，4博士后
    case 0:
      str = '大学专科'
      break
    case 1:
      str = '大学本科'
      break
    case 2:
      str = '研究生'
      break
    case 3:
      str = '博士'
      break
    case 4:
      str = '博士后'
      break
  }
  return str
}

export const blackReasonFormat = (type) => {
  let str = ''
  switch (parseInt(type)) {
    case 0:
      str = '营销诈骗'
      break
    case 1:
      str = '淫秽色情'
      break
    case 2:
      str = '不友善行为'
      break
    case 3:
      str = '诱导欺骗'
      break
    case 4:
      str = '虚假资料'
      break
  }
  return str
}

export const blackState = (type) => {
  let str = ''
  switch (parseInt(type)) {
    case 0:
      str = '拉黑'
      break
    case 1:
      str = '激活'
      break
  }
  return str
}

export const blackReason = () => {
  return [
    {
      reasonName: '营销诈骗',
      reasonType: 0
    },
    {
      reasonName: '淫秽色情',
      reasonType: 1
    },
    {
      reasonName: '不友善行为',
      reasonType: 2
    },
    {
      reasonName: '诱导欺骗',
      reasonType: 3
    },
    {
      reasonName: '虚假资料',
      reasonType: 4
    }
  ]
}

export const rejectWarn = () => {
  return [
    {
      reasonName: '虚假资料',
      reasonType: 0
    },
    {
      reasonName: '证件不清晰',
      reasonType: 1
    },
    {
      reasonName: '证件号码不一致',
      reasonType: 2
    },
    {
      reasonName: '资料不齐全',
      reasonType: 3
    }
  ]
}

export const accountState = (type) => {
  let str = ''
  switch (parseInt(type)) {
    // 用户账户状态，0注册，1提交认证，等待审核，2,认证通过,3驳回认证,4拉黑
    case 0:
      str = '注册'
      break
    case 1:
      str = '提交认证'
      break
    case 2:
      str = '认证通过'
      break
    case 3:
      str = '驳回认证'
      break
    case 4:
      str = '拉黑'
      break
  }
  return str
}
export const cleanArray = function (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
export const json2Query = function (json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}
