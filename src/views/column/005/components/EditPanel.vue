<template>
    <BaseDrawer
        :visible="visible"
        width="670px"
        @close="handleClose"
        @cancel="handleClose"
        @confirm="onsubmit"
    >
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item label="文章名称" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章状态" prop="online">
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
            <el-form-item label="文章封面" prop="imgUrl">
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
            <el-form-item label="文章描述" prop="introduce">
                <el-input   type="textarea" :autosize="{ minRows: 2}" placeholder="请输入文章描述" v-model="form.introduce" class="search-box"></el-input>
            </el-form-item>
            <el-form-item
                label="文章内容："
            >
                <div id="editor" class="editorPanel"></div>
            </el-form-item>
            <el-form-item label="跳转链接">
                <el-input  placeholder="请输入跳转链接" v-model="form.link" class="search-box"></el-input>
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
      editor: null,
      form: {
        id: '',
        status: '0',
        title: '',
        context: '',
        orderBy: '',
        link: '',
        introduce: '',
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
            message: '文章封面不能为空',
            trigger: 'blur'
          }
        ],
        context: [
          {
            required: true,
            message: '文章封面不能为空',
            trigger: 'blur'
          }
        ],
        introduce: [
          {
            required: true,
            message: '文章描述不能为空',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '文章名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      originalForm: {
        id: '',
        title: '',
        status: '0',
        context: '',
        link: '',
        orderBy: '',
        introduce: '',
        imgUrl: ''
      }
    }
  },
  components: {
    BaseDrawer
  },
  mounted () {
    const _this = this
    _this.initEdit()
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
        _this.editor && _this.editor.txt.html(_this.form.context)
      } else {
        _this.editor && _this.editor.txt.html('')
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
    initEdit () {
      const _this = this
      const E = require('wangeditor')
      _this.editor = new E('#editor')
      _this.editor.customConfig.uploadImgServer = 'https://mop-api.rouchi.com/api/app/shop/editor/upload'
      _this.editor.customConfig.onchange = (html) => {
        // html 即变化之后的内容
        _this.form.context = html
      }
      _this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        // 'image', // 插入图片
        'undo', // 撤销
        'redo' // 重复
      ]
      _this.editor.create()
      _this.editor.txt.html('')
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
    .editorPanel{
        width: 480px;
        height: 400px;
    }
</style>
