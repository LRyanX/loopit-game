"use strict";

const GAME = {
  "title": "Prism Atlas",
  "brief": "hunt",
  "look": "archive",
  "avatar": "explorer",
  "zones": [
    "Light Vestibule",
    "Shadow Seal Gallery",
    "Spectral Lens Chamber"
  ],
  "awards": [
    "Citrine Prism",
    "Shadow Seal",
    "Crown Prism"
  ],
  "awardShape": "prism",
  "palette": {
    "sky": 6320031,
    "haze": 14734825,
    "tile": 13617885,
    "tile2": 12106198,
    "ink": 3487575,
    "trim": 9208240,
    "accent": 6705282,
    "loot": 14266106,
    "css": "#665082"
  },
  "passages": [
    "Enter Shadow Seal Gallery",
    "Enter Spectral Lens Chamber"
  ],
  "scene": "archive",
  "footprint": "long",
  "connector": "stone",
  "camera": [
    0.3,
    0.49,
    1.09,
    -0.58
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      3,
      -13,
      0.47,
      -0.39
    ],
    [
      -5,
      -24,
      1.12,
      0.64
    ]
  ],
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "↗",
          "Reflect the beam"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "↗",
          "Reflect the beam"
        ]
      }
    ],
    [
      {
        "kind": "shadow",
        "guide": [
          "◐",
          "Join the shadows"
        ],
        "runs": [
          {
            "kind": "shadow",
            "title": "Shadow Seal Gallery",
            "goalText": "Join two shadows at the seal",
            "align": [
              1,
              2
            ],
            "award": "Shadow Seal"
          },
          {
            "kind": "shadow",
            "title": "Shadow Seal Gallery",
            "goalText": "Join two shadows at the seal",
            "align": [
              2,
              1
            ],
            "award": "Shadow Seal"
          },
          {
            "kind": "shadow",
            "title": "Shadow Seal Gallery",
            "goalText": "Join two shadows at the seal",
            "align": [
              2,
              2
            ],
            "award": "Shadow Seal"
          }
        ]
      }
    ],
    [
      {
        "kind": "mix",
        "guide": [
          "✦",
          "Mix the light"
        ],
        "runs": [
          {
            "kind": "mix",
            "title": "Spectral Lens Chamber",
            "goalText": "Tune the colored lamps for both lenses",
            "name": "Cyan",
            "goal": [
              false,
              true,
              true
            ],
            "inner": [
              "Amber",
              [
                true,
                true,
                false
              ]
            ],
            "award": "Crown Prism"
          },
          {
            "kind": "mix",
            "title": "Spectral Lens Chamber",
            "goalText": "Tune the colored lamps for both lenses",
            "name": "Magenta",
            "goal": [
              true,
              false,
              true
            ],
            "inner": [
              "Cyan",
              [
                false,
                true,
                true
              ]
            ],
            "award": "Crown Prism"
          },
          {
            "kind": "mix",
            "title": "Spectral Lens Chamber",
            "goalText": "Tune the colored lamps for both lenses",
            "name": "Amber",
            "goal": [
              true,
              true,
              false
            ],
            "inner": [
              "Magenta",
              [
                true,
                false,
                true
              ]
            ],
            "award": "Crown Prism"
          }
        ]
      },
      {
        "kind": "climax",
        "guide": [
          "✦",
          "Split the beam"
        ]
      }
    ]
  ],
  "ending": {
    "kind": "prisms",
    "title": "Crystal vault opened",
    "summary": "Three reflected beams converge on the vault lock.",
    "pieces": [
      "prism",
      "prism",
      "prism"
    ],
    "prize": "prism"
  },
  "tasks": [
    {
      "kind": "shadow",
      "title": "Shadow Seal Gallery",
      "goalText": "Join two shadows at the seal",
      "align": [
        1,
        2
      ],
      "award": "Shadow Seal"
    },
    {
      "kind": "mix",
      "title": "Spectral Lens Chamber",
      "goalText": "Tune the colored lamps for both lenses",
      "name": "Cyan",
      "goal": [
        false,
        true,
        true
      ],
      "inner": [
        "Amber",
        [
          true,
          true,
          false
        ]
      ],
      "award": "Crown Prism"
    }
  ],
  "form": "vault",
  "controls": [
    "world",
    "world",
    "tray"
  ],
  "views": [
    [
      0.12,
      0.38,
      1.02,
      -0.32,
      0.86
    ],
    [
      -0.45,
      0.5,
      0.99,
      -0.12,
      0.86
    ],
    [
      0.18,
      0.36,
      0.99,
      -0.37,
      0.9
    ]
  ]
};

