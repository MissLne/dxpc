<template>
    <div class="wrapper FeedbackManageView">
        
        
        <TitleHeader title="举报反馈"/>
        <el-table style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column label="广告信息">
                
                    <div>
                        <p class="leaveMas">留言信息：我来自M78星云</p>
                        <div class="BannedMas">
                        <span>被举报用户：戴拿</span>
                        <span>举报用户：迪迦</span>
                        <span>被举报时间：2020-</span>
                        <span>举报时间：</span>
                        </div>
                    </div>
               
            </el-table-column>
            <el-table-column label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                                <el-button @click="handleDelAndBan(scope.row)" type="text" size="small" class="delete-btn">删除留言并封禁用户</el-button>
                                <el-button @click="handleCancel(scope.row)" type="text" size="small" class="cancel-btn">撤销举报</el-button>
                               
                            </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import WaitToDev from "@/views/Index/Public/WaitToDev.vue";
    import TitleHeader from "@/components/public/TitleHeader.vue";

    @Component({
        components: {TitleHeader, WaitToDev}
    })
    export default class FeedbackManage extends Vue {
        private tableData : any[] = [];
        handleClick() {

        }
        handleDelAndBan() {}
        handleCancel() {}

        async mounted() {
        }

        
    }
</script>

<style scoped lang="less">
    .FeedbackManageView {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        box-sizing: border-box;
        .el-dropdown {
            float: right;
            margin-top: 20px;
            background: transparent;
        }
        .leaveMas {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            cursor: pointer;
            margin-bottom: 30px;
        }
        .BannedMas {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            word-wrap: nowrap;
            color: #666;
            span {
                cursor: pointer;
            }
        }
        .el-button {
            width: 143px;
            height: 17px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FA4040;
        }
    }
</style>
