import { debounce } from 'lodash'
export const mixin = {
    props: {
        chartConfig: {
            type: String,
            default: '',
        },
        dataSource: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            selectKey: [],
        }
    },
    created() {
        this.sendChartConfig = debounce(this.sendChartConfig, 1000)
        if (this.chartConfig) {
            try {
                this.defaultConfig = JSON.parse(this.chartConfig)
            } catch (error) {
                console.log(error)
            }
        } else {
            this.$emit('getChartConfig', JSON.stringify(this.defaultConfig))
        }
        if (this.dataSource && Array.isArray(this.dataSource) && this.dataSource[0] instanceof Object) {
            this.selectKey = Object.keys(this.dataSource[0])
        }
    },
    watch: {
        defaultConfig:{
            handler(newVal,oldVal){
                this.sendChartConfig(newVal)
            },
            deep:true
        },
        dataSource: {
            handler(newVal,oldVal){
                if (Array.isArray(newVal)) {
                    if (newVal.length === 0) {
                        this.selectKey = []
                    } else if (newVal[0] instanceof Object) {
                        this.selectKey = Object.keys(newVal[0])
                    }
                }
            },
            immediate: true,
            deep:true
        }
    },
    methods: {
        sendChartConfig(value) {
            this.$emit('getChartConfig', JSON.stringify(value))
        },
    }
  };