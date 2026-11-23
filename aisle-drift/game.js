"use strict";

const GAME = {
  "title": "Aisle Drift",
  "brief": "sale",
  "look": "runway",
  "avatar": "cart",
  "zones": [
    "Doorbuster Rush",
    "High Shelf Drops",
    "Busy Checkout Crossing"
  ],
  "awards": [
    "Opening deals",
    "Shelf drops collected",
    "Cart reached checkout"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 7907018,
    "haze": 16113601,
    "tile": 15127999,
    "tile2": 14603433,
    "ink": 2440280,
    "trim": 10836817,
    "accent": 11813686,
    "loot": 16108402,
    "css": "#b44336"
  },
  "passages": [
    "Enter High Shelf Drops",
    "Enter Busy Checkout Crossing"
  ],
  "scene": "runway",
  "footprint": "long",
  "connector": "carpet",
  "camera": [
    0,
    0.44,
    0.98,
    -0.72
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
      -12,
      0,
      0
    ],
    [
      0,
      -24,
      0.0,
      0
    ]
  ],
  "tasks": [
    {
      "kind": "catch",
      "title": "High Shelf Drops",
      "goalText": "Catch the marked sale boxes as they drop",
      "begin": "Start shelf feed",
      "drops": [
        -1.04,
        1.04,
        2.08
      ],
      "object": "gift",
      "award": "Shelf drops collected"
    },
    {
      "kind": "traffic",
      "title": "Busy Checkout Crossing",
      "goalText": "Wait for gaps in the crossing traffic",
      "wait": "Wait for a gap",
      "gates": 3,
      "object": "person",
      "tint": 15976834,
      "award": "Cart reached checkout"
    }
  ],
  "form": "aisle",
  "controls": [
    "tray",
    "tray",
    "tray"
  ],
  "views": [
    [
      0,
      0.29,
      0.91,
      -0.91,
      0.91
    ],
    [
      0.55,
      0.54,
      0.88,
      0.74,
      0.84
    ],
    [
      0,
      0.34,
      0.89,
      -0.19,
      0.89
    ]
  ]
};

function makeFirstTask(c){
  const runs=[
    [[1,0,0],[0,2,1],[2,1,0],[1,2,1]],
    [[2,0,0],[1,2,1],[0,1,1],[2,0,1],[1,0,0]],
    [[0,2,1],[2,1,0],[1,0,1],[0,2,0],[2,1,1],[1,0,0]]
  ];
  const lanes=[-2.25,0,2.25];
  let layout,lane=1,position=0,next=0,on=false,taken=0,zone=0,hand=0;
  function show(){
    const nextSale=layout[next]?.[0];
    c.objective(on?"Steer onto the sale items":"Steer to start the dash");
    c.meter(taken+"/"+layout.length+" deals · avoid shoppers"+(nextSale!=null?" · next "+["left","middle","right"][nextSale]:""));
  }
  function steer(d){lane=clamp(lane+d,0,2);on=true;show();c.tone([339+lane*48],.05,.057);}
  function resetLine(){position=0;next=0;taken=0;lane=1;on=false;show();}
  function start(stage){
    layout=runs[stage];zone=stage;hand=0;resetLine();
    c.tool("left","Left lane",()=>steer(-1));
    c.tool("middle","Center lane",()=>{lane=1;on=true;show();});
    c.tool("right","Right lane",()=>steer(1));
  }
  function tick(dt){
    c.player.x=lerp(c.player.x,lanes[lane],1-Math.exp(-dt*13));
    c.player.z=c.localZ(3.15);
    if(!on)return;
    position+=dt*[2.88,3.17,3.49][zone];
    if(position<1.69+next*2.88)return;
    const [get,avoid]=layout[next];
    if(lane===avoid){c.mistake("Traffic · start the aisle again");resetLine();return;}
    if(lane!==get){c.mistake("Deal missed · restart this aisle");resetLine();return;}
    taken++;next++;
    c.pulse([lanes[lane],.56,3.08],0xf3c675,14);
    if(next===layout.length){c.receive([lanes[lane],0,.72]);return;}
    c.feedback(true,"Deal in cart",.75);show();
  }
  function draw(m){
    for(let i=0;i<3;i++){
      for(let j=0;j<13;j++)m.box((i-1)*2.25+.82,.041,c.localZ(-4.19+(j+position%1)*1.02),.045,.012,.44,trim());
      const x=lanes[i],z=c.localZ(5.92+position%1);
      m.tri([x-.33,.046,z+.18],[x+.33,.046,z+.18],[x,.046,z-.24],0xd9aa75);
    }
    for(let i=next;i<layout.length;i++){
      const p=1.69+i*2.88-position,z=3.15-p,[good,bad,kind]=layout[i];
      if(z < -4.33||z>4.20)continue;
      c.item(m,kind?"bag":"gift",lanes[good],.25,c.localZ(z),.86,0xe8ae63);
      c.ring(m,lanes[good],.052,c.localZ(z),.59,0xf4d67a,.039);
      c.item(m,"person",lanes[bad],0,c.localZ(z),1.26,palettePerson(i));
    }
  }
  function palettePerson(i){return [0x749bb3,0xa392b5,0x699881][i%3];}
  function key(n){
    if(n==="arrowleft"||n==="a"){steer(-1);return true;}
    if(n==="arrowright"||n==="d"){steer(1);return true;}
    return false;
  }
  function swipe(p){
    if(Math.abs(p.totalX)<Math.abs(p.totalY)*.75)return false;
    hand+=p.dx;
    if(Math.abs(hand)>32){steer(Math.sign(hand));hand=0;}
    return true;
  }
  function dragEnd(){hand=0;}
  return {start,tick,draw,key,swipe,dragEnd,lockMove:true};
}

