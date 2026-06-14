
const PRODUCTS = [
  {cat:"RC Cars",name:"F1 Car",price:2550},{cat:"RC Cars",name:"Stunt Cars",price:890},
  {cat:"RC Cars",name:"Rock CAVFN",price:2650},{cat:"RC Cars",name:"T-Vehicle Terrain",price:950},
  {cat:"RC Cars",name:"Rock Explorer",price:890},{cat:"RC Cars",name:"Rock Crawler",price:890},
  {cat:"RC Cars",name:"Batman Car",price:890},{cat:"RC Cars",name:"Defender with Spray",price:925},
  {cat:"RC Cars",name:"Defender without Spray",price:890},{cat:"RC Cars",name:"Drift Car",price:1650},
  {cat:"RC Cars",name:"Moka Big",price:1950},{cat:"RC Cars",name:"Alloy Model Small",price:1150},
  {cat:"RC Cars",name:"Alloy Model Big",price:1650},{cat:"RC Cars",name:"Go Kart Bumper Car",price:1800},
  {cat:"RC Cars",name:"New Drift Car",price:2600},
  {cat:"Small Cars",name:"Detsky",price:180},{cat:"Small Cars",name:"Future Car",price:280},
  {cat:"Small Cars",name:"DC Jams",price:180},{cat:"Small Cars",name:"Black Tesla",price:280},
  {cat:"Small Cars",name:"Grey Tesla",price:330},{cat:"Small Cars",name:"Spray Car Small",price:330},
  {cat:"Small Cars",name:"Green Box Small",price:330},{cat:"Small Cars",name:"Metal Scale Model",price:280},
  {cat:"Miniatures",name:"Ferrari",price:775},{cat:"Miniatures",name:"Ford Mustang",price:680},
  {cat:"Miniatures",name:"Porsche",price:650},{cat:"Miniatures",name:"Dodge Challenger",price:720},
  {cat:"Toys",name:"Bubble Gun Rechargeable",price:480},{cat:"Toys",name:"Small Bubble Gun",price:380},
  {cat:"Toys",name:"Big Bubble Gun",price:430},{cat:"Toys",name:"Coolers",price:120},
  {cat:"Toys",name:"Game Console",price:190},{cat:"Toys",name:"Angel Girl",price:500},
  {cat:"Toys",name:"Fan",price:220},{cat:"Toys",name:"Pokemon",price:330},
  {cat:"Toys",name:"Thomas and Friends",price:330},{cat:"Toys",name:"Small Duck",price:380},
  {cat:"Toys",name:"Panda",price:380},{cat:"Toys",name:"Labubu",price:240},
  {cat:"Toys",name:"Crab",price:485},{cat:"Toys",name:"Gun",price:470},
  {cat:"Accessories",name:"Small Bike",price:450},{cat:"Accessories",name:"Nippo Big Batteries",price:7},
  {cat:"Accessories",name:"GP Small Batteries",price:8},{cat:"Accessories",name:"GP Big Batteries",price:8},
  {cat:"Accessories",name:"Bubble Liquid",price:140},
];
const CAT_COLORS={"RC Cars":{bg:"#2D1B6B",fg:"#C8A8F0"},"Small Cars":{bg:"#0D3B6E",fg:"#85B7EB"},"Miniatures":{bg:"#3B0E6B",fg:"#C49EF0"},"Toys":{bg:"#0E4D2E",fg:"#5DCAA5"},"Accessories":{bg:"#5C2800",fg:"#FAC775"}};
const LOGO = LOGO_B64;
let hist = [];

function switchTab(name,btn){document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));document.getElementById(name).classList.add('on');btn.classList.add('on');}

function addMsg(role,text){
  const list=document.getElementById('msgList');
  const wrap=document.createElement('div'); wrap.className='msg '+(role==='user'?'u':'b');
  const av=document.createElement('div'); av.className='av'+(role==='user'?' u':'');
  if(role==='user'){av.innerHTML='<svg width="20" height="14" viewBox="0 0 44 28"><rect x="4" y="12" width="36" height="12" rx="4" fill="#FFD54F"/><path d="M9 12 L14 5 H30 L35 12 Z" fill="#F9A825"/><circle cx="12" cy="24" r="4" fill="#1A1030"/><circle cx="32" cy="24" r="4" fill="#1A1030"/></svg>';}
  else{av.innerHTML=`<img src="${LOGO}" style="width:100%;height:100%;object-fit:cover"/>`;}
  const bubble=document.createElement('div'); bubble.className='bubble'+(role==='user'?' u':'');
  bubble.innerHTML=text.replace(/\n/g,'<br>');
  wrap.appendChild(av); wrap.appendChild(bubble); list.appendChild(wrap);
  list.scrollTop=list.scrollHeight;
}

function showTyping(){const list=document.getElementById('msgList');const w=document.createElement('div');w.className='msg b';w.id='typing';w.innerHTML=`<div class="av"><img src="${LOGO}" style="width:100%;height:100%;object-fit:cover"/></div><div class="typing"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;list.appendChild(w);list.scrollTop=list.scrollHeight;}
function hideTyping(){const t=document.getElementById('typing');if(t)t.remove();}

async function send(text){
  if(!text.trim())return;
  const q=text.trim();
  document.getElementById('inp').value='';
  document.getElementById('qrBtns').style.display='none';
  document.getElementById('sendBtn').disabled=true;
  addMsg('user',q); showTyping();
  hist.push({role:'user',content:q});
  try{
    const result = await new Promise((resolve,reject)=>{
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/chat', true);
      xhr.setRequestHeader('Content-Type','application/json');
      xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
          resolve({status:xhr.status, text:xhr.responseText, url:xhr.responseURL});
        }
      };
      xhr.onerror = function(){ reject(new Error('XHR network error')); };
      xhr.send(JSON.stringify({messages:hist}));
    });
    hideTyping();
    let d;
    try{ d=JSON.parse(result.text); }
    catch(pe){ addMsg('bot','XHR URL: '+result.url+' | STATUS: '+result.status+' | RESP: '+result.text.slice(0,300)); document.getElementById('sendBtn').disabled=false; return; }
    if(d.error)throw new Error('API_ERR:'+d.error);
    hist.push({role:'assistant',content:d.reply});
    addMsg('bot',d.reply);
  }catch(e){hideTyping();addMsg('bot','DEBUG: '+e.message+' | WhatsApp 8220352404');}
  document.getElementById('sendBtn').disabled=false;
}

function filterCat(q){
  q=q.toLowerCase();const g={};
  PRODUCTS.forEach(p=>{if(!q||p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q))(g[p.cat]=g[p.cat]||[]).push(p);});
  const list=document.getElementById('catList'); list.innerHTML='';
  Object.entries(g).forEach(([cat,items])=>{
    const cs=CAT_COLORS[cat]||{bg:'#2D1B6B',fg:'#C8A8F0'};
    const sec=document.createElement('div'); sec.style.marginBottom='14px';
    sec.innerHTML=`<div class="cat-hdr" style="background:${cs.bg};color:${cs.fg}">${cat}</div>`;
    items.forEach((p,i)=>{const row=document.createElement('div');row.className='cat-row'+(i===items.length-1?' last':'');row.innerHTML=`<span style="flex:1;font-weight:500">${p.name}</span><span class="cat-price">Rs${p.price.toLocaleString('en-IN')}</span>`;sec.appendChild(row);});
    list.appendChild(sec);
  });
}
filterCat('');
