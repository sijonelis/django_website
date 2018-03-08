import React from 'react'
import EasyTransition from 'react-easy-transition'
import axios from 'axios'
import { StyleSheet, css } from 'aphrodite'
import Sidebar from './sidebar'
import Contact from './contact'
import Logo from './logo'
import BackButton from './backButton'
import MobileTitle from './mobileTitle'

let ScrollDirection = {
  NONE: 0,
  UP: 1,
  DOWN: 2
}

let Base = React.createClass({
  getInitialState: function () {
    this.showCover = true
    this._timeout = null
    this._languageTimeout = null
    return {
      contents: null,
      language: 'en',
      isScrolling: false,
      wasScrolling: false,
      scrollDirection: ScrollDirection.NONE,
      scrollPosition: 0,
      trackScrolling: true
    }
  },
  componentDidMount: function () {
    this.loadPageData()
    window.addEventListener('scroll', this.handleScroll)
  },
  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  componentDidUpdate (prevProps, prevState) {
    if (this.state.isScrolling) {
      let direction = this.state.scrollDirection === ScrollDirection.UP ? ' top' : ' down'
      if (this.state.wasScrolling) {
        console.log('user keeps scrolling' + direction)
      }
      if (!this.state.wasScrolling) {
        console.log('user started scrolling' + direction)
      }
    }
    if (!this.state.isScrolling) {
      if (this.state.wasScrolling) {
        console.log('user stopped scrolling')
      }
      if (!this.state.wasScrolling) {
        console.log('user was not scrolling')
      }
    }
    if (prevState.language !== this.state.language) {
      this.loadPageData()
    }
  },
  loadPageData: function () {
    let self = this
    axios.get(''.concat('/api/contents?lang=', this.state.language))
      .then(function (response) {
        self.setState({contents: response['data'].data})
        console.log(''.concat('got site data'))
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  changeLanguage: function (lang) {
    this.setState({
      language: lang
    })
    this.setState({
      trackScrolling: false
    })
    this._languageTimeout = setTimeout(() => {
      this.setState({
        trackScrolling: true
      })
    }, 550)
  },
  _showCollectionStyle: function (showMini, showCollection = false, showCampaign = false) {
    if (showMini.currentPosition === 'inside' && this.props.location.pathname.includes('/brand/')) {
      this.contact.showMini(true)
      this.sidebar.setCollectionStyle(true, showCollection, showCampaign)
      this.logo.setInverted(true)
      this.backButton.setVisible(false)
      this._setTitle('', true)
    }
  },
  _showHomeStyle: function (showHome) {
    if (showHome.currentPosition === 'inside' && this.props.location.pathname.includes('/brand/')) {
      this.sidebar.setHomeStyle(true)
      this.contact.showMini(false)
      this.logo.setInverted(false)
      this.backButton.setVisible(false)
      this.sidebar.showSingleGalleryTitle(null, null, null)
      this._setTitle('', true)
    }
  },
  _showNormalStyle: function (showNormal, title) {
    if (showNormal.currentPosition === 'inside') {
      this.backButton.setVisible(false)
      this.contact.showMini(true)
      this.sidebar.setCollectionStyle(false)
      this.logo.setInverted(false)
      this._setTitle(title, false)
    }
  },
  _showGalleryStyle: function (showGallery, type, title, id) {
    this.contact.showMini(true)
    this.sidebar.setInvisible(true)
    this.logo.setInverted(true)
    this.backButton.setVisible(true)
    this.sidebar.showSingleGalleryTitle(type, title, id)
    this._setTitle(type, true, title)
  },
  _setTitle: function (title, transparentBackground, galleryTitle) {
    this.titleBar.setNewState(title, transparentBackground, galleryTitle)
  },
  handleScroll: function (event) {
    if (this.state.trackScrolling) {
      // check scrolling action
      if (this._timeout) {
        // if there is already a timeout in process cancel it
        clearTimeout(this._timeout)
      }
      this._timeout = setTimeout(() => {
        this._timeout = null
        // this set state is necessary to catch scroll stop
        this.setState({
          isScrolling: false,
          wasScrolling: this.state.isScrolling,
          scrollDirection: ScrollDirection.NONE,
          scrollPosition: this.state.scrollPosition
        })
      }, 100)

      // detect scroll direction
      let direction = ScrollDirection.NONE
      if (this.state.scrollPosition > event.currentTarget.scrollY) {
        direction = ScrollDirection.UP
      } else if (this.state.scrollPosition < event.currentTarget.scrollY) {
        direction = ScrollDirection.DOWN
      }

      this.setState({
        isScrolling: true,
        wasScrolling: this.state.isScrolling,
        scrollDirection: direction,
        scrollPosition: event.currentTarget.scrollY
      })
    }
  },
  render: function () {
    if (!this.state.contents) return (<div />)
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        showHomeStyle: this._showHomeStyle,
        showCollectionStyle: this._showCollectionStyle,
        showNormalStyle: this._showNormalStyle,
        showGalleryStyle: this._showGalleryStyle,
        contents: this.state.contents,
        showCover: this.showCover,
        scrollDirection: this.state.scrollDirection,
        language: this.state.language
      })
    )
    if (this.props.location.pathname === '/brand/') {
      this.initialStyle = animation.home.initial
      this.finalStyle = animation.home.final
      this.leaveStyle = animation.home.leave
      this.transition = animation.home.transition
      this.hideMenu = false
    } else if (this.props.location.pathname === '/') {
      this.initialStyle = animation.intro.initial
      this.finalStyle = animation.intro.final
      this.leaveStyle = animation.intro.leave
      this.transition = animation.intro.transition
      this.hideMenu = true
    } else {
      this.initialStyle = animation.common.initial
      this.finalStyle = animation.common.final
      this.leaveStyle = animation.common.leave
      this.transition = animation.common.transition
      this.hideMenu = false
    }
    return (
      <div onScroll={this.handleScroll}>
        <div id='sidebar' className={css(this.hideMenu && styles.hidden)} ><Sidebar ref={instance => { this.sidebar = instance }} collections={this.state.contents['collections']} campaigns={this.state.contents['campaigns']} scrollDirection={this.state.scrollDirection} settings={this.state.contents.settings} changeLanguage={this.changeLanguage} menu={this.state.contents['menu']} currentLanguage={this.state.contents.language}/></div>
        <div id='contact-container' className={css(this.hideMenu && styles.hidden)} ><Contact ref={instance => { this.contact = instance }} scrollDirection={this.state.scrollDirection} contactData={this.state.contents.settings} /></div>
        <div id='logo-container' className={css(this.hideMenu && styles.hidden)} > <Logo ref={instance => { this.logo = instance }} scrollDirection={this.state.scrollDirection} /></div>
        <div className={css(this.hideMenu && styles.hidden)} ><BackButton ref={instance => { this.backButton = instance }} /></div>
        <div> <MobileTitle ref={instance => { this.titleBar = instance }} /></div>
        <div>
          <EasyTransition
            path={location.pathname}
            initialStyle={this.initialStyle}
            transition={this.transition}
            finalStyle={this.finalStyle}
            leaveStyle={this.leaveStyle}
          >
            {childrenWithProps}
          </EasyTransition>
        </div>
      </div>

    )
  }
})

export default Base

const animation = {
  home: {
    initial: {opacity: 0, transform: 'translateX(100%)'},
    final: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(100%)'},
    transition: 'transform 0.3s linear, opacity 0.15s ease-in'
  },
  common: {
    initial: {opacity: 0, transform: 'translateX(-100%)'},
    final: {opacity: 1, transform: 'translateX(0)'},
    leave: {opacity: 0, transform: 'translateX(-100%)'},
    transition: 'transform 0.3s linear, opacity 0.15s ease-in'
  },
  intro: {
    initial: {opacity: 0},
    final: {opacity: 1},
    leave: {opacity: 0},
    transition: 'opacity 0.15s ease-in'
  }
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none'
  }
})
