/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, Suspense } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  Image,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';
import './FluidGlass.css';

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
      <Suspense fallback={null}>
        <Wrapper modeProps={modeProps}>
          <Typography />
          <Images />
        </Wrapper>
      </Suspense>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  geometryType = 'torus',
  ...props
}) {
  const ref = useRef();
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.2;

    const prevClearAlpha = gl.getClearAlpha();
    const prevClearColor = new THREE.Color();
    gl.getClearColor(prevClearColor);

    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    gl.setClearColor(prevClearColor, prevClearAlpha);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={ref} scale={scale ?? 0.8} {...props}>
        {geometryType === 'cube' ? (
          <boxGeometry args={[1.5, 1.5, 1.5]} />
        ) : geometryType === 'sphere' ? (
          <sphereGeometry args={[1.2, 64, 64]} />
        ) : (
          <torusGeometry args={[0.9, 0.35, 32, 100]} />
        )}
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.2}
          thickness={thickness ?? 1.5}
          anisotropy={anisotropy ?? 0.1}
          chromaticAberration={chromaticAberration ?? 0.05}
          transmission={1.0}
          roughness={0.08}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }) {
  return <ModeWrapper followPointer modeProps={modeProps} geometryType="torus" {...p} />;
}

function Cube({ modeProps, ...p }) {
  return <ModeWrapper followPointer modeProps={modeProps} geometryType="cube" {...p} />;
}

function Bar({ modeProps = {}, ...p }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      lockToBottom
      followPointer={false}
      geometryType="sphere"
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function Images() {
  return (
    <group>
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[2, 0.5, 3]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
      <mesh position={[0, -1.5, 1]}>
        <dodecahedronGeometry args={[1.1]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>
    </group>
  );
}

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.15 },
    tablet: { fontSize: 0.35 },
    desktop: { fontSize: 0.5 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Rakesh Kanna
    </Text>
  );
}
