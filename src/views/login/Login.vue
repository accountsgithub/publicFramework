<template>
    <div class="login-background">
        <div class="login-form-background">
            <el-form class="login-form"
                     autoComplete="on"
                     :model="loginForm"
                     :rules="loginRules"
                     ref="loginForm"
                     label-position="left">
                <h3 class="title">{{$t('common.index_title')}}</h3>
                <h3 class="title2">DOLPHIN OPS PLATFORM</h3>
                <el-form-item prop="username">
                    <el-input class="textStyle"
                              :placeholder="$t('projectMgt.mark_placeholder')"
                              v-model="loginForm.username"
                              autoComplete="off">
                        <i slot="prefix"
                           class="el-icon-document"
                           style="margin: 0 15px 15px 13px;font-size: 20px;"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="textStyle"
                              name="password"
                              :placeholder="$t('projectMgt.password_placeholder')"
                              :type="pwdType"
                              @keyup.enter.native="handleLogin"
                              v-model="loginForm.password"
                              autoComplete="off">
                        <i slot="prefix"
                           class="icon iconfont icon-ic-lock"
                           style="margin: 0 15px 15px 13px;font-size: 20px;"></i>
                        <i slot="suffix"
                           class="show-pwd el-icon-view"
                           @click="showPwd"
                           style="margin: 10px 15px 15px 15px;font-size: 20px"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               style="width:100%;background:#016ad5;border-radius:4px;height:50px;font-size: 16px"
                               :loading="loadingStatus"
                               @click.native.prevent="handleLogin">{{logButtonLabel}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getCookie, setCookie, delCookie } from '@/utils'
import router from '@/router'
export default {
    name: 'Login',
    data() {
        return {
            isSavePW: !!getCookie('isSavePW'),
            loginForm: {
                username: getCookie('username') ? getCookie('username') : '',// admin
                password: getCookie('PW') ? getCookie('PW') : ''// NUR7kI26Bs6T9q10
            },
            loginRules: {
                username: [
                    { required: true, message: this.$t('login.usernameRules'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('login.passwordRules'), trigger: 'blur' }
                ]
            },
            logButtonLabel: this.$t('login.loginButton'),
            loadingStatus: false,
            pwdType: 'password'
        }
    },

    methods: {
        ...mapActions(['login']),

        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },

        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.login(this.loginForm)
                        .then(() => {
                            if (this.isSavePW) {
                                if (!getCookie('username') || getCookie('username') != this.loginForm.username) {
                                    setCookie('username', this.loginForm.username)
                                }
                                if (!getCookie('PW') || getCookie('PW') != this.loginForm.password) {
                                    setCookie('PW', this.loginForm.password)
                                }
                                if (!getCookie('isSavePW')) {
                                    setCookie('isSavePW', 'true')
                                }
                            } else {
                                delCookie('isSavePW')
                                delCookie('username')
                                delCookie('PW')
                            }
                            router.push('projectMgt/index')
                        })

                } else {
                    this.loadingStatus = false
                    this.logButtonLabel = this.$t('login.button_login')
                    return false
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 44px;
    input {
      background: transparent;
      -webkit-appearance: none;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      color: #000000;
      height: 44px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
.title {
  font-family: MFDianHei_Noncommercial-ExLight;
  font-size: 24px;
  color: #333333;
  margin: 0 auto 0 auto;
  text-align: center;
  font-weight: 500;
}
.title2 {
  font-size: 12px;
  -webkit-transform: scale(0.9);
  color: #aaaaaa;
  margin: 8px auto 40px auto;
  text-align: center;
  font-weight: 500;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #081c3e;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-background {
  position: fixed;
  background-image: url('~@/assets/images/login-bg-1920.png');
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  background-position-x: center;
  background-position-y: center;
}
.login-form-background {
  background-image: url('~@/assets/images/login-box-01.png');
  background-repeat: no-repeat;
  width: 950px;
  height: 560px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-position-x: center;
  background-position-y: center;
  .login-form {
    // background:#ffffff;
    border: 0px solid #d8d8d8;
    border-radius: 4px;
    margin-left: 538px;
    padding-top: 86px;
    width: 350px;
    height: auto;
  }
}
.textStyle {
  width: 350px;
  height: 44px;
  /deep/.el-input__inner {
    height: 44px !important;
  }
  /deep/.el-input--prefix .el-input__inner {
    padding-left: 50px;
  }
}
</style>
