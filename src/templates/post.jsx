import React from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import 'github-markdown-css/github-markdown.css'
import 'prismjs/themes/prism.css'

export default class extends React.Component {
  componentDidMount() {
    // axios('https://api.github.com/graphql')
  }
  render() {
    const { pathContext: issue } = this.props
    return (
      <div>
        <Helmet title={issue.title} meta={[{ name: 'description', content: issue.title }]} />
        <h1>{issue.title}</h1>
        <p>
          {issue.createdAt}
          {issue.labels.nodes.map(label => ` #${label.name}`)}
        </p>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: issue.body }} />
      </div>
    )
  }
}
