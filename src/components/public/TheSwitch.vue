<template>
    <div class="wrapper SwitchItemView">
        <p class="text">{{activeState ? activeText : unactiveText}}</p>
        <el-switch
                v-model="activeState"
                style="display: block"
                active-color="#FFBC66"
                inactive-color="#D8D7D6"
                :width="45"
                :class="activeState ? 'active' : ''"
                @change="handleChange"
        >
        </el-switch>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class TheSwitch extends Vue {



        @Prop()
        active : boolean = true;

        activeState : boolean = true;


        handleChange(newVal : boolean) {
            this.$emit("change", newVal);
        }


        @Prop({
            default() {
                return '';
            }
        })
        activeText !: string;





        @Prop(
            {
                default() {
                    return ''
                }
            }
        )
        unactiveText !: string;


        beforeCreate() {

        }

        created() {
            this.activeState = this.active;
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
    .SwitchItemView {
        display: flex;
        justify-content: center;

        .el-switch__core:after {
            background-color: #FFA32E;
            width:26px;
            height:26px;
            box-shadow:0px 1px 2px 0px rgba(0, 0, 0, 0.07);
            border-radius:50%;
            top: 50%;
            transform: translateY(-50%);
        }

    }
</style>
