"use strict";

const GAME = {
  "title": "Footprint Tomb",
  "brief": "hunt",
  "look": "tomb",
  "avatar": "explorer",
  "zones": [
    "First Footprints",
    "Glyph Stone Gallery",
    "Spike Court"
  ],
  "awards": [
    "Keeper Figurine",
    "Gold Scarab",
    "Sun Guardian"
  ],
  "awardShape": "idol",
  "palette": {
    "sky": 9994094,
    "haze": 15785389,
    "tile": 13940874,
    "tile2": 12560259,
    "ink": 5327684,
    "trim": 10257517,
    "accent": 8674876,
    "loot": 16043139,
    "css": "#845e3c"
  },
  "passages": [
    "Enter Glyph Stone Gallery",
    "Enter Spike Court"
  ],
  "scene": "tomb",
  "footprint": "oct",
  "connector": "stone",
  "camera": [
    0.29,
    0.77,
    0.96,
    -0.06
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      -5,
      -11,
      -0.7,
      0.46
    ],
    [
      -3,
      -24,
      -1.35,
      -0.12
    ]
  ],
  "tasks": [
    {
      "kind": "assembly",
      "title": "Glyph Stone Gallery",
      "goalText": "Rotate the three glyphs into their carved sockets",
      "pieces": [
        [
          "Sun",
          "coin",
          2
        ],
        [
          "Warden",
          "idol",
          0
        ],
        [
          "Scarab",
          "shell",
          3
        ]
      ],
      "award": "Gold Scarab"
    },
    {
      "kind": "traffic",
      "title": "Spike Court",
      "goalText": "Cross each slab while its spikes retract",
      "wait": "Wait for spikes",
      "gates": 4,
      "object": "spikes",
      "tint": 15051635,
      "award": "Sun Guardian"
    }
  ],
  "form": "vault",
  "controls": [
    "world",
    "tray",
    "tray"
  ],
  "views": [
    [
      0.26,
      0.74,
      0.98,
      -0.07,
      0.8
    ],
    [
      -0.26,
      0.87,
      0.91,
      0.17,
      0.78
    ],
    [
      0.07,
      0.31,
      0.95,
      -0.36,
      0.91
    ]
  ]
};

function makeFirstTask(c){
  const routes=[
    [[0,2],[1,2],[1,1],[1,0],[2,0]],
    [[2,2],[2,1],[1,1],[1,2],[0,2],[0,1],[0,0]],
    [[1,2],[2,2],[2,1],[2,0],[1,0],[1,1],[0,1],[0,0]]
  ];
  const X=i=>(i-1)*1.46,Z=j=>(j-1)*1.59-.53;
  const cellName=(x,y)=>["A","B","C"][x]+(y+1);
  const equal=(a,b)=>!!a&&!!b&&a[0]===b[0]&&a[1]===b[1];
  let path=[],step=0,read=false,crack=null;
  function interpret(){
    c.flyTo(0,3.10,()=>{read=true;show();c.feedback(true,"Follow the engraved route");});
  }
  function stepOn(x,y){
    const p=[x,y],last=path[step-1];
    if(last&&equal(p,last)){c.feedback(false,"Choose the next adjacent tile");return;}
    if(last&&Math.abs(last[0]-x)+Math.abs(last[1]-y)>1){c.feedback(false,"Step to a neighboring tile");return;}
    c.flyTo(X(x),Z(y),()=>{
      if(!equal(p,path[step])){
        step=0;crack={p,at:c.clock()};
        c.pulse([X(x),.14,Z(y)],0xc98b59,14);
        c.mistake("Tile crumbled · route reset");
        show();return;
      }
      step++;
      c.tone([343+step*41,500+step*66],.07);
      c.pulse([X(x),.18,Z(y)],0x7fb9a8,12);
      show();
    });
  }
  function show(){
    c.objective(!read?"Read the footprint mosaic":step===path.length?"Safe trail crossed · open the tomb":"Step along the carved trail");
    c.meter(read?path.map(([x,y],i)=>(i<step?"✓":"")+cellName(x,y)).join(" · "):"");
    if(!read)c.marker("read","Read mosaic",[0,.57,3.14],interpret,{kind:"clue"});else c.off("read");
    for(let y=0;y<3;y++)for(let x=0;x<3;x++){
      const key="tile"+x+y;
      if(read&&step<path.length)c.marker(key,cellName(x,y),[X(x),.12,Z(y)],()=>stepOn(x,y),{kind:path.slice(0,step).some(p=>equal(p,[x,y]))?"good":""});
      else c.off(key);
    }
    if(step===path.length)c.marker("open","Open tomb",[0,.66,-3.43],()=>c.flyTo(0,-2.92,()=>c.receive([0,0,-3.51])),{kind:"hot"});
  }
  function start(i){path=routes[i];step=0;read=false;crack=null;show();}
  function draw(m,time){
    const z=c.localZ;
    for(let y=0;y<3;y++)for(let x=0;x<3;x++){
      const p=[x,y],gone=equal(crack?.p,p)&&time-crack.at<.64;
      const used=path.slice(0,step).some(v=>equal(p,v));
      m.box(X(x),gone?-.22:.075,z(Z(y)),1.33,.128,1.40,used?0x83bfa8:gone?0xc48460:0xc3aa82,0,0,gone?.12:0);
      if(used)c.ring(m,X(x),.146,z(Z(y)),.34,0xe7d08b,.019);
    }
    c.pedestal(m,0,z(3.16),1.26,trim());
    c.item(m,"idol",0,.23,z(3.18),.93,bright());
    c.pedestal(m,0,z(-3.52),1.46,trim());
    if(!c.hasAward())c.item(m,"box",0,.22,z(-3.52),1.06,0xaa785a);
  }
  function tap(p){
    if(!read||step===path.length)return false;
    const x=Math.round(p.x/1.46+1),y=Math.round((p.z+.53)/1.59+1);
    if(x<0||x>2||y<0||y>2||Math.abs(p.x-X(x))>.65||Math.abs(p.z-Z(y))>.71)return false;
    stepOn(x,y);return true;
  }
  return {start,draw,tap};
}

