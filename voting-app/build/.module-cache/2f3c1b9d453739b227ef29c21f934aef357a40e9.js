
var React = require('react');
var MessageBoSubMessage

var message= 'Yo Man!';

var app = React.render(
    React.createElement(MessageBox, {titleMessage: message}),
    document.getElementById('app')
);

