import 'dotenv/config';
import fetch from 'node-fetch';
import {downloadToComplete} from "./transcribeAudio.js";

let args = process.argv.slice(2);
let id = args[0];

downloading(id);

function downloading(id) {
    

    //let args = process.argv.slice(2);
    //let id = args[0];
    const url = `https://api.assemblyai.com/v2/transcript/${id}`;
    var output = '';
    const params = {
        headers: {
            "authorization": process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        }, 
        method: "GET"
    };

    function print(data) {
        switch (data.status) {
            case 'queued':
            case 'processing':
                console.log('AssemblyAI is still transcribing your audio, please try again in a few minutes!');
                break;
            case 'completed':
                console.log(`Success: ${data}`);
                console.log(`Text: ${data.text}`);
                output = data.text;
                downloadToComplete(output);
                return false;
                break;
            default:
                console.log(`Something went wrong :-( : ${data.status}`);
                break;
        }
        return true;
    }
    function syncDelay(milliseconds){
        var start = new Date().getTime();
        var end = 0;
        while( (end-start) < milliseconds){
            end = new Date().getTime();
        }
    }
    fetch(url, params)
        .then(response => response.json())
        .then(data => {
                print(data);
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });

    /*fetch(url, params)
        .then(() => {
            var running = true;
            while(running) {
                console.log(`still running`);
                fetch(response => response.json())
                    .then(data => {running = print(data);});
                syncDelay(3000);
            }
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });*/
}
export {downloading};