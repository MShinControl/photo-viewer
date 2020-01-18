import React from 'react';

const Display = ({ resource }) => {
  const image = resource.data.read();
  return (
    <div className="img-ctn">
      {image.map((el, index) => {
        let src = el;
        return (
            <img 
              key={index} 
              src={src} 
              onClick={(event) => event.target.style.filter === 'grayscale(100%)' ? 
                                  event.target.style.filter = 'grayscale(0%)' :
                                  event.target.style.filter = 'grayscale(100%'
            }/>
        )
      })}
    </div>
  );
}

export default Display;