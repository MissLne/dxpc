<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    // import HelloWorld from './components/backups/HelloWorld.vue';
    //
    // @Component({
    //     components: {
    //         HelloWorld,
    //     },
    // })
    export default class App extends Vue {


        mounted() {
            this.$bus.$emit("eventName");
        }


    }
</script>

<style lang="less">
    @import "./assets/style/public/reset.less";
    @import "./assets/style/public/scrollBar.less";
    :root, body, #app {
        height: 100%;
    }
    #app {

    }


</style>
