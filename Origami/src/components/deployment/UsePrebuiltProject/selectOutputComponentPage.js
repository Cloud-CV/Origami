import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as nonghDemoModelActions from "../../../actions/nonghDemoModelActions";
import * as outputComponentDemoModelActions from "../../../actions/outputComponentDemoModelActions";
import { getAllOutputComponentsForShowcase } from "../../outputcomponents";
import { getComponentDeployed } from "../../../api/CommonLocal/getComponentDeployed";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import { grey900 } from "material-ui/styles/colors";
import toastr from "toastr";
import { Modal, Button } from 'antd';
import {getOutputComponentById} from "../../outputcomponents/index";
import RaisedButton from 'material-ui/RaisedButton';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { Responsive, WidthProvider } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);



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
      current:0,
      value:"",
      visible: false,
      label:[],
      layout:[]
    };
    console.log("props");
    console.log(props)

    this.browserHistory=this.props.history;
    this.id=props['match']['params'].repoId;
    this.base_component_id=1;
    this.modify=(props['match']['params'].type==="modify")
        this.forwardAddress =
      '/ngh/user/' +
      this.state.user_id +
      '/' +
      props['match']['params'].repoName +
      '/' +
      props['match']['params'].repoId +
      '/demo';
    }

    onSortEnd({oldIndex, newIndex}){
    var old=this.state.array;
    var lab=this.state.label;
    var temp=old[oldIndex];
    old[oldIndex]=old[newIndex];
    old[newIndex]=temp;

    var temp2=lab[oldIndex];
    lab[oldIndex]=lab[newIndex];
    lab[newIndex]=temp2;

    this.helper(old,lab);
  };

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
          let lab=[];
          let ley = [];

          console.log("layout = ==");
          for (var i = 0; i <k.length; i++) {
            if("layout" in k[i])
            ley.push(k[i]["layout"]);
          }

          Object.keys(k).forEach(function(key,index) {
          switch(k[key].id){

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
            lab[index]=k[key]["label"];
            });
          this.helper(net,lab);
          this.setState({ outputComponentDemoModel: dataToSeed,layout:ley});
        }
      })
      .then(() => {
        getComponentDeployed(
          this.state.user_id,
          this.props['match']['params'].repoId,
          "output"
        ).then(outputComponentSeedData => {
          if (JSON.parse(outputComponentSeedData).length > 0) {
            this.setState({ outputComponentStepperHighlight: true });
          }
        });
      });
  }

  getHeight(){

    let ley = this.state.layout;
    let mx=0
    if(ley.length>0)
    {
    for (var i = 0; i < ley.length; i++) {
      if(ley[i]["x"]==2)
      {
      mx=Math.max(ley[i]["y"],mx)
    }
    }
  }

    return ley.length>0?mx+8:mx

  }


  showModal(e){
    let lab=this.state.label;
    this.setState({
      value:lab[e["index"]],
      visible: true,
      current:e["index"],

    });
  }


    handleOk(event){
    var array=this.state.array;
    var lab=this.state.label;
    var val=this.state.value;
    var idx=this.state.current;
    lab[idx]=val;
    this.helper(array,lab);
    this.setState({value:""});
  }

    handleCancel(e){
    this.setState({
      visible: false,
      value:""
    });
  }

    helper(arrayvar,lab)
  {
    var row=[];
    for(var i=0;i<arrayvar.length;i++)
    {
      var k=arrayvar[i];
      var prp={};
      var le=[];

      var t;
        switch(k)
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
  
      prp["id"]=t;
      prp["label"]=(lab[i]?lab[i]:"");
      le.push(prp);
      var data=[];
      var id=this.base_component_id;
      row.push(
        <div key={i}   >     
        {getOutputComponentById(id,le,"demo2",data)}
          

          </div>
          
         
      );
    }
    this.setState({ array: arrayvar,Rows:row,visible:false,label:lab,value:""});
  }

    onDelete(data){

    var index=data["index"];
    var lab=this.state.label;
    var arrayvar = this.state.array.slice();
    var ley =this.state.layout;
    if (index > -1) {
    arrayvar.splice(index, 1);
    lab.splice(index, 1);
    ley.splice(index, 1);
    this.setState({layout:ley});
    this.helper(arrayvar,lab);
    }
  }

    onDrop(data){
    let k=this.state.outputComponentDemoModel;
    var arrayvar = this.state.array.slice();
    let lab=this.state.label.slice();
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
    arrayvar.push(d);
    lab.push("");
    let ley =this.state.layout;
        let tmp=[];
    tmp["x"]=2;
    tmp["y"]=this.getHeight();
    tmp["w"]=2;
    tmp["h"]=3;
    ley.push(tmp);
    this.setState({layout:ley})
    this.helper(arrayvar,lab);
  }


  onSubmit(){
    let k=[]
    let l=this.state.array;
    let lab=this.state.label;
    let layout=this.state.layout;
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
      tem["label"]=(lab[i]?lab[i]:"");
      tem['layout']=layout[i];
      k.push(tem);

    }
  
    this.props.outputComponentDemoModelActions
    .updateOutputComponentModel({
      id: this.id,
      user_id: this.state.user_id,
      base_component_id: this.base_component_id,
      props: k 
    })
    .then(() => {
      if (this.modify) {
        this.browserHistory.push("/ngh/user");
      } else {
        this.browserHistory.push(this.forwardAddress);
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

    handleChange(event) {
    this.setState({value: event.target.value});
  }
    onLayoutChange(prop){
    this.setState({layout:prop});
  }
 

  render() {
    document.body.scrollTop = (document.documentElement.scrollTop = 0);
     const myScrollbar = {
      minWidth: '71vw',
      minHeight:'63vh',
      overflow: 'scroll',
      backgroundColor: 'grey'
    };

     const but={
       position: 'absolute',
        bottom: "0.5%",
        right:  "10%",
  
     }
     let layout=this.state.layout;


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
                className="ui two padded column stackable grid"
                style={{marginLeft:"2%", minHeight: "100vh" }}
              >
                {getAllOutputComponentsForShowcase({
                  demoModel: this.props.nonghDemoModel,
                  user: this.props.user,
                  outputComponentDemoModel: this.state.outputComponentDemoModel,
                  outputComponentDemoModelActions: this.props.outputComponentDemoModelActions,
                  forwardAddress: `/ngh/user/${this.props.user.id || localStorage.getItem("user_id")}/${this.props.nonghDemoModel.name}/${this.props.nonghDemoModel.id}/demo`,
                  params: this.props['match']['params'],
                  selected: this.state.outputComponentDemoModel.base_component_id
                }).map((showcasecard, index) => showcasecard)}
                        <br/>
        <br/>
                <Droppable
                  types={['l1', 'l2', 'l3', 'l4', 'l5', 'l6']}
                  onDrop={this.onDrop.bind(this)}
                >

        <br/>
        <br/>


                  <div style={myScrollbar}>
                    <div style={{ width: 'fit-content', margin: 'auto' }}>
                      <b style={{ fontSize: 'large' }}>Drag N Drop</b>
                    </div>

                    {this.state.Rows.length > 0 && (
                    <GridLayout
                    rowHeight={50} className="layout" 
                    col={10}
                    width={2000}
                   verticalCompact={false}
                  onLayoutChange={this.onLayoutChange.bind(this)}
                  layout={layout}
                  isResizable={false}
                        style={{
                  width: '71vw',
                  height: '64vh',
                  margin: '0 auto',
                  overflowY: 'scroll',
                  backgroundColor: '#f3f3f3',
                  border: '1px solid #EFEFEF',
                  borderRadius: 3
                }}
                   >
                                      {this.state.Rows.map((value,index)=>

                  <div key={index} data-grid={layout[index]}  >
                  <li style={{ listStyleType: 'none' }}>{value}</li>
                            <button
                            onClick={this.onDelete.bind(this, { index })}
                            type="button"
                            className="btn btn-primary"
                          >
                           Delete
                          </button>
                                            <button
                 type="button"
                 onClick={this.showModal.bind(this, { index })}
                 className="btn btn-primary"
                 style={{ float: 'right' }}
               >
                 Label
               </button>
                  </div>
                  )}


                      </GridLayout>

                    )}
                    <Modal
                      title="Input Label"
                      visible={this.state.visible}
                      onOk={this.handleOk.bind(this)}
                      onCancel={this.handleCancel.bind(this)}
                    >
                      <form onSubmit={this.handleOk.bind(this)}>
                        <div className="form-group">
                          <label for="usr">Label:</label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                          />
                        </div>
                      </form>
                    </Modal>
   
                  </div>
                                    <br/>
        <br/>
                </Droppable>
                                 <div style={but}>
                      <RaisedButton
                        label="Submit"
                        primary={true}
                        onClick={this.onSubmit.bind(this)}
                      />
                    </div>
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
  match: PropTypes.object.isRequired
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
