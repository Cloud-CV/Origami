import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import rangeCheck from 'range_check';
import { getWebAppStatus } from '../../../api/Generic/getWebAppStatus';
import RaisedButton from 'material-ui/RaisedButton';
import StopNow from 'material-ui/svg-icons/action/pan-tool';
import Dropzone from 'react-dropzone';
import Checkbox from 'material-ui/Checkbox';
import GoAhead from 'material-ui/svg-icons/action/check-circle';
import { red500, green500, grey900 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import request from 'superagent';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import toastr from 'toastr';
import { Layout, Row, Col } from 'antd';
import { ORIGAMI_READ_THE_DOCS } from '../../../constants';
import { Card, Icon, Image, Button, Dimmer, Header } from 'semantic-ui-react';
import Cards from '../../stateless/task_cards';

const { Content, Footer } = Layout;

toastr.options.closeButton = true;

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      description: '',
      cover_image: '',
      showTerminal: false,
      active: 0,
      btnactive: 0,
      btnclicked: 0,
      subhover: 0,
      python: 0,
      os: 0,
      cuda: 0,
    };
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.toggleTerminal = this.toggleTerminal.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.hover = this.hover.bind(this);
    this.exit = this.exit.bind(this);
    this.btnEnter = this.btnEnter.bind(this);
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  onDrop(files) {
    if (files[0].size > 5242880) {
      alert('File size should be < 5MB');
    } else {
      document.getElementById(
        'input-image-preview'
      ).src = window.URL.createObjectURL(files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        const dataURI = reader.result;
        this.setState({ cover_image: dataURI });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  toggleTerminal() {
    this.setState({ showTerminal: !this.state.showTerminal });
  }

  getStyles() {
    return {
      layout: {
        background: '#F7F7F7',
      },
      content: {
        margin: '24px 0 0 12px',
        overflow: 'initial',
      },
      contentDiv: {
        padding: '5px 0',
        background: '#F7F7F7',
      },
      tag: {
        color: '#606470',
        paddingTop: '5px',
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1.6em',
      },
      tagOs: {
        color: '#606470',
        paddingTop: '5px',
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1.6em',
        paddingLeft: '7px',
      },
      btn: {
        borderStyle: 'Solid',
        borderColor: '#949494',
        color: '#6C6666',
        width: '100%',
        backgroundColor: 'White',
        borderWidth: '2px',
        borderRadius: '30px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)',
        transition: 'all 0.3s',
      },
      txt: {
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1em',
      },
      active: {
        borderStyle: 'Solid',
        borderColor: '#eaeaea',
        borderWidth: '2px',
        transition: '.3s ease',
        backfaceVisibility: 'hidden',
        opacity: '0.8',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      },
      btnactive: {
        borderStyle: 'Solid',
        width: '100%',
        borderWidth: '2px',
        borderRadius: '30px',
        backgroundColor: '#443E3E',
        color: 'White',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        transition: 'all 0.3s',
      },

      parentBox: {
        flexGrow: '5.75',
        minWidth: '300px',
        padding: '30px',
        backgroundColor: '#fffff',
      },
      box: {
        border: '1px solid #F3F2F2',
        backgroundColor: 'White',
        borderRadius: '10px',
        padding: '10px',
      },

      sub: {
        borderStyle: 'Solid',
        width: '100%',
        borderWidth: '2px',
        borderRadius: '30px',
        backgroundColor: '#443E3E',
        color: 'White',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        transition: 'all 0.3s',
      },

      subhover: {
        borderStyle: 'Solid',
        width: '100%',
        borderWidth: '2px',
        borderRadius: '30px',
        backgroundColor: '#443E3E',
        color: 'White',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        transition: 'all 0.3s',
      },
      logo: {
        marginRight: '13px',
      },
    };
  }

  hover(e) {
    this.setState({ active: e });
  }
  btnEnter(e) {
    this.setState({ btnactive: e });
  }

  btnclicked(x, y) {
    let python = this.state.python,
      os = this.state.os,
      cuda = this.state.cuda;

    switch (x) {
      case 1:
        os = y;
        break;
      case 2:
        python = y;
        break;
      case 3:
        cuda = y;
        break;
    }
    this.setState({ python: python, os: os, cuda: cuda });
  }

  exit() {
    this.setState({ active: 0, btnactive: 0, subhover: 0 });
  }
  sub(e) {
    this.setState({ subhover: e });
  }

  helpDirect() {
    window.location = ORIGAMI_READ_THE_DOCS;
  }

  submit() {
    this.props.history.push('/instructions');
  }
    checkbox(event){
    let current=this.state.checked;
    this.setState({checked:!current})
  }


  render() {
    const { active } = this.state;
    let styles = this.getStyles();
    const content = (
      <div>
        <Header className="ui small">Know More</Header>
      </div>
    );

    const head = ['Style Transfer', 'VQA', 'Clssification', 'GradCam'];
    const tasks = [];
    for (var i = 1; i < 5; i++) {
      tasks.push(<Cards header={head[i]} count={i} />);
    }

    return (
      <div style={{ backgroundColor: '#F7F7F7' }}>
        <Layout style={styles.layout}>
          {this.state.showOutput === 'hidden' && (
            <div className="centered row" style={{ marginTop: '30vh' }}>
              <CircularProgress size={89.25} />
            </div>
          )}
          <Content style={styles.content}>
            <div style={styles.contentDiv}>
              <Row>
                <div
                  style={{
                    visibility: this.state.showOutput,
                    width: '100%',
                    maxWidth: 700,
                    margin: 'auto',
                    marginTop: '5px',
                  }}
                >
                  <div
                    className="sixteen wide column stretched"
                    style={{ visibility: this.state.showOutput }}
                  >
                    <h1
                      style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      Register Application
                    </h1>
                  </div>
                  <Stepper linear={false}>
                    <Step active>
                      <StepLabel>
                        <b>Register Application</b>
                      </StepLabel>
                    </Step>
                    <Step active={this.state.inputComponentStepperHighlight}>
                      <StepLabel>Configure bundled code </StepLabel>
                    </Step>
                  </Stepper>
                </div>
              </Row>
              <div>
                <div
                  className="ui grid container"
                  style={{ position: 'relative' }}
                >
                  <div className="ui grid container">
                    <div className="column aligned" style={styles.parentBox}>
                      <div style={styles.box}>
                        <a style={{ marginLeft: '40%', fontSize: '18px' }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/details.png')} />
                            </a>
                          </span>{' '}
                          Demo Details
                        </a>
                        <hr
                          style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                        />
                        <div class="ui grid">
                          <div class="two wide column" />
                          <div class="four wide column">
                            <TextField
                              hintText="MyApp"
                              floatingLabelText="Appname"
                              value={this.state.name}
                              errorText={this.state.nameErrorText}
                              onChange={this.updateName}
                            />
                          </div>
                          <div class="three wide column" />
                          <div class="four wide column">
                            <TextField
                              hintText="Description"
                              floatingLabelText="Description"
                              value={this.state.description}
                              onChange={this.updateDescription}
                            />
                          </div>
                        </div>
                        <br />
                      </div>
                      <br />
                      <br />

                      <div style={styles.box}>
                        <a style={{ marginLeft: '40%', fontSize: '18px' }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/task.png')} />
                            </a>
                          </span>Choose your Task
                        </a>
                        <hr
                          style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                        />
                        <br />

                        <div className="ui grid">
                          <div class="two wide column" />

                          <div className=" three wide column">
                            <Cards header={'VQA'} count={1} />
                          </div>
                          <div className=" three wide column">
                            <Cards header={'Style Transfer'} count={2} />
                          </div>
                          <div className=" three wide column">
                            <Cards header={'Grad Cam'} count={2} />
                          </div>
                          <div className=" three wide column">
                            <Cards header={'Classification'} count={2} />
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                      <br />

                      <div style={styles.box}>
                        <a style={{ marginLeft: '35%', fontSize: '18px' }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/tools.png')} />
                            </a>
                          </span>Select System Configuration
                        </a>
                        <hr
                          style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                        />
                        <br />
                        <br />
                        <div className="ui grid">
                          <div className="three wide column" />
                          <div className="one wide column">
                            <text style={styles.tagOs}>OS </text>
                          </div>
                          <div className="one wide column" />
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 11)}
                              onClick={this.btnclicked.bind(this, 1, 1)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 11 || this.state.os == 1
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <text style={styles.txt}>Ubuntu 14.04</text>
                            </Button>
                          </div>
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 12)}
                              onClick={this.btnclicked.bind(this, 1, 2)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 12 || this.state.os == 2
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <text style={styles.txt}>Ubuntu 16.04</text>
                            </Button>
                          </div>
                        </div>

                        <div className="ui grid">
                          <div className="three wide column" />
                          <div className="one wide column">
                            <h2 style={styles.tag}> Python </h2>
                          </div>
                          <div className="one wide column" />
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 21)}
                              onClick={this.btnclicked.bind(this, 2, 1)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 21 ||
                                this.state.python == 1
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <text style={styles.txt}>2.7</text>
                            </Button>
                          </div>
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 22)}
                              onClick={this.btnclicked.bind(this, 2, 2)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 22 ||
                                this.state.python == 2
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <text style={styles.txt}>3.5</text>
                            </Button>
                          </div>
                        </div>

                        <div className="ui grid">
                          <div className="three wide column" />
                          <div className="one wide column">
                            <h2 style={styles.tag}> CUDA </h2>
                          </div>
                          <div className="one wide column" />
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 31)}
                              onClick={this.btnclicked.bind(this, 3, 1)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 31 ||
                                this.state.cuda == 1
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <text style={styles.txt}>7.0 - runtime</text>
                            </Button>
                          </div>
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 32)}
                              onClick={this.btnclicked.bind(this, 3, 2)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 32 ||
                                this.state.cuda == 2
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <text style={styles.txt}>8.0 - runtime</text>
                            </Button>
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                      <br />

                      <div style={styles.box}>
                        <a style={{ marginLeft: '35%', fontSize: '18px' }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/settings.png')} />
                            </a>
                          </span>{' '}
                          Optional configurations{' '}
                        </a>
                        <hr
                          style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                        />

                        <br />
                        <div className="ui grid">
                          <div className="two column row">
                            <div
                              className="column"
                              style={{ paddingLeft: '13%' }}
                            >
                              <div
                                className=""
                                style={{ cursor: 'pointer', maxWidth: '75%' }}
                              >
                                <Dropzone
                                  onDrop={this.onDrop}
                                  multiple={false}
                                  style={{ height: 'inherit' }}
                                >
                                  <div className="ui card">
                                    <div className="ui fluid image">
                                      <img
                                        className="ui fluid medium  image"
                                        src={
                                          this.state.cover_image ||
                                          '/static/img/placeholder.jpg'
                                        }
                                        id={'input-image-preview'}
                                      />
                                    </div>
                                    <div
                                      className="content"
                                      style={{
                                        fontSize: '15px',
                                        color: '#323643',
                                      }}
                                    >
                                      Drag and Drop or Click to upload cover
                                      image
                                    </div>
                                  </div>
                                </Dropzone>
                              </div>
                            </div>

                            <div
                              className="column"
                              style={{ paddingLeft: '5%' }}
                            >
                              <br />
                              <div className="row">

                                <Checkbox
                                    checked={this.state.showTerminal}
                                    onCheck={this.toggleTerminal}
                                    label="Show Terminal on demo page"
                                    style={{
                                      fontSize: '15px',
                                      color: '#323643',
                                      fontWeight:'Normal'
                                    }}
                                  />

                              </div>
                              <br />
                              <div className="row">
                                <div class="four wide column">
                                  <span>
                                    <a style={styles.logo}>
                                      <img
                                        src={require('../../assets/code .png')}
                                      />
                                    </a>
                                  </span>
                                  <TextField
                                    hintText="https://github.com/"
                                    floatingLabelText="Link to Source Code"
                                    value={this.state.name}
                                    errorText={this.state.nameErrorText}
                                    onChange={this.updateName}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br />
                      <br />
                      <div className="ui grid">
                        <div className="three wide column" />
                        <div className="three wide column">
                          <Button
                            onMouseEnter={this.sub.bind(this, 1)}
                            onMouseLeave={this.exit}
                            style={
                              this.state.subhover == 1
                                ? styles.subhover
                                : styles.sub
                            }
                          >
                            <text style={styles.txt}>Reset</text>
                          </Button>
                        </div>

                        <div className="two wide column" />
                        <div className="three wide column">
                          <Button
                            primary
                            onMouseEnter={this.sub.bind(this, 2)}
                            onMouseLeave={this.exit}
                            onClick={this.submit.bind(this)}
                            style={
                              this.state.subhover == 2
                                ? styles.subhover
                                : styles.sub
                            }
                          >
                            <text style={styles.txt}>Submit</text>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

RegisterPage.contextTypes = {
  socket: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(RegisterPage));
