<template>
    <div class="wrapper TagComp">
        {{text}}
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class Tag extends Vue {
        @Prop({
            default: ""
        })
        private readonly text ?: string;
    }
</script>

<style scoped lang="less">
    .TagComp {
        width: 64px;
        height: 34px;
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 6px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 34px;
        text-align: center;
    }
</style>
