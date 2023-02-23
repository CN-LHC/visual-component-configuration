/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-14 14:14:24 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-22 14:06:47
 * 选择当前数图, 默认选择折线图
 */
<template>
    <div class="select_chart">
        <el-input
            placeholder="Searcg for..."
            v-model="chartName"
            clearable
            @change="filterChart"
        >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <ul class="search_list">
            <li
                v-for="(item, index) in setCharts"
                :key="index" @click="selectChart(item)"
                :class="[currentChart.type === item.type ? 'active_chart' : '']"
            >
                <span :title="item.des">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        dataChartType: {
            type: String,
            default: 'line',
        }
    },
    data: function() {
        return {
            visible: false,
            chartName: '',
            currentChart: {},
            oldCharts: [],
            setCharts: [{
                src: require("@/assets/images/line.svg"),
                name: '折线图',
                des: '单折线图、双y轴折线图、多折线图',
                type: 'line',
            },{
                src: require("@/assets/images/bar.svg"),
                name: '柱状图',
                des: '单柱状图、堆叠柱状图、分组柱状图',
                type: 'stackBar',
            },{
                src: require("@/assets/images/bar.svg"),
                name: '条形图',
                des: '单条形图、堆叠条形图、分组条形图',
                type: 'landscapeStackBar',
            },{
                src: require("@/assets/images/area.svg"),
                name: '区域图',
                des: '单区域图、双轴区域图、多区域图',
                type: 'area',
            },{
                src: require("@/assets/images/line.svg"),
                name: '饼图',
                des: '基础饼图、环形图、玫瑰图',
                type: 'g2_pie',
            },{
                src: require("@/assets/images/area.svg"),
                name: '雷达图',
                des: '雷达图',
                type: 'radar',
            },{
                src: require("@/assets/images/area.svg"),
                name: '词云图',
                des: '词云图',
                type: 'wordCloud',
            },{
                src: require("@/assets/images/area.svg"),
                name: '点图',
                des: '散点图、气泡图',
                type: 'bubble',
            },{
                src: require("@/assets/images/k_line.svg"),
                name: 'k线图',
                des: 'k线图',
                type: 'kLine',
            },{
                src: require("@/assets/images/k_line.svg"),
                name: 'boll图',
                des: '布林线图',
                type: 'boll',
            },{
                src: require("@/assets/images/bar.svg"),
                name: '成交量',
                des: 'turnover bar',
                type: 'turnover',
            },{
                src: require("@/assets/images/bar.svg"),
                name: '分时能量',
                des: 'timeEnergy bar',
                type: 'timeEnergy',
            },{
                src: require("@/assets/images/line.svg"),
                name: '分时图',
                des: 'time share',
                type: 'timeShare',
            },{
                src: require("@/assets/images/line.svg"),
                name: '分时组合',
                des: 'time share group',
                type: 'timeShareGroup',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '饼图',
                des: 'd3 dount chart',
                type: 'dount',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '玫瑰图',
                des: 'd3 rose chart',
                type: 'rose',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '表格',
                des: 'show table',
                type: 'table',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '条形表格',
                des: 'show barTable',
                type: 'tableBar',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '市场强度',
                des: 'show riseFall',
                type: 'riseFall',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '横向柱图',
                des: 'show barHorizen',
                type: 'barHorizen',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '方块树图',
                des: 'show blockTree',
                type: 'blockTree',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '方块图',
                des: 'show block',
                type: 'block',
            }, {
                src: require("@/assets/images/line.svg"),
                name: '时间线',
                des: 'show timeLine',
                type: 'timeLine',
            }],
        }
    },
    mounted() {
        this.currentChart = this.setCharts.filter(item => item.type === this.dataChartType)[0]
    },
    methods: {
         // 获取当前图表类型
        selectChart(item) {
            this.currentChart = item
            // this.changeVisible()
            // 抛出当前所选的数图
            this.$emit('setDataChartType', item.type)
        },
        filterChart(value) {
            if (value.length > 0) {
                if (this.oldCharts.length === 0) {
                    this.oldCharts = [...this.setCharts]
                }
                this.setCharts = this.oldCharts.filter(item => item.name.indexOf(value) !== -1)
            } else {
                if (this.oldCharts.length > 0) {
                    this.setCharts = [...this.oldCharts]
                    this.oldCharts = []
                }
            }
        },
    },
}
</script>

<style lang="less" scoped>
.select_chart {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    /deep/ .el-input__inner {
        background-color: var(--input-bg-color);
        border-color: #373E48;
        color: #fff;
    }
    .search_list {
        overflow: scroll;
        margin-top: 24px;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 82px);
        grid-gap: 24px;
        height: calc(100% - 50px);
        margin-right: -16px;
        padding-right: 16px;
        > li {
            width: 88px;
            height: 48px;
            background: #999DC3;
            border-radius: 6px 6px 6px 6px;
            cursor: pointer;
            text-align: center;
            line-height: 48px;
            color: #303741;
            &:hover {
                background: linear-gradient(180deg, var(--main-color) 0%, #4A8BFC 100%);
                color: #fff;
            }
        }
    }
    .active_chart {
        background: linear-gradient(180deg, var(--main-color) 0%, #4A8BFC 100%) !important;
        color: #fff !important;
    }
}
</style>