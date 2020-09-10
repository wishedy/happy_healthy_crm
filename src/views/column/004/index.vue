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
                :editData = "editData"
                @submit="handleSubmit"
                :visible.sync = "editVisibile"
            ></EditPanel>
        </section>
    </section>
</template>
<script>
import { updateBanner, getBanner, addBanner } from '@/resource'
import HandleForm from './components/HandleForm'
import EditPanel from './components/EditPanel'
import TableList from './components/TableList'
import Pagination from './components/Pagination'
export default {
  name: 'manageQuestions',
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      editVisibile: false,
      updateUser: adminId,
      pageNum: 1,
      pageSize: 10,
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
    async handleAddRequest () {
      const _this = this
      const res = await addBanner({
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
      const res = await updateBanner({
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
      const _this = this
      const param = {
        pageSize: _this.pageSize,
        pageNum: _this.pageNum
      }
      const req = await getBanner(param)
      _this.tableList = req.list
      console.log(req)
    },
    edit (data) {
      const _this = this
      _this.editData = data
      _this.editVisibile = true
    }
  },
  mounted () {
    const _this = this
    _this.getTableList()
  },
  components: {
    HandleForm,
    TableList,
    Pagination,
    EditPanel
  }
}
</script>
<style lang="scss" scoped>
    @import "~@scss/column/column.scss";
</style>
