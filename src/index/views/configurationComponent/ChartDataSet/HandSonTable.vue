<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="数据配置" name="customData">
       <hot-table :settings="hotSettings" ref="hotTable"></hot-table>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
 import { HotTable } from '@handsontable/vue';
 import { registerAllModules } from 'handsontable/registry';
 import 'handsontable/dist/handsontable.full.css';
  registerAllModules();
  export default {
    props: {
      dataSource: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
        activeNames: ['customData'],
        hotSettings: {
          data: [[]],
          rowHeaders: true,
          colHeaders: true,
          height: 240,
          width: "auto",
          startRows: 5, // 初始化行数,无data属性时生效(该值小于minRows时,以minRows为准)
          startCols: 10, // 初始化列数,无data属性时生效(该值小于minCols时,以minCols为准)
          minRows: 10, // 最少行数(当初始化数据小于该值时,以该值为准)
          minCols: 19, // 最少列数(当初始化数据小于该值时,以该值为准)
          minSpareRows: 1, // 行的最小留白数
          minSpareCols: 1, // 列的最小留白数
          licenseKey: 'non-commercial-and-evaluation',
          afterChange: (result, source) => {
            if (this.$refs.hotTable) {
              this.getHotTableData()
            }
          },
        }
      };
    },
    components: {
      HotTable
    },
    created() {
      if (Array.isArray(this.dataSource) && this.dataSource.length > 0) {
        this.hotSettings.data = this.chartToTableData(this.dataSource)
      } 
    },
    methods: {
      getHotTableData() {
        let data = this.$refs.hotTable.hotInstance.getData();
        data = this.tableToChartData(data);
        this.$emit('setDataApiConfig', data)
      },
      // 表格数据转换为图表数据
      tableToChartData(source) {
        let res = [];
        let keys = source.slice(0, 1)[0];
        source.slice(1).forEach((item) => {
          if (!item.every((k) => !k)) {
            let obj = {};
            item.forEach((value, index) => {
              if (keys[index] != null) {
                obj[keys[index]] = /^(-|[0-9])(.|[0-9])*[0-9]$/.test(value)
                  ? Number(value)
                  : value;
              }
            });
            res.push(obj);
          }
        });

        return res;
      },
      // 图表数据转表格
      chartToTableData(source) {
        let res = [];
        source.forEach((item, index) => {
          let titleKey = Object.keys(item);
          let column = [];

          if (index == 0) {
            res.push(titleKey);
          }
          titleKey.forEach((key) => {
            column.push(item[key]);
          });
          res.push(column);
        });

        return res;
      },
    }
  }
</script>
<style lang="less" scoped>
.el-collapse {
    border: 0;
    margin-top: 12px;
    border-radius: 6px;
    overflow: hidden;
}
/deep/ .el-collapse-item__content {
    padding-bottom: 0;
    color: #fff;
    max-height: 300px
}
/deep/ .el-collapse-item__header {
    font-size: 14px;
    font-weight: bold;
    background: var(--input-bg-color);
    border-bottom-color: #373E48;
    color: #9093A0;
    padding: 0 4px 0 12px;
    height: 42px;
}
/deep/ .el-collapse-item__wrap {
    background-color: var(--box-bg-color);
    border-bottom-color: var(--box-bg-color); 
}
</style>
