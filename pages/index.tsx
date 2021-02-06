import { GetPlacesQuery } from "src/generated/GetPlacesQuery";
import { GetPlacesQueryVariables } from "../src/generated/GetPlacesQuery";
import { useQuery } from "@apollo/client";
import { GET_PLACES_QUERY } from "src/gql";
import { useLastData, useLocalStorage } from "src/hooks";
import Layout from "src/components/Layout";
import HomeMap from "src/components/HomeMap";
import { BoundsArray, PREFIX } from "src/consts";
import { useDebounce } from "src/hooks";
import PlaceList from "src/components/PlaceList";
import { useState } from "react";
import { ViewState } from "react-map-gl";

const parseBounds = (bounds: BoundsArray) => {
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};

export const Home = () => {
  const [focusedPlaceId, setFocusedPlaceId] = useState<string>("");

  const [searchedViewport, setSearchedViewport] = useState<ViewState>();
  const [dataBounds, setDataBounds] = useLocalStorage<BoundsArray>(
    `${PREFIX}bounds`,
    [
      [0, 0],
      [0, 0],
    ]
  );
  const debouncedDataBounds = useDebounce<BoundsArray>(dataBounds, 300);

  const { data, error } = useQuery<GetPlacesQuery, GetPlacesQueryVariables>(
    GET_PLACES_QUERY,
    {
      variables: { bounds: parseBounds(debouncedDataBounds) },
    }
  );

  const lastData = useLastData(data);

  if (error) {
    return (
      <Layout>
        <div>Error loading places</div>
      </Layout>
    );
  }

  return (
    <Layout
      leftChildren={
        <PlaceList
          places={lastData && lastData.places ? lastData.places : []}
          focusedPlaceId={focusedPlaceId}
          setFocusedPlaceId={setFocusedPlaceId}
          searchedCoordiantes={({ latitude, longitude }) =>
            setSearchedViewport((viewport) => {
              return { ...viewport, latitude, longitude, zoom: 11 };
            })
          }
        />
      }
      rightChildren={
        <HomeMap
          setDataBounds={setDataBounds}
          places={lastData && lastData.places ? lastData.places : []}
          focusedPlaceId={focusedPlaceId}
          setFocusedPlaceId={setFocusedPlaceId}
          searchedViewport={searchedViewport}
        />
      }
    />
  );
};

Home.title = "Home | Places to see";
Home.withMapView = true;

export default Home;
