<template>
    <BaseDrawer
        :visible="visible"
        width="670px"
        @close="handleClose"
        @cancel="handleClose"
        @confirm="onsubmit"
    >
        <el-form ref="form" :model="form" :rules="rules" label-width="180px">
            <el-form-item label="评分范围个数" prop="orderBy">
                <el-input
                    v-model.number="form.optionNum"
                    type='number'
                    class="search-box-item"
                    placeholder="请输入评分范围个数"
                />
            </el-form-item>
            <el-form-item label="每个范围分数和对应的描述" v-if="form.optionNum">
                <section v-for="i in parseInt(form.optionNum,10)" :key="i"  style="border: 1px dashed #ccc;padding:20px;margin-bottom: 30px;">
                    <div>
                        <span v-text="'第'+i+'个范围的开始范围'"></span>
                        <el-input class="adminInputEl" :placeholeder="'请输入第'+i+'个范围的开始范围'" v-model="dynamicForm.start['input'+(i-1)]"></el-input>
                        <span v-text="'第'+i+'个范围的结束范围'"></span>
                        <el-input class="adminInputEl" :placeholeder="'请输入第'+i+'个范围的结束范围'" v-model="dynamicForm.end['input'+(i-1)]"></el-input>

                    </div>
                    <div>
                        <span v-text="'第'+i+'个范围的描述'"></span>
                        <el-input class="adminInputEl" :placeholeder="'请输入第'+i+'个范围的描述'" v-model="dynamicForm.des['input'+(i-1)]"></el-input>

                    </div>
                    <div>
                        <span v-text="'第'+i+'个范围的结论'"></span>
                        <el-input class="adminInputEl" :placeholeder="'请输入第'+i+'个范围的结论'" v-model="dynamicForm.content['input'+(i-1)]"></el-input>
                    </div>
                </section>
            </el-form-item>
        </el-form>
    </BaseDrawer>
</template>
<script>
import { testNum } from '@/utils/regularTest'
import { checkInvalid } from '@/utils/common'
import BaseDrawer from '@/views/components/Drawer/Drawer.vue'
export default {
  props: {
    editData: {
      type: Object,
      default () {
        return {}
      }
    },
    options: {
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
      dynamicForm: {
        start: {},
        end: {},
        des: {},
        content: {}
      },
      form: {
        optionNum: 0
      },
      originalForm: {
        optionNum: 0
      }
    }
  },
  components: {
    BaseDrawer
  },
  watch: {
    'form.optionNum' (n) {
      const _this = this
      if (!checkInvalid(n)) {
        if (!testNum(n)) {
          _this.$alert('【范围个数】必须是阿拉伯数字', {
            confirmButtonText: '知道了'
          })
            .then(() => {
              _this.form.optionNum = ''
            })
            .catch(action => {

            })
        } else {
          const jsonStart = {}
          const jsonEnd = {}
          const jsonDes = {}
          const jsonContent = {}
          for (let num = 0; num < n; num++) {
            const startName = 'input' + num
            const endName = 'input' + num
            const desName = 'input' + num
            const contentName = 'input' + num
            jsonStart[startName] = ''
            jsonEnd[endName] = ''
            jsonDes[desName] = ''
            jsonContent[contentName] = ''
          }
          _this.dynamicForm.start = jsonStart
          _this.dynamicForm.end = jsonEnd
          _this.dynamicForm.des = jsonDes
          _this.dynamicForm.content = jsonContent
        }
      }
    },
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
