import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import '../styles/media.css';
import Slider from './modals/Slider';
import { connect } from 'react-redux';
import { updateTopicAction } from '../actions/dashboardActions';

class Media extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files           : [],
            imagePreviewUrl : [],
            showSlide       : false,
            imgIndex        : null,
            formErrors: {}
        }
    }

    submitHandle = (event) => {
        event.preventDefault();
        this.props.updateTopic({imagePreviews: this.state.imagePreviewUrl})
        this.setState({showPreview : true})
        this.validation();
    }

    showSlide = (index, openSlide) => {
        this.setState({
            showSlide : openSlide,
            imgIndex  : index
        })
    }

    validation() {
        const {file} = this.props,
              errors = {};
        if(!file){
            errors.file = 'Min 1 image is required.';
        } 

        this.setState({
            formErrors: {                   
                ...errors     
            }
        }, () => {
            if(!Object.keys(this.state.formErrors).length) {
                this.props.onContinue();
            }
        })
    }

    changeHandle = (e) => {
        let files = e.target.files;
    
        if(files) {
            this.props.updateTopic({file: [...this.props.file, ...e.target.files]})
            
            Object.keys(files).forEach(key => {
                let reader = new FileReader();

                reader.onload = (event) => {
                    this.setState({
                        imagePreviewUrl : [
                            ...this.state.imagePreviewUrl,
                            event.target.result
                        ]
                    })
                }

                reader.readAsDataURL(files[key]);
            });
        }

    }

    removeImage = (index) => {
        let { imagePreviewUrl } = this.state,
            { file, updateTopic } = this.props;

        let files = file.filter((img, i) => i !== index);    

        updateTopic({file: files})

        this.setState({
            imagePreviewUrl : imagePreviewUrl.filter((img, i) => i !== index)
        })
    }

    render() {
        const {imagePreviewUrl = [], imgIndex, showSlide, formErrors} = this.state;

        return (
            <>
            <form className="media" onSubmit={this.submitHandle}>
                {!showSlide ? 
                    (<>
                        <div className="contentTitle">Media</div>
                        <div className="description">Choose images for the overview section of ypur topic</div>

                        <div className="mediaCont">
                            <div className="uploadImg">
                                <label htmlFor="file-input">+</label>
                                <input id="file-input"
                                    multiple
                                    name="file[]"
                                    type="file"
                                    onChange={this.changeHandle}/>
                            </div>
                            {
                                imagePreviewUrl.map((preview, index) => (
                                    <div className="img" key={index}>
                                        <img src={preview} id={index} onClick={() => this.showSlide(index, true)}/>
                                        <FaTimes className="remove" onClick={() => this.removeImage(index)}/>
                                    </div>)
                                )
                            }
                        </div>
                        {formErrors.file ? 
                            <div className="text-danger">{formErrors.file}</div>
                            : null
                            }
                        <input type="submit" className="continue" value="CONTINUE"/>
                    </>)
                    : <Slider showSlide={this.showSlide} imgIndex={imgIndex} images={imagePreviewUrl}/>}
            </form>
            </>
        )
    }
}

const mapStateTpProps = (state) => {
    return {
        file: state.dashboard.file
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTopic: (data) => (dispatch(updateTopicAction(data)))
    }
}

export default connect(mapStateTpProps, mapDispatchToProps)(Media)
