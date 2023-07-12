import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Fish } from "./Fish";
import { Dino } from "./Dino";
import { MushroomKing } from "./MushroomKing";
export const Experience = () => {
  return (
    <>
      <OrbitControls />

     
     <MonsterStage texture="textures/realistic_v.jpg">
     
      <Dino position-y={-1.5} scale={1} /> 
     </MonsterStage>
     <MonsterStage texture="textures/fantasy_v.jpg" position-x={-4.5} rotation-y={Math.PI/8}>
     <Fish position-y={-1.7} scale={1} /> 

     </MonsterStage>
     <MonsterStage texture="textures/digital_painting_v.jpg" position-x={4.5} rotation-y={-Math.PI/8}>
      <MushroomKing position-y={-1.6} scale={1} /> 

     </MonsterStage>

      
    </>
  );
};
const MonsterStage=({children,texture,...props})=>{
  const map = useTexture(texture);
  return <group {...props}>
    <RoundedBox args={[3, 4, 0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
          <ambientLight intensity={.7} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[10, 64, 64]} />
            <meshStandardMaterial
              map={map}
              side={THREE.BackSide}
            />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>

  </group>

}
