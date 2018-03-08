/**
 * Created by Vilkazz on 2017-09-17.
 */
/**
 * Renders about block
 * */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router'
import Logo from './logo'

let CoverBlock = React.createClass({
  getInitialState: function () {
    return {hidden: false}
  },
  render: function () {
    return (
      <Link
        to={`/brand/`}
      >
        <div className={css(styles.displayCover)} style={{backgroundImage: 'url('.concat(this.props.contents.settings['cover_image'], '?imageslim&imageView2/2/w/1600/)')}} />
        <Logo intro />
      </Link>
    )
  }
})

export default CoverBlock

const styles = StyleSheet.create({
  displayCover: {
    height: '100vh',
    width: '100vw',
    // backgroundImage: 'url("http://oxrkv9ms4.bkt.clouddn.com/cover2.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: 100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    overflow: 'auto'
  }
})
