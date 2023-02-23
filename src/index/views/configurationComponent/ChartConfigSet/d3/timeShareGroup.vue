/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-13 16:20:36
 * k线图配置
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
                    <el-input-number v-model="defaultConfig.marginLeft" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>动画时长</h3>
                    <el-input-number v-model="defaultConfig.duration" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>动画延迟</h3>
                    <el-input-number v-model="defaultConfig.delay" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>数量</h3>
                    <el-input-number v-model="defaultConfig.totalLength" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>是否显示legend</h3>
                    <el-switch v-model="defaultConfig.showLegend" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>背景色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.backgroundColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>是否用于分时</h3>
                    <el-switch v-model="defaultConfig.timeShare" ></el-switch>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="网格线配置" name="grid">
            <div class="config_box">
                <div class="scaleName">
                    <h3>网格颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.grid.strokeColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>网格粗细</h3>
                    <el-input-number v-model="defaultConfig.grid.strokeWidth" size="small" :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>网格虚线</h3>
                    <el-input-number v-model="defaultConfig.grid.strokeDasharray" size="small" :min="0"></el-input-number>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="x轴配置" name="xAxis">
            <div class="config_box">
                <div class="scaleName">
                    <h3>数据</h3>
                    <el-select v-model="defaultConfig.xAxis.name" placeholder="请选择">
                        <el-option
                            v-for="key in selectKey"
                            :key="key"
                            :label="key"
                            :value="key">
                        </el-option>
                    </el-select>
                </div>
                <div class="scaleName">
                    <h3>x轴显示</h3>
                    <el-switch v-model="defaultConfig.xAxis.axis" ></el-switch>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="y轴配置" name="yAxis">
            <div v-for="(item, index) in defaultConfig.yAxis" :key="index" class="config_box">
                <div class="scaleName">
                    <h3>数据</h3>
                    <el-select v-model="item.name" placeholder="请选择">
                        <el-option
                            v-for="key in selectKey"
                            :key="key"
                            :label="key"
                            :value="key">
                        </el-option>
                    </el-select>
                </div>
                <div class="scaleName">
                    <h3>是否显示坐标轴</h3>
                    <el-switch v-model="item.axis" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>字体大小</h3>
                    <el-input-number v-model="item.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="item.fontColor"
                    ></el-color-picker>
                </div>
               <div class="scaleName">
                    <h3>折线粗细</h3>
                    <el-input-number v-model="item.strokeWidth" size="small" :min="1" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>折线颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="item.strokeColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>legend名称</h3>
                    <el-input v-model="item.legendName" size="small" />
                </div>
                <div class="scaleName">
                    <h3>legend偏移</h3>
                    <el-input-number v-model="item.xOffset" size="small" label="偏移"></el-input-number>
                </div>
            </div>
            <div class="config_box">
                <el-button icon="el-icon-plus" size="small" @click="addYAxis"></el-button>
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
            marginLeft: 20,
            marginRight: 20,
            marginTop: 60,
            marginBottom: 30,
            duration: 400,
            delay: 20,
            showLegend: true,
            timeShare: false,
            totalLength: 0,
            backgroundColor: '#ffffff',
            grid: {
                strokeColor: '#F0F0F0',
                strokeWidth: 2,
                strokeDasharray: 5,
            },
            title: {
                fontSize: 14,
                fontColor: '',
                isShow: true,
                name: '',
            },
            xAxis: {
                name: '',
                fontSize: 14,
                fontColor: '',
                axis: true,
            },
            yAxis: [
                {
                    name: '',
                    strokeWidth: 2,
                    strokeColor: `#${(Math.random()*0xffffff<<0).toString(16)}`,
                    legend: true,
                    legendName: '',
                    fontSize: 14,
                    fontColor: '',
                    axis: true,
                    xOffset: 0,
                },
            ],
        }
      };
    },
    methods: {
        addYAxis() {
            this.defaultConfig.yAxis.push({
                name: '',
                strokeWidth: 2,
                strokeColor: `#${(Math.random()*0xffffff<<0).toString(16)}`,
                legend: true,
                legendName: '',
                fontSize: 14,
                fontColor: '',
                axis: true,
                xOffset: 0,
            }) 
        },
    }
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>