import{S as E}from"./SectionEnd-00c69fac.js";import{_ as N,o as a,a as i,F as $,g as j,b as n,t as _,h as w,e as v,r as U,d as m,j as y,i as f,k as g,B as x,u as k,A as B,v as A,p as D,f as I}from"./index-c967e13c.js";import{S,a as V}from"./SimpleTextarea-967c8544.js";import{E as C,A as M}from"./entry-1c7d23b5.js";import{R as T}from"./ResultBox-21864a1e.js";import"./CopyButton-d9147153.js";const F={name:"PossibleList",props:{children:Array}},R={key:0},W={key:1};function q(u,t,e,s,o,d){return a(),i("ul",null,[(a(!0),i($,null,j(e.children,(l,r)=>(a(),i("li",{key:r},[n("span",null,[l.pre.length?(a(),i("mark",R,_(l.pre),1)):w("",!0),v(_(l.rest),1),l.post.length?(a(),i("mark",W,_(l.post),1)):w("",!0)])]))),128))])}const z=N(F,[["render",q]]),H={name:"FoundTable",components:{PossibleList:z},props:{found:Array}},O={key:0},G={class:"limit-height"},J=n("thead",null,[n("tr",null,[n("th",null,"項目"),n("th",null,"子項目候補")])],-1);function K(u,t,e,s,o,d){const l=U("PossibleList");return e.found.length?(a(),i("div",O,[n("div",G,[n("table",null,[J,n("tbody",null,[(a(!0),i($,null,j(e.found,(r,b)=>(a(),i("tr",{key:b},[n("td",null,_(r.parent),1),n("td",null,[m(l,{children:r.children},null,8,["children"])])]))),128))])])])])):w("",!0)}const Q=N(H,[["render",K]]);class X{constructor(t,e){this.name=t,this.mode=e,this.modified=!1,this.pre="",this.post="",this.rest=""}search(t){(this.mode=="all"||this.mode=="head")&&this.name.startsWith(t)&&(this.pre=t,this.modified=!0),this.rest=this.name.substring(this.pre.length),(this.mode=="all"||this.mode=="tail")&&this.name.endsWith(t)&&(this.post=t,this.modified=!0),this.rest=this.rest.substring(0,this.rest.length-this.post.length)}}class Y{constructor(t,e="tail"){this.mode=e,this.mainEntries=t.filter(s=>String(s).trim()).map(s=>new C(s)).filter(s=>!s.isReference&&!s.isChild).map(s=>({name:s.name,basename:s.basename}))}findPossibles(){return this.mainEntries.map(t=>{const e=t.basename,s=this.mainEntries.filter(o=>o.basename!=e).map(o=>{const d=new X(o.basename,this.mode);return d.search(e),d.modified?d:null}).filter(Boolean);return{parent:t.name,children:s}}).filter(t=>t.children.length>0).sort((t,e)=>e.parent.length-t.parent.length)}}const Z=n("h2",null,"子項目候補をチェックする",-1),ee={__name:"CheckChild",setup(u){const t=y(""),e=y("all"),s=f(()=>V(t.value)),o=f(()=>new Y(s.value,e.value).findPossibles());return(d,l)=>(a(),i($,null,[Z,m(S,{onUpdateContent:l[0]||(l[0]=r=>t.value=r.content)}),n("div",null,[n("label",null,[g(n("input",{type:"radio",value:"tail","onUpdate:modelValue":l[1]||(l[1]=r=>e.value=r)},null,512),[[x,e.value]]),v("末尾一致")]),n("label",null,[g(n("input",{type:"radio",value:"head","onUpdate:modelValue":l[2]||(l[2]=r=>e.value=r)},null,512),[[x,e.value]]),v("先頭一致")]),n("label",null,[g(n("input",{type:"radio",value:"all","onUpdate:modelValue":l[3]||(l[3]=r=>e.value=r)},null,512),[[x,e.value]]),v("両方")])]),m(Q,{found:k(o)},null,8,["found"])],64))}};const te={name:"AddressDiff",props:{diffDetails:{type:Array,require:!0}}},ne={key:0};function se(u,t,e,s,o,d){return a(!0),i($,null,j(e.diffDetails,(l,r)=>(a(),i("span",{key:r},[n("del",null,_(l.before),1),n("span",{style:B({color:l.color})},_(l.text),5),l.isEnd?w("",!0):(a(),i("span",ne,", "))]))),128)}const le=N(te,[["render",se],["__scopeId","data-v-80f74b7a"]]),re=(u,t)=>{const e=u.map((s,o)=>{const d=t[o],l=o==u.length-1;return s!=d?{text:d,before:s,color:"#ff0080",isEnd:l}:{text:s,before:"",color:"#333",isEnd:l}});return{modified:e.some(s=>s.before.length>0),detail:e}};class oe{constructor(t,e,s){this.start=Number(t),this.end=Number(e),this.delta=Number(s)}apply(t){return t.map(e=>{const s=new C(e),o=new M(s.address),l=o.formatAll().split(", "),b=o.adjust(this.start,this.end,this.delta).split(", ");return{name:s.name,newNombres:b,comparison:re(l,b)}})}}const ae=u=>(D("data-v-e07ce7e1"),u=u(),I(),u),ie=ae(()=>n("h2",null,"ノンブル加算減算",-1)),ue={class:"config"},de={key:0},ce={__name:"PlusMinus",setup(u){const t=y(""),e=y(1),s=y(999),o=y(1),d=f(()=>V(t.value)),l=f(()=>new oe(e.value,s.value,o.value).apply(d.value)),r=f(()=>l.value.filter(c=>c.comparison.modified).map(c=>({name:c.name,detail:c.comparison.detail}))),b=f(()=>t.value.length<1?"":r.value.length?r.value.length+"件の変更があります。":"修正箇所はありません。"),P=f(()=>l.value.map(c=>c.newNombres.length?`${c.name}　　${c.newNombres.join(", ")}`:c.name).join(`
`));return(c,h)=>(a(),i($,null,[ie,n("ul",ue,[n("li",null,[v("開始 "),g(n("input",{type:"number",min:"1","onUpdate:modelValue":h[0]||(h[0]=p=>e.value=p)},null,512),[[A,e.value]])]),n("li",null,[v("終了 "),g(n("input",{type:"number",min:"1","onUpdate:modelValue":h[1]||(h[1]=p=>s.value=p)},null,512),[[A,s.value]])]),n("li",null,[v("増分 "),g(n("input",{type:"number","onUpdate:modelValue":h[2]||(h[2]=p=>o.value=p)},null,512),[[A,o.value]])])]),m(S,{onUpdateContent:h[3]||(h[3]=p=>t.value=p.content)}),m(T,{result:k(P)},null,8,["result"]),n("div",null,[n("h4",null,_(k(b)),1),k(r).length?(a(),i("ul",de,[(a(!0),i($,null,j(k(r),(p,L)=>(a(),i("li",{key:L},[n("span",null,_(p.name)+"　　",1),m(le,{"diff-details":p.detail},null,8,["diff-details"])]))),128))])):w("",!0)])],64))}},pe=N(ce,[["__scopeId","data-v-e07ce7e1"]]),me={class:"adjust"},he=n("h1",null,"微調整",-1),$e={__name:"AdjustView",setup(u){return(t,e)=>(a(),i("div",me,[he,m(ee),m(E),m(pe),m(E)]))}};export{$e as default};
