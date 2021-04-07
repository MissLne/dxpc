<template>
    <div class="wrapper ActivityManageView">
        <div class="container" v-show="$route.name === 'backActivityManage'">
            <TitleHeader title="活动管理"/>
            <div class="setting-box">
                <div class="form-left">
                    <el-input placeholder="请输入活动名称" style="width:222px; margin-right: 20px" v-model="searchText"></el-input>
                    <el-date-picker
                    v-model="timeValue"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="form-center">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="状态">
                            <el-select placeholder="请选择"  style="width: 78px; margin-right: 30px">
                                <el-option label="全部" :value="0"></el-option>
                                <el-option label="已上线" :value="1"></el-option>
                                <el-option label="已下线" :value="-1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="每页显示">
                            <el-select placeholder="" v-model="pageSize" style="width: 78px" @change="handlePage">
                                <el-option label="5" :value="5"></el-option>
                                <el-option label="10" :value="10"></el-option>
                                <el-option label="50" :value="50"></el-option>
                                <el-option label="100" :value="100"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="form-right">
                    <button class="search" @click="search">搜索</button>
                    <!-- <button class="add" @click="toAddActivityView">新增</button> -->
                </div>
            </div>
            <div class="body">
                <div class="table-container">
                    <el-table :data="tableData" border>
                        <el-table-column fixed prop="activityId" label="序号"></el-table-column>
                        <el-table-column prop="activityName" label="活动名称"></el-table-column>
                        <el-table-column prop="activityName" label="主办方"></el-table-column>
                        <el-table-column prop="activityImg" label="略缩图" style="min-width: 200px;width: 200px;">
                            <template slot-scope="scope">
                                <img :src="scope.row.posterImage" alt="" class="fuck-img">
                            </template>
                        </el-table-column>
                        <el-table-column prop="hasParticipate" label="已报名">
                            <template slot-scope="scope">
                                <p>{{scope.row.registeredNumber}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
                        <el-table-column prop="startTime" label="活动时间">
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <el-switch
                                        :value="scope.row.status === 1"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        :active-value="true"
                                        :inactive-value="false"
                                        @change="handleChange(scope.row)"
                                >
                                </el-switch>
                                <span style="margin-left: 5px">
                                {{scope.row.status === 1 ? '上架' : '下架'}}
                            </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="recommend(scope.row)" type="text" size="small">推荐</el-button>
                                <el-button @click="handleToDetail(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="deleteActivity(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="footer">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <router-view/>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import TitleHeader from "@/components/public/TitleHeader.vue";
    import {ActivityManageTableModel} from "@/bean/form/index/businessManage/ActivityManage";
    import moment from "moment"

    class Model {
        pageNo ?: number = 1;
        pageSize ?: number = 10;
        status ?: 0|-1|1 = 0;
        constructor(status ?: 0|-1|1, pageNo ?: number, pageSize ?: number) {
            this.pageNo = pageNo;
            this.pageSize = pageSize;
            this.status = status;
        }
    }

    @Component({
        components: {TitleHeader}
    })
    export default class ActivityManage extends Vue {
        private tableData: Array<ActivityManageTableModel> = [

        ];
        private hiddenContainer: boolean = false;
        addActivityForm = {};
        private searchText: string = '';
        private endTime: string = '';
        private startTime: string = '';
        private pageSize: number = 10;
        private currentPage: number = 1;
        private dialogVisible: boolean = true;
        private total : number = 0;
        private status : 0|1|-1 = 0;
        private timeValue : string = ''
     
        private toAddActivityView() {
            this.$router.push({name: 'addActivity'}).then((res) => {

            }).catch((err) => {
                console.log(err);
            });
        }
        private search() {
            let str1 = moment(this.timeValue[0]).format("YYYY-MM-DD hh:mm:ss")
            let str2 = moment(this.timeValue[1]).format("YYYY-MM-DD hh:mm:ss")
            let str3 = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            let myId : any = localStorage.getItem('accountId')
            console.log(typeof this.currentPage,this.pageSize,this.status)
            if(this.searchText) {
                let res = this.$formRequest.post('/web_public/search_by_name',
            
                {
                    pageNo : 1,
                    pageSize : 10,
                    status : 0,
                    content: this.searchText,
                    accountId : parseInt(myId)
                }
                ).then((res) => {
                    console.log(res.list)
                    this.tableData = res.list;
                
                })
            }
            if(str1 != str3 && str2 != str3) {
                this.$formRequest.post('/web_public/search_by_time',
                {
                    pageNo : this.currentPage,
                    pageSize : this.pageSize,
                    status : this.status,
                    accountId : parseInt(myId),
                    startTime: str1,
                    endTime: str2
                }
                )
                .then((res) => {
                    console.log(res.list)
                    this.tableData = res.list;
                
                })
                return;
            }
        }
        private deleteActivity(data : any) {
            this.$confirm("确定要删除吗", {
                type : "warning"
            }).then((res) => {
                this.$formRequest.delete(`/web_public/delete_activity/${data.activityId}`)
                .then((res: any) => {
                    this.$message.success("删除成功");
                    this._loadData({
                        pageSize : this.pageSize,
                        pageNo : this.currentPage,
                        status : this.status
                    })
                })
            })
        }

        // private handleClick(data : any) {
        //     this.$http.get("/web_public/delete_activity", {
        //         params : {
        //             activityId : data.activityId
        //         }
        //     }).then((res : any) => {
        //         this.$message.success("删除成功");
        //         this._loadData(new Model(this.status, this.currentPage, this.pageSize))
        //     }).catch((e : any) => {
        //         this.$message.error(e.msg);
        //     });
        // }

        private handleChange(state : any) {
            // console.log(state);
            let res = this.$request.put(`/web_public/modify_activity_status/${state.activityId}`)
            .then((res:any) => {
                console.log(res)
                state.status = state.status ? 0 : 1;
            });
        }

        private handleCurrentChange(page : number) {
            this._loadData(new Model(0, page))
        }

        private recommend(data : any) {
            console.log(data);
            this.$request.post('/management/banner/recommend_activity', {
                activityId : data.activityId,
                activityName : data.activityName,
                image : data.posterImage,
                url : null
            }).then((res) => {
                this.$message.success("推荐成功");
            })
        }

        handleToDetail(data: ActivityManageTableModel) {
            console.log(data);
            this.$router.push({
                name: 'backActivityDetail',
                params: {
                    activityId: data.activityId
                }
            })
        }

        async mounted() {
            this._loadData();
        }

        async _loadData(data ?: Model){
            let response = await this.$formRequest.get("/web_public/get_activity_list", {
                
                    accountId: localStorage.getItem("accountId"),
                    ...data
                    // status: 0
                
            });
            if (!response) {
                this.tableData.length = 0;
                return;
            }
            this.tableData = response.list;
            console.log(this.tableData);
            this.currentPage = response.pageNow;
            this.pageSize = response.pageSize || response.pgaeSize;
            this.total = this.pageSize * response.totalPage;
        }


    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/view/index/BusinessManage/accountManage/accountManage.less";

    .ActivityManageView {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        .option-box {
            display: flex;
            width: 100%;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
            padding : 0 5px;
            margin-bottom: 10px;
            > div {
                margin-right: 10px;
            }
            > span {
                margin-right: 10px;
            }
        }
        .fuck-img {
            width:151px;
            height:56px;
            border-radius:8px;
        }
        .body {
            box-sizing: border-box;
            padding:  0 10px;
        }
        .footer {
            display: flex;
            justify-content: center;
            margin: 10px 0;
        }
    }



</style>
