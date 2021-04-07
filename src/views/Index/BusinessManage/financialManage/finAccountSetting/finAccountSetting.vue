<template>
    <div class="wrapper finAccountSettingView">
        <TitleHeader title="账户管理"></TitleHeader>
        <div class="table-box">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="phone" label="用户"></el-table-column>
                <el-table-column label="用户类型">
                    <template slot-scope="scope">
                        {{
                        scope.row === 1 ? '支付宝账户' : '银行账户'
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="button-box">
            <button class="add-btn" @click="dialogVisible = true">添加提款账户</button>
        </div>
        <el-dialog title="添加提现账户" :visible.sync="dialogVisible" width="625px" :show-close="false">
            <div class="rua" @click="switchMethod()">使用{{useBank ? '银行' : '支付宝'}}账户</div>
            <div class="line"></div>
            <div class="container" v-show="!useBank">
                <div class="item">
                    <p class="p">支付宝认证名</p>
                    <input type="text" class="input" style="width:270px;">
                </div>
                <div class="item">
                    <p class="p">支付宝账户</p>
                    <input type="text" class="input" style="width:270px;">
                </div>
                <div class="item">
                    <p class="p">验证码</p>
                    <input type="text" class="input" style="width: 105px">
                </div>
            </div>
            <div class="container" v-show="useBank">
                <div class="item">
                    <p class="p">银行开户名</p>
                    <input type="text" class="input" style="width:270px;">
                </div>
                <div class="item">
                    <p class="p">银行账户</p>
                    <input type="text" class="input" style="width:270px;">
                </div>
                <div class="item">
                    <p class="p">开户银行</p>
                    <input type="text" class="input" style="width:270px;">
                </div>
                <div class="item">
                    <p class="p">验证码</p>
                    <input type="text" class="input" style="width: 105px">
                </div>
            </div>
            <div class="footer">
                <p class="cancel-button">取消</p>
                <p class="confirm-button">确定</p>
            </div>
        </el-dialog>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import TitleHeader from "@/components/public/TitleHeader.vue";



    // 提款账户
    type WithdrawalAccountType = {
        phone : string,
        // 1 支付宝账户 2 银行账户
        accountType : number
    }
    @Component({
        components: {TitleHeader}
    })
    export default class finAccountSetting extends Vue {

        tableData : Array<WithdrawalAccountType> = [{
            phone : '13189457961',
            accountType : 1
        }, {
            phone : '13189457961',
            accountType : 2
        }];

        public dialogVisible : boolean = false;
        public useBank : boolean = false;

        handleEdit(data : WithdrawalAccountType) {
            console.log(data);
        }
        handleDelete(data : WithdrawalAccountType) {

        }

        switchMethod() {
            this.useBank = !this.useBank;
        }

    }
</script>

<style scoped lang="less">
    @import "finAccountSetting.less";
</style>
