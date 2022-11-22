<template>
    <div class="chart_type_set">
        <SelectChart :chartType="chartType" @getChartType="getChartType" />
        <component :is="getConfigComponent()" :chartConfig="chartConfig" @getChartConfig="getChartConfig" />
    </div>
</template>
<script>
import SelectChart from './SelectChart.vue'
import LineConfig from './chartConfig/line.vue'
import BarConfig from './chartConfig/bar.vue'
import AreaConfig from './chartConfig/area.vue'
import KLineConfig from './chartConfig/kLive.vue'
import DefaultConfig from './chartConfig/DefaultConfig.vue'
export default {
    props: {
       'dataChartType': {
            type: String,
            default: '',
       },
       'dataChartConfig': {
            type: String,
            default: '',
       },
    },
    data: function() {
        return {
            chartType: 'line',
            chartConfig: '',
        }
    },
    components: {
        SelectChart,
        LineConfig,
        BarConfig,
        AreaConfig,
        KLineConfig,
        DefaultConfig
    },
    created() {
        if (this.dataChartType) {
            this.chartType = this.dataChartType
        }
        if (this.dataChartConfig) {
            this.chartConfig = this.dataChartConfig
        }
    },
    methods: {
        // 获取当前图表类型
        getChartType(type) {
            this.chartType = type
            this.chartConfig = ''
            // 抛出当前所选的数图
            this.$emit('setDataChartType', type)
            this.$emit('setDataChartConfig', '')
        },
        // 渲染当前图表配置项
        getConfigComponent() {
            switch (this.chartType) {
                case 'line':
                    return LineConfig
                case 'bar':
                    return BarConfig
                case 'area':
                    return AreaConfig
                case 'kLine':
                    return KLineConfig
                default:
                    return DefaultConfig 
            }
        },
        getChartConfig(value) {
            // 抛出当前所选的数图配置
            this.$emit('setDataChartConfig', value)
        }
    },
}
</script>

<style lang="less" scoped>
.chart_type_set {
    width: 100%;
    margin-top: 8px;
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
}
</style>