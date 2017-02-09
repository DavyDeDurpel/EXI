function CommentEditForm(args) {
    this.id = BUI.id();

    this.dataCollectionId = null;
    this.templateData = {id : this.id};
}

CommentEditForm.prototype.show = function(){
    var _this = this;
    
    var html = "";
    dust.render("comment.edit.form.template", this.templateData, function(err,out){
        html = out;
    });

    $("body").append(html);
    
    $("#" + this.id + "-modal").modal();
};

CommentEditForm.prototype.load = function (dataCollectionId, comments) {
    this.dataCollectionId = dataCollectionId;
    this.templateData.comments = comments;
}