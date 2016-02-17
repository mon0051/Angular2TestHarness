window.using = function(namespace,getMeOrMakeMe){
	if(window[namespace] === undefined){
		window[namespace] = {};
	}

	if(window[namespace][getMeOrMakeMe] === undefined){
		return (window[getMeOrMakeMe] = {});
	}
	return getMeOrMakeMe;
};
