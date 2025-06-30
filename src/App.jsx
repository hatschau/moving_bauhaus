import React, { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import ModelViewer from './components/ModelViewer'

const models = {
  "WalkCircle": "/models/Radiozauberer_WalkCircle.glb",
  "JazzDance": "/models/Radiozauberer_JazzDance.glb",
  "JazzPose": "/models/Radiozauberer_JazzPose.glb"
}

export default function App() {
  const [selectedModel, setSelectedModel] = useState(models["WalkCircle"])

  // clear GLTF cache before loading new model
  useEffect(() => {
    useGLTF.clear(selectedModel)
  }, [selectedModel])

  // preload current model
  useGLTF.preload(selectedModel)

  return (
    <div className="app">
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="dropdown"
      >
        {Object.entries(models).map(([label, path]) => (
          <option key={path} value={path}>{label}</option>
        ))}
      </select>

      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ModelViewer key={selectedModel} url={selectedModel} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}
