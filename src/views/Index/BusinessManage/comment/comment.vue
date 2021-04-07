<template>
    <div class="wrapper commentView" style="padding: 20px">
        <div class="box" style="margin-bottom: 15px">
            <el-radio v-model="radio" :label="1">全部</el-radio>
            <el-radio v-model="radio" :label="2">未回复</el-radio>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column align="center" prop="name" label="活动名字"></el-table-column>
            <el-table-column align="center" prop="comment" label="评论内容"></el-table-column>
            <el-table-column align="center" prop="reply" label="回复"></el-table-column>
            <el-table-column align="center" prop="createtime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleReply(scope.row)">回复</el-button>
                    <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="回复内容" :visible.sync="visibility">
            <div>
                <el-input type="textarea" :rows="8" v-model="reply" ></el-input>
            </div>
            <div style="display: flex; width: 100%; justify-content: center; margin-top: 20px">
                <el-button type="primary" @click="confirmReply">确认回复</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class comment extends Vue {

        private tableData : Array<any> = [{}, {}];
        private visibility : boolean = false;
        private radio : 1|2 = 1;
        private reply : string = "";
        private tempData : any;

        @Watch("radio")
        watchRadio() {
            this._loadData();
        }

        async mounted() {
            this._loadData();
        }
         
        async _loadData() {
            let url = this.radio === 1 ? "/web/comment/all" : "/web/comment/not_reply";
            this.tableData = <any>await this.$formRequest.post(url, {
                token: localStorage.getItem("token")
            });
        }


        handleReply(data : any) {
            this.visibility = true;
            this.tempData = data;
            this.reply = this.tempData.reply
        }

        handleDelete(data : any) {
            this.$confirm("确定要删除自己的回复吗", {
                type : "warning"
            }).then(() => {
                this.$formRequest.get("/web/comment/delete", {
                    id : data.commentId
                }).then((res) => {
                    this._loadData();
                    this.$message.success("删除成功");
                })

            })
        }

        confirmReply() {
            console.log(this.tempData)
            this.$formRequest.post("/web/comment/reply", {
                token: localStorage.getItem("token"),
                id : this.tempData.commentId,
                reply : this.reply
            }).then(() => {
                this._loadData();
                this.reply = "";
                this.$message.success("回复成功");
                this.visibility = false;
            })
        }

    }
</script>

<style scoped lang="less">
    @import "./comment";
</style>
