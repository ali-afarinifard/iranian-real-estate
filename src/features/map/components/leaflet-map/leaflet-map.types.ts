import type { Map, LayerGroup, DivIcon, Marker, LatLngBoundsExpression } from "leaflet";

export interface ILeafletModule {
  map: (container: HTMLElement, options?: object) => Map;
  control: {
    zoom: (options?: object) => { addTo: (map: Map) => void };
  };
  tileLayer: (url: string, options?: object) => { addTo: (map: Map) => void };
  layerGroup: () => LayerGroup;
  divIcon: (options: object) => DivIcon;
  marker: (latlng: [number, number], options?: object) => Marker;
  latLngBounds: (latlngs: [number, number][]) => LatLngBoundsExpression;
  Icon: {
    Default: {
      prototype: Record<string, unknown>;
      mergeOptions: (options: object) => void;
    };
  };
}

export interface ILeafletContainer extends HTMLDivElement {
  _leaflet_id?: number;
}