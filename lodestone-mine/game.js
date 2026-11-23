"use strict";

const GAME = {
  "title": "Lodestone Mine",
  "brief": "hunt",
  "look": "mine",
  "avatar": "explorer",
  "zones": [
    "Copper Landing",
    "Ore Sorting Silo",
    "Electric Lift Room"
  ],
  "awards": [
    "Copper Seal",
    "Iron Key",
    "Magnet Crown"
  ],
  "awardShape": "key",
  "palette": {
    "sky": 5003625,
    "haze": 14007451,
    "tile": 12297352,
    "tile2": 11113856,
    "ink": 4210764,
    "trim": 9798255,
    "accent": 7493182,
    "loot": 15711606,
    "css": "#72563e"
  },
  "passages": [
    "Enter Ore Sorting Silo",
    "Enter Electric Lift Room"
  ],
  "scene": "mine",
  "footprint": "long",
  "connector": "rail",
  "camera": [
    0.43,
    0.71,
    1.05,
    -0.11
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
      -9.0,
      -3.68,
      0
    ],
    [
      0,
      -18.0,
      -7.04,
      0
    ]
  ],
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "↔",
          "Move the metal key"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "↔",
          "Move the metal key"
        ]
      }
    ],
    [
      {
        "kind": "sort",
        "guide": [
          "⇄",
          "Match items to bins"
        ],
        "runs": [
          {
            "kind": "sort",
            "title": "Ore Sorting Silo",
            "goalText": "Sort the ore by whether a magnet can pull it",
            "name": "sample",
            "bins": [
              "Magnetic ore",
              "Nonmagnetic ore"
            ],
            "items": [
              [
                "Iron",
                "rock",
                0
              ],
              [
                "Quartz",
                "gem",
                1
              ],
              [
                "Steel",
                "key",
                0
              ]
            ],
            "magnet": true,
            "award": "Iron Key"
          },
          {
            "kind": "sort",
            "title": "Ore Sorting Silo",
            "goalText": "Sort the ore by whether a magnet can pull it",
            "name": "sample",
            "bins": [
              "Magnetic ore",
              "Nonmagnetic ore"
            ],
            "items": [
              [
                "Lodestone",
                "magnet",
                0
              ],
              [
                "Iron",
                "rock",
                0
              ],
              [
                "Quartz",
                "gem",
                1
              ],
              [
                "Steel",
                "key",
                0
              ]
            ],
            "magnet": true,
            "award": "Iron Key"
          },
          {
            "kind": "sort",
            "title": "Ore Sorting Silo",
            "goalText": "Sort the ore by whether a magnet can pull it",
            "name": "sample",
            "bins": [
              "Magnetic ore",
              "Nonmagnetic ore"
            ],
            "items": [
              [
                "Amber",
                "gem",
                1
              ],
              [
                "Quartz",
                "gem",
                1
              ],
              [
                "Steel",
                "key",
                0
              ],
              [
                "Iron",
                "rock",
                0
              ]
            ],
            "magnet": true,
            "award": "Iron Key"
          }
        ]
      }
    ],
    [
      {
        "kind": "connect",
        "guide": [
          "⤾",
          "Connect the sections"
        ],
        "runs": [
          {
            "kind": "connect",
            "title": "Electric Lift Room",
            "goalText": "Turn the contacts to bridge the live circuit",
            "start": [
              0,
              0,
              0
            ],
            "target": [
              3,
              2,
              1
            ],
            "links": [
              1,
              2,
              -1
            ],
            "finalText": "Circuit complete · run the lift",
            "finish": "Power lift",
            "object": "magnet",
            "award": "Magnet Crown"
          },
          {
            "kind": "connect",
            "title": "Electric Lift Room",
            "goalText": "Turn the contacts to bridge the live circuit",
            "start": [
              1,
              0,
              2
            ],
            "target": [
              0,
              0,
              0
            ],
            "links": [
              1,
              2,
              -1
            ],
            "finalText": "Circuit complete · run the lift",
            "finish": "Power lift",
            "object": "magnet",
            "award": "Magnet Crown"
          },
          {
            "kind": "connect",
            "title": "Electric Lift Room",
            "goalText": "Turn the contacts to bridge the live circuit",
            "start": [
              2,
              3,
              0
            ],
            "target": [
              1,
              2,
              3
            ],
            "links": [
              1,
              2,
              -1
            ],
            "finalText": "Circuit complete · run the lift",
            "finish": "Power lift",
            "object": "magnet",
            "award": "Magnet Crown"
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "lift",
    "title": "Mine hoard raised",
    "summary": "The repaired circuit powers the treasure lift.",
    "pieces": [
      "key",
      "gear",
      "magnet"
    ],
    "prize": "gem"
  },
  "tasks": [
    {
      "kind": "sort",
      "title": "Ore Sorting Silo",
      "goalText": "Sort the ore by whether a magnet can pull it",
      "name": "sample",
      "bins": [
        "Magnetic ore",
        "Nonmagnetic ore"
      ],
      "items": [
        [
          "Iron",
          "rock",
          0
        ],
        [
          "Quartz",
          "gem",
          1
        ],
        [
          "Steel",
          "key",
          0
        ]
      ],
      "magnet": true,
      "award": "Iron Key"
    },
    {
      "kind": "connect",
      "title": "Electric Lift Room",
      "goalText": "Turn the contacts to bridge the live circuit",
      "start": [
        0,
        0,
        0
      ],
      "target": [
        3,
        2,
        1
      ],
      "links": [
        1,
        2,
        -1
      ],
      "finalText": "Circuit complete · run the lift",
      "finish": "Power lift",
      "object": "magnet",
      "award": "Magnet Crown"
    }
  ],
  "form": "lift",
  "controls": [
    "world",
    "world",
    "world"
  ],
  "views": [
    [
      0.21,
      0.43,
      1.02,
      0.05,
      0.89
    ],
    [
      -0.36,
      0.62,
      0.96,
      -0.13,
      0.86
    ],
    [
      0.43,
      0.81,
      0.92,
      -0.12,
      0.83
    ]
  ]
};

function makeFirstTask(c){
  const paths=[{start:1,goal:4,gate:null},{start:4,goal:0,gate:2},{start:0,goal:3,gate:1,reverse:true}];
  const x=n=>(n-2)*1.23,z=-.44;
  let plan,slider=0,travel=null,pull=true,unlatched=false,seen=false;
  function read(){
    c.flyTo(0,2.52,()=>{seen=true;c.tone();controls();});
  }
  function nudge(side){
    if(travel)return;
    const swap=plan.reverse&&slider>=2;
    const dir=(side===0?-1:1)*(pull?1:-1)*(swap?-1:1),to=clamp(slider+dir,0,4);
    if(to===slider){c.mistake("Rail end · try the other pole");return;}
    if(plan.gate!==null&&!unlatched&&Math.max(slider,to)===plan.gate+1&&Math.min(slider,to)===plan.gate){
      c.feedback(false,"Release the rail latch first");return;
    }
    travel={from:slider,to,side,at:c.clock()};
    c.tone([pull?276:402,534]);controls();
  }
  function tick(dt,t){
    if(!travel||t-travel.at<.42)return;
    slider=travel.to;
    travel=null;
    if(slider===plan.goal)c.pulse([x(slider),.44,z],0xffcb74,22);
    controls();
  }
  function controls(){
    c.objective(!seen?"Inspect the mine's magnet chart":slider===plan.goal?"Key in socket · open the vault":"Push or pull the key to the lit socket");
    c.meter(seen?plan.reverse&&slider>=2?"Ore zone reverses the poles":pull?"Pull toward the magnet":"Push away from the magnet":"");
    if(!seen)c.marker("chart","Inspect chart",[0,.65,2.58],read,{kind:"clue"});else c.off("chart");
    if(seen){
      c.tool("mode",pull?"Use push":"Use pull",()=>{pull=!pull;c.tone();controls();},!!travel);
      for(let id=0;id<2;id++)c.marker("pole"+id,(id===0?"West":"East")+" magnet",[id===0?-3.32:3.32,.74,z],()=>nudge(id),{kind:"clue",disabled:!!travel});
      if(plan.gate!==null&&!unlatched)c.marker("latch","Release latch",[0,.86,-1.87],()=>c.flyTo(0,-1.88,()=>{
        unlatched=true;c.feedback(true,"Rail latch open");controls();
      }),{kind:"hot"});
      else c.off("latch");
    }
    if(seen&&slider===plan.goal)c.marker("cache","Open mine vault",[.03,.66,-3.28],()=>c.flyTo(.03,-2.88,()=>c.receive([0,0,-3.31])),{kind:"hot"});
    else c.off("cache");
  }
  function start(i){plan=paths[i];slider=plan.start;seen=false;pull=true;unlatched=false;travel=null;controls();}
  function draw(m,time){
    const rz=c.localZ(z);
    m.box(0,.13,rz,6.12,.20,.78,ink());
    m.box(0,.235,rz,5.96,.044,.54,0x9ea7ac);
    for(let i=0;i<5;i++)m.box(x(i),.26,rz,.063,.030,.59,trim());
    c.ring(m,x(plan.goal),.309,rz,.39,0xf5c878,.03);
    if(plan.reverse)m.box(x(2)+.62,.281,rz,.065,.024,.64,0xa88be1,0,1);
    for(const i of [-1,1])c.item(m,"magnet",i*3.33,.21,rz,1.05,i===1?0x82b8d6:0xd77b70);
    if(plan.gate!==null&&!unlatched)m.box(x(plan.gate)+.61,.56,rz,.14,.74,.71,0xce875e);
    const t=travel?curve((time-travel.at)/.42):0,pos=travel?lerp(travel.from,travel.to,t):slider;
    c.item(m,"key",x(pos),.30,rz,1.06,0xffd38b,time*.25);
    if(travel){
      const sx=travel.side===0?-3.24:3.24;
      m.tube([sx,.57,rz],[x(pos),.49,rz],.018,.011,pull?0x83efd1:0xf5a275,5,1);
    }
    c.pedestal(m,0,c.localZ(-3.31),1.34,trim());
    if(!c.hasAward())c.item(m,"box",0,.21,c.localZ(-3.31),1.02,0xb59771);
    if(!seen)c.item(m,"idol",0,.19,c.localZ(2.58),.82,bright());
  }
  return {start,tick,draw};
}

function makeSpecialTask(c,scenario){
  const need=[[1,0,1],[1,1,0],[0,1,1]][scenario];
  let coils=[0,0,0];
  const polarity=v=>v?"+":"−";
  function update(){
    c.objective("Set the coil poles to the etched signs");
    c.meter(need.map(polarity).join(" · "));
    coils.forEach((v,i)=>c.marker("coil"+i,"Flip coil "+(i+1),[(i-1)*1.72,.74,.45],()=>{
      coils[i]=1-v;c.tone([v?297:453]);update();
    },{kind:"clue",caption:polarity(v)}));
    c.marker("power","Pulse the rail",[0,.84,-2.46],()=>{
      if(coils.some((v,i)=>v!==need[i])){c.mistake("Check the etched pole signs");return;}
      c.flyTo(0,-2.04,()=>c.receive([0,0,-2.43]));
    },{kind:"hot"});
  }
  function draw(m){
    const z=c.localZ;
    coils.forEach((v,i)=>{
      const x=(i-1)*1.72;
      c.item(m,"magnet",x,.08,z(.44),1.14,v?0xc88376:0x93b7ce,v?Math.PI:0);
      m.box(x,.47,z(-1.41),.57,.095,.69,need[i]?0xcc8e7e:0x93b7ce,0,1);
      if(need[i])m.box(x,.54,z(-1.41),.078,.041,.46,0xf8d6bc,0,1);
      m.box(x,.54,z(-1.41),.42,.041,.075,0xf8d6bc,0,1);
    });
    c.item(m,"key",0,.06,z(-2.39),1.15,bright());
  }
  return {start:update,draw};
}

function make_sort(c,q){
  const x=[-2.47,2.47];
  let index=0,held=false,settled=[],tested=false;
  function grab(){c.flyTo(0,1.80,()=>{held=true;c.tone([315,498]);update();});}
  function drop(side){
    c.flyTo(x[side],-.88,()=>{
      const part=q.items[index];
      if(side!==part[2]){c.mistake("Look at the label and choose another bin");return;}
      settled.push({side,part:index});held=false;tested=false;index++;
      c.pulse([x[side],.48,-1.68],bright(),18);
      if(index===q.items.length){c.receive([x[side],0,-2.42]);return;}
      c.feedback(true,"Item accepted");update();
    });
  }
  function update(){
    c.objective(held?(q.magnet&&!tested?"Bring the sample to the magnet":q.goalText):"Pick up the next "+q.name.toLowerCase());
    c.meter(index+"/"+q.items.length+" · "+(q.magnet&&tested?(q.items[index][2]===0?"Pulled by magnet":"No movement"):q.items[index][0]));
    if(!held)c.marker("grab","Pick "+q.items[index][0],[0,.78,1.94],grab,{kind:"clue"});else c.off("grab");
    if(q.magnet&&held&&!tested)c.marker("probe","Test with magnet",[0,.81,-.15],()=>c.flyTo(0,.19,()=>{
      tested=true;c.tone(q.items[index][2]===0?[312,553,783]:[315]);
      if(q.items[index][2]===0)c.pulse([0,.93,-.14],0xa8d7ed,18);update();
    }),{kind:"clue"});
    else c.off("probe");
    q.bins.forEach((name,i)=>{if(held&&(!q.magnet||tested))c.marker("bin"+i,name,[x[i],.77,-1.65],()=>drop(i),{kind:"hot"});else c.off("bin"+i);});
  }
  function start(){index=0;held=false;tested=false;settled=[];update();}
  function draw(m){
    const z=c.localZ;
    for(let i=0;i<2;i++){
      m.box(x[i],.11,z(-1.61),1.42,.21,1.33,ink());
      m.box(x[i],.32,z(-1.61),1.27,.34,1.14,i?0x78baa5:0xd79868);
      m.box(x[i],.51,z(-1.61),1.03,.043,.93,trim());
    }
    settled.forEach(({side,part},i)=>c.item(m,q.items[part][1],x[side]+(i%2-.5)*.50,.54,z(-1.67),.50,i%2?0xf1bb6b:bright()));
    const item=q.items[index];
    if(!item)return;
    if(q.magnet)c.item(m,"magnet",0,.34,z(-.15),1.0,tested&&item[2]===0?0xa8e8ec:trim());
    c.pedestal(m,0,z(1.94),1.36,trim());
    c.item(m,item[1],held?c.player.x:0,held?.76:.24,held?c.player.z:z(1.94),1.1,!held?bright():0xf0bb73);
  }
  return {start,draw};
}

function make_connect(c,q){
  const spots=[[-1.88,1.66],[1.60,.03],[-.61,-2.28]];
  const palette=[0xefbb7e,0x7eb986,0x89c8df,0xc6a2df];
  let stops=[],shown=[],cleared=false;
  const fixed=()=>stops.every((v,i)=>v===q.target[i]);
  function turn(i){
    if(q.ordered&&stops.slice(0,i).some((v,j)=>v!==q.target[j])){c.feedback(false,"Open the upstream section first");return;}
    stops[i]=(stops[i]+1)%4;
    const linked=q.links?.[i];
    if(linked>=0)stops[linked]=(stops[linked]+1)%4;
    c.tone([275+stops[i]*87],.056,.10);
    if(stops[i]===q.target[i])c.pulse([spots[i][0],.21,spots[i][1]],palette[i],11);
    refresh();
  }
  function refresh(){
    c.objective(fixed()?q.finalText:q.goalText);
    c.meter(q.links?"A also turns B · B turns C":q.ordered?"Upstream A → B → outlet C":
      stops.filter((n,i)=>n===q.target[i]).length+"/3 sections connected");
    spots.forEach(([x,z],i)=>c.marker("piece"+i,"Turn "+String.fromCharCode(65+i),[x,.58,z],()=>turn(i),{kind:stops[i]===q.target[i]?"good":"clue"}));
    if(fixed())c.marker("switch",q.finish,[0,.71,-3.46],()=>{
      cleared=true;c.flyTo(0,-3.20,()=>c.receive([0,0,-3.49]));
    },{kind:"hot"});else c.off("switch");
  }
  function start(){stops=q.start.slice();shown=stops.map(n=>n*Math.PI*.5);cleared=false;refresh();}
  function tick(dt){shown=shown.map((v,i)=>lerp(v,stops[i]*Math.PI*.5,1-Math.exp(-dt*11)));}
  function draw(m,t){
    const z=c.localZ, nodes=[[-.14,3.48],...spots,[0,-3.52]];
    for(let i=1;i<nodes.length;i++){
      const a=nodes[i-1],b=nodes[i],live=stops.slice(0,i-1).every((n,j)=>n===q.target[j]);
      m.tube([a[0],.16,z(a[1])],[b[0],.16,z(b[1])],.058,.057,live?palette[Math.min(i,3)]:ink(),8,live?1:0);
    }
    spots.forEach(([x,s],i)=>{
      c.pedestal(m,x,z(s),1.11,trim());
      const angle=shown[i],lit=stops[i]===q.target[i];
      const u=Math.sin(angle),v=Math.cos(angle);
      m.box(x,.47,z(s),.74,.17,.21,lit?palette[i]:GAME.palette.accent,angle,1);
      m.tube([x,.46,z(s)],[x+u*.64,.46,z(s)+v*.64],.078,.044,lit?palette[i]:0xb58a67,8,1);
      const to=q.links?.[i];
      if(to>=0)m.tube([x,.26,z(s)],[spots[to][0],.26,z(spots[to][1])],.022,.022,palette[i],6,1);
    });
    c.item(m,q.object,0,.04,z(-3.55),1.1,cleared?0x98dfb4:bright());
  }
  return {start,tick,draw};
}

const taskFactories = {sort:make_sort, connect:make_connect};
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
