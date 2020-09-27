<template>
  <section class="sample-item">
    <h1 class="instrument-title">
      <i></i>
      <span>试卷模板：<em>注意：多个题目时，拖动题目可以改变题目顺序</em></span>
    </h1>
      <section class="sample-form-module nothing" v-if="list.length===0">
          该试卷暂无题目点击蓝色按钮开始试题
      </section>
      <vuedraggable class="wrapper" v-model="list">
          <transition-group>
    <section class="sample-form-module" :key="item.id" v-for="(item,index) in list" :class="{'sample-form-input':parseInt(item.types,10)===3,'sample-form-check':parseInt(item.types,10)===2,'sample-form-radio':parseInt(item.types,10)===1,'sample-form-text':parseInt(item.types,10)===4}">
      <section class="form-panel">
          <span class="label">
            <i v-if="(parseInt(item.isMust,10)===0)">*</i>
            {{item.title}}：
          </span>
          <span class="wrap" v-if="parseInt(item.types,10)===3">
            <input type="text" :placeholder="'请输入'+item.title" disabled>
          </span>
          <span class="wrap" v-if="parseInt(item.types,10)===4">
          <textarea name=""   cols="30" rows="10" :placeholder="'请输入'+item.title" disabled></textarea>
          </span>
          <span class="wrap" v-if="parseInt(item.types,10)===1||parseInt(item.types,10)===2">
          <span class="radio-item" v-for="(radioItem,radioIndex) in item.optionInfoList" :key="index+'-'+radioIndex">
            <i></i>
            <em v-text="radioItem.contents+'分值('+radioItem.grade+')'"></em>
          </span>
        </span>
          <span class="require" v-if="(parseInt(item.isMust,10)===0)">必填</span>
          <span class="sample-delete" @click="deleteSample(item.id)">
              <i></i>
              删除
            </span>
      </section>
      <section class="tips" v-if="item.tipsText">
        <i>!</i>
        <em v-text="item.tipsText"></em>
      </section>
    </section>
          </transition-group>
      </vuedraggable>
    <section class="sample-form-module sample-form-add">
          <section class="addHandle" @click="addForm">
              <em class="addIcon el-icon-circle-plus"></em>
              <span>添加单一题目</span>
          </section>
      </section>
      <el-dialog
          title="新增控件"
          width="50%"
          center
          :modal-append-to-body="false"
          :visible.sync="editVisible"
          :before-close="editClose">
          <div class="block">
              <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="控件标题">
                      <el-input v-model="form.title" class="adminInputEl"></el-input>
                  </el-form-item>
                  <el-form-item label="控件类型">
                      <el-radio-group v-model="form.types">
                          <el-radio label="1">单选</el-radio>
                          <el-radio label="2">多选</el-radio>
                          <el-radio label="3">输入框</el-radio>
                          <el-radio label="4">文本框</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="必填">
                      <el-radio-group v-model="form.isMust">
                          <el-radio label="0">必传</el-radio>
                          <el-radio label="1">非必传</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="选项个数" v-if="parseInt(form.types,10)===1||parseInt(form.types,10)===2">
                      <el-input v-model="form.optionNum" class="adminInputEl"></el-input>个
                  </el-form-item>
                  <el-form-item label="每个选项内容" v-if="(parseInt(form.types,10)===1||parseInt(form.types,10)===2)&&form.optionNum">
                      <section v-for="i in parseInt(form.optionNum,10)" :key="i">
                          <div>
                              <span v-text="'选项'+i+'的内容'"></span>
                              <el-input class="adminInputEl" :placeholeder="'请输入选项'+i+'的内容'" v-model="dynamicForm.input['input'+(i-1)]"></el-input>

                          </div>
                          <div>
                              <span v-text="'选项'+i+'的分值'"></span>
                              <el-input class="adminInputEl" :placeholeder="'请输入选项'+i+'对应的分值'" v-model="dynamicForm.grade['input'+(i-1)]"></el-input>

                          </div>
                      </section>
                  </el-form-item>
                  <el-form-item label="提示内容">
                      <el-input type="textarea" v-model="form.tipsText" class="adminInputEl"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onSubmit">确定</el-button>
                      <el-button @click="editVisible=false">取消</el-button>
                  </el-form-item>
              </el-form>
          </div>
      </el-dialog>
  </section>
