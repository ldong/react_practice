var App = React.createClass({
    componentWillMount: function(){
        // debugger;
        console.log('componentWillMount');
    },

    componentDidMount: function(){
        // debugger
        console.log('componentDidMount');
        this.loadData().then(function(data){
            this.setState({
                metric: data
            });
            $('#tip').tooltip();
        }.bind(this));

    },

    loadData: function(){
        var url = 'https://react-demo-may-16-2015.firebaseio.com/' + this.props.url + '/.json';
        console.log(url);
        return $.get(url);
    },

    componentWillReceiveProps: function(nextProps){
        console.log('componentWillReceiveProps');
        var lastUrl = this.props.url;
        var currUrl = nextProps.url;
        console.log('lastUrl'+lastUrl);
        console.log('currUrl'+currUrl);

        this.loadData(currUrl).then(function(data){
            this.setState({
                lastRoute: lastUrl,
                metric: data
            });
        }.bind(this));
    },

    shouldComponentUpdate: function(nextProps, nextState){
       // return boolean
       console.log('shouldComponentUpdate');
       console.log(nextState.metric);
//       return true;
       return nextState.metric.length > 20;
    },

    componentWillUnmount: function(){
      $('#tip').tooltip('destroy');
    },
    getInitialState: function(){
        return {
            metric: 0,
            lastRoute: 'metric'
        };
    },

    render: function(){
        return (
            <div className="jumbotron">
                {this.state.lastRoute}
                <div>
                    <a id="tip" href="#" data-toggle="tooltip" title="hover">Hover over it</a>
                </div>
                <h2>{this.state.metric}</h2>
            </div>
        );
    }

});

var app = React.render(
    <App url='metric' />,
    document.getElementById('app')
);

