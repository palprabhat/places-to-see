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

interface IFormData {
  placeName: string;
  placeType: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  images: FileList;
}

const validationSchema = Yup.object({
  placeName: Yup.string().required("Please provide a name for this place"),
  placeType: Yup.string().required("Please select a type for this place"),
  description: Yup.string().required(
    "Please provide a description for this place"
  ),
  address: Yup.string().required("Please select an address"),
  lat: Yup.number()
    .required("Please select an address")
    .min(-90, "")
    .max(90, ""),
  lng: Yup.number()
    .required("Please select an address")
    .min(-180, "")
    .max(180, ""),
  images: Yup.mixed()
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

const Add = () => {
  const [previewImage, setPreviewImage] = useState<string>("");

  const {
    handleSubmit,
    register,
    errors,
    setValue,
    getValues,
    watch,
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    register({ name: "address" });
    register({ name: "lat" });
    register({ name: "lng" });
    register({ name: "placeType" });
  }, [register]);

  useEffect(() => {
    const images = watch("images");
    if (images.length > 0) {
      const file = images[0] as File;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage("");
    }
  }, [watch("images")]);

  return (
    <div
      className="overflow-y-scroll pb-8"
      style={{ height: "calc(100vh - 75px)" }}
    >
      <Form
        onSubmit={handleSubmit((data) => console.log("data", data))}
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
            setValue("lat", lat, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("lng", lng, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          error={errors?.address || errors?.lat || errors?.lng}
        />
        <FileInput name="images" label="Click to add image" />
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
        />
        <TextArea name="description" placeholder="About this place" />

        <Button type="submit" className="mt-4 w-full">
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
