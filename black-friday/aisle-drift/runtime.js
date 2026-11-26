"use strict";

const trim=()=>GAME.palette.trim;
const ink=()=>GAME.palette.ink;
const flat=()=>GAME.palette.tile;
const bright=()=>GAME.palette.accent;
const sand=0xf2dfad;
const white=0xf7ead3;

function ring(mesh,x,y,z,r,tint,width=.022,sides=24) {
  for(let i=0;i<sides;i++){
    const a=i/sides*TAU,b=(i+1)/sides*TAU;
    const p=(v,s)=>[x+Math.cos(s)*v,y,z+Math.sin(s)*v];
    mesh.quad(p(r+width,a),p(r,a),p(r,b),p(r+width,b),tint,1);
  }
}

function item(m,type,x,y,z,s,t,a=0) {
  const box=(dy,w,h,d,c,angle=a)=>m.box(x,y+dy*s,z,w*s,h*s,d*s,c,angle);
  const gem=(dy,w,h,d,c,points=6)=>m.gem(x,y+dy*s,z,w*s,h*s,d*s,c,points,a,1);
  const orb=(dy,w,h,d,c,glow=0)=>m.oval(x,y+dy*s,z,w*s,h*s,d*s,c,a,glow,10);
  const tube=(y0,y1,r0,r1,c,points=10,glow=0)=>m.tube([x,y+y0*s,z],[x,y+y1*s,z],r0*s,r1*s,c,points,glow);
  switch(type){
    case "box":
      if(GAME.brief==="hunt"&&y<.28){treasureLure(m,z,x,s*.93);break;}
    case "gift":
      box(.35,.78,.64,.68,t);
      box(.70,.86,.13,.74,type==="gift"?white:trim());
      box(.39,.11,.64,.707,type==="gift"?white:ink());
      if(type==="gift"){box(.80,.42,.06,.16,t,a+.55);box(.80,.16,.07,.41,t,a-.43);}
      break;
    case "bag":
      box(.34,.69,.62,.38,t);
      box(.12,.72,.10,.42,ink());
      for(const side of [-1,1])m.tube([x+s*side*.21,y+s*.59,z],[x+s*side*.19,y+s*.91,z],.039*s,.034*s,white,6);
      box(.92,.43,.041,.058,white);
      box(.38,.32,.17,.383,white);
      break;
    case "kettle":
      orb(.37,.33,.34,.33,t);
      tube(.61,.73,.22,.19,ink(),8);
      m.tube([x+s*.20,y+s*.42,z],[x+s*.50,y+s*.57,z],.135*s,.087*s,t,8);
      m.tube([x-s*.25,y+s*.54,z],[x-s*.39,y+s*.30,z],.057*s,.057*s,ink(),6);
      break;
    case "headset":
      for(const side of [-1,1])m.box(x+side*s*.26,y+s*.27,z,.20*s,.32*s,.22*s,t,a);
      for(let i=0;i<9;i++){
        const q=(i/9)*Math.PI,k=(i+1)/9*Math.PI;
        m.tube([x+Math.cos(q)*.32*s,y+(.31+Math.sin(q)*.35)*s,z],[x+Math.cos(k)*.32*s,y+(.31+Math.sin(k)*.35)*s,z],.045*s,.045*s,t,7);
      }
      break;
    case "shoe":
      orb(.15,.46,.11,.24,white);
      orb(.26,.39,.16,.23,t);
      m.box(x-s*.18,y+s*.39,z,.37*s,.18*s,.36*s,t,a);
      for(const offset of [-.03,.10,.22])m.box(x+s*offset,y+s*.37,z,.03*s,.024*s,.33*s,white,a);
      break;
    case "mug":
      tube(.02,.61,.27,.33,t,10);
      tube(.61,.64,.32,.32,white,10);
      tube(.642,.649,.25,.25,ink(),10);
      m.tube([x+s*.25,y+s*.46,z],[x+s*.42,y+s*.48,z],.042*s,.047*s,t,8);
      m.tube([x+s*.42,y+s*.48,z],[x+s*.43,y+s*.23,z],.046*s,.046*s,t,8);
      m.tube([x+s*.43,y+s*.23,z],[x+s*.25,y+s*.19,z],.046*s,.044*s,t,8);
      break;
    case "camera":
      box(.36,.79,.49,.43,t);
      box(.645,.29,.17,.31,ink());
      m.tube([x,y+s*.35,z+s*.20],[x,y+s*.35,z+s*.42],.22*s,.19*s,ink(),10);
      m.tube([x,y+s*.35,z+s*.43],[x,y+s*.35,z+s*.45],.154*s,.143*s,0x94c6d5,9,1);
      break;
    case "lamp":
      tube(.01,.09,.30,.27,ink());
      tube(.08,.55,.06,.057,white,8);
      tube(.49,.78,.33,.17,t,10,1);
      break;
    case "parcel":
      box(.29,.77,.53,.67,t);
      box(.568,.18,.02,.68,white);
      box(.33,.36,.18,.682,white);
      for(let i=0;i<4;i++)m.box(x+s*(i-.5)*.053,y+s*.34,z+s*.349,s*.019,s*.101,s*.015,ink(),a);
      break;
    case "coupon":
    case "receipt":
      box(.40,.57,.71,.09,type==="receipt"?white:t);
      box(.69,.43,.085,.105,type==="receipt"?t:white);
      for(let i=0;i<3;i++)m.box(x,y+s*(.46-i*.11),z+s*.058,s*(i===1?.35:.26),s*.031,s*.01,ink(),a);
      break;
    case "person":
      orb(.86,.16,.185,.15,0xd9a178);
      box(.56,.34,.40,.28,t);
      for(const side of [-1,1]){
        m.box(x+side*s*.087,y+s*.19,z,.128*s,.32*s,.13*s,ink(),a);
        m.box(x+side*s*.21,y+s*.54,z,.11*s,.26*s,.12*s,t,a);
      }
      break;
    case "register":
      box(.28,.79,.44,.75,ink());
      box(.56,.75,.14,.68,t);
      box(.70,.60,.087,.40,white);
      box(.86,.53,.23,.141,ink());
      box(.89,.40,.11,.154,0x75dbc9);
      break;
    case "gem":
    case "prism":
    case "ice":
      gem(.59,.34,.86,type==="prism"?.25:.32,t,type==="prism"?3:6);
      gem(.70,.178,.53,.153,white,5);
      break;
    case "coin":
      tube(.27,.41,.39,.39,t,14,1);
      tube(.41,.46,.29,.29,white,12,1);
      gem(.49,.17,.23,.15,t,5);
      break;
    case "bell":
      tube(.22,.63,.38,.20,t,13);
      tube(.63,.75,.20,.14,t,12);
      tube(.19,.24,.42,.44,t,13,1);
      orb(.18,.085,.081,.079,white,1);
      break;
    case "shell":
      for(let i=0;i<5;i++){
        const q=i*Math.PI*.26+a;
        m.oval(x+Math.sin(q)*.16*s,y+s*.35,z+Math.cos(q)*.13*s,.12*s,.34*s,.13*s,t,q,0,7);
      }
      gem(.48,.16,.31,.16,white,6);
      break;
    case "fossil":
      orb(.15,.48,.14,.42,0xaa7b56);
      for(let i=0;i<19;i++){
        const q=i*.58+a,r=.02+i*.018;
        m.oval(x+Math.sin(q)*r*s,y+.29*s,z+Math.cos(q)*r*s,.05*s,.045*s,.05*s,t,q,1,6);
      }
      break;
    case "gear":
      tube(.029,.179,.32,.32,t,12);
      tube(.178,.21,.17,.17,ink(),10);
      for(let i=0;i<9;i++){
        const q=a+i/9*TAU,r=.37*s;
        m.box(x+Math.sin(q)*r,y+.108*s,z+Math.cos(q)*r,.12*s,.16*s,.17*s,t,q);
      }
      break;
    case "key":
      tube(.24,.34,.28,.28,t,10);
      tube(.341,.352,.145,.145,ink(),8);
      m.box(x+s*.36,y+s*.29,z,.53*s,.106*s,.12*s,t,a);
      m.box(x+s*.60,y+s*.29,z+s*.1,.17*s,.105*s,.28*s,t,a);
      break;
    case "orb":
      orb(.39,.31,.31,.31,t,1);
      orb(.51,.15,.14,.16,white,1);
      break;
    case "idol":
      box(.13,.61,.22,.54,ink());
      box(.38,.49,.36,.39,t);
      orb(.69,.23,.28,.22,t,1);
      for(const side of [-1,1])m.box(x+s*side*.092,y+s*.718,z+s*.20,.060*s,.046*s,.036*s,white);
      break;
    case "magnet":
      box(.22,.65,.29,.38,ink());
      for(const side of [-1,1])m.box(x+s*side*.28,y+s*.43,z,.17*s,.65*s,.39*s,t);
      box(.176,.57,.16,.40,t);
      break;
    case "rock":
      orb(.31,.55,.36,.47,t);
      orb(.45,.37,.32,.32,t);
      break;
    default:
      box(.31,.67,.59,.58,t);
      gem(.64,.26,.52,.26,white);
  }
}

function pedestal(m,x,z,size=1,tint=trim(),wide=1) {
  m.box(x,.077,z,1.00*size*wide,.14,.92*size,ink());
  m.box(x,.168,z,.93*size*wide,.042,.84*size,tint);
}

function agentModel(m,p,time) {
  const {x,z,heading}=p;
  const base=p.offsetY??0, y=base+(GAME.avatar==="diver"?.80:GAME.avatar==="hover"?1.36:.04);
  const t=GAME.palette.accent,a=heading;
  const at=(dx,dy,dz)=>[x+Math.cos(a)*dx+Math.sin(a)*dz,y+dy,z-Math.sin(a)*dx+Math.cos(a)*dz];
  const box=(dx,dy,dz,w,h,d,col)=>m.box(...at(dx,dy,dz),w,h,d,col,a);
  m.quad([x-.60,base+.028,z-.60],[x-.60,base+.028,z+.60],[x+.60,base+.028,z+.60],[x+.60,base+.028,z-.60],0,3);
  if(GAME.avatar==="cart"){
    box(0,.22,0,.88,.10,1.04,ink());
    box(0,.38,0,.88,.22,.98,t);
    for(const side of [-1,1]){
      box(side*.41,.52,0,.08,.27,.97,white);
      for(const end of [-1,1])m.oval(...at(side*.38,.09,end*.42),.102,.107,.103,ink(),a,0,8);
    }
    box(0,.67,.50,.93,.08,.09,t);
    box(0,.48,-.45,.85,.16,.08,white);
    return;
  }
  if(GAME.avatar==="hover"||GAME.avatar==="diver"){
    m.oval(...at(0,.04,0),.47,.22,.40,t,a,0,10);
    box(0,-.01,.30,.50,.14,.17,ink());
    box(0,.03,.40,.32,.077,.09,0x80f2da);
    for(const side of [-1,1]){
      const q=at(side*.48,0,0);
      m.tube([q[0],q[1]-.11,q[2]],[q[0],q[1]+.04,q[2]],.220,.247,ink(),10);
      ring(m,q[0],q[1]+.052,q[2],.197,white,.030,14);
    }
    return;
  }
  m.oval(...at(0,.76,0),.17,.18,.16,0xe4be91,a,0,9);
  m.oval(...at(0,.87,0),.217,.11,.195,t,a,0,9);
  box(0,.47,0,.36,.39,.26,t);
  box(0,.53,-.20,.31,.34,.17,white);
  for(const side of [-1,1])box(side*.105,.18,reduced?0:Math.sin(time*8)*side*.08,.14,.27,.17,ink());
}

const saleGlyphs={
  B:["1110","1001","1110","1001","1110"], L:["1000","1000","1000","1000","1111"],
  A:["0110","1001","1111","1001","1001"], C:["0111","1000","1000","1000","0111"],
  K:["1001","1010","1100","1010","1001"], F:["1111","1000","1110","1000","1000"],
  R:["1110","1001","1110","1010","1001"], I:["111","010","010","010","111"],
  D:["1110","1001","1001","1001","1110"], Y:["1001","1001","0110","0010","0010"],
  S:["0111","1000","0110","0001","1110"], E:["1111","1000","1110","1000","1111"]
};

function signLine(mesh,text,x,y,z,pixel,tint){
  const width=Array.from(text).reduce((n,s)=>n+(saleGlyphs[s]?.[0].length??2)+1,0)-1;
  let col=0;
  for(const ch of text){
    const pattern=saleGlyphs[ch];
    if(pattern)pattern.forEach((bits,row)=>{
      Array.from(bits).forEach((bit,i)=>{
        if(bit==="1")mesh.box(x+(col+i-width/2+.5)*pixel,y+(2-row)*pixel,z,pixel*.86,pixel*.87,.02,tint,0,1);
      });
    });
    col+=(pattern?.[0].length??2)+1;
  }
}

function storeSign(m,z,pal){
  const x=.03,depth=z-4.05;
  for(const side of [-1,1])m.box(x+side*1.67,.95,depth,.13,1.84,.14,pal.ink);
  m.box(x,1.80,depth,3.04,.65,.19,pal.ink);
  m.box(x,1.80,depth+.105,2.98,.56,.035,pal.accent);
  signLine(m,"BLACK FRIDAY",x,1.798,depth+.138,.052,0xffe6ae);
}

