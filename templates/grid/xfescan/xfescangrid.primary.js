

<div class="container-fluid">
    <div class="panel with-nav-tabs panel-default">
        <div class="panel-heading clearfix">
            <div class="pull-left">
                <h1 class="panel-title" style='color:#337ab7;'>
                <span style='font-size:12px;'>   {.startTime}</span>
            </h1>
            </div>
            <div class="pull-right">
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#datacollection_{DataCollection_dataCollectionId}">Summary </a>
                    </li>

                </ul>
            </div>
        </div>
        <br />
        <div class="tab-content">
            <div id="datacollection_{DataCollection_dataCollectionId}" class="tab-pane fade in active">
                <div class="container-fluid">
                    <div class="row">
                      
                        <div class="col-xs-6 col-md-6">
                            <table class="table table-condensed">

                                <tr>      
                                    <td >Start Time</td>
                                    <td >{.startTime}</td>        
                                </tr>
                                
                                
                                <tr>
                                    <td >Filename</td>
                                    <td >{.filename}</td>
                                </tr>
                                
                                
                                <tr>
                                    <td >Fluorescence Detector</td>
                                    <td >To be added to DB</td>
                                </tr>
                                <tr>
                                    <td >Energy</td>
                                    <td > {.energy} kev</td>

                                </tr>
                                
                                <tr>
                                    <td >Flux @100%</td>
                                    <td >{.flux} ph/s</td>    
                                </tr>
                                
                                <tr>      
                                    <td >Transmission</td>
                                    <td >{.beamTransmission}%</td>
                                </tr>
                                
                                <tr>       
                                    <td style='width:150px;' >Beam Size Hor</td>
                                    <td >{.beamSizeHorizontal} micrometer</td>
                                </tr>
                                                               
                                <tr>                            
                                    <td >Beam Size Vert</td>
                                    <td >{.beamSizeVertical} micrometer</td>
                                </tr>

                                <tr>                                
                                    <td >Exposure Time</td>
                                    <td >{.exposureTime} s</td>                                    
                                </tr>
                                 <tr>                                
                                    <td >Directory</td>
                                    <td >{.workingDirectory}</td>                                    
                                </tr>
                            </table>
                            
                    </div>
                    <div class="col-xs-2 col-md-2">
                             <div id='{.containerId}'></div>
                             <br />
                             <a href='#/mx/xfe/{.xfeFluorescenceSpectrumId}/main' type="button" class="btn btn-default">Open</a>
                    </div>        
                </div>
            </div>



        </div>
        
    </div>
</div>
 
