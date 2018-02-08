import React from "react";
import { PropTypes } from "prop-types";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as nonghDemoModelActions from "../../../actions/nonghDemoModelActions";
import * as inputComponentDemoModelActions
  from "../../../actions/inputComponentDemoModelActions";
import { getAllInputComponentsForShowcase } from "../../inputcomponents";
import {
  getComponentDeployed
} from "../../../api/CommonLocal/getComponentDeployed";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import { grey900 } from "material-ui/styles/colors";
import toastr from "toastr";
import { Draggable, Droppable } from 'react-drag-and-drop'
import CustomCard from "../../stateless/cards";
import Button from 'material-ui-next/Button';
import Delete from 'material-ui-icons/Delete';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui-icons/Save';
import RaisedButton from 'material-ui/RaisedButton';


toastr.options.closeButton = true;


class SelectInputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      inputComponentDemoModel: {},
      outputComponentStepperHighlight: false,
      what:'Add something',
      array:[],
      Rows:[],
      labels:[]
    };

  }

  componentWillMount() {
    getComponentDeployed(this.state.user_id, this.props.params.repoId, "input")
      .then(inputComponentSeedData => {
        if (JSON.parse(inputComponentSeedData).length > 0) {
          let dataToSeed = {
            id: JSON.parse(inputComponentSeedData)[0].id,
            user_id: JSON.parse(inputComponentSeedData)[0].user_id,
            base_component_id: JSON.parse(inputComponentSeedData)[
              0
            ].base_component_id,
            props: JSON.parse(inputComponentSeedData)[0].props
          };
          let k=dataToSeed["props"];
          let net=[];
          console.log(k);
          Object.keys(k).forEach(function(key,index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
            if(k[key].id==="1")
              {
                net.push("Text Input");
                console.log(k[key].label);
              } 
            if(k[key].id==="3")
            {
              net.push("Image Input");
              console.log("Image");
            }
            });
          this.conv(net);
          console.log();
          this.setState({ inputComponentDemoModel: dataToSeed });
        }
      })
      .then(() => {
        getComponentDeployed(
          this.state.user_id,
          this.props.params.repoId,
          "output"
        ).then(outputComponentSeedData => {
          if (JSON.parse(outputComponentSeedData).length > 0) {
            this.setState({ outputComponentStepperHighlight: true });
          }
        });
      });

  }

  conv(arrayvar)
  {
    
        var row=[];
    for(var i=0;i<arrayvar.length;i++)
    {
      var k=arrayvar[i];
      console.log(k);
      row.push(
        
        <div key={i} style={{width: 'fit-content',margin: "auto"}}  >     
          <CustomCard
          header={k}
          width="five"
          centeredParent
          centeredSegment
          context="selection"
          />
          <br/>
          <button  onClick={this.onDrop2.bind(this,{i})}   type="button" className="btn btn-primary">Delete</button>
           <br/>
           <br/>
          </div>
          
         
      );
    }
    this.setState({ array: arrayvar,Rows:row});
  }

  onDrop2(data)
  {
    
    var index=data["i"];
    var arrayvar = this.state.array.slice();

    if (index > -1) {

    arrayvar.splice(index, 1);
    
    this.conv(arrayvar);
    }
    


  }
  onDrop(data)
  {
    console.log(this.state.inputComponentDemoModel);

    var arrayvar = this.state.array.slice();
    let d=data["ll"]?data["ll"]:data["lr"];
    console.log(d);
    arrayvar.push(d);
    this.conv(arrayvar);
  
    
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.state.inputComponentDemoModel !== nextProps.inputComponentDemoModel
    ) {
      this.setState({
        inputComponentDemoModel: nextProps.inputComponentDemoModel
      });
    }
  }
  dr(i){
    console.log(i);
  }

  render() {
    document.body.scrollTop = (document.documentElement.scrollTop = 0);
      const myScrollbar = {
      width: '900px',
      height: '400px',
      overflow: 'scroll',
      backgroundColor: 'grey'
    };
    const fix={
      position:'fixed'
    };
    const styles = {
        largeIcon: {
          width: 60,
          height: 60,
        },  
      };

 const but={
   position: 'absolute',
    bottom: 20,
    right: 125
 }
   
    
    return (
      
      <div className="ui relaxed stackable grid fluid" >

        <div className="ui relaxed stackable grid fluid container">
          <div
            style={{
              visibility: this.state.showOutput,
              width: "100%",
              maxWidth: 700,
              margin: "auto"
            }}
          >
            <Stepper linear={false}>
              <Step active>
                <StepLabel>Register Application</StepLabel>
              </Step>
              <Step active>
                <StepLabel>
                  <b style={{ fontSize: "large" }}>Select Input Component</b>
                </StepLabel>
              </Step>
              <Step active={this.state.outputComponentStepperHighlight}>
                <StepLabel>Select Output Component</StepLabel>
              </Step>
            </Stepper>
          </div>
          <div className="sixteen wide column stretched row">
            <div className="row">
              <h1>Select Input Component</h1>
            </div>
            <div className="ui horizontal divider row">
              <span><hr /></span>
            </div>

            <div
              className="fifteen wide column stretched stackable centered row"
            >
              <div
                className="ui three padded column stackable grid"
                style={{ marginLeft: "3%", minHeight: "90vh" }}
              >
                {getAllInputComponentsForShowcase({
                  demoModel: this.props.nonghDemoModel,
                  user: this.props.user,
                  inputComponentDemoModel: this.state.inputComponentDemoModel,
                  inputComponentModelActions: this.props.inputComponentModelActions,
                  forwardAddress: `/ngh/user/${this.props.nonghDemoModel.name}/${this.props.nonghDemoModel.id}/outputcomponent`,
                  params: this.props.params,
                  selected: this.state.inputComponentDemoModel.base_component_id
                }).map((showcasecard, index) => showcasecard)}

      
        <Droppable types={['ll','lr']}  onDrop={this.onDrop.bind(this)}>
          <div style={myScrollbar}>
          <div style={{ width: 'fit-content',margin: "auto"}}>
          <b style={{ fontSize: "large"}}>Drag N Drop</b>
          </div>
            
            <div style={but}>
            <RaisedButton label="Primary" primary={true}  />
            </div>
            
            
            {this.state.Rows.length>0 &&
              <div>
              {this.state.Rows}
              </div> }

              
          </div>
          </Droppable>
          
              </div>
            </div>
          </div>
        </div>


      
        <div
          className="ui fluid centered row"
          style={{
            minHeight: "5vh",
            backgroundColor: grey900,
            color: "white",
            minWidth: "100vw"
          }}
        >
          © CloudCV, 2016
        </div>
      </div>
     
      
    );
  }
}

SelectInputComponentPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  inputComponentModelActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    inputComponentDemoModel: state.inputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    inputComponentModelActions: bindActionCreators(
      inputComponentDemoModelActions,
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectInputComponentPage
);
