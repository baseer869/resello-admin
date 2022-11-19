import React from "react";
import "./index.css";
function index(props) {
  return (
    <>
      <div id="root">
        <div class="loader-wrapper">
          <div class="loader"></div>
          <div class="text">Loading {props.loadingText} Please Wait...</div>
        </div>
      </div>
    </>
  );
}

export default index;
