"use strict";

const GAME = {
  "title": "Price Pulse",
  "brief": "sale",
  "look": "station",
  "avatar": "explorer",
  "zones": [
    "Headset Drop",
    "Member Trade-In",
    "Price Lock Terminal"
  ],
  "awards": [
    "Headset basket",
    "Trade-in accepted",
    "Offers permanently locked"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 10197197,
    "haze": 15589609,
    "tile": 14473191,
    "tile2": 13094104,
    "ink": 3028827,
    "trim": 9272244,
    "accent": 6506657,
    "loot": 16241286,
    "css": "#6348a1"
  },
  "passages": [
    "Enter Member Trade-In",
    "Enter Price Lock Terminal"
  ],
  "scene": "auction",
  "footprint": "round",
  "connector": "carpet",
  "camera": [
    -0.42,
    0.6,
    1.02,
    0.01
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
      -8,
      0,
      0.91
    ],
    [
      -14,
      -18,
      0,
      0.38
    ]
  ],
  "guides": [
    [
      "↓",
      "Catch the price drop"
    ],
    [
      "$",
      "Make a trade-in"
    ],
    [
      "◉",
      "Hit the green zone"
    ]
  ],
  "ending": {
    "kind": "price",
    "title": "Price locked",
    "summary": "The confirmed price stays locked at checkout.",
    "pieces": [
      "headset",
      "camera",
      "receipt"
    ],
    "prize": "receipt"
  },
  "tasks": [
    {
      "kind": "offers",
      "title": "Member Trade-In",
      "goalText": "Trade eligible gear for a camera you can afford",
      "trade": [
        [
          "Broken gear",
          30,
          false
        ],
        [
          "Working gear",
          25,
          true
        ],
        [
          "Old case",
          8,
          true
        ]
      ],
      "stock": [
        [
          "Camera",
          64,
          "Camera",
          "camera"
        ],
        [
          "Lens",
          31,
          "Lens",
          "lamp"
        ],
        [
          "Headset",
          38,
          "Audio",
          "headset"
        ]
      ],
      "must": "Camera",
      "limit": 45,
      "award": "Trade-in accepted"
    },
    {
      "kind": "hold",
      "title": "Price Lock Terminal",
      "goalText": "Lock the printed offer at the pressure mark",
      "begin": "Engage lock",
      "unit": "offers locked",
      "bands": [
        [
          0.38,
          0.67
        ],
        [
          0.51,
          0.74
        ]
      ],
      "object": "coupon",
      "award": "Offers permanently locked"
    }
  ],
  "scenarios": [
    [
      {
        "kind": "offers",
        "title": "Member Trade-In",
        "goalText": "Trade eligible gear for a camera you can afford",
        "trade": [
          [
            "Broken gear",
            30,
            false
          ],
          [
            "Working gear",
            25,
            true
          ],
          [
            "Old case",
            8,
            true
          ]
        ],
        "stock": [
          [
            "Camera",
            64,
            "Camera",
            "camera"
          ],
          [
            "Lens",
            31,
            "Lens",
            "lamp"
          ],
          [
            "Headset",
            38,
            "Audio",
            "headset"
          ]
        ],
        "must": "Camera",
        "limit": 45,
        "award": "Trade-in accepted"
      },
      {
        "kind": "offers",
        "title": "Member Trade-In",
        "goalText": "Trade in for a headset under budget",
        "trade": [
          [
            "Cracked lens",
            29,
            false
          ],
          [
            "Working tuner",
            19,
            true
          ],
          [
            "Plain case",
            6,
            true
          ]
        ],
        "stock": [
          [
            "Camera",
            49,
            "Camera",
            "camera"
          ],
          [
            "Headset",
            41,
            "Headset",
            "headset"
          ],
          [
            "Speaker",
            29,
            "Audio",
            "lamp"
          ]
        ],
        "must": "Headset",
        "limit": 24,
        "award": "Trade-in accepted"
      },
      {
        "kind": "offers",
        "title": "Member Trade-In",
        "goalText": "Trade in for a lens under budget",
        "trade": [
          [
            "Scuffed case",
            11,
            true
          ],
          [
            "Working tripod",
            27,
            true
          ],
          [
            "Broken camera",
            35,
            false
          ]
        ],
        "stock": [
          [
            "Headset",
            31,
            "Headset",
            "headset"
          ],
          [
            "Lens",
            50,
            "Lens",
            "lamp"
          ],
          [
            "Camera",
            67,
            "Camera",
            "camera"
          ]
        ],
        "must": "Lens",
        "limit": 25,
        "award": "Trade-in accepted"
      }
    ],
    [
      {
        "kind": "hold",
        "title": "Price Lock Terminal",
        "goalText": "Lock the printed offer at the pressure mark",
        "begin": "Engage lock",
        "unit": "offers locked",
        "bands": [
          [
            0.38,
            0.67
          ],
          [
            0.51,
            0.74
          ]
        ],
        "object": "coupon",
        "award": "Offers permanently locked"
      },
      {
        "kind": "hold",
        "title": "Price Lock Terminal",
        "goalText": "Lock the printed offer at the pressure mark",
        "begin": "Engage lock",
        "unit": "offers locked",
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
        "object": "coupon",
        "award": "Offers permanently locked"
      },
      {
        "kind": "hold",
        "title": "Price Lock Terminal",
        "goalText": "Lock the printed offer at the pressure mark",
        "begin": "Engage lock",
        "unit": "offers locked",
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
        "object": "coupon",
        "award": "Offers permanently locked"
      }
    ]
  ],
  "form": "hub",
  "controls": [
    "tray",
    "tray",
    "tray"
  ],
  "views": [
    [
      -0.42,
      0.34,
      0.92,
      -0.09,
      0.79
    ],
    [
      0.34,
      0.74,
      0.88,
      0.24,
      0.83
    ],
    [
      -0.53,
      0.62,
      0.8,
      -0.2,
      0.77
    ]
  ]
};

