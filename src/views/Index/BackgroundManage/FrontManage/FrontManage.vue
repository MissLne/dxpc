<template>
    <div class="wrapper FrontManageView">
        <TitleHeader title="banner信息"/>
        <div class="option-box">
            <el-input style="width: 300px" placeholder="输入名称查询" v-model="searchText"></el-input>
            <div class="block">
                <el-date-picker
                v-model="timeValue"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <span>每页显示 : </span>
            <el-select v-model="value" @change="handlePage">
                <el-option :value="5" label="5"></el-option>
                <el-option :value="10" label="10"></el-option>
                <el-option :value="20" label="20"></el-option>
                <el-option :value="100" label="100"></el-option>
                <el-option :value="200" label="200"></el-option>
            </el-select>
            <el-button @click="search">搜索</el-button>
            <el-button @click="addActivity">新增</el-button>
        </div>
        <div class="table-box">
            <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column label="序号" prop="recommendId"></el-table-column>
                <el-table-column align="center" prop="activityName" label="标题"></el-table-column>
                <el-table-column align="center" label="图片">
                    <template slot-scope="scope">
                        <el-image
                                :preview-src-list="[scope.row.imgSrc]"
                                :src="scope.row.image"
                                class="table-td-thumb"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="url" label="地址"></el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status ? '下线' : '上线'}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" label="上线时间"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="cancel(scope.row)" style="color: red">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="编辑活动" :visible.sync="dialogVisible">
            <p style="margin-bottom:20px">
                活动名称：<el-input v-model="editName" placeholder="请输入活动名称" style="width:400px"></el-input>
            </p>
            <p style="margin-bottom:20px">
                图片地址：<el-input v-model="editImage" placeholder="请输入图片地址" style="width:400px"></el-input>
            </p>
            <p style="margin-bottom:20px">
                活动地址：<el-input v-model="editUrl" placeholder="请输入活动地址" style="width:400px"></el-input>
            </p>
            <div class="button-box">
                <button class="cancel-button" @click="dialogVisible = false">取消</button>
                <button class="confirm-button" @click="edit(editCommentId)">确定</button>
            </div>
        </el-dialog>
        <el-dialog title="新增活动" :visible.sync="dialogVisible1">
            <p style="margin-bottom:20px">
                活动ID ：<el-input v-model="addId" placeholder="请输入活动ID" style="width:400px"></el-input>
            </p>
            <p style="margin-bottom:20px">
                活动名称：<el-input v-model="addName" placeholder="请输入活动名称" style="width:400px"></el-input>
            </p>
            <p style="margin-bottom:20px">
                图片地址：<el-input v-model="addImage" placeholder="请输入图片地址" style="width:400px"></el-input>
            </p>
            <p style="margin-bottom:20px">
                活动地址：<el-input v-model="addUrl" placeholder="请输入活动地址" style="width:400px"></el-input>
            </p>
            <div class="button-box">
                <button class="cancel-button" @click="dialogVisible1 = false">取消</button>
                <button class="confirm-button" @click="add">确定</button>
            </div>
        </el-dialog>
        <div class="footer">
            <el-pagination
                layout="prev, pager, next, jumper"
                :current-page.sync="currentPage">
            </el-pagination>
            <button class="goBtn" @click="jumpPage">跳转</button>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import WaitToDev from "@/views/Index/Public/WaitToDev.vue";
    import TitleHeader from "@/components/public/TitleHeader.vue";
    import moment from "moment"
    @Component({
        components: {WaitToDev, TitleHeader}
    })
    export default class FrontManage extends Vue {
        private tableData : any[] = [];
        private dialogVisible : boolean = false;
        private dialogVisible1 : boolean = false;
        private editCommentId : number = 0;
        private editName : string = '';
        private editImage : string = '';
        private editUrl : string = '';
        private addName : string = '';
        private addImage : string = '';
        private addUrl : string = '';
        private addId : number = 0;
        private searchText : string = '';
        private newPage : string = '';
        private newSize : string = '';
        private timeValue : string = "";
        private value : string = ''
        private currentPage : string = ''

        async jumpPage() {
            console.log(this.currentPage)
            let data = await this.$http.get("/management/banner/get_recommend_list",{params:{
                pageNum: this.currentPage,
                pageSize: this.value
            }});
            this.tableData = data.list
        }
        async handlePage() {
            let data = await this.$http.get("/management/banner/get_recommend_list",{params:{
                pageNum: 1,
                pageSize: this.value
            }});
            console.log(data);
            this.tableData = data.list
        }
        private search() {
            let str1 = moment(this.timeValue[0]).format("YYYY-MM-DD hh:mm:ss")
            let str2 = moment(this.timeValue[1]).format("YYYY-MM-DD hh:mm:ss")
            let str3 = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            console.log(str2 == str3);
            if(this.searchText != '') {
                let res = this.$formRequest.post('/management/banner/search_by_name',
            
                {
                    pageNum : 1,
                    pageSize : 10,
                    content: this.searchText
                }
                ).then((res: any) => {
                    this.tableData = res.list;
                    console.log(res)
                })
                return;
            }
            if(str1 != str3 && str2 != str3) {
                this.$formRequest.post('/management/banner/search_by_time',
                {
                    pageNum : this.newPage,
                    pageSize : this.newSize,
                    startTime: str1,
                    endTime: str2
                }
                )
                .then((res) => {
                    console.log(res)
                    this.tableData = res.list;
                
                })
                return;
            }
            
            this.loadData()
        }
        handleClick(data : any) {
            this.$http.get("/web_public/modify_activity_status", {
                params : {
                    ...data
                }
            }).then((res : any) => {
                this.loadData();
            }).catch((e : any) => {
                this.$message.error(e.msg);
            })
        }
        cancel(data : any) {
            console.log(data);
            this.$request.delete(`/management/banner/deleted_recommend_activity/${data.recommendId}`
            ).then(() => {
                this.loadData();
            }).catch((e : any) => {
                this.$message.error(e.msg)
            })
        }
        handleEdit(data : any) {
            this.dialogVisible = true;
            this.editCommentId = data.recommendId;
            this.$formRequest.get(`/management/banner/get_recommend/${this.editCommentId}`)
            .then((res) => {
                this.editName = res.activityName;
                this.editUrl = res.url;
                this.editImage = res.image;
            })
        }
        async edit(id : number) {
            let data = await this.$jsonRequest.post("/management/banner/set_recommend",{
                recommendId : id,
                activityName : this.editName,
                url : this.editUrl,
                image : this.editImage
            });
            this.dialogVisible = false;
            this.loadData()
        }
        addActivity() {
            this.dialogVisible1 = true;
        }
        async add() {
            let data = await this.$jsonRequest.post("/management/banner/recommend_activity",{
                activityName : this.addName,
                url : this.addUrl,
                image : this.addImage,
                activityId : this.addId
            })
            .then((data : any) => {
                this.$message.success("添加成功");
                this.dialogVisible1 = false;
                this.loadData();
            }).catch((err : any) => {
                this.$message.error(err.msg);
            })
            console.log(data);
        }
        async mounted() {
            this.loadData()
        }

        async loadData(page? : string,size? : string) {
            let data = await this.$http.get("/management/banner/get_recommend_list",{params:{
                pageNum: 1,
                pageSize: '3'
            }});
            console.log(data);
            this.tableData = data.list;
        }
            
        async created() {

        }
    }
</script>

<style scoped lang="less">
    .FrontManageView {
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
        .el-date-picker {
            width: 1000px;
        }
    }
</style>

<style lang="less">
    .FrontManageView {
        .el-image__inner.el-image__preview {
            max-height: 80px;
        }
        .el-input {
            width: 120px;
        }
        .button-box {
            display: flex;
            margin-top: 20px;
            .cancel-button, .confirm-button{
            margin-right: 15px;
            width:62px;
            height:29px;
            border-radius:4px;
            font-size:15px;
            font-weight:400;
            color:rgba(255,255,255,1);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .cancel-button {
            background:rgba(153,153,153,1);
        }
        .confirm-button {
            background:rgba(255,112,0,1);
        }
        }
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

</style>
