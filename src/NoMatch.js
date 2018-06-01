import React from 'react';

const NoMatch = ({ location }) => (
  <div className="No-match" aria-label="No page was found with this url">
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default NoMatch;