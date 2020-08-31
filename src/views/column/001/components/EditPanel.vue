<template>
    <BaseDrawer
        :visible="visible"
        width="570px"
        @close="handleClose"
        @cancel="handleClose"
        @confirm="onsubmit"
    >
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="手机号" prop="phoneNum">
                <el-input v-model="form.phoneNum"></el-input>
            </el-form-item>
        </el-form>
    </BaseDrawer>
</template>
<script>
import BaseDrawer from '@/views/components/Drawer/Drawer.vue'
export default {
  props: {
    editData: {
      type: Object,
      default () {
        return {}
      }
    },
    visible: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  name: 'edit',
  data () {
    return {
      direction: 'rtl',
      form: {
        id: '',
        phoneNum: ''
      },
      rules: {
        phoneNum: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          }
        ]
      },
      originalForm: {
        id: '',
        phoneNum: ''
      }
    }
  },
  components: {
    BaseDrawer
  },
  watch: {
    visible (n) {
      const _this = this
      console.log('页面进入')
      if (n && _this.editData.id) {
        Object.keys(_this.form).forEach((key) => {
          console.log(key, _this.editData)
          _this.form[key] = _this.editData[key]
        })
      } else {
        _this.resetForm()
      }
    }
  },
  methods: {
    resetForm () {
      const _this = this
      _this.form = JSON.parse(JSON.stringify(_this.originalForm))
    },
    handleClose () {
      const _this = this
      _this.$emit('update:visible', false)
    },
    onsubmit () {
      const _this = this
      _this.$refs.form.validate(valid => {
        if (valid) {
          const submitForm = _this.form
          _this.$emit('submit', submitForm)
          console.log('submit!')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .edit-panel{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        min-width: 300px;
        overflow: hidden;
        background: #ffffff;
    }
</style>
