export default {
    // 需要在module中加一个命名空间namespaced: true 属性，否则命名无法暴露出来，导致mapGetters获取不到module
    namespaced: true,
    state: () => ({
        userInfo: {}
    }),
  
    // state：当前module下的状态；getter：待写；rootState：根moudle下的状态
    getters: {
        userInfo: (state) => {
            return  state.userInfo
        },
    },
    mutations: {
        setState: function (state, payload = {}) {
            if (Object.keys(payload).length > 0) {
                Object.keys(payload).forEach((val) => {
                    state[val] = payload[val]
                })
            }
        },
        setUserInfo(state, value) {
            state.userInfo = value
        }
    },
    actions: {
        // setUserInfo: async (context) => {
        //     const { data } = await API.user.getUserCorpDetail();
        //     context.commit('setState', { userInfo: data })
        // }
    },
    
  }
    