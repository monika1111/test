import React, { Component } from "react";
import '../styles/dashboard.css'
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Location from "./Location";
import Media from "./Media";
import Preview from "./Preview";
import Topic from "./Topic";
import { connect } from "react-redux";

const componentstoStepsMap = {
    1 : Location,
    2 : Topic,
    3 : Media,
    4 : Preview
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const that = this;
        that.state = {
            currStep : 1
        }
    }

    render() {
        const that = this,
            {currStep} = that.state;

        const CurrentView = componentstoStepsMap[currStep];
        return (
            <div className="dashboard">
                <NavBar/>
                <div className="container">
                    <SideBar currStep={currStep}/>
                    <div className="content">
                        <CurrentView
                            onContinue={() => that.setState({currStep : currStep + 1})}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dashboard : state.dashboard,
    auth: state.auth
});

export default connect(mapStateToProps)(Dashboard)
