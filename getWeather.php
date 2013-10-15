<?php

$lat = 34.0416;
$long = -118.2988;
$zipCode = $_REQUEST['zipCode'];

// or use this: http://graphical.weather.gov/xml/rest.php
//$url = "http://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXMLclient.php?whichClient=NDFDgen&lat=$lat&lon=$long&listLatLon=&lat1=&lon1=&lat2=&lon2=&resolutionSub=&listLat1=&listLon1=&listLat2=&listLon2=&resolutionList=&endPoint1Lat=&endPoint1Lon=&endPoint2Lat=&endPoint2Lon=&listEndPoint1Lat=&listEndPoint1Lon=&listEndPoint2Lat=&listEndPoint2Lon=&zipCodeList=&listZipCodeList=&centerPointLat=&centerPointLon=&distanceLat=&distanceLon=&resolutionSquare=&listCenterPointLat=&listCenterPointLon=&listDistanceLat=&listDistanceLon=&listResolutionSquare=&citiesLevel=&listCitiesLevel=&sector=&gmlListLatLon=&featureType=&requestedTime=&startTime=&endTime=&compType=&propertyName=&product=time-series&begin=2004-01-01T00%3A00%3A00&end=2017-06-28T00%3A00%3A00&Unit=e&maxt=maxt&mint=mint&temp=temp&Submit=Submit";

// currently using yahoo
$url = "http://weather.yahooapis.com/forecastrss?p=$zipCode";



$response = file_get_contents($url);
$responseData = array();
//echo $response;

$dom = new DOMDocument();
@$dom->loadHTML($response);
$x = new DOMXPath($dom);

// get current condition
$nodeList=$x->query("//condition");
if($nodeList->length>0)
{
	$currentTemp = $nodeList->item(0)->getAttribute('temp'); 
	$responseData['currentTemp'] = $currentTemp.'&deg;';
}


// get day, date, low, high, and text
$count=1;
$otherDays = "";	
foreach($x->query("//forecast") as $node) 
{
	$day = $node->getAttribute('day');
	if($day=='Sat')
		$day = 'Saturday'; 
	if($day=='Sun')
		$day = 'Sunday'; 
	if($day=='Mon')
		$day = 'Monday'; 
	if($day=='Tue')
		$day = 'Tuesday'; 
	if($day=='Wed')
		$day = 'Wednesday'; 
	if($day=='Thu')
		$day = 'Thursday'; 
	if($day=='Fri')
		$day = 'Friday'; 
	//$date = $node->getAttribute('date'); 
	//$date = str_replace('2013', '', $date);
	$low = $node->getAttribute('low'); 
	$high = $node->getAttribute('high'); 
	$text = $node->getAttribute('text');
	$code = $node->getAttribute('code');  
	if($count==1){
		$responseData['hiloToday'] = "<span class='low'>$low&deg;</span> - <span class='high'>$high&deg;</span> today";
	}
	else
		$otherDays.= "
			<div class='weatherRow'>
				<div class='weatherDay'>$day</div>
				<div class='weatherImg'><img src='sun.png'></div>
				<div class='tempHigh'><span class='high'>$high&deg;</span></div>
				<div class='tempLow'><span class='low'>$low&deg;</span></div>
				
				
			</div>
			";
	$count++;
		
}
$responseData['otherDays'] = $otherDays;
echo json_encode($responseData);


?>