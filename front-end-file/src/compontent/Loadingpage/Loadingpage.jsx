import React from 'react'
import '../Loadingpage/Loadingpage.css'
//import ballonimg from "../../../imgaes/loading.gif";
import loadingimg from "../../imgaes/loading.gif"

function Loadingpage() {
  return (
    <div className="ballonzindex4">
    <img src={loadingimg} width="200px" alt="ballom" />
    <p>Please Wait for loading..</p>
  </div>
  )
}

export default Loadingpage