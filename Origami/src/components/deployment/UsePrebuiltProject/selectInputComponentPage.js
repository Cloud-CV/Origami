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
import Delete from 'material-ui-icons/Delete';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui-icons/Save';
import RaisedButton from 'material-ui/RaisedButton';
import InputShowcaseCard from "../../inputcomponents/BaseInputComponent/InputShowcaseCard.js";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import TypeInput from "../../inputcomponents/BaseInputComponent/TypeInput";
toastr.options.closeButton = true;
import io from "socket.io-client";

const SortableItem = SortableElement(({value}) =>
 <li style={{listStyleType:'none'}}>{value}</li>
);


const SortableList = SortableContainer(({items} ) => {
  return (
        <div style={{
        width: '900px',
        height: '400px',
        margin: '0 auto',
        overflowY: 'scroll',
        backgroundColor: '#f3f3f3',
        border: '1px solid #EFEFEF',
        borderRadius: 3
    }}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

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
           console.log("props aa rhe hai");
    console.log(this.props);
    this.id=props["params"].repoId;
    this.base_component_id=1;
    this.modify=(props["params"].type==="modify")
    this.forwardAddress="/ngh/user/"+props["routeParams"].repoName+"/"+ props["routeParams"].repoId+"/outputcomponent";
    
  }

  onSortEnd({oldIndex, newIndex}){
    console.log("old and new");
    console.log(oldIndex);
    console.log(newIndex);
    var old=this.state.array;
    var temp=old[oldIndex]
    old[oldIndex]=old[newIndex];
    old[newIndex]=temp;
    this.setState({
      Rows: arrayMove(this.state.Rows, oldIndex, newIndex),
      array:old
    });
  };

  componentWillMount() {




    getComponentDeployed(this.state.user_id, this.props.params.repoId, "input")
      .then(inputComponentSeedData => {
  
        if (JSON.parse(inputComponentSeedData).length > 0) {
          let id=JSON.parse(inputComponentSeedData)[0].id;
          let user_id= JSON.parse(inputComponentSeedData)[0].user_id;
          let base_component_id=JSON.parse(inputComponentSeedData)[
              0
            ].base_component_id

          let dataToSeed = {
            id: id,
            user_id: user_id,
            base_component_id: base_component_id,
            props: JSON.parse(inputComponentSeedData)[0].props
          };
          let k=dataToSeed["props"];
          let net=[];
          Object.keys(k).forEach(function(key,index) {
            if(k[key].id==1)
              {
                net.push("Text Input");
              } 
            if(k[key].id==3)
            {
              net.push("Image Input");
            }
            });
          this.helper(net);
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

  helper(arrayvar)
  {
    var row=[];
    
    
    for(var i=0;i<arrayvar.length;i++)
    {
      var prp=[];
      var k=arrayvar[i];
      let tem={};
      tem["id"]=(k=="Text Input"?1:3);
      tem["label"]=""
      prp.push(tem);

  
      row.push(
        <div key={i}  >     
        <TypeInput
        prop={prp}
        calling_context="demo2"
        socketId=""
        sendAddr=""
      />
          <br/>
          <div style={{margin: 'auto',width: '50%'}}>
          <button onClick={this.onDragOut.bind(this,{i})}   type="button" className="btn btn-primary">Delete</button>
          </div>
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
    
    let k=this.state.inputComponentDemoModel;
    var arrayvar = this.state.array.slice();
   
    let d=data["ll"]?data["ll"]:data["lr"];
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
      tem["id"]=(l[i]=="Text Input"?1:3);
      tem["label"]=""
      k.push(tem);

    }
    console.log("props input wale");
    console.log(this.props);
  
    this.props.inputComponentModelActions
    .updateInputComponentModel({
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
    getcon({data}){
  console.log("kuch hua");
  console.log(data);
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

 

  render() {
    document.body.scrollTop = (document.documentElement.scrollTop = 0);
      const myScrollbar = {
      width: '900px',
      height: '400px',
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
            <RaisedButton label="Submit" primary={true} onClick={this.onSubmit.bind(this)}  />
            </div>
            
            
            {this.state.Rows.length>0 &&
              <div >
              <SortableList items={this.state.Rows} onSortEnd={this.onSortEnd.bind(this)} lockToContainerEdges={true} lockOffset="60px" />;
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
