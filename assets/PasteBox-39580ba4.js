import{_ as u,o as s,a as i,e as f}from"./index-294494d2.js";const l=t=>t.replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g,function(e){return String.fromCharCode(e.charCodeAt(0)-65248)}),d=t=>t.replace(/[\u3041-\u3096]/g,function(e){const n=e.charCodeAt(0)+96;return String.fromCharCode(n)}),k=t=>t.replace(/[\u30a1-\u30f6]/g,function(e){const n=e.charCodeAt(0)-96;return String.fromCharCode(n)}),c=new Map;[["ァ","ア"],["ィ","イ"],["ゥ","ウ"],["ェ","エ"],["ォ","オ"],["ヴ","ウ"],["ガ","カ"],["ギ","キ"],["グ","ク"],["ゲ","ケ"],["ゴ","コ"],["ザ","サ"],["ジ","シ"],["ズ","ス"],["ゼ","セ"],["ゾ","ソ"],["ダ","タ"],["ヂ","チ"],["ヅ","ツ"],["ッ","ツ"],["デ","テ"],["ド","ト"],["バ","ハ"],["ビ","ヒ"],["ブ","フ"],["ベ","ヘ"],["ボ","ホ"],["パ","ハ"],["ピ","ヒ"],["プ","フ"],["ペ","ヘ"],["ポ","ホ"],["ャ","ヤ"],["ュ","ユ"],["ョ","ヨ"],["ー",""]].forEach(t=>c.set(...t));const g=(t,e)=>{let n=l(d(t));for(let r of c.keys())n=n.replaceAll(r,c.get(r));return e?n.replace(/[^ァ-ヴa-zA-Z\uff41-\uff5a\uff21-\uff3a0-9\uff10-\uff19\r\n]/g,""):n},x=t=>t.split(/\n/).map(e=>String(e));const p={name:"PasteBox",emits:["updateContent","buttonClicked"],methods:{onInput:function(t){this.$emit("updateContent",t)},onClick:function(){this.$emit("buttonClicked")}}},_={class:"box"};function C(t,e,n,r,m,a){return s(),i("div",_,[f("textarea",{onInput:e[0]||(e[0]=(...o)=>a.onInput&&a.onInput(...o)),placeholder:"paste here!"},null,32),f("button",{onClick:e[1]||(e[1]=(...o)=>a.onClick&&a.onClick(...o))},"実行！")])}const b=u(p,[["render",C],["__scopeId","data-v-b9e72c85"]]);export{b as P,x as a,k as b,d as c,g as n,l as t};
