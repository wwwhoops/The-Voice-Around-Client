<template>
<div>
    <loginLogo/>
    <div class="signUp">
        <div class="signUp-head">
            <span>用户注册</span>
        </div>
        <el-form :model="registerForm" ref="registerForm" label-width="70px" class="demo-ruleForm" :rules="rules">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-radio-group v-model="registerForm.sex">
                    <el-radio :label="0">女</el-radio>
                    <el-radio :label="1">男</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="phoneNum" label="手机">
                <el-input v-model="registerForm.phoneNum" placeholder="手机"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="birth" label="生日">
                <!-- <el-date-picker v-model="registerForm.birth" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
                <el-date-picker
                    v-model="registerForm.birth"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item prop="introduction" label="签名">
                <el-input v-model="registerForm.introduction" placeholder="签名"></el-input>
            </el-form-item> -->
            <el-form-item prop="location" label="地区">
                <!-- <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%;">
                    <el-option v-for=" item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select> -->
                <v-distpicker v-model="registerForm.location" placeholder="地区" style="width: 100%;" @selected="regionSelectOfInsert"></v-distpicker>
            </el-form-item>
            <div class="login-btn">
                <el-button @click="goback(-1)">取消</el-button>
                <el-button type="primary" @click="SignUp">确定</el-button>
            </div>
        </el-form>
    </div>
</div>
</template>
<script>
import loginLogo from '../components/LoginLogo'
import {rules,cities} from '../assets/data/form'
import {mixin} from '../mixins'
import {SignUp} from '../api/index'
import VDistpicker from "v-distpicker"

export default {
    name: 'sing-up',
    mixins: [mixin],
    components: {
        loginLogo,
        "v-distpicker":VDistpicker
    },
    data() {
        return {
            registerForm: {
                username: '',       //用户名
                password: '',       //密码
                sex: '',            //性别
                phoneNum: '',       //手机
                email: '',          //邮箱
                birth: '',          //生日
                introduction: '',   //签名
                location: ''       //地区
            },
            consumer: {},         //用户对象
            cities: [],            //所有的地区--省
            rules: {}               //表单提交的规则
        }        
    },
    created() {
        this.rules = rules;
        this.cities = cities;
    },
    methods:{
        //地区选择
        regionSelectOfInsert(data){
            var province = data.province.value
            var city = data.city.value
            var area = data.area.value  
            this.registerForm.location = province + city + area
        },
        SignUp(){
            let _this = this;
            this.consumer.username = this.registerForm.username;
            this.consumer.password = this.registerForm.password;
            this.consumer.sex = this.registerForm.sex;
            this.consumer.phoneNum = this.registerForm.phoneNum;
            this.consumer.email = this.registerForm.email;
            this.consumer.birth = this.registerForm.birth;
            this.consumer.introduction = this.registerForm.introduction;
            this.consumer.location = this.registerForm.location;
            // this.consumer.avatar = '/img/user.jpg';
            var consumer = this.consumer
            SignUp(consumer)
                .then(res => {
                    if(res.code == 1){
                        _this.notify('注册成功','success');
                        setTimeout(function(){
                            _this.$router.push({path: '/login-in'});
                        },2000);
                    }else{
                        _this.notify(res.message,'error');
                    }
                })
                .catch(err => {
                    _this.notify(res.message,'error');
                })
        },
        goback(index){
            this.$router.go(index);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>