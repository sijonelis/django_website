/**
 * Renders list of collections
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router'
import { color, fontSize, font } from '../css/typography'

let   LanguageButton = React.createClass({
  getInitialState: function () {
    return {
      active: this.props.language
    }
  },
  changeLanguage: function (lang) {
    this.setState({
      active: lang
    })
    this.props.changeLanguage(lang)
  },
  render: function () {
    return (
      <div className={css(styles.font)}>
        <div className={css(styles.styling, styles.margin, this.state.active === 'en' && styles.active)} onClick={() => { this.changeLanguage('en') }} >EN</div>
        <div className={css(styles.styling, this.state.active === 'cn' && styles.active)} onClick={() => { this.changeLanguage('cn') }} >中</div>
      </div>
    )
  }
})

export default LanguageButton

const styles = StyleSheet.create({
  font: {
    fontFamily: ['source-han-sans-simplified-c', 'SimHei', 'serif'],
    fontWeight: 400,
    fontSize: fontSize.languageButtonText,
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      fontSize: fontSize.languageButtonText
    }
  },
  styling: {
    float: 'left'
  },
  margin: {
    marginRight: '10px'
  },
  active: {
    textDecoration: 'underline'
  },
  invisible: {
    display: 'none'
  }
})
