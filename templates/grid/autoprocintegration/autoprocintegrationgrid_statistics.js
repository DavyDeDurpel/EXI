<table>
<tr style='border: 1px solid gray';>
	<th class='datacollection_parameter_name'>Data Range</th>
	<th class='datacollection_parameter_name' style='padding-left:10px;'>Resolution</th>
	<th class='datacollection_parameter_name' style='padding-left:10px;'>Multiplicity</th>
	<th class='datacollection_parameter_name' style='padding-left:10px;'>Completeness</th>
    <th class='datacollection_parameter_name' style='padding-left:10px;'>I/Sigmal</th>
    <th class='datacollection_parameter_name' style='padding-left:10px;'>Rmeas</th>
    <th class='datacollection_parameter_name' style='padding-left:10px;'>Rmerge</th>
    <th class='datacollection_parameter_name' style='padding-left:10px;'>Rpim</th>
     <th class='datacollection_parameter_name' style='padding-left:10px;'>cc(1/2)</th>
</tr>
{#.}
	<tr>
			<td class='summary_datacollection_parameter_name' >
				{.type}
			</td>
			<td style='padding-left:10px;'>
                {@decimal key="resolutionLimitLow" decimals=1}{/decimal} - {@decimal key="resolutionLimitHigh" decimals=1}{/decimal}
			</td>
			<td style='padding-left:10px;'>
				
                {@decimal key="multiplicity" decimals=1}{/decimal}
			</td>
			<td style='padding-left:10px;'> 
                {@decimal key="completeness" decimals=1}{/decimal}
				
			</td>
            <td style='padding-left:10px;'> 
                {@decimal key="meanIOverSigI" decimals=1}{/decimal}
				
			</td>
            <td style='padding-left:10px;'> 
				rMeasAll
			</td>
            <td style='padding-left:10px;'> 
                {@decimal key="rMerge" decimals=1}{/decimal}
				
			</td>
             <td style='padding-left:10px;'> 
				rpim
			</td>
             <td style='padding-left:10px;'> 
                {@decimal key="ccHalf" decimals=1}{/decimal}
				
			</td>
			
	</tr>	
{/.}
</table>