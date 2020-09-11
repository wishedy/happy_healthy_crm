<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="110px" label-position="left">
        <el-form-item label="管理员ID">
            <el-input v-model="formInline.id" placeholder="请输入会员ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="管理员名称">
            <el-input v-model="formInline.realName" placeholder="请输入会员名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item
            label="管理员状态:"
            prop="deleteFlag"
        >
            <el-select clearable placeholder="请选择管理员状态" v-model="formInline.deleteFlag" class="search-box-item">
                <el-option
                    v-for="(item,index) in deleteFlag"
                    :key="item"
                    :label="item"
                    :value="index"
                ></el-option>
            </el-select>
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
        id: '',
        deleteFlag: '',
        realName: ''

      },
      originalForm: {
        id: '',
        deleteFlag: '',
        realName: ''
      },
      deleteFlag: {
        0: '下架',
        1: '上架'
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
