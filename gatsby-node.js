const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const pageTmpl = path.resolve('src/templates/page.jsx')
  const postTmpl = path.resolve('src/templates/post.jsx')
  const archivesTmpl = path.resolve('src/templates/archives.jsx')
  const tagsTmpl = path.resolve('src/templates/tags.jsx')
  const aboutTmpl = path.resolve('src/templates/about.jsx')
  const notfoundTmpl = path.resolve('src/templates/404.jsx')

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

    const all = result.data.issues.nodes.length
    const show = 5
    const page = Math.ceil(all / show)
    for (let current = 1; current <= all; current++) {
      createPage({
        path: current === 1 ? `/` : `/blog/page/${current}`,
        component: pageTmpl,
        context: {
          show,
          page,
          current,
          nodes: result.data.issues.nodes.slice(current * show - show, current * show)
        }
      })
    }

    result.data.issues.nodes.forEach(e => {
      createPage({
        path: `/blog/${e.frontmatter.slug}`,
        component: postTmpl,
        context: e
      })
    })

    createPage({
      path: `/blog/archives`,
      component: archivesTmpl,
      context: result.data.issues
    })

    createPage({
      path: `/blog/tags`,
      component: tagsTmpl,
      context: result.data.issues
    })

    createPage({
      path: `/blog/about`,
      component: aboutTmpl
    })

    createPage({
      path: '404.html',
      component: notfoundTmpl
    })
  })
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.loader('file-loader', {
    query: {
      name: `blog/static/[name].[hash:8].[ext]`
    }
  })
  config.loader(`url-loader`, {
    query: {
      name: `blog/static/[name].[hash:8].[ext]`
    }
  })

  return config
}
