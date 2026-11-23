"use strict";

const GAME = {
  "title": "Bundle Builder",
  "brief": "sale",
  "look": "boutique",
  "avatar": "cart",
  "zones": [
    "Coffee Deal Bar",
    "Gift Wrapping Bench",
    "Ribbon Workshop"
  ],
  "awards": [
    "Coffee kit",
    "Gift paper sealed",
    "Gift set wrapped"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 8824504,
    "haze": 16113864,
    "tile": 14997701,
    "tile2": 14474445,
    "ink": 4016721,
    "trim": 11701095,
    "accent": 8080692,
    "loot": 16109190,
    "css": "#7b4d34"
  },
  "passages": [
    "Enter Gift Wrapping Bench",
    "Enter Ribbon Workshop"
  ],
  "scene": "kiosk",
  "footprint": "kite",
  "connector": "carpet",
  "camera": [
    0.46,
    0.73,
    1.1,
    0.02
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      9,
      -7,
      0,
      -0.85
    ],
    [
      15,
      -13,
      0,
      -0.44
    ]
  ],
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "◇",
          "Build the bundle"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "◇",
          "Build the bundle"
        ]
      }
    ],
    [
      {
        "kind": "fold",
        "guide": [
          "↪",
          "Fold the gift wrap"
        ],
        "runs": [
          {
            "kind": "fold",
            "title": "Gift Wrapping Bench",
            "goalText": "Fold the wrapping so the seams overlap in order",
            "order": [
              2,
              0,
              1,
              3
            ],
            "award": "Gift paper sealed"
          },
          {
            "kind": "fold",
            "title": "Gift Wrapping Bench",
            "goalText": "Fold the wrapping so the seams overlap in order",
            "order": [
              3,
              1,
              0,
              2
            ],
            "award": "Gift paper sealed"
          },
          {
            "kind": "fold",
            "title": "Gift Wrapping Bench",
            "goalText": "Fold the wrapping so the seams overlap in order",
            "order": [
              0,
              2,
              3,
              1
            ],
            "award": "Gift paper sealed"
          }
        ]
      }
    ],
    [
      {
        "kind": "ties",
        "guide": [
          "∞",
          "Match the ribbons"
        ],
        "runs": [
          {
            "kind": "ties",
            "title": "Ribbon Workshop",
            "goalText": "Match each ribbon, then choose its knot",
            "names": [
              "Orange",
              "Mint",
              "Violet"
            ],
            "end": [
              1,
              2,
              0
            ],
            "knots": [
              0,
              1,
              0
            ],
            "award": "Gift set wrapped"
          },
          {
            "kind": "ties",
            "title": "Ribbon Workshop",
            "goalText": "Match each ribbon, then choose its knot",
            "names": [
              "Orange",
              "Mint",
              "Violet"
            ],
            "end": [
              2,
              0,
              1
            ],
            "knots": [
              1,
              0,
              1
            ],
            "award": "Gift set wrapped"
          },
          {
            "kind": "ties",
            "title": "Ribbon Workshop",
            "goalText": "Match each ribbon, then choose its knot",
            "names": [
              "Orange",
              "Mint",
              "Violet"
            ],
            "end": [
              0,
              2,
              1
            ],
            "knots": [
              0,
              1,
              1
            ],
            "award": "Gift set wrapped"
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "wrap",
    "title": "Bundle wrapped",
    "summary": "The kit, paper and ribbon come together as a gift.",
    "pieces": [
      "kettle",
      "mug",
      "parcel"
    ],
    "prize": "gift"
  },
  "tasks": [
    {
      "kind": "fold",
      "title": "Gift Wrapping Bench",
      "goalText": "Fold the wrapping so the seams overlap in order",
      "order": [
        2,
        0,
        1,
        3
      ],
      "award": "Gift paper sealed"
    },
    {
      "kind": "ties",
      "title": "Ribbon Workshop",
      "goalText": "Match each ribbon, then choose its knot",
      "names": [
        "Orange",
        "Mint",
        "Violet"
      ],
      "end": [
        1,
        2,
        0
      ],
      "knots": [
        0,
        1,
        0
      ],
      "award": "Gift set wrapped"
    }
  ],
  "form": "counter",
  "controls": [
    "tray",
    "tray",
    "world"
  ],
  "views": [
    [
      0.48,
      0.7,
      0.91,
      0.1,
      0.82
    ],
    [
      0.03,
      1.06,
      0.84,
      0.18,
      0.76
    ],
    [
      -0.21,
      0.9,
      0.84,
      0.03,
      0.77
    ]
  ]
};

function makeFirstTask(c){
  const sets=[
    {name:"Coffee kit",listen:"Kettle + mug + gift box",budget:42,need:["kettle","mug","gift"],cut:8,stock:[["kettle",23],["mug",10],["mug",16],["lamp",15],["gift",16]]},
    {name:"Creator kit",listen:"Camera + headset + lamp",budget:59,need:["camera","headset","lamp"],cut:12,stock:[["camera",34],["headset",21],["headset",26],["shoe",17],["lamp",14]]},
    {name:"Gift kit",listen:"Shoes + mug + lamp",budget:59,need:["shoe","mug","lamp"],cut:15,stock:[["shoe",31],["mug",14],["lamp",26],["lamp",32],["gift",17]]}
  ];
  const names={kettle:"Kettle",mug:"Mug",lamp:"Lamp",camera:"Camera",headset:"Headset",shoe:"Shoes",gift:"Gift box"};
  const hues=[0xe7a859,0x81b6bb,0xd58094,0x7fae80,0xa49dce];
  const sample=[[ -2.22,1.93],[0,2.29],[2.22,1.93],[-1.28,-.38],[1.28,-.38]];
  let cfg,selected=[];
  const matches=()=>cfg.need.every(n=>selected.some(i=>cfg.stock[i][0]===n));
  const sum=()=>selected.reduce((total,i)=>total+cfg.stock[i][1],0);
  const cost=()=>sum()-(matches()?cfg.cut:0);
  function refresh(){
    c.objective(cfg.listen+" · $"+cfg.budget+" max");
    c.meter(cfg.listen+" · $"+cost()+"/"+cfg.budget+" · −$"+cfg.cut+" bundle");
    cfg.stock.forEach(([id,price],i)=>{
      const active=selected.includes(i),[x,z]=sample[i];
      c.marker("sku"+i,(active?"✓ ":"")+names[id]+" $"+price,[x,.65,z],()=>pick(i),{kind:active?"good":"hot"});
    });
    if(selected.length===cfg.need.length)c.tool("checkout","Check out",checkout);
    else c.hideTools();
  }
  function pick(i){
    if(selected.includes(i)){selected=selected.filter(n=>n!==i);c.tone([331]);refresh();return;}
    if(selected.length===cfg.need.length){c.feedback(false,"Deselect an item to swap");return;}
    selected.push(i);c.tone();refresh();
  }
  function checkout(){
    if(!matches()||selected.length!==cfg.need.length){c.mistake("The kit is missing a required product");return;}
    if(cost()>cfg.budget){c.mistake("Over budget · swap to a cheaper item");return;}
    c.flyTo(0,-2.72,()=>c.receive([0,0,-2.95],cfg.name+" · $"+cost()));
  }
  function start(i){cfg=sets[i];selected=[];refresh();}
  function draw(m,time){
    cfg.stock.forEach(([type],i)=>{
      const [x,z]=sample[i];
      const active=selected.includes(i);
      c.pedestal(m,x,c.localZ(z),1.42,active?0x8cd4ae:hues[i]);
      c.item(m,type,x,.22,c.localZ(z),1.12,hues[i]);
      if(active)c.ring(m,x,.23,c.localZ(z),.66,0x7cf2aa);
    });
    c.item(m,"register",0,.03,c.localZ(-3.36),1.23,bright());
  }
  function tap(p){
    const i=sample.findIndex(([x,z],id)=>id<cfg.stock.length&&Math.hypot(p.x-x,p.z-z)<.68);
    if(i<0)return false;
    pick(i);return true;
  }
  return {start,draw,tap};
}

function makeSpecialTask(c,scenario){
  const sizeNames=["Small","Medium","Large"],tags=["Thank you","Birthday","Holiday"];
  const [needSize,needTag]=[[1,2],[2,0],[0,1]][scenario];
  let size=0,tag=0;
  function update(){
    c.objective("Fit the sleeve and match the gift tag");
    c.meter(sizeNames[needSize]+" · "+tags[needTag]);
    c.marker("size","Change sleeve",[-1.71,.71,.91],()=>{size=(size+1)%3;c.tone();update();},{kind:"clue",caption:sizeNames[size]});
    c.marker("tag","Change gift tag",[1.72,.72,.90],()=>{tag=(tag+1)%3;c.tone();update();},{kind:"clue",caption:tags[tag]});
    c.marker("ship","Print gift sleeve",[0,.71,-2.22],()=>{
      if(size!==needSize||tag!==needTag){c.mistake("Match the sleeve and tag on the order");return;}
      c.flyTo(0,-2.07,()=>c.receive([0,0,-2.47]));
    },{kind:"hot"});
  }
  function draw(m){
    const z=c.localZ,wide=.72+size*.31;
    m.box(-1.72,.34,z(.84),wide,.55,.76,0xe9be8b,0,5);
    m.box(-1.72,.52,z(.86),wide+.11,.075,.84,0x8fbdaa);
    c.item(m,"coupon",1.72,.18,z(.89),1.28,[0xf4cd8a,0xd1a5c2,0x94cbab][tag]);
    c.item(m,"gift",0,.03,z(-2.22),1.28,0xeabd84);
  }
  return {start:update,draw};
}

function make_fold(c,q){
  const slots=[[-1.57,.23],[1.57,.23],[0,-1.43],[0,1.82]];
  const names=["Left flap","Right flap","Back flap","Front flap"];
  const hues=[0xeeb577,0x89c7b6,0xa2afd6,0xc78c9b];
  let folds=[],animation=[],level=0;
  function fold(i){
    if(folds[i])return;
    if(i!==q.order[level]){c.mistake("The overlapping flap blocks that fold");return;}
    folds[i]=true;level++;
    c.pulse([slots[i][0],.54,slots[i][1]],hues[i],13);
    if(level===q.order.length){
      c.marker("seal","Seal wrapping",[0,.87,.12],()=>c.receive([0,0,-.12]),{kind:"hot"});
      update();
      return;
    }
    c.feedback(true,"Flap closed");update();
  }
  function update(){
    c.objective(level<4?q.goalText:"Seal the wrapped package");
    c.meter(level<4?"Fold the lit flap first · "+level+"/4":"All seams folded");
    slots.forEach(([x,z],i)=>{
      if(folds[i])c.off("flap"+i);
      else c.marker("flap"+i,names[i],[x,.44,z],()=>fold(i),{kind:i===q.order[level]?"good":"clue"});
    });
  }
  function start(){folds=[false,false,false,false];animation=[0,0,0,0];level=0;update();}
  function tick(dt){animation=animation.map((a,i)=>lerp(a,folds[i]?1:0,1-Math.exp(-dt*11)));}
  function draw(m){
    const z=c.localZ;
    m.box(0,.20,z(.23),2.02,.36,1.83,ink());
    m.box(0,.39,z(.23),1.97,.064,1.78,trim());
    c.item(m,"gift",0,.45,z(.23),.99,0xf0c890);
    slots.forEach(([x,dz],i)=>{
      const f=animation[i],side=i<2;
      m.box(lerp(x,0,f),.42+.40*Math.sin(f*Math.PI*.46),z(lerp(dz,.23,f)),side?1.14:1.96,.064,side?1.73:1.11,
        i===q.order[level]?0xf2db92:hues[i],0,0,(side?0:f*Math.PI*.25)*(i===2?1:-1));
    });
  }
  function tap(p){const i=slots.findIndex(([a,b])=>Math.hypot(p.x-a,p.z-b)<.62);if(i<0||folds[i])return false;fold(i);return true;}
  return {start,tick,draw,tap};
}

function make_ties(c,q){
  const shades=[0xeaa66b,0x85c8ac,0xb5a8e3],startX=-2.02,endX=2.02;
  let lead=null,tied=[],line=null,pending=null;
  const zval=i=>(i-1)*1.88+.18;
  function startLead(i){c.flyTo(startX,zval(i),()=>{lead=i;c.tone([335+82*i]);update();});}
  function connect(i){
    if(lead===null)return;
    if(q.end[i]!==lead){c.mistake("Match the ribbon to its color");return;}
    c.flyTo(endX,zval(i),()=>{pending=i;line=null;c.tone([346,520]);update();});
  }
  function knot(i){
    if(i!==q.knots[lead]){c.mistake(q.knots[lead]?"Use a firm knot for woven ribbon":"Use a loose knot for silk");return;}
    tied.push({a:lead,b:pending,knot:i});
    c.pulse([endX,.59,zval(pending)],shades[lead],15);
    lead=null;pending=null;
    if(tied.length===q.end.length){c.receive([0,0,-2.48]);return;}
    c.feedback(true,"Ribbon secured");update();
  }
  function update(){
    c.objective(lead===null?"Pick a ribbon":pending===null?"Find the matching loop":"Choose a knot");
    c.meter(tied.length+"/"+q.end.length+" bows"+(pending===null?"":q.knots[lead]?" · woven ribbon":" · silk ribbon"));
    shades.forEach((_,i)=>{
      if(lead===null&&!tied.some(v=>v.a===i))c.marker("left"+i,q.names[i]+" ribbon",[startX,.63,zval(i)],()=>startLead(i),{kind:"clue"});
      else c.off("left"+i);
      if(lead!==null&&pending===null&&!tied.some(v=>v.b===i))c.marker("right"+i,q.names[q.end[i]]+" loop",[endX,.64,zval(i)],()=>connect(i),{kind:"hot"});
      else c.off("right"+i);
    });
    for(let i=0;i<2;i++){
      if(pending!==null)c.marker("knot"+i,i===0?"Loose knot":"Firm knot",[i===0?.45:1.48,.78,zval(pending)],
        ()=>knot(i),{kind:"clue",caption:i===0?"Loose":"Firm"});
      else c.off("knot"+i);
    }
  }
  function start(){lead=null;tied=[];line=null;pending=null;update();}
  function draw(m){
    const z=c.localZ;
    m.box(0,.22,z(.16),4.90,.40,5.30,ink());
    m.box(0,.46,z(.16),4.80,.09,5.19,trim());
    shades.forEach((color,i)=>{
      m.oval(startX,.62,z(zval(i)),.19,.135,.19,color,0,1,9);
      m.oval(endX,.62,z(zval(i)),.19,.135,.19,shades[q.end[i]],0,1,9);
    });
    for(const {a,b,knot} of tied){
      m.tube([startX,.64,z(zval(a))],[endX,.64,z(zval(b))],.047,.047,shades[a],7,1);
      m.oval(endX-.10,.69,z(zval(b)),knot?.15:.24,.11,.13,shades[a],0,1,9);
    }
    if(lead!==null){
      const [x,pp]=pending===null?(line||[.48,zval(lead)]):[endX,zval(pending)];
      m.tube([startX,.64,z(zval(lead))],[x,.66,z(pp)],.048,.043,shades[lead],7,1);
      if(pending!==null){
        m.oval(.45,.65,z(pp),.26,.085,.18,shades[lead],0,1,9);
        m.oval(1.48,.65,z(pp),.15,.10,.12,shades[lead],0,1,9);
      }
    }
  }
  function swipe(p){
    if(lead===null||pending!==null||!p.floor)return false;
    line=[p.floor.x,p.floor.z];return true;
  }
  function dragEnd(p){
    line=null;
    if(!p.floor||p.floor.x<1.11||lead===null||pending!==null)return;
    const i=shades.findIndex((_,j)=>Math.abs(p.floor.z-zval(j))<.76);
    if(i>=0)connect(i);
  }
  return {start,draw,swipe,dragEnd};
}

const taskFactories = {fold:make_fold, ties:make_ties};
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
    draw(m,t){active.draw(m,t);},
    tick(dt,t){active.tick?.(dt,t);},
    tap(p){return active.tap?.(p);},
    swipe(p){return active.swipe?.(p);},
    dragEnd(p){active.dragEnd?.(p);},
    key(k){return active.key?.(k);}
  };
}
