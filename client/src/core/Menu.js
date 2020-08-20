import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers'

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: 'yellow'}
    }
    else {
        return {color: '#fff'}
    }
}

const Menu = ({history}) => {
    return (
          <ul className="nav nav-tabs justify-content-center bg-info">
              <li className="nav-item">
                  <Link to="/" className="nav-link" style={isActive(history, '/')}>Home</Link>
              </li>
              <li className="nav-item">
                  <Link to="/shop" className="nav-link" style={isActive(history, '/shop')}>Shop</Link>
              </li>
              { isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <li className="nav-item">
                      <Link to="/user/dashboard" className="nav-link" style={isActive(history, '/user/dashboard')}>Dashboard</Link>
                  </li>
              )}

              { isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <li className="nav-item">
                      <Link to="/admin/dashboard" className="nav-link" style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
                  </li>
              )}

              {!isAuthenticated() && (
                  <Fragment>
                      <li className="nav-item">
                          <Link to="/signin" className="nav-link" style={isActive(history, '/signin')}>Signin</Link>
                      </li>
                      <li className="nav-item">
                          <Link to="/signup" className="nav-link" style={isActive(history, '/signup')}>Signup</Link>
                      </li>
                  </Fragment>
              )}

              {
                  isAuthenticated() && (
                      <Fragment>
                          <li className="nav-item">
                              <span
                                  onClick={()=> signout(()=>{
                                      history.push('/')
                                  })}
                                  className="nav-link" style={{cursor: 'pointer', color:"#fff"}}>Signout</span>
                          </li>
                      </Fragment>
                  )
              }

              <li className="nav-item">
                  <Link to="/cart" className="nav-link" style={isActive(history, '/cart')}>Cart <sup><span className="badge badge-danger rounded-circle">{itemTotal()}</span></sup></Link>
              </li>
         </ul>
    );
};

export default withRouter(Menu);
