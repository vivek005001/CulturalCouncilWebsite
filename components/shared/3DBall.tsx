// 3DBall.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Ball3D() {
  return (
    <Canvas className="h-full w-full">
      {/* Add some lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Create the 3D Ball */}
      <Sphere visible args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#ff6347"
          attach="material"
          distort={0.5} // distortion level
          speed={2} // distortion speed
          roughness={0}
        />
      </Sphere>

      {/* Allow the user to interact with the object */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
