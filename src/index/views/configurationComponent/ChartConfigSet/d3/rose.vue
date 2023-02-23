/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-16 15:45:02
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
                    <h3>旋转文字</h3>
                    <el-switch v-model="defaultConfig.isRotateLabel" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>label偏移</h3>
                    <el-input-number v-model="defaultConfig.labelOffset" size="small"  :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>labeltop3偏移</h3>
                    <el-input-number v-model="defaultConfig.top3Offset" size="small"  :min="0"></el-input-number>
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
                    <h3>最大半径</h3>
                    <el-input-number v-model="defaultConfig.maxRadius" size="small" :precision="2" :step="0.05" :min="0" :max="1"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>最小半径</h3>
                    <el-input-number v-model="defaultConfig.minRadius" size="small" :precision="2" :step="0.05" :min="0" :max="1"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>半径</h3>
                    <el-input-number v-model="defaultConfig.dountRadius" size="small" :precision="2" :step="0.05" :min="0" :max="1"></el-input-number>
                </div>
                 <div class="scaleName">
                    <h3>是否均分角度</h3>
                    <el-switch v-model="defaultConfig.isSameAngle" ></el-switch>
                </div>
                 <div class="scaleName">
                    <h3>是否排序</h3>
                    <el-switch v-model="defaultConfig.isSort" ></el-switch>
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
            value: 'value',
            name: 'name',
            title: {
                fontSize: 14,
                fontColor: '',
                name: '测试标题',
                isShow: true,
                marginLeft: 0,
                textAlign: 'left',
            },
            backgroundColor: '#ffffff',
            duration: 800, //持续时长
            delay: 40, //间隔时长
            labelOffset: 30, // 偏移
            top3Offset: 30, // 偏移
            // valueType: "relative", //相对百分比，还是绝对值
            valueSuffix: "", //数字后缀
            dountRadius: 0.2,
            minRadius: 0.5, // 最小半径
            maxRadius: 0.8, // 最大半径
            isSort: false, //是否排序
            isSameAngle: false, // 是否均分角度
            isRotateLabel: true, //是否旋转文字
            totalLength: 5,
        }
      };
    },
    
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>