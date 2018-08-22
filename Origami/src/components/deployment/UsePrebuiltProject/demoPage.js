import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from 'antd';
const { Header, Content, Footer } = Layout;
import Gallery from 'react-photo-gallery';
import { getDeployed } from '../../../api/Nongh/getDeployed';
import SampleImage from '../../sampleinput/SampleImage';
import TextSingleInput from '../../inputcomponents/TextInput/TextSingleInput';
import ImageSingleInput from '../../inputcomponents/ImageInput/ImageSingleInput';
import TextOutput from '../../outputcomponents/TextOutput/SingleOutput';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import DropboxChooser from '../../imports/DropboxChooser';
import toastr from 'toastr';
import VQA from '../../tasks/VQA';
import Classification from '../../tasks/classification';
import ImageOutput from '../../outputcomponents/ImageOutput/ImageOutput';
import Style from '../../tasks/Style';

class DemoPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      repo_id: 0,
      user_id: 0,
      outputData: [],
      showTerminal: false,
      terminalData: [],
      inputModel: {},
      outputModel: {},
      demoModel: {},
      isCreator: false,
      cloudcv: [],
      demo_creator: [],
      imageInputCount: 0,
      files: [],
      index: 0,
      resetBorder: false,
      files: [],
      subhover: 0,
      active: 1,
      task: '',
      name: '',
      date: '',
      source_code: '',
      src1: '',
      src2: '',
      value: '',
      return_data: '',
      clicked: '',
      text: '',
      blb: '',
      last: 2,
    };
    this.onSelect = this.onSelect.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.exit = this.exit.bind(this);
    this.sub = this.sub.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleShowTerminal = this.toggleShowTerminal.bind(this);
    this.ws = new WebSocket(`ws://${window.location.host}/chat/`);
    this.socket = this.context.socketId;
    this.ws.onopen = function() {
      this.ws.send(
        JSON.stringify({
          event: 'ConnectionEstablished',
          socketId: this.socket,
        })
      );
    }.bind(this);
    this.server = [
      { src: '/static/img/1.jpg' },
      { src: '/static/img/2.jpg' },
      { src: '/static/img/3.jpg' },
      { src: '/static/img/4.jpg' },
      { src: '/static/img/5.jpg' },
    ];
    this.demo = [
      { src: require('../../assets/wire.png') },
      { src: require('../../assets/wire.png') },
    ];
  }

  componentWillMount() {
    let tmp = this.server;
    let tmp2 = this.demo;
    let cloudcv = [];
    let demo_creator = [];
    while (tmp.length) {
      cloudcv.push(tmp.splice(0, 3));
    }
    while (tmp2.length) {
      demo_creator.push(tmp2.splice(0, 3));
    }

    this.setState({
      cloudcv: cloudcv,
      demo_creator: demo_creator,
      text: 'Please send the Image inputs',
    });
  }

  componentDidMount() {
    let id = this.props.match.params.repoId;
    let user_id = this.props.match.params.user_id;
    getDeployed(user_id, id).then(data => {
      data = JSON.parse(data)[0];
      let name = data.name;
      let terminal = data.terminal;
      let task = data.task;
      let date = data.date;
      let source = data.source_code;
      let username = data.username;
      this.setState({
        user_id: user_id,
        repo_id: id,
        source_code: source,
        date: date,
        showTerminal: terminal,
        task: task,
        name: name,
        username: username,
      });
    });
  }

  onSelect(path, key) {
    if (key == this.state.clicked) {
      this.setState({ src1: '', clicked: '' });
    } else {
      if(this.state.task=="Style Transfer")
      {
      if (this.state.src1) {
        this.setState(
          { src2: path, clicked: key },
          this.getBlobfromURl.bind(this, path)
        );
      } else {
        this.setState(
          { src1: path, clicked: key },
          this.getBlobfromURl.bind(this, path)
        );
      }}
    
    else
    {
      this.setState(
          { src1: path, clicked: key },
          this.getBlobfromURl.bind(this, path)
        );
      }
    }
  
    
    if (this.state.resetBorder) {
      this.setState({ resetBorder: false, src: path });
    }
  }

  getBlobfromURl(newfile) {
    let _self = this;
    fetch(newfile, {
      method: 'GET',
      mode: 'cors',
    })
      .then(function(response) {
        return response.blob();
      })
      .then(function(blob) {
        _self.updateFormData(blob, 'input-image-1');
      })
      .catch(function(err) {
        console.log('error while creating blob =', err);
      });
  }

  updateFormData(newfile, newfilename) {
    let _self = this;
    var ws;
    if (this.state.task == 'Style Transfer' && !this.state.src2) {
      toastr.success('uploaded context image');
      return;
    }
    var formData = new FormData();
    let prev = '';
    if (newfile.preview) {
      prev = newfile.preview;
    }
    let newf = new File([newfile], 'image.png', {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
    formData.append('socket-id', this.context.socketId);
    formData.set(newfilename, newf, newfilename);
    fetch('http://localhost:9001/event', {
      body: formData,
      method: 'POST',
      mode: 'cors',
    })
      .then(function(response) {
        _self.setState({ text: 'New Image data uploaded.' });
      })
      .catch(function(err) {
        _self.setState({ text: err.toString() });
      });
    toastr.success(' Style Image Uploaded!');

    this.context.socket.onmessage = function(evt) {
      let k = evt.data;
      k = JSON.parse(k);
      k = k.data.data;
      _self.setState({ return_data: k });
    };

    prev = prev ? prev : this.state.src;
    this.setState({
      files: [...this.state.files, { newfilename, newfile }],
      src: prev,
    });
  }

  getStyles() {
    return {
      layout: {
        background: '#F7F7F7',
        borderRadius: '15px',
      },
      content: {
        margin: '24px 0 0 12px',
        overflow: 'initial',
      },
      contentDiv: {
        padding: '5px 0',
        background: '#F7F7F7',
      },
      parentBox: {
        flexGrow: '5.0',
        minWidth: '200px',
        padding: '30px',
        backgroundColor: '#fffff',
      },
      boxContainer: {
        border: '1px solid #F3F2F2',
        backgroundColor: 'White',
        borderRadius: '10px',
        padding: '10px',
      },
      demo_name: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '2em',
        margin: 'auto',
        fontWeight: 'Bold',
        color: '#323643',
      },
      task: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1.4em',
        color: '#323643',
        width: '30%',
      },
      creator: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1.3em',
        color: '#323643',
        marginLeft: '32%',
      },
      source: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1.3em',
        color: '#323643',
        marginLeft: '32%',
      },

      logo: {
        marginRight: '13px',
      },
      heading: {
        fontFamily: "'Roboto', sans-serif",
        marginLeft: '41%',
        fontFamily: "'Roboto', sans-serif",
        color: '#323643',
        fontSize: '18px',
      },
      sub: {
        borderStyle: 'Solid',
        width: '150%',
        borderWidth: '2px',
        borderRadius: '20px',
        backgroundColor: '#443E3E',
        color: 'White',
        fontFamily: "'Roboto', sans-serif",
        boxShadow: '0 3px 6px , 0 3px 6px ',
        transition: 'all 0.3s',
      },

      subhover: {
        borderStyle: 'Solid',
        width: '150%',
        borderWidth: '2px',
        borderRadius: '20px',
        backgroundColor: '#443E3E',
        color: 'White',
        boxShadow: '0 14px 28px , 0 10px 10px ',
        transition: 'all 0.3s',
      },
      terminal: {
        height: '40vh',
        width: '40vw',
        backgroundColor: '#323643',
        color: 'white',
        overflowY: 'scroll',
        wordWrap: 'break-word',
        transition: 'all 0.3s',
      },
      terminalDisable: {
        height: '0',
        width: '40vw',
        transition: 'all 0.3s',
      },
      send: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1em',
      },
      sample: {
        borderBottom: '3px solid #73C2FB',
        fontSize: '16px',
        fontFamily: "'Roboto', sans-serif",
        paddingBottom: '4px',
      },
      sample_cloudcv: {
        paddingRight: '5px',
        fontSize: '15px',
        fontFamily: "'Roboto', sans-serif",
        color: '#323643',
        width: '10vw',
        textAlign: 'center',
      },
      sample_demo_creator: {
        marginLeft: '5px',
        fontSize: '15px',
        fontFamily: "'Roboto', sans-serif",
        color: '#323643',
        width: '10vw',
        textAlign: 'center',
      },
      share: {
        paddingLeft: '39%',
      }
    };
  }
  toggleShowTerminal() {
    this.setState({ showTerminal: !this.state.showTerminal });
  }

  exit() {
    this.setState({ subhover: 0 });
  }
  sub(e) {
    this.setState({ subhover: e });
  }

  submit() {
    this.ws = new WebSocket('ws://localhost:9001/websocket');
    let socket = this.context.socketId;
    let value = this.state.value;
    var _self = this;

    this.ws.onopen = function() {
      _self.ws.send(
        JSON.stringify({
          'socket-id': socket,
          data: value,
        })
      );
    };

    let val = '';
    this.ws.onmessage = function(evt) {
      val = evt.data;
      _self.setState({
        return_data: val,
        text: 'Task completed \n Results ' + val.toString(),
      });
    };
  }
  sample(e) {
    this.setState({ active: e });
  }

  textChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    let styles = this.getStyles();
    let demo_creator = [];
    let input;
    switch (this.state.task) {
      case 'VQA':
        input = (
          <VQA
            src={this.state.src1}
            updateFormData={this.updateFormData}
            value={this.state.value}
            valChange={this.textChange.bind(this)}
            styles={styles}
            submit={this.submit.bind(this)}
            subhover={this.state.subhover}
            sub={this.sub.bind(this, 2)}
            exit={this.exit}
          />
        );
        break;
      case 'Style Transfer':
        input = (
          <Style
            src1={this.state.src1}
            src2={this.state.src2}
            updateFormData={this.updateFormData}
            value={this.state.value}
            valChange={this.textChange.bind(this)}
            styles={styles}
            submit={this.submit.bind(this)}
            subhover={this.state.subhover}
            sub={this.sub.bind(this, 2)}
            exit={this.exit}
          />
        );
        break;
      case 'Classification':
        input = (
          <Classification
            src={this.state.src}
            updateFormData={this.updateFormData}
            value={this.state.value}
            valChange={this.textChange.bind(this)}
            styles={styles}
            submit={this.submit.bind(this)}
            subhover={this.state.subhover}
            sub={this.sub.bind(this, 2)}
            exit={this.exit}
          />
        );
        break;
    }
    demo_creator.push(
      <div>
        <div className="" style={{ height: '50%', cursor: 'pointer' }}>
          <Dropzone multiple={false} style={{ height: '50%' }}>
            <div className="ui card" style={{ width: '90%' }}>
              <div className="ui fluid image">
                <img
                  className="ui fluid medium image"
                  src={'/static/img/placeholder.jpg'}
                  id={'input-image-preview-1'}
                  style={{ width: '100%', borderWidth: '0px' }}
                />
              </div>
              <div className="content origami-demo-input-image-component-desc">
                Drag and Drop or Click to upload
              </div>
            </div>
          </Dropzone>
        </div>
      </div>
    );
    let fin = [];
    fin.push(demo_creator);
    let sampleinputs = this.state.active == 1 ? this.state.cloudcv : fin;
    return (
      <div
        style={{
          backgroundColor: '#F7F7F7',
          marginTop: '10px',
          borderRadius: '40px',
        }}
      >
        <Layout style={styles.layout}>
          <Content style={styles.content}>
            <div style={styles.contentDiv}>
              <div
                className="ui grid container"
                style={{ position: 'relative' }}
              >
                <div style={styles.demo_name}>
                  <span> {this.state.name}</span>
                </div>
                <br />
                <br />
                <br />
                <div className="ui grid container">
                  <div className="column aligned" style={styles.parentBox}>
                    <div style={styles.boxContainer}>
                      <a style={styles.heading}>
                        <span>
                          <a style={styles.logo}>
                            <img src={require('../../assets/about.png')} />
                          </a>
                        </span>
                        About the Demo
                      </a>
                      <hr
                        style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                      />

                      <div
                        className="two column row"
                        style={{ marginLeft: '6%' }}
                      >
                        <div className="column" style={styles.task}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/details.png')} />
                            </a>
                          </span>
                          Task : {this.state.task}
                        </div>

                        <div className="column" style={styles.creator}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/profile2.png')} />
                            </a>
                          </span>
                          Creator : {this.state.username}
                        </div>
                      </div>
                      <br />
                      <div
                        className="two column row"
                        style={{ marginLeft: '6%' }}
                      >
                        <div className="column" style={styles.task}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/event.png')} />
                            </a>
                          </span>
                          Date of Creation : {this.state.date}
                        </div>

                        <div className="column" style={styles.source}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/code .png')} />
                            </a>
                          </span>
                          Source Code :{' '}
                          <a href={this.state.source_code}>Link</a>
                        </div>
                      </div>

                      <br />
                    </div>

                    <br />
                    <br />

                    <div style={styles.boxContainer} id="outersample">
                      <a style={styles.heading}>
                        <span>
                          <a style={styles.logo}>
                            <img src={require('../../assets/picture.png')} />
                          </a>
                        </span>
                        Sample Inputs
                      </a>
                      <hr
                        style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                      />
                      <div
                        className="two column row"
                        style={{ marginLeft: '36%', cursor: 'pointer' }}
                      >
                        <div className="column" style={styles.sample_cloudcv}>
                          <div
                            style={this.state.active == 1 ? styles.sample : {}}
                            onClick={this.sample.bind(this, 1)}
                          >
                            CloudCV
                          </div>
                        </div>
                        <div className="column" style={styles.sample_demo_creator}>
                          <div
                            style={this.state.active == 2 ? styles.sample : {}}
                            onClick={this.sample.bind(this, 2)}
                          >
                            {' '}
                            Demo Creator
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row" style={{ marginLeft: '6%' }}>
                        {this.state.active == 1 &&
                          sampleinputs.map((row, index) => (
                            <div>
                              <div className="row">
                                {row.map((value, ind) => (
                                  <SampleImage
                                    key={ind}
                                    value={value.src}
                                    onSelect={this.onSelect}
                                    clicked={this.state.clicked}
                                    id={index.toString() + '' + ind.toString()}
                                    style={{ borderStyle: 'Solid' }}
                                  />
                                ))}
                              </div>
                              <br />
                              <br />
                            </div>
                          ))}
                        {this.state.active == 2 && (
                          <div>
                            <div
                              className=""
                              style={{ height: '50%', cursor: 'pointer' }}
                            >
                              <Dropzone
                                multiple={false}
                                style={{ height: '50%' }}
                              >
                                <div
                                  className="ui card"
                                  style={{ width: '35%', borderWidth: '0px' }}
                                >
                                  <div className="ui fluid image">
                                    <img
                                      className="ui fluid medium image"
                                      src={'/static/img/placeholder.jpg'}
                                      id={'input-image-preview-1'}
                                      style={{
                                        width: '100%',
                                        borderWidth: '0px',
                                      }}
                                    />
                                  </div>
                                  <div className="content origami-demo-input-image-component-desc">
                                    Drag and Drop or Click to upload a Sample
                                    Image
                                  </div>
                                </div>
                              </Dropzone>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <br />
                    <br />
                    <div style={styles.boxContainer} id="outerdemo">
                      <a style={styles.heading}>
                        <span>
                          <a style={styles.logo}>
                            <img src={require('../../assets/demo.png')} />
                          </a>
                        </span>
                        Demo
                      </a>
                      <hr
                        style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                      />
                      {input}
                      <br />
                      <br />

                      <div
                        className="ui four wide column"
                        style={{ marginTop: '6vh', marginLeft: '25%' }}
                      >
                        <h2 className="ui header grid">
                          <div
                            className="ui grid"
                            style={{
                              backgroundColor: '#F7F7F7',
                              width: '44vw',
                              borderRadius: '10%',
                            }}
                          >
                            <div className="two column row">
                              <div
                                className="column"
                                style={{
                                  color: '#323643',
                                  fontSize: '16px',
                                  paddingLeft: '3%',
                                }}
                              >
                                <span>
                                  <a style={styles.logo}>
                                    <img
                                      src={require('../../assets/terminal.png')}
                                    />
                                  </a>
                                </span>
                                Terminal
                              </div>
                              <div className="column">
                                <div style={{ paddingLeft: '90%' }}>
                                  <Button
                                    type="danger"
                                    shape="circle"
                                    icon={
                                      this.state.showTerminal ? 'up' : 'down'
                                    }
                                    size="small"
                                    ghost
                                    onClick={() => this.toggleShowTerminal()}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </h2>
                        <div
                          className="ui four column centered"
                          style={
                            this.state.showTerminal
                              ? styles.terminal
                              : styles.terminalDisable
                          }
                        >
                          <div
                            style={{
                              paddingTop: '15px',
                              paddingLeft: '10px',
                              fontSize: '13px',
                            }}
                          >
                            {this.state.showTerminal ? this.state.text : ''}
                          </div>
                        </div>
                      </div>

                      <br />
                      <br />
                      <ImageOutput
                        headers={'output'}
                        calling_context={'demo'}
                        data={this.state.return_data}
                      />

                      <br />
                      <hr />
                      <div style={styles.share}>
                        <a target="_blank" class="share-btn share">
                          <img
                            src={require('../../assets/share.png')}
                            style={{ height: '30px' }}
                          />
                        </a>

                        <a
                          href={
                            'http://www.facebook.com/sharer/sharer.php?u=' +
                            window.location
                          }
                          target="_blank"
                          class="share-btn share"
                        >
                          <img
                            src={require('../../assets/fb.png')}
                            style={{ height: '30px' }}
                          />
                        </a>

                        <a
                          href="http://twitter.com/share?url=<URL>&text=<TEXT>&via=<VIA>"
                          target="_blank"
                          class="share-btn twitter"
                        >
                          <img
                            src={require('../../assets/twitter.jpg')}
                            style={{ height: '30px' }}
                          />
                        </a>

                        <a
                          href={
                            'https://plus.google.com/share?url=' +
                            window.location
                          }
                          target="_blank"
                          class="share-btn google-plus"
                        >
                          <img
                            src={require('../../assets/google.jpeg')}
                            style={{ height: '30px' }}
                          />
                        </a>

                        <a
                          href={
                            'http://www.facebook.com/sharer/sharer.php?u=' +
                            window.location
                          }
                          target="_blank"
                          class="share-btn facebook"
                        >
                          <img
                            src={require('../../assets/linkedin.png')}
                            style={{ height: '30px' }}
                          />
                        </a>
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

DemoPage.contextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired,
};

export default DemoPage;