</template>
<script>
import vuedraggable from 'vuedraggable'
import { updateSampleOrderBy, getSample, deleteSample, addSample } from '@/resource'
import { checkInvalid } from '@/utils/common'
import { testNum } from '@/utils/regularTest'
export default {
  name: 'sampleItem',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    show: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    const _this = this
    const adminId = localStorage.getItem('adminId')
    const id = _this.$route.query.id
    return {
      list: [],
      updateUser: adminId,
      id: id,
      editVisible: false,
      dynamicForm: {
        input: {},
        grade: {}
      },
      form: {
        title: '',
        types: '',
        isMust: '',
        optionNum: '',
        tipsText: '',
        choiceContent: ''
      },
      originalForm: {
        title: '',
        types: '',
        isMust: '',
        optionNum: '',
        tipsText: '',
        choiceContent: ''
      }
    }
  },
  components: {
    vuedraggable
  },
  computed: {
    choiceContent () {
      const _this = this
      let str = ''
      let num = 0
      for (const key in _this.dynamicForm.input) {
        if (num === 0) {
          str += _this.dynamicForm.input[key]
        } else {
          str += ',' + _this.dynamicForm.input[key]
        }
        num++
      }
      return str
    },
    choiceContentOnOff () {
      const _this = this
      let num = 0
      for (const key in _this.dynamicForm.input) {
        if (!checkInvalid(_this.dynamicForm.input[key])) {
          num++
        }
      }
      return parseInt(_this.form.optionNum, 10) === num
    }
  },
  watch: {
    show (n) {
      const _this = this
      if (n) {
        _this.getList()
      }
    },
    'dynamicForm.input': {
      handler (n) {
        console.log(n)
      },
      deep: true
    },
    editVisible (n) {
      const _this = this
      if (!n) {
        _this.form = _this.originalForm
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
      }
    },
    'form.optionNum' (n) {
      const _this = this
      if (!checkInvalid(n)) {
        if (!testNum(n)) {
          _this.$alert('【选项个数】必须是阿拉伯数字', {
            confirmButtonText: '知道了'
          })
            .then(() => {
              _this.form.optionNum = ''
            })
            .catch(action => {

            })
        } else {
          const jsonInput = {}
          const jsonGrade = {}
          for (let num = 0; num < n; num++) {
            const keyName = 'input' + num
            const gradeName = 'input' + num
            jsonInput[keyName] = ''
            jsonGrade[gradeName] = ''
          }
          _this.dynamicForm.input = jsonInput
          _this.dynamicForm.grade = jsonGrade
        }
      }
    },
    list (n) {
      if (n) {
        const param = []
        for (let num = 0; num < n.length; num++) {
          const json = {
            id: n[num].id,
            orderBy: num
          }
          param.push(json)
        }
        const updateList = async () => {
          const res = await updateSampleOrderBy(param)
          if (res) {
            console.log('更新成功')
          }
        }
        param.length && updateList()
      }
    }
  },
  mounted () {
    const _this = this
    _this.getList()
  },
  methods: {
    getOptionsList () {
      const _this = this
      const resultList = []
      let num = 0
      for (const key in _this.dynamicForm.input) {
        resultList.push({
          questionId: '',
          grade: _this.dynamicForm.grade[key],
          contents: _this.dynamicForm.input[key],
          orderBy: num
        })
        num++
      }
      return resultList
    },
    editClose () {
      const _this = this
      _this.editVisible = false
    },
    async getList () {
      const _this = this
      const params = {
        paperInfoId: _this.options.id
      }
      const res = await getSample(params)
      if (res) {
        _this.list = res
        _this.editVisible = false
      }
    },
    deleteSample (id) {
      const _this = this
      _this.$confirm('您确定要删除该控件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const param = {
          id: id
        }
        const res = await deleteSample(param)
        if (res) {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
          await _this.getList()
        }
      })
    },
    addForm () {
      const _this = this
      _this.editVisible = true
    },
    async onSubmit () {
      const _this = this
      console.log('submit!')
      if (checkInvalid(_this.form.title)) {
        _this.$message.error('请输入控件标题')
        return false
      }
      if (checkInvalid(_this.form.types)) {
        _this.$message.error('请选择控件类型')
        return false
      }
      if (checkInvalid(_this.form.isMust)) {
        _this.$message.error('请确定该控件是否是必填')
        return false
      }
      if ((parseInt(_this.form.types, 10) === 1 || parseInt(_this.form.types, 10) === 2) && checkInvalid(_this.form.optionNum)) {
        _this.$message.error('请输入选项个数')
        return false
      }
      if ((parseInt(_this.form.types, 10) === 1 || parseInt(_this.form.types, 10) === 2) && (parseInt(_this.form.optionNum, 10)) && ((checkInvalid(_this.choiceContent)) || (!_this.choiceContentOnOff))) {
        _this.$message.error('请输入完整的选项内容')
        return false
      }
      let optionInfoList = []
      if ((parseInt(_this.form.types, 10) === 1 || parseInt(_this.form.types, 10) === 2)) {
        _this.form.choiceContent = _this.choiceContent
        optionInfoList = _this.getOptionsList()
        if (optionInfoList.length === 0) {
          _this.$message.error('请输入完整的选项内容')
          return false
        }
      }
      const param = {
        ..._this.form,
        paperId: _this.options.id,
        orderBy: 1,
        optionInfoList: optionInfoList
      }
      const res = await addSample(param)
      if (res) {
        _this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .sample-item{
    width: 826px;
      margin: 0 auto;
    position: relative;
    .instrument-title{
      height:25px;
      font-size:18px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(99,99,99,1);
      line-height:25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
        margin-bottom: 20px;
      i{
        width:5px;
        height:23px;
        background:rgba(64,169,255,1);
        border-radius:3px;
        margin-right: 6px;
      }
        em{
            font-weight: 400;
            font-size: 14px;
        }
    }
    .sample-delete{
        display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(199,199,199,1);
      line-height:25px;
        margin-left: 10px;
        cursor: pointer;
        visibility: hidden;
      i{
        width:21px;
        height:21px;
        margin-right: 7px;
        background: url("../../../../static/images/delete.png") no-repeat center center/cover;
      }
    }
    .sample-form-module{
        margin-bottom: 48px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 83px;
        border:1px dashed rgba(0,0,0,0);
        &:hover{
            border:1px dashed #c0c4cc;
            .sample-delete{
                visibility: visible;
            }
        }
        cursor: move;
      .form-panel{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .label{
          margin-right: 5px;
          width:126px;
          height:25px;
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(99,99,99,1);
          line-height:25px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          i{
            font-size:18px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#F5A623;
            line-height: 25px;
          }
        }

      }
      .require{
        width:36px;
        height:25px;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(64,169,255,1);
        line-height:25px;
        margin-left: 11px;
      }
      .tips{
        width:450px;
        height:auto;
        font-size:16px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(204,204,204,1);
        line-height:22px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 14px;
        padding-left: 126px;
        i,em{
          font-style: normal;
        }
        i{
          width:15px;
          height:15px;
          border-radius: 50%;
          border: 1px solid #ccc;
          text-align: center;
          font-size:12px;
          line-height: 15px;
          margin-right: 10px;
        }
          em{
              width: 420px;
          }
      }
        &.nothing{
            cursor: unset;
            height: 300px;
            line-height: 300px;
            text-align: center;
            font-size: 30px;
        }
      &.sample-form-input{
        .form-panel{
          .wrap{
            width:370px;
            height:40px;
            background:rgba(250,250,250,1);
            border-radius:6px;
            padding-left: 13px;
            input{
                cursor: move;
              outline: none;
              border: none;
              background: none;
              font-size:18px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              height: 100%;
              width: 100%;
              color:#4D4D4D;
              line-height:40px;
              &:disabled,&::placeholder{
                color:rgba(179,179,179,1);
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                height: 100%;
                width: 100%;
                line-height:40px;
              }
            }
          }
        }
      }
      &.sample-form-text{
        .form-panel{
          .wrap{
            width:357px;
            height:121px;
            background:rgba(250,250,250,1);
            border-radius:6px;
            padding: 8px 13px;
            textarea{
                cursor: move;
              resize: none;
              outline: none;
              border: none;
              background: none;
              font-size:18px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              height: 100%;
              width: 100%;
              color:#4D4D4D;
              line-height:40px;
                &:disabled,&::placeholder{
                color:rgba(179,179,179,1);
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                height: 100%;
                width: 100%;
                line-height:40px;
              }
            }
          }
        }
      }
      &.sample-form-check,&.sample-form-radio{
        .wrap{
          width:383px;
          height: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .radio-item{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 22px;
            margin-bottom: 10px;
            margin-right: 20px;
            i{
              width:12px;
              height:12px;
              border:1px solid rgba(220,220,220,1);
              border-radius: 50%;
              margin-right: 10px;
            }
            em{
              font-style: normal;
              font-size:16px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(77,77,77,1);
              line-height:22px;
            }
          }
          .check-item{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 22px;
            margin-bottom: 10px;
            margin-right: 20px;
            i{
              width:12px;
              height:12px;
              border:1px solid rgba(220,220,220,1);
              margin-right: 10px;
            }
            em{
              font-style: normal;
              font-size:16px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(77,77,77,1);
              line-height:22px;
            }
          }
        }
      }
        &.sample-form-check {
            .wrap {
                .radio-item {
                    i {
                        border-radius: unset;
                    }
                }
            }
        }
      &.sample-form-add{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 60px;
          cursor: unset;
          border: none;
          .addHandle{
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              height: 56px;
              width: 300px;
              background:rgba(64,169,255,1);
              border-radius:4px;
              color: #fff;
              font-size: 14px;
              cursor: pointer ;
          }
          .addHandleBack{
              width: 160px;
              background:rgba(203,203,203,1);
              border-radius:4px;
              margin-left: 10px;
              font-size:14px;
              font-family:PingFang-SC-Bold,PingFang-SC;
              font-weight:bold;
              color:rgba(255,255,255,1);
              text-align: center;

          }
        .addIcon{
            width: 46px;
            height: 46px;
            margin-right: 10px;
            text-align: center;
            line-height: 46px;
            font-size: 30px;
        }
     }
    }

  }
</style>
<style lang="scss">
    .sample-item{
        .adminInputEl{
            width:300px;
            margin-right: 10px;
            margin-bottom: 5px;
        }
    }
</style>
