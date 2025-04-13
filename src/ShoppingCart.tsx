import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { FBXLoader } from 'three-stdlib'
import * as THREE from 'three'

const Model = () => {
  const [model, setModel] = useState<THREE.Group | null>(null)

  useEffect(() => {
    const loader = new FBXLoader()
    loader.setPath('/')
    
    loader.load(
      'Milk.fbx',
      (object) => {
        setModel(object)
      }
    )
  }, [])

  useFrame((state: any, delta: number) => {
    if (model) {
      model.rotation.y += delta
    }
  })

  if (!model) return null

  return <primitive object={model} scale={0.1} />
}

const ShoppingCart = () => {
  return (
    <div className="p-4 bg-red-300 h-full">
      <div style={{ height: '500px', width: '100%' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Model />
            <OrbitControls />
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default ShoppingCart;