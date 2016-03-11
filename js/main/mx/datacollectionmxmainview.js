function DataCollectionMxMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
	this.dataCollectionSummaryGrid = new DataCollectionSummaryGrid();
}

DataCollectionMxMainView.prototype.getPanel = MainView.prototype.getPanel;

DataCollectionMxMainView.prototype.getContainer = function() {
	this.panel =  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '10 30 10 10',
				cls : 'border-grid',
				items : [this.dataCollectionSummaryGrid.getPanel()]
		});
	
	



	return this.panel;
	
};
/*
DataCollectionMxMainView.prototype.load = function(sessionsId) {
	var _this = this;
	this.panel.setTitle("Data Collection ");
	var onSuccess = function(sender, data){
		_this.dataCollectionSummaryGrid.load(data);
		_this.dataCollectionSummaryGrid.grid.setTitle((data.length) + " Data Collections ");
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getBySessionsId(sessionsId);
};
*/
DataCollectionMxMainView.prototype.load = function(data) {
	var _this = this;
	this.panel.setTitle("Data Collection ");
	if (data.length>0){
		_this.dataCollectionSummaryGrid.load(data);
	}
	else{
		BUI.showError("No data collections");
	}
	
};













