<template>
    <BaseDrawer
        :visible="visible"
        width="570px"
        @close="handleClose"
        @cancel="handleClose"
        @confirm="onsubmit"
    >
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item label="试卷名称" prop="names">
                <el-input v-model="form.names"></el-input>
            </el-form-item>
            <el-form-item label="收费类型" prop="isCharge">
                <el-radio-group v-model="form.isCharge">
                    <el-radio label="1">免费</el-radio>
                    <el-radio label="0">收费</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="原始价格" prop="beginPrice">
                <el-input v-model="form.beginPrice"></el-input>
            </el-form-item>
            <el-form-item label="展示价格" prop="showPrice">
                <el-input v-model="form.showPrice"></el-input>
            </el-form-item>
            <el-form-item
                label="试卷类型:"
                prop="typeId"
            >
                <el-select clearable placeholder="请选择订单状态" v-model="form.typeId" class="search-box-item">
                    <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="试卷状态" prop="online">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(item,key) in status"
                              :key="key"
                              :label="key"
                              :value="key">{{item}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="试卷排序："
                prop="orderBy"
                class="form-item-bar"
            >
                <el-input
                    v-model.number="form.orderBy"
                    type='number'
                    class="search-box-item"
                    placeholder="请输入试卷排序"
                />
            </el-form-item>
            <el-form-item label="试卷封面" prop="imgUrl">
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
            <el-form-item label="试卷描述" prop="describes">
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
    typeList: {
      type: Array,
      default () {
        return []
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
    const _this = this
    const checkShowMoney = (rule, value, callback) => {
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      const val = _this.form.showPrice
      const numMaxOnOff = Number(val) < 99999.99
      if (reg.test(val) && numMaxOnOff) {
        return callback()
      } else {
        return callback(new Error('请输入正确的金额'))
      }
    }
    const checkBeginMoney = (rule, value, callback) => {
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      const val = _this.form.beginPrice
      const numMaxOnOff = Number(val) < 99999.99
      if (reg.test(val) && numMaxOnOff) {
        return callback()
      } else {
        return callback(new Error('请输入正确的金额'))
      }
    }
    return {
      direction: 'rtl',
      status: {
        0: '下架',
        1: '上架'
      },
      form: {
        id: '',
        typeId: '',
        orderBy: '',
        isCharge: '',
        beginPrice: '',
        status: 0,
        names: '',
        describes: '',
        imgUrl: '',
        showPrice: ''
      },
      rules: {
        beginPrice: [
          { message: '请输入正确的金额', validator: checkBeginMoney, trigger: 'blur' },

          {
            required: true,
            message: '原始价格不能为空',
            trigger: 'blur'
          }
        ],
        showPrice: [
          { message: '请输入正确的金额', validator: checkShowMoney, trigger: 'blur' },

          {
            required: true,
            message: '展示价格不能为空',
            trigger: 'blur'
          }
        ],
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
        typeId: [
          {
            required: true,
            message: '试卷类型不能为空',
            trigger: 'blur'
          }
        ],
        isCharge: [
          {
            required: true,
            message: '收费类型不能为空',
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
        names: [
          {
            required: true,
            message: '试卷名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      originalForm: {
        id: '',
        typeId: '',
        orderBy: '',
        isCharge: '',
        beginPrice: '',
        names: '',
        status: '0',
        describes: '',
        imgUrl: '',
        showPrice: ''
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
