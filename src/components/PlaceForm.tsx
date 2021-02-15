import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { Button, FileInput, Form, InputField, SelectBox, TextArea } from "./ui";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";
import {
  CREATE_IMAGE_SIGNATURE_MUTATION,
  CREATE_PLACE_MUTATION,
  UPDATE_PLACE_QUERY,
} from "src/gql";
import { CreatePlaceMutation } from "src/generated/CreatePlaceMutation";
import LocationSearch from "./LocationSearch";
import { UpdatePlaceMutation } from "src/generated/UpdatePlaceMutation";
import { UpdatePlaceMutationVariables } from "src/generated/UpdatePlaceMutation";
import { CreatePlaceMutationVariables } from "src/generated/CreatePlaceMutation";
import CloudinaryImage from "./ui/CloudinaryImage";
import placeTypeData from "src/data/places-type.json";

interface IFormData {
  placeName: string;
  placeType: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image: FileList;
  publicId: string | undefined;
}

interface IPlace {
  id: string;
  placeName: string;
  placeType: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  publicId: string;
}

interface IPlaceFormProps {
  place?: IPlace;
  onSubmitted: (id: string) => void;
  searchedCoordinates: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
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
  publicId: Yup.string().optional(),
  image: Yup.mixed().when("publicId", {
    is: (val: string) => (val ? false : true),
    then: Yup.mixed()
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
    otherwise: Yup.mixed().notRequired(),
  }),
});

interface IUploadImageResponse {
  secure_url: string;
  error?: {
    message: string;
  };
}

// const getNetworkErrors = (error: any) => {
//   error.networkError.response
//     .json()
//     .then((e: any) => e.errors.map((e: any) => e.message).join(","));
// };

// catch(error => {
//   if (error.networkError) {
//     getNetworkErrors(error).then(console.log)
//   } else {
//     console.log(error.message)
//   }
// })

// error.networkError.result.errors;

const uploadImage = async (
  image: File,
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> => {
  const url = `${process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL}/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
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

const PlaceForm: FC<IPlaceFormProps> = ({
  place,
  onSubmitted,
  searchedCoordinates,
}) => {
  const { addToast } = useToasts();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    errors,
    setValue,
    watch,
    trigger,
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    defaultValues: place
      ? {
          placeName: place.placeName,
          placeType: place.placeType,
          description: place.description,
          address: place.address,
          latitude: place.latitude,
          longitude: place.longitude,
          publicId: place.publicId,
        }
      : {},
  });

  const [createSignature] = useMutation<CreateSignatureMutation>(
    CREATE_IMAGE_SIGNATURE_MUTATION
  );

  const [createPlace] = useMutation<
    CreatePlaceMutation,
    CreatePlaceMutationVariables
  >(CREATE_PLACE_MUTATION);

  const [updatePlace] = useMutation<
    UpdatePlaceMutation,
    UpdatePlaceMutationVariables
  >(UPDATE_PLACE_QUERY);

  useEffect(() => {
    register({ name: "address" });
    register({ name: "latitude" });
    register({ name: "longitude" });
    register({ name: "placeType" });
    register({ name: "publicId" });
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

  useEffect(() => {
    const resizeImage = () => {
      const img = document.querySelector("#image-preview") as
        | HTMLImageElement
        | undefined;
      if (img) {
        const imgWidth = img.clientWidth;
        const imgHeight = Math.floor((9 / 16) * imgWidth);
        img.setAttribute("style", `max-height: ${imgHeight}px`);
      }
    };

    if (previewImage) {
      resizeImage();
      setValue("publicId", "");
    }

    window.addEventListener("load", resizeImage);
    window.addEventListener("resize", resizeImage);
    return () => {
      window.removeEventListener("load", resizeImage);
      window.removeEventListener("resize", resizeImage);
    };
  }, [previewImage]);

  const handleCreatePlace = async (data: IFormData) => {
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
          const { data: placeData, errors: placeErrors } = await createPlace({
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

          if (placeErrors && placeErrors.length) {
            placeErrors.map((error) => {
              throw new Error(
                error.message ?? "Something went wrong! Please try again later"
              );
            });
          }

          if (placeData?.createPlace?.id) {
            addToast("Place added successfully", {
              appearance: "success",
            });
            onSubmitted(placeData.createPlace.id);
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

  const handleUpdatePlace = async (data: IFormData) => {
    setSubmitting(true);
    try {
      if (!place) {
        throw new Error("Something went wrong! Please try again later");
      }

      let image = place.image;

      if (!watch("publicId")) {
        const {
          data: signatureData,
          errors: signatureErrors,
        } = await createSignature();

        if (signatureErrors && signatureErrors.length) {
          const errors = signatureErrors.map(
            (error) =>
              error.message ?? "Something went wrong! Please try again later"
          );
          throw new Error(errors.join(", "));
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
          }

          image = imageData.secure_url;
        }
      }

      const { data: placeData, errors: placeErrors } = await updatePlace({
        variables: {
          id: place.id,
          input: {
            placeName: data.placeName,
            placeType: data.placeType,
            description: data.description,
            address: data.address,
            image: image,
            coordinates: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
          },
        },
      });

      if (placeErrors && placeErrors.length) {
        const errors = placeErrors.map(
          (error) =>
            error.message ?? "Something went wrong! Please try again later"
        );
        throw new Error(errors.join(", "));
      }

      if (!placeData?.updatePlace?.id) {
        throw new Error("Something went wrong! Please try again later");
      }

      addToast("Place updated successfully", {
        appearance: "success",
      });
      onSubmitted(placeData.updatePlace.id);
    } catch (err) {
      console.error(`😱: ${err}`);
      addToast(err.message ?? "Something went wrong! Please try again later.", {
        appearance: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (data: IFormData) => {
    place ? handleUpdatePlace(data) : handleCreatePlace(data);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
      register={register}
      errors={errors}
    >
      <h2 className="my-4 text-4xl">
        {place ? "Update place" : "Add a new place"}
      </h2>
      <LocationSearch
        defaultValue={place?.address ?? ""}
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
          searchedCoordinates({ latitude: lat, longitude: lng });
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
          id="image-preview"
          className="mt-4 object-cover w-full mb-8 rounded-md"
        />
      ) : place && watch("publicId") ? (
        <CloudinaryImage
          className="rounded-md mt-6"
          publicId={place.publicId}
          alt={place.placeName}
        />
      ) : null}
      <InputField name="placeName" placeholder="Name of the place" />
      <SelectBox
        id="place-type-select"
        name="placeType"
        placeholder="Place type"
        value={place?.placeType ?? ""}
        options={placeTypeData}
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
  );
};

export default PlaceForm;
