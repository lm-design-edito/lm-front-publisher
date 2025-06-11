import { api } from "../../..";
import API_ROUTES from "../../../routes";

type ImagesFormatToWith = unknown; // @todo

export const imagesFormatToWidth = async (params: ImagesFormatToWith) => api.query(API_ROUTES.IMAGES_FORMAT_TO_WIDTH, {
    method: 'POST',
    body: JSON.stringify(params),
});
