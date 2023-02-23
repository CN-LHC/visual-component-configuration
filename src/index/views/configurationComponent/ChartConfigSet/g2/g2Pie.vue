/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-22 14:12:40
 * 扇形图、环形图、玫瑰图
 */
<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="数据绑定" name="basic_data">
            <div class="scaleName">
                <h3>label</h3>
                <el-select v-model="defaultConfig.name" placeholder="请选择" size="small">
                    <el-option
                        v-for="key in selectKey"
                        :key="key"
                        :label="key"
                        :value="key">
                    </el-option>
                </el-select>
            </div>
            <div class="scaleName">
                <h3>value</h3>
                <el-select v-model="defaultConfig.value" placeholder="请选择" size="small">
                    <el-option
                        v-for="key in selectKey"
                        :key="key"
                        :label="key"
                        :value="key">
                    </el-option>
                </el-select>
            </div>
        </el-collapse-item>
        <el-collapse-item title="标题" name="title">
            <div class="config_box">
                <div class="scaleName">
                    <h3>标题名称</h3>
                    <el-input v-model="defaultConfig.title.name" size="small" />
                </div>
                <div class="scaleName">
                    <h3>标题字体大小</h3>
                    <el-input-number v-model="defaultConfig.title.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>标题字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.title.fontColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>左边距</h3>
                    <el-input-number v-model="defaultConfig.title.marginLeft" size="small" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>标题位置</h3>
                    <el-radio-group v-model="defaultConfig.title.textAlign" size="small">
                        <el-radio-button label="left">左</el-radio-button>
                        <el-radio-button label="center">居中</el-radio-button>
                        <el-radio-button label="right">右</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName">
                    <h3>标题显示</h3>
                    <el-switch v-model="defaultConfig.title.isShow"  size="small"></el-switch>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="基础属性配置" name="basics">
            <div class="scaleName">
                <h3>坐标系</h3>
                <el-radio-group v-model="defaultConfig.coordinate.type" size="small">
                    <el-radio-button label="polar">极坐标</el-radio-button>
                    <el-radio-button label="theta">定半径长极坐标</el-radio-button>
                </el-radio-group>
            </div>
            <div class="scaleName">
                <h3>弧度</h3>
                <el-input-number v-model="defaultConfig.coordinate.angleNum" size="small" :min="3" :max="6"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>外半径</h3>
                <el-input-number v-model="defaultConfig.coordinate.radius" size="small" :precision="2" :step="0.05" :min="0" :max="1"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>内半径</h3>
                <el-input-number v-model="defaultConfig.coordinate.innerRadius" size="small" :precision="2" :step="0.05" :min="0" :max="1"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>间距</h3>
                <el-input-number v-model="defaultConfig.style.lineWidth" size="small" :min="0"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>间距色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.style.stroke"
                ></el-color-picker>
            </div>
            <div class="scaleName">
                <h3>数量</h3>
                <el-input-number v-model="defaultConfig.totalLength" size="small" :min="0"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>背景色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.backgroundColor"
                ></el-color-picker>
            </div>
        </el-collapse-item>
        <el-collapse-item title="图例配置" name="legend">
            <div class="config_box">
                <div class="scaleName">
                    <h3>是否显示图例</h3>
                    <el-switch v-model="defaultConfig.legend.isShow" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>布局方式</h3>
                    <el-radio-group v-model="defaultConfig.legend.layout">
                        <el-radio-button label="horizontal">横向布局</el-radio-button>
                        <el-radio-button label="vertical">纵向布局</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName">
                    <h3>位置</h3>
                    <el-select v-model="defaultConfig.legend.position" placeholder="请选择">
                        <el-option label="上" value="top"></el-option>
                        <el-option label="上-左" value="top-left"></el-option>
                        <el-option label="上-右" value="top-right"></el-option>
                        <el-option label="右" value="right"></el-option>
                        <el-option label="右-上" value="right-top"></el-option>
                        <el-option label="右-下" value="right-bottom"></el-option>
                        <el-option label="左" value="left"></el-option>
                        <el-option label="左-上" value="left-top"></el-option>
                        <el-option label="左-下" value="left-bottom"></el-option>
                        <el-option label="下" value="bottom"></el-option>
                        <el-option label="下-左" value="bottom-left"></el-option>
                        <el-option label="下-右" value="bottom-right"></el-option>
                    </el-select>
                </div>
                <div class="scaleName">
                    <h3>图例高度</h3>
                    <el-input-number v-model="defaultConfig.legend.itemHeight" size="small" :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>图例宽度</h3>
                    <el-input-number v-model="defaultConfig.legend.itemWidth" size="small" :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>图例文字大小</h3>
                    <el-input-number v-model="defaultConfig.legend.itemName.style.fontSize" size="small" :min="12"></el-input-number>
                </div>
                <div class="scaleName" v-show="defaultConfig.legend.layout === 'horizontal'">
                    <h3>图例间距</h3>
                    <el-input-number v-model="defaultConfig.legend.itemSpacing" size="small" :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>x方向偏移</h3>
                    <el-input-number v-model="defaultConfig.legend.offsetX" size="small"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>y方向偏移</h3>
                    <el-input-number v-model="defaultConfig.legend.offsetY" size="small"></el-input-number>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="提示配置" name="tooltip">
            <div class="config_box">
                <div class="scaleName">
                    <h3>是否显示提示</h3>
                    <el-switch v-model="defaultConfig.tooltip.isShow" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>是否显示提示头</h3>
                    <el-switch v-model="defaultConfig.tooltip.showTitle" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>是否显示提示标记</h3>
                    <el-switch v-model="defaultConfig.tooltip.showMarkers" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>提示位置</h3>
                    <el-radio-group v-model="defaultConfig.tooltip.position">
                        <el-radio-button label="top">上</el-radio-button>
                        <el-radio-button label="right">右</el-radio-button>
                        <el-radio-button label="bottom">下</el-radio-button>
                        <el-radio-button label="left">左</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="label配置" name="label">
            <div class="config_box">
                <div class="scaleName">
                    <h3>是否显示label</h3>
                    <el-switch v-model="defaultConfig.label.isShow"  size="small"></el-switch>
                </div>
                 <div class="scaleName">
                    <h3>label类型</h3>
                    <el-radio-group v-model="defaultConfig.label.layoutType" size="small">
                        <el-radio-button label="limit-in-plot">limit-in-plot</el-radio-button>
                        <el-radio-button label="pie-spider">pie-spider</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName">
                    <h3>label偏移</h3>
                    <el-input-number v-model="defaultConfig.label.offset" size="small"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>label高度</h3>
                    <el-input-number v-model="defaultConfig.label.labelHeight" size="small" :min="12"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>单位</h3>
                    <el-input v-model="defaultConfig.label.suffix" size="small" />
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="标注" name="annotation">
            <div class="config_box">
                <div class="scaleName">
                    <h3>是否显示标注</h3>
                    <el-switch v-model="defaultConfig.annotation.isShow"  size="small"></el-switch>
                </div>
                <div class="scaleName">
                    <h3>标注文本</h3>
                    <el-input v-model="defaultConfig.annotation.text" size="small" />
                </div>
                <div class="scaleName">
                    <h3>标题字体大小</h3>
                    <el-input-number v-model="defaultConfig.annotation.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>标题字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.annotation.fontColor"
                    ></el-color-picker>
                </div>
            </div>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
