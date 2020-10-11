<template>
    <div class="block">
        <el-table
            :data="tableList"
            border
            highlight-current-row
            :default-sort = "{prop: 'createTime', order: 'descending'}"
            style="width: 100%">
            <el-table-column
                prop="userId"
                label="用户ID">
            </el-table-column>
            <el-table-column
                prop="paperId"
                label="试卷ID">
            </el-table-column>
            <el-table-column
                prop="orderNo"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="paperInfoName"
                label="试卷名称">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="formatStatus"
                label="订单状态">
            </el-table-column>
            <el-table-column
                prop="isOver"
                :formatter="formatOver"
                label="测试状态">
            </el-table-column>
            <el-table-column
                prop="paperTypeName"
                label="试卷所属类型">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterCreateTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                sortable
                :formatter="formatterUpdateTime"
                label="更新时间">
            </el-table-column>
            <el-table-column  min-width="140" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" style="margin-left: 0;" @click.native="addTemplate(scope.row,0)">查看答题情况模板</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    tableList: {
      default () {
        return []
      },
      type: Array
    }
  },
  methods: {
    upLoadZip (id) {
      const _this = this
      _this.$router.push({
        path: '/addProTemplate',
        query: {
          type: 1,
          id: id,
          updateUser: _this.updateUser
        }
      })
    },
    editColumn (data) {
      const _this = this
      _this.$emit('edit', data)
    },
    addTemplate (data, type) {
      const _this = this
      _this.$emit('editTemplate', { ...data, type })
    },
    formatStatus (row, column) {
      const status = row.status
      return parseInt(status, 10) === 0 ? '待支付' : '已支付'
    },
    formatOver (row, column) {
      const status = row.isOver
      return parseInt(status, 10) === 0 ? '测试未完成' : '测试已完成'
    },
    formatterCreateTime (row, column) {
      const time = row.createTime
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    formatterUpdateTime (row, column) {
      const time = row.updateTime || row.createTime
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>

</style>
