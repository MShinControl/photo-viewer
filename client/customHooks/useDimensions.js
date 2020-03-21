// /**
//  * ************************************
//  *
//  * @module useDimensions
//  * @description Custom hook for editting demensions
//  *
//  * ************************************
//  */

// import { useState } from 'react';

// const useDimensions = () => {
//   const [newUrls, setNewUrls] = useState([]);
  
//   const edit = async (width, height, url) => {
//     console.log(width, height, url)
//     
//       let el = url.split('/');
//       el[el.length-2] = !width ? el[el.length-2] : width;
//       el[el.length-1] = !height ? el[el.length-1] : height;
//       return el.join('/');
//    
//     
//     setNewUrls(el);
//   }

//   return {
//     newUrls,
//     edit,
//   }
// };

// export default useDimensions;