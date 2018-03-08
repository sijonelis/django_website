/**
 * Renders list of collections
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import MediaQuery from 'react-responsive'
import { twentyNineCmAnimation } from '../css/globalStyles'

let Logo = React.createClass({
  getInitialState: function () {
    return {isInverted: false}
  },
  componentDidMount: function () {
  },
  setInverted: function (isInverted) {
    this.setState({isInverted: isInverted})
  },
  render: function () {
    return (
      <div className={css(!this.props.intro && styles.logoHolder, twentyNineCmAnimation.transition, this.props.scrollDirection === 1 && twentyNineCmAnimation.animateUp, this.props.scrollDirection === 2 && twentyNineCmAnimation.animateDown)}>
        <MediaQuery query='(max-device-width: 768px), (max-width: 768px)'>
          <div className={css(styles.logoSmall, this.state.isInverted && styles.inverted, this.props.intro && styles.intro)}>
            <img className={css(styles.image, this.props.intro && styles.introImage)} src='http://oxrkv9ms4.bkt.clouddn.com/logo_sharp.png' />
          </div>
        </MediaQuery>
        <MediaQuery query='(min-device-width: 769px) and (min-width: 769px)'>
          <div className={css(this.state.isInverted && styles.inverted, this.props.intro && styles.intro)}>
            <img className={css(styles.image, this.props.intro && styles.introImage)} src='http://oxrkv9ms4.bkt.clouddn.com/logo_sharp.png' />
          </div>
        </MediaQuery>
      </div>
    )
  }
})

export default Logo

const styles = StyleSheet.create({
  logoHolder: {
    overflow: 'auto',
    position: 'fixed',
    top: '-15px',
    right: '125px',
    margin: 0,
    padding: 0,
    zIndex: 10,
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      top: '-5px',
      right: '4vw'
    }
  },
  logoSmall: {
    right: '25px',
    width: '135px'
  },
  image: {
    height: '100%',
    width: '283px',
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      width: '135px'
    }
  },
  introImage: {
    height: '64%',
    width: '87%',
    margin: 'auto'
  },
  inverted: {
    filter: 'brightness(0) invert(1)'
  },
  intro: {
    width: '190px',
    height: '55px',
    // backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    display: 'flex',
    filter: 'brightness(0) invert(1)'
  }
})
