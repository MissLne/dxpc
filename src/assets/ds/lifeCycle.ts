import vue from "vue";
declare module 'vue/types/vue' {
    interface Vue {
        beforeCreate() : void,
        created() : void,
        beforeMount() : void,
        mounted() : void,
        beforeUpdate() : void,
        updated() : void,
        beforeDestroy() : void,
        destroyed() : void,
        activated() : void,
        deactivated() : void,
    }
}
