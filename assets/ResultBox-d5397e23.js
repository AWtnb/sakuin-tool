import{C as f}from"./CopyButton-cac38e08.js";import{_ as c,o as p,a as g,e as d,b,r as _}from"./index-a2a0b5ee.js";class l{constructor(e){this.reg=new RegExp("(（.+?）|［.+?］|\\(.+?\\)|\\[.+?\\])$"),this.name=e}getBasename(){return this.name.replace(this.reg,"").trim().replace(/\u3000{1,2}/,"")}getRefBasename(){return this.name.split("→")[0].trim()}getSource(){const e=this.name.match(this.reg);return e?e[0].slice(1,-1).trim().replace(/\uff0c/g,",").split(",").map(s=>String(s).trim()).filter(Boolean):[]}getReferTo(){const e=this.name.split("→").map(t=>String(t).trim()).filter(Boolean);return e.length==2?e.at(-1):""}}class w{constructor(e,t="　　"){this.rawStr=e,this.isChild=e.trim().length>0&&e.trimStart()!=e,this.separator=t,this.elems=this.rawStr.split(this.separator).filter(Boolean).map(s=>String(s)),this.name="",this.basename="",this.address="",this.referredFrom=[],this.referTo="",this.isReference=!1,this.parse()}parse(){if(this.elems.length>=2){const s=(()=>this.elems.length>2?{left:this.elems.slice(0,-1).join(this.separator),right:this.elems.at(-1)}:{left:this.elems[0],right:this.elems[1]})();this.name=(this.isChild?"　":"")+s.left.trim(),this.address=s.right.trim();const r=new l(this.name);this.basename=r.getBasename(),this.referredFrom=r.getSource();return}if(this.elems.length<1)return;const e=this.elems[0];if(e.trim().length<1)return;this.name=(this.isChild?"　":"")+e.trim();const t=new l(this.name);this.referTo=t.getReferTo(),this.isReference=this.referTo.length>0,this.basename=t.getRefBasename(),this.referredFrom=t.getSource()}}class a{constructor(e,t=!1){this.text=e.trim(),this.hyphenated=t,this.intValue=Number(this.text.replace(/[^\d]/g,""))}getPrefix(){const e=this.text;return isNaN(e.at(0))?e.split(/\d+/).at(0):""}getSuffix(){const e=this.text;return isNaN(e.at(-1))?e.split(/\d+/).at(-1):""}adjust(e){return this.getPrefix()+(this.intValue+Number(e))+this.getSuffix()}}class R{constructor(e){const t=e.replace(/\s/g,"").replace(/\uff0c/g,",").replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]+/g,"-").replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-65248)});this.rawElements=t.split(",").map(s=>s.trim()).filter(Boolean),this.nombres=[],this.parse()}parse(){this.rawElements.forEach(e=>{const t=String(e);if(t.indexOf("-")!=-1){const[s,r,...u]=t.split("-"),i=new a(s,!1),h=new a(r,!1);this.nombres.push(i);for(let o=i.intValue+1;o<h.intValue;o++){const m=new a(String(o),!0);this.nombres.push(m)}this.nombres.push(h)}else this.nombres.push(new a(t,!1))})}beginsConsecutiveTriplet(e){if(this.nombres.length-3<e)return!1;const t=this.nombres[e],s=this.nombres[e+1],r=this.nombres[e+2];return!!(t.intValue+1==s.intValue&&t.intValue+2==r.intValue&&String(s.text).match(/^\d+$/))}order(){const e=this.nombres;this.nombres=e.filter(t=>t.text).sort((t,s)=>t.intValue-s.intValue)}unify(){const e=this.nombres,t=[];this.nombres=e.filter(s=>t.includes(s.text)?!1:(t.push(s.text),!0))}hyphenate(){if(this.nombres.length<3)return;const e=[];e.push({item:this.nombres[0],isHyphen:!1});for(let t=0;t<this.nombres.length-2;t++){const s=this.nombres[t+1];e.push({item:s,isHyphen:this.beginsConsecutiveTriplet(t)})}return e.push({item:this.nombres.slice(-1)[0],isHyphen:!1}),this.nombres=e.map(t=>(t.isHyphen&&(t.item.text="–"),t.item)),this.nombres}formatAll(){return this.order(),this.unify(),this.hyphenate(),this.nombres.map(e=>e.text).join(", ").replace(/, (\u2013, )+/g,"–")}}const x={name:"ResultBox",props:{result:{type:String}},components:{CopyButton:f}},y={class:"box"},S=["value"];function B(n,e,t,s,r,u){const i=_("CopyButton");return p(),g("div",y,[d("textarea",{value:t.result,placeholder:"result",readonly:""},null,8,S),b(i,{copyStr:t.result},null,8,["copyStr"])])}const N=c(x,[["render",B],["__scopeId","data-v-3a24d0d5"]]);export{R as A,w as E,N as R};
