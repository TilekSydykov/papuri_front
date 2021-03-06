import {uuidv4} from "@/store/repo/functions";
import {Axios} from "../../axios/axios";

export const AudioAdapter = {
    fromBlock(block) {
        return `:audio ${block.data.id}`
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "Audio",
            data: {
                id: text.slice(text.indexOf(" ")+1)
            }
        }
    },
    fromBlockToHtml(block) {
        return `<p><audio controls> <source src="${
            Axios.generateMediaLink(block.data.id.slice(0, block.data.id.indexOf("-")))
        }"> </audio></p>`
    }
}