function makeFirstTask(c){
  const stock=[
    {type:"headset",title:"Headsets",cap:48,cycle:[31,26,18,24],units:2},
    {type:"camera",title:"Cameras",cap:65,cycle:[39,34,22,28],units:2,fee:3},
    {type:"kettle",title:"Kettles",cap:52,cycle:[29,18,33,25],units:3,credit:6}
  ];
  let rule,age=0,total=0,units=0,lastSlot=-1;
  const when=()=>Math.floor(age/1.40);
  const retail=()=>rule.cycle[when()%rule.cycle.length];
  const price=()=>retail()+(rule.fee??0)-(units>0?(rule.credit??0):0);
  function refresh(){
    c.objective("Buy "+rule.units+" "+rule.title.toLowerCase()+" within budget");
    c.meter("$"+(rule.cap-total)+" left · "+units+"/"+rule.units+(rule.fee?" · $3 fee":rule.credit?(units?" · $6 member credit active":" · join after first buy"):" bought"));
    c.marker("buy","Claim $"+price(),[0,.75,-.32],buy,{kind:retail()<=Math.min(...rule.cycle)+1?"good":"hot",disabled:lastSlot===when()});
    if(units)c.tool("refund","Refund basket",()=>{total=0;units=0;lastSlot=-1;refresh();});
    else c.hideTools();
  }
  function buy(){
    const v=price(),left=rule.cap-total-v;
    if(v+total>rule.cap){c.mistake("Too expensive · wait for the price drop");return;}
    total+=v;units++;lastSlot=when();
    c.pulse([0,.55,-.26],0xf4d078,17);
    if(units===rule.units){c.receive([0,0,-2.50],"$"+total+" total · $"+left+" left");return;}
    c.feedback(true,"Flash deal claimed");
    if(left<(rule.units-units)*(Math.min(...rule.cycle)+(rule.fee??0)-(rule.credit??0)))c.message("Refund and catch a lower price",2.6);
    refresh();
  }
  function start(i){rule=stock[i];age=0;total=0;units=0;lastSlot=-1;refresh();}
  function tick(dt){
    const before=when();
    age+=dt;
    if(when()!==before)refresh();
  }
  function draw(m,time){
    c.pedestal(m,0,c.localZ(-.37),2.04,bright());
    c.item(m,rule.type,0,.25,c.localZ(-.37),1.65,0xedbb79);
    for(let i=0;i<rule.cycle.length;i++){
      const x=(i-(rule.cycle.length-1)/2)*.8;
      m.box(x,.36,c.localZ(-2.52),.51,.63,.46,i===when()%rule.cycle.length?0x8fe3b7:0x5d8092,0,1);
    }
    for(let i=0;i<units;i++)c.item(m,"bag",(i-1)*.88,.03,c.localZ(2.75),.82,bright());
    const f=(age%1.4)/1.4;
    m.box(0,.76,c.localZ(-2.52),2.82,.046,.065,ink());
    m.box((f-1)*.55,.794,c.localZ(-2.52),.30+f*2.28,.06,.084,0x8ee6c2,0,1);
  }
  return {start,tick,draw};
}

