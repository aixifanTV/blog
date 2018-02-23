import React from 'react'
import Helmet from 'react-helmet'
import { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    font-size: 12px;
  }
  a {
    color: #0000ff;
  }
`

export default class extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { children, data: { site: { siteMetadata } } } = this.props
    return (
      <div>
        <Helmet
          title={siteMetadata.title}
          meta={[{ name: 'description', content: siteMetadata.description }]}
        />
        {children()}
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
