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
    let backgroundColors = [];
    let borderLineColors = [];

    _.forEach(types, type => {
      xAxis.push(type.PrimaryType);
      yAxis.push(0);
      backgroundColors.push('rgba(54, 162, 235, 0.2)');
      borderLineColors.push('rgba(54, 162, 235, 1)');
    });

    _.forEach(crimes, crime => {
      yAxis[this.state.crimeTypeToArrayPos.get(crime.type)]++;
    });

    var ctx = document.getElementById("crimesGraph");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: '# of Votes',
                data: yAxis,
                backgroundColor: backgroundColors,
                borderColor: borderLineColors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
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
      $('#graphArea').removeClass('hidden');
    }
  }

  render(){
    return(
      <div>
        <div>
          <img src="/content/images/spinner.gif" alt="Loading..."/>
        </div>
        <div id="graphArea" className="row hidden">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 graph-background">
            <canvas id="crimesGraph"></canvas>
          </div>
        </div>
      </div>
    );
  };
};

export default CrimesGraph;
