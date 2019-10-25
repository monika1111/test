import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component : Component, auth, ...rest}) => {
    return <Route
        {...rest}
        render={props => {
            if(!auth.token) {
                return <Redirect to='/login'/>
            }
            return <Component {...props}/>
        }}
    />
};

const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
