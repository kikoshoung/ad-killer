(function(){
	var killer = window.adKillerByKikoshoung = {},
		_regexCompany = /(baidu|google|alimama|mediav|sogou)/,
		_regexVendor = /(000dn|ggmm777|17leyi|37cs|49ko|91hui|91mangrandi|91tiger|14yaa|144gg|a135|arpg2|game3737|mediav|mnwan|qiyou|sogou|twcczhu)/,
		_suspectableDoms = [],
		_fullscreen = [document.documentElement.clientWidth, document.documentElement.clientHeight],
		_panel = {
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
				dom.innerHTML = '\u5DF2\u4E3A\u60A8\u6E05\u9664\u4E86' + _suspectableDoms.length + '\u4E2A\u6076\u610F\u5E7F\u544A';
				dom.style.backgroundColor = 'green';
			}
		}

	// a function used to scan the dom tree
	var _domScanner = function(root){
		var childLength = root.children.length;

		// if this element has child element
		if(childLength){
			// for each child in this element
			for(var i = 0, children = root.children; i < childLength; i++){
				var child = children[i],
					positionType = child.style.position,
					position = child.position,
					suspectableAttr = _getSuspectableAttr(child);

				// ignore SCRIPT tags
				if(child.tagName === 'SCRIPT') continue; 

				// filter out suspectable doms(iframes and other elements)
				if((child.tagName === 'IFRAME' && suspectableAttr.match(_regexCompany)) || suspectableAttr.match(_regexVendor)) {
					_suspectableDoms.push(child);
					continue;
				}

				// filter out fullscreen elements
				if((positionType === 'absolute' || positionType === 'fixed') && _fullscreen[0] === parseInt(child.style.clientWidth) && _fullscreen[1] <= parseInt(child.style.clientHeight)){
					_suspectableDoms.push(child);
					continue;
				}

				// rejump in '_domScanner' with argument(this element)
				arguments.callee(child);
			}
		} else return;
	}

	var _getSuspectableAttr = function(elem){
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
	var _killSuspectableDoms = function(child){
		var parent = child.parentNode,
			suspectableAttr = _getSuspectableAttr(parent);
		parent.removeChild(child);
		if(suspectableAttr.match(_regexCompany)) parent.parentNode.removeChild(parent);
	}

	// kill action start from here. Function 'excu' is the only method that export for 'window.adKillerByKikoshoung'
	killer.excu = function(){
		_panel.show();
		_panel.scanning();
		_domScanner(document.getElementsByTagName('body')[0]);
		for(var i = 0; i < _suspectableDoms.length; i++){
			_killSuspectableDoms(_suspectableDoms[i]);
		}
		_panel.completed();
		_suspectableDoms = [];
		setTimeout(function(){
			_panel.hide()
		}, 2000);
	}
	
	killer.excu();	
	
})();











