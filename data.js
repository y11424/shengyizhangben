/* ============================================================
   生意账本产品页 · 唯一需要修改的文件
   ------------------------------------------------------------
   每次发新版，只改下面这几处：
     1. products.xxx.version / versionCode / released
     2. products.xxx.download.url / code / shareText
     3. changelog 里加一条新版本
     4. site.updatedAt（页面底部「资料更新日期」）
   改完保存，重新发布（或重新上传整个 website 目录）即可，
   网址不变，访客刷新就能看到新版。无需编译、无需数据库。
   ============================================================ */

window.SITE_DATA = {
  site: {
    updatedAt: '2026-11-07',
    notice: '', // 需要置顶公告时填一句话，留空则不显示
  },

  contact: {
    email: 'a1142466540@163.com',
    wechat: '16676793473',
  },

  products: {
    pro: {
      id: 'pro',
      name: '生意账本 · 回收专业版',
      short: '回收专业版',
      badge: '主推 · 回收站 / 中转站',
      tagline: '只做回收 / 收购这一件事。散户开单要快，企业整车过磅要全，两套流程互不打扰。',
      audience: '再生资源回收站、中转站、与企业工厂对接的经营者',
      version: '3.7 Pro',
      versionCode: 14,
      released: '2026-11-07',
      features: [
        '散户单与企业对接单双轨开单',
        '来源 / 去向 / 转运方 / 车牌 / 磅单号 / 收据号登记',
        'A4 正规回收单、再生资源出售单',
        '作业台账与汇总表，CSV / PDF / XLSX 导出',
        '企业档案抬头，单据与台账自动带上公司名称',
        '本地备份、恢复、同 WiFi 换机迁移',
      ],
      manuals: [
        { label: '完整使用说明书（PDF）', file: 'assets/doc/manual-pro.pdf' },
        { label: '快速上手 · 简略版（PDF）', file: 'assets/doc/manual-pro-quick.pdf' },
      ],
      download: {
        label: '下载回收专业版安装包',
        url: 'https://pan.xunlei.com/s/VP5pTXgAVbRIjGlc5W-OxemoA1?pwd=47y3',
        code: '47y3',
        shareText:
          '分享文件：\n' +
          '生意账本回收专业版\n' +
          '链接：https://pan.xunlei.com/s/VP5pTXgAVbRIjGlc5W-OxemoA1?pwd=47y3# 复制这段内容后打开手机迅雷App，查看更方便',
      },
    },

    general: {
      id: 'general',
      name: '生意账本 · 通用版',
      short: '通用版',
      badge: '经典 · 多行业',
      tagline: '回收 / 收购、零售店、又收又卖的混合经营都能用，安装后自己选经营类型。',
      audience: '零售店、混合经营的小商户、多行业开单记账',
      version: '3.7',
      versionCode: 13,
      released: '2026-11-07',
      features: [
        '首次打开可选回收 / 零售店 / 通用三种经营类型',
        '支出单、收入单开单，数量栏可直接输算式',
        '库存自动增减，低库存预警',
        '本金、收入支出、按日期 / 按物品统计',
        '物品与订单 CSV 导入导出，本地备份',
        '数据只存本机，不联网也能用',
      ],
      manuals: [
        { label: '通用版使用说明书（PDF）', file: 'assets/doc/manual-general.pdf' },
      ],
      download: {
        label: '下载通用版安装包',
        url: 'https://pan.xunlei.com/s/VP5pThKjpE_J8bXnTRxfw0AoA1?pwd=tmfy',
        code: 'tmfy',
        shareText:
          '分享文件：\n' +
          '生意账本\n' +
          '链接：https://pan.xunlei.com/s/VP5pThKjpE_J8bXnTRxfw0AoA1?pwd=tmfy# 复制这段内容后打开手机迅雷App，查看更方便',
      },
    },
  },

  changelog: [
    {
      product: '回收专业版',
      version: '3.7 Pro',
      date: '2026-11-07',
      items: [
        '「从备份恢复」支持授权备份文件夹，旧备份不再漏显示',
        '订单详情明细多时可滚动，总计与底部按钮保持不动',
        '新增「单据打印备注」全局开关，可决定单据带不带备注',
        '关于页补充开发者联系方式与正版声明',
      ],
    },
    {
      product: '通用版',
      version: '3.7',
      date: '2026-11-07',
      items: ['当前发行版本，详细更新内容请咨询开发者。'],
    },
  ],

  docs: [
    { label: '回收专业版 · 完整使用说明书', file: 'assets/doc/manual-pro.pdf' },
    { label: '回收专业版 · 快速上手（简略版）', file: 'assets/doc/manual-pro-quick.pdf' },
    { label: '通用版 · 使用说明书', file: 'assets/doc/manual-general.pdf' },
    { label: '正规回收单 · A4 样例', file: 'assets/doc/receipt-sample.pdf' },
  ],
};
