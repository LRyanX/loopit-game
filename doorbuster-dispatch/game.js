"use strict";

const GAME = {
  "title": "Doorbuster Dispatch",
  "brief": "sale",
  "look": "warehouse",
  "avatar": "hover",
  "zones": [
    "Click & Collect",
    "Crane Loading Dock",
    "Manifest Desk"
  ],
  "awards": [
    "Pickup order complete",
    "All trucks loaded",
    "Manifest signed"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 7973552,
    "haze": 15391939,
    "tile": 14666674,
    "tile2": 13884882,
    "ink": 2897990,
    "trim": 12680275,
    "accent": 9851450,
    "loot": 16044427,
    "css": "#96523a"
  },
  "passages": [
    "Enter Crane Loading Dock",
    "Enter Manifest Desk"
  ],
  "scene": "depot",
  "footprint": "square",
  "connector": "loading",
  "camera": [
    0.28,
    0.72,
    1.03,
    -0.06
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      7,
      -8,
      0.28,
      -0.82
    ],
    [
      14,
      -18,
      0.65,
      -0.58
    ]
  ],
  "guides": [
    [
      "→",
      "Pick and deliver"
    ],
    [
      "↓",
      "Drop onto the truck"
    ],
    [
      "!",
      "Find the mismatch"
    ]
  ],
  "ending": {
    "kind": "truck",
    "title": "Truck dispatched",
    "summary": "The manifest clears and the delivery truck leaves.",
    "pieces": [
      "parcel",
      "parcel",
      "parcel"
    ],
    "prize": "parcel"
  },
  "tasks": [
    {
      "kind": "swing",
      "title": "Crane Loading Dock",
      "goalText": "Release each parcel above its marked truck",
      "docks": [
        -2.33,
        2.33,
        0
      ],
      "award": "All trucks loaded"
    },
    {
      "kind": "audit",
      "title": "Manifest Desk",
      "goalText": "Flag the parcel that breaks the manifest",
      "sourceName": "manifest",
      "object": "parcel",
      "rows": [
        {
          "clue": "Fragile line · max 4 kg",
          "labels": [
            "Glass · 3 kg",
            "Ceramic · 4 kg",
            "Lamp · 6 kg"
          ],
          "wrong": 2
        },
        {
          "clue": "Blue pickup labels only",
          "labels": [
            "Red · A24",
            "Blue · B11",
            "Blue · C16"
          ],
          "wrong": 0
        }
      ],
      "award": "Manifest signed"
    }
  ],
  "scenarios": [
    [
      {
        "kind": "swing",
        "title": "Crane Loading Dock",
        "goalText": "Release each parcel above its marked truck",
        "docks": [
          -2.33,
          2.33,
          0
        ],
        "award": "All trucks loaded"
      },
      {
        "kind": "swing",
        "title": "Crane Loading Dock",
        "goalText": "Release each parcel above its marked truck",
        "docks": [
          0,
          -2.33,
          2.33
        ],
        "award": "All trucks loaded"
      },
      {
        "kind": "swing",
        "title": "Crane Loading Dock",
        "goalText": "Release each parcel above its marked truck",
        "docks": [
          2.33,
          0,
          -2.33,
          0
        ],
        "award": "All trucks loaded"
      }
    ],
    [
      {
        "kind": "audit",
        "title": "Manifest Desk",
        "goalText": "Flag the parcel that breaks the manifest",
        "sourceName": "manifest",
        "object": "parcel",
        "rows": [
          {
            "clue": "Fragile line · max 4 kg",
            "labels": [
              "Glass · 3 kg",
              "Ceramic · 4 kg",
              "Lamp · 6 kg"
            ],
            "wrong": 2
          },
          {
            "clue": "Blue pickup labels only",
            "labels": [
              "Red · A24",
              "Blue · B11",
              "Blue · C16"
            ],
            "wrong": 0
          }
        ],
        "award": "Manifest signed"
      },
      {
        "kind": "audit",
        "title": "Manifest Desk",
        "goalText": "Flag the parcel that breaks the manifest",
        "sourceName": "manifest",
        "object": "parcel",
        "rows": [
          {
            "clue": "Fragile line · max 4 kg",
            "labels": [
              "Glass · 3 kg",
              "Ceramic · 4 kg",
              "Lamp · 6 kg"
            ],
            "wrong": 2
          },
          {
            "clue": "Insulated bay · max 5 kg",
            "labels": [
              "Jar · 5 kg",
              "Kettle · 6 kg",
              "Jug · 4 kg"
            ],
            "wrong": 1
          },
          {
            "clue": "Amber pickup labels only",
            "labels": [
              "Amber · P42",
              "Amber · K11",
              "Blue · A16"
            ],
            "wrong": 2
          }
        ],
        "award": "Manifest signed"
      },
      {
        "kind": "audit",
        "title": "Manifest Desk",
        "goalText": "Flag the parcel that breaks the manifest",
        "sourceName": "manifest",
        "object": "parcel",
        "rows": [
          {
            "clue": "Blue pickup labels only",
            "labels": [
              "Red · A24",
              "Blue · B11",
              "Blue · C16"
            ],
            "wrong": 0
          },
          {
            "clue": "Insulated bay · max 5 kg",
            "labels": [
              "Jar · 5 kg",
              "Kettle · 6 kg",
              "Jug · 4 kg"
            ],
            "wrong": 1
          },
          {
            "clue": "Amber pickup labels only",
            "labels": [
              "Amber · P42",
              "Amber · K11",
              "Blue · A16"
            ],
            "wrong": 2
          }
        ],
        "award": "Manifest signed"
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
      0.22,
      0.57,
      0.99,
      0.04,
      0.84
    ],
    [
      -0.6,
      0.41,
      0.91,
      -0.3,
      0.83
    ],
    [
      0.12,
      0.76,
      0.93,
      -0.35,
      0.79
    ]
  ]
};

