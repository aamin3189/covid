import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd-mobile";
import './top-nav.scss';

class TopNav extends Component {

  
  render() {
    return (
      <section className="container">
        <div className="controls">
          <div className="search-control">
            <div className="top-controls">
              <Link to="/" className="back">
                <Icon size="md" type="left" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TopNav;
