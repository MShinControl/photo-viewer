/**
 * ************************************
 *
 * @module Display
 * @description Fetches for images via scrolling pagination, allows for changing dimensions,
 *              & allows for changing image to greyscale. & user logging out.
 *
 * ************************************
 */

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


const Display = ({ setStatus }) => {
  const initialFormState = {
    width: "",
    height: "",
    urls: []
  }

  const [ showcase, setShowcase ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ form, setForm ] = useState(initialFormState);
  const [ error, setError ] = useState('');


  //Fetch Images
  const getImages = async () => {
    try {
      const serverRes = await fetch(`http://localhost:3000/images?page=${page}`);
      const data = await serverRes.json();

      //If Limit is hit set error to state.
      if(data.errorMessage) setError(data.errorMessage);
      //Otherwise set images to state via dimensions.
      else {
        const images = data.map(el => {
                        el = el.split('/');
                        el[el.length-2] = 600
                        el[el.length-1] = 600
                        return el.join('/');
                      });
        setShowcase(images);
      }
    //Error handler
    } catch (error) {
      error ? console.log(error) : null;
    }
  }

  //Set dimensions to form.
  const handleOnChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value, urls: showcase});
    console.log(form);
  };

  //Dimension editing function.
  const edit = (width, height, url) => {
    setShowcase(url.map(el => {
      el = el.split('/');
      el[el.length-2] = !width ? el[el.length-2] : width;
      el[el.length-1] = !height ? el[el.length-1] : height;
      return el.join('/');
    }));
  }

  //Everything page updates, fetch for the next images.
  useEffect(() => {
    getImages();
  }, [page]);

  return (
    <div className="display">
      <nav>
        <img className="logo" src="./client/styles/assets/camera-retro-solid.svg"></img>
        <form onSubmit={event => {
          event.preventDefault();
          edit(form.width, form.height, showcase);
        }}>
          <input
            type="text"
            name="width"
            value={form.width}
            placeholder="Enter Width"
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="height"
            value={form.height}
            placeholder="Enter Height"
            onChange={handleOnChange}
          />
          <input type="submit" value="EDIT"/>
        </form>
          <button
            className="logout"
            onClick={() => {
              localStorage.clear();
              setStatus(false);
            }}
          >
            Logout
          </button>
      </nav>
      <div className="images-ctn">
        {showcase.map((el,index) => <img onClick={(event) => {
                                                    event.target.style.filter === 'grayscale(100%)' ? 
                                                    event.target.style.filter = 'grayscale(0%)' :
                                                    event.target.style.filter = 'grayscale(100%'
                                                  }} key={index} src={el}/>)}
      </div>
      <InfiniteScroll
        dataLength={showcase.length}
        next={() => setPage(page + 1)}
        hasMore={true}
      >
        <h1 className="end">{error}</h1>
      </InfiniteScroll>


    </div>
  )



}

export default Display