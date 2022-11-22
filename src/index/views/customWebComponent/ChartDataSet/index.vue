<template>
    <div class="chart_data_set">
        <div class="data_api_select">
            <span>API：</span>
            <el-select v-model="currentAPI" filterable placeholder="请选择" @change="selectAPI">
                <el-option
                    v-for="item in apiList"
                    :key="item.id"
                    :label="item.api_name"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="data_api_params" v-if="Object.keys(paramObj).length > 0">
            <div v-for="(item, index) in paramsArr" :key="index">
                <span>{{ item.name }}：</span>
                <el-input v-model="paramObj[item.name]" v-if="item.values.split(',').length === 1"></el-input>
                <el-select v-model="paramObj[item.name]" v-else>
                    <el-option
                        v-for="(value, index) in item.values.split(',')"
                        :key="index"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <SelectKeys @change="selectCurrentKeys" :resultArr="resultArr" :selectArr="selectArr" v-if="resultArr.length > 0" />
    </div>
</template>
<script>
import { requestHttp } from '@/utils/utils'
import { debounce } from '@/utils/utils'
import SelectKeys from './SelectKeys.vue'
export default {
    props: {
        dataApiConfig: {
            type: String,
            default: ''
        }
    },
    data: function() {
        return {
            apiList: [], // API列表

            currentAPI: '', // 当前API
            paramObj: {}, // API参数key value
            paramsArr: [], // API参数描述
            resultArr: [], // API请求结果参数
            selectArr: [], // 默认选中的请求结果参数
        }
    },
    components: {
        SelectKeys
    },
    async created() {
        this.requestAPI = debounce(this.requestAPI, 1000)
        this.getApiList().then((data) => {
            // 默认值
            if (this.dataApiConfig) {
                try {
                    let { url, selectKeys, body } = JSON.parse(this.dataApiConfig)
                    let API_MSG = data.filter(item => item.api_url === url)[0]
                    let API_PARAM = JSON.parse(API_MSG.api_desc)
                    if (API_PARAM.length > 0) {
                        this.paramsArr = API_PARAM
                    }
                    this.currentAPI = API_MSG.id
                    this.paramObj = body
                    this.selectArr = selectKeys
                } catch (error) {
                    console.log(error)
                }
            }
        })
    },
    watch: {
        paramObj:{
            handler(newVal,oldVal){
                this.requestAPI()
            },
            deep:true,
        },
    },
    methods: {
        getApiList() {
            return new Promise((resolve, reject) => {
                this.API.getApiList({
                    page: 1,
                    size: 10000,
                    searchText: '',
                }).then((data) => {
                    this.apiList = data.list || []
                    resolve(data.list)
                }).catch(() => {
                    reject()
                })
            })
        },
        selectAPI() {
            this.resultArr = []
            let API_MSG = this.apiList.filter(item => item.id === this.currentAPI)[0]
            let API_PARAM = JSON.parse(API_MSG.api_desc)
            if (API_PARAM.length > 0) {
                this.paramsArr = API_PARAM
                let obj = {}
                API_PARAM.forEach((item) => {
                    obj[item.name] = item.defaultValue
                });
                this.paramObj = obj
            } else {
                this.paramsArr = []
                this.paramObj = {}
            }
            this.selectCurrentKeys([])
        },
        requestAPI() {
            let API_MSG = this.apiList.filter(item => item.id === this.currentAPI)[0]
            requestHttp({
                url: API_MSG.api_url,
                method: API_MSG.api_method,
                contentType: JSON.parse(API_MSG.api_header)['Content-Type'],
                body: this.paramObj,
            }).then((data) => {
                if (data && data instanceof Array && data.length > 0) {
                    this.resultArr = Object.keys(data[0])
                }
            })
        },
        selectCurrentKeys(value) {
            let API_MSG = this.apiList.filter(item => item.id === this.currentAPI)[0]
            this.$emit('setDataApiConfig', JSON.stringify({
                url: API_MSG.api_url,
                method: API_MSG.api_method,
                contentType: JSON.parse(API_MSG.api_header)['Content-Type'],
                body: this.paramObj,
                selectKeys: value
            }))
        }
    },
}
</script>
<style lang="less" scoped>
.chart_data_set {
    width: 100%;
    padding: 24px;
    background-color: #fff;
    box-sizing: border-box;
    .data_api_select {
        position: relative;
        background: #EDF0F5;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #EAECEF;
        > span {
            position: absolute;
            top: 10px;
            left: 12px;
            z-index: 2;
            color: #9093A0;
        }
        > div {
            width: 100%;
            /deep/ .el-input__inner {
                border-width: 0;
                background: #EDF0F5;
                padding-left: 60px;
            }
        }
    }
    .data_api_params {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
        > div {
            flex: 1;
            display: flex;
            align-items: center;
            position: relative;
            background: #EDF0F5;
            border-radius: 6px 6px 6px 6px;
            border: 1px solid #EAECEF;
            padding: 0 12px;
            &:not(&:last-child) {
                margin-right: 12px;
            }
            &:last-child {
                margin-left: 12px;
            }
            > span {
                color: #9093A0;
            }
            > div {
                width: 100%;
                /deep/ .el-input__inner {
                    border-width: 0;
                    background: #EDF0F5;
                }
            }
        }
    }
}
</style>