import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { forwardRef, useImperativeHandle, useRef } from 'react'
// @ts-nocheck
import * as THREE from 'three'
import fragment from './glsl/shader.frag'
import vertex from './glsl/shader.vert'

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
  },
  vertex,
  fragment
)

extend({ ShaderImpl })

// eslint-disable-next-line react/display-name
const Shader = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  useFrame((_, delta) => (localRef.current.time += delta))
  return <shaderImpl ref={localRef} glsl={THREE.GLSL3} {...props} attach="material" />
})

export default Shader
