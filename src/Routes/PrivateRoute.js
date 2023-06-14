import React from 'react';
import Cookies from  'universal-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Children }) => {

    const cookies = new Cookies();
    let user;
    user = cookies.get('user');

    if (!user) {
        return <Navigate to='/login' Replace />;


    } else {
        return Children;
    }


}

export default PrivateRoute