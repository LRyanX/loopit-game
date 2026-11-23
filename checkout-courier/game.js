"use strict";

const GAME = {
  "title": "Checkout Courier",
  "brief": "sale",
  "look": "market",
  "avatar": "cart",
  "zones": [
    "Express Belt",
    "Returns Scale",
    "Packing Line"
  ],
  "awards": [
    "Express receipt",
    "Return weight verified",
    "Sealed dispatch"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 9156299,
    "haze": 15915449,
    "tile": 15654085,
    "tile2": 14864301,
    "ink": 2375757,
    "trim": 12613462,
    "accent": 12404525,
    "loot": 16306051,
    "css": "#bd472d"
  },
  "passages": [
    "Enter Returns Scale",
    "Enter Packing Line"
  ],
  "scene": "checkout",
  "footprint": "long",
  "connector": "belt",
  "camera": [
    0.22,
    0.54,
    0.94,
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
      7,
      -7,
      0,
      -0.75
    ],
    [
      13,
      -14,
      0,
      -0.57
    ]
  ],
  "tasks": [
    {
      "kind": "weigh",
      "title": "Returns Scale",
      "goalText": "Balance the return parcel and inspection weights",
      "unit": "lb",
      "parts": [
        [
          "Cable",
          1,
          "parcel"
        ],
        [
          "Console",
          4,
          "box"
        ],
        [
          "Battery",
          2,
          "parcel"
        ]
      ],
      "goal": [
        5,
        2
      ],
      "award": "Return weight verified"
    },
    {
      "kind": "hold",
      "title": "Packing Line",
      "goalText": "Seal the outbound parcels",
      "begin": "Press seal",
      "unit": "parcels sealed",
      "bands": [
        [
          0.4,
          0.68
        ],
        [
          0.45,
          0.68
        ],
        [
          0.49,
          0.71
        ]
      ],
      "object": "parcel",
      "award": "Sealed dispatch"
    }
  ],
  "form": "counter",
  "controls": [
    "tray",
    "tray",
    "tray"
  ],
  "views": [
    [
      0.39,
      0.39,
      0.81,
      0.01,
      0.83
    ],
    [
      0,
      0.9,
      0.85,
      0.03,
      0.74
    ],
    [
      -0.49,
      0.68,
      0.83,
      -0.23,
      0.76
    ]
  ]
};

function makeFirstTask(c) {
  const labels=["Doorbuster","Regular","Clearance"];
  const tints=[0xe46f5b,0x62889f,0xf3cb75];
  const orders=[[0,2],[2,0,2],[0,2,2,0]];
  let shift=0,tickets=0,feed=0,previous=-10,active=false;
  function roll() {
    const belt=(feed*[1.04,1.22,1.46][shift]+.74)%8.7;
    const positions=[0,1,2,3,4,5].map(i=>({z:-3.65+(belt+i*1.45)%8.7,rack:(i+shift)%3,i,torn:shift===2&&i===1}));
    return positions;
  }
  function desired(){return orders[shift][tickets];}
  function scan(){
    active=true;
    const lock=roll().find(v=>Math.abs(v.z-.30)<.48);
    if(!lock){c.feedback(false,"Wait for a box under the beam");return;}
    if(lock.torn){c.mistake("Damaged label · skip this parcel");return;}
    if(lock.rack!==desired()){c.mistake("Skip that barcode");return;}
    if(previous===lock.i){c.feedback(false,"That box is already stamped");return;}
    previous=lock.i;
    c.pulse([0,.68,.30],tints[lock.rack],21);
    tickets++;
    if(tickets===orders[shift].length){c.receive([0,0,-1.9]);return;}
    c.feedback(true,"Barcode matched");
    c.objective("Scan the "+labels[desired()].toLowerCase()+" box");
    c.meter(tickets+"/"+orders[shift].length+(shift===2?" · skip torn barcodes":" barcodes"));
    refreshScanner();
  }
  function start(stage){
    shift=stage;tickets=0;feed=0;previous=-10;active=true;
    c.objective("Scan the "+labels[desired()].toLowerCase()+" box");
    c.meter("0/"+orders[shift].length+(shift===2?" · skip torn barcodes":" barcodes"));
    c.tool("scan","Scan barcode",scan);
  }
  function refreshScanner(){
    const inside=roll().find(v=>Math.abs(v.z-.30)<.46);
    const cue=inside&&!inside.torn&&inside.rack===desired()&&inside.i!==previous;
    c.tool("scan",cue?"Scan now":"Scan barcode",scan);
  }
  function tick(dt){if(active)feed+=dt;refreshScanner();}
  function draw(m,time){
    const local=c.localZ;
    m.box(0,.08,local(.08),1.35,.15,8.20,0x455a67);
    m.box(0,.17,local(.08),1.22,.042,8.13,0x728b93);
    for(let k=0;k<21;k++)m.box(0,.208,local(-3.94+(k+(feed%1))*.391),1.19,.018,.032,0x9faeb1);
    for(const p of roll()){
      c.item(m,"parcel",0,.21,local(p.z),.78,tints[p.rack]);
      if(p.torn)m.box(0,.67,local(p.z+.275),.43,.075,.017,0xb84645,.28,1);
    }
    const ready=roll().some(v=>Math.abs(v.z-.30)<.46&&!v.torn&&v.rack===desired()&&v.i!==previous);
    for(const s of [-1,1])m.box(s*.95,.65,local(.30),.14,1.29,.16,0x324757);
    m.box(0,1.31,local(.30),1.98,.14,.18,0xdb6859);
    m.tube([-.78,1.21,local(.30)],[.78,.27,local(.30)],.019,.010,ready?0x79ffe3:0xfdbd7a,6,1);
    c.item(m,"register",2.19,.04,local(-1.96),1.22,0xe46f5b);
    if(!c.hasAward()&&desired()!=null)c.item(m,"parcel",-2.35,.23,local(.29),1.1,tints[desired()]);
  }
  function swipe(p){return !!p.origin&&Math.abs(p.origin.x)<1.18;}
  function dragEnd(p){if(p.floor&&Math.abs(p.floor.z-.30)<1.32)scan();}
  return {start,tick,draw,swipe,dragEnd};
}

