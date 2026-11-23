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
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "◇",
          "Align the shards"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "◇",
          "Align the shards"
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
            "thin": [
              [
                2,
                3
              ],
              [
                3,
                2
              ],
              [
                3,
                1
              ],
              [
                1,
                1
              ]
            ],
            "object": "ice",
            "blockHint": "Crevasse · find solid ice",
            "award": "Polar Signet"
          },
          {
            "kind": "maze",
            "title": "Glacier Crevasses",
            "goalText": "Navigate around the ice fissure markers",
            "start": [
              2,
              3
            ],
            "exit": [
              0,
              0
            ],
            "blocks": [
              [
                2,
                2
              ],
              [
                1,
                2
              ],
              [
                1,
                0
              ],
              [
                3,
                1
              ]
            ],
            "thin": [
              [
                1,
                3
              ],
              [
                0,
                2
              ],
              [
                0,
                1
              ],
              [
                2,
                1
              ]
            ],
            "object": "ice",
            "blockHint": "Crevasse · find solid ice",
            "award": "Polar Signet"
          },
          {
            "kind": "maze",
            "title": "Glacier Crevasses",
            "goalText": "Navigate around the ice fissure markers",
            "start": [
              0,
              2
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
                1,
                1
              ],
              [
                3,
                1
              ],
              [
                2,
                3
              ]
            ],
            "thin": [
              [
                0,
                1
              ],
              [
                1,
                0
              ],
              [
                2,
                0
              ],
              [
                2,
                2
              ]
            ],
            "object": "ice",
            "blockHint": "Crevasse · find solid ice",
            "award": "Polar Signet"
          }
        ]
      }
    ],
    [
      {
        "kind": "lattice",
        "guide": [
          "◎",
          "Line up the rings"
        ],
        "runs": [
          {
            "kind": "lattice",
            "title": "Ice Rosette Gate",
            "goalText": "Align the linked ice rings with their markers",
            "target": [
              2,
              1,
              4
            ],
            "links": [
              1,
              2,
              -1
            ],
            "award": "Aurora Shard"
          },
          {
            "kind": "lattice",
            "title": "Ice Rosette Gate",
            "goalText": "Align the linked ice rings with their markers",
            "target": [
              4,
              2,
              3
            ],
            "links": [
              -1,
              0,
              1
            ],
            "award": "Aurora Shard"
          },
          {
            "kind": "lattice",
            "title": "Ice Rosette Gate",
            "goalText": "Align the linked ice rings with their markers",
            "target": [
              1,
              5,
              2
            ],
            "links": [
              2,
              -1,
              1
            ],
            "award": "Aurora Shard"
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "aurora",
    "title": "Aurora lens revealed",
    "summary": "Three ice shards focus the aurora into one lens.",
    "pieces": [
      "ice",
      "ice",
      "ice"
    ],
    "prize": "ice"
  },
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
      "thin": [
        [
          2,
          3
        ],
        [
          3,
          2
        ],
        [
          3,
          1
        ],
        [
          1,
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
      "goalText": "Align the linked ice rings with their markers",
      "target": [
        2,
        1,
        4
      ],
      "links": [
        1,
        2,
        -1
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

function makeSpecialTask(c,scenario){
  const safe=[[0,2,1],[2,1,0],[1,0,2]][scenario],names=["left","middle","right"];
  const x=i=>(i-1)*1.59,z=i=>2.12-i*1.64;
  let row=0,probe=-1;
  function step(){
    if(probe!==safe[row]){c.mistake("Probe again for solid ice");return;}
    c.flyTo(x(probe),z(row),()=>{
      c.pulse([x(probe),.13,z(row)],0xa5e9ef,16);probe=-1;row++;
      if(row===safe.length){c.receive([0,0,-2.31]);return;}
      update();
    });
  }
  function update(){
    c.objective(probe===-1?"Probe for solid ice":probe===safe[row]?"Solid ice · step here":"Thin ice · probe another slab");
    c.meter((row+1)+"/"+safe.length+" ice shelves");
    for(let i=0;i<3;i++)c.marker("probe"+i,"Probe "+names[i],[x(i),.21,z(row)],()=>{probe=i;c.tone([i===safe[row]?578:230]);update();},
      {tile:true,caption:probe===i?(i===safe[row]?"✓":"×"):"·"});
    if(probe===safe[row])c.marker("step","Step onto solid ice",[x(probe),.48,z(row)-.27],step,{kind:"good"});
    else c.off("step");
  }
  function draw(m){
    for(let r=0;r<3;r++)for(let i=0;i<3;i++){
      const selected=r===row&&probe===i;
      m.box(x(i),.095,c.localZ(z(r)),1.46,.18,1.42,selected?(i===safe[r]?0x99dacd:0xb08fb1):0x94b3cc,0,6);
      if(selected&&i!==safe[r])for(let j=0;j<3;j++)
        m.box(x(i)+(j-1)*.19,.201,c.localZ(z(r)+.16*j),.26,.011,.03,0x586782,j*.73);
    }
  }
  return {start:update,draw};
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

function make_lattice(c,q){
  let rings=[],angles=[],active=false,turning=0;
  const rad=[.53,.98,1.48],hues=[0x8ed5d4,0xa8a0df,0xf0bc86];
  const names=["Inner","Middle","Outer"];
  const fit=()=>rings.every((v,i)=>v===q.target[i]);
  function turn(i){
    const driven=q.links[i];
    rings[i]=(rings[i]+1)%6;
    if(driven>=0)rings[driven]=(rings[driven]+1)%6;
    turning=c.clock()+.29;c.tone([326+i*92+rings[i]*22]);update();
  }
  function see(){c.flyTo(0,1.90,()=>{active=true;c.tone([341,520]);update();});}
  function update(){
    c.objective(!active?"Inspect the ice rosette":fit()?"All notches meet the cut marks":"Turn the concentric ice rings");
    c.meter(active?q.links.map((j,i)=>j<0?null:names[i]+"→"+names[j]).filter(Boolean).join(" · "):"");
    if(!active)c.marker("read","Inspect rosette",[0,.63,2.59],see,{kind:"clue"});else c.off("read");
    if(active)for(let i=0;i<3;i++){
      const angle=(i-1)*1.57;
      c.marker("turn"+i,names[i]+" ring",
        [Math.sin(angle)*rad[i],.40,Math.cos(angle)*rad[i]-.61],()=>turn(i),
        {kind:rings[i]===q.target[i]?"good":"clue",caption:names[i],disabled:!!turning});
    }
    if(fit())c.marker("cache","Lift ice prism",[0,.77,-2.51],()=>c.flyTo(0,-2.09,()=>c.receive([0,0,-2.54])),{kind:"hot",disabled:!!turning});else c.off("cache");
  }
  function start(){rings=[0,0,0];angles=[0,0,0];active=false;turning=0;update();}
  function tick(dt){
    angles=angles.map((v,i)=>{
      const d=rings[i]/6*TAU-v;
      return v+Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*9);
    });
    if(turning&&c.clock()>=turning){turning=0;update();}
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
    q.links.forEach((to,i)=>{
      if(to<0)return;
      const a=1.4+i*.80;
      const at=r=>[Math.sin(a)*r,.36,z+Math.cos(a)*r];
      m.tube(at(rad[i]),at(rad[to]),.036,.036,hues[i],6,1);
    });
    c.pedestal(m,0,c.localZ(-2.51),1.36,trim());
    c.item(m,"ice",0,.23,c.localZ(-2.51),1.07,0xacc9f3);
  }
  return {start,tick,draw};
}

const taskFactories = {maze:make_maze, lattice:make_lattice};
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
