/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-22 09:14:30 
 * @Last Modified by:   liuhanchuan 
 * @Last Modified time: 2022-11-22 09:14:30 
 * API详细参数配置
 */

<template>
  <el-form
    :model="formParams"
    ref="form"
    size="small"
    :rules="rules"
    label-width="100px"
  >
    <el-form-item label="接口名称" prop="setName">
      <el-input v-model="formParams.setName" placeholder="请输入接口名称" />
    </el-form-item>
    <el-form-item label="URL" prop="requestUrl">
      <el-input v-model="formParams.requestUrl" placeholder="请输入URL" />
    </el-form-item>
    <el-form-item label="请求方式" prop="requestMethod">
      <el-select
        v-model="formParams.requestMethod"
        placeholder="请选择请求方式"
      >
        <el-option
          v-for="data in typeOptions"
          :key="data.id"
          :label="data.name"
          :value="data.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="请求头" prop="requestHeader">
      <el-input
        v-model="formParams.requestHeader"
        type="textarea"
        placeholder="请输入请求头"
      />
    </el-form-item>
    <!-- <el-form-item label="标签" prop="label">
      <el-select
        v-model="formParams.label"
        filterable
        multiple
        collapse-tags
        placeholder="请输入标签"
      >
        <el-option
          v-for="data in labelList"
          :key="data.labelName"
          :label="data.labelName"
          :value="data.labelName"
        />
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <el-alert
        title=""
        description="动态参数为键值对格式 例：{'name':'zs','sex':'男','age':'?'}"
        type="success"
        close-text="知道了"
      >
      </el-alert>
    </el-form-item>
    <el-form-item label="接口请求参数" prop="requestBody">
      <el-input
        v-model="formParams.requestBody"
        type="textarea"
        placeholder="请输入参数"
      />
    </el-form-item>
    <el-form-item label="参数说明">
      <ParamsDes :dataSource="formParams.paramsArr" />
    </el-form-item>
    <el-form-item label="接口测试">
      <el-button class="request_btn" @click="apiRequest">请求测试</el-button>
    </el-form-item>
    <el-form-item label="返回结果" prop="returnResult">
      <el-input
        v-model="returnResult"
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 8 }"
        placeholder="返回结果"
      />
    </el-form-item>
  </el-form>
</template>
<script>
// import { cloneDeep } from "lodash";
import requestAPI from "@/utils/requestAPI";
import _ from "lodash";
import ParamsDes from './paramsDes.vue'
export default {
  name: "DatasourceEdit",
  data() {
    return {
      formParams: {
        id: null,
        requestMethod: "POST",
        setName: "",
        requestUrl: "",
        requestHeader: '{"Content-Type":"application/json"}',
        requestBody: "",
        // label: null, // 标签
        paramsArr: []
      },
      returnResult: "",
      typeOptions: [
        {
          name: "GET",
          id: "1",
        },
        {
          name: "POST",
          id: "2",
        },
      ],
      rules: {
        requestMethod: [
          {
            required: true,
            message: "请求方式不能为空",
            trigger: ["blur", "change"],
          },
        ],
        setName: [
          { required: true, message: "接口名称不能为空", trigger: "blur" },
        ],
        requestUrl: [
          { required: true, message: "URL不能为空", trigger: "blur" },
        ],
        requestHeader: [
          { required: true, message: "请求头不能为空", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    ParamsDes
  },
  mounted() {},
  methods: {
    showDialog(item) {
      this.formParams = {
        id: item.id,
        requestMethod: item.api_method,
        setName: item.api_name,
        requestUrl: item.api_url,
        requestHeader: item.api_header,
        requestBody: item.api_params,
        paramsArr: JSON.parse(item.api_desc)
      }
    },
    okEvent() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const { id, requestMethod, setName, requestUrl, requestHeader, requestBody, paramsArr = [] } = this.formParams
          if (id) {
            this.API.apiUpdate({
              id: id,
              apiMethod: requestMethod,
              apiName: setName,
              apiUrl: requestUrl,
              apiParamsDesc: '',
              apiDesc: JSON.stringify(paramsArr),
              apiHeader: requestHeader,
              apiParams: requestBody,
            }).then(() => {
              this.$message.success('编辑成功')
              this.cancelEvent()
              this.$emit("change")
            }).catch((error) => {
              this.$message.error(`编辑失败${error}`)
            })
          } else {
            this.API.apiAdd({
              apiMethod: requestMethod,
              apiName: setName,
              apiUrl: requestUrl,
              apiParamsDesc: '',
              apiDesc: JSON.stringify(paramsArr),
              apiHeader: requestHeader,
              apiParams: requestBody,
            }).then(() => {
              this.$message.success('添加成功')
              this.cancelEvent()
              this.$emit("change")
            }).catch((error) => {
              this.$message.error(`添加失败${error}`)
            })
          }
        }
      });
    },
    // API接口测试
    apiRequest() {
      let params = null; // 参数
      let contentType = "application/json"; // 请求头
      try {
        params = JSON.parse(this.formParams.requestBody)
        contentType = JSON.parse(this.formParams.requestHeader)['Content-Type']
      } catch (error) {
        params = {}
      }
      if (this.formParams.requestMethod == "POST") {
        requestAPI({
          url: this.formParams.requestUrl,
          headers: {
            "Content-Type": contentType,
          },
          method: this.formParams.requestMethod,
          data: params,
        }).then((data) => {
          this.returnResult = JSON.stringify(data);
        })
      } else {
        requestAPI({
          url: this.formParams.requestUrl,
          headers: {
            "Content-Type": contentType,
          },
          method: this.formParams.requestMethod,
          params,
        }).then((data) => {
          this.returnResult = JSON.stringify(data);
        });
      }
    },
    cancelEvent() {
      (this.formParams = {
        id: "",
        requestMethod: "POST",
        setName: "",
        requestUrl: "",
        requestHeader: '{"Content-Type":"application/json"}',
        requestBody: "",
        // label: null,
        paramsArr: [],
      }),
        (this.returnResult = "");
      this.$refs.form.resetFields();
      this.$emit("resetVisible");
    },
  },
};
</script>

<style lang="less" scoped>
.request_btn {
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
