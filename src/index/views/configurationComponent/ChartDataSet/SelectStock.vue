/*
 * @Author: liuhanchuan 
 * @Date: 2022-12-02 16:03:27 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-01-16 15:37:23
 * 改变paramObj的ssecname属性，以及sdtseccode属性
 */
<template>
    <el-select
        v-model="stock_code"
        placeholder="请输入"
        filterable
        remote
        :remote-method="searchStock"
        :loading="loading"
        @change="changeStock"
    >
        <el-option
            v-for="item in stockArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
    </el-select>
</template>
<script>
import debounce from 'lodash.debounce'
import { getStock } from '@/api/other'
export default {
    props: {
        paramObj: {
            type: Object,
            default: () => {},
            required: true,
        }
    },
    data: function() {
        return {
            stockArr: [],
            stock_code: '',
            loading: false,
        }
    },
    created() {
        if (this.paramObj?.ssecname) {
            this.stock_code = this.paramObj.ssecname
        }
        this.changeStock = debounce(this.changeStock, 500)
    },
    methods: {
        handleStockList(value) {
            if (value && value instanceof Array && value.length > 0) {
                this.stockArr = value.map((item) => {
                    return {
                        label: item.sCHNShortName || item.sPlateName,
                        value: item.sDtSecCode,
                    }
                })
            }
        },
        searchStock(value) {
            this.loading = true
            getStock({
                key: value,
                type: 2, // 0|只返回A股， 1|A股、港美股， 2|返回a股、港美股、题材、板块、
            }).then((res) => {
                this.loading = false
                if (res && res instanceof Object && res.vPlateItem && res.vPlateItem.length > 0) {
                    this.handleStockList(res.vPlateItem)
                } else if (res && res instanceof Object && res.vStockItem && res.vStockItem.length > 0) {
                     this.handleStockList(res.vStockItem)
                }
            })
        },
        changeStock(value) {
            let current = this.stockArr.filter(item => item.value === value)[0]
            this.paramObj.ssecname = current.label
            this.paramObj.sdtseccode = current.value
        },
    }
}
</script>
<style lang="less" scoped>
</style>