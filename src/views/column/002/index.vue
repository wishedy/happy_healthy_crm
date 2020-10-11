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
                @editConclusion="handleConclusion"
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
            <Conclusion
                :originalConclusion="originalConclusion"
                :options="conclusionOptions"
                :conclusionNum="conclusionNum"
                :conclusionData="conclusionData"
                @submit="handleConclusionSubmit"
                :visible.sync = "conclusionVisibile"
            ></Conclusion>
        </section>
    </section>
</template>
<script>
import { updateConclusion, getTestResult, addConclusion, updateQuestions, getQuestionsType, getQuestions, addQuestions } from '@/resource'
import HandleForm from './components/HandleForm'
import EditPanel from './components/EditPanel'
import EditTemplate from './components/EditTemplate'
import Conclusion from './components/Conclusion'
import TableList from './components/TableList'
import Pagination from './components/Pagination'
export default {
  name: 'manageQuestions',
  data () {
    const adminId = localStorage.getItem('adminId')
    return {
      editVisibile: false,
      templateVisibile: false,
      conclusionVisibile: false,
      updateUser: adminId,
      originalConclusion: [],
      pageNum: 1,
      pageSize: 10,
      typeList: [],
      templateOptions: {},
      conclusionNum: 0,
      conclusionData: {},
      conclusionOptions: {},
      editData: {},
      submitData: {},
      submitConclusionData: {},
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
    handleConclusionSubmit (data) {
      const _this = this
      console.log(data)
      _this.submitConclusionData = data
      console.log('提交')
      if (_this.originalConclusion.length === 0) {
        _this.handleConclusionEditConfirm()
      } else {
        // 无id新增
        _this.handleAddConclusionRequest()
      }
    },
    async getTypeList (data) {
      const _this = this
      const param = {
        pageSize: 10000,
        pageNum: 1
      }
      const req = await getQuestionsType(param)
      _this.typeList = req.list
      console.log(req)
    },
    async handleAddRequest () {
      const _this = this
      console.log(_this.updateUser + '创建用户')
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
    async handleAddConclusionRequest () {
      const _this = this
      console.log(_this.updateUser + '创建用户')
      const res = await addConclusion(_this.submitConclusionData)
      _this.originalConclusion = res
      if (res) {
        const message = _this.submitConclusionData[0].id ? '编辑完成' : '创建完成'
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
    async handleUpdateConclusionRequest () {
      const _this = this
      console.log(_this.submitConclusionData)
      console.log('------++++++-------')
      const res = await updateConclusion(_this.submitConclusionData)
      if (res) {
        const message = _this.submitConclusionData[0].id ? '编辑完成' : '更新完成'
        _this.$message.success(message)
      }
      _this.handleAfterRequest()
    },
    handleClose () {
      const _this = this
      _this.editVisibile = false
      _this.templateVisibile = false
      _this.conclusionVisibile = false
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
    handleConclusionEditConfirm () {
      const _this = this
      _this.$confirm('是否保存当前修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.handleUpdateConclusionRequest()
      }).catch(() => {})
    },
    handleAfterRequest () {
      const _this = this
      _this.submitData = {}
      _this.submitConclusionData = []
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
      const req = await getQuestions(param)
      _this.tableList = req.list
      console.log(req)
    },
    handleTemplate (options) {
      const _this = this
      _this.templateOptions = options
      _this.templateVisibile = true
    },
    async handleConclusion (options) {
      const _this = this
      _this.conclusionOptions = options
      const res = await getTestResult({
        paperId: options.id
      })
      if (res) {
        const formatList = (list) => {
          const startJson = {}
          const endJson = {}
          const describesJson = {}
          const resultsJson = {}
          const resultsIdJson = {}
          const originalList = JSON.parse(JSON.stringify(list))
          for (let num = 0; num < originalList.length; num++) {
            const item = originalList[num]
            startJson['input' + num] = parseInt(item.beginGarde, 10)
            endJson['input' + num] = parseInt(item.endGarde, 10)
            describesJson['input' + num] = item.describes
            resultsJson['input' + num] = item.results
            resultsIdJson['id' + num] = item.id
          }
          return {
            start: startJson,
            end: endJson,
            des: describesJson,
            ids: resultsIdJson,
            content: resultsJson
          }
        }
        console.log(res.length)
        _this.conclusionNum = res.length
        _this.conclusionData = formatList(res)
        console.log(res)
        _this.conclusionVisibile = true
      }
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
    EditTemplate,
    Conclusion
  }
}
</script>
<style lang="scss" scoped>
    @import "~@scss/column/column.scss";
</style>
