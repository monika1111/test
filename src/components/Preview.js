import React, { Component } from "react";
import Carusel from './Carusel'
import '../styles/preview.css'
import { connect } from 'react-redux';
import { saveTopic } from '../actions/dashboardActions';
import { bindActionCreators } from "redux";
import Success from './modals/Success'


class Preview extends Component {
    constructor(props) {
        super(props)
    }

    submitHandle = (e) => {
        e.preventDefault();
        this.props.saveTopic(this.props.data);
    }

    render() {
        const {saveTopicStatus, description, title, imagePreviews} = this.props.data.dashboard;

        return (
            <>
            {!saveTopicStatus ? 
                (<form className="preview" onSubmit={this.submitHandle}>
                    <div className="contentTitle">Preview</div>
                    <Carusel images={imagePreviews}/>
                    <div className="preview-user-img">
                        <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
                        <span className="user-name">Anna Smith</span>    
                    </div>
                    <div className="contentTitle">{title}</div>
                    <div>{description}</div>

                    <input type="submit" className="continue" value="PUBLISH"/>
                </form>)
                : <Success/> 
            }
            </>
        )
    }
}

const mapStateTpProps = (state) => {
    return {
        data: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTopic: bindActionCreators(saveTopic, dispatch)
    }
}

export default connect(mapStateTpProps, mapDispatchToProps)(Preview)