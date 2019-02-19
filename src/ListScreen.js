import React, {Component} from 'react'
import {View, FlatList, Animated, Dimensions, SwipeableFlatList} from 'react-native'
import {handleGesture} from "./handleGesture"

const {width} = Dimensions.get('window')

const ItemSeparator = () => <View style={{height: 1, backgroundColor: '#dcdcdc'}}/>


class Item extends React.Component {

  constructor(props) {
    super(props);

    this.lastPositionX = null
    this.deltaX = new Animated.Value(0)
    this.hiddenDeltaX = 0
    this.currentSwipeDirection = null
  }

  onMove(evt) {
    const {pageX} = evt.nativeEvent

    if (this.lastPositionX != null) {
      const value = this.hiddenDeltaX + pageX - this.lastPositionX
      this.hiddenDeltaX = value
      this.deltaX.setValue(value)
      this.lastPositionX = pageX
    } else {
      this.lastPositionX = pageX
    }
  }

  onReleasePan() {
    Animated.spring(this.deltaX, {
      toValue: -200
    }).start(() => {
      this.lastPositionX = null
      this.hiddenDeltaX = -200
    })
  }

  render() {
    const {data, panHandlers} = this.props
    return <View
      style={{height: 68, width: width + 200, backgroundColor: 'white', flexDirection: 'row'}}>
      <Animated.View
        style={{
          width, backgroundColor: '#d26c76',
          transform: [{
            translateX: this.deltaX.interpolate({
              inputRange: [0, 200],
              outputRange: [0, 200]
            })
          }]
        }}
        {...panHandlers}>

      </Animated.View>
      <Animated.View style={{
        width: 200, height: 68, backgroundColor: '#378ad2',
        transform: [{
          translateX: this.deltaX.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 200]
          })
        }]
      }}>

      </Animated.View>
    </View>
  }
}

const SwipeableItem = handleGesture(Item)

export default class ListScreen extends React.Component {

  state = {
    items: [1, 2, 3, 4, 5, 6]
  }

  render() {
    return <SwipeableFlatList
      style={{flex: 1, backgroundColor: 'white', paddingTop: 36}}
      data={this.state.items}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#dcdcdc'}}/>}
      renderItem={({item, index}) => {
        return <SwipeableItem data={item}/>
      }}
    />
  }
}