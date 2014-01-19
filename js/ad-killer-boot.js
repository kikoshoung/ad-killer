/* Ad-killer - A bookmarklet for web browser to kill rude advertisement
 * @author kikoshoung (kikoshoung@gmail.com)
 */
(function(){
	if(window.adKillerByKikoshoung){
		window.adKillerByKikoshoung.excu();
		return;
	}

	var script = document.createElement('script'), 
		panel = document.createElement('div'),
		body = document.body,
		mode = 1, // 0: dev, 1: online
		domain = !mode ? 'http://localhost' : 'https://raw.github.com/kikoshoung/ad-killer/master';

	script.src = domain + '/minified/ad-killer.min.js';

	panel.id = 'ad-killer-panel';
	panel.style.cssText = 'position: fixed; z-index: 9999999999; top: 0; right: 0; padding: 5px 10px; background-color: gold; color: black; font-size: 12px;';
	panel.innerHTML = '\u6B63\u5728\u4E3A\u60A8\u52A0\u8F7D\u5E7F\u544A\u6740\u624B...';

	body.appendChild(script);
	body.appendChild(panel);

})();