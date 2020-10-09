import React from "react";
import PropTypes from "prop-types";
import Date from "components/Date";

const Format = ({ name, value }) => {
  if (name === "date") {
    return <Date>{value}</Date>;
  }
  return Array.isArray(value) ? value.join(", ") : value;
};

const ArticleDetails = ({ id, title, items }) => {
  return (
    <div className="ArticleDetails">
      {title && (
        <h4 id={id} className="ArticleDetails__title">
          {title}
        </h4>
      )}
      {items.map(({ key, title, value }) => (
        <div key={key} className="ArticleDetails__item">
          <span className="ArticleDetails__item-title">{title}</span>
          <span className="ArticleDetails__text">
            <Format name={key} value={value} />
          </span>
        </div>
      ))}
    </div>
  );
};

ArticleDetails.defaultProps = {
  id: "",
  title: "",
  items: [],
};

ArticleDetails.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })
  ),
};

export default ArticleDetails;
