var Form = React.createClass({displayName: "Form",
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
			React.createElement(FormList, {formListData: this.state.formListData})
		);
	}
});

var FormList = React.createClass({displayName: "FormList",
	render: function() {
		var formListElements = this.props.formListData.map(function(e) {
			var className = "form-group " + e.className;
			return(
				React.createElement("div", {key: e.id, id: e.id, className: className}, 
					React.createElement("label", {for: e.id}, e.title), 
					
					React.createElement(FormListElement, {
						name: e.name, 
						elementType: e.elementType, 
						value: e.value, 
						className: e.className
					}), 
					
					React.createElement("p", {className: "showProperty"})
				)
			);
		})
		return(
			React.createElement("div", {className: "form-design-body"}, 
				formListElements
			)
		);
	}
});

var FormListElement = React.createClass({displayName: "FormListElement",
	render: function() {
		switch(this.props.elementType) {
			case "drog_text":
				return(
					React.createElement("input", {name: this.props.name, className: "form-control", type: "text"})
				);
				break;
			case "drog_number":
				return(
					React.createElement("input", {name: this.props.name, className: "form-control", type: "number"})
				);
				break;
			case "drog_dropdown":
				var selectOptions = [];
				for(var i = 0; i < this.props.value.length; i++) {
					this.props.value[i] = React.createElement(SelectOption, {value: this.props.value[i]})
				}
				return(
					React.createElement("select", {name: this.props.name, className: "form-control"}, 
						selectOptions
					)
				);
				break;
			default:
				return(
					React.createElement("div", null)
				);
				break;
		}
	}
});

var SelectOption = React.createClass({displayName: "SelectOption",
	render: function() {
		return(
			React.createElement("option", {value: this.props.value}, this.props.value)
		);
	}
});

var myComponentFormDesign = ReactDOM.render(
	React.createElement(Form, null),
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