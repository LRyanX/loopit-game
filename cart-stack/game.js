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
  "guides": [
    [
      "▦",
      "Pack the cart"
    ],
    [
      "∞",
      "Clip cargo straps"
    ],
    [
      "→",
      "Reach the gold exit"
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
      "object": "parcel",
      "award": "Cart delivered intact"
    }
  ],
  "scenarios": [
    [
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
    ],
    [
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
        "object": "parcel",
        "award": "Cart delivered intact"
      }
    ]
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
  let entries=[],chosen=0,rotation=0,packed=[],floorIndex=0,dropCell=null;
  function shape(index,turn){
    let points=entries[index].shape.map(x=>x.slice());
    for(let i=0;i<turn;i++)points=points.map(([x,y])=>[-y,x]);
    const xMin=Math.min(...points.map(p=>p[0])),yMin=Math.min(...points.map(p=>p[1]));
    return points.map(([x,y])=>[x-xMin,y-yMin]);
  }
  function refresh(){
    const p=entries[chosen],fit=packed.some(v=>v.index===chosen);
    c.objective(fit?"Choose an unpacked product":"Fit "+p.name.toLowerCase()+" into the cart");
    c.meter(packed.length+"/"+entries.length+" packed · choose a top-left slot");
    c.hideTools();
    c.tool("rotate","Rotate "+p.name,()=>{rotation=(rotation+1)%4;c.tone();refresh();},fit);
    if(packed.length)c.tool("undo","Undo placement",()=>{
      chosen=packed.pop().index;rotation=0;c.feedback(true);refresh();
    });
    entries.forEach((v,i)=>c.marker("pick"+i,v.name,[(i-(entries.length-1)/2)*2.02,.68,3.24],()=>{
      chosen=i;rotation=0;refresh();
    },{kind:"clue",hidden:i===chosen||packed.some(e=>e.index===i)}));
    for(let y=0;y<3;y++)for(let x=0;x<3;x++){
      c.marker("slot"+x+y,["A","B","C"][x]+(y+1),[padX(x),.17,padZ(y)],()=>place(x,y),{tile:true});
    }
  }
  function place(x,y){
    if(packed.some(v=>v.index===chosen)){c.feedback(false,"Choose an unpacked item");return;}
    const occupied=new Set(packed.flatMap(v=>v.cells.map(p=>p.join(","))));
    if(floorIndex===1)occupied.add("2,2");
    const cells=shape(chosen,rotation).map(([a,b])=>[x+a,y+b]);
    if(cells.some(([a,b])=>a>=3||b>=3||occupied.has(a+","+b))){c.mistake("Doesn't fit · rotate or move");return;}
    packed.push({index:chosen,cells});
    c.pulse([padX(x),.42,padZ(y)],entries[chosen].tint,17);
    if(packed.length===entries.length){c.receive([0,0,-2.76]);return;}
    chosen=entries.findIndex((_,i)=>!packed.some(v=>v.index===i));rotation=0;
    c.feedback(true);refresh();
  }
  function start(stage){entries=layout[stage];floorIndex=stage;chosen=0;rotation=0;packed=[];dropCell=null;refresh();}
  function draw(m){
    const local=c.localZ;
    m.box(0,.04,local(-.21),4.65,.106,5.03,ink());
    const carrying=entries[chosen],ghost=dropCell?shape(chosen,rotation).map(([a,b])=>[dropCell[0]+a,dropCell[1]+b]):[];
    for(let y=0;y<3;y++)for(let x=0;x<3;x++){
      const found=packed.find(p=>p.cells.some(([a,b])=>a===x&&b===y));
      const blocked=floorIndex===1&&x===2&&y===2;
      const hover=ghost.some(([a,b])=>a===x&&b===y);
      m.box(padX(x),.137,local(padZ(y)),1.32,.13,1.42,blocked?0x706761:hover?0xf7d894:found?entries[found.index].tint:0xbfdad2);
      if(blocked)m.box(padX(x),.289,local(padZ(y)),1.10,.18,1.26,0x76726e);
      if(found)m.box(padX(x),.31,local(padZ(y)),1.16,.22,1.24,entries[found.index].tint);
      if(hover&&!found&&!blocked)m.box(padX(x),.238,local(padZ(y)),1.08,.035,1.13,carrying.tint);
    }
    entries.forEach((p,i)=>{
      const x=(i-(entries.length-1)/2)*2.02;
      c.pedestal(m,x,local(3.32),1.34,i===chosen?bright():trim());
      if(packed.some(v=>v.index===i))return;
      for(const [a,b] of shape(i,i===chosen?rotation:0))
        m.box(x+(a-.6)*.37,.35,local(3.28+(b-.33)*.34),.351,.29,.32,p.tint);
    });
    if(!packed.length&&!dropCell){
      const x=(chosen-(entries.length-1)/2)*2.02,z=local(2.58),y=.073;
      m.tri([x-.25,y,z+.15],[x+.25,y,z+.15],[x,y,z-.19],0xffd589,1);
    }
  }
  function swipe(p){
    if(!p.floor||!p.origin||p.origin.z<1.7)return false;
    const [a,b]=[Math.round(p.floor.x/1.45+1),Math.round((p.floor.z+.21)/1.67+1)];
    dropCell=a<0||a>2||b<0||b>2?null:[a,b];return true;
  }
  function dragEnd(){const v=dropCell;dropCell=null;if(v)place(...v);}
  return {start,draw,swipe,dragEnd};
}

