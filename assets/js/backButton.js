/**
 * Renders list of collections
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router'

let BackButton = React.createClass({
  getInitialState: function () {
    return {visible: false}
  },
  setVisible: function (isVisible) {
    this.setState({visible: isVisible})
  },
  componentDidMount: function () {
  },
  render: function () {
    return (
      <Link
        className={css(styles.backStyle, !this.state.visible && styles.invisible)}
        to={`/brand/`}
      >
        <img className={css(styles.backArrow)} src='http://oxrkv9ms4.bkt.clouddn.com/arrow_back_white.png' />
      </Link>
    )
  }
})

export default BackButton

const styles = StyleSheet.create({
  backStyle: {
    position: 'fixed',
    top: '45px',
    left: '20px',
    zIndex: 10,
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      // todo activate when menu is fixed
      // display: 'none'
      position: 'fixed',
      width: '30px',
      height: '30px',
      left: '4vw',
      top: '3vh'
    }
  },
  invisible: {
    display: 'none'
  },
  backArrow: {
    width: '40px',
    height: '26px'
  }
})
