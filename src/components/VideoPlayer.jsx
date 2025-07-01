import React, { useRef, useState } from 'react'

export default function VideoPlayer({ url }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={url}
        width="100%"
        style={{ borderRadius: '8px' }}
        controls={false}
      />
      <button onClick={togglePlay} className="video-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}
