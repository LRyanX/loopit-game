"use strict";

const canvas = document.querySelector("#world");
const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const TAU = Math.PI * 2;
const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
const lerp = (a, b, amount) => a + (b - a) * amount;
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const scale = (a, amount) => a.map(v => v * amount);
const dot = (a, b) => a.reduce((total, v, i) => total + v * b[i], 0);
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const unit = a => scale(a, 1 / (Math.hypot(...a) || 1));
const rgb = hex => [16, 8, 0].map(shift => ((hex >> shift) & 255) / 255);

function seeded(seed) {
  return () => {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

class Mesh {
  data = [];

  tri(a, b, c, color, material = 0) {
    const n = unit(cross(sub(b, a), sub(c, a)));
    const tint = rgb(color);
    this.data.push(...a, ...n, ...tint, material, ...b, ...n, ...tint, material, ...c, ...n, ...tint, material);
  }

  quad(a, b, c, d, color, material) {
    this.tri(a, b, c, color, material);
    this.tri(a, c, d, color, material);
  }

  box(x, y, z, w, h, d, color, angle = 0, material = 0, tilt = 0) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const pitch = Math.cos(tilt), rise = Math.sin(tilt);
    const point = (a, b, c) => {
      const depth = b * rise + c * pitch;
      return [x + a * cos + depth * sin, y + b * pitch - c * rise, z - a * sin + depth * cos];
    };
    const a = point(-w/2,-h/2,-d/2), b = point(w/2,-h/2,-d/2);
    const c = point(w/2,-h/2,d/2), e = point(-w/2,-h/2,d/2);
    const f = point(-w/2,h/2,-d/2), g = point(w/2,h/2,-d/2);
    const j = point(w/2,h/2,d/2), k = point(-w/2,h/2,d/2);
    this.quad(f,k,j,g,color,material); this.quad(a,b,c,e,color,material);
    this.quad(e,c,j,k,color,material); this.quad(b,a,f,g,color,material);
    this.quad(a,e,k,f,color,material); this.quad(c,b,g,j,color,material);
  }

  tube(a, b, radiusA, radiusB, color, sides = 8, material = 0) {
    const axis = unit(sub(b,a));
    const u = unit(cross(axis, Math.abs(axis[1]) > .9 ? [0,0,1] : [0,1,0]));
    const v = cross(u, axis);
    const point = (p, radius, angle) => add(p, add(scale(u, radius*Math.cos(angle)), scale(v, radius*Math.sin(angle))));
    for (let i = 0; i < sides; i++) {
      const first = (i+.5)/sides*TAU, second = (i+1.5)/sides*TAU;
      const a1 = point(a,radiusA,first), a2 = point(a,radiusA,second);
      const b1 = point(b,radiusB,first), b2 = point(b,radiusB,second);
      this.quad(a1,b1,b2,a2,color,material);
      if (radiusA) this.tri(a,a1,a2,color,material);
      if (radiusB) this.tri(b,b2,b1,color,material);
    }
  }

  gem(x, y, z, w, h, d, color, sides = 6, turn = 0, material = 1) {
    const peak = [x,y+h*.64,z], point = [x,y-h*.44,z];
    for (let i=0;i<sides;i++) {
      const a = i/sides*TAU+turn, b = (i+1)/sides*TAU+turn;
      const l = [x+w*Math.cos(a),y,z+d*Math.sin(a)];
      const r = [x+w*Math.cos(b),y,z+d*Math.sin(b)];
      this.tri(peak,r,l,color,material);
      this.tri(point,l,r,color,material);
    }
  }

  oval(x, y, z, w, h, d, color, rotation = 0, material = 0, sides = 8) {
    const point = (lat, lon) => {
      const a = Math.cos(lat)*Math.cos(lon)*w, c = Math.cos(lat)*Math.sin(lon)*d;
      return [x+a*Math.cos(rotation)+c*Math.sin(rotation), y+h*Math.sin(lat), z-a*Math.sin(rotation)+c*Math.cos(rotation)];
    };
    for (let j=0;j<4;j++) for(let i=0;i<sides;i++) {
      const a = (j/4-.5)*Math.PI, b=((j+1)/4-.5)*Math.PI;
      const u=i/sides*TAU, v=(i+1)/sides*TAU;
      this.quad(point(a,u),point(b,u),point(b,v),point(a,v),color,material);
    }
  }
}

function shader(kind, source) {
  const s = gl.createShader(kind);
  gl.shaderSource(s,source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

function program(vertex, fragment) {
  const p = gl.createProgram();
  gl.attachShader(p,shader(gl.VERTEX_SHADER,vertex));
  gl.attachShader(p,shader(gl.FRAGMENT_SHADER,fragment));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  return p;
}

function perspective(fov, aspect, near, far) {
  const t=1/Math.tan(fov/2), d=1/(near-far);
  return [t/aspect,0,0,0, 0,t,0,0, 0,0,(far+near)*d,-1, 0,0,2*far*near*d,0];
}
function look(eye, at) {
  const back=unit(sub(eye,at)), right=unit(cross([0,1,0],back)), up=cross(back,right);
  return [right[0],up[0],back[0],0,right[1],up[1],back[1],0,right[2],up[2],back[2],0,
    -dot(right,eye),-dot(up,eye),-dot(back,eye),1];
}
function multiply(a,b) {
  return Array.from({length:16}, (_,i) => {
    const column=Math.floor(i/4)*4, row=i%4;
    return a[row]*b[column]+a[4+row]*b[column+1]+a[8+row]*b[column+2]+a[12+row]*b[column+3];
  });
}
function transform(matrix, [x,y,z]) {
  return [0,1,2,3].map(i=>matrix[i]*x+matrix[4+i]*y+matrix[8+i]*z+matrix[12+i]);
}
function buffer(data, drawMode) {
  const b=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,b);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),drawMode);
  return b;
}

