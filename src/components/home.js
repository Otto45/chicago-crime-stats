import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getYears, getTypes, getLocationDescriptions, getCrimes } from '../actions/search_actions';
import { connect } from 'react-redux';
import CrimesGraph from './crimes_graph';


class Home extends Component {

    componentWillMount(){
        this.props.getYears();
        this.props.getTypes();
        this.props.getCrimes();
    }

    generateYearListItems(){
        if(this.props.years && this.props.years.length > 0){
            return this.props.years.map(data => {
                if(data.Year === this.props.year){
                    return (<option key={data.Year} value={data.Year} selected="selected">{data.Year}</option>);
                } else {
                    return (<option key={data.Year} value={data.Year}>{data.Year}</option>);
                }
            });
        }
    }

    changeYear(event){
        var selectedYear = event.currentTarget.value;
        this.props.getCrimes(selectedYear);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                        <label>Select Year</label>
                        <select className="form-control" onChange={this.changeYear.bind(this)}>
                            <option></option>
                            {this.generateYearListItems()}
                        </select>
                    </div>
                </div>
                <br/>
                <br/>
                <CrimesGraph crimes={this.props.crimes} types={this.props.types}/>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        years: state.search.yearOptions,
        year: state.search.year,
        types: state.search.typeOptions,
        crimes: state.search.crimes
    }
}

export default connect(mapStateToProps, {getYears, getTypes, getCrimes})(Home);
