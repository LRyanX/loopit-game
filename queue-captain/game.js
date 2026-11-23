"use strict";

const GAME = {
  "title": "Queue Captain",
  "brief": "sale",
  "look": "market",
  "avatar": "explorer",
  "zones": [
    "Morning Queue",
    "Timed Bagging Counters",
    "Cashier Restock Bay"
  ],
  "awards": [
    "Morning queues cleared",
    "Bagging rush cleared",
    "Counters restocked"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 10985415,
    "haze": 15784908,
    "tile": 14931662,
    "tile2": 15321786,
    "ink": 4275554,
    "trim": 10847637,
    "accent": 7886954,
    "loot": 16044443,
    "css": "#78586a"
  },
  "passages": [
    "Enter Timed Bagging Counters",
    "Enter Cashier Restock Bay"
  ],
  "scene": "terminal",
  "footprint": "oct",
  "connector": "carpet",
  "camera": [
    -0.45,
    0.84,
    0.98,
    0.1
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      -7,
      -10,
      0,
      0.6
    ],
    [
      -7,
      -22,
      0,
      0
    ]
  ],
  "guides": [
    [
      "◫",
      "Assign a cashier"
    ],
    [
      "●",
      "Serve when lit"
    ],
    [
      "⇄",
      "Match items to bins"
    ]
  ],
  "ending": {
    "kind": "lanes",
    "title": "Queues cleared",
    "summary": "The last shoppers collect their bags and head out.",
    "pieces": [
      "person",
      "person",
      "person"
    ],
    "prize": "receipt"
  },
  "tasks": [
    {
      "kind": "service",
      "title": "Timed Bagging Counters",
      "goalText": "Bag each purchase when its register lights up",
      "delays": [
        0.58,
        1.08,
        1.44
      ],
      "award": "Bagging rush cleared"
    },
    {
      "kind": "sort",
      "title": "Cashier Restock Bay",
      "goalText": "Restock the right service bins",
      "name": "supply",
      "bins": [
        "Packing supplies",
        "Drawer supplies"
      ],
      "items": [
        [
          "Gift bags",
          "bag",
          0
        ],
        [
          "Change tray",
          "coin",
          1
        ],
        [
          "Tape refill",
          "parcel",
          0
        ]
      ],
      "award": "Counters restocked"
    }
  ],
  "form": "mall",
  "controls": [
    "world",
    "world",
    "world"
  ],
  "views": [
    [
      -0.49,
      0.84,
      0.91,
      0.21,
      0.78
    ],
    [
      0.18,
      0.53,
      0.94,
      -0.06,
      0.84
    ],
    [
      -0.37,
      0.63,
      0.99,
      0.06,
      0.79
    ]
  ]
};

