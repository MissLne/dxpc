<!-- children.vue -->
<template>
    <div class="wrapper ChildView">
<!--        child-content : {{content}}-->
<!--        <input v-model="inputContent" ></input>-->
        msg : {{msg}}
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class Child extends Vue {

        @Model("event", {
            type : String
        })
        readonly content !: string;

        inputContent : string = "";
        @Watch("inputContent")
        watchInputContent(newVal : string) {
            this.$emit("event", newVal);
        }

        mounted() {
            setTimeout(() => {
                this.$emit("event", "ruaQAQ");
                this.$emit("update:msg", "这是变化后的msg")
            }, 3000);
        }

        @Prop()
        msg ?: string
    }
</script>

<style scoped lang="less">

</style>
