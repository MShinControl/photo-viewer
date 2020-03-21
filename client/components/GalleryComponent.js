/**
 * ************************************
 *
 * @module GalleryComponent
 * @description Parent component for displaying main Gallery.
 *
 * ************************************
 */

import React from 'react';
import Display from './Gallery/Display';

const GalleryComponent = ({ setStatus }) => {
  return (<Display setStatus={setStatus} />)
}

export default GalleryComponent;