import React, { Component } from "react";
import '../../styles/success.css'
import image from "../../success.png";
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { changeSaveTopicStatusAction } from '../../actions/dashboardActions'

class Success extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        };
    }

    closeModal = () => {
        this.setState({
            redirect: true
        }, this.props.changeSaveTopicStatus)
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/login'/>
        }
        return (
            <div className="success" id="success">
                <div className="cont-success">
                    <img src={image}/>
                    <div className="status-success">Your topic was successfully submited!</div>
                    <div className="message">We are very thankful that you are our community active member.
                        It will appear in community forum as soon as we have an overview look at it
                    </div>
                    <div><input type="submit" className="ok" value="OK" onClick={this.closeModal}/></div>
                </div>
            </div>

        )
    }
}

const mapStateTpProps = (state) => {
    return {
        saveTopicStatus: state.dashboard.saveTopicStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSaveTopicStatus: () => (dispatch(changeSaveTopicStatusAction())),
    }
}

export default connect(mapStateTpProps, mapDispatchToProps)(Success)

