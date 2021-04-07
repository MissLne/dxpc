<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2> {{name}} </h2>
        <h2 @click="onClick"> {{age}} </h2>
        <h2>{{sum}}</h2>
        <button @click="toAbout">rua~</button>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class HelloWorld extends Vue {
        // @Prop() private msg!: string;
        @Prop()
        private msg : string = "";
        private name : string =  "sakura";
        private age = 18;
        private a = 1;
        private b = 2;
        private c = 3;




        mounted() : void {
            console.log("挂载");
            setTimeout(() => {
                this.a = 10;
                this.b = 20;
                this.c = 30;
            }, 1000);
        }


        private onClick() {
            console.log("点击", this.age);
        }
        private toAbout(event : Event) {
            this.$router.replace("/about").then(() => {

            }, () => {

            })
        }
        get sum() {
            return this.a + this.b + this.c;
        }
        @Watch('sum')
        onSumChange(newVal : number, oldVal : number) {
            console.log(newVal, oldVal);
        }



    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
