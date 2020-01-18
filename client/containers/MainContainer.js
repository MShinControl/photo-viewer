import React, { useState, Suspense, useEffect } from 'react';
import Display from '../components/Display';
import Loading from '../components/Loading';
import { getImageUrls } from '../containers/getData';

const initialResource = getImageUrls();

const MainContainer = () => {
  const [resource, setResource] = useState(initialResource);

  return (
    <Suspense fallback={<Loading />}>
      <Display resource={resource}/>
    </Suspense>
  )
}

export default MainContainer;