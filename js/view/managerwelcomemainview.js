
/**
* Class for the manager landing page. It inherits from MainView
*
* @class ManagerWelcomeMainView
* @constructor
*/
function ManagerWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;

}


ManagerWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;


/**
* This sets an active proposal into the credential Manager. It also retrieve all the information about the proposal: shipments, macromolecules, crystals, buffers, etc.. and store 
* them in a local storage
*
* @method activeProposal
* @param {Object} proposal Proposal object that should container at least: [code, number]
*/
ManagerWelcomeMainView.prototype.activeProposal = function(proposalCode, proposalNumber) {
    
    EXI.mainStatusBar.showBusy("Loading proposal " + proposalCode +  proposalNumber); 
    
	EXI.credentialManager.setActiveProposal(this.username, proposalCode + proposalNumber);
    EXI.proposalManager.clear();
	/** I don't need this to be synchronous **/	
    EXI.proposalManager.onActiveProposalChanged = new Event();
    EXI.proposalManager.onActiveProposalChanged.attach(function(){
        EXI.mainStatusBar.showReady();
        console.log(EXI.proposalManager.get());
    });
	EXI.proposalManager.get();
};


ManagerWelcomeMainView.prototype.getContainer = function() {
	this.container = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
        margin : 20,
        cls : 'border-grid',
        tbar : this.getToolbar(),
            items :[
        ]
	});
	return this.container;
};

/**
* It receives a list of proposals and display them in the main container
*
* @param {Object} proposals Arrays of Proposal objects
* @method displayProposals
*/
ManagerWelcomeMainView.prototype.displayProposals = function(proposals) {
    var _this = this;
    this.container.removeAll();
    var proposalGrid = new ProposalGrid({
                                            width: 900,
                                            height:600,
                                            margin : '10 10 10 10'

                                    });
    proposalGrid.onSelected.attach(function(sender, proposal){
            _this.panel.setLoading(true);
            var proposalCode = proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber;
            function onSuccess(sender, sessions){
                _this.displaySessions(sessions, sessions.length + " sessions for proposal " + proposalCode);
                _this.panel.setLoading(false);
            }
            EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposal(proposalCode);
                            
            /** Loading Proposal info */                 
            _this.activeProposal( proposal.Proposal_proposalCode, proposal.Proposal_proposalNumber);
        
    });
    
    this.container.insert(proposalGrid.getPanel());
    proposalGrid.load(proposals);
};

/**
* Retrieves a list of sessions based on a start date and end date and loads them on the session grid
*
* @param {String} start Date should be in the format of YYYYMMDD
* @param {String} end Date should be in the format of YYYYMMDD
* @method loadByDate
*/
ManagerWelcomeMainView.prototype.loadByDate = function(start, end) {
          var _this = this;
          this.panel.setLoading(true);
          function onSuccess(sender, data){
              
        	  _this.displaySessions(data, data.length + " sessions scheduled on " + moment(start, 'YYYYMMDD').format('MMMM Do YYYY'));
        	  _this.panel.setLoading(false);
          }
          /** Increasing one day */
          end = moment(end, "YYYYMMDD").add(1, 'days').format("YYYYMMDD");
		  EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(start, end);
};

ManagerWelcomeMainView.prototype.displaySessions = function(sessions, title) {
	var _this = this;
	 this.container.removeAll();
	 var sessionGrid = new SessionGrid({
						 width: 900,
						 height:600,
						 margin : '10 10 10 10'
    	 });
	 this.container.insert(sessionGrid.getPanel());
	 
	  /** Handling onSelected **/
     sessionGrid.onSelected.attach(function(sender, args){
         EXI.proposalManager.clear();
         _this.activeProposal(args.proposalCode, args.proposalNumber);
     });
	 sessionGrid.load(sessions);
	 sessionGrid.panel.setTitle(title);
};

