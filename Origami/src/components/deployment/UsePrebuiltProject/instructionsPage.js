import React from 'react';
import { PropTypes } from 'prop-types';
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from 'antd';
const { Header, Content, Footer } = Layout;
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { red500, green500, grey900 } from 'material-ui/styles/colors';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class InstructionsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.upload_bundle = this.upload_bundle.bind(this);
    this.download_bundle = this.download_bundle.bind(this);
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

      txt: {
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1em',
        fontWeight: 'bold',
      },

      box: {
        flexGrow: '5.75',
        minWidth: '300px',
        padding: '30px',
        backgroundColor: '#fffff',
      },
      box1: {
        border: '1px solid #F3F2F2',
        backgroundColor: 'White',
        borderRadius: '10px',
        padding: '10px',
      },


      download: {
        width: '160px',
        color: 'White',
        backgroundColor: '#00c8f8',
        height: '37px',
      },
      dwnbtm: {
        width: '160px',
        color: 'White',
        backgroundColor: '#90caf9',
        height: '4px',
        marginTop: '0px',
      },

      upload: {
        width: '160px',
        color: 'White',
        backgroundColor: '#00c8f8',
        height: '37px',
        marginLeft: '100%',
      },
      upldbtm: {
        width: '160px',
        color: 'White',
        backgroundColor: '#90caf9',
        height: '4px',
        marginLeft: '100%',
      },
      logo: {
        paddingLeft: '13px',
      },
    };
  }
  back() {
    this.props.history.push('/demo_register');
  }

  forward() {
    this.props.history.push('/demo');
  }
  upload_bundle(selectorFiles: FileList)
  {
    let formData = new FormData();
    let id=this.props.match.params.repoId
    let user_id=this.props.match.params.user_id
    let url='/bundleup/'+id+'/'+user_id+'/'
    formData.append('file',selectorFiles[0]);  
        

  fetch(url, { // Your POST endpoint
    method: 'POST',
    credentials: 'include',
    headers: {
      "X-CSRFToken":cookies.get("csrftoken"),
    },
    body:formData
 
   
  }).then(function(response) {
    console.log("response",response)
  })
  .catch(
    error => console.log(error) // Handle the error response object
  );

  }

  download_bundle()
  {
    let download = require("downloadjs")    
    let id=this.props.match.params.repoId
    let user_id=this.props.match.params.user_id
    let url='/bundledown/'+id+'/'+user_id+'/'
  fetch(url, { // Your POST endpoint
    method: 'GET',
    credentials: 'include',
    headers: {
      "X-CSRFToken":cookies.get("csrftoken"),
    },
  }).then(function(resp) {
    return resp.blob();
  }).then(function(blob) {
    download(blob,'Origami.zip');
  })
  .catch(
    error => console.log(error) // Handle the error response object
  );
}


  render() {
    let styles = this.getStyles();
    console.log("props =",this.props)

    return (
      <div style={{ backgroundColor: '#F7F7F7' }}>
        <Layout style={styles.layout}>
          <Content style={styles.content}>
            <div style={styles.contentDiv}>
              <Row>
                <div
                  style={{
                    width: '100%',
                    maxWidth: 700,
                    margin: 'auto',
                    marginTop: '5px',
                  }}
                >
                  <div className="sixteen wide column stretched">
                    <h1
                      style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      Configure bundled code
                    </h1>
                  </div>
                  <Stepper linear={false}>
                    <Step>
                      <StepLabel>
                        <b>Register Application</b>
                      </StepLabel>
                    </Step>
                    <Step active>
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
                    <div className="column aligned" style={styles.box}>
                      <div style={styles.box1}>
                        <h1
                          style={{
                            fontSize: '22px',
                            color: '##606470',
                            fontWeight: '600',
                            paddingTop: '30px',
                            paddingLeft: '30px',
                          }}
                        >
                          {' '}
                          You're Almost There{' '}
                        </h1>
                        <div
                          style={{
                            paddingLeft: '7%',
                            paddingTop: '10px',
                            fontSize: '15px',
                            color: '##606470',
                          }}
                        >
                          <div className="row">
                            1. Download the bundled Code.
                          </div>
                          <div className="row" style={{ paddingTop: '10px' }}>
                            2. Configure your Machine learning code with the
                            bundle .<text
                              style={{ color: '#00c8f8', paddingRight: '5px' }}
                            >
                              Read the docs
                            </text>{' '}
                            for bundling instructions .
                          </div>
                          <div className="row" style={{ paddingTop: '10px' }}>
                            3. Upload the modifed bundle.
                          </div>
                        </div>
                        <br />
                        <br />

                        <div
                          className="two column row"
                          style={{ paddingTop: '30px', marginLeft: '7%' }}
                        >
                          <div className="column">
                            <Button primary style={styles.download} onClick={this.download_bundle}>
                              <text style={styles.txt}>
                                Download
                                <span>
                                  <a style={styles.logo}>
                                    <img
                                      src={require('../../assets/download.png')}
                                    />
                                  </a>
                                </span>
                              </text>
                            </Button>

                            <div style={styles.dwnbtm} />
                          </div>
                          <div className="column" style={{ marginLeft: '30%' }}>
                          <form>
                          <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} onChange={ (e) => this.upload_bundle(e.target.files) }/>
                            <Button type="submit" primary style={styles.upload} onClick={(e) => this.upload.click() }>
                              <text style={styles.txt}>
                                Upload
                                <span>
                                  <a style={styles.logo}>
                                    <img
                                      src={require('../../assets/upload.png')}
                                    />
                                  </a>
                                </span>
                              </text>
                            </Button>
                            <div style={styles.upldbtm} />
                          </form>
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                      <br />

                      <div className="two column row">
                        <div className="column" style={{ marginLeft: '35%' }}>
                          <div>
                            <img
                              src={require('../../assets/backward.png')}
                              onClick={this.back.bind(this)}
                              style={{ height: '49px', width: '49px' }}
                            />
                          </div>
                        </div>
                        <div className="column" style={{ marginLeft: '14%' }}>
                          <div>
                            <img
                              src={require('../../assets/forward.png')}
                              style={{ height: '49px', width: '49px' }}
                              onClick={this.forward.bind(this)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="two column row">
                        <div
                          className="column"
                          style={{ marginLeft: '33%', paddingTop: '10px' }}
                        >
                          <div style={{ fontSize: '18px', color: '#323643' }}>
                            Register Page
                          </div>
                        </div>
                        <div
                          className="column"
                          style={{ marginLeft: '8%', paddingTop: '10px' }}
                        >
                          <div style={{ fontSize: '18px', color: '#323643' }}>
                            Demo Page
                          </div>
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

export default InstructionsPage;
