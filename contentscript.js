function addFile(name) {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL(name);
	s.onload = function () {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);
}

function addVar(varName, value) {
	var s = document.createElement('script');
	s.textContent = "var " + varName + " = '" + value + "';";
	(document.head || document.documentElement).appendChild(s);
}

chrome.storage.sync.get({
	sourceUrl: 'https://s3.amazonaws.com/static_garage/companies.json',
	includeInvestors: false
}, function (items) {
	addVar("companiesSrc", items.sourceUrl);
	addVar("isCheckPeople", items.includeInvestors);
	addFile('lib/string_score.js');
	addFile('scripts/click_and_highlight.js');
});

