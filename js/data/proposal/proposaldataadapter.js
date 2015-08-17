ProposalDataAdapter.prototype.get = DataAdapter.prototype.get;
ProposalDataAdapter.prototype.post = DataAdapter.prototype.post;
ProposalDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;

function ProposalDataAdapter(args){
	DataAdapter.call(this, args);
}

ProposalDataAdapter.prototype.getProposals= function(){
	this.get('/{token}/proposal/list');
};


ProposalDataAdapter.prototype.getProposalsInfo= function(){
	this.get('/{token}/proposal/{proposal}/technique/saxs/get');
};

ProposalDataAdapter.prototype.update= function(){
	if (EXI != null){
		if (EXI.proposalManager != null){
			this.onSuccess.attach(function(sender, proposals){
				localStorage.setItem("proposals", JSON.stringify(proposals));
			});
			/** This makes that this attach will be executed in first position **/
			this.onSuccess._listeners.reverse();
		}
	}
	this.getProposalsInfo();
};