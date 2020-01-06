export default [
  {
    key: "payManage",
    title: "代发管理",
    icon: "iconshenbao",
    children: [
      {
        key: "payBatch",
        title: "批量代发",
        url: "/pay-batch"
      },
      {
        key: "payRecord",
        title: "批量代发记录",
        url: '/pay-record'
      },
      {
        key: "payOrder",
        title: "代发订单",
        url: '/pay-order'
      }
    ]
  },
  {
    key: "withdrawal",
    title: "账户管理",
    icon: "icongongzifafang",
    children: [
      {
        key: "account",
        title: "账户管理",
        icon: "iconshouye",
        url: "/account"
      },
      {
        key: "rechargeRecord",
        title: "充值记录",
        url: "/recharge-record"
      },
      {
        key: "withdrawalRecord",
        title: "提现记录",
        url: '/withdrawal-record'
      },
    ]
  },
];
