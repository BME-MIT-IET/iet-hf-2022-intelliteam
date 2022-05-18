var urlDemo = new Url()



function updateDemoDivInnerHtml() {
    document.getElementById("urlDiv").innerHTML =
        "Url: " + urlDemo;
}

updateDemoDivInnerHtml();

function setQuery() {
    let queryInput = document.getElementById('queryInput');
    urlDemo.query.a = queryInput.value;

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

function clearQuery() {
    urlDemo.clearQuery();

    updateDemoDivInnerHtml();
}

function decode() {
    let decoded = urlDemo.decode(document.getElementById('decodeInput').value);

    document.getElementById('decodeResult').innerHTML = decoded;
}


function encode() {
    let encoded = urlDemo.encode(document.getElementById('encodeInput').value.toString());

    document.getElementById('encodeResult').innerHTML = encoded;
}



