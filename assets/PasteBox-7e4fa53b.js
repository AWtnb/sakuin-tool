import{_ as a,o as c,a as _,e as s}from"./index-42f53b86.js";const u={name:"PasteBox",emits:["updateContent","buttonClicked"],methods:{onInput:function(o){this.$emit("updateContent",o)},onClick:function(){this.$emit("buttonClicked")}}},d={class:"box"};function i(o,e,l,r,p,t){return c(),_("div",d,[s("textarea",{onInput:e[0]||(e[0]=(...n)=>t.onInput&&t.onInput(...n)),placeholder:"paste here!"},null,32),s("button",{onClick:e[1]||(e[1]=(...n)=>t.onClick&&t.onClick(...n))},"実行！")])}const x=a(u,[["render",i],["__scopeId","data-v-b9e72c85"]]);export{x as P};