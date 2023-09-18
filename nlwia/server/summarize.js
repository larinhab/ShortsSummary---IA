import { pipeline } from "@xenova/transformers"
import { summaryExample } from "./utils/summary.js"

export async function summarize(text){
    try {

        console.log("Loading...")

        const generator = await pipeline(
            "summarization", 
            "Xenova/distilbart-cnn-12-6")

        const output = await generator(text)

        console.log("Resume succefully done")
        return output[0].summary_text

    }catch (error){
        console.log("Error resume", error)
        throw new Error (error)
    }

}