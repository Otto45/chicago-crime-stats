import React, { Component } from 'react';
import Plotly from 'plotly';
import _ from 'lodash';
import HashMap from 'hashmap';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

const TRACE_TYPE = "bar";

class CrimesGraph extends Component {
  constructor(props){
    super(props);

    this.state = {
      crimeTypeToArrayPos: new HashMap(),
      crimeTypesModelArray: [],
      crimeTypesCountsModelArray: []
    };

    // Create a hashmap between crime type name and array position in x below, 
    // to quickly determine corresponding position in y to update count of crime type 
    if(this.props.types && this.props.types > 0){
      _.forEach(this.props.types, (type, index) => {
        this.state.crimeTypeToArrayPos.set(type.PrimaryType, index);
        this.state.crimeTypesModelArray.push(type.PrimaryType);
        this.state.crimeTypesCountsModelArray.push(0);
      });
    }
  }  

  renderGraph(crimes){
    let data = [];
    _.times(12, (index) => {
      data.push({
        x: _.clone(this.state.crimeTypesModelArray),
        y: _.clone(this.state.crimeTypesCountsModelArray),
        name: MONTH_NAMES[index],
        type: TRACE_TYPE
      });
    });

    _.forEach(crimes, crime => {
      data[crime.month].y[this.state.crimeTypeToArrayPos(crime.type)]++;
    });

    Plotly.plot('crimesGraph', data, { barmode: 'group' });
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