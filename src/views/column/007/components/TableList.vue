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
                label="管理员ID">
            </el-table-column>
            <el-table-column
                prop="realName"
                label="管理员名称">
            </el-table-column>
            <el-table-column
                prop="phoneNum"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="email"
                label="电子邮件">
            </el-table-column>
            <el-table-column
                prop="deleteFlag"
                :formatter="formatStatus"
                label="管理员状态">
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
                    <el-button type="text" @click.native="editColumn(scope.row)">编辑</el-button>
                    <el-button type="text" style="margin-left: 0;" @click.native="editColumn(scope.row)">密码重置</el-button>
                    <el-button type="text" style="margin-left: 0;" @click.native="editColumn(scope.row)">账号注销</el-button>
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
    editColumn (data) {
      const _this = this
      _this.$emit('edit', data)
    },
    formatStatus (row, column) {
      const status = row.deleteFlag
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
