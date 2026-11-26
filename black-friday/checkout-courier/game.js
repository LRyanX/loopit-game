"use strict";

const GAME = {
  "title": "Checkout Courier",
  "brief": "sale",
  "look": "market",
  "avatar": "cart",
  "zones": [
    "Express Belt",
    "Returns Inspection",
    "Packing Line"
  ],
  "awards": [
    "Express receipt",
    "Returns inspected",
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
    "Enter Returns Inspection",
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
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "▤",
          "Scan the sale box"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "▤",
          "Scan the sale box"
        ]
      }
    ],
    [
      {
        "kind": "returns",
        "guide": [
          "▤",
          "Inspect the return"
        ],
        "runs": [
          {
            "kind": "returns",
            "title": "Returns Inspection",
            "goalText": "Match the barcode, then check the seal",
            "cards": [
              [
                "Camera",
                "camera",
                "C24",
                "C24",
                false
              ],
              [
                "Mug",
                "mug",
                "M11",
                "M41",
                true
              ],
              [
                "Headset",
                "headset",
                "H17",
                "H17",
                true
              ]
            ],
            "award": "Returns inspected"
          },
          {
            "kind": "returns",
            "title": "Returns Inspection",
            "goalText": "Match the barcode, then check the seal",
            "cards": [
              [
                "Lamp",
                "lamp",
                "L18",
                "L18",
                true
              ],
              [
                "Kettle",
                "kettle",
                "K13",
                "K03",
                false
              ],
              [
                "Sneakers",
                "shoe",
                "S06",
                "S06",
                false
              ],
              [
                "Gift box",
                "gift",
                "G25",
                "G25",
                true
              ]
            ],
            "award": "Returns inspected"
          },
          {
            "kind": "returns",
            "title": "Returns Inspection",
            "goalText": "Match the barcode, then check the seal",
            "cards": [
              [
                "Console",
                "box",
                "C37",
                "C73",
                true
              ],
              [
                "Cable",
                "parcel",
                "C81",
                "C81",
                false
              ],
              [
                "Camera",
                "camera",
                "C14",
                "C14",
                true
              ],
              [
                "Mug",
                "mug",
                "M07",
                "M70",
                false
              ]
            ],
            "award": "Returns inspected"
          }
        ]
      }
    ],
    [
      {
        "kind": "hold",
        "guide": [
          "◉",
          "Hit the green zone"
        ],
        "runs": [
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
          },
          {
            "kind": "hold",
            "title": "Packing Line",
            "goalText": "Seal the outbound parcels",
            "begin": "Press seal",
            "unit": "parcels sealed",
            "bands": [
              [
                0.32,
                0.62
              ],
              [
                0.5,
                0.72
              ],
              [
                0.43,
                0.65
              ]
            ],
            "object": "parcel",
            "award": "Sealed dispatch"
          },
          {
            "kind": "hold",
            "title": "Packing Line",
            "goalText": "Seal the outbound parcels",
            "begin": "Press seal",
            "unit": "parcels sealed",
            "bands": [
              [
                0.46,
                0.69
              ],
              [
                0.3,
                0.56
              ],
              [
                0.54,
                0.75
              ],
              [
                0.38,
                0.63
              ]
            ],
            "object": "parcel",
            "award": "Sealed dispatch"
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "belt",
    "title": "Parcels sealed",
    "summary": "The scanned parcels clear the packing line.",
    "pieces": [
      "parcel",
      "parcel",
      "parcel"
    ],
    "prize": "bag"
  },
  "tasks": [
    {
      "kind": "returns",
      "title": "Returns Inspection",
      "goalText": "Match the barcode, then check the seal",
      "cards": [
        [
          "Camera",
          "camera",
          "C24",
          "C24",
          false
        ],
        [
          "Mug",
          "mug",
          "M11",
          "M41",
          true
        ],
        [
          "Headset",
          "headset",
          "H17",
          "H17",
          true
        ]
      ],
      "award": "Returns inspected"
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
  const marks=["✚","●","▬"];
  const tints=[0xe46f5b,0x62889f,0xf3cb75];
  const orders=[[0,2],[2,0,2],[0,2,2,0]];
  let shift=0,tickets=0,feed=0,previous=-10,active=false;
  function roll() {
    const belt=(feed*[1.04,1.22,1.46][shift]+.74)%8.7;
    const positions=[0,1,2,3,4,5].map(i=>({z:-3.65+(belt+i*1.45)%8.7,rack:(i+shift)%3,i,torn:shift===2&&i===1}));
    return positions;
  }
  function desired(){return orders[shift][tickets];}
  function showOrder(){
    c.objective("Scan the matching tag");
    c.meter(marks[desired()]+" "+labels[desired()]+" · "+tickets+"/"+orders[shift].length);
  }
  function scan(){
    active=true;
    const lock=roll().find(v=>Math.abs(v.z-.30)<.48);
    if(!lock){c.feedback(false,"Wait for a box under the beam");return;}
    if(lock.torn){c.mistake("Damaged label · skip this parcel");return;}
    if(lock.rack!==desired()){c.mistake("Wait for the "+labels[desired()].toLowerCase()+" tag");return;}
    if(previous===lock.i){c.feedback(false,"That box is already stamped");return;}
    previous=lock.i;
    c.pulse([0,.68,.30],tints[lock.rack],21);
    tickets++;
    if(tickets===orders[shift].length){c.receive([0,0,-1.9]);return;}
    c.feedback(true,"Barcode matched");
    showOrder();
    refreshScanner();
  }
  function start(stage){
    shift=stage;tickets=0;feed=0;previous=-10;active=true;
    showOrder();
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
    function parcel(x,z,size,type){
      c.item(m,"parcel",x,.21,local(z),size,tints[type]);
      const badgeX=x+.19*size,top=.21+.563*size;
      m.box(badgeX,top,local(z),.24*size,.012,.24*size,ink());
      if(type===1)m.oval(badgeX,top+.012,local(z),.061*size,.009,.061*size,white,0,1,8);
      else {
        m.box(badgeX,top+.012,local(z),.161*size,.013,.044*size,white,0,1);
        if(type===0)m.box(badgeX,top+.014,local(z),.044*size,.013,.161*size,white,0,1);
      }
    }
    m.box(0,.08,local(.08),1.35,.15,8.20,0x455a67);
    m.box(0,.17,local(.08),1.22,.042,8.13,0x728b93);
    for(let k=0;k<21;k++)m.box(0,.208,local(-3.94+(k+(feed%1))*.391),1.19,.018,.032,0x9faeb1);
    for(const p of roll()){
      parcel(0,p.z,.78,p.rack);
      if(p.torn)m.box(0,.67,local(p.z+.275),.43,.075,.017,0xb84645,.28,1);
    }
    const ready=roll().some(v=>Math.abs(v.z-.30)<.46&&!v.torn&&v.rack===desired()&&v.i!==previous);
    for(const s of [-1,1])m.box(s*.95,.65,local(.30),.14,1.29,.16,0x324757);
    m.box(0,1.31,local(.30),1.98,.14,.18,0xdb6859);
    m.tube([-.78,1.21,local(.30)],[.78,.27,local(.30)],.019,.010,ready?0x79ffe3:0xfdbd7a,6,1);
    c.item(m,"register",2.19,.04,local(-1.96),1.22,0xe46f5b);
    if(!c.hasAward()&&desired()!=null)parcel(-2.35,.29,1.1,desired());
  }
  function swipe(p){return !!p.origin&&Math.abs(p.origin.x)<1.18;}
  function dragEnd(p){if(p.floor&&Math.abs(p.floor.z-.30)<1.32)scan();}
  return {start,tick,draw,swipe,dragEnd};
}

function makeSpecialTask(c,scenario){
  const wanted=[[2,3,1],[3,1,2],[1,3,3]][scenario];
  const x=[-2.05,0,2.05];
  let digits=[0,0,0];
  function verify(){
    if(digits.some((n,i)=>n!==wanted[i])){c.mistake("Match the number of stripes in each window");return;}
    c.flyTo(0,-2.38,()=>c.receive([0,0,-2.64]));
  }
  function update(){
    c.objective("Match the stripes above each reader");
    c.meter(wanted.join(" · ")+" target");
    x.forEach((a,i)=>c.marker("digit"+i,"Reader "+["A","B","C"][i],[a,.76,.58],()=>{
      digits[i]=(digits[i]+1)%4;c.tone([310+digits[i]*91]);update();
    },{kind:digits[i]===wanted[i]?"good":"clue",caption:String(digits[i])}));
    c.marker("verify","Verify receipt",[0,.73,-2.65],verify,{kind:"hot"});
  }
  function draw(m){
    x.forEach((a,i)=>{
      const z=c.localZ;
      m.box(a,.28,z(-.38),1.58,.52,2.56,ink(),0,4);
      m.box(a,1.04,z(-1.12),1.44,.46,.28,0xe4dfbf);
      for(let j=0;j<3;j++){
        if(j<wanted[i])m.box(a+(j-1)*.30,1.05,z(-.96),.13,.28,.045,ink());
        if(j<digits[i])m.box(a+(j-1)*.30,.58,z(.50),.13,.053,.35,0x9be2bd,0,1);
      }
    });
  }
  return {start:update,draw};
}

function make_returns(c,q){
  const bins=["Restock","Reseal","Reject"],colors=[0x84d9b2,0xefd184,0xd79283],lanes=[-2.45,0,2.45];
  let index=0,seen=false,placed=[];
  function inspect(){
    c.flyTo(0,1.52,()=>{seen=true;c.tone([348,571]);show();});
  }
  function route(i){
    const [name,type,order,actual,sealed]=q.cards[index];
    const correct=order!==actual?2:sealed?0:1;
    if(i!==correct){
      c.mistake(order!==actual?"The barcodes differ":sealed?"Matched return, seal intact":"Matched return, seal torn");
      return;
    }
    c.flyTo(lanes[i],-1.26,()=>{
      placed.push({i,type});index++;seen=false;
      c.pulse([lanes[i],.42,-1.55],colors[i],16);
      if(index===q.cards.length){c.receive([0,0,-2.69]);return;}
      c.feedback(true,"Return routed");show();
    });
  }
  function show(){
    const [name,,order,actual,sealed]=q.cards[index];
    c.objective(seen?"Route the returned "+name.toLowerCase():"Inspect the return label");
    c.meter(seen?order+" ↔ "+actual+" · "+(sealed?"seal intact":"seal torn"):"Order "+order+" · "+name);
    if(!seen)c.marker("inspect","Inspect return",[0,.69,1.33],inspect,{kind:"clue"});
    else c.off("inspect");
    bins.forEach((name,i)=>{
      if(seen)c.marker("bin"+i,name,[lanes[i],.79,-1.54],()=>route(i),{kind:"hot"});
      else c.off("bin"+i);
    });
  }
  function start(){index=0;seen=false;placed=[];show();}
  function draw(m){
    const z=c.localZ,card=q.cards[index];
    m.box(0,.27,z(1.29),1.52,.47,1.20,ink());
    m.box(0,.52,z(1.29),1.64,.10,1.26,trim());
    if(card){
      c.item(m,"parcel",0,.60,z(1.29),.92,seen?0xd2a579:bright());
      if(seen){
        const label=card[2]===card[3]?0x82d9b1:0xe08d7f;
        for(let k=0;k<5;k++)m.box((k-2)*.073,1.04,z(1.63),.048,.081,.036,label,0,1);
        m.box(.30,1.01,z(1.32),.11,.05,.37,card[4]?0x8fceab:0xe28369,0,1,card[4]?0:.22);
      }
    }
    lanes.forEach((x,i)=>{
      m.box(x,.25,z(-1.61),1.58,.43,1.16,ink());
      m.box(x,.46,z(-1.06),1.29,.16,.075,colors[i],0,1);
      const done=placed.filter(p=>p.i===i);
      done.forEach((p,j)=>c.item(m,p.type,x+(j-1)*.26,.47,z(-1.60),.57,colors[i]));
    });
  }
  return {start,draw};
}

function make_hold(c,q){
  let p=0,engaged=false,pieces=0,age=0,hot=false;
  const bands=q.bands;
  const inBand=()=>p>=bands[pieces][0]&&p<=bands[pieces][1];
  function arm(){
    if(engaged){release();return;}
    if(hot){c.feedback(false,"Cool the drill before starting the next core");return;}
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
    hot=Boolean(q.coolant);
    c.feedback(true,"Clean result");show();
  }
  function show(){
    c.objective(hot?"Cool the drill for the next layer":engaged?"Release inside the green band":q.goalText);
    c.meter(pieces+"/"+bands.length+" "+q.unit);
    if(hot){
      c.hideTools();
      c.marker("cool","Open coolant valve",[2.15,.73,.63],()=>c.flyTo(2.15,.56,()=>{
        hot=false;c.off("cool");c.pulse([2.15,.60,.63],0x8be4e0,14);c.tone([310,550]);show();
      }),{kind:"clue"});
    }else c.tool("press",engaged?(inBand()?"Release now":"Release"):q.begin,arm);
  }
  function start(){p=0;engaged=false;pieces=0;age=0;hot=false;show();}
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
    if(q.coolant)c.item(m,"gear",2.15,.10,z(.63),1.04,hot?0xe0a17e:0x9bd8cb);
    for(let i=0;i<bands.length;i++)c.item(m,q.object,(i-(bands.length-1)/2)*.83,.04,z(2.18),.69,i<pieces?0x79bfa0:trim());
  }
  return {start,tick,draw};
}

const taskFactories = {returns:make_returns, hold:make_hold};
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
