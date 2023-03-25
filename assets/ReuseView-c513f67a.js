import{S as w}from"./SectionEnd-c9716df7.js";import{P as L,a as B}from"./PasteBox-23b110c5.js";import{R as P}from"./ResultBox-7fe37b5b.js";import{_ as F,i as g,j as _,o as h,a as m,b as l,u as p,e as o,t as x,F as $,g as A,h as O,c as V,r as j}from"./index-71ca2f42.js";import{B as R}from"./BeforeAfter-0fe09635.js";import{E as C,A as H}from"./entryHandler-ea7f15d2.js";import{C as N}from"./CopyButton-32423f15.js";const T=d=>{const t=String(d).match(/\d[\d,\u2013]*$/);return t?t[0]:""},U=["‐","‑","‒","–","—","―","－","─","-"],W=d=>{let t=d.split(",")[0];return t=t.replace(/\d+$/,""),U.includes(t.at(-1))&&t.at(-2).match(/\d/)&&(t=t.replace(/.$/,""),t=t.replace(/\d+$/,"")),t};class E{constructor(t){this.valiation=U,this.rawStr=t}format(t="–"){let e=this.rawStr;return this.valiation.forEach(r=>{e=e.replaceAll(r,"-")}),e.replace(/\u002d+/g,t)}getHeaderLen(){let t=0;for(let e=0;e<this.rawStr.length&&this.valiation.includes(this.rawStr[e]);e++)t+=1;return t}getTrailerLen(){let t=0;for(let e=this.rawStr.length-1;0<=e&&this.valiation.includes(this.rawStr[e]);e--)t+=1;return t}formatChildEntry(){const t=this.getHeaderLen(),e=t>0?"――":"",r=this.getTrailerLen(),f=r>0?"――":"";return e+this.rawStr.slice(t,this.rawStr.length-r)+f}}class I{constructor(t){this.prefix=t.startsWith(" ")||t.startsWith("　")?"　":"";const e=String(t).replace(/\uff0c/g,",").replace(/\s+/g,""),r=T(new E(e).format());if(r.length>0){this.address=r.replaceAll(",",", "),this.name=W(e);return}if(this.address="",e.indexOf("→")!=-1){this.name=e.replace(/→/,"　→");return}this.name=e}getFormattedLine(){const t=this.prefix+new E(this.name).formatChildEntry();return this.address.length>0?t+"　　"+this.address:t}}const D=V("<h2 data-v-bffafd3c>ゲラから抽出した索引データの整形</h2><ul data-v-bffafd3c><li data-v-bffafd3c><strong data-v-bffafd3c>ゲラからテキストを抽出すると長い行が折り返されて改行になっていることがあります。</strong><ul data-v-bffafd3c><li data-v-bffafd3c>そうした箇所は先に手動で整形してください。</li></ul></li><li data-v-bffafd3c>見よ項目の矢印の前のアキを1倍モノに統一します。</li><li data-v-bffafd3c>連続するノンブルを示すダーシの種類を<code data-v-bffafd3c>–</code>（enダーシ）に統一します。</li><li data-v-bffafd3c>子項目のダーシの種類を<code data-v-bffafd3c>――</code>（2倍ダーシ）に統一します。</li></ul>",2),q={key:0},z={class:"detail"},G={class:"original"},J={class:"formatted"},K={__name:"FormatOld",setup(d){const t=n=>n.map(s=>String(s).trimEnd().replace(/\t/,"　　")).map(s=>({formatted:new I(s).getFormattedLine(),original:s})),e=g(""),r=g([]),f=g(""),b=_(()=>B(e.value)),v=_(()=>r.value.map(n=>n.formatted).join(`
`)),u=_(()=>r.value.filter(n=>n.formatted!=n.original)),c=()=>{r.value=[]},a=()=>{c(),r.value=t(b.value),u.value.length>0?f.value=u.value.length+"箇所を修正しました！":f.value="問題のある箇所は見当たりませんでした！"};return(n,s)=>(h(),m($,null,[D,l(L,{onUpdateContent:s[0]||(s[0]=i=>e.value=i.target.value),onButtonClicked:a}),l(P,{result:p(v)},null,8,["result"]),o("div",null,[o("h4",null,x(f.value),1),p(u).length?(h(),m("ol",q,[(h(!0),m($,null,A(p(u),(i,S)=>(h(),m("li",{key:S},[o("ul",z,[o("li",G,x(i.original),1),o("li",J,x(i.formatted),1)])]))),128))])):O("",!0)])],64))}},M=F(K,[["__scopeId","data-v-bffafd3c"]]),Q="/sakuin-tool/assets/before-553b588b.png",X="/sakuin-tool/assets/after-cef2c7b2.png",Y=o("h2",null,"子項目の復元",-1),Z={__name:"ResolveChild",setup(d){const t=a=>{const n=[],s=[];n.push(a[0]),s.push(new C(a[0]).basename);for(let i=1;i<a.length;i++){const S=new C(a[i]),y=S.basename;if(y.startsWith("――")){const k=s.at(-1)+y.substring(2);n.push(k+"　　"+S.address)}else if(y.endsWith("――")){const k=y.substring(0,y.length-2)+s.at(-1);n.push(k+"　　"+S.address)}else n.push(S.rawStr),s.push(y)}return n},e=g(""),r=g([]),f=_(()=>B(e.value)),b=_(()=>f.value.map(a=>a.trim()).filter(a=>a.length)),v=_(()=>r.value.join(`
`)),u=()=>{r.value=[]},c=()=>{u(),r.value=t(b.value)};return(a,n)=>(h(),m($,null,[Y,l(R,{beforePath:p(Q),afterPath:p(X)},null,8,["beforePath","afterPath"]),l(L,{onUpdateContent:n[0]||(n[0]=s=>e.value=s.target.value),onButtonClicked:c}),l(P,{result:p(v)},null,8,["result"])],64))}},tt="/sakuin-tool/assets/before-e62df1a7.png",et="/sakuin-tool/assets/after-49f03dfc.png",nt={name:"UngroupedTable",props:{lines:Array,resultStr:String},components:{CopyButton:N}},rt={key:0},st={class:"limit-height"},at=o("thead",null,[o("tr",null,[o("th",null,"項目"),o("th",null,"ノンブル")])],-1);function ot(d,t,e,r,f,b){const v=j("CopyButton");return e.lines.length?(h(),m("div",rt,[o("div",st,[o("table",null,[at,o("tbody",null,[(h(!0),m($,null,A(e.lines,(u,c)=>(h(),m("tr",{key:c},[o("td",null,x(u.name),1),o("td",null,x(u.nombre),1)]))),128))])])]),l(v,{copyStr:e.resultStr},null,8,["copyStr"])])):O("",!0)}const lt=F(nt,[["render",ot]]),ut=o("h2",null,"名開き",-1),ct=o("p",null,"※項目とノンブルが Excel 上で2列に分かれていても大丈夫です。",-1),it={__name:"Ungroup",setup(d){const t=c=>{const a=[];return c.filter(n=>n.trim()).map(n=>n.replace("	","　　")).forEach(n=>{const s=new C(n);s.isReference?a.push({name:s.name,nombre:""}):new H(s.address).nombres.forEach(i=>{a.push({name:s.name,nombre:i.display.text})})}),a},e=g(""),r=g([]),f=_(()=>B(e.value)),b=_(()=>r.value.map(c=>`${c.name}	${c.nombre}`.trimEnd()).join(`
`)),v=()=>{r.value=[]},u=()=>{v(),r.value=t(f.value)};return(c,a)=>(h(),m($,null,[ut,l(R,{beforePath:p(tt),afterPath:p(et)},null,8,["beforePath","afterPath"]),ct,l(L,{onUpdateContent:a[0]||(a[0]=n=>e.value=n.target.value),onButtonClicked:u}),l(lt,{lines:r.value,resultStr:p(b)},null,8,["lines","resultStr"])],64))}},dt={class:"reuse"},ft=o("h1",null,"旧版索引の再利用",-1),St={__name:"ReuseView",setup(d){return(t,e)=>(h(),m("div",dt,[ft,l(M),l(w),l(Z),l(w),l(it),l(w)]))}};export{St as default};
