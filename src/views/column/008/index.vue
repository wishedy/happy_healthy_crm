<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <HandleForm
                @getTableList="getTableList"
                @createHandle="createHandle"
            >
            </HandleForm>
            <TableList
                :tableList="tableList"
                @editTemplate="handleTemplate"
                @edit="edit"
            ></TableList>
            <Pagination
                :pageNum="pageNum"
                :pageSize="pageSize"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
            ></Pagination>
            <EditPanel
                :typeList="typeList"
                :editData = "editData"
                @submit="handleSubmit"
                :visible.sync = "editVisibile"
            ></EditPanel>
            <EditTemplate
                :options = "templateOptions"
                @submit="handleTemplateSubmit"
                :visible.sync = "templateVisibile"
            ></EditTemplate>
        </section>
    </section>
</template>
<script>
import { updateQuestions, getIndentList, addQuestions } from '@/resource'
import HandleForm from './components/HandleForm'
import EditPanel from './components/EditPanel'
import EditTemplate from './components/EditTemplate'
import TableList from './components/TableList'
import Pagination from './components/Pagination'
export default {
  name: 'manageQuestions',
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      editVisibile: false,
      templateVisibile: false,
      updateUser: adminId,
      pageNum: 1,
      pageSize: 10,
      typeList: [],
      templateOptions: {},
      editData: {},
      submitData: {},
      tableList: [],
      total: 0
    }
  },
  methods: {
    handleSizeChange (num) {
      const _this = this
      _this.pageSize = num
      _this.getTableList()
    },
    handleCurrentChange (num) {
      const _this = this
      _this.pageNum = num
      _this.getTableList()
    },
    handleSubmit (data) {
      const _this = this
      _this.submitData = data
      console.log('提交')
      console.log(_this.submitData, _this.submitData.id)
      if (_this.submitData.id) {
        _this.handleEditConfirm()
      } else {
        // 无id新增
        _this.handleAddRequest()
      }
    },
    handleTemplateSubmit (data) {
      const _this = this
      _this.submitData = data
      console.log('提交')
      console.log(_this.submitData, _this.submitData.id)
      if (_this.submitData.id) {
        _this.handleTemplateEditConfirm()
      } else {
        // 无id新增
        _this.handleAddTemplateRequest()
      }
    },
    async getTypeList (data) {
      const _this = this
      const param = {
        pageSize: 10000,
        pageNum: 1
      }
      const req = await getIndentList(param)
      _this.typeList = req.list
      console.log(req)
    },
    async handleAddRequest () {
      const _this = this
      console.log(_this.updateUser + '创建用户')
      debugger
      const res = await addQuestions({
        createUser: _this.updateUser,
        ..._this.submitData
      })
      if (res) {
        const message = _this.submitData.id ? '编辑完成' : '创建完成'
        _this.$message.success(message)
      }
      _this.handleAfterRequest()
    },
    async handleAddTemplateRequest () {
      const _this = this
      console.log(_this.updateUser + '创建用户')
      debugger
      const res = await addQuestions({
        createUser: _this.updateUser,
        ..._this.submitData
      })
      if (res) {
        const message = _this.submitData.id ? '编辑完成' : '创建完成'
        _this.$message.success(message)
      }
      _this.handleAfterRequest()
    },
    async handleUpdateRequest () {
      const _this = this
      const res = await updateQuestions({
        updateUser: _this.updateUser,
        ..._this.submitData
      })
      if (res) {
        const message = _this.submitData.id ? '编辑完成' : '更新完成'
        _this.$message.success(message)
      }
      _this.handleAfterRequest()
    },
    handleClose () {
      const _this = this
      _this.editVisibile = false
    },
    handleEditConfirm () {
      const _this = this
      _this.$confirm('是否保存当前修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.handleUpdateRequest()
      }).catch(() => {})
    },
    handleTemplateEditConfirm () {
      const _this = this
      _this.$confirm('是否保存当前修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.handleUpdateRequest()
      }).catch(() => {})
    },
    handleAfterRequest () {
      const _this = this
      _this.submitData = {}
      _this.getTableList()
      _this.handleClose()
    },
    createHandle () {
      const _this = this
      _this.editData = {}
      console.log('点击回调')
      _this.editVisibile = true
      console.log(_this.editVisibile)
    },
    async getTableList (data) {
      console.log('获取数据')
      const _this = this
      const param = {
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ...data
      }
      const req = await getIndentList(param)
      _this.tableList = req.list
      console.log(req)
    },
    handleTemplate (options) {
      const _this = this
      _this.templateOptions = options
      _this.templateVisibile = true
    },
    edit (data) {
      const _this = this
      _this.editData = data
      _this.editVisibile = true
    }
  },
  mounted () {
    const _this = this
    _this.getTypeList()
    _this.getTableList()
  },
  components: {
    HandleForm,
    TableList,
    Pagination,
    EditPanel,
    EditTemplate
  }
}
</script>
<style lang="scss" scoped>
    @import "~@scss/column/column.scss";
</style>
