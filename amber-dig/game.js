"use strict";

const GAME = {
  "title": "Amber Dig",
  "brief": "hunt",
  "look": "dig",
  "avatar": "explorer",
  "zones": [
    "Amber Camp",
    "Fossil Field Table",
    "Amber Core Drill"
  ],
  "awards": [
    "Shell in Amber",
    "Ancient Fern Restored",
    "Unbroken Spiral Fossil"
  ],
  "awardShape": "fossil",
  "palette": {
    "sky": 12093282,
    "haze": 16113581,
    "tile": 14533528,
    "tile2": 13742205,
    "ink": 5851449,
    "trim": 11897697,
    "accent": 9064752,
    "loot": 16174453,
    "css": "#8a5130"
  },
  "passages": [
    "Enter Fossil Field Table",
    "Enter Amber Core Drill"
  ],
  "scene": "dig",
  "footprint": "kite",
  "connector": "stone",
  "camera": [
    -0.18,
    0.91,
    0.94,
    0.08
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      -6,
      -10,
      0.7,
      0.46
    ],
    [
      -11,
      -22,
      1.46,
      0.34
    ]
  ],
  "tasks": [
    {
      "kind": "assembly",
      "title": "Fossil Field Table",
      "goalText": "Fit the fossil pieces to their outlines",
      "pieces": [
        [
          "Spine",
          "fossil",
          1
        ],
        [
          "Rib",
          "key",
          2
        ],
        [
          "Shell",
          "shell",
          0
        ]
      ],
      "award": "Ancient Fern Restored"
    },
    {
      "kind": "hold",
      "title": "Amber Core Drill",
      "goalText": "Sample each stratum without crushing the core",
      "begin": "Apply drill pressure",
      "unit": "cores sampled",
      "bands": [
        [
          0.43,
          0.68
        ],
        [
          0.5,
          0.71
        ]
      ],
      "object": "rock",
      "award": "Unbroken Spiral Fossil"
    }
  ],
  "form": "scrub",
  "controls": [
    "world",
    "tray",
    "tray"
  ],
  "views": [
    [
      -0.15,
      0.84,
      0.95,
      0.22,
      0.79
    ],
    [
      0.03,
      1.12,
      0.91,
      0.26,
      0.73
    ],
    [
      0.47,
      0.59,
      0.82,
      -0.07,
      0.83
    ]
  ]
};

function makeFirstTask(c){
  const stamps=[{name:"Spiral",type:"fossil",tint:0xf1c679},{name:"Shell",type:"shell",tint:0xe6a271},{name:"Fern",type:"key",tint:0x95af81}];
  const holes=[-2.40,0,2.40];
  let correct,visited=false,working=-1,depth=0,min=0,dist=0,bay=0;
  function clue(){
    c.flyTo(0,2.43,()=>{
      visited=true;
      c.pulse([0,.61,2.65],stamps[correct].tint,17);
      c.feedback(true);
      renderUI();
    });
  }
  function beginDig(i){
    c.flyTo(holes[i],-.92,()=>{
      if(i!==correct){c.mistake("That stamp does not match the specimen");return;}
      working=i;depth=0;dist=0;
      c.feedback(true);
      renderUI();
    });
  }
  function brush(amount){
    if(working<0||c.hasAward())return;
    const x=holes[working];
    depth=Math.min(min,depth+amount);
    c.pulse([x,.50,-1.78],0xd4aa75,9);
    if(depth>=min){c.receive([x,0,-1.80]);return;}
    c.tone([260+depth*58],.06,.07);
    renderUI();
  }
  function actionName(){
    if(bay===1&&depth<2)return "Crack clay";
    if(bay===2&&depth>=2)return "Fine brush";
    return "Brush sand";
  }
  function renderUI(){
    c.objective(!visited?"Inspect the field specimen":working>=0?(actionName()==="Crack clay"?"Tap to break the hardened cap":actionName()==="Fine brush"?"Use a fine brush on the fossil":"Brush away the sediment"):"Find the "+stamps[correct].name.toLowerCase()+" stamp");
    c.meter(working>=0?depth+"/"+min+" layers cleared":"");
    if(!visited)c.marker("sample","Inspect specimen",[0,.64,2.65],clue,{kind:"clue"});else c.off("sample");
    for(let i=0;i<3;i++){
      if(visited&&working<0)c.marker("dig"+i,stamps[i].name+" pit",[holes[i],.63,-1.81],()=>beginDig(i),{kind:"hot"});
      else c.off("dig"+i);
    }
    if(working>=0)c.tool("brush",actionName(),()=>brush(1));
  }
  function start(i,run){bay=i;correct=([1,2,0][i]+run)%3;visited=false;working=-1;depth=0;dist=0;min=i+3;renderUI();}
  function swipe(p){
    if(working<0||!p.floor||Math.abs(p.floor.x-holes[working])>1.47||Math.abs(p.floor.z+1.8)>1.35)return false;
    dist+=Math.hypot(p.dx,p.dy);
    if(dist>(actionName()==="Fine brush"?44:30)){dist=0;brush(1);}
    return true;
  }
  function draw(m,time){
    const z=c.localZ;
    c.pedestal(m,0,z(2.65),1.32,trim());
    c.item(m,visited?stamps[correct].type:"parcel",0,.23,z(2.65),1.05,visited?stamps[correct].tint:bright());
    holes.forEach((x,i)=>{
      m.box(x,.074,z(-1.83),1.86,.15,1.57,ink());
      const caked=working===i?1-depth/min:1;
      for(let j=0;j<5;j++)m.oval(x+(.4-(j%3)*.4)*caked,.14+.15*caked,z(-1.81+(j-2)*.14),.40+.28*caked,.122+.20*caked,.53,(bay===1&&(working!==i||depth<2))?0xa06a53:0xc89c6c,0,0,7);
      c.item(m,stamps[i].type,x,.23,z(-2.89),.72,stamps[i].tint);
    });
  }
  return {start,draw,swipe};
}