function coralBranch(m,x,y,z,size,tint){
  const roots=[[-.27,.61,.12],[.19,.73,-.11],[.37,.44,.22],[-.36,.34,-.24]];
  const root=[x,y,z];
  for(const [dx,dy,dz] of roots){
    const tip=[x+size*dx,y+size*dy,z+size*dz];
    const elbow=[x+size*dx*.41,y+size*dy*.54,z+size*dz*.66];
    m.tube(root,elbow,.071*size,.056*size,tint,7);
    m.tube(elbow,tip,.058*size,.029*size,tint,7);
    m.oval(...tip,.038*size,.043*size,.038*size,tint,0,1,6);
  }
}
function huntBackdrop(m,z,pal,style){
  for(const s of [-1,1]){
    const x=s*3.84;
    if(style==="reef"){
      for(const [dz,d] of [[2.62,.83],[-.79,.69],[-3.32,.90]]){
        m.oval(x,.14,z+dz,.39,.17,.38,pal.ink,0,0,7);
        coralBranch(m,x,.19,z+dz,d,s===1?0xe6ac94:0x7fccb6);
      }
    } else if(style==="dig"){
      for(const dz of [-1.47,1.48]){
        m.oval(x,.11,z+dz,.46,.19,.94,0xd8ae76,.28,0,7);
        m.oval(x-s*.16,.16,z+dz+.32,.34,.17,.60,0xe5c392,.24,0,8);
      }
    } else if(style==="archive"){
      m.box(x,.59,z-.20,.37,1.15,.69,pal.ink);
      m.box(x,.81,z-.20,.41,.13,.74,pal.accent);
      m.gem(x,1.33,z-.20,.18,.48,.19,0xd6bbf2,6,.23,1);
      m.box(x,.95,z-4.17,.31,1.77,.24,pal.ink);
      m.box(x-s*.43,1.56,z-4.17,1.18,.14,.24,pal.trim,-s*.03,0,s*.24);
    } else if(style==="cistern"){
      for(const dz of [-3.19,1.08]){
        const p=[x,.81,z+dz];
        m.tube([x,.07,z+dz],p,.12,.12,pal.ink,9);
        m.tube(p,[x-s*.43,.81,z+dz],.125,.097,pal.accent,9);
        m.oval(x-s*.43,.80,z+dz,.13,.105,.13,0xa3e2cb,0,0,8);
      }
    } else if(style==="grove"||style==="canopy"){
      m.tube([s*4.26,.02,z-2.90],[s*4.41,1.81,z-3.24],.22,.105,pal.ink,8);
      m.tube([s*4.39,1.27,z-3.14],[s*4.33,1.86,z-2.55],.098,.042,pal.trim,8);
      m.oval(s*4.38,1.83,z-3.21,.67,.27,.59,pal.trim,s*.3,0,8);
      m.oval(s*4.49,2.10,z-2.73,.60,.35,.64,pal.tile2,s*.3,0,8);
      if(style==="canopy")item(m,"gear",s*3.62,.38,z-.90,.79,pal.loot);
    } else if(style==="aurora"){
      for(const dz of [-3.47,.45,2.64]){
        m.gem(x,.36,z+dz,.27,.95,.29,pal.trim,5,s*.61,1);
        m.gem(x-s*.27,.19,z+dz+.22,.211,.61,.217,pal.tile,4,s*.35,1);
      }
    } else if(style==="mine"){
      m.tube([x,.11,z-2.0],[x,1.20,z-2.0],.10,.10,pal.ink,8);
      m.tube([x,1.20,z-2.0],[x-s*.33,1.18,z-2.0],.07,.062,pal.trim,8);
      m.oval(x-s*.31,1.00,z-2.0,.16,.19,.15,0xf4c680,0,1,8);
      for(const dz of [2.29,2.64])m.box(x,.09,z+dz,.51,.14,.21,pal.trim);
    } else if(style==="tomb"||style==="shrine"){
      for(const dz of [-3.72,3.70]){
        m.box(x,.22,z+dz,.56,.42,.58,pal.ink);
        m.tube([x,.38,z+dz],[x,1.37,z+dz],.19,.16,pal.trim,8);
        m.box(x,1.41,z+dz,.46,.13,.51,pal.ink);
        m.box(x,1.50,z+dz,.32,.07,.36,pal.accent);
      }
    }
  }
}
function decorateWorld(){
  const terrain=new Mesh(),random=seeded(411+GAME.title.length*319);
  terrainField(terrain,random);
  mainArchitecturalForm(terrain);
  for(let i=0;i<3;i++){
    const section=new Mesh(), z=-11*i;
    makeFloor(section,i,random);
    if(GAME.brief==="sale")storeRoom(section,z,i);else huntRoom(section,z,i);
    insertZone(terrain,section,i);
    if(i<2)stagePassage(terrain,i);
  }
  return terrain;
}

"use strict";

function placed(point,index){
  const [x,y,z]=point,[cx,cz,elevation,a]=GAME.spaces[index],s=Math.sin(a),q=Math.cos(a),local=z+11*index;
  return [cx+x*q+local*s,y+elevation,cz-x*s+local*q];
}
function unplaced(p,index){
  const [cx,cz,elevation,a]=GAME.spaces[index],x=p[0]-cx,z=p[2]-cz,s=Math.sin(a),q=Math.cos(a);
  return {x:x*q-z*s,y:p[1]-elevation,z:x*s+z*q};
}
function insertZone(world,section,index){
  const data=section.data, [cx,cz,h,a]=GAME.spaces[index],s=Math.sin(a),q=Math.cos(a);
  for(let i=0;i<data.length;i+=10){
    const x=data[i],z=data[i+2]+11*index,nx=data[i+3],nz=data[i+5];
    world.data.push(cx+x*q+z*s,data[i+1]+h,cz-x*s+z*q,nx*q+nz*s,data[i+4],-nx*s+nz*q,
      data[i+6],data[i+7],data[i+8],data[i+9]);
  }
}
function gatePoint(index,front=false){
  return placed([0,.03,(front?4.49:-4.49)-11*index],index);
}
function bridgeAxis(index){
  const a=gatePoint(index),b=gatePoint(index+1,true);
  return [a,b];
}

function slab(m,outline,z,tint,side,base,material=0){
  const n=outline.length;
  for(let i=0;i<n;i++){
    const [ax,az]=outline[i],[bx,bz]=outline[(i+1)%n];
    const a=[ax,.012,z+az],b=[bx,.012,z+bz],c=[bx,base,z+bz],d=[ax,base,z+az];
    m.tri([0,.012,z],b,a,tint,material);
    m.quad(a,b,c,d,side,material);
  }
}

function footprint(kind){
  if(kind==="round"||kind==="organic"){
    return Array.from({length:16},(_,i)=>{
      const a=(i-.5)/16*TAU,noise=kind==="organic"?(i%3-1)*.26:0;
      return [Math.sin(a)*(4.45+noise),Math.cos(a)*(5.10+noise)];
    }).reverse();
  }
  if(kind==="kite")return [[-3.16,-4.59],[2.81,-4.59],[4.37,-2.81],[4.37,2.67],[2.56,4.56],[-2.92,4.56],[-4.39,2.22],[-4.40,-2.98]];
  if(kind==="oct")return [[-3.30,-4.57],[3.30,-4.57],[4.38,-3.48],[4.38,3.50],[3.27,4.59],[-3.25,4.59],[-4.38,3.52],[-4.38,-3.51]];
  if(kind==="long")return [[-3.85,-4.72],[3.85,-4.72],[3.85,4.72],[-3.85,4.72]];
  return [[-4.48,-4.58],[4.48,-4.58],[4.48,4.58],[-4.48,4.58]];
}

function inside(x,z,poly){
  let contained=false;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++){
    const a=poly[i],b=poly[j];
    if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])contained=!contained;
  }
  return contained;
}

function groundBanks(m,z,p,look){
  if(isRetailHall()||["canopy","cistern"].includes(look))return;
  if(GAME.brief==="sale"){
    for(const side of [-1,1]){
      const x=side*4.69;
      m.box(x,-.18,z,1.17,.38,8.99,p.tile2);
      m.box(x+side*.37,.54,z,.22,1.14,8.71,p.trim);
      for(const d of [-3.5,.01,3.52]){
        m.box(x+side*.33,1.07,z+d,.25,2.12,.31,p.ink);
        m.box(x+side*.32,1.77,z+d,.25,.08,.32,p.loot);
      }
    }
    return;
  }
  if(["archive","tomb","shrine","mine"].includes(look)){
    for(const side of [-1,1])m.box(side*4.75,-.34,z,1.09,.71,8.35,p.trim);
    return;
  }
  for(const side of [-1,1]){
    const x=side*4.84;
    for(const [d,f] of [[-2.96,.97],[.19,1.26],[2.87,1.07]]){
      m.oval(x,-.33,z+d,1.16*f,.58,1.79*f,p.tile2,side*.24,0,8);
      if(look==="aurora")m.gem(x+side*.38,.16,z+d,1.08,.89,1.33,p.trim,5,side*d*.12,0);
      if(look==="reef")coralBranch(m,x,-.12,z+d,1.36,side===1?0xdaaf92:0x8bc7b9);
    }
  }
}
function makeFloor(m,zone,random){
  const plans={weigh:"oct",hold:"long",audit:"kite",sort:"long",maze:"square",jam:"oct",connect:"kite",catch:"long",
    traffic:"long",offers:"round",swing:"kite",service:"oct",vision:"round",fold:"square",ties:"kite",depth:"organic",
    assembly:"round",shadow:"long",mix:"oct",winch:"long",rhythm:"round",field:"organic",glide:"kite",lattice:"round"};
  const geometry=zone===0?GAME.footprint:plans[GAME.tasks[zone-1].kind];
  const landscape=GAME.brief==="hunt"&&GAME.form!=="perch";
  const outline=footprint(landscape&&GAME.form!=="vault"?"organic":geometry);
  const poly=GAME.form==="lift"?outline.map(([x,z])=>[x,z*.86]):outline;
  const z=-11*zone,p=GAME.palette,look=GAME.scene;
  const low=Math.min(...GAME.spaces.map(v=>v[2]));
  const base=landscape?-.12:look==="canopy"?-.52:low-GAME.spaces[zone][2]-.95;
  const material=look==="reef"?8:landscape?9:0;
  if(!isRetailHall())slab(m,poly,z,p.tile,look==="canopy"?p.ink:p.tile2,base,material);
  if(landscape)landscapeSlope(m,poly,z,low-GAME.spaces[zone][2]-1.16,material);
  groundBanks(m,z,p,look);
  const tiled=!(look==="reef"||look==="dig"||look==="canopy"||look==="tomb"||look==="grove"||look==="freight");
  if(tiled){
    const thin=look==="archive"||look==="mine";
    const w=thin?.83:1.02,d=look==="runway"?1.35:.95;
    for(let i=-5;i<=5;i++)for(let j=-5;j<=5;j++){
      const x=i*w,z0=j*d;
      if(!inside(x,z0,poly))continue;
      if(![[-1,-1],[1,1],[-1,1],[1,-1]].every(([a,b])=>inside(x+a*w*.46,z0+b*d*.46,poly)))continue;
      m.box(x,.017,z+z0,w*.975,.022,d*.975,random()<.30?p.tile2:p.tile);
    }
  }
  if(look==="canopy"){
    for(let i=-8;i<=8;i++){
      const x=i*.48;
      m.box(x,.041,z,.459,.052,8.14-.58*Math.abs(i)/8,i%3===0?p.trim:p.tile);
      for(const s of [-1,1])m.box(x-.16,.073,z+s*3.78,.056,.019,.10,p.ink);
    }
  } else if(look==="freight"){
    for(const s of [-1,1])for(let i=0;i<11;i++)m.box(s*3.10,.031,z+(i-5)*.70,.18,.032,.35,i%2?p.accent:p.loot,0,1);
    m.box(0,.037,z,6.01,.035,3.58,p.tile2);
  } else if(look==="cistern"||look==="showroom"||look==="auction"){
    ring(m,0,.035,z,3.42,p.trim,.040,38);
    ring(m,0,.036,z,3.74,p.accent,.024,38);
  } else if(look==="runway"||look==="checkout"||look==="machine"){
    for(const t of [-1,1])m.box(t*3.74,.047,z,.064,.018,8.61,p.loot);
    if(look==="runway")for(let i=0;i<13;i++)m.box(0,.027,z+(i-6)*.65,.066,.020,.34,p.trim);
  } else if(look==="tomb"||look==="grove"||look==="dig"||look==="reef"){
    for(let i=0;i<28;i++){
      const x=(random()-.5)*8.2,d=(random()-.5)*8.8;
      if(!inside(x,d,poly))continue;
      m.oval(x,.02,z+d,.18+random()*.29,.014,.14+random()*.24,p.tile2,random(),0,6);
    }
  }
  for(let j=0;j<poly.length;j++){
    const a=poly[j],b=poly[(j+1)%poly.length];
    if(!isRetailHall()&&!landscape)m.tube([a[0],.047,z+a[1]],[b[0],.047,z+b[1]],.041,.041,p.trim,6);
  }
}

function beamBetween(m,a,b,halfWidth,depth,tint){
  const dx=b[0]-a[0],dz=b[2]-a[2],n=Math.hypot(dx,dz)||1;
  const x=dz/n*halfWidth,z=-dx/n*halfWidth;
  const a0=[a[0]-x,a[1],a[2]-z],a1=[a[0]+x,a[1],a[2]+z];
  const b0=[b[0]-x,b[1],b[2]-z],b1=[b[0]+x,b[1],b[2]+z];
  const under=v=>[v[0],v[1]-depth,v[2]];
  m.quad(a1,a0,b0,b1,tint);
  m.quad(b1,b0,a0,a1,tint);
  m.quad(a0,under(a0),under(b0),b0,tint);
  m.quad(b1,under(b1),under(a1),a1,tint);
}

