import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import '../styles/navBar.css'
import { FaBell, FaSearch } from "react-icons/fa";

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideDropdown: true
        }

    }

    mousOverHandle = () => {
        this.setState({
            hideDropdown: false
        })
    }

    logoutEvent = () => {
        localStorage.removeItem('token');
    }

    render() {
        const {hideDropdown} = this.state;

        return (
            <div className="navBar">
                <div className="right-part">
                    <FaSearch className="nav-item"/>
                    <FaBell className="nav-item"/>
                    <div className="user-info" 
                    onMouseOver={() => this.setState({hideDropdown: false})} 
                    onMouseLeave={() => this.setState({hideDropdown: true})}>
                        <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" className="nav-item user-img"/>
                        <div className="user-name">Ann Smith</div>
                        <div className={`dropdown ${hideDropdown ? 'hideDropdown' : ''}`}>
                            <a href="/login" className="logout" onClick={this.logoutEvent}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar
