/**
 * Main form tab for macromolecule
 * 
 * @width
 * @height
 * 
 * #onClose when user clicks on close button in the MacromoleculeForm
 * #onSave when macromole is saved by macromoleculeForm
 */
function MacromoleculeTabs(args) {
	this.width = 500;
	this.height = 500;

	if (args != null) {
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.height != null) {
			this.height = args.height;
		}
	}

	var _this = this;

	/** Widgets **/

	/** Macromolecule Form **/
	this.macromoleculeForm = new MacromoleculeForm({
		width : this.width - 30,
		height : this.height - 50,
	});

	this.macromoleculeForm.onClose.attach(function(sender) {
		_this.onClose.notify();
	});

	this.macromoleculeForm.onSave.attach(function(sender, macromolecule) {
		_this.onSave.notify(macromolecule);
	});

	this.assemblyForm = new AssemblyForm({
		width : this.width - 30,
		height : this.height - 50,
	});
	
	this.rigibBodyModelingForm = new RigibBodyModelingForm({
		width : this.width - 30,
		height : this.height - 50,
	});

	/** Events **/
	this.onClose = new Event(this);
	this.onSave = new Event(this);
}

/** Populate the widget **/
MacromoleculeTabs.prototype.refresh = function(macromolecule) {
	this.macromoleculeForm.refresh(macromolecule);
	this.assemblyForm.refresh(macromolecule);
	this.rigibBodyModelingForm.refresh(macromolecule);
};

MacromoleculeTabs.prototype.getItems = function() {
	return [ {
		tabConfig : {
			title : 'General'
				
		},
		items : [ {
			xtype : 'container',
			items : [ this.macromoleculeForm.getPanel() ]
		} ]
	}, 
//	{
//		tabConfig : {
//			title : 'Assembly'
//		},
//		items : [ {
//			xtype : 'container',
//			items : [ this.assemblyForm.getPanel() ]
//		} ]
//	},{
//		tabConfig : {
//			title : 'Advanced'
//		},
//		items : [ this.rigibBodyModelingForm.getPanel() ]
//	} 
	];
};

MacromoleculeTabs.prototype.getPanel = function() {
	this.panel = Ext.createWidget('tabpanel', {
		height : this.height,
		width : this.width,
		frame : true,
		plain : false,
		margin : 0,
		border : 1,
		items : this.getItems()
	});
	return this.panel;
};
