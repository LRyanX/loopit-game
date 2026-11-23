"use strict";

const GAME = {
  "title": "Gearwood Canopy",
  "brief": "hunt",
  "look": "canopy",
  "avatar": "explorer",
  "zones": [
    "Grove Lift",
    "Canopy Bridge Repair",
    "Wind Launch Perch"
  ],
  "awards": [
    "Bronze Gear",
    "Canopy Pinion",
    "Clockwood Dial"
  ],
  "awardShape": "gear",
  "palette": {
    "sky": 5471850,
    "haze": 14144939,
    "tile": 11121811,
    "tile2": 9740928,
    "ink": 3426877,
    "trim": 8557428,
    "accent": 4744773,
    "loot": 15977848,
    "css": "#486645"
  },
  "passages": [
    "Enter Canopy Bridge Repair",
    "Enter Wind Launch Perch"
  ],
  "scene": "canopy",
  "footprint": "kite",
  "connector": "vine",
  "camera": [
    -0.29,
    0.59,
    1.07,
    0.12
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
      -10,
      1.91,
      -0.56
    ],
    [
      10,
      -22,
      3.47,
      -0.28
    ]
  ],
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "⚙",
          "Fit the gears"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "⚙",
          "Fit the gears"
        ]
      }
    ],
    [
      {
        "kind": "bridgework",
        "guide": [
          "╫",
          "Fit the bridge planks"
        ],
        "runs": [
          {
            "kind": "bridgework",
            "title": "Canopy Bridge Repair",
            "goalText": "Fit planks to gaps and reinforce the long span",
            "gaps": [
              1,
              3,
              2
            ],
            "reinforced": 1,
            "award": "Canopy Pinion"
          },
          {
            "kind": "bridgework",
            "title": "Canopy Bridge Repair",
            "goalText": "Fit planks to gaps and reinforce the long span",
            "gaps": [
              3,
              2,
              1
            ],
            "reinforced": 0,
            "award": "Canopy Pinion"
          },
          {
            "kind": "bridgework",
            "title": "Canopy Bridge Repair",
            "goalText": "Fit planks to gaps and reinforce the long span",
            "gaps": [
              2,
              1,
              3
            ],
            "reinforced": 2,
            "award": "Canopy Pinion"
          }
        ]
      }
    ],
    [
      {
        "kind": "glide",
        "guide": [
          "↗",
          "Glide onto the perch"
        ],
        "runs": [
          {
            "kind": "glide",
            "title": "Wind Launch Perch",
            "goalText": "Trim the glider against the wind and reach the ledge",
            "wind": -1.12,
            "goalZ": -2.74,
            "award": "Clockwood Dial"
          },
          {
            "kind": "glide",
            "title": "Wind Launch Perch",
            "goalText": "Trim the glider against the wind and reach the ledge",
            "wind": 1.12,
            "goalZ": -1.37,
            "award": "Clockwood Dial"
          },
          {
            "kind": "glide",
            "title": "Wind Launch Perch",
            "goalText": "Trim the glider against the wind and reach the ledge",
            "wind": 0,
            "goalZ": -1.37,
            "award": "Clockwood Dial"
          }
        ]
      },
      {
        "kind": "climax",
        "guide": [
          "↔",
          "Catch the cable load"
        ]
      }
    ]
  ],
  "ending": {
    "kind": "gears",
    "title": "Canopy dial recovered",
    "summary": "The fitted gears turn the hoist and raise the lost dial.",
    "pieces": [
      "gear",
      "gear",
      "gear"
    ],
    "prize": "gear"
  },
  "tasks": [
    {
      "kind": "bridgework",
      "title": "Canopy Bridge Repair",
      "goalText": "Fit planks to gaps and reinforce the long span",
      "gaps": [
        1,
        3,
        2
      ],
      "reinforced": 1,
      "award": "Canopy Pinion"
    },
    {
      "kind": "glide",
      "title": "Wind Launch Perch",
      "goalText": "Trim the glider against the wind and reach the ledge",
      "wind": -1.12,
      "goalZ": -2.74,
      "award": "Clockwood Dial"
    }
  ],
  "form": "perch",
  "controls": [
    "world",
    "world",
    "tray"
  ],
  "views": [
    [
      -0.45,
      0.51,
      1.06,
      0.14,
      0.87
    ],
    [
      0.54,
      0.61,
      0.91,
      -0.27,
      0.86
    ],
    [
      0,
      0.33,
      0.92,
      -0.34,
      0.95
    ]
  ]
};

