import React from "react";
import { PropTypes } from "prop-types";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as nonghDemoModelActions from "../../../actions/nonghDemoModelActions";
import * as outputComponentDemoModelActions
  from "../../../actions/outputComponentDemoModelActions";
import { getAllOutputComponentsForShowcase } from "../../outputcomponents";
import CustomCard from "../../stateless/cards";
import {
  getComponentDeployed
} from "../../../api/CommonLocal/getComponentDeployed";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import { grey900 } from "material-ui/styles/colors";
import toastr from "toastr";
import { Draggable, Droppable } from 'react-drag-and-drop';
import Button from 'material-ui-next/Button';
import Delete from 'material-ui-icons/Delete';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui-icons/Save';
import RaisedButton from 'material-ui/RaisedButton';

toastr.options.closeButton = true;

class SelectOutputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      outputComponentDemoModel: {},
      inputComponentStepperHighlight: false,
      array:[],
      Rows:[],
      labels:[]
    };
       console.log("props aa rhe hai");
    console.log(props);
    this.id=props["params"].repoId;
    this.base_component_id=1;
    this.modify=(props["params"].type==="modify")
    this.forwardAddress="/ngh/user/"+this.state.user_id+"/"+props["routeParams"].repoName+"/"+ props["routeParams"].repoId+"/demo";
    
    console.log("modify");
    console.log(this.forwardAddress);
    console.log(this.modify);


  }

  componentWillMount() {
    getComponentDeployed(
      this.state.user_id,
      this.props.nonghDemoModel.id,
      "output"
    )
      .then(outputComponentSeedData => {
        if (JSON.parse(outputComponentSeedData).length > 0) {
          let id=JSON.parse(outputComponentSeedData)[0].id;
          let user_id= JSON.parse(outputComponentSeedData)[0].user_id;
          let base_component_id=JSON.parse(outputComponentSeedData)[
              0
            ].base_component_id

          let dataToSeed = {
            id: id,
            user_id: user_id,
            base_component_id: base_component_id,
            props: JSON.parse(outputComponentSeedData)[0].props
          };

          let k=dataToSeed["props"];
          let net=[];
          Object.keys(k).forEach(function(key,index) {
            switch(k[key].id)
            {

              case 1:
                  net.push("Text Output");
                  break;

              case 2:
                  net.push("Image Output");
                  break;

              case 3:
                  net.push("Bar Graph Output");
                  break;

              case 4:
                  net.push("Scatter Graph Output");
                  break;

              case 5:
                  net.push("Pie Chart Output");
                  break;

              case 6:
                  net.push("Area Graph Output");
                  break;


            };
            });
          this.helper(net);
          this.setState({ outputComponentDemoModel: dataToSeed });
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

    helper(arrayvar)
  {
    var row=[];
    for(var i=0;i<arrayvar.length;i++)
    {
      var k=arrayvar[i];
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
          <button  onClick={this.onDragOut.bind(this,{i})}   type="button" className="btn btn-primary">Delete</button>
           <br/>
           <br/>
          </div>
          
         
      );
    }
    this.setState({ array: arrayvar,Rows:row});
  }

    onDragOut(data)
  {
    
    var index=data["i"];
    var arrayvar = this.state.array.slice();

    if (index > -1) {

    arrayvar.splice(index, 1);
    
    this.helper(arrayvar);
    }
  }

    onDrop(data)
  {
    
    let k=this.state.outputComponentDemoModel;
    var arrayvar = this.state.array.slice();
    var d;
    if(data["l1"]){
      d=data["l1"];
    }
    
    if(data["l2"]){
      d=data["l2"];
    }

    if(data["l3"]){
      d=data["l3"];
    }

    if(data["l4"]){
      d=data["l4"];
    }

    if(data["l5"]){
      d=data["l5"];
    }

    if(data["l6"]){
      d=data["l6"];
    }
    
   
    console.log("data aaega");
    console.log(data);

    arrayvar.push(d);
    this.helper(arrayvar);
  }


  onSubmit()
   {

    let k=[]
    let l=this.state.array;
    for(var i=0;i<l.length;i++)
    {
      let tem={};
      let t;
   switch(l[i])
    {

      case "Text Output":
          t=1
          break;

      case "Image Output":
          t=2;
          break;

      case "Bar Graph Output":
          t=3;
          break;

      case "Scatter Graph Output":
          t=4
          break;

      case "Pie Chart Output":
          t=5;
          break;

      case "Area Graph Output":
          t=6;
          break;
        }
      tem["id"]=t;
      tem["label"]=""
      k.push(tem);

    }
        console.log("props output wale");
    console.log(this.props);
  
    this.props.outputComponentDemoModelActions
    .updateOutputComponentModel({
      id: this.id,
      user_id: this.state.user_id,
      base_component_id: this.base_component_id,
      props: k 
    })
    .then(() => {
      if (this.modify) {
        browserHistory.push("/ngh/user");
      } else {
        browserHistory.push(this.forwardAddress);
      }
    });
   }


  componentWillReceiveProps(nextProps) {
    if (
      this.state.outputComponentDemoModel !== nextProps.outputComponentDemoModel
    ) {
      this.setState({
        outputComponentDemoModel: nextProps.outputComponentDemoModel
      });
    }
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
      <div className="ui relaxed stackable grid fluid">

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
              <Step active={this.state.inputComponentStepperHighlight}>
                <StepLabel>Select Input Component</StepLabel>
              </Step>
              <Step active>
                <StepLabel>
                  <b style={{ fontSize: "large" }}>Select Output Component</b>
                </StepLabel>
              </Step>
            </Stepper>
          </div>

          <div className="sixteen wide column stretched row">
            <div className="row">
              <h1>Select Output Component</h1>
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
                {getAllOutputComponentsForShowcase({
                  demoModel: this.props.nonghDemoModel,
                  user: this.props.user,
                  outputComponentDemoModel: this.state.outputComponentDemoModel,
                  outputComponentDemoModelActions: this.props.outputComponentDemoModelActions,
                  forwardAddress: `/ngh/user/${this.props.user.id || localStorage.getItem("user_id")}/${this.props.nonghDemoModel.name}/${this.props.nonghDemoModel.id}/demo`,
                  params: this.props.params,
                  selected: this.state.outputComponentDemoModel.base_component_id
                }).map((showcasecard, index) => showcasecard)}


        <Droppable types={['l1','l2','l3','l4','l5','l6']}  onDrop={this.onDrop.bind(this)}>
        <div style={myScrollbar}>
        <div style={{ width: 'fit-content',margin: "auto"}}>
        <b style={{ fontSize: "large"}}>Drag N Drop</b>
        </div>
          
          <div style={but}>
          <RaisedButton label="Submit" primary={true} onClick={this.onSubmit.bind(this)}  />
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

SelectOutputComponentPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    outputComponentDemoModelActions: bindActionCreators(
      outputComponentDemoModelActions,
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectOutputComponentPage
);
