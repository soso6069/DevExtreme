import { getQuill } from "../quill_importer";
import { isObject } from "../../../core/utils/type";

const quill = getQuill();
const Image = quill.import("formats/image");

class ExtImage extends Image {
    static create(data) {
        const SRC = data && data.src || data;
        let node = super.create(SRC);

        if(isObject(data)) {
            const setAttribute = (attr, value) => {
                data[attr] && node.setAttribute(attr, value);
            };

            setAttribute("alt", data.alt);
            setAttribute("width", data.width);
            setAttribute("height", data.height);
        }

        return node;
    }

    static formats(domNode) {
        let formats = super.formats(domNode);
        const src = domNode.getAttribute("src");

        if(src) {
            formats["src"] = src;
        }

        if(domNode.style["float"]) {
            formats["float"] = domNode.style["float"];
        }

        return formats;
    }

    format(name, value) {
        if(name === "float") {
            this.domNode.style[name] = value;
        } else {
            super.format(name, value);
        }
    }

    static value(domNode) {
        return {
            src: domNode.getAttribute("src"),
            width: domNode.getAttribute("width"),
            height: domNode.getAttribute("height"),
            alt: domNode.getAttribute("alt")
        };
    }
}

ExtImage.blotName = "extendedImage";

export default ExtImage;
