"use strict";

const GAME = {
  "title": "Echo Reef",
  "brief": "hunt",
  "look": "reef",
  "avatar": "diver",
  "zones": [
    "Coral Landing",
    "Coral Depth Ledges",
    "Sponge Current Tunnels"
  ],
  "awards": [
    "Pearl Compass",
    "Amber Reef Sample",
    "Sunken Crown"
  ],
  "awardShape": "shell",
  "palette": {
    "sky": 2188670,
    "haze": 9555659,
    "tile": 8764334,
    "tile2": 7384484,
    "ink": 2314852,
    "trim": 6135444,
    "accent": 1338480,
    "loot": 16370051,
    "css": "#146c70"
  },
  "passages": [
    "Enter Coral Depth Ledges",
    "Enter Sponge Current Tunnels"
  ],
  "scene": "reef",
  "footprint": "organic",
  "connector": "water",
  "camera": [
    -0.37,
    0.56,
    1.1,
    -0.14
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
      -10,
      -1.65,
      -0.58
    ],
    [
      5,
      -23,
      -3.28,
      0.27
    ]
  ],
  "tasks": [
    {
      "kind": "depth",
      "title": "Coral Depth Ledges",
      "goalText": "Adjust buoyancy to sample the three reef ledges",
      "depths": [
        1,
        3,
        2
      ],
      "object": "shell",
      "award": "Amber Reef Sample"
    },
    {
      "kind": "maze",
      "title": "Sponge Current Tunnels",
      "goalText": "Steer through the clear reef channel",
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
          1,
          2
        ],
        [
          3,
          1
        ],
        [
          0,
          2
        ]
      ],
      "object": "rock",
      "blockHint": "Coral blocks that channel",
      "award": "Sunken Crown"
    }
  ],
  "form": "dive",
  "controls": [
    "world",
    "tray",
    "tray"
  ],
  "views": [
    [
      -0.29,
      0.36,
      1.05,
      -0.18,
      0.87
    ],
    [
      0.37,
      0.37,
      0.93,
      -0.23,
      0.91
    ],
    [
      0.06,
      0.92,
      0.91,
      -0.1,
      0.77
    ]
  ]
};

function makeFirstTask(c){
  const buoy=[{x:-2.6,z:1.36,name:"West"},{x:2.6,z:1.36,name:"East"},{x:0,z:.84,name:"Trench"}];
  const sites=[-2.42,0,2.42];
  let target=0,read=[],opened=[],ping=null,sensors=[];
  function sensing(i){
    const {x,z}=sensors[i];
    c.flyTo(x,z,()=>{
      read[i]=Math.round(99-10*Math.hypot(x-sites[target],z+1.92));
      ping={i,at:c.clock()};
      c.pulse([x,.54,z],0x6be8d1,15);
      c.tone([230+read[i]*6,402+read[i]*6]);
      show();
    });
  }
  function choose(i){
    const x=sites[i];
    c.flyTo(x,-1.36,()=>{
      opened[i]=true;
      if(i===target){c.receive([x,0,-2.02]);return;}
      c.mistake("Empty shell · follow the stronger echo");
      show();
    });
  }
  function show(){
    const scan=read.every(n=>n!==null);
    c.objective(scan?"Stronger echo wins · tie means middle" :sensors.length===3?"Calibrate all three hydrophones":"Ping both hydrophones");
    c.meter(scan?"West "+read[0]+" · East "+read[1]:"");
    sensors.forEach((p,i)=>c.marker("sonar"+i,read[i]===null?"Ping "+p.name:p.name+" "+read[i],[p.x,.74,p.z],()=>sensing(i),{kind:"clue"}));
    sites.forEach((x,i)=>{
      if(scan&&!opened[i])c.marker("shell"+i,["West shell","Middle shell","East shell"][i],[x,.74,-2.02],()=>choose(i),{kind:"hot"});
      else c.off("shell"+i);
    });
  }
  function start(i,run){sensors=buoy.slice(0,i===2?3:2);target=([2,0,1][i]+run)%3;read=sensors.map(()=>null);opened=[false,false,false];ping=null;show();}
  function draw(m,time){
    for(const [i,x] of sites.entries()){
      c.pedestal(m,x,c.localZ(-2.02),1.26,trim());
      if(!opened[i])c.item(m,"shell",x,.27,c.localZ(-2.02),1.44,[0xdf8f88,0xe9aa74,0xd38fa2][i]);
    }
    sensors.forEach((p,i)=>{
      const z=c.localZ(p.z);
      c.pedestal(m,p.x,z,.82,read[i]===null?trim():0x7fe0c7);
      m.tube([p.x,.21,z],[p.x,1.06,z],.105,.097,ink(),9);
      m.oval(p.x,.93,z,.28,.24,.28,0x55c9c9,0,1,9);
      if(ping?.i===i&&time-ping.at<1.08)for(let j=0;j<3;j++){
        const f=((time-ping.at)+j*.23)/1.10;
        if(f<1)c.ring(m,p.x,.12+j*.02,z,.28+f*2.15,0x76f8db,.033*(1-f)+.010);
      }
    });
  }
  function tap(p){
    const i=sensors.findIndex(v=>Math.hypot(p.x-v.x,p.z-v.z)<.56);
    if(i<0)return false;sensing(i);return true;
  }
  return {start,draw,tap};
}

