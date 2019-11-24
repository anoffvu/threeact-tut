import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AmbientLight } from 'three';

class App extends Component {
  spheres = [];
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.addLights();
    this.startAnimationLoop();
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  handleWindowResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  handleMouseMove = () => {};

  sceneSetup = () => {
    // grab view variables
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    const fov = 75;
    const aspect = width / height; // the canvas default aspect ratio
    const nearPlane = 0.1;
    const farPlane = 10000;

    // construct the camera
    this.camera = new THREE.PerspectiveCamera(fov, aspect, nearPlane, farPlane);
    // move camera back a bit
    this.camera.position.z = 500;

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.CubeTextureLoader()
    //   .setPath('resources')
    //   .load([
    //     'cave.jpg',
    //     'cave.jpg',
    //     'cave.jpg',
    //     'cave.jpg',
    //     'cave.jpg',
    //     'cave.jpg'
    //   ]);

    this.controls = new OrbitControls(this.camera, this.mount);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement); // mount using react ref
  };

  addCustomSceneObjects = () => {
    var geometry = new THREE.SphereGeometry(150, 100, 100);
    var geometry2 = new THREE.SphereBufferGeometry(150, 7, 7, 0, 6.3, 0, 5.8);
    // var material = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    //   envMap: this.scene.background,
    //   refractionRatio: 0.95
    // });
    var material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: false,
      opacity: 0.9
    });
    // material.envMap.mapping = THREE.CubeRefractionMapping;

    for (var i = 0; i < 500; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 10000 - 5000;
      mesh.position.y = Math.random() * 10000 - 5000;
      mesh.position.z = Math.random() * 10000 - 5000;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
      this.scene.add(mesh);
      this.spheres.push(mesh);
    }

    // for (var i = 0; i < 250; i++) {
    //   var mesh = new THREE.Mesh(geometry2, material);
    //   mesh.position.x = Math.random() * 10000 - 5000;
    //   mesh.position.y = Math.random() * 10000 - 5000;
    //   mesh.position.z = Math.random() * 10000 - 5000;
    //   mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
    //   this.scene.add(mesh);
    //   this.spheres.push(mesh);
    // }
  };

  addLights = () => {
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 1000);
    lights[1] = new THREE.PointLight(0xffffff, 1, 1000);
    lights[2] = new THREE.PointLight(0xffffff, 2, 10000);

    lights[3] = new THREE.DirectionalLight(0xffffff, 0.7);

    lights[0].position.set(-1000, 0, 0);
    lights[1].position.set(-1000, 500, 0);
    lights[2].position.set(-1000, 0, 0);
    lights[3].position.set(-1000, 0, 0);
    lights[3].target.position.set(1000, 0, 0);

    this.scene.add(lights[3]);

    // this.scene.add(lights[0]);
    // this.scene.add(lights[1]);
    // this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    var timer = 0.0001 * Date.now();
    for (var i = 0, il = this.spheres.length; i < il; i++) {
      var sphere = this.spheres[i];
      sphere.position.x = 5000 * Math.cos(timer + i);
      sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
    }

    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  render() {
    return (
      <div
        style={{ height: '100%', width: '100vw' }}
        ref={mount => (this.mount = mount)}
      />
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
