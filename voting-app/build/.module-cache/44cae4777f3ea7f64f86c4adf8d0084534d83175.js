
var React =SubMessage

var message= 'Yo Man!';

var app = React.render(
    React.createElement(MessageBox, {titleMessage: message}),
    document.getElementById('app')
);

