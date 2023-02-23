/*
 * @Author: liuhanchuan 
 * @Date: 2023-02-02 14:47:02 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-22 14:13:56
 * 雷达图
 */

<template>
    <el-collapse v-model="activeNames">
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
                    <el-radio-group v-model="defaultConfig.title.textAlign">
                        <el-radio-button label="left">左</el-radio-button>
                        <el-radio-button label="center">居中</el-radio-button>
                        <el-radio-button label="right">右</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName">
                    <h3>标题显示</h3>
                    <el-switch v-model="defaultConfig.title.isShow" ></el-switch>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="基础属性配置" name="basics">
            <div class="config_box">
                <div class="scaleName">
                    <h3>开始角度</h3>
                    <el-input-number v-model="defaultConfig.coordinate.startAngle" size="small" :precision="1" :step="0.5" :min="1" :max="3"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>结束角度</h3>
                    <el-input-number v-model="defaultConfig.coordinate.endAngle" size="small" :precision="1" :step="0.5" :min="3" :max="5"></el-input-number>
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
                    <h3>数量</h3>
                    <el-input-number v-model="defaultConfig.totalLength" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>背景色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.backgroundColor"
                    ></el-color-picker>
                </div>
                <el-collapse-item title="圆点显示" name="point">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>是否显示圆点</h3>
                            <el-switch v-model="defaultConfig.point.isShow" ></el-switch>
                        </div>
                        <div class="scaleName">
                            <h3>圆点大小</h3>
                            <el-input-number v-model="defaultConfig.point.size" size="small" :min="0"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>圆点边框宽度</h3>
                            <el-input-number v-model="defaultConfig.point.style.lineWidth" size="small" :min="0"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>圆点边框颜色</h3>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.point.style.stroke"
                            ></el-color-picker>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="折线显示" name="line">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>是否显示折线</h3>
                            <el-switch v-model="defaultConfig.line.isShow" ></el-switch>
                        </div>
                        <div class="scaleName">
                            <h3>折线大小</h3>
                            <el-input-number v-model="defaultConfig.line.size" size="small" :min="0"></el-input-number>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="区域显示" name="area">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>是否显示区域</h3>
                            <el-switch v-model="defaultConfig.area.isShow" ></el-switch>
                        </div>
                    </div>
                </el-collapse-item>
            </div>
        </el-collapse-item>
        <el-collapse-item title="提示配置" name="tooltip">
            <div class="scaleName">
                <h3>是否显示提示</h3>
                <el-switch v-model="defaultConfig.tooltip.isShow" ></el-switch>
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
            <div class="scaleName">
                <h3>是否显示辅助线</h3>
                <el-switch v-model="defaultConfig.tooltip.showCrosshairs" ></el-switch>
            </div>
            <div class="scaleName">
                <h3>是否显示标记</h3>
                <el-switch v-model="defaultConfig.tooltip.showMarkers" ></el-switch>
            </div>
            <div class="scaleName">
                <h3>是否合并显示标记</h3>
                <el-switch v-model="defaultConfig.tooltip.shared" ></el-switch>
            </div>
            <div class="scaleName">
                <h3>辅助线位置</h3>
                <el-radio-group v-model="defaultConfig.tooltip.crosshairs.type">
                    <el-radio-button label="x">x</el-radio-button>
                    <el-radio-button label="y">y</el-radio-button>
                    <el-radio-button label="xy">xy</el-radio-button>
                </el-radio-group>
            </div>
            <div class="scaleName">
                <h3>辅助线颜色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.tooltip.crosshairs.line.style.stroke"
                ></el-color-picker>
            </div>
            <div class="scaleName">
                <h3>辅助线虚线设置</h3>
                <el-input-number v-model="defaultConfig.tooltip.crosshairs.line.style.lineDash[0]" size="small" :min="0"></el-input-number>
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
                <div class="scaleName">
                    <h3>是否自定义图例</h3>
                    <el-switch v-model="defaultConfig.legend.custom" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>自定义图例</h3>
                    <div class="config_box" v-for="(item, index) in defaultConfig.legend.items" :key="index">
                        <div class="scaleName">
                            <h3>图例名称</h3>
                            <el-input v-model="item.name" size="small" />
                        </div>
                        <div class="scaleName">
                            <h3>图例数据绑定</h3>
                            <el-select v-model="item.value" placeholder="请选择">
                                <el-option
                                    v-for="key in selectKey"
                                    :key="key"
                                    :label="key"
                                    :value="key">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="scaleName">
                            <h3>图例图标</h3>
                            <el-select v-model="item.marker.symbol" placeholder="请选择">
                                <el-option label="圆" value="circle"></el-option>
                                <el-option label="方块" value="square"></el-option>
                                <el-option label="菱形" value="diamond"></el-option>
                                <el-option label="三角向上" value="triangle"></el-option>
                                <el-option label="三角向下" value="triangle-down"></el-option>
                            </el-select>
                        </div>
                        <div class="scaleName">
                            <h3>图例颜色</h3>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="item.marker.style.fill"
                            ></el-color-picker>
                        </div>
                    </div>
                    <el-button icon="el-icon-plus" size="small" @click="addLegendItem"></el-button>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="名称设置" name="nameSet">
            <div class="config_box">
                <div class="scaleName">
                    <h3>数据绑定</h3>
                    <el-select v-model="defaultConfig.nameSet.bindName" placeholder="请选择">
                        <el-option
                            v-for="key in selectKey"
                            :key="key"
                            :label="key"
                            :value="key">
                        </el-option>
                    </el-select>
                </div>
                <el-collapse-item title="scale" name="nameScale">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>刻度数</h3>
                            <el-input-number v-model="defaultConfig.nameSet.scale.tickCount" size="small" :min="0" label="描述文字"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>单位</h3>
                            <el-input v-model="defaultConfig.nameSet.scale.suffix" size="small" />
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="axis" name="nameAxis">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>文字大小</h3>
                            <el-input-number v-model="defaultConfig.nameSet.axis.label.fontSize" size="small" :min="0" label="描述文字"></el-input-number>
                        </div>
                    </div>
                </el-collapse-item>
            </div>
        </el-collapse-item>
        <el-collapse-item title="值设置" name="valueSet">
            <div class="config_box">
                <div class="scaleName">
                    <h3>数据绑定</h3>
                    <div class="config_box">
                        <div v-for="(item, index) in defaultConfig.valueSet.values" :key="index">
                            <div class="config_box_item">
                                <div class="scaleName" >
                                    <h3>值{{ index + 1 }}</h3>
                                    <el-select v-model="item.bindName" placeholder="请选择">
                                        <el-option
                                            v-for="key in selectKey"
                                            :key="key"
                                            :label="key"
                                            :value="key">
                                        </el-option>
                                    </el-select>
                                </div>
                                <span class="del_btn" @click="delValue(index)" v-show="defaultConfig.valueSet.values.length > 1">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </div>
                            <div class="scaleName">
                                <h3>颜色</h3>
                                <el-color-picker
                                    size="small"
                                    show-alpha
                                    v-model="item.color"
                                ></el-color-picker>
                            </div>
                        </div>
                        <el-button icon="el-icon-plus" size="small" @click="addValue"></el-button>
                    </div>
                </div>
                <el-collapse-item title="scale" name="valueScale">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>渲染范围</h3>
                            <el-slider
                                v-model="defaultConfig.valueSet.scale.range"
                                range
                                :min="0"
                                :max="1"
                                :step="0.01"
                                :marks="marks"
                            >
                            </el-slider>
                        </div>
                        <div class="scaleName">
                            <h3>单位</h3>
                            <el-input v-model="defaultConfig.valueSet.scale.suffix" size="small" />
                        </div>
                        <div class="scaleName">
                            <h3>刻度数</h3>
                            <el-input-number v-model="defaultConfig.valueSet.scale.tickCount" size="small" :min="0" label="描述文字"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>最小值</h3>
                            <el-input-number v-model="defaultConfig.valueSet.scale.min" size="small" label="描述文字"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>最大值</h3>
                            <el-input-number v-model="defaultConfig.valueSet.scale.max" size="small" label="描述文字"></el-input-number>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="axis" name="valueAxis">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>文字大小</h3>
                            <el-input-number v-model="defaultConfig.valueSet.axis.label.fontSize" size="small" :min="0" label="描述文字"></el-input-number>
                        </div>
                    </div>
                </el-collapse-item>
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
            title: {
                isShow: true,
                name: '',
                fontColor: '#000',
                fontSize: 14,
                marginLeft: 0,
                textAlign: 'left'
            },
            totalLength: 20,
            backgroundColor: '',
            coordinate: {
                startAngle: 1,
                endAngle: 3,
                radius: 0.8, // 控制外半径 min=0 max=1
                innerRadius: 0, // 控制内半径 min=0 max=1
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
                custom: false, // 自定义legend
                items: []
            },
            tooltip: {
                isShow: true,
                showCrosshairs: false,
                showMarkers: false,
                shared: false,
                position: 'right', // top right bottom left
                crosshairs: {
                    type: 'x', // x y xy
                    line: {
                        style: {
                            stroke: '#000', // 辅助线颜色
                            lineDash: [0], // 控制实线虚线
                        }
                    },
                },
            },
            line: {
                isShow: true,
                size: 2,
            },
            point: {
                isShow: true,
                size: 3,
                style: {
                    stroke: '#fff',
                    lineWidth: 1,
                }
            },
            area: {
                isShow: true,
            },
            valueSet: {
                values: [
                    {
                        bindName: '',
                        color: '',
                    },
                ],
                scale: {
                    range: [0, 1],
                    tickCount: 4,
                    suffix: '',
                    min: undefined,
                    max: undefined,
                },
                axis: {
                    label: {
                        fontSize: 14,
                    },
                },
            },
            nameSet: {
                bindName: '',
                scale: {
                    tickCount: 10,
                    suffix: '',
                },
                axis: {
                    label: {
                        fontSize: 14,
                    },
                },
            }
        },
        marks: {
            0.2: '0.2',
            0.5: '0.5',
            0.8: '0.8'
        },
      };
    },
    methods: {
        addValue() {
            this.defaultConfig.valueSet.values.push({
                bindName: '',
                color: ''
            })
        },
        delValue(index) {
            this.defaultConfig.valueSet.values.splice(index, 1)
        },
        addLegendItem() {
            this.defaultConfig.legend.items.push({
                name: '',
                value: '',
                marker: {
                    symbol: 'circle',
                    style: {
                        fill: '#000',
                    },
                },
            })
        },
    }
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>