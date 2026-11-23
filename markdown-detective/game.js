"use strict";

const GAME = {
  "title": "Markdown Detective",
  "brief": "sale",
  "look": "boutique",
  "avatar": "explorer",
  "zones": [
    "Audio Doorbusters",
    "Offer Audit Desk",
    "Customer Refunds"
  ],
  "awards": [
    "Audio receipt",
    "Expired promos reported",
    "Rebates filed"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 11707608,
    "haze": 16114903,
    "tile": 14801375,
    "tile2": 15323085,
    "ink": 3749720,
    "trim": 10322337,
    "accent": 7817848,
    "loot": 16108177,
    "css": "#774a78"
  },
  "passages": [
    "Enter Offer Audit Desk",
    "Enter Customer Refunds"
  ],
  "scene": "showroom",
  "footprint": "round",
  "connector": "carpet",
  "camera": [
    0.39,
    0.63,
    1.02,
    0.22
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
      0.85
    ],
    [
      -14,
      -16,
      0,
      0.46
    ]
  ],
  "guides": [
    [
      "$",
      "Find the best deal"
    ],
    [
      "!",
      "Find the mismatch"
    ],
    [
      "⇄",
      "Match items to bins"
    ]
  ],
  "ending": {
    "kind": "stamp",
    "title": "Deal verified",
    "summary": "The audit stamp confirms your bargain.",
    "pieces": [
      "coupon",
      "receipt",
      "receipt"
    ],
    "prize": "receipt"
  },
  "tasks": [
    {
      "kind": "audit",
      "title": "Offer Audit Desk",
      "goalText": "Flag the price card that breaks the posted rules",
      "sourceName": "sign",
      "object": "coupon",
      "rows": [
        {
          "clue": "Headsets $22–30 · sticker R",
          "labels": [
            "R · $24",
            "R · $27",
            "X · $29"
          ],
          "wrong": 2
        },
        {
          "clue": "Kitchen deals $30–40",
          "labels": [
            "Kettle $28",
            "Mug $35",
            "Lamp $38"
          ],
          "wrong": 0
        }
      ],
      "award": "Expired promos reported"
    },
    {
      "kind": "sort",
      "title": "Customer Refunds",
      "goalText": "Route rebate claims to their processing bins",
      "name": "claim",
      "bins": [
        "Valid claims",
        "Expired claims"
      ],
      "items": [
        [
          "Current claim",
          "receipt",
          0
        ],
        [
          "Expired claim",
          "coupon",
          1
        ],
        [
          "Verified claim",
          "receipt",
          0
        ]
      ],
      "award": "Rebates filed"
    }
  ],
  "form": "mall",
  "controls": [
    "tray",
    "tray",
    "tray"
  ],
  "views": [
    [
      0.32,
      0.41,
      0.96,
      -0.33,
      0.79
    ],
    [
      -0.42,
      0.67,
      0.88,
      0.11,
      0.8
    ],
    [
      0.22,
      0.61,
      0.88,
      -0.33,
      0.77
    ]
  ]
};

function makeFirstTask(c){
  const aisles=[
    {item:"headset",name:"headset",rule:"Subtract the coupon",wallet:30,
      offers:[[42,10,0,0],[38,14,0,0],[29,3,0,0]]},
    {item:"kettle",name:"kettle",rule:"Compare percent-off prices",wallet:40,
      offers:[[50,0,20,0],[48,0,10,0],[44,0,25,0]]},
    {item:"shoe",name:"sneakers",rule:"Apply the percent deal, then member credit",wallet:47,
      offers:[[60,0,20,2],[64,0,25,7],[52,0,10,2]]}
  ];
  let aisle,sold=false;
  const slots=[-2.58,0,2.58];
  const money=v=>"$"+v;
  const net=([tag,cut,percent,credit])=>Math.round(tag*(100-percent)/100)-cut-credit;
  function offerLabel([price,cut,percent,credit]){
    return money(price)+(percent?" −"+percent+"%":" − "+money(cut))+(credit?" − "+money(credit):"");
  }
  function tryDeal(i){
    c.flyTo(slots[i],.29,()=>{
      const shelf=aisle.offers[i][0],price=net(aisle.offers[i]);
      if(price>aisle.wallet||aisle.offers.some(offer=>net(offer)<price)){
        c.mistake(money(price)+" after discount · look for less");
        return;
      }
      sold=true;
      c.receive([slots[i],0,-.59],"Paid "+money(price)+" · saved "+money(shelf-price));
    });
  }
  function start(stage){
    aisle=aisles[stage];sold=false;
    c.objective("Find the lowest "+aisle.name+" price");
    c.meter(aisle.rule+" · "+money(aisle.wallet)+" max");
    aisle.offers.forEach((o,i)=>c.marker("offer"+i,offerLabel(o),[slots[i],.92,-.25],()=>tryDeal(i),{kind:"hot"}));
  }
  function draw(m,time){
    for(const [i,x] of slots.entries()){
      c.pedestal(m,x,c.localZ(-.59),1.35,bright());
      c.item(m,aisle.item,x,.22,c.localZ(-.59),1.32,[0xf08961,0x6fbabc,0xd1ad72][i],time*.18);
      c.item(m,"coupon",x,.15,c.localZ(-1.45),.67,0xf3cf7e);
    }
    c.item(m,"register",0,.02,c.localZ(-3.38),1.27,bright());
    if(sold)c.ring(m,0,.065,c.localZ(-3.38),.69,0x81f2bd);
  }
  return {start,draw};
}

function makeSecondTask(c,q){
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

function makeThirdTask(c,q){
  const x=[-2.47,2.47];
  let index=0,held=false,settled=[];
  function grab(){c.flyTo(0,1.80,()=>{held=true;c.tone([315,498]);update();});}
  function drop(side){
    c.flyTo(x[side],-.88,()=>{
      const part=q.items[index];
      if(side!==part[2]){c.mistake("Look at the label and choose another bin");return;}
      settled.push({side,part:index});held=false;index++;
      c.pulse([x[side],.48,-1.68],bright(),18);
      if(index===q.items.length){c.receive([x[side],0,-2.42]);return;}
      c.feedback(true,"Item accepted");update();
    });
  }
  function update(){
    c.objective(held?q.goalText:"Pick up the next "+q.name.toLowerCase());
    c.meter(index+"/"+q.items.length+" · "+q.items[index][0]);
    if(!held)c.marker("grab","Pick "+q.items[index][0],[0,.78,1.94],grab,{kind:"clue"});else c.off("grab");
    q.bins.forEach((name,i)=>{if(held)c.marker("bin"+i,name,[x[i],.77,-1.65],()=>drop(i),{kind:"hot"});else c.off("bin"+i);});
  }
  function start(){index=0;held=false;settled=[];update();}
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
    c.pedestal(m,0,z(1.94),1.36,trim());
    c.item(m,item[1],held?c.player.x:0,held?.76:.24,held?c.player.z:z(1.94),1.1,!held?bright():0xf0bb73);
  }
  return {start,draw};
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
