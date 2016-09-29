
/**
* This is a form  for parcels. It includes all items includes in a parcel. Include pucks
*
* @class ParcelPanel
* @constructor
*/
function ParcelPanel(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;

	this.isSaveButtonHidden = false;
	this.isHidden = false;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onSavedClick = new Event(this);
}

/**
* It inserts a panel into the this.panel with the template parcelformsummary
*
* @method addHeaderPanel
*/
ParcelPanel.prototype.addHeaderPanel = function() {
	var html = "No information";
	dust.render("parcelformsummary", this.dewar, function(err, out){
		html = out;
    });
	this.panel.insert(
				{
					xtype 	: 'container',
					width	: 200,
					border : 1,
					padding : 20,
					items 	: [	{html : html}
				
					]
				}
	);
};

ParcelPanel.prototype.render = function() {
	var dewar = this.dewar;
	this.panel.removeAll();

	this.addHeaderPanel();
	
	if (dewar != null){
		if (dewar.containerVOs != null){
			/** Sorting container by id **/
			dewar.containerVOs.sort(function(a, b){return a.containerId - b.containerId;});
			for (var i = 0; i< dewar.containerVOs.length; i++){
				var container = dewar.containerVOs[i];
				/** Adding the puck layout **/
				var puckPanel = new PuckPanel({height : 200});
				this.panel.insert(puckPanel.getPanel());
				puckPanel.load(container);
				
			}
		}
	}
};

ParcelPanel.prototype.load = function(dewar) {
	this.dewar = dewar;
	try {
		/** Rendering pucks **/
		this.render();
	}
	catch(e){
		console.log(e);
	}
};

/**
* It inserts a new puck into the dewar and reloads the widget
*
* @method addPuckToDewar
*/
ParcelPanel.prototype.addPuckToDewar = function() {
	var _this = this;
	var onSuccess = function(sender, puck){
		_this.dewar.containerVOs.push(puck);
		_this.load(_this.dewar);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.addPuck(this.dewar.dewarId, this.dewar.dewarId);
};

/**
* It displays a window with a case form
*
* @method showCaseForm
*/
ParcelPanel.prototype.showCaseForm = function() {
	var _this = this;
	/** Opens a window with the cas form **/
	var caseForm = new CaseForm();
	var window = Ext.create('Ext.window.Window', {
	    title: 'Parcel',
	    height: 450,
	    width: 600,
	    modal : true,
	    layout: 'fit',
	    items: [
	            	caseForm.getPanel(_this.dewar)
	    ],
	    listeners : {
			afterrender : function(component, eOpts) {
				if (_this.puck != null){
						_this.render(_this.puck);
				}
			}
	    },
	    buttons : [ {
						text : 'Save',
						handler : function() {
							_this.onSavedClick.notify(caseForm.getDewar());
							window.close();
						}
					}, {
						text : 'Cancel',
						handler : function() {
							window.close();
						}
					} ]
	});
	window.show();
};

ParcelPanel.prototype._getTopButtons = function() {
	var _this = this;
	var actions = [];
	
	
	actions.push(this.code);
	actions.push(this.status);
	actions.push(this.storageCondition);
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/edit.png',
		text : 'Edit',
		disabled : false,
		handler : function(widget, event) {
					_this.showCaseForm();
		}
	}));
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/print.png',
		text : 'Print Labels',
		disabled : false,
		handler : function(widget, event) {
			var dewarId = _this.dewar.dewarId;
			var url = EXI.getDataAdapter().proposal.shipping.getDewarLabelURL(dewarId, dewarId);
			location.href = url;
			return;
		}
	}));
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/add.png',
		text : 'Add puck',
		disabled : false,
		handler : function(widget, event) {
			_this.addPuckToDewar();
		}
	}));
	
	return actions;
};


ParcelPanel.prototype.getPanel = function() {
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		layout 		: 'hbox',
		cls 		: "border-grid",
		margin 		: 10,
		height 		: this.height,
		autoScroll	: true,
		items 		: [],
		listeners : {
			afterrender : function(component, eOpts) {
						_this.render();
			}
	    }
//	,
//		toolbar : [ {
//						text : 'Save',
//						handler : function() {
//								var adapter = new DataAdapter();
//								_this.panel.setLoading();
//								var dewar = caseForm.getDewar();
//								var onSuccess = (function(sender, shipment) {
//									_this.load(shipment);
//									window.close();
//									_this.panel.setLoading(false);
//								});
//								dewar["sessionId"] = dewar.firstExperimentId;
//								dewar["shippingId"] = _this.shipment.shippingId;
//								EXI.getDataAdapter({onSuccess : onSuccess}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
//						}
//					}, 
//					{
//							text : 'Cancel',
//							handler : function() {
//								window.close();
//							}
//					}]
	});
	
	this.panel.addDocked({
		id 		: _this.id + 'tbar',
		height 	: 45,
		xtype 	: 'toolbar',
		items 	: _this._getTopButtons(),
		cls 	: 'exi-top-bar'
	});
	return this.panel;
};
