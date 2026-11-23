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
  const poly=footprint(landscape&&GAME.form!=="vault"?"organic":geometry),z=-11*zone,p=GAME.palette,look=GAME.scene;
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
      return [x+x/len*reach,Math.min(-.13,base*drop+(band<3?.17*Math.sin(i*1.23+band):0)),z+d+d/len*reach];
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

const ui=Object.fromEntries(["game","playfield","theme","place","count","goal","metric","attempt","reset","sound","targets","pins","tools","toast","reveal","award",
  "award-count","finish","finish-count","result-items","replay","retry","failure"].map(key=>[key,document.getElementById(key)]));
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
const mistakeLimit=3;
const timedTasks=new Set(["catch","hold","rhythm","service","swing","traffic"]);
const longTasks=new Set(["assembly","glide","jam","lattice","maze","shadow","weigh"]);
let mistakes=0, secondsLeft=0, attemptStarted=false, failed=false;
const curve=x=>{const t=clamp(x,0,1);return t*t*(3-2*t);};
const localZ=z=>stageZ(stage)+z;
const busy=()=>Boolean(route?.action||crossing||reward||end||failed||justArrived!==null);
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
  setText(ui.attempt,failed?"Room failed":
    (mistakeLimit-mistakes)+" tries · "+minutes+":"+String(seconds%60).padStart(2,"0"));
  ui.attempt.dataset.low=String(failed||mistakes>=mistakeLimit-1||seconds<=12);
  ui.attempt.hidden=Boolean(awards[stage]||reward||crossing||end);
}
function startAttempt() {
  if(!failed&&!awards[stage])attemptStarted=true;
}
function failRoom(reason) {
  if(failed||reward||awards[stage])return;
  failed=true;
  route=null;
  pointer=null;
  pressKeys.clear();
  ui.game.dataset.failed="true";
  ui.retry.hidden=false;
  ui.metric.hidden=true;
  clearMessage();
  setText(ui.goal,reason);
  hideTools();
  for(const {b} of targets.values())b.hidden=true;
  attemptStatus();
  tone([294,220,147],.11,.13);
  ui.retry.focus?.({preventScroll:true});
}
function mistake(text) {
  if(failed||reward||awards[stage])return;
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
  if(!failed)setText(ui.goal,text);
}
function meter(text) {
  if(failed)return;
  ui.metric.hidden=!text;
  if(text)setText(ui.metric,text);
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
    b.addEventListener("click",()=>{
      if(busy()||entry.disabled)return;
      wakeAudio();
      startAttempt();
      entry.act();
    });
    ui.targets.append(b);
    entry={b};
    if(GAME.controls[stage]==="world"){
      const pin=document.createElement("button");
      pin.type="button";
      pin.className="pin";
      pin.tabIndex=-1;
      pin.dataset.pin=String(targets.size+1);
      b.dataset.pin=pin.dataset.pin;
      pin.addEventListener("pointerdown",event=>event.preventDefault());
      pin.addEventListener("click",()=>b.click());
      ui.pins.append(pin);
      entry.pin=pin;
    }
    targets.set(key,entry);
  }
  entry.point=point;
  entry.act=act;
  entry.disabled=Boolean(options.disabled);
  entry.b.disabled=entry.disabled||busy();
  setText(entry.b,label);
  entry.b.className="target"+(options.kind?" "+options.kind:"");
  entry.b.ariaLabel=options.aria||label;
  entry.b.hidden=failed||Boolean(options.hidden);
  if(entry.pin)entry.pin.dataset.kind=options.kind||"";
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
  if(end||failed||reward||awards[stage])return;
  const type=GAME.brief==="hunt"?GAME.awardShape:"receipt";
  reward={stage,pos,at:elapsed,item:name||GAME.awards[stage],type,fired:false};
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
    if(stage===2){finish();return;}
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
      crossing=false;
      justArrived=elapsed+.30;
      openZone();
    }};
  syncEnabled();
}
function finish() {
  end=true;
  objective(GAME.brief==="hunt"?"All treasures recovered":"Shopping run complete");
  setText(ui["finish-count"],GAME.brief==="hunt"?"3/3 treasures recovered":"3/3 shopping stops complete");
  ui["result-items"].replaceChildren(...awards.map(label=>{const li=document.createElement("li"); li.textContent=label;return li;}));
  ui.finish.showModal();
}
function openZone() {
  [homeYaw,homePitch,homeZoom,homeZ,homeFov]=GAME.views[stage];
  const kind=GAME.tasks[stage-1]?.kind;
  secondsLeft=timedTasks.has(kind)?58:longTasks.has(kind)?105:stage===0?88:78;
  mistakes=0;
  attemptStarted=false;
  failed=false;
  ui.game.dataset.failed="false";
  ui.retry.hidden=true;
  attemptStatus();
  player.lift=0;
  view.targetYaw=homeYaw;
  view.targetPitch=homePitch;
  zoomTarget=homeZoom;
  setText(ui.place,GAME.zones[stage]);
  ui.targets.replaceChildren();
  ui.pins.replaceChildren();
  ui.tools.replaceChildren();
  targets.clear();
  toolButtons.clear();
  hideTools();
  clearMessage();
  meter("");
  mode.start(stage,rounds);
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
  stage=0;awards=[];figures.length=0;end=false;crossing=false;reward=null;route=null;justArrived=null;
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
  const focus=reward?curve(age/.44)*(1-curve((age-1.47)/.51)):end?.37:0;
  const center=reward?placed(toWorld(reward.pos),stage):placed([0,.65,localZ(-.38)],stage);
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
  const pitch=lerp(view.pitch+pitchBoost,.60,focus), yaw=lerp(view.yaw,.25,focus)+turn;
  const framing=crossing?.96:cartView?.66:tray?.83:.87;
  const distance=lerp(Math.max(14.8,11.83/aspect)*zoom*lerp(1,framing,portrait),
    Math.max(6.5,3.78/aspect),focus);
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
    item(m,event.type,x,base+rise,z,1.18,GAME.palette.loot,elapsed*(reduced?.05:1.4));
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
  environmentMotion(active);
  mode.draw(active,elapsed);
  insertZone(m,active,stage);
  for(const event of figures){
    if(!event)continue;
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
  agentModel(m,visualAgent(),elapsed);
  return m;
}

function mapTargets(){
  syncEnabled();
  if(GAME.controls[stage]!=="world")return;
  const w=ui.playfield.clientWidth||canvas.clientWidth,h=ui.playfield.clientHeight||canvas.clientHeight,arranged=[];
  const offset=[[0,-25],[-28,-23],[28,-23],[0,-53],[-40,4],[40,4],[0,29],[-32,-60],[32,-60]];
  for(const entry of targets.values()){
    const {b,pin}=entry;
    if(!pin)continue;
    const [x,y,,depth]=transform(view.vp,placed(toWorld(entry.point),stage));
    pin.hidden=b.hidden||depth<=0;
    if(pin.hidden)continue;
    pin.disabled=b.disabled;
    const px=(x/depth*.5+.5)*w,py=(.5-y/depth*.5)*h;
    const capX=v=>clamp(v,21,w-21),capY=v=>clamp(v,21,h-21);
    const candidate=offset.map(([dx,dy])=>[capX(px+dx),capY(py+dy)]);
    const point=candidate.find(([a,v])=>arranged.every(([c,d])=>Math.hypot(a-c,v-d)>32))||candidate[0];
    arranged.push(point);
    pin.style.transform="translate3d("+Math.round(point[0]-21)+"px,"+Math.round(point[1]-21)+"px,0)";
  }
}

function frame(ms) {
  const now=ms/1000,dt=prior?clamp(now-prior,.001,.042):.016;
  prior=now;
  elapsed+=dt;
  movePlayer(dt);
  if(justArrived!==null&&elapsed>=justArrived)justArrived=null;
  if(!busy()&&!awards[stage])mode.tick?.(dt,elapsed);
  tickReward();
  if(attemptStarted&&!failed&&!awards[stage]&&!reward&&!crossing&&!end){
    secondsLeft=Math.max(0,secondsLeft-dt);
    if(secondsLeft===0)failRoom("Time ran out · try again");
    else attemptStatus();
  }
  if(toastUntil&&elapsed>=toastUntil)clearMessage();
  sunburst=sunburst.filter(s=>elapsed-s.at<s.life);
  camera(dt);
  gfx(view.eye,view.fullProjection,visualAgent(),elapsed,motion(),view.aim);
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
  if(pointer||e.button!==0||e.defaultPrevented)return;
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
    if(!pointer.drag&&p){
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
