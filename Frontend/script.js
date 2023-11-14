function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);

  // Change the URL to your backend service endpoint
  const url = 'http://backend:8000/upload'; // Assuming 'upload' is the upload endpoint on the backend

  axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log('File uploaded:', response.data);
    alert('File uploaded successfully!');
  })
  .catch(error => {
    console.error('Error uploading file:', error);
    alert('Error uploading file');
  });
}