function makeSecondTask(c,q){
  const colors=[0xe6b36a,0x87c1b2,0xb5a3d8],xs=[-2.34,0,2.34];
  let held=-1,rot=0,inserted=[];
  function pick(i){held=i;rot=0;c.tone([297,452]);show();}
  function turn(){rot=(rot+1)%4;c.tone([334+rot*54]);show();}
  function fit(i){
    const p=q.pieces[held];
    if(held!==i||rot!==p[2]){c.mistake("Match the outline and facing angle");return;}
    c.flyTo(xs[i],-.72,()=>{
      inserted.push(i);held=-1;
      c.pulse([xs[i],.44,-1.22],colors[i],17);
      if(inserted.length===q.pieces.length){c.receive([0,0,-2.50]);return;}
      c.feedback(true,"Piece fitted");show();
    });
  }
  function show(){
    c.objective(held<0?q.goalText:"Rotate and fit "+q.pieces[held][0].toLowerCase());
    c.meter(held<0?inserted.length+"/"+q.pieces.length+" fitted":"Facing "+rot*90+"° · mark "+q.pieces[held][2]*90+"°");
    q.pieces.forEach(([name],i)=>{
      if(held<0&&!inserted.includes(i))c.marker("pick"+i,name,[xs[i],.59,2.13],()=>pick(i),{kind:"clue"});else c.off("pick"+i);
      if(held>=0&&!inserted.includes(i))c.marker("fit"+i,name+" slot",[xs[i],.67,-1.20],()=>fit(i),{kind:"hot"});else c.off("fit"+i);
    });
    if(held>=0){
      c.tool("turn","Rotate piece",turn);
      c.tool("put-back","Put back",()=>{held=-1;show();});
    }else c.hideTools();
  }
  function start(){held=-1;rot=0;inserted=[];show();}
  function draw(m){
    for(const [i,p] of q.pieces.entries()){
      const x=xs[i],z=c.localZ(-1.25);
      c.pedestal(m,x,z,1.42,colors[i]);
      m.box(x,.223,z,.81,.062,.61,ink(),p[2]*Math.PI*.5);
      if(inserted.includes(i))c.item(m,p[1],x,.24,z,.90,colors[i],p[2]*Math.PI*.5);
      else c.item(m,p[1],x,.16,c.localZ(2.13),.93,colors[i],held===i?rot*Math.PI*.5:0);
    }
  }
  return {start,draw};
}

function makeThirdTask(c,q){
  let p=0,engaged=false,pieces=0,age=0;
  const bands=q.bands;
  const inBand=()=>p>=bands[pieces][0]&&p<=bands[pieces][1];
  function arm(){
    if(engaged){release();return;}
    engaged=true;age=0;p=0;
    c.tone([266,370]);show();
  }
  function release(){
    if(!inBand()){
      engaged=false;p=0;c.mistake("Missed the green band · try again");show();return;
    }
    const x=(pieces-(bands.length-1)/2)*1.13;
    c.pulse([x,.67,-.43],bright(),18);
    pieces++;engaged=false;p=0;
    if(pieces===bands.length){c.receive([0,0,-.46]);return;}
    c.feedback(true,"Clean result");show();
  }
  function show(){
    c.objective(engaged?"Release inside the green band":q.goalText);
    c.meter(pieces+"/"+bands.length+" "+q.unit);
    c.tool("press",engaged?(inBand()?"Release now":"Release"):q.begin,arm);
  }
  function start(){p=0;engaged=false;pieces=0;age=0;show();}
  function tick(dt){
    if(!engaged)return;
    const prior=inBand();
    age+=dt;p=clamp(age*(.51+pieces*.05),0,1);
    if(prior!==inBand())show();
    if(p>=1){engaged=false;p=0;c.mistake("Pressure too high · reset");show();}
  }
  function draw(m){
    const z=c.localZ;
    if(pieces===bands.length)return;
    const [min,max]=bands[pieces];
    m.box(0,.05,z(-.44),4.08,.084,1.97,ink());
    const x=4*(pieces-(bands.length-1)*.5)/bands.length;
    c.item(m,q.object,x,.23,z(-.48),1.1,bright());
    m.box(x,1.02-p*.52,z(-.48),.22,.80,.22,trim());
    m.box(x,.67-p*.48,z(-.48),.64,.087,.53,inBand()?0x91f3c9:GAME.palette.loot,0,1);
    const gx=-2.16,gz=z(.77);
    m.box(gx,.91,gz,.35,1.61,.21,ink());
    m.box(gx,.17+((min+max)/2)*1.46,gz+.12,.25,(max-min)*1.43,.035,0x74d9a8,0,1);
    m.box(gx,.17+p*1.46,gz+.154,.36,.057,.043,white,0,1);
    for(let i=0;i<bands.length;i++)c.item(m,q.object,(i-(bands.length-1)/2)*.83,.04,z(2.18),.69,i<pieces?0x79bfa0:trim());
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
