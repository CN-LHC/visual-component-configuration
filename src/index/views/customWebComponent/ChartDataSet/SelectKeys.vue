<template>
    <div class="select_keys">
        <div v-if="resultArr.length > 6" class="data_api_select">
            <span>KEYS：</span>
            <el-select v-model="data" multiple filterable placeholder="请选择" @change="selectKeys">
                <el-option
                    v-for="item in resultArr"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
        </div>
        <el-checkbox-group v-model="data" @change="selectKeys" v-else>
            <el-checkbox-button v-for="item in resultArr" :label="item" :key="item">{{item}}</el-checkbox-button>
        </el-checkbox-group>
    </div>
</template>
<script>
export default {
    props: ['resultArr', 'selectArr'],
    data() {
        return {
            data: []
        };
    },
    created() {
        if (Array.isArray(this.selectArr) && this.selectArr.length > 0) {
            this.data = [...this.selectArr]
        }
    },
    methods: {
        selectKeys(value) {
            this.$emit('change', value)
        }
    }
}
</script>
<style lang="less" scoped>
.select_keys {
    margin-top: 12px;
    /deep/ .el-checkbox-group {
        .el-checkbox-button {
            margin-right: 12px;
            &:last-child {
                margin-right: 0;
            }
            .el-checkbox-button__inner {
                background: #EDF0F5;
                border-radius: 6px 6px 6px 6px;
                border: 1px solid #EAECEF;
                color: #252525;
            }
        }
        .el-checkbox-button.is-checked .el-checkbox-button__inner {
            background: #3BD5B3;
            border-radius: 4px 4px 4px 4px;
            border: 1px solid #20C6A1;
            color: #252525;
        }
    }
    .data_api_select {
        position: relative;
        background: #EDF0F5;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #EAECEF;
        > span {
            position: absolute;
            top: 10px;
            left: 12px;
            z-index: 2;
            color: #9093A0;
        }
        > div {
            width: 100%;
            /deep/ .el-input__inner {
                border-width: 0;
                background: #EDF0F5;
                padding-left: 70px;
            }
            /deep/ .el-select__tags {
                 padding-left: 56px;
            }
            /deep/ .el-tag.el-tag--info {
                background: #3BD5B3;
                border: 1px solid #20C6A1;
                color: #606266;
            }
            /deep/ .el-tag.el-tag--info .el-tag__close {
                background-color: #fff;
                color: #3BD5B3;
            }
            /deep/ .el-tag.el-tag--info .el-tag__close:hover {
                background-color: #20C6A1;
                color: #fff;
            }
        }
    }
}
</style>