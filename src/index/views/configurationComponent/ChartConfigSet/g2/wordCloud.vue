/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:04:50 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-22 14:16:59
 * 词云图
 */
<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="数据绑定" name="basic_data">
            <div style="padding: 10px 20px;margin-bottom: 12px;">
                <div class="scaleName">
                    <h3>name</h3>
                    <el-select v-model="defaultConfig.name" placeholder="请选择" size="small">
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
                    <el-select v-model="defaultConfig.value" placeholder="请选择" size="small">
                        <el-option
                            v-for="key in selectKey"
                            :key="key"
                            :label="key"
                            :value="key">
                        </el-option>
                    </el-select>
                </div>
                <div class="scaleName">
                    <h3>图片地址</h3>
                    <el-input v-model="defaultConfig.imgSrc" placeholder="请输入/上传图片" size="small">
                        <el-button slot="append" icon="el-icon-upload2" @click="uploadImg"></el-button>
                    </el-input>
                </div>
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
                    <el-radio-group v-model="defaultConfig.title.textAlign" size="small">
                        <el-radio-button label="left">左</el-radio-button>
                        <el-radio-button label="center">居中</el-radio-button>
                        <el-radio-button label="right">右</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="scaleName">
                    <h3>标题显示</h3>
                    <el-switch v-model="defaultConfig.title.isShow"  size="small"></el-switch>
                </div>
            </div>
        </el-collapse-item>
        <el-collapse-item title="基础属性配置" name="basics">
            <div class="scaleName">
                <h3>背景色</h3>
                <el-color-picker
                    size="small"
                    show-alpha
                    v-model="defaultConfig.backgroundColor"
                ></el-color-picker>
            </div>
        </el-collapse-item>
        <el-collapse-item title="提示配置" name="tooltip">
            <div class="config_box">
                <div class="scaleName">
                    <h3>是否显示提示</h3>
                    <el-switch v-model="defaultConfig.tooltip.isShow" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>是否显示提示头</h3>
                    <el-switch v-model="defaultConfig.tooltip.showTitle" ></el-switch>
                </div>
                <div class="scaleName">
                    <h3>是否显示提示标记</h3>
                    <el-switch v-model="defaultConfig.tooltip.showMarkers" ></el-switch>
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
            </div>
        </el-collapse-item>
        <input type="file" ref="fileInput" style="display: none" @change="batchImport" accept=".jpeg,.jpg,.png,.gif">
        <CropperDialog ref="cropper" :fixed="true" :nameControl="false" @changeImgMsg="changeImgMsg" />
    </el-collapse>
</template>
<script>
import CropperDialog from '../components/cropperDialog/index.vue'
import { mixin } from "../mixin"
  export default {
    components: {
        CropperDialog
    },
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
            backgroundColor: '',
            tooltip: {
                isShow: true,
                showTitle: false,
                showMarkers: false,
                position: 'right',
            },
            imgSrc: '',
        },
      };
    },
    methods: {
        // 词云图
        uploadImg() {
            this.$refs.fileInput.click()
        },
        batchImport(e) {
            const [file] = e.target.files;
            const checkSize = this.imgBeforeUpload(file)
            if (checkSize) {
                this.$refs.cropper.openDialog(file)
            }
             // 清空input的值
            this.$refs.fileInput.value = ''
        },
        //图片上传前，检查大小是否超出
        imgBeforeUpload(file) {
            const isFileSizeFit = file.size / 1024 / 1024 < 5;
            if (!isFileSizeFit) {
                this.$message.error("图片大小不能超过 5MB!");
            }

            return isFileSizeFit;
        },
        changeImgMsg(value) {
            this.defaultConfig.imgSrc = value.url
        }
    }
  }
</script>
<style lang="less" scoped>
@import "../chartConfig.less";
</style>