function makeFirstTask(c){
  const bins=[
    {type:"camera",name:"Camera",tint:0x5f99be},
    {type:"mug",name:"Mug",tint:0xefb35f},
    {type:"headset",name:"Headset",tint:0xcd7690},
    {type:"shoe",name:"Shoes",tint:0x7bb69f}
  ];
  const demand=[[1,0],[3,1,2],[2,0,3,1]];
  const dx=[-2.22,2.22];
  let order=[],done=0,carry=null,available=[],occupied=[],orderDocks=[];
  const boxX=i=>i%2===0?-2.14:2.14;
  const boxZ=i=>i<2?2.44:.45;
  function refresh(){
    c.objective(carry===null?"Pick a product from the sale stock":"Match the active pickup order");
    c.meter(done+"/"+order.length+" orders · "+bins[order[done]].name);
    for(let i=0;i<bins.length;i++){
      const p=bins[i];
      if(carry!==null||!available[i]){c.off("item"+i);continue;}
      c.marker("item"+i,"Pick "+p.name,[boxX(i),.66,boxZ(i)],()=>pick(i),{kind:"clue"});
    }
    for(let d=0;d<2;d++){
      if(carry===null){c.off("dock"+d);continue;}
      const target=d===orderDocks[done];
      c.marker("dock"+d,(d===0?"A":"B")+(target?" · "+bins[order[done]].name:" · standby"),[dx[d],.69,-2.13],()=>deliver(d),{kind:target?"good":"hot"});
    }
    if(carry!==null)c.tool("return","Return item",()=>c.flyTo(boxX(carry),boxZ(carry),()=>{
      available[carry]=true;carry=null;refresh();
    }));else c.hideTools();
  }
  function pick(i){
    c.flyTo(boxX(i),boxZ(i),()=>{
      carry=i;available[i]=false;c.tone();
      refresh();
    });
  }
  function deliver(d){
    c.flyTo(dx[d],-1.91,()=>{
      if(d!==orderDocks[done]||carry!==order[done]){c.mistake("Product or dock does not match");return;}
      occupied.push({i:carry,d,slot:done});
      c.pulse([dx[d],.69,-2.31],bins[carry].tint,18);
      carry=null;done++;
      if(done===order.length){c.receive([dx[d],0,-2.95]);return;}
      c.feedback(true,"Pickup fulfilled");
      refresh();
    });
  }
  function start(i){order=demand[i];orderDocks=[[0,1],[0,1,0],[1,1,0,1]][i];done=0;carry=null;available=bins.map(()=>true);occupied=[];refresh();}
  function draw(m){
    for(let i=0;i<bins.length;i++){
      const product=bins[i];
      c.pedestal(m,boxX(i),c.localZ(boxZ(i)),1.31,product.tint);
      if(available[i])c.item(m,product.type,boxX(i),.25,c.localZ(boxZ(i)),1.02,product.tint);
    }
    dx.forEach((v,i)=>{
      c.pedestal(m,v,c.localZ(-2.24),1.64,orderDocks[done]===i?0x7bc3a8:trim());
      c.item(m,"register",v,.05,c.localZ(-3.58),.84,bright());
    });
    for(const {i,d,slot} of occupied)c.item(m,bins[i].type,dx[d]+(slot>1?.44:-.35),.23,c.localZ(-2.45),.73,bins[i].tint);
    if(carry!==null)c.item(m,bins[carry].type,c.player.x,.60,c.player.z,.74,bins[carry].tint);
  }
  function swipe(p){
    if(carry===null||!p.floor||!p.origin)return false;
    if(Math.hypot(p.origin.x-c.player.x,p.origin.z-(c.player.z-c.z()))>1.28)return false;
    c.flyTo(p.floor.x,p.floor.z);
    return true;
  }
  function dragEnd(p){if(carry!==null&&p.floor&&p.floor.z<-1.21&&Math.abs(p.floor.x)>1.12)deliver(p.floor.x<0?0:1);}
  return {start,draw,swipe,dragEnd};
}