function drawConnector(m,i){
  const p=GAME.palette,[a,b]=bridgeAxis(i),type=GAME.connector;
  const dx=b[0]-a[0],dz=b[2]-a[2],length=Math.hypot(dx,dz)||1,w=type==="carpet"?1.43:type==="water"?1.12:.99;
  const s=[dz/length,0,-dx/length];
  const pos=(t,l=0,h=0)=>[lerp(a[0],b[0],t)+s[0]*l,lerp(a[1],b[1],t)+h,lerp(a[2],b[2],t)+s[2]*l];
  const colors={carpet:p.tile2,belt:p.trim,loading:p.tile2,water:p.tile,stone:p.trim,vine:p.trim,ice:p.tile,rail:p.ink};
  if(type==="vine"||type==="stone"||type==="rail"){
    const count=Math.max(5,Math.ceil(length/.46));
    for(let j=0;j<count;j++)beamBetween(m,pos(j/count+.012),pos((j+1)/count-.010),w,.16,j%4===0?p.tile:colors[type]);
  }else beamBetween(m,a,b,w,.24,colors[type]);
  for(const side of [-1,1]){
    const edge=side*w;
    m.tube(pos(0,edge,.040),pos(1,edge,.040),.092,.092,p.ink,8);
    if(type==="rail"||type==="belt")m.tube(pos(0,edge*.63,.072),pos(1,edge*.63,.072),.060,.060,p.loot,8);
    if(["loading","vine","stone","ice"].includes(type)){
      const h=type==="vine"?.60:.36;
      m.tube(pos(.02,edge,h),pos(.98,edge,h),.045,.045,type==="vine"?p.trim:p.accent,8);
      for(const t of [.08,.44,.84])m.tube(pos(t,edge,.032),pos(t,edge,h),.052,.039,p.ink,8);
    }
    if(type==="water")for(const t of [.26,.57,.87])m.gem(...pos(t,edge,.17),.065,.26,.062,0xa0f3df,5,0,1);
  }
}

function doorway(m,z,color,tall=2.40,width=2.02){
  for(const side of [-1,1]){
    m.box(side*(width*.5+.13),tall*.50,z,.22,tall,.28,color);
    m.box(side*(width*.5+.13),.20,z,.41,.38,.46,ink());
  }
  m.box(0,tall+.11,z,width+.46,.22,.29,color);
  m.box(0,tall+.24,z,width+.55,.064,.34,bright());
}

function racks(m,z,high=.97,containers="parcel"){
  for(const side of [-1,1]){
    const x=side*3.74;
    for(const along of [-3.12,1.97]){
      m.box(x,.58,z+along,.67,1.15,1.72,ink());
      for(const y of [.29,.72,high]){
        m.box(x-side*.14,y,z+along,.88,.074,1.82,trim());
        for(const d of [-.55,.29])item(m,containers,x-side*.17,y+.054,z+along+d,.49,d<0?bright():GAME.palette.loot);
      }
    }
  }
}

function storeRoom(m,z,i){
  const p=GAME.palette,s=GAME.scene;
  if(s==="checkout"){
    for(const x of [-2.78,2.78]){
      m.box(x,.51,z-2.86,1.51,.94,.96,p.trim);
      m.box(x,1.02,z-2.85,1.66,.11,1.06,p.ink);
      item(m,"receipt",x,1.08,z-2.78,.56,p.loot);
      m.box(x-.51,.33,z-2.28,.14,.54,.089,p.accent);
    }
    doorway(m,z-4.24,p.ink,1.94,2.49);
    storeSign(m,z,p);
  } else if(s==="showroom"){
    for(const side of [-1,1]){
      const x=side*3.20;
      m.box(x,1.02,z-.68,.24,2.07,4.85,p.trim);
      m.box(x-side*.13,1.24,z-.95,.057,1.53,1.48,0xabc6ce,0,2);
      m.box(x-side*.13,1.43,z+1.52,.058,1.34,1.02,0xcdbcc8,0,2);
      m.box(x-side*.22,.058,z+.62,.46,.042,5.23,p.loot);
    }
    m.box(0,.051,z-1.16,1.31,.049,5.96,p.accent);
    doorway(m,z-4.12,p.trim,1.89,2.15);
    storeSign(m,z-.20,p);
  } else if(s==="freight"){
    racks(m,z,1.34);
    for(const x of [-3.34,3.34]){
      m.box(x,1.50,z-4.18,.35,2.99,.30,p.ink);
      m.box(x,2.60,z-.47,.26,.26,7.79,p.trim);
    }
    m.box(0,2.6,z-4.16,6.60,.25,.28,p.trim);
    for(let k=0;k<7;k++)m.box((k-3)*.40,.045,z+4.28,.20,.040,.19,k%2?p.ink:p.loot);
    storeSign(m,z,p);
  } else if(s==="machine"){
    for(const side of [-1,1]){
      const x=side*3.36;
      m.box(x,.66,z-2.89,1.03,1.25,1.14,p.ink);
      m.box(x,.97,z-2.30,.72,.28,.064,p.accent,0,1);
      m.tube([x,.35,z-2.23],[x,.35,z+1.40],.104,.104,p.trim,8);
      m.box(x,.71,z+1.42,.64,1.33,.63,p.trim);
      m.box(x,.79,z+1.76,.42,.45,.05,p.accent,0,1);
    }
    doorway(m,z-4.20,p.ink,1.75,2.51);
    storeSign(m,z,p);
  } else if(s==="runway"){
    for(const side of [-1,1]){
      const x=side*3.47;
      for(const dz of [-2.71,.39,3.13]){
        m.box(x,.66,z+dz,.61,1.29,.88,p.ink);
        for(const y of [.33,.81,1.36])m.box(x-side*.105,y,z+dz,.80,.080,1.01,p.trim);
        item(m,"bag",x,1.41,z+dz,.48,p.accent);
      }
      m.tube([x,.11,z-4.37],[x,2.03,z-4.37],.10,.10,p.trim,7);
    }
    m.box(0,2.08,z-4.35,7.03,.16,.23,p.ink);
    storeSign(m,z-.18,p);
  } else if(s==="auction"){
    for(const side of [-1,1]){
      const x=side*2.78;
      m.tube([x,.035,z-2.91],[x,1.48,z-2.91],.13,.105,p.ink,9);
      m.box(x,1.51,z-2.91,.75,.64,.16,p.trim);
      for(let n=0;n<3;n++)m.box(x+(n-1)*.17,1.54,z-2.81,.075,.23,.033,p.loot,0,1);
      lowSteps(m,x,z+1.02,p);
    }
    storeSign(m,z,p);
  } else if(s==="depot"){
    for(const side of [-1,1]){
      const x=side*3.31;
      m.box(x,.32,z-2.97,1.34,.61,1.09,p.ink);
      m.box(x,.74,z-2.97,1.43,.12,1.21,p.trim);
      item(m,"parcel",x,.85,z-2.98,.83,p.loot);
      m.box(x,.71,z+2.45,.85,1.35,.53,p.trim);
      m.box(x,.94,z+2.15,.56,.112,.044,p.loot);
    }
    m.box(0,.57,z-4.24,2.45,1.10,.20,p.ink);
    m.box(0,1.18,z-4.24,2.56,.085,.29,p.trim);
    storeSign(m,z,p);
  } else if(s==="terminal"){
    for(const side of [-1,1]){
      const x=side*3.41;
      for(const dz of [-2.99,-.51,1.96]){
        m.tube([x,.06,z+dz],[x,.65,z+dz],.071,.061,p.ink,9);
        m.oval(x,.68,z+dz,.105,.07,.105,p.trim,0,1,8);
      }
      m.tube([x,.57,z-2.99],[x,.57,z+1.96],.038,.038,p.accent,8);
      m.box(x,1.09,z-4.10,.69,1.80,.21,p.trim);
    }
    storeSign(m,z,p);
  } else if(s==="display"){
    for(const side of [-1,1]){
      const x=side*3.31,y=1.58;
      m.box(x,.72,z-3.19,.29,1.42,.30,p.ink);
      m.box(x,y,z-3.19,.54,.137,.62,p.accent);
      m.tube([x,y-.062,z-3.19],[x-side*.39,.21,z-.42],.051,.015,p.loot,6,1);
      m.box(x,.49,z+1.72,.30,.95,1.41,p.trim);
    }
    lowSteps(m,0,z-4.27,p);
    storeSign(m,z-.14,p);
  } else {
    for(const side of [-1,1]){
      const x=side*3.02;
      m.box(x,.78,z-2.96,.45,1.54,.42,p.ink);
      m.box(x,1.59,z-2.96,.75,.13,.71,p.trim);
      m.box(x,.89,z+1.57,.74,1.77,.16,p.trim);
      m.box(x,.89,z+1.68,.62,.38,.08,p.loot);
      item(m,"bag",x,.04,z+2.18,.79,p.accent);
    }
    for(let k=0;k<7;k++)m.box((k-3)*.46,2.04,z-4.11,.45,.11,1.31,k%2?p.loot:p.accent,0,0,.12);
    storeSign(m,z,p);
  }
}

function lowSteps(m,x,z,p){
  for(let j=0;j<3;j++)m.box(x,.05+j*.05,z-j*.21,1.60,.10+j*.10,.25,j%2?p.tile2:p.trim);
}

function huntRoom(m,z,i){
  const pal=GAME.palette,s=GAME.look;
  huntBackdrop(m,z,pal,s);
  if(s==="reef"){
    for(const side of [-1,1]){
      m.oval(side*3.88,-.10,z-2.06,.43,.52,1.18,pal.trim,side*.2,0,7);
      m.oval(side*4.22,-.31,z+.73,.67,.58,2.07,pal.tile2,side*.10,0,8);
      coralBranch(m,side*4.11,.20,z+.42,1.25,side<0?0xc28ca4:0xdaae87);
    }
  } else if(s==="dig"){
    for(const side of [-1,1]){
      m.oval(side*3.87,-.16,z-.94,.56,.59,2.13,pal.tile2,side*.20,0,7);
      m.oval(side*3.90,.18,z-3.42,.61,.38,1.14,pal.trim,side*.42,0,7);
    }
    m.box(0,.18,z-4.28,3.04,.34,.38,pal.tile2);
  } else if(s==="archive"){
    for(const d of [-3.81,2.99])doorway(m,z+d,pal.ink,2.02,2.68);
    for(const side of [-1,1]){
      m.box(side*3.80,1.40,z-.57,.25,2.70,7.17,pal.ink);
      for(const d of [-2.41,.29,2.49])m.box(side*3.65,1.65,z+d,.062,.38,.60,pal.trim,0,1);
    }
  } else if(s==="cistern"){
    for(const side of [-1,1]){
      m.box(side*3.84,.36,z,.42,.62,5.82,pal.ink);
      for(const d of [-2.40,2.42])m.box(side*3.79,.67,z+d,.49,.22,.58,pal.trim);
    }
    ring(m,0,.046,z,4.09,pal.loot,.043,30);
  } else if(s==="grove"){
    for(const side of [-1,1]){
      m.oval(side*4.08,-.11,z+.28,.55,.52,2.35,pal.trim,side*.09,0,8);
      item(m,"bell",side*3.64,.34,z-2.81,.80,pal.loot);
    }
  } else if(s==="shrine"){
    doorway(m,z-4.01,pal.ink,2.08,2.64);
    for(const side of [-1,1])m.box(side*3.82,.17,z-.86,.38,.27,5.78,pal.trim);
    lowSteps(m,0,z-4.31,pal);
  } else if(s==="aurora"){
    for(const side of [-1,1]){
      for(const d of [-2.72,-.18,2.50]){
        m.gem(side*4.10,.30,z+d,.53,1.58,.69,pal.trim,5,d*.3,0);
        m.gem(side*4.22,.41,z+d+.23,.36,1.17,.46,pal.tile2,4,d);
      }
    }
  } else if(s==="mine"){
    doorway(m,z-4.07,pal.trim,2.14,2.64);
    for(const side of [-1,1]){
      m.oval(side*4.07,.37,z,.54,.69,3.14,pal.ink,side*.104,0,7);
      m.tube([side*3.65,.13,z-3.50],[side*3.65,1.83,z-3.50],.108,.108,pal.trim,7);
      m.box(side*3.80,.102,z+3.53,.63,.17,.94,pal.ink);
    }
  } else if(s==="canopy"){
    for(const side of [-1,1]){
      m.tube([side*4.03,-5,z+.48],[side*4.04,1.32,z+.51],.53,.31,pal.ink,10);
      m.tube([side*4.04,.75,z+.51],[side*4.28,1.40,z-2.25],.25,.18,pal.trim,9);
      m.oval(side*4.42,1.64,z-2.63,.64,.23,.61,pal.tile2,side*.2,0,8);
    }
  } else {
    for(const side of [-1,1]){
      m.box(side*3.94,.64,z-.90,.32,1.24,5.48,pal.trim);
      for(const d of [-3.11,.68])m.box(side*3.76,1.02,z+d,.14,.25,.37,pal.loot);
    }
    doorway(m,z-4.12,pal.ink,2.10,2.47);
  }
}

