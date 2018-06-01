import React from 'react';

//If the url does not match with any defined one it tells the user so
const NoMatch = ({ location }) => (
  <div className="No-match" aria-label="No page was found with this url">
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default NoMatch;