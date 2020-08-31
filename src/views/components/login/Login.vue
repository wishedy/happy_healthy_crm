<template>
    <section class="adminLogin">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-show="!registerOnOff">
            <!--<i class="el-icon-close"></i>-->
            <el-form-item label="账号" prop="pass">
                <el-input type="email" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入您的邮箱/手机号/身份证号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入您的密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
                <el-button type="info" @click.stop="goRegister">注册</el-button>
            </el-form-item>
        </el-form>
        <el-form  :model="registerForm" status-icon :rules='registerRules' ref="registerForm" label-width="100px" class="demo-ruleForm"  v-show="registerOnOff">
            <el-form-item label="姓名" prop="registerName">
                <el-input type="name" v-model="registerForm.registerName" auto-complete="off" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="registerEmail">
                <el-input v-model="registerForm.registerEmail" auto-complete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="registerPhoneNum">
                <el-input v-model="registerForm.registerPhoneNum" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="registerIdentityNum">
                <el-input v-model="registerForm.registerIdentityNum" auto-complete="off" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="管理级别" prop="registerGrade">
                <el-select v-model="registerForm.registerGrade" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="registerForm.gender">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="密码"  prop="registerPassWord">
                <el-input type="password" v-model="registerForm.registerPassWord" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click.stop="submitRegisterForm('registerForm')">提交</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
                <el-button type="info" @click.stop="goLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
import { mapActions } from 'vuex'
import { testName, testEmail, testID, testPhoneNum, testPassword } from '../../../utils/regularTest'
import axios from 'axios'
import md5 from 'blueimp-md5'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        console.log(this.ruleForm2.checkPass)
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入名字'))
      } else {
        console.log(this.registerForm.registerName, value, testName(value))
        if (!testName(value)) {
          callBack(new Error('请输入正确的名字'))
        } else {
          this.$refs.registerForm.validateField('registerEmail')
          callBack()
        }
      }
    }
    const validateEmail = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入邮件'))
      } else {
        if (testEmail(value)) {
          this.$refs.registerForm.validateField('registerPhoneNum')
        } else {
          callBack(new Error('请输入正确的邮件'))
        }
        callBack()
      }
    }
    const validateIdentityNum = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入身份号'))
      } else {
        if (testID(value)) {
          this.$refs.registerForm.validateField('registerGrade')
        } else {
          callBack(new Error('请输入正确的身份号'))
        }
        callBack()
      }
    }
    const validateGrade = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请选择管理员级别'))
      } else {
        this.$refs.registerForm.validateField('registerPassWord')
        callBack()
      }
    }
    const validatePhoneNum = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入手机号'))
      } else {
        if (testPhoneNum(value)) {
          this.$refs.registerForm.validateField('registerIdentityNum')
        } else {
          callBack(new Error('请输入正确的手机号'))
        }
        callBack()
      }
    }
    const validatePassWord = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入密码'))
      } else {
        if (testPassword(value)) {
        } else {
          callBack(new Error('密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多30个字符'))
        }
        callBack()
      }
    }
    return {
      options: [{
        value: '0',
        label: '超级管理员'
      }, {
        value: '1',
        label: '高级管理员'
      }, {
        value: '2',
        label: '普通管理员'
      }],
      ruleForm2: {
        pass: '',
        checkPass: ''
      },
      registerForm: {
        registerName: '',
        registerEmail: '',
        registerPhoneNum: '',
        registerIdentityNum: '',
        registerGrade: '',
        registerPassWord: '',
        gender: '1'
      },
      registerRules: {
        registerName: [
          {
            validator: validateName, trigger: 'blur'
          }
        ],
        registerEmail: [
          {
            validator: validateEmail, trigger: 'blur'
          }
        ],
        registerPhoneNum: [
          {
            validator: validatePhoneNum, trigger: 'blur'
          }
        ],
        registerIdentityNum: [
          {
            validator: validateIdentityNum, trigger: 'blur'
          }
        ],
        registerPassWord: [
          {
            validator: validatePassWord, trigger: 'blur'
          }
        ],
        registerGrade: [
          {
            validator: validateGrade, trigger: 'change'
          }
        ]
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      registerOnOff: false
    }
  },
  methods: {
    ...mapActions(['login']),
    submitRegisterForm (formName) {
      const t = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          t.registerAdmin()
        } else {
          t.$message.error('请填写正确的注册信息')
          return false
        }
      })
    },
    registerAdmin () {
      const t = this
      axios({
        method: 'post',
        url: '/api/sysUser/insert',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          grade: t.registerForm.registerGrade, // 管理员等级，0超级管理员，1普通管理员
          realName: t.registerForm.registerName, // 管理员姓名
          loginName: t.registerForm.registerName, // 管理员姓名
          email: t.registerForm.registerEmail, // 管理员邮箱
          phoneNum: t.registerForm.registerPhoneNum, // 管理员电话号
          identityNum: t.registerForm.registerIdentityNum, // 管理员身份证号
          passWord: md5(t.registerForm.registerPassWord), //
          gender: t.registerForm.gender
        }
      }).then(function (response) {
        const reqData = response.data
        console.log(reqData)
        if (reqData.success && reqData.code === 200) {
          t.registerOnOff = false
        }
        console.log(response.data)
      })
    },
    checkLogin () {
      const t = this
      axios.post('/api/sysUser/login', {
        phoneNum: t.ruleForm2.pass,
        password: md5(t.ruleForm2.checkPass)
      })
        .then(function (response) {
          console.log(response)
          const reqData = response.data
          console.log(reqData)
          if (reqData.success) {
            const code = parseInt(reqData.code, 10)
            let message = ''
            switch (code) {
              case 200:
                message = '登录成功'
                break
              case 201:
                message = '用户名不存在'
                break
              case 202:
                message = '密码错误'
                break
              case 203:
                message = '您暂未通过审核'
                break
              case 204:
                message = '重名'
                break
              case 500:
                message = '登录失败'
                break
            }
            if (code === 200) {
              t.$message({
                type: 'success',
                message: message
              })
              setTimeout(() => {
                location.reload()
              }, 1000)
            } else {
              t.$message.error(message)
            }
            t.login(reqData.result.id)
            localStorage.setItem('userName', reqData.result.realName)
            localStorage.setItem('adminId', reqData.result.id)
            localStorage.setItem('grade', reqData.result.grade)
            localStorage.setItem('phoneNum', reqData.result.phoneNum)
            localStorage.setItem('password', reqData.result.password)
          } else {
            t.$message.error('登录失败！')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goRegister () {
      const t = this
      t.registerOnOff = true
    },
    goLogin () {
      const t = this
      t.registerOnOff = false
    },
    submitForm (formName) {
      const t = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          t.checkLogin()
        } else {
          t.$message.error('请填写正确的登录信息')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss">
    @import "../../../static/scss/untils/common";
    .adminLogin{
        @include maskBg();
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .el-form{
            width: 356px;
            padding: 30px 60px 30px 0;
            background: #ffffff;
            position: relative;
            border-radius: 10px;
            .el-icon-close{
                position: absolute;
                right:0;
                top:0;
                font-size: 24px;
                padding: 5px;

            }
        }
    }
</style>
