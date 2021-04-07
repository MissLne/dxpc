<template>
    <div class="wrapper OrderAnalysisView">
        <div>
            <div class="container">
                <TitleHeader title="今日订单"/>
                <ul class="option-box">
                    <li>
                        <p>新增订单数</p>
                        <span>100</span>
                    </li>
                    <li>
                        <p>已支付数</p>
                        <span>89</span>
                    </li>
                    <li>
                        <p>累计金额</p>
                        <span>890</span>
                    </li>
                </ul>
                <TitleHeader title="数据分析"/>
                <ul class="options-box">
                    <li>时间：</li>
                    <li style="color:#FF8900">最近30天</li>
                    <li>最近七天</li>
                    <li>
                        <div class="block">
                            <el-date-picker
                            v-model="value1"
                            type="monthrange"
                            range-separator="至"
                            start-placeholder="开始月份"
                            end-placeholder="结束月份">
                            </el-date-picker>
                        </div>
                    </li>
                </ul>
                <div class="list-box">
                    <ul>
                        <li>订单总数：100</li>
                        <li>已付款：80</li>
                        <li>待付款：20</li>
                        <li>作废：10</li>
                        <li>金额：100000元</li>
                    </ul>
                    <div id="main" style="width: 400px;height:400px;"></div>
                </div>
                <div class="load">
                    <p style="float:right;margin-top:50px;color:#FF8900;cursor: pointer;">下载表格↓</p>
                </div>
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%" 
                    :header-cell-style="{'text-align':'center'}" 
                    :cell-style="{'text-align':'center'}">
                    <el-table-column
                    prop="date"
                    label="时间"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="tatolPay"
                    label="订单总数"
                    width="180"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="rubish"
                    label="作废"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="payed"
                    label="已支付数"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="unpay"
                    label="待支付数"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="tatolMoney"
                    label="积累金额（元）"
                    align="center">
                    </el-table-column>
                </el-table>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import Parent from "@/test/Parent.vue";
    import TitleHeader from "@/components/public/TitleHeader.vue";
    @Component({
        components: {TitleHeader}
    })
    export default class OrderAnalysis extends Vue {
        private tableData : any = [
            {
            date: '2020-02-23 23:23',
            tatolPay: '1000',
            rubish: '10',
            payed: '999',
            unpay: '30',
            tatolMoney: '9990'

            },
            {
            date: '2020-02-23 23:23',
            tatolPay: '1000',
            rubish: '10',
            payed: '999',
            unpay: '30',
            tatolMoney: '9990'

            },
            {
            date: '2020-02-23 23:23',
            tatolPay: '1000',
            rubish: '10',
            payed: '999',
            unpay: '30',
            tatolMoney: '9990'

            }
        ]
            
        
        mounted() {
            this.echartsFunc();
        }
         echartsFunc() {
            let echarts = require('echarts/lib/echarts');

            require('echarts/lib/chart/pie');
            
            require('echarts/lib/component/tooltip');
            require('echarts/lib/component/title');

           
            let myChart = echarts.init(document.getElementById('main'));
            
            myChart.setOption({
                title: {
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    // top: '140px',
                    data: ['已付款', '待付款', '作废']
                },
                color : [ '#FF8900', '#FFE000', '#F44545'],
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 62.5, name: '已付款'},
                            {value: 25, name: '待付款'},
                            {value: 12.5, name: '作废'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }
  
    }
</script>

<style scoped lang="less">
    .OrderAnalysisView {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        // justify-content: center;
        // align-items: center;
        // align-content: center;
        flex-direction: column;
        background-color: #ffffff;
        .option-box {
            width: 100%;
            display: flex;
            justify-content: space-around;
            margin-bottom: 55px;
            p {
                width: 100px;
                height: 20px;
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666666;
                margin: 30px 0;
                text-align: center;

            }
            span {
                display: inline-block;
                width: 100px;
                height: 37px;
                font-size: 46px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #666666;
                text-align: center;
            }
        }
        .options-box {
            width: 80%;
            display: flex;
            justify-content: start;
            margin: 0 0 20px 57px;
            align-items: center;
            li {
                margin: 0 10px;
                cursor: pointer;
            }
            .el-date-picker {
                width: 1000px !important;
            }
        }
        .list-box {
            display: flex;
            justify-content: center;
            align-items: center;
            li {
                margin-right: 30px;
                line-height: 40px;
                color: #666666;
            }
        }
    }
</style>
