import React, {Component} from 'react';
import ShapeScreen from './src/ShapeScreen'
import ListScreen from "./src/ListScreen";

export default class App extends Component {

  render() {
    return <ListScreen/>
  }
}

// import React, {Component} from 'react';
// import {StyleSheet, View} from 'react-native';
// import RNShake from 'react-native-shake';
// import {random} from './utils'
// import GestureSquare from './Square'
// import GestureCircle from './Circle'
// import {handleGesture} from "./handleGesture";
//
// const SHAPE_SIZE = {min: 40, max: 140}
//
// class MainView extends Component {
//
//   constructor() {
//     super()
//     this.numberOfClick = 0
//     this.state = {
//       shapes: []
//     }
//   }
//
//   // onMove = (evt) => {
//   //   if (!!this.selectedShape) {
//   //     this.setState({
//   //       shapes: this.state.shapes.map(s => {
//   //         if (s.layer !== this.selectedShape.layer)
//   //           return s
//   //
//   //         return {
//   //           ...s,
//   //           top: s.top + evt.nativeEvent.locationY,
//   //           left: s.left + evt.nativeEvent.locationX
//   //         }
//   //       })
//   //     })
//   //   }
//   // }
//
//   componentDidMount() {
//     RNShake.addEventListener('ShakeEvent', () => {
//       this.setState({shapes: []})
//     })
//   }
//
//   componentWillUnmount() {
//     RNShake.removeEventListener('ShakeEvent')
//   }
//
//   /**
//    * Handle tap gesture to create a shape on the screen
//    */
//   onTap(data) {
//     const v = this.createShape({
//       left: data.position.left,
//       top: data.position.top
//     }, this.state.shapes.length)
//     this.setState({shapes: [...this.state.shapes, v]})
//   }
//
//   createSquare(position, size, layer) {
//     return {
//       type: 'square',
//       width: size,
//       height: size,
//       position: 'absolute',
//       top: position.top,
//       left: position.left,
//       layer
//     }
//   }
//
//   createCircle(position, size, layer) {
//     return {
//       type: 'circle',
//       width: size,
//       height: size,
//       borderRadius: size / 2,
//       position: 'absolute',
//       top: position.top,
//       left: position.left,
//       layer
//     }
//   }
//
//   /**
//    * Create shape and its size randomly
//    */
//   createShape(position, layer) {
//     const rand = random(0, 1)
//     const size = random(SHAPE_SIZE.min, SHAPE_SIZE.max)
//
//     if (rand === 0) {
//       return this.createCircle({top: position.top - size / 2, left: position.left - size / 2}, size, layer)
//     } else if (rand === 1) {
//       return this.createSquare({top: position.top - size / 2, left: position.left - size / 2}, size, layer)
//     }
//   }
//
//   render() {
//     const {panHandlers} = this.props
//     return <View
//       {...panHandlers}
//       style={styles.container}>
//       {
//         this.state.shapes.map(s => {
//           if (s.type === 'square') {
//             return <GestureSquare key={s.layer} s={s}/>
//           } else {
//             return <GestureCircle key={s.layer} s={s}/>
//           }
//         })
//       }
//     </View>
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   }
// });
//
// export const ConnectedMainView = handleGesture(MainView)
//
// export default class App extends React.Component {
//   render() {
//     return <ConnectedMainView/>
//   }
// }