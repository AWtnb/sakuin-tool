import{_ as s,j as u,o as c,a as l,k as p,v as i,b as _}from"./index-c967e13c.js";const d=e=>e.replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g,function(a){return String.fromCharCode(a.charCodeAt(0)-65248)}),m=e=>e.replace(/[\u3041-\u3096]/g,function(a){const t=a.charCodeAt(0)+96;return String.fromCharCode(t)}),C=e=>e.replace(/[\u30a1-\u30f6]/g,function(a){const t=a.charCodeAt(0)-96;return String.fromCharCode(t)}),r=new Map;[["ァ","ア"],["ィ","イ"],["ゥ","ウ"],["ェ","エ"],["ォ","オ"],["ヴ","ウ"],["ガ","カ"],["ギ","キ"],["グ","ク"],["ゲ","ケ"],["ゴ","コ"],["ザ","サ"],["ジ","シ"],["ズ","ス"],["ゼ","セ"],["ゾ","ソ"],["ダ","タ"],["ヂ","チ"],["ヅ","ツ"],["ッ","ツ"],["デ","テ"],["ド","ト"],["バ","ハ"],["ビ","ヒ"],["ブ","フ"],["ベ","ヘ"],["ボ","ホ"],["パ","ハ"],["ピ","ヒ"],["プ","フ"],["ペ","ヘ"],["ポ","ホ"],["ャ","ヤ"],["ュ","ユ"],["ョ","ヨ"],["ー",""]].forEach(e=>r.set(...e));const k=(e,a)=>{let t=d(m(e));for(let n of r.keys())t=t.replaceAll(n,r.get(n));return a?t.replace(/[^ァ-ヴa-zA-Z\uff41-\uff5a\uff21-\uff3a0-9\uff10-\uff19\r\n]/g,""):t},S=e=>e.length<1?[]:e.split(/\n/).map(a=>String(a));const h={class:"box"},g={__name:"SimpleTextarea",emits:["updateContent"],setup(e,{emit:a}){const t=u(""),n=()=>{a("updateContent",{content:t.value})};return(x,o)=>(c(),l("div",h,[p(_("textarea",{onInput:n,"onUpdate:modelValue":o[0]||(o[0]=f=>t.value=f),placeholder:"paste here!"},null,544),[[i,t.value]])]))}},A=s(g,[["__scopeId","data-v-4247a7f9"]]);export{A as S,S as a,C as b,m as c,k as n,d as t};