(function(){
var $=function(s){return document.querySelector(s)};
var $$=function(s){return [].slice.call(document.querySelectorAll(s))};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var money=function(n){return 'GH₵'+Number(n||0).toLocaleString('en-GH',{minimumFractionDigits:2,maximumFractionDigits:2})};
var fmt=function(d){var x=new Date(d);return isNaN(x)?'':x.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})};
var today=function(){return new Date().toISOString().slice(0,10)};
var PALS=[['#f3efe6','#2438ff','#ff6a3d','#161616'],['#101828','#f5c542','#e8e8e8','#3a5ba0'],['#e9f1f2','#0c7c8c','#e4572e','#222'],['#fafafa','#111','#d9342b','#7a7a7a'],['#f6efe0','#3b6fd8','#f0a04b','#1b2a41'],['#f0f0f0','#7c4dff','#00c2a8','#111']];

/* ---------- data ---------- */
function seed(){
var W=function(id,t,a,m,y,sz,p,k,d,ex){return{id:id,t:t,a:a,m:m,y:y,sz:sz,p:p,k:k,d:d,ex:ex,st:'live',img:'',pal:PALS[id%PALS.length]}};
return{n:100,me:0,artists:[],cart:[],
set:{name:'ZARTZ',tag:'Contemporary art, reviews and exhibitions',foot:'A demonstration store. Artists, museums and works are fictional.',pass:'zartz-admin'},
works:[
W(1,'Idle Hands','Mira Okonkwo','Painting',2025,'90 × 112 cm',4800,'circles','Oil on linen. Overlapping discs mark the shifts of a factory floor that never fully stops.',1),
W(2,'Night Shift, Lisbon','Tomás Vidal','Print',2024,'60 × 75 cm',650,'bars','Edition of 60. Screenprint in four layers, inspired by the ceiling lights of a late tram.',1),
W(3,'Signal and Noise','Aiko Reyes','Painting',2026,'120 × 150 cm',9200,'waves','Acrylic on canvas. Parallel bands bend as if a recording were played back too slowly.',1),
W(4,'Grid Study No. 7','Lena Hartmann','Drawing',2025,'42 × 52 cm',1300,'grid','Ink and gouache on paper. One of ten studies in which a square is allowed to misbehave.',2),
W(5,'Slow Tide','Mira Okonkwo','Print',2023,'50 × 62 cm',480,'waves','Edition of 120. Risograph in three inks, printed on recycled cotton paper.',2),
W(6,'Unpaid Overtime','Tomás Vidal','Drawing',2026,'70 × 90 cm',2100,'bars','Charcoal and pastel. Tall columns lean into one another like workers on a long commute.',2),
W(7,'Soft Circuit','Aiko Reyes','Sculpture',2025,'38 × 38 × 20 cm',6400,'circles','Hand-dyed felt over a steel frame. A circuit board rendered as something you want to touch.',3),
W(8,'Checkpoint','Lena Hartmann','Painting',2024,'80 × 100 cm',3900,'grid','Oil on panel. A grid of lit windows in which one has just gone dark.',3)],
rev:[{w:1,n:'Dana',r:5,t:'Looks flat online and then glows in person. The blue is unreal.'},{w:1,n:'Ibrahim',r:4,t:'Great presence. Arrived well packed and in a lovely frame.'},{w:2,n:'Marta',r:5,t:'Crisp layers, and the yellow really is that bright.'},{w:3,n:'Joel',r:4,t:'Big, calm, a bit unsettling.'},{w:4,n:'Ana',r:5,t:'Quiet and funny, which is rare.'},{w:4,n:'Pete',r:3,t:'Smaller than I imagined, but beautiful.'},{w:5,n:'Zuri',r:5,t:'Warm colours, soft paper. Perfect in our hallway.'},{w:7,n:'Cleo',r:5,t:'Everyone who visits touches it. Hard to resist.'},{w:8,n:'Sam',r:4,t:'Moody and well made.'}],
fb:[{w:1,n:'Curator Noor',a:'Composition',t:'The left third carries the whole piece. Keep that tension.'},{w:3,n:'Visitor',a:'Colour',t:'The orange edge is doing a lot of work, in a good way.'}],
posts:[
{id:1,t:'Why the factory floor keeps showing up in galleries',c:'Noor Haddad',g:'Essay',dt:'2026-09-24',s:'Artists are returning to work, machines and shifts as subjects. Here is what that says about us.',b:'Walk through any fair this year and you will find assembly lines, spreadsheets and circuit boards painted with real tenderness. That is not nostalgia. It is a way of asking who a machine is for.\n\nThe strongest pieces do not condemn or celebrate. They stay with the question, which is why they hold up after the second visit.'},
{id:2,t:'How I hang a small show in a big room',c:'Elias Brandt',g:'Practice',dt:'2026-09-10',s:'Three habits that stop a handful of works from looking lost on a large wall.',b:'First, group by conversation, not by size. Second, leave more empty wall than you think you need. Third, walk the room slowly with a stranger and watch where their eyes stop. Move whatever they ignored.'},
{id:3,t:'Studio visit: Mira Okonkwo on slow painting',c:'Noor Haddad',g:'Studio visit',dt:'2026-08-30',s:'A morning with a painter who lets each layer dry for a week.',b:'Okonkwo works on six canvases at once, rotating them so each gets days of rest. She says the pause is the technique. Colour that is allowed to settle looks deeper.'},
{id:4,t:'A buyer’s guide to editions and prints',c:'Elias Brandt',g:'Guide',dt:'2026-08-12',s:'What edition sizes mean and what to ask before you buy.',b:'Ask for the edition number, the printing method, the paper and the date. Look for a signed certificate and keep it with the work. Frame with archival materials and keep prints out of direct sun.'}],
exs:[
{id:1,m:'Harbor Light Museum',c:'Lisbon, Portugal',t:'Quiet Machines',cu:'Noor Haddad',s:'2026-09-05',e:'2026-10-31',ar:'Mira Okonkwo, Tomás Vidal, Aiko Reyes'},
{id:2,m:'Northgate Contemporary',c:'Manchester, UK',t:'Line, Square, Rule',cu:'Elias Brandt',s:'2026-10-15',e:'2027-01-18',ar:'Lena Hartmann, Tomás Vidal, Mira Okonkwo'},
{id:3,m:'Salt Works Art Center',c:'Accra, Ghana',t:'Lights Still On',cu:'Ama Boateng',s:'2026-11-06',e:'2027-02-14',ar:'Aiko Reyes, Lena Hartmann'},
{id:4,m:'Kestrel Museum of Modern Art',c:'Toronto, Canada',t:'The Long Commute',cu:'Elias Brandt',s:'2026-05-02',e:'2026-08-30',ar:'Tomás Vidal'},
{id:5,m:'Lantern House',c:'Osaka, Japan',t:'Soft Technology',cu:'Noor Haddad',s:'2026-09-20',e:'2026-12-06',ar:'Aiko Reyes, Mira Okonkwo'}],
slides:[
{id:1,t:'Quiet Machines',s:'Seven artists on how we live with automation. On view at Harbor Light Museum in Lisbon.',b:'Find the exhibition',l:'#exhibitions',k:'circles',c1:'#f3efe6',c2:'#2438ff',c3:'#ff6a3d'},
{id:2,t:'Eight new works this week',s:'Paintings, prints, drawings and sculpture from artists we are watching.',b:'Shop artwork',l:'#shop',k:'bars',c1:'#101828',c2:'#f5c542',c3:'#3a5ba0'},
{id:3,t:'Sell your art on ZARTZ',s:'Create a profile, upload your work and reach collectors worldwide.',b:'Start selling',l:'#sell',k:'waves',c1:'#0c7c8c',c2:'#e4572e',c3:'#f6efe0'},
{id:4,t:'Read the Curators’ Journal',s:'Essays, studio visits and buying guides from our curators.',b:'Read the journal',l:'#journal',k:'grid',c1:'#fafafa',c2:'#111111',c3:'#d9342b'},
{id:5,t:'Reviews from real collectors',s:'See how a work looks in a living room before you buy, and tell artists what you think.',b:'Browse reviews',l:'#shop',k:'circles',c1:'#7c4dff',c2:'#00c2a8',c3:'#f0f0f0'},
{id:6,t:'Find a museum near you',s:'Search exhibitions by city or curator and see the works on show.',b:'Find exhibitions',l:'#exhibitions',k:'grid',c1:'#10151f',c2:'#ffd23f',c3:'#ee6c4d'},
{id:7,t:'Collect with confidence',s:'Every work is checked by our curators and ships carefully packed.',b:'Shop artwork',l:'#shop',k:'bars',c1:'#efe9e1',c2:'#c0392b',c3:'#1d1d1d'}]};}
var db=null;try{db=JSON.parse(localStorage.getItem('zartz'))}catch(e){}
if(!db||!db.works)db=seed();
(function normalizeStore(){var d=seed();['n','me','artists','cart','rev','fb','posts','exs','slides'].forEach(function(k){if(db[k]==null)db[k]=d[k]});db.set=db.set||d.set;if(!db.set.name)db.set.name=d.set.name;if(!db.set.tag)db.set.tag=d.set.tag;if(!db.set.foot)db.set.foot=d.set.foot;if(!db.set.pass)db.set.pass=d.set.pass;if(!Array.isArray(db.works)||!db.works.length)db.works=d.works;if(!Array.isArray(db.slides)||!db.slides.length)db.slides=d.slides;if(!Array.isArray(db.rev))db.rev=d.rev;if(!Array.isArray(db.fb))db.fb=d.fb;if(!Array.isArray(db.posts))db.posts=d.posts;if(!Array.isArray(db.exs))db.exs=d.exs;db.profiles=Array.isArray(db.profiles)?db.profiles:[];db.analytics=Array.isArray(db.analytics)?db.analytics:[];db.sales=Array.isArray(db.sales)?db.sales:[];db.rating=db.rating||{strategy:'threshold',scale:'auto'};db.currentProfileId=db.currentProfileId||null;db.works.forEach(function(w,i){w.st=w.st||'live';w.id=w.id==null?i+1:w.id;w.pal=w.pal||PALS[w.id%PALS.length];w.a=w.a||'ZARTZ Demo Artist';w.t=w.t||'Demo Artwork'});db.slides.forEach(function(x,i){x.id=x.id==null?i+1:x.id;x.img=x.img||''});if(!db.n||db.n<100)db.n=100;try{localStorage.setItem('zartz',JSON.stringify(db))}catch(e){}})();
function save(){try{localStorage.setItem('zartz',JSON.stringify(db));return true}catch(e){alert('Browser storage is full. Remove some large images and try again.');return false}}
function nid(){return ++db.n}
function wk(id){return db.works.filter(function(w){return w.id===id})[0]}
function live(){return db.works.filter(function(w){return w.st!=='pending'})}
function revs(id){return db.rev.filter(function(r){return r.w===id})}
function fbs(id){return db.fb.filter(function(r){return r.w===id})}
function avg(id){var v=revs(id);return v.length?v.reduce(function(a,b){return a+b.r},0)/v.length:0}
function stars(n){var k=Math.max(0,Math.min(5,Math.round(n)));return '★★★★★'.slice(0,k)+'☆☆☆☆☆'.slice(0,5-k)}
function ratingScale(){var mode=(db.rating&&db.rating.scale)||'auto',v=(db.analytics||[]).filter(function(x){return x.type==='page_view'||x.type==='artwork_view'}).length;if(mode==='starter'||(mode==='auto'&&v<1000))return 'starter';if(mode==='growing'||(mode==='auto'&&v<10000))return 'growing';return 'viral'}
function likesToStars(likes){likes=Math.max(0,+likes||0);var t=ratingScale()==='starter'?[0,1,6,16,51,151]:ratingScale()==='growing'?[0,1,26,101,501,2501]:[0,1,251,1001,5001,25001];if(likes>=t[5])return 5;if(likes>=t[4])return 4;if(likes>=t[3])return 3;if(likes>=t[2])return 2;if(likes>=t[1])return 1;return 0}
function feedbackRating(r){if(db.rating&&db.rating.strategy==='benchmark'){var max=(db.fb||[]).reduce(function(m,x){return Math.max(m,+x.likes||0)},0);var pct=(+r.likes||0)/Math.max(1,max);return Math.max(1,Math.min(5,Math.ceil(pct*5)))}return likesToStars(r&&r.likes)}
function ratingLabel(){return ratingScale()==='starter'?'Starter scale':ratingScale()==='growing'?'Growing scale':'Viral scale'}
function ink(c){var h=String(c).replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16),l=(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255;return l>.6?'#111111':'#ffffff'}

/* ---------- generative art ---------- */
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function art(w){
  if(w.img)return '<img src="'+w.img+'" alt="'+esc(w.t+' by '+w.a)+'" style="width:100%;height:100%;object-fit:cover">';
  var r=rng(w.id*977),p=w.pal||PALS[w.id%PALS.length],i,s='<svg viewBox="0 0 100 125" role="img" aria-label="'+esc(w.t+' by '+w.a)+'"><rect width="100" height="125" fill="'+p[0]+'"/>';
  if(w.k==='circles')for(i=0;i<9;i++)s+='<circle cx="'+(r()*100)+'" cy="'+(r()*125)+'" r="'+(8+r()*28)+'" fill="'+p[1+i%3]+'" opacity=".85"/>';
  if(w.k==='bars')for(i=0;i<7;i++){var h=30+r()*80;s+='<rect x="'+(i*14.5+3)+'" y="'+(125-h)+'" width="10" height="'+h+'" fill="'+p[1+i%3]+'"/>'}
  if(w.k==='waves')for(i=0;i<7;i++){var y=12+i*16,a=6+r()*14;s+='<path d="M-5 '+y+' Q 25 '+(y-a)+' 50 '+y+' T 105 '+y+'" stroke="'+p[1+i%3]+'" stroke-width="6" fill="none"/>'}
  if(w.k==='grid')for(i=0;i<30;i++)if(r()>.25)s+='<rect x="'+((i%5)*19+4)+'" y="'+(Math.floor(i/5)*19+5)+'" width="16" height="16" fill="'+p[1+Math.floor(r()*3)]+'"/>';
  return s+'</svg>'}

/* ---------- settings + routing ---------- */
function apply(){var n=db.set.name;$('#brand').textContent=n;$('#fname').textContent=n;$('#ftxt').textContent=db.set.foot;document.title=n+' – '+db.set.tag}
function route(){var v=(location.hash||'#shop').slice(1);var el=$('#'+v);if(!el||!el.classList.contains('view'))v='shop';
  $$('.view').forEach(function(e){e.classList.toggle('on',e.id===v)});
  $$('[data-v]').forEach(function(a){a.classList.toggle('on',a.dataset.v===v)});
  if(v==='sell')sell();if(v==='admin')admin();window.scrollTo(0,0)}
window.addEventListener('hashchange',function(){route()});

