<template>
    <div class="custom_component">
        <div class="custom_component_main">
            <div class="left">
                <ChartDataSet :dataApiConfig="dataApiConfig" @setDataApiConfig="setDataApiConfig"/>
                <ChartTypeSet :dataChartType="dataChartType"  @setDataChartType="setDataChartType" />
            </div>
            <div class="center">
                <el-radio-group v-model="current_select" size="small">
                  <el-radio-button label="组件">组件</el-radio-button>
                  <el-radio-button label="代码">代码</el-radio-button>
                </el-radio-group>
                <div class="componnet_msg">
                  <DragResizeBox v-show="current_select === '组件'" @resizeChart="resizeChart">
                    <g2-chart
                        ref="g2Chart"
                        :data-chart-type='dataChartType'
                        :data-api-config='dataApiConfig'
                        :data-chart-config='dataChartConfig'
                    ></g2-chart>
                  </DragResizeBox>
                  <div class="code_box" v-show="current_select === '代码'" ref="chartCode"></div>
                </div>
                <div class="operation_configure">
                  <el-button type="default">下载</el-button>
                </div>
            </div>
            <div class="right">
                <ChartConfigSet :dataChartType="dataChartType" :dataChartConfig='dataChartConfig' @setDataChartConfig="setDataChartConfig" />
            </div>
        </div>
    </div>
</template>
<script>
import ChartTypeSet from "./ChartTypeSet/index.vue"
import ChartDataSet from "./ChartDataSet/index.vue"
import ChartConfigSet from "./ChartConfigSet/index.vue"
import ComponentMsgDialog from './ComponentMsgDialog.vue'
import DragResizeBox from './dragResizeBox.vue'
export default {
  name: "Workbench-Home",
  components: {
    ChartDataSet,
    ChartTypeSet,
    ChartConfigSet,
    ComponentMsgDialog,
    DragResizeBox
  },
  // 向下抛出父组件
  provide() {
    return { Instance: this };
  },
  data() {
    return {
      id: null, // 新增|id == null，编辑|id !== null
      // g2-chart属性
      dataChartType: 'line',
      dataApiConfig: '',
      dataChartConfig: '',
      // 代码 标签
      current_select: '组件',
    };
  },
  created() {
    console.log('设置dataChartType、dataApiConfig、dataChartConfig')
  },
  methods: {
    // 图表大小渲染容器大小改变事件
    resizeChart() {
      let event = new CustomEvent('resizeChart')
      this.$refs.g2Chart.dispatchEvent(event)
    },
    // 获取图表渲染代码
    getChartCode() {
      this.$nextTick(() => {
        this.$refs.chartCode.innerText = `<g2-chart data-chart-type="${this.dataChartType}" data-api-config='${this.dataApiConfig}' data-chart-config='${this.dataChartConfig}'></g2-chart>
        <script src="http://192.168.9.52/yangwu/dengta-components/-/raw/master/lib/index.js" />`
      })
    },
    // 设置图表属性
    setDataChartType(type) {
      this.dataChartType = type
      this.dataChartConfig = ''
      this.getChartCode()
    },
    // 设置图表样式配置
    setDataChartConfig(config) {
        this.dataChartConfig = config
        this.getChartCode()
    },
    // 设置图表数据配置
    setDataApiConfig(config) {
      console.log(config)
      this.dataApiConfig = config
      this.getChartCode()
    },
   
  },
};
</script>

<style lang="less" scoped>
.custom_component {
    width: 100%;
    height: 100%;
    padding: 12px 32px 0;
    box-sizing: border-box;
    .custom_component_main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;
        box-sizing: border-box;
        .left {
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            > div {
              height: 50%;
              background: var(--box-bg-color);
              border-radius: 6px 6px 6px 6px;
              opacity: 1;
              border: 1px solid #373E48;
              // box-sizing: border-box;
              &:first-child {
                margin-bottom: 8px;
              }
              &:last-child {
                margin-top: 8px;
              }
            }
        }
        .center {
            flex: 1;
            margin: 0 24px;
            background: var(--box-bg-color);
            border-radius: 6px 6px 6px 6px;
            border: 1px solid #373E48;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px 0;
            /deep/ .el-radio-button__inner {
                background: var(--input-bg-color);
                border: 1px solid var(--input-bg-color);
                color: #fff;
            }
            /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
              background-color: var(--main-color-hover);
              border-color: var(--main-color-hover);
            }
            /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
              box-shadow: -1px 0 0 0 var(--main-color-hover);
            }
            .componnet_msg {
              flex: 1;
              padding: 16px 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              .code_box {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                padding: 24px 60px;
                box-sizing: border-box;
                word-break: break-all;
                word-wrap: break-word;
                 overflow-y: auto;
              }
              .data_box {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .operation_configure {
              width: 100%;
              padding: 0 60px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .el-button--default {
                color: #FFF;
                background-color: var(--main-color);
                border-color: var(--main-color);
              }
              > button {
                flex: 1;
              }
              .el-button+.el-button {
                margin-left: 24px;
              }
            }
        }
        .right {
            width: 25%;
            background: var(--box-bg-color);
            border-radius: 6px 6px 6px 6px;
            border: 1px solid #373E48;
            > div {
              padding: 16px;
              box-sizing: border-box;
            }
        }
    }
}
</style>