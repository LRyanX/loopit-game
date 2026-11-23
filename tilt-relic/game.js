"use strict";

const GAME = {
  "title": "Tilt Relic",
  "brief": "hunt",
  "look": "shrine",
  "avatar": "explorer",
  "zones": [
    "Rolling Court",
    "Marble Brake Gates",
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
    "Enter Marble Brake Gates",
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
  "chapters": [
    [
      {
        "kind": "signature",
        "guide": [
          "◉",
          "Roll to the socket"
        ]
      },
      {
        "kind": "special",
        "guide": [
          "◉",
          "Roll to the socket"
        ]
      }
    ],
    [
      {
        "kind": "brakes",
        "guide": [
          "◉",
          "Brake for each rail"
        ],
        "runs": [
          {
            "kind": "brakes",
            "title": "Marble Brake Gates",
            "goalText": "Choose the clear rail and set its brake",
            "forks": [
              [
                -1,
                false
              ],
              [
                1,
                true
              ],
              [
                -1,
                true
              ]
            ],
            "award": "Jade Bearing"
          },
          {
            "kind": "brakes",
            "title": "Marble Brake Gates",
            "goalText": "Choose the clear rail and set its brake",
            "forks": [
              [
                1,
                true
              ],
              [
                -1,
                false
              ],
              [
                1,
                true
              ]
            ],
            "award": "Jade Bearing"
          },
          {
            "kind": "brakes",
            "title": "Marble Brake Gates",
            "goalText": "Choose the clear rail and set its brake",
            "forks": [
              [
                1,
                false
              ],
              [
                1,
                true
              ],
              [
                -1,
                false
              ]
            ],
            "award": "Jade Bearing"
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
              2,
              0,
              1,
              -1
            ],
            "object": "idol",
            "award": "Solar Sphere"
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
              -1,
              2,
              1,
              0
            ],
            "object": "idol",
            "award": "Solar Sphere"
          }
        ]
      }
    ]
  ],
  "ending": {
    "kind": "roll",
    "title": "Guardian shrine opened",
    "summary": "The final marble rolls into its socket and lifts the seal.",
    "pieces": [
      "orb",
      "orb",
      "orb"
    ],
    "prize": "idol"
  },
  "tasks": [
    {
      "kind": "brakes",
      "title": "Marble Brake Gates",
      "goalText": "Choose the clear rail and set its brake",
      "forks": [
        [
          -1,
          false
        ],
        [
          1,
          true
        ],
        [
          -1,
          true
        ]
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

function makeSpecialTask(c,scenario){
  const side=[1,0,1][scenario],power=[1,2,2][scenario],labels=["Low","Mid","High"];
  let aim=0,charge=0,flight=null;
  function launch(){
    flight={at:c.clock(),x:aim===side?0:(aim?1.75:-1.75),z:charge===power?-2.53:-.62};update();
  }
  function update(){
    c.objective("Bank the marble into the socket");
    c.meter((side===0?"Left":"Right")+" rail · "+labels[power]+" power");
    c.marker("angle","Switch rail",[aim===0?-1.62:1.62,.52,.62],()=>{aim=1-aim;update();},
      {kind:"clue",caption:aim===0?"Left rail":"Right rail",disabled:!!flight});
    c.marker("power","Set power",[0,.59,2.05],()=>{charge=(charge+1)%3;c.tone([325+charge*103]);update();},
      {kind:"clue",caption:labels[charge],disabled:!!flight});
    c.tool("roll","Release marble",launch,!!flight);
  }
  function tick(dt,t){
    if(!flight||t-flight.at<.98)return;
    const hit=flight.x===0&&flight.z<-2;
    flight=null;
    if(hit){c.receive([0,0,-2.53]);return;}
    c.mistake("Follow the rail and power marks");update();
  }
  function draw(m,t){
    const z=c.localZ;
    for(const i of [-1,1]){
      m.box(i*1.46,.17,z(-.61),.35,.31,3.29,i===(side?1:-1)?0x9ec9b0:0xa8806a,0,9);
      m.box(i*.64,.24,z(-1.77),1.61,.23,.18,trim(),i*.42,9);
    }
    ring(m,0,.09,z(-2.53),.48,0xffd292,.048);
    const f=flight?curve((t-flight.at)/.98):0;
    c.item(m,"orb",flight?lerp(0,flight.x,f):0,.24+.13*Math.sin(f*Math.PI),z(flight?lerp(2.18,flight.z,f):2.18),.92,bright());
  }
  return {start:update,tick,draw};
}

function make_brakes(c,q){
  let index=0,brake=false,roll=null;
  const row=i=>2.21-i*1.73;
  const speedAt=i=>q.forks[i][1];
  function toggle(){brake=!brake;c.tone([brake?261:431]);show();}
  function route(side){
    if(roll)return;
    const [safe,slow]=q.forks[index];
    if(side!==safe||brake!==slow){
      c.mistake(side!==safe?"That track leads into the pit":slow?"Brake for the short rail":"Release the brake for the ramp");
      return;
    }
    roll={at:c.clock(),side};
    c.tone([298,442,574]);show();
  }
  function show(){
    c.objective("Set the brake and choose a rail");
    const slow=speedAt(index);
    c.meter((index+1)+"/"+q.forks.length+" · "+(slow?"short rail needs brake":"jump ramp needs speed"));
    c.marker("brake",brake?"Release brake":"Set brake",[0,.74,row(index)+.64],toggle,{kind:brake?"good":"clue",disabled:!!roll});
    for(const s of [-1,1])c.marker("rail"+s,s<0?"Left rail":"Right rail",[s*1.53,.48,row(index)-.36],()=>route(s),{kind:"hot",disabled:!!roll});
  }
  function start(){index=0;brake=false;roll=null;show();}
  function tick(dt,t){
    if(!roll||t-roll.at<.72)return;
    const side=roll.side;roll=null;
    c.pulse([side*.91,.44,row(index)-.53],0x86dfbd,13);
    index++;
    if(index===q.forks.length){c.receive([0,0,-2.70]);return;}
    show();
  }
  function draw(m,t){
    const z=c.localZ;
    q.forks.forEach(([safe,slow],i)=>{
      const r=row(i);
      m.box(0,.10,z(r),3.96,.18,1.51,ink(),0,9);
      for(const side of [-1,1]){
        const x=side*1.04,ok=side===safe;
        m.box(x,.24,z(r-.22),.95,.13,ok?(slow?.85:1.40):.61,ok?0x84a59a:0xa37c6e,0,9,ok&&!slow?.24:0);
        if(!ok)m.oval(x,.18,z(r-.62),.29,.09,.31,0x8d5045,0,9,9);
        if(ok&&slow)for(let a=0;a<3;a++)m.box(x,.34,z(r-.06-a*.19),.63,.035,.065,0xeac583,0,1);
      }
      m.oval(0,.47,z(r+.54),.12,.12,.11,i<index?0x86dcb9:i===index?0xefc780:trim(),0,1,8);
    });
    if(index>=q.forks.length)return;
    const f=roll?curve((t-roll.at)/.72):0;
    c.item(m,"orb",roll?roll.side*Math.sin(f*Math.PI)*1.05:0,.30+.24*Math.sin(f*Math.PI),
      z(row(index)+.73-f*1.70),.98,0xe9c688,t*4);
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

const taskFactories = {brakes:make_brakes, jam:make_jam};
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
