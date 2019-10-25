import React from "react";

/* global google */

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autocomplete: null
        }
    }

    changeHandle = (e) => {
        this.props.changeAddress({address: e.target.value});
    }

    componentDidMount() {
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('search-address')), {
            types: ['geocode'],
        });

        this.setState({
            autocomplete: autocomplete
        })

        google.maps.event.addListener(autocomplete, 'place_changed',  this.handlePlaceChanged);
    }

    handlePlaceChanged = () => {
        const nearPlace = this.state.autocomplete.getPlace();
        const lat = nearPlace.geometry.location.lat();
        const lng = nearPlace.geometry.location.lng();
        const address = nearPlace.formatted_address;

        this.props.changeAddress({address: address, lat: lat, lng: lng});
    }

    render() {
        const {address} = this.props

        return (
            <div className="locCont">
                <input id="search-address" 
                    name="address"
                    placeholder="Choose location"
                    type="text"
                    value={address}
                    onChange={this.changeHandle}/>
            </div>
        );
    }
}

export default Map
