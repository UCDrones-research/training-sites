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
  "esri/widgets/BasemapToggle",
], function (Map, Basemap, MapView, FeatureLayer, Extent, Expand, LayerList, BasemapToggle) {
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

          color: [167, 98, 168, .3],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [167, 98, 168, .9],
            width: "3px",
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
            width: "3px",
            style: "dash",

          },
        },
      },
      {
        value: "0, CLASS_C",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [167, 98, 168, .3],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [167, 98, 168, .9],
            width: "3px",
          },
        },
      },
      {
        value: "0, CLASS_B",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [1, 135, 191, .3],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [1, 135, 191, .9],
            width: "3px",
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
        width: 0,
      },
    }, 
    uniqueValueInfos: [
		{
		  value: 1,
		  symbol: {
			type: "simple-fill",  // autocasts as new SimpleFillSymbol()
			color: [0, 128, 0, .3],
			outline: {
			  width: 3,
			  color: [0,255,0,1],
			}
		  }
		},
		{
		value: 0,
		symbol: {
		  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		  color: [255, 69, 0, .3],
		  outline: {
				width: 3,
				color: [255,99,71,1],
			  },
		  }
		}
	],
  };

  var DistrictRenderer = {
	 type: "simple",  // autocasts as new SimpleRenderer()
     symbol: {
		type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		color: [ 255, 128, 0, 0.0 ],
		outline: {  // autocasts as new SimpleLineSymbol()
		  width: 2,
		  color: "white"
		}
	  }
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
      weight: "normal"
    }
  },
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: " 'District ' + $feature.DISTRICT" 
  }
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
      weight: "normal"
    }
  },
  labelPlacement: "always-horizontal",
  labelExpressionInfo: {
    expression: "$feature.CEILING" 
  },
  minScale: 400000,
  maxScale: 0,
};

