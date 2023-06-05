import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

const scene = new THREE.Scene();



const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0); // Set the position of the light
scene.add(directionalLight, ambientLight);


const canvas = document.querySelector('.webgl') as HTMLCanvasElement


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const fontLoader = new FontLoader();



const textureLoader = new THREE.TextureLoader()


const matcapTexture = textureLoader.load('fonts/8.png')

const svgLoader = new SVGLoader();



fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {


  const geometry = new TextGeometry('A7A LABS', {
    font: font,
    size: 1,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });


  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  geometry.center();


  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);


  const techStackList = [
    // "AmazonWebServicesBaseGradient.svg",
    "GoogleCloudPlatformBaseGradient.svg",
    // "NUXTBaseGradient.svg",
    "AndroidStudioBaseGradient.svg",
    "GraphQlBaseGradient.svg",
    // "PostGresBaseGradient.svg",
    // "ApolloBaseGradient.svg",
    // "Html5BaseGradient.svg",
    // "PythonBaseGradient.svg",
    "DockerBaseGradient.svg",
    "JavascriptBaseGradient.svg",
    "ReactBaseGradient.svg",
    "FigmaBaseGradient.svg",
    "KafkaBaseGradient.svg",
    // "ReactNativeBaseGradient.svg",
    "FirebaseBaseGradient.svg",
    "KubernetesBaseGradient.svg",
    "SASSBaseGradient.svg",
    "FlaskBaseGradient.svg",
    // "MySqlBaseGradient.svg",
    "VercelBaseGradient.svg",
    // "FlutterBaseGradient.svg",
    "NestBaseGradient.svg",
    "VueBaseGradient.svg",
    "GolangBaseGradient.svg",
    // "NextJSBaseGradient.svg",
  ]

  for (let i = 0; i < 50; i++) {


    svgLoader.load(`assets/${techStackList[i % techStackList.length]}`, data => {
      const paths = data.paths;
      const group = new THREE.Group();

      const extrusionSettings = {
        depth: 1,  // Specify the extrusion depth
        bevelEnabled: false,

      };

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];

        const materialSVG = new THREE.MeshPhongMaterial({
          map: matcapTexture,
          side: THREE.DoubleSide,
          shininess: 100,  // Increase shininess for a shiny appearance
        });

        const shapes = SVGLoader.createShapes(path);

        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j];
          const geometry = new THREE.ExtrudeGeometry(shape, extrusionSettings);  // Extrude the shape
          const mesh = new THREE.Mesh(geometry, materialSVG);

          mesh.position.x = (Math.random() - 0.5) * 25;
          mesh.position.y = (Math.random() - 0.5) * 25;
          mesh.position.z = (Math.random() - 0.5) * 25;

          mesh.rotation.z = Math.PI;
          mesh.rotation.y = Math.PI;
          mesh.rotation.x = (Math.random() - 0.5) * Math.PI / 4;
          mesh.rotation.y = (Math.random() - 0.5) * Math.PI / 4;

          mesh.scale.x = 0.1;
          mesh.scale.y = 0.1;
          mesh.scale.z = 0.1;

          group.add(mesh);
        }
      }

      scene.add(group);



    },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (_error) {
        console.log('An error happened');
      });




    // const donoutG = new THREE.TorusGeometry(0.3, 0.2, 20, 40)
    // const donut = new THREE.Mesh(donoutG, material);
    // scene.add(donut);

    // donut.position.x = (Math.random() - 0.5) * 15
    // donut.position.y = (Math.random() - 0.5) * 15
    // donut.position.z = (Math.random() - 0.5) * 15

    // donut.rotation.x = (Math.random() - 0.5) * Math.PI;
    // donut.rotation.z = (Math.random() - 0.5) * Math.PI;

  }
})





const axis = new THREE.AxesHelper();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera, axis)


const renderer = new THREE.WebGLRenderer({
  canvas
});

function onWindowResize() {
  // Update the renderer size
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);

  // Update the camera aspect or
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true


renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
controls.update();
renderer.render(scene, camera);

const animate = () => {
  controls.update()
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

renderer.setSize(window.innerWidth, window.innerHeight);






