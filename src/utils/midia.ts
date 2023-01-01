import { ImageSourcePropType } from "react-native";
import { API_BASE_URL } from "../services/core/api";

const PLACEHOLDER_IMAGES = {
    picture: require("../assets/images/icone_picture.png"),
    material: require("../assets/images/icone_tool.png"),
    avatar: require("../assets/images/icone_avatar.png")
}

export default class MidiaUtils {
    static getURLImage(uri?: string, placeholder: ImagePlaceholder = "material", externalURI = false): ImageSourcePropType {
        
        if (!uri) return PLACEHOLDER_IMAGES[placeholder]
        return { uri: (!externalURI ? API_BASE_URL : "") + uri.replace(/^\/lutagrohml\//, '').replace(/^\/lutagro\//, '') }
    }
}

export type ImagePlaceholder = "material" | "avatar" | "picture"