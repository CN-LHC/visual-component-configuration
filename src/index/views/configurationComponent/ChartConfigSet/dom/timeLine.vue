/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-22 14:35:34
 * 方块树图
 */
<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="数据绑定" name="basic_data">
            <div class="scaleName">
                <h3>name</h3>
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
        <el-collapse-item title="name属性配置" name="name">
            <div class="config_box">
                <div class="scaleName">
                    <h3>name字体大小</h3>
                    <el-input-number v-model="defaultConfig.nameSet.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>name字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.nameSet.fontColor"
                    ></el-color-picker>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="value属性配置" name="value">
            <div class="config_box">
                <div class="scaleName">
                    <h3>value字体大小</h3>
                    <el-input-number v-model="defaultConfig.valueSet.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>value字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.valueSet.fontColor"
                    ></el-color-picker>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="dot属性配置" name="dot">
            <div class="config_box">
                <div class="scaleName">
                    <h3>宽</h3>
                    <el-input-number v-model="defaultConfig.dot.width" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>高</h3>
                    <el-input-number v-model="defaultConfig.dot.height" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>边框宽度</h3>
                    <el-input-number v-model="defaultConfig.dot.borderWidth" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>边框颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.dot.borderColor"
                    ></el-color-picker>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="dotLine属性配置" name="dotLine">
            <div class="config_box">
                <div class="scaleName">
                    <h3>边框宽度</h3>
                    <el-input-number v-model="defaultConfig.dotLine.borderWidth" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>边框颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.dotLine.borderColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>边框类型</h3>
                    <el-radio-group v-model="defaultConfig.dotLine.borderStyle">
                        <el-radio-button label="solid">实线</el-radio-button>
                        <el-radio-button label="dashed">虚线</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="标题" name="title">
            <div class="config_box">
                <div class="scaleName">
                    <h3>名称</h3>
                    <el-input v-model="defaultConfig.title.name" size="small" />
                </div>
                <div class="scaleName">
                    <h3>字体大小</h3>
                    <el-input-number v-model="defaultConfig.title.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体颜色</h3>
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
            name: '',
            value: '',
            marginTop: 10,
            marginRight: 10,
            marginBottom: 10,
            marginLeft: 10,
            totalLength: 10,
            backgroundColor: '',
            duration: 300,
            delay: 300,
            title: {
                fontSize: 14,
                fontColor: '',
                isShow: true,
                marginLeft: 0,
                textAlign: 'left',
                name: '',
            },
            nameSet: {
                fontSize: 14,
                fontColor: '',
            },
            valueSet: {
                fontSize: 14,
                fontColor: '',
            },
            dotLine: {
                borderWidth: 2,
                borderColor: '',
                borderStyle: 'solid',
            },
            dot: {
                width: 4,
                height: 4,
                borderWidth: 2,
                borderColor: '',
                // borderStyle: 'dashed', // solid dashed
            },
        }
      };
    },
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>