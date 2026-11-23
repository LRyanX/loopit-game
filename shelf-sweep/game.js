"use strict";

const GAME = {
  "title": "Shelf Sweep",
  "brief": "sale",
  "look": "boutique",
  "avatar": "explorer",
  "zones": [
    "Flash Shelf",
    "Backstock Carousel",
    "Shelf Label Check"
  ],
  "awards": [
    "Flash deals scanned",
    "Hidden camera recovered",
    "Incorrect labels replaced"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 8365748,
    "haze": 15852236,
    "tile": 15064782,
    "tile2": 12702667,
    "ink": 2901844,
    "trim": 11630434,
    "accent": 10439226,
    "loot": 16110216,
    "css": "#9f4a3a"
  },
  "passages": [
    "Enter Backstock Carousel",
    "Enter Shelf Label Check"
  ],
  "scene": "display",
  "footprint": "round",
  "connector": "carpet",
  "camera": [
    0.02,
    0.58,
    0.98,
    0.19
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      8,
      -8,
      0,
      -0.7
    ],
    [
      16,
      -16,
      0,
      -0.48
    ]
  ],
  "guides": [
    [
      "●",
      "Watch the order"
    ],
    [
      "⤾",
      "Spin to find it"
    ],
    [
      "!",
      "Find the mismatch"
    ]
  ],
  "ending": {
    "kind": "display",
    "title": "Sale display restored",
    "summary": "The products return to the window in order.",
    "pieces": [
      "shoe",
      "mug",
      "kettle"
    ],
    "prize": "lamp"
  },
  "tasks": [
    {
      "kind": "vision",
      "title": "Backstock Carousel",
      "goalText": "Spin the carousel to reveal the hidden product",
      "itemName": "Camera",
      "object": "camera",
      "way": 2,
      "award": "Hidden camera recovered"
    },
    {
      "kind": "audit",
      "title": "Shelf Label Check",
      "goalText": "Pull the label that describes the wrong product",
      "sourceName": "stock card",
      "object": "gift",
      "rows": [
        {
          "clue": "Flash shelf holds audio only",
          "labels": [
            "Headset",
            "Lamp",
            "Speaker"
          ],
          "wrong": 1
        },
        {
          "clue": "Members tags have a gold stamp",
          "labels": [
            "Gold mug",
            "Blue sneakers",
            "Gold camera"
          ],
          "wrong": 1
        }
      ],
      "award": "Incorrect labels replaced"
    }
  ],
  "form": "hub",
  "controls": [
    "world",
    "tray",
    "tray"
  ],
  "views": [
    [
      0.03,
      0.47,
      0.94,
      0.14,
      0.83
    ],
    [
      0.62,
      0.4,
      0.89,
      0.17,
      0.86
    ],
    [
      -0.42,
      0.75,
      0.9,
      -0.13,
      0.79
    ]
  ]
};

function makeFirstTask(c){
  const shelves=[
    {label:"Mug",type:"mug",tint:0xeeb45a},{label:"Kettle",type:"kettle",tint:0xc88cb1},
    {label:"Shoes",type:"shoe",tint:0x7aba9e},{label:"Headset",type:"headset",tint:0x6fa9c6}
  ];
  const lists=[[2,0,1],[0,3,2,1],[3,1,0,3,2]];
  let list,hint=0,t=0,playing=true,pick=0,selected=[];
  const px=i=>i%2===0?-1.61:1.61;
  const pz=i=>i<2?1.81:-.98;
  function restartList(){
    hint=0;t=0;playing=true;pick=0;selected=[];
    c.objective("Watch the sale list light up");
    c.meter(list.length+" deals · remember the order");
    shelves.forEach((_,i)=>c.off("product"+i));
    c.hideTools();
    c.tone([339+list[0]*92],.05,.084);
  }
  function showPick(){
    c.objective("Tap the products in the same order");
    c.meter(pick+"/"+list.length+" scanned");
    shelves.forEach((v,i)=>c.marker("product"+i,v.label,[px(i),.64,pz(i)],()=>choose(i),{kind:"hot"}));
    c.tool("again","Show list again",restartList);
  }
  function choose(i){
    if(list[pick]!==i){c.mistake("Order reset · watch the list");restartList();return;}
    selected.push({i,time:c.clock()});pick++;
    c.pulse([px(i),.40,pz(i)],shelves[i].tint,16);
    if(pick===list.length){c.receive([0,0,-2.64]);return;}
    c.tone([330+i*92,530+i*74]);showPick();
  }
  function start(stage){list=lists[stage];restartList();}
  function tick(dt){
    if(!playing)return;
    t+=dt;
    if(t<.63)return;
    t=0;hint++;
    if(hint>=list.length){playing=false;showPick();return;}
    c.tone([339+list[hint]*92],.05,.084);
  }
  function draw(m,time){
    shelves.forEach((p,i)=>{
      const highlighted=playing&&hint<list.length&&list[hint]===i;
      c.pedestal(m,px(i),c.localZ(pz(i)),1.61,highlighted?0xeef4a7:p.tint);
      c.item(m,p.type,px(i),.25,c.localZ(pz(i)),1.25,p.tint);
      if(highlighted)c.ring(m,px(i),.20,c.localZ(pz(i)),.85+.09*Math.sin(t*5.2),0xf8ed9a,.038);
    });
    for(const [i,p] of selected.entries()){
      if(i>4)break;
      c.item(m,"bag",(i-(list.length-1)/2)*.61,.035,c.localZ(-3.16),.57,shelves[p.i].tint);
    }
  }
  return {start,tick,draw};
}

