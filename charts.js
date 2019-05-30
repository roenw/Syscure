// Get JSON Data from API
fetch("api.php")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        // Parse the JSON
        window.loginsFailedInt = data["logins"]["failed"];

        window.daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        for(i in window.daysOfWeek.length) {
            window.loginsFailedDay[i] = data["loginDaysSuccess"][i];
            window.loginsFailedDay[i] = data["loginDaysFailed"][i];
            i++;
        }

        createCharts();
    })


var date = new Date();

function createCharts() {

    // Homepage: login breakdown
    var ctx = document.getElementById("loginBreakdownChart");
    var loginBreakdownChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Successful", "Failed"],
        datasets: [{
        data: [55, 30],
        backgroundColor: ['#e75874', '#1cc88a'],
        hoverBackgroundColor: ['#2e59d9', '#17a673'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 80,
    },
    });

    new Chart(document.getElementById("loginDaysChart"), {
        type: 'line',
        maintainAspectRatio: false,
        data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{ 
            data: [86,114,106,106,107,111,133,221,783,2478],
            label: "Successful",
            borderColor: "#1cc88a",
            fill: false
            }, { 
            data: [282,350,411,502,635,809,947,1402,3700,5267],
            label: "Failed",
            borderColor: "#e75874",
            fill: false
            }
        ]
        },
        options: {
        title: {
            display: false,
            text: 'Login Attempts per Day'
        }
        }
    });

}