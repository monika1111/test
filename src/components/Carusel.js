import React, { Component } from "react";
import '../styles/carusel.scss'

class Carusel extends Component {
    constructor(props) {
        super(props)

        this.imgRef = new React.createRef();
        this.state = {
            images       : [...this.props.images],
            currentIndex : 0,
            timeoutId: null
        }
    }

    componentDidMount() {
        this.changeImg();
    }

    changeImg = () => {
        const {images, currentIndex} = this.state;
        this.imgRef.current.src = images[currentIndex];
    
        if(currentIndex < images.length - 1){
            this.setState({
                currentIndex: this.state.currentIndex + 1
            })
        } else { 
            this.setState({
                currentIndex: 0
            })
        }
    
        let timeoutId = setTimeout(this.changeImg, 3000);
        this.setState({
            timeoutId: timeoutId
        })
    }

    componentWillUnmount = () => {            
        if (this.state.timeoutId) {                                  
            clearTimeout(this.state.timeoutId);                   
        }                                        
    };  

    render() {
        const {images = [], currentIndex} = this.state

        return (
            <div className="carusel">
               <img ref={this.imgRef} name="slide" width="400" height="200" />
            </div>   
        )
    }
}

export default Carusel

