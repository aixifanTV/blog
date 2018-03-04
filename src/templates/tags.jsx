import React from 'react'
import Link from 'gatsby-link'

export default ({ pathContext: issues }) => {
  let tags = {}
  issues.nodes.forEach(issue => {
    issue.labels.nodes.forEach(label => {
      if (!tags[label.name]) {
        tags[label.name] = []
      }
      tags[label.name].push(issue)
    })
  })

  return (
    <div>
      <div>
        <h2>tags</h2>
        {Object.keys(tags).map(tag => (
          <span key={tag}>
            {' '}
            <a href={`#${tag}`}>#{tag}</a>{' '}
          </span>
        ))}
      </div>
      {Object.keys(tags).map(tag => (
        <dl key={tag}>
          <dt id={tag}>
            <h2>#{tag}</h2>
          </dt>
          {tags[tag].map(issue => (
            <dd key={issue.number}>
              <Link to={`/blog/${issue.frontmatter.slug}`}>{issue.title}</Link>
              <p>
                {issue.createdAt}
                {issue.labels.nodes.map(label => ` #${label.name}`)}
              </p>
            </dd>
          ))}
        </dl>
      ))}
    </div>
  )
}
