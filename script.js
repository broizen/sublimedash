// preload images
function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}


function updateBodyPicture(){
  randomNumber = Math.floor((Math.random()*23)+1);
  $("body").css({"background": "url(/img/bg"+randomNumber+".jpg)",
                "background-position": "center",
                "background-attachment": "fixed",
                "background-size": "cover"
                });
}


// from http://www.tristanwaddington.com/2010/08/javascript-clock/
function updateClock(){
	 var now = new Date();
 
    // Get the hours, minutes and seconds from the current time
    var hours = now.getHours();
    var minutes = now.getMinutes();
    //var seconds = now.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    // Format hours, minutes and seconds
    if(hours==0)
    	hours=12;
    if (hours > 12) {
		  hours -= 12;
	}
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    /*if (seconds < 10) {
        seconds = "0" + seconds;
    }*/

    // Gets the element we want to inject the clock into
    var elem = document.getElementById('time');

    // Sets the elements inner HTML value to our clock data
    elem.innerHTML = hours + ':' + minutes+' '+ampm;
}

function getCalendarDate(){
	var date = new Date();

	var dateNumber = date.getDate();
	var dayOfWeekNumber = date.getDay(); // returns day of the week from 0-6
	var weekday = Array();
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
	weekWord = weekday[dayOfWeekNumber];


	var monthNumber = date.getMonth(); // returns month number from 0-11
	var month = Array();
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
	monthWord = month[monthNumber];

	$('#date').html(weekWord+', '+monthWord+' '+dateNumber);

}

function getWeather(zipCodeInput){
	$.ajax({
	  type: "GET",
	  url: "getWeather.php",
	  data: { zipCode: zipCodeInput}
	}).done(function( response ) {
		//console.log(response);
		// parse JSON response
		var parsedResponse = JSON.parse( response );
	  $('#currentTemp').html( parsedResponse.currentTemp);
	  $('#hiloToday').html( parsedResponse.hiloToday );
	  $('#weather').html( parsedResponse.otherDays) ;
	});
}

function getStocks(){
  $.ajax({
    type: "GET",
    url: "getStocks.php",
    data: { }
  }).done(function( response ) {
    //console.log(response);
    $('#stockQuotes').html( response);
  });
}

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

