'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Accent color ──
const ACCENT = '#bf5700'
const ACCENT_DIM = '#8a3f00'

// ── Reusable material ──
const mat = (color: string, opacity = 0.8) =>
  new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })

// ── Helper: torus → edges → LineSegments ──
function torusEdges(
  radius: number,
  tube: number,
  radialSegments: number,
  tubeSegments: number,
  color = ACCENT,
  opacity = 0.8,
): THREE.LineSegments {
  const geo = new THREE.TorusGeometry(radius, tube, radialSegments, tubeSegments)
  const edges = new THREE.EdgesGeometry(geo)
  const line = new THREE.LineSegments(edges, mat(color, opacity))
  geo.dispose()
  return line
}

// ── Helper: sphere → edges → LineSegments ──
function sphereEdges(radius: number, color = ACCENT, opacity = 0.6): THREE.LineSegments {
  const geo = new THREE.SphereGeometry(radius, 24, 12, 0, Math.PI * 2, 0, Math.PI)
  const edges = new THREE.EdgesGeometry(geo)
  const line = new THREE.LineSegments(edges, mat(color, opacity))
  geo.dispose()
  return line
}

// ── Helper: radial lines from hub to outer ring ──
function radialLines(
  count: number,
  innerR: number,
  outerR: number,
  z: number,
  color = ACCENT,
  opacity = 0.4,
): THREE.LineSegments {
  const pts: number[] = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    pts.push(
      Math.cos(angle) * innerR,
      Math.sin(angle) * innerR,
      z,
      Math.cos(angle) * outerR,
      Math.sin(angle) * outerR,
      z,
    )
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  return new THREE.LineSegments(geo, mat(color, opacity))
}

// ── Helper: longitudinal lines (depth rails along the engine axis) ──
function longitudinalLines(
  count: number,
  radius: number,
  zStart: number,
  zEnd: number,
  color = ACCENT_DIM,
  opacity = 0.25,
): THREE.LineSegments {
  const pts: number[] = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    pts.push(x, y, zStart, x, y, zEnd)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  return new THREE.LineSegments(geo, mat(color, opacity))
}

// ── Turbofan Model ──
function TurbofanModel() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const t = performance.now() * 0.00015

    // Auto-rotate slowly on Y; mouse adds parallax tilt
    const targetX = mouse.current.y * 0.35
    const targetY = t + mouse.current.x * 0.25

    // Frame-rate independent exponential decay
    const k = 1 - Math.exp(-3.5 * delta)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      k,
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      k,
    )
  })

  // Build all geometry once
  const pieces = useMemo(() => {
    const items: { obj: THREE.Object3D; z: number }[] = []

    // ── Nacelle (outer casing) ──
    items.push({ obj: torusEdges(3.0, 0.07, 96, 24, ACCENT, 0.85), z: 0 })
    items.push({ obj: torusEdges(2.86, 0.04, 80, 20, ACCENT_DIM, 0.5), z: 0.18 })

    // ── Core casing ──
    items.push({ obj: torusEdges(1.2, 0.055, 72, 18, ACCENT, 0.75), z: 0.35 })

    // ── Fan spinner (center hub cone) ──
    items.push({ obj: sphereEdges(0.38, ACCENT, 0.55), z: 0.12 })

    // ── Fan blades ──
    items.push({ obj: radialLines(28, 0.45, 2.82, 0.14, ACCENT, 0.45), z: 0 })

    // ── Compressor stages (progressively smaller, deeper) ──
    const compStages = [
      { r: 1.08, z: 0.65, op: 0.6 },
      { r: 0.95, z: 0.9, op: 0.5 },
      { r: 0.82, z: 1.15, op: 0.4 },
    ]
    for (const s of compStages) {
      items.push({ obj: torusEdges(s.r, 0.03, 56, 14, ACCENT, s.op), z: s.z })
    }

    // ── Turbine stages (slightly wider range) ──
    const turbStages = [
      { r: 0.78, z: 1.55, op: 0.5 },
      { r: 0.88, z: 1.85, op: 0.4 },
    ]
    for (const s of turbStages) {
      items.push({ obj: torusEdges(s.r, 0.035, 56, 14, ACCENT, s.op), z: s.z })
    }

    // ── Exhaust ring ──
    items.push({ obj: torusEdges(1.1, 0.045, 72, 18, ACCENT_DIM, 0.5), z: 2.2 })

    // ── Longitudinal rails (nacelle depth lines) ──
    items.push({
      obj: longitudinalLines(16, 2.93, 0.05, 0.55, ACCENT_DIM, 0.2),
      z: 0,
    })

    // ── Core longitudinal rails ──
    items.push({
      obj: longitudinalLines(10, 1.17, 0.3, 2.1, ACCENT_DIM, 0.18),
      z: 0,
    })

    // ── Outer glow ring (subtle) ──
    items.push({
      obj: torusEdges(3.15, 0.02, 96, 8, ACCENT, 0.15),
      z: -0.05,
    })

    return items
  }, [])

  return (
    <group ref={groupRef}>
      {pieces.map(({ obj }, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  )
}

// ── Exported Scene ──
export function TurbofanWireframe({ className }: { className?: string }) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 1.8, 7], fov: 42, near: 0.1, far: 40 }}
        style={{ background: 'transparent' }}
      >
        <TurbofanModel />
      </Canvas>
    </div>
  )
}
