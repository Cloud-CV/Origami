import React from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from 'antd';
const { Header, Content, Footer } = Layout;
import Gallery from 'react-photo-gallery';
import { getDeployed } from "../../../api/Nongh/getDeployed";
import SampleImage from "../../sampleinput/SampleImage";
import TextSingleInput from "../../inputcomponents/TextInput/TextSingleInput";
import ImageSingleInput from "../../inputcomponents/ImageInput/ImageSingleInput";
import TextOutput from "../../outputcomponents/TextOutput/SingleOutput";

const server = [
  { src: require('../../assets/wire.png')},
  {src: require('../../assets/wire.png')},
  {src: require('../../assets/wire.png')},
  {src: require('../../assets/wire.png')},
  {src: require('../../assets/wire.png')}
];

const demo = [
  { src: require('../../assets/wire.png')},
  {src: require('../../assets/wire.png')}

];


class DemoPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      demo_creator_id: 0,
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
      files:[],
      subhover: 0,
      active:1
    }
    this.onSelect = this.onSelect.bind(this);
    this.updateFormData=this.updateFormData.bind(this);
    this.exit=this.exit.bind(this);
    this.sub=this.sub.bind(this);
    this.submit=this.submit.bind(this);
    this.toggleShowTerminal = this.toggleShowTerminal.bind(this);

  }

  componentWillMount(){
    console.log("mounted",server.length)
  
    let tmp = server
    let tmp2 = demo
    let cloudcv = [];
    let demo_creator =[];
    console.log("state change")
    while (tmp.length) {
      cloudcv.push(tmp.splice(0, 3));
    }
    while (tmp2.length) {
      demo_creator.push(tmp2.splice(0, 3));
    }

    this.setState({cloudcv:cloudcv,demo_creator:demo_creator});
  
  }



    onSelect(path) {
    if (this.state.resetBorder) {
      this.setState({ resetBorder: false });
    }
    console.log("lol")
  }
    updateFormData(newfile, newfilename) {
      console.log("kcuh aaya bhai",newfile,newfilename)
    this.setState({
      files: [...this.state.files, { newfilename, newfile }]
    });
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
      parentBox: {
        flexGrow: '5.0',
        minWidth: '200px',
        padding: '30px',
        backgroundColor: '#fffff',
   
      },
       box1: {
        border: '1px solid #F3F2F2',
        backgroundColor: 'White',
        borderRadius: '10px',
        padding: '10px',
      },
       txt: {
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '2em',
        marginLeft:'40%',
        fontWeight:'Bold',
        color:'#323643',
      },
            txt2: {
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1em',
      },

      task:{
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1.3em',
        color:'#323643',      	
      },
      task2:{
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1.3em',
        color:'#323643', 
        marginLeft:"40%"     	
      },
            source:{
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: '1.3em',
        color:'#323643', 
        marginLeft:"36%"     	
      },


       logo: {
        marginRight: '13px',
      },
      heading:{
      	 marginLeft: '41%',
      	 fontFamily: '"Open Sans", "Helvetica", sans-serif',
      	 color:'#323643', 
      	 fontSize: '18px'
      },
            sub: {
        borderStyle: 'Solid',
        width: '50%',
        borderWidth: '2px',
        borderRadius: '30px',
        backgroundColor: '#443E3E',
        color: 'White',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        transition: 'all 0.3s',
      },

      subhover: {
        borderStyle: 'Solid',
        width: '50%',
        borderWidth: '2px',
        borderRadius: '30px',
        backgroundColor: '#443E3E',
        color: 'White',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        transition: 'all 0.3s',
      },
   	
    
    }
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
    console.log("submit")
  }
  sample(e){
  	console.log("clicked")
    this.setState({active:e});  	
  }

  render() {

    let styles = this.getStyles();
    let sampleinputs=this.state.active == 1?this.state.cloudcv:this.state.demo_creator
     return (
      <div style={{ backgroundColor: '#F7F7F7' }}>
        <Layout style={styles.layout}>
          <Content style={styles.content}>
            <div style={styles.contentDiv}>

               <div
                  className="ui grid container"
                  style={{ position: 'relative' }}
                >   
                <div style={styles.txt}>
			          <span  > Demo Name</span>
            		</div>
            		<br/>
            		<br/>
            		<br/>
                    <div className="ui grid container">
                    <div className="column aligned" style={styles.parentBox}>

                      <div style={styles.box1}>
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

                       <div className="two column row" style={{marginLeft:'6%'}}>
                       <div className="column" style={styles.task}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/details.png')} />
                            </a>
                          </span>
                       Task Name  :
                       </div>

                       <div className="column" style={styles.task2}>
                                            <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/profile2.png')} />
                            </a>
                          </span>
                       Creator  :
                       </div>
                       </div>
                       <br/>
                       <div className="two column row" style={{marginLeft:'6%'}}>
                       <div className="column" style={styles.task}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/event.png')} />
                            </a>
                          </span>
                       Date of Creation  :
                       </div>

                       <div className="column" style={styles.source}>
                                            <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/code .png')} />
                            </a>
                          </span>
                       Source Code :
                       </div>
                       </div>                       

                       <br/>
                       </div>

                       <br/>
                       <br/>

                    <div style={styles.box1}>
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
                        <div className="row" style={{marginLeft:'8%'}}>
                        {sampleinputs.map((row,index) => (
                        <div>
                          <div className="row">
                         {row.map((value,index) => (
                          <SampleImage
                              key={index}
                              value={value.src}
                              onSelect={this.onSelect}
                              
                            />
                          ))}

                          </div> 
                          <br/>
                          <br/> 
                          </div>
                                               
                          ))} 
                          </div> 


                          <br/>
                           <br/>
                           <br/>
  
                         <div className='row' style={{marginLeft:'35%'}}>
                        <div class="btn-group btn-toggle"> 
                            <button class={this.state.active == 1?"btn btn-primary active":"btn btn-default"}  onClick={this.sample.bind(this,1)}>By CloudCV</button>
                            <button class={this.state.active == 2?"btn btn-primary active":"btn btn-default"} onClick={this.sample.bind(this,2)}>By Demo Creator</button>
                        </div>                         
                         </div>  

                       </div>

                       <br/>
                       <br/>
                       <div style={styles.box1}>
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
                        <div className="two column row" style={{marginLeft:"5%"}}>
                        <div className="column">
                          <ImageSingleInput
                              key={Math.random()}
                              index={1}
                              updateFormData={this.updateFormData}
                              calling_context={"demo"}
                              label={""}
                          />
                        </div>
                        <div className="column" style={{paddingLeft:'10%',paddingTop:'7%'}}>
                        <div >
                          <form id="send-text" className="six wide stackable stretched ui input">                        
                          <TextSingleInput
                            key={Math.random()}
                            index={1}
                            calling_context={"demo"}
                            label={"textinput"}
                          />    
                        </form>
                        <div style={{marginLeft:'37%','paddingTop':'20px'}}>
                        <div className="ui column centered"  >
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
                            <text style={styles.txt2}>Send</text>
                          </Button>
                        </div>
                        </div>
                        </div>                   
                        </div>
                        </div>

                        <br/>
                        <br/>


              <div className="ui four wide column" style={{marginTop:'6vh',marginLeft:"25%",}}>
              <h2 className="ui header grid">

                <div className="ui grid" style={{backgroundColor:'#F7F7F7',width: "39vw",borderRadius:'10%'}}>
                <div className="two column row" >
                <div className="column" style={{color:'#323643',fontSize:'16px',paddingLeft:'3%'}} >
                Terminal
                </div>
                <div className="column">
                <div style={{paddingLeft:'90%'}}>
                  <Button
                    type="danger"
                    shape="circle"
                    icon="close"
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
                style={{
                  height: "30vh",
                  width: "35vw",
                  backgroundColor: "#323643",
                  color: "white",
                  overflowY: "scroll",
                  wordWrap: "break-word"
                }}
              >
              </div>
            </div>

            <br/>
            <br/>
                <TextOutput
                headers={"output"}
                calling_context={"demo"}
                data={"phuck"}
              />
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
  socketId: PropTypes.string.isRequired
};


export default DemoPage;