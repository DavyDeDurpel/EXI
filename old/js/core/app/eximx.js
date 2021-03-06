function ExiMX() {
	 Exi.call(this, {
		 					menu: new MXMainMenu(),
		 					anonymousMenu: new MainMenu(),
		 					controllers : [
									
									new SessionController(), 
									new SAXSExiController(), 
									new OfflineExiController(), 
									new ProposalExiController(), 
									new LabContactExiController(),
									new PuckController(),
									new CrystalController(),
									new ProteinController(),
									new AutoprocIntegrationController(),
									new MxDataCollectionController(),
									new WorkflowController(),
									new MxPrepare(),
									new ImageController(),
                                    new PhasingController(),
                                    new XfeController(),
                                    new BeamlineParameterController()
							],
		 					headerCssClass : 'mxTitlePanel'

	 });
}

ExiMX.prototype.loadSelected = Exi.prototype.loadSelected;
ExiMX.prototype.addMainPanel = Exi.prototype.addMainPanel;
ExiMX.prototype.getSelectedDataCollections = Exi.prototype.getSelectedDataCollections;
ExiMX.prototype.addNavigationPanel = Exi.prototype.addNavigationPanel;
ExiMX.prototype.clearNavigationPanel = Exi.prototype.clearNavigationPanel;
ExiMX.prototype.clearMainPanel = Exi.prototype.clearMainPanel;
ExiMX.prototype.setLoadingNavigationPanel = Exi.prototype.setLoadingNavigationPanel;
ExiMX.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiMX.prototype.setError = Exi.prototype.setError;
ExiMX.prototype.setLoading = Exi.prototype.setLoading;
ExiMX.prototype.show = Exi.prototype.show;
ExiMX.prototype.setAnonymousMenu = Exi.prototype.setAnonymousMenu;
ExiMX.prototype.setUserMenu = Exi.prototype.setUserMenu;
ExiMX.prototype.appendDataAdapterParameters = Exi.prototype.appendDataAdapterParameters;
ExiMX.prototype.hideNavigationPanel = Exi.prototype.hideNavigationPanel;
ExiMX.prototype.showNavigationPanel = Exi.prototype.showNavigationPanel;
 


ExiMX.prototype.getHeader = function(){
    var html = "";
    var data = {
        version         : ExtISPyB.version,
        release_date    : ExtISPyB.release_date
       
        
    };
    dust.render("mxheader", data, function(err, out){
		html = out;
     });
    return html;
	
};

ExiMX.prototype.getDataAdapter = function(args){
	return  new MxDataAdapterFactory(this.appendDataAdapterParameters(args));
};

