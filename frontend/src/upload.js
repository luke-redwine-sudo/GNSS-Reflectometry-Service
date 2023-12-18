// Include the Axios library
// If you haven't installed Axios using npm, you can include it directly from a CDN
// Add the following line at the top of your main.js file
// import axios from 'axios';

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        document.getElementById('result').innerHTML = `File uploaded successfully. File ID: ${response.data.file_id}`;
    } catch (error) {
        console.error('Error uploading file:', error);
        document.getElementById('result').innerHTML = 'Error uploading file.';
    }
}
