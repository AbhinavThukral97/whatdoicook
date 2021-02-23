import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "./logo"

const Header = () => (
  <header>
    <div className={`content`}>
    <div className={`logo`}>
      <Logo />
    </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
