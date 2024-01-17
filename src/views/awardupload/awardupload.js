import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { useAuth } from '../../components/authprovider/authprovider';
import Navbar from '../../components/navbar/navbar';

const AwardUpload = () => {
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error('Please select a file.');
            return;
        }

        const storage = getStorage();
        const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setDownloadURL(url);
            console.log('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            {downloadURL && (
                <div>
                    <p>File uploaded successfully!</p>
                    <img src={downloadURL} alt="Uploaded File" />
                </div>
            )}
        </div>
    );
};

export default AwardUpload;