function makeFirstTask(c){
  const patterns=[[1,0],[2,1],[0,2,1]];
  const names=["Small","Medium","Large"],size=[.72,1.05,1.39],hues=[0xf3c86e,0x91b8a8,0xd98b66];
  let target,slots=[],carry=null,read=false,history=[];
  const sx=i=>(i-(target.length-1)/2)*1.73;
  const rx=i=>(i-1)*2.30;
  const ready=()=>slots.every((n,i)=>n===target[i]);
  function inspect(){c.flyTo(0,3.15,()=>{read=true;c.feedback(true);show();});}
  function grab(i){
    c.flyTo(rx(i),1.63,()=>{carry=i;c.tone();show();});
  }
  function install(i){
    if(slots[i]!==null){c.feedback(false,"That spindle already holds a gear");return;}
    c.flyTo(sx(i),-.86,()=>{
      slots[i]=carry;history.push(i);carry=null;
      c.pulse([sx(i),.43,-.94],hues[slots[i]],13);
      if(slots[i]===target[i])c.feedback(true,ready()?"Gear train engaged":"Gear fits");
      else c.mistake("Check the marked gear size");
      show();
    });
  }
  function undo(){
    const i=history.at(-1);
    if(i===undefined)return;
    c.flyTo(sx(i),-.88,()=>{
      slots[i]=null;history.pop();c.tone();show();
    });
  }
  function show(){
    c.objective(!read?"Read the spindle plate":ready()?"Gear train engaged · open the lift":carry===null?"Fit gears onto the spindles":"Install the "+names[carry].toLowerCase()+" gear");
    c.meter(read?target.map((v,i)=>String.fromCharCode(65+i)+" "+names[v]).join(" · "):"");
    if(!read)c.marker("read","Read spindle plate",[0,.64,3.16],inspect,{kind:"clue"});else c.off("read");
    for(let i=0;i<3;i++){
      if(read&&carry===null&&!slots.includes(i)&&!ready())c.marker("gear"+i,names[i]+" gear",[rx(i),.57,1.70],()=>grab(i),{kind:"clue"});
      else c.off("gear"+i);
    }
    for(let i=0;i<target.length;i++){
      if(carry!==null)c.marker("slot"+i,"Fit "+String.fromCharCode(65+i),[sx(i),.62,-.98],()=>install(i),{kind:"hot",disabled:slots[i]!==null});
      else c.off("slot"+i);
    }
    c.hideTools();
    if(carry!==null)c.tool("return","Return gear",()=>{carry=null;show();});
    else if(history.length)c.tool("undo","Remove last gear",undo);
    if(ready())c.marker("open","Open canopy lift",[0,.70,-3.0],()=>c.flyTo(0,-2.39,()=>c.receive([0,0,-3.09])),{kind:"hot"});
    else c.off("open");
  }
  function start(i){target=patterns[i];slots=target.map(()=>null);read=false;carry=null;history=[];show();}
  function draw(m,time){
    const z=c.localZ;
    m.box(0,.10,z(-1.10),4.30,.18,1.49,ink());
    for(let i=0;i<target.length;i++){
      const x=sx(i),g=slots[i];
      m.tube([x,.19,z(-.97)],[x,.25,z(-.97)],.30,.30,read?hues[target[i]]:trim(),10);
      if(g!==null)c.item(m,"gear",x,.29,z(-.97),size[g],hues[g],time*(i===0?.88:-1.2)*(ready()?1.6:.3));
      else m.tube([x,.27,z(-.97)],[x,.64,z(-.97)],.06,.062,ink(),8);
    }
    for(let i=0;i<3;i++){
      c.pedestal(m,rx(i),z(1.71),1.12,trim());
      if(carry!==i&&!slots.includes(i))c.item(m,"gear",rx(i),.22,z(1.71),size[i],hues[i],.3);
    }
    if(carry!==null)c.item(m,"gear",c.player.x,.94,c.player.z,size[carry],hues[carry],time*.8);
    c.pedestal(m,0,z(-3.10),1.32,trim());
    if(!c.hasAward())c.item(m,"box",0,.20,z(-3.10),1.04,0xb1794e);
  }
  function swipe(p){
    return carry!==null&&!!p.origin&&Math.abs(p.origin.x-c.player.x)<.95;
  }
  function dragEnd(p){
    if(!p.floor||carry===null||Math.abs(p.floor.z+.98)>.72)return;
    const i=target.findIndex((_,k)=>Math.abs(p.floor.x-sx(k))<.76);
    if(i>=0)install(i);
  }
  return {start,draw,swipe,dragEnd};
}

