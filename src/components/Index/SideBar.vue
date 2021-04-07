<template>
    <div class="wrapper SidebarComp">
        <div class="bar-container">
            <div class="menu-item" v-for="(menuItem, index) in barData" :key="index">
                <div class="title-box">
                    <img :src="menuItem.menuLogo" alt="" class="logo">
                    <p class="title">{{menuItem.menuTitle}}</p>
                </div>
                <router-link v-for="(item, index) in menuItem.itemArray" :key="index" :to="item.itemLink" tag="div">
                    <p class="item-text">{{item.itemName}}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from "vue-property-decorator";
	class Item {
        itemName : string = "";
        itemLink : string | object  = ""
    }
    type BarData  = Array<{
        menuTitle : string;
        menuLogo : string;
        itemArray : Array<Item> | undefined
    }>


	@Component
	export default class SideBar extends Vue{
        @Prop()
        private barData : BarData | undefined;







	}
</script>

<style scoped lang="less">

    @import "../../assets/style/components/Index/SideBar.less";



</style>
