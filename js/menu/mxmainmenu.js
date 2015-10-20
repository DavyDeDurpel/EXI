MXMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
MXMainMenu.prototype.init = MainMenu.prototype.init;
MXMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
MXMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
MXMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
MXMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
MXMainMenu.prototype.setText = MainMenu.prototype.setText;
MXMainMenu.prototype.getHomeItem = MainMenu.prototype.getHomeItem;
MXMainMenu.prototype.getHelpMenu = MainMenu.prototype.getHelpMenu;
MXMainMenu.prototype.getShipmentItem = MainMenu.prototype.getShipmentItem;


function MXMainMenu() {
	this.id = BUI.id();
	 MainMenu.call(this, {cssClass : 'mxMainMenu'});
}
MXMainMenu.prototype.getMenuItems = function() {
	return [
		this.getHomeItem(),
		this.getShipmentItem(),
        {
				text : this._convertToHTMLWhiteSpan("Data Explorer"),
				cls : 'ExiSAXSMenuToolBar',
				menu : this.getDataExplorerMenu() 
		},
		{
			text : this._convertToHTMLWhiteSpan("Offline Data Analysis"),
			cls : 'ExiSAXSMenuToolBar',
			menu : this.getOnlineDataAnalisysMenu() 
		}, 
		{
			text : this._convertToHTMLWhiteSpan("Help"),
			cls : 'ExiSAXSMenuToolBar',
			menu : this.getHelpMenu() 
		}, 
		'->',
		{
			xtype : 'textfield',
			name : 'field1',
			value : '1460800',
			emptyText : 'search by data collection Id',
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						location.hash = "/autoprocintegration/datacollection/" + field.getValue() + "/main";
					}
				} 
			} 
		}
	];
};



MXMainMenu.prototype.getOnlineDataAnalisysMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Dimple") {
			location.hash = "/tool/dimple/main";
		}
		if (item.text == "Job list") {
			location.hash = "/tool/list";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [
//		{
//		    text: 'Radio Options',
//		    menu: {        // <-- submenu by nested config object
//		        items: [
//		            // stick any markup in a menu
//		            '<b class="menu-title">Choose a Theme</b>',
//		            {
//		                text: 'Aero Glass',
//		                checked: true,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }, {
//		                text: 'Vista Black',
//		                checked: false,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }, {
//		                text: 'Gray Theme',
//		                checked: false,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }, {
//		                text: 'Default Theme',
//		                checked: false,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }
//		        ]
//		    }
//		},
		{
			text : 'Dimple',
			checked : false,
			group : 'theme',
			handler : onItemCheck },
			"-",
			{
				text : 'Job list',
				checked : false,
				group : 'theme',
				handler : onItemCheck }
		] });
};
 
MXMainMenu.prototype.getDataExplorerMenu = function() {
	function onItemCheck(item, checked) {
		if (item.text == "Sessions") {
			location.hash = "/session/nav";
		}
		if (item.text == "Experiments") {
			location.hash = "/experiment/nav";
		}
	}
	return Ext.create('Ext.menu.Menu', {
		items : [ 
			{
				text : 'Sessions',
				icon : '../images/icon/sessions.png',
				handler : onItemCheck 
			}
//			,
//			{
//				text : 'Experiments',
//				checked : false,
//				group : 'theme',
//				handler : onItemCheck 
//			} 
		] 
	});
};

