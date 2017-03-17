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
			<PropertyContent propertyData={this.state.propertyData}/>
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
				<div className="col-xs-12 no-property">
					<p className="no-property-title">沒有選擇控件</p>
					<p className="no-property-content">請先在表單設計頁面中點擊需要編輯的控件,然後在此編輯控件的屬性</p>
				</div>
			);
		} else {
			return(
				<div>
					<h4>表单属性</h4>
					<div className="propertyUI">
						<div className="col-xs-12">
							<label className="label-title desc">字段名稱</label>
							<textarea className="titleChange form-control" onChange={this.titleChange.bind(this)} value={this.props.propertyData.title}></textarea>
						</div>
						<div className="col-xs-6">
							<label className="label-title desc">字段類型</label>
							<select className="form-control">
								<option>單行文本</option>
							</select>
						</div>
						<div className="col-xs-6">
							<label className="label-title desc">寬度</label>
							<select className="form-control widthChange" onChange={this.widthChange.bind(this)}>
								<option value="col-xs-12">充满整行</option>
								<option value="col-xs-6">整行宽度的1/2</option>
								<option value="col-xs-4">整行宽度的1/3</option>
								<option value="col-xs-3">整行宽度的1/4</option>
							</select>
						</div>
						<PropertyContentTab propertyData={this.props.propertyData}/>
					</div>
				</div>
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
					<div className="col-xs-6"></div>
				);
				break;
			case "drog_number":
				return(
					<div className="col-xs-6"></div>
				);
				break;
			case "drog_dropdown":
				return(
					<div className="col-xs-12">
						<label className="label-title desc">數據</label>
						<input className="dropDownDataChange form-control" onChange={this.dropDownDataChange} type="text"/>
					</div>
				);
				break;
			default:
				return(null);
				break;
		}
	}
}

var myComponentFormProperty = ReactDOM.render(
	<Property />,
	document.getElementById("property")
);