function makeSecondTask(c,q){
  let depth=0,y=0,picked=[],seen=false;
  const x=[-2.23,2.23,0],z=[-.39,-1.48,-2.75];
  const level=n=>.34+n*.67;
  function read(){c.flyTo(0,2.63,()=>{seen=true;c.tone();update();});}
  function adjust(n){
    depth=clamp(depth+n,0,3);c.tone([285+depth*85],.067,.078);update();
  }
  function take(i){
    if(depth!==q.depths[i]){c.mistake("Match the diver to the ledge height");return;}
    c.flyTo(x[i],z[i],()=>{
      picked.push(i);
      c.pulse([x[i],level(depth),z[i]],0x83ead3,19);
      if(picked.length===q.depths.length){c.receive([x[i],level(depth)*.38,z[i]]);return;}
      c.feedback(true,"Sample recovered");update();
    });
  }
  function update(){
    c.objective(seen?q.goalText:"Read the depth markers");
    c.meter(seen?"Ledge "+depth+" · "+picked.length+"/"+q.depths.length+" samples":"");
    if(!seen)c.marker("read","Read marker",[0,.66,2.63],read,{kind:"clue"});
    else {
      c.off("read");
      c.tool("rise","Rise",()=>adjust(1),depth>=3);
      c.tool("dive","Dive",()=>adjust(-1),depth<=0);
    }
    q.depths.forEach((d,i)=>{
      if(seen&&!picked.includes(i))c.marker("sample"+i,"Sample "+d,[x[i],level(d)+.49,z[i]],()=>take(i),{kind:d===depth?"good":"clue"});
      else c.off("sample"+i);
    });
  }
  function start(){depth=0;y=0;picked=[];seen=false;c.player.lift=0;update();}
  function tick(dt){y=lerp(y,.67*depth,1-Math.exp(-dt*8));c.player.lift=y;}
  function draw(m){
    q.depths.forEach((d,i)=>{
      const a=x[i],b=c.localZ(z[i]),h=level(d);
      m.tube([a,.02,b],[a,h,b],.082,.072,trim(),8);
      m.box(a,h,b,1.28,.19,.89,ink());
      if(!picked.includes(i))c.item(m,q.object,a,h+.11,b,.97,depth===d?0x85dfc9:bright());
      if(depth===d)c.ring(m,a,h+.122,b,.61,0x8cf1ce);
    });
    if(!seen)c.item(m,"idol",0,.05,c.localZ(2.67),.92,bright());
  }
  return {start,tick,draw};
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
