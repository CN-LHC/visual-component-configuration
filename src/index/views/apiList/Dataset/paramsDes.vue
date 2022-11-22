/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-22 09:14:51 
 * @Last Modified by:   liuhanchuan 
 * @Last Modified time: 2022-11-22 09:14:51 
 * APIbody参数描述
 */

<template>
  <div class="params_des">
    <el-button @click="addParam" class="add_param">添加参数</el-button>
    <el-table
        :data="dataSource"
        style="width: 100%">
        <el-table-column
        label="参数名"
        >
        <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
        </template>
        </el-table-column>
        <el-table-column
        label="默认值"
        >
        <template slot-scope="scope">
            <el-input v-model="scope.row.defaultValue"></el-input>
        </template>
        </el-table-column>
        <el-table-column
        label="可选值"
        >
        <template slot-scope="scope">
            <el-input v-model="scope.row.values"></el-input>
        </template>
        </el-table-column>
        <el-table-column label="">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ['dataSource'],
    methods: {
        addParam() {
            this.dataSource.push({
                name: '',
                defaultValue: '',
                values: ''
            })
        },
        handleDelete(index) {
            this.dataSource.splice(index, 1);
        }
    }
  }
</script>
<style lang="less" scoped>
.params_des {
    .add_param {
        background: #3BD5B3;
        color: #fff;
        margin-bottom: 12px;
        &:hover {
            background-color: #20C6A1;
        }
        &:active {
            border-color: #20C6A1;
        }
    }
    .el-table::before {
      height: 0;
    }
    /deep/ .el-table th.el-table__cell {
      background-color: #F2F2F8;
    }
}
</style>