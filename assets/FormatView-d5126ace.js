import{S as j}from"./SectionEnd-ec6097c1.js";import{o as c,a as d,F as v,g as R,t as y,_ as C,j as f,i as m,s as Y,e as n,b as u,w,q as S,n as ne,u as h,f as A,m as se,h as x,p as $,d as M,l as z,c as V,v as re,x as le,y as I,z as oe}from"./index-3c638800.js";import{B as Z}from"./BeforeAfter-c2feb01b.js";import{a as T,S as D,b as ie,c as J,n as N,C as ae}from"./SimpleTextarea-96fa10e9.js";import{A as P,E as H,R as E}from"./entry-ea6c372c.js";const ue="/sakuin-tool/assets/before-e702eb7e.png",ce="/sakuin-tool/assets/after-0c054fa5.png",O={__name:"SimpleList",props:{arr:Array},setup(o){return(e,s)=>(c(),d("ul",null,[(c(!0),d(v,null,R(o.arr,(t,l)=>(c(),d("li",{key:l},y(t),1))),128))]))}};const de={class:"required"},pe=["disabled"],he={__name:"RefTableRow",props:{determined:Boolean,refItem:Object},emits:["acceptToggled"],setup(o,{emit:e}){const s=o,t=f(!1),l=m(()=>s.determined||t.value),r=()=>{e("acceptToggled",{isChecked:t.value})};return Y(()=>s.refItem,()=>{t.value=!1}),(a,i)=>(c(),d("tr",{class:ne({blur:h(l)})},[n("td",null,y(o.refItem.problem),1),n("td",de,[u(O,{arr:o.refItem.require},null,8,["arr"])]),n("td",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":i[0]||(i[0]=p=>t.value=p),onChange:r,disabled:o.determined},null,40,pe),[[S,t.value]])])],2))}},me=C(he,[["__scopeId","data-v-400f48d5"]]);const Q=o=>($("data-v-d79d044b"),o=o(),M(),o),_e={key:0},fe=Q(()=>n("h3",null,"見よ項目が足りません：",-1)),ge=Q(()=>n("thead",null,[n("tr",null,[n("th",null,"括弧のある項目"),n("th",null,"必要な見よ項目"),n("th",null,"追加する")])],-1)),Ae={__name:"FindMissingRefs",props:{missingRefs:Array},emits:["acceptAllToggled","acceptToggled"],setup(o,{emit:e}){const s=o,t=f(!1),l=()=>{e("acceptAllToggled",{isChecked:t.value})},r=(a,i)=>{e("acceptToggled",{isChecked:a.isChecked,idx:i})};return Y(()=>s.missingRefs,()=>{s.missingRefs.length&&(t.value=!1)}),(a,i)=>o.missingRefs.length?(c(),d("div",_e,[fe,n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":i[0]||(i[0]=p=>t.value=p),onChange:l},null,544),[[S,t.value]]),A("まとめて追加する ")]),n("table",null,[ge,n("tbody",null,[(c(!0),d(v,null,R(o.missingRefs,(p,g)=>(c(),se(me,{key:g,determined:t.value,refItem:p,onAcceptToggled:b=>r(b,g)},null,8,["determined","refItem","onAcceptToggled"]))),128))])])])):x("",!0)}},ve=C(Ae,[["__scopeId","data-v-d79d044b"]]);class be{constructor(e,s=!1){this.linesParsed=e.filter(t=>t.trim()).map(t=>{const l=t.split("	").slice(0,2);return l.length<2?{Item:String(l[0]).trimEnd(),Address:""}:(s&&l.reverse(),{Item:String(l[0]).trimEnd(),Address:String(l[1]).trim()})}),this.groupedLines=[]}group(){const e=new Map;this.linesParsed.forEach(s=>{if(e.has(s.Item)){const t=e.get(s.Item)+", "+s.Address;e.set(s.Item,t)}else e.set(s.Item,s.Address)}),e.forEach((s,t)=>{const l=new P(s);this.groupedLines.push((t+"　　"+l.formatAll()).trimEnd())})}groupByOrder(){const e=[];for(let s=0;s<this.linesParsed.length;s++){const t=this.linesParsed[s];if(s==0){e.push({Item:t.Item,Address:t.Address});continue}const l=e.length-1;if(t.Item==e[l].Item){const r=e[l].Address+", "+t.Address;e[l].Address=r}else e.push({Item:t.Item,Address:t.Address})}this.groupedLines=e.map(s=>{const t=new P(s.Address);return(s.Item+"　　"+t.formatAll()).trimEnd()})}getGroupedLines(e=!1){return e?this.groupByOrder():this.group(),this.groupedLines}}class U{constructor(e){const s=T(e);this.entries=s.filter(t=>String(t).trim()).map(t=>new H(t)),this.refs=this.entries.filter(t=>t.isReference),this.nonRefs=this.entries.filter(t=>!t.isReference),this.referred=this.entries.filter(t=>t.backLink.length>0)}findMissingBackLink(){return this.refs.map(e=>this.nonRefs.filter(t=>t.basename==e.referTo&&t.backLink.includes(e.basename)).length>0?null:{problem:e.name,require:`${e.referTo}（${e.basename}）`}).filter(Boolean)}findMissingRefs(){return this.referred.map(e=>{const s=e.backLink.filter(t=>this.refs.filter(r=>r.basename==t&&r.referTo==e.basename).length<1);return s.length<1?null:{problem:e.name,require:s.map(t=>`${t}　→${e.basename}`)}}).filter(Boolean)}findAdjacent(){const e=[];return this.entries.forEach((s,t)=>{if(s.isReference){const l=this.entries[t-1];l&&!l.isReference&&l.backLink.includes(s.basename)&&e.push(s);const r=this.entries[t+1];r&&!r.isReference&&r.backLink.includes(s.basename)&&e.push(s)}}),e.map(s=>s.name)}}const X=o=>($("data-v-a78e9cfe"),o=o(),M(),o),ke=X(()=>n("h2",null,"名寄せ",-1)),ye=X(()=>n("p",null,[A("ノンブルの"),n("span",{style:{color:"red"}},"並び"),A("、"),n("span",{style:{color:"blue"}},"重複"),A("、"),n("span",{style:{color:"green"}},"連続"),A("を整理します。記号での装飾にも対応。")],-1)),we={__name:"Group",setup(o){const e=f(""),s=m(()=>{const _=T(e.value);return r.value?_.slice(1):_}),t=f(!1),l=f(!1),r=f(!0),a=m(()=>new be(s.value,t.value).getGroupedLines(l.value).join(`
`)),i=m(()=>new U(a.value).findMissingRefs()),p=f(!1),g=_=>{p.value=_.isChecked},b=z(new Map),q=m(()=>i.value.filter((_,k)=>b.has(k)&&b.get(k)).map(_=>_.require).flat()),ee=_=>{b.set(_.idx,_.isChecked)},F=m(()=>p.value?i.value.map(_=>_.require).flat():q.value.length?q.value:[]),te=m(()=>F.value.length<1?a.value:a.value+`
`+F.value.join(`
`));return Y(()=>a.value,()=>{Array.from(b.keys()).forEach(_=>{b.set(_,!1)}),p.value=!1}),(_,k)=>(c(),d(v,null,[ke,u(Z,{beforePath:h(ue),afterPath:h(ce)},null,8,["beforePath","afterPath"]),ye,n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":k[0]||(k[0]=B=>r.value=B)},null,512),[[S,r.value]]),A("先頭行をスキップする")]),n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":k[1]||(k[1]=B=>t.value=B)},null,512),[[S,t.value]]),A("ノンブルが左列")]),n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":k[2]||(k[2]=B=>l.value=B)},null,512),[[S,l.value]]),A("連続している項目のみ名寄せする")]),u(D,{onUpdateContent:k[3]||(k[3]=B=>e.value=B.content)}),u(E,{result:h(te)},null,8,["result"]),u(ve,{missingRefs:h(i),onAcceptAllToggled:g,onAcceptToggled:ee},null,8,["missingRefs"])],64))}},Se=C(we,[["__scopeId","data-v-a78e9cfe"]]),xe="/sakuin-tool/assets/yomi_demo01-8364cbd8.png",Re="/sakuin-tool/assets/yomi_demo02-f4b0ed71.png",Ce="/sakuin-tool/assets/yomi_demo03-90b9cbf5.png",Be="/sakuin-tool/assets/yomi_dl_release-5fbf65d3.png",Ie="/sakuin-tool/assets/yomi_dl01-ec508be3.png",Le="/sakuin-tool/assets/yomi_dl02-ca9dfe3e.png",$e="/sakuin-tool/assets/yomi_dl03-71cef81c.png",Me="data:image/png;base64,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",Te="/sakuin-tool/assets/yomi_dl05-bed27782.png",De="/sakuin-tool/assets/yomi_dl06-6ec5b794.png",je="/sakuin-tool/assets/yomi_dl07-62ba7678.png",Ee={name:"DownloadGuide"},Oe=V('<summary>ダウンロード方法（初回のみ）</summary><div><img src="'+Be+'" alt=""></div><p><a href="https://github.com/AWtnb/flet_yomi/releases">リリースページ</a>の一番上に表示されている exe ファイルをクリックするとダウンロードが始まります。100MB を超える巨大なファイルなので、余裕のある回線をご利用ください。</p><h3>ダウンロード後の流れ</h3><p>個人開発のアプリなのでダウンロード時に警告が表示されます（下記は Microsoft Edge の例）。信頼していただければ、下記の手順で有効化してください。</p><ol><li>マウスを乗せると表示されるメニューから「保存」を選択。 <div><img src="'+Ie+'" alt=""></div></li><li>あらためて警告が出るので「詳細表示」をクリック。 <div><img src="'+Le+'" alt=""></div></li><li>「保持する」をクリックするとダウンロードが正式に始まります。 <div><img src="'+$e+'" alt=""></div></li><li>ダウンロード先のフォルダを開くと <code>yomi.exe</code> というファイルがダウンロードされているはず。 <div><img src="'+Me+'" alt=""></div></li><li>アプリはこの exe 単体で動作します。適当なフォルダを作って移動させましょう。 <div><img src="'+Te+'" alt=""></div></li></ol><h3>初回起動時</h3><p>おそらく初回の起動時に、Windows からの警告が表示されます。同じく信頼していただけましたら、下記の手順で有効化してください。</p><ol><li>「PC が保護されました」という表示の場合は「詳細情報」をクリック。 <div><img src="'+De+'" alt=""></div></li><li>表示される「実行」ボタンをクリックするとアプリが起動します。 <div><img src="'+je+'" alt=""></div></li></ol>',9),Ue=[Oe];function Ge(o,e,s,t,l,r){return c(),d("details",null,Ue)}const Ne=C(Ee,[["render",Ge]]),Pe=n("summary",null,"カタカナひらがな相互変換",-1),Ye={__name:"JaConv",setup(o){const e=f(""),s=m(()=>e.value.replace(/[\u30a1-\u30f4\u3041-\u3093]/g,t=>t.match(/[\u30a1-\u30f4]/)?ie(t):J(t)));return(t,l)=>(c(),d("details",null,[Pe,u(D,{onUpdateContent:l[0]||(l[0]=r=>e.value=r.content)}),u(E,{result:h(s)},null,8,["result"])]))}},Ve=n("summary",null,"ローマ字に変換",-1),He=n("ul",null,[n("li",null,[A("ヘボン式ローマ字に従っています。 "),n("ul",null,[n("li",null,"拗音は「ゃ」「ゅ」「ょ」にのみ対応しています。")])]),n("li",null,[A("変換できなかった文字はそのまま表示します。 "),n("ul",null,[n("li",null,"長音（ー）ならびに「ぁ」「ぃ」「ぅ」「ぇ」「ぉ」には非対応です。"),n("li",null,"日本語に登場する頻度の低い「ヴ」や、その他の表記が定まらないケースにも非対応です。")])])],-1),qe={__name:"Romanize",setup(o){const e=new Map;[["ア","A"],["イ","I"],["ウ","U"],["エ","E"],["オ","O"],["カ","Ka"],["キ","Ki"],["ク","Ku"],["ケ","Ke"],["コ","Ko"],["サ","Sa"],["シ","Shi"],["ス","Su"],["セ","Se"],["ソ","So"],["タ","Ta"],["チ","Chi"],["ツ","Tsu"],["テ","Te"],["ト","To"],["ナ","Na"],["ニ","Ni"],["ヌ","Nu"],["ネ","Ne"],["ノ","No"],["ハ","Ha"],["ヒ","Hi"],["フ","Fu"],["ヘ","He"],["ホ","Ho"],["マ","Ma"],["ミ","Mi"],["ム","Mu"],["メ","Me"],["モ","Mo"],["ヤ","Ya"],["ユ","Yu"],["ヨ","Yo"],["ラ","Ra"],["リ","Ri"],["ル","Ru"],["レ","Re"],["ロ","Ro"],["ワ","Wa"],["ヲ","Wo"],["ン","N"],["ガ","Ga"],["ギ","Gi"],["グ","Gu"],["ゲ","Ge"],["ゴ","Go"],["ザ","Za"],["ジ","Ji"],["ズ","Zu"],["ゼ","Ze"],["ゾ","Zo"],["ダ","Da"],["ヂ","Di"],["ヅ","Zu"],["デ","De"],["ド","Do"],["バ","Ba"],["ビ","Bi"],["ブ","Bu"],["ベ","Be"],["ボ","Bo"],["パ","Pa"],["ピ","Pi"],["プ","Pu"],["ペ","Pe"],["ポ","Po"],["ャ","Lya"],["ュ","Lyu"],["ョ","Lyo"],["ッ","Ltu"]].forEach(r=>e.set(...r));const s=r=>{let a=J(r);for(let i of e.keys()){const p=new RegExp(i,"g");a=a.replace(p,e.get(i))}return a=a.replace(/([CS]h|J)iLy(.)/g,"$1$2").replace(/([A-Z])iL(y.)/g,"$1$2").replace(/Ltu(.)/g,"$1$1"),a.toLowerCase()},t=f(""),l=m(()=>s(t.value));return(r,a)=>(c(),d("details",null,[Ve,He,u(D,{onUpdateContent:a[0]||(a[0]=i=>t.value=i.content)}),u(E,{result:h(l)},null,8,["result"])]))}},Fe=n("h2",null,"よみがな取得",-1),ze=n("p",null,[n("a",{href:"https://github.com/AWtnb/flet_yomi/releases"},"外部アプリ"),A("を使用します。")],-1),Ze=V('<h3>作業手順</h3><h4>1. 名寄せした索引項目の読み情報を取得する</h4><div><img src="'+xe+'" alt=""></div><p>名寄せが済んだ索引をテキストボックスに貼り付けて<code>GO!</code>のボタンをクリックすると読み情報が取得されます。</p><ul><li>結果は「元の文字」「読みがな」「解析の詳細」の3列です。</li><li>オプションの意味： <ul><li><code>Skip inside: () / []</code>：括弧内の文字（見よ元項目の情報など）を無視します。</li><li><code>Skip nombles or reference (for book index)</code>：ノンブル情報（全角空白2個の後ろにある数字）、見よ先情報（<code>　→</code>の後ろにある文字）を無視します。</li></ul></li></ul><h4>2. 結果を Microsoft Excel に貼り付けてチェックする</h4><div><img src="'+Re+'" alt=""></div><p><code>COPY!</code>ボタンで変換結果をコピーします。Excel を開いて貼り付けると楽にチェックできます。</p><ul><li>一番右の列で、どの単語をどう読んでいるのかがわかります。</li><li><strong>この先使用するのは左の2列だけです。</strong>3列目を見ながら、変換にミスがあれば2列目を修正していきます。</li></ul>',9),Je=n("h4",null,"3. 必要な列をコピーする",-1),Qe=n("div",null,[n("img",{src:Ce,alt:""})],-1),Xe=n("p",null,"読みがなのチェック・修正が終わったら、左2列をコピーして以降のステップ（並べ替え）に進んでください。",-1),We=n("ul",null,[n("li",null,"配列読みは次の並べ替えのステップで自動生成します。")],-1),Ke={__name:"Reading",setup(o){return(e,s)=>(c(),d(v,null,[Fe,ze,u(Ne),Ze,u(Ye),u(qe),Je,Qe,Xe,We],64))}},et="/sakuin-tool/assets/before-5b114135.png",tt="/sakuin-tool/assets/after-1f9d2399.png",nt=n("summary",null,"配列読みへの変換だけ必要な場合はこちら",-1),st={__name:"Normalize",setup(o){const e=f(""),s=f(!0),t=m(()=>N(e.value,s.value));return(l,r)=>(c(),d("details",null,[nt,n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":r[0]||(r[0]=a=>s.value=a)},null,512),[[S,s.value]]),A("カタカナ・数字・アルファベット以外を削除する")]),w(n("textarea",{placeholder:"paste here!","onUpdate:modelValue":r[1]||(r[1]=a=>e.value=a)},null,512),[[re,e.value]]),u(E,{result:h(t)},null,8,["result"])]))}};const rt=o=>($("data-v-61203d66"),o=o(),M(),o),lt={class:"limit-height"},ot=rt(()=>n("thead",null,[n("tr",null,[n("th",null,"項目"),n("th",null,"読み"),n("th",null,"配列読み")])],-1)),it={class:"reading"},at={class:"normalized-reading"},ut={__name:"SortResult",props:{sortedArr:Array},setup(o){const e=o,s=f(!1),t=m(()=>e.sortedArr.map(r=>r.item).join(`
`)),l=m(()=>s.value?e.sortedArr.map(r=>`${r.item}	${r.reading}	${r.normalized}`).join(`
`):t.value);return(r,a)=>(c(),d(v,null,[n("div",lt,[n("table",null,[ot,n("tbody",null,[(c(!0),d(v,null,R(o.sortedArr,(i,p)=>(c(),d("tr",{key:p},[n("td",null,y(i.item),1),n("td",it,y(i.reading),1),n("td",at,y(i.normalized),1)]))),128))])])]),u(ae,{copyStr:h(l)},null,8,["copyStr"]),n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":a[0]||(a[0]=i=>s.value=i)},null,512),[[S,s.value]]),A("3列ともコピーする")])],64))}},ct=C(ut,[["__scopeId","data-v-61203d66"]]),G=(o,e)=>{const s=String(o).toLowerCase(),t=String(e).toLowerCase();return s>t?1:s<t?-1:0};class dt{constructor(){this.parsedLines=[]}addData(e,s){this.parsedLines.push({item:e,reading:s,normalized:N(s,!0)})}addHeading(){"あかさたなはまやらわ".split("").forEach(e=>{this.parsedLines.push({item:"■"+e+"行",reading:"",normalized:N(e)})})}execute(){return this.parsedLines.sort((e,s)=>G(e.item,s.item)).sort((e,s)=>G(e.reading,s.reading)).sort((e,s)=>G(e.normalized,s.normalized))}}const pt=o=>($("data-v-98d2778a"),o=o(),M(),o),ht=pt(()=>n("h2",null,"並べ替え",-1)),mt=V("<p data-v-98d2778a><code data-v-98d2778a>読み</code>の情報を<code data-v-98d2778a>配列読み</code>に変換して並べ替えます。<strong data-v-98d2778a>1列目が最終的な索引になります。</strong></p><ul data-v-98d2778a><li data-v-98d2778a>最優先は<code data-v-98d2778a>配列読み</code>の情報。</li><li data-v-98d2778a><code data-v-98d2778a>配列読み</code>が同じ場合は<code data-v-98d2778a>読み</code>で昇順ソート。</li><li data-v-98d2778a><code data-v-98d2778a>読み</code>も同じ場合は<code data-v-98d2778a>項目</code>の文字コード昇順（同じ文字種がまとまります）。</li></ul>",2),_t={key:0},ft={__name:"Sort",setup(o){const e=f(""),s=f(!1),t=m(()=>{const i=T(e.value);return s.value?i.slice(1):i}),l=m(()=>t.value.filter(i=>i.trim().length>0).map(i=>{const p=i.split("	");if(p.length<2)return null;const g=p[0].trim(),b=p[1].trim();return g.length<1||b.length<1?null:{item:g,reading:b}}).filter(Boolean)),r=f(!0),a=m(()=>{const i=new dt;return l.value.forEach(p=>i.addData(p.item,p.reading)),r.value&&i.addHeading(),i.execute()});return(i,p)=>(c(),d(v,null,[ht,u(st),u(Z,{beforePath:h(et),afterPath:h(tt)},null,8,["beforePath","afterPath"]),mt,n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":p[0]||(p[0]=g=>s.value=g)},null,512),[[S,s.value]]),A("先頭行をスキップする")]),n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":p[1]||(p[1]=g=>r.value=g)},null,512),[[S,r.value]]),A("見出しを追加する")]),u(D,{onUpdateContent:p[2]||(p[2]=g=>e.value=g.content)}),h(t).length?(c(),d("div",_t,[u(ct,{sortedArr:h(a)},null,8,["sortedArr"])])):x("",!0)],64))}},gt=C(ft,[["__scopeId","data-v-98d2778a"]]);const At={class:"area"},vt={key:0},bt={__name:"IgnorableArea",setup(o){const e=f(!1);return(s,t)=>(c(),d("div",At,[n("label",null,[w(n("input",{type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=l=>e.value=l)},null,512),[[S,e.value]]),A("無視する")]),e.value?x("",!0):(c(),d("div",vt,[le(s.$slots,"default",{},void 0,!0)]))]))}},L=C(bt,[["__scopeId","data-v-de7ca281"]]),kt={key:0},yt=n("h3",null,"見よ先の括弧書きが足りません：",-1),wt=n("thead",null,[n("tr",null,[n("th",null,"見よ項目"),n("th",null,"必要な項目")])],-1),St={__name:"FindMissingBackLink",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const s=o,t=m(()=>{const r=new U(s.result).findMissingBackLink();return e("checkFinished",{problem:"missingBackLink",count:r.length}),r});return(l,r)=>h(t).length?(c(),d("div",kt,[yt,u(L,null,{default:I(()=>[n("table",null,[wt,n("tbody",null,[(c(!0),d(v,null,R(h(t),(a,i)=>(c(),d("tr",{key:i},[n("td",null,y(a.problem),1),n("td",null,y(a.require),1)]))),128))])])]),_:1})])):x("",!0)}},xt={key:0},Rt=n("h3",null,"見よ項目のすぐ隣に見よ先項目があります：",-1),Ct={__name:"FindAdjacent",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const s=o,t=m(()=>{const r=new U(s.result).findAdjacent();return e("checkFinished",{problem:"adjacent",count:r.length}),r});return(l,r)=>h(t).length?(c(),d("div",xt,[Rt,u(L,null,{default:I(()=>[u(O,{arr:h(t)},null,8,["arr"])]),_:1})])):x("",!0)}},Bt={key:0},It=n("h3",null,"見よ項目が足りません：",-1),Lt=n("thead",null,[n("tr",null,[n("th",null,"括弧のある項目"),n("th",null,"必要な見よ項目")])],-1),$t={__name:"CheckMissingRef",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const s=o,t=m(()=>{const r=new U(s.result).findMissingRefs();return e("checkFinished",{problem:"missingRef",count:r.length}),r});return(l,r)=>h(t).length?(c(),d("div",Bt,[It,u(L,null,{default:I(()=>[n("table",null,[Lt,n("tbody",null,[(c(!0),d(v,null,R(h(t),(a,i)=>(c(),d("tr",{key:i},[n("td",null,y(a.problem),1),n("td",null,[u(O,{arr:a.require},null,8,["arr"])])]))),128))])])]),_:1})])):x("",!0)}},Mt=n("thead",null,[n("tr",null,[n("th",null,"重複項目")])],-1),W={__name:"DuplicateTable",props:{detailsArr:Array},setup(o){return(e,s)=>(c(),d("table",null,[Mt,n("tbody",null,[(c(!0),d(v,null,R(o.detailsArr,(t,l)=>(c(),d("tr",{key:l},[n("td",null,[u(O,{arr:t},null,8,["arr"])])]))),128))])]))}};class K{constructor(e){const s=T(e);this.entries=s.filter(t=>String(t).trim()).map(t=>new H(t)),this.refs=this.entries.filter(t=>t.isReference),this.nonRefs=this.entries.filter(t=>!t.isReference),this.mainEntries=this.nonRefs.filter(t=>!t.isChild)}getUngrouped(){const e=[];return this.mainEntries.forEach(t=>{const l=t.basename,r=this.mainEntries.filter(a=>a.basename==l).map(a=>a.rawStr);r.length!=1&&e.push(r)}),e.filter((t,l,r)=>l===r.findIndex(a=>a.join("")===t.join("")))}getConflicting(){return this.refs.map(e=>{const s=e.basename,t=this.mainEntries.filter(l=>l.basename==s);return t.length<1?null:[e.name].concat(t.map(l=>l.rawStr))}).filter(Boolean)}}const Tt={key:0},Dt=n("h3",null,"見よ項目が本項目として残っています：",-1),jt={__name:"CheckConflict",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const s=o,t=m(()=>{const r=new K(s.result).getConflicting();return e("checkFinished",{problem:"conflictReference",count:r.length}),r});return(l,r)=>h(t).length?(c(),d("div",Tt,[Dt,u(L,null,{default:I(()=>[u(W,{detailsArr:h(t)},null,8,["detailsArr"])]),_:1})])):x("",!0)}},Et={key:0},Ot=n("h3",null,"名寄せが不十分です：",-1),Ut={__name:"CheckUngrouped",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const s=o,t=m(()=>{const r=new K(s.result).getUngrouped();return e("checkFinished",{problem:"ungrouped",count:r.length}),r});return(l,r)=>h(t).length?(c(),d("div",Et,[Ot,u(L,null,{default:I(()=>[u(W,{detailsArr:h(t)},null,8,["detailsArr"])]),_:1})])):x("",!0)}};class Gt{constructor(e){const s=new H(e);this.nombres=new P(s.address).nombres,this.problems=[]}checkSort(){if(!(this.nombres.length<2)){for(let e=0;e<this.nombres.length-1;e++)if(this.nombres[e].intValue>=this.nombres[e+1].intValue){this.problems.push({color:"red",text:"順番！"});break}}}checkHyphen(){if(!(this.nombres.length<3))for(let e=0;e<this.nombres.length-2;e++){const s=this.nombres[e],t=this.nombres[e+1],l=this.nombres[e+2];if(s.intValue+1==t.intValue&&s.intValue+2==l.intValue&&!t.hyphenated){this.problems.push({color:"blue",text:"連続！"});break}}}}const Nt=o=>($("data-v-8f5073b9"),o=o(),M(),o),Pt={key:0},Yt=Nt(()=>n("h3",null,"ノンブルの並びに問題があります：",-1)),Vt={__name:"CheckAddress",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const s=o,t=r=>T(r).filter(i=>String(i).trim()).map(i=>{const p=new Gt(i);return p.checkSort(),p.checkHyphen(),p.problems.length>0?{line:i,detail:p.problems}:null}).filter(Boolean),l=m(()=>{const r=t(s.result);return e("checkFinished",{problem:"invalidAddress",count:r.length}),r});return(r,a)=>h(l).length?(c(),d("div",Pt,[Yt,u(L,null,{default:I(()=>[n("ul",null,[(c(!0),d(v,null,R(h(l),(i,p)=>(c(),d("li",{key:p},[n("span",null,y(i.line),1),(c(!0),d(v,null,R(i.detail,(g,b)=>(c(),d("span",{key:b},[n("span",{style:oe({color:g.color})},"←"+y(g.text),5)]))),128))]))),128))])]),_:1})])):x("",!0)}},Ht=C(Vt,[["__scopeId","data-v-8f5073b9"]]),qt=n("h2",null,"体裁チェック",-1),Ft={__name:"CheckFormat",setup(o){const e=f(""),s=z(new Map),t=a=>{s.set(a.problem,a.count)},l=m(()=>Array.from(s.values()).reduce((a,i)=>a+i,0)>0),r=m(()=>e.value.length<1||l.value?"":"問題ありません！");return(a,i)=>(c(),d(v,null,[qt,u(D,{onUpdateContent:i[0]||(i[0]=p=>e.value=p.content)}),n("p",null,[n("strong",null,y(h(r)),1)]),u($t,{result:e.value,onCheckFinished:t},null,8,["result"]),u(Ut,{result:e.value,onCheckFinished:t},null,8,["result"]),u(Ht,{result:e.value,onCheckFinished:t},null,8,["result"]),u(St,{result:e.value,onCheckFinished:t},null,8,["result"]),u(jt,{result:e.value,onCheckFinished:t},null,8,["result"]),u(Ct,{result:e.value,onCheckFinished:t},null,8,["result"])],64))}},zt={class:"format"},Zt=n("h1",null,"索引の整形",-1),en={__name:"FormatView",setup(o){return(e,s)=>(c(),d("div",zt,[Zt,u(Se),u(j),u(Ke),u(j),u(gt),u(j),u(Ft),u(j)]))}};export{en as default};
