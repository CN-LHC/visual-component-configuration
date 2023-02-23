<template>
    <el-dialog title="数图信息" :visible.sync="dialogFormVisible" width="800px">
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="数图名称" :label-width="formLabelWidth" prop="chartName">
                <el-input v-model="form.chartName" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="数图描述" :label-width="formLabelWidth" prop="chartDesc">
                <el-input v-model="form.chartDesc" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    data: function() {
        return {
            form: {
                chartName: '',
                chartDesc: '',
            },
            dialogFormVisible: false,
            formLabelWidth: '80px',
            rules: {
                chartName: [{ required: true, message: '数图名称不能为空', trigger: 'blur' }]
            },
        }
    },
    methods: {
        open() {
            let customComponent = localStorage.getItem('customComponent');
            if (customComponent) {
                customComponent = JSON.parse(customComponent)
                this.form = {
                    chartName: customComponent.chart_name || '',
                    chartDesc: customComponent.chart_desc || '',
                }
            } else {
                this.form = {
                    chartName: '',
                    chartDesc: '',
                }
            }
            this.dialogFormVisible = true
        },
        close() {
            Object.assign(this.$data, this.$options.data())
        },
        submit() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.$emit('submitConfig', this.form)
                    // this.dialogFormVisible = false
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
/deep/ .el-dialog {
    .el-input__inner {
        // border-width: 0;
        background: #F0F0F7;
    }
    .el-input__inner:focus {
        border-color: var(--main-color-hover)
    }
    .el-button--default {
        background: var(--box-bg-color);
        border-color: var(--box-bg-color);
        color: #fff;
        &:hover {
            background: #252b34;
        }
    }
    .el-button--primary {
        background: var(--main-color);
        border-color: var(--main-color);
        &:hover {
            background: var(--main-color-hover);
        }
    }
}
</style>