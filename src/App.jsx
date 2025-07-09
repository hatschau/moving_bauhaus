import React, { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import ModelViewer from './components/ModelViewer'
import VideoPlayer from './components/VideoPlayer'

const models = {
  "WalkCircle": "/models/Radiozauberer_WalkCircle.glb",
  "JazzDance": "/models/Radiozauberer_JazzDance.glb",
  "JazzPose": "/models/Radiozauberer_JazzPose.glb"
}

const videos = [
  "/videos/walkCircle.mp4",
  "/videos/jazzDance.mp4",
  "/videos/jazzPose.mp4"
]

export default function App() {
  const [selectedModel, setSelectedModel] = useState(models["WalkCircle"])
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetch('/description.txt')
      .then(res => res.text())
      .then(setDescription)
      .catch(err => {
        console.error("Fehler beim Laden der Beschreibung:", err)
        setDescription("Fehler beim Laden des Beschreibungstextes.")
      })
  }, [])


  // clear GLTF cache before loading new model
  useEffect(() => {
    useGLTF.clear(selectedModel)
  }, [selectedModel])

  // preload current model
  useGLTF.preload(selectedModel)

  return (
    <div className="app">
      <header className="header">
        <h1>Moving Bauhaus</h1>
      </header>
      <div className="description-container">
        <p>
          {description}
        </p>
      </div>
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
      <div className="video-gallery">
        {videos.map((url, i) => (
          <VideoPlayer key={i} url={url} />
        ))}
      </div>
      <div className="download-section">
        <h2>Animationen als glTF herunterladen</h2>
        <a href="/downloads/models.zip" download className="download-button">
          Download .zip
        </a>
      </div>
    </div>
  )
}
