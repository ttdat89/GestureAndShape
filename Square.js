import React from "react";
import {getWithTimeout} from "./networking";
import {Image} from "react-native";
import {handleGesture} from "./handleGesture";
import {randomColor} from "./utils";

export class Square extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'white',
      deltaX: 0,
      deltaY: 0,
    }
    this.lastPositionX = null
    this.lastPositionY = null
  }

  onDoubleTap() {
    this.getImage()
  }

  componentDidMount() {
    this.getImage()
  }

  /**
   * This function is the duplicated one of Circle's onMove function. Will move to high order component for the reuse later
   */
  onMove(evt) {
    const {pageX, pageY} = evt.nativeEvent
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

  getImage() {
    getWithTimeout('http://www.colourlovers.com/api/patterns/random?format=json')
      .then(res => {
        let imgUrl = null
        if (!!res && res.body.length > 0) {
          imgUrl = res.body[0].imageUrl
          this.setState({imageUrl: imgUrl})
        } else {
          this.setState({backgroundColor: randomColor(), imageUrl: null})
        }
      })
  }

  render() {
    const {s, panHandlers} = this.props
    return <Image
      {...panHandlers}
      source={!!this.state.imageUrl ? {uri: this.state.imageUrl} : null}
      key={s.layer}
      style={{
        backgroundColor: this.state.backgroundColor,
        width: s.width,
        height: s.height,
        position: 'absolute',
        top: s.top,
        left: s.left,
        transform: [{
          translateY: this.state.deltaY
        }, {
          translateX: this.state.deltaX,
        }]
      }}/>
  }
}

const GestureSquare = handleGesture(Square)
export default GestureSquare