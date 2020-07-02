/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // We only care about MDX
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const fileNode = getNode(node.parent);

  createNodeField({
    node,
    name: 'sourceName',
    value: fileNode.sourceInstanceName,
  });

  createNodeField({
    node,
    name: 'name',
    value: fileNode.name,
  });
  createNodeField({
    node,
    name: 'path',
    value: `${fileNode.sourceInstanceName}/${fileNode.name}`,
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  await createResourcePages(createPage, graphql);
  await createContentPages(createPage, graphql);
};

async function createContentPages(createPage, graphql) {
  const contentQuery = await markdownQuery(graphql, 'contentpage');
  const { data: { results: { edges } = {} } = {} } = contentQuery;

  edges.forEach(({ node }) => {
    createPage({
      path: node.fields.name,
      component: path.resolve(`./src/templates/layouts/content-page.js`),
      context: {
        name: node.fields.name,
      },
    });
  });
}

async function createResourcePages(createPage, graphql) {
  const resourceQuery = await markdownQuery(graphql, 'resource');
  const {
    data: { results: { edges, tags, categories } = {} } = {},
  } = resourceQuery;

  edges.forEach(({ node }) => {
    createPage({
      path: `resource/${node.fields.name}`,
      component: path.resolve(`./src/templates/layouts/resource.js`),
      context: {
        name: node.fields.name,
      },
    });
  });

  categories.forEach(({ fieldValue }) => {
    createPage({
      path: `category/${fieldValue}`,
      component: path.resolve(`./src/templates/layouts/category.js`),
      context: {
        slug: fieldValue,
        type: 'category',
      },
    });
  });

  tags.forEach(({ fieldValue }) => {
    createPage({
      path: `tag/${fieldValue}`,
      component: path.resolve(`./src/templates/layouts/tag.js`),
      context: {
        slug: fieldValue,
        type: 'tag',
      },
    });
  });
}

async function markdownQuery(graphql, source) {
  const result = await graphql(`
    {
      results: allMdx(filter: { fields: { sourceName: { eq: "${source}" } } }) {
        tags: group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
        categories: group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
        edges {
          node {
            frontmatter {
              layout
            }
            fields {
              name
            }
          }
        }
      }
      
    }
  `);

  if (result.errors) {
    console.error(result.errors);
  }

  return result;
}
