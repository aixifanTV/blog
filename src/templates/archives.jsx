import React from 'react'
import Link from 'gatsby-link'

export default ({ pathContext: issues }) => {
  let archives = {}
  issues.nodes.forEach(issue => {
    const date = new Date(issue.createdAt)
    const year = date.getFullYear()
    if (!archives[year]) {
      archives[year] = []
    }
    archives[year].push(issue)
  })

  return (
    <div>
      {Object.keys(archives)
        .reverse()
        .map(year => (
          <dl key={year}>
            <dt>
              <h2>{year}</h2>
            </dt>
            {archives[year].map(issue => (
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
