const path = require('path')

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const templates = path.resolve('src/templates/index.jsx')

  return graphql(
    `
      {
        issues {
          nodes {
            number
            title
            createdAt
            frontmatter {
              slug
            }
            body
            labels {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
    }
    result.data.issues.nodes.forEach(e => {
      createPage({
        path: e.frontmatter.slug,
        component: templates,
        context: e
      })
    })
  })
}
