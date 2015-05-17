
var React = require('react');SubMessage

var message= 'Yo Man!';

var app = React.render(
    React.createElement(MessageBox, {titleMessage: message}),
    document.getElementById('app')
);