function terrainField(m,random){
  if(isRetailHall())return;
  const s=GAME.scene,p=GAME.palette,low=Math.min(...GAME.spaces.map(o=>o[2]));
  const sale=GAME.brief==="sale";
  if(sale){
    m.box(0,low-.81,-12,58,.34,65,p.tile2);
    for(let i=0;i<13;i++){
      const side=i%2?1:-1,x=side*(10+random()*15),z=5-random()*38;
      m.box(x,-.10,z,1.62,.94,2.41,random()>.5?p.trim:p.tile);
      m.box(x,.49,z,1.83,.075,2.59,p.ink);
      if(i%3===0)m.box(x,.89,z-.53,1.16,.68,.53,p.accent);
    }
    m.box(0,1.25,-35,48,4.41,.47,p.tile2);
    return;
  }
  if(s!=="canopy"){
    const ground=s==="reef"?0x34616a:s==="mine"?0x514a40:p.trim;
    m.box(0,low-1.40,-16,126,.45,137,ground,0,s==="reef"?8:9);
  }
  for(let i=0;i<55;i++){
    const side=i%2===0?-1:1,z=9-random()*48,x=side*(7.2+random()*23),y=low-1.08+random()*.74;
    if(GAME.spaces.some(([sx,sz])=>Math.abs(sx-x)<5.3&&Math.abs(sz-z)<6.1))continue;
    const n=.62+random()*1.65;
    if(s==="reef"){
      m.oval(x,y,z,n*1.57,n*.62,n*.97,p.tile2,random(),0,8);
      if(i%3===0)coralBranch(m,x,y+.42,z,n*.83,p.accent);
    } else if(s==="aurora"||s==="mine"){
      m.gem(x,y+.40,z,n*.71,n*1.39,n*.64,i%4?p.tile2:p.accent,5,random(),0);
    } else if(s==="canopy"||s==="grove"){
      m.tube([x,y-3.4,z],[x,y+1.2,z],n*.21,n*.11,p.ink,8);
      m.oval(x,y+1.4,z,n,n*.57,n,i%2?p.trim:p.tile2,random(),0,8);
    } else {
      m.oval(x,y,z,n*1.63,n*.68,n*1.21,i%3?p.tile2:p.trim,random(),0,8);
    }
  }
}

"use strict";

const isRetailHall=()=>["counter","mall","aisle","hub","machine"].includes(GAME.form);

function roomExtents(){
  const xs=GAME.spaces.map(v=>v[0]),zs=GAME.spaces.map(v=>v[1]),ys=GAME.spaces.map(v=>v[2]);
  return [Math.min(...xs)-6,Math.max(...xs)+6,Math.min(...zs)-6,Math.max(...zs)+15,Math.min(...ys)];
}

function landscapeSlope(m,outline,z,base,material){
  const profile=outline.flatMap((a,i)=>{
    const b=outline[(i+1)%outline.length],cuts=Math.ceil(Math.hypot(a[0]-b[0],a[1]-b[1])/.94);
    return Array.from({length:cuts},(_,j)=>[lerp(a[0],b[0],j/cuts),lerp(a[1],b[1],j/cuts)]);
  });
  const reef=GAME.form==="dive",ice=GAME.form==="ice",stone=GAME.palette.tile2,trimColor=GAME.palette.trim;
  let inner=profile.map(([x,d])=>[x,-.105,z+d]);
  for(const [band,drop,spread] of [[0,.19,.52],[1,.43,1.55],[2,.72,2.86],[3,1,4.28]]){
    const outer=profile.map(([x,d],i)=>{
      const rough=.83+.27*Math.sin(i*1.81+band*.8)+.14*Math.cos(i*3.9);
      const len=Math.hypot(x,d);
      const reach=(spread+Math.max(0,-base-1.6)*drop*.54)*rough;
      const slopeZ=d+d/len*reach;
      return [x+x/len*reach,Math.min(-.13,base*drop+(band<3?.17*Math.sin(i*1.23+band):0)),
        z+(GAME.form==="lift"?clamp(slopeZ,-4.45,4.45):slopeZ)];
    });
    for(let i=0;i<inner.length;i++){
      const j=(i+1)%inner.length;
      const tint=reef?([0x608f88,0x518681,0x477b78,0x3c6f76][band]):
        ice?([0x8da7bf,0x738fad,0x91a7be,0x8fa2b6][band]):band%2===0?stone:trimColor;
      m.tri(inner[i],inner[j],outer[j],tint,ice?6:material);
      m.tri(inner[i],outer[j],outer[i],tint,ice?6:material);
    }
    inner=outer;
  }
}

function mainArchitecturalForm(m){
  const p=GAME.palette,style=GAME.form,[west,east,north,south,floor]=roomExtents();
  const x=(west+east)*.5,z=(north+south)*.5,w=east-west,d=south-north;
  if(isRetailHall()){
    m.box(x,floor-.202,z,w,.395,d,p.tile2);
    const aisle=style==="aisle",tile=aisle?2.45:2.07,wall=aisle?4.8:3.7;
    for(let px=west+.5;px<east-.5;px+=tile)for(let pz=north+.5;pz<south-.5;pz+=tile){
      const i=Math.round((px-west)/tile),j=Math.round((pz-north)/tile);
      m.box(px,.005,pz,tile*.974,.012,tile*.976,(i+j)%4===0?p.trim:p.tile,0,4);
    }
    for(const k of [west+.23,east-.23]){
      m.box(k,wall*.50,z,.24,wall,d-.45,p.ink);
      m.box(k,2.19,z,.21,.14,d-.25,p.accent);
      for(let cz=north+1.43;cz<south-1;cz+=3.73){
        m.box(k,.02+.83,cz,.47,1.65,2.83,p.trim);
        m.box(k,1.71,cz,.48,.16,2.84,p.loot);
        m.box(k,2.43,cz,.45,.10,2.70,0xffe0a7,0,1);
        m.box(k,wall-.69,cz,.29,.80,2.64,p.tile2,0,2);
      }
    }
    m.box(x,wall*.50,north+.20,w,wall,.32,p.trim);
    m.box(x,wall,north+.22,w,.17,.44,p.ink);
    if(style==="hub"){
      const point=GAME.spaces[1];
      ring(m,point[0],.030,point[1],7.26,p.accent,.102,48);
      ring(m,point[0],.034,point[1],7.43,p.loot,.040,48);
      for(let i=0;i<7;i++){
        const a=i/7*TAU;
        m.box(point[0]+Math.sin(a)*7.34,.08,point[1]+Math.cos(a)*7.34,.23,.07,.42,p.accent,a);
      }
    }
    return;
  }
  if(style==="loading"){
    m.box(x,floor-.62,z,w,.46,d,0x68747b,0,4);
    for(let a=west+1.12;a<east-1;a+=4.66){
      m.box(a,.020,south-1.19,.12,.031,1.98,0xf1bd78);
      m.box(a,.84,north+.52,.33,1.62,.48,p.ink);
      m.box(a,.40,north+.85,1.56,.77,.36,p.trim);
    }
    return;
  }
  if(style==="perch"){
    for(const [i,[px,pz,y]] of GAME.spaces.entries()){
      const vx=px+(i%2===0?4.03:-4.08),vz=pz+1.34;
      m.tube([vx,-9.5,vz],[vx,y+4.72,vz],.92,.40,p.ink,12,5);
      m.tube([vx,y+.46,vz],[px+1.85,y-.23,pz-3.44],.41,.23,p.trim,9,5);
      for(const q of [-1,1]){
        m.oval(vx+q*1.30,y+3.62,vz-1.75,2.32,1.10,2.46,q===1?p.trim:p.tile2,q*.27,0,10);
      }
    }
    return;
  }
  if(style==="dive"||style==="ice"||style==="scrub"||style==="grove"){
    for(const [i,[cx,cz,y,turn]] of GAME.spaces.entries()){
      const pad=new Mesh(),center=-11*i;
      const dirt=style==="dive"?0x477f83:style==="ice"?0xa6c0d9:style==="grove"?0x869a7d:0xb1835c;
      for(const side of [-1,1])pad.oval(side*5.19,-.63,center,2.24,.665,5.63,dirt,0,style==="ice"?6:9,12);
      for(const side of [-1,1]){
        const near=side*4.38;
        pad.oval(near,.11,center-2.89,1.02,.78,2.02,p.tile2,side*.27,0,8);
        pad.oval(near+side*.39,.29,center+.58,1.19,.94,2.32,p.trim,side*.16,style==="ice"?6:0,7);
        if(style==="scrub"){
          for(let l=0;l<3;l++)pad.box(near+side*.51,-.21+l*.25,center+.10,.76,.10,3.10,l%2?p.tile:p.trim,side*.22,0,l*.09);
        }else if(style==="grove"){
          pad.tube([near,.05,center-.85],[near,3.12,center-1.30],.36,.17,p.ink,10,5);
          pad.oval(near,3.19,center-1.38,1.15,.60,1.23,p.trim,0,0,9);
        }else if(style==="dive"){
          for(const d of [-1.90,1.90])coralBranch(pad,near,.18,center+d,1.39,side===1?0xd6a790:0x6dbdb4);
        }
      }
      insertZone(m,pad,i);
    }
    return;
  }
  if(style==="lift"){
    for(const [index] of GAME.spaces.entries()){
      const section=new Mesh(),local=-11*index;
      for(const side of [-1,1]){
        for(const [offset,rx,ry,rz] of [[-3.9,3.6,2.87,2.80],[-.9,2.66,1.76,3.54],[2.77,2.43,1.25,2.12]]){
          const x=side*(rx+3.81);
          section.oval(x,ry*.14,local+offset,rx,ry,rz,offset<-2?p.ink:p.tile2,side*.26,9,13);
        }
        for(const zOffset of [-3.83,-.83,2.44]){
          section.box(side*3.97,.91,local+zOffset,.23,1.87,.27,p.ink,0,5);
          section.tube([side*4.04,.15,local+zOffset+.58],[side*3.96,1.71,local+zOffset],.086,.073,p.trim,7,5);
        }
      }
      insertZone(m,section,index);
    }
    return;
  }
  for(const [px,pz,y] of GAME.spaces){
    const h=2.35;
    for(const s of [-1,1]){
      if(style==="basins"){
        m.oval(px+s*5.21,y-.69,pz,1.55,1.19,4.61,p.tile2,s*.20,0,9);
      }else{
        m.box(px+s*4.62,y+.61,pz-.60,.34,h,8.66,p.ink);
        m.box(px+s*4.39,y+.54,pz-2.31,.44,2.34,.59,p.trim);
        m.box(px+s*4.39,y+.54,pz+2.20,.44,2.34,.59,p.trim);
      }
    }
  }
}

function liftCabin(m,p,id,open){
  const clr=GAME.brief==="hunt"?GAME.palette.trim:0x728690;
  m.box(p[0],p[1]-.11,p[2],2.10,.23,1.68,trim(),0,4);
  for(const a of [-1,1]){
    m.box(p[0]+a*.99,p[1]+.42,p[2]-.75,.15,.85,.15,ink());
    m.box(p[0]+a*.99,p[1]+.42,p[2]+.75,.15,.85,.15,ink());
    m.box(p[0]+a*.98,p[1]+.78,p[2],.108,.103,1.62,clr);
    m.oval(p[0]+a*.97,p[1]+.87,p[2]+.68,.093,.09,.10,open?0x75ddb9:0xf4cd89,0,1,8);
  }
}

function stagePassage(m,i){
  const [a,b]=bridgeAxis(i),form=GAME.form,dir=unit(sub(b,a)),edge=unit([dir[2],0,-dir[0]]);
  if(isRetailHall()){
    beamBetween(m,a,b,1.31,.022,GAME.palette.accent);
    const len=Math.hypot(b[0]-a[0],b[2]-a[2]),yaw=Math.atan2(dir[0],dir[2]);
    for(let n=0;n<Math.max(3,Math.round(len));n++){
      const p=lerpPoint(a,b,(n+.44)/Math.max(3,Math.round(len)));
      m.box(p[0],p[1]+.028,p[2],.19,.02,.41,GAME.palette.loot,yaw,1);
    }
    return;
  }
  if(form==="lift"){
    for(const x of [-1.13,1.13]){
      const z=(a[2]+b[2])*.5,y0=Math.min(a[1],b[1])-.45,y1=Math.max(a[1],b[1])+.96;
      m.tube([a[0]+x,y0,z],[a[0]+x,y1,z],.112,.094,ink(),9,4);
      m.tube([a[0]+x+.26,y0,z],[a[0]+x+.26,y1,z],.036,.036,trim(),8);
    }
    return;
  }
  if(form==="dive"){
    for(let n=1;n<5;n++){
      const p=lerpPoint(a,b,n/5);
      for(const s of [-1,1]){
        const v=add(p,scale(edge,s*.90));
        m.oval(v[0],v[1]+.34,v[2],.121,.109,.121,0x94dacf,0,1,8);
        m.tube(v,[v[0],v[1]+.34,v[2]],.040,.040,trim(),6);
      }
    }
    return;
  }
  if(["scrub","ice","grove","vault","basins"].includes(form)){
    const n=form==="ice"?7:8;
    for(let j=0;j<n;j++){
      const p=lerpPoint(a,b,(j+.5)/n);
      m.oval(p[0],p[1]-.28,p[2],1.56,.306,.85,j%3===0?GAME.palette.tile2:flat(),Math.atan2(dir[0],dir[2]),form==="ice"?6:0,9);
    }
    return;
  }
  drawConnector(m,i);
}

function treasureLure(m,z,x=0,small=1){
  m.tube([x,.035,z],[x,.17,z],.69*small,.64*small,ink(),8,4);
  m.tube([x,.17,z],[x,.22,z],.63*small,.62*small,trim(),8);
  m.box(x,.40,z,1.02*small,.41*small,.72*small,0x956045);
  m.box(x,.64,z,1.08*small,.17*small,.76*small,0xd09a56);
  for(const s of [-1,1]){
    m.box(x+s*.34*small,.51,z+.39*small,.11*small,.45*small,.047,0xf0c977,0,4);
  }
  m.box(x,.49,z+.392*small,.22*small,.24*small,.054,0x564b44);
  m.gem(x,.55,z+.438*small,.047*small,.096*small,.036*small,0xffcf78,4,0,1);
}

"use strict";

const finaleDuration=()=>reduced?1.15:3.45;
const finaleEase=(t,a,b)=>curve((t-a)/(b-a));
const finaleColors=()=>[GAME.palette.accent,GAME.palette.trim,GAME.palette.loot];