function makeFirstTask(c){
  const layouts=[
    {emit:[-2.53,2.42],mirrors:[[-.69,1.65],[2.40,-.59]],cache:[.04,-2.87],stops:[2,3],set:[1,2]},
    {emit:[2.59,2.4],mirrors:[[.65,1.24],[-2.19,-.43]],cache:[.27,-3.08],stops:[3,3],set:[2,1]},
    {emit:[-2.59,2.06],mirrors:[[-1.45,.47],[2.36,-1.16]],cache:[-.17,-2.96],stops:[3,4],set:[1,3],filter:2}
  ];
  let deck,turns=[],angles=[],active=false,filter=0;
  const shot=(p)=>[p[0],.96,c.localZ(p[1])];
  function expected(i){
    const p=deck.mirrors[i],prev=i===0?deck.emit:deck.mirrors[i-1],next=i===0?deck.mirrors[1]:deck.cache;
    const a=unit([prev[0]-p[0],0,prev[1]-p[1]]),b=unit([next[0]-p[0],0,next[1]-p[1]]);
    return Math.atan2(a[0]+b[0],a[2]+b[2]);
  }
  function angle(i){return expected(i)+((turns[i]-deck.set[i])/deck.stops[i])*Math.PI;}
  const aligned=i=>turns[i]===deck.set[i];
  const open=()=>active&&aligned(0)&&aligned(1)&&(deck.filter===undefined||filter===deck.filter);
  function start(i){deck=layouts[i];turns=[0,0];angles=turns.map((_,j)=>angle(j));active=false;filter=0;show();}
  function inspect(){
    c.flyTo(deck.emit[0],deck.emit[1],()=>{active=true;c.feedback(true);show();});
  }
  function turn(i){
    const [x,z]=deck.mirrors[i];
    c.flyTo(x,z,()=>{turns[i]=(turns[i]+1)%deck.stops[i];c.tone([349+turns[i]*76,550]);if(aligned(i))c.pulse([x,.84,z],0x9cf2db,13);show();});
  }
  function show(){
    c.objective(!active?"Light the projector":open()?"Open the prism":"Light A → B → Prism");
    if(!active)c.marker("read","Light projector",[deck.emit[0],.75,deck.emit[1]],inspect,{kind:"clue"});
    else c.off("read");
    deck.mirrors.forEach(([x,z],i)=>{
      if(active)c.marker("mirror"+i,i===0?"Turn A":"Turn B",[x,1.0,z],()=>turn(i),{kind:aligned(i)?"good":"clue",caption:i===0?"Mirror A ↻":"Mirror B ↻"});
    });
    if(active&&deck.filter!==undefined){
      c.meter("Final prism accepts violet light");
      c.marker("filter",["Amber filter","Teal filter","Violet filter"][filter],[-2.19,.68,-2.58],()=>{
        filter=(filter+1)%3;c.tone([337+filter*105]);show();
      },{kind:filter===deck.filter?"good":"clue"});
    }
    if(open()){
      const [x,z]=deck.cache;
      c.marker("cache","Open prism",[x,.68,z],()=>c.flyTo(x,z+.45,()=>c.receive([x,0,z])),{kind:"hot"});
    }else c.off("cache");
  }
  function tick(dt){angles=angles.map((a,i)=>lerp(a,angle(i),1-Math.exp(-dt*11)));}
  function draw(m){
    const z=c.localZ;
    c.pedestal(m,deck.emit[0],z(deck.emit[1]),1.20,trim());
    c.item(m,"lamp",deck.emit[0],.20,z(deck.emit[1]),1.29,active?0xf2cf7b:0xa1a3a8);
    c.pedestal(m,deck.cache[0],z(deck.cache[1]),1.48,trim());
    if(!c.hasAward())c.item(m,"box",deck.cache[0],.22,z(deck.cache[1]),1.0,0x8976ab);
    deck.mirrors.forEach(([x,s],i)=>{
      c.pedestal(m,x,z(s),1.0,trim());
      m.box(x,.47,z(s),.13,.64,.13,ink());
      m.box(x,1.02,z(s),.87,.76,.123,ink(),angles[i]);
      const xx=x+Math.sin(angles[i])*.093,zz=z(s)+Math.cos(angles[i])*.093;
      m.box(xx,1.02,zz,.73,.66,.064,aligned(i)?0x82e9dc:0xa6b7ca,angles[i],1);
      if(active)c.ring(m,x,.071,z(s),.66,aligned(i)?0x92ead2:0xf7ca82,.037,18);
    });
    if(!active)return;
    c.ring(m,deck.cache[0],.071,z(deck.cache[1]),.81,open()?0xa8edd0:0xf7ca82,.039,18);
    const beam=(a,b,t)=>{m.tube(shot(a),shot(b),.026,.026,t,8,1);};
    beam(deck.emit,deck.mirrors[0],0xf6cd72);
    for(let i=0;i<2;i++){
      if(i===1&&!aligned(0))break;
      const from=i===0?deck.emit:deck.mirrors[0],p=deck.mirrors[i],to=i===0?deck.mirrors[1]:deck.cache;
      if(aligned(i)){beam(p,to,i===0?0x83ffee:deck.filter===undefined?0xe3b4ff:[0xf4ba77,0x72ebd0,0xe3b4ff][filter]);continue;}
      const d=unit([p[0]-from[0],0,p[1]-from[1]]),n=[Math.sin(angles[i]),0,Math.cos(angles[i])],r=sub(d,scale(n,2*dot(n,d)));
      beam(p,[p[0]+r[0]*1.85,p[1]+r[2]*1.85],0xffbd82);
    }
  }
  function swipe(p){return !!p.origin&&Math.abs(p.totalX)>18&&deck.mirrors.some(([x,z])=>Math.hypot(x-p.origin.x,z-p.origin.z)<.82);}
  function dragEnd(p){if(!p.origin||!active)return;const i=deck.mirrors.findIndex(([x,z])=>Math.hypot(x-p.origin.x,z-p.origin.z)<.82);if(i>=0)turn(i);}
  return {start,tick,draw,swipe,dragEnd};
}

