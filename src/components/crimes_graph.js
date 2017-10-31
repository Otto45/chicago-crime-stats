import React, { Component } from 'react';
import vis from 'vis';
import _ from 'lodash';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

const TRACE_TYPE = "bar";

class CrimesGraph extends Component {
  constructor(props){
    super(props);

    if(this.props.types && this.props.types > 0){
      // TODO: Create a hashmap between type name and array position number
    }
  }  

  renderGraph(crimes){
    let months = [];
    for(let i = 0; i < 12; i++){
      months.push({
        x: [],
        y: [],
        name: MONTH_NAMES[i],
        type: TRACE_TYPE
      });
    }

    _.forEach(crime => {
        if(!months[x][crime.type]){

        }
    });

    var dataset = new vis.DataSet(crimes);

    var graph2d = new vis.Graph2d(document.getElementById('crimesGraph'), dataset);
  }

  componentDidMount(){
    if(this.props.crimes && this.props.crimes.length > 0)
    {
      //this.renderGraph(this.props.crimes);
    }
  }

  componentDidUpdate(){
    if(this.props.crimes && this.props.crimes.length > 0)
    {
      //this.renderGraph(this.props.crimes);
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div id="crimesGraph"></div>
        </div>
      </div>
    );
  };
};

export default CrimesGraph;