var urlDemo = new Url()



function updateDemoDivInnerHtml() {
    document.getElementById("urlDiv").innerHTML =
        "Url: " + urlDemo;
}

updateDemoDivInnerHtml();

function setQuery() {
    let queryAInput = document.getElementById('queryAInput');
    let queryBInput = document.getElementById('queryBInput');
    let queryCInput = document.getElementById('queryCInput');

    if (!queryAInput.value == "")
        urlDemo.query.a = queryAInput.value;

    if (!queryBInput.value == "")
        urlDemo.query.b = queryBInput.value;

    if (!queryCInput.value == "")
        urlDemo.query.c = queryCInput.value;

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

function queryLengthIsEmpty() {
    document.getElementById('queryEmptyLengthResult').innerHTML = "Empty: " + urlDemo.isEmptyQuery()
        + " Length: " + urlDemo.queryLength();
}

function setUser() {
    let user = document.getElementById('userInput').value;
    urlDemo.user = user;

    updateDemoDivInnerHtml();
}

function setPass() {
    let pass = document.getElementById('passInput').value;
    urlDemo.pass = pass;

    updateDemoDivInnerHtml();
}

function setPath() {
    let path = document.getElementById('pathInput').value;
    urlDemo.path = path;

    updateDemoDivInnerHtml();
}


function setPass() {
    let pass = document.getElementById('passInput').value;
    urlDemo.pass = pass;

    updateDemoDivInnerHtml();
}




