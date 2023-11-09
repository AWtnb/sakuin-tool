import{S as $}from"./SectionEnd-00c69fac.js";import{S as w,a as L}from"./SimpleTextarea-967c8544.js";import{R as C}from"./ResultBox-21864a1e.js";import{_ as P,j as k,i as c,o as m,a as p,d as l,u as d,b as a,t as S,F as b,g as A,h as B,c as R,r as T,x as U}from"./index-c967e13c.js";import{B as F}from"./BeforeAfter-c9787f4d.js";import{E as x,A as V}from"./entry-1c7d23b5.js";import{C as j}from"./CopyButton-d9147153.js";const H=f=>{const t=String(f).match(/\d[\d,\u2013]*$/);return t?t[0]:""},O=["‐","‑","‒","–","—","―","－","─","-"],N=f=>{let t=f.split(",")[0];return t=t.replace(/\d+$/,""),O.includes(t.at(-1))&&t.at(-2).match(/\d/)&&(t=t.replace(/.$/,""),t=t.replace(/\d+$/,"")),t};class E{constructor(t){this.valiation=O,this.rawStr=t}format(t="–"){let e=this.rawStr;return this.valiation.forEach(o=>{e=e.replaceAll(o,"-")}),e.replace(/\u002d+/g,t)}getHeaderLen(){let t=0;for(let e=0;e<this.rawStr.length&&this.valiation.includes(this.rawStr[e]);e++)t+=1;return t}getTrailerLen(){let t=0;for(let e=this.rawStr.length-1;0<=e&&this.valiation.includes(this.rawStr[e]);e--)t+=1;return t}formatChildEntry(){const t=this.getHeaderLen(),e=t>0?"――":"",o=this.getTrailerLen(),h=o>0?"――":"";return e+this.rawStr.slice(t,this.rawStr.length-o)+h}}class W{constructor(t){this.prefix=t.startsWith(" ")||t.startsWith("　")?"　":"";const e=String(t).replace(/\uff0c/g,",").replace(/\s+/g,""),o=H(new E(e).format());if(o.length>0){this.address=o.replaceAll(",",", "),this.name=N(e);return}if(this.address="",e.indexOf("→")!=-1){this.name=e.replace(/→/,"　→");return}this.name=e}getFormattedLine(){const t=this.prefix+new E(this.name).formatChildEntry();return this.address.length>0?t+"　　"+this.address:t}}const I=R("<h2 data-v-580074df>ゲラから抽出した索引データの整形</h2><ul data-v-580074df><li data-v-580074df><strong data-v-580074df>ゲラからテキストを抽出すると長い行が折り返されて改行になっていることがあります。</strong><ul data-v-580074df><li data-v-580074df>そうした箇所は先に手動で整形してください。</li></ul></li><li data-v-580074df>見よ項目の矢印の前のアキを1倍モノに統一します。</li><li data-v-580074df>連続するノンブルを示すダーシの種類を<code data-v-580074df>–</code>（enダーシ）に統一します。</li><li data-v-580074df>子項目のダーシの種類を<code data-v-580074df>――</code>（2倍ダーシ）に統一します。</li></ul>",2),D={key:0},M={class:"detail"},q={class:"original"},z={class:"formatted"},G={__name:"FormatOld",setup(f){const t=n=>n.map(s=>String(s).trimEnd().replace(/\t/,"　　")).map(s=>({formatted:new W(s).getFormattedLine(),original:s})),e=k(""),o=c(()=>L(e.value)),h=c(()=>t(o.value)),g=c(()=>h.value.map(n=>n.formatted).join(`
`)),u=c(()=>h.value.filter(n=>n.formatted!=n.original)),r=c(()=>e.value.length<1?"":u.value.length>0?u.value.length+"箇所を修正しました！":"問題のある箇所は見当たりませんでした！");return(n,s)=>(m(),p(b,null,[I,l(w,{onUpdateContent:s[0]||(s[0]=i=>e.value=i.content)}),l(C,{result:d(g)},null,8,["result"]),a("div",null,[a("h4",null,S(d(r)),1),d(u).length?(m(),p("ol",D,[(m(!0),p(b,null,A(d(u),(i,_)=>(m(),p("li",{key:_},[a("ul",M,[a("li",q,S(i.original),1),a("li",z,S(i.formatted),1)])]))),128))])):B("",!0)])],64))}},J=P(G,[["__scopeId","data-v-580074df"]]),K="/sakuin-tool/assets/before-553b588b.png",Q="/sakuin-tool/assets/after-cef2c7b2.png",X=a("h2",null,"子項目の復元",-1),Y={__name:"ResolveChild",setup(f){const t=r=>{if(r.length<1)return[];const n=[],s=[];n.push(r[0]),s.push(new x(r[0]).basename);for(let i=1;i<r.length;i++){const _=new x(r[i]),v=_.basename;if(v.startsWith("――")){const y=s.at(-1)+v.substring(2);n.push(y+"　　"+_.address)}else if(v.endsWith("――")){const y=v.substring(0,v.length-2)+s.at(-1);n.push(y+"　　"+_.address)}else n.push(_.rawStr),s.push(v)}return n},e=k(""),o=c(()=>L(e.value)),h=c(()=>o.value.map(r=>r.trim()).filter(r=>r.length)),g=c(()=>t(h.value)),u=c(()=>g.value.join(`
`));return(r,n)=>(m(),p(b,null,[X,l(F,{beforePath:d(K),afterPath:d(Q)},null,8,["beforePath","afterPath"]),l(w,{onUpdateContent:n[0]||(n[0]=s=>e.value=s.content)}),l(C,{result:d(u)},null,8,["result"])],64))}},Z="/sakuin-tool/assets/before-e62df1a7.png",tt="/sakuin-tool/assets/after-49f03dfc.png",et={name:"UngroupedTable",props:{lines:Array,resultStr:String},components:{CopyButton:j}},nt={key:0},rt={class:"limit-height"},st=a("thead",null,[a("tr",null,[a("th",null,"項目"),a("th",null,"ノンブル")])],-1);function at(f,t,e,o,h,g){const u=T("CopyButton");return e.lines.length?(m(),p("div",nt,[a("div",rt,[a("table",null,[st,a("tbody",null,[(m(!0),p(b,null,A(e.lines,(r,n)=>(m(),p("tr",{key:n},[a("td",null,S(r.name),1),a("td",null,S(r.nombre),1)]))),128))])])]),l(u,{copyStr:e.resultStr},null,8,["copyStr"])])):B("",!0)}const ot=P(et,[["render",at]]),lt=a("h2",null,"名開き",-1),ut=a("p",null,"※項目とノンブルが Excel 上で2列に分かれていても大丈夫です。",-1),it={__name:"Ungroup",setup(f){const t=u=>{const r=[];return u.filter(n=>n.trim()).map(n=>n.replace("	","　　")).forEach(n=>{const s=new x(n);if(s.isReference){r.push({name:s.name,nombre:""});return}new V(s.address).nombres.forEach(i=>{const _=i.hyphenated?String(i.intValue):i.getText();r.push({name:s.name,nombre:_})})}),r},e=k(""),o=c(()=>L(e.value)),h=c(()=>t(o.value)),g=c(()=>h.value.map(u=>`${u.name}	${u.nombre}`.trimEnd()).join(`
`));return(u,r)=>(m(),p(b,null,[lt,l(F,{beforePath:d(Z),afterPath:d(tt)},null,8,["beforePath","afterPath"]),ut,l(w,{onUpdateContent:r[0]||(r[0]=n=>e.value=n.content)}),l(ot,{lines:d(h),resultStr:d(g)},null,8,["lines","resultStr"])],64))}},ct={class:"reuse"},dt=a("h1",null,"旧版索引の再利用",-1),St={__name:"ReuseView",emits:["updateState"],setup(f,{emit:t}){return U(()=>{t("updateState",{isRevision:!0})}),(e,o)=>(m(),p("div",ct,[dt,l(J),l($),l(Y),l($),l(it),l($)]))}};export{St as default};
