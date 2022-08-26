import React, {useEffect} from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import Feature from 'ol/Feature';
import {fromLonLat} from 'ol/proj';
import {Point} from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';

function PublicMap() {


  const olmap = new OlMap({
    target: null,
    layers: [
      new OlLayerTile({
        source: new OlSourceOSM()
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [],
        })
      })
    ],
    view: new OlView({
      center: fromLonLat([80.7, 7.8]),
      zoom: 9
    })
  });


  useEffect(() => {
    olmap.setTarget("map");
  })

  function userAction() {
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition((position) => {

        const myLocation = new Feature({
          geometry: new Point(fromLonLat([80.7, 7.8])),// Center of Sri lanka as initial position
          style: new Style({
            image: new CircleStyle({
              radius: 10,
              fill: new Fill({
                color: 'rgb(231, 76, 60)',
              }),
            }),
          })
        });


        olmap.setView(new OlView({
          center: fromLonLat([position.coords.longitude, position.coords.latitude]),
          zoom: 12,
          smoothExtentConstraint: true,
          smoothResolutionConstraint: true
        }))

        olmap.setLayers([
          new OlLayerTile({
            source: new OlSourceOSM()
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [myLocation],
            })
          })
        ])
      }, () => {
        // setStatus('Unable to retrieve your location');
      });
    }
    // this.setState({ center: [546000, 6868000], zoom: 5 });
  }

  return (
    <div id="map" style={{width: "100%", height: "90vh"}}>
      <button onClick={userAction}>setState on click</button>
    </div>
  );

}

export default PublicMap;