import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_PLACE_BY_ID_QUERY } from "src/gql";
import { GetPlaceByIdQuery } from "src/generated/GetPlaceByIdQuery";
import { GetPlaceByIdQueryVariables } from "src/generated/GetPlaceByIdQuery";
import { Image } from "cloudinary-react";
import { FC, useState } from "react";
import { additionalType } from "src/utils";
import Head from "next/head";
import { IoLocationSharp } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "src/components/ui";
import PlaceForm from "src/components/PlaceForm";

type PlaceIdFC<P = {}> = FC<P> & additionalType;

const PlaceId: PlaceIdFC = () => {
  const [editMode, setEditMode] = useState(false);
  const {
    query: { id },
  } = useRouter();

  const { data, loading, error, refetch } = useQuery<
    GetPlaceByIdQuery,
    GetPlaceByIdQueryVariables
  >(GET_PLACE_BY_ID_QUERY, { variables: { id: (id as string) ?? "" } });

  if (loading) return <div>Loading</div>;
  if (error || !data || !data.place) return <div>{error}</div>;

  const { place } = data;

  return (
    <>
      <Head>
        <title>{place.address} | Places to see</title>
      </Head>
      <div
        className="overflow-y-scroll p-8 pt-4 mx-auto"
        style={{ maxWidth: "780px", height: "calc(100vh - 75px)" }}
      >
        <div className="flex justify-end space-x-4 mt-1">
          {editMode ? (
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          ) : (
            <>
              <Button onClick={() => setEditMode(true)} className="text-2xl">
                <MdEdit />
              </Button>
              <Button variant="danger" className="text-2xl">
                <MdDelete />
              </Button>
            </>
          )}
        </div>
        {editMode ? (
          <PlaceForm
            place={place}
            onSubmitted={() => {
              refetch();
              setEditMode(false);
            }}
          />
        ) : (
          <div className="flex flex-col items-start mt-4">
            <h2 className="text-3xl">{place.placeName}</h2>
            <p className="mt-1 text-sm text-gray-400">{place.placeType}</p>
            <div className="flex items-center mt-2">
              <IoLocationSharp className="mr-2" /> {place.address}
            </div>
            <Image
              className="object-cover w-full rounded-md mt-6"
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={place.publicId}
              alt={place.placeName}
              secure
              dpr="auto"
              quality="auto"
              width={900}
              height={Math.floor((9 / 16) * 900)}
              crop="fill"
              gravity="auto"
            />
            <p className="text-sm mt-4">{place.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

PlaceId.withMapView = true;

export default PlaceId;
