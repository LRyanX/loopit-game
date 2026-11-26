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
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "$",
          "Find the best deal"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "$",
          "Find the best deal"
        ]
      }
    ],
    [
      {
        "kind": "audit",
        "guide": [
          "!",
          "Find the mismatch"
        ],
        "runs": [
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
                "clue": "Cameras $45–55 · tag G",
                "labels": [
                  "G · $52",
                  "G · $39",
                  "G · $48"
                ],
                "wrong": 1
              },
              {
                "clue": "Footwear $24–32",
                "labels": [
                  "Boots $28",
                  "Shoes $26",
                  "Slippers $35"
                ],
                "wrong": 2
              }
            ],
            "award": "Expired promos reported"
          },
          {
            "kind": "audit",
            "title": "Offer Audit Desk",
            "goalText": "Flag the price card that breaks the posted rules",
            "sourceName": "sign",
            "object": "coupon",
            "rows": [
              {
                "clue": "Kitchen deals $30–40",
                "labels": [
                  "Kettle $28",
                  "Mug $35",
                  "Lamp $38"
                ],
                "wrong": 0
              },
              {
                "clue": "Cameras $45–55 · tag G",
                "labels": [
                  "G · $52",
                  "G · $39",
                  "G · $48"
                ],
                "wrong": 1
              },
              {
                "clue": "Footwear $24–32",
                "labels": [
                  "Boots $28",
                  "Shoes $26",
                  "Slippers $35"
                ],
                "wrong": 2
              }
            ],
            "award": "Expired promos reported"
          }
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
                "Out-of-date receipt",
                "receipt",
                1
              ],
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
                "In-date voucher",
                "coupon",
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
              ],
              [
                "Current claim",
                "receipt",
                0
              ]
            ],
            "award": "Rebates filed"
          }
        ]
      }
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

function makeSpecialTask(c,scenario){
  const [base,percent,credit,cashFirst]=[[50,20,5,false],[75,20,10,true],[60,25,8,false]][scenario];
  const apply=(p,i)=>i===0?Math.round(p*(100-percent))/100:p-credit;
  const target=apply(apply(base,cashFirst?1:0),cashFirst?0:1);
  let price=base,used=[];
  function update(){
    c.objective("Apply both discounts to hit the total");
    c.meter("$"+price.toFixed(2)+" → $"+target.toFixed(2));
    ["Apply percent","Use credit"].forEach((name,i)=>{
      if(used.includes(i))c.off("coupon"+i);
      else c.marker("coupon"+i,name,[(i-.5)*3.7,.73,.73],()=>{
        price=apply(price,i);used.push(i);c.tone([333+i*93]);update();
      },{kind:"clue",caption:i===0?"−"+percent+"%":"−$"+credit});
    });
    if(used.length===2){
      c.marker("receipt","Approve total",[0,.65,-2.22],()=>{
        if(price!==target){c.mistake("Try the discounts in the other order");return;}
        c.flyTo(0,-2.02,()=>c.receive([0,0,-2.34]));
      },{kind:"hot"});
      c.tool("reset","Reset discounts",()=>{used=[];price=base;c.hideTools();update();});
    }else c.off("receipt");
  }
  function draw(m){
    c.item(m,"register",0,.05,c.localZ(-2.32),1.45,bright());
    for(let i=0;i<2;i++){
      const x=(i-.5)*3.7,p=used.indexOf(i);
      c.item(m,"coupon",p<0?x:(p-.5)*.64,.27,c.localZ(p<0?.73:-1.28),1.49,i===0?0x94d9bd:0xf0bd82);
    }
  }
  return {start:update,draw};
}

function make_audit(c,q){
  const col=[-2.35,0,2.35],badge=[0x77be9f,0xe6b16a,0xab94c8];
  let index=0,seen=false,labels=[];
  function read(){
    c.flyTo(0,2.53,()=>{
      seen=true;c.tone([294,442]);c.pulse([0,.63,2.55],bright(),12);update();
    });
  }
  function choose(i){
    c.flyTo(col[i],-.51,()=>{
      if(i!==q.rows[index].wrong){c.mistake("That record matches");return;}
      labels=[];seen=false;index++;
      c.pulse([col[i],.52,-1.08],0xf3cd81,18);
      if(index===q.rows.length){c.receive([col[i],0,-1.11]);return;}
      c.feedback(true,"Mismatch reported");update();
    });
  }
  function update(){
    c.objective(seen?(q.flip&&labels.length<3?"Turn the labels to compare":q.goalText):"Inspect the next "+q.sourceName.toLowerCase());
    c.meter(seen?q.rows[index].clue:(index+"/"+q.rows.length+" checked"));
    if(!seen)c.marker("read","Read "+q.sourceName,[0,.66,2.55],read,{kind:"clue"});
    else c.off("read");
    q.rows[index].labels.forEach((name,i)=>{
      if(seen&&q.flip&&labels.length<3&&!labels.includes(i))c.marker("doc"+i,"Turn label "+(i+1),[col[i],.77,-.95],()=>{
        c.flyTo(col[i],-.53,()=>{labels.push(i);c.tone([360,495]);update();});
      },{kind:"clue"});
      else if(seen&&(!q.flip||labels.includes(i)))c.marker("doc"+i,name,[col[i],.77,-.95],()=>choose(i),{kind:"hot",disabled:q.flip&&labels.length<3});
      else c.off("doc"+i);
    });
  }
  function start(){index=0;seen=false;labels=[];update();}
  function draw(m,t){
    const z=c.localZ;
    c.pedestal(m,0,z(2.55),1.32,trim());
    c.item(m,"receipt",0,.22,z(2.55),1.2,bright(),t*.08);
    for(let i=0;i<3;i++){
      c.pedestal(m,col[i],z(-.99),1.51,badge[i]);
      c.item(m,q.object,col[i],.23,z(-1.03),1.01,badge[i]);
      if(seen)c.item(m,"coupon",col[i]+.47,.25,z(-.64),.61,0xeed1a0,q.flip&&!labels.includes(i)?Math.PI*.50:0);
    }
  }
  return {start,draw};
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

const taskFactories = {audit:make_audit, sort:make_sort};
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
