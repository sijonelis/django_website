/**
 * Renders list of collections
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import MediaQuery from 'react-responsive'
import { fontSize, font, color } from '../css/typography'

let MobileTitle = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      transparentBackground: false,
      galleryTitle: ''
    }
  },
  setNewState: function (title, transparentBackground, galleryTitle = '') {
    if (galleryTitle !== '') {
      title = title.substring(0, title.length - 1)
    }
    this.setState({
      title: title,
      transparentBackground: transparentBackground,
      galleryTitle: galleryTitle
    })
  },
  renderTitle: function () {
    return (
      <div>
        <div className={css(styles.mobileTitle, this.state.transparentBackground && styles.transparentBackground)}>
          {this.state.title}
        </div>
        <div className={css(styles.galleryTitle)}>
          {this.state.galleryTitle}
        </div>
      </div>
    )
  },
  render: function () {
    return (
      <div>
        <MediaQuery query='(max-device-width: 768px)'>
          {this.renderTitle()}
        </MediaQuery>
        <MediaQuery query='(max-width: 768px)'>
          {this.renderTitle()}
        </MediaQuery>
      </div>
    )
  }
})

export default MobileTitle

const styles = StyleSheet.create({
  mobileTitle: {
    fontFamily: font.bold,
    fontWeight: '700',
    fontSize: fontSize.menuSuperscriptMobile,
    textTransform: 'uppercase',
    backgroundColor: color.white,
    color: color.text,
    position: 'fixed',
    top: '9vh',
    left: '4vw',
    margin: 0,
    zIndex: 1
  },
  transparentBackground: {
    backgroundColor: color.transparent,
    color: color.white
  },
  galleryTitle: {
    fontFamily: font.bold,
    fontWeight: '700',
    fontSize: fontSize.menuMobileGalleryName,
    textTransform: 'uppercase',
    textDecoration: 'underline',
    backgroundColor: color.transparent,
    color: color.white,
    position: 'fixed',
    top: '18vh',
    left: '4vw',
    margin: 0,
    zIndex: 1
  }
})
