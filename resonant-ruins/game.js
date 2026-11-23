"use strict";

const GAME = {
  "title": "Resonant Ruins",
  "brief": "hunt",
  "look": "grove",
  "avatar": "explorer",
  "zones": [
    "Bell Garden",
    "Drum Court",
    "Echo Plinths"
  ],
  "awards": [
    "Bronze Chime",
    "Rain Drum",
    "Crown Tuning Fork"
  ],
  "awardShape": "bell",
  "palette": {
    "sky": 7182471,
    "haze": 14536624,
    "tile": 12172960,
    "tile2": 10791565,
    "ink": 3558211,
    "trim": 9807496,
    "accent": 4681821,
    "loot": 15254664,
    "css": "#47705d"
  },
  "passages": [
    "Enter Drum Court",
    "Enter Echo Plinths"
  ],
  "scene": "grove",
  "footprint": "oct",
  "connector": "vine",
  "camera": [
    -0.38,
    0.53,
    1.08,
    0.04
  ],
  "spaces": [
    [
      0,
      0,
      0,
      0
    ],
    [
      -8,
      -9,
      0.78,
      0.68
    ],
    [
      -3,
      -23,
      1.65,
      -0.28
    ]
  ],
  "guides": [
    [
      "♪",
      "Match the chord"
    ],
    [
      "♪",
      "Tap on the pulse"
    ],
    [
      "♪",
      "Find the strongest echo"
    ]
  ],
  "ending": {
    "kind": "chord",
    "title": "Reliquary awakened",
    "summary": "Three chimes ring in sequence and unseal the reliquary.",
    "pieces": [
      "bell",
      "bell",
      "bell"
    ],
    "prize": "bell"
  },
  "tasks": [
    {
      "kind": "rhythm",
      "title": "Drum Court",
      "goalText": "Tap in time with the gold pulse",
      "count": 4,
      "award": "Rain Drum"
    },
    {
      "kind": "field",
      "title": "Echo Plinths",
      "goalText": "Listen to the tone from each plinth",
      "target": 1,
      "award": "Crown Tuning Fork"
    }
  ],
  "scenarios": [
    [
      {
        "kind": "rhythm",
        "title": "Drum Court",
        "goalText": "Tap in time with the gold pulse",
        "count": 4,
        "award": "Rain Drum"
      },
      {
        "kind": "rhythm",
        "title": "Drum Court",
        "goalText": "Tap in time with the gold pulse",
        "count": 5,
        "award": "Rain Drum",
        "period": 1.12
      },
      {
        "kind": "rhythm",
        "title": "Drum Court",
        "goalText": "Tap in time with the gold pulse",
        "count": 6,
        "award": "Rain Drum",
        "period": 1.3
      }
    ],
    [
      {
        "kind": "field",
        "title": "Echo Plinths",
        "goalText": "Listen to the tone from each plinth",
        "target": 1,
        "award": "Crown Tuning Fork"
      },
      {
        "kind": "field",
        "title": "Echo Plinths",
        "goalText": "Listen to the tone from each plinth",
        "target": 2,
        "award": "Crown Tuning Fork"
      },
      {
        "kind": "field",
        "title": "Echo Plinths",
        "goalText": "Listen to the tone from each plinth",
        "target": 0,
        "award": "Crown Tuning Fork"
      }
    ]
  ],
  "form": "grove",
  "controls": [
    "world",
    "tray",
    "world"
  ],
  "views": [
    [
      -0.34,
      0.42,
      1.01,
      0.13,
      0.88
    ],
    [
      0.55,
      0.62,
      0.85,
      -0.12,
      0.84
    ],
    [
      -0.55,
      0.48,
      0.99,
      -0.44,
      0.87
    ]
  ]
};

