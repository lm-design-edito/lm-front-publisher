import { api } from "../../..";
import API_ROUTES from "../../../routes";

type ImagesFormatToWith = {
    width: number;
    file: File;
}; 

export const imagesFormatToWidth = async (params: ImagesFormatToWith) => {
    const formData = new FormData();

    for (const key in params) {
        const _key = key as keyof typeof params;
        if (Object.prototype.hasOwnProperty.call(params, _key)) {
            const value = params[_key];
            if (typeof value === 'object' && value instanceof File) {
                formData.append('file', params.file);
            }
            formData.append(key, value.toString());
        }
    }

    return api.query(API_ROUTES.IMAGES_FORMAT_TO_WIDTH, {
        method: 'POST',
        body: formData
    });
};
