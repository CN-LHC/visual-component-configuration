/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-22 09:11:53 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2022-11-22 16:04:44
 * 数据管理列表
 */

<template>
  <div class="list_content">
    <div class="list_operation">
      <el-button @click="addApiParams()">添加</el-button>
    </div>
    <div class="api_list_box">
      <div class="filter_list">
        <el-input placeholder="请输入内容" v-model="keyword">
          <el-button slot="append" icon="el-icon-search" @click="searchKeyword"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 99.90%;" height="570">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="api_name" label="名称"></el-table-column>
        <el-table-column prop="api_url" label="URL"></el-table-column>
        <el-table-column prop="api_method" label="请求方式"></el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            {{ $moment(scope.row.create_time).format("YYYY-MM-DD HH-mm-ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
          <template slot-scope="scope">
            {{ $moment(scope.row.update_time).format("YYYY-MM-DD HH-mm-ss") }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <div class="column_operation">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="addApiParams(scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="deleteApi(scope.row.id)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <EditorDlg ref="editorDlg" @change="getList" />
  </div>
</template>
<script>
import EditorDlg from "./Dataset/index.vue";

export default {
  name: "ChartList",
  data: function () {
    return {
      tableData: [],
      keyword: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  components: {
    EditorDlg
  },
  created() {
    this.getList()
  },
  methods: {
    addApiParams(item) {
      this.$refs["editorDlg"].showDialog(item);
    },
    deleteApi(id) {
      this.$confirm("是否确认删除此API?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.API.apiDelete({
          id,
        }).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).catch((error) => {
          this.$message.error(`删除失败${error}`)
        })
      });
    },
    searchKeyword() {
      this.currentPage = 1
      this.getList()
    },
    getList() {
      this.API.getApiList({
        page: this.currentPage,
        size: this.pageSize,
        searchText: this.keyword || '',
      }).then((data) => {
        this.tableData = data.list || []
        this.total = data.total
      }).catch((error) => {
        this.$message.error(`获取列表失败${error}`)
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.getList()
    }
  },
};
</script>
<style lang="less" scoped>
.list_content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .list_operation {
    height: 88px;
    background: #FFFFFF;
    border-radius: 6px 6px 6px 6px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    > button {
      width: 140px;
      background: #3BD5B3;
      box-shadow: 0px 3px 6px 1px #D8DFEB;
      border-radius: 6px 6px 6px 6px;
      color: #fff;
      margin-left: 24px;
      &:hover {
        background-color: #20C6A1;
      }
      &:active {
        border-color: #20C6A1;
      }
    }
  }
  .api_list_box {
    height: calc(100% - 96px);
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .filter_list {
      width: 100%;
      padding: 24px 24px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      /deep/ .el-input-group {
        width: 30%;
        .el-input__inner {
          background-color: #EDF0F7;
          border-width: 0;
        }
        .el-input-group__append {
          border-width: 0;
          width: 88px;
          background: #3BD5B3;
          padding: 0;
          > button {
            width: 100%;
            margin: 0;
            padding: 0;
            > i {
              font-size: 18px;
              color: #fff;
            }
          }
        }
      }
    }
    .el-table::before {
      height: 0;
    }
    /deep/ .el-table th.el-table__cell {
      background-color: #F2F2F8;
    }
    .el-pagination {
      padding: 12px 0;
    }
    .column_operation {
      > button:last-child {
        color: #FF4D2C;
        &:hover {
          color: #f9765d;
        }
      }
    }
  }
}
</style>

