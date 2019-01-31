import React from "react";
import {PanResponder} from "react-native";
import {Observable} from "rxjs";
import {TAP_DELAY} from "./utils";

export const handleGesture = (WrappedComponent) => {
  return class extends React.Component {
    constructor() {
      super()
      this.initObservable()
      this.numberOfClick = 0
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

        onPanResponderGrant: (evt, gestureState) => {
          // console.log('start:', evt.nativeEvent)
          this.emitter.next({
            position: {
              left: evt.nativeEvent.locationX,
              top: evt.nativeEvent.locationY
            }
          })
        },
        onPanResponderMove: (evt, gestureState) => {
          console.log('child move:', evt.nativeEvent)
          if (!!this.comp.onMove)
            this.comp.onMove(evt)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderRelease: (evt, gestureState) => {
          // console.log('release:', evt.nativeEvent)
          this.emitter.next({
            position: {
              left: evt.nativeEvent.locationX,
              top: evt.nativeEvent.locationY
            }
          })
          if (!!this.comp.onReleasePan)
            this.comp.onReleasePan()
        },
        onPanResponderTerminate: (evt, gestureState) => {

        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return true;
        }
      });
    }

    initObservable() {
      this.debounceReturnedData$ = Observable.create(e => this.emitter = e)
        .map(val => {
          this.numberOfClick++
          return val
        })
        .debounceTime(TAP_DELAY)
        .subscribe(data => {
          console.log('end time', this.numberOfClick)
          if (this.numberOfClick === 2) {
            if (!!this.comp.onTap)
              this.comp.onTap(data)
          } else if (this.numberOfClick >= 4) {
            console.log('double tap')
            if (!!this.comp.onDoubleTap)
              this.comp.onDoubleTap(data)
          }
          this.numberOfClick = 0
        })
    }

    render() {
      return <WrappedComponent {...this.props}
                               panHandlers={this._panResponder.panHandlers}
                               ref={comp => this.comp = comp}
      />
    }
  }
}