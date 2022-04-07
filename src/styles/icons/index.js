import {
    faBars, faBook, faBookmark, faChevronDown, faChevronRight, faColumns, faCompactDisc, faEnvelopeOpenText,
    faEye,
    faFile,
    faFileAlt, faFileAudio,
    faFileCode,
    faFolder, faHome, faImage, faImages, faLightbulb, faMemory, faMoon, faPlus, faSearch, faSun, faTextHeight,
    faTimes,
    faUserSecret, faVideo
} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(
    faUserSecret,
    faTimes,
    faBars,
    faEye,
    faFolder,
    faFile,
    faFileAlt,
    faFileCode,
    faImage,
    faVideo,
    faColumns,
    faFileAudio,
    faTextHeight,
    faEnvelopeOpenText,
    faLightbulb,
    faHome,
    faSearch,
    faBook,
    faBookmark,
    faImages,
    faPlus,
    faCompactDisc,
    faMemory,
    faMoon,
    faSun,
    faChevronDown,
    faChevronRight,
)

export default function (app) {
    app.component("FontAwesomeIcon", FontAwesomeIcon)
}
