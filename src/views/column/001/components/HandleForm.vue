<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px" label-position="left">
        <el-form-item label="会员ID">
            <el-input v-model="formInline.id" placeholder="请输入会员ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="会员名称">
            <el-input v-model="formInline.trueName" placeholder="请输入会员名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="导师">
            <el-input v-model="formInline.userTutor" placeholder="请输入导师名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="研究方向">
            <el-input v-model="formInline.business" placeholder="研究方向" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
            <el-input v-model="formInline.phoneNum" placeholder="联系方式" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="省">
            <el-input v-model="formInline.province" placeholder="省" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="市">
            <el-input v-model="formInline.city" placeholder="市" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="县/区">
            <el-input v-model="formInline.county" placeholder="县/区" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="其他职业">
            <el-input v-model="formInline.profession" placeholder="其他职业" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="学校/单位">
            <el-input v-model="formInline.userSchool" placeholder="学校/单位" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="职业">
            <el-select v-model="formInline.userWork" placeholder="职业" class="adminInputEl">
                <el-option label="学生" value="1"></el-option>
                <el-option label="教职工" value="2"></el-option>
                <el-option label="企业" value="3"></el-option>
                <el-option label="医院" value="4"></el-option>
                <el-option label="个人" value="5"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="职业">
            <el-input v-model="formInline.userWork" placeholder="请输入会员名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
            <el-date-picker
                v-model="duringTime"
                type="datetimerange"
                :picker-options="createPickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
         </el-form-item>
        <el-form-item label="更新时间">
            <el-date-picker
                v-model="updateDuringTime"
                type="datetimerange"
                :picker-options="updatePickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
        </el-form-item>
        <div class="block">
            <el-form-item>
                <el-button type="default" @click.native="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click.native="resetList">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="createHandle">新建</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
import { createTime } from '@/utils/common'
export default {
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      updateUser: adminId,
      formInline: {
        updateUser: adminId,
        id: '',
        trueName: '',
        userTutor: '',
        userEmail: '',
        business: '',
        phoneNum: '',
        province: '',
        city: '',
        county: '',
        profession: '',
        address: '',
        userSchool: '',
        userIdCard: '',
        userWork: ''
      },
      originalForm: {
        updateUser: adminId,
        id: '',
        trueName: '',
        userTutor: '',
        userEmail: '',
        business: '',
        phoneNum: '',
        province: '',
        city: '',
        county: '',
        profession: '',
        address: '',
        userSchool: '',
        userIdCard: '',
        userWork: ''
      },
      duringTime: [],
      updateDuringTime: [],
      createPickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      updatePickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    onSubmit () {
      const _this = this
      console.log(_this.duringTime)
      const beginTime = _this.duringTime.length ? createTime(_this.duringTime[0]) : ''
      const endTime = _this.duringTime.length ? createTime(_this.duringTime[1]) : ''
      const updateBeginTime = _this.updateDuringTime.length ? createTime(_this.updateDuringTime[0]) : ''
      const updateEndTime = _this.updateDuringTime.length ? createTime(_this.updateDuringTime[1]) : ''
      _this.$emit('getTableList', { ..._this.formInline, beginTime, endTime, updateBeginTime, updateEndTime })
    },
    resetList () {
      const t = this
      t.formInline = JSON.parse(JSON.stringify(t.originalForm))
      t.duringTime = []
      t.updateDuringTime = []
    },
    createHandle () {
      const _this = this
      console.log('点击')
      _this.$emit('createHandle')
    }
  }
}
</script>
