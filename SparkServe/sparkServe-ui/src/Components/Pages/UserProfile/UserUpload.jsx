import { useState } from 'react';

function Upload({ onUploaded }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const uploadFile = async () => {
        if (!file) {
            setError('Please select a file before uploading.');
            return;
        }

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
            const data = await s3.upload(params).promise();
            if (typeof onUploaded === 'function') {
                onUploaded(data.Location);
            }
            setError('');
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Error uploading file. Please try again.');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError('');
    };

    return (
        <div className="file-upload">
            <div className="file-input-container">
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="file-input" 
                    id="file-input"
                />
                <label htmlFor="file-input" className="file-input-label">
                    {file ? file.name : 'Choose File'}
                </label>
                <button 
                    onClick={uploadFile} 
                    className="upload-button"
                    disabled={!file}
                >
                    Upload Image
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Upload;