function makeSpecialTask(c,scenario){
  const need=[[1,2],[2,0],[0,1]][scenario];
  const x=i=>(i-1)*1.19,z=i=>2.30-i*.71;
  let column=1,focus=0;
  function update(){
    c.objective("Slide the lens to the two glowing marks");
    c.meter("Move across · move along the rail");
    c.marker("slide","Slide lens sideways",[x(column),.76,z(focus)],()=>{
      column=(column+1)%3;c.tone([333+column*71]);update();
    },{kind:"clue",caption:"←→"});
    c.marker("focus","Slide lens forward",[x(column)+.36,.66,z(focus)-.42],()=>{
      focus=(focus+1)%3;c.tone([397+focus*71]);update();
    },{kind:"clue",caption:"↕"});
    c.marker("light","Light both receivers",[0,.78,-2.31],()=>{
      if(column!==need[0]||focus!==need[1]){c.mistake("Bring both beams onto the receiver marks");return;}
      c.flyTo(0,-2.13,()=>c.receive([0,0,-2.44]));
    },{kind:"hot"});
  }
  function draw(m){
    const p=c.localZ,tx=x(need[0]),d=z(need[1]);
    for(let i=0;i<3;i++){
      m.box(x(i),.072,p(1.64),.064,.056,2.08,trim());
      m.box(0,.079,p(z(i)),2.69,.058,.07,trim());
    }
    m.box(tx,.103,p(d),.74,.061,.52,0xbedfd0,0,1);
    c.item(m,"prism",x(column),.15,p(z(focus)),1.08,0xa7d2ea);
    m.tube([0,.71,p(3.62)],[x(column),.70,p(z(focus))],.025,.025,0xc0efd7,8,1);
    for(const s of [-1,1]){
      const a=s*1.08+(column-need[0])*.58,b=-2.42+(focus-need[1])*.37;
      m.tube([x(column),.70,p(z(focus))],[a,.31,p(b)],.027,.019,s<0?0xa9ead6:0xd3b5e8,8,1);
      m.oval(s*1.08,.31,p(-2.42),.20,.16,.20,column===need[0]&&focus===need[1]?0xb6ffd1:trim(),0,1,8);
    }
  }
  return {start:update,draw};
}

