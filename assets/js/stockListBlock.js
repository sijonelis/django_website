/**
 * Created by Vilkazz on 2017-09-17.
 */
/**
 * Renders about block
 * */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import StockListElement from './stockListElement'
import { fontSize } from '../css/typography'
import WOW from 'wowjs'

let StockListBlock = React.createClass({
  componentDidMount: function () {
    // init animations
    new WOW.WOW().init()
  },
  componentDidUpdate: function () {
  },
  createStockListCountry: function () {
    if (!this.props.stockListData) {
      return (<div />)
    }
    let countryCount = this.props.stockListData.length
    let createStoreList = this.createStoreList
    return this.props.stockListData.map(function (stockListCountry, index) {
      let separator = false
      if (countryCount - 1 > index) {
        separator = true
      }
      return (
        <div key={index} className={css(styles.countryStoreListHolder)}>
          <div><h1 className={css(styles.titleStyle)}> {stockListCountry.country} </h1></div>
          <div className={css(styles.countryList)}>
            {createStoreList(stockListCountry.stores)}
          </div>
          <div><hr className={css(!separator && styles.hidden, separator && styles.stockListSeparator)} /></div>
        </div>
      )
    }, this, countryCount, createStoreList)
  },
  createStoreList: function (stores) {
    return stores.map(function (store, index) {
      return (
        <StockListElement store={store} key={index} />
      )
    })
  },
  render: function () {
    return (
      <span>
        <div className={css(styles.stockListBlock) + ' wow fadeInUp'} {...{'data-wow-offset': 150}}>
          {this.createStockListCountry()}
        </div>
      </span>
    )
  }
})

export default StockListBlock

const styles = StyleSheet.create({
  stockListBlock: {
    width: 'calc(50vw-130px)',
    maxWidth: '800px',
    margin: '0 auto',
    paddingTop: '120px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      paddingTop: '85px',
      paddingBottom: '145px',
      marginLeft: '8vw',
      marginRight: '8vw',
      width: '84vw'
    }
  },
  countryList: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  titleStyle: {
    marginBottom: '20px',
    fontSize: fontSize.heading,
    textTransform: 'uppercase',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      width: '84vw',
      fontSize: fontSize.headingMobile
    }
  },
  countryStoreListHolder: {
    width: '100%'
  },
  hidden: {
    display: 'none'
  },
  stockListSeparator: {
    display: 'block',
    height: '2px',
    width: '42px',
    border: 0,
    borderTop: '2px solid #282828',
    marginTop: '0px',
    marginBottom: '50px',
    marginLeft: 0,
    '@media screen and (max-width: 768px), screen and (max-device-width: 768px)': {
      marginTop: '10px',
      marginBottom: '40px'
    }
  }
})