ManagerWelcomeMainView.prototype.getToolbar = function() {
   var _this = this;
   var dateMenu = Ext.create('Ext.menu.DatePicker', {
        handler: function(dp, date){
            location.href = "#/welcome/manager/" + _this.username +"/date/"+ Ext.Date.format(date, 'Ymd') +"/" + Ext.Date.format(date, 'Ymd') +"/main";
          //_this.loadByDate(Ext.Date.format(date, 'Ymd'), Ext.Date.format(date, 'Ymd'));
        }
    });

    return Ext.create('Ext.toolbar.Toolbar', {
        width   : 500,
        cls 	: 'exi-top-bar',
        items: [
            {
               text: 'Choose a Date',
               icon : '../images/icon/sessions.png',
               menu: dateMenu 
            },
            {
                xtype    : 'textfield',
                name     : 'field1',
                width    : 300,
                emptyText: 'enter search term (proposal or title)',
    			listeners : {
    				specialkey : function(field, e) {
    					if (e.getKey() == e.ENTER) {
    						var found = _this.searchProposalByTerm(field.getValue());
    						_this.displayProposals(found);
    					}
    				} 
    			} 
            }
        ]
    });
};

ManagerWelcomeMainView.prototype.searchProposalByTerm = function(term) {
	var result = [];
	if (this.proposals != null){
		for (var i = 0; i < this.proposals.length; i++) {
			var proposalId = this.proposals[i]["Proposal_proposalCode"] +  this.proposals[i]["Proposal_proposalNumber"];
			var title = this.proposals[i]["Proposal_title"];
			if (title == null){
				title = "";
			}
			if ((proposalId.toUpperCase().match(term.toUpperCase())) ||(title.toUpperCase().match(term.toUpperCase()))){
				result.push(this.proposals[i]);
			}
		}
	}
	return result;
};

/**
* Retrieves all proposas on ISPyB and stores them on this.proposal 
* It is useful for fast search later on
*
* @method loadProposals
*/
ManagerWelcomeMainView.prototype.loadProposals = function(callback) {
	var _this = this;
	var onSuccess = function(sender, proposals){
		_this.proposals = proposals;
        if (callback){            
            callback();
        }
	};	
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

ManagerWelcomeMainView.prototype.isUser = function(username) {
       return (!EXI.credentialManager.getCredentialByUserName(username).isManager() && (!EXI.credentialManager.getCredentialByUserName(username).isLocalContact()));
};

ManagerWelcomeMainView.prototype.load = function(username) {      
  var today = moment().format("YYYYMMDD");
  this.username = username;  
  if (this.isUser(this.username)){
      this.loadSessionsByProposal(this.username);
  }
  else{
      this.loadSessionsByDate(username, today, today);    
  }
};

/**
* Retrieves all sessions for the proposal
*
* @method loadSessions
*/
ManagerWelcomeMainView.prototype.loadSessionsByProposal = function(username) {
    var _this = this;
    this.panel.setLoading(true);
    function onSuccess(sender, data){
        var realLength = data.length;
        data = _.slice(data, 0, 500);
        // Sorting by start date because sessionId does not sort by date
        _(data).forEach(function(value) {
                value['ms'] = moment(value.BLSession_startDate, 'MMM DD, YYYY h:mm:ss a').format('x');
        });
        data = _.orderBy(data, ['ms'], ['desc']);
        if (data.length == realLength){
            _this.displaySessions(data, data.length + " sessions");
        }
        else{
            _this.displaySessions(data, data.length + " sessions (omitting " + (realLength - data.length) + " old sessions)");
        }
        _this.panel.setLoading(false);
    }
    EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposal(username);
};


ManagerWelcomeMainView.prototype.loadSessionsByDate = function(username, start, end) {
  this.username = username;
  this.loadByDate(start, end);  
   /** This is need for quick searchs on proposals **/
  this.loadProposals(); 
};

ManagerWelcomeMainView.prototype.loadSessionsByTerm = function(username, term) {
  this.username = username;     
  /** This is need for quick searchs on proposals **/
  var _this = this;
  var onSuccess = function(sender, proposals){
		_this.proposals = proposals;
       _this.searchProposalByTerm(term);
  };
  EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};
