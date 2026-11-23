"use strict";

const GAME = {
  "title": "Coupon Switchyard",
  "brief": "sale",
  "look": "station",
  "avatar": "cart",
  "zones": [
    "Coupon Station",
    "Punch Card Station",
    "Conveyor Service Bay"
  ],
  "awards": [
    "First coupons applied",
    "Punch strip scanned",
    "Feed running again"
  ],
  "awardShape": "receipt",
  "palette": {
    "sky": 8435145,
    "haze": 15002847,
    "tile": 13885134,
    "tile2": 12178126,
    "ink": 2310740,
    "trim": 6066577,
    "accent": 2255721,
    "loot": 16108154,
    "css": "#226b69"
  },
  "passages": [
    "Enter Punch Card Station",
    "Enter Conveyor Service Bay"
  ],
  "scene": "machine",
  "footprint": "oct",
  "connector": "belt",
  "camera": [
    -0.5,
    0.78,
    1.03,
    -0.12
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
      -7,
      0,
      0.76
    ],
    [
      -14,
      -16,
      0,
      0.51
    ]
  ],
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "⑂",
          "Route the coupon"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "⑂",
          "Route the coupon"
        ]
      }
    ],
    [
      {
        "kind": "connect",
        "guide": [
          "⤾",
          "Connect the sections"
        ],
        "runs": [
          {
            "kind": "connect",
            "title": "Punch Card Station",
            "goalText": "Rotate the three cutouts to make a readable strip",
            "finalText": "The strip is aligned · run the reader",
            "finish": "Read discount strip",
            "object": "coupon",
            "start": [
              0,
              0,
              0
            ],
            "target": [
              1,
              3,
              2
            ],
            "award": "Punch strip scanned"
          },
          {
            "kind": "connect",
            "title": "Punch Card Station",
            "goalText": "Rotate the three cutouts to make a readable strip",
            "finalText": "The strip is aligned · run the reader",
            "finish": "Read discount strip",
            "object": "coupon",
            "start": [
              1,
              0,
              2
            ],
            "target": [
              2,
              1,
              1
            ],
            "award": "Punch strip scanned"
          },
          {
            "kind": "connect",
            "title": "Punch Card Station",
            "goalText": "Rotate the three cutouts to make a readable strip",
            "finalText": "The strip is aligned · run the reader",
            "finish": "Read discount strip",
            "object": "coupon",
            "start": [
              2,
              3,
              0
            ],
            "target": [
              3,
              3,
              0
            ],
            "award": "Punch strip scanned"
          }
        ]
      }
    ],
    [
      {
        "kind": "jam",
        "guide": [
          "↔",
          "Slide into the gap"
        ],
        "runs": [
          {
            "kind": "jam",
            "title": "Conveyor Service Bay",
            "goalText": "Slide the packages to unblock the feed",
            "parts": [
              "Red",
              "Mint",
              "Violet"
            ],
            "start": [
              2,
              0,
              -1,
              1
            ],
            "object": "parcel",
            "award": "Feed running again"
          },
          {
            "kind": "jam",
            "title": "Conveyor Service Bay",
            "goalText": "Slide the packages to unblock the feed",
            "parts": [
              "Red",
              "Mint",
              "Violet"
            ],
            "start": [
              2,
              0,
              1,
              -1
            ],
            "object": "parcel",
            "award": "Feed running again"
          },
          {
            "kind": "jam",
            "title": "Conveyor Service Bay",
            "goalText": "Slide the packages to unblock the feed",
            "parts": [
              "Red",
              "Mint",
              "Violet"
            ],
            "start": [
              -1,
              2,
              1,
              0
            ],
            "object": "parcel",
            "award": "Feed running again"
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "strip",
    "title": "Coupons redeemed",
    "summary": "Three ticket sections print as one discount strip.",
    "pieces": [
      "coupon",
      "coupon",
      "coupon"
    ],
    "prize": "coupon"
  },
  "tasks": [
    {
      "kind": "connect",
      "title": "Punch Card Station",
      "goalText": "Rotate the three cutouts to make a readable strip",
      "finalText": "The strip is aligned · run the reader",
      "finish": "Read discount strip",
      "object": "coupon",
      "start": [
        0,
        0,
        0
      ],
      "target": [
        1,
        3,
        2
      ],
      "award": "Punch strip scanned"
    },
    {
      "kind": "jam",
      "title": "Conveyor Service Bay",
      "goalText": "Slide the packages to unblock the feed",
      "parts": [
        "Red",
        "Mint",
        "Violet"
      ],
      "start": [
        2,
        0,
        -1,
        1
      ],
      "object": "parcel",
      "award": "Feed running again"
    }
  ],
  "form": "machine",
  "controls": [
    "tray",
    "tray",
    "world"
  ],
  "views": [
    [
      0.29,
      0.83,
      0.92,
      -0.07,
      0.76
    ],
    [
      -0.49,
      0.69,
      0.94,
      0.03,
      0.8
    ],
    [
      0.04,
      1.01,
      0.86,
      -0.13,
      0.76
    ]
  ]
};

function makeFirstTask(c){
  const dispatch=[
    {inputs:[0,1],goals:[1,0],nodes:[[0,1]],active:[0,1]},
    {inputs:[0,2,1],goals:[2,2,0],nodes:[[0,1],[1,2]],active:[0,1,2]},
    {inputs:[2,0,1,2],goals:[1,2,0,2],nodes:[[0,1],[1,2],[0,2]],active:[0,1,2]}
  ];
  const lane=[-2.36,0,2.36],colors=[0xf0aa5d,0x89d6c4,0xb8a6e5],names=["left","center","right"];
  let rule,step=0,arms=[],parcel=null;
  function redirect(idx,node,active){
    if(!active)return idx;
    return idx===node[0]?node[1]:idx===node[1]?node[0]:idx;
  }
  const leverZ=i=>1.57-i*1.42;
  function launch(){
    if(parcel)return;
    parcel={age:0,start:rule.inputs[step],arms:arms.slice()};
    rule.nodes.forEach((_,i)=>c.off("switch"+i));
    c.tool("send","Coupon rolling",launch,true);
  }
  function refresh(){
    c.objective("Route the coupon to the "+names[rule.goals[step]]+" register");
    c.meter((step+1)+"/"+rule.inputs.length+" · starts "+names[rule.inputs[step]]);
    rule.nodes.forEach((node,i)=>c.marker("switch"+i,"Switch "+String.fromCharCode(65+i),[lane[node[0]]+.49,.55,leverZ(i)],()=>{
      arms[i]=!arms[i];c.tone();refresh();
    },{kind:arms[i]?"good":"clue"}));
    c.tool("send","Send coupon",launch);
  }
  function tick(dt){
    if(!parcel)return;
    parcel.age+=dt;
    if(parcel.age<1.4)return;
    const end=rule.nodes.reduce((v,node,i)=>redirect(v,node,parcel.arms[i]),parcel.start);
    parcel=null;
    if(end!==rule.goals[step]){c.mistake("Wrong register · adjust the track");refresh();return;}
    c.pulse([lane[end],.48,-2.91],colors[end],19);
    step++;
    if(step===rule.inputs.length){c.receive([lane[end],0,-2.45]);return;}
    c.feedback(true,"Coupon applied");refresh();
  }
  function start(i){rule=dispatch[i];step=0;arms=Array(rule.nodes.length).fill(false);parcel=null;refresh();}
  function draw(m){
    const z=c.localZ;
    const jump=(a,b,col)=>m.tube([a[0],.21,z(a[1])],[b[0],.21,z(b[1])],.055,.055,col,8,1);
    for(const n of rule.active){
      c.item(m,"register",lane[n],0,z(-3.27),1.08,colors[n]);
      c.pedestal(m,lane[n],z(2.97),.72,colors[n]);
      const bends=[[lane[n],3.08]];
      let line=n;
      rule.nodes.forEach((node,i)=>{
        bends.push([lane[line],leverZ(i)+.36]);
        line=redirect(line,node,arms[i]);
        bends.push([lane[line],leverZ(i)-.41]);
      });
      bends.push([lane[line],-2.89]);
      for(let i=1;i<bends.length;i++)jump(bends[i-1],bends[i],colors[n]);
    }
    if(parcel){
      const f=clamp(parcel.age/1.26,0,1),zpos=3.07-f*5.91;
      let x=lane[parcel.start],line=parcel.start;
      rule.nodes.forEach((node,i)=>{
        const next=redirect(line,node,parcel.arms[i]),at=leverZ(i);
        if(zpos<at+.36)x=lerp(lane[line],lane[next],curve((at+.36-zpos)/.77));
        line=next;
      });
      c.item(m,"coupon",x,.31,z(zpos),.79,colors[parcel.start]);
    }else if(step<rule.inputs.length)c.item(m,"coupon",lane[rule.inputs[step]],.21,z(3.05),.91,colors[rule.inputs[step]]);
  }
  function swipe(p){
    if(!p.origin||!p.floor||Math.abs(p.totalX)<22)return false;
    const j=rule.nodes.findIndex((n,i)=>Math.abs(p.origin.z-leverZ(i))<.60&&Math.abs(p.origin.x-lane[n[0]])<1.3);
    if(j<0||parcel)return false;
    return true;
  }
  function dragEnd(p){
    if(!p.origin||parcel)return;
    const i=rule.nodes.findIndex((n,j)=>Math.abs(p.origin.z-leverZ(j))<.60&&Math.abs(p.origin.x-lane[n[0]])<1.3);
    if(i>=0){arms[i]=!arms[i];c.tone();refresh();}
  }
  return {start,tick,draw,swipe,dragEnd};
}

function makeSpecialTask(c,scenario){
  const shapes=[[true,false,true,false,true,false],[false,true,true,true,false,true],[true,true,false,true,false,true]];
  const slots=shapes[scenario];
  let cut=Array(6).fill(false);
  const x=i=>(i%3-1)*1.27,z=i=>i<3?.74:2.10;
  function punch(){
    if(cut.some((v,i)=>v!==slots[i])){c.mistake("Punch the same holes as the sample");return;}
    c.flyTo(0,-2.32,()=>c.receive([0,0,-2.48]));
  }
  function update(){
    c.objective("Copy the coupon holes");
    c.meter(slots.slice(0,3).map(n=>n?"●":"○").join(" ")+" / "+slots.slice(3).map(n=>n?"●":"○").join(" "));
    cut.forEach((v,i)=>c.marker("slot"+i,"Punch "+(i+1),[x(i),.35,z(i)],()=>{
      cut[i]=!v;c.tone([v?303:487]);update();
    },{tile:true,caption:v?"●":"○"}));
    c.marker("feed","Feed coupon",[0,.72,-2.45],punch,{kind:"hot"});
  }
  function draw(m){
    m.box(0,.19,c.localZ(1.40),4.39,.30,2.83,0xe0b681,0,5);
    m.box(0,.34,c.localZ(-.77),4.39,.25,1.46,0x83ab99,0,4);
    for(let i=0;i<6;i++){
      m.oval(x(i),.37,c.localZ(z(i)),.28,.040,.29,cut[i]?ink():0xf4db9d,0,0,9);
      m.oval(x(i),.48,c.localZ(i<3?-1.12:-.44),.22,.042,.22,slots[i]?ink():0xd8e5c1,0,0,9);
    }
  }
  return {start:update,draw};
}

function make_connect(c,q){
  const spots=[[-1.88,1.66],[1.60,.03],[-.61,-2.28]];
  const palette=[0xefbb7e,0x7eb986,0x89c8df,0xc6a2df];
  let stops=[],shown=[],cleared=false;
  const fixed=()=>stops.every((v,i)=>v===q.target[i]);
  function turn(i){
    if(q.ordered&&stops.slice(0,i).some((v,j)=>v!==q.target[j])){c.feedback(false,"Open the upstream section first");return;}
    stops[i]=(stops[i]+1)%4;
    const linked=q.links?.[i];
    if(linked>=0)stops[linked]=(stops[linked]+1)%4;
    c.tone([275+stops[i]*87],.056,.10);
    if(stops[i]===q.target[i])c.pulse([spots[i][0],.21,spots[i][1]],palette[i],11);
    refresh();
  }
  function refresh(){
    c.objective(fixed()?q.finalText:q.goalText);
    c.meter(q.links?"A also turns B · B turns C":q.ordered?"Upstream A → B → outlet C":
      stops.filter((n,i)=>n===q.target[i]).length+"/3 sections connected");
    spots.forEach(([x,z],i)=>c.marker("piece"+i,"Turn "+String.fromCharCode(65+i),[x,.58,z],()=>turn(i),{kind:stops[i]===q.target[i]?"good":"clue"}));
    if(fixed())c.marker("switch",q.finish,[0,.71,-3.46],()=>{
      cleared=true;c.flyTo(0,-3.20,()=>c.receive([0,0,-3.49]));
    },{kind:"hot"});else c.off("switch");
  }
  function start(){stops=q.start.slice();shown=stops.map(n=>n*Math.PI*.5);cleared=false;refresh();}
  function tick(dt){shown=shown.map((v,i)=>lerp(v,stops[i]*Math.PI*.5,1-Math.exp(-dt*11)));}
  function draw(m,t){
    const z=c.localZ, nodes=[[-.14,3.48],...spots,[0,-3.52]];
    for(let i=1;i<nodes.length;i++){
      const a=nodes[i-1],b=nodes[i],live=stops.slice(0,i-1).every((n,j)=>n===q.target[j]);
      m.tube([a[0],.16,z(a[1])],[b[0],.16,z(b[1])],.058,.057,live?palette[Math.min(i,3)]:ink(),8,live?1:0);
    }
    spots.forEach(([x,s],i)=>{
      c.pedestal(m,x,z(s),1.11,trim());
      const angle=shown[i],lit=stops[i]===q.target[i];
      const u=Math.sin(angle),v=Math.cos(angle);
      m.box(x,.47,z(s),.74,.17,.21,lit?palette[i]:GAME.palette.accent,angle,1);
      m.tube([x,.46,z(s)],[x+u*.64,.46,z(s)+v*.64],.078,.044,lit?palette[i]:0xb58a67,8,1);
      const to=q.links?.[i];
      if(to>=0)m.tube([x,.26,z(s)],[spots[to][0],.26,z(spots[to][1])],.022,.022,palette[i],6,1);
    });
    c.item(m,q.object,0,.04,z(-3.55),1.1,cleared?0x98dfb4:bright());
  }
  return {start,tick,draw};
}

function make_jam(c,q){
  const positions=[[-1.42,.90],[1.42,.90],[-1.42,-1.42],[1.42,-1.42]];
  const should=[0,1,2,-1],colors=[0xe88963,0x82b6b3,0xb9a0d5];
  let tiles=[],move=null,turns=0;
  const touch=(a,b)=>Math.abs(a%2-b%2)+Math.abs(Math.floor(a/2)-Math.floor(b/2))===1;
  function slide(i){
    const blank=tiles.indexOf(-1);
    if(!touch(i,blank)){c.mistake("Only a piece beside the gap can slide");return;}
    move={from:i,to:blank,at:c.clock()};c.tone([295,420]);update();
  }
  function update(){
    c.objective(q.goalText);
    c.meter("Target order "+q.parts.join(" · ")+" · gap last");
    const blank=tiles.indexOf(-1);
    tiles.forEach((n,i)=>{
      if(n===-1)return;
      if(!touch(i,blank)){c.off("block"+n);return;}
      c.marker("block"+n,"Slide "+q.parts[n],[positions[i][0],.67,positions[i][1]],()=>slide(i),
        {kind:n===should[i]?"good":"clue",disabled:!!move});
    });
  }
  function start(){tiles=q.start.slice();move=null;turns=0;update();}
  function tick(dt,t){
    if(!move||t-move.at<.30)return;
    const {from,to}=move;
    [tiles[to],tiles[from]]=[tiles[from],tiles[to]];
    move=null;turns++;
    if(tiles.every((n,i)=>n===should[i])){c.receive([0,0,-2.74]);return;}
    update();
  }
  function draw(m,t){
    for(const [i,[x,z]] of positions.entries()){
      c.pedestal(m,x,c.localZ(z),1.83,should[i]===-1?0x354652:colors[should[i]]);
      const n=tiles[i];
      if(n<0)continue;
      const f=move?.from===i?curve((t-move.at)/.30):0,v=f>0?positions[move.to]:[x,z];
      c.item(m,q.object,lerp(x,v[0],f),.23,c.localZ(lerp(z,v[1],f)),1.27,colors[n]);
    }
  }
  return {start,tick,draw};
}

const taskFactories = {connect:make_connect, jam:make_jam};
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
