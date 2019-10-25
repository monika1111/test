import React, { Component } from "react";
import '../styles/location.css';
import Map from "./Map";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateTopicAction, getCategoriesAction } from '../actions/dashboardActions'

class Location extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formErrors: {}
        }
    }

    validation() {
        const {categoryId, address} = this.props,
              errors = {};
        if(!categoryId){
            errors.categoryId = 'The category field is required.';
        } 

        if(!address){
            errors.address = 'The address field is required.';
        }
        this.setState({
            formErrors: {                   
                ...errors     
            }
        }, () => {
            if(!Object.keys(this.state.formErrors).length) {
                this.props.onContinue();
            }
        })
    }

    componentDidMount() {
        this.props.getCategoryList();
    }

    submitHandle = (event) => {
        event.preventDefault();
        this.validation();
    }

    changeHandle = (e) => {
        this.props.updateTopic({[e.target.name] : e.target.value})
    }

    changeAddress = (info) => {
        this.props.updateTopic(info);
    }

    render() {
        const {categoryId, address, categories} = this.props;
        const{formErrors} = this.state;

        return (
            <form className="location" onSubmit={this.submitHandle}>
                <div className="contentTitle">Location and category</div>
                <div className="description">Please select your project category and choose loaction of your proposed project</div>
                <div className="boxContainer row">
                    <label>Category</label>
                    <div className="box">
                        <select name="categoryId" value={categoryId} onChange={this.changeHandle}>
                            <option >Select category</option>
                            {
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                        {formErrors.categoryId ? 
                        <div className="text-danger">{formErrors.categoryId}</div>
                        : null
                        }
                    </div>
                </div>
                <div className="row">
                    <label>Location</label>
                    <Map changeAddress={this.changeAddress} address={address}/>
                    {formErrors.address ? 
                        <div className="text-danger">{formErrors.address}</div>
                        : null
                    }

                </div>
                <input type="submit" className="continue" value="CONTINUE"/>
            </form>
        )
    }
}

const mapStateTpProps = (state) => {
    return {
        categoryId: state.dashboard.categoryId,
        address: state.dashboard.address,
        categories: state.dashboard.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTopic: (data) => (dispatch(updateTopicAction(data))),
        getCategoryList : bindActionCreators(getCategoriesAction, dispatch)
    }
}

export default connect(mapStateTpProps, mapDispatchToProps)(Location)
