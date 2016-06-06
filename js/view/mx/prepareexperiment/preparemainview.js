function PrepareMainView() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);

	
}

PrepareMainView.prototype.getPanel = MainView.prototype.getPanel;

PrepareMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
        
	   
	    items: [
            this.getDewarGrid(), 
            {
                html : 'test'
            }
         ]
	});
};

PrepareMainView.prototype.getStoreBeamlines = function() {
        return Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"AL", "name":"Alabama"},
                {"abbr":"AK", "name":"Alaska"},
                {"abbr":"AZ", "name":"Arizona"}
            ]
        });

        // Create the combo box, attached to the states data store
        return Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose State',
            store: states,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr'
        });
};

PrepareMainView.prototype.getDewarGrid = function() {
    this.store = Ext.create('Ext.data.Store', {
        fields:['beamlineLocation', 'storageLocation','containerStatus','containerType','sessionStartDate','creationDate','beamLineOperator','shippingStatus','shippingName', 'barCode', 'beamlineName', 'dewarCode', 'dewarStatus', 'sampleChangerLocation', 'sampleCount', 'sessionStartDate', 'type']
    });

    var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect		: true,
		mode				: 'MULTI',
		listeners			: {
						        selectionchange: function (sm, selections) {
						           	//_this.selected = _this.getSelectedData();
						        	//_this.onSelectionChange.notify(_this.selected );
						        },
						        select: function (sm, selected) {
						        	//_this.onSelect.notify(selected.data);
						        },
						        deselect: function (sm, deselected) {
						        	//_this.onDeselect.notify(deselected.data);
						        }
		}
	});
    
    this.panel = Ext.create('Ext.grid.Panel', {
            title: 'Select dewars',
            store: this.store,
            cls : 'border-grid',
            //selModel : selModel,
            height : 600,
            collapsible : true,
            plugins : [
              Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit : 1,
                    listeners : {
                        validateedit : function(grid, e) {
                            /** Setting values * */
                            for ( var key in _this.editor) {
                                e.record.data[key] = e.newValues[key];
                            }
                            /** Comments are always updatable* */
                            e.record.data.comments = e.newValues.comments;
                            
                            var onSuccess = (function(sender, measurement) {
                                _this.onMeasurementChanged.notify(measurement);
                                _this.grid.setLoading(false);
                            });
                            _this.grid.setLoading();
                            EXI.getDataAdapter({onSuccess : onSuccess}).saxs.measurement.saveMeasurement(e.record.data);
                        }
                    }
                })  
                
                
            ],
            margin : 5,
            columns: [
                {
                    text    : 'Shipment',
                    columns : [
                         { text: 'Name',  dataIndex: 'shippingName', width: 150 },
                         { text: 'Status',  dataIndex: 'shippingStatus', flex: 1 },
                         { text: 'Creation Date',  dataIndex: 'creationDate', flex: 1, 
                            renderer : function(grid, a, record){
                                if (record.data.creationDate){
                                    return moment(record.data.creationDate, "'MMMM Do YYYY, h:mm:ss a'").format("DD/MM/YYYY");
                                }     
                                
                            } 
                        },
                                                 
                    ]                                         
                },
                {
                    text    : 'Experiment',
                    columns : [
                            { text: 'Date',  dataIndex: 'sessionStartDate', flex: 2, 
                            renderer : function(grid, a, record){
                                if (record.data.sessionStartDate){
                                    return moment(record.data.sessionStartDate, "'MMMM Do YYYY, h:mm:ss a'").format("DD/MM/YYYY");
                                }     
                                
                            } 
                        },
                            { text: 'beamline', dataIndex: 'beamlineName', flex: 1 },     
                            { text: 'Local contact',  dataIndex: 'beamLineOperator', flex: 2  }                 
                    ]                                         
                },
                {
                    text    : 'Dewar',
                    columns : [
                            
                            { text: 'Comp. Name',  dataIndex: 'dewarCode' },
                            { text: 'Status', dataIndex: 'dewarStatus', flex: 1 },
                            { text: 'Barcode', dataIndex: 'barCode', flex: 1 },               
                    ]                                         
                },
                 {
                    text    : 'Container',
                    columns : [
                            { text: 'containerId',  dataIndex: 'containerId', flex: 2  },
                            { text: 'containerCode',  dataIndex: 'containerCode', flex: 2  },
                            { text: 'Status',  dataIndex: 'containerStatus', flex: 2  } ,
                            { text: 'Type',  dataIndex: 'containerType', flex: 2  },
                            { text: 'Location',  dataIndex: 'storageLocation', flex: 2  },
                            
                            { text: '# Samples',  dataIndex: 'sampleCount', flex: 2  }                           
                    ]                                         
                },
                {       text: 'beamlineLocation',     
                        dataIndex: 'beamlineLocation', 
                        flex: 2,
                        editor : {
                                        xtype: 'combo',
                                        store : this.getStoreBeamlines(),
                                        displayField: 'name',
                                        valueField: 'abbr'
                        }
                },
                { 
                        text: 'sampleChangerLocation', 
                        dataIndex: 'sampleChangerLocation', 
                        flex: 2,  
                        editor: {
                                xtype: 'textfield',
                                allowBlank: false
                        }  
            }
            ]
    });
    return this.panel;
};

PrepareMainView.prototype.load = function(dewars) {
	this.panel.setTitle("Prepare Experiment");
    console.log(dewars);
	this.store.loadData(dewars);
};