/**
 * Renders list of collections
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router'
import { color, fontSize } from '../css/typography'

let SecondLvlMenuItem = React.createClass({
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
  },
  render: function () {
    let collection = this.props.collection
    return (
      <div className={css(this.props.isDisabled && styles.galleryMargin, !this.props.showMenu && styles.hidden)} disabled='disabled'>
        <Link
          className={css(styles.secondMenu, this.props.isDisabled && styles.linkDisabled)}
          key={collection.id}
          to={`/gallery/${this.props.galleryType}/${collection.id}`}
        >
          <div>
            {collection.title}
          </div>
        </Link>
      </div>
    )
  }
})

export default SecondLvlMenuItem

const styles = StyleSheet.create({
  secondMenu: {
    marginRight: '0px',
    // marginLeft: '10px',
    maxWidth: '200px',
    width: 'fit-content',
    textTransform: 'uppercase',
    textAlign: 'left',
    // float: 'right',
    fontSize: fontSize.menuSuperscript,
    wordWrap: 'break-word',
    color: color.white,
    textDecoration: 'none',
    textShadow: '2px 0px 15px rgba(26, 26, 26, 0.35)',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      fontSize: fontSize.menuSuperscriptMobile,
      textAlign: 'right',
      color: color.text,
      textShadow: 'none',
      '@media screen and (max-device-height: 400px), (max-height: 400px)': {
        fontSize: fontSize.menuSuperscriptMobileSmall
      }
    }
  },
  linkDisabled: {
    fontSize: fontSize.menuSuperscript,
    pointerEvents: 'none',
    color: color.white,
    textDecoration: 'underline',
    textAlign: 'left',
    backgroundColor: 'transparent',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      fontSize: fontSize.menuSuperscriptMobile
    }
  },
  galleryMargin: {
    marginRight: '0px',
    marginLeft: '0px',
    marginBottom: '10px',
    marginTop: '10px'
  },
  hidden: {
    display: 'none' // hide everything per clients request
  }
})
