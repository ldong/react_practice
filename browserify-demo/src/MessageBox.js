var React = require('react');
var SubMessage = require('./SubMessage');

var MessageBox = React.createClass({
  getInitialState: function(){
    return {
      isVisible: true,
      messages: [
          'Message1',
          'Message2',
          'Message3',
          'Message4',
      ]
    }
  },

  handleAdd: function(e){
    // old
    // var newMessage = this.refs.newMessage.getDOMNode().value;
    // new
    var newMessage = React.findDOMNode(this.refs.newMessage).value;
    console.log(newMessage);
    var newMessages = this.state.messages.concat([newMessage]);
    this.setState({
        messages: newMessages
    });
  },

  deleteMessage: function(message){
      console.log('deleting message');
      var newMessages = _.without(this.state.messages, message);
      console.log(newMessages);
      this.setState({
          messages: newMessages
      });
  },

  render: function(){
    var inlineStyles = {
      display: this.state.isVisible ? 'block' : 'none'
    };

    var messages = this.state.messages.map(function(message){
      return <SubMessage message={message} onDelete={this.deleteMessage}/>;
    }.bind(this));

    var subMessage = 'Its not good to see you';

    return (
      <div className="container jumbotron" style={inlineStyles}>
        <h2>Hello world</h2>
        <input ref="newMessage" type="text" />
        <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
        {messages}
      </div>
    );
  }
});

module.exports = MessageBox;
