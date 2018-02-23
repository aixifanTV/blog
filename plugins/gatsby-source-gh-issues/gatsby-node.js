const crypto = require('crypto')
const axios = require('axios')
const matter = require('gray-matter')
const remark = require('remark')
const guide = require('remark-preset-lint-markdown-style-guide')
const html = require('remark-html')
const report = require('vfile-reporter')

exports.sourceNodes = async (
  { boundActionCreators },
  { token, username, repository }
) => {
  const { createNode } = boundActionCreators

  const fetch = async (after = '', issues = []) => {
    const { data } = await axios('https://api.github.com/graphql', {
      method: 'post',
      headers: {
        Authorization: `bearer ${token}`
      },
      data: {
        query: `
            {
              repository(owner: "${username}", name: "${repository}") {
                issues(first: 100, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}${after}) {
                  nodes {
                    number
                    title
                    createdAt
                    body
                    labels(first: 3) {
                      nodes {
                        name
                        color
                      }
                    }
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                }
              }
            }
          `
      }
    })

    const { data: { repository: { issues: { nodes, pageInfo } } } } = data
    issues = issues.concat(nodes)
    if (pageInfo.hasNextPage) {
      issues = await fetch(`, after: "${pageInfo.endCursor}"`, issues)
    }
    return issues
  }

  const issues = await fetch()

  issues.forEach(e => {
    const markdown = matter(e.body)
    remark()
      .use(guide)
      .use(html)
      .process(markdown.content, (err, file) => {
        const slug = markdown.data.slug || e.number
        markdown.data.slug = `/${repository}/${slug}/`
        e.frontmatter = markdown.data
        e.body = String(file)
        console.error(report(err || file))
      })
  })

  createNode({
    nodes: issues,
    id: 'Issues',
    parent: null,
    children: [],
    internal: {
      type: 'issues',
      contentDigest: crypto
        .createHash('md5')
        .update(JSON.stringify(issues))
        .digest('hex')
    }
  })
}