function makeSpecialTask(c,scenario){
  const target=[[4,6],[3,2],[6,9]][scenario];
  const gear=[1,1];
  let motor=1;
  const result=i=>motor*gear[i];
  function update(){
    c.objective("Match both pulley speeds");
    c.meter(target.join(" · ")+" rpm");
    c.marker("engine","Change drive speed",[0,.74,2.29],()=>{
      motor=motor%3+1;c.tone([370+motor*70]);update();
    },{kind:"clue",caption:"Drive "+motor});
    gear.forEach((v,i)=>c.marker("ratio"+i,i===0?"Tune left pulley":"Tune right pulley",[(i-.50)*3.34,.82,.61],()=>{
      gear[i]=v%3+1;c.tone([337+v*81]);update();
    },{kind:result(i)===target[i]?"good":"clue",caption:motor+"×"+v+"="+result(i)}));
    c.marker("lift","Raise the freight pulley",[0,.74,-2.42],()=>{
      if(gear.some((_,i)=>result(i)!==target[i])){c.mistake("Drive speed × gear ratio must match each mark");return;}
      c.flyTo(0,-2.10,()=>c.receive([0,0,-2.42]));
    },{kind:"hot"});
  }
  function draw(m,t){
    const z=c.localZ;
    c.item(m,"gear",0,.31,z(2.29),.98,0xe4be83,t*motor);
    gear.forEach((_,i)=>{
      const x=(i-.50)*3.34,speed=result(i);
      c.item(m,"gear",x,.40,z(.61),1.45,0xd19b73,t*speed);
      c.item(m,"gear",x,.39,z(-1.28),1.26,speed===target[i]?0x9fd3b6:trim(),-t*target[i]);
      m.tube([0,.51,z(2.24)],[x,.51,z(.66)],.035,.035,ink(),8,5);
      m.tube([x,.66,z(.60)],[x,.66,z(-1.29)],.036,.036,ink(),8,5);
    });
  }
  return {start:update,draw};
}

