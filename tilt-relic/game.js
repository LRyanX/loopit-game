"use strict";

const GAME = {
  "title": "Tilt Relic",
  "brief": "hunt",
  "look": "shrine",
  "avatar": "explorer",
  "zones": [
    "Rolling Court",
    "Counterweight Shrine",
    "Sliding Stone Door"
  ],
  "awards": [
    "Guardian Marble",
    "Jade Bearing",
    "Solar Sphere"
  ],
  "awardShape": "orb",
  "palette": {
    "sky": 7965350,
    "haze": 14996657,
    "tile": 13024164,
    "tile2": 11579040,
    "ink": 4016729,
    "trim": 9015691,
    "accent": 5465981,
    "loot": 15910779,
    "css": "#53677d"
  },
  "passages": [
    "Enter Counterweight Shrine",
    "Enter Sliding Stone Door"
  ],
  "scene": "shrine",
  "footprint": "square",
  "connector": "stone",
  "camera": [
    -0.15,
    0.94,
    0.93,
    -0.08
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
      -9.0,
      3.42,
      0
    ],
    [
      0,
      -18.0,
      6.66,
      0
    ]
  ],
  "tasks": [
    {
      "kind": "weigh",
      "title": "Counterweight Shrine",
      "goalText": "Balance the stone lift on both sides",
      "unit": "stone",
      "parts": [
        [
          "Pebble",
          1,
          "rock"
        ],
        [
          "Idol",
          3,
          "idol"
        ],
        [
          "Boulder",
          2,
          "rock"
        ]
      ],
      "goal": [
        3,
        3
      ],
      "award": "Jade Bearing"
    },
    {
      "kind": "jam",
      "title": "Sliding Stone Door",
      "goalText": "Slide the marked blocks into the door pattern",
      "parts": [
        "Sun",
        "Jade",
        "Moon"
      ],
      "start": [
        1,
        2,
        0,
        -1
      ],
      "object": "idol",
      "award": "Solar Sphere"
    }
  ],
  "form": "lift",
  "controls": [
    "tray",
    "tray",
    "world"
  ],
  "views": [
    [
      0.02,
      1.14,
      0.92,
      -0.11,
      0.72
    ],
    [
      -0.44,
      0.64,
      0.94,
      0.2,
      0.8
    ],
    [
      0.13,
      0.94,
      0.89,
      -0.19,
      0.77
    ]
  ]
};

