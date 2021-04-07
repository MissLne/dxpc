<template>
    <div class="wrapper BackgroundManageView">
        <div class="left menu-box">
            <SideBar :bar-data="sideBarData"/>
        </div>
        <div class="right view-container">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import icon1 from "../../../assets/img/index/businessManage/1.png";
    import icon2 from "../../../assets/img/index/businessManage/2.png";
    import icon3 from "../../../assets/img/index/businessManage/3.png";
    import icon4 from "../../../assets/img/index/businessManage/4.png";
    import SideBar from "@/components/Index/SideBar.vue";

    @Component({
        components: {SideBar}
    })
    export default class BackgroundManage extends Vue {
        private readonly sideBarData = [{
            menuTitle: "统计",
            menuLogo: icon1,
            itemArray: [{
                itemName: "订单分析",
                itemLink: {name: 'orderAnalysis'}
            }]
        }, {
            menuTitle: "管理",
            menuLogo: icon2,
            itemArray: [{
                itemName: "用户管理",
                itemLink: {name: 'userManage'}
            }, {
                itemName: "前台管理",
                itemLink: {name: 'frontManage'}
            }, {
                itemName: "活动管理",
                itemLink: {name: 'backActivityManage'}
            }, {
                itemName: "订单管理",
                itemLink: {name: 'orderManage'}
            }]
        }, {
            menuTitle: "售后",
            menuLogo: icon3,
            itemArray: [{
                itemName: "意见反馈",
                itemLink: {name: 'feedbackManage'}
            }]
        }, {
            menuTitle: "设置",
            menuLogo: icon4,
            itemArray: [{
                itemName: "账户权限",
                itemLink: {name: 'accountAuthority'}
            }]
        }]
    }
</script>

<style scoped lang="less">
    @import "../../../assets/style/view/index/BackgroundManage/BackgroundManage.less";
</style>
