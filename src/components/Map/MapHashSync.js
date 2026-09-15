import { useEffect, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";

function parseHash(hash) {
  const value = hash.indexOf("#") === 0 ? hash.substring(1) : hash;
  const args = value.split("/");
  if (args.length !== 3) return null;

  const zoom = parseInt(args[0], 10);
  const lat = parseFloat(args[1]);
  const lon = parseFloat(args[2]);
  if (Number.isNaN(zoom) || Number.isNaN(lat) || Number.isNaN(lon)) return null;

  return { center: [lat, lon], zoom };
}

function formatHash(map) {
  const center = map.getCenter();
  const zoom = map.getZoom();
  const precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
  return `#${zoom}/${center.lat.toFixed(precision)}/${center.lng.toFixed(precision)}`;
}

// Keeps the URL hash in sync with the map view, mirroring qgis2web's L.Hash plugin.
export default function MapHashSync() {
  const map = useMap();
  const lastHash = useRef(null);
  const movingMap = useRef(false);

  useEffect(() => {
    const parsed = parseHash(window.location.hash);
    if (parsed) {
      movingMap.current = true;
      map.setView(parsed.center, parsed.zoom);
      movingMap.current = false;
    }
    lastHash.current = window.location.hash;
  }, [map]);

  useMapEvents({
    moveend() {
      if (movingMap.current) return;
      const hash = formatHash(map);
      if (lastHash.current !== hash) {
        window.history.replaceState(null, "", hash);
        lastHash.current = hash;
      }
    },
  });

  return null;
}
