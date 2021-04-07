<template>
    <div class="wrapper WaitToDevView">
        <img :src="imgSrc" alt="" draggable="false" class="img">
        <p class="p">这个页面还待开发哦 ~ {{reason}} </p>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import imgSrc from "@/assets/img/index/0.jpg";
    @Component({
        components: {}
    })
    export default class WaitToDev extends Vue {

        imgSrc : string = imgSrc;

        @Prop({
            default() {
                return "";
            }
        })
        reason ?: string;
        beforeCreate() {

        }

        created() {
            console.log(this.reason);
        }

        beforeMount() {

        }

        mounted() {

        }

        beforeUpdate() {

        }

        updated() {

        }

        beforeDestroy() {

        }

        destroyed() {

        }

        activated() {

        }

        deactivated() {

        }
    }
</script>

<style scoped lang="less">
    .WaitToDevView {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-direction: column;
        .img {
            width: 500px;
        }
        .p {
            font-size: 24px;
            margin-top: 20px;
        }
        background-color: #ffffff;
    }
</style>
