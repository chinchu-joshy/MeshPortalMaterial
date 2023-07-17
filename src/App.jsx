import { Environment, useEnvironment } from "@react-three/drei";
import { Canvas ,useLoader  } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
function App() {

  const envMap = useEnvironment({files:"./image/HDR_111_Parking_Lot_2_Ref.hdr"})
  return (
    <Canvas shadows camera={{ position: [0,0,13], fov: 30 }}>
     
     
    <Environment map ={envMap} background/>
      <Experience />
    </Canvas>
  );
}

export default App;
