/**
 * Regular sidebar row.
 */

import _ from 'lodash';
import * as Filter from 'utils/challenge-listing/filter';
import PT from 'prop-types';
import React from 'react';
import './style.scss';

export default function Bucket({
  active,
  bucket,
  challenges,
  disabled,
  onClick,
}) {
  let count;
  if (!bucket.hideCount && !disabled) {
    const filter = Filter.getFilterFunction(bucket.filter);
    count = challenges.filter(filter).length;
    count = <span styleName="right">{count}</span>;
  }

  if (active) return <div styleName="active bucket">{bucket.name}{count}</div>;

  return (
    <div
      onClick={disabled ? _.noop : onClick}
      onKeyPress={e => (e.key === 'Enter' ? onClick() : null)}
      role="button"
      styleName="bucket"
      tabIndex={0}
    >{bucket.name}{count}</div>
  );
}

Bucket.defaultProps = {
  active: false,
  disabled: false,
  onClick: _.noop,
};

Bucket.propTypes = {
  active: PT.bool,
  bucket: PT.shape({
    hideCount: PT.bool,
    name: PT.string.isRequired,
  }).isRequired,
  challenges: PT.arrayOf(PT.shape).isRequired,
  disabled: PT.bool,
  onClick: PT.func,
};
