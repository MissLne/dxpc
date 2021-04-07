<template>
    <div class="wrapper consultateEvaluationView">
        <div class="container">
            <div class="header">
                <div class="select-box">
                    <div class="select-item" :class="selectType === 1 ? 'active' : ''" @click="handleSelect(1)">未回复咨询</div>
                    <div class="select-item" :class="selectType === 2 ? 'active' : ''" @click="handleSelect(2)">全部咨询</div>
                </div>
                <div class="search-box">
                    <input type="text" class="input" placeholder="请输入活动名称或问题关键词" v-model="searchText"/>
                    <button class="search-btn" @click="search">搜索</button>
                </div>
            </div>
            <div class="question-container">
                <ConsultationItem :consultation-data="item"
                        @reply="handleReply" @delete="handleDelete"
                        v-for="(item, index) in consulateList" :key="item.id"
                        @update="updateVal"
                />
            </div>
        </div>
        <el-dialog title="回复评论" :visible.sync="dialogVisible">
            <el-input type="textarea" :autosize="{minRows: 4, maxRows : 6}" v-model="replyContent"></el-input>
            <div class="button-box">
                <button class="cancel-button" @click="dialogVisible = false">取消</button>
                <button class="confirm-button" @click="reply(dialogKey)">确定</button>
            </div>
        </el-dialog>

    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import ConsultationItem from "@/components/Index/BusinessManage/consultateEvaluation/ConsultationItem.vue";


    @Component({
        components: {ConsultationItem}
    })
    export default class consultateEvaluation extends Vue {
        private conData : Object = {
            consultationId : "1",
            consultationType :  "活动",
            consultationName :  "广工交友聚会",
            question :  "可以晚点到吗",
            answer :  "可以的",
            isShow :  true,
        };
        private replyContent : string = "";
        private selectType : 1|2 = 1;
        dialogVisible : boolean = false;
        dialogKey : string = "";
        private consulateList : any = [];
        private searchText : string = '';

        private search() {
            if(this.searchText != '') {
                let res = this.$formRequest.post('/web/consult/search',
            
                {   
                    id : localStorage.getItem('accountId'),
                    content : this.searchText
                }
                )
                .then((res) => {
                    this.consulateList = res;
                    console.log(this.conData)
                })
                
                
            }
        }
        public handleSelect(selectType : 1|2) {
            this.selectType = selectType;
            this._loadData(<any>selectType);
        }
        public handleReply(consultationId : string) {
            console.log("回复",consultationId);
            this.dialogVisible = true;
            this.dialogKey = consultationId;
            this.replyContent = "";

        }
        public handleDelete(consultationId : string) {
            console.log("删除",typeof consultationId);
            this.$confirm("确认要删除吗", {
                type : "warning"
            }).then(() => {
                this.$formRequest.post("/web/consult/delete", {
                    id: localStorage.getItem("accountId"),
                    consultId: consultationId
                }).then((res) =>{
                    this._loadData()
                })
            })

        }


        private reply(consultationId: string) {
            console.log(consultationId)
            this.$formRequest.post("/web/consult/reply", {
                id : localStorage.getItem("accountId"),
                reply : this.replyContent,
                consultId: consultationId
            }).then((res) => {
                this.$message.success("回复成功");
                this.dialogVisible = false;
                this.$nextTick(this._loadData);
            })
        }

        async mounted() {
            this._loadData(1);
        }

        async _loadData(type : 1|2 = this.selectType) {
            let url = type === 1 ? "/web/consult/no_reply" : "/web/consult/all";
            let data = await this.$formRequest.post(url, {
                id : localStorage.getItem("accountId")
            });
            this.consulateList = data;
            console.log(data);
        }

        updateVal(data : any, val : any) {
            data.cshow = val;
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/view/index/BusinessManage/consultateEvaluation/ConsultateEvaluation.less";
</style>
