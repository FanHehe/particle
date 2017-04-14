import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './index.scss';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render () {
        console.log(this.props)
        return (<div className = { style.div }> hehe</div>);
    }
}

App.propTypes = {

}
App.defaultProps = {
    a: 1
}
function mapStateToProps (state) {
    return state;
}
function mapDispatchToProps (dispatch, props) {
    return {
        ...bindActionCreators(actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
