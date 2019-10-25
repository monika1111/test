import React, { Component } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/login.css'
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import * as authActions from "../actions/authActions";

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email    : '',
            password : '',
            showPass : false,
            active   : {
                email    : false,
                password : false
            }
        }
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        if(email && password){
            this.props.fetchUserLoginAction({email, password})
        }
    }

    render() {
        if (this.props.token) {
            return <Redirect to="/dashboard" />;
        } 

        const that = this,
            {showPass, active, email, password} = that.state;
        const IconComponent = showPass ? FaEye : FaEyeSlash;

        const activeEmail = active.email ? 'active' : '',
            activePass = active.password ? 'active' : '';

        return (
            <div className="flex-container">
                <div className="item-1">
                    <div className="loginContent">
                        <div className="sign-in">Sign in</div>
                        <div className="enter text">Enter yor email and password and login in your account</div>
                        <form className="login-form" onSubmit={this.onSubmit}>
                            <div className={`float-container ${activeEmail}`}>
                                <label htmlFor="floatField" className="inputLable">Email</label>
                                <input name="email" type="text"
                                    value={email}
                                    onChange={that.changeHandle}
                                    onFocus={() => that.setState({active : {email : true}})}/>
                            </div>
                            <div className={`float-container passDiv ${activePass}`}>
                                <label htmlFor="floatField" className="inputLable">Password</label>
                                <input name="password"
                                    value={password}
                                    type={showPass ? "text" : "password"}
                                    onChange={that.changeHandle}
                                    onFocus={() => that.setState({active : {password : true}})}/>

                                <span onClick={() => that.setState({showPass : !showPass})}>
                                    <IconComponent className="maskIcon"/>
                                    </span>
                            </div>
                            {this.props.error ? 
                                <div className="text-danger">{this.props.error}</div>
                                : null
                            }

                            <input type="submit" className="submit" value="SIGN IN"/>
                        </form>
                    </div>
                </div>
                <div className="item-2">
                    <img/>
                </div>
            </div>
        )
    }
}

const mapSatetToProps = (state) => { 
    return {
        token: state.auth.token,
        error: state.auth.loginErrorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserLoginAction : bindActionCreators(authActions.fetchUserLoginAction, dispatch)
    };
};

export default connect(mapSatetToProps, mapDispatchToProps)(Login);

