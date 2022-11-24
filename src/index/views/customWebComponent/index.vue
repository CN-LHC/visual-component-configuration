/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-22 09:11:11 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2022-11-23 10:20:24
 * 数图新建、编辑
 */

<template>
    <div class="custom_component">
        <div class="backHome">
            <el-button @click="goHome">返回</el-button>
        </div>
        <div :class="{ is_dragging: isDragging }" class="custom_component_main">
            <div class="content">
                <div class="hori_resizer" id="signup_horiResizer"></div>
                <aside class="siderSignup siderSignup2">
                    <div class="side_signup_material">
                    <div class="iframe_layer" v-show="isDragging"></div>
                    <div class="content_left">
                        <ChartDataSet :dataApiConfig="dataApiConfig" @setDataApiConfig="setDataApiConfig" />
                        <ChartTypeSet
                            :dataChartType="dataChartType"
                            :dataChartConfig='dataChartConfig'
                            @setDataChartType="setDataChartType"
                            @setDataChartConfig="setDataChartConfig"
                        />
                    </div>
                    </div>
                </aside>
                <div class="content_right">
                    <div class="chart_container">
                        <g2-chart
                            ref="g2Chart"
                            :data-chart-type='dataChartType'
                            :data-api-config='dataApiConfig'
                            :data-chart-config='dataChartConfig'
                        ></g2-chart>
                    </div>
                    <div class="chart_message">
                        <el-radio-group v-model="current_select" size="small">
                            <el-radio-button label="代码"></el-radio-button>
                            <el-radio-button label="标签"></el-radio-button>
                        </el-radio-group>
                        <div v-show="current_select === '代码'" ref="chartCode"><el-empty description="暂无数据"></el-empty></div>
                        <div v-show="current_select === '标签'"><el-empty description="暂无数据"></el-empty></div>
                    </div>
                    <el-button @click="openComponentMsgDialog">保存配置</el-button>
                </div>
            </div>
        </div>
        <ComponentMsgDialog ref="componentMsgDialog" @submitConfig="submitConfig" />
    </div>
</template>

<script>
import $ from "jquery";
import ChartTypeSet from "./ChartTypeSet/index.vue"
import ChartDataSet from "./ChartDataSet/index.vue"
import ComponentMsgDialog from './ComponentMsgDialog.vue'
// import { debounce } from '@/utils/utils'
export default {
  name: "Workbench-Home",
  components: {
    ChartDataSet,
    ChartTypeSet,
    ComponentMsgDialog
  },
  // 向下抛出父组件
  provide() {
    return { Instance: this };
  },
  data() {
    return {
      id: null, // 新增|id == null，编辑|id !== null
      isDragging: false, //拖动侧栏时，需要让iframe覆盖一层div，避免拖动bug
      currentLeft: 1060, //从左0位置往右多少像素
      // g2-chart属性
      dataChartType: 'line',
      dataApiConfig: '',
      dataChartConfig: '',
      // 代码 标签
      current_select: '代码'
    };
  },
  created() {
    // this.getChartCode = debounce(this.getChartCode, 2000)
    // 通过customComponent，判断当前是编辑态还是新建态
    let customComponent = localStorage.getItem('customComponent');
    if (customComponent) {
      customComponent = JSON.parse(customComponent)
      this.dataChartType = customComponent.chart_type
      this.dataApiConfig = customComponent.data_api_config
      this.dataChartConfig = customComponent.data_chart_config
      this.id = customComponent.id
    }
  },
  methods: {
    // 回到图表列表页
    goHome() {
      this.$router.push({ path: '/list' })
    },
    //左右拖动布局
    dragControllerDiv: function() {
      var that = this;
      var resizer = $("#signup_horiResizer")[0];
      resizer.onmousedown = function(e) {
        that.isDragging = true;
        var startX = e.clientX;
        var originLeft = resizer.offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = function(e) {
          var endX = e.clientX;
          var moveLen = endX - startX;
          that.currentLeft = originLeft + moveLen;

          const maxLeft = document.documentElement.clientWidth - 450 - 50; //从最左边算起的最大宽度，减去编辑器的最小宽度，和一个50的冗余
          const minLeft = 700; //从最左边算起的最小宽度
          if (that.currentLeft > maxLeft) {
            that.currentLeft = maxLeft;
          }
          if (that.currentLeft < minLeft) {
            that.currentLeft = minLeft;
          }
          resizer.style.left = that.currentLeft + "px"; // 设置左侧区域的宽度
          $(".siderSignup2,.side_signup_material").css({
            width: that.currentLeft + "px"
          });
          $(".content_right").css({
            width: document.documentElement.clientWidth - that.currentLeft + "px"
          })
        };
        // 鼠标松开事件
        document.onmouseup = function(evt) {
          document.onmousemove = null;
          document.onmouseup = null;
          resizer.releaseCapture && resizer.releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          that.isDragging = false;
          that.resizeChart();
        };
        resizer.setCapture && resizer.setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false;
      };
    },
    // 图表大小渲染容器大小改变事件
    resizeChart() {
      let event = new CustomEvent('resizeChart')
      this.$refs.g2Chart.dispatchEvent(event)
    },
    // 获取图表渲染代码
    getChartCode() {
        this.$nextTick(() => {
            this.$refs.chartCode.innerText = `${this.$refs.g2Chart.outerHTML.replaceAll(/&quot;/ig, "\"").replaceAll(/\"\{/ig, "\'\{").replaceAll(/\}\"/ig, "\}\'")}
            <script src="http://192.168.9.52/yangwu/dengta-components/-/raw/master/lib/index.js" />`
        })
    },
    // 设置图表属性
    setDataChartType(type) {
      this.dataChartType = type
    },
    // 设置图表样式配置
    setDataChartConfig(config) {
        this.dataChartConfig = config
        this.getChartCode()
    },
    // 设置图表数据配置
    setDataApiConfig(config) {
      this.dataApiConfig = config
      this.getChartCode()
    },
    // 打开图表名称输入弹框
    openComponentMsgDialog() {
      this.$refs.componentMsgDialog.open()
    },
    // 新建 编辑图表
    submitConfig(value) {
      if (this.dataApiConfig && this.dataChartType) {
        if (this.id !== null) {
          // 编辑
          this.API.chartUpdate({
            id: this.id,
            chartType: this.dataChartType,
            dataApiConfig: this.dataApiConfig,
            dataChartConfig: this.dataChartConfig,
            chartName: value.chartName || '',
            chartDesc: value.chartDesc || '',
          }).then(() => {
            this.$message.success('保存配置成功')
            this.$router.push({ path: '/list' })
          }).catch((error) => {
            this.$message.error(`保存配置失败${error}`)
          })
        } else {
          // 新增
          this.API.chartAdd({
            chartType: this.dataChartType,
            dataApiConfig: this.dataApiConfig,
            dataChartConfig: this.dataChartConfig,
            chartName: value.chartName || '',
            chartDesc: value.chartDesc || '',
          }).then(() => {
            this.$message.success('保存配置成功')
            this.$router.push({ path: '/list' })
          }).catch((error) => {
            this.$message.error(`保存配置失败${error}`)
          })
        }
      } else {
        this.$message.info('请配置图表')
      }
    }
  },
  mounted() {
    //左右拖动布局
    this.dragControllerDiv();
  }
};
</script>

