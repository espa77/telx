// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();
var line3 = new TimeSeries();

function getData(){
  json = $.getJSON("https://data.sparkfun.com/output/g6n27ArgwxhgvZgVwoLb.json", function (data){
    for (var i = 0; i < data.length; i++) {
      var date = new Date().getTime();
      line1.append(date, data[i].humidity);
      line2.append(date, data[i].tempc);
      line3.append(date, data[i].light/10);
      console.log(data[i].humidity);
    }
  });
}

var smoothie = new SmoothieChart({
grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb(60, 0, 0)',
        lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
labels: { fillStyle:'rgb(60, 0, 0)' }
});
smoothie.streamTo(document.getElementById("mycanvas"), 2000 /*delay*/);


// Add a random value to each line every second
setInterval( getData, 1000);

// Add to SmoothieChart
smoothie.addTimeSeries(line1,
{ strokeStyle:'rgb(0, 255, 0)', fillStyle:'rgba(0, 255, 0, 0.4)', lineWidth:3 });
smoothie.addTimeSeries(line2,
{ strokeStyle:'rgb(255, 0, 255)', fillStyle:'rgba(255, 0, 255, 0.3)', lineWidth:3 });
smoothie.addTimeSeries(line3,
{ strokeStyle:'rgb(150, 0, 255)', fillStyle:'rgba(50, 0, 255, 0.3)', lineWidth:3 });
