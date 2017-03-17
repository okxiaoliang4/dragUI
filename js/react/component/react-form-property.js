class Property extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = {
			propertyData: {}
		}
	}
	componentWillMount() {
		console.log("myComponentFormProperty组件即将更新");
	}
	componentDidUpdate() {
		console.log("myComponentFormProperty组件更新完成");
	}
	handleChange(prop) {
		this.setState({
			propertyData: prop
		});
	}
	render() {
		return(
			React.createElement(PropertyContent, {propertyData: this.state.propertyData})
		);
	}
}

class PropertyContent extends React.Component {
	constructor(prop) {
		super(prop);
	}
	titleChange() {
		this.props.propertyData.title = $(".titleChange").val();
		myComponentFormProperty.handleChange(this.props.propertyData);
		myComponentFormDesign.state.formListData[this.props.propertyData.id] = this.props.propertyData;
		myComponentFormDesign.setState({ "formListData": myComponentFormDesign.state.formListData });
	}
	widthChange() {
		this.props.propertyData.className = $(".widthChange").val();
		myComponentFormProperty.handleChange(this.props.propertyData);
		myComponentFormDesign.state.formListData[this.props.propertyData.id] = this.props.propertyData;
		myComponentFormDesign.setState({ "formListData": myComponentFormDesign.state.formListData });
	}
	render() {
		if(this.props.propertyData.id == null) {
			return(
				React.createElement("div", {className: "col-xs-12 no-property"}, 
					React.createElement("p", {className: "no-property-title"}, "沒有選擇控件"), 
					React.createElement("p", {className: "no-property-content"}, "請先在表單設計頁面中點擊需要編輯的控件,然後在此編輯控件的屬性")
				)
			);
		} else {
			return(
				React.createElement("div", null, 
					React.createElement("h4", null, "表单属性"), 
					React.createElement("div", {className: "propertyUI"}, 
						React.createElement("div", {className: "col-xs-12"}, 
							React.createElement("label", {className: "label-title desc"}, "字段名稱"), 
							React.createElement("textarea", {className: "titleChange form-control", onChange: this.titleChange.bind(this), value: this.props.propertyData.title})
						), 
						React.createElement("div", {className: "col-xs-6"}, 
							React.createElement("label", {className: "label-title desc"}, "字段類型"), 
							React.createElement("select", {className: "form-control"}, 
								React.createElement("option", null, "單行文本")
							)
						), 
						React.createElement("div", {className: "col-xs-6"}, 
							React.createElement("label", {className: "label-title desc"}, "寬度"), 
							React.createElement("select", {className: "form-control widthChange", onChange: this.widthChange.bind(this)}, 
								React.createElement("option", {value: "col-xs-12"}, "充满整行"), 
								React.createElement("option", {value: "col-xs-6"}, "整行宽度的1/2"), 
								React.createElement("option", {value: "col-xs-4"}, "整行宽度的1/3"), 
								React.createElement("option", {value: "col-xs-3"}, "整行宽度的1/4")
							)
						), 
						React.createElement(PropertyContentTab, {propertyData: this.props.propertyData})
					)
				)
			);
		}
	}
}

class PropertyContentTab extends React.Component {
	constructor(prop) {
		super(prop);
	}
	dropDownDataChange() {
		this.props.propertyData.value = $(".dropDownDataChange").val();
		myComponentFormProperty.handleChange(this.props.propertyData);
		myComponentFormDesign.state.formListData[this.props.propertyData.id] = this.props.propertyData;
		myComponentFormDesign.setState({ "formListData": myComponentFormDesign.state.formListData });
	}
	render() {
		switch(this.props.propertyData.elementType) {
			case "drog_text":
				return(
					React.createElement("div", {className: "col-xs-6"})
				);
				break;
			case "drog_number":
				return(
					React.createElement("div", {className: "col-xs-6"})
				);
				break;
			case "drog_dropdown":
				return(
					React.createElement("div", {className: "col-xs-12"}, 
						React.createElement("label", {className: "label-title desc"}, "數據"), 
						React.createElement("input", {className: "dropDownDataChange form-control", onChange: this.dropDownDataChange, type: "text"})
					)
				);
				break;
			default:
				return(null);
				break;
		}
	}
}

var myComponentFormProperty = ReactDOM.render(
	React.createElement(Property, null),
	document.getElementById("property")
);