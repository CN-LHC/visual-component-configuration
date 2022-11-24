<template>
  <div class="chart_list_content">
    <div class="chart_list_operation">
      <el-button @click="addComponent()">添加</el-button>
    </div>
    <div class="chart_list_box">
      <div class="filter_list">
        <el-input placeholder="请输入内容" v-model="keyword">
          <el-button slot="append" icon="el-icon-search" @click="searchKeyword"></el-button>
        </el-input>
      </div>
      <ul v-loading="loading">
        <li v-for="(item) in list" :key="item.id">
          <div class="g2_box">
            <g2-chart id="g2Chart"
              :data-chart-type="item.chart_type"
              :data-api-config="item.data_api_config"
              :data-chart-config="item.data_chart_config"
          ></g2-chart>
          </div>
          <div class="g2_operation">
            <span>{{ item.chart_name }}</span>
            <div>
              <span @click="addComponent(item)">编辑</span>
              <span @click="deleteChart(item.id)">删除</span>
            </div>
          </div>
        </li>
      </ul>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 16, 32]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "chartList",
  data: function () {
    return {
      list: [1],
      loading: false,
      keyword: '',
      currentPage: 1,
      pageSize: 8,
      total: 0
    };
  },
   created() {
    this.getList()
  },
  methods: {
    addComponent(item) {
      this.$router.push({
        path: '/customComponent',
      })
      localStorage.setItem('customComponent', item ? JSON.stringify(item) : '')
    },
    deleteChart(id) {
      this.$confirm("是否确认删除此数图?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.API.chartDelete({
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
      this.loading = true
      this.list = []
      this.$nextTick(() => {
        this.API.getChartList({
          page: this.currentPage,
          size: this.pageSize,
          searchText: this.keyword || '',
        }).then((data) => {
          this.list = data.list || []
          this.total = data.total
          this.loading = false
        }).catch((error) => {
          this.$message.error(`获取列表失败${error}`)
          this.loading = false
        })
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
.chart_list_content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .chart_list_operation {
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
  .chart_list_box {
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
    > ul {
      flex: 1;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow: scroll;
      > li {
        width: 392px;
        height: 304px;
        background: #EDF0F5;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #EDF0F5;
        margin: 0 18px 26px 18px;
        padding: 12px 18px;
        box-sizing: border-box;
        .g2_box {
          width: 100%;
          height: 240px;
          background: #FFFFFF;
          border-radius: 6px 6px 6px 6px;
        }
        .g2_operation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 32px;
          margin-top: 4px;
          > span {
            background: #FFFFFF;
            border-radius: 18px 18px 18px 18px;
            padding: 8px 18px;
            box-sizing: border-box;
          }
          > div {
            > span:first-child {
              color: #4B89FC;
              margin-right: 18px;
              cursor: pointer;
            }
            > span:last-child {
              color: #FF4D2C;
              cursor: pointer;
            }
          }
        }
      }
    }
    .el-pagination {
      padding: 12px 0;
    }
  }
}
</style>