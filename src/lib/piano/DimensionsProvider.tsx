import React from "react";
import Dimensions from "react-dimensions";

class DimensionsProvider extends React.Component<any, any, any> {
    render() {
        return (
            <div>
                {/* @ts-ignore */}
                {this.props.children({
                    containerWidth: this.props.containerWidth,
                    containerHeight: this.props.containerHeight,
                })}
            </div>
        );
    }
}

export default Dimensions()(DimensionsProvider);
