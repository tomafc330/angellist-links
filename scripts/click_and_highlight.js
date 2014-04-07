(function () {
//click on all the click_for_more first
	function isPortfolioCompany(company) {
		var isPortfolio = false;
		$.each(portfolioCompanies, function (idx, val) {
			var score = company.score(val);
			if (score > 0.90) {
				isPortfolio = true;
			}
		});
		return isPortfolio;
	};

	function highlight(elem) {
		$(elem).css('background', 'yellow');
	};

	function setLoading(show) {
		if (show) {
			$('body').prepend("<div id='highlight-loading' style='position: fixed; font-size: xx-large; width: 100%; text-align: center; background: yellow; opacity: 0.8; z-index: 10001'>Checking for connections...</div>")
		} else {
			$('#highlight-loading').remove();
		}
	};

	function checkPortfolioCompanies() {
		setTimeout(function () {
			$('.tag').each(function () {
				if (isPortfolioCompany($(this).text())) {
					highlight(this);
				}
			});

			setLoading(false);
		}, 2500);
	};

	function getPortfolioCompanies() {
		$.get(companiesSrc, function(data) { // var was injected from contentscript.js
			portfolioCompanies = data.companies;
			checkPortfolioCompanies();
		});
	};

	function init() {
		setLoading(true);
		//need to wait for js to initialize first
		setTimeout(function () {
			$('.click_for_more').click();
			//go through each of the companies and look
			getPortfolioCompanies();
		}, 2500);
	};

	init();
})();
