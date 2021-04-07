<template>
    <div class="wrapper TitleHeader">
        <div class="title-box">
            <i class="icon-outer">
                <i class="icon-inner"></i>
            </i>
            <p class="title">{{title}}</p>
        </div>
        <div class="right-slot-box" style="padding-right: 20px;">
            <slot v-if="useSlot"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class titleHeader extends Vue {

        @Prop()
        private title : string | undefined;
        @Prop({
            default : true
        })
        private useSlot ?: boolean;



    }
</script>

<style scoped lang="less">

    .TitleHeader.wrapper {
        display: flex;
        height: 66px;
        align-items: center;
        justify-content: space-between;
        .title-box {
            display: flex;
            align-items: center;
            .icon-outer, .icon-inner {
                display: inline-block;
                border-radius: 50%;
            }
            .icon-inner {
                width: 14px;
                height: 14px;
                border: 1.7px solid #ffffff;
                box-sizing: border-box;
            }
            .icon-outer {
                width: 26px;
                height: 26px;
                background-color: rgb(247, 142, 9);
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px;
            }
            .title {
                font-size:20px;
                font-family : Microsoft YaHei;
                font-weight:bold;
                color:rgba(51,51,51,1);
            }
        }
    }


</style>
