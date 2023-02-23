/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-16 15:45:12
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
                    <h3>标题字体大小</h3>
                    <el-input-number v-model="defaultConfig.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>标题字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.fontColor"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>间距</h3>
                    <el-input-number v-model="defaultConfig.padding" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>数量</h3>
                    <el-input-number v-model="defaultConfig.totalLength" size="small" :min="0" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>方向</h3>
                    <el-switch v-model="defaultConfig.isNegativeSameDirection" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>圆角</h3>
                    <el-input-number v-model="defaultConfig.barRadius" size="small" :min="0" label="描述文字"></el-input-number>
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
        <el-collapse-item title="column1" name="column1">
            <div class="scaleName">
                <h3>名称</h3>
                <el-input v-model="defaultConfig.column[0].name" size="small" />
            </div>
            <div class="scaleName">
                <h3>value</h3>
                <el-select v-model="defaultConfig.column[0].value" placeholder="请选择">
                    <el-option
                        v-for="key in selectKey"
                        :key="key"
                        :label="key"
                        :value="key">
                    </el-option>
                </el-select>
            </div>
            <div class="scaleName">
                <h3>字体颜色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.column[0].fontColor"
                ></el-color-picker>
            </div>
            <div class="scaleName">
                <h3>字体大小</h3>
                <el-input-number v-model="defaultConfig.column[0].fontSize" size="small" :min="12" label="描述文字"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>单位</h3>
                <el-input v-model="defaultConfig.column[0].suffix" size="small" />
            </div>
        </el-collapse-item>
        <el-collapse-item title="column2" name="column2">
            <div class="scaleName">
                <h3>名称</h3>
                <el-input v-model="defaultConfig.column[1].name" size="small" />
            </div>
            <div class="scaleName">
                <h3>value</h3>
                <el-input v-model="defaultConfig.column[1].value" size="small" />
            </div>
            <div class="scaleName">
                <h3>字体颜色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.column[1].fontColor"
                ></el-color-picker>
            </div>
            <div class="scaleName">
                <h3>字体大小</h3>
                <el-input-number v-model="defaultConfig.column[1].fontSize" size="small" :min="12" label="描述文字"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>柱图颜色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.column[1].barColor"
                ></el-color-picker>
            </div>
            <div class="scaleName">
                <h3>单位</h3>
                <el-input v-model="defaultConfig.column[1].suffix" size="small" />
            </div>
        </el-collapse-item>
        <el-collapse-item title="column3" name="column3">
            <div class="scaleName">
                <h3>名称</h3>
                <el-input v-model="defaultConfig.column[2].name" size="small" />
            </div>
            <div class="scaleName">
                <h3>value</h3>
                <el-input v-model="defaultConfig.column[2].value" size="small" />
            </div>
            <div class="scaleName">
                <h3>字体颜色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.column[2].fontColor"
                ></el-color-picker>
            </div>
            <div class="scaleName">
                <h3>字体大小</h3>
                <el-input-number v-model="defaultConfig.column[2].fontSize" size="small" :min="12" label="描述文字"></el-input-number>
            </div>
            <div class="scaleName">
                <h3>单位</h3>
                <el-input v-model="defaultConfig.column[2].suffix" size="small" />
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
        activeNames: ['basics'],
        defaultConfig: {
            marginTop: 40, // the top margin, in pixels
            marginRight: 100, // the right margin, in pixels
            marginBottom: 10, // the bottom margin, in pixels
            marginLeft: 90, // the left margin, in pixels
            padding: 0.3, // 柱子的比例
            duration: 400, //动画持续时长
            delay: 40, //元素之间间隔时长
            isNegativeSameDirection: false, //默认负值柱子和正值柱子不同方向
            barRadius: 0, //柱子的圆角 整数
            totalLength: 10,
            fontSize: 14,
            fontColor: '',
            backgroundColor: '#ffffff',
            title: {
                fontSize: 14,
                fontColor: '',
                name: '测试标题',
                isShow: true,
                marginLeft: 0,
                textAlign: 'left',
            },
            column: [
                {
                    name: '',
                    value: '',
                    fontColor: '',
                    suffix: '',
                },
                {
                    name: '',
                    value: '',
                    suffix: '',
                    fontColor: '',
                    fontSize: 14,
                    barColor: '',
                },
                {
                    name: '',
                    value: '',
                    suffix: '',
                    fontSize: 14,
                    fontColor: '',
                },
            ]
        }
      };
    },
    
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>