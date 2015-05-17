# React.js Notes

Notes I took along while learning `Getting Started With React.js`

Author: Lin Dong

Date: Sat May 16 15:03:08 PDT 2015

[davideast/getting-started-with-react](https://github.com/davideast/getting-started-with-react)
## Why React?

1. Change DOM is slow

2. Re-rendering the same DOM tree is slower

## How does the algorithm work?

VirtualDOM, compare the old VirtualDOM and current VirtualDOM

Diff out the changes and then only apply the changes to the existing DOM

[Demo](http://fiduswriter.github.io/diffDOM/demo/index.html)

These actions have been taken care by the React.JS library

## Lets get started

[JSFiddle Demo](https://jsfiddle.net/reactjs/69z2wepo/)

[JSX Online Compiler](https://facebook.github.io/react/jsx-compiler.html)

## Intro

```js
<script type="text/jsx">
var MessageBox = React.createClass({
  render: function(){
    return (
      <h1>Hello world</h1>
    );
  }
});

React.render(
  <MessageBox />,
  document.getElementById('app'),
  function(){
    console.log("This is a callback");
  }
)
</script>
```

Note:

1. `return` can only return a root node, which can be a single element or
nested elements.
2. The `@jsx Pragma` is **Gone**!
3. `React.renderComponent` is now `React.render`

[Demo](https://jsfiddle.net/ldong/129d1s5f/)

## JSX vs React.DOM

### JSX
```js
<script type="text/jsx">
var MessageBoxJSX = React.createClass({
  render: function(){
    return (
      <div className='container'>
        <h1>Hello world</h1>
        <SubMessage />
      </div>
    );
  }
});

var SubMessage = React.createClass({
  render: function(){
    return (
      <small>Its good to see you </small>
    );
  }
});

var reactJSX = React.render(
  <MessageBoxJSX />,
  document.getElementById('app')
);
</script>
```

[React 101: 2 JSX](https://jsfiddle.net/ldong/uxu27z9u/)

### React.DOM
```javascript
var MessageBoxDOM = React.createClass({
  render: function(){
    return React.DOM.h1(null, 'Hello world');
  }
});

var reactDOM = React.render(
  React.createElement(MessageBoxDOM, null),
  document.getElementById('app')
);
```

[React 101: 2 without JSX](https://jsfiddle.net/ldong/jmcfn05y/)

## State

From now on, all the examples are written in `jsx` flavor

```js
<script type="text/jsx">
var MessageBox = React.createClass({
  getInitialState: function(){
    return {
      isVisible: true,
      titleMessage: 'Hello World'
    }
  },

  render: function(){
    var inlineStyles = {
      display: this.state.isVisible ? 'block' : 'none'

    };

    return (
      <div className="container jumbotron" style={inlineStyles}>
        <h2>{this.state.titleMessage}</h2>
        <SubMessage />
      </div>
    );
  }
});

var SubMessage = React.createClass({
  render: function(){
    return (
      <div>Its good to see you</div>
    );
  }
});

var reactJSX = React.render(
  <MessageBox />,
  document.getElementById('app')
);

</script>
```

Type this in the console to change its state

```js
reactJSX.setState({
  isVisible: false,
  titleMessage: "YO!"
});
```

Notes:

1. Expression can be written by using single braces `{}`

2. The process of changing states is called [reconciliation](https://facebook.github.io/react/docs/reconciliation.html)

3. Please read [here](https://facebook.github.io/react/docs/component-specs.html) about the life cycle of `ReactJS`

[Demo](https://jsfiddle.net/ldong/rj1bquzh/)

## Props, Multiple State

```js
<script type="text/jsx">
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

  render: function(){
    var inlineStyles = {
      display: this.state.isVisible ? 'block' : 'none'
    };

    var messages = this.state.messages.map(function(message){
      return <SubMessage message={message} />;
    });

    var subMessage = 'Its not good to see you';

    return (
      <div className="container jumbotron" style={inlineStyles}>
        <h2>Hello world</h2>
        <SubMessage message={subMessage}/>
        {messages}
      </div>
    );
  }
});

var SubMessage = React.createClass({
  getDefaultProps: function(){
    return {
      message: 'Its good to see you'
    }
  },
  render: function(){
    return (
      <div>{this.props.message}</div>
    );
  }
});

var message= 'Yo Man!';

var reactJSX = React.render(
  <MessageBox titleMessage={message} />,
  document.getElementById('app')
);

</script>
```

In the console, we input

```js
var newMessagesArray = reactJSX.state.messages.concat("New Item!");
reactJSX.setState({ messages: newMessagesArray });
```

See [demo](https://jsfiddle.net/ldong/8edf3adf/)

Notes:

1. Message is the **owner** of SubMessage, in other words, Message sets SubMessage

## Synthetic Effects

```js
<button class='btn btn-primary' onClick={this.handleAdd}>Add</button>
```

Note:

1. `onClick` is defined in React not the HTML default
2. React auto binds `this` to React Component

[Demo](https://jsfiddle.net/ldong/xufgbh4r/)

## Refs

1.`getDOMNode` is *deprecated* and has been replaced with `React.findDOMNode`

For example:

```js
var newMessageDOM =this.refs.newMessage.getDOMNode();
newMessageDOM = React.findDOMNode(this.refs.newMessage);

var value = newMessageDOM.value;
```

2. Use refs to extract data from DOM, i.e. **input**, **form**

[Demo](https://jsfiddle.net/ldong/zda6g1on/)

## One Way Directional Data Flow

How do delete parent elements from SubView?

You guessed: using **callback**

Please watch out for `this` **binding**

```js
var messages = this.state.messages.map(function(message){
  return <SubMessage message={message} onDelete={this.deleteMessage}/>;
}.bind(this));
```


[Demo](https://jsfiddle.net/ldong/88nxm8f8/)

## Two way Data Binding

Two way binding, i.e. Angular, is cool and convenient, but complicated over
time for computed properties.

[Angular Demo](http://jsbin.com/cakoza/edit?html,output)

[React Demo](https://jsfiddle.net/ldong/bsxvp137/)

React-Addon Shortcut:

1. [React-Link](https://facebook.github.io/react/docs/two-way-binding-helpers.html#reactlink-before-and-after), [what happens under the hood](http://stackoverflow.com/a/21058282/2305243)? It will invoke onChange/setState together to ask the parent to re-render if anything changes.

2. `transferPropsTo` is [deprecated](https://gist.github.com/sebmarkbage/a6e220b7097eb3c79ab7)

i.e.

```js
//Before
render: function(){
  return this.transferPropsTo(
    <input type="text" {...this.props}/>
  );
}

//After
render: function(){
  return (
    <input type="text" {...this.props}/>
  );
}
```

## Component Life Cycle

1. Mounting

2. Updating

3. UnMouting

[More](https://facebook.github.io/react/docs/component-specs.html)

### Mounting

```
componentWillMount
componentDidMount
```

If you think this really look like iOS development, you are right.

Most of guys in React Team were from Apple, so, consequently, no surprises.

jQuery and Firebase is used

[demo](https://jsfiddle.net/ldong/osuye4qd/3/)

### Updating

```js
componentWillReceiveProps: function(nextProps){}
```

Access new props from `nextProps` and old props from `this.props`

`componentWillReceiveProps` is invoked upon prop changes.

Type in the console

```
app.setProps({ url: 'metric2'});
```

```js
shouldComponentUpdate: function(){}
```


[Demo](https://jsfiddle.net/ldong/u94z60vr/4/)

### UnMounting

Clean up when removing the component

Overwrite this method: `componentWillUnmount: function(){}`

Invoked by `React.unmountComponentAtNode(document.getElementById('app'));` in the console.

[Demo](https://jsfiddle.net/ldong/vh145puz/2/)

## Tools

### react-tools

Converting JSX to JS

```bash
npm install react-tools --save-dev
npm install -g react-tools

mkdir src build
jsx --watch src/ build/
```

[Demo]()

### Browserify


# Reference

I found lots of deprecated API while I watching this tutorial.

Pleas read the changes in the following:

1. [React v0.12](https://facebook.github.io/react/blog/2014/10/28/react-v0.12.html)

2. [React v0.13](https://facebook.github.io/react/blog/2015/03/10/react-v0.13.html)
