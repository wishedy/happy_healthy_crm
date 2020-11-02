<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-wpaperIdth="80px" label-position="left">
        <el-form-item label="试卷Id">
            <el-input v-model="formInline.paperId" placeholder="请输入试卷Id" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="试卷名称">
            <el-input v-model="formInline.paperInfoName" placeholder="请输入试卷名称" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item label="用户Id">
            <el-input v-model="formInline.userId" placeholder="请输入用户ID" class="adminInputEl"></el-input>
        </el-form-item>
        <el-form-item
            label="试卷状态:"
            prop="status"
        >
            <el-select clearable placeholder="请选择试卷状态" v-model="formInline.status" class="search-box-item">
                <el-option
                    v-for="(item,index) in status"
                    :key="item"
                    :label="item"
                    :value="index"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item
            label="测试状态:"
            prop="status"
        >
            <el-select clearable placeholder="请选择试卷状态" v-model="formInline.isOver" class="search-box-item">
                <el-option
                    v-for="(item,index) in isOver"
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
                <el-button type="primary" @click.native="createHandle">新建试题 +</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
export default {
  data () {
    const adminpaperId = localStorage.getItem('adminpaperId')
    return {
      updateUser: adminpaperId,
      formInline: {
        paperId: '',
        status: '',
        isOver: '',
        paperInfoName: ''
      },
      status: {
        0: '待支付',
        1: '已支付'
      },
      isOver: {
        0: '测试未完成',
        1: '测试已完成'
      },
      originalForm: {
        paperId: '',
        status: '',
        isOver: '',
        paperInfoName: ''
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
