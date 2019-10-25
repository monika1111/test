import React, { Component } from "react";
import '../styles/topic.css';
import { connect } from 'react-redux';
import { updateTopicAction } from '../actions/dashboardActions'

class Topic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formErrors: {}
        }
    }

    validation() {
        const {title, description, amount} = this.props,
              errors = {};
        if(!title){
            errors.title = 'The title field is required.';
        } 

        if(!description){
            errors.description = 'The description field is required.';
        }

        if(!amount){
            errors.amount = 'The amount field is required.';
        } else if(!amount.match(/^[0-9]+$/)) {
            errors.amount = 'The amount should be number.';
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

    submitHandle = (event) => {
        event.preventDefault();
        this.validation();
    }

    changeHandle = (e) => {
        this.props.updateTopic({[e.target.name] : e.target.value})
    }

    render() {
        const {title, description, amount} = this.props;
        const{formErrors} = this.state;

        return (
            <form className="topic" onSubmit={this.submitHandle}>
                <div className="contentTitle">Topic content</div>
                <div className="description">Give name to the topic that will attract as
                    many people as possible. The more people upvoted for it, the more are chances that
                    it will be started. Describe project and why it is important to start.
                </div>

                <div className="row">
                    <label>Title</label>
                    <input type="text"
                        className="title field" 
                        name="title"
                        placeholder="Write title"
                        value={title}
                        onChange={this.changeHandle}/>
                    {formErrors.title ? 
                    <div className="text-danger">{formErrors.title}</div>
                    : null
                    }
                </div>
                <div className="row">
                    <label>
                        <span>Description</span>
                        <span className="bold-right">min 600 symbols</span>
                    </label>
                    <textarea 
                        value={description}
                        name="description"
                        className="description-area field" 
                        placeholder="Topio description"
                        onChange={this.changeHandle}/>
                    {formErrors.description ? 
                    <div className="text-danger">{formErrors.description}</div>
                    : null
                    }
                </div>
                <div className="row">
                    <label>Rough project butget</label>
                    <input type="text"
                        className="title field" 
                        name="amount"
                        placeholder="Write amount"
                        value={amount}
                        onChange={this.changeHandle}/>
                    {formErrors.amount ? 
                    <div className="text-danger">{formErrors.amount}</div>
                    : null
                    }
                </div>
                <div className="wrapper row">
                    <label className="container-input">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <span className="bold-right-accapt">I am not sure how much amount is required</span>
                </div>
                <input type="submit" className="continue" value="CONTINUE"/>
            </form>
        )
    }
}


const mapStateToProps = (state) => {
    const {title, description, amount} = state.dashboard;

    return {
        title: title,
        description: description,
        amount: amount,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        updateTopic: (data) => dispatch(updateTopicAction((data)))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Topic)