<style lang="less" scoped>
.custom_component {
    width: 100%;
    height: 100%;
    background-color: #EDF0F5;
    .backHome {
        height: 88px;
        background: #FFFFFF;
        border-radius: 6px 6px 6px 6px;
        display: flex;
        align-items: center;
        > button {
            width: 140px;
            background: #3BD5B3;
            box-shadow: 0px 3px 6px 1px #D8DFEB;
            border-radius: 6px 6px 6px 6px;
            color: #fff;
            margin-left: 24px;
            &:hover {
                background-color: #20C6A1;
            }
            &:active {
                border-color: #20C6A1;
            }
        }
    }
}
.custom_component_main {
  width: 100%;
  height: calc(100% - 88px);
  overflow: hidden;
}
.content {
    height: 100%;
    display: flex;
    flex-basis: auto;
    flex-direction: row;
    align-items: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
}



.siderSignup {
    flex-shrink: 0;
    box-sizing: border-box;
    position: relative;
    transition: all .3s;
}

.siderSignup2 {
    width: 1060px;
    height: 100%;
    z-index: 30;
}

.is_dragging .siderSignup,
.is_dragging .side_signup_material,
.is_dragging .hori_resizer {
    transition: none;
}
.side_signup_material {
    height: 100%;
}

.hori_resizer {
    position: fixed;
    z-index: 888;
    left: 1060px;
    top: 148px;
    bottom: 0;
    display: block;
    &::after {
        background: #3BD5B3;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transition: background 0.2s ease-in-out 0s;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        height: 200px;
        width: 4px;
    }
    &::before {
        content: "";
        position: absolute;
        transition: border-color 0.2s ease-in-out 0s;
        border-right: 1px solid transparent;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
    }
    &:hover::before {
        border-color: #3BD5B3;
    }
    &:hover::after {
        background: #20C6A1;
    }
    cursor: col-resize;
}

// .hori_resizer.is_fullScreen{ width: 0; border: 0px;}
.hori_resizer img {
    top: 50%;
    right: -20px;
    position: absolute;
    cursor: pointer;
}

.iframe_layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    z-index: 88;
}
.content_left {
    width: 100%;
    height: 100%;
    padding: 8px 12px 0 12px;
    box-sizing: border-box;
}
.content_right {
    width: calc(100% - 1060px);
    height: 100%;
    padding: 8px 12px 0 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .chart_container {
        width: 100%;
        overflow: hidden;
        height: 50%;
        background: #fff;
    }
    .chart_message {
        flex: 1;
        display: flex;
        flex-direction: column;
        /deep/ .el-radio-group {
          margin: 12px 0;
          .el-radio-button {
              margin-right: 12px;
              &:last-child {
                  margin-right: 0;
              }
              .el-radio-button__inner {
                background: #FFFFFF;
                border-radius: 4px 4px 4px 4px;
                border: 1px solid #F2F2F8;
                color: #252525;
                &:hover {
                  color: #3BD5B3;
                }
              }
          }
          .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            background: #DFE0E8;
            box-shadow: unset;
          }
        }
        > div:not(:first-child) {
            flex: 1;
            background-color: #fff;
            padding: 24px;
            box-sizing: border-box;
            word-break: break-all;
            word-wrap: break-word;
            .el-empty {
              padding: 0;
            }
        }
    }
    > button {
        width: 100%;
        background: #3BD5B3;
        box-shadow: 0px 3px 6px 1px #D8DFEB;
        border-radius: 6px 6px 6px 6px;
        color: #fff;
        margin-top: 32px;
        &:hover {
            background-color: #20C6A1;
        }
        &:active {
            border-color: #20C6A1;
        }
    }
}
</style>
