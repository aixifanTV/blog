import React from 'react'
import Helmet from 'react-helmet'
import { injectGlobal } from 'styled-components'
import Container from '../components/Container'
import Nav from '../components/Nav'

injectGlobal`
  html {
    font-size: 12px;
  }
  a {
    color: #0000ff;
  }
`

export default class extends React.Component {
  render() {
    const { children, data: { site: { siteMetadata } } } = this.props
    return (
      <div>
        <Helmet
          title={siteMetadata.title}
          meta={[{ name: 'description', content: siteMetadata.description }]}
        />
        <Container>
          <Nav />
          {children()}
        </Container>
      </div>
    )
  }
}

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
