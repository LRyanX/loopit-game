"use strict";

const GAME = {
  "title": "Aurora Archive",
  "brief": "hunt",
  "look": "aurora",
  "avatar": "hover",
  "zones": [
    "Polar Landing",
    "Glacier Crevasses",
    "Ice Rosette Gate"
  ],
  "awards": [
    "Glacier Lens",
    "Polar Signet",
    "Aurora Shard"
  ],
  "awardShape": "ice",
  "palette": {
    "sky": 3426167,
    "haze": 10861015,
    "tile": 11189719,
    "tile2": 9088715,
    "ink": 2702947,
    "trim": 8101565,
    "accent": 4088476,
    "loot": 12364029,
    "css": "#3e629c"
  },
  "passages": [
    "Enter Glacier Crevasses",
    "Enter Ice Rosette Gate"
  ],
  "scene": "aurora",
  "footprint": "organic",
  "connector": "ice",
  "camera": [
    0.04,
    0.89,
    1.1,
    -0.08
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      -8,
      -12,
      1.25,
      0.52
    ],
    [
      -6,
      -25,
      2.04,
      -0.12
    ]
  ],
  "tasks": [
    {
      "kind": "maze",
      "title": "Glacier Crevasses",
      "goalText": "Navigate around the ice fissure markers",
      "start": [
        1,
        3
      ],
      "exit": [
        3,
        0
      ],
      "blocks": [
        [
          1,
          2
        ],
        [
          2,
          2
        ],
        [
          2,
          0
        ],
        [
          0,
          1
        ]
      ],
      "object": "ice",
      "blockHint": "Crevasse · find solid ice",
      "award": "Polar Signet"
    },
    {
      "kind": "lattice",
      "title": "Ice Rosette Gate",
      "goalText": "Align each ice ring with its marker",
      "target": [
        2,
        1,
        4
      ],
      "award": "Aurora Shard"
    }
  ],
  "form": "ice",
  "controls": [
    "world",
    "tray",
    "tray"
  ],
  "views": [
    [
      0.02,
      0.86,
      1.06,
      -0.08,
      0.79
    ],
    [
      -0.04,
      0.95,
      0.94,
      -0.18,
      0.8
    ],
    [
      0.29,
      1.08,
      0.91,
      -0.03,
      0.76
    ]
  ]
};

function makeFirstTask(c){
  const viewpoints=[-.59,.04,.59];
  const targets=[2,0,1];
  let target=0,clueTaken=false,lastFit=false,ridge=0,high=false,chosen=1;
  function inspect(){
    c.flyTo(0,2.60,()=>{clueTaken=true;c.tone([392,554]);renderUI();});
  }
  function choose(i){
    chosen=i;
    c.setView(viewpoints[i],high?.84:.63);
    c.flyTo((i-1)*2.58,1.98,()=>{c.tone([335+i*72],.06,.08);});
  }
  function fit(){
    const q=c.viewInfo();
    return clueTaken&&Math.abs(q.yaw-viewpoints[target])<(ridge===2?.078:.127)&&Math.abs(q.pitch-(ridge===0?.63:.84))<.11;
  }
  function renderUI(){
    const match=fit();
    c.objective(!clueTaken?"Read the aurora alignment plate":match?"Silhouette complete · open the archive":"Find the angle that aligns the shards");
    c.meter(clueTaken&&!match?["West","Middle","East"][target]+" ring"+(ridge>0?" · raised lens":""):"");
    if(!clueTaken)c.marker("read","Read plate",[0,.76,2.62],inspect,{kind:"clue"});
    else {
      c.off("read");
      viewpoints.forEach((_,i)=>c.marker("view"+i,["View west","View center","View east"][i],[(i-1)*2.64,.52,2.22],()=>choose(i),{kind:match&&i===target?"good":"clue"}));
    }
    if(clueTaken&&ridge>0)c.tool("lift",high?"Lower lens":"Raise lens",()=>{
      high=!high;c.setView(viewpoints[chosen],high?.84:.63);c.tone([328,518]);
    });
    if(match)c.marker("gate","Open archive",[.08,.66,-2.87],()=>c.flyTo(.08,-2.31,()=>c.receive([.08,0,-2.93])),{kind:"hot"});
    else c.off("gate");
  }
  function start(i,run){ridge=i;high=false;chosen=1;target=(targets[i]+run)%3;clueTaken=false;lastFit=false;c.setView(.04,.89);renderUI();}
  function tick(){
    const n=fit();
    if(n===lastFit)return;
    lastFit=n;
    if(n){
      c.pulse([0,1.01,-.57],0x8ff6d8,22);
      c.tone([370,523,740],.074,.106);
    }
    renderUI();
  }
  function draw(m,time){
    const x0=0,z0=-.64;
    const yaw=viewpoints[target],ux=Math.sin(yaw),uz=Math.cos(yaw);
    const n=fit();
    for(let i=0;i<3;i++){
      const t=(i-1)*1.37,x=x0+ux*t,z=c.localZ(z0+uz*t),y=.92+Math.sin(ridge===0?.63:.84)*t*.79;
      c.pedestal(m,x,z,.96,trim());
      m.tube([x,.21,z],[x,y,z],.07,.054,ink(),8);
      if(i===0)m.gem(x,y,z,.33,.66,.31,n?0xe6f8df:0xce85dd,3,yaw,1);
      else if(i===1)m.tube([x,y-.081,z],[x,y+.081,z],.42,.42,n?0xbaeed9:0x8bd7f2,12,1);
      else m.gem(x,y,z,.51,.89,.39,n?0x88fae1:0x70a6bc,4,yaw+.23,1);
    }
    c.pedestal(m,0,c.localZ(-2.93),1.31,trim());
    if(!c.hasAward())c.item(m,"box",0,.21,c.localZ(-2.93),1.03,0x8076af);
    for(let i=0;i<3;i++)c.ring(m,(i-1)*2.64,.05,c.localZ(2.22),.64,clueTaken&&i===target?0xa1ffe3:trim(),.026);
    if(!clueTaken)c.item(m,"idol",0,.22,c.localZ(2.62),1.08,bright());
  }
  return {start,tick,draw};
}

