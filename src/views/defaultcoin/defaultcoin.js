import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
    const { scene } = useGLTF("/TestCoin.glb");

    useFrame(({ clock }) => {
        scene.rotation.y = 0.2 * clock.getElapsedTime(); // rotation speed
    });

    return <primitive object={scene} {...props} />;
}

function DefaultCoin() {
    return (
        <Canvas dpr={[1, 1]} shadows camera={{ fov: 45 }} style={{ "position": "absolute" }}>
            <color attach="background" args={["#101010"]} />
            <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                <Stage adjustCamera intensity={0.05} environment="city">
                    <Model scale={0.01} />
                </Stage>
            </PresentationControls>
        </Canvas>
    );
}

export default DefaultCoin;
