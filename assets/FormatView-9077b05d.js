import{S as N}from"./SectionEnd-9029405c.js";import{A as b}from"./entryHandler-ea7f15d2.js";import{P as w}from"./PasteBox-7411fd1f.js";import{R as L}from"./ResultBox-e6aa57b4.js";import{_ as A,r as l,o as p,a as m,b as d,e as s,w as g,v as y,F as h,f as _,c as B,i as k,g as G,t as v,h as E,p as x,d as D}from"./index-f4bdc6de.js";import{n as O}from"./utils-e1f3c5ba.js";import{C as I}from"./CopyButton-d936930c.js";class j{constructor(e,o=!1){this.linesParsed=e.filter(n=>n.trim()).map(n=>{const i=n.split("	").slice(0,2);return i.length<2?{Item:String(i[0]).trimEnd(),Address:""}:(o&&i.reverse(),{Item:String(i[0]).trimEnd(),Address:String(i[1]).trim()})}),this.groupedLines=[]}group(){const e=new Map;this.linesParsed.forEach(o=>{if(e.has(o.Item)){const n=e.get(o.Item)+", "+o.Address;e.set(o.Item,n)}else e.set(o.Item,o.Address)}),e.forEach((o,n)=>{const i=new b(o);this.groupedLines.push((n+"　　"+i.formatAll()).trimEnd())})}groupByOrder(){const e=[];for(let o=0;o<this.linesParsed.length;o++){const n=this.linesParsed[o];if(o==0){e.push({Item:n.Item,Address:n.Address});continue}const i=e.length-1;if(n.Item==e[i].Item){const c=e[i].Address+", "+n.Address;e[i].Address=c}else e.push({Item:n.Item,Address:n.Address})}this.groupedLines=e.map(o=>{const n=new b(o.Address);return(o.Item+"　　"+n.formatAll()).trimEnd()})}getGroupedLines(e=!1){return e?this.groupByOrder():this.group(),this.groupedLines}}const M="/sakuin-tool/assets/group-be0c0c56.png",Y={name:"Group",data:function(){return{content:"",lines:[],isLeft:!1,isOrdered:!1}},components:{PasteBox:w,ResultBox:L},computed:{contentLines:function(){return this.content.split(/\n/).map(t=>String(t))},resultStr:function(){return this.lines.join(`
`)}},methods:{reset:function(){this.lines=[]},executeGrouping:function(){this.reset(),new j(this.contentLines,this.isLeft).getGroupedLines(this.isOrdered).forEach(e=>{this.lines.push(e)})}}},R=s("h2",null,"名寄せ",-1),$=s("div",null,[s("img",{src:M,alt:""}),s("em",null,[_("ノンブルの"),s("span",{style:{color:"red"}},"並び"),_("、"),s("span",{style:{color:"blue"}},"重複"),_("、"),s("span",{style:{color:"green"}},"連続"),_("を整理。記号での装飾にも対応。")])],-1),T=s("label",{for:"isLeft"},"ノンブルが左列",-1),U=s("label",{for:"isOrdered"},"連続している項目のみ名寄せする",-1);function P(t,e,o,n,i,c){const a=l("PasteBox"),r=l("ResultBox");return p(),m(h,null,[R,$,d(a,{onUpdateContent:e[0]||(e[0]=u=>t.content=u.target.value),onButtonClicked:c.executeGrouping},null,8,["onButtonClicked"]),s("div",null,[g(s("input",{type:"checkbox",id:"isLeft","onUpdate:modelValue":e[1]||(e[1]=u=>t.isLeft=u)},null,512),[[y,t.isLeft]]),T]),s("div",null,[g(s("input",{type:"checkbox",id:"isOrdered","onUpdate:modelValue":e[2]||(e[2]=u=>t.isOrdered=u)},null,512),[[y,t.isOrdered]]),U]),d(r,{result:c.resultStr},null,8,["result"])],64)}const z=A(Y,[["render",P]]),V="/sakuin-tool/assets/yomi_dl_release-5fbf65d3.png",Q="/sakuin-tool/assets/yomi_dl01-ec508be3.png",H="/sakuin-tool/assets/yomi_dl02-ca9dfe3e.png",J="/sakuin-tool/assets/yomi_dl03-71cef81c.png",X="data:image/png;base64,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",q="/sakuin-tool/assets/yomi_dl05-bed27782.png",Z="/sakuin-tool/assets/yomi_dl06-6ec5b794.png",W="/sakuin-tool/assets/yomi_dl07-62ba7678.png",K={name:"DownloadGuide"},F=B('<summary>ダウンロード方法（初回のみ）</summary><div><img src="'+V+'" alt=""></div><p><a href="https://github.com/AWtnb/flet_yomi/releases">リリースページ</a>の一番上に表示されている exe ファイルをクリックするとダウンロードが始まります。100MB を超える巨大なファイルなので、余裕のある回線をご利用ください。</p><h3>ダウンロード後の流れ</h3><p>個人開発のアプリなのでダウンロード時に警告が表示されます（下記は Microsoft Edge の例）。信頼していただければ、下記の手順で有効化してください。</p><ol><li>マウスを乗せると表示されるメニューから「保存」を選択。 <div><img src="'+Q+'" alt=""></div></li><li>あらためて警告が出るので「詳細表示」をクリック。 <div><img src="'+H+'" alt=""></div></li><li>「保持する」をクリックするとダウンロードが正式に始まります。 <div><img src="'+J+'" alt=""></div></li><li>ダウンロード先のフォルダを開くと <code>yomi.exe</code> というファイルがダウンロードされているはず。 <div><img src="'+X+'" alt=""></div></li><li>アプリはこの exe 単体で動作します。適当なフォルダを作って移動させましょう。 <div><img src="'+q+'" alt=""></div></li></ol><h3>初回起動時</h3><p>おそらく初回の起動時に、Windows からの警告が表示されます。同じく信頼していただけましたら、下記の手順で有効化してください。</p><ol><li>「PC が保護されました」という表示の場合は「詳細情報」をクリック。 <div><img src="'+Z+'" alt=""></div></li><li>表示される「実行」ボタンをクリックするとアプリが起動します。 <div><img src="'+W+'" alt=""></div></li></ol>',9),ee=[F];function te(t,e,o,n,i,c){return p(),m("details",null,ee)}const oe=A(K,[["render",te]]),se="/sakuin-tool/assets/yomi_demo01-8364cbd8.png",ne="/sakuin-tool/assets/yomi_demo02-f4b0ed71.png",ie="/sakuin-tool/assets/yomi_demo03-90b9cbf5.png",re={name:"Reading",components:{DownloadGuide:oe}},de=s("h2",null,"よみがな取得",-1),ce=s("p",null,[s("a",{href:"https://github.com/AWtnb/flet_yomi/releases"},"外部アプリ"),_("を使用します。")],-1),le=B('<h3>作業手順</h3><h4>1. 名寄せした索引項目の読み情報を取得する</h4><div><img src="'+se+'" alt=""></div><p>名寄せが済んだ索引をテキストボックスに貼り付けて<code>GO!</code>のボタンをクリックすると読み情報が取得されます。</p><ul><li>結果は「元の文字」「読みがな」「解析の詳細」の3列です。</li><li>オプションの意味： <ul><li><code>Skip inside: () / []</code>：括弧内の文字（見よ元項目の情報など）を無視します。</li><li><code>Skip nombles or reference (for book index)</code>：ノンブル情報（全角空白2個の後ろにある数字）、見よ先情報（<code>　→</code>の後ろにある文字）を無視します。</li></ul></li></ul><h4>2. 結果を Microsoft Excel に貼り付けてチェックする</h4><div><img src="'+ne+'" alt=""></div><p><code>COPY!</code>ボタンで変換結果をコピーします。Excel を開いて貼り付けると楽にチェックできます。</p><ul><li>一番右の列で、どの単語をどう読んでいるのかがわかります。</li><li><strong>この先使用するのは左の2列だけです。</strong>3列目を見ながら、変換にミスがあれば2列目を修正していきます。</li></ul><h4>3. 必要な列をコピーする</h4><div><img src="'+ie+'" alt=""></div><p>読みがなのチェック・修正が終わったら、左2列をコピーして以降のステップ（並べ替え）に進んでください。</p><ul><li>配列読みは次の並べ替えのステップで自動生成します。</li></ul>',13);function ae(t,e,o,n,i,c){const a=l("DownloadGuide");return p(),m(h,null,[de,ce,d(a),le],64)}const ue=A(re,[["render",ae]]),pe={name:"Normalize",data:function(){return{content:"",removeNoise:!0}},components:{ResultBox:L},computed:{resultStr:function(){return O(this.content,this.removeNoise)}}},me=s("summary",null,"配列読みへの変換だけ必要な場合はこちら",-1),Ae=s("label",{for:"removeNoise"},"カタカナ・数字・アルファベット以外を削除する",-1);function _e(t,e,o,n,i,c){const a=l("ResultBox");return p(),m("details",null,[me,s("div",null,[g(s("input",{type:"checkbox",id:"removeNoise","onUpdate:modelValue":e[0]||(e[0]=r=>t.removeNoise=r)},null,512),[[y,t.removeNoise]]),Ae]),g(s("textarea",{placeholder:"paste here!","onUpdate:modelValue":e[1]||(e[1]=r=>t.content=r)},null,512),[[k,t.content]]),d(a,{result:c.resultStr},null,8,["result"])])}const ge=A(pe,[["render",_e]]);const he={name:"SorttedTable",props:{lines:Array,resultStr:String},components:{CopyButton:I}},fe=t=>(x("data-v-a21cf534"),t=t(),D(),t),ve={key:0},Se={class:"limit-height"},ye=fe(()=>s("thead",null,[s("tr",null,[s("th",null,"項目"),s("th",null,"読み"),s("th",null,"配列読み")])],-1)),Be={class:"reading"},be={class:"normalized-reading"};function we(t,e,o,n,i,c){const a=l("CopyButton");return o.lines.length?(p(),m("div",ve,[s("div",Se,[s("table",null,[ye,s("tbody",null,[(p(!0),m(h,null,G(o.lines,(r,u)=>(p(),m("tr",{key:u},[s("td",null,v(r.item),1),s("td",Be,v(r.reading),1),s("td",be,v(r.normalized),1)]))),128))])])]),d(a,{copyStr:o.resultStr},null,8,["copyStr"])])):E("",!0)}const Le=A(he,[["render",we],["__scopeId","data-v-a21cf534"]]),xe="/sakuin-tool/assets/sort-7a7e425b.png";const S=(t,e)=>{const o=String(t).toLowerCase(),n=String(e).toLowerCase();return o>n?1:o<n?-1:0};class De{constructor(){this.parsedLines=[]}addData(e,o){this.parsedLines.push({item:e,reading:o,normalized:O(o,!0)})}execute(){return this.parsedLines.sort((e,o)=>S(e.item,o.item)).sort((e,o)=>S(e.reading,o.reading)).sort((e,o)=>S(e.normalized,o.normalized))}}const Oe={name:"Sort",data:function(){return{content:"",sortedLines:[]}},components:{CopyButton:I,Normalize:ge,SortedTable:Le,PasteBox:w},computed:{contentLines:function(){return this.content.split(/\n/).map(t=>String(t))},parsedLines:function(){return this.contentLines.filter(t=>t.trim().length>0).map(t=>{const[e,o,...n]=t.split("	").map(i=>i.trim());return{item:e,reading:o}})},resultStr:function(){return this.sortedLines.map(t=>`${t.item}	${t.reading}	${t.normalized}`).join(`
`)}},methods:{reset:function(){this.sortedLines=[]},executeSort:function(){this.reset();const t=new De;this.parsedLines.forEach(e=>t.addData(e.item,e.reading)),t.execute().forEach(e=>{this.sortedLines.push(e)})}}},C=t=>(x("data-v-c3829912"),t=t(),D(),t),Ie=C(()=>s("h2",null,"並べ替え",-1)),Ce=C(()=>s("div",null,[s("img",{src:xe,alt:""})],-1)),Ne=B("<ul data-v-c3829912><li data-v-c3829912><code data-v-c3829912>名寄せした索引項目</code>と<code data-v-c3829912>読み</code>の2列を貼り付けてください。</li><li data-v-c3829912>内部で<code data-v-c3829912>読み</code>の情報を<code data-v-c3829912>配列読み</code>に変換して並べ替えます。 <ul data-v-c3829912><li data-v-c3829912>最優先は<code data-v-c3829912>配列読み</code>の情報。</li><li data-v-c3829912><code data-v-c3829912>配列読み</code>が同じ場合は<code data-v-c3829912>読み</code>で昇順ソート。</li><li data-v-c3829912><code data-v-c3829912>読み</code>も同じ場合は<code data-v-c3829912>項目</code>の文字コード昇順（同じ文字種がまとまります）。</li></ul></li><li data-v-c3829912><strong data-v-c3829912>1列目が最終的な索引になります。</strong></li></ul>",1);function ke(t,e,o,n,i,c){const a=l("PasteBox"),r=l("SortedTable"),u=l("Normalize");return p(),m(h,null,[Ie,Ce,d(a,{onUpdateContent:e[0]||(e[0]=f=>t.content=f.target.value),onButtonClicked:c.executeSort},null,8,["onButtonClicked"]),Ne,d(r,{lines:t.sortedLines,resultStr:c.resultStr},null,8,["lines","resultStr"]),d(u)],64)}const Ge=A(Oe,[["render",ke],["__scopeId","data-v-c3829912"]]),Ee={name:"FormatView",components:{SectionEnd:N,Group:z,Reading:ue,Sort:Ge}},je={class:"format"},Me=s("h1",null,"索引の整形",-1);function Ye(t,e,o,n,i,c){const a=l("Group"),r=l("SectionEnd"),u=l("Reading"),f=l("Sort");return p(),m("div",je,[Me,d(a),d(r),d(u),d(r),d(f),d(r)])}const Qe=A(Ee,[["render",Ye]]);export{Qe as default};
