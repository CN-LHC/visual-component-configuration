/*
 * @Author: liuhanchuan 
 * @Date: 2023-02-02 14:44:34 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-22 14:03:51
 * 柱状图：可配置单柱状图、堆叠柱状图、多柱状图
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
                    <el-input-number v-model="defaultConfig.title.marginLeft" size="small" :min="0" label="描述文字"></el-input-number>
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
                    <h3>上边距</h3>
                    <el-input-number v-model="defaultConfig.marginTop" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>右边距</h3>
                    <el-input-number v-model="defaultConfig.marginRight" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>下边距</h3>
                    <el-input-number v-model="defaultConfig.marginBottom" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>左边距</h3>
                    <el-input-number v-model="defaultConfig.marginLeft" size="small" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>堆叠类型</h3>
                    <el-radio-group v-model="defaultConfig.type">
                        <el-radio-button label="dodge">横向</el-radio-button>
                        <el-radio-button label="stack">纵向</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName" v-show="defaultConfig.type ===  'dodge'">
                    <h3>分组间距</h3>
                    <el-slider
                        v-model="defaultConfig.marginRatio"
                        :min="0"
                        :max="1"
                        :step="0.1"
                    >
                    </el-slider>
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
            </div>
        </el-collapse-item>
        <el-collapse-item title="提示配置" name="tooltip">
            <div class="config_box">
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
                        <el-radio-button label="x">x轴</el-radio-button>
                        <el-radio-button label="y">y轴</el-radio-button>
                        <el-radio-button label="xy">xy轴</el-radio-button>
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
                            <h3>name</h3>
                            <el-input v-model="item.name" size="small" />
                        </div>
                        <div class="scaleName">
                            <h3>value</h3>
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
                            <h3>marker</h3>
                            <el-select v-model="item.marker.symbol" placeholder="请选择">
                                <el-option label="圆" value="circle"></el-option>
                                <el-option label="方块" value="square"></el-option>
                                <el-option label="菱形" value="diamond"></el-option>
                                <el-option label="三角向上" value="triangle"></el-option>
                                <el-option label="三角向下" value="triangle-down"></el-option>
                            </el-select>
                        </div>
                        <div class="scaleName">
                            <h3>marker颜色</h3>
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
        <el-collapse-item title="数据标签配置" :name="`y_label`">
            <div class="config_box">
                <div class="scaleName">
                    <h3>数据标签显示</h3>
                    <el-switch v-model="defaultConfig.label.isShow" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>数据标签大小</h3>
                    <el-input-number v-model="defaultConfig.label.style.fontSize" size="small" :min="12"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>数据标签颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.label.style.fill"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>数据标签文本基线</h3>
                    <el-radio-group v-model="defaultConfig.label.style.textBaseline">
                        <el-radio-button label="top">top</el-radio-button>
                        <el-radio-button label="middle">middle</el-radio-button>
                        <el-radio-button label="alphabetic">alphabetic</el-radio-button>
                        <el-radio-button label="bottom">bottom</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="x轴配置" name="x">
            <div class="config_box">
                <div class="scaleName">
                    <h3>数据绑定</h3>
                    <el-select v-model="defaultConfig.xBindData" placeholder="请选择">
                        <el-option
                            v-for="key in selectKey"
                            :key="key"
                            :label="key"
                            :value="key">
                        </el-option>
                    </el-select>
                </div>
                <el-collapse-item title="scale配置" name="x_scale">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>渲染范围</h3>
                            <el-slider
                                v-model="defaultConfig.xScale.range"
                                range
                                :min="0"
                                :max="1"
                                :step="0.01"
                                :marks="marks"
                            >
                            </el-slider>
                        </div>
                        <!-- <div class="scaleName">
                            <h3>单位</h3>
                            <el-input v-model="defaultConfig.xScale.suffix" size="small" />
                        </div> -->
                        <div class="scaleName">
                            <h3>刻度数</h3>
                            <el-input-number v-model="defaultConfig.xScale.tickCount" size="small" :min="0" label="描述文字"></el-input-number>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="axis配置" name="x_axis">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>是否显示</h3>
                            <el-switch v-model="defaultConfig.xAxis.isShow" ></el-switch>
                        </div>
                        <div class="scaleName">
                            <h3>轴线位置</h3>
                            <el-radio-group v-model="defaultConfig.xAxis.position">
                                <el-radio-button label="top">top</el-radio-button>
                                <el-radio-button label="right">right</el-radio-button>
                                <el-radio-button label="bottom">bottom</el-radio-button>
                                <el-radio-button label="left">left</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="scaleName">
                            <h3>轴线颜色</h3>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.xAxis.line.style.stroke"
                            ></el-color-picker>
                        </div>
                            <div class="scaleName">
                            <h3>轴线宽度</h3>
                            <el-input-number v-model="defaultConfig.xAxis.line.style.lineWidth" size="small" :min="0"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>轴线位置</h3>
                            <el-radio-group v-model="defaultConfig.xAxis.verticalFactor">
                                <el-radio-button :label="1">内</el-radio-button>
                                <el-radio-button :label="-1">外</el-radio-button>
                            </el-radio-group>
                        </div>
                        <el-collapse-item title="刻度配置" name="x_axis_tickLine">
                            <div class="config_box">
                                <div class="scaleName">
                                    <h3>刻度颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.xAxis.tickLine.style.stroke"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>刻度宽度</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.tickLine.style.lineWidth" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>刻度长度</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.tickLine.length" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>是否和刻度线对齐</h3>
                                    <el-switch v-model="defaultConfig.xAxis.tickLine.alignTick" ></el-switch>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="标题配置" name="x_axis_title">
                            <div class="config_box">
                                <div class="scaleName">
                                    <h3>轴标题</h3>
                                    <el-input v-model="defaultConfig.xAxis.title.text" size="small" />
                                </div>
                                <div class="scaleName">
                                    <h3>标题描述</h3>
                                    <el-input v-model="defaultConfig.xAxis.title.description" size="small" />
                                </div>
                                <div class="scaleName">
                                    <h3>标题位置</h3>
                                    <el-radio-group v-model="defaultConfig.xAxis.title.position">
                                        <el-radio-button label="start">轴始</el-radio-button>
                                        <el-radio-button label="center">轴中</el-radio-button>
                                        <el-radio-button label="end">轴尾</el-radio-button>
                                    </el-radio-group>
                                </div>
                                    <div class="scaleName">
                                    <h3>标题偏移</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.title.offset" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标题自动旋转</h3>
                                    <el-switch v-model="defaultConfig.xAxis.title.autoRotate" ></el-switch>
                                </div>
                                <div class="scaleName">
                                    <h3>标题大小</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.title.style.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标题颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.xAxis.title.style.fill"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>标题粗细</h3>
                                    <el-radio-group v-model="defaultConfig.xAxis.title.style.fontWeight">
                                        <el-radio-button label="normal">默认</el-radio-button>
                                        <el-radio-button label="bold">加粗</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="标签配置" name="x_axis_label">
                            <div class="config_box">
                                <div class="scaleName">
                                    <h3>标签大小</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.label.style.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标签颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.xAxis.label.style.fill"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>标签偏移</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.label.offset" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标签旋转角度</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.label.rotate" size="small" :min="0" :max="360"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>是否自动旋转</h3>
                                    <el-switch v-model="defaultConfig.xAxis.label.autoRotate" ></el-switch>
                                </div>
                                <div class="scaleName">
                                    <h3>是否自动隐藏</h3>
                                    <el-switch v-model="defaultConfig.xAxis.label.autoHide" ></el-switch>
                                </div>
                                <div class="scaleName">
                                    <h3>是否自动省略</h3>
                                    <el-switch v-model="defaultConfig.xAxis.label.autoEllipsis" ></el-switch>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="网格配置" name="x_axis_grid">
                            <div class="config_box">
                                <!-- <div class="scaleName">
                                    <h3>网格类型</h3>
                                    <el-radio-group v-model="defaultConfig.xAxis.grid.line.type">
                                        <el-radio-button label="line">line</el-radio-button>
                                        <el-radio-button label="circle">circle</el-radio-button>
                                    </el-radio-group>
                                </div> -->
                                <div class="scaleName">
                                    <h3>网格粗细</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.grid.line.style.lineWidth" size="small" :min="0" label="描述文字"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>网格颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.xAxis.grid.line.style.stroke"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>网格虚线设置</h3>
                                    <el-input-number v-model="defaultConfig.xAxis.grid.line.style.lineDash[0]" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>栅格线间填充色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.xAxis.grid.line.alternateColor"
                                    ></el-color-picker>
                                </div>
                            </div>
                        </el-collapse-item>
                    </div>
                </el-collapse-item>
             </div> 
        </el-collapse-item>
        <el-collapse-item title="y轴配置" name="y">
            <div class="config_box">
                <div class="scaleName">
                    <h3>数据绑定</h3>
                    <div class="config_box">
                        <div class="chart_margin" v-for="(item, index) in defaultConfig.yBindData" :key="index">
                            <div class="config_box_item">
                                <div class="scaleName" >
                                    <h3>值{{ index + 1 }}</h3>
                                    <el-select v-model="item.value" placeholder="请选择">
                                        <el-option
                                            v-for="key in selectKey"
                                            :key="key"
                                            :label="key"
                                            :value="key">
                                        </el-option>
                                    </el-select>
                                </div>
                                <span class="del_btn" @click="delYValue(index)" v-show="defaultConfig.yBindData.length > 1">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </div>
                            <div class="scaleName">
                                <h3>颜色</h3>
                                <el-color-picker
                                    size="small"
                                    show-alpha
                                    v-model="item.barColor"
                                ></el-color-picker>
                            </div>
                        </div>
                        <el-button icon="el-icon-plus" size="small" @click="addYValue"></el-button>
                    </div>
                </div>
                <el-collapse-item title="scale配置" name="y_scale">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>渲染范围</h3>
                            <el-slider
                                v-model="defaultConfig.yScale.range"
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
                            <el-input v-model="defaultConfig.yScale.suffix" size="small" />
                        </div>
                        <div class="scaleName">
                            <h3>刻度数</h3>
                            <el-input-number v-model="defaultConfig.yScale.tickCount" size="small" :min="0" label="描述文字"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>最小值</h3>
                            <el-input-number v-model="defaultConfig.yScale.min" size="small" label="描述文字"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>最大值</h3>
                            <el-input-number v-model="defaultConfig.yScale.max" size="small" label="描述文字"></el-input-number>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="axis配置" name="y_axis">
                    <div class="config_box">
                        <div class="scaleName">
                            <h3>是否显示</h3>
                            <el-switch v-model="defaultConfig.yAxis.isShow" ></el-switch>
                        </div>
                        <div class="scaleName">
                            <h3>轴线位置</h3>
                            <el-radio-group v-model="defaultConfig.yAxis.position">
                                <el-radio-button label="top">top</el-radio-button>
                                <el-radio-button label="right">right</el-radio-button>
                                <el-radio-button label="bottom">bottom</el-radio-button>
                                <el-radio-button label="left">left</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="scaleName">
                            <h3>轴线颜色</h3>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.yAxis.line.style.stroke"
                            ></el-color-picker>
                        </div>
                            <div class="scaleName">
                            <h3>轴线宽度</h3>
                            <el-input-number v-model="defaultConfig.yAxis.line.style.lineWidth" size="small" :min="0"></el-input-number>
                        </div>
                        <div class="scaleName">
                            <h3>轴线位置</h3>
                            <el-radio-group v-model="defaultConfig.yAxis.verticalFactor">
                                <el-radio-button :label="1">内</el-radio-button>
                                <el-radio-button :label="-1">外</el-radio-button>
                            </el-radio-group>
                        </div>
                        <el-collapse-item title="刻度配置" name="y_axis_tickLine">
                            <div class="config_box">
                                <div class="scaleName">
                                    <h3>刻度颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.yAxis.tickLine.style.stroke"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>刻度宽度</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.tickLine.style.lineWidth" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>刻度长度</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.tickLine.length" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>是否和刻度线对齐</h3>
                                    <el-switch v-model="defaultConfig.yAxis.tickLine.alignTick" ></el-switch>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="标题配置" name="y_axis_title">
                            <div class="config_box">
                                <div class="scaleName">
                                    <h3>轴标题</h3>
                                    <el-input v-model="defaultConfig.yAxis.title.text" size="small" />
                                </div>
                                <div class="scaleName">
                                    <h3>标题描述</h3>
                                    <el-input v-model="defaultConfig.yAxis.title.description" size="small" />
                                </div>
                                <div class="scaleName">
                                    <h3>标题位置</h3>
                                    <el-radio-group v-model="defaultConfig.yAxis.title.position">
                                        <el-radio-button label="start">轴始</el-radio-button>
                                        <el-radio-button label="center">轴中</el-radio-button>
                                        <el-radio-button label="end">轴尾</el-radio-button>
                                    </el-radio-group>
                                </div>
                                    <div class="scaleName">
                                    <h3>标题偏移</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.title.offset" size="small"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标题自动旋转</h3>
                                    <el-switch v-model="defaultConfig.yAxis.title.autoRotate" ></el-switch>
                                </div>
                                <div class="scaleName">
                                    <h3>标题大小</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.title.style.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标题颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.yAxis.title.style.fill"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>标题粗细</h3>
                                    <el-radio-group v-model="defaultConfig.yAxis.title.style.fontWeight">
                                        <el-radio-button label="normal">默认</el-radio-button>
                                        <el-radio-button label="bold">加粗</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="标签配置" name="y_axis_label">
                            <div class="config_box">
                                <div class="scaleName">
                                    <h3>标签大小</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.label.style.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标签颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.yAxis.label.style.fill"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>标签偏移</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.label.offset" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>标签旋转角度</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.label.rotate" size="small" :min="0" :max="360"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>是否自动旋转</h3>
                                    <el-switch v-model="defaultConfig.yAxis.label.autoRotate" ></el-switch>
                                </div>
                                <div class="scaleName">
                                    <h3>是否自动隐藏</h3>
                                    <el-switch v-model="defaultConfig.yAxis.label.autoHide" ></el-switch>
                                </div>
                                <div class="scaleName">
                                    <h3>是否自动省略</h3>
                                    <el-switch v-model="defaultConfig.yAxis.label.autoEllipsis" ></el-switch>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="网格配置" name="y_axis_grid">
                            <div class="config_box">
                                <!-- <div class="scaleName">
                                    <h3>网格类型</h3>
                                    <el-radio-group v-model="defaultConfig.yAxis.grid.line.type">
                                        <el-radio-button label="line">line</el-radio-button>
                                        <el-radio-button label="circle">circle</el-radio-button>
                                    </el-radio-group>
                                </div> -->
                                <div class="scaleName">
                                    <h3>网格粗细</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.grid.line.style.lineWidth" size="small" :min="0" label="描述文字"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>网格颜色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.yAxis.grid.line.style.stroke"
                                    ></el-color-picker>
                                </div>
                                <div class="scaleName">
                                    <h3>网格虚线设置</h3>
                                    <el-input-number v-model="defaultConfig.yAxis.grid.line.style.lineDash[0]" size="small" :min="0"></el-input-number>
                                </div>
                                <div class="scaleName">
                                    <h3>栅格线间填充色</h3>
                                    <el-color-picker
                                        size="small"
                                        show-alpha
                                        v-model="defaultConfig.yAxis.grid.line.alternateColor"
                                    ></el-color-picker>
                                </div>
                            </div>
                        </el-collapse-item>
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
            marginLeft: 50,
            marginRight: 50,
            marginTop: 20,
            marginBottom: 30,
            type: 'dodge',
            marginRatio: 0,
            totalLength: 20,
            backgroundColor: '',
            xBindData: '',
            xScale: {
                range: [0, 1],
                tickCount: 2,
                // suffix: '',
            },
            xAxis: {
                isShow: true,
                position: 'bottom', // top right bottom left
                line: {
                    style: {
                        stroke: '#000', // 坐标线颜色
                        lineWidth: 1, // 坐标线宽度
                    }
                },
                tickLine: {
                    style: {
                        stroke: '#000', // 刻度颜色
                        lineWidth: 1, // 刻度宽度
                    },
                    alignTick: true, // 是否同刻度线对齐
                    length: 4, // 刻度长度
                },
                title: {
                    style: {
                        fontSize: 14,
                        fontWeight: 'normal',
                        fill: '#000', // 颜色
                    },
                    offset: null, // is number
                    text: '',
                    autoRotate: true, // 自动旋转
                    position: 'center', // 'start' | 'center' | 'end'
                    description: '', // 标题描述
                },
                label: {
                    style: {
                        fontSize: 14,
                        fill: '#000', // 颜色
                    },
                    offset: 8, // is number
                    rotate: null, // is number
                    autoRotate: true, // 是否自动旋转
                    autoHide: true, // 是否自动隐藏
                    autoEllipsis: true, // 是否自动省略
                },
                grid: {
                    line: {
                        type: 'line', // 'line' | 'circle' // 网格类型
                        style: {
                            stroke: '#000', // 网格颜色
                            lineWidth: 1, // 网格粗细
                            lineDash: [0], // 控制实线虚线
                        }
                    },
                    alternateColor: '', // 两个栅格线间的填充色
                },
                verticalFactor: -1, // 1|内 -1|外 // 标记坐标轴 label 的方向
            },
            yBindData: [{
                value: '',
                barColor: '',
            }],
            yScale: {
                range: [0, 1],
                tickCount: 4,
                suffix: '',
                min: undefined,
                max: undefined,
            },
            yAxis: {
                isShow: true,
                position: 'left', // top right bottom left
                line: {
                    style: {
                        stroke: '#000', // 坐标线颜色
                        lineWidth: 1, // 坐标线宽度
                    }
                },
                tickLine: {
                    style: {
                        stroke: '#000', // 刻度颜色
                        lineWidth: 1, // 刻度宽度
                    },
                    alignTick: true, // 是否同刻度线对齐
                    length: 4, // 刻度长度
                },
                title: {
                    style: {
                        fontSize: 14,
                        fontWeight: 'normal',
                        fill: '#000', // 颜色
                    },
                    offset: null, // is number
                    text: '',
                    autoRotate: true, // 自动旋转
                    position: 'center', // 'start' | 'center' | 'end'
                    description: '', // 标题描述
                },
                label: {
                    style: {
                        fontSize: 14,
                        fill: '#000', // 颜色
                    },
                    offset: 8, // is number
                    rotate: null, // is number
                    autoRotate: true, // 是否自动旋转
                    autoHide: true, // 是否自动隐藏
                    autoEllipsis: true, // 是否自动省略
                },
                grid: {
                    line: {
                        type: 'line', // 'line' | 'circle' // 网格类型
                        style: {
                            stroke: '#000', // 网格颜色
                            lineWidth: 1, // 网格粗细
                            lineDash: [0], // 控制实线虚线
                        }
                    },
                    alternateColor: '', // 两个栅格线间的填充色
                },
                verticalFactor: 1, // 1|内 -1|外 // 标记坐标轴 label 的方向
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
            label: {
                isShow: false,
                style: {
                    fill: '#000',
                    fontSize: 14,
                    textBaseline: 'middle', // top middle alphabetic bottom 
                },
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
        },
        marks: {
            0.2: '0.2',
            0.5: '0.5',
            0.8: '0.8'
        },
      };
    },
    methods: {
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
        addYValue() {
            this.defaultConfig.yBindData.push({
                value: '',
                barColor: ''
            })
        },
        delYValue(index) {
            this.defaultConfig.yBindData.splice(index, 1)
        },
    }
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>