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
      0.16,
      0.68,
      0.99,
      0.05,
      0.87
    ],
    [
      0.06,
      1.03,
      0.94,
      0.04,
      0.84
    ],
    [
      -0.12,
      0.96,
      0.93,
      -0.09,
      0.83
    ]
  ]
};

function makeFirstTask(c){
  const paths=[{start:1,goal:4,gate:null},{start:4,goal:0,gate:2},{start:0,goal:3,gate:1,reverse:true}];
  const x=n=>(n-2)*1.23,z=-.44;
  let plan,slider=0,travel=null,pull=true,unlatched=false,seen=false,firstMove=false;
  const direction=side=>(side===0?-1:1)*(pull?1:-1)*(plan.reverse&&slider>=2?-1:1);
  function read(){
    c.flyTo(0,2.52,()=>{seen=true;c.tone();controls();});
  }
  function nudge(side){
    if(travel)return;
    const to=clamp(slider+direction(side),0,4);
    if(to===slider){c.mistake("Rail end · try the other pole");return;}
    if(plan.gate!==null&&!unlatched&&Math.max(slider,to)===plan.gate+1&&Math.min(slider,to)===plan.gate){
      c.feedback(false,"Release the rail latch first");return;
    }
    travel={from:slider,to,side,at:c.clock()};
    firstMove=false;
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
    const ready=seen&&slider===plan.goal;
    c.objective(!seen?"Find the vault key":ready?"Open the vault":"Key to the gold ring");
    c.meter(seen&&!ready?(plan.reverse&&slider>=2?"Ore here reverses the magnets":firstMove?"Tap a magnet":""):"");
    if(!seen)c.marker("chart","Inspect chart",[0,.68,2.58],read,{kind:"hot",caption:"Tap mine chart"});else c.off("chart");
    if(seen){
      c.tool("mode",pull?"Use push":"Use pull",()=>{pull=!pull;c.tone();controls();},!!travel);
      for(let id=0;id<2;id++){
        const dir=direction(id),arrow=dir<0?"←":"→";
        c.marker("pole"+id,(id===0?"West":"East")+" magnet",[id===0?-3.32:3.32,.74,z],()=>nudge(id),
          {kind:"clue",caption:(pull?"Pull ":"Push ")+arrow,disabled:!!travel});
      }
      if(plan.gate!==null&&!unlatched)c.marker("latch","Release latch",[0,.86,-1.87],()=>c.flyTo(0,-1.88,()=>{
        unlatched=true;c.feedback(true,"Rail latch open");controls();
      }),{kind:"hot"});
      else c.off("latch");
    }
    if(seen&&slider===plan.goal)c.marker("cache","Open mine vault",[.03,.66,-3.28],()=>c.flyTo(.03,-2.88,()=>c.receive([0,0,-3.31])),{kind:"hot"});
    else c.off("cache");
  }
  function start(i){plan=paths[i];slider=plan.start;seen=false;pull=true;unlatched=false;travel=null;firstMove=i===0;controls();}
  function draw(m,time){
    const rz=c.localZ(z);
    m.box(0,.13,rz,6.12,.20,.78,ink());
    m.box(0,.235,rz,5.96,.044,.54,0x9ea7ac);
    for(let i=0;i<5;i++)m.box(x(i),.26,rz,.063,.030,.59,trim());
    c.ring(m,x(plan.goal),.309,rz,.34,slider===plan.goal?0xaff5ca:0xffd481,.062);
    if(seen&&firstMove){
      const dir=Math.sign(plan.goal-slider);
      for(let j=0;j<2;j++){
        const px=x(slider)+dir*(.72+j*.40),a=[px-dir*.12,.321,rz-.135],b=[px+dir*.045,.321,rz];
        m.tube(a,b,.022,.022,0xffd481,4,1);
        m.tube(b,[a[0],a[1],rz+.135],.022,.022,0xffd481,4,1);
      }
    }
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
    if(!seen){
      const chartZ=c.localZ(2.58);
      c.pedestal(m,0,chartZ,.82,trim());
      m.box(0,.34,chartZ,.76,.10,.56,0xd7aa73);
      m.box(0,.397,chartZ,.62,.016,.45,0xf7dfaf,0,1);
      m.box(0,.408,chartZ,.37,.014,.018,0x725840);
      c.ring(m,.21,.419,chartZ,.068,0xcc8a40,.020,10);
      m.box(-.22,.414,chartZ,.078,.015,.17,0xa07048);
    }
  }
  return {start,tick,draw};
}

