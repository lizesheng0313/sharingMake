<template>
    <div class="result">
        <div class="wrap">
            <div>
                <p><img :src="img" alt=""></p>
                <p class="title">成功</p>
            </div>
            <div class="tip">此页面五秒钟内自动关闭，请在原页面继续操作。</div>
            <el-button @click="handleConfirm">确定</el-button>
        </div>

    </div>
</template>


<script>
// 提现            withdraw
// 修改密码        changePwd
// 激活账户        activateAccount
// 确认代发        confirmPay
// 重发            retry
import utils from "@/utils/utils";
import img from "@/assets/images/duihao.png";
export default {
    data() {
        return {
            img: img,
            type: "",
            message: "",
            success: true
        };
    },
    mounted() {
        const type = utils.getUrlKey("type");
        this.type = type;
        setTimeout(this.renderType, 5e3);
    },
    computed: {},
    methods: {
        renderType() {
            const { type } = this;
            let url = "/account";
            switch (type) {
                case "withdraw":
                    url: "/account";
                    break;
                case "changePwd":
                    url: "/account";
                    break;
                case "activateAccount":
                    url: "/account";
                    break;
                case "confirmPay":
                    url: "/pay-record";
                    break;
                case "retry":
                    //重定向到record-detail，需要多返回一个id
                    url: "/pay-record";
                    break;
                default:
                    break;
            }
            this.$router.push(url);
        },
        handleConfirm() {
            this.renderType();
        }
    }
};
</script>

<style lang="scss" scoped>
.result {
    .wrap {
        padding: 50px;
        text-align: center;
        overflow: hidden;
        img {
            width: 100px;
        }
    }
    .title {
        font-size: 22px;
        font-weight: 400;
        margin-top: 10px;
    }
    .tip {
        margin: 20px 0;
    }
}
</style>