function makeSecondTask(c,q){
  let t=0,shot=null,index=0,landed=[];
  const phase=()=>Math.sin(t*(1.75+index*.28))*2.66;
  const target=()=>q.docks[index]??0;
  const ready=()=>Math.abs(phase()-target())<.53;
  function drop(){
    if(shot)return;
    shot={x:phase(),at:c.clock(),expect:target()};c.tone([345,481]);show();
  }
  function show(){
    c.objective(q.goalText);
    c.meter(index+"/"+q.docks.length+" crates loaded");
    c.tool("drop",ready()?"Release now":"Release crane",drop,Boolean(shot));
  }
  function start(){t=0;shot=null;index=0;landed=[];show();}
  function tick(dt,time){
    const before=ready();t+=dt;
    if(before!==ready()&&!shot)show();
    if(!shot||time-shot.at<.55)return;
    const {x,expect}=shot;shot=null;
    if(Math.abs(x-expect)>.62){c.mistake("Crate missed the marked truck · reset");show();return;}
    landed.push(expect);index++;c.pulse([x,.49,-.44],bright(),20);
    if(index===q.docks.length){c.receive([x,0,-.62]);return;}
    c.feedback(true,"Crate aboard");show();
  }
  function draw(m,time){
    const z=c.localZ;
    for(const x of [-2.33,0,2.33]){
      m.box(x,.19,z(-.66),1.44,.29,1.77,0x63899e);
      m.box(x,.39,z(-.66),1.18,.068,1.59,x===target()?0x79d0a7:ink());
      m.box(x,.63,z(-1.42),1.24,.51,.43,bright());
    }
    m.tube([0,2.08,z(-2.28)],[0,2.08,z(-.25)],.121,.099,ink(),8);
    const p=shot?.x??phase(),f=shot?clamp((time-shot.at)/.55,0,1):0;
    if(!shot)m.tube([0,2.07,z(-.26)],[p,1.24+Math.abs(p)*.08,z(-.42)],.032,.030,trim(),7);
    if(index<q.docks.length)c.item(m,"parcel",p,shot?lerp(1.10,.45,curve(f)):1.13+Math.abs(p)*.071,z(-.49),.78,0xeec38a);
    landed.forEach((v,i)=>c.item(m,"parcel",v+(i%2-.5)*.50,.47,z(-.63),.57,bright()));
  }
  return {start,tick,draw};
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
