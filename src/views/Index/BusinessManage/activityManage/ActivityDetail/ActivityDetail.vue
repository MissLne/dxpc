<template>
    <div class="wrapper ActivityDetailView">
        <TitleHeader title="活动详情"/>
        <div class="detail-box">
            <div class="left">
                <img :src="activity.posterImage" alt="" class="img">
            </div>
            <div class="right">
                <div class="item">
                    <span class="name">名称</span>
                    <span class="value">{{activity.activityName}}</span>
                </div>
                <div class="item">
                    <span class="name">已报名人数</span>
                    <span class="value">{{activity.registeredNumber}}</span>
                </div>
                <div class="item">
                    <span class="name">地点</span>
                    <span class="value">{{activity.address}}</span>
                </div>
                <div class="item">
                    <span class="name">时间</span>
                    <span class="value">{{activity.startTime}}</span>
                </div>
            </div>
        </div>
        <div class="introduction-box">
            <p class="title">活动简介</p>
            <p class="introduction">
                {{activity.lightSpot}}
            </p>

        </div>
        <TitleHeader title="活动信息"/>
        <div class="info-box">
            <div class="info">
                <p class="title">{{activity.clickRate}}</p>
                <p class="info-detail">浏览量</p>
            </div>
            <div class="info">
                <p class="title">{{activity.registeredNumber}}</p>
                <p class="info-detail">报名</p>
            </div>
            <div class="info">
                <p class="title">{{activity.attentionAmount}}</p>
                <p class="info-detail">收藏</p>
            </div>
        </div>
        <div class="table-box">
            <div class="bar">
                <p class="title">报名列表</p>
                <p class="download-excel" @click="dddd">下载表格</p>
            </div>
            <div class="table-container">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="avatar" label="用户头像">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" alt="" class="avatar">
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="gender" label="性别">
                        <template slot-scope="scope">
                            {{scope.row.gender ? "男" : '女'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="ticketName" label="票名"></el-table-column>
                    <el-table-column prop="school" label="学校"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看报名表</el-button>
                            <el-button type="text" size="small" @click="drawBack(scope.row)">退回报名</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="报名表" :visible.sync="dialogVisible">
            <Application :data="dialogData" :more-data="dialogMoreData"/>
        </el-dialog>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import TitleHeader from "@/components/public/TitleHeader.vue";
    import {ActivityManageTableModel} from "@/bean/form/index/businessManage/ActivityManage";
    import accountManage from "@/views/Index/BusinessManage/accountManage/accountManage.vue";
    import Application from "@/components/Index/Application/Application.vue";
    
    
    type TableDataModel = {
        image : string,
        nickname : string,
        name : string,
        phone : string,
        ticketName : string,
        ticketPrice : number,
        ticketType : number,
        school : string
    }


    @Component({
        components: {Application, TitleHeader}
    })
    export default class ActivityDetail extends Vue {

        avatar : string = "https://steamuserimages-a.akamaihd.net/ugc/446240455622264565/5B4CB5F91E0C787E552369C3F8339D45B2210904/?imw=1024&imh=573&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true";

        private activityId : string = "";
        private pageNum : string = "1";
        private activity : any = {};
        private dialogVisible : boolean = false;
        private dialogData : any = {};
        private dialogMoreData : Array<any> = [];
        
        get tableData() : Array<TableDataModel> {
            let formCL = this.activity.formContentVoList;
            let val: TableDataModel[] = [];
            if (formCL instanceof Array) {
                val = formCL.map((rua) => {
                    return rua.formContent;
                })
            }
            return val;
        }
        async dddd() {
            let data1 : any = await this.$request.get(`/web_public/export/${this.activityId}`)
            .then(() => {
                this.$message.success("导出成功");
            });
            console.log(data1);
        }
        async handleClick(data : any) {
            console.log(data)
            this.dialogVisible = true;
            this.dialogData = {
                ...data
            };
            this.dialogMoreData = data.customContents;
            let data1 : any = await this.$request.get(`/web_public/get_form_details/${data.mid }`)
            .then(() => {
                this.$message.success("获取成功");
            });
        }

        mounted() {
            let {activityId} = this.$route.params;
            this.activityId = activityId;
            this._loadData();
            // this.__loadData();

        }

        async _loadData() {
            this.activity = await this.$request.get(`/web_public/get_activity_details/${this.activityId}/${this.pageNum}`);
            console.log(this.activity);
            console.log(this.tableData)
        }
        // async __loadData() {
        //     
        // }

        drawBack(data : any) {
            this.$request.get(`/web_public/order/confirmCancel/${data.orderId}`)
            .then((res) => {
                this.$message.success("退回成功");
                this._loadData();
            });
        }
    }
</script>

<style scoped lang="less">
    @import "ActivityDetail.less";
</style>
