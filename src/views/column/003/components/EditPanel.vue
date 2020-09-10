<template>
    <BaseDrawer
        :visible="visible"
        width="570px"
        @close="handleClose"
        @cancel="handleClose"
        @confirm="onsubmit"
    >
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item label="试卷分类名称" prop="typeName">
                <el-input v-model="form.typeName"></el-input>
            </el-form-item>
            <el-form-item label="试卷分类状态" prop="online">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(item,key) in status"
                              :key="key"
                              :label="key"
                              :value="key">{{item}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="分类排序："
                prop="orderBy"
                class="form-item-bar"
            >
                <el-input
                    v-model.number="form.orderBy"
                    type='number'
                    class="search-box-item"
                    placeholder="请输入类型排序"
                />
            </el-form-item>
            <el-form-item label="试卷分类封面" prop="imgUrl">
                <div class="upload-wrapper">
                    <div class="upload-mask" v-if="form.imgUrl">
                        <i class="handleItem deleteImage el-icon-delete" @click="handlePictureCardDelete"></i>
                    </div>
                    <el-upload
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                        class="avatar-uploader"
                        action="/api/upload/uploadImg"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <!--<el-input v-model="form.imgUrl"></el-input>-->
            </el-form-item>
            <el-form-item label="试卷分类描述" prop="describes">
                <el-input   type="textarea" :autosize="{ minRows: 2}" placeholder="请输入试卷描述" v-model="form.describes" class="search-box"></el-input>
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
      status: {
        0: '下架',
        1: '上架'
      },
      form: {
        id: '',
        status: '0',
        typeName: '',
        createUser: '',
        orderBy: '',
        describes: '',
        imgUrl: ''
      },
      rules: {
        orderBy: [
          { min: 0, type: 'integer', message: '请输入正确的排序', trigger: ['blur'] },
          {
            required: true,
            message: '排序不能为空',
            trigger: 'blur'
          }
        ],
        imgUrl: [
          {
            required: true,
            message: '试卷封面不能为空',
            trigger: 'blur'
          }
        ],
        describes: [
          {
            required: true,
            message: '试卷描述不能为空',
            trigger: 'blur'
          }
        ],
        typeName: [
          {
            required: true,
            message: '试卷名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      originalForm: {
        id: '',
        typeName: '',
        status: '0',
        createUser: '',
        orderBy: '',
        describes: '',
        imgUrl: ''
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
    handlePictureCardDelete () {
      const _this = this
      _this.form.imgUrl = ''
    },
    handleAvatarSuccess (res, file) {
      const _this = this
      console.log('触发======')
      console.log(res)
      _this.form.imgUrl = res.result.url
    },
    beforeAvatarUpload (file) {
      console.log(file)
    },
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
