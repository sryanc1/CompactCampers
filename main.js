import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Background 3D image animation with files from Blender --------------
//Get the canvas
const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
//Set the canvas to a 2d canvas
const context = canvas.getContext("2d")
const context2 = canvas2.getContext("2d")
//Set a variable to hold the name and file extension of the images
const currentFrame = (index) => `./CamperWithShadowSmall/${(index +1).toString()}.png`;
const currentFrame2 = (index) => `./SceneSmall/${(index +1).toString()}.png`;
//Create an array to hold the images
const images = [];
const images2 = [];
//Set a variable for the number of animation images
const frameCount = 500;
//Set a variable to hold the number of the current image frame
let camper = { frame: 0 };
let scene = { frame: 0 };
//Set a variable for the height of the overall site - not the VH
const height = 3000;

//Add the images to an array
for (let i = 0; i < frameCount; ++i) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
  //Once all images are loaded call the render function
  img.onload = () => {
    // Check if all images have loaded
    if (images.every(img => img.complete)) {
      render();
    }
  };
}
//Image transition and animation
gsap.to(camper, {
  frame: frameCount -1,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: {
    scrub: true,
    //Prevents the screen from scrolling
    pin: "canvas",
    end: height + "%",
  },
  onUpdate: render,
});
function render(){
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[camper.frame], 0, 0);
}

for (let i = 0; i < frameCount; ++i) {
  const img = new Image();
  img.src = currentFrame2(i);
  images2.push(img);
  //Once all images are loaded call the render function
  img.onload = () => {
    // Check if all images have loaded
    if (images2.every(img => img.complete)) {
      render2();
    }
  };
}
//Image transition and animation
gsap.to(scene, {
  frame: frameCount -1,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: {
    scrub: true,
    //Prevents the screen from scrolling
    pin: "#canvas2",
    end: height + "%",
  },
  onUpdate: render2,
});
function render2(){
  context2.canvas.width = images2[0].width;
  context2.canvas.height = images2[0].height;
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  context2.drawImage(images2[scene.frame], 0, 0);
}
// END -----------------------------------------

// Glass tile content and animation ------------
//Title tile - fade out and up
gsap.to('#title', {
  opacity: 0,
  y: -300,
  scrollTrigger: {
    start: 'centre -100%',
    end: 'centre -300%',
    scrub: true,
    //markers: true
  }
})

const inDif = -100;
const duration = -400;
const outDiff = -100;
let containerNum = 1;
let start = -100;
const y = -400;
const yEnd = -800;
const newStart = -60;

for (var count = 0; count < height;) {
  gsap.to('#container'+containerNum, {
    opacity: 1,
    y: y,
    scrollTrigger: {
      trigger: '#container'+containerNum,
      start: 'centre ' + start + '%',
      end: 'centre ' + (start + inDif) + '%',
      scrub: true,
    },
  });
  gsap.fromTo('#container'+containerNum, {
    opacity: 1,
    y: y,
  }, {
    opacity: 0,
    y: yEnd,
    immediateRender: false,
    scrollTrigger: {
      trigger: '#container'+containerNum,
      start: 'centre ' + (start + inDif + duration) + '%',
      end: 'centre ' + (start + inDif + duration + outDiff) + '%',
      scrub: true,
    },
  });
  containerNum++;
  count = (start + inDif + duration + outDiff) * -1;
  start = start + inDif + duration + newStart;
}

