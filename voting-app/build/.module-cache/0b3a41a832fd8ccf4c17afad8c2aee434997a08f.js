var SubMessage = React.createClass({displayName: "SubMessage",
  getDefaultProps: function(){
    return {
      message: 'Its good to see you'
    }
  },
  
  handleDelete: function(e){
//      console.log(this.props);
      this.props.onDelete(this.props.message);
  },
  
  render: function(){
    return (
		React.createElement("div", null, 
    	  React.createElement("div", null, this.props.message), 
	      React.createElement("button", {className: "btn btn-danger", onClick: this.handleDelete}, "X")
		)
    );
  }
});

