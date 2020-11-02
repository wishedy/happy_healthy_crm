<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="110px" label-position="left">
        <el-form-item label="试卷类型ID">
            <el-input v-model="formInline.id" placeholder="请输入会员ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="试卷类型名称">
            <el-input v-model="formInline.typeName" placeholder="请输入会员名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item
            label="试卷类型状态:"
            prop="status"
        >
            <el-select clearable placeholder="请选择试卷类型状态" v-model="formInline.status" class="search-box-item">
                <el-option
                    v-for="(item,index) in status"
                    :key="item"
                    :label="item"
                    :value="index"
                ></el-option>
            </el-select>
        </el-form-item>
        <div class="block">
            <el-form-item>
                <el-button type="default" @click.native="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click.native="resetList">重置</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="createHandle">新建类型 +</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
export default {
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      updateUser: adminId,
      formInline: {
        id: '',
        typeName: '',
        status: ''
      },
      status: {
        0: '下架',
        1: '上架'
      },
      originalForm: {
        id: '',
        status: '',
        typeName: ''
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
      _this.$emit('getTableList', { ..._this.formInline })
    },
    resetList () {
      const t = this
      t.formInline = JSON.parse(JSON.stringify(t.originalForm))
      t.duringTime = []
      t.updateDuringTime = []
      t.onSubmit()
    },
    createHandle () {
      const _this = this
      console.log('点击')
      _this.$emit('createHandle')
    }
  }
}
</script>