function makeSecondTask(c,q){
  const xs=[-2.43,0,2.43],colors=[0xe49063,0x83c6ad,0x8eaad6];
  let selected=-1,locations=[],angle=0;
  const total=side=>locations.reduce((n,p,i)=>p===side?n+q.parts[i][1]:n,0);
  function choose(i){selected=i;c.tone([329,482]);show();}
  function put(side){
    if(selected<0)return;
    const i=selected,d=side===0?-2.15:2.15;
    c.flyTo(d,-.42,()=>{
      locations[i]=side;selected=-1;
      c.pulse([d,.42,-.77],colors[i],13);
      if(locations.every(n=>n!==null)){
        if(total(0)===q.goal[0]&&total(1)===q.goal[1]){c.receive([0,0,-2.73]);return;}
        c.mistake("The scale is off · move a weight");
      }else c.feedback(true);
      show();
    });
  }
  function show(){
    c.objective(selected<0?q.goalText:"Place the "+q.parts[selected][0].toLowerCase());
    c.meter("Left "+total(0)+"/"+q.goal[0]+" · Right "+total(1)+"/"+q.goal[1]+" "+q.unit);
    q.parts.forEach(([name,weight],i)=>{
      const where=locations[i],same=where===null;
      c.marker("weight"+i,name+" "+weight,[same?xs[i]:(where===0?-2.2:2.2)+(i-1)*.49,.59,same?2.26:-.86],()=>choose(i),
        {kind:i===selected?"good":"clue",hidden:selected>=0});
    });
    if(selected>=0){
      c.marker("left","Place left",[-2.16,.70,-.63],()=>put(0),{kind:"hot"});
      c.marker("right","Place right",[2.16,.70,-.63],()=>put(1),{kind:"hot"});
    }else {c.off("left");c.off("right");}
  }
  function start(){selected=-1;locations=q.parts.map(()=>null);angle=0;show();}
  function tick(dt){angle=lerp(angle,clamp((total(0)-total(1))*.057,-.23,.23),1-Math.exp(-dt*10));}
  function draw(m,t){
    const z=c.localZ, center=z(-.95);
    m.box(0,.26,center,.61,.45,.52,ink());
    const beam=(x)=>[x,.68-Math.sin(angle)*x,center];
    m.tube(beam(-2.46),beam(2.46),.088,.088,trim(),10);
    for(const side of [-1,1]){
      const [x,y]=beam(side*2.16);
      m.box(x,y-.27,center,1.79,.11,1.08,bright());
      m.tube([x,y,center],[x,y-.22,center],.071,.047,ink(),8);
    }
    q.parts.forEach(([_,weight,type],i)=>{
      const here=locations[i],pos=here===null?xs[i]:(here===0?-2.16:2.16)+(i-1)*.47;
      const zz=here===null?z(2.23):center;
      if(selected===i)c.item(m,type||"box",c.player.x,.67,c.player.z,.84,colors[i]);
      else {if(here===null)c.pedestal(m,pos,zz,1.00,colors[i]);c.item(m,type||"box",pos,here===null?.21:.51-Math.sin(angle)*pos,zz,.68+weight*.043,colors[i]);}
    });
  }
  return {start,tick,draw};
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
