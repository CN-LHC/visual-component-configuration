/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-22 09:13:52 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2022-11-22 09:14:20
 * 新建API
 */

<template>
  <el-dialog
    :visible.sync="visible"
    @close="cancelEvent"
    :close-on-click-modal="false"
    :title="title"
    width="1000px"
    top="8vh"
  >
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="接口模式" name="api">
        <DataSet
          ref="dataSet"
          @resetVisible="resetVisibleEvent"
          @change="sqlChange"
        />
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button class="ok_event" @click="okEvent">确 定</el-button>
      <el-button style="margin-left: 10px" @click="cancelEvent"
        >取 消</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import DataSet from "./dataSet.vue";

export default {
  name: "DatasetEditor",
  components: { DataSet },
  data() {
    return {
      activeName: "api",
      title: "",
      visible: false,
    };
  },
  mounted() {},
  methods: {
    // 确定
    okEvent() {
      if (this.activeName == "api") {
        this.$refs.dataSet.okEvent();
      }
    },
    // 更新api列表
    sqlChange() {
      this.$emit("change");
    },
    // 关闭弹框
    resetVisibleEvent() {
      this.visible = false;
    },
    // 取消
    cancelEvent() {
      if (this.activeName == "api") {
        this.$refs.dataSet.cancelEvent();
      }
    },
    showDialog(item) {
      this.visible = true;
      if (item) {
        this.title = "修改API";
        if (this.activeName === "api") {
          this.$nextTick(() => {
            this.$refs.dataSet.showDialog(item);
          });
        }
      } else {
        this.title = "新建API";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.editor {
  height: 500px;
  width: 100%;
  border: 1px solid #e8eaec;
}

.show {
  position: relative;
  display: flex;
  align-items: center;
  // justify-content: center;
  text-align: justify;
  margin: 0 auto;
}
.box {
  width: 28px;
  height: 28px;
  background: #ff8f42;
  position: relative;
  margin: 5px;
}
.text {
  position: relative;
}
/deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color: #3BD5B3;
}
.ok_event {
    background: #3BD5B3;
    color: #fff;
    &:hover {
        background-color: #20C6A1;
    }
    &:active {
        border-color: #20C6A1;
    }
}
</style>
