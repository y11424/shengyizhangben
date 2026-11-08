/* ============================================================
   生意账本产品页 · 唯一需要修改的文件
   ------------------------------------------------------------
   现在安装包直接放在 assets/apk/ 里，用户点按钮就在浏览器下载，不用网盘。
   每次发新版：
     1. 专业版先递增 versionCode 跑 bash build.sh（BUILD_DATE 别动），
        取 dist 里那个「_release_」已签名包；通用版同理。
     2. 用新 APK **覆盖同名文件** assets/apk/pro.apk（或 general.apk）。
        文件名固定，所以网页链接不用改；只把 download.local.fileName
        里的版本号顺手改成新的，用户下载到的文件名才会带新版本号。
     3. 改 products.xxx.version / versionCode / released。
     4. changelog 加一条、site.updatedAt 改成当天日期。
     5. 迅雷网盘只作为备用：只有网盘里换了文件时才需要改
        download.url / code / shareText。
   改完重新上传/推送，网址不变，访客刷新即生效。无需编译、无需数据库。

   download.mode = 'local' 用网页直下；临时切回 'pan' 则主按钮回迅雷。
   ============================================================ */

window.SITE_DATA = {
  site: {
    updatedAt: '2026-11-08',
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
        mode: 'local',
        local: {
          file: 'assets/apk/pro.apk',
          fileName: '生意账本-回收专业版_3.7-Pro.apk',
          size: '2.88 MB',
        },
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
        mode: 'local',
        local: {
          file: 'assets/apk/general.apk',
          fileName: '生意账本-通用版_3.7.apk',
          size: '3.40 MB',
        },
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
      date: '2026-11-08',
      items: [
        '修复：物品编辑里期初库存、收购价显示成 1,200 这类带千分位的数字时，不改直接保存会提示「请输入有效的库存数」',
        '数量栏算式支持带千分位的写法（如 1,200+100）',
        '本金追加/取出、首次设置经营本金同样容错逗号与全角符号',
      ],
    },
    {
      product: '通用版',
      version: '3.7',
      date: '2026-11-08',
      items: [
        '修复：物品编辑的期初库存、收购价带千分位时无法保存',
        '数量算式、本金输入同样容错逗号与全角符号',
      ],
    },
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
