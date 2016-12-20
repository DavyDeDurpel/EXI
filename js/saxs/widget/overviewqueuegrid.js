
function OverviewQueueGrid(args) {
//	this.height = Ext.getBody().getHeight() - 500;
	QueueGrid.call(this,args);
    this.imgWidth = 100;

}

OverviewQueueGrid.prototype.getPercentage = QueueGrid.prototype.getPercentage;
OverviewQueueGrid.prototype.getImage = QueueGrid.prototype.getImage;
OverviewQueueGrid.prototype.parseDataById = QueueGrid.prototype.parseDataById;
OverviewQueueGrid.prototype.attachCallBackAfterRender = QueueGrid.prototype.attachCallBackAfterRender;

OverviewQueueGrid.prototype.parseData = function(data) {
	var templateData = {rows : [], id : this.id, height : this.maxHeight, imgWidth : this.imgWidth};
	if (!_.isEmpty(data)) {
		for (var i = 0 ; i < _.keys(data).length ; i++) {
			var dataCollectionId = _.keys(data)[i];
			var currentDataCollection = data[dataCollectionId];
			var rowData = {
							specimens 		: [],
							scattering 		: "",
							kratky 			: "",
							density 		: "",
							guinier 		: "",
							dataReduction 	: false,
							abinitio 		: false,
							fit 			: false,
							superposition 	: false,
							rigidBody 		: false,
						};
			for (var j = 0 ; j < currentDataCollection.length ; j++) {
				var specimen = currentDataCollection[j];
				var specimenData = {
										code				:	specimen.Measurement_code,
										average				:	this.getPercentage(specimen.Merge_framesMerge,specimen.Merge_framesCount),
										rg					:	"NA",
										points				:	"NA",
										I0					:	"NA",
										rgGnom				:	"NA",
										total				:	"NA",
										dmax				:	"NA",
										volumePorod			:	"NA",
										mmvolest			:	"NA",
										dataCollectionOrder : specimen.MeasurementToDataCollection_dataCollectionOrder
									};
				if (specimen.Macromolecule_macromoleculeId) {
					specimenData.hasMacromolecule = true;
					specimenData.acronym = specimen.Macromolecule_acronym;
					specimenData.expTemp = specimen.Run_exposureTemperature;
					specimenData.concentration = specimen.Specimen_concentration;
					if (specimen.Subtraction_rg != null) {
						specimenData.rg = Number(specimen.Subtraction_rg).toFixed(this.decimals);
						specimenData.points = specimen.Subtraction_firstPointUsed + " - " + specimen.Subtraction_lastPointUsed + " (" + (specimen.Subtraction_lastPointUsed - specimen.Subtraction_firstPointUsed) + ")";
					}
					if (specimen.Subtraction_I0 != null){
						specimenData.I0 = Number(specimen.Subtraction_I0).toFixed(this.decimals-2);
						specimenData.I0Stdev = Number(Number(specimen.Subtraction_I0Stdev).toFixed(this.decimals)).toExponential();
					}
					if (specimen.Subtraction_rgGnom != null) {
						specimenData.rgGnom = Number(specimen.Subtraction_rgGnom).toFixed(this.decimals);
					}	
					if (specimen.Subtraction_total != null) {
						specimenData.total = Number(specimen.Subtraction_total).toFixed(this.decimals);
					}
					if (specimen.Subtraction_dmax != null) {
						specimenData.dmax = Number(specimen.Subtraction_dmax).toFixed(this.decimals);
					}
					if (specimen.Subtraction_volumePorod != null) {
						specimenData.volumePorod = Number(specimen.Subtraction_volumePorod).toFixed(this.decimals);
						specimenData.mmvolest = Number(specimen.Subtraction_volumePorod / 2).toFixed(1) + " - "
												+ Number(specimen.Subtraction_volumePorod / 1.5).toFixed(1);
					}
					if (specimen.Run_creationDate) {
						rowData.dataReduction = true;
					}
					// if (specimen.abinitioCount != 0) {
                    //     rowData.abinitio = true;
                    // }
                    // if (specimen.fitCount != 0) {
                    //     rowData.fit = true;
                    // }
                    // if (specimen.superpositionCount != 0) {
                    //     rowData.superposition = true;
                    // }
                    // if (specimen.rigidbodyCount != 0) {
                    //     rowData.rigidBody = true;
                    // }
					rowData.scattering = this.getImage(specimen,"scattering");
					rowData.kratky = this.getImage(specimen,"kratky");
					rowData.density = this.getImage(specimen,"density");
					rowData.guinier = this.getImage(specimen,"guinier");
				} else {
					specimenData.hasMacromolecule = false;
				}
				rowData.specimens.push(specimenData);
			}
			templateData.rows.push(rowData);
		}
	}
	
	return templateData;
};

OverviewQueueGrid.prototype.load = function(experiment) {
	var _this = this;
	
	this.setLoading();
	_this.key = {};
	if (experiment.experimentId) {
		var onSuccess = function(sender, data){
			if (data != null && data.length > 0) {
				// _this.dataByDataCollectionId = _this.parseDataById(data);
				_this.render(data);
			} else {
				$('#' + _this.id).hide().html("<h4>No results found</h4>").fadeIn('fast');
			}
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperiment(experiment.experimentId);
	} else {
		_this.dataByDataCollectionId = _this.parseDataById(experiment);
		this.render(_this.dataByDataCollectionId);
	}
};

OverviewQueueGrid.prototype.render = function(data) {
	// var templateData = this.parseData(data);
	// for (var i = 0 ; i < data.length ; i++){
	// 	data[i].average = this.getPercentage(data[i].Merge_framesMerge,data[i].Merge_framesCount);
	// }
	var html = "";
	dust.render("overview.queue.grid.test.template", data, function(err, out) {                                                                                               
		html = html + out;
	});
	
	$('#' + this.id).hide().html(html).fadeIn('fast');

	this.attachCallBackAfterRender(document.getElementById("xx"));
}


OverviewQueueGrid.prototype.filter = function(key, value) {
	var filtered = _.filter(this.dataByDataCollectionId,function(o) {return o[0]["bufferAcronym"] == value});
	this.render(this.parseDataById([].concat.apply([], filtered)));
}

OverviewQueueGrid.prototype.setLoading = function(){
	$('#' + this.id).html("Loading...");
};

OverviewQueueGrid.prototype.getPanel = function(){
    var _this = this;

	return {
		html : '<div id="' + this.id + '"></div>',
		autoScroll : true,
        padding : this.padding
	}
};

OverviewQueueGrid.prototype.getHeader = function() {
	var html = "";
	dust.render("queue.grid.header.template", [], function(err, out) {                                                                       
		html = html + out;
	});
	return html;
};