function finaleChest(m,z,t,prize){
  const lift=finaleEase(t,.58,.83),gold=GAME.palette.loot;
  m.box(0,.26,z,1.52,.48,1.16,0x795044);
  m.box(0,.51+lift*.43,z-.31*lift,1.60,.155,1.22,gold,0,4,lift*1.26);
  for(const s of [-1,1])m.box(s*.50,.26,z+.576,.097,.44,.048,gold,0,4);
  m.gem(0,.42,z+.607,.085,.164,.031,gold,4,0,1);
  if(lift>.04){
    m.box(0,.52,z,1.12,.043,.80,0xffd897,0,1);
    item(m,prize,0,.52+lift*.71,z,1.08,gold,lift*.60);
  }
}

function chartPiece(m,x,y,z,color,stone,part,tilt=0,size=1){
  m.box(x,y,z,.875*size,.11*size,1.23*size,color,0,0,tilt);
  const points=[[-.52,-.39,.02,.29],[.29,.44,.11,-.16],[-.16,-.03,.24,.42]][part];
  for(let p=0;p<3;p++){
    const a=[x+(-.43+p*.29)*size,y+.064*size,z+points[p]*.68*size];
    const b=[x+(-.43+(p+1)*.29)*size,y+.064*size,z+points[p+1]*.68*size];
    m.tube(a,b,.022*size,.022*size,stone?0xf4cd92:0xa7f7da,6,1);
  }
}

function chartEnding(m,t,z,stone,prize){
  const colors=finaleColors();
  const chartZ=z+.50;
  m.box(0,.30,chartZ,3.14,.19,1.63,ink());
  for(let i=0;i<3;i++){
    const n=i-1,join=finaleEase(t,.06+i*.075,.50+i*.045);
    const x=n*(2.07-join*1.19),y=.43+(1-join)*(.43+.16*(1-Math.abs(n)));
    const partZ=chartZ+(1-join)*n*.52;
    chartPiece(m,x,y,partZ,stone?colors[(i+1)%3]:0x568c92,stone,i,(1-join)*n*.24);
    m.gem(x,y+.065,partZ-.31,.075,.18,.092,colors[i],4,0,1);
  }
  if(t>.57){
    const goal=finaleEase(t,.57,.82);
    ring(m,0,.475,chartZ+.24,.23+goal*.14,0xffde95,.038);
    m.tube([0,.50,chartZ+.24],[0,.58+goal*.34,z-1.00],.034,.021,0xffdc8a,8,1);
  }
  if(stone){
    const door=finaleEase(t,.57,.86);
    for(const s of [-1,1])m.box(s*(.45+door*.72),.53,z-1.13,.87,.82,.24,trim(),0,9);
    m.box(0,.12,z-1.39,2.35,.23,1.07,ink());
    if(door>.08)item(m,prize,0,.19+door*.70,z-1.52,1.53,colors[2],door*.50);
  }else finaleChest(m,z-1.16,t,prize);
}

function signalEnding(m,t,z,kind,pieces,prize){
  const lights=kind==="aurora"?[0x90e4c2,0xc299f4,0x84baff]:[0x85e3d5,0xa69ee9,0xffd997];
  for(let i=0;i<3;i++){
    const x=(i-1)*1.25,pz=z+.72+Math.abs(i-1)*.23;
    const rise=finaleEase(t,i*.10,.34+i*.10),beam=finaleEase(t,.30+i*.10,.51+i*.10);
    pedestal(m,x,pz,.80,trim());
    item(m,pieces[i],x,.28+rise*.39,pz,kind==="chord"?.96:1.04,lights[i],rise*.7);
    if(beam<.05)continue;
    if(kind==="chord"){
      for(let k=0;k<3;k++)ring(m,x,.24+k*.09,pz,.34+beam*.52+k*.15,lights[i],.021);
    }else{
      const to=[0,.82,z-.77],from=[x,.83,pz];
      m.tube(from,lerpPoint(from,to,beam),.035,.022,lights[i],8,1);
      if(kind==="aurora")m.tube([x,.94,pz],lerpPoint([x,.94,pz],[0,1.50,z-.77],beam),.018,.012,lights[i],8,1);
    }
  }
  if(kind==="chord")finaleChest(m,z-1.03,t,prize);
  else{
    const arrive=finaleEase(t,.58,.84);
    pedestal(m,0,z-.96,1.58,trim());
    if(arrive>.02){
      item(m,prize,0,.37+arrive*.68,z-.96,1.55,lights[2],arrive*.90);
      for(let j=0;j<2;j++)ring(m,0,.33+j*.21,z-.96,.42+arrive*.47,lights[j],.027);
    }
  }
}

function machineEnding(m,t,z,kind,pieces,prize){
  const colors=finaleColors(),raise=finaleEase(t,.56,.86);
  for(let i=0;i<3;i++){
    const pull=finaleEase(t,.05+i*.08,.38+i*.08),x=(i-1)*(1.46-.45*pull);
    const dz=z+.88+(1-pull)*.60;
    pedestal(m,x,dz,.72,trim());
    item(m,pieces[i],x,.27,dz,.86,colors[i],(i%2===0?1:-1)*t*(kind==="gears"?8:2));
    if(pull>.51)m.tube([x,.25,dz-.15],[0,.28,z-.89],.025,.023,colors[2],7,1);
  }
  if(kind==="raft"){
    m.box(0,.09,z-.24,3.23,.12,3.76,0x448fa0,0,7);
    const shore=z-1.66+raise*1.95;
    m.box(0,.23,shore,1.63,.20,1.21,trim(),0,5);
    finaleChest(m,shore,t,prize);
    for(const s of [-1,1])m.tube([s*.78,.23,shore-.16],[s*1.38,.46,z+1.14],.021,.021,0xe9dba7,7);
  }else if(kind==="roll"){
    for(let i=0;i<6;i++)m.box(0,.23+i*.12,z+1.35-i*.43,1.80,.12,.46,trim(),0,9);
    const travel=finaleEase(t,.36,.65);
    item(m,"orb",0,.34+travel*.52,z+1.33-travel*2.53,.91,colors[2],t*6);
    for(const s of [-1,1])m.box(s*.86,.59+raise*.85,z-1.16,.29,1.07,.37,ink(),0,9);
    finaleChest(m,z-1.20,t,prize);
  }else{
    const height=.16+raise*1.02;
    for(const s of [-1,1])m.tube([s*.89,.1,z-.87],[s*.89,2.07,z-.87],.053,.053,colors[1],8,kind==="gears"?5:4);
    m.box(0,2.08,z-.86,1.87,.13,.21,trim(),0,5);
    m.box(0,height,z-.85,1.65,.16,1.00,ink(),0,4);
    m.tube([0,height+.13,z-.86],[0,2.04,z-.86],.027,.027,colors[2],7);
    if(raise>.04)item(m,prize,0,.21+height,z-.86,1.34,colors[2],raise*.65);
  }
}

function endingCart(m,x,y,z,color,van=false){
  const w=van?1.77:1.47,h=van?.65:.29,d=van?1.52:1.06;
  m.box(x,y+.27,z,w,.15,d,ink(),0,4);
  for(const side of [-1,1]){
    m.box(x+side*(w*.5-.058),y+.36+h*.50,z,.11,h,d,color,0,van?4:0);
    for(const dZ of [-.38,.38])m.tube([x+side*(w*.5-.08),y+.14,z+dZ],[x+side*(w*.5+.06),y+.14,z+dZ],.135,.135,ink(),10);
  }
  m.box(x,y+.36+h*.50,z-d*.49,w,h,.10,color);
  if(van){
    m.box(x,y+.98,z,w,.15,d,color,0,4);
    m.box(x,y+.55,z-d*.67,w*.89,.55,.42,color,0,4);
  }else m.tube([x-w*.55,y+.61,z+d*.62],[x+w*.55,y+.61,z+d*.62],.039,.039,trim(),8,4);
}

function saleEnding(m,t,z,kind,pieces,prize){
  const colors=finaleColors(),join=finaleEase(t,.56,.88);
  if(["cart","race","truck"].includes(kind)){
    const phase=finaleEase(t,.60,.97),cartZ=z+.59-2.19*phase;
    m.box(0,.047,z,3.75,.087,4.42,trim());
    for(const s of [-1,1])m.box(s*1.40,.103,z,.068,.016,4.22,colors[2],0,1);
    if(kind==="race"||kind==="truck"){
      m.box(0,1.82,z-1.76,3.47,.19,.35,ink());
      for(const s of [-1,1])m.box(s*1.66,.89,z-1.76,.25,1.83,.28,ink());
      for(let i=0;i<3;i++)m.oval((i-1)*.60,1.85,z-1.543,.104,.096,.075,
        t>=.30+i*.16?0x86f3b5:0xf4c47b,0,1,8);
    }
    endingCart(m,0,0,cartZ,colors[0],kind==="truck");
    pieces.forEach((piece,i)=>{
      const travel=finaleEase(t,.08+i*.09,.50+i*.048);
      item(m,piece,(i-1)*(1.41-travel*.99),.21+travel*.16,
        lerp(z+.99+(i%2)*.51,cartZ,travel),.76,colors[i]);
    });
    return;
  }
  if(kind==="lanes"){
    for(let i=0;i<3;i++){
      const x=(i-1)*1.24,pass=finaleEase(t,.10+i*.14,.55+i*.14);
      item(m,"register",x,.04,z-.32,.80,colors[i]);
      const ready=pass>.52;
      m.oval(x,.95,z-.29,.11,.07,.11,ready?0x8bf0b7:0xf3c180,0,1,8);
      item(m,"person",x,.03,z+1.54-pass*2.89,.96,colors[i]);
      if(ready)item(m,"bag",x+.26,.09,z+1.52-pass*2.92,.52,colors[2]);
    }
    return;
  }
  const show=kind==="display",wrap=kind==="wrap",belt=kind==="belt"||kind==="strip";
  m.box(0,.20,z,3.68,.34,2.73,show?0x586e78:ink());
  m.box(0,.395,z,3.75,.062,2.77,trim(),0,belt?4:5);
  if(belt)for(let i=0;i<9;i++)m.box((i-4)*.352,.43,z, .260,.032,1.69,colors[i%3],0,4);
  pieces.forEach((piece,i)=>{
    const slide=finaleEase(t,.06+i*.085,.52+i*.08),x0=(i-1)*1.61;
    const x=lerp(x0,(i-1)*(show?1.02:wrap?.31:.70),slide);
    const pZ=lerp(z+.80,z+(show?.07:-.14),slide);
    if(wrap&&t>.66)return;
    if(show)pedestal(m,x,pZ,.82,colors[i]);
    item(m,piece,x,.46+(show?.20:0),pZ,show?1.21:.86,colors[i],slide*.19);
  });
  if(kind==="stamp"||kind==="price"){
    m.box(0,1.71-join*.83,z-.23,.27,.68,.28,ink());
    m.box(0,1.37-join*.70,z-.23,.74,.15,.78,join>.72?0x8feab0:colors[0],0,1);
    if(join>.72)ring(m,0,.52,z-.26,.60,0x9ff4bb,.042);
  }
  if(wrap&&t>.43){
    const sheet=finaleEase(t,.43,.72),rise=finaleEase(t,.64,.92);
    if(sheet<1){
      for(const s of [-1,1]){
        m.box(s*(.91-sheet*.27),.50+sheet*.35,z,.82,.045,.78,colors[2],Math.PI*.50,0,s*sheet*1.45);
        m.box(0,.50+sheet*.37,z+s*(.84-sheet*.27),1.54,.038,.67,colors[2],0,0,s*sheet*1.45);
      }
    }
    if(rise>.03)item(m,prize,0,.44+rise*.21,z,1.43*(.51+.49*rise),colors[2],rise*.42);
  }
  if(kind==="belt"||kind==="strip"){
    m.box(0,.89,z-.76,1.39,.79,.28,ink(),0,4);
    m.box(0,1.34,z-.72,1.51,.07,.33,join>.72?0x98f2ba:colors[2],0,1);
    if(join>.33)item(m,prize,0,.47,z-.83+join*.36,1.18,colors[2]);
  }
  if(show&&join>.06){
    for(let i=0;i<3;i++)m.tube([(i-1)*1.08,1.91,z-.57],[(i-1)*1.00,.98,z+.14],.041,.014,
      [0xf0be82,0xf6d499,0xffdc9e][i],7,1);
  }
}

function finaleScene(m,t){
  const {kind,pieces,prize}=GAME.ending,z=localZ(-.34);
  const join=finaleEase(t,.46,.88);
  if(kind==="chart"||kind==="stone")chartEnding(m,t,z,kind==="stone",prize);
  else if(kind==="fossil"){
    m.box(0,.20,z,3.55,.33,2.30,ink(),0,9);
    for(let i=0;i<3;i++){
      const fit=finaleEase(t,.08+i*.08,.50+i*.07);
      item(m,pieces[i],(i-1)*(1.43-fit*.85),.45,z+.51-fit*.44,.97,GAME.palette.loot,fit*.85);
    }
    if(join>.01){
      m.gem(0,.83+join*.24,z-.42,.57,.96,.38,0xffb544,7,join*.47,2);
      item(m,prize,0,.64,z+.04,1.23,0xffda8c,join*.68);
    }
  }
  else if(["prisms","aurora","chord"].includes(kind))signalEnding(m,t,z,kind,pieces,prize);
  else if(["raft","roll","lift","gears"].includes(kind))machineEnding(m,t,z,kind,pieces,prize);
  else saleEnding(m,t,z,kind,pieces,prize);
  if(t>.72){
    for(let i=0;i<3;i++)ring(m,0,.081+i*.015,z,.50+i*.34+join*.40,GAME.palette.loot,.016,24);
  }
}

"use strict";

const ui=Object.fromEntries(["game","playfield","theme","place","count","challenges","guide","guide-icon","mission","goal","metric","attempt","reset","sound","targets","tools","toast","reveal","award",
  "award-count","finish","finish-count","finish-title","finish-summary","result-items","replay","retry","failure","target-guides"].map(key=>[key,document.getElementById(key)]));
