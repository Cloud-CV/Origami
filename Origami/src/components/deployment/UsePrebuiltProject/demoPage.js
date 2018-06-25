import React from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from 'antd';
const { Header, Content, Footer } = Layout;

class DemoPage extends React.Component {
  constructor(props, context) {
    super(props, context);
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
      }
   	
    
    }
}

  render() {
    let styles = this.getStyles();
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
            		<br/>
                    <div className="ui grid container">
                    <div className="column aligned" style={styles.parentBox}>

                      <div style={styles.box1}>
                        <a style={styles.heading}>
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
                              <img src={require('../../assets/details.png')} />
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
                              <img src={require('../../assets/details.png')} />
                            </a>
                          </span>
                       Date of Creation  :
                       </div>

                       <div className="column" style={styles.source}>
                                            <span>
                            <a style={styles.logo}>
                              <img src={require('../../assets/details.png')} />
                            </a>
                          </span>
                       Source Code :
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


export default DemoPage;