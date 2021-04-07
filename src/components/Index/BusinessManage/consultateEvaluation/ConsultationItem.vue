<template>
    <div class="wrapper ConsultationItem">
        <div class="header">
            <div class="title-box">
                <p class="type">{{consultationData.consultationType}}</p>
                <p class="name">{{consultationData.consultationName || consultationData.activityName}}</p>
            </div>
            <div class="control-box">
                <p class="text">{{consultationData.cshow ? "显示" : "隐藏"}}</p>
                <el-switch
                        :value="consultationData.cshow === 1"
                        style="display: block"
                        active-color="#FFBC66"
                        inactive-color="#D8D7D6"
                        :width="45"
                        :class="consultationData.cshow ? 'active' : ''"
                        @change="handleChange"
                >
                </el-switch>
            </div>
        </div>
        <div class="content">
            <div class="question-box">
                <div class="left">
                    <div class="question-icon">问</div>
                    <p class="question">{{consultationData.question}}</p>
                </div>
                <div class="right">
                    <p class="reply" @click="handleReply">回复</p>
                    <p class="delete" @click="handleDelete">删除</p>
                </div>
            </div>
            <div class="answer-box">
                <div class="answer-icon">答</div>
                <p class="answer">{{consultationData.reply}}</p>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    

    class ConsultationDataModel {
        public id: string = "";
        public consultationType: string = "";
        public consultationName: string = "";
        public question: string = "";
        public reply: string = "";
        public cshow: boolean = false;
        public createtime: string = "";
        public activityName : string = ""
    }


    @Component({
        components: {}
    })
    export default class ConsultationItem extends Vue {

        @Prop({
            default() {
                return new ConsultationDataModel();
            }
        })
        consultationData ?: ConsultationDataModel;

        private show : boolean = true;
        private handleChange(data: boolean) {
            console.log("变化了", data);
            this.$request.get("/web/consult/show", {
                id: this.consultationData?.id
            }).then(() => {
                this.$message.success("修改成功");
                this.$emit("update", this.consultationData, data ? 1 : 0);
            });


        }

        // @Watch("consultationData.cshow")
        // handle(newVal : boolean) {
        //     this.handleChange(newVal);
        //     this.$request.get("/consult/web/show_or_not", {
        //         id : this.consultationData?.id
        //     }).then(() => {
        //         this.$message.success("修改成功");
        //     })
        // }

        handleDelete() {
            this.$emit("delete", this.consultationData?.id);
        }

        handleReply() {
            this.$emit("reply", this.consultationData?.id);
        }


    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/components/BusinessManage/consultateEvaluation/ConsultationItem.less";
</style>

<style lang="less">
    .ConsultationItem.wrapper {
        .el-switch__core:after {
            background-color: #FFA32E;
            width: 26px;
            height: 26px;
            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.07);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
        }

        /*.el-switch__core:after {*/
        /*    !*left: -3px;*!*/
        /*}*/

    }
</style>
