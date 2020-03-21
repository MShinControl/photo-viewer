import React, { useState, useEffect } from "react";
import AuthComponent from '../components/AuthComponent';
import GalleryComponent from '../components/GalleryComponent';


const MainContainer = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(localStorage.getItem('status'));
  }, [status]);

  return !status ? ( <AuthComponent setStatus={setStatus}/> ) : ( <GalleryComponent /> )
}

export default MainContainer;