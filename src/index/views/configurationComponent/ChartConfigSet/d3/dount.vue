/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-16 15:44:32
 * k线图配置
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
                    <h3>label位置</h3>
                    <el-radio-group v-model="defaultConfig.labelPosition">
                        <el-radio-button label="inside">inside</el-radio-button>
                        <!-- <el-radio-button label="outsideWithLine">outsideWithLine</el-radio-button> -->
                        <el-radio-button label="outsideWithOutLine">outsideWithOutLine</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName">
                    <h3>旋转文字</h3>
                    <el-switch v-model="defaultConfig.isRotateLabel" ></el-switch>
                </div>
                <div class="scaleName" v-show="defaultConfig.labelPosition === 'outsideWithOutLine'">
                    <h3>label偏移</h3>
                    <el-input-number v-model="defaultConfig.labelOffset" size="small"  :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>值后缀</h3>
                    <el-input v-model="defaultConfig.valueSuffix" size="small" />
                </div>
                <!-- <div class="scaleName">
                    <h3>label定位</h3>
                    <el-radio-group v-model="defaultConfig.valueType">
                        <el-radio-button label="relative">relative</el-radio-button>
                        <el-radio-button label="absolute">absolute</el-radio-button>
                    </el-radio-group>
                </div> -->
                <div class="scaleName">
                    <h3>外边距</h3>
                    <el-input-number v-model="defaultConfig.labelRatio" size="small" :precision="2" :step="0.05" :min="0" :max="1"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>内边距</h3>
                    <el-input-number v-model="defaultConfig.donutRatio" size="small" :precision="2" :step="0.05" :min="0" :max="1"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>角分离</h3>
                    <el-input-number v-model="defaultConfig.padAngle" size="small"  :min="0" :max="10"></el-input-number>
                </div>
                 <div class="scaleName">
                    <h3>外半径</h3>
                    <el-input-number v-model="defaultConfig.cornerRadius" size="small"  :min="0" :max="10"></el-input-number>
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
                name: '测试标题',
                isShow: true,
                marginLeft: 0,
                textAlign: 'left',
            },
            backgroundColor: '#ffffff',
            totalLength: 5,
            labelPosition: 'inside',
            isRotateLabel: true, //是否旋转文字
            valueSuffix: "", //数字后缀
            labelRatio: 0.8, // 外边距
            donutRatio: 0.4, // 内边距
            padAngle: 1, // angular separation between wedges
            cornerRadius: 0, // outer radius of pie, in pixels外半径
            labelOffset: 30,
            // valueType: "relative", //相对百分比，还是绝对值
            duration: 800, //持续时长
            delay: 40, //间隔时长
        }
      };
    },
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>