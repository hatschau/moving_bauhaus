import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import ModelViewer from './components/ModelViewer'

export default function App() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 1, 3] }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ModelViewer url="/models/Radiozauberer_JazzDance.glb" />
        </Suspense>
        <OrbitControls minDistance={1} maxDistance={10}/>
      </Canvas>
    </div>
  )
}