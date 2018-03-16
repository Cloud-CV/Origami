import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import { Link, withRouter } from "react-router-dom";
import Routes from "./routes";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import { bindActionCreators } from "redux";
import * as loginActions from "../actions/loginActions";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import FlatButton from "material-ui/FlatButton";
import io from "socket.io-client";
import toastr from "toastr";
import userApi from "../api/Github/userApi";
import { Layout, Menu, Icon, Button, Card, Row, Col, Input } from "antd";
import * as rootApi from "../api/CommonLocal/rootSettingsApi";
import { ORIGAMI_READ_THE_DOCS } from "../constants";
import "./index.css";

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false,
      displayLogin: "",
      showTitle: true,
      isFrame: window.location.pathname.split("/")[1] === "frame",
      isRoot: false
    };

    this.handleClickAfterLogin = this.handleClickAfterLogin.bind(this);
    this.initiateLogin = this.initiateLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.readSessionToken = this.readSessionToken.bind(this);
    this.clearSessionFlag = this.clearSessionFlag.bind(this);
    this.setSessionFlag = this.setSessionFlag.bind(this);
    let ws_scheme = "ws";
    this.socket = new WebSocket(`${ws_scheme}://${window.location.host}/chat/`);
    let socket = this.socket;
    this.socketId = Math.random().toString(36);
    socket.onopen = function() {
      socket.send(
        JSON.stringify({
          event: "ConnectionEstablished",
          socketId: this.socketId
        })
      );
    }.bind(this);
  }

  getChildContext() {
    return {
      socket: this.socket,
      socketId: this.socketId
    };
  }

  componentWillMount() {
    if (
      window.location.pathname.split("/").slice(-1)[0] === "demo" ||
      window.location.pathname.split("/")[1] === "initialsetup"
    ) {
      this.setState({ displayLogin: "none" });
    } else {
      this.setState({ displayLogin: "" });
    }
    rootApi
      .checkRootSettings()
      .then(data => {
        if (
          window.location.pathname !== "/initialsetup" &&
          JSON.parse(data).root_user_github_login_id === null
        ) {
          window.location = "/initialsetup";
        }
        if (
          JSON.parse(data).root_user_github_login_name ===
          localStorage.getItem("username")
        ) {
          this.setState({ isRoot: true });
        }
      })
      .catch(err => {
        toastr.error("Unauthorized");
        setTimeout(() => {
          $("#appbar-progress").css("visibility", "hidden");
          $("#appbar-progress").progress({
            percent: "0%"
          });
        }, 600);
      });
  }

  componentDidMount() {
    if (this.props.location.pathname === "/") {
      $("#appbar-progress").css("display", "None");
    } else {
      $("#appbar-progress").css("display", "");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.login !== nextProps.login) {
      this.setState({ login: nextProps.login });
    }
  }

  readSessionToken() {
    return localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : false;
  }

  clearSessionFlag() {
    localStorage.clear();
  }

  setSessionFlag(access_token, username) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("username", username);
    localStorage.setItem("gh_access_token_time", Date.now());
  }

  initiateLogin() {
    window.location = "/auth/github/login/";
  }

  logout() {
    this.props.loginactions.Logout();
    this.clearSessionFlag();
    window.location = "/";
  }

  getDocs() {
    window.location = ORIGAMI_READ_THE_DOCS;
  }

  handleClickAfterLogin(e, navLinks) {
    if (navLinks && navLinks.has(e.key)) {
      let activeAttr = navLinks.get(e.key);
      if (typeof activeAttr === "string" || activeAttr instanceof String) {
        this.props.history.push(activeAttr);
      } else {
        activeAttr();
      }
    }
  }

  render() {
    /**
     * We use Map here since we need the keys to be in order when we are iterating
     * over links, which is not the case with Javascript objects.
     * For example we want `/ngh/user/register` to be checked before `/ngh/user`to
     * to properly set the active link.
     */
    /** @type {Object} - Stores sidebar links corresponding to Menu entry key */
    let navLinks = new Map([
      ["7", "/initialsetup"],
      ["6", this.logout],
      ["5", this.getDocs],
      ["4", "/ngh/user/register"],
      ["3", "/ngh/user"],
      [
        "1",
        `/u/${localStorage.getItem("username")}/${localStorage.getItem(
          "user_id"
        )}`
      ],
      ["2", "/"]
    ]);

    /** @type {Number} - Key of the MenuItem active */
    let currentActiveKey;
    for (let [key, value] of navLinks) {
      if (typeof value === "string" || value instanceof String) {
        if (this.props.location.pathname.match(new RegExp(`^${value}`))) {
          currentActiveKey = key;
          break;
        }
      }
    }

    let Root_Setting;
    if (this.state.isRoot) {
      Root_Setting = (
        <Menu.Item key="7" style={{ fontSize: "16px" }}>
          <Icon type="setting" />
          <span className="nav-text">Root-Settings</span>
        </Menu.Item>
      );
    } else {
      Root_Setting = null;
    }

    if (this.props.location.pathname === "/") {
      $("#appbar-progress").css("display", "None");
    } else {
      $("#appbar-progress").css("display", "");
    }

    if (this.readSessionToken()) {
      this.props.loginactions.Login();
    }

    if (this.state.isFrame) {
      return <Layout style={{ background: "#FEFEFE" }}>{Routes}</Layout>;
    }
    if (this.state.login) {
      return (
        <Layout id="layout" style={{ height: "100vh" }}>
          <Sider
            style={{
              overflow: "auto",
              background: "#FEFEFE",
              boxShadow: "10px 0px 20px #E0E0E0"
            }}
            width="200"
          >
            <div id="logo-login">
              <img src="/static/img/origami.png" width="180" />
            </div>
            <Menu
              style={{ background: "#FEFEFE" }}
              mode="inline"
              defaultSelectedKeys={[currentActiveKey || "2"]}
              onClick={e => this.handleClickAfterLogin(e, navLinks)}
            >
              <Menu.Item key="1" style={{ fontSize: "16px" }}>
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Menu.Item>
              <Menu.Item key="2" style={{ fontSize: "16px" }}>
                <Icon type="video-camera" />
                <span className="nav-text">Discover</span>
              </Menu.Item>
              <Menu.Item key="3" style={{ fontSize: "16px" }}>
                <Icon type="cloud-o" />
                <span className="nav-text">My demos</span>
              </Menu.Item>
              <Menu.Item key="4" style={{ fontSize: "16px" }}>
                <Icon type="plus-circle-o" />
                <span className="nav-text">Create Demo</span>
              </Menu.Item>
              <Menu.Item key="5" style={{ fontSize: "16px" }}>
                <Icon type="question-circle-o" />
                <span className="nav-text">Help</span>
              </Menu.Item>
              <Menu.Item key="6" style={{ fontSize: "16px" }}>
                <Icon type="logout" />
                <span className="nav-text">Logout</span>
              </Menu.Item>

              {Root_Setting}
            </Menu>
          </Sider>
          {Routes}
        </Layout>
      );
    } else {
      return (
        <Layout id="layout" style={{ height: "100vh" }}>
          {Routes}
        </Layout>
      );
    }
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loginactions: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired
};

App.childContextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
