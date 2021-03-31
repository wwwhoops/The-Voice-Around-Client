<template>
<div>
    <loginLogo/>
    <div class="signUp">
        <div class="signUp-head">
            <span>帐号登录</span>
        </div>
        <el-form :model="loginForm" ref="loginForm" label-width="70px" class="demo-ruleForm" :rules="rules">
            <el-form-item prop="username" label="用户名">
                <el-input 
                v-model="loginForm.username" 
                placeholder="用户名"
                @keyup.enter.native="handleLoginIn"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input 
                type="password" 
                v-model="loginForm.password" 
                placeholder="密码"
                @keyup.enter.native="handleLoginIn">
                </el-input>
            </el-form-item>
            
            <div class="login-btn">
                <el-button @click="goSignUp()">注册</el-button>
                <el-button type="primary" @click.native.prevent="handleLoginIn">登录</el-button>
            </div>
        </el-form>
    </div>
</div>
</template>
<script>
import loginLogo from '../components/LoginLogo'
import {mixin} from '../mixins'
import {loginIn} from '../api/index'

export default {
    name: 'login-in',
    mixins: [mixin],
    components: {
        loginLogo
    },
    data() {
        return {
            loginForm: {
                username: '',       //用户名
                password: '',       //密码
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur',message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur',message: '请输入密码' }
                ]
            }
        }    
    },
    mounted() {
        this.changeIndex('登录');
    },
    methods:{
        handleLoginIn(params = {}){
            let _this = this;
            params.name = this.loginForm.username;
            params.password = this.loginForm.password;
            loginIn(params)
                .then(res => {
                    if(res.code == 1){
                        _this.notify('登录成功','success');
                        _this.$store.commit('setLoginIn',true);
                        _this.$store.commit('setUserId',res.id);
                        _this.$store.commit('setUsername',res.username);
                        _this.$store.commit('setAvatar',res.avatar);                                                
                        setTimeout(function(){
                            _this.changeIndex('首页');
                            _this.$router.push({path: '/'});
                        },2000);
                    }else{
                        _this.notify(res.message,'error');
                    }
                })
                .catch(err => {
                    _this.notify('系统内部异常','error');
                })
        },
        goSignUp(){
            this.changeIndex('注册');
            this.$router.push({path: '/sign-up'});
        },
        changeIndex(value){
            this.$store.commit('setActiveName',value);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>