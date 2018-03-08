/**
 * Renders list of collections
 */
import * as React from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'
import { color, fontSize, font } from '../css/typography'

import { twentyNineCmAnimation } from '../css/globalStyles'
let Scroll = require('react-scroll')
let Element = Scroll.Element

let GalleryState = {
  preview: 0,
  full: 1
}

let Gallery = React.createClass({
  getInitialState: function () {
    this.galleryId = null
    this.galleryTitle = null
    this.galleryType = null
    return {galleryState: this.props.routeParams !== undefined ? GalleryState.full : GalleryState.preview}
  },
  componentDidMount: function () {
    if (this.props.routeParams !== undefined) {
      this.props.showGalleryStyle(true, this.galleryType, this.galleryTitle, this.galleryId)
    }
  },
  _showAll: function (event) {
    this.setState({galleryState: GalleryState.full})
    console.log(''.concat('Showing all for', this.props.gallery['title']))
  },
  _hideViewAllButton: function () {
    return this.state.galleryState !== GalleryState.preview
  },
  showGalleryStyle: function () {
    this.props.showGalleryStyle(true, this.galleryType, this.galleryTitle, this.galleryId)
  },
  render: function () {
    let gallerySource = []
    if (this.props.routeParams !== undefined) {
      this.galleryType = this.props.routeParams['galleryType']
      let galleries = this.props.contents[this.props.routeParams['galleryType']]
      this.galleryId = parseInt(this.props.routeParams['itemId'])
      let i = 0
      let len = galleries.length
      for (; i < len; i++) {
        if (galleries[i]['id'] === this.galleryId) {
          gallerySource = galleries[i]['gallery_images']
          this.galleryTitle = galleries[i]['title']
        }
      }
    } else {
      gallerySource = this.props.gallery['gallery_images'].slice(0, 4)
      this.galleryTitle = this.props.gallery['title']
      this.galleryType = this.props.type
      this.galleryId = this.props.gallery['id']
    }
    let gallery = gallerySource.map(function (galleryImage, index) {
      return <img key={index} className={css(styles.imageStyle)} src={galleryImage} />
    })
    return (
      <Element>
        <section>
          <div>
            <div className={css(twentyNineCmAnimation.transition, this.props.scrollDirection === 1 && twentyNineCmAnimation.animateUp, this.props.scrollDirection === 2 && twentyNineCmAnimation.animateDown)}>
              <div className={css(styles.nameStyle, this.props.routeParams === undefined && styles.nameGalleryMargin)}> {this.galleryTitle} </div>
            </div>
            <section className={css(styles.imageList)}>
              {gallery}
            </section>
            <div className={css(twentyNineCmAnimation.transition, this.props.scrollDirection === 1 && twentyNineCmAnimation.animateUp, this.props.scrollDirection === 2 && twentyNineCmAnimation.animateDown)}>
              <Link
                onClick={() => { this.showGalleryStyle() }}
                className={css(styles.viewAllStyle, this._hideViewAllButton() && styles.hidden)}
                to={`/gallery/${this.galleryType}/${this.galleryId}`}
              >
                <div className={css(styles.left)}>VIEW ALL </div>
                <img className={css(styles.left, styles.image)} src='http://oxrkv9ms4.bkt.clouddn.com/arrow_right_white.png' />
              </Link>
            </div>
          </div>
        </section>
      </Element>
    )
  }
})

export default Gallery

const styles = StyleSheet.create({
  imageList: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  imageStyle: {
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      width: '100%'
    }
  },
  nameStyle: {
    position: 'absolute',
    marginTop: '50px',
    marginRight: '130px',
    right: 0,
    fontSize: fontSize.galleryName,
    letterSpacing: 6,
    color: color.white,
    backgroundColor: color.transparent,
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      marginTop: '30px',
      marginRight: '30px',
      fontSize: fontSize.galleryNameMobile
    }
  },
  viewAllStyle: {
    position: 'relative',
    marginLeft: '22vw',
    bottom: '24px',
    fontSize: fontSize.viewMore,
    fontFamily: font.bold,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: color.white,
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      marginLeft: '4vw',
      fontSize: fontSize.viewMoreMobile,
      bottom: '14px'
    }
  },
  left: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '100%'
  },
  hidden: {
    display: 'none'
  },
  nameGalleryMargin: {
    marginTop: '50px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      marginTop: '-25px'
    }
  },
  image: {
    height: '48px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      height: '30px'
    }
  }
})
