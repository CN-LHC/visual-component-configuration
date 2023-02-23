/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-13 16:31:29
 * 方块树图
 */
<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="数据绑定" name="basic_data">
            <div class="scaleName">
                <h3>label</h3>
                <el-select v-model="defaultConfig.name" placeholder="请选择">
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
                <el-select v-model="defaultConfig.value" placeholder="请选择">
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
                    <h3>间距</h3>
                    <el-input-number v-model="defaultConfig.padding" size="small" :precision="1" :step="0.1" :min="0" :max="1"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>圆角</h3>
                    <el-input-number v-model="defaultConfig.rectRadius" size="small" :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>数量</h3>
                    <el-input-number v-model="defaultConfig.totalLength" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>值后缀</h3>
                    <el-input v-model="defaultConfig.valueSuffix" size="small" />
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
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            delay: 40,
            duration: 400,
            padding: 2,
            rectRadius: 0,
            totalLength: 20,
            valueSuffix: "", //数字的后缀
            colors: [],
        }
      };
    },
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>