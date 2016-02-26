function ExperimentMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	this.experimentHeaderForm = new ExperimentHeaderForm();
	var _this = this;
	/** Viscosity **/
	var storeViscosity = Ext.create('Ext.data.Store', {
		fields : [ 'name' ],
		data : [ {
			"name" : "low"
		}, {
			"name" : "medium"
		}, {
			"name" : "high"
		} ]
	});

	// Create the combo box, attached to the states data store
	var viscosityEditor = Ext.create('Ext.form.ComboBox', {
		fieldLabel : '',
		store : storeViscosity,
		queryMode : 'local',
		displayField : 'name',
		valueField : 'name'
	});
	
	
	/** Specimen Widget contains a specimenGrid and a sampleChangerWidget than can be displayed with are vertical or horizontal layout **/
	this.specimenWidget = new SpecimenWidget({
		height : this.height,
		width : 1200
	});
	
	this.measurementGrid = new MeasurementGrid({
//		maxWidth : 1500,
//		width : 1200,
		height : 600,
		minHeight : 600,
		maxHeight : 600,
		estimateTime : false,
		positionColumnsHidden : false,
		isPriorityColumnHidden : true,
		isStatusColumnHidden : false,
		addBtnEnable : false,
		isTimeColumnHidden : false,
		updateRowEnabled : false,
		collapsed : false,
		removeBtnEnabled : false,
		showTitle : false,
		collapseBtnEnable : false,
		addBtnMultipleEdit : false,
		sortingBtnEnable : false,
		editor : {
			exposureTemperature : {
				xtype : 'textfield',
				allowBlank : true
			},
			comments : {
				xtype : 'textfield',
				allowBlank : true
			},
			volumeToLoad : {
				xtype : 'numberfield',
				allowBlank : true
			},
			transmission : {
				xtype : 'numberfield',
				allowBlank : true
			},
			viscosity : viscosityEditor,
			waitTime : {
				xtype : 'numberfield',
				allowBlank : true
			},
			flow : {
				xtype : 'checkbox',
				allowBlank : true
			}
		}
	});

//	this.measurementGrid.onSelected.attach(function(sender, measurements) {
//		var specimens = [];
//		for ( var i = 0; i < measurements.length; i++) {
//			specimens.push(_this.experiment.getSampleById(measurements[i].specimenId));
//		}
//	});

	this.measurementGrid.onMeasurementChanged.attach(function(sender, measurement) {
//		debugger
		_this.experiment.setMeasurement(measurement);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onExperimentChanged.attach(function(sender, json) {
		_this.experiment = new Experiment(json);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onRemoved.attach(function(sender, experiments) {
		_this.experiment = new Experiment(experiments[0]);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	
	this.queueGrid = new QueueGrid({
		positionColumnsHidden : true,
//		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC'
		} ]
	});
	
	
}

ExperimentMainView.prototype.getPanel = MainView.prototype.getPanel;

ExperimentMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};


ExperimentMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				activeTab: 2,
				items : [
					{
						tabConfig : {
							title : "Sample Plate Setup"
						},
						items : [  
									{
										xtype : 'container',
										layout : 'vbox',
										height : 700,
										padding : 20,
										style : {
											borderColor : 'gray',
											borderStyle : 'solid',
											borderWidth : '1px',
											'background-color' : 'white' 
										},
										items : [ 
										     	this.specimenWidget.getPanel()
										     	]
									}
									]
					},
					{
						tabConfig : {
							title : 'Measurements'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							         
							         this.measurementGrid.getPanel()
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Online Data Analysis'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							     this.queueGrid.getPanel()    
							]
						}
					
						]
					}
			]
	}
	);
};


ExperimentMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            this.experimentHeaderForm.getPanel(),
	            this.getTabs()
	    ]
	});
};



ExperimentMainView.prototype.load = function(experimentId) {
	var _this = this;
	_this.panel.setLoading();
	_this.queueGrid.panel.setLoading();
	var onSuccess = function(sender, experiments){
		_this.experiment = new Experiment(experiments[0]);
		_this.experimentHeaderForm.load(_this.experiment);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.panel.setTitle(experiments[0].name);
		_this.panel.setLoading(false);	
		var onSuccess = function(sender, data){
			_this.queueGrid.load(data);
			_this.queueGrid.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperimentId(experimentId);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getExperimentById(experimentId);
};


