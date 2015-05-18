var React = require('React');
var FeedItem = require('./FeedItem');

var FeedList = React.createClass({
  render: function(){
    var feedItems = this.props.items.map(function(item) {
      return <FeedItem title={item.title} desc={item.description} voteCount={item.voteCount} />
    });

    return (
      <ul className="list-group container">
        {feedItems}
      </ul>
    );
  }
});

module.exports = FeedList;

