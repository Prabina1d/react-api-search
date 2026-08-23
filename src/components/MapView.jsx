import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";

import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import { fromLonLat } from "ol/proj";

import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import "ol/ol.css";

function MapView({ users }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSource = useRef(null);

  useEffect(() => {
    vectorSource.current = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: vectorSource.current,
    });

    const map = new Map({
      target: mapRef.current,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),

        vectorLayer,
      ],

      view: new View({
        center: fromLonLat([
          85.324,
          27.7172,
        ]),
        zoom: 2,
      }),
    });

    mapInstance.current = map;

    return () => {
      map.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (!vectorSource.current) {
      return;
    }

    vectorSource.current.clear();

    users.forEach((user) => {
      const latitude = Number(
        user.address?.geo?.lat
      );

      const longitude = Number(
        user.address?.geo?.lng
      );

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        return;
      }

      const marker = new Feature({
        geometry: new Point(
          fromLonLat([
            longitude,
            latitude,
          ])
        ),
        user,
      });

      marker.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 8,

            fill: new Fill({
              color: "#2563eb",
            }),

            stroke: new Stroke({
              color: "#ffffff",
              width: 2,
            }),
          }),
        })
      );

      vectorSource.current.addFeature(
        marker
      );
    });
  }, [users]);

  return (
    <div
      ref={mapRef}
      className="map"
    />
  );
}

export default MapView;
