// 类似Vue的计算属性，两个参数（state，getters）
const getters ={
    powerNum(state){
        return state.num*state.num
    },
    showGetters(state,getters){
        return getters.powerNum + 100
    }
}

export default getters