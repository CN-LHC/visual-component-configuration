/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-16 15:44:52
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
                    <h3>label字体大小</h3>
                    <el-input-number v-model="defaultConfig.label.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>label字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.label.fontColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>label显示</h3>
                    <el-switch v-model="defaultConfig.label.isShowNumber" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>间距</h3>
                    <el-input-number v-model="defaultConfig.padding" size="small" :precision="1" :step="0.1" :min="0" :max="1"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>圆角</h3>
                    <el-input-number v-model="defaultConfig.barRadius" size="small" :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>k线数量</h3>
                    <el-input-number v-model="defaultConfig.totalLength" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>涨跌颜色</h3>
                    <ul>
                        <li>
                            <span>涨停：</span>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.riseFallColor.rise"
                            ></el-color-picker>
                        </li>
                        <li>
                            <span>平：</span>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.riseFallColor.flat"
                            ></el-color-picker>
                        </li>
                        <li>
                            <span>跌停：</span>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.riseFallColor.fall"
                            ></el-color-picker>
                        </li>
                    </ul>
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
                    <h3>字体大小</h3>
                    <el-input-number v-model="defaultConfig.xAxis.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.xAxis.fontColor"
                    ></el-color-picker>
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
                    <h3>y轴显示</h3>
                    <el-switch v-model="item.axis" ></el-switch>
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
            marginLeft: 20,
            marginRight: 30,
            marginTop: 40,
            marginBottom: 30,
            delay: 40,
            duration: 400,
            padding: 0.2,
            barRadius: 0,
            backgroundColor: '#ffffff',
            title: {
                fontSize: 14,
                fontColor: '',
                name: '测试标题',
                isShow: true,
                marginLeft: 0,
                textAlign: 'left',
            },
            label: {
                isShowNumber: true,
                fontSize: 14,
                fontColor: '',
            },
            riseFallColor: {
                rise: '#ff3b30',
                fall: '#39b24e',
                flat: '#c5c5c5',
            },
            xAxis: {
                name: '',
                axis: true,
                fontSize: 14,
                fontColor: '',
            },
            yAxis: [
                {
                    name: '',
                    axis: false,
                    fontSize: 14,
                    fontColor: '',
                },
            ],
        }
      };
    },
    
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>