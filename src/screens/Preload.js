import {  CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

const Preload = (props) => {
    if(!props.token) {
        //LOGIN
        props.navigation.dispatch(CommonActions.reset({
            index:0,
            routes:[
                {name:'Login'}
            ]
        }));
    }else{
        props.navigation.dispatch(CommonActions.reset({
            index:0,
            routes:[
                {name:'HomeDrawer'}
            ]
        }));
    }
    
    
    return null;
}

const mapStateToProps = (state) => {
    return{
            token: state.userReducer.token
    };
}

export default connect(mapStateToProps)(Preload);