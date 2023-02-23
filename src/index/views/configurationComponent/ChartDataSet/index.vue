/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:05:24 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-23 15:55:12
 * 图表数据来源配置
 */

<template>
    <div class="chart_data_set">
        <div class="data_select">
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
            <img class="data_excel_select" src="../../../../assets/images/excel.svg" alt="表格" @click="otherSelectWay('')">
        </div>
        
        <div class="data_api_params" v-if="Object.keys(paramObj).length > 0">
            <div v-for="(item, index) in paramsArr" :key="index">
                <span>{{ item.name }}：</span>
                <el-input v-model="paramObj[item.name]" v-if="item.values.length === 0"></el-input>
                <el-select v-model="paramObj[item.name]" v-if="item.values.length > 1">
                    <el-option
                        v-for="(value, index) in item.values"
                        :key="index"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
                <SelectStock :paramObj="paramObj" v-if="item.values[0] === 'seccode'"/>
            </div>
        </div>
        <HandSonTable v-if="useExcel" :dataSource="dataSource" @setDataApiConfig="setDataApiConfig" />
        <QuickSelectApi @otherSelectWay="otherSelectWay" />
    </div>
</template>
<script>
import { requestHttp } from '@/utils/utils'
import { debounce } from 'lodash'
import SelectStock from './SelectStock.vue'
import HandSonTable from './HandSonTable.vue'
import QuickSelectApi from './QuickSelectApi.vue'
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
            currentAPI: '', // 当前所选API
            
            useExcel: false,

            paramObj: {}, //  接口body配置
            paramsArr: [], // API参数描述, 获取参数名称、参数可选默认值等

            dataSource: [], // 请求结果参数
        }
    },
    components: {
        SelectStock,
        HandSonTable,
        QuickSelectApi
    },
    async created() {
        this.emitDataSource = debounce(this.emitDataSource, 1000)
        this.getApiList().then((data) => {
            // 默认值
            if (this.dataApiConfig) {
                try {
                    let dataApiConfig = JSON.parse(this.dataApiConfig)
                    if (Object.prototype.toString.call(dataApiConfig) === '[object Object]') {
                        let { url, body } = dataApiConfig
                        let API_MSG = data.filter(item => item.api_url === url)[0]
                        let API_PARAM = JSON.parse(API_MSG.api_desc)
                        if (API_PARAM.length > 0) {
                            this.paramsArr = API_PARAM
                        }
                        this.currentAPI = API_MSG.id
                        this.paramObj = body
                    } else {
                        this.useExcel = true
                        this.dataSource = dataApiConfig
                    }
                } catch (error) {
                    console.log(error)   
                }
            }
        })
    },
    watch: {
        paramObj:{
            async handler(newVal,oldVal) {
                // 监听配置条件的变化
                if (this.currentAPI) {
                    await this.requestAPI()
                    this.setDataApiConfig()
                }
            },
            deep:true,
        },
        dataSource: {
            async handler(newVal,oldVal) {
                // 监听数据变化
                this.emitDataSource(newVal)
            },
            deep:true,
        },
    },
    methods: {
        // 抛出dataSource，防抖1000
        emitDataSource(value) {
            this.$bus.$emit('chart_data_set_change', value)
        },
        // 获取接口
        getApiList() {
            return new Promise((resolve, reject) => {
                let api_list = [{
                    api_desc: "[{\"name\":\"sdtseccode\",\"defaultValue\":\"\",\"values\":[\"seccode\"]}]",
                    api_header: "{\"Content-Type\":\"application/json\"}",
                    api_method: "POST",
                    api_name: "分时行情",
                    api_params: "{\"sdtseccode\":\"001336\"}",
                    api_params_desc: "",
                    api_url: "https://dtdataapi.wedengta.com/PerformanceData/QT_PerformanceData/Performance_minute",
                    id: 1,
                }]
                this.apiList = api_list
                resolve(api_list)
            })
        },
        otherSelectWay(value) {
            this.currentAPI = value || ''
            this.selectAPI()
        },
        // 根据所选接口的不同，设置可选接口参数和默认值
        selectAPI() {
            this.dataSource = []
            let API_MSG = this.apiList.filter(item => item.id === this.currentAPI)[0]
            if (!this.currentAPI) {
                this.useExcel = true
            } else {
                this.useExcel = false
            }
            // 选着API
            if (API_MSG) {
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
            } else {
                this.paramsArr = []
                this.paramObj = {}
                this.setDataApiConfig(this.dataSource)
            }
        },
        // 获取数图可配置参数
        requestAPI() {
            return new Promise((resolve) => {
                let API_MSG = this.apiList.filter(item => item.id === this.currentAPI)[0]
                requestHttp({
                    url: API_MSG.api_url,
                    method: API_MSG.api_method,
                    contentType: JSON.parse(API_MSG.api_header)['Content-Type'],
                    body: this.paramObj,
                }).then((data) => {
                    if (data && data instanceof Array) {
                        this.dataSource = data
                        resolve()
                    }
                })
            })
        },
        // 设置g2-chart属性data-api-config
        setDataApiConfig(value) {
            if (!Array.isArray(value)) {
                let API_MSG = this.apiList.filter(item => item.id === this.currentAPI)[0]
                this.$emit('setDataApiConfig', JSON.stringify({
                    url: API_MSG.api_url,
                    method: API_MSG.api_method,
                    contentType: JSON.parse(API_MSG.api_header)['Content-Type'],
                    body: this.paramObj,
                }))
            } else {
                this.dataSource = value
                this.$emit('setDataApiConfig', JSON.stringify(value))
            }
        },
    },
}
</script>
<style lang="less" scoped>
.chart_data_set {
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    overflow-y: scroll;
    .data_select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .data_api_select {
            flex: 1;
            position: relative;
            background: var(--box-bg-color);
            border-radius: 6px 6px 6px 6px;
            border: 1px solid #373E48;
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
                    background: var(--input-bg-color);
                    padding-left: 60px;
                    color: #fff;
                }
            }
        }
        .data_excel_select {
            margin-left: 12px;
            cursor: pointer;
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
            background: var(--input-bg-color);
            border-radius: 6px 6px 6px 6px;
            border: 1px solid #373E48;
            padding: 0 12px;
            &:not(&:last-child) {
                margin-right: 24px;
            }
            > span {
                color: #9093A0;
            }
            > div {
                width: 100%;
                /deep/ .el-input__inner {
                    border-width: 0;
                    background: var(--input-bg-color);
                    color: #fff;
                }
            }
        }
    }
}
</style>