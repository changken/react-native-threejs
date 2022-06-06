import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Expo } from 'expo';
import {
  Scene,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  AmbientLight,
  BoxGeometry,
} from 'three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import OrbitControlsView from 'expo-three-orbit-controls';

export default function App() {
  const [camera, setCamera] = React.useState(null);

  let timeout;

  React.useEffect(() => {
    return () => clearTimeout(timeout);
  });

  const onContextCreate = async gl => {
    //THREE.js code here!

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(3, 3, 0);

    setCamera(camera);

    const ambientLight = new AmbientLight(0xdddddd);
    scene.add(ambientLight);

    // gl.canvas = {
    //   width: gl.drawingBufferWidth,
    //   height: gl.drawingBufferHeight,
    // };

    //create webglrenderer沒有dom element
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x000000);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhongMaterial({
      color: 0x0000ff,
    });

    const cube = new Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    camera.lookAt(cube.position);

    const render = () => {
      timeout = requestAnimationFrame(render);

      //render();
      renderer.render(scene, camera);

      gl.endFrameEXP();
    };

    render();
  };
  return (
    <OrbitControlsView style={{ flex: 1 }} camera={camera}>
      <GLView style={styles.container} onContextCreate={onContextCreate} />
    </OrbitControlsView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
