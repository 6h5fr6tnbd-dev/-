const STORAGE_KEY='morning-device-self-check-records';
const THEME_KEY='morning-device-self-check-theme';
const RECENT_COMMENT_WINDOW=20;
const COMMENT_LIBRARY={
  none:[
    {id:'none-01',text:'牛牛今日打卡像请了年假。'},
    {id:'none-02',text:'小兄弟上班迟到，工位都凉了。'},
    {id:'none-03',text:'鸡哥今天开机失败，绩效先寄。'},
    {id:'none-04',text:'二弟申请摸鱼，系统秒批通过。'},
    {id:'none-05',text:'本次升旗缺席，考勤表在叹气。'},
    {id:'none-06',text:'老板路过一看，当场判你待机。'},
    {id:'none-07',text:'今早状态像周一，连风都摆烂。'},
    {id:'none-08',text:'考勤机都困了，你还没开机。'},
    {id:'none-09',text:'绩效专员记下，牛牛今天静音。'},
    {id:'none-10',text:'全勤梦先缓缓，今日属实没响。'},
    {id:'none-11',text:'打卡倒是准时，开工完全没影。'},
    {id:'none-12',text:'摸鱼浓度拉满，小兄弟装死中。'},
    {id:'none-13',text:'鸡哥看了日报，都替你脸热。'},
    {id:'none-14',text:'晨会还没结束，二弟先下线了。'},
    {id:'none-15',text:'今日KPI写着，主打一个没动静。'},
    {id:'none-16',text:'牛牛这波表现，像在带薪睡觉。'},
    {id:'none-17',text:'人已到岗，设备依旧拒绝营业。'},
    {id:'none-18',text:'系统判定你在上班，其实在躺平。'},
    {id:'none-19',text:'今日战报空白，像老板的良心。'},
    {id:'none-20',text:'升旗台等半天，只等来一阵风。'},
    {id:'none-21',text:'牛牛没旷工，只是灵魂没上线。'},
    {id:'none-22',text:'小兄弟今天佛系，连卷都懒得卷。'},
    {id:'none-23',text:'鸡哥发来贺电，建议继续摆着。'},
    {id:'none-24',text:'二弟本日业绩，主打陪跑观众席。'},
    {id:'none-25',text:'考勤系统备注，这班上得像请假。'}
  ],
  normal:[
    {id:'normal-01',text:'牛牛今日准点开机，像个老员工。'},
    {id:'normal-02',text:'小兄弟正常打卡，HR都省心了。'},
    {id:'normal-03',text:'鸡哥确认到岗，今日没有丢份。'},
    {id:'normal-04',text:'二弟按时上班，绩效先给个笑脸。'},
    {id:'normal-05',text:'本次升旗顺利，考勤机轻轻鼓掌。'},
    {id:'normal-06',text:'老板嘴上不夸，心里已经点头。'},
    {id:'normal-07',text:'今早状态稳住，像KPI及格线。'},
    {id:'normal-08',text:'考勤表翻到你，终于不是空军。'},
    {id:'normal-09',text:'绩效小窗提示，今天算是会做人。'},
    {id:'normal-10',text:'全勤之路继续，牛牛还算争气。'},
    {id:'normal-11',text:'打卡完毕开工，流程走得挺体面。'},
    {id:'normal-12',text:'摸鱼先放放，小兄弟今天有样子。'},
    {id:'normal-13',text:'鸡哥阅后批准，你今天可以抬头。'},
    {id:'normal-14',text:'晨报刚生成，二弟表现算正常人。'},
    {id:'normal-15',text:'今日KPI不炸，部门群少了乐子。'},
    {id:'normal-16',text:'牛牛稳稳营业，没有辜负这早班。'},
    {id:'normal-17',text:'人到状态也到，系统决定先不喷。'},
    {id:'normal-18',text:'升旗动作合格，像练过考勤礼仪。'},
    {id:'normal-19',text:'今日战绩朴实，但足够保住面子。'},
    {id:'normal-20',text:'开机声一响，老板都少骂两句。'},
    {id:'normal-21',text:'牛牛没乱来，今天适合申请全勤。'},
    {id:'normal-22',text:'小兄弟状态在线，群友暂时闭嘴。'},
    {id:'normal-23',text:'鸡哥站你这边，说你今天挺行。'},
    {id:'normal-24',text:'二弟完成打卡，办公室气压回升。'},
    {id:'normal-25',text:'系统归档完毕，这次上班像回事。'}
  ],
  strong:[
    {id:'strong-01',text:'牛牛今天一柱擎天，像在抢全勤。'},
    {id:'strong-02',text:'小兄弟强势开机，老板都不敢酸。'},
    {id:'strong-03',text:'鸡哥看完数据，当场喊你卷王。'},
    {id:'strong-04',text:'二弟冲进晨会，绩效直接抬头。'},
    {id:'strong-05',text:'本次升旗高调，考勤系统都站直。'},
    {id:'strong-06',text:'老板假装冷静，手里却在记功。'},
    {id:'strong-07',text:'今早状态爆棚，像月底冲刺KPI。'},
    {id:'strong-08',text:'考勤机见到你，差点自己鼓掌。'},
    {id:'strong-09',text:'绩效面谈取消，你今天太有说法。'},
    {id:'strong-10',text:'全勤奖在抖，你这波太争脸。'},
    {id:'strong-11',text:'打卡刚结束，整个工位都精神了。'},
    {id:'strong-12',text:'摸鱼群沉默，小兄弟今天太能打。'},
    {id:'strong-13',text:'鸡哥亲自认证，你这班上得很响。'},
    {id:'strong-14',text:'晨报一刷新，二弟直接冲上封面。'},
    {id:'strong-15',text:'今日KPI发红光，部门群集体围观。'},
    {id:'strong-16',text:'牛牛这把表现，像拿了隐藏工资。'},
    {id:'strong-17',text:'人刚到岗，状态已经提前加班。'},
    {id:'strong-18',text:'升旗台有你，今天空气都很卷。'},
    {id:'strong-19',text:'今日战绩硬朗，老板都想偷学。'},
    {id:'strong-20',text:'开机即巅峰，这波上班相当炸裂。'},
    {id:'strong-21',text:'牛牛火力全开，像在追着绩效跑。'},
    {id:'strong-22',text:'小兄弟气势在线，连摸鱼都暂停。'},
    {id:'strong-23',text:'鸡哥发来批示，建议你继续狂卷。'},
    {id:'strong-24',text:'二弟今日争光，工牌都亮了几分。'},
    {id:'strong-25',text:'系统当场盖章，这次打卡相当猛。'}
  ],
  secret:[
    {id:'secret-01',text:'牛牛今日已读不回，像领导本人。'},
    {id:'secret-02',text:'小兄弟开启保密，上班像谍战片。'},
    {id:'secret-03',text:'鸡哥申请旁听，却被系统请出去。'},
    {id:'secret-04',text:'二弟拒绝表态，绩效官当场沉默。'},
    {id:'secret-05',text:'本次升旗加密，考勤机无权过问。'},
    {id:'secret-06',text:'老板想看日报，结果只剩省略号。'},
    {id:'secret-07',text:'今早状态神秘，像公司年终分红。'},
    {id:'secret-08',text:'考勤表翻三遍，还是读不懂你。'},
    {id:'secret-09',text:'绩效系统卡壳，你这波太会藏。'},
    {id:'secret-10',text:'全勤记录在场，真相却拒绝营业。'},
    {id:'secret-11',text:'打卡成功之后，后续内容全部保密。'},
    {id:'secret-12',text:'摸鱼群众围观，小兄弟就是不说。'},
    {id:'secret-13',text:'鸡哥满脸问号，今天没人能审你。'},
    {id:'secret-14',text:'晨会刚开始，二弟先把嘴焊上。'},
    {id:'secret-15',text:'今日KPI未公开，部门群开始脑补。'},
    {id:'secret-16',text:'牛牛藏得很深，像月底工资条。'},
    {id:'secret-17',text:'人是上线了，状态却开了隐身。'},
    {id:'secret-18',text:'升旗流程保密，连空气都签字了。'},
    {id:'secret-19',text:'今日战报锁定，老板也只能干瞪眼。'},
    {id:'secret-20',text:'开机归开机，细节一律不予回应。'},
    {id:'secret-21',text:'牛牛开启谜语人模式，HR先裂开。'},
    {id:'secret-22',text:'小兄弟守口如瓶，像背了竞业协议。'},
    {id:'secret-23',text:'鸡哥追着问，你却只给背影。'},
    {id:'secret-24',text:'二弟今天低调，工位像在拍悬疑片。'},
    {id:'secret-25',text:'系统只留一句，懂的都别乱问。'}
  ]
};
const STATUS={
  idle:{label:'无事发生',emoji:'😴',desc:'设备低功耗待机，一切波澜不惊。',color:'#94a3b8',commentCategory:'none'},
  normal:{label:'正常升旗',emoji:'🌅',desc:'系统按标准流程稳定启动。',color:'#f59e0b',commentCategory:'normal'},
  amazing:{label:'一柱擎天',emoji:'🚀',desc:'今日性能曲线过于优雅，疑似超频。',color:'#10b981',commentCategory:'strong'},
  refuse:{label:'拒绝回答',emoji:'🙈',desc:'系统拒绝提供更多遥测信息。',color:'#f43f5e',commentCategory:'secret'}
};
const app=document.getElementById('app');
let state={tab:'home',records:loadRecords(),theme:loadTheme(),toast:''};
applyTheme();render();
function todayKey(){return new Date().toISOString().slice(0,10)}
function fmtDate(k){return new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date(`${k}T00:00:00`))}
function monthKey(k){return k.slice(0,7)}
function monthDates(key=todayKey()){const [y,m]=key.split('-').map(Number);const total=new Date(y,m,0).getDate();return Array.from({length:total},(_,i)=>`${key.slice(0,7)}-${String(i+1).padStart(2,'0')}`)}
function loadRecords(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]').sort((a,b)=>a.date.localeCompare(b.date))}catch{return[]}}
function saveRecords(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state.records))}
function loadTheme(){return localStorage.getItem(THEME_KEY)==='dark'?'dark':'light'}
function applyTheme(){document.documentElement.classList.toggle('dark',state.theme==='dark');localStorage.setItem(THEME_KEY,state.theme)}
function todayRecord(){return state.records.find(r=>r.date===todayKey())}
function hashString(value){let hash=2166136261;for(let i=0;i<value.length;i+=1){hash^=value.charCodeAt(i);hash=Math.imul(hash,16777619)}return hash>>>0}
function createSeededRandom(seed){let current=hashString(seed)||1;return()=>{current^=current<<13;current^=current>>>17;current^=current<<5;return (current>>>0)/4294967296}}
function buildHistorySignature(records){return [...records].sort((a,b)=>a.date.localeCompare(b.date)).map(r=>`${r.date}:${r.status}:${r.commentId||'-'}`).join('|')}
function selectComment(records,date,status){const category=STATUS[status].commentCategory;const pool=COMMENT_LIBRARY[category];const recent=[...records].sort((a,b)=>a.date.localeCompare(b.date)).map(r=>r.commentId).filter(Boolean).slice(-RECENT_COMMENT_WINDOW);const previousId=recent[recent.length-1];const recentSet=new Set(recent);const candidatePool=pool.filter(entry=>entry.id!==previousId&&!recentSet.has(entry.id));const fallbackPool=pool.filter(entry=>entry.id!==previousId);const finalPool=candidatePool.length?candidatePool:(fallbackPool.length?fallbackPool:pool);const random=createSeededRandom(`${date}#${status}#${buildHistorySignature(records)}`);return finalPool[Math.floor(random()*finalPool.length)]||pool[0]}
function upsert(status){const now=new Date().toISOString();const current=todayRecord();const historyWithoutToday=state.records.filter(r=>r.date!==todayKey());const comment=selectComment(state.records,todayKey(),status);state.records=[...historyWithoutToday,{date:todayKey(),status,commentId:comment.id,createdAt:current?.createdAt||now,updatedAt:now}].sort((a,b)=>a.date.localeCompare(b.date));saveRecords();toast(comment.text);render()}
function streaks(){const sorted=[...state.records].sort((a,b)=>a.date.localeCompare(b.date));let longest=0,run=0,prev='';for(const r of sorted){if(!prev){run=1}else{const delta=(new Date(`${r.date}T00:00:00`)-new Date(`${prev}T00:00:00`))/86400000;run=delta===1?run+1:1}longest=Math.max(longest,run);prev=r.date}let current=0;const set=new Set(sorted.map(r=>r.date));const d=new Date(`${todayKey()}T00:00:00`);while(set.has(d.toISOString().slice(0,10))){current++;d.setDate(d.getDate()-1)}return{current,longest}}
function stats(){const m=monthKey(todayKey());const month=state.records.filter(r=>monthKey(r.date)===m);const good=month.filter(r=>r.status==='normal'||r.status==='amazing').length;const counts={idle:0,normal:0,amazing:0,refuse:0};state.records.forEach(r=>counts[r.status]++);return{...streaks(),monthCount:month.length,goodRate:month.length?Math.round(good/month.length*100):0,counts}}
function achievements(){const s=stats();const dates=monthDates().filter(d=>d<=todayKey());const set=new Set(state.records.map(r=>r.date));let amazingRun=0,amazingBest=0;const a=state.records.filter(r=>r.status==='amazing').sort((x,y)=>x.date.localeCompare(y.date));for(let i=0;i<a.length;i++){if(i===0) amazingRun=1; else amazingRun=((new Date(`${a[i].date}T00:00:00`)-new Date(`${a[i-1].date}T00:00:00`))/86400000===1)?amazingRun+1:1; amazingBest=Math.max(amazingBest,amazingRun)}return[{title:'初次记录',desc:'完成第一次设备自检。',ok:state.records.length>=1},{title:'🏅 铁牛奖',desc:'连续记录 7 天，开始有点牛味了。',ok:s.longest>=7},{title:'🏆 金牛奖',desc:'连续记录 30 天，这月算你真在上班。',ok:s.longest>=30},{title:'👑 牛魔王',desc:'连续记录 90 天，考勤系统都得喊你哥。',ok:s.longest>=90},{title:'🌏 大黑驴吊',desc:'连续记录 365 天，全年无休地狠狠干卡。',ok:s.longest>=365},{title:'一柱擎天连续3天',desc:'连续 3 天保持火箭级输出。',ok:amazingBest>=3},{title:'本月全勤',desc:'本月到今天为止每天都有记录。',ok:dates.every(d=>set.has(d))}]}
function exportJson(){const blob=new Blob([JSON.stringify(state.records,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`晨间设备自检-${todayKey()}.json`;a.click();URL.revokeObjectURL(url)}
function importJson(file){const reader=new FileReader();reader.onload=()=>{try{state.records=JSON.parse(String(reader.result)||'[]').sort((a,b)=>a.date.localeCompare(b.date));saveRecords();toast('导入完成，历史遥测已经接管。');render()}catch{toast('导入失败，JSON 格式不正确。')}};reader.readAsText(file)}
function clearAll(){if(confirm('确认清空全部记录吗？这个操作无法撤销。')){state.records=[];saveRecords();toast('全部记录已清空。');render()}}
function toast(msg){state.toast=msg;render();setTimeout(()=>{state.toast='';render()},2600)}
function setTab(tab){state.tab=tab;render()}
function toggleTheme(){state.theme=state.theme==='light'?'dark':'light';applyTheme();render()}
function renderHome(){const current=todayRecord();return `<section class="card"><div class="row"><div><h2>今日状态</h2><div class="muted">每天仅保留一条记录，但可以随时修改今天的结果。</div></div><div class="pill">${current?'已记录':'待记录'}</div></div><div class="status-grid">${Object.entries(STATUS).map(([key,v])=>`<button class="status-btn ${current?.status===key?'active':''}" data-status="${key}"><div class="emoji">${v.emoji}</div><div class="status-title">${v.label}</div><div class="status-desc">${v.desc}</div></button>`).join('')}</div></section>${current?`<section class="card"><div class="muted">今日已保存</div><div style="font-size:28px;font-weight:800;margin-top:8px">${STATUS[current.status].emoji} ${STATUS[current.status].label}</div><div class="muted" style="margin-top:8px">上次更新时间：${new Date(current.updatedAt).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})}</div></section>`:''}`}
function renderStats(){const s=stats();const recMap=new Map(state.records.map(r=>[r.date,r]));return `<section class="card"><h2>统计面板</h2><div class="stats"><div class="stat"><div class="muted">当前连续</div><div class="v">${s.current} 天</div></div><div class="stat"><div class="muted">最长连续</div><div class="v">${s.longest} 天</div></div><div class="stat"><div class="muted">本月记录</div><div class="v">${s.monthCount} 次</div></div><div class="stat"><div class="muted">优良率</div><div class="v">${s.goodRate}%</div><div class="muted">正常升旗 + 一柱擎天</div></div></div></section><section class="card"><h2>本月热力图</h2><div class="muted">按天查看状态分布。</div><div class="heatmap">${monthDates().map(d=>{const r=recMap.get(d);const bg=r?STATUS[r.status].color:'#f8e7da';return `<div class="day" title="${d} ${r?STATUS[r.status].label:'未记录'}" style="background:${bg}">${d.slice(-2)}</div>`}).join('')}</div></section><section class="card"><h2>状态占比</h2><div class="pie">${Object.entries(s.counts).map(([k,v])=>`<div class="pie-row"><div><span class="dot" style="background:${STATUS[k].color}"></span>${STATUS[k].emoji} ${STATUS[k].label}</div><strong>${v}</strong></div>`).join('')}</div></section>`}
function renderAchievements(){return `<section class="card"><h2>成就系统</h2><div class="muted">持续记录会自动解锁一些没什么必要但很有趣的徽章。</div><div class="list" style="margin-top:14px">${achievements().map(a=>`<div class="badge ${a.ok?'':'locked'}"><div><div style="font-weight:700">${a.title}</div><div class="muted" style="margin-top:4px">${a.desc}</div></div><div style="font-size:24px">${a.ok?'🏅':'🔒'}</div></div>`).join('')}</div></section>`}
function renderSettings(){return `<section class="card"><h2>设置</h2><div class="actions" style="margin-top:14px"><button class="action" id="export-btn">导出 JSON</button><label class="action">导入 JSON<input class="hidden" id="import-input" type="file" accept="application/json"></label><button class="action" id="clear-btn">清空所有数据</button><button class="action" id="theme-btn">切换深色模式</button></div></section>`}
function render(){app.innerHTML=`<div class="shell"><header class="topbar"><div class="brand">Morning System Check</div><div class="row"><div><h1>晨间设备自检</h1><div class="muted">${fmtDate(todayKey())}</div></div><button class="header-btn" id="theme-toggle">${state.theme==='light'?'🌙 夜间':'☀️ 日间'}</button></div></header>${state.tab==='home'?renderHome():''}${state.tab==='stats'?renderStats():''}${state.tab==='achievements'?renderAchievements():''}${state.tab==='settings'?renderSettings():''}<nav class="tabbar"><div class="tabs">${[{k:'home',e:'☀️',l:'今日'},{k:'stats',e:'📊',l:'统计'},{k:'achievements',e:'🏅',l:'成就'},{k:'settings',e:'⚙️',l:'设置'}].map(t=>`<button class="tab ${state.tab===t.k?'active':''}" data-tab="${t.k}">${t.e}<div>${t.l}</div></button>`).join('')}</div></nav>${state.toast?`<div class="toast">${state.toast}</div>`:''}</div>`;bind()}
function bind(){document.getElementById('theme-toggle')?.addEventListener('click',toggleTheme);document.querySelectorAll('[data-status]').forEach(el=>el.addEventListener('click',()=>upsert(el.getAttribute('data-status'))));document.querySelectorAll('[data-tab]').forEach(el=>el.addEventListener('click',()=>setTab(el.getAttribute('data-tab'))));document.getElementById('export-btn')?.addEventListener('click',exportJson);document.getElementById('clear-btn')?.addEventListener('click',clearAll);document.getElementById('theme-btn')?.addEventListener('click',toggleTheme);document.getElementById('import-input')?.addEventListener('change',e=>{const file=e.target.files?.[0];if(file)importJson(file)})}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'))}
