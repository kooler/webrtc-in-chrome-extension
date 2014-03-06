var file = document.createElement('script')
file.setAttribute("type","text/javascript")
file.setAttribute("src", "peer.js");
document.getElementsByTagName("head")[0].appendChild(file);

//Let's start from hardcoded user names and later will fetch it from configuration
var myName = 'Konstantin';
var contactName = 'Bob';

//This function will show notification, let's keep it empty for now
function onConnect() {
	console.log('Connected');
	chrome.notifications.create("", {
        type: "basic",
        title: "Your contact is online",
        message: "He's waiting you in webchat.",
        iconUrl: 'icon.png'
    }, function() {});
}

//This part taken from webpage. We create connection and than just wait until second part will join.
function init() {
	if (typeof Peer === 'function') {
		console.log('Init');
		var peer = new Peer(myName, {key: '{{YOUR_PEERJS_KEY}}'});
		var conn = peer.connect(contactName);
		peer.on('connection', function(externalConnection) {
			onConnect();
		});
	} else {
		console.log('waiting...');
		setTimeout(init, 1000);
	}
}

init();