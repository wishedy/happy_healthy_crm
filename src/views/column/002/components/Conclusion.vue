<template>
    <BaseDrawer
        :visible="visible"
        width="670px"
        @close="handleClose"
        @cancel="handleClose"
        @confirm="onsubmit"
    >
        <el-form ref="form" :model="form" label-width="180px">
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
    originalConclusion: {
      type: Array,
      default () {
        return []
      }
    },
    conclusionData: {
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
    conclusionNum: {
      type: Number,
      default () {
        return 0
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
      console.log(n + '改变')
      const _this = this
      const dynamicForm = {
        start: {},
        end: {},
        des: {},
        content: {}
      }
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
            const checkVal = (key, innerKey) => {
              if (_this.conclusionData[key][innerKey]) {
                return _this.conclusionData[key][innerKey]
              } else {
                return ''
              }
            }
            jsonStart[startName] = checkVal('start', startName)
            jsonEnd[endName] = checkVal('end', endName)
            jsonDes[desName] = checkVal('des', desName)
            jsonContent[contentName] = checkVal('content', contentName)
          }
          dynamicForm.start = jsonStart
          dynamicForm.end = jsonEnd
          dynamicForm.des = jsonDes
          dynamicForm.content = jsonContent
        }
        _this.dynamicForm = JSON.parse(JSON.stringify(dynamicForm))
      }
    },
    visible (n) {
      const _this = this
      console.log('页面进入')
      if (n) {
        _this.originalForm.optionNum = _this.optionNum
        _this.form.optionNum = _this.conclusionNum
        console.log(JSON.parse(JSON.stringify(_this.conclusionData)))
        _this.$nextTick(() => {
          _this.dynamicForm = JSON.parse(JSON.stringify(_this.conclusionData))
          console.log(_this.dynamicForm)
          console.log('=============')
        })
        console.log(_this.conclusionNum)
      } else {
        const idObject = document.getElementsByClassName('v-modal')[0]

        if (idObject != null) { idObject.parentNode.removeChild(idObject) }
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
      const result = []
      let checkOnOff = true
      for (let num = 0; num < _this.form.optionNum; num++) {
        const beginGarde = _this.dynamicForm.start[`input${num}`]
        const endGarde = _this.dynamicForm.end[`input${num}`]
        const describes = _this.dynamicForm.des[`input${num}`]
        const results = _this.dynamicForm.content[`input${num}`]
        const id = _this.dynamicForm.ids && _this.dynamicForm.ids[`id${num}`] ? _this.dynamicForm.ids[`id${num}`] : ''
        if (checkInvalid(beginGarde) || checkInvalid(endGarde) || checkInvalid(describes) || checkInvalid(results)) {
          checkOnOff = false
          _this.$alert('请输入完整的结论信息', {
            confirmButtonText: '知道了'
          })
            .then(() => {
              const idObject = document.getElementsByClassName('v-modal')[0]

              if (idObject != null) { idObject.parentNode.removeChild(idObject) }
              const element = document.getElementsByClassName('adminContentInner')[0]
              console.log(element)
              const modal = document.createElement('div')
              modal.className = 'v-modal'
              modal.onclick = () => {
                _this.$emit('closeModal')
                setTimeout(() => {
                  modal.parentNode.removeChild(modal)
                }, 300)
              }
              modal.setAttribute('tabindex', 0)
              modal.style.zIndex = '100'
              element.appendChild(modal)
            })
            .catch(action => {

            })
        } else {
          const json = {
            id: id,
            paperId: _this.options.id,
            beginGarde: _this.dynamicForm.start[`input${num}`],
            endGarde: _this.dynamicForm.end[`input${num}`],
            describes: _this.dynamicForm.des[`input${num}`],
            results: _this.dynamicForm.content[`input${num}`]
          }
          result.push(json)
        }
      }
      for (let num = 0; num < _this.originalConclusion.length; num++) {
        const item = _this.originalConclusion[num]
        if (result[num]) {
          result[num].id = item.id
        }
      }
      if (result.length && checkOnOff) {
        console.log(result)
        _this.$emit('submit', result)
      }
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
