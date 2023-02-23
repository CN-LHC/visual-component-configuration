/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-17 17:43:17
 * k线图配置
 */
<template>
    <el-collapse v-model="activeNames">
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
                    <h3>表头字体大小</h3>
                    <el-input-number v-model="defaultConfig.tableHead.fontSize" size="small" :min="12" label="描述文字"></el-input-number>
                </div>
                <div class="scaleName">
                    <h3>表头字体颜色</h3>
                    <el-color-picker
                        size="small"
                        show-alpha
                        v-model="defaultConfig.tableHead.fontColor"
                    ></el-color-picker>
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
        <el-collapse-item title="列配置" name="columns">
            <div v-for="(item, index) in defaultConfig.table" :key="index" class="config_box">
                <div class="scaleName">
                    <h3>名称</h3>
                    <el-input v-model="item.name" size="small" placeholder="请输入名称" />
                </div>
                <div class="scaleName">
                    <h3>数据绑定</h3>
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
                    <h3>长度</h3>
                    <el-input-number v-model="item.width" size="small" :min="0" :max="100"></el-input-number>
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
                        v-model="item.color"
                    ></el-color-picker>
                </div>
                <div class="scaleName">
                    <h3>单位</h3>
                    <el-input v-model="item.valueSuffix" size="small" />
                </div>
            </div>
            <div class="config_box">
                <el-button icon="el-icon-plus" size="small" @click="addColumn"></el-button>
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
            totalLength: 10,
            duration: 400,
            delay: 100,
            backgroundColor: '#ffffff',
            tableHead: {
                fontSize: 14,
                fontColor: '#000',
            },
            title: {
                fontSize: 14,
                fontColor: '',
                isShow: true,
                name: '表格名称',
                marginLeft: 0,
                textAlign: 'left'
            },
            table: [
                {
                    name: '',
                    value: '',
                    width: 20,
                    color: '',
                    fontSize: 14,
                    valueSuffix: '',
                },
            ],
        }
      };
    },
    methods: {
        addColumn() {
            this.defaultConfig.table.push({
                name: '',
                value: '',
                width: 20,
                color: '',
                fontSize: 14,
                valueSuffix: '',
            }) 
        },
    }
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>