var urlDemo = new Url()



function updateDemoDivInnerHtml() {
    document.getElementById("urlDiv").innerHTML =
        "Url: " + urlDemo;
}

updateDemoDivInnerHtml();

function setQuery() {
    let queryInput = document.getElementById('queryInput');
    urlDemo.query.a = query.value;

    updateDemoDivInnerHtml();
}

function setPort() {
    let portInput = document.getElementById('portInput');
    urlDemo.port = parseInt(portInput.value);

    updateDemoDivInnerHtml();
}

function setHash() {
    let hashInput = document.getElementById('hashInput');
    urlDemo.hash = hashInput.value;

    updateDemoDivInnerHtml();
}


function setHost() {
    let hostInput = document.getElementById('hostInput');
    urlDemo.host = hostInput.value;

    updateDemoDivInnerHtml();
}



