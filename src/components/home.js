import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getYears, getTypes, getLocationDescriptions, getCrimes } from '../actions/search_actions';
import { connect } from 'react-redux';
import vis from 'vis';

class Home extends Component {

    componentDidMount(){
        this.props.getYears();
        this.props.getTypes();
        this.props.getLocationDescriptions();
        this.props.getCrimes();
    }

    generateYearListItems(){
        if(this.props.years && this.props.years.length > 0){
            return this.props.years.map(data => {
                return (<option key={data.Year} value={data.Year}>{data.Year}</option>);
            });
        }
    }

    generateTypeListItems(){
        if(this.props.types && this.props.types.length > 0){
            return this.props.types.map(data => {
                return (<option key={data.PrimaryType} value={data.PrimaryType}>{data.PrimaryType}</option>);
            });
        }
    }

    generateLocDescrListItems(){
        if(this.props.locationDescriptions && this.props.locationDescriptions.length > 0){
            return this.props.locationDescriptions.map(data => {
                return (<option key={data.LocationDescription} value={data.LocationDescription}>{data.LocationDescription}</option>);
            });
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                        <label>Select Year</label>
                        <select className="form-control">
                            <option></option>
                            {this.generateYearListItems()}
                        </select>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                        <label>Select Crime Type</label>
                        <select className="form-control">
                            <option></option>
                            {this.generateTypeListItems()}
                        </select>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                        <label>Select Location Description</label>
                        <select className="form-control">
                            <option></option>
                            {this.generateLocDescrListItems()}
                        </select>
                    </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <div id="crimesGraph"></div>
                  </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        years: state.search.yearOptions,
        types: state.search.typeOptions,
        locationDescriptions: state.search.locationDescriptions,
        crimes: state.search.crimes
    }
}

export default connect(mapStateToProps, {getYears, getTypes, getLocationDescriptions, getCrimes})(Home);