function makeSpecialTask(c,scenario){
  const need=[[1,0,1],[1,1,0],[0,1,1]][scenario];
  let coils=[0,0,0];
  const polarity=v=>v?"+":"−";
  function update(){
    const matched=coils.every((v,i)=>v===need[i]);
    c.objective(matched?"Power the rail":"Match the coil signs");
    c.meter("");
    coils.forEach((v,i)=>c.marker("coil"+i,"Flip coil "+(i+1),[(i-1)*1.72,.22,1.03],()=>{
      coils[i]=1-v;c.tone([v?297:453]);update();
    },{tile:true,caption:polarity(v)}));
    c.marker("power","Pulse the rail",[0,.84,-2.46],()=>{
      if(coils.some((v,i)=>v!==need[i])){c.mistake("Check the etched pole signs");return;}
      c.flyTo(0,-2.04,()=>c.receive([0,0,-2.43]));
    },{kind:matched?"good":"hot",caption:"Power rail"});
  }
  function draw(m){
    const z=c.localZ;
    coils.forEach((v,i)=>{
      const x=(i-1)*1.72;
      c.item(m,"magnet",x,.08,z(.44),1.14,v?0xc88376:0x93b7ce,v?Math.PI:0);
      m.box(x,.13,z(1.03),.58,.11,.45,0xf6daa5);
      m.box(x,.17,z(-1.25),.83,.13,.80,v===need[i]?0x6a927d:0x6e5044);
      if(need[i])m.box(x,.254,z(-1.25),.09,.036,.52,0xffebc8,0,1);
      m.box(x,.254,z(-1.25),.52,.036,.09,0xffebc8,0,1);
    });
    c.item(m,"key",0,.06,z(-2.39),1.15,bright());
  }
  return {start:update,draw};
}

function make_sort(c,q){
  const x=[-2.47,2.47];
  const reaction=["Moves","Stays still"];
  let index=0,held=false,settled=[],testedAt=null;
  function grab(){c.flyTo(0,1.80,()=>{held=true;c.tone([315,498]);update();});}
  function drop(side){
    c.flyTo(x[side],-.88,()=>{
      const part=q.items[index];
      if(side!==part[2]){c.mistake("Match the magnet test to the bin");return;}
      settled.push({side,part:index});held=false;testedAt=null;index++;
      c.pulse([x[side],.48,-1.68],bright(),18);
      if(index===q.items.length){c.receive([x[side],0,-2.42]);return;}
      c.feedback(true);update();
    });
  }
  function update(){
    const tested=testedAt!==null,item=q.items[index];
    c.objective(!held?"Pick up a sample":tested?"Match the bin label":"Test with the magnet");
    c.meter(index+"/"+q.items.length+(tested?" · "+reaction[item[2]]:""));
    if(!held)c.marker("grab","Pick "+item[0],[0,.78,1.94],grab,{kind:"clue",caption:"Pick up "+item[0]});else c.off("grab");
    if(held&&!tested)c.marker("probe","Test with magnet",[0,.81,-.15],()=>c.flyTo(0,.54,()=>{
      testedAt=c.clock();
      c.tone(item[2]===0?[312,553,783]:[315]);
      update();
    }),{kind:"clue",caption:"Test magnet"});
    else c.off("probe");
    q.bins.forEach((name,i)=>{
      if(held&&tested)c.marker("bin"+i,name,[x[i],.77,-1.65],()=>drop(i),{kind:"hot",caption:reaction[i]});
      else c.off("bin"+i);
    });
  }
  function start(){index=0;held=false;testedAt=null;settled=[];update();}
  function draw(m,t){
    const z=c.localZ;
    for(let i=0;i<2;i++){
      m.box(x[i],.11,z(-1.61),1.42,.21,1.33,ink());
      m.box(x[i],.32,z(-1.61),1.27,.34,1.14,i?0x78baa5:0xd79868);
      m.box(x[i],.51,z(-1.61),1.03,.043,.93,trim());
    }
    settled.forEach(({side,part},i)=>c.item(m,q.items[part][1],x[side]+(i%2-.5)*.50,.54,z(-1.67),.50,i%2?0xf1bb6b:bright()));
    const item=q.items[index];
    if(!item)return;
    const testing=testedAt!==null&&t-testedAt<.78;
    const tug=testing&&item[2]===0?Math.sin(Math.PI*clamp((t-testedAt)/.78,0,1)):0;
    c.item(m,"magnet",0,.34,z(-.15),1.12,testing?0xa8e8ec:0xb87965);
    c.pedestal(m,0,z(1.94),1.36,trim());
    c.item(m,item[1],held?c.player.x:0,held?.76+tug*.19:.24,held?lerp(c.player.z,z(-.18),tug):z(1.94),1.1,!held?bright():0xf0bb73);
  }
  return {start,draw};
}

