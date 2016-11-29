<div class="container-fluid containerWithScroll">
 
      
      <div class="col-xs-6 col-md-6"> 
     
<table class='table-sm table'>   
     <thead>   
                <tr> 
                    <th>Phasing</th>
                    <th><abbr title="Prepare Step">PREPARE</abbr></th>
                    <th><abbr title="Substructure Determination Step">SUBSTRUCTURE</abbr></th>
                    <th><abbr title="Phasing Step">PHASING</abbr></th>
                    <th><abbr title="Model Building Step">MODEL</abbr></th>
                    <th>Download</th>
                    <th style='color:gray'>Program</th>
                    <th style='color:gray'>Method</th>
                    <th style='color:gray'>Resolution</th>
                    <th style='color:gray'>Solvent</th>
                    
                    
                    <th style='color:gray'>Chain Count</th>
                    <th style='color:gray'>Residues Count</th>
                    <th style='color:gray'>Average Fragment Length</th>
                    <th style='color:gray'>CC of partial model</th>
                    <th style='color:gray'>CSV</th>
                    <th style='color:gray'>PDB</th>
                    <th style='color:gray'>MAP</th>
                     <th style='color:gray'>UglyMol</th>
                   
                </tr>
    </thead>    
       <tbody>               
        {#.}		              
                  <tr>                              
                    <td><a href='#/phasing/autoprocintegrationId/{.autoProcIntegrationId}/main'>{.spaceGroup}</a></td>
                    <td>
                        {@eq key=prepare type="boolean" value="true"}
                            <span style='color:green;' class="glyphicon glyphicon-ok"></span>
                        {:else}
                            <span style='color:red;' class="glyphicon glyphicon-remove"></span>
                        {/eq}
                    </td>
                    <td>
                        {@eq key=sub type="boolean" value="true"}
                            <span style='color:green;' class="glyphicon glyphicon-ok"></span>
                        {:else}
                            <span style='color:red;' class="glyphicon glyphicon-remove"></span>
                        {/eq}
                    </td>
                     <td>
                        {@eq key=phasing type="boolean" value="true"}
                            <span style='color:green;' class="glyphicon glyphicon-ok"></span>
                        {:else}
                            <span style='color:red;' class="glyphicon glyphicon-remove"></span>
                        {/eq}
                    </td>
                      <td> 
                        {@eq key=model type="boolean" value="true"}                           
                            <span style='color:green;' class="glyphicon glyphicon-ok"></span>                          
                        {:else}
                            <span style='color:red;' class="glyphicon glyphicon-remove"></span>
                        {/eq}
                    </td>
                     <td >
                        
                        <a href='{.downloadFilesUrl}' ><span style='font-size: 1.5em;' class="glyphicon glyphicon-download " ></span></a>                       
                                           
                     </td> 
                     <td>{#metrics}{.PhasingProgramRun_phasingPrograms}<br />{/metrics} </td>
                     <td>{#metrics}{.PhasingStep_method}<br />{/metrics} </td>
                     <td>{#metrics}{.PhasingStep_highRes} - {.PhasingStep_lowRes}<br />{/metrics} </td>
                     <td>{#metrics}{.PhasingStep_solventContent}<br />{/metrics} </td>
                     
                     
                     <td>{#metrics}{.Chain_Count}<br />{/metrics} </td>
                     <td>{#metrics}{.Residues_Count}<br />{/metrics} </td>
                     <td>{#metrics}{@decimal key="Average_Fragment_Length" decimals=2}{/decimal} <br /> {/metrics} </td>
                     <td>{#metrics}{@decimal key="CC_of_partial_model" decimals=2}{/decimal} <br /> {/metrics}</td>
                     <td><a href='{.downloadCSV}' ><span style='font-size: 1.5em;' class="glyphicon glyphicon-download " ></span></a> </td>
                     <td>{#metrics}<a>{.pdb}</a><br />{/metrics} </td>
                     <td>{#metrics}<a>{.map}</a><br />{/metrics} </td>
                     
                     <td>{#metrics}<a><a href='{.uglymol}' ><span style='font-size: 1em;' class="glyphicon glyphicon-eye-open"  ></span></a><br />{/metrics} </td>
                </tr>
        {/.}
      </tbody>
</table>
   

  


        
      </div>
      
   </div>  
</div>