<?php

	/*This module provides a PHP API for retrieving stock data from Yahoo Finance.
	 * This module is inspired from ystockquote.py
	 * You are free to use modify distribute and redistribute a small credit will be appreciated
	 * $allValue = getAllData('GEOMETRIC.NS');
	 * print_r($allValue);
	 * $allValue = getChange('GEOMETRIC.NS');
	 * print_r($allValue);
	 * 
	*/

	function request($symbols)
	{
		$separator = ',';
		$file = "http://download.finance.yahoo.com/d/quotes.csv?s=$symbols&f=l1c1=.csv";
		$dataArray = array();
		if (($handle = fopen($file, "r")) !== FALSE) {
			while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$dataArray[] = $data;
			}
		fclose($handle);
		}
		return $dataArray;		
	}

	
	

$dataArray = request('^GSPC+goog+fb+aapl+msft+gld');
// echo "<pre>";
// print_r($dataArray);
// echo "</pre>";

foreach($dataArray as $key=>$value){
	$symbol = $value[2];
	$price = $value[0];
	$change = $value[1];

	if($symbol == '^GSPC')
		$symbol = 'S&P 500';

	$changeType = '';
	$pos = strpos($change, '+');
	if ($pos !== false) {
		$changeType = "plus";
	}
	$pos = strpos($change, '-');
	if ($pos !== false) {
		$changeType = "minus";
	}

	if(strlen($changeType)==0)
		$changeType = "noChange";

	$change = number_format($change, 2);
	$change = str_replace('+', '+ ', $change);
	$change = str_replace('-', '- ', $change);

	$price = number_format($price, 2);


	echo "
		<div class='stockRow'>
			<div class='stockSymbol'>$symbol</div>
			<div class='stockPrice'>$price</div>
			<div class='stockChange $changeType'>$change</div>
			
		</div>
	";

}


?>