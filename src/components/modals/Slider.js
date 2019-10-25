import React, { Component } from "react";
import '../../styles/slider.css'
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

class Slider extends Component {
    constructor(props) {
        super(props)
        let {imgIndex, images} = this.props
        this.state = {
            currentIndex : imgIndex,
            images       : images
        }
    }

    closeModal = (event) => {
        let outSideElem = document.getElementById('slide');
        if(event.target == outSideElem) {
            this.props.showSlide(null, false);
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.closeModal);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeModal);
    }

    plusDivs = (n) => {
        let newIndex = this.state.currentIndex + n;
        let imgLength = this.state.images.length;

        if(newIndex >= imgLength) {
            this.setState({
                currentIndex : 0
            })
        } else if(newIndex < 0) {
            this.setState({
                currentIndex : imgLength - 1
            })
        } else {
            this.setState((prevState) => ({
                currentIndex : prevState.currentIndex + n
            }))
        }

    }

    render() {
        let {images = [], currentIndex} = this.state;

        return (
            <div className="slide" id="slide">
                {images.length ?
                    images.map((img, index) =>
                        <div className={`image-display-container ${index != currentIndex ? 'mySlides' : ''}`} key={index}>
                            <img src={img}/>
                            <FaChevronCircleLeft className="prev" onClick={() => this.plusDivs(-1)}/>
                            <FaChevronCircleRight className="next" onClick={() => this.plusDivs(1)}/>
                        </div>
                    ) : null}
            </div>

        )
    }
}

export default Slider
