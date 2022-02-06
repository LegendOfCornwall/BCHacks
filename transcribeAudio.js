var newOutput;
//export function transcribe(path) {
    import {uploadingFile} from "./uploadFile.js";
    import {uploading} from "./upload.js";
    import {downloading} from "./download.js";

    let args = process.argv.slice(2);
    let audioPath = args[0];

    //console.log(uploading(audioPath));
    var out = uploadingFile(audioPath);//running uploadFile
    //console.log(`URL2: ${out}`);
    //console.log(`newOutput: ${newOutput}`);
//}

function fileToUpload(pass) {
    newOutput = pass;
    console.log(`URL Output: ${newOutput}`);
    uploading(pass);

}
function uploadToDownload(pass) {
    newOutput = pass;
    console.log(`ID Output: ${newOutput}`);
    downloading(pass);
}
function downloadToComplete(pass) {
    newOutput = pass;
    console.log(`Transcript: ${newOutput}`);
}
export {fileToUpload};
export {uploadToDownload};
export {downloadToComplete};