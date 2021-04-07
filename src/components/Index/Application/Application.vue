<template>
    <div class="wrapper ApplicationView">
        <el-form ref="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input :value="data.name" ></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input :value="data.gender ? '男' : '女'" ></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input :value="data.phone" ></el-input>
            </el-form-item>
            <el-form-item label="学校">
                <el-input :value="data.school" ></el-input>
            </el-form-item>
            <template v-if="moreData">
                <el-form-item :label="data.property" v-for="(data, index) in moreData" :key="index">
                    <el-input v-if="data.type === 1" :value="data.value"></el-input>
                    <el-input v-else-if="data.type === 2" :value="data.value" type="textarea" autosize></el-input>
                    <template v-else-if="data.type === 3">
                        <el-radio :value="data.value" :label="radio" v-for="(radio, index) in data.content" :key="index">{{radio}}</el-radio>
                    </template>
                    <el-checkbox-group :value="data.value" v-else-if="data.type === 4">
                        <el-checkbox :label="s" v-for="(s, i) in data.content" :key="i"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </template>
        </el-form>
    </div>

</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class Application extends Vue {

        @Prop({
            default() {
                return [];
            }
        })
        moreData ?: Array<{
            property : string,
            content ?: Array<string> | string,
            //类型，0为单行文本框，1为多行文本框，2为单项选择框，3为多项选择框
            type : 0|1|2|3,
            value ?: Array<string>
        }>;

        @Prop()
        data ?: {
            name : string,
            school : string,
            phone : string,
            gender : 0|1
        }


    }
</script>

<style scoped lang="less">

</style>
