"use strict";

const GAME = {
  "title": "Tide Vault",
  "brief": "hunt",
  "look": "cistern",
  "avatar": "hover",
  "zones": [
    "Flooded Atrium",
    "Stone Channel Gallery",
    "Winch Basin"
  ],
  "awards": [
    "Tide Token",
    "Sluice Badge",
    "Coral Seal"
  ],
  "awardShape": "coin",
  "palette": {
    "sky": 3965330,
    "haze": 12375497,
    "tile": 10075571,
    "tile2": 8563103,
    "ink": 2839136,
    "trim": 7513763,
    "accent": 1860201,
    "loot": 15844989,
    "css": "#1c6269"
  },
  "passages": [
    "Enter Stone Channel Gallery",
    "Enter Winch Basin"
  ],
  "scene": "cistern",
  "footprint": "round",
  "connector": "water",
  "camera": [
    0.23,
    0.71,
    0.98,
    -0.3
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      8,
      -11,
      -1.16,
      -0.67
    ],
    [
      15,
      -23,
      -0.42,
      -0.48
    ]
  ],
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "≈",
          "Raise the water"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "≈",
          "Raise the water"
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
            "title": "Stone Channel Gallery",
            "goalText": "Turn the channel sections to carry water to the gate",
            "start": [
              0,
              0,
              0
            ],
            "target": [
              2,
              1,
              3
            ],
            "ordered": true,
            "finalText": "Water reaches the gate",
            "finish": "Release water gate",
            "object": "orb",
            "award": "Sluice Badge"
          },
          {
            "kind": "connect",
            "title": "Stone Channel Gallery",
            "goalText": "Turn the channel sections to carry water to the gate",
            "start": [
              1,
              0,
              2
            ],
            "target": [
              3,
              3,
              2
            ],
            "ordered": true,
            "finalText": "Water reaches the gate",
            "finish": "Release water gate",
            "object": "orb",
            "award": "Sluice Badge"
          },
          {
            "kind": "connect",
            "title": "Stone Channel Gallery",
            "goalText": "Turn the channel sections to carry water to the gate",
            "start": [
              2,
              3,
              0
            ],
            "target": [
              0,
              1,
              1
            ],
            "ordered": true,
            "finalText": "Water reaches the gate",
            "finish": "Release water gate",
            "object": "orb",
            "award": "Sluice Badge"
          }
        ]
      }
    ],
    [
      {
        "kind": "winch",
        "guide": [
          "≈",
          "Crank both sides"
        ],
        "runs": [
          {
            "kind": "winch",
            "title": "Winch Basin",
            "goalText": "Counter the current before bringing the raft ashore",
            "length": 3,
            "current": [
              0,
              1,
              0
            ],
            "award": "Coral Seal"
          },
          {
            "kind": "winch",
            "title": "Winch Basin",
            "goalText": "Counter the current before bringing the raft ashore",
            "length": 4,
            "current": [
              1,
              0,
              1,
              0
            ],
            "award": "Coral Seal",
            "start": [
              1,
              0
            ]
          },
          {
            "kind": "winch",
            "title": "Winch Basin",
            "goalText": "Counter the current before bringing the raft ashore",
            "length": 5,
            "current": [
              0,
              1,
              1,
              0,
              1
            ],
            "award": "Coral Seal",
            "start": [
              0,
              1
            ]
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "raft",
    "title": "Tide chest landed",
    "summary": "The open channels carry the chest to shore.",
    "pieces": [
      "coin",
      "gear",
      "coin"
    ],
    "prize": "coin"
  },
  "tasks": [
    {
      "kind": "connect",
      "title": "Stone Channel Gallery",
      "goalText": "Turn the channel sections to carry water to the gate",
      "start": [
        0,
        0,
        0
      ],
      "target": [
        2,
        1,
        3
      ],
      "ordered": true,
      "finalText": "Water reaches the gate",
      "finish": "Release water gate",
      "object": "orb",
      "award": "Sluice Badge"
    },
    {
      "kind": "winch",
      "title": "Winch Basin",
      "goalText": "Counter the current before bringing the raft ashore",
      "length": 3,
      "current": [
        0,
        1,
        0
      ],
      "award": "Coral Seal"
    }
  ],
  "form": "basins",
  "controls": [
    "world",
    "world",
    "world"
  ],
  "views": [
    [
      0.23,
      0.62,
      1.05,
      -0.37,
      0.83
    ],
    [
      -0.42,
      0.86,
      0.99,
      -0.13,
      0.81
    ],
    [
      0.04,
      0.68,
      0.95,
      -0.26,
      0.85
    ]
  ]
};

function makeFirstTask(c){
  const rules=[{initial:0,mark:2},{initial:3,mark:1},{initial:1,mark:3,leak:true}];
  const surface=level=>.04+level*.37;
  let cfg,level=0,water=0,seen=false,sealed=false,settled=true,dragged=0;
  function read(){
    c.flyTo(-2.73,1.88,()=>{seen=true;c.feedback(true);show();});
  }
  function pump(dir){
    const goal=clamp(level+dir,0,3);
    if(cfg.leak&&!sealed&&goal>2){c.mistake("The open sluice drains the top level");return;}
    if(goal===level){c.feedback(false,dir===1?"The cistern is full":"The cistern is drained");return;}
    const x=dir===1?-2.64:2.64;
    c.flyTo(x,.67,()=>{
      level=goal;settled=false;
      c.pulse([x,.53,.67],0x75ebd5,16);
      c.tone([244+level*89,434+level*69]);show();
    });
  }
  function show(){
    c.objective(seen?(level===cfg.mark?"Tide matched · open the floating cache":"Raise or drain to the carved tide mark"):"Read the wall gauge");
    c.meter(seen?"Water "+level+" / mark "+cfg.mark+(cfg.leak&&!sealed?" · sluice open":""):"");
    if(!seen)c.marker("gauge","Read gauge",[-2.72,.87,2.02],read,{kind:"clue"});
    else {
      c.off("gauge");
      c.marker("fill","Pump water",[-2.64,.71,.67],()=>pump(1),{kind:"clue"});
      c.marker("drain","Drain water",[2.64,.71,.67],()=>pump(-1),{kind:"clue"});
      if(cfg.leak&&!sealed)c.marker("seal","Close sluice",[2.14,.76,-2.38],()=>c.flyTo(2.14,-1.81,()=>{
        sealed=true;c.feedback(true,"Sluice shut");show();
      }),{kind:"hot"});else c.off("seal");
    }
    if(seen&&level===cfg.mark)c.marker("chest","Open floating cache",[0,surface(level)+.64,-1.63],()=>{
      if(Math.abs(water-surface(level))>.14){c.feedback(false,"Wait for water to settle");return;}
      c.flyTo(0,-1.04,()=>c.receive([0,0,-1.70]));
    },{kind:"hot",disabled:!settled});
    else c.off("chest");
  }
  function start(i){cfg=rules[i];level=cfg.initial;water=surface(level);seen=false;sealed=false;settled=true;dragged=0;show();}
  function tick(dt){
    water=lerp(water,surface(level),1-Math.exp(-dt*6.0));
    if(!settled&&Math.abs(water-surface(level))<.08){settled=true;show();}
  }
  function draw(m,time){
    const z=c.localZ;
    m.box(0,.025,z(-1.31),3.14,.09,4.15,ink());
    if(water>.07)m.box(0,water*.50,z(-1.34),2.91,water,3.94,0x4a9db6,0,1);
    m.box(0,water+.016,z(-1.34),2.94,.035,3.99,0x79bcca,0,7);
    for(let i=0;i<5;i++){
      const s=-2.99+(i+.2*Math.sin(time*2+i))*.73;
      m.box((i-2)*.24,water+.046,z(s),1.53,.008,.012,0x9edbdf,0,1);
    }
    for(const side of [-1,1]){
      c.pedestal(m,side*2.64,z(.67),.98,trim());
      c.item(m,"gear",side*2.64,.43,z(.67),1.16,side===1?0xd37f68:0x76d6c5,time*.7);
    }
    const gx=-2.72,gz=z(2.08);
    m.box(gx,.83,gz,.43,1.61,.21,ink());
    for(let i=0;i<4;i++)m.box(gx,.25+i*.36,gz+.15,.31,.083,.06,seen&&cfg.mark===i?0xf8c878:i===level?0x8af5e3:trim(),0,1);
    if(!c.hasAward())c.item(m,"box",0,water+.02,z(-1.67),1.01,0x6a8d85);
  }
  function swipe(p){
    if(!seen||!p.origin||Math.abs(p.origin.z-.67)>.79||Math.abs(p.origin.x)<2)return false;
    dragged+=Math.hypot(p.dx,p.dy);return true;
  }
  function dragEnd(p){const go=dragged>24;dragged=0;if(go&&p.origin)pump(p.origin.x<0?1:-1);}
  return {start,tick,draw,swipe,dragEnd};
}

function makeSpecialTask(c,scenario){
  const target=[[1,2,1],[0,1,3],[2,0,2]][scenario];
  const names=["West","Centre","East"],x=[-2.28,0,2.28];
  let levels=[3,0,1],from=null;
  function pour(i){
    if(from===i){from=null;update();return;}
    if(levels[i]>=3){c.feedback(false,"That basin is full");return;}
    levels[from]--;levels[i]++;from=null;
    c.pulse([x[i],.87,.34],0x8de3d5,12);c.tone([300+levels[i]*81]);update();
  }
  function update(){
    c.objective(from===null?"Select a basin with water":"Send one measure to a basin");
    c.meter(levels.join(" · ")+" → "+target.join(" · "));
    x.forEach((a,i)=>{
      if(from===null&&levels[i]>0)c.marker("basin"+i,"Draw "+names[i],[a,.81,.34],()=>{from=i;update();},{kind:"clue",caption:names[i]});
      else if(from!==null)c.marker("basin"+i,i===from?"Cancel flow":"Fill "+names[i],[a,.81,.34],()=>pour(i),
        {kind:i===from?"clue":"hot",caption:i===from?"Cancel":names[i]});
      else c.off("basin"+i);
    });
    if(levels.every((v,i)=>v===target[i]))c.marker("sluice","Open transfer gate",[0,.72,-2.37],
      ()=>c.flyTo(0,-1.92,()=>c.receive([0,0,-2.37])),{kind:"good"});
    else c.off("sluice");
  }
  function draw(m){
    x.forEach((a,i)=>{
      const z=c.localZ,p=levels[i]*.24;
      m.box(a,.15,z(.37),1.79,.28,2.22,ink(),0,9);
      if(p)m.box(a,p*.50+.31,z(.37),1.62,p,1.97,0x73bad0,0,7);
      m.box(a+.74,.36+target[i]*.24,z(.33),.21,.063,1.78,0xf7cf7d,0,1);
      if(from===i)ring(m,a,.34+p,z(.36),.53,0x91e6d7,.028);
    });
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

function make_winch(c,q){
  let tension=[],shown=[];
  const bridge=-3.0,mid=2.63;
  const current=()=>q.current[Math.min(tension[0],tension[1])];
  function pull(i){
    if(tension[i]===q.length)return;
    if(tension[i]-tension[1-i]>=1){c.mistake("Too much tilt · crank the other line");return;}
    if(tension[0]===tension[1]&&i!==current()){c.mistake("Crank against the current first");return;}
    const x=i===0?-2.36:2.36;
    c.flyTo(x,-2.48,()=>{
      tension[i]++;
      c.pulse([x,.42,-2.91],0x7ee5cf,12);
      if(tension.every(v=>v===q.length)){c.receive([0,0,-2.43]);return;}
      c.tone([305+tension[i]*52,453]);show();
    });
  }
  function show(){
    c.objective(q.goalText);
    const level=tension[0]===tension[1];
    c.meter(level?"Current "+(current()===0?"→":"←"):
      "Port "+tension[0]+"/"+q.length+" · Starboard "+tension[1]+"/"+q.length);
    c.marker("port","Crank port",[-2.36,.79,-2.88],()=>pull(0),{kind:tension[0]<tension[1]?"good":"clue",disabled:tension[0]===q.length});
    c.marker("star","Crank starboard",[2.36,.79,-2.88],()=>pull(1),{kind:tension[1]<tension[0]?"good":"clue",disabled:tension[1]===q.length});
  }
  function start(){tension=q.start?.slice()??[0,0];shown=tension.slice();show();}
  function tick(dt){shown=shown.map((n,i)=>lerp(n,tension[i],1-Math.exp(-dt*8)));}
  function draw(m,t){
    const z=c.localZ,depth=lerp(mid,bridge,(shown[0]+shown[1])/(q.length*2)),shift=(shown[0]-shown[1])*.34;
    m.box(0,.073,z(-.17),4.59,.14,6.01,0x69b5c2,0,7);
    m.box(shift,.22,z(depth),1.45,.23,1.20,trim(),shift*.22);
    c.item(m,"shell",shift,.39,z(depth),.76,0xe6ca8b);
    const direction=current()===0?1:-1;
    for(let j=0;j<3;j++){
      const sx=direction*((t*.7+j*.38)%1-.45);
      m.tri([sx-direction*.18,.18,z(depth+.62)],[sx-direction*.18,.18,z(depth+.92)],[sx+direction*.16,.18,z(depth+.77)],0xabe7df,1);
    }
    for(const i of [-1,1]){
      const x=i*2.36;
      c.item(m,"gear",x,.52,z(-2.88),1.15,bright(),t*.76);
      m.tube([x,.67,z(-2.88)],[shift+i*.65,.34,z(depth-.33)],.029,.028,ink(),8);
    }
  }
  return {start,tick,draw};
}

const taskFactories = {connect:make_connect, winch:make_winch};
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
