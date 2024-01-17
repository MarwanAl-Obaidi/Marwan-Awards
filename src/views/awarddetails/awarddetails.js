import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

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
        <div>
            <h2>Award Details</h2>
            <p>Award ID: {awardDetails.id}</p>
            <p>Award Name: {awardDetails.awardName}</p>
            <p>Award Type: {awardDetails.awardType}</p>

            {awardDetails.fileExtension && (
                <>
                    <p>File Extension: {awardDetails.fileExtension}</p>
                    {awardDetails.fileExtension.match(/(jpg|jpeg|png|gif)$/i) ? (
                        <img
                            src={awardDetails.downloadURL}
                            alt={`Award ${awardDetails.awardName}`}
                            style={{ maxWidth: '100%' }}
                        />
                    ) : (
                        <p>This award type is not supported for direct display.</p>
                    )}
                </>
            )}

            {/* Add more details about the award as needed */}
        </div>
    );
};

export default AwardDetails;
