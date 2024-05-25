import { useEffect } from 'react';
import * as THREE from 'three';
import SceneInit from './utils/SceneInit';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function App() {
  
  useEffect(() => {
    
    const test = new SceneInit('myThreeJsCanvas');
    
    test.initialize();
    test.animate();

    var planeGeometry = new THREE.PlaneGeometry(1000, 1000); // Width and height of the plane
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100);

    var planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = Math.PI / 2;

    test.scene.add(plane);

    const loader = new GLTFLoader();
    
    loader.load('/box.glb', (gltf) => {
      test.scene.add(gltf.scene);
      // make box a little up
      gltf.scene.position.y = 0.8;
      window.addEventListener('keypress', (e)=> {
        if(e.key === 'w') {
          gltf.scene.position.z -= 0.5;
        } else if(e.key === 's') {
          gltf.scene.position.z += 0.5;
        } else if(e.key === 'a') {
          gltf.scene.position.x -= 0.5;
        } else if(e.key === 'd') {
          gltf.scene.position.x += 0.5;
        }
      })
      // make box a little bigger
      gltf.scene.scale.set(4, 4, 4)
    });

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const textureSky = cubeTextureLoader.load([
        'sky.avif',
        'sky.avif',
        'sky.avif',
        'sky.avif',
        'sky.avif',
        'sky.avif',
    ]);

    // 2. Create a Sphere Geometry
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32); // Adjust radius as needed

    // 3. Apply the Cube Texture
    const skyMaterial = new THREE.MeshBasicMaterial({ map: textureSky, side: THREE.BackSide });

    // 4. Create the Sky Sphere
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    test.scene.add(sky);

  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
  
}

export default App
