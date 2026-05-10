gsap.registerPlugin(ScrollTrigger);

/* SMOOTH SCROLL */
const lenis = new Lenis({
  
  smooth:true
});

function raf(time){
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* CURSOR */
const cursor = document.querySelector(".cursor");
const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove",(e)=>{

  gsap.to(cursor,{
    x:e.clientX,
    y:e.clientY,
  });

  gsap.to(glow,{
    x:e.clientX,
    y:e.clientY,
  });

});

/* REVEAL ANIMATION */
gsap.utils.toArray(".reveal").forEach((el)=>{

  gsap.to(el,{
    opacity:1,
    y:0,

    scrollTrigger:{
      trigger:el,
      start:"top 85%"
    }

  });

});


/* MAGNETIC */
document.querySelectorAll(".magnetic").forEach((el)=>{

  el.addEventListener("mousemove",(e)=>{

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;

    gsap.to(el,{
      x:x*0.3,
      y:y*0.3,
      duration:0.3
    });

  });

  el.addEventListener("mouseleave",()=>{

    gsap.to(el,{
      x:0,
      y:0,
      duration:0.5
    });

  });

});

/* 3D CARDS */
document.querySelectorAll(".card").forEach(card=>{

  card.addEventListener("mousemove",(e)=>{

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y/rect.height)-0.5)*-20;
    const rotateY = ((x/rect.width)-0.5)*20;

    gsap.to(card,{
      rotateX,
      rotateY,
      scale:1.05,
      duration:0.4
    });

  });

  card.addEventListener("mouseleave",()=>{

    gsap.to(card,{
      rotateX:0,
      rotateY:0,
      scale:1,
      duration:0.6
    });

  });

});


barba.init({

  transitions:[{

    name:"opacity-transition",

    leave(data){

      return gsap.to(data.current.container,{
        opacity:0,
        y:-50,
      });

    },

    enter(data){

      return gsap.from(data.next.container,{
        opacity:0,
        y:50,
      });

    }

  }]

});
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector("#bg"),
  alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.z = 5;

/* LIGHT */
const light = new THREE.PointLight(0xffffff,1);
light.position.set(5,5,5);

scene.add(light);

/* OBJECT */
const geometry = new THREE.IcosahedronGeometry(2,1);

const material = new THREE.MeshStandardMaterial({
  color:0xffffff,
  wireframe:true
});

const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh);

/* ANIMATION */
function animate(){

  requestAnimationFrame(animate);

  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.003;

  renderer.render(scene,camera);

}

animate();

/* RESPONSIVE */
window.addEventListener("resize",()=>{

  camera.aspect = window.innerWidth/window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);

});
