import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

const Model = (props) => {
    const { scene } = useGLTF(props.url);

    useFrame(({ clock }) => {
        scene.rotation.y = 0.2 * clock.getElapsedTime(); // rotation speed
    });

    return <primitive object={scene} {...props} />;
};

const AwardDetails = () => {
    const { awardId } = useParams();
    const [awardDetails, setAwardDetails] = useState(null);

    useEffect(() => {
        const fetchAwardDetails = async () => {
            const db = getFirestore();
            const awardDocRef = doc(db, 'awards', awardId);

            try {
                const awardDocSnapshot = await getDoc(awardDocRef);

                if (awardDocSnapshot.exists()) {
                    setAwardDetails({ id: awardDocSnapshot.id, ...awardDocSnapshot.data() });
                } else {
                    console.error('Award not found');
                }
            } catch (error) {
                console.error('Error fetching award details:', error.message);
            }
        };

        fetchAwardDetails();
    }, [awardId]);

    if (!awardDetails) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {awardDetails.fileExtension && (
                <>
                    {awardDetails.fileExtension.match(/(jpg|jpeg|png|gif)$/i) ? (
                        <img
                            src={awardDetails.downloadURL}
                            alt={`Award ${awardDetails.awardName}`}
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    ) : (
                        <Canvas dpr={[1, 1]} shadows camera={{ fov: 45 }} style={{ "position": 'absolute' }}>
                            <color attach="background" args={["#101010"]} />
                            <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                                <Stage adjustCamera intensity={0.05} environment="city">
                                    <Model url={awardDetails.downloadURL} scale={0.01} />
                                </Stage>
                            </PresentationControls>
                        </Canvas>
                    )}
                </>
            )}
        </div>
    );
};

export default AwardDetails;
