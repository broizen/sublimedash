#[Sublime Dash](http://www.sublimedash.com)
================================
Check out the [current stable version!](http://www.sublimedash.com)
## How to create a submodule
New modules can be created using HTML, JavaScript, and PHP. Here is an example news module:

###HTML (index.php)
```
<div id="news" class="roundedBox drag">
	<div id='newsTitle'>News</div>
	<div id='newsStories'></div>
</div>
```
###JavaScript (script.js)
``` 
function getNews(){
  $.ajax({
    type: "GET",
    url: "getNews.php",
    data: { }
  }).done(function( response ) {
    //console.log(response);
    $('#newsStories').html( response);
  });
}

$(document).ready(function() {
  // get news headlines every 15 min
  setInterval('getNews()', 900000);
  getNews();
});
```

###PHP (getNews.php)
``` 
$url = "http://news.yahoo.com/rss/";
$response = file_get_contents($url);

$dom = new DOMDocument();
@$dom->loadHTML($response);
$x = new DOMXPath($dom);

$count=0;
foreach($x->query("//item") as $contextnode) 
{

	$title = $x->query("title", $contextnode)->item(0)->nodeValue;
	$description = $x->query("description", $contextnode)->item(0)->nodeValue;
	$explodedDescription = explode('"><img', $description);
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
```

## Currently Requested modules
1. Gmail Unread Messages
2. Twitter - new tweets
3. Facebook new notifications
4. Google Analytics API reports

## Reporting an Issue
1. Make sure the problem you're addressing is reproducible.
2. Indicate what browsers the issue can be reproduced in. **Note: IE Compatibilty issues will not be addressed.**

## License
Copyright (c) 2013 [Brian Roizen](http://www.brianroizen.com)
Licensed under the MIT license.