function makeSecondTask(c,q){
  const colors=[0xf0ad73,0x8ee0c2,0xa7bbef],letter=i=>String.fromCharCode(65+i);
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
    if(link<0){c.mistake("The clips do not match");return;}
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
      left===null?"Choose an anchor clip":"Choose the matching clip");
    c.meter(pending?"Tension "+pending.steps+"/"+goal(pending.link):used.length+"/"+q.pairs.length+" straps secured");
    for(let i=0;i<6;i++){
      const [x,z]=anchor(i),link=routeOf(i);
      const hidden=Boolean(pending)||used.length===q.pairs.length||used.includes(link)||(i>=3&&left===null);
      c.marker("anchor"+i,"Clip "+letter(i),[x,.44,z],()=>choose(i),{kind:i===left?"good":"clue",hidden,caption:letter(i)});
    }
    if(pending){
      const [x,z]=anchor(pending.i);
      c.marker("pull","Pull ratchet",[x,.53,z],ratchet,{kind:"clue",caption:"Ratchet"});
      c.marker("secure","Secure strap",[x-.65,.59,z-.43],secure,{kind:pending.steps===goal(pending.link)?"good":"hot"});
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

function makeThirdTask(c,q){
  const dirs=[[-1,0],[1,0],[0,-1],[0,1]],names=["Left","Right","Forward","Back"];
  const X=x=>(x-1.5)*1.48,Z=y=>y*1.59-2.79;
  let at=[],shown=[],anim=null,moved=0,axis=null;
  const is=(a,b)=>a[0]===b[0]&&a[1]===b[1];
  function go(i){
    if(anim)return;
    const d=dirs[i],next=[at[0]+d[0],at[1]+d[1]];
    if(next.some(v=>v<0||v>3)||q.blocks.some(v=>is(next,v))){c.mistake(q.blockHint||"Blocked · follow the clear lane");return;}
    anim={from:at.slice(),to:next,t:0};c.tone([285,402],.064,.073);controls();
  }
  function controls(){
    c.objective(q.goalText);
    c.meter(moved+" moves · reach the gold exit");
    names.forEach((n,i)=>c.tool("dir"+i,n,()=>go(i),Boolean(anim)));
  }
  function start(){at=q.start.slice();shown=at.slice();anim=null;moved=0;axis=null;controls();}
  function tick(dt){
    if(anim){
      anim.t=clamp(anim.t+dt*5.4,0,1);
      shown=anim.from.map((v,i)=>lerp(v,anim.to[i],curve(anim.t)));
      if(anim.t===1){
        at=anim.to;anim=null;moved++;
        if(is(at,q.exit)){c.receive([X(at[0]),0,Z(at[1])]);return;}
        controls();
      }
    }
    c.player.x=X(shown[0]);c.player.z=c.localZ(Z(shown[1]));
  }
  function draw(m,t){
    const z=c.localZ;
    for(let i=0;i<4;i++)for(let j=0;j<4;j++){
      const x=X(i),p=[i,j],row=Z(j),wall=q.blocks.some(v=>is(p,v)),out=is(p,q.exit);
      m.box(x,.034,z(row),1.30,.05,1.37,out?0xe9b868:wall?ink():(i+j)%2===0?flat():GAME.palette.tile2);
      if(wall)c.item(m,q.object,x,.08,z(row),.90,trim(),i*.17-j*.19);
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

function makeChallenge(c){
  const makeRoom=[null,makeSecondTask,makeThirdTask];
  let active;
  return {
    start(stage,run,challenge){
      const scenario=(run+challenge)%3;
      active=stage===0?makeFirstTask(c):makeRoom[stage](c,GAME.scenarios[stage-1][scenario]);
      active.start(stage===0?scenario:stage,0);
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
