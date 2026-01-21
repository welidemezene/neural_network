import React from 'react'
import { NeuralNodes } from './components/NeuralNodes' // ✅ Correct Import

export default function App() {
  return (
    // 1. FULL SCREEN CONTAINER
    // We set width/height explicitly so the Canvas knows how big to be
    <div style={{ width: '100vw', height: '100vh', background: '#050507', position: 'relative' }}>
      
      {/* 2. TEXT OVERLAY */}
      <div style={{ position: 'absolute', top: 30, left: 30, zIndex: 10, color: 'white', fontFamily: 'sans-serif' }}>
        <h3 style={{ margin: 0, opacity: 0.5, letterSpacing: '2px' }}>LORI AI</h3>
        <h1 style={{ margin: 0, fontSize: '3rem', color: '#3B82F6' }}>DATA_CORE</h1>
      </div>

      {/* 3. THE 3D SCENE */}
      {/* It will fill the parent div automatically */}
      <NeuralNodes />
      
    </div>
  )
}