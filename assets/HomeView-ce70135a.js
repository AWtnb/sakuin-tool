import{S as m}from"./SectionEnd-ac0d5718.js";import{_ as d,c as r,o as p,a as u,b as t,F as h,r as _,p as $,d as x,e as c,f as S}from"./index-53cf79c6.js";const g="/sakuin-tool/assets/definition-635d5011.png",w={name:"Definition"},y=r('<h2>「索引」の定義</h2><div><img src="'+g+'" alt="索引の定義"></div><ul><li>項目が2文字の場合もスペースは入れない<ul><li>参考：<a href="https://www.soumu.go.jp/menu_news/s-news/01toukatsu01_02000186.html">機械判読可能なデータ表記方法</a>（総務省）</li></ul></li><li>ノンブル：<ul><li>項目との間は2倍アキ</li><li>ノンブル間は半角カンマ＆半角アキ</li><li>3つ以上連続する場合は<code>–</code>（enダーシ）でつなぐ</li></ul></li><li>見よ項目： <ul><li>見よ先の指示は<code>　→</code>（1倍アキ＆右矢印）</li><li>参照先の項目では<code>（）</code>（全角丸パーレン）内に見よ元項目を示す</li></ul></li><li>子項目： <ul><li>1字下げ（先頭に1倍アキ）</li><li>省略部分は<code>――</code>（2倍ダーシ）</li></ul></li></ul>',3);function I(e,o,a,i,s,n){return y}const V=d(w,[["render",I]]);const b={name:"Steps"},k=r("<h2 data-v-fc65c14d>手順</h2><h3 data-v-fc65c14d>新規に作成するとき</h3><ol data-v-fc65c14d><li data-v-fc65c14d><code data-v-fc65c14d>Prepare</code>メニューから索引を Excel に拾うための雛形を作る </li><li data-v-fc65c14d>作成した Excel 上に索引を記入していく</li><li data-v-fc65c14d><code data-v-fc65c14d>Format</code>メニューで拾ったデータを整形する<ol data-v-fc65c14d><li data-v-fc65c14d>項目ごとに名寄せする</li><li data-v-fc65c14d>名寄せした状態に対して読み仮名を取得する</li><li data-v-fc65c14d>配列読みで並べ替える→<strong data-v-fc65c14d>ひとまず完成！</strong></li></ol></li><li data-v-fc65c14d>微調整時は<code data-v-fc65c14d>Adjust</code>メニュー</li></ol><h3 data-v-fc65c14d>旧版データがあるとき：<code data-v-fc65c14d>Reuse</code>メニュー</h3><ol data-v-fc65c14d><li data-v-fc65c14d>データの事前整形</li><li data-v-fc65c14d>子項目の復元</li><li data-v-fc65c14d>名寄せの解除（「名開き」）</li></ol>",5);function D(e,o,a,i,s,n){return k}const E=d(b,[["render",D],["__scopeId","data-v-fc65c14d"]]);const H={name:"Home",components:{Definition:V,Steps:E}},l=e=>($("data-v-148f7b88"),e=e(),x(),e),N=l(()=>c("h1",null,"索引ツール",-1)),B=l(()=>c("p",null,"索引の整形／再利用に便利なツール類です。",-1)),F=l(()=>c("details",null,[c("summary",null,"注意事項"),c("ul",null,[c("li",null,"本ツールでの索引整形は一定の法則にしたがって機械的に一括処理しています。"),c("li",null,[S("例外的なデータには対応できません。精度にも限界がありますので"),c("strong",null,"必ず目でも校正してください。")]),c("li",null,"本ツールが外部にデータを送信することは一切ありません。")])],-1));function j(e,o,a,i,s,n){const f=_("Definition"),v=_("Steps");return p(),u(h,null,[N,B,F,t(f),t(v)],64)}const A=d(H,[["render",j],["__scopeId","data-v-148f7b88"]]),C={class:"home"},T={__name:"HomeView",setup(e){return(o,a)=>(p(),u("div",C,[t(A),t(m)]))}};export{T as default};