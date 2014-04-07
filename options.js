// Saves options to chrome.storage
function save_options() {
	var values = {};
	var sourceUrl = document.getElementById('sourceUrl').value;
	if (sourceUrl) {
		values.sourceUrl = sourceUrl;
	}
	values.includeInvestors = document.getElementById('includeInvestors').checked;

	chrome.storage.sync.set(values, function() {
		// Update $status to let user know options were saved.
		var $status = $('#success');
		$status.removeClass('hide');
		setTimeout(function() {
			$status.addClass('hide');
		}, 1500);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.sync.get({
		sourceUrl: '',
		includeInvestors: false
	}, function(items) {

		if (items.sourceUrl) {
			document.getElementById('sourceUrl').value = items.sourceUrl;
		}
		document.getElementById('includeInvestors').checked = items.includeInvestors;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);