function makeFirstTask(c){
  const rooms=[
    {start:[0,2],goal:[2,0],walls:[[1,1]]},
    {start:[2,2],goal:[0,0],walls:[[1,0],[1,2]]},
    {start:[0,0],goal:[1,1],walls:[[1,0],[0,2]],slide:true}
  ];
  const px=x=>(x-1)*1.47,pz=y=>(y-1)*1.43-.27;
  const directions=[[-1,0],[1,0],[0,-1],[0,1]];
  const names=["Tilt left","Tilt right","Tilt up","Tilt down"];
  let room,cell=[],shown=[],motion=null,seen=false,finger=null;
  const at=(a,b)=>a[0]===b[0]&&a[1]===b[1];
  function inspect(){
    c.flyTo(0,2.58,()=>{
      seen=true;c.feedback(true,"Roll into the glowing socket");putControls();
    });
  }
  function putControls(){
    c.objective(seen?(room.slide?"The ball now rolls to the next rail":"Tilt the board · roll into the socket"):"Inspect the stone ball track");
    if(!seen)c.marker("guide","Inspect track",[0,.68,2.68],inspect,{kind:"clue"});else c.off("guide");
    if(seen)directions.forEach(([x,y],i)=>c.tool("dir"+i,names[i],()=>move(x,y),!!motion));
  }
  function move(dx,dy){
    if(!seen||motion)return;
    const blocked=p=>p.some(n=>n<0||n>2)||room.walls.some(wall=>at(p,wall));
    let goal=[cell[0]+dx,cell[1]+dy];
    if(blocked(goal)){
      c.mistake("Stone rail blocks that tilt");return;
    }
    if(room.slide){
      while(!blocked([goal[0]+dx,goal[1]+dy]))goal=[goal[0]+dx,goal[1]+dy];
    }
    motion={from:cell.slice(),to:goal,t:0,dx,dy};
    c.tone([286,417]);
    putControls();
  }
  function step(dt){
    if(!motion)return;
    motion.t=Math.min(1,motion.t+dt*4.55);
    const f=curve(motion.t);
    shown=[lerp(motion.from[0],motion.to[0],f),lerp(motion.from[1],motion.to[1],f)];
    if(motion.t<1)return;
    cell=motion.to;
    motion=null;
    if(at(cell,room.goal)){
      c.pulse([px(cell[0]),.31,pz(cell[1])],0x94f3ba,24);
      c.receive([px(cell[0]),0,-3.23]);return;
    }
    putControls();
  }
  function start(i){room=rooms[i];cell=room.start.slice();shown=cell.slice();seen=false;motion=null;finger=null;putControls();}
  function draw(world,time){
    const m=new Mesh(),z=c.localZ;
    m.box(0,.12,z(-.27),4.76,.21,4.60,ink());
    for(let y=0;y<3;y++)for(let x=0;x<3;x++){
      const wall=room.walls.some(p=>at(p,[x,y])),goal=at(room.goal,[x,y]);
      m.box(px(x),.256,z(pz(y)),1.37,.089,1.32,wall?trim():0x92a7a0);
      if(wall)m.box(px(x),.52,z(pz(y)),1.31,.48,1.21,0x6f7677);
      if(goal){
        c.ring(m,px(x),.31,z(pz(y)),.43,0x9cffc5,.038);
        m.tube([px(x),.29,z(pz(y))],[px(x),.31,z(pz(y))],.23,.23,ink(),10);
      }
    }
    c.item(m,"orb",px(shown[0]),.34+(motion?.t?Math.sin(motion.t*Math.PI)*.09:0),z(pz(shown[1])),.82,0xf0b76b,time*.5);
    const turn=motion?Math.sin(Math.PI*motion.t)*.10:0;
    for(let i=0;i<m.data.length;i+=10){
      const f=-(motion?.dx??0)*m.data[i]-(motion?.dy??0)*(m.data[i+2]-z(-.27));
      m.data[i+1]+=turn*f;
      m.data[i+3]+=turn*(motion?.dx??0)*m.data[i+4];
      m.data[i+5]+=turn*(motion?.dy??0)*m.data[i+4];
      world.data.push(...m.data.slice(i,i+10));
    }
    c.pedestal(world,0,z(2.68),1.34,trim());
    c.item(world,"idol",0,.23,z(2.68),.78,bright());
  }
  function key(key){
    const value={arrowleft:0,arrowright:1,arrowup:2,arrowdown:3}[key];
    if(!seen||value===undefined)return false;
    move(...directions[value]);return true;
  }
  function swipe(p){
    if(!seen||!p.origin||Math.abs(p.origin.x)>2.44||Math.abs(p.origin.z+.27)>2.41)return false;
    if(Math.hypot(p.totalX,p.totalY)>26){
      const x=Math.abs(p.totalX)>Math.abs(p.totalY);
      finger=x?[Math.sign(p.totalX),0]:[0,Math.sign(p.totalY)];
    }
    return true;
  }
  function dragEnd(){const direction=finger;finger=null;if(direction)move(...direction);}
  return {start,tick:step,draw,key,swipe,dragEnd};
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
    tiles.forEach((n,i)=>{
      if(n===-1){c.off("block"+i);return;}
      c.marker("block"+i,"Slide "+q.parts[n],[positions[i][0],.67,positions[i][1]],()=>slide(i),{kind:n===should[i]?"good":"clue",disabled:!!move});
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
