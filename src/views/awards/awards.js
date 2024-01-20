import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../components/authprovider/authprovider';
import Navbar from '../../components/navbar/navbar';
import { Link } from 'react-router-dom';
import AwardDetails from '../awarddetails/awarddetails';

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

    const handleDownload = (downloadURL) => {
        window.open(downloadURL, '_blank');
    };

    return (
        <div>
            <Navbar />
            <h2>Awards List</h2>

            <p>Awards can be viewed on browser or downloaded for later use.</p>

            {Object.keys(organizedAwards).map((type) => (
                <div key={type}>
                    <h3>{type} Awards</h3>
                    <ul>
                        {organizedAwards[type].map((award) => (
                            <li key={award.id}>
                                <Link to={`/awards/${award.id}`}>{award.awardName}</Link>
                                <span style={{ margin: '0 10px' }}></span>
                                <button onClick={() => handleDownload(award.downloadURL)}>Download</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Awards;
