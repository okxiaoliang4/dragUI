var Form = React.createClass({
	getInitialState: function() {
		return {
			formListData: []
		};
	},
	handleChange: function(rows) {
		this.setState({
			formListData: rows
		});
	},

	addOneData: function(row) {
		var formListData = this.state.formListData;
		formListData[formListData.length] = row;
		this.handleChange(formListData);
	},

	render: function() {
		return(
			<FormList formListData={this.state.formListData}/>
		);
	}
});

var FormList = React.createClass({
	render: function() {
		var formListElements = this.props.formListData.map(function(e) {
			var className = "form-group " + e.className;
			return(
				<div key={e.id} id={e.id} className={className}>
					<label for={e.id}>{e.title}</label>
					
					<FormListElement 
						name={e.name}
						elementType={e.elementType}
						value={e.value}
						className={e.className}
					></FormListElement>
					
					<p className="showProperty"></p>
				</div>
			);
		})
		return(
			<div className="form-design-body">
				{formListElements}
			</div>
		);
	}
});

var FormListElement = React.createClass({
	render: function() {
		switch(this.props.elementType) {
			case "drog_text":
				return(
					<input name={this.props.name} className="form-control" type="text" />
				);
				break;
			case "drog_number":
				return(
					<input name={this.props.name} className="form-control" type="number" />
				);
				break;
			case "drog_dropdown":
				var selectOptions = [];
				for(var i = 0; i < this.props.value.length; i++) {
					this.props.value[i] = <SelectOption value={this.props.value[i]}></SelectOption>
				}
				return(
					<select name={this.props.name} className='form-control'>
						{selectOptions}
					</select>
				);
				break;
			default:
				return(
					<div></div>
				);
				break;
		}
	}
});

var SelectOption = React.createClass({
	render: function() {
		return(
			<option value={this.props.value}>{this.props.value}</option>
		);
	}
});

var myComponentFormDesign = ReactDOM.render(
	<Form />,
	document.getElementById("form-design")
);

myComponentFormDesign.componentDidUpdate = function() {
	console.log("myComponentFormDesign组件更新完成");
	//	console
	//		.log(JSON
	//			.stringify(myComponentFormDesign.state.formListData));
	if(isDesignView) {
		$(".showProperty").off("click"); // 需要先解绑，否则会多次绑定
		$(".showProperty").on("click", function() {
			console.log($(this));
			$(".showProperty").removeClass("active");
			$(this).addClass("active");
			for(var i = 0; i < myComponentFormDesign.state.formListData.length; i++) {
				if(myComponentFormDesign.state.formListData[i].id == $(this).parent().attr("id")) {
					myComponentFormProperty.handleChange(myComponentFormDesign.state.formListData[i]);
					break;
				}
			}
		});
	}
}