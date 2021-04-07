<template>
    <div class="BusinessManageView wrapper">
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
    import {Component, Vue} from "vue-property-decorator";
    import SideBar from "@/components/Index/SideBar.vue";
    import icon1 from "../../../assets/img/index/businessManage/1.png";
    import icon2 from "../../../assets/img/index/businessManage/2.png";
    import icon3 from "../../../assets/img/index/businessManage/3.png";
    import icon4 from "../../../assets/img/index/businessManage/4.png";

    @Component({
        components: {SideBar}
    })
    export default class BusinessManage extends Vue {
        private readonly sideBarData = [{
            menuTitle: "统计",
            menuLogo: icon1,
            itemArray: [{
                itemName: "数据分析",
                itemLink: {name: 'dataAnalysis'}
            }]
        }, {
            menuTitle: "管理",
            menuLogo: icon2,
            itemArray: [{
                itemName: "财务管理",
                itemLink: {name: 'financialManage'}
            }, {
                itemName: "活动管理",
                itemLink: {name: 'activityManage'}
            }]
        }, {
            menuTitle: "咨询",
            menuLogo: icon3,
            itemArray: [{
                itemName: "咨询评价",
                itemLink: {name: 'consultateEvaluation'}
            }, {
                itemName: "活动评价",
                itemLink: {name: 'comment'}
            }]
        }, {
            menuTitle: "设置",
            menuLogo: icon4,
            itemArray: [{
                itemName: "账号管理",
                itemLink: {name: 'accountManage'}
            }]
        }]
    }
</script>

<style scoped lang="less">
    @import "../../../assets/style/view/index/BusinessManage/BusinessManage.less";
</style>
