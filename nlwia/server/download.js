import ytdl from "ytdl-core";
import fs from "fs";
import { error } from "console";
import { resolve } from "path";
import { rejects } from "assert";

export const download = (videoId) =>  
    new Promise((resolve, reject) => { 
        const videoURL = "https://www.youtube.com/shorts/" + videoId;
        console.log("Downloading the video..." + videoId)   

    ytdl(videoURL, { 
        quality: "lowestaudio", 
        filter: "audioonly"
    })
        .on("info", (info) =>{
            const seconds = info.formats[0].approxDurationMs / 1000
            if(seconds > 60) {
                throw new error('Duration of the video is over 60 seconds')
        }

    }).on("end", () => {
        console.log("Download is over.")
        resolve()

    }).on("error", (error)=>{
        console.log("Unable to download the video. Error details:", error)
        reject(error)
        
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})

