<template>
    <div class="block">
        <el-table
            :data="tableList"
            border
            highlight-current-row
            :default-sort = "{prop: 'createTime', order: 'descending'}"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="试卷ID">
            </el-table-column>
            <el-table-column
                prop="names"
                label="试卷名称">
            </el-table-column>
            <el-table-column
                prop="beginPrice"
                label="原始价格">
            </el-table-column>
            <el-table-column
                prop="showPrice"
                label="展示价格">
            </el-table-column>
            <el-table-column
                prop="orderBy"
                label="试卷排序">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="formatStatus"
                label="试卷状态">
            </el-table-column>
            <el-table-column
                prop="paperTypeName"
                label="试卷所属类型">
            </el-table-column>
            <el-table-column
                prop="describes"
                label="试卷描述">
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
                    <el-button type="text" @click.native="editColumn(scope.row)">编辑基本信息</el-button>
                    <el-button type="text" style="margin-left: 0;" @click.native="addTemplate(scope.row,0)">编辑试卷模板</el-button>
                    <el-button type="text" style="margin-left: 0;" @click.native="addConclusion(scope.row,0)">编辑测试结论</el-button>
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
    addConclusion (data, type) {
      const _this = this
      _this.$emit('editConclusion', { ...data, type })
    },
    formatStatus (row, column) {
      const status = row.status
      return parseInt(status, 10) === 0 ? '下架' : '上架'
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
