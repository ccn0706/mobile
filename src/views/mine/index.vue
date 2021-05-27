<template>
  <div>
    <div class="recharge-box">
      <p class="title">充值</p>
      <router-link to="/rechargeDetail"
        >查看充值明细
      </router-link>
      <div class="money">
        <p class="money-title">账户余额</p>
        <p>
          <span class="money-num">{{ money }}</span
          ><span class="money-title">元</span>
        </p>
      </div>
      <div class="money-list">
        <van-button
          v-for="(item, index) in moneyList"
          :key="index"
          :class="{ activeBtn: index == isActive }"
          @click="changeIndex(index)"
          >{{ item }}元</van-button
        >
      </div>
      <div class="confirm-btn flex-x-center flex-y-center">
        <!-- <van-button class="add-btn" @click="clickAdd(1)">增加签名</van-button> -->
        <van-button class="confirm-btns" @click="clickSubmit">确认</van-button>
      </div>
    </div>
    <foot-tabbar />
  </div>
</template>

<script>
import FootTabbar from "@/components/FootTabbar";
// import { rechargeMoney, getInfo } from '@api/home'
// 微信支付
import wx from 'weixin-js-sdk'
export default {
  name: "Mine",
  data() {
    return {
      moneyList: [0.01, 50, 100, 200, 500, 1000, 3000, 5000, 10000],
      isActive: 0,
      money: 0,
    };
  },
  created() {},
  methods: {
    changeIndex(index) {
      this.isActive = index;
    },
    clickSubmit() {
      var that = this;
      const money = this.moneyList[this.isActive];
      //请求后台接口获取数据 准备进行微信支付
      rechargeMoney({ money: money }).then((res) => {
        //成功状态下
        if (res.code == 200) {
          // 存储微信支付数据data
          let data = res.data;
          console.log(data);
          //调用微信支付
          this.wexinPay(
            {
              appId: data.appId, //公众号
              timeStamp: data.timeStamp, //时间戳
              nonceStr: data.nonceStr, //随机字符串
              package: data.packageValue, //微信支付串
              signType: data.signType, //签名类型
              outTradeNo: "", //支付订单编号
              paySign: data.sign, //签名
            },
            //成功回调函数
            (res) => {
              // 充值成功，金额改变
              getInfo().then((res) => {
                if (res.code === 200) {
                  that.$store.commit("set_money", res.data.balance);
                  localStorage.setItem("money", res.data.balance);
                }
              });
              this.$router.push({
                path: "/rechargeDetail",
                query: { type: "2" },
              });
            },
            (res) => {
              this.$notify({
                type: "danger",
                message: "支付失败",
              });
            }
          );
        } else {
          this.$notify({
            type: "danger",
            message: "支付异常",
          });
        }
      });
    },
    wexinPay(data, cb, errorCb) {
      //获取后台传入的数据
      let appId = data.appId;
      let timestamp = data.timeStamp;
      let nonceStr = data.nonceStr;
      let paySign = data.paySign;
      let outTradeNo = data.outTradeNo;
      let packages = data.package;
      let signType = data.signType;
      console.log("发起微信支付");
      //下面要发起微信支付了
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        paySign: paySign, // 必填，签名，见附录1
        jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名
          success: function (res) {
            // 支付成功后的回调函数
            cb(res);
          },
          fail: function (res) {
            //失败回调函数
            errorCb(res);
          },
        });
      });
      wx.error(function (res) {
        console.log("config信息验证失败");
      });
    },
  },
  components: {
    FootTabbar,
  },
};
</script>

<style lang='less' scoped>
.recharge-box {
  margin: 20px;
  img {
    width: 6px;
    height: 11px;
  }
  .title {
    font-size: 28px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 10px;
  }
  a {
    color: #666666;
    font-size: 14px;
    display: block;
  }
  .money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    border-bottom: 1px solid #f9f9f9;
    padding-bottom: 19px;
    .money-title {
      color: #333333;
      font-size: 15px;
    }
    .money-num {
      font-size: 24px;
      font-weight: 700;
      color: #333333;
      margin-right: 2px;
    }
    p {
      align-items: center;
      display: flex;
    }
  }
  .money-list {
    margin-top: 15px;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    text-align: justify;
    .van-button {
      border: none;
      width: 104px;
      height: 74px;
      font-size: 18px;
      color: #828284;
      opacity: 1;
      background: #f8f9fb;
      border-radius: 10px;
      margin-top: 12px;
    }
    .activeBtn {
      background: #07cb8a;
      color: #ffffff;
    }
  }
  //解决flex布局解决最后一排数量不够自动向两端排列问题
  .money-list:after {
    content: "";
    width: 104px;
  }
  .confirm-btns {
    bottom: 10px;
    font-size: 17px;
    color: #fff;
    width: 345px;
    height: 45px;
    opacity: 1;
    background: linear-gradient(90deg, #10d594 1%, #00c483 100%);
    border-radius: 23px;
    box-shadow: 0px 3px 6px 0px rgba(0, 196, 131, 0.2);
  }
}
</style>
