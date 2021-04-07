<template>
    <div class="wrapper DataAnalysisView">

        <div class="top-container">
            <TitleHeader title="核心指标"/>
            <div class="content-box">
                <div class="content">
                    <div class="item">
                        <p class="title">订单数</p>
                        <p class="data">311</p>
                    </div>
                    <div class="item">
                        <p class="title">票数</p>
                        <p class="data">311</p>
                    </div>
                    <div class="item">
                        <p class="title">浏览量</p>
                        <p class="data">1990</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-container">
            <TitleHeader title="历史信息"/>
            <div class="content">
                <div class="header">
                    <p class="p" style="">时间：</p>
                    <div class="item">最近30天</div>
                    <div class="item">最近7天</div>
                    <div class="box">
                        <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                         至
                        <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                </div>
                <!-- 为什么会起这个类名呢，因为我很困而且不想思考起什么名字 -->
                <div class="oo00">
                    <p class="o0oo">趋势图</p>
                    <div class="o00o">
                        <p class="p">类型 :</p>
                        <div class="box">
                            <div class="select-item">票数</div>
                            <div class="select-item">访问数</div>
                            <div class="select-item">报名数</div>
                        </div>
                    </div>
                    <div id="echart-box" style=""></div>
                </div>
                <div class="oo00">
                    <p class="o0oo">详细信息</p>
                    <div class="table-container">
                        <el-table :data="tableData">
                            <el-table-column prop="date" label="时间" width="180"></el-table-column>
                            <el-table-column prop="visitsNum" label="访问数" width="180"></el-table-column>
                            <el-table-column prop="applicationsNum" label="报名数" width="180"></el-table-column>
                            <el-table-column prop="votesNum" label="票数" width="180"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="o0o0">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="totalSize">
                    </el-pagination>
                </div>




            </div>
        </div>


    </div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import TitleHeader from "../../../../components/public/TitleHeader.vue";
    const echart = require('echarts');
    let myChart = null;
	console.log(echart);

	@Component({
		components: {TitleHeader}
	})
	export default class DataAnalysis extends Vue {


	    private tableData : Array<DataAnalysisTableModel> = [{
            date : "2020-1-13",
            visitsNum : "123",
            applicationsNum : "12",
            votesNum : "16"
        }, {
            date : "2020-1-13",
            visitsNum : "256",
            applicationsNum : "12",
            votesNum : "22"
        }, {
            date : "2020-1-13",
            visitsNum : "123",
            applicationsNum : "12",
            votesNum : "16"
        }, {
            date : "2020-1-13",
            visitsNum : "256",
            applicationsNum : "12",
            votesNum : "22"
        }];

		private pageSize : number = 5;
		private currentPage : number = 1;
		private xArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		private yArr = [820, 932, 901, 934, 1290, 1330, 1320];
        get chartsData() {
            return {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xArr
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.yArr,
                    type: 'line',
                    areaStyle: {}
                }],
                backgroundColor: '#ffffff',
                color : '#FF8900'
            }
        }


		get totalSize() {
			return this.tableData.length;
		}

		private handleClick(_ : any) {

		}

		private handleChange(...args : any[]) {
			console.log(args);
		}

		private handleCurrentChange(...arg : any[]) {
			console.log(arg, this);
		}



		mounted() {
		    console.log("挂载");
            this.renderChart();
        }



        private async renderChart() {
		    // myChart = echart.init(document.getElementById("echart-box"));
            // let options = this.chartsData;
            // console.log(myChart, document.getElementById("echart-box"));
            // myChart.setOption(options);

            let myChart = echart.init(document.getElementById('echart-box'));
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {}
                }],
                backgroundColor: '#ffffff',
                color : '#FF8900'
            });
        }

	}

</script>

<style scoped lang="less">
    @import "../../../../assets/style/view/index/BusinessManage/DataAnalysis/DataAnalysis.less";
</style>
