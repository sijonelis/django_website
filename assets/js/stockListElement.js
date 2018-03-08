/**
 * Created by Vilkazz on 2017-09-17.
 */
/**
 * Renders about block
 * */
import * as React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { fontSize, font } from '../css/typography'

let StockListElement = React.createClass({
  componentDidMount: function () {
  },
  componentDidUpdate: function () {
  },
  render: function () {
    return (
      <div className={css(styles.stockListElement)}>
        <div className={css(styles.stockListTitle)}> {this.props.store.store_name}</div>
        <div>
          <p className={css(styles.textMargin)}> {this.props.store.city}</p>
          <p className={css(styles.textMargin)}> {this.props.store.address}</p>
          <p className={css(styles.textMargin)}> {this.props.store.phone}</p>
        </div>
      </div>
    )
  }
})

export default StockListElement

const styles = StyleSheet.create({
  stockListElement: {
    width: '50%',
    overflow: 'hidden',
    fontSize: fontSize.standard,
    marginBottom: '50px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      width: '100%',
      fontSize: fontSize.standardMobile,
      marginBottom: '30px'
    }
  },
  stockListTitle: {
    fontFamily: font.bold,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: '10px',
    '@media screen and (max-device-width: 768px), screen and (max-width: 768px)': {
      marginBottom: '5px'
    }
  },
  textMargin: {
    marginTop: '5px',
    marginBottom: '5px'
  }
})
