import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';
import {fileToUpload} from "./transcribeAudio.js";
function uploadingFile(audioPath) 
{
    const url = 'https://api.assemblyai.com/v2/upload';

    //let args = process.argv.slice(2);
    //let audioPath = args[0];
    var output = '';
    fs.readFile(audioPath, (err, data) => {
        if (err) {
            return console.log(err);
        }

        const params = {
            headers: {
                "authorization": process.env.ASSEMBLYAI_API_KEY,
                "Transfer-Encoding": "chunked"
        },
            body: data,
            method: 'POST'
    };
        fetch(url, params)
            .then(response => response.json())
            .then(data => {
                console.log(`URL: ${data['upload_url']}`);
                output = data['upload_url'];
                console.log(`output set`);
                fileToUpload(output);
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });
    });
    return output;
    console.log(5 + 6);
}
export {uploadingFile};