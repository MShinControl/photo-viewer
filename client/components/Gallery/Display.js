import React, { useState, useEffect } from 'react';

const Display = () => {
  const initialFormState = {
    width: "",
    height: "",
    urls: []
  }

  const [ showcase, setShowcase ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ form, setForm ] = useState(initialFormState);

  const pages = [1, 2, 3, 4, 5];

  const getImages = async () => {
    try {
      const serverRes = await fetch(`http://localhost:3000/images?page=${page}`);
      const data = await serverRes.json();
      setShowcase(data);
    } catch (error) {
      error ? console.log(error) : null;
    }
  }

  const handleOnChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value, urls: showcase});
    console.log(form);
  };

  const edit = (width, height, url) => {
    console.log(width, height, url)
    setShowcase(url.map(el => {
      el = el.split('/');
      el[el.length-2] = !width ? el[el.length-2] : width;
      el[el.length-1] = !height ? el[el.length-1] : height;
      return el.join('/');
    }))
  }

  useEffect(() => {
    getImages();
  }, [page]);

  return (
    <div className="display">
      <nav>
        <form onSubmit={event => {
          event.preventDefault();
          edit(form.width, form.height, showcase);
        }}>
          <input
            type="text"
            name="width"
            value={form.width}
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="height"
            value={form.height}
            onChange={handleOnChange}
          />
          <input type="submit" value="EDIT"/>
        </form>
      </nav>
      {showcase.map((el,index) => <img key={index} src={el}/>)}
      {pages.map((el,index) => <button key={index} onClick={() => setPage(el)}>{el}</button>)}
    </div>
  )



}

export default Display