function makeSecondTask(c,q){
  let credit=-1,chosen=-1;
  const x=i=>(i-1)*2.29;
  function chooseCredit(i){credit=i;chosen=-1;c.feedback(true);show();}
  function pick(i){chosen=i;c.tone([392,523]);show();}
  function claim(){
    if(credit<0||chosen<0)return;
    const trade=q.trade[credit],buy=q.stock[chosen];
    const total=buy[1]-trade[1];
    if(!trade[2]||buy[2]!==q.must||total>q.limit){
      c.mistake("Check eligibility, product and remaining cost");
      return;
    }
    c.flyTo(0,-3.06,()=>c.receive([0,0,-3.16],"$"+total+" after trade-in"));
  }
  function show(){
    c.objective(credit<0?q.goalText:chosen<0?"Choose eligible gear":"Confirm your trade-in");
    const net=credit>=0&&chosen>=0?q.stock[chosen][1]-q.trade[credit][1]:null;
    c.meter(q.must+" · $"+q.limit+" max"+(net!==null?" · net $"+net:""));
    q.trade.forEach(([name,value],i)=>{
      if(credit<0)c.marker("trade"+i,name+" +$"+value,[x(i),.74,2.31],()=>chooseCredit(i),{kind:"clue"});
      else c.off("trade"+i);
    });
    q.stock.forEach(([name,price],i)=>{
      if(credit>=0)c.marker("pick"+i,name+" $"+price,[x(i),.77,-.58],()=>pick(i),{kind:chosen===i?"good":"hot"});
      else c.off("pick"+i);
    });
    if(credit>=0)c.marker("change","Change trade-in",[x(credit),.74,2.31],()=>chooseCredit(-1),{kind:"clue",caption:"Change"});
    else c.off("change");
    if(chosen>=0)c.tool("claim","Apply trade-in",claim);
    else c.hideTools();
  }
  function start(){credit=-1;chosen=-1;show();}
  function draw(m,t){
    const z=c.localZ;
    q.trade.forEach((v,i)=>{c.pedestal(m,x(i),z(2.31),1.32,credit===i?0x82c9a8:trim());c.item(m,"coupon",x(i),.22,z(2.31),.92,v[2]?bright():0xe0a071);});
    q.stock.forEach((v,i)=>{c.pedestal(m,x(i),z(-.66),1.31,chosen===i?0x82c9a8:trim());c.item(m,v[3]||"box",x(i),.22,z(-.65),1.03,[0x87abbf,0xecb96d,0x81bda9][i]);});
    c.item(m,"register",0,.04,z(-3.34),1.2,bright());
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
