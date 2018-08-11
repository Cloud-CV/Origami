import React from "react";
import { PropTypes } from "prop-types";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from 'antd';
const { Header, Content, Footer } = Layout;
import { Form, Radio } from 'semantic-ui-react'
import { BounceLoader } from 'react-spinners';
import userApi from '../../api/Github/userApi';
import { getAllDeployed } from '../../api/Nongh/getAllDeployed';
import { getSearchedDemos } from '../../api/Nongh/getSearchedDemos';
const demoSpinnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
};
class SelectDemoCompare extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state={
      value:'',
      allDeployed:[],
      demoLoading:true,
      profile:{},
      clicked:{},
      selected:[],
      subhover:''
    }
    this.handleChange=this.handleChange.bind(this);
  }



  findDemo(task){
  getSearchedDemos("task", task)
      .then(allRepos => {
        if (Object.keys(JSON.parse(allRepos)).length > 0) {
          let tmp = JSON.parse(allRepos);
          let allDeployed = [];
          while (tmp.length) {
            allDeployed.push(tmp.splice(0, 3));
          }
          
          this.setState({
            allDeployed:allDeployed,
            clicked:{},
            selected:[]
          });
        } else {
          this.setState({ allDeployed: [],clicked:{},selected:[] });
        }
      })
      .catch(err => {
        toastr.error(err);
      });
      


  }


  handleChange(e){
  this.findDemo(e);
   this.setState({ value:e })}

  Loaded() {
    this.setState({ loaded: true });
    this.forceUpdate();
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
        marginLeft: '37%',
        fontFamily: "'Roboto', sans-serif",
        color: '#323643',
        fontSize: '18px',
      },
      sub: {
        borderStyle: 'Solid',
        width: '75%',
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
        width: '75%',
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
      },
      radio:{
        display: 'inline-block', 
        width: 'auto',
        paddingRight:'8%',
        fontWeight:'Bold'
      },
      demo:{
        
    width: '80%',
    borderWidth: '0px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
    transition: 'all 1s',
      },
      clicked:{
    width: '80%',
    borderWidth: '3px',
    borderStyle:'Solid',
    borderColor:'#323643',
    transition: 'all 1s',
      }
    };
  }
  exit() {
    this.setState({ active: 0, btnactive: 0, subhover: 0 });
  }
    sub(e) {
    this.setState({ subhover: e });
  }

  clicked(e){
    var clicked=this.state.clicked;
    var selected=this.state.selected;
    if(this.state.clicked[e]){
      clicked[e]=""
      var index=selected.indexOf(e);
      if(index>-1){
        selected.splice(index,1);
      }
      this.setState({clicked:clicked,selected:selected});
    }
    else{
    clicked[e]=true;
    selected.push(e);
    this.setState({clicked:clicked,selected:selected});
  }
  }

  submit(){
    var selected=this.state.selected;
    var url="/demo_compare/?";
    for(var i=0;i<selected.length;i++){
      if(i==0)
      url+="demo[]="+selected[i];
      else
        url+="&demo[]="+selected[i];
    }
    console.log("url ==",url)
    this.props.history.push(url)
  }

  render(){
    let styles = this.getStyles();
    return(
      <div>
          <Layout style={{ backgroundColor: '#FEFEFE' }}>
        <Header id="layout-header">
          <Row>
            <Col span={5} offset={10}>
              <h2 id="logo-title">Origami Compare</h2>
            </Col>
          </Row>
        </Header>


                <br />
                <div className="ui grid container">
                  <div className="column aligned" style={styles.parentBox}>
                    <div >
                      <a style={styles.heading}>
                        <span>
                          <a style={styles.logo}>
                            <img src={require('../assets/about.png')} />
                          </a>
                        </span>
                        Select the task to compare
                      </a>
                      <hr
                        style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                      />
                      <div style={{paddingLeft:'16%'}}>
              <Form >
                <Form.Field  style={styles.radio}>
                  <Radio
                    label='VQA'
                    name='radioGroup'
                    value='this'
                    style={{fontSize:'17px'}}
                    checked={this.state.value === 'VQA'}
                    onClick={this.handleChange.bind(this,"VQA")}
                  />
                </Form.Field>
                <Form.Field  style={styles.radio}>
                  <Radio
                    label='Style Transfer'
                    name='radioGroup'
                    value='that'
                    style={{fontSize:'17px'}}
                    checked={this.state.value === 'Style Transfer'}
                    onChange={this.handleChange.bind(this,"Style Transfer")}
                  />
                </Form.Field>
                <Form.Field  style={styles.radio}>
                  <Radio
                    label='Classification'
                    name='radioGroup'
                    value='that'
                    style={{fontSize:'17px'}}
                    checked={this.state.value === 'Classification'}
                    onChange={this.handleChange.bind(this,"Classification")}
                  />
                </Form.Field>
              <Form.Field  style={styles.radio}>
                  <Radio
                    label='Grad Cam'
                    name='radioGroup'
                    value='that'
                    style={{fontSize:'17px'}}
                    checked={this.state.value === 'Grad Cam'}
                    onChange={this.handleChange.bind(this,"Grad Cam")}
                  />
                </Form.Field>
              </Form>
              </div>

                    </div>


                    <br/>
                    <br/>
                    {Object.keys(this.state.allDeployed).length > 0 &&
                    <div >
                      <a style={styles.heading}>
                        <span>
                          <a style={styles.logo}>
                            <img src={require('../assets/about.png')} />
                          </a>
                        </span>
                        Select the demos
                      </a>
                      <hr
                        style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                      />
 
              <Row >
                {this.state.allDeployed.map((row,indx1) => (
                    <div key={Math.random()}>
                      <Row>
                        {row.map((demo,indx2)=> (

                          <Col span={6} offset={2} key={demo.id}>
                            <div
                              class="ui card"
                              style={this.state.clicked[demo.id] ? styles.clicked:styles.demo}
                              onClick={this.clicked.bind(this,demo.id)}
                              
                              

                            >
                              <div class="content" style={{ color: '#323643' }}>
    
                                <span
                                  style={{
                                    paddingLeft: '5px',
                                    fontSize: '14px',
                                  }}
                                >
                                  {' '}
                                  {demo.username}{' '}
                                </span>
                              </div>
                              <div class="small image">
                                <img
                                  src={demo.cover_image}
                                  style={{ height: '24vh' }}
                                />
                              </div>
                              <div class="content">
                                <span
                                  style={{
                                    margin: 'auto',
                                    fontSize: '17px',
                                    fontWeight: 'Bold',
                                  }}
                                >
                                  {demo.name}
                                </span>
                                <br />
                              </div>
                              <div
                                class="extra content"
                                style={{
                                  backgroundColor: '#606470',
                                  color: 'White',
                                  borderWidth: '0px',
                                }}
                                
                              >
                                <span>Demo</span> <Icon type="rocket" />
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <br />
                      <br />
                      <br />
                    </div>
                  ))}
                                    <hr
                        style={{ borderTop: 'dotted 1px', color: '#aaaaaa' }}
                      />
                        <br/>

                      <div className="ui grid">
                        <div className="four wide column" />
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
                            <text style={styles.txt} >Compare</text>
                          </Button>
                        </div>
                      </div>
                
              </Row>
               </div>
                  }
                  
                      

                    </div>
                    </div>




        </Layout>
      </div>

      );




  }





};
export default SelectDemoCompare;
