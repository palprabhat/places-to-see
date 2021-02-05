import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PLACE_QUERY, GET_PLACE_BY_ID_QUERY } from "src/gql";
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
import Modal from "src/components/Modal";
import {
  DeletePlaceMutation,
  DeletePlaceMutationVariables,
} from "../../../src/generated/DeletePlaceMutation";
import { useToasts } from "react-toast-notifications";
import { urls } from "src/consts/urls";

type PlaceIdFC<P = {}> = FC<P> & additionalType;

const PlaceId: PlaceIdFC = () => {
  const [editMode, setEditMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { addToast } = useToasts();
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const [deletePlace] = useMutation<
    DeletePlaceMutation,
    DeletePlaceMutationVariables
  >(DELETE_PLACE_QUERY);

  const { data, loading, error, refetch } = useQuery<
    GetPlaceByIdQuery,
    GetPlaceByIdQueryVariables
  >(GET_PLACE_BY_ID_QUERY, { variables: { id: (id as string) ?? "" } });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { errors, data: deleteData } = await deletePlace({
        variables: { id: id as string } ?? "",
      });

      if (errors && errors.length) {
        errors.map((error) => {
          throw new Error(
            error.message ?? "Something went wrong! Please try again later"
          );
        });
      }

      if (deleteData) {
        addToast("Place deleted", {
          appearance: "success",
        });

        router.push(urls.home);
      }
    } catch (err) {
      console.error(`😱: ${err}`);
      addToast(err.message ?? "Something went wrong! Please try again later.", {
        appearance: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

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
              <Button className="text-2xl" onClick={() => setEditMode(true)}>
                <MdEdit />
              </Button>
              <Button
                variant="danger"
                className="text-2xl"
                onClick={() => setShowDeleteModal(true)}
              >
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
      <Modal
        id="place-delete-modal"
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="h-40 w-72 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-center">
            Are you sure to delete this place?
          </div>
          <div className="flex justify-around mt-8 w-full">
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

PlaceId.withMapView = true;

export default PlaceId;
