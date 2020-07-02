import React from 'react';
import Taxonomy from './taxonomy';

export default (props) => {
  const { pageContext, data } = props;

  const { slug, type } = pageContext;
  const { totalCount } = data.allMdx;
  const title = `${totalCount} resources${
    totalCount === 1 ? '' : 's'
  } with the ${type} "${slug}"`;
  return <Taxonomy {...props} title={title} />;
};

// I can't dynamically filter the fontmatter field,
// so I have to make a unique query for EACH taxonomy.
// Lame.

export const pageQuery = graphql`
  query($slug: String) {
    allMdx(filter: { frontmatter: { category: { eq: $slug } } }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            tags
            category
          }
          body
        }
      }
    }
  }
`;
