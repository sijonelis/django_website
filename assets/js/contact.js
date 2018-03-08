/**
 * Renders list of collections
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { color, fontSize, font } from '../css/typography'
import { twentyNineCmAnimation } from '../css/globalStyles'

let instagramUrl = 'https://www.instagram.com/8on8_official/'
let weiboUrl = 'http://weibo.com/u/6272904754'
let weixinShareCodeUrl = ''
let instagramIco = 'http://oxrkv9ms4.bkt.clouddn.com/instagram_s.png'
let weiboIco = 'http://oxrkv9ms4.bkt.clouddn.com/sina_weibo_s.png'
let weixinIco = 'http://oxrkv9ms4.bkt.clouddn.com/weixin_s.png'

let Contact = React.createClass({
  getInitialState: function () {
    return {
      // show mini contact on desktop non-home page
      showMini: false}
  },
  componentDidMount: function () {
  },
  showMini: function (showMini) {
    this.setState({showMini: showMini})
  },
  render: function () {
    return (
      <div key='contact' className={css(styles.contactHolder, this.props.showMobile ? styles.showMobile : styles.showDesktop, twentyNineCmAnimation.transition, this.props.scrollDirection === 1 && twentyNineCmAnimation.animateUp, this.props.scrollDirection === 2 && twentyNineCmAnimation.animateDown)} ref={this.props.innerRef}>
        <h3 id='contact-title' className={css(styles.titleText, styles.whiteBackground, this.state.showMini && styles.titleTextSmall)}>CONTACT</h3>
        <div id='channel-holder' className={css(this.state.showMini && styles.hidden)}>
          <div id='email-holder' key='email-holder' className={css(styles.email, styles.whiteBackground)}>
            <div>{this.props.contactData['contact_first_line']}</div>
            <div>{this.props.contactData['contact_second_line']}</div>
          </div>
          <div key='link-holder' className={css(styles.link, styles.whiteBackground)}>
            <a href={instagramUrl} target='_blank' className={css(styles.noUnderline, styles.squareIco)} > <img className={css(styles.squareIco)} src={instagramIco} /></a>
            <a href={weiboUrl} target='_blank' className={css(styles.noUnderline, styles.weixinIco, styles.spacer)}> <img className={css(styles.weixinIco)} src={weiboIco} /></a>
          </div>
        </div>
      </div>)
  }
})

export default Contact

// const hideTransition = {
//   opacity: '1s',
//   // visibility: '0.5s'
// }

const styles = StyleSheet.create({
  email: {
    width: 'fit-content',
    fontFamily: font.bold,
    fontWeight: '700',
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingTop: '3px',
    paddingBottom: '3px',
    marginTop: '7px',
    marginBottom: '17px',
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      textAlign: 'right',
      fontSize: fontSize.standard,
      '@media screen and (max-device-height: 400px), (max-height: 400px)': {
        textAlign: 'left'
      }
    }
  },
  link: {
    width: 'fit-content',
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingTop: '3px',
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      float: 'right',
      '@media screen and (max-device-height: 400px), (max-height: 400px)': {
        float: 'left'
      }
    }
  },
  spacer: {
    marginLeft: '20px',
    marginRight: '0px'
  },
  titleText: {
    width: 'fit-content',
    margin: 0,
    fontSize: fontSize.headingLarge,
    fontFamily: font.bold,
    fontWeight: '700',
    letterSpacing: 0.8,
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingTop: '3px',
    paddingBottom: '3px',
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      fontSize: fontSize.standardMobile,
      display: 'none'
    }
  },
  titleTextSmall: {
    fontSize: fontSize.standard,
    paddingBottom: '3px',
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      fontSize: fontSize.standardMobile
    }
  },
  contactHolder: {
    ':hover #channel-holder': {
      opacity: 1
    },
    ':hover #contact-title': {
      fontSize: fontSize.headingLarge,
      '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
        fontSize: fontSize.standardMobile
      }
    },
    position: 'fixed',
    bottom: '10vh',
    right: '7vw',
    zIndex: 10
  },
  hidden: {
    opacity: 0,
    backgroundColor: color.transparent
  },
  whiteBackground: {
    backgroundColor: color.white
  },
  noUnderline: {
    textDecoration: 'none',
    width: '23px',
    height: '23px'
  },
  squareIco: {
    width: '23px',
    height: '23px'
  },
  weixinIco: {
    width: '27px',
    height: '23px'
  },
  showMobile: {
    display: 'block',
    right: '10vw',
    bottom: '60px',
    marginRight: '0',
    '@media screen and (max-device-height: 400px), (max-height: 400px)': {
      left: '10vw'
    }
  },
  showDesktop: {
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      display: 'none'
    }
  }
})
