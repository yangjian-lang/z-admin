<template>
    <div class="login_container">
        <div class="login_row">
            <div class="form_container">
                <h1>Hello!</h1>
                <h3>欢迎使用后台管理系统</h3>
                <el-form :model="loginForm" :rules="loginRules" ref="loginForms">
                    <el-form-item class="input_container" prop="username">
                        <el-input size="large" placeholder="请输入用户名" v-model="loginForm.username">
                            <template #prefix>
                                <el-icon size="18">
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="input_container" prop="password">
                        <el-input type="password" size="large" placeholder="请输入密码" v-model="loginForm.password"
                            show-password>
                            <template #prefix>
                                <el-icon size="18">
                                    <Lock />
                                </el-icon></template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button class="login_btn" type="primary" size="large" :loading="loginLoading"
                    @click="handleLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import '@/styles/custom-style.scss' // 引入自定义的element-plus样式
    import { reactive, ref } from 'vue'
    import useUserStore from '@/store/modules/user' //引入user小仓库
    import { ElNotification } from 'element-plus'
    import { useRouter, useRoute } from 'vue-router'
    import { getTime } from '@/utils/time'

    const userStore = useUserStore() // 获取小仓库的实例
    const $router = useRouter()
    const $route = useRoute()

    let loginLoading = ref(false) // 登录按钮加载动画
    let loginForm = reactive({ //表单数据
        username: 'admin',
        password: '111111',//atguigu123
    })
    let loginForms = ref() //获取el-form
    // 自定义密码的校验方法
    const validatePassword = (rule: any, value: any, callback: any) => {
        if (value.length >= 6) {
            callback()
        } else {
            callback(new Error('密码长度至少为6位'))
            console.log(rule)
        }
    }
    //表单验证规则
    const loginRules = {
        username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { required: true, min: 5, max: 10, message: '账号长度至少为5位,最多不能超过10位', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { trigger: 'blur', validator: validatePassword }, //自定义校验密码规则
        ],
    }

    // 用户点击登录
    const handleLogin = async () => {
        await loginForms.value.validate() // 等待表单验证通过后在执行下面代码

        loginLoading.value = true //启动登录图标加载动画
        // 收集用户登录信息
        const { username, password } = loginForm
        const data = {
            username,
            password,
        }
        // 通知仓库发送请求
        try {

            // 登陆成功，仓库返回成功的promise
            await userStore.login(data)
            $router.push({ path: `${$route.query.redirect}` || '/' })
            ElNotification({
                type: 'success',
                title: 'Hi，' + getTime() + '好！',
                message: '欢迎回来'
            })
            loginLoading.value = false
        } catch (error) {
            // 登录失败，仓库返回错误的promise
            ElNotification({
                type: 'error',
                message: error,
            })
            loginLoading.value = false
        }
    }
</script>

<style lang="scss" scoped>
    .login_container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background: url(@/assets/image/loginbg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .login_row {
            position: relative;
            width: 1200px;
            height: 720px;
            background: url(@/assets/image/loginimg.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;

            .form_container {
                position: absolute;
                top: 180px;
                left: 715px;

                h1 {
                    font-size: 52px;
                    color: #555;
                    font-weight: bold;
                }

                h3 {
                    font-size: 26px;
                    color: #555;
                    margin-top: 16px;
                    margin-bottom: 50px;
                }

                .input_container {
                    width: 300px;
                }

                .login_btn {
                    width: 300px;
                    margin-top: 40px;
                }
            }
        }
    }
</style>