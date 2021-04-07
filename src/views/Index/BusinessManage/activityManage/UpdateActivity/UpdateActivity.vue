<template>
    <div class="wrapper AddActivityView">
        <p style="font-size: 18px; margin-bottom: 10px">主办方 : {{organizer}}</p>
        <div class="form-box">
            <div class="ver-item">
                <div class="hor-item">
                    <p class="p">活动名称:</p>
                    <el-input placeholder="请输入活动名称" v-model="addActivityModel.activityName"/>
                </div>
                <div class="hor-item">
                    <p class="p">活动人数:</p>
                    <el-input placeholder="请输入活动人数" v-model="addActivityModel.activityNumber"/>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item">
                    <p class="p">活动地址:</p>
                    <el-input placeholder="请尽量详细" v-model="addActivityModel.address"/>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item">
                    <p class="p">报名截止日期:</p>
                    <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="addActivityModel.registrationDeadline"
                    >
                    </el-date-picker>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item">
                    <p class="p">活动开始日期:</p>
                    <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="addActivityModel.startTime"
                    >
                    </el-date-picker>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item">
                    <p class="p">活动结束日期:</p>
                    <el-date-picker
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="addActivityModel.endTime"
                    >
                    </el-date-picker>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item">
                    <p class="p">活动标签:</p>
                    <el-input @keyup.enter.native="addActivityTag(addTagInputVal)" v-model="addTagInputVal"/>
                    <div class="tag-box">
                        <el-tag
                                :key="tag"
                                v-for="tag in addActivityModel.label"
                                closable
                                :disable-transitions="false"
                                @close="delActivityTag(tag)"
                                style="margin-right: 5px"
                        >
                            {{tag}}
                        </el-tag>
                    </div>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item noCenter">
                    <p class="p fixVer">活动亮点: </p>
                    <el-input type="textarea" autosize :autosize="{ minRows: 2, maxRows: 6}"
                              v-model="addActivityModel.lightSpot"/>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item noCenter post">
                    <p class="p">活动海报: </p>
                    <el-upload
                            class="avatar-uploader"
                            action="http://47.97.219.68:8080/web_public/do_nothing"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="fuck1"
                    >
                        <img v-if="addActivityModel.posterImage" :src="addActivityModel.posterImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item noCenter" style="margin-bottom: 70px">
                    <p class="p fixVer">活动详情: </p>
                    <QuillEditor @change="change" :editorRef.sync="editorRef"></QuillEditor>
                </div>
            </div>
            <div class="ver-item">
                <div class="hor-item noCenter">
                    <p class="p fixVer">活动须知: </p>
                    <div class="should-know-box">
                        <div class="item">
                            <p class="title">注意事项</p>
                            <el-input type="textarea" v-model="addActivityModel.announcement" style="width: 400px"/>
                        </div>
                        <div class="item">
                            <p class="title">负责人微信</p>
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://47.97.219.68:8080/web_public/do_nothing"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="fuck2"
                                    @click="imgUploadFlag = 1"
                            >
                                <img v-if="addActivityModel.linkmanCode" :src="addActivityModel.linkmanCode"
                                     class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="item">
                            <p class="title">活动微信群</p>
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://47.97.219.68:8080/web_public/do_nothing"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="fuck3"
                                    @click="imgUploadFlag = 2"
                            >
                                <img v-if="addActivityModel.groupCode" :src="addActivityModel.groupCode" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sp"></div>
            <div class="ver-item col-item">
                <p class="to-start">票种信息: </p>
                <div class="ticket-box">
                    <div class="button-box">
                        <button class="add-ticket-button" @click="addTicket(0)">
                            <img :src="addImg" alt="" width="12px" style="margin-right: 5px">
                            <span class="text">免费票</span>
                        </button>
                        <button class="add-ticket-button" @click="addTicket(1)">
                            <img :src="addImg" alt="" width="12px" style="margin-right: 5px">
                            <span class="text">付费票</span>
                        </button>
                    </div>
                    <div class="table-box">
                        <el-table
                                ref="singleTable"
                                :data="addTicketTableData"
                                highlight-current-row
                                style="width: 100%">
                            <el-table-column align="center" type="index"></el-table-column>
                            <el-table-column align="center" label="票种信息">
                                <template slot-scope="scope">
                                    {{scope.row.ticketType  ? "付费票" : "免费票"}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="票种名称">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.ticketName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" property="address" label="价格">
                                <template slot-scope="scope">
                                    <el-input-number v-model="scope.row.ticketPrice" :min="0" :max="scope.row.ticketType ? Infinity : 0" :controls="false" :size="'small'"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="票数">
                                <template slot-scope="scope">
                                    <el-input-number v-model="scope.row.ticketNumber" :min="0" :controls="false" :size="'small'"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="退款范围">
                                <template slot-scope="scope">
                                    <!-- //退款设置，0代表不可退款，1代表委托平台退款，2代表无条件退款 -->
                                    <el-select v-model="scope.row.ticketRefundType">
                                        <el-option :value="0" label="不可退款"></el-option>
                                        <el-option :value="1" label="委托平台退款"></el-option>
                                        <el-option :value="2" label="无条件退款"></el-option>
                                    </el-select>
                                </template>

                            </el-table-column>
                            <el-table-column align="center" fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            @click.native.prevent="deleteRow(scope.$index, addTicketTableData)"
                                            type="text"
                                            size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="sp"></div>
            <div class="ver-item">
                <div class="hor-item noCenter">
                    <p class="p fixVer">基本信息: </p>
                    <div class="base-info-box">
                        <div class="force-item-wrapper">
                            <div class="force-item-box" v-for="(formItem, index) in forceFormSetting" :key="index">
                                <div class="img-switch-box">
                                    <img v-if="formItem.notConfigurable" :src="unactiveImg" alt="" class="img-switch">
                                    <img v-else-if="formItem.isOptional" :src="activeImg" alt="" class="img-switch">
                                    <div v-else class="ruaQAQ"></div>
                                    <span class="text">{{formItem.isOptional ? "必填" : "选填"}}</span>
                                </div>
                                <div class="force-required-box">
                                    <span class="text">{{formItem.property}}</span>
                                    <el-input v-if="formItem.type === 0"></el-input>
                                    <el-input v-else-if="formItem.type === 1" type="textarea"></el-input>
                                    <el-select value="" v-else-if="formItem.type === 2">
                                        <el-option :value="item" v-for="(item, index) in formItem.content"
                                                   :key="index"></el-option>
                                    </el-select>
                                    <el-checkbox-group v-else-if="formItem.type === 3">
                                        <el-checkbox :label="item" v-for="(item, index) in formItem.content"
                                                     :key="index"></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                        <div class="no-force-item-wrapper">
                            <div class="no-force-item-box" v-for="(formItem, index) in formSettingDtoList" :key="index">
                                <div class="img-switch-box noCenter" @click="switchOptional(formItem)">
                                    <img v-if="formItem.notConfigurable" :src="unactiveImg" alt="" class="img-switch">
                                    <img v-else-if="formItem.isOptional" :src="activeImg" alt="" class="img-switch">
                                    <div v-else class="ruaQAQ"></div>
                                    <span class="text">{{formItem.isOptional ? "必填" : "选填"}}</span>
                                </div>
                                <div class="no-force-item-content">
                                    <el-input class="text-input" v-model="formItem.property" style="width: 300px"
                                              :placeholder="getTitle(formItem.type)"></el-input>
                                    <el-input v-if="formItem.type === 0" style="width: 300px"></el-input>
                                    <el-input v-else-if="formItem.type === 1" type="textarea"
                                              style="width: 300px"></el-input>
                                    <div class="select-item-box" v-else-if="formItem.type === 2 || formItem.type === 3">
                                        <el-tag
                                                :key="tag"
                                                v-for="tag in formItem.content"
                                                closable
                                                :disable-transitions="false"
                                                @close="delContentTag(formItem.content, tag)"
                                                style="margin-right: 5px; margin-bottom: 5px"
                                        >
                                            {{tag}}
                                        </el-tag>
                                        <el-input
                                                class="input-new-tag"
                                                size="small"
                                                v-model="formItem.inputCache"
                                                @keyup.enter.native="addSelectItem(formItem.content, formItem.inputCache, formItem)"
                                                v-if="formItem.showInput" style="width: 100px">
                                        </el-input>
                                        <el-button v-else class="button-new-tag" size="small"
                                                   @click="formItem.showInput = true">+ New Tag
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="add-form-item-box">
                        <p class="p">自定义项</p>
                        <div class="rua">
                            <div class="wrap">
                                <div class="item" @click="addFormItem(0)">单行文本框</div>
                                <div class="item" @click="addFormItem(1)">多行文本框</div>
                            </div>
                            <div class="wrap">
                                <div class="item" @click="addFormItem(2)">单项选择框</div>
                                <div class="item" @click="addFormItem(3)">多项选择框</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ver-item">
                <button class="submit" @click="addActivity">提交</button>
                <button class="submit" @click="saveAsDraft">存草稿</button>

            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import addImg from "../../../../../assets/img/index/backgroundManage/add.png";
    import activeImg from "../../../../../assets/img/index/businessManage/addActivity/icon-actived.png"
    import unactiveImg from "../../../../../assets/img/index/businessManage/addActivity/icon-unactived.png"
    import TinyMce from "../../../../../components/Editor/index.vue";
    import {updateFile} from "@/web/util";

    import QuillEditor from "@/components/Editor/Editor.vue";


    type infoItem = {
        isOptional: number,
        property: string,

        order?: number,
        // 0 : 单行文本 1 : 多行文本 2 : 单项选择 3 多项选择
        type: FormItemType,
        activityId?: number,
        content: Array<string> | null,
        notConfigurable?: boolean,
        inputCache?: string,
        showInput?: boolean
    }


    class TicketType {
        // 0：免费 1：付费
        ticketType : 0|1 = 0;
        ticketName : string = "";
        ticketPrice : number = 0;
        // 0:无条件退款 1: 不能退款
        ticketRefundType : 0|1 = 0;
        ticketNumber : number = 0;
        ticketRefundReason ?: string = "无";
        ticketInstructions ?: string = "";
        constructor(ticketType : 0 | 1) {
            this.ticketType = ticketType;
        }
    }


    enum FormItemType {
        SingleLine = 0,
        MulLine = 1,
        SingleChoose = 2,
        MulChoose = 3,
    }

    // resource

    @Component({
        components: {QuillEditor, TinyMce}
    })
    export default class UpdateActivity extends Vue {

        public organizer: string = "";
        public imageUrl: string = '';
        public addImg: string = addImg;
        public activeImg: string = activeImg;
        public unactiveImg: string = unactiveImg;

        public parentContent : string = "";

        public imgUploadFlag : number = 0;

        public editorRef : any = {};

        @Watch("parentContent")
        watchParentContent(newVal : string, oldVal : string) {
            console.log(newVal);
        }


        public forceFormSetting: Array<infoItem> = [
            {
                isOptional: 0,
                property: '姓名',
                type: FormItemType.SingleLine,
                content: null,
                notConfigurable: true
            },
            {
                isOptional: 0,
                property: "电话",
                type: FormItemType.SingleLine,
                content: null,
                notConfigurable: true
            },
            {
                isOptional: 0,
                property: "性别",
                type: FormItemType.SingleChoose,
                content: ["男", "女"],
                notConfigurable: true
            },
            {
                isOptional: 0,
                property: "学校",
                type: FormItemType.SingleLine,
                content: null,
                notConfigurable: true
            }
        ];
        public formSettingDtoList: Array<infoItem> = [];
        public addTicketTableData: TicketType[] = [{
            ticketType : 0,
            ticketName : "测试",
            ticketNumber : 20,
            ticketPrice : 0,
            ticketRefundType : 0,
            ticketInstructions : "",
            ticketRefundReason : ""
        }];

        public addActivityModel: {
            organizer: string,
            activityName: string,
            startTime: string,
            endTime: string,
            registrationDeadline: string,
            activityNumber: string,
            label: Array<string>,
            lightSpot: string,
            address: string,
            posterImage: null | string,
            activityDetails: string,
            announcement: string,
            linkmanCode: null | string,
            groupCode: null | string
        }
            = {
            organizer: "测试",
            activityName: "测试名称",
            startTime: "2020-11-13 00:00:00",
            endTime: "2020-12-15 00:00:00",
            registrationDeadline : "2020-12:15 00:00:00",
            activityNumber: "16",
            label: ["测试标签"],
            lightSpot: "测试亮点",
            address: "地址",
            posterImage: "https://pic3.zhimg.com/50/v2-14d7c94ddc5205e630a05c56f2a90b93_qhd.jpg",
            activityDetails: "细节",
            announcement: "注意事项",
            linkmanCode: "https://pic3.zhimg.com/50/v2-14d7c94ddc5205e630a05c56f2a90b93_qhd.jpg",
            groupCode: "https://pic3.zhimg.com/50/v2-14d7c94ddc5205e630a05c56f2a90b93_qhd.jpg",
        };

        public addTagInputVal: string = "";
        private _activityId : number = 0;


        delActivityTag(tag: string) {
            this.addActivityModel.label.splice(this.addActivityModel.label.indexOf(tag), 1);
        }


        handleAvatarSuccess(res: any, file: any) {}



        async fuck1(file : File) {
            this.addActivityModel.posterImage = await updateFile(file);
            return true;

        }
        async fuck2(file : File) {
            this.addActivityModel.linkmanCode = await updateFile(file);
            return true;
        }
        async fuck3(file : File) {
            this.addActivityModel.groupCode = await updateFile(file);
            return true;
        }

        saveAsDraft() {
            if (!localStorage.accountId) {
                this.$router.push({
                    name : "login"
                });
                return
            }
            this.$request.post("/merchant/activity/add_activity_draft", {
                accountId : Number(localStorage.accountId),
                ticketVoList : this.addTicketTableData.map((rua : any, index) => {
                    return {
                        ...rua,
                        sequence : index++
                    }
                }),
                formSettingDtoList : [
                    ...this.formSettingDtoList.map((rua : any, index) => {
                        return {
                            ...rua,
                            sequence : index++
                        }
                    })
                ],
                ...this.addActivityModel
            }).then((data : any) => {
                this.$message.success("保存成功");
            }).catch((err : any) => {
                this.$message.error(err.msg || '未知原因, 保存失败');
            });
        }


        async deleteRow(index : number, arr : Array<TicketType>) {
            try {
                let flag = await this.$confirm('你确定你不是手滑了吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                flag && arr.splice(index, 1);
            }catch (e) {

            }

        }

        public getTitle(type: 0 | 1 | 2 | 3) {
            let arr = ["单项标题", "多行标题", "单项选择标题", "多项选择标题"];
            return arr[type];
        }

        public addActivityTag(tag: string) {
            this.addActivityModel.label.push(tag)
        }

        public delContentTag(content: Array<string>, tag: string) {
            content.splice(content.indexOf(tag), 1);
        }

        public addSelectItem(content: Array<string>, val: string, formItem: infoItem) {
            content.push(val);
            formItem.showInput = true;
        }

        // @ts-ignore
        change({text, html}) {
            this.addActivityModel.activityDetails = html;
        }

        public addFormItem(type : 0|1|2|3) {
            let obj : infoItem = {
                isOptional: 1,
                property: '',
                type,
                activityId : this._activityId,
                content: [],
                showInput : false
            };
            this.formSettingDtoList.push(obj);
        }

        public addTicket(tickType : 0 | 1) {
            this.addTicketTableData.push(new TicketType(tickType));
        }

        public switchOptional(formItem : infoItem) {
            formItem.isOptional = formItem.isOptional ? 0 : 1;
        }

        public getContent(data : any) {
            console.log(data);
        }

        public addActivity() {
            if (!localStorage.accountId) {
                this.$router.push({
                    name : "login"  
                });
                return
            }
            this.$http.post("/merchant/activity/update_activity", {
                accountId : Number(localStorage.accountId),
                ticketVoList : this.addTicketTableData.map((rua : any, index) => {
                    return {
                        ...rua,
                        sequence : index++
                    }
                }),
                formSettingDtoList : [
                    ...this.formSettingDtoList.map((rua : any, index) => {
                        return {
                            ...rua,
                            sequence : index++
                        }
                    })
                ],
                ...this.addActivityModel
            }).then((data : any) => {
                this.$message.success("添加成功");
            }).catch((err : any) => {
                this.$message.error(err.msg);
            });
            // console.log(this.addActivityModel);

        }

        async mounted() {
            let activityId = this.$route.params.activityId;
            let data : any = await this.$request.get(`/merchant/activity/get_activity/${activityId}`);
            this.addActivityModel = {
                ...data
            };
            console.log(data);
            this.editorRef.setText(data.activityDetails);
            this.addTicketTableData = data.ticketVoList;
            this.formSettingDtoList = data.formSettingDtoList;
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../../assets/style/view/index/BackgroundManage/ActivityManage/AddActivity/addActivity.less";
</style>

<style lang="less">
    .form-box {
        .post, .item {
            .avatar-uploader {
                .el-upload {
                    width: 200px;
                    height: 200px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    align-items: center;
                    border: 1px dashed #d9d9d9;
                    transition: border 0.5s;
                    position: relative;

                    .avatar {
                        /*position: absolute;*/
                        width: 100%;
                        height: 100%;
                    }

                    &:hover {
                        border: 1px dashed rgb(64, 158, 255);
                    }
                }
            }

            .el-textarea__inner {
                height: 200px;
            }
        }

    }

</style>
