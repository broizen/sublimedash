<?php

$url = "http://news.yahoo.com/rss/";
$response = file_get_contents($url);
//echo $response;

$dom = new DOMDocument();
@$dom->loadHTML($response);
$x = new DOMXPath($dom);

$count=0;
foreach($x->query("//item") as $contextnode) 
{
	
	$title = $x->query("title", $contextnode)->item(0)->nodeValue;
	$description = $x->query("description", $contextnode)->item(0)->nodeValue;
	$explodedDescription = explode('"><img', $description);
	//var_dump($explodedDescription);
	$link = $explodedDescription[0];
	$link = str_replace('<p><a href="', '', $link);
	if($count>6)
		exit();
	echo "
	<div class='newsRow'>
		<a target='_blank' href='$link'>$title</a>
	</div>
	";
	$count++;
}



?>