function make_shadow(c,q){
  const bases=[[-1.69,1.22],[1.47,-.73]],r=[0x78bdbc,0xbf9fcf];
  let stops=[],projecting=false,lit=false;
  const aligned=()=>stops.every((v,i)=>v===q.align[i]);
  function set(i){
    stops[i]=(stops[i]+1)%3;c.tone([279+stops[i]*83],.066);
    c.pulse([bases[i][0],.60,bases[i][1]],r[i],12);show();
  }
  function begin(){projecting=true;c.tone([344,515]);show();}
  function show(){
    c.objective(!projecting?"Light the shadow lantern":aligned()?"Shadow enters the seal":"Turn the cutouts to join their shadows");
    c.meter(projecting?stops.filter((v,i)=>v===q.align[i]).length+"/2 shadows aligned":"");
    if(!projecting)c.marker("lamp","Light lantern",[0,.75,2.86],begin,{kind:"clue"});else c.off("lamp");
    bases.forEach(([x,z],i)=>{
      if(projecting)c.marker("frame"+i,"Turn cutout "+String.fromCharCode(65+i),[x,.82,z],()=>set(i),{kind:stops[i]===q.align[i]?"good":"clue"});
    });
    if(projecting&&aligned())c.marker("open","Open shadow seal",[0,.76,-2.93],()=>c.flyTo(0,-2.51,()=>c.receive([0,0,-2.97])),{kind:"hot"});
    else c.off("open");
  }
  function start(){stops=[0,0];projecting=false;show();}
  function draw(m){
    const z=c.localZ;
    c.item(m,"lamp",0,.03,z(2.85),1.42,projecting?0xe8c479:0x9eabb1);
    c.pedestal(m,0,z(-2.98),1.49,trim());
    c.item(m,"box",0,.24,z(-2.98),1.13,bright());
    for(const [i,[x,d]] of bases.entries()){
      const theta=stops[i]*Math.PI/1.5,ends=r[i],right=stops[i]===q.align[i]?0:x+Math.sin(theta)*1.49;
      m.box(x,.66,z(d),.76,1.12,.15,ink(),theta);
      m.box(x,.77,z(d),.30,.38,.21,ends,theta);
      if(projecting){
        const long=z(i===0?-.73:-2.95);
        m.quad([x-.33,.046,z(d)],[right-.21,.047,long],[right+.21,.047,long],[x+.33,.046,z(d)],0x31415a,0);
        if(stops[i]===q.align[i])c.ring(m,x,.065,z(d),.49,ends,.024);
      }
    }
  }
  return {start,draw};
}