/* ---------- slider (7 slides, editable in admin) ---------- */
var si=0,timer=null,paused=false,RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function slider(){var S=Array.isArray(db.slides)&&db.slides.length?db.slides:seed().slides;db.slides=S;si=Math.min(si,S.length-1);
  $('#sl').innerHTML=S.map(function(s,i){return '<div class="sl'+(i===si?' on':'')+'" role="group" aria-roledescription="slide" aria-label="'+(i+1)+' of '+S.length+'" style="background:'+esc(s.c1)+';color:'+ink(s.c1)+'"><div class="wrap"><div><h1>'+esc(s.t)+'</h1><p>'+esc(s.s)+'</p><a class="btn" href="'+esc(s.l)+'" style="background:'+esc(s.c2)+';color:'+ink(s.c2)+'">'+esc(s.b)+'</a></div><div class="sa im" style="background:none">'+(s.img?'<img class="slide-art-image" src="'+esc(s.img)+'" alt="'+esc(s.t)+'">':art({id:200+i,k:s.k,t:s.t,a:'ZARTZ',pal:[s.c1,s.c2,s.c3,ink(s.c1)]}))+'</div></div></div>'}).join('');
  $('#dots').innerHTML=S.map(function(s,i){return '<button data-d="'+i+'" aria-label="Go to slide '+(i+1)+'" aria-current="'+(i===si)+'"></button>'}).join('');
  $('#slw').style.color=ink(S[si].c1);play()}
function go(n){var S=db.slides;si=(n+S.length)%S.length;$$('#sl .sl').forEach(function(e,i){e.classList.toggle('on',i===si)});$$('#dots button').forEach(function(b,i){b.setAttribute('aria-current',i===si)});$('#slw').style.color=ink(S[si].c1)}
function play(){clearInterval(timer);if(!RM&&!paused)timer=setInterval(function(){go(si+1)},6000)}
$('#prev').onclick=function(){go(si-1);play()};$('#next').onclick=function(){go(si+1);play()};
$('#dots').onclick=function(e){if(e.target.dataset.d){go(+e.target.dataset.d);play()}};
$('#pp').onclick=function(){paused=!paused;this.textContent=paused?'Play':'Pause';this.setAttribute('aria-label',paused?'Play slides':'Pause slides');play()};
$('#slw').onmouseenter=function(){clearInterval(timer)};$('#slw').onmouseleave=play;
$('#slw').addEventListener('focusin',function(){clearInterval(timer)});$('#slw').addEventListener('focusout',play);

/* ---------- shop ---------- */
var med='All',exf=0;
function chips(){var ms=['All'].concat(live().map(function(w){return w.m}).filter(function(m,i,a){return a.indexOf(m)===i}));
  if(ms.indexOf(med)<0)med='All';
  $('#chips').innerHTML=ms.map(function(m){return '<button class="chip" aria-pressed="'+(m===med)+'">'+esc(m)+'</button>'}).join('')}
$('#chips').onclick=function(e){if(!e.target.classList.contains('chip'))return;med=e.target.textContent;chips();grid()};
$('#q').oninput=grid;$('#sort').onchange=grid;
function grid(){var q=$('#q').value.toLowerCase(),s=$('#sort').value;
  var l=live().filter(function(w){return(!exf||w.ex===exf)&&(med==='All'||w.m===med)&&(w.t+' '+w.a).toLowerCase().indexOf(q)>-1});
  l.sort(function(a,b){return s==='lo'?a.p-b.p:s==='hi'?b.p-a.p:s==='new'?b.id-a.id:avg(b.id)-avg(a.id)});
  $('#count').innerHTML=l.length+' artwork'+(l.length===1?'':'s')+(exf?' from this exhibition. <a href="#shop" id="clr">Show all</a>':'');
  $('#grid').innerHTML=l.length?l.map(function(w){var n=revs(w.id).length;
    return '<button class="art" data-id="'+w.id+'"><div class="im">'+art(w)+'</div><h3>'+esc(w.t)+'</h3><p>'+esc(w.a)+', '+esc(w.y)+'</p><p>'+esc(w.m)+'</p><p><span class="st">'+(n?stars(avg(w.id)):'No reviews yet')+'</span> '+(n?'('+n+')':'')+'</p><p class="pr">'+money(w.p)+'</p></button>'}).join(''):'<p class="mut">No artwork matches. Try a different search.</p>'}
$('#grid').onclick=function(e){var b=e.target.closest('.art');if(b)openW(+b.dataset.id,'r')};
$('#count').onclick=function(e){if(e.target.id==='clr'){e.preventDefault();exf=0;grid()}};

/* ---------- artwork dialog: reviews + feedback ---------- */
var dlg=$('#dlg');
function openW(id,tab){var w=wk(id);if(!w)return;var ex=db.exs.filter(function(x){return x.id===w.ex})[0],rv=revs(id),fb=fbs(id),h;
  h='<button class="x" aria-label="Close" data-x>×</button><div class="dg"><div><div class="im">'+art(w)+'</div></div><div>'+
  '<h2>'+esc(w.t)+'</h2><div>'+esc(w.a)+', '+esc(w.y)+'</div><div class="st" style="margin-top:6px">'+(rv.length?stars(avg(id))+' <span class="mut">'+avg(id).toFixed(1)+' from '+rv.length+'</span>':'<span class="mut">No reviews yet</span>')+'</div>'+
  '<p>'+esc(w.d)+'</p><dl><dt>Medium</dt><dd>'+esc(w.m)+'</dd><dt>Size</dt><dd>'+esc(w.sz)+'</dd><dt>Shown at</dt><dd>'+(ex?esc(ex.t)+', '+esc(ex.m):'Not in an exhibition')+'</dd></dl>'+
  '<div style="display:flex;gap:12px;align-items:center"><b style="font-size:24px">'+money(w.p)+'</b><button class="btn dark" data-add="'+id+'">Add to cart</button></div>'+
  '<div class="tabs" role="tablist"><button role="tab" data-t="r" aria-selected="'+(tab==='r')+'">Reviews ('+rv.length+')</button><button role="tab" data-t="f" aria-selected="'+(tab==='f')+'">Feedback ('+fb.length+')</button></div>';
  if(tab==='r'){
    h+=(rv.length?rv.map(function(x){return '<div class="rv"><b>'+esc(x.n)+'</b><span class="st">'+stars(x.r)+'</span><p>'+esc(x.t)+'</p></div>'}).join(''):'<p class="mut">Be the first to review this work.</p>')+
    '<form id="fr"><div class="row"><input name="n" placeholder="Your name" required maxlength="40" aria-label="Your name"><select name="r" aria-label="Rating"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></div><textarea name="t" placeholder="What did you notice? How does it look in person?" required maxlength="500" aria-label="Review"></textarea><button class="btn" type="submit">Post review</button></form>';
  }else{
    h+='<p class="mut">Feedback goes to the artist and curators. Be specific and kind.</p>'+fb.map(function(x){return '<div class="rv"><b>'+esc(x.n)+'</b><span class="tag">'+esc(x.a)+'</span><p>'+esc(x.t)+'</p></div>'}).join('')+
    '<form id="ff"><div class="row"><input name="n" placeholder="Your name" required maxlength="40" aria-label="Your name"><select name="a" aria-label="Aspect"><option>Composition</option><option>Colour</option><option>Concept</option><option>Technique</option><option>Framing</option></select></div><textarea name="t" placeholder="What worked, and what would you change?" required maxlength="500" aria-label="Feedback"></textarea><button class="btn" type="submit">Send feedback</button></form>';
  }
  dlg.innerHTML=h+'</div></div>';dlg.dataset.id=id;if(!dlg.open)dlg.showModal();
  var f=$('#fr'),g=$('#ff');
  if(f)f.onsubmit=function(e){e.preventDefault();var d=new FormData(f);db.rev.push({w:id,n:d.get('n'),r:+d.get('r'),t:d.get('t')});save();openW(id,'r');grid()};
  if(g)g.onsubmit=function(e){e.preventDefault();var d=new FormData(g);db.fb.push({w:id,n:d.get('n'),a:d.get('a'),t:d.get('t'),likes:0,ratingMode:(db.rating&&db.rating.strategy)||'threshold'});save();openW(id,'f')};
}
dlg.onclick=function(e){var t=e.target;
  if(t===dlg||t.hasAttribute('data-x'))dlg.close();
  if(t.dataset.t)openW(+dlg.dataset.id,t.dataset.t);
  if(t.dataset.add){add(+t.dataset.add);t.textContent='Added'}};

/* ---------- cart ---------- */
function add(id){if(db.cart.indexOf(id)<0)db.cart.push(id);save();cart()}
function cart(){db.cart=db.cart.filter(wk);var l=db.cart.map(wk);
  $('#cnt').textContent=l.length;
  $('#items').innerHTML=l.length?l.map(function(w){return '<div class="it"><div class="im">'+art(w)+'</div><div><b>'+esc(w.t)+'</b><br><span class="mut">'+esc(w.a)+'</span><br>'+money(w.p)+'</div><button data-rm="'+w.id+'">Remove</button></div>'}).join(''):'<p class="mut">Your cart is empty. Browse the artwork to add a piece.</p>';
  $('#tot').textContent=money(l.reduce(function(a,w){return a+Number(w.p)},0))}
$('#cartBtn').onclick=function(){var c=$('#cart');c.hidden=!c.hidden;$('#msg').textContent='';};
$('#cx').onclick=function(){$('#cart').hidden=true};
$('#items').onclick=function(e){var r=e.target.dataset.rm;if(r){db.cart=db.cart.filter(function(i){return i!==+r});save();cart()}};
$('#pay').onclick=function(){
  if(!db.cart.length){$('#msg').textContent='Add an artwork before checking out.';return}
  $('#payemail').value=localStorage.getItem('zartz_checkout_email')||'';
  $('#paystatus').textContent='';
  $('#paydlg').showModal();
};
$('#payx').onclick=function(){$('#paydlg').close()};
$('#payform').onsubmit=async function(e){
  e.preventDefault();
  var email=$('#payemail').value.trim();
  if(!email)return;
  var items=db.cart.map(wk).filter(Boolean);
  var amount=items.reduce(function(a,w){return a+Number(w.p||0)},0);
  var btn=this.querySelector('button[type="submit"]');
  btn.disabled=true;
  $('#paystatus').textContent='Preparing secure Paystack checkout…';
  try{
    localStorage.setItem('zartz_checkout_email',email);
    var res=await fetch('/api/paystack/initialize',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:email,
        amount:Math.round(amount*100),
        currency:'GHS',
        items:items.map(function(w){return {id:w.id,title:w.t,price:Number(w.p||0),quantity:1}})
      })
    });
    var data=await res.json();
    if(!res.ok||!data.success)throw new Error(data.message||'Unable to initialize payment.');
    $('#paydlg').close();
    var popup=new PaystackPop();
    popup.resumeTransaction(data.access_code);
  }catch(err){
    $('#paystatus').textContent=err.message||'Payment could not be started.';
  }finally{
    btn.disabled=false;
  }
};

/* ---------- journal ---------- */
var cur='All';
function jchips(){var cs=['All'].concat(db.posts.map(function(p){return p.c}).filter(function(c,i,a){return a.indexOf(c)===i}));if(cs.indexOf(cur)<0)cur='All';
  $('#jchips').innerHTML=cs.map(function(c){return '<button class="chip" aria-pressed="'+(c===cur)+'">'+esc(c)+'</button>'}).join('')}
$('#jchips').onclick=function(e){if(!e.target.classList.contains('chip'))return;cur=e.target.textContent;jchips();posts()};
function posts(){var l=db.posts.filter(function(p){return (!p.supabaseId||p.st==='published')&&(cur==='All'||p.g===cur)}).sort(function(a,b){return a.dt<b.dt?1:-1});
  $('#posts').innerHTML=l.length?l.map(function(p){return '<details><summary><div class="meta">'+esc(p.g)+' · '+fmt(p.dt)+' · by '+esc(p.c)+'</div><h3>'+esc(p.t)+'</h3><p>'+esc(p.s)+'</p></summary><div class="body">'+esc(p.b)+'</div></details>'}).join(''):'<p class="mut">No posts yet.</p>'}

/* ---------- exhibitions ---------- */
function status(x){var n=new Date();return n<new Date(x.s)?'soon':n>new Date(x.e+'T23:59:59')?'past':'now'}
function renderExhibitions(){
  var q=($('#eq')&&$('#eq').value||'').toLowerCase(), ss=$('#est')?$('#est').value:'';
  var l=db.exs.filter(function(x){return (x.m+' '+x.c+' '+x.cu+' '+x.t).toLowerCase().indexOf(q)>-1&&(!ss||status(x)===ss)});
  $('#exs').innerHTML=l.length?l.map(function(x){
    var st=status(x), works=db.works.filter(function(w){return w.st==='live'&&w.ex===x.id});
    return '<article class="ex"><span class="badge '+st+'">'+({now:'On now',soon:'Upcoming',past:'Closed'}[st])+'</span><h3>'+esc(x.t)+'</h3><b>'+esc(x.m)+'</b><span class="mut">'+esc(x.c)+'</span><span>'+fmt(x.s)+' to '+fmt(x.e)+'</span><span class="mut">Curated by '+esc(x.cu)+'. Artists: '+esc(x.ar)+'.</span><p>'+esc(x.description||'Explore the exhibition and its featured works.')+'</p><button class="btn" data-exview="'+x.id+'">See works</button><button class="btn" data-exdetail="'+x.id+'">View entire details</button></article>';
  }).join(''):'<p class="mut">No exhibitions match. Try another city or clear the date filter.</p>';
}
$('#eq').oninput=renderExhibitions;$('#est').onchange=renderExhibitions;
$('#exs').onclick=function(e){
 var v=e.target.closest('[data-exview]'),d=e.target.closest('[data-exdetail]');
 if(v){location.hash='exhibition?id='+v.dataset.exview}
 if(d){location.hash='exhibition?id='+d.dataset.exdetail}
};
function renderExhibitionPage(){
 var id=new URLSearchParams(location.hash.split('?')[1]||'').get('id')||'',x=db.exs.filter(function(z){return String(z.id)===String(id)})[0];
 if(!x){$('#exhibition').innerHTML='<h2>Exhibition not found</h2><a class="btn" href="#exhibitions">Back to exhibitions</a>';return}
 var works=db.works.filter(function(w){return w.st==='live'&&w.ex===x.id});
 $('#exhibition').innerHTML='<a class="btn sm" href="#exhibitions">← Exhibitions</a><div class="article-page"><span class="badge '+status(x)+'">'+({now:'On now',soon:'Upcoming',past:'Closed'}[status(x)])+'</span><h2>'+esc(x.t)+'</h2><p class="sub">'+esc(x.m)+' · '+esc(x.c)+'</p><p><b>Curator:</b> '+esc(x.cu)+'<br><b>Dates:</b> '+fmt(x.s)+' to '+fmt(x.e)+'<br><b>Artists:</b> '+esc(x.ar)+'</p><p>'+esc(x.description||'Full exhibition details will appear here.')+'</p><h3>Works in this exhibition ('+works.length+')</h3><div class="grid">'+(works.length?works.map(artworkCard).join(''):'<p class="mut">No approved works have been assigned to this exhibition yet.</p>')+'</div></div>';
 $('#exhibition').onclick=function(e){var b=e.target.closest('.art-open');if(b)openW(+b.dataset.id,'r')};
}
/* ---------- forms: generic builder, image resize ---------- */
function fld(f,v){var n='name="'+f.k+'"',r=f.r?' required':'',val=esc(v),h='<label>'+f.l;
  if(f.t==='area')h+='<textarea '+n+r+'>'+val+'</textarea>';
  else if(f.t==='sel'||f.t==='ex'){var o=f.t==='ex'?[['0','None']].concat(db.exs.map(function(x){return[String(x.id),x.t+' ('+x.m+')']})):f.o.map(function(x){return[x,x]});
    h+='<select '+n+'>'+o.map(function(x){return '<option value="'+esc(x[0])+'"'+(String(v)===x[0]?' selected':'')+'>'+esc(x[1])+'</option>'}).join('')+'</select>'}
  else if(f.t==='img')h+='<input type="file" accept="image/*" data-img><input type="hidden" '+n+' value="'+val+'">'+(v?'<img class="pv" src="'+esc(v)+'" alt="Current image">':'<span class="mut" style="font-weight:400">Optional. JPG or PNG. Resized automatically.</span>');
  else h+='<input '+n+' type="'+({num:'number',date:'date',color:'color',email:'email'}[f.t]||'text')+'" value="'+val+'"'+r+(f.t==='num'?' min="0" step="any"':'')+'>';
  return h+'</label>'}
