import React, { Component } from 'react';
import Chart from 'chart.js';
import _ from 'lodash';
import HashMap from 'hashmap';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

const TRACE_TYPE = "bar";

class CrimesGraph extends Component {
  constructor(props){
    super(props);

    this.state = {
      crimeTypeToArrayPos: null,
    };
  }  

  renderGraph(crimes, types){
    let xAxis = [];
    let yAxis = [];

    _.forEach(types, type => {
      xAxis.push(type.PrimaryType);
      yAxis.push(0);
    });

    _.forEach(crimes, crime => {
      yAxis[this.state.crimeTypeToArrayPos.get(crime.type)]++;
    });

    let element = document.getElementById('crimesGraph');
    let options = {
      type: 'bar',
      data: {
        labels: xAxis,
        datasets: {
          data: yAxis
        }
      }
    };

    let chart = new Chart(element, options);
  }

  componentDidUpdate(){
    // Create a hashmap between crime type name and array position in x below, 
    // to quickly determine corresponding position in y to update count of crime type
    if(this.props.types && this.props.types.length > 0 && this.state.crimeTypeToArrayPos == null){
      let hashMap = new HashMap();
      
      _.forEach(this.props.types, (type, index) => {
        hashMap.set(type.PrimaryType, index);
      });

      this.setState({crimeTypeToArrayPos: hashMap});
    }

    if(this.state.crimeTypeToArrayPos !== null 
      && this.props.crimes && this.props.crimes.length > 0
      && this.props.types && this.props.types.length > 0)
    {
      this.renderGraph(this.props.crimes, this.props.types);
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <canvas height="1000" width="2000" id="crimesGraph"></canvas>
        </div>
      </div>
    );
  };
};

export default CrimesGraph;