var sleepTime = [21,6], // hours where i dont ride/dont want time
    goodHours = []; // holds filtered list of idx of good hours


// not using strict comparison for auto casting - beware!
var printHourly = function(hourlyData) {
    // filter out bad hours
    $.each(hourlyData, function(i, hour) {
        if (hour.FCTTIME.hour > sleepTime[0] || hour.FCTTIME.hour < sleepTime[1]) return; // filter by time
        if (hour.pop > 50) return; // filter by conditions (rain/snow)
        if (hour.feelslike.english < 10) return; // filter out cold
        goodHours.push(i);
    });

    // aggregate good
    var currFeelTemps = [hourlyData[goodHours[0]].feelslike.english],
        startHourIdx = goodHours[0],
        endHourIdx = goodHours[0];
    for (var i = 0; i < goodHours.length - 1; i++) {
        // if next goodHour is next hour
        var currHour = goodHours[i],
            nextHour = goodHours[i+1];

        if (hourlyData[currHour].FCTTIME.hour == hourlyData[nextHour].FCTTIME.hour - 1) {
            endHourIdx = nextHour;
            currFeelTemps.push(hourlyData[nextHour].feelslike.english);
        } else {
            var startHour = hourlyData[startHourIdx],
                endHour = hourlyData[endHourIdx],
                sum = currFeelTemps.reduce(function(a, b) { return parseInt(a) + parseInt(b); });
                avg = Math.round(sum / currFeelTemps.length);

            $('table.table tbody').append($('<tr>' +
                '<td>' + startHour.FCTTIME.mon_abbrev + ' ' + startHour.FCTTIME.mday_padded + '</td>' +
                '<td>' + startHour.FCTTIME.hour_padded + ':00 - ' + endHour.FCTTIME.hour_padded + ':00 ' + '</td>' +
                '<td>' + avg + '</td>' +
            '</tr>'));
            startHourIdx = goodHours[i+1];
        }
    }
};

$.ajax({
    url: 'http://api.wunderground.com/api/01e312a92fcac494/hourly10day/q/10003.json',
    dataType: 'jsonp',
    success: function(data) {
        printHourly(data.hourly_forecast);
    }
});