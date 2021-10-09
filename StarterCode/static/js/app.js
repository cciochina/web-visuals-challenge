function getSampleNames() {
    /*
    Funtction to get the sample names from the samples.json file 
    And populate them in the selector from index.html which id is selDataset
    */
    // testing to see if works, opening the index.html file 
    // and inspecting the code & looking at the terminal - we should see this.
    console.log("Hello World\n");
    
    // get the selector="selDataset" from our index.html file
    var selector = d3.select("#selDataset");
    // console.log(selector);
    
    // get the sample names from our samples.json file
    d3.json("samples.json").then(function(data) {
        console.log(data);
        data.names.forEach(function (item) {
            selector
            .append("option")
            .text(item)
            .property("value", item)
        });
    });
}

function buildSampleMetadata(sample_name=940) {
    // Build a metadata for a sample name
    // By default take the first sample_name which is 940
    // get the "sample-metadata" from our index.html file
    var sample_metadata = d3.select("#sample-metadata");
    // this is how a metadata looks like for a sample name (940)
    // "metadata":[
    //     {"id": 940, 
    //     "ethnicity": "Caucasian", 
    //     "gender": "F", 
    //     "age": 24.0, 
    //     "location": "Beaufort/NC", 
    //     "bbtype": "I", 
    //     "wfreq": 2.0} ]

    // before appending to the sample_metadata lets clean the previous info
    sample_metadata.html("");

    d3.json("samples.json").then(function(data) {
        // look through "metadata" dictionary from samples.json
        data.metadata.forEach(function(item) {

            // display only for one at the time - current sample name
            if (sample_name == item['id']) {
                // append the info for this sample name (id)
                Object.entries(item).forEach((key) => {   
                    sample_metadata
                    .append("p")
                    .text(key[0] + ": " + key[1] + "\n");    
                });
            }
        });
    });
}

function buildBarChart(sample_name=940) {
   // alert('Chart called')
    // Build a Bar Chart for a sample name
    // By default take the first sample_name which is 940
    var sample_bar = d3.select("#bar");

    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.

    
    d3.json("samples.json").then(function(data) {
        // look at the samples dictionary from samples.json
        data.samples.forEach(function(item) {

            // get the data only for this id - current sample name
            if (sample_name == item['id']) {
                // get the "samples" dictionary for this id
                // get only the first ten values
                var sample_values = item.sample_values.slice(0, 10);
                var otu_ids = item.otu_ids.slice(0, 10);
                var yticks = otu_ids.map(function(otu_id) {
                    return `OTU ${otu_id}`;
                });
                var otu_labels = item.otu_labels.slice(0, 10);
                // console.log(sample_values, otu_ids, otu_labels);

                // setup data and reverse it
                var data = [
                    {
                      x: sample_values.reverse(),
                      y: yticks.reverse(),
                      type: 'bar',
                      orientation: 'h',
                      text: otu_labels.reverse()
                    }
                  ];

                var layout = {
                    title: "Top 10 OTU",
                };
        
                // plot at the "bar" from our index.html file
                Plotly.newPlot('bar', data, layout);
            }
        });
    });
}


function buildBubbleChart(sample_name=940) {
// Build a Bubble Chart for a sample name
// By default take the first sample_name which is 940

// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.

d3.json("samples.json").then(function(data) {
    // look at the samples dictionary from samples.json
    data.samples.forEach(function(item) {
    // get the data only for this id - current sample name
    if (sample_name == item['id']) {
        // get the "samples" dictionary for this id
        var sample_values = item.sample_values;
        var otu_ids = item.otu_ids;
        var otu_labels = item.otu_labels;
        // console.log(sample_values, otu_ids, otu_labels);

        // setup data and reverse it
        var data = [
            {
                x: otu_ids,
                y: sample_values,
                mode: 'markers',
                text: otu_labels,
                marker: {
                    size: sample_values,
                    color: otu_ids
                }
            }
            ];

        var layout = {
            title: "Bubble Chart",
            xaxis:{title: "OTU ID"},
        };

        // plot at the "bubble" from our index.html file
        Plotly.react('bubble', data, layout);
    }
    });
});
}

// Bonus part
// I did a simpler gauge chart
function buildGaugeChart(sample_name=940) {
    // Belly Button Washing Frequency
    // Scrubs per Week
    // Build a Bubble Chart for a sample name
    // By default take the first sample_name which is 940

    d3.json("samples.json").then(function(data) {
        // look at the metadata dictionary from samples.json
        data.metadata.forEach(function(item) {
        // get the data only for this id - current sample name
        if (sample_name == item['id']) {
            // get the "samples" dictionary for this id
            // var sample_values = item.sample_values;
            // var otu_ids = item.otu_ids;
            // var otu_labels = item.otu_labels;
            var wfreq = item.wfreq

            

            // setup data and reverse it
            var data = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: wfreq,
                    type: "indicator",
                    value: wfreq,
                    mode: "gauge+number",

                    gauge: {
                        axis: { range: [0, 9]},
                        bar: { color: "0D092B" },
                        ticks: 'inside',

                        steps: [
                          { range: [0, 1], color: "#D9F3F0"},
                          { range: [1, 2], color: "#C4F5EF" },
                          { range: [2, 3], color: "#A0E1D9" },
                          { range: [3, 4], color: "#7FCCC2" },
                          { range: [4, 5], color: "#5DAFA4" },
                          { range: [5, 6], color: "#459C91" },
                          { range: [6, 7], color: "#2E887D" },
                          { range: [7, 8], color: "#1D756B" },
                          { range: [8, 9], color: "#0E5D54" }
                        ],
                      }
                }
                
            ];

            layout = {
                title: {text: "Belly Button Washing Frequency<br><sup>Scrubs per Week</sup>"}
            }

            // plot at the "gauge" from our index.html file
            Plotly.react('gauge', data, layout);
        }
        });
    });
}

// When you change the sample menu selection this function get called 
// this function in the index file
function optionChanged(sample_name) {
    buildSampleMetadata(sample_name);
    buildBarChart(sample_name);
    buildBubbleChart(sample_name);
    buildGaugeChart(sample_name);
}
    
function main() {
    // first get all the sample names and populate them
    getSampleNames();
    // optionChanged();
    // call this function first to populate the default sample's metadata
    buildSampleMetadata();
    // call this function to populate the default sample's bar chart
    buildBarChart();
    // call this frunction to populate the default sample's bubble chart
    buildBubbleChart();
    // call this frunction to populate the default sample's gauge chart
    buildGaugeChart();
}


main();
