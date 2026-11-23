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
    "Wreck chart · West",
    "Wreck chart · Centre",
    "Wreck chart · East"
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
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "◉",
          "Ping the hydrophones"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "◉",
          "Ping the hydrophones"
        ]
      }
    ],
    [
      {
        "kind": "depth",
        "guide": [
          "↕",
          "Sample the reef ledges"
        ],
        "runs": [
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
            "kind": "depth",
            "title": "Coral Depth Ledges",
            "goalText": "Adjust buoyancy to sample the three reef ledges",
            "depths": [
              3,
              2,
              1
            ],
            "object": "shell",
            "award": "Amber Reef Sample"
          },
          {
            "kind": "depth",
            "title": "Coral Depth Ledges",
            "goalText": "Adjust buoyancy to sample the three reef ledges",
            "depths": [
              2,
              1,
              3
            ],
            "object": "shell",
            "award": "Amber Reef Sample"
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
            "currents": [
              [
                [
                  2,
                  2
                ],
                [
                  0,
                  -1
                ]
              ],
              [
                [
                  2,
                  1
                ],
                [
                  -1,
                  0
                ]
              ]
            ],
            "object": "rock",
            "blockHint": "Coral blocks that channel",
            "award": "Sunken Crown"
          },
          {
            "kind": "maze",
            "title": "Sponge Current Tunnels",
            "goalText": "Steer through the clear reef channel",
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
                2,
                2
              ],
              [
                0,
                1
              ],
              [
                3,
                2
              ]
            ],
            "currents": [
              [
                [
                  1,
                  2
                ],
                [
                  0,
                  -1
                ]
              ],
              [
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ]
              ]
            ],
            "object": "rock",
            "blockHint": "Coral blocks that channel",
            "award": "Sunken Crown"
          },
          {
            "kind": "maze",
            "title": "Sponge Current Tunnels",
            "goalText": "Steer through the clear reef channel",
            "start": [
              0,
              0
            ],
            "exit": [
              3,
              3
            ],
            "blocks": [
              [
                0,
                1
              ],
              [
                1,
                2
              ],
              [
                2,
                0
              ],
              [
                1,
                3
              ]
            ],
            "currents": [
              [
                [
                  1,
                  1
                ],
                [
                  1,
                  0
                ]
              ],
              [
                [
                  2,
                  1
                ],
                [
                  0,
                  1
                ]
              ]
            ],
            "object": "rock",
            "blockHint": "Coral blocks that channel",
            "award": "Sunken Crown"
          }
        ]
      },
      {
        "kind": "climax",
        "guide": [
          "≈",
          "Keep air in reserve"
        ]
      }
    ]
  ],
  "ending": {
    "kind": "chart",
    "title": "Wreck cache uncovered",
    "summary": "Three chart fragments mark the wreck’s pearl cache.",
    "pieces": [
      "shell",
      "coin",
      "shell"
    ],
    "prize": "shell"
  },
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
      "currents": [
        [
          [
            2,
            2
          ],
          [
            0,
            -1
          ]
        ],
        [
          [
            2,
            1
          ],
          [
            -1,
            0
          ]
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
      if(read[i]!==null){
        const strength=clamp(Math.round((read[i]-14)/11),1,6);
        for(let j=0;j<6;j++){
          const h=.09+j*.065;
          m.box(p.x+(j-2.5)*.121,1.19+h*.5,z+.175,.084,h,.048,
            j<strength?0x95f4d2:0x315b69,0,j<strength?1:0);
        }
      }
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

function makeSpecialTask(c,scenario){
  const positions=[[-2.16,1.76],[2.16,1.76]];
  const wreck=[0,-1.31,1.31][scenario],goals=[[1,1],[0,2],[2,0]][scenario];
  let bearings=[0,0];
  function update(){
    c.objective("Aim both sonar beams at the wreck");
    positions.forEach(([x,z],i)=>c.marker("sonar"+i,i===0?"Turn west sonar":"Turn east sonar",[x,.82,z],()=>{
      bearings[i]=(bearings[i]+1)%3;c.tone([301+i*95,495]);update();
    },{kind:"clue",caption:"Turn"}));
    c.marker("mark","Mark wreck",[wreck,.78,-2.48],()=>{
      if(bearings.some((v,i)=>v!==goals[i])){c.mistake("Both beams must meet on the wreck marker");return;}
      c.flyTo(wreck,-2.03,()=>c.receive([wreck,0,-2.46]));
    },{kind:"hot"});
  }
  function draw(m){
    const z=c.localZ;
    positions.forEach(([x,p],i)=>{
      c.pedestal(m,x,z(p),.85,trim());
      m.oval(x,.72,z(p),.28,.25,.30,0x86e6d4,0,1,9);
      const land=bearings[i]===goals[i]?wreck:(bearings[i]-1)*1.76+(i===0?-.39:.39);
      m.tube([x,.79,z(p)],[land,.19,z(-2.50)],.029,.021,i===0?0x91e9d4:0xa2bde9,7,1);
    });
    c.item(m,"shell",wreck,.05,z(-2.48),1.12,0xefbe88);
    ring(m,wreck,.07,z(-2.48),.60,0xffda99,.035);
  }
  return {start:update,draw};
}

function make_depth(c,q){
  let depth=0,y=0,picked=[],seen=false;
  const x=[-2.23,2.23,0],z=[-.39,-1.48,-2.75];
  const level=n=>.34+n*.67;
  function read(){c.flyTo(0,2.63,()=>{seen=true;c.tone();update();});}
  function adjust(n){
    depth=clamp(depth+n,0,3);c.tone([285+depth*85],.067,.078);update();
  }
  function take(i){
    if(depth!==q.depths[i]){c.mistake("Match your height to the ledge");return;}
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
    c.objective(q.pickup&&!picked?"Scan at the desk before pickup":q.thin?"Cracked ice breaks behind you":
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

const taskFactories = {depth:make_depth, maze:make_maze};
function makeFinalTrial(c,scenario){
  const routes=[
    {air:7,cost:[5,5,3],fill:5},{air:8,cost:[7,6,3],fill:6},{air:6,cost:[4,5,2],fill:4}
  ][scenario];
  let air=routes.air,vent=false,stage=0;
  function swim(exit){
    const fee=exit?routes.cost[2]:routes.cost[vent?0:1];
    if(air-fee<1){c.mistake("Keep one bar of air in reserve");return;}
    const [x,z]=exit?[0,-2.79]:vent?[2.36,-.88]:[-2.33,.83];
    c.flyTo(x,z,()=>{
      air-=fee;c.pulse([x,.56,z],0x9ee5d8,16);
      if(exit){c.receive([x,0,z]);return;}
      stage=1;update();
    });
  }
  function update(){
    c.objective(stage===0?"Plan the dive with enough reserve":"Reach the hatch with air left");
    c.meter("Air "+air+" · reserve 1");
    if(stage===0){
      c.marker("direct","Direct tunnel",[-2.33,.72,.83],()=>{vent=false;swim(false);},{kind:"hot",caption:"Direct −"+routes.cost[1]});
      c.marker("vent","Vent detour",[2.36,.70,-.88],()=>{vent=true;swim(false);},{kind:"clue",caption:"Vent −"+routes.cost[0]});
    }else {c.off("direct");c.off("vent");}
    if(stage===1&&vent)c.marker("fill","Refill at vent",[2.36,.82,-.88],()=>{
      air+=routes.fill;vent=false;c.pulse([2.36,.72,-.88],0x91f0d8,20);update();
    },{kind:"clue",caption:"Refill +"+routes.fill});else c.off("fill");
    if(stage===1)c.marker("exit","Swim to hatch",[0,.80,-2.79],()=>swim(true),{kind:"hot",caption:"Hatch −"+routes.cost[2]});
    else c.off("exit");
    if(stage===1&&!vent&&air-routes.cost[2]<1)c.marker("back","Return to fork",[-2.33,.74,1.80],()=>{
      air=routes.air;stage=0;update();
    },{kind:"clue"});
    else c.off("back");
  }
  function draw(m,t){
    const z=c.localZ;
    for(const [x,y] of [[-2.32,.83],[2.36,-.88],[0,-2.79]]){
      ring(m,x,.08,z(y),.57,x===2.36?0x89edda:0xe6c384,.038);
      m.box(x,.16,z(y),1.04,.26,.98,trim(),0,9);
    }
    for(let i=0;i<6;i++){
      const p=(t*.64+i*.17)%1;
      m.oval(2.34+Math.sin(i)*.13,.30+p*1.20,z(-.88+i*.02),.045,.055,.045,0xa8e7d9,0,1,7);
    }
    c.item(m,"box",0,.28,z(-2.79),1.06,bright());
  }
  return {start:update,draw};
}

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
    get hideAgent(){return active.hideAgent;},
    draw(m,t){active.draw(m,t);},
    tick(dt,t){active.tick?.(dt,t);},
    tap(p){return active.tap?.(p);},
    swipe(p){return active.swipe?.(p);},
    dragEnd(p){active.dragEnd?.(p);},
    key(k){return active.key?.(k);}
  };
}
