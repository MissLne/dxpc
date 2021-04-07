<template>
    <div class="wrapper accountManageView">
        <div class="container">
            <div class="left">
                <div class="avatar-box">
                    <img :src="formModel.avatar" alt="" class="avatar">
                    <p class="upload-btn">点击上传图片</p>
                </div>
                <div class="form-box">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="商家名称">
                            <el-input v-model="formModel.accountName" style="width: 170px"></el-input>
                        </el-form-item>
                        <el-form-item label="商家电话">
                            <el-input v-model="formModel.businessPhone" style="width: 170px"></el-input>
                        </el-form-item>
                        <el-form-item label="商家简介">
                            <el-input type="textarea" v-model="formModel.businessDesc" class="demo" style="width: 313px; min-height: 154px" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="right">
                <div class="form-box">
                    <el-form ref="form" label-width="140px">
                        <el-form-item label="账户名称">
                            <el-input v-model="formModel.accountName" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="formModel.contactWay" style="width: 214px"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人名">
                            <el-input v-model="formModel.contacter" style="width: 214px"></el-input>
                        </el-form-item>
                        <el-form-item label="请输入原密码">
                            <el-input v-model="formModel.oldPassword" type="password" style="width: 214px"></el-input>
                        </el-form-item>
                        <el-form-item label="请输入新密码">
                            <el-input v-model="formModel.newPassword" type="password" style="width: 214px"></el-input>
                        </el-form-item>
                        <el-form-item label="请再次输入密码">
                            <el-input v-model="formModel.confirmPassword" type="password" style="width: 214px"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="button-box">
                    <button class="submit">提交</button>
                    <button class="cancel">取消</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {AccountFormModel} from "@/bean/form/index/businessManage/AccountManage";

    @Component({
        components: {}
    })
    @Component
    export default class accountManage extends Vue {

        private formModel : AccountFormModel = new AccountFormModel();



    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/view/index/BusinessManage/accountManage/accountManage.less";
</style>

<style lang="less">
    .accountManageView.wrapper {
        .demo  .el-textarea__inner {
            height: 140px;
        }
    }


</style>
