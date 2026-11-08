/* 生意账本产品页 · 交互与渲染
   页面里所有「会变的内容」都来自 data.js，本文件一般不用改。 */
(function () {
  'use strict';

  var D = window.SITE_DATA;
  if (!D) return;

  var $ = function (s) { return document.querySelector(s); };

  /* ---------------- 提示条 ---------------- */
  var toastTimer;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        toast('已复制，粘贴到微信或浏览器即可');
      }, function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      toast('已复制，粘贴到微信或浏览器即可');
    } catch (e) {
      toast('复制失败，请长按选中文字复制');
    }
    document.body.removeChild(ta);
  }

  /* ---------------- 公告 ---------------- */
  if (D.site.notice && D.site.notice.trim()) {
    $('#notice-slot').innerHTML =
      '<div class="wrap"><div class="notice">' + D.site.notice + '</div></div>';
  }

  /* ---------------- 产品卡片 ---------------- */
  function renderCards() {
    var html = '';
    ['pro', 'general'].forEach(function (key) {
      var p = D.products[key];
      var featured = key === 'pro' ? ' featured' : '';
      var feats = p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('');
      var docs = p.manuals.map(function (m) {
        return '<a href="' + m.file + '" target="_blank" rel="noopener">' + m.label + '</a>';
      }).join('');
      var local = p.download.mode === 'local' && p.download.local;
      var mainBtn = local
        ? '<a class="btn primary" href="' + local.file + '" download="' + local.fileName + '">' +
            p.download.label + ' · ' + local.size + '</a>'
        : '<a class="btn primary" href="' + p.download.url + '" target="_blank" rel="noopener">' +
            p.download.label + '</a>';
      var backup =
        '<div class="backup-line">' +
          '<span>备用下载</span>' +
          '<a href="' + p.download.url + '" target="_blank" rel="noopener">迅雷网盘</a>' +
          '<span>提取码 <b>' + p.download.code + '</b></span>' +
          '<button class="btn tiny" type="button" data-copy="code:' + key + '">复制提取码</button>' +
          '<button class="btn tiny" type="button" data-copy="share:' + key + '">复制分享文案</button>' +
        '</div>';
      html +=
        '<article class="card' + featured + '">' +
          '<span class="badge">' + p.badge + '</span>' +
          '<h3>' + p.name + '</h3>' +
          '<p class="tagline">' + p.tagline + '</p>' +
          '<p class="audience"><b>适用：</b>' + p.audience + '</p>' +
          '<ul>' + feats + '</ul>' +
          '<div class="meta">' +
            '<span>当前版本 <b>' + p.version + '</b></span>' +
            '<span>更新日期 <b>' + p.released + '</b></span>' +
            '<span>安卓 APK · 覆盖安装不丢数据</span>' +
          '</div>' +
          '<div class="card-actions">' + mainBtn + '</div>' +
          (local ? '<p class="direct-note">安装包就在本站，点击直接下载，不用网盘、不用提取码。</p>' : '') +
          backup +
          '<div class="doc-links">' + docs + '</div>' +
        '</article>';
    });
    $('#product-cards').innerHTML = html;
  }

  /* ---------------- 下载条 / 联系方式 / 页脚 ---------------- */
  function renderMisc() {
    [['#dl-pro', 'pro', '下载回收专业版'], ['#dl-general', 'general', '下载通用版']].forEach(function (row) {
      var a = $(row[0]);
      var d = D.products[row[1]].download;
      if (d.mode === 'local' && d.local) {
        a.href = d.local.file;
        a.setAttribute('download', d.local.fileName);
        a.removeAttribute('target');
        a.textContent = row[2] + ' · ' + d.local.size;
      } else {
        a.href = d.url;
        a.setAttribute('target', '_blank');
        a.removeAttribute('download');
        a.textContent = row[2];
      }
    });
    $('#contact-email').textContent = D.contact.email;
    $('#contact-wechat').textContent = D.contact.wechat;
    $('#footer-date').textContent = D.site.updatedAt;
  }

  /* 微信内置浏览器会拦截 APK 下载，只在微信里提示 */
  function setupWechatTip() {
    if (!/MicroMessenger/i.test(navigator.userAgent)) return;
    var sec = $('#download');
    if (!sec) return;
    var tip = document.createElement('div');
    tip.className = 'wechat-tip';
    tip.innerHTML = '当前是在微信中打开：微信会拦截 APK 下载。请点右上角「…」→「在浏览器打开」，再点下载按钮。';
    sec.insertBefore(tip, sec.querySelector('.download-strip'));
  }

  /* ---------------- 更新日志 ---------------- */
  function renderChangelog() {
    $('#changelog-list').innerHTML = D.changelog.map(function (c) {
      return '<div class="log-item">' +
        '<div class="log-head"><b>' + c.product + ' ' + c.version + '</b><span>' + c.date + '</span></div>' +
        '<ul>' + c.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' +
      '</div>';
    }).join('');
  }

  /* ---------------- 资料下载 ---------------- */
  function renderDocs() {
    $('#docs-list').innerHTML = D.docs.map(function (d) {
      return '<li><a href="' + d.file + '" target="_blank" rel="noopener">' + d.label + '</a></li>';
    }).join('');
  }

  /* ---------------- 界面截图 ---------------- */
  var SHOTS = {
    pro: [
      ['pro_home.png', '回收品类：收购价、单位与实时库存'],
      ['pro_create.png', '开单页：企业对接单开关与合规高亮卡片'],
      ['pro_compliance.png', '合规信息登记表单'],
      ['pro_detail.png', '订单详情：备注、合规信息、明细与总计'],
      ['pro_export.png', '导出 CSV / PDF 单据 / 正规单据'],
      ['pro_ledger.png', '台账与报表：筛选、汇总与导出'],
      ['pro_stats.png', '统计：收入、支出与净结余'],
      ['pro_backup.png', '数据管理：备份、恢复与换机分享'],
      ['pro_settings.png', '设置：企业档案与单据打印备注'],
      ['pro_about.png', '关于：联系方式与正版声明'],
    ],
    lite: [
      ['lite_orders.png', '订单页：今日收支与订单列表'],
      ['lite_items.png', '物品页：名称、单价、单位与库存'],
      ['lite_stats.png', '统计：按日期 / 按物品'],
      ['lite_create.png', '开单页：数量、单价自动算小计'],
      ['lite_calc.png', '数量栏可直接输入算式'],
      ['lite_settings.png', '设置：经营类型、本金与偏好'],
    ],
  };

  function renderGallery() {
    ['pro', 'lite'].forEach(function (key) {
      $('#gallery-' + key).innerHTML = SHOTS[key].map(function (s) {
        return '<figure><img src="assets/img/' + s[0] + '" alt="' + s[1] +
          '" loading="lazy" data-zoom><figcaption>' + s[1] + '</figcaption></figure>';
      }).join('');
    });
  }

  /* ---------------- 事件 ---------------- */
  function bind() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-copy]');
      if (btn) {
        var spec = btn.getAttribute('data-copy');
        if (spec === 'email') return copyText(D.contact.email);
        if (spec === 'wechat') return copyText(D.contact.wechat);
        var parts = spec.split(':');
        var p = D.products[parts[1]];
        if (!p) return;
        return copyText(parts[0] === 'share' ? p.download.shareText : p.download.code);
      }

      var tab = e.target.closest('.tab');
      if (tab) {
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var which = tab.getAttribute('data-tab');
        $('#gallery-pro').classList.toggle('hidden', which !== 'pro');
        $('#gallery-lite').classList.toggle('hidden', which !== 'lite');
        return;
      }

      var img = e.target.closest('[data-zoom]');
      if (img) {
        $('#lightbox-img').src = img.src;
        $('#lightbox').classList.remove('hidden');
        return;
      }

      if (e.target.closest('#lightbox')) {
        $('#lightbox').classList.add('hidden');
        $('#lightbox-img').src = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') $('#lightbox').classList.add('hidden');
    });
  }

  renderCards();
  renderMisc();
  setupWechatTip();
  renderChangelog();
  renderDocs();
  renderGallery();
  bind();
})();
