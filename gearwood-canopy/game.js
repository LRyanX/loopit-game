"use strict";

const GAME = {
  "title": "Gearwood Canopy",
  "brief": "hunt",
  "look": "canopy",
  "avatar": "explorer",
  "zones": [
    "Grove Lift",
    "Branch Counterweights",
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
    "Enter Branch Counterweights",
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
  "guides": [
    [
      "⚙",
      "Fit the gears"
    ],
    [
      "⚖",
      "Balance the scale"
    ],
    [
      "↗",
      "Glide onto the perch"
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
      "kind": "weigh",
      "title": "Branch Counterweights",
      "goalText": "Balance the bridge counterweights before cranking",
      "unit": "kg",
      "parts": [
        [
          "Seed pod",
          2,
          "orb"
        ],
        [
          "Weights",
          3,
          "gear"
        ],
        [
          "Timber",
          4,
          "rock"
        ]
      ],
      "goal": [
        5,
        4
      ],
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
      if(ready())c.feedback(true,"Both gears engaged");
      else c.mistake("Check the marked gear sizes");
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
    c.objective(!read?"Read the spindle plate":ready()?"Gear train engaged · open the lift":carry===null?"Fit the two gears onto the spindles":"Install the "+names[carry].toLowerCase()+" gear");
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

function makeSecondTask(c,q){
  const xs=[-2.43,0,2.43],colors=[0xe49063,0x83c6ad,0x8eaad6];
  let selected=-1,locations=[],angle=0;
  const total=side=>locations.reduce((n,p,i)=>p===side?n+q.parts[i][1]:n,0);
  function choose(i){selected=i;c.tone([329,482]);show();}
  function put(side){
    if(selected<0)return;
    const i=selected,d=side===0?-2.15:2.15;
    c.flyTo(d,-.42,()=>{
      locations[i]=side;selected=-1;
      c.pulse([d,.42,-.77],colors[i],13);
      if(locations.every(n=>n!==null)){
        if(total(0)===q.goal[0]&&total(1)===q.goal[1]){c.receive([0,0,-2.73]);return;}
        c.mistake("The scale is off · move a weight");
      }else c.feedback(true);
      show();
    });
  }
  function show(){
    c.objective(selected<0?q.goalText:"Place the "+q.parts[selected][0].toLowerCase());
    c.meter("Left "+total(0)+"/"+q.goal[0]+" · Right "+total(1)+"/"+q.goal[1]+" "+q.unit);
    q.parts.forEach(([name,weight],i)=>{
      const where=locations[i],same=where===null;
      c.marker("weight"+i,name+" "+weight,[same?xs[i]:(where===0?-2.2:2.2)+(i-1)*.49,.59,same?2.26:-.86],()=>choose(i),
        {kind:i===selected?"good":"clue",hidden:selected>=0});
    });
    if(selected>=0){
      c.marker("left","Place left",[-2.16,.70,-.63],()=>put(0),{kind:"hot"});
      c.marker("right","Place right",[2.16,.70,-.63],()=>put(1),{kind:"hot"});
    }else {c.off("left");c.off("right");}
  }
  function start(){selected=-1;locations=q.parts.map(()=>null);angle=0;show();}
  function tick(dt){angle=lerp(angle,clamp((total(0)-total(1))*.057,-.23,.23),1-Math.exp(-dt*10));}
  function draw(m,t){
    const z=c.localZ, center=z(-.95);
    m.box(0,.26,center,.61,.45,.52,ink());
    const beam=(x)=>[x,.68-Math.sin(angle)*x,center];
    m.tube(beam(-2.46),beam(2.46),.088,.088,trim(),10);
    for(const side of [-1,1]){
      const [x,y]=beam(side*2.16);
      m.box(x,y-.27,center,1.79,.11,1.08,bright());
      m.tube([x,y,center],[x,y-.22,center],.071,.047,ink(),8);
    }
    q.parts.forEach(([_,weight,type],i)=>{
      const here=locations[i],pos=here===null?xs[i]:(here===0?-2.16:2.16)+(i-1)*.47;
      const zz=here===null?z(2.23):center;
      if(selected===i)c.item(m,type||"box",c.player.x,.67,c.player.z,.84,colors[i]);
      else {if(here===null)c.pedestal(m,pos,zz,1.00,colors[i]);c.item(m,type||"box",pos,here===null?.21:.51-Math.sin(angle)*pos,zz,.68+weight*.043,colors[i]);}
    });
  }
  return {start,tick,draw};
}

function makeThirdTask(c,q){
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
    c.meter(q.wind>0?"Wind right · sink before the ledge":"Wind left · use long glide");
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
