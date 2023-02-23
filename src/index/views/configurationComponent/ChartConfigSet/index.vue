<template>
    <div class="chart_type_set">
        <component :is="getConfigComponent()" :chartConfig="dataChartConfig" @getChartConfig="getChartConfig" :dataSource="dataSource" />
    </div>
</template>
<script>
import LineConfig from './g2/line.vue'
import BarConfig from './g2/bar.vue'
import AreaConfig from './g2/area.vue'
import RadarConfig from './g2/radar.vue'
import WordCloudConfig from './g2/wordCloud.vue'
import BubbleConfig from './g2/bubble.vue'
import LandscapeBar from './g2/landscapeBar.vue'
import KLineConfig from './d3/kLive.vue'
import TimeShareConfig from './d3/timeShare.vue'
import TimeShareGroupConfig from './d3/timeShareGroup.vue'
import TurnoverConfig from './d3/turnover.vue'
import bollConfig from './d3/boll.vue'
import timeEnergyConfig from './d3/timeEnergy.vue'
import dountConfig from './d3/dount.vue'
import roseConfig from './d3/rose.vue'
import g2PieConfig from './g2/g2Pie.vue'
import tableConfig from './dom/table.vue'
import tableBarConfig from './d3/tableBar.vue'
import riseFallConfig from './d3/riseFall.vue'
import barHorizenConfig from './d3/barHorizen.vue'
import blockTreeConfig from './d3/blockTree.vue'
import blockConfig from './dom/block.vue'
import timeLineConfig from './dom/timeLine.vue'
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
            dataSource: [],
        }
    },
    components: {
        LineConfig,
        BarConfig,
        AreaConfig,
        RadarConfig,
        WordCloudConfig,
        BubbleConfig,
        KLineConfig,
        TimeShareGroupConfig,
        TurnoverConfig,
        bollConfig,
        timeEnergyConfig,
        dountConfig,
        g2PieConfig,
        roseConfig,
        tableConfig,
        tableBarConfig,
        riseFallConfig,
        barHorizenConfig,
        blockTreeConfig,
        blockConfig,
        timeLineConfig,
        LandscapeBar
    },
    mounted() {
        this.$bus.$on('chart_data_set_change', (value) => {
            this.dataSource = value
        })
    },
    methods: {
        // 渲染当前图表配置项
        getConfigComponent() {
            switch (this.dataChartType) {
                case 'line':
                    return LineConfig
                case 'stackBar':
                    return BarConfig
                case 'landscapeStackBar':
                    return LandscapeBar
                case 'area':
                    return AreaConfig
                case 'radar':
                    return RadarConfig
                case 'wordCloud':
                    return WordCloudConfig
                case 'bubble':
                    return BubbleConfig
                case 'kLine':
                    return KLineConfig
                case 'timeShare':
                    return TimeShareConfig
                case 'timeShareGroup':
                    return TimeShareGroupConfig
                case 'turnover':
                    return TurnoverConfig
                case 'boll':
                    return bollConfig
                case 'timeEnergy':
                    return timeEnergyConfig
                case 'dount':
                    return dountConfig
                case 'rose':
                    return roseConfig
                case 'g2_pie':
                    return g2PieConfig
                case 'table':
                    return tableConfig
                case 'tableBar':
                    return tableBarConfig
                case 'riseFall':
                    return riseFallConfig
                case 'barHorizen':
                    return barHorizenConfig
                case 'blockTree':
                    return blockTreeConfig
                case 'block':
                    return blockConfig
                case 'timeLine':
                    return timeLineConfig
                default:
                    return '' 
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
    height: 100%;
    overflow: auto;
}
</style>