<template>
    <div class="wrapper ActivityItemView">
        <img :src="imgSrc" alt="" class="preview">
        <div class="right-box">
            <p class="title">{{title}}</p>
            <p class="time">{{time}}</p>
            <p class="address">{{address}}</p>
        </div>
        <button class="btn" @click="handleClick" v-if="showBtn">查看</button>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class ActivityItem extends Vue {

        @Prop({
            default : 'https://p3.pstatp.com/large/2a4400018ea1b5a0d0d6'
        })
        imgSrc ?: string;

        @Prop({
            default : "默认时间"
        })
        time ?: string;

        @Prop({
            default : "默认地址"
        })
        address ?: string;

        @Prop({
            default : "默认标题"
        })
        title ?: string;

        @Prop()
        showBtn ?: boolean;

        handleClick() {
            this.$emit("clickButton", "rua");
        }
    }
</script>

<style scoped lang="less">
    @import "ActivityItem";
</style>
