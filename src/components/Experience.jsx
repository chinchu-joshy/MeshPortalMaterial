import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  useTexture,
  Text,
  CameraControls,
} from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Fish } from "./Fish";
import { Dino } from "./Dino";
import { MushroomKing } from "./MushroomKing";
import { useFrame, useThree } from "@react-three/fiber";
import * as easing from "maath/easing";
export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlref = useRef();
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    if (active) {
      const tergetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(tergetPosition);
      controlref.current.setLookAt(
        0,
        0,
        7,
        tergetPosition.x,
        tergetPosition.y,
        tergetPosition.z,
        true
      );
    } else {
      controlref.current.setLookAt(0, 0, 13, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <OrbitControls />
      <CameraControls
        ref={controlref}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxZoom={0.01}
      />
      <MonsterStage
        texture="textures/realistic_v.jpg"
        name="Hi its me Dino"
        color={"#8c2f58"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
        id= {1}
      >
        <Dino position-y={-1.5} scale={1} hoverStatus={hovered === 1} />
      </MonsterStage>
      <MonsterStage
        texture="textures/fantasy_v.jpg"
        position-x={-4.5}
        rotation-y={Math.PI / 8}
        name="Hi its me Frog"
        color={"#d7b043"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
        id= {2}
      >
        <Fish position-y={-1.6} scale={1} hoverStatus={hovered === 2}/>
      </MonsterStage>
      <MonsterStage
        texture="textures/digital_painting_v.jpg"
        position-x={4.5}
        rotation-y={-Math.PI / 8}
        name="Hi its me Mushroom"
        color={"#2884b2"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
        id= {3}
      >
        <MushroomKing position-y={-1.6} scale={1} hoverStatus={hovered === 3}/>
      </MonsterStage>
    </>
  );
};
const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  id,
  ...props
}) => {
  const map = useTexture(texture);
  const portalRef = useRef();
  useFrame((state, delta) => {
    const openWorld = active === name;
    easing.damp(portalRef.current, "blend", openWorld ? 1 : 0, 0.2, delta);
  });
  return (
    <group {...props}>
      <Text
        font="font/Caprasimo/Caprasimo-Regular.ttf"
        fontSize={0.34}
        position={[0, -1.8, 0.06]}
        anchorY="bottom"
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        args={[3.5, 4, 0.1]}
        onDoubleClick={() => {
          setActive(active === name ? null : name);
        }}
        name={name}
        onPointerEnter={() => setHovered(id)}
        onPointerLeave={()=> setHovered(null)}
      >
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalRef}>
          <ambientLight intensity={0.5} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[10, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
