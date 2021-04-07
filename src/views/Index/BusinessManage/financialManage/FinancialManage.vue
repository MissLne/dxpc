<template>
    <div class="wrapper FinancialManagement">
        <div class="top-container" v-show="this.$route.name === 'financialManage'">
            <div class="title-box">
                <i class="icon-outer">
                    <i class="icon-inner"></i>
                </i>
                <p class="title">账户余额</p>
            </div>
            <div class="content">
                <div class="left-box">
                    <p class="title">余额(元)</p>
                    <p class="content">{{balance}}</p>
                </div>
                <div class="center-box">
                    <div class="title-box">
                        <p class="title">提现账户：{{account}}</p>
                        <p class="unbind">解绑</p>
                    </div>
                    <router-link tag="p" :to="{name : 'finAccountSetting'}" class="account-setting">提款账户设置</router-link>
                </div>
                <div class="right-box">
                    <button class="origin-btn">提 现</button>
                </div>
            </div>
        </div>
        <div class="bottom-container" v-show="this.$route.name === 'financialManage'">
            <div class="title-box">
                <i class="icon-outer">
                    <i class="icon-inner"></i>
                </i>
                <p class="title">财务记录</p>
            </div>
            <div class="content" style="padding-left: 20px">
                <div class="form-container">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="状态">
                            <el-select placeholder="" value="1" style="height: 30px">
                                <el-option label="全部" value="1"></el-option>
                                <el-option label="收入" value="2"></el-option>
                                <el-option label="支出" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="时间" style="margin-left: 30px">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="startDate" style="width: 100%; height: 30px"></el-date-picker>
                            </el-col>
                            <el-col :span="2" style="text-align: center">至</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="endDate" style="width: 100%; height: 30px"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="table-container">
                    <el-table
                            :data="financialData"
                            style="width: 100%;" max-height="300px">
                        <el-table-column
                                prop="date"
                                label="时间">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="类型">
                        </el-table-column>
                        <el-table-column
                                prop="event"
                                label="事件">
                        </el-table-column>
                        <el-table-column
                                prop="sum"
                                label="金额">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="footer">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="totalSize">
                    </el-pagination>
                </div>
            </div>
        </div >
        <router-view/>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {FinancialTableData} from "@/bean/form/index/businessManage/FinancialManage";

    @Component({
        components: {}
    })
    @Component
    export default class FinancialManagement extends Vue {
        private balance : string = "100.00";
        private account : string = "123******789";
        private status : number | undefined;
        private startDate : string = "";
        private endDate : string = "";
        private readonly pageSize : number = 5;
        private financialData : Array<FinancialTableData> = [
            {
            id : "1",
            date : "2020-12-12 12:12",
            type : "收入",
            event : "万一云报名费",
            sum : "30"
        }, {
            id : "1",
            date : "2020-12-12 12:12",
            type : "收入",
            event : "万一云报名费",
            sum : "30"
        }, {
            id : "1",
            date : "2020-12-12 12:12",
            type : "收入",
            event : "万一云报名费",
            sum : "30"
        }, {
                id : "1",
                date : "2020-12-12 12:12",
                type : "收入",
                event : "万一云报名费",
                sum : "30"
            }, {
                id : "1",
                date : "2020-12-12 12:12",
                type : "收入",
                event : "万一云报名费",
                sum : "30"
            }];
        private currentPage : number = 1;


        private handleCurrentChange(...arg : any[]) {
            console.log(arg);
        }

        get totalSize() {
            return this.financialData.length;
        }

        mounted() {
            // this.$http.get("/login").then((data : object) => {
            //     console.log(data);
            // })
            // console.log(this.$message);
            // console.log(this.$bus.$on())
        }


    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/view/index/BusinessManage/FinancialManage/FinancialManage.less";
</style>

<style lang="less">
    .FinancialManagement.wrapper {
        .bottom-container {
            div.content {
                .el-input__inner {
                    height: 30px;
                }
            }
        }
    }
</style>