const lerpPoint=(a,b,f)=>a.map((v,i)=>lerp(v,b[i],f));

function orthographic(l,r,b,t,n,f){
  return [
    2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,
    -(l+r)/(r-l),-(b+t)/(t-b),-(f+n)/(f-n),1
  ];
}

function createRenderer(scene){
  const format=GAME.form;
  const rgbText=h=>rgb(h).map(n=>n.toFixed(4)).join(",");
  const top=rgbText(GAME.palette.sky),bottom=rgbText(GAME.palette.haze);
  const cold=["dive","ice","basins"].includes(format),tunnel=["lift","vault"].includes(format);
  const direction=unit(tunnel?[-.66,.66,.35]:cold?[.44,.68,-.58]:format==="perch"||format==="grove"?[-.69,.70,.24]:[-.51,.81,.39]);
  const ambient=cold?[.47,.56,.67]:tunnel?[.46,.41,.39]:[.50,.51,.55];
  const key=cold?[.69,.86,1.0]:tunnel?[1.0,.74,.46]:[1.0,.89,.72];
  const underwater=format==="dive";
  const lampColor=GAME.scene==="archive"?[.43,.29,.66]:[1,.56,.25];
  const lamps=GAME.spaces.map((_,index)=>[-1,1].map(side=>{
    const archive=GAME.scene==="archive",mine=GAME.scene==="mine";
    return placed([side*(mine?3.53:3.84),archive?1.34:mine?1.00:1.52,
      (archive?-.20:mine?-2.00:-3.72)-11*index],index);
  }));
  const softSky=cold?.18:tunnel?.24:.40;
  const mapSize=Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE)||512,768);
  const sky=program(
    `attribute vec2 point; varying vec2 uv;
      void main(){uv=point*.5+.5;gl_Position=vec4(point,0.,1.);}`,
    `precision mediump float; varying vec2 uv;
      void main(){
        vec3 low=vec3(${bottom}),high=vec3(${top});
        vec3 c=mix(low,high,smoothstep(.02,1.1,uv.y));
        float sun=exp(-6.2*length((uv-vec2(.18,.80))*vec2(1.13,.78)));
        c=mix(c,vec3(1.,.92,.80),sun*${softSky.toFixed(2)});
        gl_FragColor=vec4(c,1.);
      }`
  );
  const depth=program(
    `attribute vec3 point;attribute float material;uniform mat4 lightMatrix;varying float mat;
      void main(){mat=material;gl_Position=lightMatrix*vec4(point,1.);}`,
    `precision highp float; varying float mat;
      void main(){
        if(mat>2.5&&mat<3.5)discard;
        float v=gl_FragCoord.z*255.;
        gl_FragColor=vec4(floor(v)/255.,fract(v),0.,1.);
      }`
  );
  const world=program(
    `attribute vec3 point,normal,tint;attribute float material;
      uniform mat4 viewProjection,lightMatrix;
      varying vec3 pos,n,col; varying float mat; varying vec4 shadePoint;
      void main(){
        pos=point;n=normal;col=tint;mat=material;
        shadePoint=lightMatrix*vec4(point,1.);
        gl_Position=viewProjection*vec4(point,1.);
      }`,
    `precision highp float;
      uniform vec3 eye,drone,sun,ambient,key,lampA,lampB,lampColor;
      uniform float time,shadeAvailable;
      uniform sampler2D shadowMap;
      varying vec3 pos,n,col;
      varying float mat;
      varying vec4 shadePoint;
      float hash(vec2 s){return fract(sin(dot(s,vec2(125.72,311.8)))*43758.54);}
      float noise(vec2 s){
        vec2 p=floor(s),f=fract(s);f=f*f*(3.-2.*f);
        return mix(mix(hash(p),hash(p+vec2(1.,0.)),f.x),mix(hash(p+vec2(0.,1.)),hash(p+1.),f.x),f.y);
      }
      float readLight(vec2 pt,float z){
        vec2 v=texture2D(shadowMap,pt).rg;
        return step(z,v.x+v.y/255.);
      }
      float directLight(float facing){
        if(shadeAvailable<.5)return 1.;
        vec3 uv=shadePoint.xyz/shadePoint.w*.5+.5;
        if(uv.x<.013||uv.y<.013||uv.x>.987||uv.y>.987||uv.z<0.||uv.z>1.)return 1.;
        float d=uv.z-(.00135+(1.-facing)*.0041);
        float s=${(1.64/mapSize).toFixed(7)};
        float pass=readLight(uv.xy,d)*2.;
        pass+=readLight(uv.xy+vec2(s,0.),d)+readLight(uv.xy-vec2(s,0.),d);
        pass+=readLight(uv.xy+vec2(0.,s),d)+readLight(uv.xy-vec2(0.,s),d);
        return pass/6.;
      }
      float lantern(vec3 diff,vec3 norm){
        float d=dot(diff,diff);
        return max(.11,dot(norm,diff*inversesqrt(.02+d)))*1.16/(1.+d*.42);
      }
      void main(){
        vec3 norm=normalize(n+vec3(.00003));
        if(mat>2.5&&mat<3.5){
          float d=length((pos.xz-drone.xz)*vec2(.98,1.14));
          gl_FragColor=vec4(.16,.21,.28,exp(-d*d*3.10)*.15*clamp((1.20-d)*5.,0.,1.));
          return;
        }
        if(mat>6.5&&mat<7.5){
          float wave=sin(pos.x*9.0+pos.z*4.3+time*2.3)*.030+sin(pos.z*13.-time*2.6)*.028;
          norm=normalize(norm+vec3(wave,0.,wave*.64));
        }
        float NdotL=max(0.,dot(norm,sun));
        float sky=max(0.,norm.y);
        float sh=directLight(NdotL);
        vec3 viewDir=normalize(eye-pos);
        vec3 halfDir=normalize(sun+viewDir);
        float specBase=max(0.,dot(norm,halfDir));
        float metal=step(3.5,mat)*(1.-step(4.5,mat));
        float wood=step(4.5,mat)*(1.-step(5.5,mat));
        float ice=step(5.5,mat)*(1.-step(6.5,mat));
        float water=step(6.5,mat)*(1.-step(7.5,mat));
        vec3 diffuse=col*(ambient+.075*sky+key*(.58+.12*ice)*NdotL*(.19+.81*sh));
        float rough=pow(specBase,12.)*.044+metal*pow(specBase,43.)*.33+ice*pow(specBase,35.)*.27+water*pow(specBase,65.)*.40;
        vec3 c=diffuse+rough*key*(.29+.71*sh);
        if(${tunnel})c+=col*lampColor*(lantern(lampA-pos,norm)+lantern(lampB-pos,norm));
        vec2 at=pos.xz+pos.y*vec2(.69,1.52);
        float grain=noise(at*14.);
        if(mat<.50)c*=.97+grain*.064+.026*noise(at*2.8);
        if(mat>7.5){
          vec2 strata=vec2(at.x*1.47,pos.y*3.1+at.y*.31);
          c*=.89+.13*noise(strata)+.076*grain;
          if(${underwater}){
            float waveA=sin(at.x*3.8+sin(at.y*2.3-time*.88)*1.6+time*.65);
            float waveB=sin(at.y*3.4+sin(at.x*2.5+time*.56)*1.6-time*.81);
            float caustic=pow(max(0.,1.-abs(waveA+waveB+.17)*1.31),5.);
            c+=vec3(.049,.111,.108)*(caustic*.56+.32*noise(at*1.4))*sky*(.31+.69*sh);
          }
        }
        if(metal>.5)c*=.95+.055*noise(vec2(at.x*65.,at.y*.89));
        if(wood>.5)c*=.87+.19*noise(vec2(at.x*12.,at.y*1.2)+vec2(pos.y*4.,0.));
        if(ice>.5)c=mix(c,c+vec3(.033,.055,.099),pow(1.-abs(dot(norm,viewDir)),2.1));
        if(water>.5){
          float ripple=sin(at.x*8.2+sin(at.y*6.5+time*.82)*1.7+time*1.9);
          c+=vec3(.071,.107,.113)*pow(.5+.5*ripple,12.)*(.31+.69*sky);
        }
        if(mat>.5&&mat<1.5)c=col*(1.03+.17*NdotL)+vec3(.021,.024,.028);
        if(mat>1.5&&mat<2.5){
          c=mix(c,col+vec3(.10,.13,.15),.31+.39*pow(1.-abs(dot(norm,viewDir)),2.));
          c+=key*pow(specBase,54.)*.23;
        }
        float fog=(1.-exp(-max(0.,length(eye-pos)-19.)*${(cold?.040:tunnel?.025:.023).toFixed(3)}));
        c=mix(c,vec3(${bottom}),fog*${underwater?".84":tunnel?".65":".72"});
        gl_FragColor=vec4(c,1.);
      }`
  );

  const quad=buffer([-1,-1,1,-1,-1,1,1,1],gl.STATIC_DRAW);
  const staticMesh=data=>({buffer:buffer(data,gl.STATIC_DRAW),count:data.length/10});
  const ground=staticMesh(scene.data),move=gl.createBuffer();
  // In a descending mine, the upper landing is in front of the active room.
  const mineRooms=GAME.scene==="mine"?[ground,...GAME.spaces.slice(1).map(([,z,y])=>{
    const clear=[];
    for(let i=0;i<scene.data.length;i+=30){
      const v=scene.data;
      const foreground=Math.min(v[i+2],v[i+12],v[i+22])>z+4.43;
      const aboveRoom=Math.min(v[i+1],v[i+11],v[i+21])>y+.27;
      if(!foreground||!aboveRoom){
        for(let j=0;j<30;j++)clear.push(v[i+j]);
      }
    }
    return staticMesh(clear);
  })]:[ground];
  const target=gl.createFramebuffer(),depthStorage=gl.createRenderbuffer(),shadowMap=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,shadowMap);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,mapSize,mapSize,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  for(const property of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D,property,gl.NEAREST);
  for(const property of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D,property,gl.CLAMP_TO_EDGE);
  gl.bindFramebuffer(gl.FRAMEBUFFER,target);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,shadowMap,0);
  gl.bindRenderbuffer(gl.RENDERBUFFER,depthStorage);
  gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,mapSize,mapSize);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,depthStorage);
  const shadows=gl.checkFramebufferStatus(gl.FRAMEBUFFER)===gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);

  const skyP=gl.getAttribLocation(sky,"point");
  const depthP=gl.getAttribLocation(depth,"point"),depthM=gl.getAttribLocation(depth,"material");
  const matrixD=gl.getUniformLocation(depth,"lightMatrix");
  const stride=40;
  const attrs=["point","normal","tint","material"].map(name=>gl.getAttribLocation(world,name));
  const uniforms=Object.fromEntries(["eye","drone","sun","ambient","key","lampA","lampB","lampColor","time","viewProjection","lightMatrix","shadeAvailable","shadowMap"]
    .map(name=>[name,gl.getUniformLocation(world,name)]));
  const addresses=[...new Set([skyP,depthP,depthM,...attrs])].filter(i=>i>=0);
  const deactivate=()=>{for(const address of addresses)gl.disableVertexAttribArray(address);};
  const enable=(index,count,size,offset)=>{
    if(index<0)return;
    gl.enableVertexAttribArray(index);
    gl.vertexAttribPointer(index,count,gl.FLOAT,false,size,offset);
  };
  const bindWorld=b=>{
    gl.bindBuffer(gl.ARRAY_BUFFER,b);
    attrs.forEach((index,n)=>enable(index,n===3?1:3,stride,n*12));
  };
  const bindDepth=b=>{
    gl.bindBuffer(gl.ARRAY_BUFFER,b);
    enable(depthP,3,stride,0);
    enable(depthM,1,stride,36);
  };
  let last=-Infinity, lastStatic=null, lightM=orthographic(-9,9,-9,9,.8,54);
  function writeShadow(time,motion,focus,scenery){
    if(!shadows||(scenery===lastStatic&&time-last<.036))return;
    last=time;
    lastStatic=scenery;
    const span=13.4,step=span*2/mapSize;
    const center=focus.map(v=>Math.round(v/step)*step);
    const sunEye=add(center,scale(direction,25));
    lightM=multiply(orthographic(-span,span,-span,span,.9,55),look(sunEye,center));
    gl.bindFramebuffer(gl.FRAMEBUFFER,target);
    gl.viewport(0,0,mapSize,mapSize);
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.useProgram(depth);
    gl.uniformMatrix4fv(matrixD,false,lightM);
    deactivate();
    bindDepth(scenery.buffer);
    gl.drawArrays(gl.TRIANGLES,0,scenery.count);
    bindDepth(move);
    gl.drawArrays(gl.TRIANGLES,0,motion.data.length/10);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  }

  return (eye,vp,drone,time,moving,focus,activeStage=0)=>{
    const ratio=Math.min(devicePixelRatio||1,1.6,Math.sqrt(2200000/Math.max(1,canvas.clientWidth*canvas.clientHeight)));
    const w=Math.max(1,Math.round(canvas.clientWidth*ratio)),h=Math.max(1,Math.round(canvas.clientHeight*ratio));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
    gl.bindBuffer(gl.ARRAY_BUFFER,move);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(moving.data),gl.DYNAMIC_DRAW);
    const scenery=mineRooms[activeStage]||ground;
    writeShadow(time,moving,focus||[drone.x,drone.y,drone.z],scenery);
    gl.viewport(0,0,w,h);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.useProgram(sky);
    deactivate();
    gl.bindBuffer(gl.ARRAY_BUFFER,quad);
    enable(skyP,2,0,0);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(world);
    deactivate();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,shadowMap);
    gl.uniform1i(uniforms.shadowMap,0);
    gl.uniform1f(uniforms.shadeAvailable,shadows?1:0);
    gl.uniform3fv(uniforms.eye,eye);
    gl.uniform3fv(uniforms.drone,[drone.x,drone.y,drone.z]);
    gl.uniform3fv(uniforms.sun,direction);
    gl.uniform3fv(uniforms.ambient,ambient);
    gl.uniform3fv(uniforms.key,key);
    if(tunnel){
      const distance=pair=>Math.hypot(pair[0][0]-drone.x,pair[0][2]-drone.z);
      const nearest=lamps.reduce((a,b)=>distance(a)<distance(b)?a:b);
      gl.uniform3fv(uniforms.lampA,nearest[0]);
      gl.uniform3fv(uniforms.lampB,nearest[1]);
      gl.uniform3fv(uniforms.lampColor,lampColor);
    }
    gl.uniform1f(uniforms.time,time);
    gl.uniformMatrix4fv(uniforms.viewProjection,false,vp);
    gl.uniformMatrix4fv(uniforms.lightMatrix,false,lightM);
    bindWorld(scenery.buffer);
    gl.drawArrays(gl.TRIANGLES,0,scenery.count);
    bindWorld(move);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLES,0,moving.data.length/10);
  };
}