function read(form,sch){var d=new FormData(form),o={};sch.forEach(function(f){var v=d.get(f.k);o[f.k]=(f.t==='num'||f.t==='ex')?+v:v});return o}
document.addEventListener('change',function(e){var t=e.target;if(!t.name||t.name!=='booklet'||!t.files[0])return;var f=t.files[0];if(f.type!=='application/pdf'){alert('Digital booklet must be a PDF file.');t.value='';return}if(f.size>5*1024*1024){alert('Digital booklet PDF must be 5 MB or smaller.');t.value='';return}var r=new FileReader();r.onload=function(){window.__zartzBooklet={data:r.result,name:f.name}};r.readAsDataURL(f)});
document.addEventListener('change',function(e){var t=e.target;if(!t.dataset||!t.dataset.img||!t.files||!t.files[0])return;
  var hidden=t.nextElementSibling,file=t.files[0];t.dataset.processing='true';t.setAttribute('aria-busy','true');
  var fr=new FileReader();fr.onerror=function(){delete t.dataset.processing;t.removeAttribute('aria-busy');alert('Could not read this image. Please choose it again.');};
  fr.onload=function(){var im=new Image();im.onerror=function(){delete t.dataset.processing;t.removeAttribute('aria-busy');alert('This image could not be decoded. Please choose a JPG or PNG image.');};
    im.onload=function(){try{var scale=Math.min(1,1200/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*scale));c.height=Math.max(1,Math.round(im.height*scale));c.getContext('2d').drawImage(im,0,0,c.width,c.height);
      var url=c.toDataURL('image/jpeg',.82);hidden.value=url;hidden.dataset.imageReady='true';var p=t.parentNode.querySelector('.pv')||t.parentNode.appendChild(document.createElement('img'));p.className='pv';p.alt='Selected image preview';p.src=url;var sp=t.parentNode.querySelector('span');if(sp)sp.remove();
    }catch(err){alert('Could not prepare this image. Please try a smaller JPG or PNG file.');}
    finally{delete t.dataset.processing;t.removeAttribute('aria-busy');}};
    im.src=fr.result;};fr.readAsDataURL(file);});

/* ---------- sell page (artist signup) ---------- */
var sellMsg='';
var ART=[{k:'t',l:'Title',r:1},{k:'cat',l:'Artwork category',t:'sel',o:['Painting','Print','Drawing','Sculpture','Photography','Mixed media','Textile','Digital art','Ceramics','Other']},{k:'m',l:'Medium',t:'sel',o:['Painting','Print','Drawing','Sculpture','Photography','Mixed media']},{k:'y',l:'Year',t:'num',r:1},{k:'sz',l:'Size (for example 60 × 80 cm)',r:1},{k:'p',l:'Your asking price (GH₵)',t:'num',r:1},{k:'d',l:'Description',t:'area',r:1},{k:'img',l:'Photo of the work',t:'img'}];
function sell(){var me=db.artists.filter(function(a){return a.id===db.me})[0],h='<h2>Sell your art on '+esc(db.set.name)+'</h2><p class="sub">Join as an artist, list your work and reach collectors who read, review and give feedback.</p><div class="two"><div><h3>How it works</h3><ul class="ul"><li>Create your artist profile.</li><li>Submit each artwork with a photo, size and price.</li><li>Our curators review it, usually within three days.</li><li>Approved works go live in the shop and can join exhibitions.</li><li>You set your price. '+esc(db.set.name)+' takes a 30% commission when a work sells (demo terms).</li></ul>';
  if(me){var mine=db.works.filter(function(w){return w.by===me.id});
    h+='<h3>Your submissions</h3>'+(mine.length?mine.map(function(w){return '<div class="row2"><div><b>'+esc(w.t)+'</b><br><span class="mut">'+money(w.p)+'</span></div><span class="pill" style="'+(w.st==='pending'?'':'background:#9be3b4')+'">'+(w.st==='pending'?'In review':'Live')+'</span></div>'}).join(''):'<p class="mut">Nothing submitted yet.</p>')}
  h+='</div><div>';
  if(!me)h+='<h3>1. Create your artist profile</h3><form id="sp" class="pf"><label>Full or artist name<input name="name" required maxlength="60"></label><label>Email<input name="email" type="email" required></label><label>Country<input name="country" required></label><label>Website or Instagram<input name="site"></label><label>About your work<textarea name="bio" required maxlength="600"></textarea></label><button class="btn dark" type="submit">Create profile</button></form>';
  else h+='<div class="note">Signed in as <b>'+esc(me.name)+'</b> ('+esc(me.email)+'). <a href="#sell" id="so">Use a different profile</a></div><h3>2. Submit an artwork</h3>'+(sellMsg?'<div class="note" role="status">'+esc(sellMsg)+'</div>':'')+'<form id="sa" class="af">'+ART.map(function(f){return fld(f,f.k==='y'?2026:f.k==='m'?'Painting':'')}).join('')+'<div><button class="btn dark" type="submit">Submit for review</button></div></form>';
  $('#sell').innerHTML=h+'</div></div>';
  var sp=$('#sp'),sa=$('#sa'),so=$('#so');
  if(sp)sp.onsubmit=function(e){e.preventDefault();var d=new FormData(sp),a={id:nid(),name:d.get('name'),email:d.get('email'),country:d.get('country'),site:d.get('site'),bio:d.get('bio'),dt:today()};db.artists.push(a);db.me=a.id;sellMsg='';save();sell()};
  if(so)so.onclick=function(e){e.preventDefault();db.me=0;save();sell()};
  if(sa)sa.onsubmit=function(e){e.preventDefault();var o=read(sa,ART);o.id=nid();o.a=me.name;o.category=o.cat||'Other';o.k=['circles','bars','waves','grid'][o.id%4];o.pal=PALS[o.id%PALS.length];o.ex=0;o.st='pending';o.by=me.id;db.works.push(o);if(save()){sellMsg='Thanks. “'+o.t+'” is in review. We will publish it once a curator has approved it.'}else db.works.pop();sell();refresh(true)};
}

/* ---------- admin panel ---------- */
var SW=[{k:'t',l:'Title',r:1},{k:'a',l:'Artist',r:1},{k:'category',l:'Category',t:'sel',o:['Painting','Print','Drawing','Sculpture','Photography','Mixed media','Textile','Digital art','Ceramics','Other']},{k:'m',l:'Medium',t:'sel',o:['Painting','Print','Drawing','Sculpture','Photography','Mixed media']},{k:'y',l:'Year',t:'num',d:2026},{k:'sz',l:'Size'},{k:'p',l:'Price (GH₵)',t:'num',r:1},{k:'d',l:'Description',t:'area'},{k:'img',l:'Image',t:'img'},{k:'k',l:'Generated style (when no image)',t:'sel',o:['circles','bars','waves','grid']},{k:'ex',l:'Exhibition',t:'ex'},{k:'st',l:'Status',t:'sel',o:['live','pending']}];
var SP=[{k:'t',l:'Title',r:1},{k:'c',l:'Curator',r:1},{k:'g',l:'Category',t:'sel',o:['Essay','Practice','Studio visit','Guide','News']},{k:'dt',l:'Date',t:'date'},{k:'s',l:'Summary',t:'area',r:1},{k:'b',l:'Post body',t:'area',r:1}];
var SX=[{k:'t',l:'Exhibition title',r:1},{k:'m',l:'Museum',r:1},{k:'c',l:'City and country',r:1},{k:'cu',l:'Curator',r:1},{k:'s',l:'Opens',t:'date',r:1},{k:'e',l:'Closes',t:'date',r:1},{k:'ar',l:'Artists (comma separated)'},{k:'description',l:'Exhibition details',t:'area'}];
var SS=[{k:'t',l:'Headline',r:1},{k:'s',l:'Text',t:'area'},{k:'b',l:'Button label',r:1},{k:'l',l:'Button goes to',t:'sel',o:['#shop','#artworks','#journal','#exhibitions','#sell']},{k:'k',l:'Default art style',t:'sel',o:['circles','bars','waves','grid']},{k:'img',l:'Custom slide image (optional)',t:'img'},{k:'c1',l:'Background colour',t:'color'},{k:'c2',l:'Button colour',t:'color'},{k:'c3',l:'Art colour',t:'color'}];
var SSET=[{k:'name',l:'Company name',r:1},{k:'tag',l:'Tagline'},{k:'foot',l:'Footer text'},{k:'pass',l:'Admin passcode',r:1}];
var tab='works',edit=null,adminErr='';
function refresh(keepAdmin){apply();slider();chips();grid();jchips();posts();renderExhibitions();cart();if(!keepAdmin&&location.hash==='#admin')admin()}
function crud(key,title,sch,row,fixed){var L=db[key],it=edit!=null?L.filter(function(x){return String(x.id)===String(edit)})[0]:null;
  var h='<h3>'+title+' ('+L.length+')</h3><div>'+L.map(function(x){var r=row(x);return '<div class="row2"><div><b>'+esc(r[0])+'</b>'+(x.st==='pending'?'<span class="pill">Pending</span>':'')+'<br><span class="mut">'+esc(r[1])+'</span></div><div class="acts">'+(x.st==='pending'?(key==='posts'?'<button class="btn dark" data-post-approve="'+x.id+'">Approve &amp; publish</button><button class="btn" data-post-reject="'+x.id+'">Reject</button>':'<button class="btn dark" data-ap="'+x.id+'">Approve</button>'):'')+'<button class="btn" data-ed="'+x.id+'">Edit</button>'+(fixed?'':'<button class="btn" data-del="'+x.id+'">Delete</button>')+'</div></div>'}).join('')+'</div>';
  if(fixed&&!it)return h+'<p class="note">Choose Edit on a slide to change its text, button, link and colours.</p>';
  return h+'<h3>'+(it?'Edit':'Add new')+'</h3><form id="af" class="af">'+sch.map(function(f){return fld(f,it?it[f.k]:(f.k==='dt'?today():f.k==='st'?'live':f.k==='y'?2026:f.k==='k'?'circles':f.k==='c1'?'#f3efe6':f.k==='c2'?'#2438ff':f.k==='c3'?'#ff6a3d':f.d))}).join('')+'<div><button class="btn dark" type="submit">'+(it?'Save changes':'Add')+'</button>'+(it?' <button class="btn" type="button" data-cancel>Cancel</button>':'')+'</div></form>'}
function admin(){var el=$('#admin');
  if(!sessionStorage.getItem('zadm')){el.innerHTML='<h2>Admin</h2><p class="sub">Enter the passcode to manage the site.</p><form id="lg" class="pf" style="max-width:340px"><label>Passcode<input type="password" name="p" required autocomplete="off"></label>'+(adminErr?'<div class="note" role="alert">'+adminErr+'</div>':'')+'<button class="btn dark" type="submit">Sign in</button><p class="mut" style="font-size:13px">Demo passcode: <b>zartz-admin</b></p></form>';
    $('#lg').onsubmit=function(e){e.preventDefault();if(new FormData(this).get('p')===db.set.pass){sessionStorage.setItem('zadm','1');adminErr=''}else adminErr='Incorrect passcode. Try again.';admin()};return}
  var pend=db.works.filter(function(w){return w.st==='pending'}).length,T=[['works','Artwork'+(pend?' ('+pend+' pending)':'')],['posts','Journal'],['exs','Exhibitions'],['slides','Slides'],['rev','Reviews'],['set','Site']];
  var h='<h2>Admin</h2><div class="adtabs" role="tablist">'+T.map(function(t){return '<button role="tab" data-tab="'+t[0]+'" aria-selected="'+(tab===t[0])+'">'+t[1]+'</button>'}).join('')+'<button data-out style="margin-left:auto">Sign out</button></div>';
  if(tab==='works')h+=crud('works','All artwork',SW,function(w){return[w.t+' – '+w.a,money(w.p)+' · '+w.m+(w.by?' · artist submission':'')]});
  if(tab==='posts')h+=crud('posts','Curators’ Journal',SP,function(p){return[p.t,fmt(p.dt)+' · '+p.c+' · '+p.g]});
  if(tab==='exs')h+=crud('exs','Exhibitions',SX,function(x){return[x.t+' at '+x.m,x.c+' · '+fmt(x.s)+' to '+fmt(x.e)]});
  if(tab==='slides'){h+=crud('slides','Homepage art-style slides',SS,function(s){return[s.t,s.b+' → '+s.l+(s.img?' · Custom image':' · Default '+(s.k||'circles')+' style')]});h+='<p class="note">Default generated art styles are selected automatically. To replace one with your own image, edit a slide and upload a JPG or PNG; to create another slide, use the Add form below.</p>';}
  if(tab==='rev')h+='<h3>Reviews ('+db.rev.length+')</h3>'+db.rev.map(function(r,i){var w=wk(r.w);return '<div class="row2"><div><b>'+esc(r.n)+'</b> <span class="st">'+stars(r.r)+'</span> on '+esc(w?w.t:'removed work')+'<br><span class="mut">'+esc(r.t)+'</span></div><button class="btn sm" data-rd="'+i+'">Delete</button></div>'}).join('')+'<h3>Feedback ('+db.fb.length+')</h3>'+db.fb.map(function(r,i){var w=wk(r.w);return '<div class="row2"><div><b>'+esc(r.n)+'</b><span class="tag">'+esc(r.a)+'</span> on '+esc(w?w.t:'removed work')+'<br><span class="mut">'+esc(r.t)+'</span></div><button class="btn sm" data-fd="'+i+'">Delete</button></div>'}).join('')+'<h3>Artist signups ('+db.artists.length+')</h3>'+(db.artists.length?db.artists.map(function(a){return '<div class="row2"><div><b>'+esc(a.name)+'</b> · '+esc(a.country)+'<br><span class="mut">'+esc(a.email)+' · '+esc(a.bio)+'</span></div></div>'}).join(''):'<p class="mut">No artists have signed up yet.</p>');
  if(tab==='set')h+='<h3>Site settings</h3><form id="af" class="af">'+SSET.map(function(f){return fld(f,db.set[f.k])}).join('')+'<div><button class="btn dark" type="submit">Save settings</button></div></form><h3>Reset</h3><p class="mut">Restore the original demo content. This removes all your changes, reviews and artist submissions.</p><button class="btn" data-reset>Reset demo data</button>';
  el.innerHTML=h;
  var f=$('#af');if(f)f.onsubmit=function(e){e.preventDefault();
    if(tab==='set'){Object.assign(db.set,read(f,SSET));save();refresh(true);admin();return}
    var sch={works:SW,posts:SP,exs:SX,slides:SS}[tab],o=read(f,sch),L=db[tab];
    if(edit!=null){var existing=L.filter(function(x){return String(x.id)===String(edit)})[0];if(existing)Object.assign(existing,o)}
    else{o.id=nid();if(tab==='works')o.pal=PALS[o.id%PALS.length];L.push(o)}
    edit=null;save();refresh(true);admin()}}
