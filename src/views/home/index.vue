<template>
  <div>
    首页
    <div>{{val | statusName}}</div>
    <h1>Vuex 测试</h1>
    <div>
      <h4>vuex的state值：{{num}}</h4>
      <h4>vuex的getters值：{{powerNum}}</h4>
      <h4>vuex的getters第二个参数：{{showGetters}}</h4>
      <button @click="add">通过mutation状态更新默认+1</button>
      <button @click="add10">通过mutation状态更新传值+10</button>
      <div>姓名:{{info.name}}</div>
      <div>年龄:{{info.age}}</div>
      <button @click="updataInfo">修改姓名</button>
    </div>
    <foot-tabbar />
  </div>
</template>

<script>
import FootTabbar from '@/components/FootTabbar'
export default {
  name: "Home",
  data() {
    return {
      val:0
    };
  },
  computed:{
    num(){
      return this.$store.state.num
    },
    powerNum(){
      return this.$store.getters.powerNum
    },
    showGetters(){
      return this.$store.getters.showGetters
    },
    info(){
      return this.$store.state.info
    }
  },
  created() {},
  methods: {
    add(){
      this.$store.commit('add')
    },
    add10(){
      this.$store.commit('add10',10)
    },
    updataInfo(){
      // 同步修改
      // this.$store.commit({
      //   type:'updateInfo',
      //   name:'李四'
      // })
      // 异步修改
      this.$store.dispatch('updataInfo','我是传递信息').then(res=>{
        console.log('里面已经完成了')
        console.log('action返回的res',res)
      })
    }
  },
  components: {
      FootTabbar
  },
};
</script>

<style lang='less' scoped>
</style>
