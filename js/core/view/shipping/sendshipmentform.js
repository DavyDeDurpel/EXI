function SendShipmentForm(args) {
    this.id = BUI.id();
}

SendShipmentForm.prototype.show = function(){
    var _this = this;
    
    var html = "";
    dust.render("send.shipment.form.template", {id : this.id, shipment : this.shipment}, function(err,out){
        html = out;
    });

    $("body").append(html);
    
    $("#" + this.id + "-modal").modal();
    

    $("#" + this.id + "-save").unbind('click').click(function(sender){
        _this.save();
    });

    $("#" + this.id + "-date").datetimepicker({
        format: "DD-MM-YYYY"
    });

};

SendShipmentForm.prototype.load = function (shipment) {
    this.shipment = shipment;
}

SendShipmentForm.prototype.save = function(){
    var trackingNumber = $("#" + this.id + "-tracking-number").val()
    var date = moment($("#" + this.id + "-date").val(),"DD-MM-YYYY")
    debugger
}