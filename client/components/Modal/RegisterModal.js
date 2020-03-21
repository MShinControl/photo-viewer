import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import Register from '../Auth/Register';

const RegisterModal = ({ isShowing, hide, setStatus }) => isShowing ? createPortal(
  <Fragment>
    <div className="modal-underlay"/>
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <button onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <h1>Create an Account</h1>
          <hr/>
          <Register setStatus={setStatus} hide={hide}/>
        </div>
      </div>
  </Fragment>, document.body
  ) : null;

export default RegisterModal;