function make_connect(c,q){
  const spots=[[-1.88,1.66],[1.60,.03],[-.61,-2.28]];
  const palette=[0xefbb7e,0x7eb986,0x89c8df,0xc6a2df];
  let stops=[],shown=[],cleared=false;
  const aligned=i=>stops[i]%4===q.target[i];
  const fixed=()=>stops.every((_,i)=>aligned(i));
  function turn(i){
    stops[i]++;
    const linked=q.links[i];
    if(linked>=0)stops[linked]++;
    c.tone([275+(stops[i]%4)*87],.056,.10);
    if(aligned(i))c.pulse([spots[i][0],.21,spots[i][1]],palette[i],11);
    refresh();
  }
  function refresh(){
    c.objective(fixed()?"Power the lift":"Aim at gold sockets");
    c.meter(fixed()?"":"A also turns B · B turns C");
    spots.forEach(([x,z],i)=>c.marker("piece"+i,"Turn "+String.fromCharCode(65+i),[x,.58,z],()=>turn(i),{kind:aligned(i)?"good":"clue"}));
    if(fixed())c.marker("switch",q.finish,[0,.71,-3.46],()=>{
      cleared=true;c.flyTo(0,-3.20,()=>c.receive([0,0,-3.49]));
    },{kind:"hot"});else c.off("switch");
  }
  function start(){stops=q.start.slice();shown=stops.map(n=>n*Math.PI*.5);cleared=false;refresh();}
  function tick(dt){shown=shown.map((v,i)=>lerp(v,stops[i]*Math.PI*.5,1-Math.exp(-dt*11)));}
  function draw(m,t){
    const z=c.localZ, nodes=[[-.14,3.48],...spots,[0,-3.52]];
    for(let i=1;i<nodes.length;i++){
      const a=nodes[i-1],b=nodes[i],live=stops.slice(0,i-1).every((_,j)=>aligned(j));
      m.tube([a[0],.16,z(a[1])],[b[0],.16,z(b[1])],.058,.057,live?palette[Math.min(i,3)]:ink(),8,live?1:0);
    }
    spots.forEach(([x,s],i)=>{
      c.pedestal(m,x,z(s),1.11,trim());
      const angle=shown[i],lit=aligned(i);
      const u=Math.sin(angle),v=Math.cos(angle);
      const socketAngle=q.target[i]*Math.PI*.5,socketX=x+Math.sin(socketAngle)*.70,socketZ=z(s)+Math.cos(socketAngle)*.70;
      const socketTint=lit?0xadf4c3:0xffcf7d;
      m.box(socketX,.23,socketZ,.34,.22,.34,ink());
      c.ring(m,socketX,.36,socketZ,.115,socketTint,.045,12);
      m.oval(socketX,.34,socketZ,.085,.052,.085,socketTint,0,1,8);
      m.oval(x,.45,z(s),.24,.11,.24,ink(),0,0,10);
      const onArm=distance=>[x+u*distance,.51,z(s)+v*distance];
      const armTint=lit?0xadf4c3:0xf4d59a;
      m.tube(onArm(.10),onArm(.45),.055,.055,armTint,6,1);
      m.tube(onArm(.45),onArm(.70),.106,.007,armTint,6,1);
      const to=q.links[i];
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
    get hideAgent(){return active.hideAgent;},
    draw(m,t){active.draw(m,t);},
    tick(dt,t){active.tick?.(dt,t);},
    tap(p){return active.tap?.(p);},
    swipe(p){return active.swipe?.(p);},
    dragEnd(p){active.dragEnd?.(p);},
    key(k){return active.key?.(k);}
  };
}