$('#admin').onclick=function(e){var d=e.target.dataset;if(!d)return;
  var L=db[tab]||[],changed=false;
  if(d.tab){tab=d.tab;edit=null;admin();return}
  if(d.out!==undefined){sessionStorage.removeItem('zadm');admin();return}
  if(d.ed){edit=d.ed;admin();var form=$('#af');if(form)form.scrollIntoView({block:'center'});return}
  if(d.cancel!==undefined){edit=null;admin();return}
  if(d.ap){wk(+d.ap).st='live';changed=true}
  if(d.del&&confirm('Delete this item? This cannot be undone.')){db[tab]=L.filter(function(x){return String(x.id)!==String(d.del)});changed=true}
  if(d.rd){db.rev.splice(+d.rd,1);changed=true}
  if(d.fd){db.fb.splice(+d.fd,1);changed=true}
  if(d.reset!==undefined&&confirm('Reset everything to the original demo content?')){var p=db.set.pass;db=seed();db.set.pass=p;changed=true}
  if(changed){save();refresh(true);admin()}};


/* ---------- ZARTZ marketplace enhancements ---------- */
(function(){
  /* Migrate/extend the original browser data without deleting existing work. */
  db.profiles=db.profiles||[];
  db.analytics=db.analytics||[];
  db.sales=db.sales||[];
  db.currentProfileId=db.currentProfileId||null;
  db.works.forEach(function(w){
    if(w.st==='pending' || w.st==='rejected' || w.st==='live'){}
    if(!w.sellerRole)w.sellerRole='artist';
    if(!w.sellerId && w.by)w.sellerId='artist-'+w.by;
    if(!w.originalArtist)w.originalArtist=w.a||'';
  });
  var seededNames=['Mira Okonkwo','Tomás Vidal','Aiko Reyes','Lena Hartmann'];
  seededNames.forEach(function(name,i){
    if(!db.profiles.some(function(p){return p.name===name})){
      db.profiles.push({id:'seed-'+(i+1),type:'artist',name:name,country:i===2?'Mexico':i===3?'Germany':'Portugal',bio:'Artist profile for '+name+'. This digital booklet introduces the practice, published artworks, journal appearances and ways to discover the artist.',site:'',links:[],createdAt:today()});
    }
  });
  db.works.forEach(function(w){
    if(!w.sellerId){
      var p=db.profiles.filter(function(x){return x.name===w.a})[0];
      if(p)w.sellerId=p.id;
    }
  });
  function prof(id){return db.profiles.filter(function(p){return String(p.id)===String(id)})[0]}
  function profByName(name){return db.profiles.filter(function(p){return p.name===name})[0]}
  function me(){return prof(db.currentProfileId)}
  function currentId(){
    if(db.currentProfileId)return db.currentProfileId;
    if(db.me){var a=db.artists.filter(function(x){return x.id===db.me})[0];if(a)return 'artist-'+a.id}
    return null;
  }
  function ensureProfileFromArtist(a){
    if(!a)return null;
    var id='artist-'+a.id,p=prof(id);
    if(!p){p={id:id,type:'artist',name:a.name,country:a.country,bio:a.bio,site:a.site||'',links:[],createdAt:a.dt};db.profiles.push(p)}
    return p;
  }
  db.artists.forEach(ensureProfileFromArtist);
  function profileForWork(w){
    var p=prof(w.sellerId);
    if(!p)p=profByName(w.a);
    return p;
  }
  function sellerLabel(w){
    var p=profileForWork(w);
    if(!p)return esc(w.a);
    var label=p.type==='artist'?'Artist':p.type==='curator'?'Curator':'Museum';
    return '<a href="#profile?id='+encodeURIComponent(p.id)+'" class="profile-link" data-profile="'+esc(p.id)+'">'+esc(p.name)+'</a> <span class="role-note">'+label+'</span>';
  }
  function track(type,data){
    data=data||{};
    var vid=null;try{vid=localStorage.getItem('zartz_visitor_id')}catch(e){}
    if(!vid){vid='v-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);try{localStorage.setItem('zartz_visitor_id',vid)}catch(e){}data.newVisitor=true}
    db.analytics.push({id:nid(),type:type,at:new Date().toISOString(),visitor:vid,ref:document.referrer||'direct',path:location.hash||'#shop',lang:navigator.language||'',device:/Mobi|Android/i.test(navigator.userAgent)?'Mobile':'Desktop',tz:Intl.DateTimeFormat().resolvedOptions().timeZone||'',screen:screen.width+'x'+screen.height,data:data});
    if(db.analytics.length>5000)db.analytics=db.analytics.slice(-5000);
    save();
  }
  function source(ref){
    if(!ref)return 'Direct';
    try{var h=new URL(ref).hostname;return /google|bing|yahoo|duckduckgo/i.test(h)?'Organic search':/facebook|instagram|tiktok|twitter|x\.com|linkedin/i.test(h)?'Social':/utm|ads|doubleclick/i.test(ref)?'Paid':'Referral'}catch(e){return 'Referral'}
  }
  function goProfile(id){location.hash='profile?id='+encodeURIComponent(id)}
  function published(){return db.works.filter(function(w){return w.st==='live'})}
  function roleOptions(){return [['artist','Artist'],['curator','Curator'],['museum','Museum']]}
  function statusPill(w){
    var map={pending:'Pending review',rejected:'Rejected',live:'On sale'};
    return '<span class="pill status-'+w.st+'">'+(map[w.st]||w.st)+'</span>';
  }
  function artworkCard(w){
    var n=revs(w.id).length,p=profileForWork(w);
    return '<article class="art" tabindex="0" data-id="'+w.id+'"><button class="art-open" data-id="'+w.id+'"><div class="im">'+art(w)+'</div><h3>'+esc(w.t)+'</h3><p>'+sellerLabel(w)+'</p><p>'+esc(w.m)+' · '+esc(w.y)+'</p><p><span class="st">'+(n?stars(avg(w.id)):'No reviews yet')+'</span> '+(n?'('+n+')':'')+'</p><p class="pr">'+money(w.p)+'</p></button><button class="btn sm rate-art" type="button" data-rate="'+w.id+'">Rate artwork</button></article>';
  }
  function renderFeatured(){
    var oldGrid=$('#grid');if(!oldGrid)return;
    var l=published().slice().sort(function(a,b){return avg(b.id)-avg(a.id)||b.id-a.id}).slice(0,6);
    oldGrid.innerHTML=l.length?l.map(artworkCard).join(''):'<p class="mut">No approved artworks are on sale yet.</p>';
    $('#count').innerHTML=l.length+' featured artwork'+(l.length===1?'':'s');
  }
  function renderAll(){
    var q=($('#aq')&&$('#aq').value||'').toLowerCase(),role=$('#arole')?$('#arole').value:'',sort=$('#asort')?$('#asort').value:'top',m=window.allMed||'All';
    var l=published().filter(function(w){var p=profileForWork(w),txt=(w.t+' '+w.a+' '+w.m+' '+(p?p.name:'')).toLowerCase();return (!q||txt.indexOf(q)>-1)&&(!role||p&&p.type===role)&&(m==='All'||w.m===m)});
    l.sort(function(a,b){return sort==='lo'?a.p-b.p:sort==='hi'?b.p-a.p:sort==='new'?b.id-a.id:avg(b.id)-avg(a.id)});
    $('#acount').textContent=l.length+' artwork'+(l.length===1?'':'s')+' on sale';
    $('#agrid').innerHTML=l.length?l.map(artworkCard).join(''):'<p class="mut">No artwork matches your filters.</p>';
    var meds=['All'].concat(published().map(function(w){return w.m}).filter(function(x,i,a){return a.indexOf(x)===i}));
    $('#achips').innerHTML=meds.map(function(x){return '<button class="chip" aria-pressed="'+(x===m)+'" data-med="'+esc(x)+'">'+esc(x)+'</button>'}).join('');
  }
  function renderProfiles(){
    var out='';
    db.profiles.forEach(function(p){
      var works=published().filter(function(w){return w.sellerId===p.id||(!w.sellerId&&w.a===p.name)});
      var blogs=db.posts.filter(function(x){return x.c===p.name&&(!x.supabaseId||x.st==='published')});
      var role=p.type==='artist'?'Artist':p.type==='curator'?'Curator':'Museum';
      out+='<div class="profile-card"><span class="badge">'+role+'</span><h3>'+esc(p.name)+'</h3><p class="mut">'+esc(p.country||'')+'</p><p>'+esc(p.bio||'Profile biography coming soon.')+'</p><p><b>'+works.length+'</b> published artwork'+(works.length===1?'':'s')+' · <b>'+blogs.length+'</b> journal post'+(blogs.length===1?'':'s')+'</p></div>';
    });
    return out;
  }
  function renderProfilePage(){
    var id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'),p=prof(id);
    if(!p){$('#profile').innerHTML='<h2>Profile not found</h2><a class="btn" href="#artworks">Back to artworks</a>';return}
    track('profile_view',{profileId:p.id});
    var works=published().filter(function(w){return w.sellerId===p.id||(!w.sellerId&&w.a===p.name)}),blogs=db.posts.filter(function(x){return x.c===p.name&&(!x.supabaseId||x.st==='published')});
    var role=p.type==='artist'?'Artist':p.type==='curator'?'Curator':'Museum';
    $('#profile').innerHTML='<a class="btn sm" href="#artworks">← Back to artworks</a><span class="badge" style="display:block;width:max-content;margin-top:24px">'+role+'</span><h2>'+esc(p.name)+'</h2><p class="sub">'+esc(p.country||'')+'</p><div class="profile-booklet"><h3>Biography</h3><p>'+esc(p.bio||'')+'</p>'+(p.bookletUrl?'<p><a class="btn sm" href="'+esc(p.bookletUrl)+'" target="_blank" rel="noopener">View digital booklet (PDF)</a></p>':'')+(p.site?'<p><a href="'+esc(p.site)+'" target="_blank" rel="noopener">Website / social profile</a></p>':'')+(p.links&&p.links.length?'<div class="profile-links">'+p.links.map(function(x){return '<a href="'+esc(x.url)+'" target="_blank" rel="noopener">'+esc(x.label||x.url)+'</a>'}).join(' · ')+'</div>':'')+'</div><h3>Published artworks ('+works.length+')</h3><div class="grid">'+(works.length?works.map(artworkCard).join(''):'<p class="mut">No artworks published yet.</p>')+'</div><h3>Journal and blogs ('+blogs.length+')</h3><div class="posts">'+(blogs.length?blogs.map(function(x){return '<div class="journal-card"><div class="meta">'+fmt(x.dt)+' · '+esc(x.g)+'</div><h3>'+esc(x.t)+'</h3><p>'+esc(x.s)+'</p><button class="btn sm" data-post="'+x.id+'">Read full journal</button></div>'}).join(''):'<p class="mut">No journal posts yet.</p>')+'</div>';
    $('#profile').onclick=function(e){var b=e.target.closest('[data-id]');if(b&&b.classList.contains('art-open'))openW(+b.dataset.id,'r');var j=e.target.closest('[data-post]');if(j)location.hash='journal-post?id='+j.dataset.post};
  }
  function renderJournal(){
    var visiblePosts=db.posts.filter(function(p){return !p.supabaseId||p.st==='published'});
    var cs=['All','Essay','Practice','Studio visit','Guide','News'].concat(visiblePosts.map(function(p){return p.g}).filter(function(x,i,a){return a.indexOf(x)===i&&['All','Essay','Practice','Studio visit','Guide','News'].indexOf(x)<0}));
    $('#jchips').innerHTML=cs.map(function(x){return '<button class="chip" aria-pressed="'+(x===cur)+'">'+esc(x)+'</button>'}).join('');
    var l=visiblePosts.filter(function(p){return cur==='All'||p.g===cur}).sort(function(a,b){return a.dt<b.dt?1:-1});
    $('#posts').innerHTML=l.length?l.map(function(p){return '<div class="journal-card"><div class="meta">'+esc(p.g)+' · '+fmt(p.dt)+' · by <a href="#profile?id='+encodeURIComponent((profByName(p.c)||{}).id||'')+'">'+esc(p.c)+'</a></div><h3>'+esc(p.t)+'</h3><p>'+esc(p.s)+'</p><button class="btn sm" data-post="'+p.id+'">Read entire article →</button></div>'}).join(''):'<p class="mut">No posts yet.</p>';
    $('#jchips').onclick=function(e){var b=e.target.closest('.chip');if(!b)return;cur=b.textContent;renderJournal()};$('#posts').onclick=function(e){var b=e.target.closest('[data-post]');if(b){track('journal_open',{postId:+b.dataset.post});location.hash='journal-post?id='+b.dataset.post}};
  }
  function renderJournalPost(){
    var id=new URLSearchParams(location.hash.split('?')[1]||'').get('id')||'',p=db.posts.filter(function(x){return String(x.id)===String(id)})[0];
    if(!p){$('#journal-post').innerHTML='<h2>Article not found</h2>';return}
    track('journal_view',{postId:String(id)});
    var paras=String(p.b||'').split(/\n+/).filter(Boolean),per=3,page=Math.min(+(sessionStorage.getItem('zartz_jpage_'+id)||1),Math.max(1,Math.ceil(paras.length/per))),start=(page-1)*per;
    $('#journal-post').innerHTML='<a class="btn sm" href="#journal">← Curators’ Journal</a><div class="article-page"><div class="meta">'+esc(p.g)+' · '+fmt(p.dt)+' · by '+esc(p.c)+'</div><h2>'+esc(p.t)+'</h2><p class="sub">'+esc(p.s)+'</p>'+paras.slice(start,start+per).map(function(x){return '<p>'+esc(x)+'</p>'}).join('')+'<div class="page-nav">'+(page>1?'<button class="btn sm" data-jpage="'+(page-1)+'">← Previous</button>':'')+'<span>Page '+page+' of '+Math.max(1,Math.ceil(paras.length/per))+'</span>'+(page<Math.ceil(paras.length/per)?'<button class="btn sm" data-jpage="'+(page+1)+'">Next →</button>':'')+'</div></div>';
    $('#journal-post').onclick=function(e){var b=e.target.closest('[data-jpage]');if(b){try{sessionStorage.setItem('zartz_jpage_'+id,b.dataset.jpage)}catch(e){}renderJournalPost()}};
  }
  renderExhibitionPage=function(){
    var id=+(new URLSearchParams(location.hash.split('?')[1]||'').get('id')||0),x=db.exs.filter(function(z){return z.id===id})[0];
    if(!x){$('#exhibition').innerHTML='<h2>Exhibition not found</h2><a class="btn" href="#exhibitions">Back to exhibitions</a>';return}
    var works=published().filter(function(w){return w.ex===x.id});
    $('#exhibition').innerHTML='<a class="btn sm" href="#exhibitions">← Exhibitions</a><div class="article-page"><span class="badge '+status(x)+'">'+({now:'On now',soon:'Upcoming',past:'Closed'}[status(x)])+'</span><h2>'+esc(x.t)+'</h2><p class="sub">'+esc(x.m)+' · '+esc(x.c)+'</p><p><b>Curator:</b> '+esc(x.cu)+'<br><b>Dates:</b> '+fmt(x.s)+' to '+fmt(x.e)+'<br><b>Artists:</b> '+esc(x.ar)+'</p><p>'+esc(x.description||'Explore the full exhibition, its curatorial context and the works presented.')+'</p><h3>Works in this exhibition ('+works.length+')</h3><div class="grid">'+(works.length?works.map(artworkCard).join(''):'<p class="mut">No approved works have been assigned to this exhibition yet.</p>')+'</div></div>';
    $('#exhibition').onclick=function(e){var b=e.target.closest('.art-open');if(b)openW(+b.dataset.id,'r')};
  };
  function renderDashboard(){
    var p=me();
    if(!p){$('#dashboard').innerHTML='<h2>Seller dashboard</h2><p class="sub">Create a seller profile to access your personal dashboard.</p><a class="btn dark" href="#sell">Create seller profile</a>';return}
    var mine=db.works.filter(function(w){return w.sellerId===p.id||w.by===p.legacyId});
    var pending=mine.filter(function(w){return w.st==='pending'}).length,rejected=mine.filter(function(w){return w.st==='rejected'}).length,livec=mine.filter(function(w){return w.st==='live'}).length;
    $('#dashboard').innerHTML='<a class="btn sm" href="#sell">Submit another artwork</a><span class="badge" style="display:block;width:max-content;margin-top:24px">'+esc(p.type)+'</span><h2>'+esc(p.name)+'’s dashboard</h2><div class="stats"><div><b>'+livec+'</b><span>On sale</span></div><div><b>'+pending+'</b><span>Under review</span></div><div><b>'+rejected+'</b><span>Rejected</span></div></div><div class="profile-booklet"><h3>Your biography</h3><p>'+esc(p.bio||'')+'</p>'+(p.bookletUrl?'<p><a class="btn sm" href="'+esc(p.bookletUrl)+'" target="_blank" rel="noopener">View digital booklet (PDF)</a></p>':'')+'<a href="#profile?id='+encodeURIComponent(p.id)+'" class="btn sm">View public profile</a></div><h3>Your submissions</h3><div>'+(mine.length?mine.map(function(w){return '<div class="row2"><div><b>'+esc(w.t)+'</b><br><span class="mut">'+money(w.p)+' · '+esc(w.m)+'</span>'+(w.reviewNote?'<br><span class="mut">Admin note: '+esc(w.reviewNote)+'</span>':'')+'</div>'+statusPill(w)+'</div>'}).join(''):'<p class="mut">No submissions yet.</p>')+'</div>';
  }
  function renderSell(){
    var p=me(),h='<h2>Sell your art</h2><p class="sub">Every submission is reviewed by the ZARTZ admin before it appears in Artworks on sale.</p><div class="two"><div><h3>Review workflow</h3><ol class="ul"><li>Create your seller profile.</li><li>Upload an artwork and submit it.</li><li>Your request appears in the admin review queue under your profile.</li><li>Admin approves or rejects it.</li><li>Approved work moves automatically to Artworks on sale.</li></ol>'+(p?'<a class="btn" href="#dashboard">Open my dashboard</a>':'')+'</div><div>';
    if(!p){
      h+='<h3>1. Create seller profile</h3><form id="sp" class="pf"><label>Seller type<select name="type"><option value="artist">Artist — my own artwork</option><option value="curator">Curator — reselling artists</option><option value="museum">Museum — reselling artists</option></select></label><label>Name / organisation<input name="name" required maxlength="80"></label><label>Email<input name="email" type="email" required></label><label>Country<input name="country" required></label><label>Website or social link<input name="site"></label><label>Biography<textarea name="bio" required maxlength="2500"></textarea></label><label>Digital booklet (optional PDF)<input name="booklet" type="file" accept="application/pdf,.pdf"></label><label>Other links<textarea name="links" placeholder="One URL per line"></textarea></label><button class="btn dark" type="submit">Create seller profile</button></form>';
    }else{
      h+='<div class="note">Signed in as <b>'+esc(p.name)+'</b> · '+esc(p.type)+' · <a href="#dashboard">Dashboard</a> · <button class="linkbtn" id="switchSeller" type="button">Switch profile</button></div><h3>2. Publish an artwork for review</h3><form id="sa" class="af">'+ART.map(function(f){return fld(f,f.k==='y'?2026:f.k==='m'?'Painting':'')}).join('')+(p.type!=='artist'?'<label>Original artist name<input name="originalArtist" required placeholder="Artist whose work you represent"></label><label>Original artist profile / website<input name="originalArtistLink"></label>':'')+'<div><button class="btn dark" type="submit">Publish artwork for review</button></div></form>';
    }
    h+='</div></div>';$('#sell').innerHTML=h;
    var sp=$('#sp'),sa=$('#sa');
    if(sp)sp.onsubmit=function(e){e.preventDefault();var d=new FormData(sp),id='profile-'+nid(),links=String(d.get('links')||'').split(/\n+/).filter(Boolean).map(function(url){return{url:url,label:url}}),p={id:id,type:d.get('type'),name:d.get('name'),email:d.get('email'),country:d.get('country'),site:d.get('site'),bio:d.get('bio'),bookletUrl:(window.__zartzBooklet&&window.__zartzBooklet.data)||'',bookletName:(window.__zartzBooklet&&window.__zartzBooklet.name)||'',links:links,createdAt:today()};db.profiles.push(p);db.currentProfileId=id;save();track('profile_create',{profileId:id,type:p.type});location.hash='dashboard'};
    if(sa)sa.onsubmit=function(e){e.preventDefault();var o=read(sa,ART),id=nid();o.id=id;o.a=p.name;o.originalArtist=p.type==='artist'?p.name:(new FormData(sa)).get('originalArtist');o.originalArtistLink=p.type==='artist'?'':(new FormData(sa)).get('originalArtistLink');o.k=['circles','bars','waves','grid'][id%4];o.pal=PALS[id%PALS.length];o.ex=0;o.st='pending';o.sellerId=p.id;o.sellerRole=p.type;o.submittedAt=new Date().toISOString();db.works.push(o);save();track('artwork_submit',{workId:id,profileId:p.id});location.hash='dashboard'};
    $('#switchSeller')&&($('#switchSeller').onclick=function(){db.currentProfileId=null;db.me=0;save();renderSell()});
  }
  function renderAnalytics(){
    var a=db.analytics||[], unique={};a.forEach(function(x){unique[x.visitor]=1});
    var views=a.filter(function(x){return x.type==='page_view'||x.type==='artwork_view'}).length, carts=a.filter(function(x){return x.type==='cart_add'}).length,purchases=a.filter(function(x){return x.type==='purchase'}).length;
    var channels={};a.forEach(function(x){var k=source(x.ref);channels[k]=(channels[k]||0)+1});
    var pages={};a.forEach(function(x){pages[x.path]=(pages[x.path]||0)+1});
    var devices={};a.forEach(function(x){devices[x.device]=(devices[x.device]||0)+1});
    function list(o){return Object.keys(o).sort(function(x,y){return o[y]-o[x]}).map(function(k){return '<div class="row2"><span>'+esc(k)+'</span><b>'+o[k]+'</b></div>'}).join('')}
    $('#analytics').innerHTML='<h3>Business analytics</h3><p class="sub">First-party activity recorded by this storefront. For production multi-device analytics, send these events to a server/database.</p><div class="stats"><div><b>'+Object.keys(unique).length+'</b><span>Unique visitors</span></div><div><b>'+views+'</b><span>Page / artwork views</span></div><div><b>'+carts+'</b><span>Cart additions</span></div><div><b>'+purchases+'</b><span>Purchases</span></div><div><b>'+((views?((carts/views)*100):0).toFixed(1))+'%</b><span>Cart conversion</span></div></div><div class="analytics-grid"><div><h3>Traffic acquisition</h3>'+list(channels)+'</div><div><h3>Devices</h3>'+list(devices)+'</div><div><h3>Top pages</h3>'+list(pages)+'</div><div><h3>Engagement</h3><div class="row2"><span>Artwork views</span><b>'+a.filter(function(x){return x.type==='artwork_view'}).length+'</b></div><div class="row2"><span>Profiles viewed</span><b>'+a.filter(function(x){return x.type==='profile_view'}).length+'</b></div><div class="row2"><span>Journal reads</span><b>'+a.filter(function(x){return x.type==='journal_view'}).length+'</b></div><div class="row2"><span>Searches</span><b>'+a.filter(function(x){return x.type==='search'}).length+'</b></div></div></div><p class="mut">Geographic reporting is represented by browser timezone/language in this static build; exact visitor geography requires a server-side analytics provider.</p>';
  }

  /* Replace public renderers with the enhanced versions. */
  window.__zartzProfile=prof;
  window.__zartzTrack=track;
  grid=function(){renderFeatured();};
  posts=function(){renderJournal();};
  sell=function(){renderSell();};
  route=function(){
    var raw=location.hash||'#shop',v=raw.slice(1).split('?')[0],el=$('#'+v);
    if(!el||!el.classList.contains('view'))v='shop';
    $$('.view').forEach(function(e){e.classList.toggle('on',e.id===v)});
    $$('[data-v]').forEach(function(a){a.classList.toggle('on',a.dataset.v===v)});
    if(v==='sell')renderSell();
    if(v==='dashboard')renderDashboard();
    if(v==='profile')renderProfilePage();
    if(v==='journal-post')renderJournalPost();
    if(v==='exhibition')renderExhibitionPage();
    if(v==='journal')renderJournal();
    if(v==='exhibitions')renderExhibitions();
    if(v==='admin')admin();
    if(v==='artworks')renderAll();
    if(v==='shop')renderFeatured();
    track('page_view',{page:v});
    window.scrollTo(0,0);
  };
  openW=function(id,tab){
    var w=wk(id);if(!w)return;track('artwork_view',{workId:id});
    var ex=db.exs.filter(function(x){return x.id===w.ex})[0],rv=revs(id),fb=fbs(id),p=profileForWork(w),h='<button class="x" aria-label="Close" data-x>×</button><div class="dg"><div><div class="im">'+art(w)+'</div></div><div>'+
      '<h2>'+esc(w.t)+'</h2><div>'+sellerLabel(w)+'</div>'+((p&&p.type!=='artist'&&w.originalArtist)?'<p class="mut">Artwork by '+esc(w.originalArtist)+(w.originalArtistLink?' · <a href="'+esc(w.originalArtistLink)+'" target="_blank" rel="noopener">artist link</a>':'')+'</p>':'')+
      '<div class="st" style="margin-top:6px">'+(rv.length?stars(avg(id))+' <span class="mut">'+avg(id).toFixed(1)+' from '+rv.length+'</span>':'<span class="mut">No reviews yet</span>')+'</div><p>'+esc(w.d)+'</p><dl><dt>Medium</dt><dd>'+esc(w.m)+'</dd><dt>Size</dt><dd>'+esc(w.sz)+'</dd><dt>Seller</dt><dd>'+sellerLabel(w)+'</dd><dt>Shown at</dt><dd>'+(ex?esc(ex.t)+', '+esc(ex.m):'Not in an exhibition')+'</dd></dl><div style="display:flex;gap:12px;align-items:center"><b style="font-size:24px">'+money(w.p)+'</b><button class="btn dark" data-add="'+id+'">Add to cart</button></div><div class="tabs"><button data-t="r" aria-selected="'+(tab==='r')+'">Reviews ('+rv.length+')</button><button data-t="f" aria-selected="'+(tab==='f')+'">Feedback ('+fb.length+')</button></div>';
    if(tab==='f'){h+=(fb.length?fb.map(function(x){var i=db.fb.indexOf(x),lk=+x.likes||0,st=feedbackRating(x);return '<div class="rv feedback-item"><b>'+esc(x.n)+'</b><span class="tag">'+esc(x.a)+'</span><span class="st">'+(st?stars(st):'No stars yet')+'</span><span class="mut"> '+lk+' likes · '+ratingLabel()+'</span><p>'+esc(x.t)+'</p><button class="btn sm" type="button" data-flike="'+i+'">Like feedback</button></div>'}).join(''):'<p class="mut">No feedback yet.</p>')+'<form id="ff"><div class="row"><input name="n" placeholder="Your name" required><input name="a" placeholder="Feedback area" required></div><textarea name="t" required placeholder="Share useful feedback about this artwork."></textarea><button class="btn" type="submit">Post feedback</button></form><p class="mut">Feedback stars use likes. '+ratingLabel()+' thresholds: 1★ starts at 1 like, 2★ at 6/26/251, 3★ at 16/101/1,001, 4★ at 51/501/5,001, 5★ at 151/2,501/25,001.</p>';}
    if(tab==='r')h+=(rv.length?rv.map(function(x){return '<div class="rv"><b>'+esc(x.n)+'</b><span class="st">'+stars(x.r)+'</span><p>'+esc(x.t)+'</p></div>'}).join(''):'<p class="mut">Be the first to review this work.</p>')+'<form id="fr"><div class="row"><input name="n" placeholder="Your name" required><select name="r"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></div><textarea name="t" required placeholder="What did you notice?"></textarea><button class="btn" type="submit">Post review</button></form>';
    else h+='<p class="mut">Feedback goes to the artist and curators.</p>'+fb.map(function(x){return '<div class="rv"><b>'+esc(x.n)+'</b><span class="tag">'+esc(x.a)+'</span><p>'+esc(x.t)+'</p></div>'}).join('')+'<form id="ff"><div class="row"><input name="n" placeholder="Your name" required><select name="a"><option>Composition</option><option>Colour</option><option>Concept</option><option>Technique</option><option>Framing</option></select></div><textarea name="t" required placeholder="What worked?"></textarea><button class="btn" type="submit">Send feedback</button></form>';
    dlg.innerHTML=h+'</div></div>';dlg.dataset.id=id;if(!dlg.open)dlg.showModal();
    var f=$('#fr'),g=$('#ff');$$('[data-flike]').forEach(function(b){b.onclick=function(){var i=+b.dataset.flike;if(db.fb[i]){db.fb[i].likes=(+db.fb[i].likes||0)+1;save();openW(id,'f')}}});if(f)f.onsubmit=function(e){e.preventDefault();var d=new FormData(f);db.rev.push({w:id,n:d.get('n'),r:+d.get('r'),t:d.get('t')});save();track('review',{workId:id});openW(id,'r')};if(g)g.onsubmit=function(e){e.preventDefault();var d=new FormData(g);db.fb.push({w:id,n:d.get('n'),a:d.get('a'),t:d.get('t'),likes:0});save();openW(id,'f')};
  };
  /* Enhanced slide renderer supports an uploaded image. */
  slider=function(){var S=db.slides||[];si=Math.min(si,S.length-1);$('#sl').innerHTML=S.map(function(s,i){var visual=s.img?'<img src="'+esc(s.img)+'" alt="'+esc(s.t)+'" style="width:100%;height:100%;object-fit:cover">':art({id:200+i,k:s.k,t:s.t,a:'ZARTZ',pal:[s.c1,s.c2,s.c3,ink(s.c1)]});return '<div class="sl'+(i===si?' on':'')+'" style="background:'+esc(s.c1)+';color:'+ink(s.c1)+'"><div class="wrap"><div><h1>'+esc(s.t)+'</h1><p>'+esc(s.s)+'</p><a class="btn" href="'+esc(s.l)+'" style="background:'+esc(s.c2)+';color:'+ink(s.c2)+'">'+esc(s.b)+'</a></div><div class="sa im">'+visual+'</div></div></div>'}).join('');$('#dots').innerHTML=S.map(function(s,i){return '<button data-d="'+i+'" aria-label="Go to slide '+(i+1)+'" aria-current="'+(i===si)+'"></button>'}).join('');$('#slw').style.color=ink(S[si].c1);play()};

  /* Dashboard/profile-aware admin. */
  admin=function(){
    var el=$('#admin');
    if(!sessionStorage.getItem('zadm')){el.innerHTML='<h2>Admin</h2><p class="sub">Enter the passcode to manage the site.</p><form id="lg" class="pf" style="max-width:340px"><label>Passcode<input type="password" name="p" required></label><button class="btn dark" type="submit">Sign in</button><p class="mut">Demo passcode: <b>zartz-admin</b></p></form>';$('#lg').onsubmit=function(e){e.preventDefault();if(new FormData(this).get('p')===db.set.pass){sessionStorage.setItem('zadm','1');adminErr='';admin()}else{adminErr='Incorrect passcode.';admin()}};return}
    var pend=db.works.filter(function(w){return w.st==='pending'}),T=[['works','Review queue ('+pend.length+')'],['profiles','Seller profiles'],['posts','Journal'],['exs','Exhibitions'],['slides','Art styles / slides'],['analytics','Analytics'],['rev','Reviews'],['set','Site']];
    var h='<h2>Admin dashboard</h2><p class="sub">Review seller requests, manage profiles and content, and monitor business activity.</p><div class="adtabs">'+T.map(function(t){return '<button data-newtab="'+t[0]+'" aria-selected="'+(tab===t[0])+'">'+t[1]+'</button>'}).join('')+'<button data-out style="margin-left:auto">Sign out</button></div>';
    if(tab==='works'){
      var groups={};pend.forEach(function(w){var p=profileForWork(w),key=p?p.id:'unknown';(groups[key]||(groups[key]=[])).push(w)});
      h+='<h3>Artwork requests awaiting review</h3>'+(!pend.length?'<p class="note">No pending submissions.</p>':Object.keys(groups).map(function(k){var p=prof(k),arr=groups[k];return '<div class="review-profile"><div><span class="badge">'+esc(p?p.type:'seller')+'</span><h3>'+(p?'<a href="#profile?id='+encodeURIComponent(p.id)+'">'+esc(p.name)+'</a>':'Unknown seller')+'</h3><p class="mut">'+esc(p&&p.email||'')+' · '+arr.length+' request'+(arr.length===1?'':'s')+'</p></div>'+arr.map(function(w){return '<div class="row2"><div><b>'+esc(w.t)+'</b><br><span class="mut">'+esc(w.originalArtist||w.a)+' · '+money(w.p)+' · '+esc(w.m)+'</span></div><div class="acts"><button class="btn dark" data-review-approve="'+w.id+'">Accept & publish</button><button class="btn" data-review-reject="'+w.id+'">Reject</button><button class="btn" data-review-edit="'+w.id+'">Edit</button></div></div>'}).join('')+'</div>'}).join(''))+
      '<h3>All artwork on sale</h3>'+published().map(function(w){return '<div class="row2"><div><b>'+esc(w.t)+'</b><br><span class="mut">'+esc(w.a)+' · '+money(w.p)+'</span></div><span class="pill status-live">On sale</span></div>'}).join('');
    } else if(tab==='profiles'){
      h+='<h3>Seller profiles ('+db.profiles.length+')</h3><div class="profile-admin">'+db.profiles.map(function(p){var wc=db.works.filter(function(w){return w.sellerId===p.id});return '<div class="row2"><div><span class="badge">'+esc(p.type)+'</span> <b>'+esc(p.name)+'</b><br><span class="mut">'+esc(p.country||'')+' · '+esc(p.email||'')+' · '+wc.length+' artworks</span></div><a class="btn sm" href="#profile?id='+encodeURIComponent(p.id)+'">View profile</a></div>'}).join('')+'</div><h3>Create a profile</h3><form id="profileAdd" class="pf"><label>Type<select name="type">'+roleOptions().map(function(x){return '<option value="'+x[0]+'">'+x[1]+'</option>'}).join('')+'</select></label><label>Name<input name="name" required></label><label>Email<input name="email" type="email"></label><label>Country<input name="country"></label><label>Website<input name="site"></label><label>Biography<textarea name="bio" required></textarea></label><button class="btn dark">Create profile</button></form>';
    } else if(tab==='analytics'){h+='<div id="analytics"></div>'}
    else if(tab==='exs'){
      h+=crud('exs','Exhibitions',SX,function(x){return[x.t+' at '+x.m,(x.c||'')+' · '+fmt(x.s)+' to '+fmt(x.e)]});
    } else if(tab==='slides'){
      h+='<div class="note"><b>Homepage slider manager</b><p>Each slide starts with a selected generated art style. Use <b>Add new slide</b> to create one, or <b>Edit</b> beside a slide to change it. To replace generated artwork, choose a JPG or PNG file in the custom image field and wait for the preview before saving.</p><button class="btn dark" type="button" data-add-slide>Add new slide</button></div>';
      h+=crud('slides','Homepage art-style slides',SS,function(x){return[x.t,x.b+' → '+x.l+(x.img?' · Custom image':' · Default '+(x.k||'circles')+' style')]});
    } else if(tab==='posts')h+=crud('posts','Curators’ Journal',SP,function(p){return[p.t,fmt(p.dt)+' · '+p.c]});
    else if(tab==='rev')h+='<h3>Reviews ('+db.rev.length+')</h3>'+db.rev.map(function(r,i){var w=wk(r.w);return '<div class="row2"><div><b>'+esc(r.n)+'</b> <span class="st">'+stars(r.r)+'</span> on '+esc(w?w.t:'removed')+'<br>'+esc(r.t)+'</div><button class="btn sm" data-rd="'+i+'">Delete</button></div>'}).join('');
    else if(tab==='set')h+='<h3>Site settings</h3><form id="af" class="af">'+SSET.map(function(f){return fld(f,db.set[f.k])}).join('')+'<div><button class="btn dark">Save settings</button></div></form><h3>Feedback rating system</h3><div class="note">Starter: 1–5 / 6–15 / 16–50 / 51–150 / 151+ likes. Growing: 1–25 / 26–100 / 101–500 / 501–2,500 / 2,501+. Viral: 1–250 / 251–1,000 / 1,001–5,000 / 5,001–25,000 / 25,001+.</div><form id="ratingSettings" class="pf"><label>Traffic scale<select name="scale"><option value="auto">Automatic</option><option value="starter">Starter</option><option value="growing">Growing</option><option value="viral">Viral</option></select></label><label>Strategy<select name="strategy"><option value="threshold">Like thresholds</option><option value="benchmark">Top-liked benchmark</option></select></label><button class="btn dark">Save rating settings</button></form>';
    el.innerHTML=h;
    if(tab==='analytics')renderAnalytics();
    var rf=$('#ratingSettings');if(rf&&tab==='set'){rf.scale.value=(db.rating&&db.rating.scale)||'auto';rf.strategy.value=(db.rating&&db.rating.strategy)||'threshold';rf.onsubmit=function(e){e.preventDefault();db.rating={scale:rf.scale.value,strategy:rf.strategy.value};save();admin()}}
    var f=$('#af');if(f&&tab==='set')f.onsubmit=function(e){e.preventDefault();Object.assign(db.set,read(f,SSET));save();refresh(true);admin()};
    var pfm=$('#profileAdd');if(pfm)pfm.onsubmit=function(e){e.preventDefault();var d=new FormData(pfm),id='admin-'+nid();db.profiles.push({id:id,type:d.get('type'),name:d.get('name'),email:d.get('email'),country:d.get('country'),site:d.get('site'),bio:d.get('bio'),links:[],createdAt:today()});save();admin()};
    var sf=$('#slideEdit');if(sf)sf.onsubmit=function(e){e.preventDefault();Object.assign(db.slides.filter(function(x){return x.id===edit})[0],read(sf,slideSch));edit=null;save();slider();admin()};
  };
  /* Delegate enhanced admin actions alongside the original handler. */
  $('#admin').addEventListener('click',function(e){
    var d=e.target.dataset;
    if(d.addSlide!==undefined){tab='slides';edit=null;admin();var form=document.querySelector('#af');if(form){form.scrollIntoView({behavior:'smooth',block:'start'});var title=form.querySelector('[name="t"]');if(title)title.focus();}return}
    if(d.newtab){tab=d.newtab;edit=null;admin();return}
    if(d.out!==undefined){sessionStorage.removeItem('zadm');admin();return}
    if(d.reviewApprove){var w=wk(+d.reviewApprove);if(w){w.st='live';w.reviewedAt=new Date().toISOString();w.reviewNote='Approved by admin';save();track('artwork_approved',{workId:w.id});admin();renderAll()}}
    if(d.reviewReject){var w2=wk(+d.reviewReject);if(w2){var note=prompt('Reason for rejection (optional):','Please update the artwork details and resubmit.');w2.st='rejected';w2.reviewNote=note||'Submission was not approved.';save();track('artwork_rejected',{workId:w2.id});admin()}}
    if(d.reviewEdit){edit=+d.reviewEdit;tab='works';admin()}
    if(d.slideEdit){edit=+d.slideEdit;tab='slides';admin()}
    if(d.slideCancel!==undefined){edit=null;admin()}
    if(d.rd){db.rev.splice(+d.rd,1);save();admin()}
  });
  /* Artwork page interactions and filters. */
  $('#agrid').onclick=function(e){var p=e.target.closest('[data-profile]');if(p){e.preventDefault();goProfile(p.dataset.profile);return}var rate=e.target.closest('[data-rate]');if(rate){e.preventDefault();openW(+rate.dataset.rate,'r');return}var b=e.target.closest('.art-open');if(b)openW(+b.dataset.id,'r')};
  $('#grid').onclick=function(e){var p=e.target.closest('[data-profile]');if(p){e.preventDefault();goProfile(p.dataset.profile);return}var rate=e.target.closest('[data-rate]');if(rate){e.preventDefault();openW(+rate.dataset.rate,'r');return}var b=e.target.closest('.art-open');if(b)openW(+b.dataset.id,'r')};
  if($('#aq'))$('#aq').oninput=function(){track('search',{query:this.value});renderAll()};
  if($('#arole'))$('#arole').onchange=renderAll;if($('#asort'))$('#asort').onchange=renderAll;
  if($('#achips'))$('#achips').onclick=function(e){if(e.target.dataset.med){window.allMed=e.target.dataset.med;renderAll()}};
  if($('#shop'))$('#shop').addEventListener('click',function(e){var p=e.target.closest('[data-profile]');if(p){e.preventDefault();goProfile(p.dataset.profile)}});

  /* Keep the homepage header identity useful. */
  function updateIdentity(){
    var p=me(),dn=$('#dashNav');
    if(dn){dn.hidden=!p;if(p)dn.textContent='Dashboard';}
    var sell=$('.sellbtn');if(sell&&p)sell.textContent='Sell / '+p.name;
  }
  var baseApply=apply;
  apply=function(){baseApply();updateIdentity()};
  /* Ensure existing saved artist sessions become dashboard sessions. */
  if(!db.currentProfileId&&db.me){var aa=db.artists.filter(function(x){return x.id===db.me})[0];if(aa){var pp=ensureProfileFromArtist(aa);db.currentProfileId=pp.id;save()}}

  /* ---------- Supabase production data/auth integration ---------- */
  var sb = window.supabase.createClient(window.ZARTZ_SUPABASE_CONFIG.url, window.ZARTZ_SUPABASE_CONFIG.key);
  var sbUser = null, sbProfile = null, sbAdmin = false, sbBusy = false;
  function sbNotice(message, host) {
    var el=host||document.querySelector('#sell')||document.querySelector('#admin'); if(!el)return;
    var old=el.querySelector('.sb-notice');if(old)old.remove();
    var n=document.createElement('p');n.className='note sb-notice';n.setAttribute('role','status');n.textContent=message;el.prepend(n);
  }
  function sbImage(path){if(!path)return '';if(/^https?:\/\//i.test(path))return path;return sb.storage.from('artwork-images').getPublicUrl(path).data.publicUrl;}
  function workFromRow(r){var id=nid();return{id:id,supabaseId:r.id,t:r.title,a:r.artist_name,m:r.medium||'Painting',y:r.year||2026,sz:r.dimensions||'',p:Number(r.price||0),cat:r.medium||'Other',category:r.medium||'Other',d:r.description||'',img:sbImage(r.image_path||r.image_url),imagePath:r.image_path||'',k:r.art_style||'circles',pal:PALS[id%PALS.length],ex:0,st:r.status==='approved'?'live':r.status,by:null,sellerId:r.seller_id,sellerRole:'artist',originalArtist:r.original_artist_name||r.artist_name,originalArtistLink:r.original_artist_url||'',submittedAt:r.submitted_at,reviewNote:r.review_note||''};}
  function profileFromRow(r){return{id:r.id,supabaseId:r.id,type:r.role||'artist',name:r.display_name,email:r.email||'',country:r.country||'',site:r.website||'',bio:r.bio||'',bookletUrl:'',bookletPath:r.booklet_path||'',links:Array.isArray(r.links)?r.links:[],createdAt:r.created_at||today()};}
  async function sbHydrate(){
    var rs=await Promise.all([
      sb.from('artworks').select('*').order('created_at',{ascending:false}),
      sb.from('public_profiles').select('*').order('created_at',{ascending:false}),
      sb.from('journal_posts').select('*').order('created_at',{ascending:false}),
      sb.from('exhibitions').select('*').eq('status','published').order('starts_on',{ascending:true}),
      sb.from('homepage_slides').select('*').eq('is_active',true).order('sort_order',{ascending:true})
    ]);
    var err=rs.filter(function(x){return x.error})[0];if(err)throw err.error;
    /* Preserve the demo catalogue as a working preview when production tables are empty. */
    var localWorks=(db.works||[]).filter(function(w){return !w.supabaseId;});
    var localProfiles=(db.profiles||[]).filter(function(p){return !p.supabaseId;});
    var localPosts=(db.posts||[]).filter(function(p){return !p.supabaseId;});
    var localExhibitions=(db.exs||[]).filter(function(x){return !x.supabaseId;});
    var localSlides=(db.slides||[]).filter(function(x){return !x.supabaseId;});
    if(!localPosts.length)localPosts=seed().posts;
    if(!localExhibitions.length)localExhibitions=seed().exs;
    if(!localSlides.length)localSlides=seed().slides;
    db.works=localWorks.concat(rs[0].data.map(workFromRow));
    db.profiles=localProfiles.concat(rs[1].data.map(profileFromRow));
    db.posts=localPosts.concat(rs[2].data.map(function(r){return{id:r.id,supabaseId:r.id,authorId:r.author_id,t:r.title,c:r.author_name,g:r.category,dt:r.published_at||r.created_at,s:r.summary,b:r.body,img:r.cover_image_path||'',st:r.status};}));
    db.exs=localExhibitions.concat(rs[3].data.map(function(r){return{id:r.id,supabaseId:r.id,m:r.museum_name,c:r.city||'',t:r.title,cu:r.curator_name||'',s:r.starts_on||today(),e:r.ends_on||today(),ar:'',description:r.description||''};}));
    db.slides=localSlides.concat(rs[4].data.map(function(r){return{id:r.id,supabaseId:r.id,t:r.headline,s:r.subtitle,b:r.button_label,l:r.button_target,k:r.art_style,c1:r.background_color,c2:r.button_color,c3:r.art_color,img:r.image_path?sbImage(r.image_path):'',imagePath:r.image_path||''};}));
    /* Prefer a persisted custom-image slide as the initial homepage slide after every reload. */
    var firstCustomSlide=db.slides.findIndex(function(x){return !!(x.imagePath&&x.img);});if(firstCustomSlide>=0)si=firstCustomSlide;
    var au=await sb.auth.getUser();sbUser=au.data&&au.data.user||null;sbProfile=null;db.currentProfileId=null;sbAdmin=false;
    if(sbUser){
      var pr=await sb.from('profiles').select('*').eq('id',sbUser.id).maybeSingle();
      if(pr.error)throw pr.error;
      if(pr.data){sbProfile=profileFromRow(pr.data);db.profiles=db.profiles.filter(function(p){return p.id!==sbProfile.id}).concat([sbProfile]);db.currentProfileId=sbProfile.id;}
      var ad=await sb.from('app_admins').select('user_id').eq('user_id',sbUser.id).maybeSingle();
      if(ad.error)throw ad.error;sbAdmin=!!(ad.data&&ad.data.user_id);
      if(sbAdmin)sessionStorage.setItem('zadm','1');else sessionStorage.removeItem('zadm');
    }else sessionStorage.removeItem('zadm');
    save();
  }
  async function sbRefresh(){try{await sbHydrate();refresh(true);updateIdentity();route();}catch(e){console.error('Supabase load failed',e);sbNotice('Could not load Supabase data. Check Data API grants, the public_profiles view and RLS policies.');}}
  function sbLoginMarkup(){return '<form id="supabaseLogin" class="pf" style="max-width:480px"><h3>Already registered? Sign in</h3><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Password<input name="password" type="password" required autocomplete="current-password" minlength="8"></label><button class="btn" type="submit">Sign in</button></form>';}
  var sbOriginalRenderDashboard=renderDashboard;
  renderDashboard=function(){
    sbOriginalRenderDashboard();
    var host=document.querySelector('#dashboard');
    if(!host||!sbUser||!sbProfile)return;
    var mine=(db.posts||[]).filter(function(p){return p.supabaseId&&p.authorId===sbUser.id;});
    var form='<section class="band" style="margin-top:32px"><h3>Submit to Curators’ Journal</h3><p class="sub">Signed-in users can submit an essay, practice note, studio visit, guide or news post. Your post stays private until an administrator approves it.</p><form id="journalSubmit" class="af"><label>Post title<input name="title" required maxlength="180"></label><label>Category<select name="category"><option>Essay</option><option>Practice</option><option>Studio visit</option><option>Guide</option><option>News</option></select></label><label>Short summary<textarea name="summary" required maxlength="600"></textarea></label><label>Full article<textarea name="body" required rows="8"></textarea></label><label>Cover image (optional)<input name="cover" type="file" accept="image/jpeg,image/png,image/webp,image/avif"></label><button class="btn dark" type="submit">Submit journal post for approval</button></form><h3 style="margin-top:24px">Your journal submissions</h3>'+(mine.length?mine.map(function(p){return '<div class="row2"><div><b>'+esc(p.t)+'</b><br><span class="mut">'+esc(p.g)+' · '+fmt(p.dt)+'</span></div><span class="pill">'+esc(p.st==='published'?'Published':p.st==='rejected'?'Rejected':'Pending approval')+'</span></div>'}).join(''):'<p class="mut">You have not submitted a journal post yet.</p>')+'</section>';
    host.insertAdjacentHTML('beforeend',form);
  };
  var sbOriginalRenderSell=renderSell;
  renderSell=function(){
    sbOriginalRenderSell();
    if(!sbProfile){
      var old=document.querySelector('#supabaseLogin');if(old)old.remove();
      var box=document.querySelector('#sell');if(box)box.insertAdjacentHTML('beforeend',sbLoginMarkup());
      var f=document.querySelector('#sp');
      if(f&&!f.querySelector('[name="password"]')){var lab=document.createElement('label');lab.innerHTML='Password (minimum 8 characters)<input name="password" type="password" required minlength="8" autocomplete="new-password">';f.insertBefore(lab,f.querySelector('button[type="submit"]'));}
      var sub=document.querySelector('#sell .sub');if(sub)sub.textContent='Create a secure account to submit artworks. Your work is saved online and reviewed before publication.';
    }
    var nav=document.querySelector('#dashNav'),sellButton=document.querySelector('.sellbtn');
    if(nav){nav.hidden=!sbProfile;if(sbProfile)nav.textContent=sbProfile.name+' · Dashboard';}
    if(sellButton&&sbProfile)sellButton.textContent='Sell / '+sbProfile.name;
  };
  var sbOriginalAdmin=admin;
  admin=function(){
    if(!sbUser||!sbAdmin){
      var el=document.querySelector('#admin');if(!el)return;
      el.innerHTML='<h2>Administrator sign in</h2><p class="sub">Use your Supabase account. Only users listed in the app_admins table can administer this site.</p><form id="sbAdminLogin" class="pf" style="max-width:380px"><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Password<input name="password" type="password" required autocomplete="current-password"></label><button class="btn dark" type="submit">Sign in securely</button></form>'+(sbUser&&!sbAdmin?'<p class="note">This account does not have administrator permissions.</p>':'');
      return;
    }
    sessionStorage.setItem('zadm','1');sbOriginalAdmin();
  };
  var sbOldUpdateIdentity=updateIdentity;
  updateIdentity=function(){
    sbOldUpdateIdentity();
    var bar=document.querySelector('.bar');
    if(bar&&sbUser&&!document.querySelector('#sbSignOut')){var b=document.createElement('button');b.type='button';b.id='sbSignOut';b.className='linkbtn';b.textContent='Sign out';bar.appendChild(b);}
    if(!sbUser){var b2=document.querySelector('#sbSignOut');if(b2)b2.remove();}
  };
  async function sbUpload(bucket,file,userId){
    if(!file||!file.name)return null;
    var ext=(file.name.split('.').pop()||'bin').toLowerCase().replace(/[^a-z0-9]/g,'');
    var path=userId+'/'+crypto.randomUUID()+'.'+ext;
    var up=await sb.storage.from(bucket).upload(path,file,{upsert:false,contentType:file.type||'application/octet-stream'});
    if(up.error)throw up.error;return path;
  }
  async function sbCreateProfileFromPending(){
    if(!sbUser||sbProfile)return sbProfile;
    var raw=localStorage.getItem('zartz_pending_profile');if(!raw)return null;
    var d=JSON.parse(raw),bookletPath=null;
    if(d.bookletData){
      var bytes=Uint8Array.from(atob(d.bookletData.split(',')[1]||''),function(c){return c.charCodeAt(0)});
      bookletPath=await sbUpload('profile-booklets',new File([new Blob([bytes],{type:'application/pdf'})],d.bookletName||'booklet.pdf',{type:'application/pdf'}),sbUser.id);
    }
    var row={id:sbUser.id,role:d.type,display_name:d.name,email:sbUser.email,country:d.country,website:d.site||'',bio:d.bio||'',booklet_path:bookletPath,links:d.links||[]};
    var saved=await sb.from('profiles').upsert(row).select('*').single();if(saved.error)throw saved.error;
    localStorage.removeItem('zartz_pending_profile');sbProfile=profileFromRow(saved.data);return sbProfile;
  }
  document.addEventListener('submit',async function(e){
    var f=e.target;if(!f||!['sp','sa','supabaseLogin','sbAdminLogin','journalSubmit','payform','af'].includes(f.id))return;
    var pendingImage=f.querySelector('input[data-img][data-processing="true"]');if(pendingImage){e.preventDefault();e.stopImmediatePropagation();sbNotice('Please wait until the image preview finishes loading, then save again.',f);return;}
    if(f.id==='af'&&(!sbUser||!sbAdmin))return;
    e.preventDefault();e.stopImmediatePropagation();if(sbBusy)return;sbBusy=true;
    var button=f.querySelector('button[type="submit"]');if(button)button.disabled=true;
    try{
      if(f.id==='af'&&(tab==='works'||tab==='posts')&&!sbProfile){
        var fallbackName=String((sbUser.user_metadata&&sbUser.user_metadata.display_name)||sbUser.email||'ZARTZ Administrator').split('@')[0];
        var fallbackProfile=await sb.from('profiles').upsert({id:sbUser.id,role:'artist',display_name:fallbackName,email:sbUser.email||'',country:'',website:'',bio:''}).select('*').single();
        if(fallbackProfile.error)throw fallbackProfile.error;sbProfile=profileFromRow(fallbackProfile.data);
      }
      if(f.id==='sp'){
        var d=new FormData(f),draft={type:String(d.get('type')),name:String(d.get('name')).trim(),country:String(d.get('country')).trim(),site:String(d.get('site')||''),bio:String(d.get('bio')||''),links:String(d.get('links')||'').split(/\n+/).filter(Boolean).map(function(url){return{url:url,label:url}}),bookletName:'',bookletData:''};
        var pdf=d.get('booklet');if(pdf&&pdf.size){if(pdf.type!=='application/pdf')throw new Error('Digital booklet must be a PDF.');if(pdf.size>4*1024*1024)throw new Error('For signup, the optional PDF must be 4 MB or smaller. You can upload a larger PDF after signing in.');draft.bookletName=pdf.name;draft.bookletData=await new Promise(function(resolve,reject){var r=new FileReader();r.onload=function(){resolve(r.result)};r.onerror=reject;r.readAsDataURL(pdf)});}
        localStorage.setItem('zartz_pending_profile',JSON.stringify(draft));
        var result=await sb.auth.signUp({email:String(d.get('email')).trim(),password:String(d.get('password')),options:{data:{display_name:draft.name}}});
        if(result.error)throw result.error;sbUser=result.data.user;
        if(result.data.session){await sbCreateProfileFromPending();await sbRefresh();location.hash='#dashboard';}
        else sbNotice('Account created. Confirm your email, then sign in below to finish creating your seller profile.');
      }else if(f.id==='supabaseLogin'||f.id==='sbAdminLogin'){
        var fd=new FormData(f),login=await sb.auth.signInWithPassword({email:String(fd.get('email')).trim(),password:String(fd.get('password'))});
        if(login.error)throw login.error;sbUser=login.data.user;await sbCreateProfileFromPending();
        var pr=await sb.from('profiles').select('*').eq('id',sbUser.id).maybeSingle();if(pr.error)throw pr.error;sbProfile=pr.data?profileFromRow(pr.data):null;
        var ad=await sb.from('app_admins').select('user_id').eq('user_id',sbUser.id).maybeSingle();if(ad.error)throw ad.error;sbAdmin=!!(ad.data&&ad.data.user_id);
        if(f.id==='sbAdminLogin'&&!sbAdmin){await sb.auth.signOut();sbUser=null;sbProfile=null;throw new Error('This account is not an administrator. Add its user ID to app_admins to grant access.');}
        await sbRefresh();if(f.id==='sbAdminLogin')location.hash='#admin';else location.hash=sbProfile?'#dashboard':'#sell';
      }else if(f.id==='sa'){
        if(!sbUser||!sbProfile)throw new Error('Sign in and create your seller profile before submitting artwork.');
        var fd2=new FormData(f),file=fd2.get('img'),path=null;
        if(file&&file.size){if(!/^image\/(jpeg|png|webp|avif)$/.test(file.type))throw new Error('Artwork image must be JPEG, PNG, WebP or AVIF.');if(file.size>10*1024*1024)throw new Error('Artwork image must be 10 MB or smaller.');path=await sbUpload('artwork-images',file,sbUser.id);}
        var row={seller_id:sbUser.id,title:String(fd2.get('t')||'').trim(),artist_name:sbProfile.type==='artist'?sbProfile.name:String(fd2.get('originalArtist')||'').trim(),original_artist_name:sbProfile.type==='artist'?sbProfile.name:String(fd2.get('originalArtist')||'').trim(),original_artist_url:String(fd2.get('originalArtistLink')||''),description:String(fd2.get('d')||''),medium:String(fd2.get('m')||fd2.get('cat')||'Other'),year:Number(fd2.get('y')||new Date().getFullYear()),dimensions:String(fd2.get('sz')||''),price:Number(fd2.get('p')||0),currency:'GHS',image_path:path,art_style:['circles','bars','waves','grid'][Math.floor(Math.random()*4)],status:'pending'};
        if(!row.title||!Number.isFinite(row.price)||row.price<=0)throw new Error('Enter an artwork title and a price greater than zero.');
        var ins=await sb.from('artworks').insert(row).select('*').single();if(ins.error)throw ins.error;
        await sbRefresh();location.hash='#dashboard';sbNotice('Artwork submitted for administrator review.');
      }else if(f.id==='journalSubmit'){
        if(!sbUser||!sbProfile)throw new Error('Sign in before submitting a journal post.');
        var jd=new FormData(f),cover=jd.get('cover'),coverPath=null;
        if(cover&&cover.size){if(!/^image\/(jpeg|png|webp|avif)$/.test(cover.type))throw new Error('Cover image must be JPEG, PNG, WebP or AVIF.');if(cover.size>10*1024*1024)throw new Error('Cover image must be 10 MB or smaller.');coverPath=await sbUpload('artwork-images',cover,sbUser.id);}
        var postRow={author_id:sbUser.id,title:String(jd.get('title')||'').trim(),author_name:sbProfile.name,category:String(jd.get('category')||'Essay'),summary:String(jd.get('summary')||'').trim(),body:String(jd.get('body')||'').trim(),cover_image_path:coverPath,status:'pending',published_at:null};
        if(!postRow.title||!postRow.summary||!postRow.body)throw new Error('Complete the title, summary and full article before submitting.');
        var posted=await sb.from('journal_posts').insert(postRow).select('*').single();if(posted.error)throw posted.error;
        await sbRefresh();location.hash='#dashboard';sbNotice('Journal post submitted. It will appear in Curators’ Journal after admin approval.',document.querySelector('#dashboard'));
      }else if(f.id==='payform'){
        var email=document.querySelector('#payemail').value.trim(),items=db.cart.map(wk).filter(Boolean);
        if(!items.length)throw new Error('Your cart is empty.');
        if(items.some(function(w){return !w.supabaseId;}))throw new Error('This item is demo content, not a database-backed listing. Add published catalogue artworks to your cart.');
        var session=await sb.auth.getSession(),token=session.data.session&&session.data.session.access_token;
        var res=await fetch('/api/morapay/initialize',{method:'POST',headers:Object.assign({'Content-Type':'application/json'},token?{Authorization:'Bearer '+token}:{}),body:JSON.stringify({email:email,currency:'GHS',items:items.map(function(w){return{id:w.supabaseId,quantity:1};})})});
        var data=await res.json();if(!res.ok||!data.success)throw new Error(data.message||'Unable to initialize Morapay checkout.');
        localStorage.setItem('zartz_pending_order',JSON.stringify({order_id:data.order_id,items:items.map(function(w){return w.id;})}));
        document.querySelector('#paydlg').close();location.href=data.checkout_url;
      }else if(f.id==='af'){
        var sch=({works:SW,posts:SP,exs:SX,slides:SS,set:SSET})[tab]||[],values=read(f,sch);
        /* Read the selected file directly as a fallback: never silently save a slide without its chosen image just because the preview field did not populate. */
        if(tab==='slides'){
          var chosenSlideFile=f.querySelector('input[data-img]');
          if(chosenSlideFile&&chosenSlideFile.files&&chosenSlideFile.files[0]&&(!values.img||String(values.img).indexOf('data:image/')!==0)){
            values.img=await new Promise(function(resolve,reject){var reader=new FileReader();reader.onload=function(){resolve(String(reader.result||''));};reader.onerror=function(){reject(new Error('Could not read the selected slide image. Please choose the image again.'));};reader.readAsDataURL(chosenSlideFile.files[0]);});
          }
        }
        if(tab==='works'){
          var item=edit!=null?db.works.filter(function(x){return String(x.id)===String(edit)})[0]:null;
          var artworkImagePath=item&&item.imagePath||null;
          if(values.img&&String(values.img).indexOf('data:image/')===0){var artBlob=await (await fetch(values.img)).blob();var artFile=new File([artBlob],'admin-artwork-'+Date.now()+'.jpg',{type:artBlob.type||'image/jpeg'});artworkImagePath=await sbUpload('artwork-images',artFile,sbUser.id);}
          var artworkRow={title:String(values.t||'').trim(),artist_name:String(values.a||sbProfile.name).trim(),original_artist_name:String(values.a||sbProfile.name).trim(),medium:values.m||values.category||'Other',year:Number(values.y)||null,dimensions:values.sz||'',price:Number(values.p)||0,currency:'GHS',description:values.d||'',image_path:artworkImagePath,art_style:values.k||'circles',exhibition_id:values.ex&&/^[0-9a-f-]{36}$/i.test(String(values.ex))?values.ex:null,status:item?(values.st==='live'?'approved':values.st):(values.st==='live'?'pending':values.st||'pending')};
          if(!artworkRow.title||!Number.isFinite(artworkRow.price)||artworkRow.price<=0)throw new Error('Enter an artwork title and a price greater than zero.');
          if(item){if(!item.supabaseId)throw new Error('Only database-backed artwork can be edited.');var up=await sb.from('artworks').update(artworkRow).eq('id',item.supabaseId);if(up.error)throw up.error;}
          else{artworkRow.seller_id=sbUser.id;var insertedArtwork=await sb.from('artworks').insert(artworkRow).select('*').single();if(insertedArtwork.error)throw insertedArtwork.error;}
        }else if(tab==='slides'){
          var slide=edit!=null?db.slides.filter(function(x){return String(x.id)===String(edit)})[0]:null;
          var imagePath=slide&&slide.imagePath||null;
          if(values.img&&String(values.img).indexOf('data:image/')===0){
            var imgBlob=await (await fetch(values.img)).blob();
            var imgFile=new File([imgBlob],'homepage-slide-'+Date.now()+'.jpg',{type:imgBlob.type||'image/jpeg'});
            imagePath=await sbUpload('artwork-images',imgFile,sbUser.id);
            var publicUrl=sb.storage.from('artwork-images').getPublicUrl(imagePath).data.publicUrl;
            var verifyResponse=await fetch(publicUrl,{cache:'no-store'});
            if(!verifyResponse.ok)throw new Error('Image uploaded, but Supabase could not serve it publicly (HTTP '+verifyResponse.status+'). Check the artwork-images bucket and storage read policy.');
            var verifyBlob=await verifyResponse.blob();
            if(!verifyBlob.size||!/^image\//i.test(verifyBlob.type))throw new Error('Supabase returned an empty or non-image file after upload. Please try a JPG or PNG image.');
          }
          var rowS={headline:values.t,subtitle:values.s||'',button_label:values.b,button_target:values.l,art_style:values.k,background_color:values.c1,button_color:values.c2,art_color:values.c3,image_path:imagePath,sort_order:slide?db.slides.indexOf(slide):db.slides.length,is_active:true};
          var savedS=slide&&slide.supabaseId?await sb.from('homepage_slides').update(rowS).eq('id',slide.supabaseId):await sb.from('homepage_slides').insert(rowS);if(savedS.error)throw savedS.error;
          if(slide&&!slide.supabaseId)db.slides=db.slides.filter(function(x){return String(x.id)!==String(slide.id)});
        }else if(tab==='posts'){
          var post=edit!=null?db.posts.filter(function(x){return String(x.id)===String(edit)})[0]:null,rowP={title:values.t,author_id:post&&post.authorId||sbUser.id,author_name:values.c||sbProfile.name,category:values.g||'Essay',summary:values.s||'',body:values.b||'',status:post?(post.st||'pending'):'pending',published_at:post&&post.st==='published'?(post.dt||values.dt||today()):null};
          var savedP=post&&post.supabaseId?await sb.from('journal_posts').update(rowP).eq('id',post.supabaseId):await sb.from('journal_posts').insert(rowP);if(savedP.error)throw savedP.error;
        }else if(tab==='exs'){
          var ex=edit!=null?db.exs.filter(function(x){return String(x.id)===String(edit)})[0]:null,rowE={title:values.t,museum_name:values.m,city:values.c,curator_name:values.cu,starts_on:values.s||null,ends_on:values.e||null,description:values.description||'',status:'published'};
          var savedE=ex&&ex.supabaseId?await sb.from('exhibitions').update(rowE).eq('id',ex.supabaseId):await sb.from('exhibitions').insert(rowE);if(savedE.error)throw savedE.error;
        }else throw new Error('This settings section is not yet stored in Supabase. Artwork, journal, exhibitions and slides are connected.');
        edit=null;await sbRefresh();
         if(tab==='slides'&&imagePath){
           var targetSlideIndex=(db.slides||[]).findIndex(function(x){return x.imagePath===imagePath||(slide&&slide.supabaseId&&x.supabaseId===slide.supabaseId);});
           if(targetSlideIndex>=0){si=targetSlideIndex;slider();}
         }
         admin();
         if(tab==='slides'&&imagePath){
           var persisted=(db.slides||[]).filter(function(x){return x.imagePath===imagePath})[0];
           if(!persisted||!persisted.img)throw new Error('The slide record did not reload with its saved image path. Please check the homepage_slides row in Supabase.');
           await new Promise(function(resolve,reject){var testImage=new Image();testImage.onload=resolve;testImage.onerror=function(){reject(new Error('The slide row saved, but its image did not load after refreshing from Supabase.'));};testImage.src=persisted.img+(persisted.img.indexOf('?')>=0?'&':'?')+'verify='+Date.now();});
           sbNotice('Verified: the slide and image are saved in Supabase Storage, reloaded from Supabase, and the image loads after refresh.',document.querySelector('#admin'));
         }
      }
    }catch(err){console.error(err);sbNotice(err.message||'Request failed. Please try again.',location.hash==='#admin'?document.querySelector('#admin'):document.querySelector('#sell'));}
    finally{sbBusy=false;if(button)button.disabled=false;}
  },true);
  document.addEventListener('click',async function(e){
    var b=e.target.closest('#switchSeller,#sbSignOut,[data-reviewApprove],[data-reviewReject],[data-post-approve],[data-post-reject],[data-ap],[data-del],[data-out]');if(!b)return;
    if(b.id==='switchSeller'||b.id==='sbSignOut'){e.preventDefault();e.stopImmediatePropagation();await sb.auth.signOut();sbUser=null;sbProfile=null;sbAdmin=false;db.currentProfileId=null;sessionStorage.removeItem('zadm');await sbRefresh();location.hash='#sell';return;}
    if(b.dataset.reviewApprove||b.dataset.ap){
      e.preventDefault();e.stopImmediatePropagation();
      try{if(!sbAdmin)throw new Error('Administrator access required.');var w=db.works.filter(function(x){return String(x.id)===String(b.dataset.reviewApprove||b.dataset.ap)})[0];if(!w||!w.supabaseId)throw new Error('Artwork record not found.');var u=await sb.from('artworks').update({status:'approved',reviewed_at:new Date().toISOString(),review_note:'Approved by administrator'}).eq('id',w.supabaseId);if(u.error)throw u.error;await sbRefresh();admin();}catch(err){sbNotice(err.message,document.querySelector('#admin'))}
    }else if(b.dataset.postApprove){
      e.preventDefault();e.stopImmediatePropagation();
      try{if(!sbAdmin)throw new Error('Administrator access required.');var post=db.posts.filter(function(x){return String(x.id)===String(b.dataset.postApprove)})[0];if(!post||!post.supabaseId)throw new Error('Journal post record not found.');var pu=await sb.from('journal_posts').update({status:'published',published_at:new Date().toISOString()}).eq('id',post.supabaseId);if(pu.error)throw pu.error;tab='posts';await sbRefresh();admin();sbNotice('Journal post approved and published.',document.querySelector('#admin'));}catch(err){sbNotice(err.message,document.querySelector('#admin'))}
    }else if(b.dataset.postReject){
      e.preventDefault();e.stopImmediatePropagation();
      try{if(!sbAdmin)throw new Error('Administrator access required.');var rejectedPost=db.posts.filter(function(x){return String(x.id)===String(b.dataset.postReject)})[0];if(!rejectedPost||!rejectedPost.supabaseId)throw new Error('Journal post record not found.');var reason=prompt('Reason for rejection (optional):','Please revise your post and resubmit.');var prj=await sb.from('journal_posts').update({status:'rejected',published_at:null}).eq('id',rejectedPost.supabaseId);if(prj.error)throw prj.error;tab='posts';await sbRefresh();admin();sbNotice('Journal post rejected.'+(reason?' Reason: '+reason:''),document.querySelector('#admin'));}catch(err){sbNotice(err.message,document.querySelector('#admin'))}
    }else if(b.dataset.reviewReject){
      e.preventDefault();e.stopImmediatePropagation();
      try{if(!sbAdmin)throw new Error('Administrator access required.');var w2=db.works.filter(function(x){return String(x.id)===String(b.dataset.reviewReject)})[0];if(!w2||!w2.supabaseId)throw new Error('Artwork record not found.');var note=prompt('Reason for rejection (optional):','Please update the artwork details and resubmit.');var u2=await sb.from('artworks').update({status:'rejected',reviewed_at:new Date().toISOString(),review_note:note||'Submission was not approved.'}).eq('id',w2.supabaseId);if(u2.error)throw u2.error;await sbRefresh();admin();}catch(err){sbNotice(err.message,document.querySelector('#admin'))}
    }else if(b.dataset.del){
      e.preventDefault();e.stopImmediatePropagation();
      try{if(!sbAdmin)throw new Error('Administrator access required.');if(!confirm('Delete this record from Supabase?'))return;var table=({works:'artworks',posts:'journal_posts',exs:'exhibitions',slides:'homepage_slides'})[tab],list=db[tab]||[],it=list.filter(function(x){return String(x.id)===String(b.dataset.del)})[0];if(!table||!it||!it.supabaseId)throw new Error('Database record not found.');var del=await sb.from(table).delete().eq('id',it.supabaseId);if(del.error)throw del.error;await sbRefresh();admin();}catch(err){sbNotice(err.message,document.querySelector('#admin'))}
    }else if(b.dataset.out!==undefined){
      e.preventDefault();e.stopImmediatePropagation();await sb.auth.signOut();sbUser=null;sbProfile=null;sbAdmin=false;sessionStorage.removeItem('zadm');admin();
    }
  },true);
  sb.auth.onAuthStateChange(function(event,session){sbUser=session&&session.user||null;if(event==='SIGNED_OUT'){sbProfile=null;sbAdmin=false;sessionStorage.removeItem('zadm');}});
  sbHydrate().then(function(){refresh(true);updateIdentity();}).catch(function(err){console.error('Supabase initial load failed',err);sbNotice('Supabase could not load data. Verify Data API grants, the public_profiles view and RLS policies.');});

  updateIdentity();
  save();
})();

/* ---------- payment return ---------- */
async function verifyReturnedPayment(){
  var p=new URLSearchParams(location.search),ref=p.get('reference')||p.get('trxref');
  var pending=JSON.parse(localStorage.getItem('zartz_pending_order')||'{}');
  if(!ref&&!p.get('order_id')&&!pending.order_id)return;
  var msg=$('#msg');
  if(msg)msg.textContent='Checking Morapay payment status…';
  var orderId=p.get('order_id')||pending.order_id;
  if(!orderId){if(msg)msg.textContent='Checkout returned to ZARTZ. Payment confirmation is handled securely by Morapay.';return;}
  try{
    var res=await fetch('/api/morapay/status?order_id='+encodeURIComponent(orderId));var data=await res.json();
    if(data.success&&data.payment_status==='success'){db.cart=[];save();cart();localStorage.removeItem('zartz_pending_order');if(msg)msg.textContent='Payment confirmed. Thank you for your purchase.';history.replaceState({},document.title,location.pathname+location.hash);}
    else if(msg)msg.textContent=data.payment_status==='failed'?'Payment failed. You can try checkout again.':'Payment is awaiting confirmation from Morapay. Please wait for confirmation before paying again.';
  }catch(e){if(msg)msg.textContent='Morapay returned you to ZARTZ. We will confirm payment after the signed payment notification arrives.';}
}

/* ---------- start ---------- */
$('#grid').addEventListener('keydown',function(){});
refresh(true);route();verifyReturnedPayment();
})();
