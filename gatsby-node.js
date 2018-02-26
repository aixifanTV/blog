const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const pageTmpl = path.resolve('src/templates/page.jsx')
  const postTmpl = path.resolve('src/templates/post.jsx')
  const aboutTmpl = path.resolve('src/templates/about.jsx')
  const archivesTmpl = path.resolve('src/templates/archives.jsx')
  const tagsTmpl = path.resolve('src/templates/tags.jsx')

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
        path: `/blog/${e.frontmatter.slug}`,
        component: postTmpl,
        context: e
      })
    })

    createPage({
      path: `/`,
      component: pageTmpl
    })

    createPage({
      path: `/blog/archives`,
      component: archivesTmpl
    })

    createPage({
      path: `/blog/tags`,
      component: tagsTmpl
    })

    createPage({
      path: `/blog/about`,
      component: aboutTmpl
    })
  })
}
