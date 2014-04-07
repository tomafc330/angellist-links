(function () {
//click on all the click_for_more first
	function isSimilar(haystack, needle) {
		var isPortfolio = false;
		$.each(haystack, function (idx, val) {
			var score = needle.score(val);
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

	function checkPortfolioCompanies(portfolioCompanies) {
		setTimeout(function () {
			$('.tag').each(function () {
				if (isSimilar(portfolioCompanies, $(this).text())) {
					highlight(this);
				}
			});

			setLoading(false);
		}, 2500);
	};

	function checkPeople(people) {
		setTimeout(function () {
			$('.profile-link').each(function () {
				if (isSimilar(people, $(this).text())) {
					highlight(this);
				}
			});

			setLoading(false);
		}, 5000);
	};

	function getPortfolioCompanies() {
		$.get(companiesSrc, function (data) { // var was injected from contentscript.js
			checkPortfolioCompanies(data.companies);
			if (isCheckPeople === 'true') { //var was injected from contentscript.js
				checkPeople(data.people)
			}
		});
	};

	function init() {
		setLoading(true);
		//need to wait for js to initialize first
		setTimeout(function () {
			$('.click_for_more').click();
			$('.view_all').click();
			//go through each of the companies and look
			getPortfolioCompanies();
		}, 3500);
	};

	init();
})();