const guideCanvas=ui["target-guides"],leaders=guideCanvas.getContext?.("2d");
const stageZ=index=>-11*index;
const player={x:0,y:.03,z:3.55,heading:0,lift:0};
let [homeYaw,homePitch,homeZoom,homeZ,homeFov]=GAME.views[0];
const view={yaw:homeYaw,targetYaw:homeYaw,pitch:homePitch,targetPitch:homePitch,center:[0,1.1,homeZ],vp:null,eye:null,aim:null,fov:homeFov};
const targets=new Map();
const toolButtons=new Map();
const paths=["Cross the walkway","Cross the bridge","Enter the next bay"];
const figures=[];
let stage=0, rounds=-1, awards=[], elapsed=0, prior=0, route=null, crossing=false, end=false, reward=null, justArrived=null;
let gfx=null, raf=0, toastUntil=0, pointer=null, zoomTarget=homeZoom, zoom=homeZoom, audio=null, muted=false;
let sunburst=[], pressKeys=new Set();
let showReady=false;
let finale=null;
const challenges=GAME.chapters.map(room=>room.length);
let challenge=0,changeAt=null,earnedName=null;
const currentChapter=()=>GAME.chapters[stage][challenge];
const mistakeLimit=3;
const timedTasks=new Set(["catch","hold","rhythm","service","swing","traffic"]);
const longTasks=new Set(["assembly","glide","jam","lattice","maze","shadow","weigh"]);
let mistakes=0, secondsLeft=0, attemptStarted=false, failed=false;
const curve=x=>{const t=clamp(x,0,1);return t*t*(3-2*t);};
const localZ=z=>stageZ(stage)+z;
const busy=()=>Boolean(route?.action||crossing||reward||finale||end||failed||justArrived!==null||changeAt!==null);
const toWorld=(point,index=stage)=>[point[0],point[1]??0,stageZ(index)+(point[2]??0)];
const clock=()=>elapsed;

const toneGood=[392,523,659],toneBad=[235,176],toneClick=[330,494];
function tone(notes=toneClick,delay=.070,volume=.11) {
  if(!audio||muted)return;
  for(const [i,n] of notes.entries()){
    const t=audio.currentTime+i*delay,o=audio.createOscillator(),g=audio.createGain();
    o.type="triangle";
    o.frequency.setValueAtTime(n,t);
    g.gain.setValueAtTime(.0001,t);
    g.gain.exponentialRampToValueAtTime(volume/(1+.14*i),t+.013);
    g.gain.exponentialRampToValueAtTime(.0001,t+.28);
    o.connect(g).connect(audio.destination);
    o.start(t);
    o.stop(t+.29);
  }
}
function wakeAudio() {
  if(muted)return;
  try {
    audio ||= new (window.AudioContext||window.webkitAudioContext)();
    if(audio.state==="suspended")audio.resume().catch(()=>{});
  } catch { /* Visual feedback stays available. */ }
}

function setText(element,value) {
  if(element.textContent!==value)element.textContent=value;
}

function message(text,seconds=1.75) {
  setText(ui.toast,text);
  ui.toast.hidden=false;
  toastUntil=elapsed+seconds;
}
function clearMessage() {
  ui.toast.hidden=true;
  toastUntil=0;
}
function feedback(ok,text,seconds) {
  tone(ok?toneGood:toneBad);
  if(text&&!failed)message(text,seconds);
}
function attemptStatus() {
  const seconds=Math.ceil(secondsLeft), minutes=Math.floor(seconds/60);
  const time=minutes+":"+String(seconds%60).padStart(2,"0"),tries=mistakeLimit-mistakes;
  setText(ui.attempt,failed?"Room failed":
    tries+(tries===1?" try · ":" tries · ")+time);
  ui.attempt.dataset.visual=failed?"×":"♥".repeat(tries)+"♡".repeat(mistakes)+"  "+time;
  ui.attempt.ariaLabel=ui.attempt.textContent;
  ui.attempt.dataset.low=String(failed||mistakes>=mistakeLimit-1||seconds<=12);
  ui.attempt.hidden=Boolean(awards[stage]||reward||crossing||end);
}
function startAttempt() {
  if(!failed&&!awards[stage])attemptStarted=true;
}
function failRoom(reason) {
  if(failed||reward||awards[stage]||changeAt!==null)return;
  failed=true;
  route=null;
  pointer=null;
  pressKeys.clear();
  ui.game.dataset.failed="true";
  ui.retry.hidden=false;
  ui.metric.hidden=true;
  clearMessage();
  setText(ui.goal,reason);
  setText(ui.mission,reason.startsWith("Time")?"Time up":"Try again");
  hideTools();
  for(const {b} of targets.values())b.hidden=true;
  attemptStatus();
  tone([294,220,147],.11,.13);
  ui.retry.focus?.({preventScroll:true});
}
function mistake(text) {
  if(failed||reward||awards[stage]||changeAt!==null)return;
  startAttempt();
  mistakes++;
  if(mistakes>=mistakeLimit){
    failRoom("Too many mistakes · try again");
    message(text,5);
    return;
  }
  feedback(false,text);
  attemptStatus();
}
function objective(text) {
  if(failed)return;
  setText(ui.goal,text);
  const short=currentChapter().guide[1];
  setText(ui.mission,text.length<=43&&text.split(/\s+/).length<=8?text:short);
}
function meter(text) {
  if(failed)return;
  ui.metric.hidden=!text;
  if(!text)return;
  setText(ui.metric,text);
  const match=text.match(/^(\d+)\/(\d+) (?:scanned|caught|packed|barcodes|deals|sections connected|notches aligned|shadows aligned)(?:\b|$)/);
  const flash=text.match(/^(\d+) deals · remember the order$/);
  const total=match?Number(match[2]):flash?Number(flash[1]):0;
  const n=match?Number(match[1]):0;
  const direction=text.match(/next (left|middle|right)$/);
  const canDisplay=total>0&&total<=8&&n<=total;
  ui.metric.dataset.dots=canDisplay?("●".repeat(n)+"○".repeat(total-n)+(direction?"  "+{left:"←",middle:"↑",right:"→"}[direction[1]]:"")):"";
  ui.metric.ariaLabel=text;
}

function pulse(point,tint,quantity=13) {
  const [x,y,z]=toWorld(point), n=reduced?Math.min(quantity,8):quantity;
  for(let i=0;i<n;i++){
    const a=Math.random()*TAU,v=.55+Math.random()*1.50;
    sunburst.push({x,y,z,vx:Math.cos(a)*v,vz:Math.sin(a)*v,vy:.48+Math.random()*1.55,
      at:elapsed+Math.random()*.11,life:.55+Math.random()*.6,tint,stage});
  }
}

function marker(key,label,point,act,options={}) {
  let entry=targets.get(key);
  if(!entry){
    const b=document.createElement("button");
    b.type="button";
    b.dataset.action=key;
    b.addEventListener("pointerdown",event=>{
      if(event.button===0&&!b.disabled)b.setPointerCapture?.(event.pointerId);
    });
    b.addEventListener("click",()=>{
      if(busy()||entry.disabled)return;
      wakeAudio();
      startAttempt();
      entry.act();
    });
    ui.targets.append(b);
    entry={b};
    targets.set(key,entry);
  }
  entry.point=point;
  entry.act=act;
  entry.disabled=Boolean(options.disabled);
  entry.b.disabled=entry.disabled||busy();
  setText(entry.b,label);
  entry.b.className="target"+(options.kind?" "+options.kind:"");
  entry.b.dataset.caption=options.caption??(options.kind==="path"?"Enter ↗":label.replace(/^Pick /,""));
  entry.b.dataset.tile=String(Boolean(options.tile));
  entry.b.ariaLabel=options.aria||label;
  entry.b.hidden=failed||Boolean(options.hidden);
  return entry.b;
}
function off(key) {
  targets.get(key)?.b.setAttribute("hidden","");
}
function tool(key,label,act,disabled=false) {
  if(failed)return;
  let item=toolButtons.get(key);
  if(!item){
    const b=document.createElement("button");
    b.type="button";
    b.className="tool";
    b.dataset.action=key;
    b.addEventListener("click",()=>{
      if(busy()||item.disabled)return;
      wakeAudio();
      startAttempt();
      item.act();
    });
    item={b};
    ui.tools.append(b);
    toolButtons.set(key,item);
  }
  setText(item.b,label);
  item.b.dataset.ready=String(/\bnow$/i.test(label));
  const arrows={dir0:"←",dir1:"→",dir2:"↑",dir3:"↓",left:"‹",right:"›",rise:"↑",dive:"↓"};
  const glyph=arrows[key];
  if(glyph){
    item.b.dataset.glyph=glyph;
    item.b.ariaLabel=label;
    item.b.title=label;
  }
  item.act=act;
  item.disabled=disabled;
  item.b.disabled=disabled||busy();
  item.b.hidden=false;
  ui.tools.hidden=false;
  return item.b;
}
function hideTools() {
  for(const {b} of toolButtons.values())b.hidden=true;
  ui.tools.hidden=true;
}

function syncEnabled(){
  const locked=busy();
  for(const entry of targets.values())entry.b.disabled=entry.disabled||locked;
  for(const entry of toolButtons.values())entry.b.disabled=entry.disabled||locked;
}

function flyTo(x,z,arrived,options={}) {
  if(busy())return false;
  const point={x:clamp(x,-3.92,3.92),z:localZ(clamp(z,-4.25,4.24))};
  route={points:[point],arrived,action:Boolean(arrived),speed:options.speed||6.4};
  syncEnabled();
  return true;
}

function receive(pos,name) {
  if(end||failed||reward||awards[stage]||changeAt!==null)return;
  if(name&&!earnedName)earnedName=name;
  if(challenge+1<challenges[stage]){
    changeAt=elapsed+(reduced?.12:.53);
    workProgress();
    hideTools();
    for(const {b} of targets.values())b.hidden=true;
    attemptStarted=false;
    clearMessage();
    meter("");
    objective("Challenge cleared");
    pulse(pos,GAME.palette.loot,21);
    tone([370,523,659],.085,.12);
    return;
  }
  const kind=GAME.ending.kind;
  const type=GAME.brief==="sale"?"receipt":
    kind==="chart"||kind==="stone"?kind:GAME.ending.pieces[stage];
  reward={stage,pos,at:elapsed,item:earnedName||GAME.awards[stage],type,fired:false};
  attemptStatus();
  objective(GAME.brief==="hunt"?"Treasure found":"Checkout complete");
  meter("");
  clearMessage();
  hideTools();
  for(const {b} of targets.values())b.hidden=true;
  tone([294,392,523],.091,.105);
}
function workProgress() {
  setText(ui.count,awards.filter(Boolean).length+"/3");
  const done=challenge+(changeAt!==null||awards[stage]?1:0),total=challenges[stage];
  setText(ui.challenges,"●".repeat(done)+"○".repeat(total-done));
  ui.challenges.ariaLabel=done+" of "+total+" challenges complete";
}
function tickChallenge(){
  if(changeAt===null||elapsed<changeAt)return;
  changeAt=null;
  challenge++;
  openZone(true);
}
function tickReward() {
  if(!reward)return;
  const age=elapsed-reward.at;
  if(age>(reduced?.09:.38)&&!reward.fired){
    reward.fired=true;
    awards[stage]=reward.item;
    workProgress();
    setText(ui.award,reward.item);
    setText(ui["award-count"],(stage+1)+"/3 "+(GAME.brief==="hunt"?"recovered":"complete"));
    ui.reveal.hidden=false;
    pulse(reward.pos,GAME.palette.accent,47);
    pulse(reward.pos,0xffe3a4,37);
    tone([349,523,659,784,1047],.078,.137);
  }
  if(age>(reduced?.57:1.98)){
    figures[stage]={...reward};
    reward=null;
    ui.reveal.hidden=true;
    if(stage===2){beginFinale();return;}
    objective(GAME.brief==="hunt"?"Follow the open passage":"Follow the open aisle");
    marker("bridge",GAME.passages?.[stage]||paths[stage],[0,.58,-4.18],walkBridge,{kind:"path"});
  }
}
function walkBridge() {
  if(busy()||!awards[stage]||stage===2)return;
  crossing=true;
  tone([330,440,587],.085,.088);
  objective("Moving into "+GAME.zones[stage+1]);
  const current=stage;
  route={points:[{x:0,z:stageZ(current)-4.22},{x:0,z:stageZ(current+1)+3.66}],
    speed:8.0,action:true,arrived:()=>{
      stage=current+1;
      challenge=0;
      earnedName=null;
      crossing=false;
      justArrived=elapsed+.30;
      openZone();
    }};
  syncEnabled();
}
function finish() {
  end=true;
  objective(GAME.ending.title);
  setText(ui["finish-count"],GAME.brief==="hunt"?"3/3 treasures recovered":"3/3 shopping stops complete");
  setText(ui["finish-title"],GAME.ending.title);
  setText(ui["finish-summary"],GAME.ending.summary);
  ui["result-items"].replaceChildren(...awards.map(label=>{const li=document.createElement("li"); li.textContent=label;return li;}));
  ui.finish.showModal();
}
function beginFinale(){
  finale={at:elapsed,charged:false};
  setGuideOpen(false);
  setText(ui["guide-icon"],GAME.brief==="hunt"?"◆":"✓");
  objective(GAME.brief==="hunt"?"Discover the final treasure":"Complete the sale");
  tone(GAME.brief==="hunt"?[220,330,440,554]:[330,440,554,662],.13,.127);
}
function tickFinale(){
  if(!finale||end)return;
  const progress=(elapsed-finale.at)/finaleDuration();
  if(progress>.68&&!finale.charged){
    finale.charged=true;
    objective(GAME.ending.title);
    const gold=GAME.palette.loot;
    pulse([0,.48,-1.08],gold,40);
    pulse([0,.58,-.32],0xffefbc,32);
    tone(GAME.brief==="hunt"?[392,523,659,784,1047]:[523,659,784,1047],.10,.13);
  }
  if(progress>=1)finish();
}
function openZone(keepTries=false) {
  [homeYaw,homePitch,homeZoom,homeZ,homeFov]=GAME.views[stage];
  const kind=currentChapter().kind;
  secondsLeft=timedTasks.has(kind)?58:longTasks.has(kind)?105:stage===0?88:78;
  if(!keepTries)mistakes=0;
  attemptStarted=false;
  failed=false;
  ui.game.dataset.failed="false";
  setText(ui["guide-icon"],currentChapter().guide[0]);
  setGuideOpen(false);
  ui.retry.hidden=true;
  attemptStatus();
  player.lift=0;
  view.targetYaw=homeYaw;
  view.targetPitch=homePitch;
  zoomTarget=homeZoom;
  setText(ui.place,GAME.zones[stage]);
  workProgress();
  ui.targets.replaceChildren();
  ui.tools.replaceChildren();
  targets.clear();
  toolButtons.clear();
  hideTools();
  ui.tools.dataset.pad=kind==="maze"||(kind==="signature"&&GAME.scene==="shrine")?"four":
    ["catch","depth","vision"].includes(kind)?"pair":"";
  ui.tools.ariaLabel=kind==="depth"?"Adjust depth":
    kind==="catch"?"Steer basket":kind==="vision"?"Rotate shelf":
    ui.tools.dataset.pad==="four"?"Directions":"Controls";
  clearMessage();
  meter("");
  mode.start(stage,rounds,challenge);
}

