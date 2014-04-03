function addFile(name) {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL(name);
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
}


addFile('data/portfolio_companies.js');
addFile('lib/string_score.js');
addFile('scripts/click_and_highlight.js');
