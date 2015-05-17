var SubMessage = React.createClass({
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
		<div>
    	  <div>{this.props.message}</div>
	      <button className="btn btn-danger" onClick={this.handleDelete} >X</button>
		</div>
    );
  }
});