function makeSecondTask(c,q){
  const turns=[0,Math.PI*.5,Math.PI,Math.PI*1.5];
  let angle=0,shown=0,seen=false,touch=0;
  const aligned=()=>angle===q.way&&Math.abs(Math.sin((shown-turns[angle])*.50))<.105;
  function rotate(n){angle=(angle+n+4)%4;c.tone([280+angle*73],.056);show();}
  function inspect(){c.flyTo(0,.60,()=>{seen=true;c.tone();show();});}
  function show(){
    c.objective(seen?q.goalText:"Inspect the stock locator");
    c.meter(seen?"Find the "+q.itemName.toLowerCase()+" behind the shelf":"");
    if(!seen)c.marker("begin","Read locator",[0,.68,2.23],inspect,{kind:"clue"});else c.off("begin");
    if(seen){
      c.tool("left","Spin left",()=>rotate(-1));
      c.tool("right","Spin right",()=>rotate(1));
    }
    if(seen&&aligned())c.marker("take","Pick "+q.itemName,[0,1.02,-.21],()=>c.receive([0,0,-.52]),{kind:"hot"});
    else c.off("take");
  }
  function start(){angle=0;shown=0;seen=false;touch=0;show();}
  function tick(dt){
    const b=aligned(),d=turns[angle]-shown;
    shown+=Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*10);
    if(b!==aligned())show();
  }
  function draw(m){
    const z=c.localZ(-.31),nx=Math.sin(shown),nz=Math.cos(shown);
    m.tube([0,.04,z],[0,.17,z],1.42,1.30,ink(),14);
    m.box(0,.85,z,2.53,1.30,.24,trim(),shown);
    m.box(0,1.51,z,2.62,.087,.32,ink(),shown);
    const offset=(Math.PI*.50*q.way+shown)*.5;
    for(const s of [-1,1]){
      m.box(-nz*s*.70,.42,z+nx*s*.70,1.16,.075,.63,bright(),shown);
      c.item(m,s===1?"bag":"gift",-nz*s*.70,.48,z+nx*s*.70,.84,0xe7ad80);
    }
    if(aligned())c.item(m,q.object,Math.sin(offset)*.18,.78,z+.35,.92,0x98d1cc);
    if(!seen)c.item(m,"receipt",0,.04,c.localZ(2.23),1.05,bright());
  }
  function swipe(p){if(!seen||!p.origin||Math.hypot(p.origin.x,p.origin.z+.31)>1.63)return false;touch+=p.dx;return true;}
  function dragEnd(){const d=Math.abs(touch)>20?Math.sign(touch):0;touch=0;if(d)rotate(d);}
  return {start,tick,draw,swipe,dragEnd};
}

function makeThirdTask(c,q){
  const col=[-2.35,0,2.35],badge=[0x77be9f,0xe6b16a,0xab94c8];
  let index=0,seen=false,picked=[];
  function read(){
    c.flyTo(0,2.53,()=>{
      seen=true;c.tone([294,442]);c.pulse([0,.63,2.55],bright(),12);update();
    });
  }
  function choose(i){
    c.flyTo(col[i],-.51,()=>{
      if(i!==q.rows[index].wrong){c.mistake("That record matches");return;}
      picked.push(i);seen=false;index++;
      c.pulse([col[i],.52,-1.08],0xf3cd81,18);
      if(index===q.rows.length){c.receive([col[i],0,-1.11]);return;}
      c.feedback(true,"Mismatch reported");update();
    });
  }
  function update(){
    c.objective(seen?q.goalText:"Inspect the next "+q.sourceName.toLowerCase());
    c.meter(seen?q.rows[index].clue:(index+"/"+q.rows.length+" checked"));
    if(!seen)c.marker("read","Read "+q.sourceName,[0,.66,2.55],read,{kind:"clue"});
    else c.off("read");
    q.rows[index].labels.forEach((name,i)=>{
      if(seen)c.marker("doc"+i,name,[col[i],.77,-.95],()=>choose(i),{kind:"hot"});else c.off("doc"+i);
    });
  }
  function start(){index=0;seen=false;picked=[];update();}
  function draw(m,t){
    const z=c.localZ;
    c.pedestal(m,0,z(2.55),1.32,trim());
    c.item(m,"receipt",0,.22,z(2.55),1.2,bright(),t*.08);
    for(let i=0;i<3;i++){
      c.pedestal(m,col[i],z(-.99),1.51,badge[i]);
      c.item(m,q.object,col[i],.23,z(-1.03),1.01,badge[i]);
      if(seen)c.item(m,"coupon",col[i]+.47,.25,z(-.64),.61,0xeed1a0);
    }
  }
  return {start,draw};
}

function makeChallenge(c){
  const tasks=[makeFirstTask(c),makeSecondTask(c,GAME.tasks[0]),makeThirdTask(c,GAME.tasks[1])];
  let active=tasks[0];
  return {
    start(stage,run){active=tasks[stage];active.start(stage,run);},
    get lockMove(){return active.lockMove;},
    draw(m,t){active.draw(m,t);},
    tick(dt,t){active.tick?.(dt,t);},
    tap(p){return active.tap?.(p);},
    swipe(p){return active.swipe?.(p);},
    dragEnd(p){active.dragEnd?.(p);},
    key(k){return active.key?.(k);}
  };
}
