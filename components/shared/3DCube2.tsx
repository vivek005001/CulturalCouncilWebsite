'use client';
import React, { useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Define a type for the props
interface CubeWithLogosProps {
  logos: string[]; // Array of image paths for the cube faces
}

const CubeWithLogos: React.FC<CubeWithLogosProps> = ({ logos }) => {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 5]} intensity={1} />
        <OrbitControls enableZoom={true} />
        {/* Pass logos as props to RotatingCube */}
        <RotatingCube logos={logos} />
      </Canvas>
    </div>
  );
};

// The cube with logos
interface RotatingCubeProps {
  logos: string[]; // Array of image paths for each face of the cube
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ logos }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load textures for each face of the cube using useLoader outside of map
  const textures = logos.map(logo => useLoader(THREE.TextureLoader, logo));

  // Rotate the cube
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Define materials for each face of the cube using the loaded textures
  const materials = textures.map(texture => (
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1 })
  ));

  return (
    <mesh ref={meshRef} rotation={[0.4, 0.2, 0]}>
      {/* Cube geometry */}
      <boxGeometry args={[2, 2, 2]} />
      {/* Apply 6 different materials (1 per face) */}
      {materials.map((material, index) => (
        <meshBasicMaterial key={index} attach={`material-${index}`} {...material} />
      ))}
    </mesh>
  );
};

export default CubeWithLogos;
