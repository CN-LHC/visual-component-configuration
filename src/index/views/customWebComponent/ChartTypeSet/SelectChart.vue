/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-14 14:14:24 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2022-11-18 17:23:50
 * 选择当前数图, 默认选择折线图
 */
<template>
    <div class="select_chart">
        <el-button v-show="!visible" size="medium" class="current_chart" @click="changeVisible">
            <img :src="currentChart.src" :alt="currentChart.name">
            <span>{{ currentChart.name }}</span>
            <i class="el-icon-arrow-down"></i>
        </el-button>
        <div v-show="visible" class="chart_list">
            <div>
                <el-input
                    size="medium"
                    placeholder="Searcg for..."
                    v-model="chartName"
                    @change="filterChart"
                >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button icon="el-icon-arrow-up" size="medium" @click="changeVisible"></el-button>
            </div>
            <ul>
                <li v-for="(item, index) in setCharts" :key="index" @click="selectChart(item)" :class="[currentChart.name === item.name ? 'active_chart' : '']">
                    <img :src="item.src" :alt="item.name">
                    <div>
                        <span>{{ item.name }}</span>
                        <span>{{ item.des }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        chartType: {
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
                des: 'time based line',
                type: 'line',
            },{
                src: require("@/assets/images/bar.svg"),
                name: '柱状图',
                des: 'time based bar',
                type: 'bar',
            },{
                src: require("@/assets/images/area.svg"),
                name: '区域图',
                des: 'time based area',
                type: 'area',
            },{
                src: require("@/assets/images/k_line.svg"),
                name: 'k线图',
                des: 'time based kLine',
                type: 'kLine',
            }],
        }
    },
    mounted() {
        this.currentChart = this.setCharts.filter(item => item.type === this.chartType)[0]
    },
    methods: {
        filterChart(value) {
            if (this.oldCharts.length === 0) {
                this.oldCharts = [...this.setCharts]
            }
            this.setCharts = this.oldCharts.filter(item => item.name.indexOf(value) !== -1)
        },
        changeVisible() {
            this.visible = !this.visible
            if (this.oldCharts.length > 0) {
                this.setCharts = [...this.oldCharts]
                this.oldCharts = []
                this.chartName = ''
            }
        },
        selectChart(item) {
            this.currentChart = item
            this.changeVisible()
            this.$emit('getChartType', item.type)
        }
    },
}
</script>

<style lang="less" scoped>
.select_chart {
    width: 100%;
    .current_chart {
        width: 100%;
        position: relative;
        text-align: unset;
        margin-bottom: 8px;
        background-color: #EAECEF;
        border-color: #EAECEF;
        &:hover {
            color: #3BD5B3;
        }
        img {
            width: 16px;
            height: 16px;
            margin-right: 8px;
        }
        > span {
            > i {
                position: absolute;
                right: 20px;
            }
        }
    }
    .chart_list {
        > div {
            display: flex;
            align-items: center;
            .el-button--medium {
                padding: 10px 14px;
                margin-left: 6px;
                background-color: #EAECEF;
                border-color: #EAECEF;
                &:hover {
                    color: #3BD5B3;
                }
            }
            /deep/ .el-input__inner {
                background-color: #EAECEF;
                border-color: #EAECEF;
            }
        }
        > ul {
            max-height: 500px;
            margin-top: 8px;
            overflow-y: scroll;
            .active_chart {
                border-color: #3BD5B3;
                background-color: #20C6A1;
            }
            li {
                display: flex;
                align-items: center;
                background-color: #3BD5B3;
                border: 1px solid #3BD5B3;
                padding: 8px;
                margin-bottom: 8px;
                color: #fff;
                cursor: pointer;
                &:hover {
                    background-color: #20C6A1;
                }
                > img {
                    max-height: 38px;
                    width: 38px;
                    display: flex;
                    -webkit-box-align: center;
                    align-items: center;
                    margin-right: 8px;
                }
                > div {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
        }
    }
}
</style>