<template>
    <div class="wrapper AccountAuthorityView">
        <input ref="inputFile" type="file" @change="handleFileChange" :key="ruaQAQ" style="display: none"></input>
        <TitleHeader :title="title" :use-slot="true">
            <template>
                <button class="add-btn" @click="addNewAccount" v-if="title === Constants.LIST">新增账户</button>
                <BackButton v-else :active-handler="true" @click="title = Constants.LIST"/>
            </template>
        </TitleHeader>
        <div class="table-box" v-show="this.title === this.Constants.LIST">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column align="center" prop="account" label="用户名"></el-table-column>
                <el-table-column align="center" prop="role" label="角色">
                    <template slot-scope="scope">
                        {{scope.row.role === '1' ? '商家' : '管理员'}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="名称"></el-table-column>
                <el-table-column align="center" prop="phone" label="手机"></el-table-column>
                <el-table-column align="center" prop="status" label="状态">
                    <template slot-scope="scope">
                            <el-switch
                            :value="scope.row.status == 1"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="true"
                            :inactive-value="false"
                            @change="handleSwitch(scope.row)">
                            </el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: black;">修改</el-button>
                        <el-button type="text" size="small" style="color: #FA4040" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="add-container" v-show="this.title === this.Constants.ADD">
            <div class="left">
                <div class="avatar-box" @click="selectFile">
                    <img :src="avatar" alt="" class="avatar">
                    <p class="upload-btn">点击上传图片</p>
                </div>
                <div class="form-box">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="商家名称">
                            <el-input v-model="addFormModel.companyName" style="width: 170px"></el-input>
                        </el-form-item>
                        <el-form-item label="商家电话">
                            <el-input v-model="addFormModel.companyPhone" style="width: 170px"></el-input>
                        </el-form-item>
                        <el-form-item label="商家简介">
                            <el-input type="textarea" v-model="addFormModel.introduction" class="demo" style="width: 313px; min-height: 154px" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="right">
                <div class="form-box">
                    <el-form ref="form" label-width="140px">
                        <el-form-item label="账户名称">
                            <el-input v-model="addFormModel.accountName"></el-input>
                        </el-form-item>
                        <el-form-item label="账户密码">
                            <el-input v-model="addFormModel.password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input v-model="addFormModel.confirmPassword" ></el-input>
                        </el-form-item>
                        <el-form-item label="联系人名">
                            <el-input v-model="addFormModel.linkman" style="width: 214px" placeholder="开户者真实名字"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="addFormModel.phone" style="width: 214px"></el-input>
                        </el-form-item>
                        <el-form-item label="账户角色">
                            <el-select v-model="addFormModel.role">
                                <el-option  :value="0">管理员</el-option>
                                <el-option  :value="1">商家</el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="button-box">
                    <button class="submit" @click="submitAddAccount">提交</button>
                    <button class="cancel">取消</button>
                </div>
            </div>
        </div>
        <div class="change-container" v-show="this.title === this.Constants.UPDATE">
            <div class="left">
                <div class="account-box" style="display: flex;">
                    <p class="p">账户名称 : {{updateFormModel.companyName}}</p>
                    <p style="cursor: pointer; color: #387AFF; margin-left: 30px;margin-bottom: 20px" @click="changePswClick">修改密码</p>
                </div>
                <div class="avatar-box" @click="fileChange">
                    <!-- <input ref="inputFile" type="file" @change="fileChange" :key="ruaQAQ" style="display: none"></input> -->
                    <img :src="updateFormModel.image" alt="" class="avatar">
                    <p class="upload-btn">点击上传图片</p>
                </div>
                <div class="form-box">
                    <el-form ref="form" label-width="80px">
                        <el-form-item label="商家名称">
                            <el-input v-model="updateFormModel.companyName" style="width: 170px"></el-input>
                        </el-form-item>
                        <el-form-item label="商家电话">
                            <el-input v-model="updateFormModel.companyPhone" style="width: 170px"></el-input>
                        </el-form-item>
                        <el-form-item label="商家简介">
                            <el-input type="textarea" v-model="updateFormModel.companyIntroduction" class="demo" style="width: 313px; min-height: 154px" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="right">
                <div class="form-box">
                    <el-form ref="form" label-width="140px">
                        <el-form-item label="联系方式">
                            <el-input v-model="updateFormModel.phone" style="width: 214px"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人名">
                            <el-input v-model="updateFormModel.linkman" style="width: 214px"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="button-box">
                <button class="submit" @click="submitChange">提交</button>
                <button class="cancel" >取消</button>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="visibility">
            <el-form ref="form" label-width="140px">
                <el-form-item label="旧密码">
                    <el-input v-model="passwordFormModel.preffixPassword" style="width: 214px"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="passwordFormModel.suffixPassword" style="width: 214px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="changePassword">确认</el-button>
                    <el-button @click="visibility=false">取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import {AccountAuthorityModel} from "@/bean/form/index/BackgroundManage/AccountAuthority";
    import TheSwitch from "@/components/public/TheSwitch.vue";
    import TitleHeader from "@/components/public/TitleHeader.vue";
    import BackButton from "@/components/public/BackButton/BackButton.vue";
    import {readFile} from "@/util/fileUtil";
    // @ts-ignore
    import md5 from "js-md5";

    @Component({
        components: {BackButton, TitleHeader, TheSwitch}
    })
    export default class AccountAuthority extends Vue {

        private Constants = {
            "LIST" : '账户列表',
            "ADD" : "新增账户",
            "UPDATE" : "修改账户"
        };

        private ruaQAQ : number = 0;
        // private switchValue : boolean = false;
        private updateFormModel : any = {};
        private addFormModel = {
            // accountName : "147859",
            // password : "123456",
            // linkman : "SakuraSnow",
            // phone : "13189457961",
            // role : 0,
            // image : null,
            // companyName : "SakuraSnow",
            // companyPhone : "13189457961",
            // introduction : "SakuraSnow"
        };
        private title : string = this.Constants.LIST;
        private avatar : string = "";
        private passwordFormModel = {
            preffixPassword : "",
            suffixPassword : ""
        };
        private switchValue : number = 0;
        handleSwitch(data : any) {
            this.$request.get("/web/management/status", {
                id : data.id
            }).then((res) => {
                this.$message.success(`${data.status == '1' ? '封禁' : '取消封禁'}成功`);
               this._loadData();
            });
        }

        submitChange() {
            console.log(this.updateFormModel)
            this.$formRequest.post("/web/right/save", {
                // ...this.updateFormModel,
                id : localStorage.getItem('accountId'),
                companyName : this.updateFormModel.companyName,
                linkman : this.updateFormModel.linkman,
                phone : this.updateFormModel.phone,
                accountName : this.updateFormModel.companyName,
                companyIntroduction : this.updateFormModel.companyIntroduction
                // file : null
            }).then((res) => {
                this.$message.success("修改成功");
            })

        }
        changePswClick() {
            this.visibility = true;
            console.log(111)
        }
        changePassword() {
            this.visibility = false;
            this.$formRequest.post("/web/right/password", {
                account : this.updateFormModel.account,
                prePassword : this.passwordFormModel.preffixPassword,
                sufPassword : this.passwordFormModel.suffixPassword
            }).then((res) => {
                this.$message.success("修改成功");
                this.visibility = false;
            })
        }

        mounted() {
            this._loadData();
            this.switchValueFunc()
        }
        switchValueFunc(value? : any) {
            console.log(value.status)
            this.switchValue = value.status;
        }
        async _loadData() {
            let data = await this.$request.get("/web/right/page");
            this.tableData = data
            // this.switchValue = data.status;
            console.log(this.tableData.status);
        }

        async handleDelete(data : any) {
            this.$request.get("/web/right/delete", {id : data.id}).then((res) => {
                this.$message.success("删除成功");
                this._loadData();
            })
        }

        tableData : any = [
            {
                username : "rua",
                role : "管理员",
                name : "QAQ",
                phone : "13189457961",
                status : true,
            }
        ];

        visibility = false;

        async handleClick(data : any) {
            this.title = this.Constants.UPDATE;
            let res = await this.$request.get("/web/right/edit", {
                id : data.id,
                role : data.role
            });
            this.updateFormModel = res;
            console.log(this.updateFormModel);
        }

        addNewAccount() {
            this.title = this.Constants.ADD;
        }

        async submitAddAccount() {
            
            console.log(this.addFormModel)
            let data = await this.$formRequest.post("/web/right/new", {
                ...this.addFormModel
            }
            // , {
            //     headers : {
            //         image : this.addFormModel.image,
            //     }
            // }
            )
            .then((res) => {
                this.$message.success("添加成功");
            });
        }

        selectFile() {
            let inputFile : any = this.$refs.inputFile;
            console.log(inputFile);
            inputFile.click();
        }

        async handleFileChange(e : Event) {
            let file = (<any>e.target).files[0];
            let data : any = await readFile(file);
            if (this.title === this.Constants.UPDATE) {
                console.log(file)
                this.updateFormModel.image = file;
                console.log(file);
                this.$formRequest.post('/web/right/picture', {
                    file: this.updateFormModel.image,
                    id: this.updateFormModel.id
               })
               .then((res) => {
                    this.$message.success("修改成功");
                    this.updateFormModel.image = res;
                    console.log(res)
                });
            } else if(this.title === this.Constants.ADD) {
                this.addFormModel.image = file;
            }
            this.avatar = data;
        }
        fileChange() {
            let inputFile : any = this.$refs.inputFile;
            // console.log(inputFile);
            inputFile.click();
            console.log(this.updateFormModel)
            
        }
        clickInputFile() {

        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/view/index/BackgroundManage/AccountAuthority/AccountAuthority.less";

</style>
