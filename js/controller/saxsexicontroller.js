function SAXSExiController() {
	this.init();
};

SAXSExiController.prototype.routeNavigation = function() {
	
	
	function loadNavigationPanel(listView) {
		/** Cleaning up navigation panel * */
		EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);
		
		var onSuccess = (function(sender, data) {
			/** Load panel * */
			EXI.addNavigationPanel(listView);
			/** Load data * */
			listView.load(data);
			EXI.setLoadingNavigationPanel(false);
		});
		
		/** Handle error * */
		var onError = (function(sender, data) {
			EXI.setLoadingNavigationPanel(false);
		});
		
		/** Load data data * */
		return EXI.getDataAdapter({ onSuccess : onSuccess, onError : onError });

	}

	/**
	 * Loading navigation panel
	 * 
	 * #/session/nav #/experiment/nav #/macromolecule/nav
	 * 
	 */
	Path.map("#/:navigation/nav").to(function() {
		/** Session navigation * */
		if (this.params['navigation'] == "session") {
			var listView = new SessionListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/session/nav/" + selected[0].sessionId + "/session";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.proposal.session.getSessions();
		}
		
		if (this.params['navigation'] == "buffer") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			var listView = new BufferListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/buffer/" + selected[0].bufferId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getBuffers());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new BufferWelcomeMainView());
			
		}
		
		
		if (this.params['navigation'] == "addresses") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			var listView = new AddressListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/address/" + selected[0].labContactId + "/main";
			});
			
			EXI.addNavigationPanel(listView);
			
			var adapter = loadNavigationPanel(listView);
			adapter.proposal.shipping.getLabContacts();
			
			/** Loading welcome page **/
			EXI.addMainPanel(new AddressWelcomeMainView());
			
		}
		
		
		
		if (this.params['navigation'] == "stocksolution") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			var listView = new StockSolutionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/stocksolution/" + selected[0].stockSolutionId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getStockSolutions());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new StockSolutionWelcomeMainView());
			
		}
		

		if (this.params['navigation'] == "macromolecule") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			var listView = new MacromoleculeListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/macromolecule/" + selected[0].macromoleculeId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getMacromolecules());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new MacromoleculeWelcomeMainView());
			
		}
		

		if (this.params['navigation'] == "shipping") {
			var listView = new ShippingListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/shipping/" + selected[0].shippingId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.proposal.shipping.getShippings();
			
			/** Loading welcome page **/
			EXI.addMainPanel(new ShippingWelcomeMainView());
			
		}

		if (this.params['navigation'] == "template") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			
			var listView = new TemplateListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.saxs.experiment.getByExperimentByKey("experimentType", "TEMPLATE");
			
			/** Loading welcome page **/
			EXI.addMainPanel(new ExperimentWelcomeMainView());
		}


	}).enter(this.setPageBackground);

	/** Loading a single session on the navigation panel * */
	Path.map("#/session/nav/:sessionId/session").to(function() {
		var listView = new ExperimentListView();
		
		/** When selected move to hash * */
		listView.onSelect.attach(function(sender, selected) {
			if (selected[0].experimentType == "HPLC"){
				location.hash = "/experiment/hplc/" + selected[0].experimentId + "/main";
			}
			if ((selected[0].experimentType == "STATIC")||(selected[0].experimentType == "CALIBRATION")){
				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
			}
			if (selected[0].experimentType == "TEMPLATE"){
				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
			}
		});
		loadNavigationPanel(listView).saxs.experiment.getExperimentsBySessionId(this.params['sessionId']);

	}).enter(this.setPageBackground);
};

SAXSExiController.prototype.setPageBackground = function() {

};

SAXSExiController.prototype.notFound = function() {

};

