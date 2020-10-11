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
                label="会员ID">
            </el-table-column>
            <el-table-column
                prop="names"
                label="会员名称">
            </el-table-column>
            <el-table-column
                prop="sex"
                :formatter="formatterSex"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                prop="birthday"
                label="生日">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="totalMoney"
                label="总计消费">
            </el-table-column>
            <el-table-column
                prop="createTime"
                sortable
                :formatter="formatterCreateTime"
                label="注册时间">
            </el-table-column>
            <!--<el-table-column  min-width="140" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click.native="editColumn(scope.row)">编辑</el-button>
                </template>
            </el-table-column>-->
        </el-table>
    </div>
</template>

<script>
import { formatDate } from '../../../../utils/common'
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
    formatterSex (row, column) {
      const status = row.status
      return parseInt(status, 10) === 0 ? '女' : '男'
    },
    formatterCreateTime (row, column) {
      const time = row.createTime
      return formatDate(time)
    },
    formatterUpdateTime (row, column) {
      const time = row.updateTime || row.createTime
      return formatDate(time)
    },
    formatterWork (row, column) {
      const grade = parseInt(row.userWork, 10)
      let userWork = ''
      switch (grade) {
        case 1:
          userWork = '学生'
          break
        case 2:
          userWork = '教职工'
          break
        case 3:
          userWork = '企业'
          break
        case 4:
          userWork = '医院'
          break
        case 5:
          userWork = '个人'
          break
        case 6:
          userWork = row.profession
          break
      }
      return userWork
    }
  }
}
</script>

<style scoped>

</style>