function drawChart(containerId, xAxisTitles, dataPoints){

Highcharts.theme = {
   colors: ["#7FE817", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      
      borderWidth: 0,
      plotShadow: false,
      plotBorderWidth: 0
   },
   title: {
      style: {
         color: '#FFF',
         font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
   },
   subtitle: {
      style: {
         color: '#DDD',
         font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
   },
   xAxis: {
      minorTickInterval: null,
      lineColor: '#999',
      tickWidth: 0,
      labels: {
         style: {
            color: 'white',
            fontWeight: 'bold'
         },
         step:7
      },
      title: {
         style: {
            color: '#AAA',
            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         }
      }
   },
   yAxis: {
      minorTickInterval: null,
      gridLineColor: 'rgba(255, 255, 255, .3)',
      minorGridLineColor: 'rgba(255,255,255,0.07)',
      lineWidth: 0,
      tickWidth: 0,
      labels: {
         style: {
            color: 'white',
            fontWeight: 'bold'
         }
      },
      title: {
         style: {
            color: 'white',
            font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
         }
      }
   },
   legend: {
      itemStyle: {
         color: '#CCC'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#333'
      }
   },
   labels: {
      style: {
         color: '#CCC'
      }
   },
   tooltip: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
         stops: [
            [0, 'rgba(96, 96, 96, .8)'],
            [1, 'rgba(16, 16, 16, .8)']
         ]
      },
      borderWidth: 0,
      style: {
         color: '#FFF'
      }
   },


   plotOptions: {
      series: {
         shadow: true,
         marker: {
                enabled: false
            }
      },
      line: {
         dataLabels: {
            color: '#CCC'
         },
         marker: {
            lineColor: '#333'
         }
      },
      spline: {
         marker: {
            lineColor: '#333'
         }
      },
      scatter: {
         marker: {
            lineColor: '#333'
         }
      },
      candlestick: {
         lineColor: 'white'
      }
   },

   toolbar: {
      itemStyle: {
         color: '#CCC'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         hoverSymbolStroke: '#FFFFFF',
         theme: {
            fill: {
               linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
               stops: [
                  [0.4, '#606060'],
                  [0.6, '#333333']
               ]
            },
            stroke: '#000000'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
         stroke: '#000000',
         style: {
            color: '#CCC',
            fontWeight: 'bold'
         },
         states: {
            hover: {
               fill: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                     [0.4, '#BBB'],
                     [0.6, '#888']
                  ]
               },
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                     [0.1, '#000'],
                     [0.3, '#333']
                  ]
               },
               stroke: '#000000',
               style: {
                  color: 'yellow'
               }
            }
         }
      },
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(16, 16, 16, 0.5)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      }
   },

   scrollbar: {
      barBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
      barBorderColor: '#CCC',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
      buttonBorderColor: '#CCC',
      rifleColor: '#FFF',
      trackBackgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
         stops: [
            [0, '#000'],
            [1, '#333']
         ]
      },
      trackBorderColor: '#666'
   },

   // special colors for some of the demo examples
   legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
   legendBackgroundColorSolid: 'rgb(70, 70, 70)',
   dataLabelsColor: '#444',
   textColor: '#E0E0E0',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);


	$('#'+containerId).highcharts({
            chart: {
                type: 'area',
                marginRight: 0,
                marginBottom: 25,
                backgroundColor: 'rgba(0, 0, 0, 0.4);'
            },
            title: {
                text: 'Adsense Earnings - Last 30 Days'
            },
            xAxis: {
                categories: xAxisTitles,
                plotLines: [{
                    value: -0.5,
                    width: 1,
                    color: 'white'
                }]
            },
            yAxis: {
                min:0,
                title:{
                  enabled:false
                },
                /*title: {
                    text: 'Earnings ($)'
                },*/
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: 'white'
                }],
                labels: {
                formatter: function() {
                return '$' + Highcharts.numberFormat(this.value);
                }} // to prepend the $ in the y-axis numbers
            },
            tooltip: {
                valuePrefix: '$'
            },
            series: [{
            	showInLegend: false,
                name: 'Earnings',
                data: dataPoints
            }],
            credits: {
		    enabled: false
		  }
        });
}




// google adsense API
// Enter a client ID for a web application from the Google Developer Console.
// The provided clientId will only work if the sample is run directly from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// In your Developer Console project, add a JavaScript origin that corresponds to the domain
// where you will be running the script.
var clientId = '689754531762.apps.googleusercontent.com';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyAzVP9c5H8t0mGkYB2wuyaTuSUkE52Sdqo';

// To enter one or more authentication scopes, refer to the documentation for the API.
//var scopes = 'https://www.googleapis.com/auth/plus.me';
var scopes = 'https://www.googleapis.com/auth/adsense.readonly';

// Use a button to handle authentication the first time.
function handleClientLoad() {
gapi.client.setApiKey(apiKey);
window.setTimeout(checkAuth,1);
}

