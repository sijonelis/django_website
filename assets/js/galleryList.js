/**
 * Renders list of collections
 */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Gallery from './gallery'
import WOW from 'wowjs'

let GalleryList = React.createClass({
  componentDidMount: function () {
    // init animations
    new WOW.WOW().init()
  },
  componentDidUpdate: function () {
  },
  render: function () {
    let collections = null
    let type = this.props.type
    if (this.props.collections) {
      let collectionCount = this.props.collections.length
      let scrollDirection = this.props.scrollDirection
      collections = this.props.collections.map(function (collection, index) {
        let separator = true
        // if (collectionCount - 1 > index) {
        //   separator = true
        // }
        return (
          <section key={index} >
            <Gallery gallery={collection} type={type} scrollDirection={scrollDirection} />
            <div className={css(separator && styles.gallerySeparator)} />
          </section>
        )
      }, {type, collectionCount, scrollDirection})
    }

    return (
      <section className={css(styles.listStyle) + ' wow fadeInUp'} {...{'data-wow-offset': 150}} >
        {collections}
      </section>
    )
  }
})

export default GalleryList

const styles = StyleSheet.create({
  listStyle: {
    padding: 0,
    listStyle: 'none',
    margin: 0
  },
  gallerySeparator: {
    // 48 is the height of gallery title
    height: 'calc(130px - 48px)',
    backgroundColor: '#000',
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      height: 'calc(150px - 57px)'
    }
  }
})
