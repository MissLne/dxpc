<template>
    <div class="IndexPage wrapper">
        <div class="header">
            <div class="left">
                <div class="logo-box">
                    <p class="logo">Dexian</p>
                </div>
            </div>
            <div class="right">
                <div class="title-box">
                    <h2 class="title">得闲管理平台</h2>
                </div>
                <div class="login-out-box">
                    <i class="logo"></i>
                    <p class="login-out" @click="loginOut">退出</p>
                </div>
            </div>
        </div>
        <div class="body">
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    @Component
	export default class Index extends Vue{






        private loginOut() : void {
            this.$router.replace({name : "login"});
            this.$message.success("退出成功");
        }






	}

</script>

<style scoped lang="less">
    @import "../../assets/style/view/index/index.less";
</style>
