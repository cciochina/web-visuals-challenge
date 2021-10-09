// Create functions
function createMetadata(sample){
    
}

function createCharts(sample){
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        //console.log(samples);
        var resultsArray = samples.filter(function(data){
            return data.id === sample;
        })
        //console.log(resultsArray);
        var result = resultsArray[0];
        //console.log(result);

        //creating a chart
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);

        var yticks = otu_ids.slice(0,10).map(function(otuID){
            return `OTU ${otuID}`
        }).reverse();
       // console.log(yticks)
       
       // I am building a horizontal bar chart
        var barData = [
           {
               y: yticks,
               x: sample_values.slice(0,10).reverse(),
               text: otu_labels.slice(0,10).reverse(),
               type: "bar",
               orientation: "h"
            }
        ];

        var barLayout = {
           title: "Top Bacteria Cultures Found",
           margin: {t: 30, l: 150}
        };
       
        Plotly.newPlot("bar", barData, barLayout);
    
        
        // I am building a bubble chart
        var bubbleLayout = {
            title: "Bacteria",
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            margin: {t: 30}
        }
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }

            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
        

}

function init(){

        // Dropdown a select element
        var selector = d3.select("#selDataset");

        // import samples.json
        d3.json("samples.json").then(function(data){
           // console.log(data);
          
           // I am adding the Test Subject ID No.
           var sampleNames = data.names;
           sampleNames.forEach(function(name){
               selector.append("option").text(name).property("value", name)
           })

           // Create a first sample
           var firstSample = sampleNames[0];
           createCharts(firstSample); 
           createMetadata(firstSample);
        
        })
}

init()