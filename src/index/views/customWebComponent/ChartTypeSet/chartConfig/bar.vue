<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="xscale" name="xscale">
            <div class="config_box">
                <div class="scaleName">
                    <h3>x轴名称</h3>
                    <el-input v-model="lineConfig.xScale.name" size="small" />
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="yscale" name="yscale">
            <div v-for="(item, index) in lineConfig.yScale" :key="index" class="config_box">
                <div class="scaleName">
                    <h3>y轴名称</h3>
                    <el-input v-model="item.name" size="small" />
                </div>
                <div class="scaleSwitch">
                    <h3>是否显示坐标轴</h3>
                    <el-switch v-model="item.showAxis" active-color="#3BD5B3" inactive-color="#6d686d"></el-switch>
                </div>
                <div class="scaleSwitch">
                    <h3>是否显示标记文字</h3>
                    <el-switch v-model="item.isLabel" active-color="#3BD5B3" inactive-color="#6d686d"></el-switch>
                </div>
            </div>
            <el-button icon="el-icon-plus" size="small" @click="addYScale"></el-button>
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
        activeNames: ['xscale'],
        lineConfig: {
            xScale: {
                name: ''
            },
            yScale: [
                {
                    name: '',
                    showAxis: false,
                    isLabel: false,
                },
            ],
        }
      };
    },
    created() {
        this.sendChartConfig = debounce(this.sendChartConfig, 1000)
        if (this.chartConfig) {
            try {
                this.lineConfig = JSON.parse(this.chartConfig)
            } catch (error) {
                console.log(error)
            }
        }
    },
    watch: {
        lineConfig:{
            handler(newVal,oldVal){
                this.sendChartConfig(newVal)
            },
            deep:true
        }
    },
    methods: {
    //   handleChange(val) {
    //     console.log(val);
    //   },
      addYScale() {
        this.lineConfig.yScale.push({
            name: '',
            showAxis: false,
            isPoint: false,
            isLabel: false,
        }) 
      },
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
.scaleName, .scaleSwitch {
    > h3 {
        font-size: 14px;
    }
    margin-bottom: 8px;
}
</style>