const ctx={
  marker,off,tool,hideTools,flyTo,receive,meter,objective,feedback,mistake,pulse,tone,message,
  ring,item,pedestal,clock,toWorld,busy,
  localZ,z:()=>stageZ(stage), zone:()=>stage, player,
  setZoom:value=>{zoomTarget=value;},
  viewInfo:()=>({yaw:view.yaw,pitch:view.pitch}),
  setView:(yaw,pitch=view.targetPitch)=>{view.targetYaw=yaw;view.targetPitch=pitch;},
  hasAward:()=>Boolean(awards[stage])
};
const mode=makeChallenge(ctx);

function retryRoom() {
  if(!failed)return;
  wakeAudio();
  Object.assign(player,{x:0,z:localZ(3.55),heading:0,lift:0});
  sunburst=sunburst.filter(event=>event.stage!==stage);
  openZone();
}

function restart() {
  rounds++;
  if(ui.finish.open)ui.finish.close();
  [homeYaw,homePitch,homeZoom,homeZ,homeFov]=GAME.views[0];
  stage=0;challenge=0;changeAt=null;earnedName=null;awards=[];figures.length=0;end=false;crossing=false;reward=null;finale=null;route=null;justArrived=null;
  sunburst=[];pressKeys.clear();pointer=null;showReady=false;
  view.yaw=view.targetYaw=homeYaw;
  view.pitch=view.targetPitch=homePitch;
  view.fov=homeFov;
  view.center=placed([0,1.10,homeZ],0);
  zoom=zoomTarget=homeZoom;
  Object.assign(player,{x:0,z:3.55,heading:0,lift:0});
  ui.reveal.hidden=true;
  workProgress();
  openZone();
}

function movePlayer(dt) {
  let dx=0,dz=0;
  if(route){
    const q=route.points[0],x=q.x-player.x,z=q.z-player.z,left=Math.hypot(x,z);
    if(left<.048){
      player.x=q.x;
      player.z=q.z;
      route.points.shift();
      if(!route.points.length){const done=route.arrived;route=null;done?.();syncEnabled();}
      return;
    }
    const inShaft=crossing&&GAME.form==="lift"&&player.z<stageZ(stage)-4.49&&player.z>stageZ(stage+1)+4.49;
    const pace=inShaft?1.24:route.speed;
    const scale=Math.min(left,dt*pace)/left;
    dx=x*scale;
    dz=z*scale;
  } else if(!busy()&&!awards[stage]&&!mode.lockMove){
    dx=(Number(pressKeys.has("d")||pressKeys.has("arrowright"))-Number(pressKeys.has("a")||pressKeys.has("arrowleft")))*dt*4.7;
    dz=(Number(pressKeys.has("s")||pressKeys.has("arrowdown"))-Number(pressKeys.has("w")||pressKeys.has("arrowup")))*dt*4.7;
  }
  player.x=clamp(player.x+dx,-3.92,3.92);
  player.z+=dz;
  if(!crossing)player.z=clamp(player.z,localZ(-4.29),localZ(4.26));
  if(dx||dz){
    const delta=Math.atan2(dx,dz)-player.heading;
    player.heading+=Math.atan2(Math.sin(delta),Math.cos(delta))*Math.min(1,dt*12);
  }
}

function bridgeTravel(){
  const entry=stageZ(stage)-4.49,exit=stageZ(stage+1)+4.49;
  return clamp((entry-player.z)/(entry-exit),0,1);
}

function camera(dt) {
  const width=ui.playfield.clientWidth||canvas.clientWidth;
  const height=Math.max(1,ui.playfield.clientHeight||canvas.clientHeight),aspect=width/height;
  const age=reward?elapsed-reward.at:0;
  const focus=finale?.78*curve((elapsed-finale.at)/.76):reward?.32*curve(age/.44)*(1-curve((age-1.47)/.51)):0;
  const center=finale?placed([0,.30,localZ(-.39)],stage):
    reward?placed(toWorld(reward.pos),stage):placed([0,.65,localZ(-.38)],stage);
  const tray=GAME.controls[stage]==="tray";
  const screenAspect=width/(ui.game.clientHeight||height);
  const portrait=clamp((.84-screenAspect)/.42,0,1);
  const aimHeight=(tray?.87:1.13)-portrait*(tray?.27:.35);
  const cartView=GAME.form==="aisle"&&stage===0&&!crossing;
  const nearZ=homeZ+(cartView?.57*portrait:0);
  let aim=placed([cartView?player.x*.26*portrait:0,aimHeight+(cartView?.33*portrait:0),localZ(nearZ)],stage);
  let turn=GAME.spaces[stage][3];
  if(crossing){
    const travel=curve(clamp((stageZ(stage)+1.01-player.z)/8.2,0,1));
    aim=lerpPoint(aim,placed([0,1.13,stageZ(stage+1)+homeZ],stage+1),travel);
    turn=lerp(turn,GAME.spaces[stage+1][3],travel);
  }
  const ease=1-Math.exp(-dt*10);
  view.center=lerpPoint(view.center,aim,1-Math.exp(-dt*6.7));
  view.yaw=lerp(view.yaw,view.targetYaw,ease);
  view.pitch=lerp(view.pitch,view.targetPitch,ease);
  view.fov=lerp(view.fov,homeFov,ease);
  zoom=lerp(zoom,zoomTarget,ease);
  const pitchBoost=portrait*(cartView?.07:.17)*clamp((.76-view.pitch)/.40,0,1);
  const roomPitch=view.pitch+pitchBoost;
  const pitch=lerp(roomPitch,finale?.71:clamp(roomPitch,.70,1.07),focus);
  const yaw=lerp(view.yaw,finale?.25:view.yaw,focus)+turn;
  const framing=crossing?.96:cartView?.66:tray?.83:.87;
  const distance=lerp(Math.max(14.8,11.83/aspect)*zoom*lerp(1,framing,portrait),
    finale?Math.max(8.8,4.50/aspect):Math.max(10.5,6.82/aspect),focus);
  view.aim=lerpPoint(view.center,[center[0],center[1]+.64,center[2]],focus);
  view.eye=add(view.aim,[Math.sin(yaw)*Math.cos(pitch)*distance,Math.sin(pitch)*distance,Math.cos(yaw)*Math.cos(pitch)*distance]);
  view.vp=multiply(perspective(view.fov,aspect,.10,130),look(view.eye,view.aim));
  const fullHeight=Math.max(1,canvas.clientHeight);
  const scaleY=height/fullHeight,offsetY=1-(2*(ui.playfield.offsetTop||0)+height)/fullHeight;
  view.fullProjection=multiply([1,0,0,0,0,scaleY,0,0,0,0,1,0,0,offsetY,0,1],view.vp);
}

function visualAgent(){
  const current=placed([player.x,0,player.z],stage);
  if(!crossing)return {x:current[0],z:current[2],offsetY:current[1]+player.lift,y:current[1]+player.y+player.lift,heading:player.heading+GAME.spaces[stage][3]};
  const entry=stageZ(stage)-4.49,exit=stageZ(stage+1)+4.49,[a,b]=bridgeAxis(stage);
  if(player.z>entry)return {x:current[0],z:current[2],offsetY:current[1]+player.lift,y:current[1]+player.y+player.lift,heading:player.heading+GAME.spaces[stage][3]};
  const p=player.z<exit?placed([player.x,0,player.z],stage+1):lerpPoint(a,b,bridgeTravel());
  const angle=player.z<exit?player.heading+GAME.spaces[stage+1][3]:Math.atan2(b[0]-a[0],b[2]-a[2]);
  return {x:p[0],z:p[2],offsetY:p[1],y:p[1]+player.y,heading:angle};
}

function drawLocks(m){
  for(let i=0;i<2;i++){
    if(GAME.scene==="mine"&&!crossing&&i<stage)continue;
    const local=new Mesh(),z=stageZ(i)-4.43,opened=Boolean(awards[i]||figures[i]);
    for(const side of [-1,1]){
      local.box(side*1.13,.49,z,.18,.92,.13,ink());
      local.oval(side*1.13,.96,z,.087,.089,.086,opened?0x7be2be:0xf7ad63,0,1,8);
    }
    if(!opened){
      local.box(0,.52,z,2.16,.107,.15,trim());
      for(let r=0;r<5;r++)local.box((r-2)*.40,.52,z+.078,.16,.075,.019,0xf0a25e,0,1);
    }
    insertZone(m,local,i);
  }
}

function visualReward(m,event,age) {
  const [x,base,z]=toWorld(event.pos,event.stage),pulseTime=Math.max(0,age-.25);
  const a=clamp(age/.52,0,1),port=GAME.brief==="hunt";
  if(port){
    const y=base+.33+Math.sin(a*Math.PI*.47)*.44,d=z-.30+Math.cos(a*Math.PI*.47)*.35;
    m.box(x,base+.15,z,1.32,.24,1.04,ink());
    m.box(x,y,d,1.20,.125,.71,trim(),0,0,a*1.41);
    m.box(x,y+.071,d,1.03,.046,.58,GAME.palette.accent,0,0,a*1.41);
  }
  if(age>.20){
    const animation=curve(pulseTime/.51);
    const rise=.16+animation*.96-(age>1.25?curve((age-1.25)/.60)*.40:0);
    if(event.type==="chart"||event.type==="stone"){
      const stone=event.type==="stone",colors=finaleColors();
      chartPiece(m,x,base+rise+.15,z,stone?colors[(event.stage+1)%3]:0x568c92,stone,event.stage,.12,1.17);
    }else item(m,event.type,x,base+rise,z,1.18,GAME.palette.loot,elapsed*(reduced?.05:1.4));
    if(age<1.63&&!reduced){
      for(let i=0;i<3;i++){
        const ripple=clamp((pulseTime-i*.10)/1.29,0,1);
        if(ripple>0&&ripple<1)ring(m,x,base+.075+i*.024,z,.36+ripple*1.65,i%2?white:GAME.palette.loot,.017+.025*(1-ripple));
      }
      if(age<1.04){
        for(let i=0;i<4;i++){
          const q=i/4*TAU+elapsed,k=.16;
          m.tube([x+Math.cos(q)*k,base+.26,z+Math.sin(q)*k],[x+Math.cos(q)*.67,base+.6+animation*1.57,z+Math.sin(q)*.67],.021,.003,GAME.palette.loot,5,1);
        }
      }
    }
  }
}

function environmentMotion(m) {
  if(GAME.look!=="reef"||reduced)return;
  for(let i=0;i<10;i++){
    const phase=(elapsed*.39+i*.146)%1;
    const x=(i%2===0?-1:1)*(3.85+.14*Math.sin(elapsed*2+i));
    const z=localZ(3.70-(i%5)*1.70);
    const y=.22+phase*2.4,size=.025+(i%3)*.014;
    m.oval(x,y,z,size,size*1.18,size,0xb6e5d5,0,1,7);
  }
}

function guideMotion(m){
  if(busy())return;
  const all=[...targets.values()].filter(({b,disabled})=>!b.hidden&&!disabled);
  const focus=all.length===1?all:attemptStarted||all.length>3?[]:all.filter(({b})=>b.dataset.tile!=="true");
  const wave=reduced?.3:.5+.5*Math.sin(elapsed*3.7);
  for(const {point,b} of focus){
    const [x,_,z]=point;
    const color=b.classList?.contains("path")?0xa0f6c9:0xffd78c;
    ring(m,x,.082,localZ(z),.48+wave*.15,color,.025,24);
  }
}

function motion(){
  const m=new Mesh(),active=new Mesh();
  drawLocks(m);
  if(GAME.form==="lift"){
    for(let i=0;i<2;i++){
      const [a,b]=bridgeAxis(i);
      const pos=crossing&&stage===i?lerpPoint(a,b,bridgeTravel()):stage>i?b:a;
      liftCabin(m,pos,i,Boolean(awards[i]));
    }
  }
  if(finale)finaleScene(active,clamp((elapsed-finale.at)/finaleDuration(),0,1));
  else{
    environmentMotion(active);
    mode.draw(active,elapsed);
    guideMotion(active);
  }
  insertZone(m,active,stage);
  for(const event of figures){
    if(!event||finale)continue;
    const part=new Mesh();
    visualReward(part,event,2.6);
    insertZone(m,part,event.stage);
  }
  if(reward){
    const part=new Mesh();
    visualReward(part,reward,elapsed-reward.at);
    insertZone(m,part,reward.stage);
  }
  for(const s of sunburst){
    const age=elapsed-s.at;
    if(age<0||age>s.life)continue;
    const f=1-age/s.life,y=s.y+s.vy*age-1.18*age*age;
    if(y>.07){
      const p=placed([s.x+s.vx*age,y,s.z+s.vz*age],s.stage);
      m.box(...p,.09*f,.038*f,.11*f,s.tint,age*8,1,age*9);
    }
  }
  if(!finale&&!mode.hideAgent)agentModel(m,visualAgent(),elapsed);
  return m;
}

