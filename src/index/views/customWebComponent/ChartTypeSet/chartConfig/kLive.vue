<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="x轴配置" name="xAxis">
            <div class="config_box">
                <div class="scaleName">
                    <h3>x轴显示</h3>
                    <el-switch v-model="kLineConfig.xAxisVisible" active-color="#3BD5B3" inactive-color="#6d686d"></el-switch>
                </div>
                <div class="scaleName">
                    <h3>x轴刻度</h3>
                    <el-input-number v-model="kLineConfig.xScaleTickCount" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体大小</h3>
                    <el-input-number v-model="kLineConfig.xAxisLabelSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="kLineConfig.xAxisLabelColor"
                    ></el-color-picker>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="Y轴配置" name="yAxis">
            <div class="config_box">
                <div class="scaleName">
                    <h3>y轴显示</h3>
                    <el-switch v-model="kLineConfig.yAxisVisible" active-color="#3BD5B3" inactive-color="#6d686d"></el-switch>
                </div>
                <div class="scaleName">
                    <h3>y轴刻度</h3>
                    <el-input-number v-model="kLineConfig.yScaleTickCount" size="small" :min="1" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体大小</h3>
                    <el-input-number v-model="kLineConfig.yAxisLabelSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="kLineConfig.yAxisLabelColor"
                    ></el-color-picker>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="业务属性配置" name="business">
            <div class="config_box">
                <div class="scaleName">
                    <h3>涨跌颜色</h3>
                    <ul>
                        <li>
                            <span>上涨：</span>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="kLineConfig.riseColor"
                            ></el-color-picker>
                        </li>
                        <li>
                            <span>下跌：</span>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="kLineConfig.fallColor"
                            ></el-color-picker>
                        </li>
                    </ul>
                </div>
            </div>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
import { debounce } from '../../../../../utils/utils'
  export default {
    props: {
        chartConfig: {
            type: String,
            default: '',
        }
    },
    data() {
      return {
        activeNames: ['base'],
        kLineConfig: {
            xAxisVisible: false,
            xScaleTickCount: 0,
            xAxisLabelSize: 14,
            xAxisLabelColor: '#606266',
            yAxisVisible: false,
            yScaleTickCount: 0,
            yAxisLabelSize: 14,
            yAxisLabelColor: '#606266',
            riseColor: '#f04864',
            fallColor: '#2fc25b',
        }
      };
    },
    created() {
        this.sendChartConfig = debounce(this.sendChartConfig, 1000)
        if (this.chartConfig) {
            try {
                this.kLineConfig = JSON.parse(this.chartConfig)
            } catch (error) {
                console.log(error)
            }
        }
    },
    watch: {
        kLineConfig:{
            handler(newVal,oldVal){
                this.sendChartConfig(newVal)
            },
            deep:true
        }
    },
    methods: {
      sendChartConfig(value) {
        this.$emit('getChartConfig', JSON.stringify(value))
      }
    }
  }
</script>
<style lang="less" scoped>
/deep/ .el-collapse-item__header {
    font-size: 14px;
    font-weight: bold;
}
.config_box {
    background-color: #EAECEF;
    padding: 10px 20px;
    margin-bottom: 10px;
}
.scaleName {
    > h3 {
        font-size: 14px;
    }
    > ul {
        display: flex;
        > li {
            display: flex;
            align-items: center;
            margin-right: 12px;
        }
    }
    margin-bottom: 8px;
}
</style>