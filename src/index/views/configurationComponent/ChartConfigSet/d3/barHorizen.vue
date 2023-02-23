/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-02 17:24:43
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
                    <el-switch v-model="defaultConfig.title.isShow"></el-switch>
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
                    <el-input-number v-model="defaultConfig.barRadius" size="small" :min="0"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>数量</h3>
                    <el-input-number v-model="defaultConfig.totalLength" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>涨跌颜色</h3>
                    <ul>
                        <li>
                            <span>上涨：</span>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.riseFallColor.rise"
                            ></el-color-picker>
                        </li>
                        <li>
                            <span>下跌：</span>
                            <el-color-picker
                                size="small"
                                show-alpha
                                v-model="defaultConfig.riseFallColor.fall"
                            ></el-color-picker>
                        </li>
                    </ul>
                </div>
                <div class="scaleName">
                    <h3>字体大小</h3>
                    <el-input-number v-model="defaultConfig.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.fontColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>值后缀</h3>
                    <el-input v-model="defaultConfig.valueSuffix" size="small" />
                </div>
                <div class="scaleName">
                    <h3>label位置</h3>
                    <el-radio-group v-model="defaultConfig.labelPosition">
                        <el-radio-button label="left">left</el-radio-button>
                        <el-radio-button label="top">top</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName">
                    <h3>值位置</h3>
                    <el-radio-group v-model="defaultConfig.numberPosition">
                        <el-radio-button label="inside">inside</el-radio-button>
                        <el-radio-button label="outside">outside</el-radio-button>
                    </el-radio-group>
                </div>
                 <div class="scaleName">
                    <h3>是否从0开始</h3>
                    <el-switch v-model="defaultConfig.isFromZero" ></el-switch>
                </div>
                 <div class="scaleName">
                    <h3>是否方向相同</h3>
                    <el-switch v-model="defaultConfig.isNegativeSameDirection" ></el-switch>
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
            title: {
                fontSize: 14,
                fontColor: '',
                isShow: true,
                marginLeft: 0,
                textAlign: 'left',
                name: '',
            },
            backgroundColor: '#ffffff',
            marginLeft: 40,
            marginRight: 30,
            marginTop: 40,
            marginBottom: 30,
            delay: 40,
            duration: 400,
            padding: 0.2,
            barRadius: 12,
            totalLength: 10,
            
            riseFallColor: {
                rise: '#ff3b30',
                fall: '#39b24e',
            },
            fontSize: 14,
            fontColor: '',
            valueSuffix: "", //数字的后缀

            numberPosition: "inside", //数字显示在柱子里边还是外边inside outside
            labelPosition: "left", //label的位置在左边还是上边
            isFromZero: true, //是否从0开始
            isNegativeSameDirection: false, //默认负值柱子和正值柱子不同方向
        }
      };
    },
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>