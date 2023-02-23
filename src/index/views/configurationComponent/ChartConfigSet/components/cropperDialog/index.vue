/*
 * @Author: liuhanchuan 
 * @Date: 2021-12-20 14:39:18 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-31 10:56:31
 * 图片裁剪，配置参数需要查看props
 */
<template>
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" @close="closeDialog" append-to-body >
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
            <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox="option.centerBox"
                :infoTrue="option.infoTrue"
                :fixedBox="option.fixedBox"
            ></vueCropper>
            <div class="operation" v-show="fixedControl">
                <h3>可按各个尺寸裁剪</h3>
                <el-radio-group v-model="fixedType" @change="changeFixedType">
                    <el-radio :label="1">图片尺寸（16:9）</el-radio>
                    <el-radio :label="2">图片尺寸（4:3）</el-radio>
                    <el-radio :label="3">图片尺寸（1:1）</el-radio>
                    <el-radio :label="4">图片尺寸（自定义）</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="img_name" v-show="nameControl">
            <span>图片名称：</span>
            <el-input v-model="fileName" placeholder="请输入图片名称"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
    props: {
        fixedControl: {
            type: Boolean,
            default: true,
        },
        nameControl: {
            type: Boolean,
            default: true,
        },
        canScale: {
            type: Boolean,
            default: false,
        },
        autoCrop: {
            type: Boolean,
            default: true,
        },
        fixedBox: {
            type: Boolean,
            default: false,
        },
        fixed: {
            type: Boolean,
            default: false,
        },
        fixedNumber: {
            type: Array,
            default: function() {
                return [16, 9]
            }
        },
        full: {
            type: Boolean,
            default: false,
        },
        canMoveBox: {
            type: Boolean,
            default: true,
        },
        original: {
            type: Boolean,
            default: false,
        },
        centerBox: {
            type: Boolean,
            default: true,
        },
        infoTrue: {
            type: Boolean,
            default: true,
        },
    },
    data: function() {
        return {
            dialogVisible: false,
            fixedType: 1,
            // 裁剪组件的基础配置option
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'png', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                // autoCropWidth: 300, // 默认生成截图框宽度
                // autoCropHeight: 200, // 默认生成截图框高度
                fixedBox: false, // 固定截图框大小 不允许改变
                fixed: false, // 是否开启截图框宽高固定比例
                fixedNumber: [7, 5], // 截图框的宽高比例
                full: false, // 是否输出原图比例的截图
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: true, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            fileName: '',
            // 防止重复提交
            loading: false
        }
    },
    components: {
        VueCropper
    },
    methods: {
        openDialog(file) {
            const _that = this
            _that.option = {
                ..._that.option,
                canScale: _that.canScale,
                autoCrop: _that.autoCrop,
                fixedBox: _that.fixedBox,
                fixed: _that.fixed,
                fixedNumber: _that.fixedNumber,
                full: _that.full,
                canMoveBox: _that.canMoveBox,
                original: _that.original,
                centerBox: _that.centerBox,
                infoTrue: _that.infoTrue,
            }
            if (file instanceof File) {
                _that.dialogVisible = true
                this.fileToDataUrl(file, (value) => {
                    _that.option.img = value
                    _that.fileName = file.name
                })
            } else {
                _that.$message.warning("请提供File类型的图片文件");
            }
        },
        closeDialog() {
            Object.assign(this.$data, this.$options.data())
        },
        changeFixedType(value) {
            let arr = []
            if (value === 1) {
                arr = [16, 9]
                this.option = {
                    ...this.option,
                    fixed: true,
                    fixedNumber: arr,
                }
            } else if (value === 2) {
                arr = [4, 3]
                this.option = {
                    ...this.option,
                    fixed: true,
                    fixedNumber: arr,
                }
            } else if (value === 3) {
                arr = [1, 1]
                this.option = {
                    ...this.option,
                    fixed: true,
                    fixedNumber: arr,
                }
            } else {
                this.option = {
                    ...this.option,
                    fixed: false,
                    fixedNumber: [16, 9]
                }
            }
            
            // 更新截图框
            this.$refs.cropper.refresh()
        },
        //将传入的File/Blob对象转为base64的dataURL
        fileToDataUrl(file, callback) {
            var reader = new FileReader();
            reader.onload = function() {
                callback(reader.result);
            };
            reader.readAsDataURL(file);//FileReader对象的方法，可以读取Blob或者File对象的数据，转化为dataURL格式
        },
        finish() {
            this.loading = false
            this.$refs.cropper.getCropBlob((data) => {
                fetch(`https://upload.wedengta.com/shutu/${new Date().getTime()}.png`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: data,
                }).then(response => response.json()).then((res) => {
                    if (res && res.msg === 'success') {
                        this.loading = true
                        this.$emit('changeImgMsg', { url: res.exurl, name: this.fileName })
                        this.closeDialog()
                    } else {
                        this.$message.error('上传失败')
                    }
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
