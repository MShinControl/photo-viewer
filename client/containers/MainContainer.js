/**
 * ************************************
 *
 * @module MainController
 * @description Intersection for loading either the Homepage or Dashboard
 *              depending on user verificaiton status w/ conditional rendering.
 *
 * ************************************
 */

import React, { useState, useEffect } from "react";
import AuthComponent from '../components/AuthComponent';
import GalleryComponent from '../components/GalleryComponent';


const MainContainer = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(localStorage.getItem('status'));
  }, [status]);

  return !status ? ( <AuthComponent setStatus={setStatus}/> ) : ( <GalleryComponent setStatus={setStatus} /> )
}

export default MainContainer;