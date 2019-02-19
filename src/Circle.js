import React from "react";
import {getWithTimeout} from "./networking";
import {View, Animated} from "react-native";
import {handleGesture} from "./handleGesture";
import {randomColor} from "./utils";

export class Circle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'black',
      deltaX: 0,
      deltaY: 0,
    }
    this.lastPositionX = null
    this.lastPositionY = null

    this.scale = new Animated.Value(0)
  }

  getColor() {
    getWithTimeout('http://www.colourlovers.com/api/colors/random?format=json')
      .then(res => {
        let color = null
        if (!!res && res.body.length > 0) {
          color = `#${res.body[0].hex}`
        } else {
          color = randomColor()
        }
        this.setState({backgroundColor: color})
      })
  }

  componentDidMount() {
    this.getColor()
    Animated.spring(this.scale, {
      toValue: 1
    }).start()
  }

  onDoubleTap() {
    this.getColor()
  }

  onMove(evt) {
    const {pageX, pageY} = evt.nativeEvent
    const {s} = this.props
    if (this.lastPositionX != null && this.lastPositionY != null) {
      this.setState({
        deltaX: this.state.deltaX + pageX - this.lastPositionX,
        deltaY: this.state.deltaY + pageY - this.lastPositionY
      }, () => {
        this.lastPositionX = pageX
        this.lastPositionY = pageY
      })
    } else {
      this.lastPositionX = pageX
      this.lastPositionY = pageY
    }
  }

  onReleasePan() {
    this.lastPositionX = null
    this.lastPositionY = null
  }

  render() {
    const {s, panHandlers} = this.props
    return <Animated.View
      {...panHandlers}
      key={s.layer}
      style={{
        backgroundColor: this.state.backgroundColor,
        width: s.width,
        height: s.height,
        borderRadius: s.borderRadius,
        position: 'absolute',
        top: s.top,
        left: s.left,
        transform: [{
          translateY: this.state.deltaY
        }, {
          translateX: this.state.deltaX,
        }, {
          scaleX: this.scale.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 1.2, 1]
          })
        }, {
          scaleY: this.scale.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 1.2, 1]
          })
        }]
      }}/>
  }
}

const GestureCircle = handleGesture(Circle)
export default GestureCircle