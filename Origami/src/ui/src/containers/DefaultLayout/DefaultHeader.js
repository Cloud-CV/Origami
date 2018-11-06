import React, { Component } from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../../../../../origami_logo.png";
import sygnet from "../../../../components/assets/cloudcv_logo.png";
import { getSearchedDemos } from "../../../../api/Nongh/getSearchedDemos";
import { getAllPermalink } from "../../../../api/Nongh/permalink";
import {
  Layout,
  Menu,
  Icon,
  Button,
  Card,
  Row,
  Col,
  Input,
  Select,
  Modal
} from "antd";
import toastr from "toastr";
const propTypes = {
  children: PropTypes.node
};
import ReactDOM from "react-dom";

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.asideTogglerRef = React.createRef();
  }

  componentDidMount() {
    console.log("props=", this.props);
    ReactDOM.findDOMNode(this.asideTogglerRef.current).addEventListener(
      "click",
      this.props.click
    );
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this.asideTogglerRef.current).removeEventListener(
      "click",
      this.props.click
    );
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 120, height: 50, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav />
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler
          className="d-md-down-none"
          ref={this.asideTogglerRef}
        />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
