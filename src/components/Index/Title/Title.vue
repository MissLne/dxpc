<template>
    <div class="wrapper TitleView">
        {{content}}
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class Title extends Vue {

        @Prop({
            default : ""
        })
        content ?: string;

        beforeCreate() {

        }

        created() {

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
    .TitleView {
        padding-left: 12px;
        position: relative;
        &:before {
            position: absolute;
            content: '';
            width:4px;
            height:16px;
            background:rgba(255,137,0,1);
            border-radius:2px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