var NFZ_Renderer = {
	 type: "simple",  // autocasts as new SimpleRenderer()
     symbol: {
		type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		color: [ 128, 0, 0, 0.6 ],
		outline: {  // autocasts as new SimpleLineSymbol()
		  width: 2,
		  color: "red"
		}
	  }
  };
  
  var NPS_Renderer = {
	 type: "simple",  // autocasts as new SimpleRenderer()
     symbol: {
		type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		color: [ 255, 140, 0, 0.6 ],
		outline: {  // autocasts as new SimpleLineSymbol()
		  width: 2,
		  color: "orange"
		}
	  }
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
      haloSize: "2px",
      font: {
        size: "18px",
        family: "Noto Sans",
        style: "italic",
        weight: "normal",
      },
    },
    labelPlacement: "always-horizontal",
    labelExpressionInfo: {
      expression: " 'District ' + $feature.DISTRICT",
    },
  };
  
  var NFS_Labels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#000000",
      haloSize: "1px",
      font: {
        size: "14px",
        family: "Noto Sans",
        style: "normal",
        weight: "normal",
      },
    },
    labelPlacement: "always-horizontal",
    labelExpressionInfo: {
      expression: "$feature.FORESTNAME",
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
    labelPlacement: "always-horizontal",
    labelExpressionInfo: {
      expression: "$feature.CEILING",
    },
    minScale: 100000,
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

  
  var NFS_Renderer = {
	  type: "simple",
	  symbol: {
		  type: "simple-fill",
		  color: [0,128,0,0.4],
		  outline: {
			  width: 1.5,
			  color: "green",
		  },
	  },
  };
  
  var FAA_RF_Renderer = {
	  type: "simple",
	  symbol: {
		  type: "simple-fill",
		  color: [0,0,128,0.4],
		  outline: {
			  width: 1.5,
			  color: "blue",
		  },
	  },
  };
  
  

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
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/FAA_UAS_FacilityMap_Data_V3/FeatureServer/0",
    outFields: ["*"],
    //popupTemplate: classAirspaceTemplate,
    minScale: max_Zoom_Out,
    maxScale: 0,
    renderer: uasFacilitiesRenderer,
    labelingInfo: [UASFacilitiesLabels],
	visible: false,
    title: "UAS Facility Maps",
    definitionExpression: "REGION = 'Western' ",
	
  });

  var CalTransDistrictBound = new FeatureLayer({
    url:
      "https://gisdata.dot.ca.gov/arcgis/rest/services/Boundary/District_Tiger_Lines/MapServer/0",
    renderer: DistrictRenderer,
    title: "Caltrans Districts",
    labelingInfo: [DistrictLabels],

  });

  var CalTransCountyBound = new FeatureLayer({
    url:
      "https://services.arcgis.com/BLN4oKB0N1YSgvY8/arcgis/rest/services/Counties_in_California/FeatureServer/0",
    opacity: 0.1,
    color: "red",
	
  });

  var UASTestSite = new FeatureLayer({
    url:
      "https://services2.arcgis.com/wx8u046p68e0iGuj/arcgis/rest/services/UAS_Test_Sites/FeatureServer",
	  //"https://services2.arcgis.com/wx8u046p68e0iGuj/arcgis/rest/services/UAS_Test_Sites/FeatureServer?token=Lht-1hBd8WuF59T6ujlr3nmiUzd2G6uhXTnrnmDeJYI7sgsDe3BXUhyfyD9syqZvkHipaUaE-Qd2tEmD4s3uxIhf6XgLUkvROK-ToitT5T2Vnnezt9LUh6UDROVlHiyRO3TF0iU6XKdp2ZR2yKzbQE3iBowp4cy3Regw70C8R0lMBXSCbk1ONqUqT5XTuQL7ntcAoBTyJ2FsXoOrNBq7-VvNCOQaQTCafSyXGEVdAgIGYsWW1qo--jMpVITzYU1b",
    outFields: ["*"],
    listMode: "hide",
	
	popupTemplate: {
		title: "{Name}",
		content: "<b>Owner:</b> {Owner}<br><b>Access:</b> {Access}<br><b>Notes:</b> {Notes}",
	},
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
	
	popupTemplate: {
		title: "{Base} - {Facility}",
		content: "<b>FAA No Fly Zone</b><br><b>Reason:</b> {REASON}",
	},
  });
  
  var NFS_bounds = new FeatureLayer({
	 url:"https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_ForestSystemBoundaries_01/MapServer" ,
	 outFields:["*"],
	 title: "National Forests",
	 minScale: max_Zoom_Out,
     maxScale: 0,
	 renderer: NFS_Renderer,
	 labelingInfo: [NFS_Labels],
	 definitionExpression: "REGION = '05'",
	 visible: false,
	 popupTemplate: {
		 title: "{FORESTNAME}",
		 content: "Flight Operations within National Forests are not prohibited, but please contact the U.S. Forest Service if you want to operate in these areas. <b>Flight operations within Congressionally Designated Wilderness Areas are prohibited</b>",
	 }
  });
  
  var DL_NOTAM = new FeatureLayer({
	 url: "https://www.ocgis.com/uav/rest/services/Survey/OC_Flight_Restrictions/MapServer/0",
	 minScale: max_Zoom_Out,
	 maxScale: 0,
	 listMode: "hide",
	 renderer: NFZ_Renderer,
	 popupTemplate: {
		 title: "DISNEYLAND",
		 content: "<b>FAA No Fly Zone</b><br><b>Reason: </b>Disneyland TFR<br><b>Request Authorization</b>: <a href='HTTP://WWW.TSA.GOV/STAKEHOLDERS/AIRSPACE-WAIVERS-0' target='_blank'>HTTP://WWW.TSA.GOV/STAKEHOLDERS/AIRSPACE-WAIVERS-0</a>"
	 },
  });
  
  var FAA_rec_fields = new FeatureLayer({
	url: "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/Recreational_Flyer_Fixed_Sites/FeatureServer/0",
	outFields: ["*"],
	definitionExpression: "STATE = 'CA'",
	visible: true,
	minScale: max_Zoom_Out,
	maxScale: 0,	
	renderer: FAA_RF_Renderer,
	title: "FAA Recognized Recreational Flyer Fixed Sites",
	
	popupTemplate: {
		title: "Recreational Flyer Site",
		content: "<b>Club Name:</b> {SITE_NAME} <br>Contact the Club for Access Information",
	}
  });
  
  var CA_State_Park = new FeatureLayer({
	 url: "https://services2.arcgis.com/AhxrK3F6WM8ECvDi/arcgis/rest/services/ParkBoundaries/FeatureServer/0", 
	 outFields: ["*"],
	 definitionExpression: "SUBTYPE = 'Park Unit or Property'",
	 title: "CA State Parks",
	 minScale: max_Zoom_Out,
	 maxScale: 0,
	 visible: false,
	 
	 popupTemplate: {
		title: "{UNITNAME}",
		content: "Contact the Park for authorization<br><b>More Information: </b><a href='https://www.parks.ca.gov/?page_id=29229' target='_blank'>Drones in State Parks</a>",
	 }
  });
  
  var US_NPS = new FeatureLayer({
	 url: "https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/NPS_Land_Resources_Division_Boundary_and_Tract_Data_Service/FeatureServer/2",
	 outFields: ["*"],
	 title: "US National Parks",
	 minScale: max_Zoom_Out,
	 maxScale: 0,
	 visible: false,
	 definitionExpression: "STATE = 'CA'",
	 renderer: NPS_Renderer,
	 
	 popupTemplate: {
		title: "{UNIT_NAME}",
		content: "National Parks are generally a no-drone-zone.  Contact the Park for authorization",
	 }
  });


  var map = new Map({
    basemap: "gray",
    layers: [
	  CalTransDistrictBound,
	  US_NPS,
	  NFS_bounds,
	  CA_State_Park,
      classAirspace,
      uasFacilities,
	  FAA_rec_fields,
      FAA_NS_NFZ,
	  DL_NOTAM,
	  	  
	  UASTestSite,
    ],
  });

  var view = new MapView({
    container: "Map", // Reference to the view div created in step 5
    map: map, // Reference to the map object created before the view
    zoom: 11, // Sets zoom level based on level of detail (LOD)
    center: [-120.420165, 37.363572], // longitude, latitude
  });
  
  var basemapToggle = new BasemapToggle({
	view: view,
	nextBasemap: "satellite"
  });
  
  view.ui.add(basemapToggle, "bottom-right");
  

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
    container: "layers",
  });

  setTimeout(function(){
	layerList.operationalItems.reverse();
  }, 2000);


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
  });

});