SAXSExiController.prototype.routeExperiment = function() {
	Path.map("#/experiment/experimentId/:experimentId/main").to(function() {
		var mainView = new ExperimentMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['experimentId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);
	
	Path.map("#/experiment/hplc/:experimentId/main").to(function() {
		var mainView = new HPLCMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['experimentId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);
	

	/** Loading Experiments * */
	Path.map("#/experiment/:key/:value/main").to(function() {
		EXI.setLoadingMainPanel();
		var onSuccess = (function(sender, data) {
			EXI.setLoadingMainPanel(false);
			if (data != null) {
				if (data.length > 0) {
					var mainView = null;
					if (data[0].experimentType == "STATIC") {
						mainView = new ExperimentMainView();

					}
					if (data[0].experimentType == "HPLC") {
						mainView = new HPLCMainView();
					}

					if (data[0].experimentType == "TEMPLATE") {
						mainView = new TemplateMainView();
					}

					EXI.addMainPanel(mainView);
					mainView.load(data);
					/** Selecting data collections from experiment * */
					mainView.onSelect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.append(element);
					});
					mainView.onDeselect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.remove(element);
					});

				}
			}
		});
		if ((this.params['key'] == "experimentId") || (this.params['key'] == "templateId")) {
			EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getByExperimentId([ this.params['value'] ]);
		} else {
			EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getByExperimentByKey(this.params['key'], this.params['value']);
		}

	}).enter(this.setPageBackground);
};





SAXSExiController.prototype.routeDataCollection = function() {
	Path.map("#/datacollection/macromoleculeAcronym/:value/main").to(function() {
		/** Loading navidation menu **/
		EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);
		EXI.setLoadingMainPanel();
		var onSuccess = (function(sender, dataCollections) {
			if (dataCollections != null){
				if (dataCollections.length > 0){
					var mainView = new DataCollectionMainView();
					EXI.addMainPanel(mainView);
					mainView.load(dataCollections);
					EXI.setLoadingMainPanel(false);
					/** Selecting data collections from experiment * */
					mainView.onSelect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.append(element);
					});
					mainView.onDeselect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.remove(element);
					});
					
					var listView = new DataCollectionListView();
					listView.onSelect.attach(function(sender, selected) {
						mainView.filter( selected[0].macromoleculeId, selected[0].bufferAcronym);
					});
					EXI.addNavigationPanel(listView);
					listView.load(dataCollections);
					EXI.setLoadingNavigationPanel(false);
				}
				else{
					BUI.showWarning("No macromolecule has been found");
				}
			}
			else{
				BUI.showWarning("No data to display");
			}
		});
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);

	}).enter(this.setPageBackground);
	
	Path.map("#/datacollection/:key/:value/main").to(function() {
		EXI.setLoadingMainPanel();
		var onSuccess = (function(sender, data) {
			var mainView = new DataCollectionMainView();
			EXI.addMainPanel(mainView);
			mainView.load(data);
			EXI.setLoadingMainPanel(false);
			/** Selecting data collections from experiment * */
			mainView.onSelect.attach(function(sender, element) {
				EXI.localExtorage.selectedSubtractionsManager.append(element);
			});
			mainView.onDeselect.attach(function(sender, element) {
				EXI.localExtorage.selectedSubtractionsManager.remove(element);
			});
		});
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);

	Path.map("#/datacollection/:key/:value/primaryviewer").to(function() {
		var onSuccess = (function(sender, data) {
			var primaryMainView = new PrimaryDataMainView();
			EXI.addMainPanel(primaryMainView);
			primaryMainView.load(data);

		});
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);
	
	Path.map("#/datacollection/:key/:value/merge").to(function() {
		var onSuccess = (function(sender, data) {
			var primaryMainView = new MergeMainView();
			EXI.addMainPanel(primaryMainView);
			primaryMainView.load(data);

		});
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);
};



SAXSExiController.prototype.routePrepare = function() {
	Path.map("#/buffer/:bufferId/main").to(function() {
		var mainView = new BufferMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['bufferId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/buffer/add").to(function() {
		var mainView = new BufferMainView();
		EXI.addMainPanel(mainView);
	}).enter(this.setPageBackground);
	
	Path.map("#/macromolecule/:macromoleculeId/main").to(function() {
		var mainView = new MacromoleculeMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['macromoleculeId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/macromolecule/add").to(function() {
		var mainView = new MacromoleculeMainView();
		EXI.addMainPanel(mainView);
	}).enter(this.setPageBackground);
	
	Path.map("#/stocksolution/:stocksolutionId/main").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['stocksolutionId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/stocksolution/add").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	Path.map("#/shipping/:shippingId/main").to(function() {
		var mainView = new ShippingMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['shippingId']);
	}).enter(this.setPageBackground);

	
	Path.map("#/address/:lacontactId/main").to(function() {
		var mainView = new AddressMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['lacontactId']);
	}).enter(this.setPageBackground);

	
	
	
	
	Path.map("#/prepare/stocksolution/main").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	

//	Path.map("#/prepare/macromolecule/main").to(function() {
//		var mainView = new MacromoleculeMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(this.setPageBackground);

	Path.map("#/prepare/templates/main").to(function() {
		var mainView = new ExperimentDesignerMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	Path.map("#/prepare/shipmentpreparation").to(function() {
		var mainView = new ShipmentPreparationMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	
	
	Path.map("#/prepare/shipment").to(function() {
		var _this = this;
		var shipmentForm = new ShipmentForm({
			creationMode : true,
			showTitle : false
		});
		shipmentForm.onSaved.attach(function(sender, shipment) {
			location.hash = "/shipping/" + shipment.shippingId + "/main";
			window.close();
		});
		var window = Ext.create('Ext.window.Window', {
			title : 'New Shipment',
			height : 600,
			width : 800,
			modal : true,
			layout : 'fit',
			items : [ shipmentForm.getPanel() ]
		}).show();
	}).enter(this.setPageBackground);
	

	Path.map("#/prepare/designer").to(function() {
			var mainView = new DesignerMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
//			function() {
//				var wizardWidget = new WizardWidget({
//					windowMode : true,
//					width : 1200 });
//
//				wizardWidget.onFinished.attach(function(sender, result) {
//					wizardWidget.window.close();
//					EXI.setLoading();
//					var onSuccess = (function(sender, experiment) {
//						location.hash = "/experiment/templateId/" + experiment.experimentId + "/main";
//					});
//					wizardWidget.current.setLoading("ISPyB: Creating experiment");
//					EXI.getDataAdapter({onSuccess : onSuccess}).saxs.template.saveTemplate(result.name, result.comments, result.data);
//				});
//
//				wizardWidget.draw(this.targetId, new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()));

			}).enter(this.setPageBackground);
};

SAXSExiController.prototype.init = function() {
	var _this = this;

	function setPageBackground() {
		_this.setPageBackground();
	}
	function notFound() {
		_this.notFound();
	}

	this.routeNavigation();
	this.routeExperiment();
	this.routeDataCollection();
	this.routePrepare();

	

	Path.map("#/project/:projectId/run/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];

		var onSuccess = (function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new RunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		});
		
		var onError = (function(sender, runs) {
			
		});
		
		EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getRuns(projectId);
//		exidataAdapter.getRuns(projectId);
	}).enter(this.setPageBackground);
	

	Path.rescue(notFound);

};
