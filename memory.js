const photos = [
  { img: "images/photo1.jpg", note: "Our first beautiful memory ❤️" },
  { img: "images/photo2.jpg", note: "Every moment with you is special 🌸" },
  { img: "images/photo3.jpg", note: "Your smile makes everything brighter ✨" },
  { img: "images/photo4.jpg", note: "A memory I'll always treasure 💕" },
  { img: "images/photo5.jpg", note: "Together, every day feels magical 🌹" },
  { img: "images/photo6.jpg", note: "Thank you for every beautiful moment ❤️" },
  { img: "images/photo7.jpg", note: "Life is happier with you 😊" },
  { img: "images/photo8.jpg", note: "One more unforgettable memory 📸" },
  { img: "images/photo9.jpg", note: "Forever grateful for your friendship 💖" },
  { img: "images/photo10.jpg", note: "Every picture tells our story 💞" },
  { img: "images/photo11.jpg", note: "You are my favorite memory 🌍" },
  { img: "images/photo12.jpg", note: "Happy Birthday Madam Ji ❤️🎂" }
];

let scene, camera, renderer;
let sphereGroup;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let openedPhotos = new Set();

function startMemorySphere() {

    const container = document.getElementById("memoryContainer");
    container.innerHTML = "";

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 9;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, 450);

    container.appendChild(renderer.domElement);

    sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    createSphere();
    animateSphere();
    enableSphereControls();
}
function createSphere() {

    const radius = 4.8;

    const loader = new THREE.TextureLoader();

    photos.forEach((photo, index) => {

        const texture = loader.load(photo.img);
        texture.colorSpace = THREE.SRGBColorSpace;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const geometry = new THREE.PlaneGeometry(1.5, 2.3);

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
});

        const plane = new THREE.Mesh(geometry, material);

    const phi = Math.acos(-1 + (2 * index) / photos.length);
const theta = Math.sqrt(photos.length * Math.PI) * phi;

plane.position.x = radius * Math.cos(theta) * Math.sin(phi);
plane.position.y = radius * Math.cos(phi);
plane.position.z = radius * Math.sin(theta) * Math.sin(phi);

plane.lookAt(
    new THREE.Vector3(0, 0, 0)
);
plane.userData = {
    index: index
};
        sphereGroup.add(plane);

    });

}

function animateSphere() {
    if(!renderer) return;
    requestAnimationFrame(animateSphere);

    sphereGroup.rotation.y += 0.002;
    sphereGroup.rotation.x =
        Math.sin(Date.now() * 0.0004) * 0.15;

    renderer.render(scene, camera);

}
let isDragging = false;
let previousX = 0;
let previousY = 0;

function enableSphereControls() {

    const canvas = renderer.domElement;

    canvas.addEventListener("pointerdown", (e) => {
        isDragging = true;
        previousX = e.clientX;
        previousY = e.clientY;
    });
canvas.addEventListener("click", (e) => {

    mouse.x = (e.offsetX / canvas.clientWidth) * 2 - 1;
    mouse.y = -(e.offsetY / canvas.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(sphereGroup.children);

    if (hit.length > 0) {
        const photo = hit[0].object.userData.index;
        openPhoto(photo);
    }

});
    window.addEventListener("pointerup", () => {
        isDragging = false;
    });

    window.addEventListener("pointermove", (e) => {

        if (!isDragging) return;

        const dx = e.clientX - previousX;
        const dy = e.clientY - previousY;

        sphereGroup.rotation.y += dx * 0.01;
        sphereGroup.rotation.x += dy * 0.005;

        previousX = e.clientX;
        previousY = e.clientY;

    });

}

function openPhoto(index){

    openedPhotos.add(index);

    document.getElementById("popupImage").src = photos[index].img;

    document.getElementById("popupNote").innerHTML = photos[index].note;

    document.getElementById("photoPopup").style.display = "flex";

    if(openedPhotos.size === photos.length){

        document.getElementById("readLetterBtn").style.display = "block";

    }

}
document.getElementById("closePopup").onclick=function(){

document.getElementById("photoPopup").style.display="none";

}
const letter = `❤️ Happiest Birthday Vidhi (Bayko) ❤️

Aaj cha divas khup special aahe tuzhya sathi aani mahzya sathi pan...

Aaj chi date mazhya sathi dar varshi special asel karan mahzya Bayko cha birthday yeto tevaa... ❤️🥳

Aapn jeva bolyla chalu kela hota...
8th Feb la tuza msg aala...
Aapli journey khup special hoti ani pudhe hi ashich rahil...

Aapn sobat spend kelelya choti choti memories...
Khup special aahet...

Tuz hasana...
Tuzhi smile...
Tuzhe dole...
Video calls varche vedepan...
Sagla khup special aahe... ❤️

Bayko...
Fakt tu mazhya sobat kayam raha...
Mazhi saath de...
Mazhya sobat bhandat pan raha... ❤️

Bayko...
Tu mazhya sobat lagna karshil na...?

Mahzya ghrchya sambhalun gheshil na...?

Honarya mulancha sambhal karshil na...?

Tuza haat mazhya hatat kayam deshil na...?

❤️ I Love You Mrs. Vidhi Prasad Posam ❤️

🥹🥹🥹

Tuzha Navra...
Prasad ❤️`;
function startLetter(){

let i = 0;

const box = document.getElementById("letterText");

box.innerHTML = "";

document.getElementById("finalBtn").style.display = "none";

const timer = setInterval(()=>{

box.innerHTML += letter.charAt(i);

box.scrollTop = box.scrollHeight;

i++;

if(i >= letter.length){

clearInterval(timer);

document.getElementById("finalBtn").style.display = "block";

}

},35);

}
document.getElementById("readLetterBtn").onclick=function(){

document.getElementById("photoPopup").style.display="none";


document.getElementById("memoryPage").style.display="none";

document.getElementById("letterPage").style.display = "block";


startLetter();
};
document.getElementById("finalBtn").onclick = function(){

    document.getElementById("letterPage").style.display = "none";

    document.getElementById("finalPage").style.display = "flex";

};
function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*100+"%";

    heart.style.animationDuration=(3+Math.random()*4)+"s";

    document.getElementById("floatingHearts").appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },7000);

}

setInterval(createHeart,300);
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function firework(){

    for(let i=0;i<80;i++){

        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height/2,
            dx:(Math.random()-0.5)*6,
            dy:(Math.random()-0.5)*6,
            life:80
        });

    }

}

setInterval(firework,1200);

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index)=>{

        p.x+=p.dx;
        p.y+=p.dy;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x,p.y,3,0,Math.PI*2);
        ctx.fillStyle=`hsl(${Math.random()*360},100%,60%)`;
        ctx.fill();

        if(p.life<=0){
            particles.splice(index,1);
        }

    });

    requestAnimationFrame(animateFireworks);

}

animateFireworks();
function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.innerHTML="🌹";

    petal.style.left=Math.random()*100+"%";

    petal.style.animationDuration=(4+Math.random()*4)+"s";

    document.body.appendChild(petal);

    setTimeout(()=>{
        petal.remove();
    },8000);

}

setInterval(createPetal,500);

document.getElementById("replayBtn").onclick=function(){

    location.reload();

};