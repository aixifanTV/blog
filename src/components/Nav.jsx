import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Nav = styled.div`
  text-align: right;
  a {
    margin: 0 5px;
  }
`

export default () => (
  <Nav>
    <Link to="/">Home</Link>
    <Link to="/blog/archives">Archives</Link>
    <Link to="/blog/tags">Tags</Link>
    <Link to="/blog/about">About</Link>
  </Nav>
)
