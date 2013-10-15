<html>

<head>
	<title>SublimeDash - the dashboard you'll fall in love with.</title>
	<meta property="og:title" content="SublimeDash"/>
	<meta property="og:image" content="http://www.sublimeDash.com/img/sample.png"/>
	<meta property="og:description"
          content="The dashboard you will fall in love with."/>

	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<link rel='stylesheet' href='style.css' />
	<link href='http://fonts.googleapis.com/css?family=Lilita+One' rel='stylesheet' type='text/css'>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>
	<script type="text/javascript" src="script.js"></script>
	<script src="highchartsjs/highcharts.js"></script>
	<script src="highchartsjs/modules/exporting.js"></script>
	<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
	<!--<script type="text/javascript" src="blur.js"></script>-->

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-44842174-1', 'sublimedash.com');
  ga('send', 'pageview');

</script>

</head>

<body>


<div id="clock" class="roundedBox drag">
	<div id='time'></div>
	<div id='date'></div>
	<div id='currentTemp'></div><div id='hiloToday'></div>
	<div id='weather'></div><!-- add an edit for location and record in cookie -->
	<div id='editZip'>edit</div><div id='zipCode'>weather in 90025</div>
</div>

<div id="stocks" class="roundedBox drag">
	<div id='stockTitle'>Stocks</div>
	<div id='stockQuotes'></div>
</div>

<div id="news" class="roundedBox drag">
	<div id='newsTitle'>News</div>
	<div id='newsStories'></div>
</div>

<div id="notepad" class="drag">
	<textarea id='textarea' placeholder="Notes"></textarea>
</div>



<div id="earnings" class="drag">
	
	<div id="earningsChart"></div>
	<button id="authorize-button" style="visibility: hidden;">Login to Adsense</button>
</div>

<div id="editZipDialog" title="Edit ZipCode">
  <p>
  	<input type='text' placeholder='zip code' maxlength='10' id='zipCodeInput'>
  	<a id="submitZip" class="dialogButton">Submit!</a>
  </p>
</div>


</body>
</html>