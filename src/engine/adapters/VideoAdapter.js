import {uuidv4} from "@/store/repo/functions";
import {Axios} from "../../axios/axios";

export const VideoAdapter = {
    fromBlock(block) {
        return `:video ${block.data.id}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "Video",
            data: {
                id: text.slice(text.indexOf(" ")+1)
            }
        }
    },
    fromBlockToHtml(block) {
        return `<video controls> <source src="${
            Axios.generateMediaLink(block.data.id.slice(0, block.data.id.indexOf("-")))
        }"> </video>`
    }
}
