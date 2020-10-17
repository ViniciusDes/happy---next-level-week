import React from "react";
import mapMarkerImg from "../images/map-marker.svg";
import {Link} from "react-router-dom";
import {FiPlus} from "react-icons/fi"


import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';
import {Map, TileLayer} from "react-leaflet";


function Orphanages(){
    return(
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="Happy" />
                <h2>Escolha um orfanato no mapa</h2>
                <p>
                Muitas crianças estão esperando a sua visita :)
                </p>
            </header>
            <footer>
                <strong>Goiás</strong>
                <span>
                    Goiânia
                </span>
            </footer>
        </aside>
        <Map 
            center={[-16.7614945,-49.335649]}
            zoom={15}
            style={{
                width: "100%", height: "100%"
            }}

        >
            {/* <TileLayer url="https:a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
        </Map>
       <Link to="" className="create-Orphanage" >
           <FiPlus size={32} color="#FFF" />
           
       </Link>
    </div>
    )
}

export default Orphanages;