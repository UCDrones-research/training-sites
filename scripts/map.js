require([
  "esri/Map",
  "esri/Basemap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/geometry/Extent",
  "esri/symbols",
  "esri/widgets/Popup",

], function (Map, Basemap, MapView, FeatureLayer, Extent, symbols, Popup) {
  /*##########################################################           Pop-up Templates            ##########################################################*/
  var classAirspaceTemplate = {
    title: "{NAME}",
    content: "<span id='airspaceClass'>Class {CLASS}</span>",
  };

  var flightRestrictionTemplate = {
    title: "{Base}",
    content: "No-Fly-Zone",
  };

  var FacilityMapTemplate = {
    title: "Facility Map Ceiling - {CEILING}ft",
    content: "Last Edit: {LAST_EDIT}",
  };

  /*##########################################################            Feature Layers            ##########################################################*/

  var FRrenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [255, 0, 0, 1],
      outline: {
        // makes the outlines of all features consistently light gray
        color: "lightgray",
        width: 0.5,
      },
    },
  };

  var defaultSym = {
    type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "lightgray",
      width: 0.5,
    },
  };

  var Renderdiff = {
    type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "red",
      width: 0.6,
    },
  };

  var FM_rend = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: Renderdiff,
    visualVariables: [
      {
        type: "color",
        field: "CEILING",

        stops: [
          {
            value: 0,
            color: "000000",
            label: "0 ft AGL",
          },
          {
            value: 400,
            color: "00FF00",
            label: "400 ft AGL",
          },
        ],
      },
    ],
  };

  var flightRestrictions = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/DoD_Mar_13/FeatureServer/",
    renderer: FRrenderer,
    outFields: ["*"],
    popupTemplate: flightRestrictionTemplate,
  });

  var classAirspacerendered = {
    type: "unique-value",
    field: "LOWER_VAL",
    field2: "LOCAL_TYPE",
    fieldDelimiter: ", ",

    defaultSymbol: {
      type: "simple-fill",
      style: "none",
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 0,
      },
    },
    uniqueValueInfos: [
      {
        value: "0, CLASS_E2",
        symbol: {
          //type: "web-style",
          //name: "airport",
          //styleName: "Esri2DPointSymbolsStyle"
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "cyan",
          style: "diagonal-cross",
          outline: {
            //autocasts as new SimpleLineSymbol()
            color: "orange",
            width: "2px",
          },
        },
      },
      {
        value: "0, CLASS_D",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "green",
          style: "diagonal-cross",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "orange",
            width: "2px",
          },
        },
      },
      {
        value: "0, CLASS_C",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "purple",
          style: "diagonal-cross",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "orange",
            width: "2px",
          },
        },
      },
      {
        value: "0, CLASS_B",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "yellow",
          style: "diagonal-cross",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "orange",
            width: "2px",
          },
        },
      },
    ],
  };

  var uasFacilitiesRenderer = {
    type: "unique-value",
    field: "CEILING",
    fieldDelimiter: ", ",

    defaultSymbol: {
      type: "simple-fill",
      color: "blue",
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 0,
      },
    }, // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [
      {
        value: "400",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "cyan",
          style: "none",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "cyan",
            width: "2px",
          },
        },
      },
      {
        value: "200",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "green",
          style: "none",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "orange",
            width: "2px",
          },
        },
      },
      {
        value: "100",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "purple",
          style: "none",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "purple",
            width: "2px",
          },
        },
      },
      {
        value: "0",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "yellow",
          style: "none",
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: "yellow",
            width: "2px",
          },
        },
      },
    ],
  };

  var FacilityMaps = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/FAA_UAS_FacilityMap_Data_V2/FeatureServer/",
    outFields: ["*"],
    popupTemplate: FacilityMapTemplate,
    renderer: FM_rend,
    opacity: 0.6,
    visible: false,
  });

  var classAirspace = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/ArcGIS/rest/services/Class_Airspace/FeatureServer/0",
    outFields: ["*"],
    //popupTemplate: classAirspaceTemplate,
    visible: true,
    renderer: classAirspacerendered,
    opacity: 0.8,
    definitionExpression:
      "LOCAL_TYPE='CLASS_E2' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_B' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_C' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_D' AND LOWER_VAL=0",
  });

  var uasFacilities = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/FAA_UAS_FacilityMap_Data_V3/FeatureServer/0/query?outFields=*&where=1%3D1",
    outFields: ["*"],
    //popupTemplate: classAirspaceTemplate,
    visible: true,
    renderer: uasFacilitiesRenderer,
    opacity: 0.8,
    definitionExpression:
      "CEILING='0' OR CEILING='50' OR CEILING='100' OR CEILING='200' OR CEILING='400'",
  });

  var CalTransDistrictBound = new FeatureLayer({
    url:
      "https://gisdata.dot.ca.gov/arcgis/rest/services/Boundary/District_Tiger_Lines/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    opacity: 0.5,
    color: "yellow",
  });

  var CalTransCountyBound = new FeatureLayer({
    url:
      "https://services.arcgis.com/BLN4oKB0N1YSgvY8/arcgis/rest/services/Counties_in_California/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    opacity: 0.5,
    color: "red",
  });

  var map = new Map({
    basemap: "gray",
    layers: [
      //flightRestrictions,
      //FacilityMaps,
      classAirspace,
      //uasFacilities,
      //CalTransDistrictBound,
      //CalTransCountyBound,
    ],
  });

  var view = new MapView({
    container: "Map", // Reference to the view div created in step 5
    map: map, // Reference to the map object created before the view
    zoom: 7, // Sets zoom level based on level of detail (LOD)
    center: [-120.420165, 37.363572], // longitude, latitude
  });
});
