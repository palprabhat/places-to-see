import { GetServerSideProps, NextApiRequest } from "next";
import { useRouter } from "next/router";
import { loadIdToken } from "src/auth/firebaseAdmin";
import PlaceForm from "src/components/PlaceForm";
import { Button } from "src/components/ui";
import { LOCAL_STORAGE_VIEWPORT, urls, ViewportFullHeight } from "src/consts";
import Layout from "src/components/Layout";
import { ViewState } from "react-map-gl";
import AddPlaceMap from "src/components/AddPlaceMap";
import { useLocalStorage } from "src/hooks";
import { useState } from "react";

const Add = () => {
  const router = useRouter();
  const [localViewport] = useLocalStorage<ViewState>(LOCAL_STORAGE_VIEWPORT, {
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 13,
  });
  const [searchedViewport, setSearchedViewport] = useState<ViewState>(
    localViewport
  );

  return (
    <Layout
      leftChildren={
        <div
          className="mx-auto overflow-y-scroll p-8"
          style={{ maxWidth: "780px", height: ViewportFullHeight }}
        >
          <div className="flex justify-end space-x-4 mt-1">
            <Button asLink href={urls.home}>
              Cancel
            </Button>
          </div>
          <PlaceForm
            onSubmitted={(id) => {
              router.push(`${urls.places}/${id}`);
            }}
            searchedCoordiantes={({ latitude, longitude }) =>
              setSearchedViewport((viewport) => {
                return { ...viewport, latitude, longitude };
              })
            }
          />
        </div>
      }
      rightChildren={<AddPlaceMap searchedViewport={searchedViewport} />}
    />
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
