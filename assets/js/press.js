/**
 * Renders list of collections
 */
import * as React from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { StyleSheet, css } from 'aphrodite'
import { lineHeight, fontSize } from '../css/typography'
import MediaQuery from 'react-responsive'
import WOW from 'wowjs'
import './../css/textTransition.css'

let Press
Press = React.createClass({
  componentDidMount: function () {
    // init animations
    new WOW.WOW().init()
  },
  componentDidUpdate: function () {
  },
  _renderPressReleaseDesktop: function () {
    return this.props.pressData.map(function (aPressRelease, index, pressData) {
      let showSpacer = index < pressData.length
      return (
        <div key={index} className={css(stylesDesktop.listElement, showSpacer && stylesDesktop.spacerH)}>
          <div className={css(stylesDesktop.column, stylesDesktop.imageStyle)}>
            <img className={css(stylesDesktop.imageWidth)} src={aPressRelease.image} />
          </div>
          <div className={css(stylesDesktop.spacerV)} />
          <div className={css(stylesDesktop.column)}>
            <h1 className={css(stylesDesktop.titleStyle)}>{aPressRelease.title}</h1>
            <div className={css(stylesDesktop.paragraphStyle)}
              dangerouslySetInnerHTML={{__html: aPressRelease.contents}} />
          </div>
        </div>)
    }, this)
  },
  _renderPressReleaseMobile: function () {
    return this.props.pressData.map(function (aPressRelease, index, pressData) {
      let showSpacer = index < pressData.length
      return (
        <div key={index} className={css(stylesDesktop.listElement, showSpacer && stylesDesktop.spacerH)}>
          <div><h1 className={css(stylesDesktop.titleStyle)}>{aPressRelease.title}</h1></div>
          <div><img className={css(stylesDesktop.imageWidth)} src={aPressRelease.image} /></div>
          <div className={css(stylesDesktop.paragraphStyle)}
            dangerouslySetInnerHTML={{__html: aPressRelease.contents}} />
        </div>
      )
    })
  },
  render: function () {
    return (
      <ReactCSSTransitionReplace transitionName='cross-fade' overflowHidden={false}
        transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        <div key={this.props.language} >
          <div className={css(styles.pressList) + ' wow fadeInUp'} {...{'data-wow-offset': 150}}>
            <MediaQuery query='(max-device-width: 768px), (max-width: 768px)'>
              {this._renderPressReleaseMobile()}
            </MediaQuery>
            <MediaQuery query='(min-device-width: 769px) and (min-width: 769px)'>
              {this._renderPressReleaseDesktop()}
            </MediaQuery>
          </div>
        </div>
      </ReactCSSTransitionReplace>
    )
  }
})

export default Press

const styles = StyleSheet.create({
  pressList: {
    paddingTop: '120px',
    marginLeft: '130px',
    marginRight: '130px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      marginLeft: '8vw',
      marginRight: '8vw',
      marginBottom: '300px',
      width: '84vw'
    }
  }
})
const stylesDesktop = StyleSheet.create({
  listElement: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap'
  },
  spacerH: {
    paddingBottom: '90px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      paddingBottom: '45px'
    }
  },
  spacerV: {
    width: '80px',
    height: '100%'
  },
  imageStyle: {
    textAlign: 'right',
    marginBottom: '-4px'
  },
  imageWidth: {
    width: '85%',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      width: '100%'
    }
  },
  titleStyle: {
    fontSize: fontSize.heading,
    textTransform: 'uppercase',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      width: '84vw',
      fontSize: fontSize.headingMobile
    }
  },
  paragraphStyle: {
    lineHeight: lineHeight.normal,
    fontSize: fontSize.standard,
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      fontSize: fontSize.standardMobile
    }
  },
  column: {
    width: 'calc(50% - 40px)'
  }
})