function makeSecondTask(c,q){
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

function makeThirdTask(c,q){
  let rings=[],angles=[],active=false;
  const rad=[.53,.98,1.48],hues=[0x8ed5d4,0xa8a0df,0xf0bc86];
  const fit=()=>rings.every((v,i)=>v===q.target[i]);
  function turn(i){rings[i]=(rings[i]+1)%6;c.tone([326+i*92+rings[i]*22]);update();}
  function see(){active=true;c.tone([341,520]);update();}
  function update(){
    c.objective(!active?"Inspect the ice rosette":fit()?"All notches meet the cut marks":"Turn the concentric ice rings");
    c.meter(active?rings.filter((v,i)=>v===q.target[i]).length+"/3 notches aligned":"");
    if(!active)c.marker("read","Inspect rosette",[0,.63,2.59],see,{kind:"clue"});else c.off("read");
    if(active)for(let i=0;i<3;i++)c.tool("turn"+i,["Inner ring","Middle ring","Outer ring"][i],()=>turn(i));
    if(fit())c.marker("cache","Lift ice prism",[0,.77,-2.51],()=>c.flyTo(0,-2.09,()=>c.receive([0,0,-2.54])),{kind:"hot"});else c.off("cache");
  }
  function start(){rings=[0,0,0];angles=[0,0,0];active=false;update();}
  function tick(dt){
    angles=angles.map((v,i)=>{
      const d=rings[i]/6*TAU-v;
      return v+Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*9);
    });
  }
  function draw(m){
    const z=c.localZ(-.61);
    m.tube([0,.03,z],[0,.23,z],1.75,1.68,ink(),16);
    for(let i=0;i<3;i++){
      c.ring(m,0,.31+i*.025,z,rad[i],hues[i],.048,30);
      const t=q.target[i]/6*TAU,d=angles[i],radius=rad[i];
      m.box(Math.sin(t)*radius,.31,z+Math.cos(t)*radius,.21,.046,.29,0xffd994,t,1);
      m.box(Math.sin(d)*radius,.40,z+Math.cos(d)*radius,.16,.12,.19,rings[i]===q.target[i]?0xa4f9d4:hues[i],d,1);
    }
    c.pedestal(m,0,c.localZ(-2.51),1.36,trim());
    c.item(m,"ice",0,.23,c.localZ(-2.51),1.07,0xacc9f3);
  }
  return {start,tick,draw};
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
