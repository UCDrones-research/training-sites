
require([
  "esri/Map",
  "esri/Basemap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/geometry/Extent",
  "esri/widgets/Expand",
  "esri/widgets/LayerList",
  "esri/widgets/BasemapToggle",
  "esri/layers/GroupLayer",
  "esri/widgets/Legend",
  "esri/layers/GraphicsLayer", 
  "esri/Graphic",
  "esri/Color",
], function (Map, Basemap, MapView, FeatureLayer, Extent, Expand, LayerList, BasemapToggle, GroupLayer, Legend, Color, GraphicsLayer, Graphic) {
	
  let siteLayerView;

  var classAirspace = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/ArcGIS/rest/services/Class_Airspace/FeatureServer/0",
    outFields: ["*"],

    visible: true,
    renderer: renderer_classAirspace,
    opacity: 0.8,
	minScale: max_Zoom_Out,
	maxScale: 0,
	title: "FAA Airspace Class",
    definitionExpression:
      "STATE = 'CA' AND (LOCAL_TYPE='CLASS_E2' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_B' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_C' AND LOWER_VAL=0 OR LOCAL_TYPE='CLASS_D' AND LOWER_VAL=0) AND (NAME<>'SANTA BARBARA AIRPORT CLASS E2') AND NAME<>'VAN NUYS CLASS E2' AND NAME<>'RIVERSIDE MARCH FIELD CLASS D' AND NAME<>'EDWARDS AFB CLASS E2' AND NAME<>'LANCASTER CLASS E2' AND NAME<>'BAKERSFIELD CLASS E2' AND NAME<>'LEMOORE NAS CLASS E2' AND NAME<>'MONTEREY PENINSULA AIRPORT CLASS E2' AND NAME<>'MOUNTAIN VIEW CLASS E2' AND NAME<>'SACRAMENTO EXECUTIVE AIRPORT CLASS E2'",
  });

  
  var uasFacilities = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/FAA_UAS_FacilityMap_Data_V3/FeatureServer/0",
    outFields: ["*"],

    minScale: max_Zoom_Fac,
    maxScale: 0,
    renderer: renderer_uasFacilities,
    labelingInfo: [UASFacilitiesLabels],
	visible: false,
    title: "UAS Facility  Maps",
    definitionExpression: "REGION = 'Western' AND APT1_ICAO<>'KNYL' AND APT1_ICAO<>'KIFP' AND APT1_ICAO<>'KLAS' AND APT1_ICAO<>'KHND' AND APT1_ICAO<>'KVGT' AND APT1_ICAO<>'KINS' AND APT1_ICAO<>'KTPH' AND APT1_ICAO<>'KNFL' AND APT1_ICAO<>'KRNO' AND APT1_ICAO<>'KLMT' AND APT1_ICAO<>'KMFR' AND APT1_ICAO<>'KOTH' AND APT1_ICAO<>'KEUG' AND APT1_ICAO<>'KBDN' AND APT1_ICAO<>'KBNO' AND APT1_ICAO<>'KBAM' AND APT1_ICAO<>'KGXF' AND APT1_ICAO<>'KRYN' AND APT1_ICAO<>'KTUS' AND APT1_ICAO<>'KDMA' AND APT1_ICAO<>'KFHU' AND APT1_ICAO<>'KOTH' AND APT1_ICAO<>'KDUG' AND APT1_ICAO<>'KPHX' AND APT1_ICAO<>'KLUF' AND APT1_ICAO<>'KGYR' AND APT1_ICAO<>'KCHD' AND APT1_ICAO<>'KIWA' AND APT1_ICAO<>'KFFZ' AND APT1_ICAO<>'KSDL' AND APT1_ICAO<>'KDVT' AND APT1_ICAO<>'KPRC' AND APT1_ICAO<>'KGCN' AND APT1_ICAO<>'KGEU' AND APT1_ICAO<>'KFLG' AND APT1_ICAO<>'KINW' AND APT1_ICAO<>'KSGU' AND APT1_ICAO<>'KCDC' AND APT1_ICAO<>'KBCE' AND APT1_ICAO<>'KSDL' AND APT1_ICAO<>'KDVT' AND APT1_ICAO<>'KPRC' AND APT1_ICAO<>'KGCN'",
	
	
  });

  var UASTestSite = new FeatureLayer({
    url:
      "https://services2.arcgis.com/wx8u046p68e0iGuj/arcgis/rest/services/UAS_Test_Sites/FeatureServer",
	  
    outFields: ["*"],
	title: "Flight Practice Sites",
	//definitionExpression: "OwnerType <> 'Caltrans' ",
	renderer: renderer_site,
	
	popupTemplate: {		
		title: "{Name}",
		content: [
			{
				type: "text",
				text: "<b>Owner:</b> {Owner}<br><b>Access:</b> {Access}<br><b>Size:</b> {Size}<br><b>Notes: </b> {Notes} <br><br><b>Site good for:</b>",
			},
			{
				type: "fields",
				fieldInfos: [
					{fieldName: "expression/simpletest"},
					{fieldName: "expression/performancetest"},
					{fieldName: "expression/begtraining"},
					{fieldName: "expression/pilottest"},
					{fieldName: "expression/advtest"},
					{fieldName: "expression/mission"}
				]
			}
		],
		expressionInfos:arcadeExpressionInfos
	},
	
  });

  var CalTransDistrictBound = new FeatureLayer({
    url:
      "https://gisdata.dot.ca.gov/arcgis/rest/services/Boundary/District_Tiger_Lines/MapServer/0",
    renderer: renderer_District,
    title: "Caltrans Districts",
    labelingInfo: [DistrictLabels],

  });


  var FAA_NS_NFZ = new FeatureLayer({
    url:
      "https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/DoD_Mar_13/FeatureServer/0",
    outFields: ["*"],

    visible: true,
    renderer: renderer_NFZ,
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
	 definitionExpression: "REGION = '05'",
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
	 renderer: renderer_NFZ,
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
	 definitionExpression: "STATE = 'CA'",
	 renderer: NPS_Renderer,
	 
	 popupTemplate: {
		title: "{UNIT_NAME}",
		content: "National Parks are generally a no-drone-zone.  Contact the Park for authorization",
	 }
  });


  var publicGroupLayers = new GroupLayer({
	  title: "Public Lands",
	  visible: false,
	  visibilityMode: "independent",
	  layers: [US_NPS, NFS_bounds, CA_State_Park],
  });
  
  var flyingsitesGroupLayers = new GroupLayer({
	 title: "Identified Flying Sites",
		visible: true,
		visibilityMode: "independent",
		layers: [FAA_rec_fields, UASTestSite],
  });
  
  var airspaceGroupLayers = new GroupLayer({
	 title: "FAA Airspace Information",
	 visible: true,
	 visibilityMode: "independent",
	 layers: [classAirspace, uasFacilities],
  });

  var map = new Map({
    basemap: "gray",
    layers: [
	  CalTransDistrictBound,
	  publicGroupLayers,
      airspaceGroupLayers,
	  
      FAA_NS_NFZ,
	  DL_NOTAM,
	  flyingsitesGroupLayers,	  
	  
    ],
  });

  var view = new MapView({
    container: "Map", 
    map: map, 
    zoom: 11, 
    center: [-120.420165, 37.363572], // longitude, latitude
  });
  
  var basemapToggle = new BasemapToggle({
	view: view,
	nextBasemap: "satellite"
  });
  
  view.ui.add(basemapToggle, "bottom-right");
  
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

  //Do some things after everything has loaded
  setTimeout(function(){
	layerList.operationalItems.reverse();
	
	var legend = new Legend({
	  view: view,
	  layerInfos: [
	  {
		layer: FAA_rec_fields,
		title: "FAA Sites",
	  },
	  {
		layer: UASTestSite,
		title: "Identified Flying Sites"
	  }
	  ],
	});
	view.ui.add(legend, "top-right");
	
  }, 2000);

  view.whenLayerView(UASTestSite).then(function (layerView) {

    siteLayerView = layerView;

    sitesElement.style.visibility = "visible";
    const sitesExpand = new Expand({
      view: view,
      content: sitesElement,
      expandIconClass: "esri-icon-filter",
      group: "top-left",
    });

    sitesExpand.watch("expanded", function () {
      if (!sitesExpand.expanded) {
        siteLayerView.filter = null;
      }
    });
    view.ui.add(sitesExpand, "top-left");
  });

});