function make_bridgework(c,q){
  const sizes=["Short","Medium","Long"],hues=[0xe0a979,0xc69462,0xe8ba82];
  const gapZ=i=>1.35-i*1.76;
  const width=length=>.55+length*.42;
  let crossed=0,held=null,braced=false;
  function place(){
    if(held===null)return;
    if(held!==q.gaps[crossed]){c.mistake(held<q.gaps[crossed]?"Plank falls short":"Plank does not fit its stops");return;}
    c.flyTo(0,gapZ(crossed)+.33,()=>{
      c.pulse([0,.44,gapZ(crossed)],0xffdb87,16);
      crossed++;held=null;c.tone([312,488]);show();
    });
  }
  function show(){
    const done=crossed===q.gaps.length;
    const needsBrace=!braced&&crossed>q.reinforced;
    c.objective(needsBrace?"Brace the long span":done?"Test the repaired bridge":held===null?"Pick a plank for the open gap":"Set the plank on its supports");
    c.meter(crossed+"/"+q.gaps.length+" spans repaired");
    for(let i=0;i<3;i++){
      if(!done&&!needsBrace)c.marker("pick"+i,sizes[i]+" plank",[-2.65,.45,2.48-i*1.05],()=>{held=i+1;c.tone();show();},
        {kind:held===i+1?"good":"clue",caption:sizes[i]});
      else c.off("pick"+i);
    }
    if(needsBrace)c.marker("brace","Brace the span",[.81,.64,gapZ(q.reinforced)],()=>{
      braced=true;c.pulse([.81,.43,gapZ(q.reinforced)],0x94e3bd,15);c.tone([334,550]);show();
    },{kind:"hot"});else c.off("brace");
    if(!done&&!needsBrace&&held!==null)c.marker("place","Place plank",[0,.64,gapZ(crossed)],place,{kind:"hot"});
    else c.off("place");
    if(done&&!needsBrace)c.marker("cross","Cross the bridge",[0,.68,-2.83],()=>c.flyTo(0,-2.74,()=>c.receive([0,0,-2.77])),{kind:"hot"});
  }
  function start(){crossed=0;held=null;braced=false;show();}
  function draw(m){
    const z=c.localZ;
    q.gaps.forEach((n,i)=>{
      const d=gapZ(i),w=width(n);
      m.box(0,-.06,z(d),2.16,.23,.87,0x4a574d,0,5);
      for(const side of [-1,1]){
        m.box(side*(w*.5+.15),.23,z(d),.25,.43,.88,trim(),0,5);
        m.box(side*(w*.5-.067),.47,z(d),.08,.04,.70,0xd9b477,0,1);
      }
      if(i<crossed)m.box(0,.44,z(d),w,.16,.78,hues[n-1],0,5);
      if(i===q.reinforced&&braced){
        m.tube([-.67,.39,z(d-.35)],[.67,.39,z(d+.35)],.045,.045,0x89bdab,8);
        m.tube([.67,.39,z(d-.35)],[-.67,.39,z(d+.35)],.045,.045,0x89bdab,8);
      }
    });
    for(let i=0;i<3;i++)m.box(-2.65,.24,z(2.48-i*1.05),width(i+1),.16,.36,held===i+1?0xffd894:hues[i],0,5);
    if(held!==null&&crossed<q.gaps.length)m.box(0,.57,z(gapZ(crossed)+.51),width(held),.065,.30,hues[held-1],0,5);
  }
  return {start,draw};
}

