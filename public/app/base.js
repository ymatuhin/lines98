/* DOM objects */
function ID(id) {
  return document.getElementById(id);
}

function getNodesOf(obj, str) {
  if (str) var tags = str.toHash();
  var result = [],
    items = obj.childNodes;
  for (var i = 0, lim = items.length; i < lim; i++) {
    var item = items[i];
    if (item.nodeType != 1) continue;
    if (!tags || tags[item.tagName]) result.push(item);
  }
  return result;
}

function getPositionOf(obj) {
  var pos = { x: 0, y: 0 };
  for (var p = obj; p; p = p.offsetParent) {
    pos.x += p.offsetLeft;
    pos.y += p.offsetTop;
  }
  return pos;
}

function makeVisible(obj) {
  obj.style.visibility = 'visible';
}
function makeHidden(obj) {
  obj.style.visibility = 'hidden';
}

/* Events */
function processEvent(obj, method) {
  var args = [].splice.call(arguments, 2);
  return function(event) {
    event = event || window.event;
    obj[method].apply(obj, [event].concat(args));
  };
}
function stopEvent(event) {
  event = event || window.event;
  event.cancelBubble = true;
}

function onClickOrTap(elem, handler) {
  if (elem.addEventListener) {
    elem.addEventListener('click', handler, false);
    if ('ontouchend' in window)
      elem.addEventListener('ontouchend', handler, false);
  } else {
    elem.attachEvent('onclick', handler);
  }
}

/* className editor */
function classNameOf(obj) {
  var cne = classNameEditor;
  cne.value = obj.className;
  cne.obj = obj;
  return cne;
}

var classNameEditor = {
  seek: function(str) {
    var s = ' ',
      spaced = s + this.value + s;
    return spaced.seek((s = str + s));
  },
  add: function(str) {
    if (!this.value.seek(str)) this.obj.className = this.value + ' ' + str;
  },
  remove: function(str) {
    if (!this.value.seek(str)) return;
    var s = ' ',
      spaced = s + this.value + s;
    var sample = new RegExp(s + str + s);
    this.obj.className = spaced.replace(sample, s).trim();
  },
  flip: function(str) {
    var newValue = this.add(str);
    if (this.value == newValue) this.remove(str);
  },
};

/* Prototypes */
String.prototype.seek = function(str) {
  return this.indexOf(str) > -1;
};

String.prototype.toHash = function(spacer) {
  var s = spacer || ' ',
    hash = {};
  var a = this.split(s),
    i = a.length;
  while (i-- > 0) hash[a[i]] = true;
  return hash;
};
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
};

Number.prototype.decline = function(word) {
  var n = this + ' ',
    p = word.split(/- |,/g);
  var pn = n.match(/([^1]|^)1 /) ? 1 : n.match(/([^1]|^)[234] /) ? 2 : 3;
  return n + p[0] + p[pn];
};

/* Cookies */
var cookies = {
  path: '/',
  dates: {},
  keep: function(name, period) {
    if (period) {
      var date = new Date();
      date.setDate(date.getDate() + period);
      this.dates[name] = date.toGMTString();
    } else {
      this.dates[name] = null;
    }
  },
  get: function(name) {
    var s = ';',
      cookies = s + document.cookie.toString().replace('; ', s);
    var pos = cookies.indexOf(s + name + '=');
    return pos == -1
      ? null
      : cookies.substr(pos + name.length + 2).split(s, 1)[0];
  },
  set: function(name, value) {
    var date = this.dates[name];
    var expires = date ? 'expires=' + date + ';' : '';
    document.cookie = name + '=' + value + ';' + expires + 'path=' + this.path;
  },
  remove: function(name) {
    document.cookie =
      name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=' + this.path;
  },
};
