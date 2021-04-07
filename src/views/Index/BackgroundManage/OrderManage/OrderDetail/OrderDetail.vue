<template>
    <div class="wrapper OrderDetailView">
        <TitleHeader title="订单信息">
            <BackButton/>
        </TitleHeader>
        <div class="container" v-for="(item,index) in tableData" :key="index">
            <p class="p">订单号：{{tableData[index].mid}}</p>
            <p class="p">昵称：{{tableData[index].name}}</p>
            <p class="p">账户：{{tableData[index].name}}</p>
            <p class="p">电话：{{tableData[index].phone}}</p>
            <p class="p">票种信息：{{tableData[index].ticketName}}</p>
            <p class="p">退款机制：{{tableData[index].ticketRefundType}}</p>
            <p class="p">实际付款金额：{{tableData[index].ticketPrice}}元</p>
            <p class="p">支付方式：{{tableData[index].paymentMethod}}</p>
            <p class="p">支付时间：{{tableData[index].paymentTime}}</p>
            <p class="p">支付信息：{{tableData[index].paymentInfo}}</p>
            <p class="p">订单状态：{{tableData[index].status}}</p>
            <button class="refund-btn" @click="drawback">退款</button>
            
        </div>
        <Title content="关联活动" style="margin-bottom: 19px"/>
        <ActivityItem/>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import TitleHeader from "@/components/public/TitleHeader.vue";
    import Title from "@/components/Index/Title/Title.vue";
    import ActivityItem from "@/components/Index/ActivityItem/ActivityItem.vue";
    import BackButton from "@/components/public/BackButton/BackButton.vue";

    @Component({
        components: {BackButton, ActivityItem, Title, TitleHeader}
    })
    export default class OrderDetail extends Vue {
        private tableData : any[] = [];
        private orderId : string = '';
        private ticketRefundType : string = '';
        private paymentMethod : string = '';
        private status : string = '';
        beforeCreate() {

        }

        created() {

        }

        beforeMount() {

        }

        mounted() {
            this.orderId = this.$route.params.orderId;
            this.loadData();
            
            
        }

        async loadData() {
            let data = await this.$formRequest.get(`/web_public/order/getOrderDetail/${this.orderId}`);
            console.log(data);
            this.tableData = data.partOrderList;
            this.switchFunc();
            // console.log(this.ticketRefundType)
        }
        switchFunc () {
            for(let i = 0;i < this.tableData.length;i++) {
                switch (this.tableData[i].ticketRefundType) {
                case 0:
                    this.tableData[i].ticketRefundType = '不可退款';
                    break;
                case 1:
                    this.tableData[i].ticketRefundType = '委托平台退款';
                    break;
                case 2:
                    this.tableData[i].ticketRefundType = '无条件退款';
                    break;
                default:
                    break;
            }
               if(this.tableData[i].paymentMethod === 0) {
                    this.tableData[i].paymentMethod = '微信支付';
                }
               if(this.tableData[i].status === 5) {
                    this.tableData[i].status = '已退款';
                }
            }
            
        }
        drawback() {
            // console.log(data.orderId)
            let res = this.$jsonRequest.delete(`/web_public/order/confirmCancel/${this.orderId}`)
            console.log(res)
        }
        beforeUpdate() {

        }

        updated() {

        }

        beforeDestroy() {

        }

        destroyed() {

        }

        activated() {

        }

        deactivated() {

        }
    }
</script>

<style scoped lang="less">
    @import "OrderDetail";
</style>
