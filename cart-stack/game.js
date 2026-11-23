"use strict";

const GAME = {
  "title": "Cart Stack",
  "brief": "sale",
  "look": "warehouse",
  "avatar": "cart",
  "zones": [
    "Cart Yard",
    "Cargo Tie-Down",
    "Blocked Loading Aisle"
  ],
  "awards": [
    "Two items packed",
    "Cargo secured",
    "Cart delivered intact"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 9284261,
    "haze": 15264719,
    "tile": 14212022,
    "tile2": 15915429,
    "ink": 3357754,
    "trim": 9870720,
    "accent": 5072708,
    "loot": 15911551,
    "css": "#4d6744"
  },
  "passages": [
    "Enter Cargo Tie-Down",
    "Enter Blocked Loading Aisle"
  ],
  "scene": "freight",
  "footprint": "square",
  "connector": "loading",
  "camera": [
    -0.09,
    0.94,
    0.89,
    0.02
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      0,
      -12,
      0.7,
      0
    ],
    [
      -7,
      -21,
      1.36,
      0.68
    ]
  ],
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "▦",
          "Pack the cart"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "▦",
          "Pack the cart"
        ]
      }
    ],
    [
      {
        "kind": "straps",
        "guide": [
          "∞",
          "Clip cargo straps"
        ],
        "runs": [
          {
            "kind": "straps",
            "title": "Cargo Tie-Down",
            "goalText": "Join matching anchor clips to secure the load",
            "pairs": [
              [
                0,
                5
              ],
              [
                2,
                3
              ]
            ],
            "high": 1,
            "award": "Cargo secured"
          },
          {
            "kind": "straps",
            "title": "Cargo Tie-Down",
            "goalText": "Join matching anchor clips to secure the load",
            "pairs": [
              [
                0,
                4
              ],
              [
                1,
                3
              ],
              [
                2,
                5
              ]
            ],
            "high": 2,
            "award": "Cargo secured"
          },
          {
            "kind": "straps",
            "title": "Cargo Tie-Down",
            "goalText": "Join matching anchor clips to secure the load",
            "pairs": [
              [
                0,
                3
              ],
              [
                1,
                5
              ],
              [
                2,
                4
              ]
            ],
            "high": 0,
            "award": "Cargo secured"
          }
        ]
      }
    ],
    [
      {
        "kind": "maze",
        "guide": [
          "→",
          "Reach the gold exit"
        ],
        "runs": [
          {
            "kind": "maze",
            "title": "Blocked Loading Aisle",
            "goalText": "Steer the packed cart around the stock cages",
            "start": [
              0,
              3
            ],
            "exit": [
              3,
              0
            ],
            "blocks": [
              [
                1,
                3
              ],
              [
                1,
                2
              ],
              [
                2,
                1
              ],
              [
                0,
                0
              ]
            ],
            "pickup": [
              2,
              2
            ],
            "object": "parcel",
            "award": "Cart delivered intact"
          },
          {
            "kind": "maze",
            "title": "Blocked Loading Aisle",
            "goalText": "Steer the packed cart around the stock cages",
            "start": [
              3,
              3
            ],
            "exit": [
              0,
              0
            ],
            "blocks": [
              [
                2,
                3
              ],
              [
                2,
                2
              ],
              [
                1,
                1
              ],
              [
                3,
                0
              ]
            ],
            "pickup": [
              1,
              2
            ],
            "object": "parcel",
            "award": "Cart delivered intact"
          },
          {
            "kind": "maze",
            "title": "Blocked Loading Aisle",
            "goalText": "Steer the packed cart around the stock cages",
            "start": [
              0,
              3
            ],
            "exit": [
              3,
              0
            ],
            "blocks": [
              [
                0,
                2
              ],
              [
                1,
                2
              ],
              [
                2,
                1
              ],
              [
                3,
                3
              ]
            ],
            "pickup": [
              1,
              1
            ],
            "object": "parcel",
            "award": "Cart delivered intact"
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "cart",
    "title": "Cart loaded",
    "summary": "Your packed cart rolls out of the loading bay.",
    "pieces": [
      "shoe",
      "lamp",
      "bag"
    ],
    "prize": "bag"
  },
  "tasks": [
    {
      "kind": "straps",
      "title": "Cargo Tie-Down",
      "goalText": "Join matching anchor clips to secure the load",
      "pairs": [
        [
          0,
          5
        ],
        [
          2,
          3
        ]
      ],
      "high": 1,
      "award": "Cargo secured"
    },
    {
      "kind": "maze",
      "title": "Blocked Loading Aisle",
      "goalText": "Steer the packed cart around the stock cages",
      "start": [
        0,
        3
      ],
      "exit": [
        3,
        0
      ],
      "blocks": [
        [
          1,
          3
        ],
        [
          1,
          2
        ],
        [
          2,
          1
        ],
        [
          0,
          0
        ]
      ],
      "pickup": [
        2,
        2
      ],
      "object": "parcel",
      "award": "Cart delivered intact"
    }
  ],
  "form": "loading",
  "controls": [
    "world",
    "tray",
    "tray"
  ],
  "views": [
    [
      0.04,
      1.08,
      0.92,
      0.25,
      0.72
    ],
    [
      -0.47,
      0.69,
      0.91,
      -0.09,
      0.81
    ],
    [
      0,
      0.72,
      0.93,
      -0.09,
      0.79
    ]
  ]
};

function makeFirstTask(c){
  const layout=[
    [{name:"Boots",shape:[[0,0],[1,0],[2,0]],tint:0xdf7c54},{name:"Mug",shape:[[0,0]],tint:0x65aaa4}],
    [{name:"Coat",shape:[[0,0],[0,1],[1,1]],tint:0x796caa},{name:"Kettle",shape:[[0,0],[1,0]],tint:0xe3b455}],
    [{name:"Camera",shape:[[0,0],[1,0],[0,1],[1,1]],tint:0x73a6bb},{name:"Shoes",shape:[[0,0],[1,0],[2,0]],tint:0xc56854},{name:"Gift",shape:[[0,0],[0,1]],tint:0xdeaa67}]
  ];
  const padX=(i)=>(i-1)*1.45,padZ=(j)=>(j-1)*1.67-.21;
  let entries=[],chosen=0,rotation=0,packed=[],floorIndex=0,dropCell=null,preview=null;
  function shape(index,turn){
    let points=entries[index].shape.map(x=>x.slice());
    for(let i=0;i<turn;i++)points=points.map(([x,y])=>[-y,x]);
    const xMin=Math.min(...points.map(p=>p[0])),yMin=Math.min(...points.map(p=>p[1]));
    return points.map(([x,y])=>[x-xMin,y-yMin]);
  }
  function refresh(){
    const p=entries[chosen],fit=packed.some(v=>v.index===chosen);
    c.objective(fit?"Choose an unpacked product":preview?"Tap again to place":"Preview a slot for "+p.name.toLowerCase());
    c.meter(packed.length+"/"+entries.length+" packed");
    c.hideTools();
    c.tool("rotate","Rotate "+p.name,()=>{rotation=(rotation+1)%4;preview=null;c.tone();refresh();},fit);
    if(packed.length)c.tool("undo","Undo placement",()=>{
      chosen=packed.pop().index;rotation=0;preview=null;c.feedback(true);refresh();
    });
    entries.forEach((v,i)=>c.marker("pick"+i,v.name,[(i-(entries.length-1)/2)*2.02,.68,3.24],()=>{
      chosen=i;rotation=0;preview=null;refresh();
    },{kind:"clue",hidden:i===chosen||packed.some(e=>e.index===i)}));
    for(let y=0;y<3;y++)for(let x=0;x<3;x++){
      c.marker("slot"+x+y,["A","B","C"][x]+(y+1),[padX(x),.17,padZ(y)],()=>select(x,y),{tile:true});
    }
  }
  function select(x,y){
    if(preview?.[0]===x&&preview?.[1]===y){preview=null;place(x,y);return;}
    preview=[x,y];c.tone([363]);refresh();
  }
  function place(x,y){
    if(packed.some(v=>v.index===chosen)){c.feedback(false,"Choose an unpacked item");return;}
    const occupied=new Set(packed.flatMap(v=>v.cells.map(p=>p.join(","))));
    if(floorIndex===1)occupied.add("2,2");
    const cells=shape(chosen,rotation).map(([a,b])=>[x+a,y+b]);
    if(cells.some(([a,b])=>a>=3||b>=3||occupied.has(a+","+b))){c.mistake("Doesn't fit · rotate or move");refresh();return;}
    packed.push({index:chosen,cells});
    c.pulse([padX(x),.42,padZ(y)],entries[chosen].tint,17);
    if(packed.length===entries.length){c.receive([0,0,-2.76]);return;}
    chosen=entries.findIndex((_,i)=>!packed.some(v=>v.index===i));rotation=0;
    c.feedback(true);refresh();
  }
  function start(stage){entries=layout[stage];floorIndex=stage;chosen=0;rotation=0;packed=[];dropCell=null;preview=null;refresh();}
  function draw(m){
    const local=c.localZ;
    m.box(0,.04,local(-.21),4.65,.106,5.03,ink());
    const carrying=entries[chosen],slot=dropCell||preview;
    const ghost=slot?shape(chosen,rotation).map(([a,b])=>[slot[0]+a,slot[1]+b]):[];
    const valid=ghost.every(([x,y])=>x<3&&y<3&&!(floorIndex===1&&x===2&&y===2)&&
      !packed.some(p=>p.cells.some(([a,b])=>a===x&&b===y)));
    for(let y=0;y<3;y++)for(let x=0;x<3;x++){
      const found=packed.find(p=>p.cells.some(([a,b])=>a===x&&b===y));
      const blocked=floorIndex===1&&x===2&&y===2;
      const hover=ghost.some(([a,b])=>a===x&&b===y);
      m.box(padX(x),.137,local(padZ(y)),1.32,.13,1.42,blocked?0x706761:hover?0xf7d894:found?entries[found.index].tint:0xbfdad2);
      if(blocked)m.box(padX(x),.289,local(padZ(y)),1.10,.18,1.26,0x76726e);
      if(found)m.box(padX(x),.31,local(padZ(y)),1.16,.22,1.24,entries[found.index].tint);
      if(hover)m.box(padX(x),.443,local(padZ(y)),1.08,.030,1.13,valid?0x95deb7:0xe68273,0,1);
    }
    entries.forEach((p,i)=>{
      const x=(i-(entries.length-1)/2)*2.02;
      c.pedestal(m,x,local(3.32),1.34,i===chosen?bright():trim());
      if(packed.some(v=>v.index===i))return;
      for(const [a,b] of shape(i,i===chosen?rotation:0))
        m.box(x+(a-.6)*.37,.35,local(3.28+(b-.33)*.34),.351,.29,.32,p.tint);
    });
    if(!packed.length&&!slot){
      const x=(chosen-(entries.length-1)/2)*2.02,z=local(2.58),y=.073;
      m.tri([x-.25,y,z+.15],[x+.25,y,z+.15],[x,y,z-.19],0xffd589,1);
    }
  }
  function swipe(p){
    if(!p.floor||!p.origin||p.origin.z<1.7)return false;
    const [a,b]=[Math.round(p.floor.x/1.45+1),Math.round((p.floor.z+.21)/1.67+1)];
    dropCell=a<0||a>2||b<0||b>2?null:[a,b];return true;
  }
  function dragEnd(){const v=dropCell;dropCell=null;preview=null;if(v)place(...v);}
  return {start,draw,swipe,dragEnd};
}

function makeSpecialTask(c,scenario){
  const goods=[
    ["Books","parcel",0xd39272],["Glass","mug",0x89b9c9],["Blanket","bag",0x96c39a],
    ["Tools","box",0xa493c9],["Lamp","lamp",0xe1c481]
  ];
  const order=[[0,2,1],[3,2,4],[0,2,4]][scenario];
  const display=scenario===1?[4,3,2]:scenario===0?[1,0,2]:[2,4,0];
  let stack=[];
  function add(id){
    if(id!==order[stack.length]){c.mistake("Sturdy box, padding, then the fragile item");return;}
    const i=display.indexOf(id);
    c.flyTo((i-1)*1.84,1.21,()=>{
      stack.push(id);c.tone([380+stack.length*81]);
      if(stack.length===3){c.pulse([0,1.21,-1.37],0x90dfb9);c.receive([0,0,-1.38]);return;}
      update();
    });
  }
  function update(){
    c.objective(["Stack the sturdy box first","Add the padding","Place the fragile item on top"][stack.length]);
    c.meter(stack.length+"/3 loaded vertically");
    display.forEach((id,i)=>{
      if(!stack.includes(id))c.marker("pick"+id,"Lift "+goods[id][0],[(i-1)*1.84,.68,1.32],()=>add(id),{kind:"clue",caption:goods[id][0]});
      else c.off("pick"+id);
    });
  }
  function draw(m){
    const z=c.localZ;
    m.box(0,.14,z(-1.37),1.70,.25,1.62,ink(),0,4);
    m.tube([-1.02,.24,z(-1.37)],[-1.02,1.81,z(-1.37)],.047,.047,trim(),7,4);
    display.forEach((id,i)=>{if(!stack.includes(id))c.item(m,goods[id][1],(i-1)*1.84,.12,z(1.28),1.10,goods[id][2]);});
    stack.forEach((id,i)=>c.item(m,goods[id][1],0,.30+i*.48,z(-1.36),1.11-i*.12,goods[id][2]));
  }
  return {start:update,draw};
}

function make_straps(c,q){
  const colors=[0xf0ad73,0x8ee0c2,0xa7bbef],letter=i=>String.fromCharCode(65+i);
  const symbols=["●","▲","◆"];
  const anchor=i=>[i<3?-2.29:2.29,1.60-(i%3)*1.53];
  let left=null,used=[],pending=null;
  const routeOf=i=>q.pairs.findIndex(pair=>pair.includes(i));
  const goal=link=>link===q.high?3:2;
  function choose(i){
    if(i<3){
      const [x,z]=anchor(i);
      c.flyTo(x,z,()=>{left=left===i?null:i;c.tone();show();});return;
    }
    if(left===null)return;
    const link=q.pairs.findIndex(([a,b])=>a===left&&b===i);
    if(link<0){c.mistake("Match the shape on both clips");return;}
    const [x,z]=anchor(i);
    c.flyTo(x,z,()=>{
      pending={link,steps:0,i};left=null;
      c.pulse([x,.5,z],colors[link],14);
      c.feedback(true,"Strap clipped");show();
    });
  }
  function ratchet(){
    pending.steps=(pending.steps+1)%4;
    c.tone([281+pending.steps*67,420]);show();
  }
  function secure(){
    if(pending.steps!==goal(pending.link)){c.mistake("Bring the ratchet to the marked tension");return;}
    used.push(pending.link);pending=null;c.feedback(true,"Strap secured");show();
  }
  function show(){
    c.objective(pending?"Tighten to the grip mark":used.length===q.pairs.length?"Lock the tied-down load":
      left===null?"Pick a clip with a shape":"Match the same shape");
    c.meter(pending?"Tension "+pending.steps+"/"+goal(pending.link):used.length+"/"+q.pairs.length+" straps secured");
    for(let i=0;i<6;i++){
      const [x,z]=anchor(i),link=routeOf(i);
      const hidden=Boolean(pending)||used.length===q.pairs.length||used.includes(link)||(i>=3&&left===null);
      c.marker("anchor"+i,"Clip "+letter(i),[x,.44,z],()=>choose(i),
        {kind:i===left?"good":"clue",hidden:hidden||link<0,caption:letter(i)+" "+(symbols[link]||"")});
    }
    if(pending){
      const [x,z]=anchor(pending.i);
      c.marker("pull","Pull ratchet",[x,.53,z],ratchet,{kind:"clue",caption:"Pull ratchet"});
      if(pending.steps===goal(pending.link))
        c.marker("secure","Secure strap",[x-.65,.59,z-.43],secure,{kind:"good"});
      else c.off("secure");
    }else {c.off("pull");c.off("secure");}
    if(used.length===q.pairs.length)c.marker("lock","Lock cargo",[0,.68,-2.70],
      ()=>c.flyTo(0,-2.38,()=>c.receive([0,0,-2.69])),{kind:"hot"});
    else c.off("lock");
  }
  function start(){left=null;used=[];pending=null;show();}
  function draw(m){
    const z=c.localZ;
    m.box(0,.11,z(.10),4.18,.19,4.24,ink(),0,4);
    for(let i=0;i<3;i++)c.item(m,i===q.high?"parcel":"box",(i-1)*.91,.22,z(.33-i*.39),i===q.high?1.33:.91,
      i===q.high?0xb78f6f:trim());
    for(let i=0;i<6;i++){
      const [x,pz]=anchor(i),link=routeOf(i),color=link<0?0x839297:colors[link];
      m.oval(x,.36,z(pz),.19,.12,.18,color,0,link<0?4:1,10);
      if(i===left)c.ring(m,x,.072,z(pz),.40,color,.035);
    }
    const drawStrap=(link,tension)=>{
      const [a,b]=q.pairs[link].map(anchor),p=[(a[0]+b[0])*.50,.81+tension*.10,z((a[1]+b[1])*.50)];
      m.tube([a[0],.39,z(a[1])],p,.043,.043,colors[link],6,1);
      m.tube(p,[b[0],.39,z(b[1])],.043,.043,colors[link],6,1);
    };
    used.forEach(link=>drawStrap(link,goal(link)));
    if(pending){
      drawStrap(pending.link,pending.steps);
      const [x,pz]=anchor(pending.i);
      for(let i=1;i<=3;i++)m.box(x,.43+i*.12,z(pz+.21),.36,.07,.07,
        i===goal(pending.link)?0xffcd85:i<=pending.steps?0x8fe7b8:trim(),0,1);
    }
    c.item(m,"register",0,.06,z(-2.74),.81,used.length===q.pairs.length?0x8de2b8:trim());
  }
  return {start,draw};
}

function make_maze(c,q){
  const dirs=[[-1,0],[1,0],[0,-1],[0,1]],names=["Left","Right","Forward","Back"];
  const X=x=>(x-1.5)*1.48,Z=y=>y*1.59-2.79;
  let at=[],shown=[],anim=null,moved=0,axis=null;
  let picked=false,anchored=false,spent=new Set();
  const is=(a,b)=>a[0]===b[0]&&a[1]===b[1];
  const thin=p=>q.thin?.some(v=>is(v,p));
  const blocked=p=>p.some(v=>v<0||v>3)||q.blocks.some(v=>is(p,v))||spent.has(p.join(","));
  const drift=p=>q.currents?.find(([cell])=>is(cell,p))?.[1];
  function go(i){
    if(anim)return;
    const d=dirs[i],next=[at[0]+d[0],at[1]+d[1]];
    if(blocked(next)){c.mistake(spent.has(next.join(","))?"That ice slab has already broken":q.blockHint||"Blocked · follow the clear lane");return;}
    const flow=!anchored&&drift(next),landing=flow?[next[0]+flow[0],next[1]+flow[1]]:next;
    const carried=Boolean(flow&&!blocked(landing));
    anim={from:at.slice(),through:carried?next:null,to:carried?landing:next,t:0};
    anchored=false;
    if(thin(at))spent.add(at.join(","));
    c.tone(carried?[281,393,495]:[285,402],.064,.073);controls();
  }
  function controls(){
    c.objective(q.pickup&&!picked?"Collect the pickup before the exit":q.thin?"Cracked ice breaks behind you":
      q.currents?"Currents push you one tile":q.goalText);
    c.meter(q.currents?(anchored?"Anchor set":"Tap the diver to set the anchor"):moved+" moves · gold exit");
    if(q.currents)c.marker("anchor",anchored?"Release anchor":"Drop anchor",[X(at[0]),.70,Z(at[1])],()=>{
      anchored=!anchored;c.tone([anchored?292:450]);controls();
    },{kind:anchored?"good":"clue",caption:anchored?"Anchored":"Anchor",disabled:!!anim});
    names.forEach((n,i)=>c.tool("dir"+i,n,()=>go(i),Boolean(anim)));
  }
  function start(){at=q.start.slice();shown=at.slice();anim=null;moved=0;axis=null;picked=!q.pickup;anchored=false;spent.clear();controls();}
  function tick(dt){
    if(anim){
      anim.t=clamp(anim.t+dt*(anim.through?3.6:5.4),0,1);
      const via=anim.through,left=via&&anim.t<.5;
      const from=!via||left?anim.from:via,to=left?via:anim.to;
      const time=via?(left?anim.t*2:(anim.t-.5)*2):anim.t;
      shown=from.map((v,i)=>lerp(v,to[i],curve(time)));
      if(anim.t===1){
        at=anim.to;anim=null;moved++;
        if(q.pickup&&!picked&&is(at,q.pickup)){picked=true;c.pulse([X(at[0]),.47,Z(at[1])],0xa7dfb5,18);}
        if(is(at,q.exit)&&picked){c.receive([X(at[0]),0,Z(at[1])]);return;}
        controls();
      }
    }
    c.player.x=X(shown[0]);c.player.z=c.localZ(Z(shown[1]));
  }
  function draw(m,t){
    const z=c.localZ;
    for(let i=0;i<4;i++)for(let j=0;j<4;j++){
      const x=X(i),p=[i,j],row=Z(j),wall=q.blocks.some(v=>is(p,v)),out=is(p,q.exit);
      const broken=spent.has(p.join(","));
      m.box(x,broken?-.20:.034,z(row),1.30,.05,1.37,broken?0x3f5666:out?0xe9b868:wall?ink():
        thin(p)?0x9eb2c6:(i+j)%2===0?flat():GAME.palette.tile2);
      if(wall)c.item(m,q.object,x,.08,z(row),.90,trim(),i*.17-j*.19);
      if(q.pickup&&!picked&&is(p,q.pickup))c.item(m,"receipt",x,.11,z(row),.75,0xa4e6be);
      if(thin(p)&&!broken)m.box(x,.070,z(row),.73,.013,.034,0x556b87,.71);
      const flow=drift(p);
      if(flow){
        const [dx,dz]=flow,f=(t*.83)%1;
        const a=[x-dx*.42,.092,z(row-dz*.42)],b=[x+dx*(.15+f*.27),.092,z(row+dz*(.15+f*.27))];
        m.tube(a,b,.035,.018,0x9af1e0,6,1);
      }
      if(out)c.ring(m,x,.073,z(row),.40,0xffdc86,.029);
    }
  }
  function swipe(p){
    if(!p.floor)return false;
    if(Math.hypot(p.totalX,p.totalY)>25)axis=Math.abs(p.totalX)>Math.abs(p.totalY)?(p.totalX<0?0:1):(p.totalY<0?2:3);
    return true;
  }
  function dragEnd(){const i=axis;axis=null;if(i!==null)go(i);}
  function key(k){const i=["arrowleft","arrowright","arrowup","arrowdown"].indexOf(k);if(i<0)return false;go(i);return true;}
  return {start,tick,draw,swipe,dragEnd,key,lockMove:true};
}

const taskFactories = {straps:make_straps, maze:make_maze};
function makeChallenge(c){
  let active;
  return {
    start(stage,run,challenge){
      const chapter=GAME.chapters[stage][challenge];
      const scenario=(run+(stage===0?0:stage))%3;
      active=chapter.kind==="signature"?makeFirstTask(c):chapter.kind==="special"?makeSpecialTask(c,scenario):
        chapter.kind==="climax"?makeFinalTrial(c,scenario):
        taskFactories[chapter.kind](c,chapter.runs[scenario]);
      active.start(chapter.kind==="signature"?scenario:stage,0);
    },
    get lockMove(){return active.lockMove;},
    draw(m,t){active.draw(m,t);},
    tick(dt,t){active.tick?.(dt,t);},
    tap(p){return active.tap?.(p);},
    swipe(p){return active.swipe?.(p);},
    dragEnd(p){active.dragEnd?.(p);},
    key(k){return active.key?.(k);}
  };
}
