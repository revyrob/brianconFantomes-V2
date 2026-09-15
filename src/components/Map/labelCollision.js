import LabelGun from "labelgun";

// Ports qgis2web's labelgun-based permanent tooltip collision avoidance to a
// reusable helper that can be driven from React effects.
export function createLabelCollisionManager(map) {
  const hideLabel = (label) => {
    label.labelObject.style.opacity = 0;
    label.labelObject.style.transition = "opacity 0s";
  };

  const showLabel = (label) => {
    label.labelObject.style.opacity = 1;
    label.labelObject.style.transition = "opacity 1s";
  };

  const labelEngine = new LabelGun(hideLabel, showLabel);

  function ingestLayer(layer, id) {
    const tooltip = layer.getTooltip();
    const label = tooltip && tooltip._container;
    if (!label) return;

    const rect = label.getBoundingClientRect();
    const bottomLeft = map.containerPointToLatLng([rect.left, rect.bottom]);
    const topRight = map.containerPointToLatLng([rect.right, rect.top]);

    labelEngine.ingestLabel(
      {
        bottomLeft: [bottomLeft.lng, bottomLeft.lat],
        topRight: [topRight.lng, topRight.lat],
      },
      id,
      Math.floor(Math.random() * 4) + 1,
      label,
      `label-${id}`,
      false
    );

    if (!layer.added) {
      layer.addTo(map);
      layer.added = true;
    }
  }

  function resetLabels(layerGroups) {
    labelEngine.reset();
    let id = 0;
    layerGroups.forEach((group) => {
      group.eachLayer((layer) => {
        id += 1;
        ingestLayer(layer, id);
      });
    });
    labelEngine.update();
  }

  return { resetLabels };
}
