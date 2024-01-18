import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { useAuth } from '../../components/authprovider/authprovider';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Navbar from '../../components/navbar/navbar';

const AwardUpload = () => {
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [awardName, setAwardName] = useState('');
    const [awardType, setAwardType] = useState('');
    const [downloadURL, setDownloadURL] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleAwardNameChange = (e) => {
        setAwardName(e.target.value);
    };

    const handleAwardTypeChange = (e) => {
        setAwardType(e.target.value);
    };

    const handleUpload = async () => {
        if (!file || !awardName || !awardType) {
            console.error('Please fill in all fields and select a file.');
            return;
        }

        const storage = getStorage();
        const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);

        try {
            // Upload the file
            await uploadBytes(storageRef, file);

            // Get the download URL of the uploaded file
            const url = await getDownloadURL(storageRef);
            setDownloadURL(url);

            // Get the file extension
            const fileExtension = file.name.split('.').pop().toLowerCase();

            const db = getFirestore();
            const awardsCollection = collection(db, 'awards');
            const newAwardDoc = await addDoc(awardsCollection, {
                userId: user.uid,
                awardName,
                awardType,
                fileExtension,
                downloadURL: url,
                createdAt: new Date(),
            });

            console.log('File uploaded successfully!');
            console.log('Award Name:', awardName);
            console.log('Award Type:', awardType);
            console.log('File Extension:', fileExtension);
            console.log('Firestore Document ID:', newAwardDoc.id);
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Upload Award</h2>
            <label>
                Award Name:
                <input type="text" value={awardName} onChange={handleAwardNameChange} />
            </label>
            <label>
                Award Type:
                <input type="text" value={awardType} onChange={handleAwardTypeChange} />
            </label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            {downloadURL && (
                <div>
                    <p>File uploaded successfully!</p>
                    <img src={downloadURL} alt="Uploaded file will appear here if it is a picture." />
                </div>
            )}
        </div>
    );
};

export default AwardUpload;