import { mixin } from "../mixin"
  export default {
    mixins: [mixin],
    data() {
      return {
        activeNames: ['title'],
        defaultConfig: {
            value: '',
            name: '',
            title: {
                fontSize: 14,
                fontColor: '',
                isShow: true,
                marginLeft: 0,
                textAlign: 'left',
                name: '',
            },
            backgroundColor: '#ffffff',
            coordinate: {
                type: 'theta', // polar theta
                angleNum: 6, // 默认绘制整圆 min=3 max=6
                radius: 0.8, // 控制外半径 min=0 max=1
                innerRadius: 0, // 控制内半径 min=0 max=1
            },
            style: {
                lineWidth: 0,
                stroke: '#fff'
            },
            totalLength: 5,
            label: {
                isShow: false,
                offset: 30,
                layoutType: 'limit-in-plot', // 取值 pie-spider limit-in-plot
                labelHeight: 20,
                fontSize: 14,
                suffix: '', // 单位
            },
            tooltip: {
                isShow: true,
                showTitle: false,
                showMarkers: false,
                position: 'right',
            },
            legend: {
                isShow: true,
                layout: 'horizontal', // horizontal|横 vertical|竖
                position: 'bottom', // "top" | "top-left" | "top-right" | "right" | "right-top" | "right-bottom" | "left" | "left-top" | "left-bottom" | "bottom" | "bottom-left" | "bottom-right" optional
                itemHeight: 0, // 图例高度
                itemWidth: 0, // 图例宽度
                itemName: {
                    style: {
                        fontSize: 14,
                    }
                },
                itemSpacing: 0, // 图例项水平方向的间距
                offsetY: 0, // 图例 y 方向的偏移。
                offsetX: 0, // 图例 x 方向的偏移。
            },
            annotation: {
                isShow: false,
                text: '',
                fontSize: '',
                fontColor: '',
            },
        },
      };
    },
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>