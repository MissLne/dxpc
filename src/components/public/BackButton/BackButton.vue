<template>
    <div class="wrapper BackButtonView" @click="handleClick">
        <img src="./icon.png" alt="" class="icon">
        <p class="p">返回上一页面</p>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class BackButton extends Vue {

        @Prop({
            default : false
        })
        activeHandler ?: boolean;


        handleClick() {
            if (this.activeHandler) {
                this.$emit("click");
            } else {
                this.$router.back();
            }
        }


    }
</script>

<style scoped lang="less">
    .BackButtonView {
        display: flex;
        .icon {
            width: 27px;
        }
        .p {
            font-size:16px;
            font-weight:400;
            color:rgba(255,137,0,1);
            margin-left: 8px;
        }
        cursor: pointer;
    }
</style>
