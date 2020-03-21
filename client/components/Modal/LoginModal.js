/**
 * ************************************
 *
 * @module LoginModal
 * @description Renders the modal itself and all the forms + inputs inside.
 *              CreatePortal allows React to create dom elements outside or on top
 *              of the main root node.
 *
 * ************************************
 */

import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import Login from '../Auth/Login';

const LoginModal = ({ isShowing, hide, setStatus }) => isShowing ? createPortal(
  <Fragment>
    <div className="modal-underlay"/>
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <button onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <h1>Welcome Back !</h1>
          <hr/>
          <Login setStatus={setStatus} hide={hide}/>
        </div>
      </div>
  </Fragment>, document.body
  ) : null;

export default LoginModal;
