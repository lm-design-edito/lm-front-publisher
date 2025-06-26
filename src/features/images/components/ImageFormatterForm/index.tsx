import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Form } from "../../../../components/forms/Form";
import { FormSubmit }from "../../../../components/forms/FormSubmit";
import { FormFooter }from "../../../../components/forms/FormFooter";
import { FormInput }from "../../../../components/forms/FormInput";
import { useImageFormatToWidth } from "../../api/use-image-format-to-width";
import { QueriesStatus } from "../../../../components/QueriesStatus";
import { useState } from "react";
import { FormInputFile } from "../../../../components/forms/FormInputFile";

const imageFormatterFormSchema = zod.object({
    width: zod.coerce.number().min(1, "La largeur doit être supérieure à 0"),
    imageUpload: zod.instanceof(FileList).refine(files => files.length > 0, {
        message: "Veuillez sélectionner une image."
    })
});

type ImageFormatterFormValues = zod.infer<typeof imageFormatterFormSchema>;

export const ImageFormatterForm = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ImageFormatterFormValues>({
        resolver: zodResolver(imageFormatterFormSchema)
    });
    const [APIError, setAPIError] = useState<string | null>(null);

    const { mutate: imageFormatTowidth, isPending } = useImageFormatToWidth({
            onSuccess: (data) => {
                console.log('on success image width', data);
            },
            onError: (error) => {
                setAPIError(error.message); // Reset API error on new attempt
                console.error('Error Image format failed:', error);
            }
        });

    const onSubmit = (data: ImageFormatterFormValues) => {
        imageFormatTowidth({
            width: 800, // Example width, you can change it as needed
            file: data.imageUpload[0] // Access the first file from FileList
        })
        console.log("Form submitted with data:", data);
    };
    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="image-formatter-form">
            <FormInputFile 
                label="Image"
                labelProps={{ htmlFor: "image-upload" }}
                inputProps={{
                    id: "image-upload",
                    ...register("imageUpload") 
                }}
                error={errors['imageUpload']} // Replace 'imageUpload' with your actual field name
            />
            <FormInput
                className="image-formatter-form__input"
                label="Largeur souhaitée de l'image"
                inputProps={{
                    type: "number",
                    placeholder: "800",
                    ...register("width")
                }}
                error={errors['width']} // No error handling for this input, but you can add it if needed
                isValid={isValid} // Assuming the input is valid, you can change this based on your validation logic
            />
            <FormFooter>
                <FormSubmit isLoading={isPending}>
                    Formatter
                </FormSubmit>
                {APIError && <QueriesStatus status="error">{APIError}</QueriesStatus> }
            </FormFooter>
        </Form>
  );
}   