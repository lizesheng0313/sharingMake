<template>
    <div class="page-module batch-edite">
        <div class="div-module">
            <el-steps :active="currStep" finish-status="success" style="margin-bottom:30px;">
                <el-step title="上传数据"></el-step>
                <el-step title="确认订单"></el-step>
                <el-step title="代发支付"></el-step>
            </el-steps>
            <template v-if="currStep == 0">
                <dataCreate v-if="salaryType == 'create'"></dataCreate>
                <dataImport v-if="salaryType == 'import'"></dataImport>
            </template>
            <confirmOrder v-if="currStep == 1"></confirmOrder>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import dataCreate from "./components/dataCreate";
import dataImport from "./components/dataImport";
import confirmOrder from "./components/confirmOrder";
export default {
    data() {
        return {
            salaryType: ""
        };
    },
    computed: {
        ...mapState("payManageStore", {
            currStep: "currStep",
            salaryInfo: "salaryInfo"
        })
    },
    components: {
        dataCreate,
        dataImport,
        confirmOrder
    },
    created() {
        const { salaryInfo } = this;
        if (salaryInfo.isContinue) {
            //继续代付
            this.$store.commit("payManageStore/SET_CURRSTEP", 1);
        } else {
            //重置currStep
            this.$store.commit("payManageStore/SET_CURRSTEP", 0);
        }
    },
    mounted() {
        const { salaryType } = this.salaryInfo;
        this.salaryType = salaryType;
    }
};
</script>

<style lang="scss" scoped>
.batch-edite {
  height:calc(100vh - 90px);
  overflow: auto;
}
</style>
