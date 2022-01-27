import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Leftchild from "../components/Leftchild";
import Expanime from "../components/Expanime";


export default function Query() {
    let params = useParams();
    const [description, setDescription] = useState([]);
    useEffect(() => {
        async function a() {
            const response = await axios.get("https://kitsu.io/api/edge/anime?filter%5Btext%5D=" + params.queryId + "8&page%5Blimit%5D=20");
            const b = await (response.data.data);
            setDescription(response.data.data[0].attributes.description);
            
        }
        a();
    }, []);



    document.title = `${params.queryId.charAt(0).toUpperCase() + params.queryId.slice(1)} | AnimeX`;

    return (
        <div className="sidebar-parent">
        <Leftchild />
        <div className="right-child">
        <div id="query-div">
        <h2 className="explore-title" style={{textTransform: 'capitalize'}}>{params.queryId}</h2>
        
        <Expanime
         api={"https://kitsu.io/api/edge/anime?filter%5Btext%5D=" + params.queryId + "8&page%5Blimit%5D=20"}
         />
         <Expanime 
         api={"https://kitsu.io/api/edge/anime?filter%5Btext%5D=" + params.queryId + "8&page%5Blimit%5D=20&page%5Boffset%5D=20"}
        />
        <Expanime 
         api={"https://kitsu.io/api/edge/anime?filter%5Btext%5D=" + params.queryId + "8&page%5Blimit%5D=20&page%5Boffset%5D=40"}
        />
         </div>
        </div>
        <div className="description">
      <h3 className="description-title">Description</h3>
      <span>{description}</span>
      
         </div>
        </div>
    );
}
