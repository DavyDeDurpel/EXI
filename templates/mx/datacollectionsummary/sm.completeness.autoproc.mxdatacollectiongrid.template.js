



<table class='table-sm table table-striped'>
    <thead>   
    <tr>
        <th  style='padding:0 15px 0 15px;'>{.spaceGroup}</th>
        <th style='padding:0 15px 0 15px;'>Completeness</th>
        <th style='padding:0 15px 0 15px;'>Res.</th>
        <th style='padding:0 15px 0 15px;'>Rmerge</th>                    
    </tr>
    </thead>
    <tbody>

    <tr>
        <td  style='padding:0 15px 0 15px;'>Inner</td>
        <td  style='padding:0 15px 0 15px;'>
                {@gt key=innerShell.completeness value=20}
                    {@gt key=innerShell.completeness value=70}
                        <div  style="background-repeat: repeat-x;border:1px solid gray;color:#fff;background-image:linear-gradient(to bottom,#337ab7 0,#286090 100%);width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                    {:else}
                        <div  style="background-repeat: repeat-x;border:1px solid #f0ad4e;color:#fff;background-color:#f0ad4e;width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                    {/gt}
                {/gt}
                {@lte key=innerShell.completeness value=20}
                    <div  style="background-repeat: repeat-x;border:1px solid #d9534f;color:#fff;background-color:#d9534f;width:{.innerShell.completeness}%">{.innerShell.completeness}%</div>
                
                {/lte}
        </td>
        <td style='padding:0 15px 0 15px;'>{.innerShell.resolutionsLimitHigh}</td>
        <td style='padding:0 15px 0 15px;'>{.innerShell.rMerge}</td>
    </tr>

    <tr>
        <td  style='padding:0 15px 0 15px;'>Outer</td>
        <td  style='padding:0 15px 0 15px;'>
            {@gt key=outerShell.completeness value=20}
                {@gt key=outerShell.completeness value=70}
                    <div  style="background-repeat: repeat-x;border:1px solid gray;color:#fff;background-image:linear-gradient(to bottom,#337ab7 0,#286090 100%);width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
                {:else}
                    <div  style="background-repeat: repeat-x;border:1px solid #f0ad4e;color:#fff;background-color:#f0ad4e;width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
                {/gt}
            {/gt}
            {@lte key=outerShell.completeness value=20}
                <div  style="background-repeat: repeat-x;border:1px solid #d9534f;color:#fff;background-color:#d9534f;width:{.outerShell.completeness}%">{.outerShell.completeness}%</div>
            
            {/lte}
        </td>
        <td style='padding:0 15px 0 15px;'>{.outerShell.resolutionsLimitHigh}</td>
        <td style='padding:0 15px 0 15px;'>{.outerShell.rMerge}</td>
    </tr>
    
        <tr>
        <td  style='padding:0 15px 0 15px;'>Overall</td>
        <td  style='padding:0 15px 0 15px;'>
            {@gt key=overall.completeness value=20}
                {@gt key=overall.completeness value=70}
                    <div  style="background-repeat: repeat-x;border:1px solid gray;color:#fff;background-image:linear-gradient(to bottom,#337ab7 0,#286090 100%);width:{.overall.completeness}%">{.outerShell.completeness}%</div>
                {:else}
                    <div  style="background-repeat: repeat-x;border:1px solid #f0ad4e;color:#fff;background-color:#f0ad4e;width:{.overall.completeness}%">{.overall.completeness}%</div>
                {/gt}
            {/gt}
            {@lte key=overall.completeness value=20}
                <div  style="background-repeat: repeat-x;border:1px solid #d9534f;color:#fff;background-color:#d9534f;width:{.overall.completeness}%">{.overall.completeness}%</div>
                
            
            {/lte}
        </td>
        <td style='padding:0 15px 0 15px;'>{.overall.resolutionsLimitHigh}</td>
        <td style='padding:0 15px 0 15px;'>{.overall.rMerge}</td>
    </tr>
        </tbody>
</table>
