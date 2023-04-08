import{S as E}from"./SectionEnd-7cce738a.js";import{o as c,a as d,F as k,g as B,t as y,_ as x,i as f,j as g,k as G,e as s,b as u,w as S,v as w,n as te,u as m,f as v,l as ne,h as R,p as I,d as $,m as se,c as N,q as re,s as le,x as M,y as oe}from"./index-85a5e265.js";import{B as q}from"./BeforeAfter-93351b7e.js";import{a as T,S as L,b as ie,c as z,n as Z,C as ae}from"./CopyButton-aeb0970f.js";import{A as P,E as U,R as j}from"./entry-5e8da591.js";const ue="/sakuin-tool/assets/before-e702eb7e.png",ce="/sakuin-tool/assets/after-0c054fa5.png",F={__name:"SimpleList",props:{arr:Array},setup(o){return(e,n)=>(c(),d("ul",null,[(c(!0),d(k,null,B(o.arr,(t,l)=>(c(),d("li",{key:l},y(t),1))),128))]))}};const de={class:"required"},pe=["disabled"],he={__name:"RefTableRow",props:{determined:Boolean,refItem:Object},emits:["acceptToggled"],setup(o,{emit:e}){const n=o,t=f(!1),l=g(()=>n.determined||t.value),r=()=>{e("acceptToggled",{isChecked:t.value})};return G(()=>n.refItem,()=>{t.value=!1}),(a,i)=>(c(),d("tr",{class:te({blur:m(l)})},[s("td",null,y(o.refItem.problem),1),s("td",de,[u(F,{arr:o.refItem.require},null,8,["arr"])]),s("td",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":i[0]||(i[0]=p=>t.value=p),onChange:r,disabled:o.determined},null,40,pe),[[w,t.value]])])],2))}},me=x(he,[["__scopeId","data-v-400f48d5"]]);const J=o=>(I("data-v-34760777"),o=o(),$(),o),_e={key:0},fe=J(()=>s("h3",null,"見よ項目が足りません：",-1)),ge=J(()=>s("thead",null,[s("tr",null,[s("th",null,"括弧のある項目"),s("th",null,"必要な見よ項目"),s("th",null,"追加する")])],-1)),Ae={__name:"FindMissingRefs",props:{missingRefs:Array},emits:["acceptAllToggled","acceptToggled"],setup(o,{emit:e}){const n=o,t=f(!1),l=()=>{e("acceptAllToggled",{isChecked:t.value})},r=(a,i)=>{e("acceptToggled",{isChecked:a.isChecked,idx:i})};return G(()=>n.missingRefs,()=>{n.missingRefs.length&&(t.value=!1)}),(a,i)=>o.missingRefs.length?(c(),d("div",_e,[fe,s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":i[0]||(i[0]=p=>t.value=p),onChange:l},null,544),[[w,t.value]]),v("まとめて追加する ")]),s("table",null,[ge,s("tbody",null,[(c(!0),d(k,null,B(o.missingRefs,(p,h)=>(c(),ne(me,{key:h,determined:t.value,refItem:p,onAcceptToggled:_=>r(_,h)},null,8,["determined","refItem","onAcceptToggled"]))),128))])])])):R("",!0)}},ve=x(Ae,[["__scopeId","data-v-34760777"]]);class be{constructor(e,n=!1){this.linesParsed=e.filter(t=>t.trim()).map(t=>{const l=t.split("	").slice(0,2);return l.length<2?{Item:String(l[0]).trimEnd(),Address:""}:(n&&l.reverse(),{Item:String(l[0]).trimEnd(),Address:String(l[1]).trim()})}),this.groupedLines=[]}group(){const e=new Map;this.linesParsed.forEach(n=>{if(e.has(n.Item)){const t=e.get(n.Item)+", "+n.Address;e.set(n.Item,t)}else e.set(n.Item,n.Address)}),e.forEach((n,t)=>{const l=new P(n);this.groupedLines.push((t+"　　"+l.formatAll()).trimEnd())})}groupByOrder(){const e=[];for(let n=0;n<this.linesParsed.length;n++){const t=this.linesParsed[n];if(n==0){e.push({Item:t.Item,Address:t.Address});continue}const l=e.length-1;if(t.Item==e[l].Item){const r=e[l].Address+", "+t.Address;e[l].Address=r}else e.push({Item:t.Item,Address:t.Address})}this.groupedLines=e.map(n=>{const t=new P(n.Address);return(n.Item+"　　"+t.formatAll()).trimEnd()})}getGroupedLines(e=!1){return e?this.groupByOrder():this.group(),this.groupedLines}}class Y{constructor(e){const n=T(e);this.entries=n.filter(t=>String(t).trim()).map(t=>new U(t)),this.refs=this.entries.filter(t=>t.isReference),this.nonRefs=this.entries.filter(t=>!t.isReference),this.referred=this.entries.filter(t=>t.referredFrom.length>0)}findMissingRefferdFrom(){return this.refs.map(e=>this.nonRefs.filter(t=>t.basename==e.referTo&&t.referredFrom.includes(e.basename)).length>0?null:{problem:e.name,require:`${e.referTo}（${e.basename}）`}).filter(Boolean)}findMissingRefs(){return this.referred.map(e=>{const n=e.referredFrom.filter(t=>this.refs.filter(r=>r.basename==t&&r.referTo==e.basename).length<1);return n.length<1?null:{problem:e.name,require:n.map(t=>`${t}　→${e.basename}`)}}).filter(Boolean)}findAdjacent(){const e=[];return this.entries.forEach((n,t)=>{if(n.isReference){const l=this.entries[t-1];l&&!l.isReference&&l.referredFrom.includes(n.basename)&&e.push(n);const r=this.entries[t+1];r&&!r.isReference&&r.referredFrom.includes(n.basename)&&e.push(n)}}),e.map(n=>n.name)}}const Q=o=>(I("data-v-34b01056"),o=o(),$(),o),ke=Q(()=>s("h2",null,"名寄せ",-1)),ye=Q(()=>s("p",null,[v("ノンブルの"),s("span",{style:{color:"red"}},"並び"),v("、"),s("span",{style:{color:"blue"}},"重複"),v("、"),s("span",{style:{color:"green"}},"連続"),v("を整理します。記号での装飾にも対応。")],-1)),Se={__name:"Group",setup(o){const e=f(""),n=g(()=>{const A=T(e.value);return r.value?A.slice(1):A}),t=f(!1),l=f(!1),r=f(!0),a=g(()=>new be(n.value,t.value).getGroupedLines(l.value).join(`
`)),i=g(()=>new Y(a.value).findMissingRefs()),p=f(!1),h=A=>{p.value=A.isChecked},_=se(new Map),V=g(()=>i.value.filter((A,b)=>_.has(b)&&_.get(b)).map(A=>A.require).flat()),K=A=>{_.set(A.idx,A.isChecked)},H=g(()=>p.value?i.value.map(A=>A.require).flat():V.value.length?V.value:[]),ee=g(()=>H.value.length<1?a.value:a.value+`
`+H.value.join(`
`));return G(()=>a.value,()=>{Array.from(_.keys()).forEach(A=>{_.set(A,!1)}),p.value=!1}),(A,b)=>(c(),d(k,null,[ke,u(q,{beforePath:m(ue),afterPath:m(ce)},null,8,["beforePath","afterPath"]),ye,s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":b[0]||(b[0]=C=>r.value=C)},null,512),[[w,r.value]]),v("先頭行をスキップする")]),s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":b[1]||(b[1]=C=>t.value=C)},null,512),[[w,t.value]]),v("ノンブルが左列")]),s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":b[2]||(b[2]=C=>l.value=C)},null,512),[[w,l.value]]),v("連続している項目のみ名寄せする")]),u(L,{onUpdateContent:b[3]||(b[3]=C=>e.value=C.content)}),u(j,{result:m(ee)},null,8,["result"]),u(ve,{missingRefs:m(i),onAcceptAllToggled:h,onAcceptToggled:K},null,8,["missingRefs"])],64))}},we=x(Se,[["__scopeId","data-v-34b01056"]]),xe="/sakuin-tool/assets/yomi_demo01-8364cbd8.png",Re="/sakuin-tool/assets/yomi_demo02-f4b0ed71.png",Ce="/sakuin-tool/assets/yomi_demo03-90b9cbf5.png",Be="/sakuin-tool/assets/yomi_dl_release-5fbf65d3.png",Ie="/sakuin-tool/assets/yomi_dl01-ec508be3.png",$e="/sakuin-tool/assets/yomi_dl02-ca9dfe3e.png",Me="/sakuin-tool/assets/yomi_dl03-71cef81c.png",Te="data:image/png;base64,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",Le="/sakuin-tool/assets/yomi_dl05-bed27782.png",De="/sakuin-tool/assets/yomi_dl06-6ec5b794.png",Ee="/sakuin-tool/assets/yomi_dl07-62ba7678.png",je={name:"DownloadGuide"},Oe=N('<summary>ダウンロード方法（初回のみ）</summary><div><img src="'+Be+'" alt=""></div><p><a href="https://github.com/AWtnb/flet_yomi/releases">リリースページ</a>の一番上に表示されている exe ファイルをクリックするとダウンロードが始まります。100MB を超える巨大なファイルなので、余裕のある回線をご利用ください。</p><h3>ダウンロード後の流れ</h3><p>個人開発のアプリなのでダウンロード時に警告が表示されます（下記は Microsoft Edge の例）。信頼していただければ、下記の手順で有効化してください。</p><ol><li>マウスを乗せると表示されるメニューから「保存」を選択。 <div><img src="'+Ie+'" alt=""></div></li><li>あらためて警告が出るので「詳細表示」をクリック。 <div><img src="'+$e+'" alt=""></div></li><li>「保持する」をクリックするとダウンロードが正式に始まります。 <div><img src="'+Me+'" alt=""></div></li><li>ダウンロード先のフォルダを開くと <code>yomi.exe</code> というファイルがダウンロードされているはず。 <div><img src="'+Te+'" alt=""></div></li><li>アプリはこの exe 単体で動作します。適当なフォルダを作って移動させましょう。 <div><img src="'+Le+'" alt=""></div></li></ol><h3>初回起動時</h3><p>おそらく初回の起動時に、Windows からの警告が表示されます。同じく信頼していただけましたら、下記の手順で有効化してください。</p><ol><li>「PC が保護されました」という表示の場合は「詳細情報」をクリック。 <div><img src="'+De+'" alt=""></div></li><li>表示される「実行」ボタンをクリックするとアプリが起動します。 <div><img src="'+Ee+'" alt=""></div></li></ol>',9),Pe=[Oe];function Ge(o,e,n,t,l,r){return c(),d("details",null,Pe)}const Ne=x(je,[["render",Ge]]),Ue=s("summary",null,"カタカナひらがな相互変換",-1),Fe={__name:"JaConv",setup(o){const e=f(""),n=g(()=>e.value.replace(/[\u30a1-\u30f4\u3041-\u3093]/g,t=>t.match(/[\u30a1-\u30f4]/)?ie(t):z(t)));return(t,l)=>(c(),d("details",null,[Ue,u(L,{onUpdateContent:l[0]||(l[0]=r=>e.value=r.content)}),u(j,{result:m(n)},null,8,["result"])]))}},Ye=s("summary",null,"ローマ字に変換",-1),Ve=s("ul",null,[s("li",null,[v("ヘボン式ローマ字に従っています。 "),s("ul",null,[s("li",null,"拗音は「ゃ」「ゅ」「ょ」にのみ対応しています。")])]),s("li",null,[v("変換できなかった文字はそのまま表示します。 "),s("ul",null,[s("li",null,"長音（ー）ならびに「ぁ」「ぃ」「ぅ」「ぇ」「ぉ」には非対応です。"),s("li",null,"日本語に登場する頻度の低い「ヴ」や、その他の表記が定まらないケースにも非対応です。")])])],-1),He={__name:"Romanize",setup(o){const e=new Map;[["ア","A"],["イ","I"],["ウ","U"],["エ","E"],["オ","O"],["カ","Ka"],["キ","Ki"],["ク","Ku"],["ケ","Ke"],["コ","Ko"],["サ","Sa"],["シ","Shi"],["ス","Su"],["セ","Se"],["ソ","So"],["タ","Ta"],["チ","Chi"],["ツ","Tsu"],["テ","Te"],["ト","To"],["ナ","Na"],["ニ","Ni"],["ヌ","Nu"],["ネ","Ne"],["ノ","No"],["ハ","Ha"],["ヒ","Hi"],["フ","Fu"],["ヘ","He"],["ホ","Ho"],["マ","Ma"],["ミ","Mi"],["ム","Mu"],["メ","Me"],["モ","Mo"],["ヤ","Ya"],["ユ","Yu"],["ヨ","Yo"],["ラ","Ra"],["リ","Ri"],["ル","Ru"],["レ","Re"],["ロ","Ro"],["ワ","Wa"],["ヲ","Wo"],["ン","N"],["ガ","Ga"],["ギ","Gi"],["グ","Gu"],["ゲ","Ge"],["ゴ","Go"],["ザ","Za"],["ジ","Ji"],["ズ","Zu"],["ゼ","Ze"],["ゾ","Zo"],["ダ","Da"],["ヂ","Di"],["ヅ","Zu"],["デ","De"],["ド","Do"],["バ","Ba"],["ビ","Bi"],["ブ","Bu"],["ベ","Be"],["ボ","Bo"],["パ","Pa"],["ピ","Pi"],["プ","Pu"],["ペ","Pe"],["ポ","Po"],["ャ","Lya"],["ュ","Lyu"],["ョ","Lyo"],["ッ","Ltu"]].forEach(r=>e.set(...r));const n=r=>{let a=z(r);for(let i of e.keys()){const p=new RegExp(i,"g");a=a.replace(p,e.get(i))}return a=a.replace(/([CS]h|J)iLy(.)/g,"$1$2").replace(/([A-Z])iL(y.)/g,"$1$2").replace(/Ltu(.)/g,"$1$1"),a.toLowerCase()},t=f(""),l=g(()=>n(t.value));return(r,a)=>(c(),d("details",null,[Ye,Ve,u(L,{onUpdateContent:a[0]||(a[0]=i=>t.value=i.content)}),u(j,{result:m(l)},null,8,["result"])]))}},qe=s("h2",null,"よみがな取得",-1),ze=s("p",null,[s("a",{href:"https://github.com/AWtnb/flet_yomi/releases"},"外部アプリ"),v("を使用します。")],-1),Ze=N('<h3>作業手順</h3><h4>1. 名寄せした索引項目の読み情報を取得する</h4><div><img src="'+xe+'" alt=""></div><p>名寄せが済んだ索引をテキストボックスに貼り付けて<code>GO!</code>のボタンをクリックすると読み情報が取得されます。</p><ul><li>結果は「元の文字」「読みがな」「解析の詳細」の3列です。</li><li>オプションの意味： <ul><li><code>Skip inside: () / []</code>：括弧内の文字（見よ元項目の情報など）を無視します。</li><li><code>Skip nombles or reference (for book index)</code>：ノンブル情報（全角空白2個の後ろにある数字）、見よ先情報（<code>　→</code>の後ろにある文字）を無視します。</li></ul></li></ul><h4>2. 結果を Microsoft Excel に貼り付けてチェックする</h4><div><img src="'+Re+'" alt=""></div><p><code>COPY!</code>ボタンで変換結果をコピーします。Excel を開いて貼り付けると楽にチェックできます。</p><ul><li>一番右の列で、どの単語をどう読んでいるのかがわかります。</li><li><strong>この先使用するのは左の2列だけです。</strong>3列目を見ながら、変換にミスがあれば2列目を修正していきます。</li></ul>',9),Je=s("h4",null,"3. 必要な列をコピーする",-1),Qe=s("div",null,[s("img",{src:Ce,alt:""})],-1),Xe=s("p",null,"読みがなのチェック・修正が終わったら、左2列をコピーして以降のステップ（並べ替え）に進んでください。",-1),We=s("ul",null,[s("li",null,"配列読みは次の並べ替えのステップで自動生成します。")],-1),Ke={__name:"Reading",setup(o){return(e,n)=>(c(),d(k,null,[qe,ze,u(Ne),Ze,u(Fe),u(He),Je,Qe,Xe,We],64))}},et="/sakuin-tool/assets/before-5b114135.png",tt="/sakuin-tool/assets/after-1f9d2399.png",nt=s("summary",null,"配列読みへの変換だけ必要な場合はこちら",-1),st={__name:"Normalize",setup(o){const e=f(""),n=f(!0),t=g(()=>Z(e.value,n.value));return(l,r)=>(c(),d("details",null,[nt,s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":r[0]||(r[0]=a=>n.value=a)},null,512),[[w,n.value]]),v("カタカナ・数字・アルファベット以外を削除する")]),S(s("textarea",{placeholder:"paste here!","onUpdate:modelValue":r[1]||(r[1]=a=>e.value=a)},null,512),[[re,e.value]]),u(j,{result:m(t)},null,8,["result"])]))}};const rt=o=>(I("data-v-07e1f1c0"),o=o(),$(),o),lt={key:0},ot={class:"limit-height"},it=rt(()=>s("thead",null,[s("tr",null,[s("th",null,"項目"),s("th",null,"読み"),s("th",null,"配列読み")])],-1)),at={class:"reading"},ut={class:"normalized-reading"},ct={__name:"SortResult",props:{sortedArr:Array},setup(o){const e=o,n=f(!1),t=g(()=>e.sortedArr.map(r=>r.item).join(`
`)),l=g(()=>n.value?e.sortedArr.map(r=>`${r.item}	${r.reading}	${r.normalized}`).join(`
`):t.value);return(r,a)=>o.sortedArr.length?(c(),d("div",lt,[s("div",ot,[s("table",null,[it,s("tbody",null,[(c(!0),d(k,null,B(o.sortedArr,(i,p)=>(c(),d("tr",{key:p},[s("td",null,y(i.item),1),s("td",at,y(i.reading),1),s("td",ut,y(i.normalized),1)]))),128))])])]),u(ae,{copyStr:m(l)},null,8,["copyStr"]),s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":a[0]||(a[0]=i=>n.value=i)},null,512),[[w,n.value]]),v("3列ともコピーする")])])):R("",!0)}},dt=x(ct,[["__scopeId","data-v-07e1f1c0"]]),O=(o,e)=>{const n=String(o).toLowerCase(),t=String(e).toLowerCase();return n>t?1:n<t?-1:0};class pt{constructor(){this.parsedLines=[]}addData(e,n){this.parsedLines.push({item:e,reading:n,normalized:Z(n,!0)})}execute(){return this.parsedLines.sort((e,n)=>O(e.item,n.item)).sort((e,n)=>O(e.reading,n.reading)).sort((e,n)=>O(e.normalized,n.normalized))}}const ht=o=>(I("data-v-d049a185"),o=o(),$(),o),mt=ht(()=>s("h2",null,"並べ替え",-1)),_t=N("<p data-v-d049a185><code data-v-d049a185>読み</code>の情報を<code data-v-d049a185>配列読み</code>に変換して並べ替えます。<strong data-v-d049a185>1列目が最終的な索引になります。</strong></p><ul data-v-d049a185><li data-v-d049a185>最優先は<code data-v-d049a185>配列読み</code>の情報。</li><li data-v-d049a185><code data-v-d049a185>配列読み</code>が同じ場合は<code data-v-d049a185>読み</code>で昇順ソート。</li><li data-v-d049a185><code data-v-d049a185>読み</code>も同じ場合は<code data-v-d049a185>項目</code>の文字コード昇順（同じ文字種がまとまります）。</li></ul>",2),ft={__name:"Sort",setup(o){const e=f(""),n=f(!1),t=g(()=>{const a=T(e.value);return n.value?a.slice(1):a}),l=g(()=>t.value.filter(a=>a.trim().length>0).map(a=>{const i=a.split("	");if(i.length<2)return null;const p=i[0].trim(),h=i[1].trim();return p.length<1||h.length<1?null:{item:p,reading:h}}).filter(Boolean)),r=g(()=>{const a=new pt;return l.value.forEach(i=>a.addData(i.item,i.reading)),a.execute()});return(a,i)=>(c(),d(k,null,[mt,u(st),u(q,{beforePath:m(et),afterPath:m(tt)},null,8,["beforePath","afterPath"]),_t,s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":i[0]||(i[0]=p=>n.value=p)},null,512),[[w,n.value]]),v("先頭行をスキップする")]),u(L,{onUpdateContent:i[1]||(i[1]=p=>e.value=p.content)}),u(dt,{sortedArr:m(r)},null,8,["sortedArr"])],64))}},gt=x(ft,[["__scopeId","data-v-d049a185"]]);const At={class:"area"},vt={key:0},bt={__name:"IgnorableArea",setup(o){const e=f(!1);return(n,t)=>(c(),d("div",At,[s("label",null,[S(s("input",{type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=l=>e.value=l)},null,512),[[w,e.value]]),v("無視する")]),e.value?R("",!0):(c(),d("div",vt,[le(n.$slots,"default",{},void 0,!0)]))]))}},D=x(bt,[["__scopeId","data-v-de7ca281"]]),kt={key:0},yt=s("h3",null,"見よ先の括弧書きが足りません：",-1),St=s("thead",null,[s("tr",null,[s("th",null,"見よ項目"),s("th",null,"必要な項目")])],-1),wt={__name:"FindMissingRefferdFrom",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const n=o,t=g(()=>{const r=new Y(n.result).findMissingRefferdFrom();return e("checkFinished",r.length),r});return(l,r)=>m(t).length?(c(),d("div",kt,[yt,u(D,null,{default:M(()=>[s("table",null,[St,s("tbody",null,[(c(!0),d(k,null,B(m(t),(a,i)=>(c(),d("tr",{key:i},[s("td",null,y(a.problem),1),s("td",null,y(a.require),1)]))),128))])])]),_:1})])):R("",!0)}},xt={key:0},Rt=s("h3",null,"見よ項目のすぐ隣に見よ先項目があります：",-1),Ct={__name:"FindAdjacent",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const n=o,t=g(()=>{const r=new Y(n.result).findAdjacent();return e("checkFinished",r.length),r});return(l,r)=>m(t).length?(c(),d("div",xt,[Rt,u(D,null,{default:M(()=>[u(F,{arr:m(t)},null,8,["arr"])]),_:1})])):R("",!0)}},Bt=s("thead",null,[s("tr",null,[s("th",null,"重複項目")])],-1),X={__name:"DuplicateTable",props:{detailsArr:Array},setup(o){return(e,n)=>(c(),d("table",null,[Bt,s("tbody",null,[(c(!0),d(k,null,B(o.detailsArr,(t,l)=>(c(),d("tr",{key:l},[s("td",null,[u(F,{arr:t},null,8,["arr"])])]))),128))])]))}};class W{constructor(e){const n=T(e);this.entries=n.filter(t=>String(t).trim()).map(t=>new U(t)),this.refs=this.entries.filter(t=>t.isReference),this.nonRefs=this.entries.filter(t=>!t.isReference),this.mainEntries=this.nonRefs.filter(t=>!t.isChild),this.referred=this.entries.filter(t=>t.referredFrom.length>0),this.nonReferred=this.entries.filter(t=>t.referredFrom.length<1)}getUngrouped(){const e=[];return this.mainEntries.forEach(n=>{const t=n.basename,l=this.mainEntries.filter(r=>r.basename==t);l.length!=1&&(e.map(r=>r.id).includes(t)||e.push({id:t,detail:l.map(r=>r.rawStr)}))}),e.map(n=>n.detail)}getConflicting(){return this.refs.map(e=>{const n=e.basename,t=this.mainEntries.filter(l=>l.basename==n);return t.length<1?null:[e.name].concat(t.map(l=>l.rawStr))}).filter(Boolean)}}const It={key:0},$t=s("h3",null,"見よ項目が本項目として残っています：",-1),Mt={__name:"CheckConflict",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const n=o,t=g(()=>{const r=new W(n.result).getConflicting();return e("checkFinished",r.length),r});return(l,r)=>m(t).length?(c(),d("div",It,[$t,u(D,null,{default:M(()=>[u(X,{detailsArr:m(t)},null,8,["detailsArr"])]),_:1})])):R("",!0)}},Tt={key:0},Lt=s("h3",null,"名寄せが不十分です：",-1),Dt={__name:"CheckUngrouped",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const n=o,t=g(()=>{const r=new W(n.result).getUngrouped();return e("checkFinished",r.length),r});return(l,r)=>m(t).length?(c(),d("div",Tt,[Lt,u(D,null,{default:M(()=>[u(X,{detailsArr:m(t)},null,8,["detailsArr"])]),_:1})])):R("",!0)}};class Et{constructor(e){const n=new U(e);this.nombres=new P(n.address).nombres,this.problems=[]}checkSort(){if(!(this.nombres.length<2)){for(let e=0;e<this.nombres.length-1;e++)if(this.nombres[e].intValue>=this.nombres[e+1].intValue){this.problems.push({color:"red",text:"順番！"});break}}}checkHyphen(){if(!(this.nombres.length<3))for(let e=0;e<this.nombres.length-2;e++){const n=this.nombres[e],t=this.nombres[e+1],l=this.nombres[e+2];if(n.intValue+1==t.intValue&&n.intValue+2==l.intValue&&!t.hyphenated){this.problems.push({color:"blue",text:"連続！"});break}}}}const jt=o=>(I("data-v-eb3432b6"),o=o(),$(),o),Ot={key:0},Pt=jt(()=>s("h3",null,"ノンブルの並びに問題があります：",-1)),Gt={__name:"CheckAddress",props:{result:String},emits:["checkFinished"],setup(o,{emit:e}){const n=o,t=r=>T(r).filter(i=>String(i).trim()).map(i=>{const p=new Et(i);return p.checkSort(),p.checkHyphen(),p.problems.length>0?{line:i,detail:p.problems}:null}).filter(Boolean),l=g(()=>{const r=t(n.result);return e("checkFinished",r.length),r});return(r,a)=>m(l).length?(c(),d("div",Ot,[Pt,u(D,null,{default:M(()=>[s("ul",null,[(c(!0),d(k,null,B(m(l),(i,p)=>(c(),d("li",{key:p},[s("span",null,y(i.line),1),(c(!0),d(k,null,B(i.detail,(h,_)=>(c(),d("span",{key:_},[s("span",{style:oe({color:h.color})},"←"+y(h.text),5)]))),128))]))),128))])]),_:1})])):R("",!0)}},Nt=x(Gt,[["__scopeId","data-v-eb3432b6"]]),Ut=s("h2",null,"体裁チェック",-1),Ft={__name:"CheckFormat",setup(o){const e=f(""),n=f(0),t=f(0),l=f(0),r=f(0),a=f(0),i=g(()=>e.value.length>0&&n.value+t.value+l.value+r.value+a.value==0?"問題ありません！":"");return(p,h)=>(c(),d(k,null,[Ut,u(L,{onUpdateContent:h[0]||(h[0]=_=>e.value=_.content)}),s("p",null,[s("strong",null,y(m(i)),1)]),u(Nt,{result:e.value,onCheckFinished:h[1]||(h[1]=_=>n.value=_)},null,8,["result"]),u(wt,{result:e.value,onCheckFinished:h[2]||(h[2]=_=>t.value=_)},null,8,["result"]),u(Dt,{result:e.value,onCheckFinished:h[3]||(h[3]=_=>l.value=_)},null,8,["result"]),u(Ct,{result:e.value,onCheckFinished:h[4]||(h[4]=_=>r.value=_)},null,8,["result"]),u(Mt,{result:e.value,onCheckFinished:h[5]||(h[5]=_=>a.value=_)},null,8,["result"])],64))}},Yt={class:"format"},Vt=s("h1",null,"索引の整形",-1),Qt={__name:"FormatView",setup(o){return(e,n)=>(c(),d("div",Yt,[Vt,u(we),u(E),u(Ke),u(E),u(gt),u(E),u(Ft),u(E)]))}};export{Qt as default};
