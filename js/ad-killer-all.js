(function(){
	if(window.adKillerByKikoshoung){
		window.adKillerByKikoshoung.excu();
		return;
	}

	var panel = document.createElement('div'),
		body = document.body;

	panel.id = 'ad-killer-panel';
	panel.style.cssText = 'position: fixed; z-index: 9999999999; top: 0; right: 0; padding: 5px 10px; background-color: gold; color: black; font-size: 12px;';
	panel.innerHTML = '\u6B63\u5728\u4E3A\u60A8\u52A0\u8F7D\u5E7F\u544A\u6740\u624B...';

	body.appendChild(panel);

	var killer = window.adKillerByKikoshoung = {},
		regexCompany = /(baidu|google|alimama|mediav|sogou)/,
		regexVendor = /(000dn|ggmm777|17leyi|37cs|49ko|91hui|91mangrandi|91tiger|14yaa|144gg|a135|arpg2|game3737|mediav|mnwan|qiyou|sogou|twcczhu)/,
		suspectableDoms = [],
		fullscreen = [document.documentElement.clientWidth, document.documentElement.clientHeight],
		panel = {
			dom: document.getElementById('ad-killer-panel'),
			show: function(){
				this.dom.style.display = 'block';
			},
			hide: function(){
				this.dom.style.display = 'none';
			},
			scanning: function(){
				var dom = this.dom;
				dom.innerHTML = '\u6B63\u5728\u626B\u63CF\u6076\u610F\u5E7F\u544A...';
				dom.style.backgroundColor = 'red';
				dom.style.color = 'white';
			},
			completed: function(){
				var dom = this.dom;
				dom.innerHTML = '\u5DF2\u4E3A\u60A8\u6E05\u9664\u4E86' + suspectableDoms.length + '\u4E2A\u6076\u610F\u5E7F\u544A';
				dom.style.backgroundColor = 'green';
			}
		}

	// a function used to scan the dom tree
	var domScanner = function(root){
		var childLength = root.children ? root.children.length : 0;

		// if this element has child element
		if(childLength){
			// for each child in this element
			for(var i = 0, children = root.children; i < childLength; i++){
				var child = children[i],
					positionType = child.style.position,
					parentPositionType = child.parentNode.style.position,
					position = child.position,
					suspectableAttr = getSuspectableAttr(child);

				// ignore SCRIPT tags
				if(child.tagName === 'SCRIPT') continue; 

				// filter out suspectable doms(iframes and other elements)
				if((child.tagName === 'IFRAME' && suspectableAttr.match(regexCompany)) || suspectableAttr.match(regexVendor)) {
					suspectableDoms.push(child);
					continue;
				}

				// filter out fullscreen elements
				// if((positionType === 'absolute' || positionType === 'fixed') && fullscreen[0] === parseInt(child.clientWidth) && fullscreen[1] <= parseInt(child.clientHeight)){
				if(fullscreen[0] === parseInt(child.clientWidth) && fullscreen[1] <= parseInt(child.clientHeight)){
					if(positionType === 'absolute' || positionType === 'fixed' || parentPositionType === 'absolute' || parentPositionType === 'fixed'){
						suspectableDoms.push(child);
						continue;
					}
				}

				// rejump in 'domScanner' with argument(this element)
				arguments.callee(child);
			}
		} else return;
	}

	var getSuspectableAttr = function(elem){
		var str = '';
		str += elem.id ? elem.id : '';
		str += elem.className ? elem.className : '';
		str += elem.name ? elem.name : '';
		str += elem.src ? elem.src : '';
		str += elem.href ? elem.href : '';
		str += elem.style.background ? elem.style.background : '';
		str += elem.onload ? elem.onload.toString() : '';
		return str;
	}

	// kill this ad element. If it has a wrapper, kill its wrapper too
	var killSuspectableDoms = function(child){
		var parent = child.parentNode,
			suspectableAttr = getSuspectableAttr(parent);
		parent.removeChild(child);
		if(suspectableAttr.match(regexCompany)) parent.parentNode.removeChild(parent);
	}

	// kill action start from here. Function 'excu' is the only method that export for 'window.adKillerByKikoshoung'
	killer.excu = function(){
		panel.show();
		panel.scanning();
		domScanner(document.getElementsByTagName('body')[0]);
		for(var i = 0; i < suspectableDoms.length; i++){
			killSuspectableDoms(suspectableDoms[i]);
		}
		panel.completed();
		suspectableDoms = [];
		setTimeout(function(){
			panel.hide()
		}, 2000);
	}
	
	killer.excu();	

})()