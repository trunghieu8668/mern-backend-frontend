import React from 'react';
import Menu from './Menu';
import '../styles.css'
const Layout = ({title = '', description = '', className, children}) => {
    return (
        <div>
            <Menu/>
            {title && (
              <div className="jumbotron">
                  <div className="container">
                      {title && (<h2>{title}</h2>)}
                      {description && (<p className="lead">{description}</p>)}
                  </div>
              </div>
            )}

            <div className={className}>{children}</div>
        </div>
    );
};

export default Layout;