function make_glide(c,q){
  let trimIndex=1,flaps=0,flight=null;
  const n=()=>trimIndex-1;
  const lateral=()=>q.wind+n()*1.12;
  const range=()=>flaps===1?5.26:3.89;
  function launch(){
    if(flight)return;
    flight={side:lateral(),end:2.52-range(),at:c.clock()};
    c.tone([329,448,588]);show();
  }
  function show(){
    c.objective(q.goalText);
    c.meter((q.wind>0?"Wind right":q.wind<0?"Wind left":"No crosswind")+" · "+(q.goalZ<-2?"far perch":"near perch"));
    c.marker("trim","Nose "+["left","straight","right"][trimIndex],[-.84,.55,2.43],()=>{trimIndex=(trimIndex+1)%3;show();},
      {kind:"clue",disabled:Boolean(flight)});
    c.marker("flap",flaps===1?"Long glide":"Short glide",[.84,.55,2.63],()=>{flaps=1-flaps;show();},
      {kind:"clue",disabled:Boolean(flight)});
    c.tool("launch","Launch glider",launch,Boolean(flight));
  }
  function start(){trimIndex=1;flaps=0;flight=null;show();}
  function tick(dt,t){
    if(!flight||t-flight.at<1.25)return;
    const {side,end}=flight;flight=null;
    if(Math.abs(side)>.48||Math.abs(end-q.goalZ)>.47){c.mistake("Wind or distance missed the ledge");show();return;}
    c.receive([side,0,end]);
  }
  function draw(m,t){
    const z=c.localZ;
    c.pedestal(m,0,z(q.goalZ),1.28,bright());
    c.ring(m,0,.20,z(q.goalZ),.46,0xf8ce83,.028);
    const f=flight?clamp((t-flight.at)/1.25,0,1):0;
    const x=flight?flight.side*f:0,dz=flight?lerp(2.52,flight.end,f):2.52,y=flight?.55+.62*Math.sin(f*Math.PI):.66;
    m.box(x,y,z(dz),.16,.14,.87,ink(),n()*.31);
    m.quad([x-.78,y,z(dz+.19)],[x+.78,y,z(dz+.19)],[x+.12,y+.03,z(dz-.38)],[x-.12,y+.03,z(dz-.38)],bright(),1);
    m.quad([x+.78,y,z(dz+.19)],[x-.78,y,z(dz+.19)],[x-.12,y+.03,z(dz-.38)],[x+.12,y+.03,z(dz-.38)],bright());
    for(let i=0;i<8;i++){
      const a=((t*.37+i*.145)%1-.5)*5.82;
      m.tube([a,.61,z(-1.38+i%3*.36)],[a+Math.sign(q.wind)*.41,.61,z(-1.38+i%3*.36)],.021,.002,0xa7e6cb,5,1);
    }
  }
  return {start,tick,draw};
}

const taskFactories = {bridgework:make_bridgework, glide:make_glide};
function makeFinalTrial(c,scenario){
  const catchSide=[0,1,0][scenario],phase=[.22,1.12,1.89][scenario],spots=[-2.25,2.25];
  let selected=-1,rolling=false,finished=false,time=0;
  const px=()=>2.20*Math.sin(time*1.8+phase);
  const ready=()=>selected===catchSide&&Math.abs(px()-spots[selected])<.56;
  function settle(){
    if(!ready()){c.mistake(selected!==catchSide?"Catch the cargo on the lit branch":"Wait for the pulley to reach the hook");return;}
    rolling=false;finished=true;
    c.flyTo(spots[selected],-.73,()=>c.receive([spots[selected],0,-.95]));
  }
  function update(){
    c.objective(selected<0?"Choose the branch marked for cargo":"Catch the pulley as it passes");
    spots.forEach((x,i)=>c.marker("hook"+i,i===0?"West hook":"East hook",[x,.83,-.86],()=>{
      selected=i;rolling=true;c.tone([345,555]);update();
    },{kind:selected===i?"good":"clue"}));
    if(rolling)c.tool("catch",ready()?"Catch now":"Catch pulley",settle);
  }
  function tick(dt){
    if(!rolling)return;
    const before=ready();time+=dt;
    if(before!==ready())update();
  }
  function draw(m){
    const z=c.localZ;
    m.tube([-2.51,1.72,z(-.88)],[2.51,1.72,z(-.88)],.035,.035,trim(),9,5);
    m.tube([px(),1.71,z(-.88)],[px(),.79,z(-.88)],.032,.027,ink(),8,5);
    c.item(m,"parcel",px(),.44,z(-.88),.89,0xd8a87e);
    spots.forEach((x,i)=>{
      m.tube([x,.14,z(-.88)],[x,1.29,z(-.88)],.062,.062,ink(),8,5);
      m.oval(x,1.34,z(-.88),.12,.12,.12,i===catchSide?0xa0ebbd:0xe0b38b,0,1,7);
    });
    if(finished)c.item(m,"gear",spots[catchSide],.19,z(-1.55),.91,bright());
  }
  return {start:update,tick,draw};
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
