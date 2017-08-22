import React, { PropTypes } from "react";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import { Link, browserHistory } from "react-router";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import { bindActionCreators } from "redux";
import * as loginActions from "../actions/loginActions";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import FlatButton from "material-ui/FlatButton";
import io from "socket.io-client";
import userApi from "../api/Github/userApi";
import { Layout, Menu, Icon, Button, Card, Row, Col, Input } from "antd";
import * as rootApi from "../api/CommonLocal/rootSettingsApi";
import "./index.css";
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false,
      displayLogin: "",
      showTitle: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAfterLogin = this.handleClickAfterLogin.bind(this);
    this.initiateLogin = this.initiateLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.readSessionToken = this.readSessionToken.bind(this);
    this.clearSessionFlag = this.clearSessionFlag.bind(this);
    this.setSessionFlag = this.setSessionFlag.bind(this);
    this.getDocs = this.getDocs.bind(this);
    let ws_scheme = "ws";
    this.socket = new WebSocket(
      ws_scheme + "://" + window.location.host + "/chat/"
    );
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
      })
      .catch(err => {
        toastr.error("Unauthorized");
        setTimeout(
          () => {
            $("#appbar-progress").css("visibility", "hidden");
            $("#appbar-progress").progress({
              percent: "0%"
            });
          },
          600
        );
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
    window.location = "http://cloudcv-origami.readthedocs.io/en/latest/index.html";
  }

  handleClick(e) {
    if (!this.state.login && e.key === "2") {
      this.initiateLogin();
    } else if (e.key == "3") {
      this.getDocs();
    }
  }

  handleClickAfterLogin(e) {
    if (e.key === "1") {
      browserHistory.push(
        `/u/${localStorage.getItem("username")}/${localStorage.getItem("user_id")}`
      );
    }
    if (e.key === "2") {
      browserHistory.push("/");
    } else if (e.key === "3") {
      browserHistory.push("/ngh/user");
    } else if (e.key === "4") {
      browserHistory.push("/ngh/user/register");
    } else if (e.key === "5") {
      this.getDocs();
    } else if (e.key === "6") {
      this.logout();
    }
  }

  render() {
    if (this.props.location.pathname === "/") {
      $("#appbar-progress").css("display", "None");
    } else {
      $("#appbar-progress").css("display", "");
    }
    if (this.readSessionToken()) {
      this.props.loginactions.Login();
    }
    if (this.state.login) {
      return (
        <Layout style={{ height: "110vh", background: "#FEFEFE" }}>
          <Sider
            style={{
              overflow: "auto",
              background: "#FEFEFE",
              "box-shadow": "10px 0px 20px #E0E0E0"
            }}
            width="200"
          >
            <div
              className="logo"
              style={{
                height: "31px",
                "border-radius": "6px",
                margin: "16px",
                color: "black"
              }}
            >
              {" "}Origami logo{" "}
            </div>
            <Menu
              style={{ background: "#FEFEFE" }}
              mode="inline"
              defaultSelectedKeys={["3"]}
              onClick={this.handleClickAfterLogin}
            >
              <Menu.Item key="1" style={{ "font-size": "16px" }}>
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Menu.Item>
              <Menu.Item key="2" style={{ "font-size": "16px" }}>
                <Icon type="video-camera" />
                <span className="nav-text">Discover</span>
              </Menu.Item>
              <Menu.Item key="3" style={{ "font-size": "16px" }}>
                <Icon type="cloud-o" />
                <span className="nav-text">My demos</span>
              </Menu.Item>
              <Menu.Item key="4" style={{ "font-size": "16px" }}>
                <Icon type="plus-circle-o" />
                <span className="nav-text">Create Demo</span>
              </Menu.Item>
              <Menu.Item key="5" style={{ "font-size": "16px" }}>
                <Icon type="question-circle-o" />
                <span className="nav-text">Help</span>
              </Menu.Item>
              <Menu.Item key="6" style={{ "font-size": "16px" }}>
                <Icon type="logout" />
                <span className="nav-text">Logout</span>
              </Menu.Item>
            </Menu>
          </Sider>
          {this.props.children}
        </Layout>
      );
    } else {
      return (
        <Layout id="layout">
          <Header id="layout-header-no-login">
            <Row>
              <Col span={3} offset={1}>
                <h2 id="logo-title">
                  Origami
                </h2>
              </Col>
              <Col span={10} offset={1}>
                <Input.Search
                  id="search"
                  placeholder="Search for demos, users"
                />
              </Col>
              <Col span={2} offset={0}>
                <Button style={{ marginLeft: 30, textAlign: "right" }}>
                  Search By <Icon type="down" />
                </Button>
              </Col>
              <Col span={6} offset={1}>
                <Menu
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                  style={{ lineHeight: "64px" }}
                  onClick={this.handleClick}
                >
                  <Menu.Item key="1">Home</Menu.Item>
                  <Menu.Item key="2">

                    Login

                  </Menu.Item>
                  <Menu.Item key="3">Docs</Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>
          <div>
            {this.props.children}
          </div>
        </Layout>
      );
    }
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
