export const getImageUrls = () => {
  const urls = fetchUrls();
  return {
    data: wrapPromise(urls)
  }
}

function wrapPromise (promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    res => {
      status = 'success';
      result = res;
    },
    err => {
      status = 'error';
      result = err;
    }
  );
  return {
    read() {
      if(status === 'pending') throw suspender;
      else if(status === 'error') throw result;
      else if(status === 'success') return result;
    }
  }
}

const fetchUrls = async () => {
  try {
    const res = await fetch('http://localhost:3000/images');
    const { imageUrls } = await res.json();
    return imageUrls;
  } catch (err) {
    return err;
  }
}

