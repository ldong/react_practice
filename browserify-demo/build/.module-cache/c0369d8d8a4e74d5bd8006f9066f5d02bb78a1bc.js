
var React = require('react');
var MessageBox = requirSubMessage

var message= 'Yo Man!';

var app = React.render(
    React.createElement(MessageBox, {titleMessage: message}),
    document.getElementById('app')
);

