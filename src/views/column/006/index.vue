<template>
    <section class="adminContentContainer">
        <section class="adminContentInner">
            <el-form :label-position="labelPosition"  :model="formLabelAlign" label-width="80px"  class="adminChangePassword">
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="formLabelAlign.oldpassword" class="adminInputEl" placeholeder="请输入原来密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="formLabelAlign.newpassword" class="adminInputEl" placeholeder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="formLabelAlign.renewpassword" class="adminInputEl" placeholeder="请确认密码"></el-input>
                </el-form-item>
            </el-form>
            <el-row>
                <el-button @click="reset">重置</el-button>
                <el-button type="primary" @click.native="submit">确认</el-button>
            </el-row>
        </section>

    </section>

</template>
<script>
import { updatePassWord } from '@/resource'

import md5 from 'blueimp-md5'
import { mapActions } from 'vuex'
import { checkInvalid } from '@/utils/common'
import { testPassword } from '@/utils/regularTest'
export default {
  data () {
    const adminId = localStorage.getItem('adminId')

    const phoneNum = localStorage.getItem('phoneNum')
    const password = localStorage.getItem('password')
    return {
      labelPosition: 'right',
      phoneNum: phoneNum,
      updateUser: adminId,

      password: password,
      formLabelAlign: {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
      },
      oriFormLabelAlign: {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
      }
    }
  },
  methods: {
    ...mapActions(['outLogin']),
    reset () {
      const _this = this
      _this.formLabelAlign = _this.oriFormLabelAlign
    },
    async submit () {
      const _this = this
      if (checkInvalid(_this.formLabelAlign.oldpassword) || checkInvalid(_this.formLabelAlign.newpassword) || checkInvalid(_this.formLabelAlign.renewpassword)) {
        _this.$message.error('请填写完整的密码')
        return false
      }
      if (_this.formLabelAlign.newpassword !== _this.formLabelAlign.renewpassword) {
        _this.$message.error('新密码与确认密码不一致')
        return false
      }
      console.log(testPassword(_this.formLabelAlign.newpassword))
      if (!testPassword(_this.formLabelAlign.newpassword)) {
        _this.$message.error('密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多30个字符')
        return false
      }
      console.log(md5(_this.formLabelAlign.oldpassword) + '!==' + _this.password)
      if (md5(_this.formLabelAlign.oldpassword) !== _this.password) {
        _this.$message.error('原始密码有误')
        return false
      }
      if (_this.formLabelAlign.newpassword === _this.formLabelAlign.oldpassword) {
        _this.$message.error('新旧密码不能一致')
        return false
      }
      const res = await updatePassWord({
        phoneNum: _this.phoneNum,
        sysUserId: _this.updateUser,
        oldPassword: md5(_this.formLabelAlign.oldpassword),
        newPassword: md5(_this.formLabelAlign.newpassword)
      })
      if (res) {
        _this.$message({
          type: 'success',
          message: '修改成功'
        })
        _this.outLogin()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .adminInputElDialog{
        width:300px;
    }
    .adminContentContainer{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 70vh;
    }
    .adminContentInner{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .adminInputEl{
            width:400px;
        }
        .adminChangePassword{
            margin-top: 30px;
        }
        .adminUserControl{
            padding: 0 0 10px 0;
        }
        .adminPage{
            padding: 20px 0;
        }
        .adminAuditControl{
            padding: 20px 0;
        }
    }
</style>