function makeSecondTask(c,q){
  let x=0,target=0,phase=0,seen=0,aging=false;
  const shapes=[0xf1c46f,0xcb8992,0x78c8b0,0xa6a5d8];
  function start(){
    x=0;target=0;phase=0;seen=0;aging=false;
    c.objective(q.goalText);
    c.meter("0/"+q.drops.length+" caught");
    c.tool("arm",q.begin,()=>{aging=true;c.hideTools();steer(-1);show();});
  }
  function steer(d){target=clamp(target+d*1.04,-2.76,2.76);c.tone([327+d*25],.054,.073);}
  function show(){
    c.tool("left","Basket left",()=>steer(-1));
    c.tool("right","Basket right",()=>steer(1));
  }
  function tick(dt){
    x=lerp(x,target,1-Math.exp(-dt*13));
    c.player.x=x;c.player.z=c.localZ(.91);
    if(!aging)return;
    phase+=dt;
    if(phase<1.68)return;
    phase=0;
    if(Math.abs(x-q.drops[seen])>.79){c.mistake("Missed the item · it rolls back");return;}
    c.pulse([x,.53,.89],shapes[seen],18);seen++;
    if(seen===q.drops.length){c.receive([x,0,.95]);return;}
    c.meter(seen+"/"+q.drops.length+" caught");c.feedback(true);
  }
  function draw(m){
    const z=c.localZ;
    m.box(0,1.85,z(.96),6.91,.12,.72,trim());
    m.box(0,1.78,z(.96),6.55,.09,.49,ink());
    for(const p of [-3.57,3.57])m.box(p,.88,z(.96),.16,1.74,.23,trim());
    if(aging&&seen<q.drops.length){
      const px=q.drops[seen],y=1.53-curve(phase/1.68)*1.42;
      c.ring(m,px,.056,z(.92),.39,shapes[seen],.026);
      c.item(m,q.object,px,y,z(.92),.65,shapes[seen],phase*.85);
    }
  }
  function swipe(p){
    if(!aging||!p.floor)return false;
    target=clamp(p.floor.x,-2.76,2.76);return true;
  }
  return {start,tick,draw,swipe,lockMove:true};
}

function makeThirdTask(c,q){
  let next=0,clock=0,current=3.18,path=null,last=false;
  const markerZ=i=>2.74-i*1.62;
  const open=()=>((clock+next*.51)%2.32)>.67&&((clock+next*.51)%2.32)<1.73;
  function tryStep(){
    if(path)return;
    if(!open()){c.mistake(q.wait);return;}
    const target=markerZ(next)-1.04;
    path={from:current,to:target,at:c.clock()};
    c.tone([315,461]);show();
  }
  function show(){
    c.objective(q.goalText);
    c.meter(next+"/"+q.gates+" gaps crossed");
    c.tool("cross",open()?"Cross now":q.wait,tryStep,Boolean(path));
  }
  function start(){next=0;clock=0;current=3.18;path=null;last=false;show();}
  function tick(dt,t){
    clock+=dt;
    if(path){
      const f=curve((t-path.at)/.35);
      current=lerp(path.from,path.to,f);
      if(f>=1){
        path=null;next++;
        if(next===q.gates){c.receive([0,0,current-.32]);return;}
        c.pulse([0,.34,current],0x7fe2ad,11);show();
      }
    }
    if(open()!==last){last=open();show();}
    c.player.x=0;c.player.z=c.localZ(current);
  }
  function draw(m){
    const z=c.localZ;
    for(let i=0;i<q.gates;i++){
      const dz=markerZ(i),live=i===next&&open();
      m.box(0,.07,z(dz),5.62,.121,.75,i<next?trim():ink());
      m.box(0,.14,z(dz),1.15,.063,.61,live||i<next?0x81d2a7:GAME.palette.loot,0,1);
      for(const side of [-1,1]){
        const active=i===next&&(live||path);
        if(q.object==="person"){
          const v=((clock+i*.22)%2.32)/2.32;
          c.item(m,q.object,side*(.16+Math.abs(v-.50)*5.61),.14,z(dz),.81,active?0x81b9a3:bright());
        } else {
          for(let j=0;j<3;j++)m.gem(side*(.55+j*.38),active?.14:.34,z(dz),.085,active?.07:.39,.092,q.tint,4,0,1);
        }
      }
    }
  }
  function tap(p){if(Math.abs(p.x)>1.2)return false;tryStep();return true;}
  return {start,tick,draw,tap,lockMove:true};
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
