require(
    ["esri/config", 
    "esri/Map", 
    "esri/views/MapView", 
    
    "esri/Graphic", 
    "esri/layers/GraphicsLayer"], 
    function(esriConfig, Map, MapView, Graphic, GraphicsLayer) {
    esriConfig.apiKey = "AAPK223e10044f4d48f18a46cc39de0e1d5fYBVTIgQ_iSooxUUFk3D1Kdftvg1w5TujFnSM6aby0jsRsOSppzmFF9U8DrGOKXhK";

    // creates a map
    const map = new Map();

    map.basemap = "arcgis/topographic";

    // creates a MapView for storing the map
    const view = new MapView({
        map: map,
        zoom: 13, // Zoom level
        center: [30.52754147878994, 50.44050279488249], // Longitude, latitud
        container: "viewDiv" // html container
    });

    // creating and adding a graphicLayer for storing graphic objects in the map
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    let putEsBtn = document.getElementById("putEs"); // button from a user view
    let btnEnabled = false;

    putEsBtn.addEventListener("click", () => {
        btnEnabled = true;
    });

    view.on("click", function(event) {
        if (btnEnabled) {
            addGraphic(event.mapPoint);
        }

        btnEnabled = false;
    });

    function addGraphic(point) {
        const graphic = new Graphic({
            symbol: {
              type: "picture-marker",
              url: "https://sagewall.github.io/test-images/globe.svg",
              width: "32px",
              height: "32px",
            },
            geometry: point
          });
          view.graphics.add(graphic);

        // remove all graphics
        //   view.graphics.removeAll();
    }

    // change style for a map
    let styleSelect = document.getElementById("select-style");

    styleSelect.addEventListener("change", function(){
        let styleName = this.options[this.selectedIndex].value; // get style name of a map
        map.basemap = "arcgis/" + styleName;
    });
});