function makeFirstTask(c){
  const targets=[[1,2],[2,0,1],[0,2,1]];
  const initial=[[0,0],[0,2,0],[2,1,2]];
  const tuneNames=["Low","Mid","High"],hz=[293,415,587],hues=[0xf0a46b,0x91d4be,0xb49ee0];
  let wanted=[],pitch=[],heard=false,last=null,room=0,verified=false;
  const xx=i=>(i-(pitch.length-1)/2)*2.31;
  const zAt=i=>i%2===0?.51:-.33;
  const matched=()=>pitch.every((v,i)=>v===wanted[i]);
  function listen(){
    c.flyTo(0,2.33,()=>{
      heard=true;
      c.tone(wanted.map(i=>hz[i]),.20,.116);
      c.pulse([0,.51,2.67],0xe8cf96,15);
      show();
    });
  }
  function turn(i){
    c.flyTo(xx(i),zAt(i),()=>{
      pitch[i]=(pitch[i]+1)%3;verified=false;last={i,at:c.clock()};
      c.tone([hz[pitch[i]]],.055,.135);
      if(matched())c.tone([392,523,784],.10,.11);
      show();
    });
  }
  function show(){
    c.objective(!heard?"Listen to the stone's chord":matched()?"Chord matched · open the reliquary":"Tune the bells to the target chord");
    c.meter(heard?wanted.map((p,i)=>String.fromCharCode(65+i)+" "+tuneNames[p]).join(" · "):"");
    c.marker("chord",heard?"Hear target again":"Listen to chord",[0,.75,2.67],listen,{kind:"clue"});
    wanted.forEach((_,i)=>{
      if(heard)c.marker("bell"+i,String.fromCharCode(65+i)+" · "+tuneNames[pitch[i]],[xx(i),.88,zAt(i)],()=>turn(i),{kind:pitch[i]===wanted[i]?"good":"clue"});
    });
    if(room===2&&heard&&matched()&&!verified)c.tool("test","Sound the chord",()=>{
      c.tone(pitch.map(n=>hz[n]),.17,.13);
      verified=true;
      c.pulse([0,.47,-2.65],0xf0c983,24);
      show();
    });else c.hideTools();
    if(heard&&matched()&&(room<2||verified))c.marker("open","Open reliquary",[0,.73,-2.65],()=>c.flyTo(0,-2.19,()=>c.receive([0,0,-2.72])),{kind:"hot"});
    else c.off("open");
  }
  function start(i){room=i;verified=false;wanted=targets[i];pitch=initial[i].slice();heard=false;last=null;show();}
  function draw(m,time){
    c.pedestal(m,0,c.localZ(2.67),1.26,trim());
    c.item(m,"idol",0,.24,c.localZ(2.67),1.07,bright());
    for(const [i,n] of pitch.entries()){
      const x=xx(i),z=c.localZ(zAt(i));
      c.pedestal(m,x,z,.96,trim());
      m.box(x+.48,1.15,z,.092,2.08,.12,ink());
      m.box(x,2.05,z,1.09,.13,.16,trim());
      const wiggle=last?.i===i&&time-last.at<.73?Math.sin((time-last.at)*17)*.09:0;
      c.item(m,"bell",x+wiggle,.73,z,1.31,hues[n]);
      if(last?.i===i&&time-last.at<.8)c.ring(m,x,.06,z,.45+(time-last.at)*1.1,hues[n],.032);
    }
    c.pedestal(m,0,c.localZ(-2.72),1.62,trim());
    if(!c.hasAward())c.item(m,"box",0,.20,c.localZ(-2.72),1.05,0xa7856b);
  }
  return {start,draw};
}

