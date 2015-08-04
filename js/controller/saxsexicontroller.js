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
			listView.store.loadData(data);
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

		if (this.params['navigation'] == "shipping") {
			var listView = new ShippingListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/shipping/" + selected[0].shippingId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.proposal.shipping.getShippings();
		}

		if (this.params['navigation'] == "experiment") {
			var listView = new ExperimentListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.saxs.experiment.getExperiments();
		}

		if (this.params['navigation'] == "template") {
			var listView = new TemplateListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.saxs.experiment.getByExperimentByKey("experimentType", "TEMPLATE");
		}

		if (this.params['navigation'] == "macromolecule") {
			alert("not implemented yet");
		}

	}).enter(this.setPageBackground);

	/** Loading a single session on the navigation panel * */
	Path.map("#/session/nav/:sessionId/session").to(function() {
		var listView = new ExperimentListView();
		/** When selected move to hash * */
		listView.onSelect.attach(function(sender, selected) {
			location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
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


SAXSExiController.prototype.routeTool = function() {
	Path.map("#/tool/crysol/main").to(function() {
		var mainView = new CrysolMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/tool/subtraction/main").to(function() {
		var mainView = new SubtractionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
};


SAXSExiController.prototype.routeDataCollection = function() {
	Path.map("#/datacollection/:key/:value/main").to(function() {
		EXI.setLoadingMainPanel();
		var adapter = EXI.getDataAdapter();
		adapter.onSuccess.attach(function(sender, data) {
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
		adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);

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


SAXSExiController.prototype.routeTool = function() {
	Path.map("#/tool/crysol/main").to(function() {
		var mainView = new CrysolMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/tool/subtraction/main").to(function() {
		var mainView = new SubtractionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
};

SAXSExiController.prototype.routePrepare = function() {
	Path.map("#/prepare/designer/main").to(function() {
		var mainView = new ExperimentDesignerMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/prepare/buffer/main").to(function() {
		var mainView = new BufferMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/shipping/:shippingId/main").to(function() {
		var mainView = new ShippingMainView();
		var shippindId = this.params['shippingId'];
		EXI.addMainPanel(mainView);
		mainView.load(shippindId);
	}).enter(this.setPageBackground);

	Path.map("#/prepare/stocksolution/main").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/prepare/macromolecule/main").to(function() {
		var mainView = new MacromoleculeMainView();
		EXI.addMainPanel(mainView);
		debugger
		mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/prepare/templates/main").to(function() {
		var mainView = new ExperimentDesignerMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/prepare/designer").to(
			function() {
				var wizardWidget = new WizardWidget({
					windowMode : true,
					width : 1200 });

				wizardWidget.onFinished.attach(function(sender, result) {
					wizardWidget.window.close();
					EXI.setLoading();
					var onSuccess = (function(sender, experiment) {
						location.hash = "/experiment/experimentId/" + experiment.experimentId + "/main";
					});
					wizardWidget.current.setLoading("ISPyB: Creating experiment");
					EXI.getDataAdapter({onSuccess : onSuccess}).saxs.template.saveTemplate(result.name, result.comments, result.data);
				});

//				var manager = new ProposalUpdater();
//				manager.onSuccess.attach(function(sender, proposals) {
				wizardWidget.draw(this.targetId, new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()));
//				});
//				manager.get();

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
	this.routeTool();
	this.routeDataCollection();
	this.routePrepare();

	

	Path.map("#/project/:projectId/run/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];
		var exidataAdapter = EXI.getDataAdapter();
		exidataAdapter.onSuccess.attach(function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new RunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		});
		exidataAdapter.getRuns(projectId);
	}).enter(this.setPageBackground);

	

	Path.map("#/welcome/:user/main").to(function() {
		var user = this.params['shippingId'];
		var mainView = new WelcomeMainView();
		EXI.addMainPanel(mainView);
		mainView.load(user);
	}).enter(this.setPageBackground);

	Path.rescue(notFound);

};
