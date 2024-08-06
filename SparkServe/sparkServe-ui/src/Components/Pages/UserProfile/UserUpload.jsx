// import AWS from 'aws-sdk';
import { useState } from 'react';


function Upload({ onUploaded }) {
    const [file, setFile] = useState(null);

    const uploadFile = async () => {
        const S3_BUCKET = "sparkserve";
        const REGION = "us-east-2";

    window.AWS.config.update({
        accessKeyId: import.meta.env.VITE_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
        region: REGION,
    });

    const s3 = new window.AWS.S3();    
    const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
    };

    try {
        // console.log('Uploading to S3...');
        const data = await s3.upload(params).promise();
        // console.log('Upload successful, data:', data);
        if (typeof onUploaded === 'function') {
            // console.log('Calling onUploaded with:', data.Location);
            onUploaded(data.Location);
            } else {
            // console.log('onUploaded is not a function');
            }
            // alert("File uploaded successfully.");
        } catch (err) {
            console.error('Upload failed:', err);
            // alert("Error uploading file.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    return (
        <div className="file-upload">
        <div className="file-input-container">
            <input type="file" onChange={handleFileChange} className="file-input" />
            <button onClick={uploadFile} className="upload-button">Upload Image</button>
        </div>
        </div>
    );
}

export default Upload;