function makeSecondTask(c,q){
  let t=0,beat=-1,heard=false,total=0,lastNote=-2;
  const period=q.period??1.20;
  const phase=()=>t%period;
  const beatIndex=()=>Math.floor(t/period);
  const ready=()=>heard&&phase()>.32&&phase()<.80&&beat!==beatIndex();
  function begin(){heard=true;t=0;c.tone([277,415]);refresh();}
  function tap(){
    if(!ready()){c.mistake("Tap during the gold pulse");return;}
    beat=beatIndex();total++;
    c.tone([330+total*56,523+total*48],.073);
    c.pulse([0,.50,-.39],0xefc986,22);
    if(total===q.count){c.receive([0,0,-1.10]);return;}
    refresh();
  }
  function refresh(){
    c.objective(!heard?"Listen to the drum chamber":q.goalText);
    c.meter(total+"/"+q.count+" beats");
    c.tool("beat",!heard?"Start the rhythm":ready()?"Tap now":"Tap beat",heard?tap:begin);
  }
  function start(){t=0;beat=-1;heard=false;total=0;lastNote=-2;refresh();}
  function tick(dt){
    if(!heard)return;
    const before=ready();t+=dt;
    if(beatIndex()!==lastNote){lastNote=beatIndex();c.tone([277+(lastNote%2)*83],.06,.073);}
    if(before!==ready())refresh();
  }
  function draw(m){
    const z=c.localZ(-.42),pulse=curve(phase()/period);
    m.tube([0,.04,z],[0,.22,z],1.26,1.15,ink(),14);
    m.tube([0,.22,z],[0,.75,z],.97,.89,trim(),12);
    m.tube([0,.75,z],[0,.81,z],.91,.92,ready()?0xefc986:0x8da9a9,12,1);
    if(heard)c.ring(m,0,.09,z,1.05+pulse*.75,ready()?0xffe795:trim(),.037);
  }
  return {start,tick,draw};
}

function makeThirdTask(c,q){
  const spots=[[-2.51,.28],[0,-2.07],[2.47,.47]],colors=[0xe2aa79,0x91cab0,0xb4a4d8];
  let reading=[],measured=null;
  const strength=i=>Math.round(98-12.4*Math.hypot(spots[i][0]-spots[q.target][0],spots[i][1]-spots[q.target][1]));
  function listen(i){
    const [x,s]=spots[i];
    c.flyTo(x,s,()=>{
      reading[i]=strength(i);measured={i,at:c.clock()};
      c.pulse([x,.53,s],colors[i],15);
      c.tone([198+strength(i)*7,250+strength(i)*7],.101,.10);
      show();
    });
  }
  function take(i){
    const [x,s]=spots[i];
    if(i!==q.target){c.mistake("The signal is louder at another plinth");return;}
    c.flyTo(x,s,()=>c.receive([x,0,s]));
  }
  function show(){
    const all=reading.every(n=>n!==null);
    c.objective(all?"Open the plinth with the strongest tone":q.goalText);
    c.meter(reading.filter(n=>n!==null).length+"/3 sites listened");
    spots.forEach(([x,z],i)=>{
      const name="ABC"[i];
      if(all)c.marker("site"+i,"Open "+name+" "+reading[i],[x,.66,z],()=>take(i),{kind:"hot"});
      else c.marker("site"+i,reading[i]===null?"Listen "+name:name+" · "+reading[i],[x,.66,z],()=>listen(i),{kind:"clue"});
    });
  }
  function start(){reading=spots.map(()=>null);measured=null;show();}
  function draw(m,t){
    for(const [i,[x,d]] of spots.entries()){
      const z=c.localZ(d);
      c.pedestal(m,x,z,1.33,colors[i]);
      c.item(m,"bell",x,.24,z,.93,colors[i]);
      if(measured?.i===i&&t-measured.at<1.12){
        const f=(t-measured.at)/1.12;
        c.ring(m,x,.092,z,.39+f*(.58+strength(i)*.022),colors[i],.034);
      }
    }
  }
  return {start,draw};
}

function makeChallenge(c){
  const makeRoom=[null,makeSecondTask,makeThirdTask];
  let active;
  return {
    start(stage,run,challenge){
      const scenario=(run+challenge)%3;
      active=stage===0?makeFirstTask(c):makeRoom[stage](c,GAME.scenarios[stage-1][scenario]);
      active.start(stage===0?scenario:stage,0);
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
