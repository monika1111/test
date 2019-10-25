import React, { Component } from "react";
import { FaCheck } from "react-icons/fa";

class SideBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const that = this,
            {currStep} = that.props;

        return (
            <div className="sideBar">
                <ul>
                    <li className={`listItem ${currStep >= 1 ? `active` : null}`}>
                        <span className="number">1.</span>
                        <span>
                            Category and Location
                            {currStep > 1 ? <FaCheck className="checkIcon"/> : null}
                        </span>
                    </li>
                    <li className={`listItem ${currStep >= 2 ? `active` : null}`}>
                        <span className="number">2.</span>
                        <span>
                            Topic content
                            {currStep > 2 ? <FaCheck className="checkIcon"/> : null}
                        </span>
                    </li>
                    <li className={`listItem ${currStep >= 3 ? `active` : null}`}>
                        <span className="number">3.</span>
                        <span>
                            Media
                            {currStep > 3 ? <FaCheck className="checkIcon"/> : null}
                        </span>
                    </li>
                    <li className={`listItem ${currStep == 4 ? `active` : null}`}>
                        <span className="number">4.</span>
                        <span>Preview</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SideBar
