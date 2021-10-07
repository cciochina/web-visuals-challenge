// Create a function
function init(){

        // Dropdown a select element
        var selector = d3.select("#selDataset");

        // import samples.json
        d3.json("samples.json").then(function(data){
           // console.log(data);
           var sampleNames = data.names;
           sampleNames.forEach(function(name){
               selector.append("option").text(name).property("value", name)
           })

        })
}

init()