<template>
    <div class="LoginPage wrapper">
        <div class="container">
            <div class="logo-box">
                <img :src="logoSrc" class="logo" alt=""/>
            </div>
            <div class="form-container">
                <p class="title">得闲管理系统</p>
                <div class="form-box">
                    <el-form class="demo-ruleForm">
                        <el-form-item>
                            <div class="select-type-box">
                                <div class="type-item" :class="userType === 1 ? 'active' : ''" @click="handleSelect(1)">商家</div>
                                <div class="type-item" :class="userType === 0 ? 'active' : ''" @click="handleSelect(0)">管理员</div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="username" placeholder="请输入账号">
                                <i slot="prefix" class="el-input__icon username-icon"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="password" placeholder="请输入密码" type="password">
                                <i slot="prefix" class="el-input__icon password-icon"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <button class="login" @click="doLogin">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import logo from "../../assets/img/login/logo.png";
    // @ts-ignore
    import md5 from "js-md5";
    @Component
	export default class Login extends Vue{
        private userType : number | string  = 1;
        private username : string = "";
        private password : string = "";
        private readonly logoSrc : string  = logo;

        private doLogin() {
            let {userType, username, password} = this;
            console.log("rua");
            // this.$router.replace(userType === 1 ? {name : 'businessManage'} : {name : 'backgroundManage'});
            this.$request.upload("https://www.quyo.fun/party/web/login/in", {
                role : this.userType + "",
                account : this.username,
                password : this.password,
            }).then((data : any) => {
                this.$message.success("登录成功");
                this.$router.replace(userType === 1 ? {name : 'businessManage'} : {name : 'backgroundManage'});
                // 500里有测试数据
                console.log(data);
                localStorage.setItem('token',data.token);
                localStorage.setItem('accountId',data.id);
                console.log(localStorage.getItem("token"))
            }).catch((e : any) => {
                this.$message.warning(e.msg);
            });
        }
        private handleSelect(userType : number | string) {
            this.userType = userType;
        }
	}
</script>

<style scoped lang="less">
    @import "../../assets/style/view/Login/Login.less";
</style>

<style lang="less">
    .LoginPage.wrapper {
        .el-input--suffix {
            width: 350px;
            padding-left: 25px;
        }
        input[type="text"].el-input__inner,
        input[type="password"].el-input__inner{
            padding-left: 40px;
        }
    }


</style>

