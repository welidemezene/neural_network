import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance, Float, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// 1. PARTICLES LOGIC
function NetworkParticles({ count = 60 }) {
  const points = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ],
      speed: Math.random() * 0.5 + 0.2
    }))
  }, [count])

  return (
    <Instances range={count}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial 
        color="#000" 
        emissive="#3B82F6" 
        emissiveIntensity={4} 
        toneMapped={false} 
      />
      {points.map((pt, i) => (
        <FloatingNode key={i} {...pt} />
      ))}
    </Instances>
  )
}

function FloatingNode({ position, speed }) {
  const ref = useRef()
  const offset = useMemo(() => Math.random() * 100, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 1
    ref.current.position.x = position[0] + Math.cos(t * speed + offset) * 0.5
  })

  return <Instance ref={ref} position={position} />
}

// 2. WIREFRAME CAGE
function Connections() {
    return (
        <group>
            <mesh scale={[12, 12, 12]}>
                 <icosahedronGeometry args={[1, 1]} />
                 <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.05} />
            </mesh>
            <mesh scale={[8, 8, 8]} rotation={[0.5, 0.5, 0]}>
                 <icosahedronGeometry args={[1, 0]} />
                 <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    )
}

// 3. EXPORT THE COMPONENT
// This creates its own Canvas so it's easy to drop in anywhere
export function NeuralNodes() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
      <ambientLight intensity={0.5} />
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <NetworkParticles count={60} />
          <Connections />
      </Float>

      <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
      </EffectComposer>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}