var React = require('react');
var MessageBox = require('./MessageBox');

var message= 'Yo Man!';

var app = React.render(
    <MessageBox titleMessage={message} />,
    document.getElementById('app')
);

