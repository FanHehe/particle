import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './index.scss';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Particle from '../utils/particle/';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        this.particle = new Particle();
        this.particle.insertInto(this.refs.canvas);
        window.addEventListener('resize', this.handleWindowResize.bind(this));
    }
    componentWillUnmount () {
        this.particle = null;
        window.removeListener('resize', this.handleWindowResize);
    }
    handleWindowResize () {
        this.particle.autoSize();
    }
    render () {
        return (<div className = { style.div } ref = "canvas"></div>);
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
