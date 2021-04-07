<template>
    <div class="wrapper UserManageView">
        <div class="container" v-show="this.$route.name === 'userManage'">
            <TitleHeader title="用户列表"/>
            <div class="option-box">
                <el-input style="width: 300px" placeholder="输入手机号、昵称或用户名" v-model="searchContent"></el-input>
                <span>类型 : </span>
                <el-select value="" @change="changeSelect()" v-model="selectValue">
                    <el-option :value="0" label="用户"></el-option>
                    <el-option :value="1" label="商家"></el-option>
                    <el-option :value="2" label="所有"></el-option>
                </el-select>
                <span>每页显示 : </span>
                <el-select v-model="value" @change="handlePage">
                    <el-option :value="5" label="5"></el-option>
                    <el-option :value="10" label="10"></el-option>
                    <el-option :value="20" label="20"></el-option>
                    <el-option :value="100" label="100"></el-option>
                    <el-option :value="200" label="200"></el-option>
                </el-select>
                <el-button @click="handleSearch">搜索</el-button>
            </div>
            <div class="table-box">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column label="头像" align="center">
                        <template slot-scope="scope">
                            <el-image
                                    :preview-src-list="[scope.row.portrait]"
                                    :src="scope.row.portrait"
                                    class="table-td-thumb"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="nickname" label="昵称"></el-table-column>
                    <el-table-column align="center" prop="name" label="用户名"></el-table-column>
                    <el-table-column align="center" prop="gender" label="性别">
                    </el-table-column>
                    <el-table-column align="center" prop="phone" label="手机号"></el-table-column>
                    <el-table-column align="center" prop="lateInTime" label="上次登录时间"></el-table-column>
                    <el-table-column align="center" prop="registerTime" label="注册时间"></el-table-column>
                    <el-table-column align="center" prop="status" label="是否允许登录"></el-table-column>
                    <el-table-column align="center" prop="role" label="角色"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small" @click="handleBanned(scope.row)">封禁</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="container" v-show="this.$route.name !== 'userManage'">
            <router-view/>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import {AccountFormModel} from "@/bean/form/index/businessManage/AccountManage";
    import TitleHeader from "@/components/public/TitleHeader.vue";

    @Component({
        components: {TitleHeader}
    })
    export default class UserManage extends Vue {
        private selectValue : string = '';
        private searchContent : string = '';
        changeSelect() {
            console.log(!this.searchContent);
        }
        private tableData : any[] = [];
        private value : string = ''
        handleSearch() {
            if(this.searchContent) {
                let res = this.$formRequest.post('/web/management/search',
            
                {
                    role : this.selectValue || 2,
                    content : this.searchContent
                }
                ).then((res: any) => {
                    this.tableData = res;
                    console.log(res)
                })
                return;
            }
            this.loadData()
        }
        async mounted() {
            this.loadData()
        }

        async loadData() {
            let data = await this.$formRequest.get(`/web/management/page`);
            console.log(data);
            this.tableData = data;
            // console.log(this.tableData.gender);
            for(let i = 0;i < this.tableData.length;i++){
                if(this.tableData[i].gender == 1) {
                    this.tableData[i].gender = '男';
                } else if (this.tableData[i].gender == 2){
                    this.tableData[i].gender = '女';
                } else {
                    this.tableData[i].gender = '未知';
                }
                if(this.tableData[i].status == 0) {
                    this.tableData[i].status = '是';
                } else {
                    this.tableData[i].status = '否';
                }
                if(this.tableData[i].role == 0) {
                    this.tableData[i].role = '小程序用户';
                } else {
                    this.tableData[i].role = '商家';
                }
            }
        }
        handleClick(data : any) {
            console.log(data.role)
            this.$router.push({
                name : 'userDetail',
                params : {
                    id : data.id,
                    role: data.role
                }
            })
        }
        async handleBanned(data : any) {
            let res = await this.$formRequest.get('/web/management/status',
            {
                id: data.id
            })
            .then(() => {
                this.$message.success("设置成功");
            })
            
        }

    }
</script>

<style scoped lang="less">
    .UserManageView {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #ffffff;
        .container {
            height: 100%;
        }
        .table-td-thumb {
            width: 50px;
            height: 50px;
        }
    }
    @import "../../../../assets/style/view/index/BackgroundManage/UserManage/UserManage.less";
</style>