function checkAuth() {
gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


function handleAuthResult(authResult) {
var authorizeButton = document.getElementById('authorize-button');
if (authResult && !authResult.error) {
  authorizeButton.style.visibility = 'hidden';
  makeApiCall();
  // make API call every 15 minutes (1500000 ms)
	setInterval('makeApiCall()', 1500000);
} else {
  authorizeButton.style.visibility = '';
  authorizeButton.onclick = handleAuthClick;
}
}

function handleAuthClick(event) {
gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
gapi.client.load('adsense', 'v1.3', function() {
  // how to assemble request:
  // Returns a request object which can be executed (as below) or batched
  //   var ApiRequest = gapi.client.METHOD_NAME(PARAMETERS_OBJECT);
//var request = gapi.client.plus.people.get({
    //'userId': 'me'
//  });
var request = gapi.client.adsense.accounts.list({
    
  });
  request.execute(function(response) {
    //console.log(response);

    // get adsense id item[0].id
    adsenseId = response.items[0].id;
    //console.log(adsenseId);

    // generate report  
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    if(month<10)
      month='0'+month;
    var day = today.getDate();
    if(day<10)
      day='0'+day;
    endDate = year+'-'+month+'-'+day;
    weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-30);

    // get date from a weekago
    var year = weekAgo.getFullYear();
    var month = weekAgo.getMonth()+1;
    if(month<10)
      month='0'+month;
    var day = weekAgo.getDate();
    if(day<10)
      day='0'+day;
    startDate = year+'-'+month+'-'+day;
    //console.log(startDate);
    //console.log(endDate);

    // console.log({
    //   'startDate': startDate,
    //   'endDate':endDate,
    //   'params': {'metric':'EARNINGS', 'dimension':'date'}
    // });

    var request2 = gapi.client.adsense.reports.generate({
      'startDate': startDate,
      'endDate':endDate,
      'metric':['EARNINGS'], 
      'dimension':['DATE']
    });
    request2.execute(function(response2) {
      //console.log(response2);
      xAxisTitles = Array();
      dataPoints = Array();
    	for(index=0;index<response2.rows.length;index++){
    		//console.log(response2.rows[index]);
    		// replace year and dash by removing first 5 chars
    		//xAxisTitles.push(response2.rows[index][0].substring(5));
    		var date = new Date(response2.rows[index][0]);
    		month = date.getMonth()+1;
    		day = date.getDate()+1;
    		xAxisTitles.push(month+'-'+day);
    		dataPoints.push(parseFloat(response2.rows[index][1]));
    	}
    	//console.log(xAxisTitles);
    	//console.log(dataPoints);
    	drawChart('earningsChart', xAxisTitles, dataPoints);
    });
    /*
    $startDate = date('Y-m-d', strtotime("-1 week"));
    $endDate = date('Y-m-d');
    $reportUrl = "https://www.googleapis.com/adsense/v1.3/accounts/$adsenseId/reports?startDate=$startDate&endDate=$endDate&dimension=DATE&metric=EARNINGS&key=$APIKEY&access_token=$token";
    echo "<br>$reportUrl<br>";
    */

  });
});
}













$(document).ready(function() {
  
  /* Not currently using because too slow.
  // from http://blurjs.com/
  // do blur
  $('#stocks').blurjs({
    draggable: true,
    overlay: 'rgba(0, 0, 0, 0.4)',
    cache: false,
  });
*/

  // change image after 1 hour, 3600000 ms
  setInterval('updateBodyPicture()', 3600000);
  
  // make draggable
  $(".drag").draggable();
  // later use snap: http://jqueryui.com/draggable/#snap-to


	// start the clock
	setInterval('updateClock()', 200);
	// get date
	getCalendarDate();
	// get weather asyncronously every 15 min
	zipCodeInput = '90025';
	timerId = 0;
	timerId = setInterval('getWeather(zipCodeInput)', 900000);
	getWeather(zipCodeInput);

  // get stocks every 15 min
  stockTimerId = setInterval('getStocks()', 900000);
  getStocks();

  // get news headlines every 15 min
  setInterval('getNews()', 900000);
  getNews();



	// pre plot adsense chart
	xAxisTitles = ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-7", "7-8", "7-9", "7-10", "7-11",
                "7-12", "7-13", "7-14", "7-15", "7-16", "7-17", "7-18", "7-19", "7-20", "7-21",
                "7-22", "7-23", "7-24", "7-25", "7-26", "7-27", "7-28", "7-29", "7-30"]; 
	dataPoints = [100.32, 120.04, 110.03, 120.32, 130.56, 140.49, 135.03, 150.63, 140.40, 150.32,
                160.43, 180.21, 150.49, 140.23, 190.66, 210.22, 230.32, 280.54, 330.43, 320.32, 
                310.42, 345.44, 360.32, 370.68, 390.53, 370.42, 395.53, 410.42, 420.20, 430.42]; 
	drawChart('earningsChart', xAxisTitles, dataPoints);





	// if editZip clicked
	$('#editZip').click(function() {

		$( "#editZipDialog" ).dialog({width:315});
  	});

  	$('#submitZip').click(function() {
		$( "#editZipDialog" ).dialog( "close" );
		zipCodeInput = $('#zipCodeInput').val();
		$( "#zipCode" ).html("weather in "+zipCodeInput);
		//console.log('closed dialog and new zipcode: '+zipCodeInput);
		// stop setInterval for weather, and start again
		clearInterval(timerId);
		timerId = setInterval('getWeather(zipCodeInput)', 900000);
		getWeather(zipCodeInput);
  	});



});
















