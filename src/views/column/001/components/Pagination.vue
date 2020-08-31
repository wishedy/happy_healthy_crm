<template>
    <div class="block adminPage">
        <!--<span class="demonstration">完整功能</span>-->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
export default {
  props: {
    pageNum: {
      default () {
        return 0
      },
      type: Number
    },
    pageSize: {
      default () {
        return 0
      },
      type: Number
    },
    total: {
      default () {
        return 0
      },
      type: Number
    }
  },
  methods: {
    handleSizeChange (val) {
      const _this = this
      _this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      const _this = this
      _this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
