import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import { useState, useRef } from "react";

const ImgDiv = ({ item, index, isLibrary, name }) => {
  const [show, setShow] = useState(5);
  const ref = useRef();

  const closeTooltip = () => {
    ref.current.close();
  };

  let style = {
    borderRadius: "4px",
    animation: "fadeInAnimation ease 1.5s",
    animationIterationCount: "1",
    animationFillMode: "forwards",
  };

  async function handleAddition(e) {
    closeTooltip();
    await axios.post("/library", {
      libLink: item.id,
      libName: e.target.innerText,
    });
  }
  async function handleRemoval(e) {
    await axios.post("/rem-library", {
      libLink: item.id,
      libName: name,
    });
    // console.log(show);
    setShow(0);
    // console.log(show);
    setTimeout(() => {
      // console.log(show);
    }, 3000);
  }

  const PopupDiv = () => {
    return (
      <Popup
        ref={ref}
        trigger={<button className="card-btn">+</button>}
        position="right top"
        on="click"
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        contentStyle={{ padding: "0px", border: "none" }}
        arrow={false}
      >
        <div className="menu rounded-md">
          <div className="menu-item" onClick={handleAddition}>
            Currently Watching
          </div>
          <div className="menu-item" onClick={handleAddition}>
            Want to Watch
          </div>
          <div className="menu-item" onClick={handleAddition}>
            Completed
          </div>
          <div className="menu-item" onClick={handleAddition}>
            On Hold
          </div>
          <div className="menu-item" onClick={handleAddition}>
            Dropped
          </div>
        </div>
      </Popup>
    );
  };

  return (
    <div className="" key={index}>
      <OverlayTrigger
        placement="bottom"
        delay={100}
        overlay={<Tooltip id="tooltip-bottom">{item.attributes.slug}</Tooltip>}
      >
        <div className="explore-img-parent">
          <Link to={`/anime/${item.attributes.slug}`} className="explore-img">
            <img
              className="explore-img absolute"
              alt="anime"
              style={style}
              src={item.attributes.posterImage.small}
            />
            <div className="bg-gradient-to-t hover:from-[#000000cc] hover:to-[#0000001a] hover:bg-opacity-50 hover:rounded-md h-full w-full relative"></div>
          </Link>
          {isLibrary === true ? (
            <div className="card-btn-div">
              <button className="card-btn" onClick={handleRemoval}>
                &#9249;
              </button>
            </div>
          ) : (
            <div className="card-btn-div">
              <PopupDiv />
            </div>
          )}
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default ImgDiv;
