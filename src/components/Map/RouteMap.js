import { useContext, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import Autolinker from "autolinker";
import "leaflet/dist/leaflet.css";

import laRouteData from "../../data/laRoute_1";
import routeStopsData from "../../data/route_2";
import { createLabelCollisionManager } from "./labelCollision";
import MapHashSync from "./MapHashSync";
import { LanguageContext } from "../../Language";
import "./RouteMap.css";

const CARTO_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const autolinker = new Autolinker({
  truncate: { length: 30, location: "smart" },
});

const ROUTE_LINE_STYLE = {
  opacity: 1,
  color: "rgba(227,26,28,1.0)",
  dashArray: "",
  lineCap: "round",
  lineJoin: "round",
  weight: 7,
  fillOpacity: 0,
  interactive: true,
};

const STOP_STYLE = {
  radius: 8,
  opacity: 1,
  color: "rgba(128,17,25,1.0)",
  dashArray: "",
  lineCap: "butt",
  lineJoin: "miter",
  weight: 4,
  fill: true,
  fillOpacity: 1,
  fillColor: "rgba(10,3,4,1.0)",
  interactive: true,
};

function makeBindRoutePopup(lang) {
  return function bindRoutePopup(feature, layer) {
    const id = feature.properties && feature.properties.id;
    const name = feature.properties?.name?.[lang];
    const label = name || (id != null ? String(id) : "");
    layer.bindPopup(
      `<table><tr><td colspan="2">${label ? autolinker.link(label) : ""}</td></tr></table>`,
      { maxHeight: 400 },
    );
  };
}

function makeBindStopPopupAndTooltip(lang) {
  return function bindStopPopupAndTooltip(feature, layer) {
    const chpt = feature.properties?.Chpt;
    const name = feature.properties?.name?.[lang];
    const label = name || (chpt ? `Ch.${chpt}` : "");
    const imgSrc = chpt ? `/images/routePhotos/arret${chpt}.jpg` : null;

    layer.bindPopup(
      `<div style="text-align:center;min-width:160px;">
        ${imgSrc ? `<img src="${imgSrc}" alt="${label}" style="width:160px;height:110px;object-fit:cover;border-radius:6px;margin-bottom:8px;display:block;" />` : ""}
        <div style="font-size:11px;color:#888;font-family:monospace;margin-bottom:2px;">Ch.${chpt}</div>
        <div style="font-size:13px;font-weight:600;color:#111;">${label}</div>
      </div>`,
      { maxHeight: 400 },
    );

    layer.bindTooltip(
      label
        ? `<div style="color:#ffffff;font-size:13pt;font-family:'Showcard Gothic',sans-serif;text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;">${label}</div>`
        : "",
      { permanent: true, offset: [0, -16], className: "route-stop-label" },
    );
  };
}

function AttributionPrefix() {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPrefix(
      '<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; ' +
        '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; ' +
        '<a href="https://qgis.org">QGIS</a>',
    );
  }, [map]);
  return null;
}

function StopLabels({ stopsLayerRef }) {
  const map = useMap();

  useEffect(() => {
    const stopsLayer = stopsLayerRef.current;
    if (!stopsLayer) return;

    const labelManager = createLabelCollisionManager(map);
    const reset = () => labelManager.resetLabels([stopsLayer]);

    reset();
    map.on("zoomend", reset);
    map.on("layeradd", reset);
    map.on("layerremove", reset);

    return () => {
      map.off("zoomend", reset);
      map.off("layeradd", reset);
      map.off("layerremove", reset);
    };
  }, [map, stopsLayerRef]);

  return null;
}

export default function RouteMap() {
  const stopsLayerRef = useRef(null);
  const { userLanguage } = useContext(LanguageContext);
  const lang = userLanguage === "fr" ? "fr" : "en";

  return (
    <MapContainer
      center={[44.8994, 6.64487]}
      zoom={17}
      minZoom={1}
      maxZoom={28}
      zoomControl
      className="route-map"
    >
      <AttributionPrefix />
      <MapHashSync />

      <TileLayer
        url={CARTO_TILE_URL}
        opacity={1}
        attribution={CARTO_ATTRIBUTION}
        minZoom={1}
        maxZoom={28}
        minNativeZoom={0}
        maxNativeZoom={18}
      />

      <GeoJSON
        key={`route-${lang}`}
        data={laRouteData}
        style={ROUTE_LINE_STYLE}
        onEachFeature={makeBindRoutePopup(lang)}
      />

      <GeoJSON
        key={`stops-${lang}`}
        ref={stopsLayerRef}
        data={routeStopsData}
        pointToLayer={(feature, latlng) => L.circleMarker(latlng, STOP_STYLE)}
        onEachFeature={makeBindStopPopupAndTooltip(lang)}
      />

      <StopLabels stopsLayerRef={stopsLayerRef} />
    </MapContainer>
  );
}
