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
                label="文章ID">
            </el-table-column>
            <el-table-column
                prop="title"
                label="文章名称">
            </el-table-column>
            <el-table-column
                prop="id"
                sortable
                :formatter="formatterLink"
                label="跳转链接">
            </el-table-column>

            <el-table-column label="文章封面" min-width="200px">
                <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" alt class="table-img" />
                </template>
            </el-table-column>
            <el-table-column
                prop="introduce"
                label="文章简介">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="formatStatus"
                label="文章状态">
            </el-table-column>
            <el-table-column
                prop="orderBy"
                sortable
                label="排序">
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
      const status = row.status
      return parseInt(status, 10) === 0 ? '下架' : '上架'
    },
    formatterLink (row, column) {
      const id = row.id
      return `https://article.foodiu.cn/home?id=${id}`
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
