{#.}
	<div>
			{@eq key=status value="Success"}<div class='summary_datacollection_success'></div>{/eq}
			{@eq key=status value="Failure"}<div class='summary_datacollection_failed'></div>{/eq}
			<a   class='result-autoprocessing-anchor' href={.url}> {.count} x {.name}</a>
	</div>
{/.}

