import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function Animecard() {
    const [isClicked, setIsClicked] = useState(false);
    const [e,f] = useState([]);
    let params = useParams();
    const defaultImage = "https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png";
    useEffect(() => {
    async function a() {
        const response = await axios.get("https://kitsu.io/api/edge/anime?filter%5Bslug%5D=" + params.animeId); 
        const data = await response.data.data;
        
      f(data);
        


        const title = await response.data.data[0].attributes.titles;
        if (title.en === undefined) {
            document.title = (`${title.en_jp} | AnimeX `);
        } else {
            document.title = (`${title.en} | AnimeX `);
        }
    }
    
a();
}, []); 
console.log(e);


function handleClick() {
    setIsClicked(!isClicked);
}


    return (
    <>
      {
          e.map((item, index) => {
             return (<div key={index} className="grid grid-cols-6 relative h-screen grid-rows-3">
                <div className="cover-img relative col-span-6 w-full brightness-50">
                    {item.attributes.coverImage === null ? 
                        <img src={defaultImage} className="h-full w-[inherit] object-cover" /> 
                        : 
                        <img src={item.attributes.coverImage.original} className="h-[400px] w-[inherit] object-cover" />
                    }
                </div>
                
                <div className="poster-img relative col-start-2 m-auto brightness-75">
                    <img src={item.attributes.posterImage.original}
                      className="h-[inherit] w-[inherit]  rounded-md object-cover "
                     />
                </div>
                
                <div className="info relative block col-start-3 row-start-2 col-span-2 mt-[150px]">
                    
                    
                    {item.attributes.titles_en === undefined ? 
                    <h3 className="inline font-bold text-[#464646]">{item.attributes.titles.en_jp}</h3>
                    :
                    <h3 className="inline font-bold text-[#464646]">{item.attributes.titles_en}</h3>
                    }


                    <h5 className="inline text-[#999] font-bold ml-[2%]">{item.attributes.startDate.slice(0, 4)}</h5>
                   
                    <span className="text-[#1abc9c] block font-bold mt-[2%]">{item.attributes.averageRating + "% Community Approval"}</span>
                    <hr />

                    { item.attributes.description.length < 300 ? <p className="whitespace-pre-line">{item.attributes.description}</p> :
                     (isClicked ? 
                   <p className="whitespace-pre-line">
                     {item.attributes.description}
                     <button style={{"border": "none", "backgroundColor": "white", "color": "red"}} onClick={handleClick}>...Read Less</button>
                   </p> :
                   <p className="whitespace-pre-line">
                     {item.attributes.description.slice(0, 300) + "..."}
                     <button style={{"border": "none", "backgroundColor": "white", "color": "red"}} onClick={handleClick}>Read More</button>
                   </p>)
                   }
                   <hr />
                   
                   
                   
                   <a href="#" className="text-[#464646] no-underline hover:text-[#464646] ">{"❤ Rank #" + item.attributes.popularityRank + " (Most Popular Anime)"}</a>
                   <a href="#" className="text-[#464646] no-underline hover:text-[#464646] ml-[16%]">{"⭐ Rank #" + item.attributes.ratingRank + " (Highest Rated Anime)"}</a>
                   <hr />



                </div>


              </div>)
          })
      }
    
    </>
     )
}

export default Animecard;

// {e.map((item, index) => {
//     return (
//         <div key={index} className="relative h-screen grid grid-cols-6 grid-rows-3  " >
//             <div className="cover-img w-full absolute ">
//                 {item.attributes.coverImage === null ? 
//                 <img  src={defaultImage} className="mt-35 h-[400px] w-[inherit] brightness-50 " /> :
//                 <img src={item.attributes.coverImage.original} 
//                 className="mt-35 w-[inherit] h-[400px] brightness-50 object-none object-center " />}
//             </div>


//             <div className="poster-img h-[300px] w-[200px] absolute col-start-2  ">
//                 <img src={item.attributes.posterImage.original} 
//                     className="h-[inherit] w-[inherit] rounded-md "
//                 />
//             </div>
            
//             <div className="info relative col-start-3 row-start-2 auto-rows-max mt-[150px]  ">
//                 {item.attributes.titles.en === undefined ? <h3>{item.attributes.titles.en_jp}</h3> :
//                 <h3>{item.attributes.titles.en}</h3>
//                 }

//                 { item.attributes.description.length < 150 ? <span>{item.attributes.description}</span> :
//                     (isClicked ? 
//                   <span>
//                     {item.attributes.description}
//                     <button style={{"border": "none", "backgroundColor": "white", "color": "red"}} onClick={handleClick}>...Read Less</button>
//                   </span> :
//                   <span>
//                     {item.attributes.description.slice(0, 150) + "..."}
//                     <button style={{"border": "none", "backgroundColor": "white", "color": "red"}} onClick={handleClick}>Read More</button>
//                   </span>)
//                   }

//             </div>
//         </div>
//             );
//     })}