function makeFirstTask(c){
  const rush=[
    {cart:[4,2,2],max:[4,4]},
    {cart:[3,2,5,2],max:[7,5]},
    {cart:[5,4,3,2,2],max:[7,5,4]}
  ];
  const person=[0xde846f,0xba9bbe,0x70a59e,0xe0ba61,0x6094b0];
  let plan,index=0,used=[],lanes=[],booth=[];
  function choose(i){
    const v=plan.cart[index];
    if(used[i]+v>plan.max[i]){c.mistake("That cashier has no time left");return;}
    c.flyTo(booth[i],-.45,()=>{
      lanes[i].push(index);used[i]+=v;index++;
      c.pulse([booth[i],.38,-.90],person[(index-1)%person.length]);
      if(index===plan.cart.length){c.receive([0,0,-2.49]);return;}
      c.feedback(true,"Shopper routed");refresh();
    });
  }
  function undo(){
    const i=lanes.findIndex(arr=>arr.at(-1)===index-1);
    if(i<0)return;
    index--;used[i]-=plan.cart[index];lanes[i].pop();
    refresh();
  }
  function refresh(){
    c.objective("Send the "+plan.cart[index]+" min shopper to a cashier");
    c.meter(index+"/"+plan.cart.length+" checked in · balance the queues");
    for(let i=0;i<booth.length;i++)c.marker("cash"+i,String.fromCharCode(65+i)+" "+used[i]+"/"+plan.max[i]+" min",[booth[i],.95,-1.22],()=>choose(i),{kind:"clue"});
    if(index)c.tool("undo","Undo last assignment",undo);
    else c.hideTools();
  }
  function start(i){plan=rush[i];index=0;booth=plan.max.length===3?[-2.53,0,2.53]:[-2.08,2.08];used=booth.map(()=>0);lanes=booth.map(()=>[]);refresh();}
  function draw(m){
    booth.forEach((x,i)=>{
      c.item(m,"register",x,.04,c.localZ(-2.19),1.54,i===0?0xd18a65:0x78b3a1);
      const load=used[i]/plan.max[i];
      m.box(x,.12,c.localZ(-.28),1.07,.09,2.42,0xc0cdca);
      if(load>0)m.box(x,.19,c.localZ(-1.49+1.17*load),.91,.064,2.36*load,0x85d2ad,0,1);
      lanes[i].forEach((j,slot)=>c.item(m,"person",x,.24,c.localZ(-1+slot*.66),.81,person[j]));
    });
    for(let i=index;i<plan.cart.length;i++){
      const z=1.98+(i-index)*.47;
      if(z>4.05)break;
      c.item(m,"person",0,.04,c.localZ(z),i===index?1.26:.84,person[i]);
    }
  }
  function swipe(p){return !!p.origin&&Math.abs(p.origin.x)<.84&&p.origin.z>1.25;}
  function dragEnd(p){
    if(!p.floor||p.floor.z>.57)return;
    const i=booth.findIndex(x=>Math.abs(x-p.floor.x)<.94);
    if(i>=0)choose(i);
  }
  return {start,draw,swipe,dragEnd};
}

function makeSecondTask(c,q){
  const spots=[-2.34,0,2.34];
  let requests=[],t=0,ok=0,started=false;
  const open=i=>started&&!requests[i].done&&t>=requests[i].delay&&t<requests[i].delay+.88;
  function begin(){started=true;t=0;c.off("begin");refresh();}
  function serve(i){
    if(!open(i)){c.mistake("Wait until that cashier lights up");return;}
    requests[i].done=true;ok++;
    c.pulse([spots[i],.66,-.62],0x80daad,18);
    if(ok===requests.length){c.receive([spots[i],0,-.62]);return;}
    c.feedback(true,"Checkout complete");refresh();
  }
  function refresh(){
    c.objective(started?q.goalText:"Open the staffed counters");
    c.meter(ok+"/"+requests.length+" customers served");
    if(!started)c.marker("begin","Open counters",[0,.74,2.47],begin,{kind:"clue"});
    for(let i=0;i<requests.length;i++)c.marker("counter"+i,"Serve "+String.fromCharCode(65+i),[spots[i],.88,-.47],()=>serve(i),
      {kind:open(i)?"good":"clue",hidden:!started||requests[i].done,disabled:!open(i)});
  }
  function start(){requests=q.delays.map(delay=>({delay,done:false}));t=0;ok=0;started=false;refresh();}
  function tick(dt){
    if(!started)return;
    const before=requests.map((_,i)=>open(i));t+=dt;
    for(const r of requests){
      if(!r.done&&t>=r.delay+.88)r.delay+=2.66;
    }
    if(before.some((x,i)=>x!==open(i)))refresh();
  }
  function draw(m){
    for(const [i,r] of requests.entries()){
      const x=spots[i];
      c.item(m,"register",x,.05,c.localZ(-.60),1.28,open(i)?0x7cdfb4:trim());
      c.item(m,"person",x,.02,c.localZ(.72),.94,r.done?0x82bfa9:bright());
      c.ring(m,x,.06,c.localZ(.73),.45,r.done?0x7fccb2:open(i)?0x9df8c8:trim(),.034);
    }
  }
  return {start,tick,draw};
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
