import React from 'react'
import Link from 'gatsby-link'

export default ({ pathContext }) => {
  const link = current => {
    if (current === 1) {
      return `/`
    } else {
      return `/blog/page/${current}`
    }
  }

  return (
    <div>
      <ul>
        {pathContext.nodes.map(issue => (
          <li key={issue.number}>
            <Link to={`/blog/${issue.frontmatter.slug}`}>{issue.title}</Link>
            <p>
              {issue.createdAt}
              {issue.labels.nodes.map(label => ` #${label.name}`)}
            </p>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center' }}>
        {pathContext.current === 1 ? (
          <span>prev</span>
        ) : (
          <Link to={link(pathContext.current - 1)}>prev</Link>
        )}
        {` ${pathContext.current} / ${pathContext.page} `}
        {pathContext.current === pathContext.page ? (
          <span>next</span>
        ) : (
          <Link to={link(pathContext.current + 1)}>next</Link>
        )}
      </div>
    </div>
  )
}