function make_mix(c,q){
  const cap=["Red","Green","Blue"],ton=[0xf07667,0x78e29b,0x71acf4],x=[-2.40,0,2.40];
  let lamps=[],lens=0;
  const lensX=()=>lens===0?-1.10:1.10;
  const target=()=>lens===0?[q.name,q.goal]:q.inner;
  const fit=()=>lamps.every((a,i)=>a===target()[1][i]);
  const color=bits=>(bits[0]?0xe00000:0)+(bits[1]?0x00d800:0)+(bits[2]?0x0000ed:0)||0x324553;
  function turn(i){lamps[i]=!lamps[i];c.tone([335+i*112]);show();}
  function collect(){
    const x=lensX();
    c.flyTo(x,-1.94,()=>{
      c.pulse([x,.92,-2.33],color(target()[1]),21);
      if(lens===1){c.receive([x,0,-2.34]);return;}
      lens=1;c.tone([349,523,698]);show();
    });
  }
  function show(){
    c.objective(fit()?"Lift the matched lens":"Mix "+target()[0].toLowerCase()+" light");
    c.meter(lamps.map((v,i)=>v?cap[i]:null).filter(Boolean).join(" + ")||"All lamps off");
    x.forEach((v,i)=>c.marker("lamp"+i,(lamps[i]?"Off ":"On ")+cap[i],[v,.83,1.83],()=>turn(i),{kind:lamps[i]?"good":"clue"}));
    if(fit())c.marker("lens","Lift spectral lens",[lensX(),.87,-2.31],collect,{kind:"hot"});
    else c.off("lens");
  }
  function start(){lamps=[false,false,false];lens=0;show();}
  function draw(m){
    const z=c.localZ;
    for(const x of [-1.10,1.10])c.pedestal(m,x,z(-2.33),1.28,ink());
    c.item(m,"prism",lensX(),.21,z(-2.33),1.36,color(lamps));
    m.gem(lensX(),1.53,z(-2.35),.19,.29,.17,color(target()[1]),6,0,1);
    if(lens===1)c.item(m,"prism",-1.10,.21,z(-2.33),.88,color(q.goal));
    for(const [i,v] of x.entries()){
      c.pedestal(m,v,z(1.84),1.06,trim());
      c.item(m,"lamp",v,.17,z(1.86),1.28,lamps[i]?ton[i]:0x7f8893);
      if(lamps[i])m.tube([v,1.03,z(1.80)],[lensX(),.94,z(-2.24)],.021,.018,ton[i],7,1);
    }
  }
  return {start,draw};
}

const taskFactories = {shadow:make_shadow, mix:make_mix};
function makeFinalTrial(c,scenario){
  const target=[[2,3],[3,2],[1,4]][scenario];
  let input=3,split=0;
  function update(){
    c.objective("Split one beam to power both receivers");
    c.meter(split+" / "+target[0]+" left · "+(input-split)+" / "+target[1]+" right");
    c.marker("source","Charge emitter",[-2.16,.78,1.51],()=>{
      input=input===6?3:input+1;split=Math.min(split,input);c.tone([285+input*56]);update();
    },{kind:"clue",caption:"Input "+input});
    c.marker("split","Turn beam splitter",[0,.82,.32],()=>{
      split=(split+1)%(input+1);c.tone([303+split*74]);update();
    },{kind:"clue",caption:split+" : "+(input-split)});
    c.marker("open","Unlock the prism crown",[0,.78,-2.70],()=>{
      if(split!==target[0]||input-split!==target[1]){c.mistake("Match the power marks on both receivers");return;}
      c.flyTo(0,-2.48,()=>c.receive([0,0,-2.70]));
    },{kind:"hot"});
  }
  function draw(m){
    const z=c.localZ,emit=[-2.15,.74,z(1.50)],join=[0,.74,z(.30)];
    c.item(m,"lamp",emit[0],.07,emit[2],1.11,0xf1c579);
    m.tube(emit,join,.017+input*.007,.023,0xf2d1a1,8,1);
    for(let i=0;i<2;i++){
      const x=(i-.5)*3.36,energy=i===0?split:input-split;
      m.tube(join,[x,.74,z(-1.83)],.012+energy*.012,.018,energy===target[i]?0xa9eccc:0xcab1dd,8,1);
      c.item(m,"prism",x,.23,z(-1.83),.88,energy===target[i]?0xb0f3d2:trim());
      for(let n=0;n<target[i];n++)m.box(x+(n-1.5)*.13,.19,z(-1.25),.079,.22,.081,0xffda91,0,1);
    }
  }
  return {start:update,draw};
}

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
