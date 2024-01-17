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

    return (
        <div>
            <Navbar />
            <h2>Awards List</h2>
            <ul>
                {awards.map((award) => (
                    <li key={award.id}>
                        <p>Award Name: {award.awardName}</p>
                        <p>Award Type: {award.awardType}</p>
                        <img src={award.downloadURL} alt="Award" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Awards;
