<template>
    <div class="quick_select_stock">
        <h3>近期更新数据</h3>
        <ul>
            <li 
                v-for="item in apiList"
                :key="item.id"
                @click="selectApi(item)"
            >
            {{ item.api_name }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            apiList: []
        }
    },
    created() {
        this.getApiList()
    },
    methods: {
        // 获取接口
        getApiList() {
            return new Promise((resolve, reject) => {
                let api_list = [{
                    api_desc: "[{\"name\":\"sdtseccode\",\"defaultValue\":\"\",\"values\":[\"seccode\"]}]",
                    api_header: "{\"Content-Type\":\"application/json\"}",
                    api_method: "POST",
                    api_name: "分时行情",
                    api_params: "{\"sdtseccode\":\"001336\"}",
                    api_params_desc: "",
                    api_url: "https://dtdataapi.wedengta.com/PerformanceData/QT_PerformanceData/Performance_minute",
                    id: 1,
                }]
                this.apiList = api_list
                resolve(api_list)
            })
        },
        selectApi(item) {
            this.$emit('otherSelectWay', item.id)
        }
    }
}
</script>
<style lang="less" scoped>
.quick_select_stock {
    margin-top: 24px;
    > h3 {
        color: #FFB99A;
        margin-bottom: 12px;
    }
    > ul {
        display: flex;
        flex-wrap: wrap;
        > li {
            height: 30px;
            background: #999DC3;
            border-radius: 15px 15px 15px 15px;
            opacity: 1;
            line-height: 30px;
            padding: 0 12px;
            margin-right: 24px;
            cursor: pointer;
            margin-bottom: 16px;
            color: #252525;
            &:hover {
                color: #fff;
                background: linear-gradient(180deg, var(--main-color) 0%, #4A8BFC 100%);
            }
        }
    }
}
</style>