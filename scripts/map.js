var max_Zoom_Out = 2400000;

//https://developers.arcgis.com/javascript/latest/sample-code/widgets-layerlist-actions/index.html

require([
  "esri/Map",
  "esri/Basemap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/geometry/Extent",
  "esri/widgets/Expand",
  "esri/widgets/LayerList",
], function (Map, Basemap, MapView, FeatureLayer, Extent, Expand, LayerList) {
  let siteLayerView;

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
    }, // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [
      {
        value: "0, CLASS_E2",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [167, 98, 168, 0.3],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [167, 98, 168, 0.9],
            width: "6px",
            style: "dash",
          },
        },
      },
      {
        value: "0, CLASS_D",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [1, 135, 191, 0.3],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [1, 135, 191, 0.9],
            width: "6px",
            style: "dash",
          },
        },
      },
      {
        value: "0, CLASS_C",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [167, 98, 168, 0.3],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [167, 98, 168, 0.9],
            width: "6px",
          },
        },
      },
      {
        value: "0, CLASS_B",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [1, 135, 191, 0.3],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [1, 135, 191, 0.9],
            width: "6px",
          },
        },
      },
    ],
  };

  var uasFacilitiesRenderer = {
    type: "unique-value",
    field: "APT1_LAANC",
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
        // All features with value of "West" will be yellow
        value: 1,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "green",
          style: "none",
          outline: {
            width: 3,
            color: [0, 255, 0, 1],
          },
        },
      },
      {
        // All features with value of "South" will be red
        value: 0,
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "red",
          style: "none",
          outline: {
            width: 3,
            color: [200, 0, 0, 1],
          },
        },
      },
    ],
  };

  var DistrictRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [255, 128, 0, 0.0],
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 2,
        color: "white",
      },
    },
  };

  var DistrictLabels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#000000",
      haloSize: "4px",
      font: {
        size: "18px",
        family: "Noto Sans",
        style: "italic",
        weight: "normal",
      },
    },
    labelPlacement: "above-center",
    labelExpressionInfo: {
      expression: " 'District ' + $feature.DISTRICT",
    },
  };

  var UASFacilitiesLabels = {
    symbol: {
      type: "text",
      color: "#FF0000",
      haloColor: "#FFFFFF",
      haloSize: "1px",
      font: {
        size: "15px",
        family: "Noto Sans",
        weight: "normal",
      },
    },
    labelPlacement: "above-center",
    labelExpressionInfo: {
      expression: "$feature.CEILING",
    },
    minScale: 400000,
    maxScale: 0,
  };

  var NFZ_Renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [128, 0, 0, 0.6],
      outline: {
        // autocasts as new SimpleLineSymbol()
        width: 2,
        color: "red",
      },
    },
  };

  var TestSite_Renderer = {};

  var classAirspace = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/ArcGIS/rest/services/Class_Airspace/FeatureServer/0",
    outFields: ["*"],
    //popupTemplate: classAirspaceTemplate,
    visible: true,
    renderer: classAirspacerendered,
    opacity: 0.8,
    minScale: max_Zoom_Out,
    maxScale: 0,
    title: "FAA Airspace Class",
    definitionExpression:
      "STATE = 'CA' AND (LOCAL_TYPE='CLASS_E2' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_B' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_C' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_D' AND LOWER_VAL=0)",
  });

  var uasFacilities = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/FAA_UAS_FacilityMap_Data_V3/FeatureServer/0/query?outFields=*&where=1%3D1",
    outFields: ["*"],
    //popupTemplate: classAirspaceTemplate,
    minScale: max_Zoom_Out,
    maxScale: 0,
    renderer: uasFacilitiesRenderer,
    labelingInfo: [UASFacilitiesLabels],
    opacity: 0.8,
    title: "UAS Facility Maps",
    definitionExpression: "REGION = 'Western' ",
  });

  var CalTransDistrictBound = new FeatureLayer({
    url:
      "https://gisdata.dot.ca.gov/arcgis/rest/services/Boundary/District_Tiger_Lines/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    renderer: DistrictRenderer,
    title: "Caltrans Districts",
    labelingInfo: [DistrictLabels],
  });

  var CalTransCountyBound = new FeatureLayer({
    url:
      "https://services.arcgis.com/BLN4oKB0N1YSgvY8/arcgis/rest/services/Counties_in_California/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
    opacity: 0.1,
    color: "red",
  });

  var UASTestSite = new FeatureLayer({
    url:
      "https://services2.arcgis.com/wx8u046p68e0iGuj/arcgis/rest/services/UAS_Test_Sites/FeatureServer?token=Lht-1hBd8WuF59T6ujlr3nmiUzd2G6uhXTnrnmDeJYI7sgsDe3BXUhyfyD9syqZvkHipaUaE-Qd2tEmD4s3uxIhf6XgLUkvROK-ToitT5T2Vnnezt9LUh6UDROVlHiyRO3TF0iU6XKdp2ZR2yKzbQE3iBowp4cy3Regw70C8R0lMBXSCbk1ONqUqT5XTuQL7ntcAoBTyJ2FsXoOrNBq7-VvNCOQaQTCafSyXGEVdAgIGYsWW1qo--jMpVITzYU1b",
    outFields: ["*"],
    listMode: "hide",
  });

  var FAA_NS_NFZ = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/DoD_Mar_13/FeatureServer/0",
    outFields: ["*"],
    //popupTemplate: classAirspaceTemplate,
    visible: true,
    renderer: NFZ_Renderer,
    opacity: 0.8,
    minScale: max_Zoom_Out,
    maxScale: 0,
    listMode: "hide",
    definitionExpression: "STATE = 'CA'",
    //renderer: NFZ_Renderer,
  });

  var map = new Map({
    basemap: "satellite",
    layers: [
      classAirspace,
      uasFacilities,
      CalTransDistrictBound,
      //CalTransCountyBound,
      FAA_NS_NFZ,
      UASTestSite,
    ],
  });

  var view = new MapView({
    container: "Map", // Reference to the view div created in step 5
    map: map, // Reference to the map object created before the view
    zoom: 11, // Sets zoom level based on level of detail (LOD)
    center: [-120.420165, 37.363572], // longitude, latitude
  });

  //const sitesNodes = document.querySelectorAll(`.site-item`);
  const sitesElement = document.getElementById("sites-filter");

  // click event handler for sites choices
  sitesElement.addEventListener("click", filterBysite);

  function filterBysite(event) {
    var par = event.target.parentNode;
    var c = par.children;
    var i;
    for (i = 0; i < c.length; i++) {
      c[i].classList.remove("active");
    }

    event.target.classList.add("active");
    const selectedsite = event.target.getAttribute("data-site");
    siteLayerView.filter = {
      where: selectedsite + " = 1",
    };
  }

  var layerList = new LayerList({
    view: view,
  });
  // Adds widget below other elements in the top left corner of the view
  view.ui.add(layerList, {
    position: "top-right",
  });

  view.whenLayerView(UASTestSite).then(function (layerView) {
    // flash flood warnings layer loaded
    // get a reference to the flood warnings layerview
    siteLayerView = layerView;

    // set up UI items
    sitesElement.style.visibility = "visible";
    const sitesExpand = new Expand({
      view: view,
      content: sitesElement,
      expandIconClass: "esri-icon-filter",
      group: "top-left",
    });
    //clear the filters when user closes the expand widget
    sitesExpand.watch("expanded", function () {
      if (!sitesExpand.expanded) {
        siteLayerView.filter = null;
      }
    });
    view.ui.add(sitesExpand, "top-left");
    view.ui.add("titleDiv", "top-right");
  });
});
