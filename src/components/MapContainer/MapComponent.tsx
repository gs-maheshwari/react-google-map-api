import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { MAP_SETTINGS } from "./constants";
import { Launches } from "../../hooks/use-service.types";

const { MARKER_SIZE } = MAP_SETTINGS;

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCSozCpAn3_xhiippC2_03Gd524yLtwu4E&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props: any) => {
  const locations: Array<Launches> = props.children || [];
  const { latitude = 0, longitude = 0 } =
    locations.length > 0 ? locations[0].pad : {};

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: Number(latitude), lng: Number(longitude) }}
    >
      {locations.map((location: Launches) => {
        const { id, pad, image } = location;
        const { latitude, longitude } = pad;
        return (
          <Marker
            key={id}
            position={{
              lat: Number(latitude),
              lng: Number(longitude),
            }}
            icon={{
              url: image,
              scaledSize: new window.google.maps.Size(MARKER_SIZE, MARKER_SIZE),
            }}
          />
        );
      })}
    </GoogleMap>
  );
});

export default MapComponent;
