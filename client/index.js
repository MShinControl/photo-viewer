/**
 * ************************************
 *
 * @module Index.js
 * @description Applies React to Root.
 *
 * ************************************
 */

import React from "react";
import { render } from "react-dom";
import App from './App';
import './styles/main.scss';

render (
    <App/>,
    document.querySelector("#root")
)

