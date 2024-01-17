import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../components/authprovider/authprovider';
import Navbar from '../../components/navbar/navbar';

const Awards = () => {
    const { user } = useAuth();
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        const fetchAwards = async () => {
            const db = getFirestore();
            const awardsCollection = collection(db, 'awards');
            const awardsSnapshot = await getDocs(awardsCollection);
            const awardsData = [];

            awardsSnapshot.forEach((doc) => {
                awardsData.push({ id: doc.id, ...doc.data() });
            });

            setAwards(awardsData);
        };

        fetchAwards();
    }, []);

    // Organize awards by type
    const organizedAwards = {};
    awards.forEach((award) => {
        if (!organizedAwards[award.awardType]) {
            organizedAwards[award.awardType] = [];
        }
        organizedAwards[award.awardType].push(award);
    });

    return (
        <div>
            <Navbar />
            <h2>Awards List</h2>

            {Object.keys(organizedAwards).map((type) => (
                <div key={type}>
                    <h3>{type} Awards</h3>
                    <ul>
                        {organizedAwards[type].map((award) => (
                            <li key={award.id}>
                                <p>{award.awardName}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Awards;
