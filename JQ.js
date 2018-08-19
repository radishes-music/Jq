(function() {

// 重写jQuery

// JQuery version : "3.2.1"


function App () {
	"use strict";

};

App.fn = App.prototype = {

	constructor: App,

	log: console.log,

	eq: function (i) {
		var _t = this;

		i === -1 ? i = _t.elem.length - 1 : i;

		if (typeof _t.elem[i] === 'undefined' && i < _t.elem.length)
			_t.log(new Error(`${_t.elem.toString()} not Array`));

		if (i > _t.elem.length - 1)
			_t.log(new Error(`${i} More than expected`));

		var ret = new Jq(_t.elem[i] ? _t.elem[i] : _t.elem);

		return ret;
	},

	type: function (name) {
		return Object.prototype.toString.call(name);
	},

	isFunction: function (fn) {
		return this.type(fn) === '[object Function]' ? true : false;
	},

	each: function (callback) {
		var 
			i = 0, 
			len = this.elem.length;

		for ( ; i < len; i++) {
			// callback(new Jq(this.elem[i]), i);
			callback(this, i);
		};
	}

};

App.extend = App.fn.extend = function () {
	var 
		r = function(){};

	for (var i in App.prototype) {
		r.prototype[i] = App.prototype[i];
	};

	for (var i in arguments[0]) {
		r.prototype[i] = arguments[0][i];
	};

	for (var i in r.prototype) {
		App.prototype[i] = r.prototype[i];
	};

};

App.extend({
	addCss: function (value) {
		var _t = this,
			a = arguments,
			b = _t.type(_t.elem);

		if (a[1]) {

			b === '[object NodeList]' ? 
				_t.elem[0].style[a[0]] = a[1]
			:
				_t.elem.style[a[0]] = a[1];
			return;
		};

		for (var key in value) {

			b === '[object NodeList]' ? 
				_t.elem[0].style[ key ] = value[ key ]
			:
				_t.elem.style[ key ] = value[ key ];

		};
	}
	
});

App.extend({

	// 设置
	attr: function (name, value) {

		var _t = this;

		// 返回属性值
		if (typeof name === 'string' && !value) {
			return _t.elem.getAttribute(name);
		};

		if (value) {
			if (_t.type(value) === '[object Function]')
				_t.elem.setAttribute(name, value());
			else
				_t.elem.setAttribute(name, value);
		} else {
			for (i in name) {
				_t.elem.setAttribute(i, name[i]);
			}
		};
	},

	removeAttr: function (name) {
		this.elem.removeAttribute(name);
	}
});

App.extend({

	// value === undefined 返回文本 / 设置文本
	text: function (value) {
		var elem = this.elem || {};

		if ( value === undefined && elem.nodeType === 1 ) {
			return elem.innerText;
		};

		elem.innerText = value;
	},

	// 设置节点HTML
	html: function (value) {
		var elem = this.elem || {};

		if ( value === undefined && elem.nodeType === 1 ) {
			return elem.innerHTML;
		};

		if (typeof value === "string") {
			elem.innerHTML = value
		};
	}
});

// 获取元素所有属性 attributes => NamedNodeMap对象
// firstElementChild
// lastElementChild

function classType (vac, that, type) {
	var elem = that.elem || {},
		i = 0,
		len = vac.length;

	for ( ; i < len ; i++) {
		if (typeof vac[i] === 'string') {
			elem.classList[type](vac[i]);
		};
		
	};
};

App.extend({

	// class返回 DOMTokenList对象

	getClass: function () {
		elem = this.elem;
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	},

	// 添加指定样式
	addClass: function () {
		classType(arguments, this, 'add');
	},

	// 移除指定样式
	removeClass: function () {
		classType(arguments, this, 'remove');
	},

	replaceClass: function (oldClass, newClass) {

		if (oldClass && newClass && typeof oldClass === 'string' && typeof newClass === 'string') {
			this.replace(oldClass , newClass);
		};
	},

	// stateVal === true 添加 / 移除 toggle
	toggleClass: function (value, force) {

		if (value === '')
			return;

		if (typeof force === 'boolean') {
			return this.elem.classList.toggle(value, force);
		}

		if (typeof value === 'string') {
			return this.elem.classList.toggle(value);
		};

	},

	// 检查元素中是否存在类值
	checkClass: function (value) {
		if (typeof value !== 'string') 
			return;

		return this.elem.classList.contains(value)
	}
});

App.extend({
	val: function (value) {

		var elem = this.elem || {};

		if (value) {
			if (elem.localName === 'input') {
				elem.value = value;
			}
		} else {
			return elem.value;
		};
	}
});

App.extend({
	width: function (w, isScroll) {
		if (w) 
			this.elem.style.width = w + 'px';
		else
			return isScroll ? this.elem.scrollWidth : this.elem.clientWidth;
	},
	height: function (h, isScroll) {
		if (h) 
			this.elem.style.height = h + 'px';
		else
			return isScroll ? this.elem.scrollHeight : this.elem.clientHeight;
	},

    children: function () {

    },

    parent: function () {

    },

    parents: function () {

    },

    siblings: function () {

    },

    prev: function () {

    },

    prevAll: function () {

    },

    next: function () {

    },

    nextAll: function () {
		
    }
});

var rect = {},
	style = ['width','height','opacity','padding','margin','overflow','display','transition'];

function showHide (elem, speed) {
	var r = {},
		i = 0;

	// console.log(elem)

	if (speed && speed != 0)
		for (var i in style) {
			// 使用 transition 制作过渡动画
			switch (style [i]) {
				case 'opacity' : elem[ style [i] ] = 0; break;
				case 'overflow' : elem[ style [i] ] = 'hidden'; break;
				case 'display' : arguments[2] ? elem[ style [i] ] = 'block' : elem[ style [i] ] = 'none'; break;
				case 'transition' : elem[ style [i] ] = `all ${speed}s linear`; break;
				default : elem[ style [i] ] = 0;
			}
		}
	else 
		for (; i < style.length; i++) {
			// 清空添加的style
			style [i] === 'display' && !arguments[2] ?
				elem[ style[i] ] = 'none'
			:
				elem[ style[i] ] = '';
		};

};

function delay (time, callback) {
	setTimeout(() => {
		callback();
	}, time);
};

App.extend({
	show: function (speed, callback) {
		var _t = this,
			s = _t.elem.style;

		showHide(s, speed / 1000);

		s.display = 'block';

		delay(0, () => {
			s.width = rect.w + 'px';
			s.height = rect.h + 'px';
			s.opacity = '1';
		});

		delay(speed, () => {
			showHide(s, 0, true);
			if (callback && _t.isFunction(callback)) callback();
		});

	},

	hide: function (speed, callback) {
		var _t = this,
			s = _t.elem.style;

		rect = {
			w: _t.width(),
			h: _t.height()
		};

		_t.elem.style.width = rect.w + 'px';
		_t.elem.style.height = rect.h + 'px';

		delay(0, () => {

			showHide(s, speed / 1000, true);

		});

		delay(speed, () => {

			showHide(s, 0, false);

			if (callback && _t.isFunction(callback)) callback();
		});

	}
});

// console.log(App.prototype);

function Jq (elemName) {
	"use strict";

    this.elem = elemName.length === 1 ? elemName[0] : elemName;

    this.name = 'Copyright© 2018 Link';

	this.length = typeof this.elem.length === 'undefined' ? 1 : this.elem.length;

};

Jq.prototype = {

    constructor: Jq,

	getElement: function () {
    	return this.elem;
	},

	_init: function () {

    },

	_grep: function () {

    },

	_map: function () {

    }
};

function inher (sub, superType) {
	"use strict";

	var prototype = Object.create(superType.prototype);
	prototype.constructor = sub;

	for (var i in prototype) {
        sub.prototype[i] = prototype[i];
    }
	console.log(sub.prototype)
	// sub.prototype = prototype;
    // sub.constructor = sub;

};

inher(Jq, App);

window.$ = function (name) {
	"use strict";

	var 
		tag = name.slice(0, 1),
		get;

	// 判断传入的类型
	switch (tag) {
		case '.' : get = 'querySelectorAll'; break;
		case '#' : get = 'querySelector'; break;
		default: get = 'querySelectorAll';
	}

	// 检测elem名字是否正确
	var elem = name ? document[get](name) : `not find elem ${name}`;

	// 没有找到elem
	if (elem.length === 0) 
		console.log(new Error(`not find elemName ${name}`));
	if (tag === '#') {

		// 如果是唯一elem, 将类型改为数组
		elem = [elem];
	};

	// console.log(elem);

	return new Jq(elem);

};


var link = function() {};
link.prototype = {

	constructor: link,

	type: function (name) {
		return Object.prototype.toString.call(name);
	},

	isFunction: function (val) {
		return this.type(val) === '[object Function]' ? true : false;
	},

	isArray: function (val) {
        return this.type(val) === '[object Array]' ? true : false;
	},

	isObject: function (val) {
        return this.type(val) === '[object Object]' ? true : false;
	},

    isDomDoc: function (o) {
        var brek;
        if (this.isXMLDoc(o)) {
            brek = o.isConnected;
        } else {
            this.error (`Failed to execute 'isDomDoc' on 'Element' : '${o}' is not of type 'Element'`)
        };
        return brek && brek;
    },

	isXMLDoc: function (o) {
		return (o !== null) && !!(o.ownerDocument && (o.ownerDocument.defaultView || o.ownerDocument.parentWindow).alert);
	},

	// true 为空
	isEmptyObject: function (val) {
		for (var i in val) {
			return true;
		};
		return false;
	},

	error: function (str) {
        throw (str);
	},

    contains: function (per, child) {
		if (!this.isXMLDoc(per)) {
			return this.error (`Failed to execute 'contains' on 'Node' : ${per} is not of type 'Node'`);
		};
		if (!this.isXMLDoc(child)) {
            return this.error (`Failed to execute 'contains' on 'Node' : ${child} is not of type 'Node'`);
		};
		return per.contains(child);
    }

};
// $ 里封装一些常用方法,可以减少对prototype的遍历
window._$ = new link();

	

})()