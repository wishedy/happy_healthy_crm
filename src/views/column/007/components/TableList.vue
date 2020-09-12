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
                prop="identityNum"
                label="身份证号">
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
                    <el-button type="text" @click.native="auditPass(scope.row)">审核通过</el-button>
                    <el-button type="text" style="margin-left: 0;" @click.native="resetPassWord(scope.row)">密码重置</el-button>
                    <el-button type="text" style="margin-left: 0;" @click.native="cancelUser(scope.row)">账号注销</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from 'moment'
import { updateAdminInfo, resetUserPassWord } from '@/resource'
import md5 from 'blueimp-md5'

export default {
  props: {
    tableList: {
      default () {
        return []
      },
      type: Array
    }
  },
  mounted () {
    console.log('这里')
    console.log(md5('000000'))
  },
  methods: {
    editColumn (data) {
      const _this = this
      _this.$emit('edit', data)
    },
    formatStatus (row, column) {
      const status = parseInt(row.deleteFlag, 10)
      let str = ''
      switch (status) {
        case 0:
          str = '待审核'
          break
        case 1:
          str = '审核通过'
          break
        case 2:
          str = '已注销'
          break
      }
      return str
    },
    auditPass (row) {
      const _this = this
      _this.$confirm('确定通过该管理员注册申请？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await updateAdminInfo({
          id: row.id,
          deleteFlag: 1
        })
        if (res) {
          _this.$message.success('审核通过')
          setTimeout(() => {
            location.reload()
          }, 3000)
        }
      }).catch(() => {})
    },
    cancelUser (row) {
      const _this = this
      _this.$confirm('确定注销该管理员？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await updateAdminInfo({
          id: row.id,
          deleteFlag: 2
        })
        if (res) {
          _this.$message.success('已注销')
          setTimeout(() => {
            location.reload()
          }, 1000)
        }
      }).catch(() => {})
    },
    resetPassWord (row) {
      const _this = this
      _this.$confirm('确定重置密码？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await resetUserPassWord({
          userId: row.id
        })
        if (res) {
          _this.$message.success('重置')
          setTimeout(() => {
            location.reload()
          }, 1000)
        }
      }).catch(() => {})
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