function overlapArea(a,b){
  return Math.max(0,a.dx+b.dx-Math.abs(a.x-b.x))*Math.max(0,a.dy+b.dy-Math.abs(a.y-b.y));
}

const clearBoards={
  straps:[1.47,.98,-.05,1.72],
  fold:[.99,.86,.23,.86],
  ties:[1.30,.70,.16,1.81],
  hold:[1.57,1.04,-.46,.82],
  lattice:[1.52,.43,-.61,1.52],
  bridgework:[1.03,.54,-.35,2.16]
};

function mapTargets(){
  syncEnabled();
  const w=ui.playfield.clientWidth||canvas.clientWidth,h=ui.playfield.clientHeight||canvas.clientHeight;
  const project=point=>{
    const [x,y,,depth]=transform(view.vp,point);
    return {x:(x/depth*.5+.5)*w,y:(.5-y/depth*.5)*h,depth};
  };
  const transit=Boolean(crossing||changeAt!==null||reward||finale);
  if(leaders){
    const width=Math.round(w),height=Math.round(h);
    if(guideCanvas.width!==width||guideCanvas.height!==height){
      guideCanvas.width=width;guideCanvas.height=height;
    }
    leaders.clearRect(0,0,width,height);
  }
  const projected=[...targets.values()].filter(({b})=>!b.hidden).map(entry=>{
    const point=entry.point;
    const position=project(placed(toWorld(point),stage));
    const base=project(placed(toWorld([point[0],.13,point[2]]),stage));
    const tile=entry.b.dataset.tile==="true";
    return {...position,base,tile,entry,width:entry.b.offsetWidth||44,height:entry.b.offsetHeight||44};
  });
  const protectedAreas=projected.filter(p=>p.depth>0).map(p=>{
    const below=clamp(p.base.y-p.y,-8,54);
    return {x:p.x,y:p.y+below*.5,dx:p.tile?13:25,dy:p.tile?13:20+Math.abs(below)*.5};
  });
  const protectFootprint=(points,margin)=>{
    const visible=points.filter(p=>p.depth>0);
    if(!visible.length)return;
    const xs=visible.map(p=>p.x),ys=visible.map(p=>p.y);
    const l=Math.min(...xs),r=Math.max(...xs),a=Math.min(...ys),b=Math.max(...ys);
    protectedAreas.push({x:(l+r)*.5,y:(a+b)*.5,dx:(r-l)*.5+margin,dy:(b-a)*.5+margin});
  };
  const grid=projected.filter(p=>p.tile);
  if(grid.length>=5)protectFootprint(grid,22);
  const board=clearBoards[currentChapter().kind];
  if(board){
    const [halfWidth,top,center,halfDepth]=board;
    const points=[];
    for(const x of [-halfWidth,halfWidth])for(const y of [.14,top])for(const z of [center-halfDepth,center+halfDepth])
      points.push(project(placed(toWorld([x,y,z]),stage)));
    protectFootprint(points,6);
  }
  const agent=visualAgent(),body=project([agent.x,agent.y+.52,agent.z]);
  if(body.depth>0&&!mode.hideAgent)protectedAreas.push({...body,dx:22,dy:29});
  const boxes=[];
  for(const item of projected){
    const {entry,depth,tile,x,y,width,height}=item,{b}=entry;
    b.dataset.inTransit=String(transit);
    b.style.visibility=depth<=0?"hidden":"visible";
    if(depth<=0||transit){entry.hit=null;continue;}
    entry.hit=[x,y];
    const dx=width*.5+3,dy=height*.5+3;
    const ideal=tile?0:-49;
    const offsets=tile?[[0,0],[-12,8],[12,8],[0,-15],[0,15]]:
      [[0,-49],[0,-74],[-52,-52],[52,-52],[-66,-19],[66,-19],
        [-73,18],[73,18],[0,67],[0,-103],[-91,-78],[91,-78],
        [-107,9],[107,9],[0,100]];
    let selected=null,best=Infinity;
    const consider=(cx,cy)=>{
      const hit={x:clamp(cx,dx,w-dx),y:clamp(cy,dy,h-dy),dx,dy};
      const caption={...hit,dy:tile?8:Math.min(20,7+Math.ceil((b.dataset.caption?.length||1)/13)*4)};
      const occlusion=tile?0:protectedAreas.reduce((sum,r)=>sum+overlapArea(caption,r),0);
      const overlap=boxes.reduce((sum,r)=>sum+overlapArea(hit,r),0);
      const shift=entry.layoutOffset?Math.hypot(hit.x-x-entry.layoutOffset[0],hit.y-y-entry.layoutOffset[1]):0;
      const score=occlusion*48+overlap*32+Math.hypot(hit.x-x,hit.y-y-ideal)+shift*.31;
      if(score<best){selected=hit;best=score;}
    };
    if(entry.layoutOffset)consider(x+entry.layoutOffset[0],y+entry.layoutOffset[1]);
    for(const [sx,sy] of offsets)consider(x+sx,y+sy);
    if(best>470&&!tile){
      for(let row=dy;row<=h-dy;row+=37){
        for(const column of [dx,w*.26,w*.5,w*.74,w-dx])consider(column,row);
      }
    }
    boxes.push(selected);
    entry.layoutOffset=[selected.x-x,selected.y-y];
    b.style.transform="translate3d("+Math.round(selected.x)+"px,"+Math.round(selected.y)+"px,0) translate(-50%,-50%)";
    if(leaders&&!tile&&Math.hypot(selected.x-x,selected.y-y)>32){
      const x0=clamp(x,4,w-4),y0=clamp(y,4,h-4);
      const sign=selected.y<y0?1:-1;
      leaders.beginPath();
      leaders.moveTo(selected.x,selected.y+sign*9);
      leaders.lineTo(x0,y0);
      leaders.strokeStyle="rgba(28,43,51,.54)";
      leaders.lineWidth=2.5;
      leaders.stroke();
      leaders.strokeStyle="rgba(255,244,211,.88)";
      leaders.lineWidth=1;
      leaders.stroke();
      leaders.beginPath();
      leaders.fillStyle="rgba(255,242,205,.92)";
      leaders.arc(x0,y0,2.5,0,TAU);
      leaders.fill();
    }
  }
}

function tapObject(e){
  const rect=ui.playfield.getBoundingClientRect();
  const x=e.clientX-rect.left,y=e.clientY-rect.top;
  const nearest=[...targets.values()].filter(entry=>entry.hit&&!entry.b.hidden&&!entry.b.disabled)
    .map(entry=>[entry,Math.hypot(entry.hit[0]-x,entry.hit[1]-y)])
    .sort((a,b)=>a[1]-b[1])[0];
  if(!nearest||nearest[1]>27)return false;
  nearest[0].b.click();
  return true;
}

function frame(ms) {
  const now=ms/1000,dt=prior?clamp(now-prior,.001,.042):.016;
  prior=now;
  elapsed+=dt;
  movePlayer(dt);
  if(justArrived!==null&&elapsed>=justArrived)justArrived=null;
  if(!busy()&&!awards[stage])mode.tick?.(dt,elapsed);
  tickChallenge();
  tickReward();
  tickFinale();
  if(attemptStarted&&!failed&&!awards[stage]&&!reward&&!crossing&&!end){
    secondsLeft=Math.max(0,secondsLeft-dt);
    if(secondsLeft===0)failRoom("Time ran out · try again");
    else attemptStatus();
  }
  if(toastUntil&&elapsed>=toastUntil)clearMessage();
  sunburst=sunburst.filter(s=>elapsed-s.at<s.life);
  camera(dt);
  gfx(view.eye,view.fullProjection,visualAgent(),elapsed,motion(),view.aim,crossing?-1:stage);
  mapTargets();
  if(!showReady){showReady=true;document.documentElement.dataset.ready="true";}
  raf=requestAnimationFrame(frame);
}

function floorHit(screenX,screenY) {
  if(!view.eye)return null;
  const width=ui.playfield.clientWidth,height=ui.playfield.clientHeight;
  const rect=ui.playfield.getBoundingClientRect();
  const x=screenX-rect.left,y=screenY-rect.top;
  const d=unit(sub(view.aim,view.eye)),right=unit(cross(d,[0,1,0])),up=cross(right,d),size=Math.tan(view.fov/2);
  const ray=add(d,add(scale(right,(x/width*2-1)*size*width/height),scale(up,(1-y/height*2)*size)));
  if(ray[1]>-.01)return null;
  const floorY=GAME.spaces[stage][2];
  const t=(floorY-view.eye[1])/ray[1];
  return unplaced([view.eye[0]+t*ray[0],floorY,view.eye[2]+t*ray[2]],stage);
}

ui.playfield.addEventListener("pointerdown",e=>{
  if(pointer||e.button!==0||e.defaultPrevented||e.target.closest?.("button"))return;
  wakeAudio();
  pointer={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,yaw:view.targetYaw,pitch:view.targetPitch,drag:false,consumed:false,origin:floorHit(e.clientX,e.clientY)};
  ui.playfield.setPointerCapture(e.pointerId);
});
ui.playfield.addEventListener("pointermove",e=>{
  if(pointer?.id!==e.pointerId)return;
  const x=e.clientX-pointer.x,y=e.clientY-pointer.y;
  if(Math.hypot(x,y)>6)pointer.drag=true;
  if(pointer.drag&&!busy()){
    const detail={x:e.clientX,y:e.clientY,dx:e.clientX-pointer.lastX,dy:e.clientY-pointer.lastY,totalX:x,totalY:y,floor:floorHit(e.clientX,e.clientY),origin:pointer.origin};
    pointer.lastX=e.clientX;
    pointer.lastY=e.clientY;
    if(!awards[stage]&&mode.swipe?.(detail)){startAttempt();pointer.consumed=true;return;}
    if(!pointer.consumed){
      view.targetYaw=clamp(pointer.yaw-x*.0057,-.78,.78);
      view.targetPitch=clamp(pointer.pitch+y*.0044,.43,.95);
    }
  }
});
ui.playfield.addEventListener("pointerup",e=>{
  if(pointer?.id!==e.pointerId)return;
  if(!busy()){
    const p=floorHit(e.clientX,e.clientY);
    if(pointer.drag&&pointer.consumed&&!awards[stage])mode.dragEnd?.({floor:p,origin:pointer.origin});
    if(!pointer.drag&&!tapObject(e)&&p){
      if(awards[stage]&&stage<2&&Math.abs(p.x)<1.72&&p.z<-3.18)walkBridge();
      else if(!awards[stage]){
        if(mode.tap?.(p))startAttempt();
        else if(!mode.lockMove&&Math.abs(p.x)<3.95&&Math.abs(p.z)<4.30)flyTo(p.x,p.z);
      }
    }
  }
  pointer=null;
});
ui.playfield.addEventListener("pointercancel",()=>{pointer=null;});
window.addEventListener("keydown",e=>{
  if(ui.finish.open||e.metaKey||e.ctrlKey||e.altKey||e.target.tagName==="BUTTON")return;
  wakeAudio();
  const key=e.key.toLowerCase();
  if(!busy()&&mode.key?.(key)){startAttempt();e.preventDefault();return;}
  if(["w","a","s","d","arrowup","arrowleft","arrowdown","arrowright"].includes(key)){e.preventDefault();pressKeys.add(key);}
});
window.addEventListener("keyup",e=>pressKeys.delete(e.key.toLowerCase()));
window.addEventListener("blur",()=>{pointer=null;pressKeys.clear();});
document.addEventListener("visibilitychange",()=>{
  if(document.hidden){cancelAnimationFrame(raf);prior=0;pressKeys.clear();}
  else if(gfx)raf=requestAnimationFrame(frame);
});
function setGuideOpen(open){
  ui.game.dataset.guideOpen=String(open);
  ui.guide.setAttribute("aria-expanded",String(open));
  ui.guide.title=open?"Hide instructions":"Show instructions";
}
ui.guide.addEventListener("click",()=>setGuideOpen(ui.game.dataset.guideOpen!=="true"));
ui.reset.addEventListener("click",()=>{view.targetYaw=homeYaw;view.targetPitch=homePitch;});
ui.sound.addEventListener("click",()=>{
  muted=!muted;
  const label=muted?"Unmute sound":"Mute sound";
  ui.sound.ariaLabel=label;
  ui.sound.title=label;
  ui.sound.setAttribute("aria-pressed",String(muted));
  if(muted)audio?.suspend().catch(()=>{});
  else {wakeAudio();tone(toneGood);}
});
ui.replay.addEventListener("click",restart);
ui.retry.addEventListener("click",retryRoom);
ui.finish.addEventListener("cancel",e=>e.preventDefault());
document.documentElement.style.setProperty("--accent",GAME.palette.css);
ui.game.dataset.form=GAME.form;
ui.theme.textContent=GAME.brief==="hunt"?"TREASURE HUNT":"BLACK FRIDAY";
try {
  if(!gl)throw new Error("WebGL context unavailable");
  gfx=createRenderer(decorateWorld());
  restart();
  raf=requestAnimationFrame(frame);
} catch(error) {
  console.error(error);
  ui.failure.hidden=false;
}
