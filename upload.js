import 'dotenv/config';
import fetch from 'node-fetch';
import {uploadToDownload} from "./transcribeAudio.js";
const url = "https://api.assemblyai.com/v2/transcript";
function uploading(audioUrl) {
    //let args = process.argv.slice(2);
    //let audioUrl = args[0];
    var output = '';
    const data = {
    "audio_url": audioUrl
    };

    const params = {
    headers: {
        "authorization": process.env.ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST"
    };

    fetch(url, params)
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        console.log('ID:', data['id']);
        output = data['id'];
        uploadToDownload(output);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
export {uploading};