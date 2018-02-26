import React from 'react'
import Helmet from 'react-helmet'
import 'github-markdown-css/github-markdown.css'

export default class extends React.Component {
  componentDidMount() {}
  render() {
    const { pathContext } = this.props
    return (
      <div>
        <Helmet
          title={pathContext.title}
          meta={[{ name: 'description', content: pathContext.title }]}
        />
        <h1>{pathContext.title}</h1>
        <p>{pathContext.labels.nodes.map(label => `#${label.name} `)}</p>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: pathContext.body }}
        />
      </div>
    )
  }
}
