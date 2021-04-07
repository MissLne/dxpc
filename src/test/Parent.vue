<!-- parent.vue -->
<template>
    <div class="wrapper ParentView">
<!--        parent-msg : {{content}}-->
        <Child v-model="content" :msg.sync="parentMsg"/>
        parentMsg : {{parentMsg}}
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
    import Child from "@/test/Child.vue";

    @Component({
        components: {
            Child
        }
    })
    export default class Parent extends Vue {

        content : string = "";

        parentMsg : string = "这是父组件传入的msg";


        mounted() {

        }
    }
</script>

<style scoped lang="less">

</style>