function makeSecondTask(c,q){
  const colors=[0xe6b36a,0x87c1b2,0xb5a3d8],xs=[-2.34,0,2.34];
  let held=-1,rot=0,inserted=[];
  function pick(i){held=i;rot=0;c.tone([297,452]);show();}
  function turn(){rot=(rot+1)%4;c.tone([334+rot*54]);show();}
  function fit(i){
    const p=q.pieces[held];
    if(held!==i||rot!==p[2]){c.mistake("Match the outline and facing angle");return;}
    c.flyTo(xs[i],-.72,()=>{
      inserted.push(i);held=-1;
      c.pulse([xs[i],.44,-1.22],colors[i],17);
      if(inserted.length===q.pieces.length){c.receive([0,0,-2.50]);return;}
      c.feedback(true,"Piece fitted");show();
    });
  }
  function show(){
    c.objective(held<0?q.goalText:"Rotate and fit "+q.pieces[held][0].toLowerCase());
    c.meter(held<0?inserted.length+"/"+q.pieces.length+" fitted":"Facing "+rot*90+"° · mark "+q.pieces[held][2]*90+"°");
    q.pieces.forEach(([name],i)=>{
      if(held<0&&!inserted.includes(i))c.marker("pick"+i,name,[xs[i],.59,2.13],()=>pick(i),{kind:"clue"});else c.off("pick"+i);
      if(held>=0&&!inserted.includes(i))c.marker("fit"+i,name+" slot",[xs[i],.67,-1.20],()=>fit(i),{kind:"hot"});else c.off("fit"+i);
    });
    if(held>=0){
      c.tool("turn","Rotate piece",turn);
      c.tool("put-back","Put back",()=>{held=-1;show();});
    }else c.hideTools();
  }
  function start(){held=-1;rot=0;inserted=[];show();}
  function draw(m){
    for(const [i,p] of q.pieces.entries()){
      const x=xs[i],z=c.localZ(-1.25);
      c.pedestal(m,x,z,1.42,colors[i]);
      m.box(x,.223,z,.81,.062,.61,ink(),p[2]*Math.PI*.5);
      if(inserted.includes(i))c.item(m,p[1],x,.24,z,.90,colors[i],p[2]*Math.PI*.5);
      else c.item(m,p[1],x,.16,c.localZ(2.13),.93,colors[i],held===i?rot*Math.PI*.5:0);
    }
  }
  return {start,draw};
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
