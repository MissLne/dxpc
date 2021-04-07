<template>
    <div class="wrapper UserDetailView">
        <div class="left" v-show="isUser">
            <TitleHeader title="用户信息"/>
            <div class="header-box">
                <img :src="avatar" alt="" class="avatar">
                <p class="username">{{userData.name}}</p>
                <p class="introduce">{{userData.introduction}}</p>
            </div>
            <div class="container">
                <div class="box">
                    <div class="item">
                        <p class="name">微信账号</p>
                        <p class="value">{{userData.chatAccount||'无'}}</p>
                    </div>
                    <div class="item">
                        <p class="name">手机号</p>
                        <p class="value">{{userData.phone||'无'}}</p>
                    </div>
                    <div class="item">
                        <p class="name">上次登陆时间</p>
                        <p class="value">{{userData.lateInTime}}</p>
                    </div>
                    <div class="item">
                        <p class="name">注册时间</p>
                        <p class="value">{{userData.registerTime}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="right" v-show="isUser">
            <div class="header">
                <p class="title">用户参加的活动</p>
            </div>
            <ActivityItem :title="'珂学交流'" :time="'2020年03月05日'" :address="'address'" v-for="(activityData, index) in fitterActivityData"></ActivityItem>
        </div>
        <div class="container" v-show="!isUser">
            <TitleHeader title="商家信息"/>
            <div class="bus-message-box">
                <div class="left">
                    <img :src="avatar" alt="" class="avatar">
                </div>
                <div class="right">
                    <div class="item">
                        <p class="p"><span style="margin-right: 16px">商家名称</span> {{userData.name}}</p>
                        <p class="p"><span style="margin-right: 16px">联系电话</span> {{userData.phone}}</p>
                    </div>
                    <div class="item">
                        <p class="p">粉丝数</p>
                        <p class="p" style="text-align: center">{{userData.fans}}</p>
                    </div>
                    <div class="item">
                        <p class="p"><span style="margin-right: 56px;">注册时间</span>{{userData.registerTime}}</p>
                        <p class="p"><span style="margin-right: 20px">上次活跃时间</span>{{userData.lateInTime}}</p>
                    </div>
                </div>
            </div>
           <div class="bus-introduce-box">
               <p class="title">商家简介</p>
               <p class="detail">{{userData.introduction}}</p>
           </div>
            <div class="activity-box">
                <p class="title">发布的活动</p>
                <ActivityItem  :show-btn="true" :title="'珂学交流'" :time="'2020年03月05日'" :address="'address'" v-for="(activityData, index) in fitterActivityData"></ActivityItem>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import TitleHeader from "@/components/public/TitleHeader.vue";
    import ActivityItem from "@/components/Index/ActivityItem/ActivityItem.vue";

    @Component({
        components: {ActivityItem, TitleHeader}
    })
    export default class UserDetail extends Vue {

        private id : string = '';
        private role: string | number = '';
        private fitterActivityData : Array<any> = [1,2,3];
        private avatar : string = "";
        private isUser : number = 0;
        private userData : object = {};
        beforeCreate() {

        }

        created() {

        }

        beforeMount() {

        }

        mounted() {
            this.id = <string><unknown>(this.$route.params.id);
            this.role = <string><unknown>(this.$route.params.role);
            this.loadData();
            console.log(this.role)
            console.log(this.id)
            this.isUser = !this.role;
        }

        async loadData() {
            console.log(this.id)
            switch (this.role) {
                case '商家':
                    this.role = 1; 
                    break;
                case '小程序用户':
                    this.role = 0; 
                    break;
                default:
                    break;
            }
            let data = await this.$formRequest.get('/web/management/details',
            
               {
                    id: this.id,
                    role: this.role
                }
            
            );
            console.log(data)
            this.userData = data;
            this.avatar = this.userData.image;
            // this.tableData
        }


    }
</script>

<style scoped lang="less">
    @import "UserDetail";
</style>
