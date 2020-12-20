import React from 'react';
import ReactDOM, { render } from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component{
    state = { lat: null, errorMessage:'' };

    componentDidMount() {
        this.getGeolocation();
    }

    componentDidUpdate() {
        console.log('My component was just updated - it rerendered!');
    }

    getGeolocation() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat:position.coords.latitude}),
            err => this.setState({ errorMessage: err.message })
        );

    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>;
        } 
        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat}/>;
        } 
        return <div><Spinner message="Please accept location request"/></div>;
    }

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    };
}

ReactDOM.render(<App/>,document.querySelector('#root'));