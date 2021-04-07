<template>
    <div class="wrapper OrderManageView">
        <div class="container" v-show="this.$route.name === 'orderManage'">
            <TitleHeader title="订单信息"/>
            <div class="option-box">
                <el-input style="width: 300px" placeholder="请输入订单编号" v-model="searchText"></el-input>
                <el-date-picker
                    v-model="timeValue"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <span>状态 : </span>
                <el-select value="" style="width:120px;">
                    <el-option :value="1" label="全部"></el-option>
                </el-select>
                <span>每页显示 : </span>
                <el-select v-model="value" style="width:120px;" @change="handlePage">
                    <el-option :value="5" label="5"></el-option>
                    <el-option :value="10" label="10"></el-option>
                    <el-option :value="20" label="20"></el-option>
                    <el-option :value="100" label="100"></el-option>
                    <el-option :value="200" label="200"></el-option>
                </el-select>
                <el-button @click="search">搜索</el-button>
            </div>
            <div class="table-box">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column align="center" prop="orderId" label="订单编号"></el-table-column>
                    <el-table-column align="center" prop="name" label="用户名"></el-table-column>
                    <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
                    <el-table-column align="center" prop="companyName" label="商家"></el-table-column>
                    <el-table-column align="center" prop="totalPrice" label="合计金额"></el-table-column>
                    <el-table-column align="center" prop="actualPrice" label="实付金额"></el-table-column>
                    <el-table-column align="center" prop="setUpTime" label="建立时间"></el-table-column>
                    <el-table-column align="center" prop="paymentTime" label="付款时间"></el-table-column>
                    <el-table-column align="center" prop="status" label="状态"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" style="color: red;" @click="drawback(scope.row)">退款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <router-view v-show="this.$route.name !== 'orderManage'"></router-view>
        <div class="footer">
            <el-pagination
                layout="prev, pager, next, jumper"
                :current-page.sync="currentPage">
            </el-pagination>
            <button class="goBtn" @click="jumpPage">跳转</button>
        </div>
    </div>
<!-- @current-change="handleCurrentChange"
                
                :page-size="pageSize" -->
                <!-- :total="total" -->
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import TitleHeader from "@/components/public/TitleHeader.vue";
    import moment from "moment"
    @Component({
        components: {TitleHeader}
    })
    export default class OrderManage extends Vue {
        private tableData : any[] = [];
        private searchText : string = '';
        private pageNum : number = 1;
        private pageSize : number = 10;
        private status : number = 0;
        private timeValue : string = '';
        private value : string = ''
        private currentPage : string = '';
        async jumpPage() {
            console.log(this.currentPage)
            let data = await this.$formRequest.get(`management/order/getOrderList/${this.currentPage}/${this.value}/${this.status}`);
            this.tableData = data.list;
        }
        async handlePage() {
            console.log(this.value)
            let data = await this.$formRequest.get(`management/order/getOrderList/${1}/${this.value}/${this.status}`);
            console.log(data);
            this.tableData = data.list;
        }
        private search() {
            let str1 = moment(this.timeValue[0]).format("YYYY-MM-DD hh:mm:ss")
            let str2 = moment(this.timeValue[1]).format("YYYY-MM-DD hh:mm:ss")
            let str3 = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            if(this.searchText) {
                let res = this.$formRequest.post('/management/order/searchByOrderId',
            
                {   
                    orderId : this.searchText,
                    pageNum : this.pageNum,
                    pageSize : this.pageSize,
                    status : this.status
                }
                )
                .then((res) => {
                    this.tableData = res.list;
                })
            }
            if(str1 != str3 && str2 != str3) {
                console.log(this.pageNum)
                this.$formRequest.post('/management/order/searchByTime',
                {
                    pageNum : this.pageNum,
                    pageSize : this.pageSize,
                    status : this.status,
                    startTime: str1,
                    endTime: str2
                }
                )
                .then((res) => {
                    console.log(res.list)
                    this.tableData = res.list;
                
                })
            }
        }
        drawback(data : any) {
            console.log(data.orderId)
            let res = this.$jsonRequest.delete(`/web_public/order/confirmCancel/${data.orderId}`)
            console.log(res)
        }
        handleClick(data : any) {
            console.log(data.orderId)
            this.$router.push({
                name : 'orderDetail',
                params : {
                    orderId : data.orderId,
                }
            })
        }
        async mounted() {
            this.loadData()
        }

        async loadData() {
            let data = await this.$formRequest.get(`management/order/getOrderList/${this.pageNum}/${this.pageSize}/${this.status}`);
            console.log(data);
            switch (data.list.status) {
                case '0':
                    data.list.status = '待支付'
                    break;
                case '1':
                    data.list.status = '已支付'
                    break;
                case '2':
                    data.list.status = '退款中'
                    break;
                case '3':
                    data.list.status = '部分退款中'
                    break;
                case '4':
                    data.list.status = '已部分退款'
                    break;
                case '4':
                    data.list.status = '已退款'
                    break;
            
                default:
                    break;
            }
            this.tableData = data.list;
        }
    }
</script>

<style scoped lang="less">
    .OrderManageView {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #ffffff;
        .footer {
            display: flex;
            justify-content: space-around;
            // background: chartreuse;
            width: 300px;
            margin: 0 auto
            
        }
        .goBtn {
                width:40px;
                height:27px;
                margin-top: 2px;
                font-size:14px;
                background: #FF8900;
                color: #ffffff;
                border-radius: 4px;
                cursor: pointer;
                
        }
    }
    @import "../../../../assets/style/view/index/BackgroundManage/OrderManage/OrderManage.less";
</style>
