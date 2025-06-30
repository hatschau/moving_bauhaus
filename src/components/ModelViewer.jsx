import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function ModelViewer({ url }) {
  const gltf = useGLTF(url)
  const { scene, animations } = gltf
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    return () => {
      if (actions) {
        Object.values(actions).forEach(action => action.stop())
      }
    }
  }, [url])

  useEffect(() => {
    if (actions && animations.length > 0) {
      Object.values(actions).forEach(action => {
        action.reset().play()
      })
    }
  }, [actions, animations])

  return <primitive object={scene} />
}
