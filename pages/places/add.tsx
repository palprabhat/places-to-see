import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import {
  FileInput,
  InputField,
  TextArea,
  Form,
  Button,
  SelectBox,
} from "src/components/ui";
import * as Yup from "yup";
import LocationSearch from "src/components/LocationSearch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import {
  CREATE_IMAGE_SIGNATURE_MUTATION,
  CREATE_PLACE_MUTATION,
} from "src/gql";
import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";
import { CreatePlaceMutation } from "src/generated/CreatePlaceMutation";
import { useToasts } from "react-toast-notifications";

interface IFormData {
  placeName: string;
  placeType: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image: FileList;
}

const validationSchema = Yup.object({
  placeName: Yup.string().required("Please provide a name for this place"),
  placeType: Yup.string().required("Please select a type for this place"),
  description: Yup.string().required(
    "Please provide a description for this place"
  ),
  address: Yup.string().required("Please select an address"),
  latitude: Yup.number()
    .required("Please select an address")
    .min(-90, "")
    .max(90, ""),
  longitude: Yup.number()
    .required("Please select an address")
    .min(-180, "")
    .max(180, ""),
  image: Yup.mixed()
    .required("Please add an image")
    .test("fileRequired", "Please add an image", (value) => {
      return value.length > 0;
    })
    .test("fileType", "Please upload only images", (value) => {
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          const match = value[0].type?.match(/^image\/.*$/);
          if (!match) return false;
        }
        return true;
      }

      return value?.type?.match(/^image\/.*$/);
    }),
});
interface IUploadImageResponse {
  secure_url?: string;
  error?: {
    message: string;
  };
}

const uploadImage = async (
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> => {
  const url = `${process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL}/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString() + "sf");
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? "");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (err) {
    throw new Error(err.message ?? err);
  }
};

const Add = () => {
  const { addToast } = useToasts();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    errors,
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const [createSignature] = useMutation<CreateSignatureMutation>(
    CREATE_IMAGE_SIGNATURE_MUTATION
  );

  const [createPlace] = useMutation<CreatePlaceMutation>(CREATE_PLACE_MUTATION);

  useEffect(() => {
    register({ name: "address" });
    register({ name: "latitude" });
    register({ name: "longitude" });
    register({ name: "placeType" });
  }, [register]);

  useEffect(() => {
    const image = watch("image");
    if (image.length > 0) {
      const file = image[0] as File;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage("");
    }
  }, [watch("image")]);

  const onSubmit = async (data: IFormData) => {
    setSubmitting(true);
    try {
      const {
        data: signatureData,
        errors: signatureErrors,
      } = await createSignature();

      if (signatureErrors && signatureErrors.length) {
        signatureErrors.map((error) => {
          throw new Error(
            error.message ?? "Something went wrong! Please try again later"
          );
        });
      }

      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;
        const imageData = await uploadImage(
          data.image[0] as File,
          signature,
          timestamp
        );

        if (imageData.error) {
          throw new Error(
            imageData.error.message ??
              "Something went wrong! Please try again later"
          );
        } else {
          const { data: placeData, errors: placceErrors } = await createPlace({
            variables: {
              input: {
                placeName: data.placeName,
                placeType: data.placeType,
                description: data.description,
                address: data.address,
                image: imageData.secure_url,
                coordinates: {
                  latitude: data.latitude,
                  longitude: data.longitude,
                },
              },
            },
          });

          if (placceErrors && placceErrors.length) {
            placceErrors.map((error) => {
              throw new Error(
                error.message ?? "Something went wrong! Please try again later"
              );
            });
          }

          if (placeData?.createPlace?.id) {
            addToast("Place added successfully", {
              appearance: "success",
            });
          } else {
            throw new Error("Something went wrong! Please try again later");
          }
        }
      }
    } catch (err) {
      console.error(`😱: ${err}`);
      addToast(err.message ?? "Something went wrong! Please try again later.", {
        appearance: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="overflow-y-scroll pb-8"
      style={{ height: "calc(100vh - 75px)" }}
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex flex-col items-center"
        style={{ maxWidth: "480px" }}
        register={register}
        errors={errors}
      >
        <h2 className="my-4 text-4xl">Add a new place</h2>
        <LocationSearch
          defaultValue=""
          onSelectAddress={({ address, lat, lng }) => {
            setValue("address", address.label, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("latitude", lat, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("longitude", lng, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          error={errors?.address || errors?.latitude || errors?.longitude}
        />
        <FileInput
          name="image"
          label="Click to add image"
          onBlur={() => trigger("image")}
        />
        {previewImage ? (
          <img
            src={previewImage}
            className="mt-4 object-cover w-full mb-8 rounded-md"
            style={{ maxHeight: "270px" }}
          />
        ) : null}
        <InputField name="placeName" placeholder="Name of the place" />
        <SelectBox
          id="place-type-select"
          name="placeType"
          placeholder="Place type"
          value={getValues("placeType")}
          options={[{ label: "1", value: "1" }]}
          onChange={(data) => {
            setValue("placeType", data ? data.value : "", {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          onBlur={() => trigger("placeType")}
        />
        <TextArea name="description" placeholder="About this place" />

        <Button type="submit" className="mt-4 w-full" disabled={submitting}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    res.setHeader("location", "/auth");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};

Add.title = "Add a new place | Places to see";
Add.withMapView = true;

export default Add;
