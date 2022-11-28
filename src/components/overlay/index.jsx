import React from "react";
import "./index.css";
function index(props) {
  return (
    <>
      <div id="root">
        <div className="loader-wrapper">
          <div className={`${props.loader} loader`}></div>
          <div className="text">{props.loadingText}</div>
        </div>
      </div>
    </>
  );
}

export default index;
