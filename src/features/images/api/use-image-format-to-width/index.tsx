import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../api";
import formatAPIError, { type FormattedAPIErrorType } from "../../../../api/format-api-error";

type UseImageFormatToWidthParams = Parameters<typeof api.queries.images.formatToWidth>[0]
type UseImageFormatToWidthReturn = Awaited<ReturnType<typeof api.queries.images.formatToWidth>>

export function useImageFormatToWidth(clbs?: {
    onSuccess?: (data: UseImageFormatToWidthReturn) => void,
    onError?: (error: FormattedAPIErrorType) => void,
}) {
    return useMutation({
        mutationFn: (params: UseImageFormatToWidthParams) => api.queries.images.formatToWidth(params),
        onSuccess: (data) => {
            if (!data.success) {
                clbs?.onError?.(formatAPIError(data));
                console.log('data success is false', data);
            }
            clbs?.onSuccess?.(data);
            
        },
        onError: (err) => {
            clbs?.onError?.(formatAPIError(err));
        }
    })
}