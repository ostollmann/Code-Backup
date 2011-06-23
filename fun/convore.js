(function (A, w) {
    function ma() {
        if (!c.isReady) {
            try {
                s.documentElement.doScroll("left")
            } catch (a) {
                setTimeout(ma, 1);
                return
            }
            c.ready()
        }
    }
    function Qa(a, b) {
        b.src ? c.ajax({
            url: b.src,
            async: false,
            dataType: "script"
        }) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
        b.parentNode && b.parentNode.removeChild(b)
    }
    function X(a, b, d, f, e, j) {
        var i = a.length;
        if (typeof b === "object") {
            for (var o in b) X(a, o, b[o], f, e, d);
            return a
        }
        if (d !== w) {
            f = !j && f && c.isFunction(d);
            for (o = 0; o < i; o++) e(a[o], b, f ? d.call(a[o], o, e(a[o], b)) : d, j);
            return a
        }
        return i ? e(a[0], b) : w
    }
    function J() {
        return (new Date).getTime()
    }
    function Y() {
        return false
    }
    function Z() {
        return true
    }
    function na(a, b, d) {
        d[0].type = a;
        return c.event.handle.apply(b, d)
    }
    function oa(a) {
        var b, d = [],
            f = [],
            e = arguments,
            j, i, o, k, n, r;
        i = c.data(this, "events");
        if (!(a.liveFired === this || !i || !i.live || a.button && a.type === "click")) {
            a.liveFired = this;
            var u = i.live.slice(0);
            for (k = 0; k < u.length; k++) {
                i = u[k];
                i.origType.replace(O, "") === a.type ? f.push(i.selector) : u.splice(k--, 1)
            }
            j = c(a.target).closest(f, a.currentTarget);
            n = 0;
            for (r = j.length; n < r; n++) for (k = 0; k < u.length; k++) {
                i = u[k];
                if (j[n].selector === i.selector) {
                    o = j[n].elem;
                    f = null;
                    if (i.preType === "mouseenter" || i.preType === "mouseleave") f = c(a.relatedTarget).closest(i.selector)[0];
                    if (!f || f !== o) d.push({
                        elem: o,
                        handleObj: i
                    })
                }
            }
            n = 0;
            for (r = d.length; n < r; n++) {
                j = d[n];
                a.currentTarget = j.elem;
                a.data = j.handleObj.data;
                a.handleObj = j.handleObj;
                if (j.handleObj.origHandler.apply(j.elem, e) === false) {
                    b = false;
                    break
                }
            }
            return b
        }
    }
    function pa(a, b) {
        return "live." + (a && a !== "*" ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g, "&")
    }
    function qa(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }
    function ra(a, b) {
        var d = 0;
        b.each(function () {
            if (this.nodeName === (a[d] && a[d].nodeName)) {
                var f = c.data(a[d++]),
                    e = c.data(this, f);
                if (f = f && f.events) {
                    delete e.handle;
                    e.events = {};
                    for (var j in f) for (var i in f[j]) c.event.add(this, j, f[j][i], f[j][i].data)
                }
            }
        })
    }
    function sa(a, b, d) {
        var f, e, j;
        b = b && b[0] ? b[0].ownerDocument || b[0] : s;
        if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === s && !ta.test(a[0]) && (c.support.checkClone || !ua.test(a[0]))) {
            e = true;
            if (j = c.fragments[a[0]]) if (j !== 1) f = j
        }
        if (!f) {
            f = b.createDocumentFragment();
            c.clean(a, b, f, d)
        }
        if (e) c.fragments[a[0]] = j ? f : 1;
        return {
            fragment: f,
            cacheable: e
        }
    }
    function K(a, b) {
        var d = {};
        c.each(va.concat.apply([], va.slice(0, b)), function () {
            d[this] = a
        });
        return d
    }
    function wa(a) {
        return "scrollTo" in a && a.document ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
    }
    var c = function (a, b) {
        return new c.fn.init(a, b)
    },
        Ra = A.jQuery,
        Sa = A.$,
        s = A.document,
        T, Ta = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
        Ua = /^.[^:#\[\.,]*$/,
        Va = /\S/,
        Wa = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
        Xa = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        P = navigator.userAgent,
        xa = false,
        Q = [],
        L, $ = Object.prototype.toString,
        aa = Object.prototype.hasOwnProperty,
        ba = Array.prototype.push,
        R = Array.prototype.slice,
        ya = Array.prototype.indexOf;
    c.fn = c.prototype = {
        init: function (a, b) {
            var d, f;
            if (!a) return this;
            if (a.nodeType) {
                this.context = this[0] = a;
                this.length = 1;
                return this
            }
            if (a === "body" && !b) {
                this.context = s;
                this[0] = s.body;
                this.selector = "body";
                this.length = 1;
                return this
            }
            if (typeof a === "string") if ((d = Ta.exec(a)) && (d[1] || !b)) if (d[1]) {
                f = b ? b.ownerDocument || b : s;
                if (a = Xa.exec(a)) if (c.isPlainObject(b)) {
                    a = [s.createElement(a[1])];
                    c.fn.attr.call(a, b, true)
                } else a = [f.createElement(a[1])];
                else {
                    a = sa([d[1]], [f]);
                    a = (a.cacheable ? a.fragment.cloneNode(true) : a.fragment).childNodes
                }
                return c.merge(this, a)
            } else {
                if (b = s.getElementById(d[2])) {
                    if (b.id !== d[2]) return T.find(a);
                    this.length = 1;
                    this[0] = b
                }
                this.context = s;
                this.selector = a;
                return this
            } else if (!b && /^\w+$/.test(a)) {
                this.selector = a;
                this.context = s;
                a = s.getElementsByTagName(a);
                return c.merge(this, a)
            } else
            return !b || b.jquery ? (b || T).find(a) : c(b).find(a);
            else if (c.isFunction(a)) return T.ready(a);
            if (a.selector !== w) {
                this.selector = a.selector;
                this.context = a.context
            }
            return c.makeArray(a, this)
        },
        selector: "",
        jquery: "1.4.2",
        length: 0,
        size: function () {
            return this.length
        },
        toArray: function () {
            return R.call(this, 0)
        },
        get: function (a) {
            return a == null ? this.toArray() : a < 0 ? this.slice(a)[0] : this[a]
        },
        pushStack: function (a, b, d) {
            var f = c();
            c.isArray(a) ? ba.apply(f, a) : c.merge(f, a);
            f.prevObject = this;
            f.context = this.context;
            if (b === "find") f.selector = this.selector + (this.selector ? " " : "") + d;
            else if (b) f.selector = this.selector + "." + b + "(" + d + ")";
            return f
        },
        each: function (a, b) {
            return c.each(this, a, b)
        },
        ready: function (a) {
            c.bindReady();
            if (c.isReady) a.call(s, c);
            else Q && Q.push(a);
            return this
        },
        eq: function (a) {
            return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        slice: function () {
            return this.pushStack(R.apply(this, arguments), "slice", R.call(arguments).join(","))
        },
        map: function (a) {
            return this.pushStack(c.map(this, function (b, d) {
                return a.call(b, d, b)
            }))
        },
        end: function () {
            return this.prevObject || c(null)
        },
        push: ba,
        sort: [].sort,
        splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function () {
        var a = arguments[0] || {},
            b = 1,
            d = arguments.length,
            f = false,
            e, j, i, o;
        if (typeof a === "boolean") {
            f = a;
            a = arguments[1] || {};
            b = 2
        }
        if (typeof a !== "object" && !c.isFunction(a)) a = {};
        if (d === b) {
            a = this;
            --b
        }
        for (; b < d; b++) if ((e = arguments[b]) != null) for (j in e) {
            i = a[j];
            o = e[j];
            if (a !== o) if (f && o && (c.isPlainObject(o) || c.isArray(o))) {
                i = i && (c.isPlainObject(i) || c.isArray(i)) ? i : c.isArray(o) ? [] : {};
                a[j] = c.extend(f, i, o)
            } else if (o !== w) a[j] = o
        }
        return a
    };
    c.extend({
        noConflict: function (a) {
            A.$ = Sa;
            if (a) A.jQuery = Ra;
            return c
        },
        isReady: false,
        ready: function () {
            if (!c.isReady) {
                if (!s.body) return setTimeout(c.ready, 13);
                c.isReady = true;
                if (Q) {
                    for (var a, b = 0; a = Q[b++];) a.call(s, c);
                    Q = null
                }
                c.fn.triggerHandler && c(s).triggerHandler("ready")
            }
        },
        bindReady: function () {
            if (!xa) {
                xa = true;
                if (s.readyState === "complete") return c.ready();
                if (s.addEventListener) {
                    s.addEventListener("DOMContentLoaded", L, false);
                    A.addEventListener("load", c.ready, false)
                } else if (s.attachEvent) {
                    s.attachEvent("onreadystatechange", L);
                    A.attachEvent("onload", c.ready);
                    var a = false;
                    try {
                        a = A.frameElement == null
                    } catch (b) {}
                    s.documentElement.doScroll && a && ma()
                }
            }
        },
        isFunction: function (a) {
            return $.call(a) === "[object Function]"
        },
        isArray: function (a) {
            return $.call(a) === "[object Array]"
        },
        isPlainObject: function (a) {
            if (!a || $.call(a) !== "[object Object]" || a.nodeType || a.setInterval) return false;
            if (a.constructor && !aa.call(a, "constructor") && !aa.call(a.constructor.prototype, "isPrototypeOf")) return false;
            var b;
            for (b in a);
            return b === w || aa.call(a, b)
        },
        isEmptyObject: function (a) {
            for (var b in a) return false;
            return true
        },
        error: function (a) {
            throw a;
        },
        parseJSON: function (a) {
            if (typeof a !== "string" || !a) return null;
            a = c.trim(a);
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return A.JSON && A.JSON.parse ? A.JSON.parse(a) : (new Function("return " + a))();
            else c.error("Invalid JSON: " + a)
        },
        noop: function () {},
        globalEval: function (a) {
            if (a && Va.test(a)) {
                var b = s.getElementsByTagName("head")[0] || s.documentElement,
                    d = s.createElement("script");
                d.type = "text/javascript";
                if (c.support.scriptEval) d.appendChild(s.createTextNode(a));
                else d.text = a;
                b.insertBefore(d, b.firstChild);
                b.removeChild(d)
            }
        },
        nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        },
        each: function (a, b, d) {
            var f, e = 0,
                j = a.length,
                i = j === w || c.isFunction(a);
            if (d) if (i) for (f in a) {
                if (b.apply(a[f], d) === false) break
            } else
            for (; e < j;) {
                if (b.apply(a[e++], d) === false) break
            } else if (i) for (f in a) {
                if (b.call(a[f], f, a[f]) === false) break
            } else
            for (d = a[0]; e < j && b.call(d, e, d) !== false; d = a[++e]);
            return a
        },
        trim: function (a) {
            return (a || "").replace(Wa, "")
        },
        makeArray: function (a, b) {
            b = b || [];
            if (a != null) a.length == null || typeof a === "string" || c.isFunction(a) || typeof a !== "function" && a.setInterval ? ba.call(b, a) : c.merge(b, a);
            return b
        },
        inArray: function (a, b) {
            if (b.indexOf) return b.indexOf(a);
            for (var d = 0, f = b.length; d < f; d++) if (b[d] === a) return d;
            return -1
        },
        merge: function (a, b) {
            var d = a.length,
                f = 0;
            if (typeof b.length === "number") for (var e = b.length; f < e; f++) a[d++] = b[f];
            else
            for (; b[f] !== w;) a[d++] = b[f++];
            a.length = d;
            return a
        },
        grep: function (a, b, d) {
            for (var f = [], e = 0, j = a.length; e < j; e++)!d !== !b(a[e], e) && f.push(a[e]);
            return f
        },
        map: function (a, b, d) {
            for (var f = [], e, j = 0, i = a.length; j < i; j++) {
                e = b(a[j], j, d);
                if (e != null) f[f.length] = e
            }
            return f.concat.apply([], f)
        },
        guid: 1,
        proxy: function (a, b, d) {
            if (arguments.length === 2) if (typeof b === "string") {
                d = a;
                a = d[b];
                b = w
            } else if (b && !c.isFunction(b)) {
                d = b;
                b = w
            }
            if (!b && a) b = function () {
                return a.apply(d || this, arguments)
            };
            if (a) b.guid = a.guid = a.guid || b.guid || c.guid++;
            return b
        },
        uaMatch: function (a) {
            a = a.toLowerCase();
            a = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
            return {
                browser: a[1] || "",
                version: a[2] || "0"
            }
        },
        browser: {}
    });
    P = c.uaMatch(P);
    if (P.browser) {
        c.browser[P.browser] = true;
        c.browser.version = P.version
    }
    if (c.browser.webkit) c.browser.safari = true;
    if (ya) c.inArray = function (a, b) {
        return ya.call(b, a)
    };
    T = c(s);
    if (s.addEventListener) L = function () {
        s.removeEventListener("DOMContentLoaded", L, false);
        c.ready()
    };
    else if (s.attachEvent) L = function () {
        if (s.readyState === "complete") {
            s.detachEvent("onreadystatechange", L);
            c.ready()
        }
    };
    (function () {
        c.support = {};
        var a = s.documentElement,
            b = s.createElement("script"),
            d = s.createElement("div"),
            f = "script" + J();
        d.style.display = "none";
        d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var e = d.getElementsByTagName("*"),
            j = d.getElementsByTagName("a")[0];
        if (!(!e || !e.length || !j)) {
            c.support = {
                leadingWhitespace: d.firstChild.nodeType === 3,
                tbody: !d.getElementsByTagName("tbody").length,
                htmlSerialize: !! d.getElementsByTagName("link").length,
                style: /red/.test(j.getAttribute("style")),
                hrefNormalized: j.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(j.style.opacity),
                cssFloat: !! j.style.cssFloat,
                checkOn: d.getElementsByTagName("input")[0].value === "on",
                optSelected: s.createElement("select").appendChild(s.createElement("option")).selected,
                parentNode: d.removeChild(d.appendChild(s.createElement("div"))).parentNode === null,
                deleteExpando: true,
                checkClone: false,
                scriptEval: false,
                noCloneEvent: true,
                boxModel: null
            };
            b.type = "text/javascript";
            try {
                b.appendChild(s.createTextNode("window." + f + "=1;"))
            } catch (i) {}
            a.insertBefore(b, a.firstChild);
            if (A[f]) {
                c.support.scriptEval = true;
                delete A[f]
            }
            try {
                delete b.test
            } catch (o) {
                c.support.deleteExpando = false
            }
            a.removeChild(b);
            if (d.attachEvent && d.fireEvent) {
                d.attachEvent("onclick", function k() {
                    c.support.noCloneEvent = false;
                    d.detachEvent("onclick", k)
                });
                d.cloneNode(true).fireEvent("onclick")
            }
            d = s.createElement("div");
            d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            a = s.createDocumentFragment();
            a.appendChild(d.firstChild);
            c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
            c(function () {
                var k = s.createElement("div");
                k.style.width = k.style.paddingLeft = "1px";
                s.body.appendChild(k);
                c.boxModel = c.support.boxModel = k.offsetWidth === 2;
                s.body.removeChild(k).style.display = "none"
            });
            a = function (k) {
                var n = s.createElement("div");
                k = "on" + k;
                var r = k in n;
                if (!r) {
                    n.setAttribute(k, "return;");
                    r = typeof n[k] === "function"
                }
                return r
            };
            c.support.submitBubbles = a("submit");
            c.support.changeBubbles = a("change");
            a = b = d = e = j = null
        }
    })();
    c.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    var G = "jQuery" + J(),
        Ya = 0,
        za = {};
    c.extend({
        cache: {},
        expando: G,
        noData: {
            embed: true,
            object: true,
            applet: true
        },
        data: function (a, b, d) {
            if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
                a = a == A ? za : a;
                var f = a[G],
                    e = c.cache;
                if (!f && typeof b === "string" && d === w) return null;
                f || (f = ++Ya);
                if (typeof b === "object") {
                    a[G] = f;
                    e[f] = c.extend(true, {}, b)
                } else if (!e[f]) {
                    a[G] = f;
                    e[f] = {}
                }
                a = e[f];
                if (d !== w) a[b] = d;
                return typeof b === "string" ? a[b] : a
            }
        },
        removeData: function (a, b) {
            if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
                a = a == A ? za : a;
                var d = a[G],
                    f = c.cache,
                    e = f[d];
                if (b) {
                    if (e) {
                        delete e[b];
                        c.isEmptyObject(e) && c.removeData(a)
                    }
                } else {
                    if (c.support.deleteExpando) delete a[c.expando];
                    else a.removeAttribute && a.removeAttribute(c.expando);
                    delete f[d]
                }
            }
        }
    });
    c.fn.extend({
        data: function (a, b) {
            if (typeof a === "undefined" && this.length) return c.data(this[0]);
            else if (typeof a === "object") return this.each(function () {
                c.data(this, a)
            });
            var d = a.split(".");
            d[1] = d[1] ? "." + d[1] : "";
            if (b === w) {
                var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
                if (f === w && this.length) f = c.data(this[0], a);
                return f === w && d[1] ? this.data(d[0]) : f
            } else
            return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function () {
                c.data(this, a, b)
            })
        },
        removeData: function (a) {
            return this.each(function () {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function (a, b, d) {
            if (a) {
                b = (b || "fx") + "queue";
                var f = c.data(a, b);
                if (!d) return f || [];
                if (!f || c.isArray(d)) f = c.data(a, b, c.makeArray(d));
                else f.push(d);
                return f
            }
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var d = c.queue(a, b),
                f = d.shift();
            if (f === "inprogress") f = d.shift();
            if (f) {
                b === "fx" && d.unshift("inprogress");
                f.call(a, function () {
                    c.dequeue(a, b)
                })
            }
        }
    });
    c.fn.extend({
        queue: function (a, b) {
            if (typeof a !== "string") {
                b = a;
                a = "fx"
            }
            if (b === w) return c.queue(this[0], a);
            return this.each(function () {
                var d = c.queue(this, a, b);
                a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                c.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            a = c.fx ? c.fx.speeds[a] || a : a;
            b = b || "fx";
            return this.queue(b, function () {
                var d = this;
                setTimeout(function () {
                    c.dequeue(d, b)
                }, a)
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }
    });
    var Aa = /[\n\t]/g,
        ca = /\s+/,
        Za = /\r/g,
        $a = /href|src|style/,
        ab = /(button|input)/i,
        bb = /(button|input|object|select|textarea)/i,
        cb = /^(a|area)$/i,
        Ba = /radio|checkbox/;
    c.fn.extend({
        attr: function (a, b) {
            return X(this, a, b, true, c.attr)
        },
        removeAttr: function (a) {
            return this.each(function () {
                c.attr(this, a, "");
                this.nodeType === 1 && this.removeAttribute(a)
            })
        },
        addClass: function (a) {
            if (c.isFunction(a)) return this.each(function (n) {
                var r = c(this);
                r.addClass(a.call(this, n, r.attr("class")))
            });
            if (a && typeof a === "string") for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
                var e = this[d];
                if (e.nodeType === 1) if (e.className) {
                    for (var j = " " + e.className + " ", i = e.className, o = 0, k = b.length; o < k; o++) if (j.indexOf(" " + b[o] + " ") < 0) i += " " + b[o];
                    e.className = c.trim(i)
                } else e.className = a
            }
            return this
        },
        removeClass: function (a) {
            if (c.isFunction(a)) return this.each(function (k) {
                var n = c(this);
                n.removeClass(a.call(this, k, n.attr("class")))
            });
            if (a && typeof a === "string" || a === w) for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
                var e = this[d];
                if (e.nodeType === 1 && e.className) if (a) {
                    for (var j = (" " + e.className + " ").replace(Aa, " "), i = 0, o = b.length; i < o; i++) j = j.replace(" " + b[i] + " ", " ");
                    e.className = c.trim(j)
                } else e.className = ""
            }
            return this
        },
        toggleClass: function (a, b) {
            var d = typeof a,
                f = typeof b === "boolean";
            if (c.isFunction(a)) return this.each(function (e) {
                var j = c(this);
                j.toggleClass(a.call(this, e, j.attr("class"), b), b)
            });
            return this.each(function () {
                if (d === "string") for (var e, j = 0, i = c(this), o = b, k = a.split(ca); e = k[j++];) {
                    o = f ? o : !i.hasClass(e);
                    i[o ? "addClass" : "removeClass"](e)
                } else if (d === "undefined" || d === "boolean") {
                    this.className && c.data(this, "__className__", this.className);
                    this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
                }
            })
        },
        hasClass: function (a) {
            a = " " + a + " ";
            for (var b = 0, d = this.length; b < d; b++) if ((" " + this[b].className + " ").replace(Aa, " ").indexOf(a) > -1) return true;
            return false
        },
        val: function (a) {
            if (a === w) {
                var b = this[0];
                if (b) {
                    if (c.nodeName(b, "option")) return (b.attributes.value || {}).specified ? b.value : b.text;
                    if (c.nodeName(b, "select")) {
                        var d = b.selectedIndex,
                            f = [],
                            e = b.options;
                        b = b.type === "select-one";
                        if (d < 0) return null;
                        var j = b ? d : 0;
                        for (d = b ? d + 1 : e.length; j < d; j++) {
                            var i = e[j];
                            if (i.selected) {
                                a = c(i).val();
                                if (b) return a;
                                f.push(a)
                            }
                        }
                        return f
                    }
                    if (Ba.test(b.type) && !c.support.checkOn) return b.getAttribute("value") === null ? "on" : b.value;
                    return (b.value || "").replace(Za, "")
                }
                return w
            }
            var o = c.isFunction(a);
            return this.each(function (k) {
                var n = c(this),
                    r = a;
                if (this.nodeType === 1) {
                    if (o) r = a.call(this, k, n.val());
                    if (typeof r === "number") r += "";
                    if (c.isArray(r) && Ba.test(this.type)) this.checked = c.inArray(n.val(), r) >= 0;
                    else if (c.nodeName(this, "select")) {
                        var u = c.makeArray(r);
                        c("option", this).each(function () {
                            this.selected = c.inArray(c(this).val(), u) >= 0
                        });
                        if (!u.length) this.selectedIndex = -1
                    } else this.value = r
                }
            })
        }
    });
    c.extend({
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function (a, b, d, f) {
            if (!a || a.nodeType === 3 || a.nodeType === 8) return w;
            if (f && b in c.attrFn) return c(a)[b](d);
            f = a.nodeType !== 1 || !c.isXMLDoc(a);
            var e = d !== w;
            b = f && c.props[b] || b;
            if (a.nodeType === 1) {
                var j = $a.test(b);
                if (b in a && f && !j) {
                    if (e) {
                        b === "type" && ab.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
                        a[b] = d
                    }
                    if (c.nodeName(a, "form") && a.getAttributeNode(b)) return a.getAttributeNode(b).nodeValue;
                    if (b === "tabIndex") return (b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : bb.test(a.nodeName) || cb.test(a.nodeName) && a.href ? 0 : w;
                    return a[b]
                }
                if (!c.support.style && f && b === "style") {
                    if (e) a.style.cssText = "" + d;
                    return a.style.cssText
                }
                e && a.setAttribute(b, "" + d);
                a = !c.support.hrefNormalized && f && j ? a.getAttribute(b, 2) : a.getAttribute(b);
                return a === null ? w : a
            }
            return c.style(a, b, d)
        }
    });
    var O = /\.(.*)$/,
        db = function (a) {
            return a.replace(/[^\w\s\.\|`]/g, function (b) {
                return "\\" + b
            })
        };
    c.event = {
        add: function (a, b, d, f) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                if (a.setInterval && a !== A && !a.frameElement) a = A;
                var e, j;
                if (d.handler) {
                    e = d;
                    d = e.handler
                }
                if (!d.guid) d.guid = c.guid++;
                if (j = c.data(a)) {
                    var i = j.events = j.events || {},
                        o = j.handle;
                    if (!o) j.handle = o = function () {
                        return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem, arguments) : w
                    };
                    o.elem = a;
                    b = b.split(" ");
                    for (var k, n = 0, r; k = b[n++];) {
                        j = e ? c.extend({}, e) : {
                            handler: d,
                            data: f
                        };
                        if (k.indexOf(".") > -1) {
                            r = k.split(".");
                            k = r.shift();
                            j.namespace = r.slice(0).sort().join(".")
                        } else {
                            r = [];
                            j.namespace = ""
                        }
                        j.type = k;
                        j.guid = d.guid;
                        var u = i[k],
                            z = c.event.special[k] || {};
                        if (!u) {
                            u = i[k] = [];
                            if (!z.setup || z.setup.call(a, f, r, o) === false) if (a.addEventListener) a.addEventListener(k, o, false);
                            else a.attachEvent && a.attachEvent("on" + k, o)
                        }
                        if (z.add) {
                            z.add.call(a, j);
                            if (!j.handler.guid) j.handler.guid = d.guid
                        }
                        u.push(j);
                        c.event.global[k] = true
                    }
                    a = null
                }
            }
        },
        global: {},
        remove: function (a, b, d, f) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                var e, j = 0,
                    i, o, k, n, r, u, z = c.data(a),
                    C = z && z.events;
                if (z && C) {
                    if (b && b.type) {
                        d = b.handler;
                        b = b.type
                    }
                    if (!b || typeof b === "string" && b.charAt(0) === ".") {
                        b = b || "";
                        for (e in C) c.event.remove(a, e + b)
                    } else {
                        for (b = b.split(" "); e = b[j++];) {
                            n = e;
                            i = e.indexOf(".") < 0;
                            o = [];
                            if (!i) {
                                o = e.split(".");
                                e = o.shift();
                                k = new RegExp("(^|\\.)" + c.map(o.slice(0).sort(), db).join("\\.(?:.*\\.)?") + "(\\.|$)")
                            }
                            if (r = C[e]) if (d) {
                                n = c.event.special[e] || {};
                                for (B = f || 0; B < r.length; B++) {
                                    u = r[B];
                                    if (d.guid === u.guid) {
                                        if (i || k.test(u.namespace)) {
                                            f == null && r.splice(B--, 1);
                                            n.remove && n.remove.call(a, u)
                                        }
                                        if (f != null) break
                                    }
                                }
                                if (r.length === 0 || f != null && r.length === 1) {
                                    if (!n.teardown || n.teardown.call(a, o) === false) Ca(a, e, z.handle);
                                    delete C[e]
                                }
                            } else
                            for (var B = 0; B < r.length; B++) {
                                u = r[B];
                                if (i || k.test(u.namespace)) {
                                    c.event.remove(a, n, u.handler, B);
                                    r.splice(B--, 1)
                                }
                            }
                        }
                        if (c.isEmptyObject(C)) {
                            if (b = z.handle) b.elem = null;
                            delete z.events;
                            delete z.handle;
                            c.isEmptyObject(z) && c.removeData(a)
                        }
                    }
                }
            }
        },
        trigger: function (a, b, d, f) {
            var e = a.type || a;
            if (!f) {
                a = typeof a === "object" ? a[G] ? a : c.extend(c.Event(e), a) : c.Event(e);
                if (e.indexOf("!") >= 0) {
                    a.type = e = e.slice(0, -1);
                    a.exclusive = true
                }
                if (!d) {
                    a.stopPropagation();
                    c.event.global[e] && c.each(c.cache, function () {
                        this.events && this.events[e] && c.event.trigger(a, b, this.handle.elem)
                    })
                }
                if (!d || d.nodeType === 3 || d.nodeType === 8) return w;
                a.result = w;
                a.target = d;
                b = c.makeArray(b);
                b.unshift(a)
            }
            a.currentTarget = d;
            (f = c.data(d, "handle")) && f.apply(d, b);
            f = d.parentNode || d.ownerDocument;
            try {
                if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()])) if (d["on" + e] && d["on" + e].apply(d, b) === false) a.result = false
            } catch (j) {}
            if (!a.isPropagationStopped() && f) c.event.trigger(a, b, f, true);
            else if (!a.isDefaultPrevented()) {
                f = a.target;
                var i, o = c.nodeName(f, "a") && e === "click",
                    k = c.event.special[e] || {};
                if ((!k._default || k._default.call(d, a) === false) && !o && !(f && f.nodeName && c.noData[f.nodeName.toLowerCase()])) {
                    try {
                        if (f[e]) {
                            if (i = f["on" + e]) f["on" + e] = null;
                            c.event.triggered = true;
                            f[e]()
                        }
                    } catch (n) {}
                    if (i) f["on" + e] = i;
                    c.event.triggered = false
                }
            }
        },
        handle: function (a) {
            var b, d, f, e;
            a = arguments[0] = c.event.fix(a || A.event);
            a.currentTarget = this;
            b = a.type.indexOf(".") < 0 && !a.exclusive;
            if (!b) {
                d = a.type.split(".");
                a.type = d.shift();
                f = new RegExp("(^|\\.)" + d.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")
            }
            e = c.data(this, "events");
            d = e[a.type];
            if (e && d) {
                d = d.slice(0);
                e = 0;
                for (var j = d.length; e < j; e++) {
                    var i = d[e];
                    if (b || f.test(i.namespace)) {
                        a.handler = i.handler;
                        a.data = i.data;
                        a.handleObj = i;
                        i = i.handler.apply(this, arguments);
                        if (i !== w) {
                            a.result = i;
                            if (i === false) {
                                a.preventDefault();
                                a.stopPropagation()
                            }
                        }
                        if (a.isImmediatePropagationStopped()) break
                    }
                }
            }
            return a.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (a) {
            if (a[G]) return a;
            var b = a;
            a = c.Event(b);
            for (var d = this.props.length, f; d;) {
                f = this.props[--d];
                a[f] = b[f]
            }
            if (!a.target) a.target = a.srcElement || s;
            if (a.target.nodeType === 3) a.target = a.target.parentNode;
            if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            if (a.pageX == null && a.clientX != null) {
                b = s.documentElement;
                d = s.body;
                a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
                a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
            }
            if (!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode)) a.which = a.charCode || a.keyCode;
            if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
            if (!a.which && a.button !== w) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
            return a
        },
        guid: 1E8,
        proxy: c.proxy,
        special: {
            ready: {
                setup: c.bindReady,
                teardown: c.noop
            },
            live: {
                add: function (a) {
                    c.event.add(this, a.origType, c.extend({}, a, {
                        handler: oa
                    }))
                },
                remove: function (a) {
                    var b = true,
                        d = a.origType.replace(O, "");
                    c.each(c.data(this, "events").live || [], function () {
                        if (d === this.origType.replace(O, "")) return b = false
                    });
                    b && c.event.remove(this, a.origType, oa)
                }
            },
            beforeunload: {
                setup: function (a, b, d) {
                    if (this.setInterval) this.onbeforeunload = d;
                    return false
                },
                teardown: function (a, b) {
                    if (this.onbeforeunload === b) this.onbeforeunload = null
                }
            }
        }
    };
    var Ca = s.removeEventListener ?
    function (a, b, d) {
        a.removeEventListener(b, d, false)
    } : function (a, b, d) {
        a.detachEvent("on" + b, d)
    };
    c.Event = function (a) {
        if (!this.preventDefault) return new c.Event(a);
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else this.type = a;
        this.timeStamp = J();
        this[G] = true
    };
    c.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = Z;
            var a = this.originalEvent;
            if (a) {
                a.preventDefault && a.preventDefault();
                a.returnValue = false
            }
        },
        stopPropagation: function () {
            this.isPropagationStopped = Z;
            var a = this.originalEvent;
            if (a) {
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = true
            }
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = Z;
            this.stopPropagation()
        },
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y
    };
    var Da = function (a) {
        var b = a.relatedTarget;
        try {
            for (; b && b !== this;) b = b.parentNode;
            if (b !== this) {
                a.type = a.data;
                c.event.handle.apply(this, arguments)
            }
        } catch (d) {}
    },
        Ea = function (a) {
            a.type = a.data;
            c.event.handle.apply(this, arguments)
        };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        c.event.special[a] = {
            setup: function (d) {
                c.event.add(this, b, d && d.selector ? Ea : Da, a)
            },
            teardown: function (d) {
                c.event.remove(this, b, d && d.selector ? Ea : Da)
            }
        }
    });
    if (!c.support.submitBubbles) c.event.special.submit = {
        setup: function () {
            if (this.nodeName.toLowerCase() !== "form") {
                c.event.add(this, "click.specialSubmit", function (a) {
                    var b = a.target,
                        d = b.type;
                    if ((d === "submit" || d === "image") && c(b).closest("form").length) return na("submit", this, arguments)
                });
                c.event.add(this, "keypress.specialSubmit", function (a) {
                    var b = a.target,
                        d = b.type;
                    if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) return na("submit", this, arguments)
                })
            } else
            return false
        },
        teardown: function () {
            c.event.remove(this, ".specialSubmit")
        }
    };
    if (!c.support.changeBubbles) {
        var da = /textarea|input|select/i,
            ea, Fa = function (a) {
                var b = a.type,
                    d = a.value;
                if (b === "radio" || b === "checkbox") d = a.checked;
                else if (b === "select-multiple") d = a.selectedIndex > -1 ? c.map(a.options, function (f) {
                    return f.selected
                }).join("-") : "";
                else if (a.nodeName.toLowerCase() === "select") d = a.selectedIndex;
                return d
            },
            fa = function (a, b) {
                var d = a.target,
                    f, e;
                if (!(!da.test(d.nodeName) || d.readOnly)) {
                    f = c.data(d, "_change_data");
                    e = Fa(d);
                    if (a.type !== "focusout" || d.type !== "radio") c.data(d, "_change_data", e);
                    if (!(f === w || e === f)) if (f != null || e) {
                        a.type = "change";
                        return c.event.trigger(a, b, d)
                    }
                }
            };
        c.event.special.change = {
            filters: {
                focusout: fa,
                click: function (a) {
                    var b = a.target,
                        d = b.type;
                    if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") return fa.call(this, a)
                },
                keydown: function (a) {
                    var b = a.target,
                        d = b.type;
                    if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") return fa.call(this, a)
                },
                beforeactivate: function (a) {
                    a = a.target;
                    c.data(a, "_change_data", Fa(a))
                }
            },
            setup: function () {
                if (this.type === "file") return false;
                for (var a in ea) c.event.add(this, a + ".specialChange", ea[a]);
                return da.test(this.nodeName)
            },
            teardown: function () {
                c.event.remove(this, ".specialChange");
                return da.test(this.nodeName)
            }
        };
        ea = c.event.special.change.filters
    }
    s.addEventListener && c.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        function d(f) {
            f = c.event.fix(f);
            f.type = b;
            return c.event.handle.call(this, f)
        }
        c.event.special[b] = {
            setup: function () {
                this.addEventListener(a, d, true)
            },
            teardown: function () {
                this.removeEventListener(a, d, true)
            }
        }
    });
    c.each(["bind", "one"], function (a, b) {
        c.fn[b] = function (d, f, e) {
            if (typeof d === "object") {
                for (var j in d) this[b](j, f, d[j], e);
                return this
            }
            if (c.isFunction(f)) {
                e = f;
                f = w
            }
            var i = b === "one" ? c.proxy(e, function (k) {
                c(this).unbind(k, i);
                return e.apply(this, arguments)
            }) : e;
            if (d === "unload" && b !== "one") this.one(d, f, e);
            else {
                j = 0;
                for (var o = this.length; j < o; j++) c.event.add(this[j], d, i, f)
            }
            return this
        }
    });
    c.fn.extend({
        unbind: function (a, b) {
            if (typeof a === "object" && !a.preventDefault) for (var d in a) this.unbind(d, a[d]);
            else {
                d = 0;
                for (var f = this.length; d < f; d++) c.event.remove(this[d], a, b)
            }
            return this
        },
        delegate: function (a, b, d, f) {
            return this.live(b, d, f, a)
        },
        undelegate: function (a, b, d) {
            return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
        },
        trigger: function (a, b) {
            return this.each(function () {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            if (this[0]) {
                a = c.Event(a);
                a.preventDefault();
                a.stopPropagation();
                c.event.trigger(a, b, this[0]);
                return a.result
            }
        },
        toggle: function (a) {
            for (var b = arguments, d = 1; d < b.length;) c.proxy(a, b[d++]);
            return this.click(c.proxy(a, function (f) {
                var e = (c.data(this, "lastToggle" + a.guid) || 0) % d;
                c.data(this, "lastToggle" + a.guid, e + 1);
                f.preventDefault();
                return b[e].apply(this, arguments) || false
            }))
        },
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var Ga = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    c.each(["live", "die"], function (a, b) {
        c.fn[b] = function (d, f, e, j) {
            var i, o = 0,
                k, n, r = j || this.selector,
                u = j ? this : c(this.context);
            if (c.isFunction(f)) {
                e = f;
                f = w
            }
            for (d = (d || "").split(" ");
            (i = d[o++]) != null;) {
                j = O.exec(i);
                k = "";
                if (j) {
                    k = j[0];
                    i = i.replace(O, "")
                }
                if (i === "hover") d.push("mouseenter" + k, "mouseleave" + k);
                else {
                    n = i;
                    if (i === "focus" || i === "blur") {
                        d.push(Ga[i] + k);
                        i += k
                    } else i = (Ga[i] || i) + k;
                    b === "live" ? u.each(function () {
                        c.event.add(this, pa(i, r), {
                            data: f,
                            selector: r,
                            handler: e,
                            origType: i,
                            origHandler: e,
                            preType: n
                        })
                    }) : u.unbind(pa(i, r), e)
                }
            }
            return this
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (a, b) {
        c.fn[b] = function (d) {
            return d ? this.bind(b, d) : this.trigger(b)
        };
        if (c.attrFn) c.attrFn[b] = true
    });
    A.attachEvent && !A.addEventListener && A.attachEvent("onunload", function () {
        for (var a in c.cache) if (c.cache[a].handle) try {
            c.event.remove(c.cache[a].handle.elem)
        } catch (b) {}
    });
    (function () {
        function a(g) {
            for (var h = "", l, m = 0; g[m]; m++) {
                l = g[m];
                if (l.nodeType === 3 || l.nodeType === 4) h += l.nodeValue;
                else if (l.nodeType !== 8) h += a(l.childNodes)
            }
            return h
        }
        function b(g, h, l, m, q, p) {
            q = 0;
            for (var v = m.length; q < v; q++) {
                var t = m[q];
                if (t) {
                    t = t[g];
                    for (var y = false; t;) {
                        if (t.sizcache === l) {
                            y = m[t.sizset];
                            break
                        }
                        if (t.nodeType === 1 && !p) {
                            t.sizcache = l;
                            t.sizset = q
                        }
                        if (t.nodeName.toLowerCase() === h) {
                            y = t;
                            break
                        }
                        t = t[g]
                    }
                    m[q] = y
                }
            }
        }
        function d(g, h, l, m, q, p) {
            q = 0;
            for (var v = m.length; q < v; q++) {
                var t = m[q];
                if (t) {
                    t = t[g];
                    for (var y = false; t;) {
                        if (t.sizcache === l) {
                            y = m[t.sizset];
                            break
                        }
                        if (t.nodeType === 1) {
                            if (!p) {
                                t.sizcache = l;
                                t.sizset = q
                            }
                            if (typeof h !== "string") {
                                if (t === h) {
                                    y = true;
                                    break
                                }
                            } else if (k.filter(h, [t]).length > 0) {
                                y = t;
                                break
                            }
                        }
                        t = t[g]
                    }
                    m[q] = y
                }
            }
        }
        var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            e = 0,
            j = Object.prototype.toString,
            i = false,
            o = true;
        [0, 0].sort(function () {
            o = false;
            return 0
        });
        var k = function (g, h, l, m) {
            l = l || [];
            var q = h = h || s;
            if (h.nodeType !== 1 && h.nodeType !== 9) return [];
            if (!g || typeof g !== "string") return l;
            for (var p = [], v, t, y, S, H = true, M = x(h), I = g;
            (f.exec(""), v = f.exec(I)) !== null;) {
                I = v[3];
                p.push(v[1]);
                if (v[2]) {
                    S = v[3];
                    break
                }
            }
            if (p.length > 1 && r.exec(g)) if (p.length === 2 && n.relative[p[0]]) t = ga(p[0] + p[1], h);
            else
            for (t = n.relative[p[0]] ? [h] : k(p.shift(), h); p.length;) {
                g = p.shift();
                if (n.relative[g]) g += p.shift();
                t = ga(g, t)
            } else {
                if (!m && p.length > 1 && h.nodeType === 9 && !M && n.match.ID.test(p[0]) && !n.match.ID.test(p[p.length - 1])) {
                    v = k.find(p.shift(), h, M);
                    h = v.expr ? k.filter(v.expr, v.set)[0] : v.set[0]
                }
                if (h) {
                    v = m ? {
                        expr: p.pop(),
                        set: z(m)
                    } : k.find(p.pop(), p.length === 1 && (p[0] === "~" || p[0] === "+") && h.parentNode ? h.parentNode : h, M);
                    t = v.expr ? k.filter(v.expr, v.set) : v.set;
                    if (p.length > 0) y = z(t);
                    else H = false;
                    for (; p.length;) {
                        var D = p.pop();
                        v = D;
                        if (n.relative[D]) v = p.pop();
                        else D = "";
                        if (v == null) v = h;
                        n.relative[D](y, v, M)
                    }
                } else y = []
            }
            y || (y = t);
            y || k.error(D || g);
            if (j.call(y) === "[object Array]") if (H) if (h && h.nodeType === 1) for (g = 0; y[g] != null; g++) {
                if (y[g] && (y[g] === true || y[g].nodeType === 1 && E(h, y[g]))) l.push(t[g])
            } else
            for (g = 0; y[g] != null; g++) y[g] && y[g].nodeType === 1 && l.push(t[g]);
            else l.push.apply(l, y);
            else z(y, l);
            if (S) {
                k(S, q, l, m);
                k.uniqueSort(l)
            }
            return l
        };
        k.uniqueSort = function (g) {
            if (B) {
                i = o;
                g.sort(B);
                if (i) for (var h = 1; h < g.length; h++) g[h] === g[h - 1] && g.splice(h--, 1)
            }
            return g
        };
        k.matches = function (g, h) {
            return k(g, null, null, h)
        };
        k.find = function (g, h, l) {
            var m, q;
            if (!g) return [];
            for (var p = 0, v = n.order.length; p < v; p++) {
                var t = n.order[p];
                if (q = n.leftMatch[t].exec(g)) {
                    var y = q[1];
                    q.splice(1, 1);
                    if (y.substr(y.length - 1) !== "\\") {
                        q[1] = (q[1] || "").replace(/\\/g, "");
                        m = n.find[t](q, h, l);
                        if (m != null) {
                            g = g.replace(n.match[t], "");
                            break
                        }
                    }
                }
            }
            m || (m = h.getElementsByTagName("*"));
            return {
                set: m,
                expr: g
            }
        };
        k.filter = function (g, h, l, m) {
            for (var q = g, p = [], v = h, t, y, S = h && h[0] && x(h[0]); g && h.length;) {
                for (var H in n.filter) if ((t = n.leftMatch[H].exec(g)) != null && t[2]) {
                    var M = n.filter[H],
                        I, D;
                    D = t[1];
                    y = false;
                    t.splice(1, 1);
                    if (D.substr(D.length - 1) !== "\\") {
                        if (v === p) p = [];
                        if (n.preFilter[H]) if (t = n.preFilter[H](t, v, l, p, m, S)) {
                            if (t === true) continue
                        } else y = I = true;
                        if (t) for (var U = 0;
                        (D = v[U]) != null; U++) if (D) {
                            I = M(D, t, U, v);
                            var Ha = m ^ !! I;
                            if (l && I != null) if (Ha) y = true;
                            else v[U] = false;
                            else if (Ha) {
                                p.push(D);
                                y = true
                            }
                        }
                        if (I !== w) {
                            l || (v = p);
                            g = g.replace(n.match[H], "");
                            if (!y) return [];
                            break
                        }
                    }
                }
                if (g === q) if (y == null) k.error(g);
                else
                break;
                q = g
            }
            return v
        };
        k.error = function (g) {
            throw "Syntax error, unrecognized expression: " + g;
        };
        var n = k.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function (g) {
                    return g.getAttribute("href")
                }
            },
            relative: {
                "+": function (g, h) {
                    var l = typeof h === "string",
                        m = l && !/\W/.test(h);
                    l = l && !m;
                    if (m) h = h.toLowerCase();
                    m = 0;
                    for (var q = g.length, p; m < q; m++) if (p = g[m]) {
                        for (;
                        (p = p.previousSibling) && p.nodeType !== 1;);
                        g[m] = l || p && p.nodeName.toLowerCase() === h ? p || false : p === h
                    }
                    l && k.filter(h, g, true)
                },
                ">": function (g, h) {
                    var l = typeof h === "string";
                    if (l && !/\W/.test(h)) {
                        h = h.toLowerCase();
                        for (var m = 0, q = g.length; m < q; m++) {
                            var p = g[m];
                            if (p) {
                                l = p.parentNode;
                                g[m] = l.nodeName.toLowerCase() === h ? l : false
                            }
                        }
                    } else {
                        m = 0;
                        for (q = g.length; m < q; m++) if (p = g[m]) g[m] = l ? p.parentNode : p.parentNode === h;
                        l && k.filter(h, g, true)
                    }
                },
                "": function (g, h, l) {
                    var m = e++,
                        q = d;
                    if (typeof h === "string" && !/\W/.test(h)) {
                        var p = h = h.toLowerCase();
                        q = b
                    }
                    q("parentNode", h, m, g, p, l)
                },
                "~": function (g, h, l) {
                    var m = e++,
                        q = d;
                    if (typeof h === "string" && !/\W/.test(h)) {
                        var p = h = h.toLowerCase();
                        q = b
                    }
                    q("previousSibling", h, m, g, p, l)
                }
            },
            find: {
                ID: function (g, h, l) {
                    if (typeof h.getElementById !== "undefined" && !l) return (g = h.getElementById(g[1])) ? [g] : []
                },
                NAME: function (g, h) {
                    if (typeof h.getElementsByName !== "undefined") {
                        var l = [];
                        h = h.getElementsByName(g[1]);
                        for (var m = 0, q = h.length; m < q; m++) h[m].getAttribute("name") === g[1] && l.push(h[m]);
                        return l.length === 0 ? null : l
                    }
                },
                TAG: function (g, h) {
                    return h.getElementsByTagName(g[1])
                }
            },
            preFilter: {
                CLASS: function (g, h, l, m, q, p) {
                    g = " " + g[1].replace(/\\/g, "") + " ";
                    if (p) return g;
                    p = 0;
                    for (var v;
                    (v = h[p]) != null; p++) if (v) if (q ^ (v.className && (" " + v.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) l || m.push(v);
                    else if (l) h[p] = false;
                    return false
                },
                ID: function (g) {
                    return g[1].replace(/\\/g, "")
                },
                TAG: function (g) {
                    return g[1].toLowerCase()
                },
                CHILD: function (g) {
                    if (g[1] === "nth") {
                        var h = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
                        g[2] = h[1] + (h[2] || 1) - 0;
                        g[3] = h[3] - 0
                    }
                    g[0] = e++;
                    return g
                },
                ATTR: function (g, h, l, m, q, p) {
                    h = g[1].replace(/\\/g, "");
                    if (!p && n.attrMap[h]) g[1] = n.attrMap[h];
                    if (g[2] === "~=") g[4] = " " + g[4] + " ";
                    return g
                },
                PSEUDO: function (g, h, l, m, q) {
                    if (g[1] === "not") if ((f.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) g[3] = k(g[3], null, null, h);
                    else {
                        g = k.filter(g[3], h, l, true ^ q);
                        l || m.push.apply(m, g);
                        return false
                    } else if (n.match.POS.test(g[0]) || n.match.CHILD.test(g[0])) return true;
                    return g
                },
                POS: function (g) {
                    g.unshift(true);
                    return g
                }
            },
            filters: {
                enabled: function (g) {
                    return g.disabled === false && g.type !== "hidden"
                },
                disabled: function (g) {
                    return g.disabled === true
                },
                checked: function (g) {
                    return g.checked === true
                },
                selected: function (g) {
                    return g.selected === true
                },
                parent: function (g) {
                    return !!g.firstChild
                },
                empty: function (g) {
                    return !g.firstChild
                },
                has: function (g, h, l) {
                    return !!k(l[3], g).length
                },
                header: function (g) {
                    return /h\d/i.test(g.nodeName)
                },
                text: function (g) {
                    return "text" === g.type
                },
                radio: function (g) {
                    return "radio" === g.type
                },
                checkbox: function (g) {
                    return "checkbox" === g.type
                },
                file: function (g) {
                    return "file" === g.type
                },
                password: function (g) {
                    return "password" === g.type
                },
                submit: function (g) {
                    return "submit" === g.type
                },
                image: function (g) {
                    return "image" === g.type
                },
                reset: function (g) {
                    return "reset" === g.type
                },
                button: function (g) {
                    return "button" === g.type || g.nodeName.toLowerCase() === "button"
                },
                input: function (g) {
                    return /input|select|textarea|button/i.test(g.nodeName)
                }
            },
            setFilters: {
                first: function (g, h) {
                    return h === 0
                },
                last: function (g, h, l, m) {
                    return h === m.length - 1
                },
                even: function (g, h) {
                    return h % 2 === 0
                },
                odd: function (g, h) {
                    return h % 2 === 1
                },
                lt: function (g, h, l) {
                    return h < l[3] - 0
                },
                gt: function (g, h, l) {
                    return h > l[3] - 0
                },
                nth: function (g, h, l) {
                    return l[3] - 0 === h
                },
                eq: function (g, h, l) {
                    return l[3] - 0 === h
                }
            },
            filter: {
                PSEUDO: function (g, h, l, m) {
                    var q = h[1],
                        p = n.filters[q];
                    if (p) return p(g, l, h, m);
                    else if (q === "contains") return (g.textContent || g.innerText || a([g]) || "").indexOf(h[3]) >= 0;
                    else if (q === "not") {
                        h = h[3];
                        l = 0;
                        for (m = h.length; l < m; l++) if (h[l] === g) return false;
                        return true
                    } else k.error("Syntax error, unrecognized expression: " + q)
                },
                CHILD: function (g, h) {
                    var l = h[1],
                        m = g;
                    switch (l) {
                    case "only":
                    case "first":
                        for (; m = m.previousSibling;) if (m.nodeType === 1) return false;
                        if (l === "first") return true;
                        m = g;
                    case "last":
                        for (; m = m.nextSibling;) if (m.nodeType === 1) return false;
                        return true;
                    case "nth":
                        l = h[2];
                        var q = h[3];
                        if (l === 1 && q === 0) return true;
                        h = h[0];
                        var p = g.parentNode;
                        if (p && (p.sizcache !== h || !g.nodeIndex)) {
                            var v = 0;
                            for (m = p.firstChild; m; m = m.nextSibling) if (m.nodeType === 1) m.nodeIndex = ++v;
                            p.sizcache = h
                        }
                        g = g.nodeIndex - q;
                        return l === 0 ? g === 0 : g % l === 0 && g / l >= 0
                    }
                },
                ID: function (g, h) {
                    return g.nodeType === 1 && g.getAttribute("id") === h
                },
                TAG: function (g, h) {
                    return h === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === h
                },
                CLASS: function (g, h) {
                    return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(h) > -1
                },
                ATTR: function (g, h) {
                    var l = h[1];
                    g = n.attrHandle[l] ? n.attrHandle[l](g) : g[l] != null ? g[l] : g.getAttribute(l);
                    l = g + "";
                    var m = h[2];
                    h = h[4];
                    return g == null ? m === "!=" : m === "=" ? l === h : m === "*=" ? l.indexOf(h) >= 0 : m === "~=" ? (" " + l + " ").indexOf(h) >= 0 : !h ? l && g !== false : m === "!=" ? l !== h : m === "^=" ? l.indexOf(h) === 0 : m === "$=" ? l.substr(l.length - h.length) === h : m === "|=" ? l === h || l.substr(0, h.length + 1) === h + "-" : false
                },
                POS: function (g, h, l, m) {
                    var q = n.setFilters[h[2]];
                    if (q) return q(g, l, h, m)
                }
            }
        },
            r = n.match.POS;
        for (var u in n.match) {
            n.match[u] = new RegExp(n.match[u].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            n.leftMatch[u] = new RegExp(/(^(?:.|\r|\n)*?)/.source + n.match[u].source.replace(/\\(\d+)/g, function (g, h) {
                return "\\" + (h - 0 + 1)
            }))
        }
        var z = function (g, h) {
            g = Array.prototype.slice.call(g, 0);
            if (h) {
                h.push.apply(h, g);
                return h
            }
            return g
        };
        try {
            Array.prototype.slice.call(s.documentElement.childNodes, 0)
        } catch (C) {
            z = function (g, h) {
                h = h || [];
                if (j.call(g) === "[object Array]") Array.prototype.push.apply(h, g);
                else if (typeof g.length === "number") for (var l = 0, m = g.length; l < m; l++) h.push(g[l]);
                else
                for (l = 0; g[l]; l++) h.push(g[l]);
                return h
            }
        }
        var B;
        if (s.documentElement.compareDocumentPosition) B = function (g, h) {
            if (!g.compareDocumentPosition || !h.compareDocumentPosition) {
                if (g == h) i = true;
                return g.compareDocumentPosition ? -1 : 1
            }
            g = g.compareDocumentPosition(h) & 4 ? -1 : g === h ? 0 : 1;
            if (g === 0) i = true;
            return g
        };
        else if ("sourceIndex" in s.documentElement) B = function (g, h) {
            if (!g.sourceIndex || !h.sourceIndex) {
                if (g == h) i = true;
                return g.sourceIndex ? -1 : 1
            }
            g = g.sourceIndex - h.sourceIndex;
            if (g === 0) i = true;
            return g
        };
        else if (s.createRange) B = function (g, h) {
            if (!g.ownerDocument || !h.ownerDocument) {
                if (g == h) i = true;
                return g.ownerDocument ? -1 : 1
            }
            var l = g.ownerDocument.createRange(),
                m = h.ownerDocument.createRange();
            l.setStart(g, 0);
            l.setEnd(g, 0);
            m.setStart(h, 0);
            m.setEnd(h, 0);
            g = l.compareBoundaryPoints(Range.START_TO_END, m);
            if (g === 0) i = true;
            return g
        };
        (function () {
            var g = s.createElement("div"),
                h = "script" + (new Date).getTime();
            g.innerHTML = "<a name='" + h + "'/>";
            var l = s.documentElement;
            l.insertBefore(g, l.firstChild);
            if (s.getElementById(h)) {
                n.find.ID = function (m, q, p) {
                    if (typeof q.getElementById !== "undefined" && !p) return (q = q.getElementById(m[1])) ? q.id === m[1] || typeof q.getAttributeNode !== "undefined" && q.getAttributeNode("id").nodeValue === m[1] ? [q] : w : []
                };
                n.filter.ID = function (m, q) {
                    var p = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
                    return m.nodeType === 1 && p && p.nodeValue === q
                }
            }
            l.removeChild(g);
            l = g = null
        })();
        (function () {
            var g = s.createElement("div");
            g.appendChild(s.createComment(""));
            if (g.getElementsByTagName("*").length > 0) n.find.TAG = function (h, l) {
                l = l.getElementsByTagName(h[1]);
                if (h[1] === "*") {
                    h = [];
                    for (var m = 0; l[m]; m++) l[m].nodeType === 1 && h.push(l[m]);
                    l = h
                }
                return l
            };
            g.innerHTML = "<a href='#'></a>";
            if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") n.attrHandle.href = function (h) {
                return h.getAttribute("href", 2)
            };
            g = null
        })();
        s.querySelectorAll &&
        function () {
            var g = k,
                h = s.createElement("div");
            h.innerHTML = "<p class='TEST'></p>";
            if (!(h.querySelectorAll && h.querySelectorAll(".TEST").length === 0)) {
                k = function (m, q, p, v) {
                    q = q || s;
                    if (!v && q.nodeType === 9 && !x(q)) try {
                        return z(q.querySelectorAll(m), p)
                    } catch (t) {}
                    return g(m, q, p, v)
                };
                for (var l in g) k[l] = g[l];
                h = null
            }
        }();
        (function () {
            var g = s.createElement("div");
            g.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
                g.lastChild.className = "e";
                if (g.getElementsByClassName("e").length !== 1) {
                    n.order.splice(1, 0, "CLASS");
                    n.find.CLASS = function (h, l, m) {
                        if (typeof l.getElementsByClassName !== "undefined" && !m) return l.getElementsByClassName(h[1])
                    };
                    g = null
                }
            }
        })();
        var E = s.compareDocumentPosition ?
        function (g, h) {
            return !!(g.compareDocumentPosition(h) & 16)
        } : function (g, h) {
            return g !== h && (g.contains ? g.contains(h) : true)
        },
            x = function (g) {
                return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
            },
            ga = function (g, h) {
                var l = [],
                    m = "",
                    q;
                for (h = h.nodeType ? [h] : h; q = n.match.PSEUDO.exec(g);) {
                    m += q[0];
                    g = g.replace(n.match.PSEUDO, "")
                }
                g = n.relative[g] ? g + "*" : g;
                q = 0;
                for (var p = h.length; q < p; q++) k(g, h[q], l);
                return k.filter(m, l)
            };
        c.find = k;
        c.expr = k.selectors;
        c.expr[":"] = c.expr.filters;
        c.unique = k.uniqueSort;
        c.text = a;
        c.isXMLDoc = x;
        c.contains = E
    })();
    var eb = /Until$/,
        fb = /^(?:parents|prevUntil|prevAll)/,
        gb = /,/;
    R = Array.prototype.slice;
    var Ia = function (a, b, d) {
        if (c.isFunction(b)) return c.grep(a, function (e, j) {
            return !!b.call(e, j, e) === d
        });
        else if (b.nodeType) return c.grep(a, function (e) {
            return e === b === d
        });
        else if (typeof b === "string") {
            var f = c.grep(a, function (e) {
                return e.nodeType === 1
            });
            if (Ua.test(b)) return c.filter(b, f, !d);
            else b = c.filter(b, f)
        }
        return c.grep(a, function (e) {
            return c.inArray(e, b) >= 0 === d
        })
    };
    c.fn.extend({
        find: function (a) {
            for (var b = this.pushStack("", "find", a), d = 0, f = 0, e = this.length; f < e; f++) {
                d = b.length;
                c.find(a, this[f], b);
                if (f > 0) for (var j = d; j < b.length; j++) for (var i = 0; i < d; i++) if (b[i] === b[j]) {
                    b.splice(j--, 1);
                    break
                }
            }
            return b
        },
        has: function (a) {
            var b = c(a);
            return this.filter(function () {
                for (var d = 0, f = b.length; d < f; d++) if (c.contains(this, b[d])) return true
            })
        },
        not: function (a) {
            return this.pushStack(Ia(this, a, false), "not", a)
        },
        filter: function (a) {
            return this.pushStack(Ia(this, a, true), "filter", a)
        },
        is: function (a) {
            return !!a && c.filter(a, this).length > 0
        },
        closest: function (a, b) {
            if (c.isArray(a)) {
                var d = [],
                    f = this[0],
                    e, j = {},
                    i;
                if (f && a.length) {
                    e = 0;
                    for (var o = a.length; e < o; e++) {
                        i = a[e];
                        j[i] || (j[i] = c.expr.match.POS.test(i) ? c(i, b || this.context) : i)
                    }
                    for (; f && f.ownerDocument && f !== b;) {
                        for (i in j) {
                            e = j[i];
                            if (e.jquery ? e.index(f) > -1 : c(f).is(e)) {
                                d.push({
                                    selector: i,
                                    elem: f
                                });
                                delete j[i]
                            }
                        }
                        f = f.parentNode
                    }
                }
                return d
            }
            var k = c.expr.match.POS.test(a) ? c(a, b || this.context) : null;
            return this.map(function (n, r) {
                for (; r && r.ownerDocument && r !== b;) {
                    if (k ? k.index(r) > -1 : c(r).is(a)) return r;
                    r = r.parentNode
                }
                return null
            })
        },
        index: function (a) {
            if (!a || typeof a === "string") return c.inArray(this[0], a ? c(a) : this.parent().children());
            return c.inArray(a.jquery ? a[0] : a, this)
        },
        add: function (a, b) {
            a = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a);
            b = c.merge(this.get(), a);
            return this.pushStack(qa(a[0]) || qa(b[0]) ? b : c.unique(b))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    });
    c.each({
        parent: function (a) {
            return (a = a.parentNode) && a.nodeType !== 11 ? a : null
        },
        parents: function (a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function (a) {
            return c.nth(a, 2, "nextSibling")
        },
        prev: function (a) {
            return c.nth(a, 2, "previousSibling")
        },
        nextAll: function (a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function (a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function (a) {
            return c.sibling(a.parentNode.firstChild, a)
        },
        children: function (a) {
            return c.sibling(a.firstChild)
        },
        contents: function (a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
        }
    }, function (a, b) {
        c.fn[a] = function (d, f) {
            var e = c.map(this, b, d);
            eb.test(a) || (f = d);
            if (f && typeof f === "string") e = c.filter(f, e);
            e = this.length > 1 ? c.unique(e) : e;
            if ((this.length > 1 || gb.test(f)) && fb.test(a)) e = e.reverse();
            return this.pushStack(e, a, R.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function (a, b, d) {
            if (d) a = ":not(" + a + ")";
            return c.find.matches(a, b)
        },
        dir: function (a, b, d) {
            var f = [];
            for (a = a[b]; a && a.nodeType !== 9 && (d === w || a.nodeType !== 1 || !c(a).is(d));) {
                a.nodeType === 1 && f.push(a);
                a = a[b]
            }
            return f
        },
        nth: function (a, b, d) {
            b = b || 1;
            for (var f = 0; a; a = a[d]) if (a.nodeType === 1 && ++f === b) break;
            return a
        },
        sibling: function (a, b) {
            for (var d = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && d.push(a);
            return d
        }
    });
    var Ja = / jQuery\d+="(?:\d+|null)"/g,
        V = /^\s+/,
        Ka = /(<([\w:]+)[^>]*?)\/>/g,
        hb = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
        La = /<([\w:]+)/,
        ib = /<tbody/i,
        jb = /<|&#?\w+;/,
        ta = /<script|<object|<embed|<option|<style/i,
        ua = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ma = function (a, b, d) {
            return hb.test(d) ? a : b + "></" + d + ">"
        },
        F = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    F.optgroup = F.option;
    F.tbody = F.tfoot = F.colgroup = F.caption = F.thead;
    F.th = F.td;
    if (!c.support.htmlSerialize) F._default = [1, "div<div>", "</div>"];
    c.fn.extend({
        text: function (a) {
            if (c.isFunction(a)) return this.each(function (b) {
                var d = c(this);
                d.text(a.call(this, b, d.text()))
            });
            if (typeof a !== "object" && a !== w) return this.empty().append((this[0] && this[0].ownerDocument || s).createTextNode(a));
            return c.text(this)
        },
        wrapAll: function (a) {
            if (c.isFunction(a)) return this.each(function (d) {
                c(this).wrapAll(a.call(this, d))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(true);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function () {
                    for (var d = this; d.firstChild && d.firstChild.nodeType === 1;) d = d.firstChild;
                    return d
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            if (c.isFunction(a)) return this.each(function (b) {
                c(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = c(this),
                    d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            return this.each(function () {
                c(this).wrapAll(a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, true, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, true, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function (b) {
                this.parentNode.insertBefore(b, this)
            });
            else if (arguments.length) {
                var a = c(arguments[0]);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function (b) {
                this.parentNode.insertBefore(b, this.nextSibling)
            });
            else if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, c(arguments[0]).toArray());
                return a
            }
        },
        remove: function (a, b) {
            for (var d = 0, f;
            (f = this[d]) != null; d++) if (!a || c.filter(a, [f]).length) {
                if (!b && f.nodeType === 1) {
                    c.cleanData(f.getElementsByTagName("*"));
                    c.cleanData([f])
                }
                f.parentNode && f.parentNode.removeChild(f)
            }
            return this
        },
        empty: function () {
            for (var a = 0, b;
            (b = this[a]) != null; a++) for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function (a) {
            var b = this.map(function () {
                if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
                    var d = this.outerHTML,
                        f = this.ownerDocument;
                    if (!d) {
                        d = f.createElement("div");
                        d.appendChild(this.cloneNode(true));
                        d = d.innerHTML
                    }
                    return c.clean([d.replace(Ja, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(V, "")], f)[0]
                } else
                return this.cloneNode(true)
            });
            if (a === true) {
                ra(this, b);
                ra(this.find("*"), b.find("*"))
            }
            return b
        },
        html: function (a) {
            if (a === w) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ja, "") : null;
            else if (typeof a === "string" && !ta.test(a) && (c.support.leadingWhitespace || !V.test(a)) && !F[(La.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Ka, Ma);
                try {
                    for (var b = 0, d = this.length; b < d; b++) if (this[b].nodeType === 1) {
                        c.cleanData(this[b].getElementsByTagName("*"));
                        this[b].innerHTML = a
                    }
                } catch (f) {
                    this.empty().append(a)
                }
            } else c.isFunction(a) ? this.each(function (e) {
                var j = c(this),
                    i = j.html();
                j.empty().append(function () {
                    return a.call(this, e, i)
                })
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (c.isFunction(a)) return this.each(function (b) {
                    var d = c(this),
                        f = d.html();
                    d.replaceWith(a.call(this, b, f))
                });
                if (typeof a !== "string") a = c(a).detach();
                return this.each(function () {
                    var b = this.nextSibling,
                        d = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(d).append(a)
                })
            } else
            return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
        },
        detach: function (a) {
            return this.remove(a, true)
        },
        domManip: function (a, b, d) {
            function f(u) {
                return c.nodeName(u, "table") ? u.getElementsByTagName("tbody")[0] || u.appendChild(u.ownerDocument.createElement("tbody")) : u
            }
            var e, j, i = a[0],
                o = [],
                k;
            if (!c.support.checkClone && arguments.length === 3 && typeof i === "string" && ua.test(i)) return this.each(function () {
                c(this).domManip(a, b, d, true)
            });
            if (c.isFunction(i)) return this.each(function (u) {
                var z = c(this);
                a[0] = i.call(this, u, b ? z.html() : w);
                z.domManip(a, b, d)
            });
            if (this[0]) {
                e = i && i.parentNode;
                e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {
                    fragment: e
                } : sa(a, this, o);
                k = e.fragment;
                if (j = k.childNodes.length === 1 ? (k = k.firstChild) : k.firstChild) {
                    b = b && c.nodeName(j, "tr");
                    for (var n = 0, r = this.length; n < r; n++) d.call(b ? f(this[n], j) : this[n], n > 0 || e.cacheable || this.length > 1 ? k.cloneNode(true) : k)
                }
                o.length && c.each(o, Qa)
            }
            return this
        }
    });
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        c.fn[a] = function (d) {
            var f = [];
            d = c(d);
            var e = this.length === 1 && this[0].parentNode;
            if (e && e.nodeType === 11 && e.childNodes.length === 1 && d.length === 1) {
                d[b](this[0]);
                return this
            } else {
                e = 0;
                for (var j = d.length; e < j; e++) {
                    var i = (e > 0 ? this.clone(true) : this).get();
                    c.fn[b].apply(c(d[e]), i);
                    f = f.concat(i)
                }
                return this.pushStack(f, a, d.selector)
            }
        }
    });
    c.extend({
        clean: function (a, b, d, f) {
            b = b || s;
            if (typeof b.createElement === "undefined") b = b.ownerDocument || b[0] && b[0].ownerDocument || s;
            for (var e = [], j = 0, i;
            (i = a[j]) != null; j++) {
                if (typeof i === "number") i += "";
                if (i) {
                    if (typeof i === "string" && !jb.test(i)) i = b.createTextNode(i);
                    else if (typeof i === "string") {
                        i = i.replace(Ka, Ma);
                        var o = (La.exec(i) || ["", ""])[1].toLowerCase(),
                            k = F[o] || F._default,
                            n = k[0],
                            r = b.createElement("div");
                        for (r.innerHTML = k[1] + i + k[2]; n--;) r = r.lastChild;
                        if (!c.support.tbody) {
                            n = ib.test(i);
                            o = o === "table" && !n ? r.firstChild && r.firstChild.childNodes : k[1] === "<table>" && !n ? r.childNodes : [];
                            for (k = o.length - 1; k >= 0; --k) c.nodeName(o[k], "tbody") && !o[k].childNodes.length && o[k].parentNode.removeChild(o[k])
                        }!c.support.leadingWhitespace && V.test(i) && r.insertBefore(b.createTextNode(V.exec(i)[0]), r.firstChild);
                        i = r.childNodes
                    }
                    if (i.nodeType) e.push(i);
                    else e = c.merge(e, i)
                }
            }
            if (d) for (j = 0; e[j]; j++) if (f && c.nodeName(e[j], "script") && (!e[j].type || e[j].type.toLowerCase() === "text/javascript")) f.push(e[j].parentNode ? e[j].parentNode.removeChild(e[j]) : e[j]);
            else {
                e[j].nodeType === 1 && e.splice.apply(e, [j + 1, 0].concat(c.makeArray(e[j].getElementsByTagName("script"))));
                d.appendChild(e[j])
            }
            return e
        },
        cleanData: function (a) {
            for (var b, d, f = c.cache, e = c.event.special, j = c.support.deleteExpando, i = 0, o;
            (o = a[i]) != null; i++) if (d = o[c.expando]) {
                b = f[d];
                if (b.events) for (var k in b.events) e[k] ? c.event.remove(o, k) : Ca(o, k, b.handle);
                if (j) delete o[c.expando];
                else o.removeAttribute && o.removeAttribute(c.expando);
                delete f[d]
            }
        }
    });
    var kb = /z-?index|font-?weight|opacity|zoom|line-?height/i,
        Na = /alpha\([^)]*\)/,
        Oa = /opacity=([^)]*)/,
        ha = /float/i,
        ia = /-([a-z])/ig,
        lb = /([A-Z])/g,
        mb = /^-?\d+(?:px)?$/i,
        nb = /^-?\d/,
        ob = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        pb = ["Left", "Right"],
        qb = ["Top", "Bottom"],
        rb = s.defaultView && s.defaultView.getComputedStyle,
        Pa = c.support.cssFloat ? "cssFloat" : "styleFloat",
        ja = function (a, b) {
            return b.toUpperCase()
        };
    c.fn.css = function (a, b) {
        return X(this, a, b, true, function (d, f, e) {
            if (e === w) return c.curCSS(d, f);
            if (typeof e === "number" && !kb.test(f)) e += "px";
            c.style(d, f, e)
        })
    };
    c.extend({
        style: function (a, b, d) {
            if (!a || a.nodeType === 3 || a.nodeType === 8) return w;
            if ((b === "width" || b === "height") && parseFloat(d) < 0) d = w;
            var f = a.style || a,
                e = d !== w;
            if (!c.support.opacity && b === "opacity") {
                if (e) {
                    f.zoom = 1;
                    b = parseInt(d, 10) + "" === "NaN" ? "" : "alpha(opacity=" + d * 100 + ")";
                    a = f.filter || c.curCSS(a, "filter") || "";
                    f.filter = Na.test(a) ? a.replace(Na, b) : b
                }
                return f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(Oa.exec(f.filter)[1]) / 100 + "" : ""
            }
            if (ha.test(b)) b = Pa;
            b = b.replace(ia, ja);
            if (e) f[b] = d;
            return f[b]
        },
        css: function (a, b, d, f) {
            if (b === "width" || b === "height") {
                var e, j = b === "width" ? pb : qb;

                function i() {
                    e = b === "width" ? a.offsetWidth : a.offsetHeight;
                    f !== "border" && c.each(j, function () {
                        f || (e -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0);
                        if (f === "margin") e += parseFloat(c.curCSS(a, "margin" + this, true)) || 0;
                        else e -= parseFloat(c.curCSS(a, "border" + this + "Width", true)) || 0
                    })
                }
                a.offsetWidth !== 0 ? i() : c.swap(a, ob, i);
                return Math.max(0, Math.round(e))
            }
            return c.curCSS(a, b, d)
        },
        curCSS: function (a, b, d) {
            var f, e = a.style;
            if (!c.support.opacity && b === "opacity" && a.currentStyle) {
                f = Oa.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
                return f === "" ? "1" : f
            }
            if (ha.test(b)) b = Pa;
            if (!d && e && e[b]) f = e[b];
            else if (rb) {
                if (ha.test(b)) b = "float";
                b = b.replace(lb, "-$1").toLowerCase();
                e = a.ownerDocument.defaultView;
                if (!e) return null;
                if (a = e.getComputedStyle(a, null)) f = a.getPropertyValue(b);
                if (b === "opacity" && f === "") f = "1"
            } else if (a.currentStyle) {
                d = b.replace(ia, ja);
                f = a.currentStyle[b] || a.currentStyle[d];
                if (!mb.test(f) && nb.test(f)) {
                    b = e.left;
                    var j = a.runtimeStyle.left;
                    a.runtimeStyle.left = a.currentStyle.left;
                    e.left = d === "fontSize" ? "1em" : f || 0;
                    f = e.pixelLeft + "px";
                    e.left = b;
                    a.runtimeStyle.left = j
                }
            }
            return f
        },
        swap: function (a, b, d) {
            var f = {};
            for (var e in b) {
                f[e] = a.style[e];
                a.style[e] = b[e]
            }
            d.call(a);
            for (e in b) a.style[e] = f[e]
        }
    });
    if (c.expr && c.expr.filters) {
        c.expr.filters.hidden = function (a) {
            var b = a.offsetWidth,
                d = a.offsetHeight,
                f = a.nodeName.toLowerCase() === "tr";
            return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none"
        };
        c.expr.filters.visible = function (a) {
            return !c.expr.filters.hidden(a)
        }
    }
    var sb = J(),
        tb = /<script(.|\s)*?\/script>/gi,
        ub = /select|textarea/i,
        vb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
        N = /=\?(&|$)/,
        ka = /\?/,
        wb = /(\?|&)_=.*?(&|$)/,
        xb = /^(\w+:)?\/\/([^\/?#]+)/,
        yb = /%20/g,
        zb = c.fn.load;
    c.fn.extend({
        load: function (a, b, d) {
            if (typeof a !== "string") return zb.call(this, a);
            else if (!this.length) return this;
            var f = a.indexOf(" ");
            if (f >= 0) {
                var e = a.slice(f, a.length);
                a = a.slice(0, f)
            }
            f = "GET";
            if (b) if (c.isFunction(b)) {
                d = b;
                b = null
            } else if (typeof b === "object") {
                b = c.param(b, c.ajaxSettings.traditional);
                f = "POST"
            }
            var j = this;
            c.ajax({
                url: a,
                type: f,
                dataType: "html",
                data: b,
                complete: function (i, o) {
                    if (o === "success" || o === "notmodified") j.html(e ? c("<div />").append(i.responseText.replace(tb, "")).find(e) : i.responseText);
                    d && j.each(d, [i.responseText, o, i])
                }
            });
            return this
        },
        serialize: function () {
            return c.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || ub.test(this.nodeName) || vb.test(this.type))
            }).map(function (a, b) {
                a = c(this).val();
                return a == null ? null : c.isArray(a) ? c.map(a, function (d) {
                    return {
                        name: b.name,
                        value: d
                    }
                }) : {
                    name: b.name,
                    value: a
                }
            }).get()
        }
    });
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        c.fn[b] = function (d) {
            return this.bind(b, d)
        }
    });
    c.extend({
        get: function (a, b, d, f) {
            if (c.isFunction(b)) {
                f = f || d;
                d = b;
                b = null
            }
            return c.ajax({
                type: "GET",
                url: a,
                data: b,
                success: d,
                dataType: f
            })
        },
        getScript: function (a, b) {
            return c.get(a, null, b, "script")
        },
        getJSON: function (a, b, d) {
            return c.get(a, b, d, "json")
        },
        post: function (a, b, d, f) {
            if (c.isFunction(b)) {
                f = f || d;
                d = b;
                b = {}
            }
            return c.ajax({
                type: "POST",
                url: a,
                data: b,
                success: d,
                dataType: f
            })
        },
        ajaxSetup: function (a) {
            c.extend(c.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: A.XMLHttpRequest && (A.location.protocol !== "file:" || !A.ActiveXObject) ?
            function () {
                return new A.XMLHttpRequest
            } : function () {
                try {
                    return new A.ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {}
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        etag: {},
        ajax: function (a) {
            function b() {
                e.success && e.success.call(k, o, i, x);
                e.global && f("ajaxSuccess", [x, e])
            }
            function d() {
                e.complete && e.complete.call(k, x, i);
                e.global && f("ajaxComplete", [x, e]);
                e.global && !--c.active && c.event.trigger("ajaxStop")
            }
            function f(q, p) {
                (e.context ? c(e.context) : c.event).trigger(q, p)
            }
            var e = c.extend(true, {}, c.ajaxSettings, a),
                j, i, o, k = a && a.context || e,
                n = e.type.toUpperCase();
            if (e.data && e.processData && typeof e.data !== "string") e.data = c.param(e.data, e.traditional);
            if (e.dataType === "jsonp") {
                if (n === "GET") N.test(e.url) || (e.url += (ka.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?");
                else if (!e.data || !N.test(e.data)) e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?";
                e.dataType = "json"
            }
            if (e.dataType === "json" && (e.data && N.test(e.data) || N.test(e.url))) {
                j = e.jsonpCallback || "jsonp" + sb++;
                if (e.data) e.data = (e.data + "").replace(N, "=" + j + "$1");
                e.url = e.url.replace(N, "=" + j + "$1");
                e.dataType = "script";
                A[j] = A[j] ||
                function (q) {
                    o = q;
                    b();
                    d();
                    A[j] = w;
                    try {
                        delete A[j]
                    } catch (p) {}
                    z && z.removeChild(C)
                }
            }
            if (e.dataType === "script" && e.cache === null) e.cache = false;
            if (e.cache === false && n === "GET") {
                var r = J(),
                    u = e.url.replace(wb, "$1_=" + r + "$2");
                e.url = u + (u === e.url ? (ka.test(e.url) ? "&" : "?") + "_=" + r : "")
            }
            if (e.data && n === "GET") e.url += (ka.test(e.url) ? "&" : "?") + e.data;
            e.global && !c.active++ && c.event.trigger("ajaxStart");
            r = (r = xb.exec(e.url)) && (r[1] && r[1] !== location.protocol || r[2] !== location.host);
            if (e.dataType === "script" && n === "GET" && r) {
                var z = s.getElementsByTagName("head")[0] || s.documentElement,
                    C = s.createElement("script");
                C.src = e.url;
                if (e.scriptCharset) C.charset = e.scriptCharset;
                if (!j) {
                    var B = false;
                    C.onload = C.onreadystatechange = function () {
                        if (!B && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            B = true;
                            b();
                            d();
                            C.onload = C.onreadystatechange = null;
                            z && C.parentNode && z.removeChild(C)
                        }
                    }
                }
                z.insertBefore(C, z.firstChild);
                return w
            }
            var E = false,
                x = e.xhr();
            if (x) {
                e.username ? x.open(n, e.url, e.async, e.username, e.password) : x.open(n, e.url, e.async);
                try {
                    if (e.data || a && a.contentType) x.setRequestHeader("Content-Type", e.contentType);
                    if (e.ifModified) {
                        c.lastModified[e.url] && x.setRequestHeader("If-Modified-Since", c.lastModified[e.url]);
                        c.etag[e.url] && x.setRequestHeader("If-None-Match", c.etag[e.url])
                    }
                    r || x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    x.setRequestHeader("Accept", e.dataType && e.accepts[e.dataType] ? e.accepts[e.dataType] + ", */*" : e.accepts._default)
                } catch (ga) {}
                if (e.beforeSend && e.beforeSend.call(k, x, e) === false) {
                    e.global && !--c.active && c.event.trigger("ajaxStop");
                    x.abort();
                    return false
                }
                e.global && f("ajaxSend", [x, e]);
                var g = x.onreadystatechange = function (q) {
                    if (!x || x.readyState === 0 || q === "abort") {
                        E || d();
                        E = true;
                        if (x) x.onreadystatechange = c.noop
                    } else if (!E && x && (x.readyState === 4 || q === "timeout")) {
                        E = true;
                        x.onreadystatechange = c.noop;
                        i = q === "timeout" ? "timeout" : !c.httpSuccess(x) ? "error" : e.ifModified && c.httpNotModified(x, e.url) ? "notmodified" : "success";
                        var p;
                        if (i === "success") try {
                            o = c.httpData(x, e.dataType, e)
                        } catch (v) {
                            i = "parsererror";
                            p = v
                        }
                        if (i === "success" || i === "notmodified") j || b();
                        else c.handleError(e, x, i, p);
                        d();
                        q === "timeout" && x.abort();
                        if (e.async) x = null
                    }
                };
                try {
                    var h = x.abort;
                    x.abort = function () {
                        x && h.call(x);
                        g("abort")
                    }
                } catch (l) {}
                e.async && e.timeout > 0 && setTimeout(function () {
                    x && !E && g("timeout")
                }, e.timeout);
                try {
                    x.send(n === "POST" || n === "PUT" || n === "DELETE" ? e.data : null)
                } catch (m) {
                    c.handleError(e, x, null, m);
                    d()
                }
                e.async || g();
                return x
            }
        },
        handleError: function (a, b, d, f) {
            if (a.error) a.error.call(a.context || a, b, d, f);
            if (a.global)(a.context ? c(a.context) : c.event).trigger("ajaxError", [b, a, f])
        },
        active: 0,
        httpSuccess: function (a) {
            try {
                return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223 || a.status === 0
            } catch (b) {}
            return false
        },
        httpNotModified: function (a, b) {
            var d = a.getResponseHeader("Last-Modified"),
                f = a.getResponseHeader("Etag");
            if (d) c.lastModified[b] = d;
            if (f) c.etag[b] = f;
            return a.status === 304 || a.status === 0
        },
        httpData: function (a, b, d) {
            var f = a.getResponseHeader("content-type") || "",
                e = b === "xml" || !b && f.indexOf("xml") >= 0;
            a = e ? a.responseXML : a.responseText;
            e && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
            if (d && d.dataFilter) a = d.dataFilter(a, b);
            if (typeof a === "string") if (b === "json" || !b && f.indexOf("json") >= 0) a = c.parseJSON(a);
            else if (b === "script" || !b && f.indexOf("javascript") >= 0) c.globalEval(a);
            return a
        },
        param: function (a, b) {
            function d(i, o) {
                if (c.isArray(o)) c.each(o, function (k, n) {
                    b || /\[\]$/.test(i) ? f(i, n) : d(i + "[" + (typeof n === "object" || c.isArray(n) ? k : "") + "]", n)
                });
                else!b && o != null && typeof o === "object" ? c.each(o, function (k, n) {
                    d(i + "[" + k + "]", n)
                }) : f(i, o)
            }
            function f(i, o) {
                o = c.isFunction(o) ? o() : o;
                e[e.length] = encodeURIComponent(i) + "=" + encodeURIComponent(o)
            }
            var e = [];
            if (b === w) b = c.ajaxSettings.traditional;
            if (c.isArray(a) || a.jquery) c.each(a, function () {
                f(this.name, this.value)
            });
            else
            for (var j in a) d(j, a[j]);
            return e.join("&").replace(yb, "+")
        }
    });
    var la = {},
        Ab = /toggle|show|hide/,
        Bb = /^([+-]=)?([\d+-.]+)(.*)$/,
        W, va = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    c.fn.extend({
        show: function (a, b) {
            if (a || a === 0) return this.animate(K("show", 3), a, b);
            else {
                a = 0;
                for (b = this.length; a < b; a++) {
                    var d = c.data(this[a], "olddisplay");
                    this[a].style.display = d || "";
                    if (c.css(this[a], "display") === "none") {
                        d = this[a].nodeName;
                        var f;
                        if (la[d]) f = la[d];
                        else {
                            var e = c("<" + d + " />").appendTo("body");
                            f = e.css("display");
                            if (f === "none") f = "block";
                            e.remove();
                            la[d] = f
                        }
                        c.data(this[a], "olddisplay", f)
                    }
                }
                a = 0;
                for (b = this.length; a < b; a++) this[a].style.display = c.data(this[a], "olddisplay") || "";
                return this
            }
        },
        hide: function (a, b) {
            if (a || a === 0) return this.animate(K("hide", 3), a, b);
            else {
                a = 0;
                for (b = this.length; a < b; a++) {
                    var d = c.data(this[a], "olddisplay");
                    !d && d !== "none" && c.data(this[a], "olddisplay", c.css(this[a], "display"))
                }
                a = 0;
                for (b = this.length; a < b; a++) this[a].style.display = "none";
                return this
            }
        },
        _toggle: c.fn.toggle,
        toggle: function (a, b) {
            var d = typeof a === "boolean";
            if (c.isFunction(a) && c.isFunction(b)) this._toggle.apply(this, arguments);
            else a == null || d ? this.each(function () {
                var f = d ? a : c(this).is(":hidden");
                c(this)[f ? "show" : "hide"]()
            }) : this.animate(K("toggle", 3), a, b);
            return this
        },
        fadeTo: function (a, b, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, d)
        },
        animate: function (a, b, d, f) {
            var e = c.speed(b, d, f);
            if (c.isEmptyObject(a)) return this.each(e.complete);
            return this[e.queue === false ? "each" : "queue"](function () {
                var j = c.extend({}, e),
                    i, o = this.nodeType === 1 && c(this).is(":hidden"),
                    k = this;
                for (i in a) {
                    var n = i.replace(ia, ja);
                    if (i !== n) {
                        a[n] = a[i];
                        delete a[i];
                        i = n
                    }
                    if (a[i] === "hide" && o || a[i] === "show" && !o) return j.complete.call(this);
                    if ((i === "height" || i === "width") && this.style) {
                        j.display = c.css(this, "display");
                        j.overflow = this.style.overflow
                    }
                    if (c.isArray(a[i])) {
                        (j.specialEasing = j.specialEasing || {})[i] = a[i][1];
                        a[i] = a[i][0]
                    }
                }
                if (j.overflow != null) this.style.overflow = "hidden";
                j.curAnim = c.extend({}, a);
                c.each(a, function (r, u) {
                    var z = new c.fx(k, j, r);
                    if (Ab.test(u)) z[u === "toggle" ? o ? "show" : "hide" : u](a);
                    else {
                        var C = Bb.exec(u),
                            B = z.cur(true) || 0;
                        if (C) {
                            u = parseFloat(C[2]);
                            var E = C[3] || "px";
                            if (E !== "px") {
                                k.style[r] = (u || 1) + E;
                                B = (u || 1) / z.cur(true) * B;
                                k.style[r] = B + E
                            }
                            if (C[1]) u = (C[1] === "-=" ? -1 : 1) * u + B;
                            z.custom(B, u, E)
                        } else z.custom(B, u, "")
                    }
                });
                return true
            })
        },
        stop: function (a, b) {
            var d = c.timers;
            a && this.queue([]);
            this.each(function () {
                for (var f = d.length - 1; f >= 0; f--) if (d[f].elem === this) {
                    b && d[f](true);
                    d.splice(f, 1)
                }
            });
            b || this.dequeue();
            return this
        }
    });
    c.each({
        slideDown: K("show", 1),
        slideUp: K("hide", 1),
        slideToggle: K("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function (a, b) {
        c.fn[a] = function (d, f) {
            return this.animate(b, d, f)
        }
    });
    c.extend({
        speed: function (a, b, d) {
            var f = a && typeof a === "object" ? a : {
                complete: d || !d && b || c.isFunction(a) && a,
                duration: a,
                easing: d && b || b && !c.isFunction(b) && b
            };
            f.duration = c.fx.off ? 0 : typeof f.duration === "number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default;
            f.old = f.complete;
            f.complete = function () {
                f.queue !== false && c(this).dequeue();
                c.isFunction(f.old) && f.old.call(this)
            };
            return f
        },
        easing: {
            linear: function (a, b, d, f) {
                return d + f * a
            },
            swing: function (a, b, d, f) {
                return (-Math.cos(a * Math.PI) / 2 + 0.5) * f + d
            }
        },
        timers: [],
        fx: function (a, b, d) {
            this.options = b;
            this.elem = a;
            this.prop = d;
            if (!b.orig) b.orig = {}
        }
    });
    c.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this);
            (c.fx.step[this.prop] || c.fx.step._default)(this);
            if ((this.prop === "height" || this.prop === "width") && this.elem.style) this.elem.style.display = "block"
        },
        cur: function (a) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            return (a = parseFloat(c.css(this.elem, this.prop, a))) && a > -10000 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0
        },
        custom: function (a, b, d) {
            function f(j) {
                return e.step(j)
            }
            this.startTime = J();
            this.start = a;
            this.end = b;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var e = this;
            f.elem = this.elem;
            if (f() && c.timers.push(f) && !W) W = setInterval(c.fx.tick, 13)
        },
        show: function () {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            c(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function (a) {
            var b = J(),
                d = true;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var f in this.options.curAnim) if (this.options.curAnim[f] !== true) d = false;
                if (d) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        a = c.data(this.elem, "olddisplay");
                        this.elem.style.display = a ? a : this.options.display;
                        if (c.css(this.elem, "display") === "none") this.elem.style.display = "block"
                    }
                    this.options.hide && c(this.elem).hide();
                    if (this.options.hide || this.options.show) for (var e in this.options.curAnim) c.style(this.elem, e, this.options.orig[e]);
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                e = b - this.startTime;
                this.state = e / this.options.duration;
                a = this.options.easing || (c.easing.swing ? "swing" : "linear");
                this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || a](this.state, e, 0, 1, this.options.duration);
                this.now = this.start + (this.end - this.start) * this.pos;
                this.update()
            }
            return true
        }
    };
    c.extend(c.fx, {
        tick: function () {
            for (var a = c.timers, b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1);
            a.length || c.fx.stop()
        },
        stop: function () {
            clearInterval(W);
            W = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                c.style(a.elem, "opacity", a.now)
            },
            _default: function (a) {
                if (a.elem.style && a.elem.style[a.prop] != null) a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit;
                else a.elem[a.prop] = a.now
            }
        }
    });
    if (c.expr && c.expr.filters) c.expr.filters.animated = function (a) {
        return c.grep(c.timers, function (b) {
            return a === b.elem
        }).length
    };
    c.fn.offset = "getBoundingClientRect" in s.documentElement ?
    function (a) {
        var b = this[0];
        if (a) return this.each(function (e) {
            c.offset.setOffset(this, a, e)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        var d = b.getBoundingClientRect(),
            f = b.ownerDocument;
        b = f.body;
        f = f.documentElement;
        return {
            top: d.top + (self.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0),
            left: d.left + (self.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)
        }
    } : function (a) {
        var b = this[0];
        if (a) return this.each(function (r) {
            c.offset.setOffset(this, a, r)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        c.offset.initialize();
        var d = b.offsetParent,
            f = b,
            e = b.ownerDocument,
            j, i = e.documentElement,
            o = e.body;
        f = (e = e.defaultView) ? e.getComputedStyle(b, null) : b.currentStyle;
        for (var k = b.offsetTop, n = b.offsetLeft;
        (b = b.parentNode) && b !== o && b !== i;) {
            if (c.offset.supportsFixedPosition && f.position === "fixed") break;
            j = e ? e.getComputedStyle(b, null) : b.currentStyle;
            k -= b.scrollTop;
            n -= b.scrollLeft;
            if (b === d) {
                k += b.offsetTop;
                n += b.offsetLeft;
                if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName))) {
                    k += parseFloat(j.borderTopWidth) || 0;
                    n += parseFloat(j.borderLeftWidth) || 0
                }
                f = d;
                d = b.offsetParent
            }
            if (c.offset.subtractsBorderForOverflowNotVisible && j.overflow !== "visible") {
                k += parseFloat(j.borderTopWidth) || 0;
                n += parseFloat(j.borderLeftWidth) || 0
            }
            f = j
        }
        if (f.position === "relative" || f.position === "static") {
            k += o.offsetTop;
            n += o.offsetLeft
        }
        if (c.offset.supportsFixedPosition && f.position === "fixed") {
            k += Math.max(i.scrollTop, o.scrollTop);
            n += Math.max(i.scrollLeft, o.scrollLeft)
        }
        return {
            top: k,
            left: n
        }
    };
    c.offset = {
        initialize: function () {
            var a = s.body,
                b = s.createElement("div"),
                d, f, e, j = parseFloat(c.curCSS(a, "marginTop", true)) || 0;
            c.extend(b.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            a.insertBefore(b, a.firstChild);
            d = b.firstChild;
            f = d.firstChild;
            e = d.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = f.offsetTop !== 5;
            this.doesAddBorderForTableAndCells = e.offsetTop === 5;
            f.style.position = "fixed";
            f.style.top = "20px";
            this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15;
            f.style.position = f.style.top = "";
            d.style.overflow = "hidden";
            d.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5;
            this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== j;
            a.removeChild(b);
            c.offset.initialize = c.noop
        },
        bodyOffset: function (a) {
            var b = a.offsetTop,
                d = a.offsetLeft;
            c.offset.initialize();
            if (c.offset.doesNotIncludeMarginInBodyOffset) {
                b += parseFloat(c.curCSS(a, "marginTop", true)) || 0;
                d += parseFloat(c.curCSS(a, "marginLeft", true)) || 0
            }
            return {
                top: b,
                left: d
            }
        },
        setOffset: function (a, b, d) {
            if (/static/.test(c.curCSS(a, "position"))) a.style.position = "relative";
            var f = c(a),
                e = f.offset(),
                j = parseInt(c.curCSS(a, "top", true), 10) || 0,
                i = parseInt(c.curCSS(a, "left", true), 10) || 0;
            if (c.isFunction(b)) b = b.call(a, d, e);
            d = {
                top: b.top - e.top + j,
                left: b.left - e.left + i
            };
            "using" in b ? b.using.call(a, d) : f.css(d)
        }
    };
    c.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                d = this.offset(),
                f = /^body|html$/i.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            d.top -= parseFloat(c.curCSS(a, "marginTop", true)) || 0;
            d.left -= parseFloat(c.curCSS(a, "marginLeft", true)) || 0;
            f.top += parseFloat(c.curCSS(b[0], "borderTopWidth", true)) || 0;
            f.left += parseFloat(c.curCSS(b[0], "borderLeftWidth", true)) || 0;
            return {
                top: d.top - f.top,
                left: d.left - f.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || s.body; a && !/^body|html$/i.test(a.nodeName) && c.css(a, "position") === "static";) a = a.offsetParent;
                return a
            })
        }
    });
    c.each(["Left", "Top"], function (a, b) {
        var d = "scroll" + b;
        c.fn[d] = function (f) {
            var e = this[0],
                j;
            if (!e) return null;
            if (f !== w) return this.each(function () {
                if (j = wa(this)) j.scrollTo(!a ? f : c(j).scrollLeft(), a ? f : c(j).scrollTop());
                else this[d] = f
            });
            else
            return (j = wa(e)) ? "pageXOffset" in j ? j[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && j.document.documentElement[d] || j.document.body[d] : e[d]
        }
    });
    c.each(["Height", "Width"], function (a, b) {
        var d = b.toLowerCase();
        c.fn["inner" + b] = function () {
            return this[0] ? c.css(this[0], d, false, "padding") : null
        };
        c.fn["outer" + b] = function (f) {
            return this[0] ? c.css(this[0], d, false, f ? "margin" : "border") : null
        };
        c.fn[d] = function (f) {
            var e = this[0];
            if (!e) return f == null ? null : this;
            if (c.isFunction(f)) return this.each(function (j) {
                var i = c(this);
                i[d](f.call(this, j, i[d]()))
            });
            return "scrollTo" in e && e.document ? e.document.compatMode === "CSS1Compat" && e.document.documentElement["client" + b] || e.document.body["client" + b] : e.nodeType === 9 ? Math.max(e.documentElement["client" + b], e.body["scroll" + b], e.documentElement["scroll" + b], e.body["offset" + b], e.documentElement["offset" + b]) : f === w ? c.css(e, d) : this.css(d, typeof f === "string" ? f : f + "px")
        }
    });
    A.jQuery = A.$ = c
})(window);
(function ($) {
    $.gritter = {};
    $.gritter.options = {
        fade_in_speed: 'medium',
        fade_out_speed: 1000,
        time: 6000
    }
    $.gritter.add = function (params) {
        try {
            return Gritter.add(params || {});
        } catch (e) {
            var err = 'Gritter Error: ' + e;
            (typeof(console) != 'undefined' && console.error) ? console.error(err, params) : alert(err);
        }
    }
    $.gritter.remove = function (id, params) {
        Gritter.removeSpecific(id, params || {});
    }
    $.gritter.removeAll = function (params) {
        Gritter.stop(params || {});
    }
    var Gritter = {
        fade_in_speed: '',
        fade_out_speed: '',
        time: '',
        _custom_timer: 0,
        _item_count: 0,
        _is_setup: 0,
        _tpl_close: '<div class="gritter-close"></div>',
        _tpl_item: '<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none"><div class="gritter-top"></div><div class="gritter-item">[[image]]<div class="[[class_name]]"><span class="gritter-title">[[username]]</span><p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',
        _tpl_wrap: '<div id="gritter-notice-wrapper"></div>',
        add: function (params) {
            if (!params.title || !params.text) {
                throw 'You need to fill out the first 2 params: "title" and "text"';
            }
            if (!this._is_setup) {
                this._runSetup();
            }
            var user = params.title,
                text = params.text,
                image = params.image || '',
                sticky = params.sticky || false,
                item_class = params.class_name || '',
                time_alive = params.time || '';
            this._verifyWrapper();
            this._item_count++;
            var number = this._item_count,
                tmp = this._tpl_item;
            $(['before_open', 'after_open', 'before_close', 'after_close']).each(function (i, val) {
                Gritter['_' + val + '_' + number] = ($.isFunction(params[val])) ? params[val] : function () {}
            });
            this._custom_timer = 0;
            if (time_alive) {
                this._custom_timer = time_alive;
            }
            var image_str = (image != '') ? '<img src="' + image + '" class="gritter-image" />' : '',
                class_name = (image != '') ? 'gritter-with-image' : 'gritter-without-image';
            tmp = this._str_replace(['[[username]]', '[[text]]', '[[image]]', '[[number]]', '[[class_name]]', '[[item_class]]'], [user, text, image_str, this._item_count, class_name, item_class], tmp);
            this['_before_open_' + number]();
            $('#gritter-notice-wrapper').append(tmp);
            var item = $('#gritter-item-' + this._item_count);
            item.fadeIn(this.fade_in_speed, function () {
                Gritter['_after_open_' + number]($(this));
            });
            if (!sticky) {
                this._setFadeTimer(item, number);
            }
            $(item).bind('mouseenter mouseleave', function (event) {
                if (event.type == 'mouseenter') {
                    if (!sticky) {
                        Gritter._restoreItemIfFading($(this), number);
                    }
                } else {
                    if (!sticky) {
                        Gritter._setFadeTimer($(this), number);
                    }
                }
                Gritter._hoverState($(this), event.type);
            });
            return number;
        },
        _countRemoveWrapper: function (unique_id, e) {
            e.remove();
            this['_after_close_' + unique_id](e);
            if ($('.gritter-item-wrapper').length == 0) {
                $('#gritter-notice-wrapper').remove();
            }
        },
        _fade: function (e, unique_id, params, unbind_events) {
            var params = params || {},
                fade = (typeof(params.fade) != 'undefined') ? params.fade : true;
            fade_out_speed = params.speed || this.fade_out_speed;
            this['_before_close_' + unique_id](e);
            if (unbind_events) {
                e.unbind('mouseenter mouseleave');
            }
            if (fade) {
                e.animate({
                    opacity: 0
                }, fade_out_speed, function () {
                    e.animate({
                        height: 0
                    }, 300, function () {
                        Gritter._countRemoveWrapper(unique_id, e);
                    })
                })
            } else {
                this._countRemoveWrapper(unique_id, e);
            }
        },
        _hoverState: function (e, type) {
            if (type == 'mouseenter') {
                e.addClass('hover');
                var find_img = e.find('img');
                (find_img.length) ? find_img.before(this._tpl_close) : e.find('span').before(this._tpl_close);
                e.find('.gritter-close').click(function () {
                    var unique_id = e.attr('id').split('-')[2];
                    Gritter.removeSpecific(unique_id, {}, e, true);
                });
            } else {
                e.removeClass('hover');
                e.find('.gritter-close').remove();
            }
        },
        removeSpecific: function (unique_id, params, e, unbind_events) {
            if (!e) {
                var e = $('#gritter-item-' + unique_id);
            }
            this._fade(e, unique_id, params || {}, unbind_events);
        },
        _restoreItemIfFading: function (e, unique_id) {
            clearTimeout(this['_int_id_' + unique_id]);
            e.stop().css({
                opacity: ''
            });
        },
        _runSetup: function () {
            for (opt in $.gritter.options) {
                this[opt] = $.gritter.options[opt];
            }
            this._is_setup = 1;
        },
        _setFadeTimer: function (e, unique_id) {
            var timer_str = (this._custom_timer) ? this._custom_timer : this.time;
            this['_int_id_' + unique_id] = setTimeout(function () {
                Gritter._fade(e, unique_id);
            }, timer_str);
        },
        stop: function (params) {
            var before_close = ($.isFunction(params.before_close)) ? params.before_close : function () {};
            var after_close = ($.isFunction(params.after_close)) ? params.after_close : function () {};
            var wrap = $('#gritter-notice-wrapper');
            before_close(wrap);
            wrap.fadeOut(function () {
                $(this).remove();
                after_close();
            });
        },
        _str_replace: function (search, replace, subject, count) {
            var i = 0,
                j = 0,
                temp = '',
                repl = '',
                sl = 0,
                fl = 0,
                f = [].concat(search),
                r = [].concat(replace),
                s = subject,
                ra = r instanceof Array,
                sa = s instanceof Array;
            s = [].concat(s);
            if (count) {
                this.window[count] = 0;
            }
            for (i = 0, sl = s.length; i < sl; i++) {
                if (s[i] === '') {
                    continue;
                }
                for (j = 0, fl = f.length; j < fl; j++) {
                    temp = s[i] + '';
                    repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                    s[i] = (temp).split(f[j]).join(repl);
                    if (count && s[i] !== temp) {
                        this.window[count] += (temp.length - s[i].length) / f[j].length;
                    }
                }
            }
            return sa ? s : s[0];
        },
        _verifyWrapper: function () {
            if ($('#gritter-notice-wrapper').length == 0) {
                $('body').append(this._tpl_wrap);
            }
        }
    }
})(jQuery);
(function ($) {
    $.timeago = function (timestamp) {
        if (timestamp instanceof Date) return inWords(timestamp);
        else if (typeof timestamp == "string") return inWords($.timeago.parse(timestamp));
        else
        return inWords($.timeago.datetime(timestamp));
    };
    var $t = $.timeago;
    $.extend($.timeago, {
        settings: {
            refreshMillis: 60000,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function (distanceMillis) {
            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
                distanceMillis = Math.abs(distanceMillis);
            }
            var seconds = distanceMillis / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }
            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) || seconds < 90 && substitute($l.minute, 1) || minutes < 45 && substitute($l.minutes, Math.round(minutes)) || minutes < 90 && substitute($l.hour, 1) || hours < 24 && substitute($l.hours, Math.round(hours)) || hours < 48 && substitute($l.day, 1) || days < 30 && substitute($l.days, Math.floor(days)) || days < 60 && substitute($l.month, 1) || days < 365 && substitute($l.months, Math.floor(days / 30)) || years < 2 && substitute($l.year, 1) || substitute($l.years, Math.floor(years));
            return $.trim([prefix, words, suffix].join(" "));
        },
        parse: function (iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d\d\d+/, "");
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
            return new Date(s);
        },
        datetime: function (elem) {
            var isTime = $(elem).get(0).tagName.toLowerCase() == "time";
            var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        }
    });
    $.fn.timeago = function () {
        var self = this;
        self.each(refresh);
        var $s = $t.settings;
        if ($s.refreshMillis > 0) {
            setInterval(function () {
                self.each(refresh);
            }, $s.refreshMillis);
        }
        return self;
    };

    function refresh() {
        var data = prepareData(this);
        if (!isNaN(data.datetime)) {
            $(this).text(inWords(data.datetime));
        }
        return this;
    }

    function prepareData(element) {
        element = $(element);
        if (!element.data("timeago")) {
            element.data("timeago", {
                datetime: $t.datetime(element)
            });
            var text = $.trim(element.text());
            if (text.length > 0) element.attr("title", text);
        }
        return element.data("timeago");
    }

    function inWords(date) {
        return $t.inWords(distance(date));
    }

    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }
    document.createElement("abbr");
    document.createElement("time");
})(jQuery);
(function ($) {
    $.belowthefold = function (element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.abovethetop = function (element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    $.rightofscreen = function (element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.leftofscreen = function (element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    $.inviewport = function (element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    $.extend($.expr[':'], {
        "below-the-fold": function (a, i, m) {
            return $.belowthefold(a, {
                threshold: 0
            });
        },
        "above-the-top": function (a, i, m) {
            return $.abovethetop(a, {
                threshold: 0
            });
        },
        "left-of-screen": function (a, i, m) {
            return $.leftofscreen(a, {
                threshold: 0
            });
        },
        "right-of-screen": function (a, i, m) {
            return $.rightofscreen(a, {
                threshold: 0
            });
        },
        "in-viewport": function (a, i, m) {
            return $.inviewport(a, {
                threshold: 0
            });
        }
    });
})(jQuery);
(function () {
    var fieldSelection = {
        getSelection: function () {
            var e = this.jquery ? this[0] : this;
            return (('selectionStart' in e &&
            function () {
                var l = e.selectionEnd - e.selectionStart;
                return {
                    start: e.selectionStart,
                    end: e.selectionEnd,
                    length: l,
                    text: e.value.substr(e.selectionStart, l)
                };
            }) || (document.selection &&
            function () {
                e.focus();
                var r = document.selection.createRange();
                if (r == null) {
                    return {
                        start: 0,
                        end: e.value.length,
                        length: 0
                    }
                }
                var re = e.createTextRange();
                var rc = re.duplicate();
                re.moveToBookmark(r.getBookmark());
                rc.setEndPoint('EndToStart', re);
                return {
                    start: rc.text.length,
                    end: rc.text.length + r.text.length,
                    length: r.text.length,
                    text: r.text
                };
            }) ||
            function () {
                return {
                    start: 0,
                    end: e.value.length,
                    length: 0
                };
            })();
        },
        replaceSelection: function () {
            var e = this.jquery ? this[0] : this;
            var text = arguments[0] || '';
            return (('selectionStart' in e &&
            function () {
                e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
                return this;
            }) || (document.selection &&
            function () {
                e.focus();
                document.selection.createRange().text = text;
                return this;
            }) ||
            function () {
                e.value += text;
                return this;
            })();
        }
    };
    jQuery.each(fieldSelection, function (i) {
        jQuery.fn[i] = this;
    });
})();
(function (j) {
    function ga(xa, ya) {
        function ha() {
            if (b.debugURLParam.test(N)) b.debugMode = true
        }
        this.flashVersion = 8;
        this.debugFlash = this.debugMode = false;
        this.useConsole = true;
        this.waitForWindowLoad = this.consoleOnly = false;
        this.nullURL = "about:blank";
        this.allowPolling = true;
        this.useFastPolling = false;
        this.useMovieStar = true;
        this.bgColor = "#ffffff";
        this.useHighPerformance = false;
        this.flashLoadTimeout = 1E3;
        this.wmode = null;
        this.allowFullScreen = true;
        this.allowScriptAccess = "always";
        this.useHTML5Audio = this.useFlashBlock = false;
        this.html5Test = /^probably$/i;
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: true
            },
            mp4: {
                related: ["aac", "m4a"],
                type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: true
            },
            ogg: {
                type: ["audio/ogg; codecs=vorbis"],
                required: false
            },
            wav: {
                type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: false
            }
        };
        this.defaultOptions = {
            autoLoad: false,
            stream: true,
            autoPlay: false,
            loops: 1,
            onid3: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onstop: null,
            onfinish: null,
            onbeforefinish: null,
            onbeforefinishtime: 5E3,
            onbeforefinishcomplete: null,
            onjustbeforefinish: null,
            onjustbeforefinishtime: 200,
            multiShot: true,
            multiShotEvents: false,
            position: null,
            pan: 0,
            type: null,
            volume: 100
        };
        this.flash9Options = {
            isMovieStar: null,
            usePeakData: false,
            useWaveformData: false,
            useEQData: false,
            onbufferchange: null,
            ondataerror: null
        };
        this.movieStarOptions = {
            onmetadata: null,
            useVideo: false,
            bufferTime: 3,
            serverURL: null,
            onconnect: null
        };
        this.version = null;
        this.versionNumber = "V2.96a.20100822";
        this.movieURL = null;
        this.url = xa || null;
        this.altURL = null;
        this.enabled = this.swfLoaded = false;
        this.o = null;
        this.movieID = "sm2-container";
        this.id = ya || "sm2movie";
        this.swfCSS = {
            swfDefault: "movieContainer",
            swfError: "swf_error",
            swfTimedout: "swf_timedout",
            swfUnblocked: "swf_unblocked",
            sm2Debug: "sm2_debug",
            highPerf: "high_performance",
            flashDebug: "flash_debug"
        };
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.isFullScreen = this.muted = false;
        this.isIE = navigator.userAgent.match(/MSIE/i);
        this.isSafari = navigator.userAgent.match(/safari/i);
        this.debugID = "soundmanager-debug";
        this.debugURLParam = /([#?&])debug=1/i;
        this.didFlashBlock = this.specialWmodeCase = false;
        this.filePattern = null;
        this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        };
        this.baseMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.netStreamTypes = ["aac", "flv", "mov", "mp4", "m4v", "f4v", "m4a", "mp4v", "3gp", "3g2"];
        this.netStreamPattern = RegExp("\\.(" + this.netStreamTypes.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = this.baseMimeTypes;
        this.features = {
            buffering: false,
            peakData: false,
            waveformData: false,
            eqData: false,
            movieStar: false
        };
        this.sandbox = {
            type: null,
            types: {
                remote: "remote (domain-based) rules",
                localWithFile: "local with file access (no internet access)",
                localWithNetwork: "local with network (internet access only, no local access)",
                localTrusted: "local, trusted (local+internet access)"
            },
            description: null,
            noRemote: null,
            noLocal: null
        };
        this.hasHTML5 = null;
        this.html5 = {
            usingFlash: null
        };
        this.ignoreFlash = false;
        var W, b = this,
            y, t = navigator.userAgent,
            N = j.location.href.toString(),
            k = this.flashVersion,
            ia, O, z = [],
            E = false,
            F = false,
            p = false,
            v = false,
            ja = false,
            G, q, ka, A, B, la, X, Y, w, ma, P, Q, H, Z, na, R, $, oa, pa, I, qa, J = null,
            aa = null,
            K, ba, L, S, ca, n, T = false,
            da = false,
            ra, sa, C = null,
            ta, U, x = false,
            M, u, ea, ua, va = t.match(/pre\//i),
            za = t.match(/(ipad|iphone)/i);
        t.match(/mobile/i);
        var fa = typeof document.hasFocus !== "undefined" ? document.hasFocus() : null,
            D = typeof document.hasFocus === "undefined" && this.isSafari,
            wa = !D;
        this._use_maybe = N.match(/sm2\-useHTML5Maybe\=1/i);
        this._overHTTP = document.location ? document.location.protocol.match(/http/i) : null;
        this.useAltURL = !this._overHTTP;
        if (za || va) {
            b.useHTML5Audio = true;
            b.ignoreFlash = true
        }
        if (va || this._use_maybe) b.html5Test = /^(probably|maybe)$/i;
        this.supported = function () {
            return C ? p && !v : b.useHTML5Audio && b.hasHTML5
        };
        this.getMovie = function (c) {
            return b.isIE ? j[c] : b.isSafari ? y(c) || document[c] : y(c)
        };
        this.loadFromXML = function (c) {
            try {
                b.o._loadFromXML(c)
            } catch (a) {
                I();
                return true
            }
        };
        this.createSound = function (c) {
            function a() {
                f = S(f);
                b.sounds[e.id] = new W(e);
                b.soundIDs.push(e.id);
                return b.sounds[e.id]
            }
            var f = null,
                g = null,
                e = null;
            if (!p) throw ca("soundManager.createSound(): " + K("notReady"), arguments.callee.caller);
            if (arguments.length === 2) c = {
                id: arguments[0],
                url: arguments[1]
            };
            e = f = q(c);
            if (n(e.id, true)) return b.sounds[e.id];
            if (U(e)) {
                g = a();
                g._setup_html5(e)
            } else {
                if (k > 8 && b.useMovieStar) {
                    if (e.isMovieStar === null) e.isMovieStar = e.serverURL || (e.type ? e.type.match(b.netStreamPattern) : false) || e.url.match(b.netStreamPattern) ? true : false;
                    if (e.isMovieStar) if (e.usePeakData) e.usePeakData = false
                }
                g = a();
                if (k === 8) b.o._createSound(e.id, e.onjustbeforefinishtime, e.loops || 1);
                else {
                    b.o._createSound(e.id, e.url, e.onjustbeforefinishtime, e.usePeakData, e.useWaveformData, e.useEQData, e.isMovieStar, e.isMovieStar ? e.useVideo : false, e.isMovieStar ? e.bufferTime : false, e.loops || 1, e.serverURL, e.duration || null, e.totalBytes || null, e.autoPlay, true);
                    if (!e.serverURL) {
                        g.connected = true;
                        e.onconnect && e.onconnect.apply(g)
                    }
                }
            }
            if (e.autoLoad || e.autoPlay) if (g) if (b.isHTML5) {
                g.autobuffer = "auto";
                g.preload = "auto"
            } else g.load(e);
            e.autoPlay && g.play();
            return g
        };
        this.createVideo = function (c) {
            if (arguments.length === 2) c = {
                id: arguments[0],
                url: arguments[1]
            };
            if (k >= 9) {
                c.isMovieStar = true;
                c.useVideo = true
            } else
            return false;
            return b.createSound(c)
        };
        this.destroyVideo = this.destroySound = function (c, a) {
            if (!n(c)) return false;
            for (var f = 0; f < b.soundIDs.length; f++) b.soundIDs[f] === c && b.soundIDs.splice(f, 1);
            b.sounds[c].unload();
            a || b.sounds[c].destruct();
            delete b.sounds[c]
        };
        this.load = function (c, a) {
            if (!n(c)) return false;
            return b.sounds[c].load(a)
        };
        this.unload = function (c) {
            if (!n(c)) return false;
            return b.sounds[c].unload()
        };
        this.start = this.play = function (c, a) {
            if (!p) throw ca("soundManager.play(): " + K("notReady"), arguments.callee.caller);
            if (!n(c)) {
                a instanceof Object || (a = {
                    url: a
                });
                if (a && a.url) {
                    a.id = c;
                    return b.createSound(a).play()
                } else
                return false
            }
            return b.sounds[c].play(a)
        };
        this.setPosition = function (c, a) {
            if (!n(c)) return false;
            return b.sounds[c].setPosition(a)
        };
        this.stop = function (c) {
            if (!n(c)) return false;
            return b.sounds[c].stop()
        };
        this.stopAll = function () {
            for (var c in b.sounds) b.sounds[c] instanceof W && b.sounds[c].stop()
        };
        this.pause = function (c) {
            if (!n(c)) return false;
            return b.sounds[c].pause()
        };
        this.pauseAll = function () {
            for (var c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].pause()
        };
        this.resume = function (c) {
            if (!n(c)) return false;
            return b.sounds[c].resume()
        };
        this.resumeAll = function () {
            for (var c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].resume()
        };
        this.togglePause = function (c) {
            if (!n(c)) return false;
            return b.sounds[c].togglePause()
        };
        this.setPan = function (c, a) {
            if (!n(c)) return false;
            return b.sounds[c].setPan(a)
        };
        this.setVolume = function (c, a) {
            if (!n(c)) return false;
            return b.sounds[c].setVolume(a)
        };
        this.mute = function (c) {
            var a = 0;
            if (typeof c !== "string") c = null;
            if (c) {
                if (!n(c)) return false;
                return b.sounds[c].mute()
            } else {
                for (a = b.soundIDs.length; a--;) b.sounds[b.soundIDs[a]].mute();
                b.muted = true
            }
        };
        this.muteAll = function () {
            b.mute()
        };
        this.unmute = function (c) {
            if (typeof c !== "string") c = null;
            if (c) {
                if (!n(c)) return false;
                return b.sounds[c].unmute()
            } else {
                for (c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].unmute();
                b.muted = false
            }
        };
        this.unmuteAll = function () {
            b.unmute()
        };
        this.toggleMute = function (c) {
            if (!n(c)) return false;
            return b.sounds[c].toggleMute()
        };
        this.getMemoryUse = function () {
            if (k === 8) return 0;
            if (b.o) return parseInt(b.o._getMemoryUse(), 10)
        };
        this.disable = function (c) {
            if (typeof c === "undefined") c = false;
            if (v) return false;
            v = true;
            for (var a = b.soundIDs.length; a--;) pa(b.sounds[b.soundIDs[a]]);
            G(c);
            j.removeEventListener && j.removeEventListener("load", B, false)
        };
        this.canPlayMIME = function (c) {
            var a;
            if (b.hasHTML5) a = M({
                type: c
            });
            return !C || a ? a : c ? c.match(b.mimePattern) ? true : false : null
        };
        this.canPlayURL = function (c) {
            var a;
            if (b.hasHTML5) a = M(c);
            return !C || a ? a : c ? c.match(b.filePattern) ? true : false : null
        };
        this.canPlayLink = function (c) {
            if (typeof c.type !== "undefined" && c.type) if (b.canPlayMIME(c.type)) return true;
            return b.canPlayURL(c.href)
        };
        this.getSoundById = function (c) {
            if (!c) throw Error("SoundManager.getSoundById(): sID is null/undefined");
            return b.sounds[c]
        };
        this.onready = function (c, a) {
            if (c && c instanceof Function) {
                a || (a = j);
                ka(c, a);
                A();
                return true
            } else
            throw K("needFunction");
        };
        this.oninitmovie = function () {};
        this.onload = function () {};
        this.onerror = function () {};
        this.getMoviePercent = function () {
            return b.o && typeof b.o.PercentLoaded !== "undefined" ? b.o.PercentLoaded() : null
        };
        this._wD = this._writeDebug = function () {};
        this._debug = function () {};
        this.reboot = function () {
            for (var c = b.soundIDs.length; c--;) b.sounds[b.soundIDs[c]].destruct();
            try {
                if (b.isIE) aa = b.o.innerHTML;
                J = b.o.parentNode.removeChild(b.o)
            } catch (a) {}
            J = aa = null;
            v = F = E = da = T = p = b.enabled = false;
            b.swfLoaded = false;
            b.soundIDs = [];
            b.sounds = [];
            b.o = null;
            for (c = z.length; c--;) z[c].fired = false;
            j.setTimeout(function () {
                b.beginDelayedInit()
            }, 20)
        };
        this.destruct = function () {
            b.disable(true)
        };
        this.beginDelayedInit = function () {
            ja = true;
            H();
            setTimeout(X, 500);
            setTimeout(ma, 20)
        };
        U = function (c) {
            return (c.type ? M({
                type: c.type
            }) : false) || M(c.url)
        };
        M = function (c) {
            if (!b.useHTML5Audio || !b.hasHTML5) return false;
            var a, f = b.audioFormats;
            if (!u) {
                u = [];
                for (a in f) if (f.hasOwnProperty(a)) {
                    u.push(a);
                    if (f[a].related) u = u.concat(f[a].related)
                }
                u = RegExp("\\.(" + u.join("|") + ")", "i")
            }
            a = typeof c.type !== "undefined" ? c.type : null;
            c = typeof c === "string" ? c.toLowerCase().match(u) : null;
            if (!c || !c.length) {
                if (!a) return false
            } else c = c[0].substr(1);
            if (c && typeof b.html5[c] !== "undefined") return b.html5[c];
            else {
                if (!a) if (c && b.html5[c]) return b.html5[c];
                else a = "audio/" + c;
                a = b.html5.canPlayType(a);
                return b.html5[c] = a
            }
        };
        ua = function () {
            function c(l) {
                var h, d, i = false;
                if (!a || typeof a.canPlayType !== "function") return false;
                if (l instanceof Array) {
                    h = 0;
                    for (d = l.length; h < d && !i; h++) if (b.html5[l[h]] || a.canPlayType(l[h]).match(b.html5Test)) {
                        i = true;
                        b.html5[l[h]] = true
                    }
                    return i
                } else
                return (l = a && typeof a.canPlayType === "function" ? a.canPlayType(l) : false) && (l.match(b.html5Test) ? true : false)
            }
            if (!b.useHTML5Audio || typeof Audio === "undefined") return false;
            var a = typeof Audio !== "undefined" ? new Audio : null,
                f, g = {},
                e, o;
            e = b.audioFormats;
            for (f in e) if (e.hasOwnProperty(f)) {
                g[f] = c(e[f].type);
                if (e[f] && e[f].related) for (o = 0; o < e[f].related.length; o++) b.html5[e[f].related[o]] = g[f]
            }
            g.canPlayType = a ? c : null;
            b.html5 = q(b.html5, g)
        };
        P = {};
        y = function (c) {
            return document.getElementById(c)
        };
        K = function () {
            var c = Array.prototype.slice.call(arguments),
                a = c.shift();
            a = P && P[a] ? P[a] : "";
            var f, g;
            if (a && c && c.length) {
                f = 0;
                for (g = c.length; f < g; f++) a = a.replace("%s", c[f])
            }
            return a
        };
        S = function (c) {
            if (k === 8 && c.loops > 1 && c.stream) c.stream = false;
            return c
        };
        ca = function (c, a) {
            var f;
            if (!a) return Error("Error: " + c);
            typeof console !== "undefined" && typeof console.trace !== "undefined" && console.trace();
            f = "Error: " + c + ". \nCaller: " + a.toString();
            return Error(f)
        };
        ia = function () {
            return false
        };
        pa = function (c) {
            for (var a in c) if (c.hasOwnProperty(a) && typeof c[a] === "function") c[a] = ia
        };
        I = function (c) {
            if (typeof c === "undefined") c = false;
            if (v || c) b.disable(c)
        };
        qa = function (c) {
            var a = null;
            if (c) if (c.match(/\.swf(\?\.*)?$/i)) {
                if (a = c.substr(c.toLowerCase().lastIndexOf(".swf?") + 4)) return c
            } else if (c.lastIndexOf("/") !== c.length - 1) c += "/";
            return (c && c.lastIndexOf("/") !== -1 ? c.substr(0, c.lastIndexOf("/") + 1) : "./") + b.movieURL
        };
        Y = function () {
            if (k !== 8 && k !== 9) b.flashVersion = 8;
            var c = b.debugMode || b.debugFlash ? "_debug.swf" : ".swf";
            if (b.flashVersion < 9 && b.useHTML5Audio && b.audioFormats.mp4.required) b.flashVersion = 9;
            k = b.flashVersion;
            b.version = b.versionNumber + (x ? " (HTML5-only mode)" : k === 9 ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
            if (k > 8) {
                b.defaultOptions = q(b.defaultOptions, b.flash9Options);
                b.features.buffering = true
            }
            if (k > 8 && b.useMovieStar) {
                b.defaultOptions = q(b.defaultOptions, b.movieStarOptions);
                b.filePatterns.flash9 = RegExp("\\.(mp3|" + b.netStreamTypes.join("|") + ")(\\?.*)?$", "i");
                b.mimePattern = b.netStreamMimeTypes;
                b.features.movieStar = true
            } else b.features.movieStar = false;
            b.filePattern = b.filePatterns[k !== 8 ? "flash9" : "flash8"];
            b.movieURL = (k === 8 ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", c);
            b.features.peakData = b.features.waveformData = b.features.eqData = k > 8
        };
        na = function () {
            return document.body ? document.body : document.documentElement ? document.documentElement : document.getElementsByTagName("div")[0]
        };
        oa = function (c, a) {
            if (!b.o || !b.allowPolling) return false;
            b.o._setPolling(c, a)
        };
        $ = function () {
            function c() {
                f.left = j.scrollX + "px";
                f.top = j.scrollY + "px"
            }
            function a(g) {
                g = j[(g ? "add" : "remove") + "EventListener"];
                g("resize", c, false);
                g("scroll", c, false)
            }
            var f = null;
            return {
                check: function (g) {
                    f = b.oMC.style;
                    if (t.match(/android/i)) {
                        if (g) {
                            if (b.flashLoadTimeout) b._s.flashLoadTimeout = 0;
                            return false
                        }
                        f.position = "absolute";
                        f.left = f.top = "0px";
                        a(true);
                        b.onready(function () {
                            a(false);
                            if (f) f.left = f.top = "-9999px"
                        });
                        c()
                    }
                }
            }
        }();
        R = function (c, a) {
            var f = a ? a : b.url,
                g = b.altURL ? b.altURL : f,
                e, o, l, h;
            c = typeof c === "undefined" ? b.id : c;
            if (E && F) return false;
            if (x) {
                Y();
                b.oMC = y(b.movieID);
                O();
                F = E = true;
                return false
            }
            E = true;
            Y();
            b.url = qa(this._overHTTP ? f : g);
            a = b.url;
            if (b.useHighPerformance && b.useMovieStar && b.defaultOptions.useVideo === true) b.useHighPerformance = false;
            b.wmode = !b.wmode && b.useHighPerformance && !b.useMovieStar ? "transparent" : b.wmode;
            if (b.wmode !== null && !b.isIE && !b.useHighPerformance && navigator.platform.match(/win32/i)) {
                b.specialWmodeCase = true;
                b.wmode = null
            }
            if (k === 8) b.allowFullScreen = false;
            g = {
                name: c,
                id: c,
                src: a,
                width: "100%",
                height: "100%",
                quality: "high",
                allowScriptAccess: b.allowScriptAccess,
                bgcolor: b.bgColor,
                pluginspage: "http://www.macromedia.com/go/getflashplayer",
                type: "application/x-shockwave-flash",
                wmode: b.wmode,
                allowFullScreen: b.allowFullScreen ? "true" : "false"
            };
            if (b.debugFlash) g.FlashVars = "debug=1";
            b.wmode || delete g.wmode;
            if (b.isIE) {
                f = document.createElement("div");
                o = '<object id="' + c + '" data="' + a + '" type="' + g.type + '" width="' + g.width + '" height="' + g.height + '"><param name="movie" value="' + a + '" /><param name="AllowScriptAccess" value="' + b.allowScriptAccess + '" /><param name="quality" value="' + g.quality + '" />' + (b.wmode ? '<param name="wmode" value="' + b.wmode + '" /> ' : "") + '<param name="bgcolor" value="' + b.bgColor + '" /><param name="allowFullScreen" value="' + g.allowFullScreen + '" />' + (b.debugFlash ? '<param name="FlashVars" value="' + g.FlashVars + '" />' : "") + "<!-- --\></object>"
            } else {
                f = document.createElement("embed");
                for (e in g) g.hasOwnProperty(e) && f.setAttribute(e, g[e])
            }
            ha();
            g = L();
            if (e = na()) {
                b.oMC = y(b.movieID) ? y(b.movieID) : document.createElement("div");
                if (b.oMC.id) {
                    e = b.oMC.className;
                    b.oMC.className = (e ? e + " " : b.swfCSS.swfDefault) + (g ? " " + g : "");
                    b.oMC.appendChild(f);
                    if (b.isIE) {
                        g = b.oMC.appendChild(document.createElement("div"));
                        g.className = "sm2-object-box";
                        g.innerHTML = o
                    }
                    F = true;
                    $.check(true)
                } else {
                    b.oMC.id = b.movieID;
                    b.oMC.className = b.swfCSS.swfDefault + " " + g;
                    g = l = null;
                    b.useFlashBlock || (l = b.useHighPerformance ? {
                        position: "fixed",
                        width: "8px",
                        height: "8px",
                        bottom: "0px",
                        left: "0px",
                        overflow: "hidden"
                    } : {
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        top: "-9999px",
                        left: "-9999px"
                    });
                    if (t.match(/webkit/i)) b.oMC.style.zIndex = 1E4;
                    h = null;
                    if (!b.debugFlash) for (h in l) if (l.hasOwnProperty(h)) b.oMC.style[h] = l[h];
                    try {
                        b.isIE || b.oMC.appendChild(f);
                        e.appendChild(b.oMC);
                        if (b.isIE) {
                            g = b.oMC.appendChild(document.createElement("div"));
                            g.className = "sm2-object-box";
                            g.innerHTML = o
                        }
                        F = true
                    } catch (d) {
                        throw Error(K("appXHTML"));
                    }
                    $.check()
                }
            }
        };
        n = this.getSoundById;
        q = function (c, a) {
            var f = {},
                g, e;
            for (g in c) if (c.hasOwnProperty(g)) f[g] = c[g];
            g = typeof a === "undefined" ? b.defaultOptions : a;
            for (e in g) if (g.hasOwnProperty(e) && typeof f[e] === "undefined") f[e] = g[e];
            return f
        };
        Q = function () {
            if (x) {
                R();
                return false
            }
            if (b.o) return false;
            b.o = b.getMovie(b.id);
            if (!b.o) {
                if (J) {
                    if (b.isIE) b.oMC.innerHTML = aa;
                    else b.oMC.appendChild(J);
                    J = null;
                    E = true
                } else R(b.id, b.url);
                b.o = b.getMovie(b.id)
            }
            typeof b.oninitmovie === "function" && setTimeout(b.oninitmovie, 1)
        };
        la = function (c) {
            if (c) b.url = c;
            Q()
        };
        X = function () {
            if (T) return false;
            T = true;
            if (D && !fa) return false;
            var c;
            p || (c = b.getMoviePercent());
            setTimeout(function () {
                c = b.getMoviePercent();
                if (!p && wa) if (c === null) if (b.useFlashBlock || b.flashLoadTimeout === 0) b.useFlashBlock && ba();
                else I(true);
                else b.flashLoadTimeout !== 0 && I(true)
            }, b.flashLoadTimeout)
        };
        L = function () {
            var c = [];
            b.debugMode && c.push(b.swfCSS.sm2Debug);
            b.debugFlash && c.push(b.swfCSS.flashDebug);
            b.useHighPerformance && c.push(b.swfCSS.highPerf);
            return c.join(" ")
        };
        ba = function () {
            var c = b.getMoviePercent();
            if (b.supported()) {
                if (b.oMC) b.oMC.className = L() + " " + b.swfCSS.swfDefault + (" " + b.swfCSS.swfUnblocked)
            } else {
                if (C) b.oMC.className = L() + " " + b.swfCSS.swfDefault + " " + (c === null ? b.swfCSS.swfTimedout : b.swfCSS.swfError);
                b.didFlashBlock = true;
                A(true);
                b.onerror instanceof Function && b.onerror.apply(j)
            }
        };
        w = function () {
            if (fa || !D) return true;
            fa = wa = true;
            D && j.removeEventListener("mousemove", w, false);
            T = false;
            setTimeout(X, 500);
            if (j.removeEventListener) j.removeEventListener("focus", w, false);
            else j.detachEvent && j.detachEvent("onfocus", w)
        };
        G = function (c) {
            if (p) return false;
            if (x) {
                p = true;
                A();
                B();
                return true
            }
            b.useFlashBlock && b.flashLoadTimeout && !b.getMoviePercent() || (p = true);
            if (v || c) {
                if (b.useFlashBlock) b.oMC.className = L() + " " + (b.getMoviePercent() === null ? b.swfCSS.swfTimedout : b.swfCSS.swfError);
                A();
                b.onerror instanceof Function && b.onerror.apply(j);
                return false
            }
            if (b.waitForWindowLoad && !ja) {
                if (j.addEventListener) j.addEventListener("load", B, false);
                else j.attachEvent && j.attachEvent("onload", B);
                return false
            } else B()
        };
        ka = function (c, a) {
            z.push({
                method: c,
                scope: a || null,
                fired: false
            })
        };
        A = function (c) {
            if (!p && !c) return false;
            c = {
                success: c ? b.supported() : !v
            };
            var a = [],
                f, g, e = !b.useFlashBlock || b.useFlashBlock && !b.supported();
            f = 0;
            for (g = z.length; f < g; f++) z[f].fired !== true && a.push(z[f]);
            if (a.length) {
                f = 0;
                for (g = a.length; f < g; f++) {
                    a[f].scope ? a[f].method.apply(a[f].scope, [c]) : a[f].method(c);
                    if (!e) a[f].fired = true
                }
            }
        };
        B = function () {
            j.setTimeout(function () {
                b.useFlashBlock && ba();
                A();
                b.onload.apply(j)
            }, 1)
        };
        ta = function () {
            var c, a, f = !N.match(/usehtml5audio/i) && !N.match(/sm2\-ignorebadua/i) && b.isSafari && t.match(/OS X 10_6_(3|4)/i) && t.match(/(531\.22\.7|533\.16|533\.17\.8)/i);
            if (t.match(/iphone os (1|2|3_0|3_1)/i) ? true : false) {
                b.hasHTML5 = false;
                x = true;
                if (b.oMC) b.oMC.style.display = "none";
                return false
            }
            if (b.useHTML5Audio) {
                if (!b.html5 || !b.html5.canPlayType) {
                    b.hasHTML5 = false;
                    return true
                } else b.hasHTML5 = true;
                if (f) {
                    b.useHTML5Audio = false;
                    b.hasHTML5 = false;
                    return true
                }
            } else
            return true;
            for (a in b.audioFormats) if (b.audioFormats.hasOwnProperty(a)) if (b.audioFormats[a].required && !b.html5.canPlayType(b.audioFormats[a].type)) c = true;
            if (b.ignoreFlash) c = false;
            x = b.useHTML5Audio && b.hasHTML5 && !c;
            return c
        };
        O = function () {
            function c() {
                if (j.removeEventListener) j.removeEventListener("load", b.beginDelayedInit, false);
                else j.detachEvent && j.detachEvent("onload", b.beginDelayedInit)
            }
            var a, f = [];
            if (p) return false;
            if (b.hasHTML5) for (a in b.audioFormats) b.audioFormats.hasOwnProperty(a) && f.push(a + ": " + b.html5[a]);
            if (x) {
                if (!p) {
                    c();
                    b.enabled = true;
                    G()
                }
                return true
            }
            Q();
            try {
                b.o._externalInterfaceTest(false);
                if (b.allowPolling) oa(true, b.useFastPolling ? true : false);
                b.debugMode || b.o._disableDebug();
                b.enabled = true
            } catch (g) {
                I(true);
                G();
                return false
            }
            G();
            c()
        };
        ma = function () {
            if (da) return false;
            R();
            Q();
            return da = true
        };
        H = function () {
            if (Z) return false;
            Z = true;
            ha();
            ua();
            b.html5.usingFlash = ta();
            C = b.html5.usingFlash;
            Z = true;
            la()
        };
        ra = function (c) {
            if (!c._hasTimer) c._hasTimer = true
        };
        sa = function (c) {
            if (c._hasTimer) c._hasTimer = false
        };
        this._setSandboxType = function (c) {
            var a = b.sandbox;
            a.type = c;
            a.description = a.types[typeof a.types[c] !== "undefined" ? c : "unknown"];
            if (a.type === "localWithFile") {
                a.noRemote = true;
                a.noLocal = false
            } else if (a.type === "localWithNetwork") {
                a.noRemote = false;
                a.noLocal = true
            } else if (a.type === "localTrusted") {
                a.noRemote = false;
                a.noLocal = false
            }
        };
        this._externalInterfaceOK = function () {
            if (b.swfLoaded) return false;
            (new Date).getTime();
            b.swfLoaded = true;
            D = false;
            b.isIE ? setTimeout(O, 100) : O()
        };
        this._onfullscreenchange = function (c) {
            b.isFullScreen = c === 1 ? true : false;
            if (!b.isFullScreen) try {
                j.focus()
            } catch (a) {}
        };
        W = function (c) {
            var a = this,
                f, g, e, o, l, h;
            this.sID = c.id;
            this.url = c.url;
            this._iO = this.instanceOptions = this.options = q(c);
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            this._lastURL = null;
            this.isHTML5 = false;
            this.id3 = {};
            this._debug = function () {};
            this._debug();
            this.load = function (d) {
                var i = null;
                if (typeof d !== "undefined") {
                    a._iO = q(d);
                    a.instanceOptions = a._iO
                } else {
                    d = a.options;
                    a._iO = d;
                    a.instanceOptions = a._iO;
                    if (a._lastURL && a._lastURL !== a.url) {
                        a._iO.url = a.url;
                        a.url = null
                    }
                }
                if (a._iO.url === a.url && a.readyState !== 0 && a.readyState !== 2) return a;
                a._lastURL = a.url;
                a.loaded = false;
                a.readyState = 1;
                a.playState = 0;
                if (U(a._iO)) {
                    i = a._setup_html5(a._iO);
                    i.load();
                    a._iO.autoPlay && a.play()
                } else
                try {
                    a.isHTML5 = false;
                    a._iO = S(a._iO);
                    if (k === 8) b.o._load(a.sID, a._iO.url, a._iO.stream, a._iO.autoPlay, a._iO.whileloading ? 1 : 0, a._iO.loops || 1);
                    else {
                        b.o._load(a.sID, a._iO.url, a._iO.stream ? true : false, a._iO.autoPlay ? true : false, a._iO.loops || 1);
                        a._iO.isMovieStar && a._iO.autoLoad && !a._iO.autoPlay && a.pause()
                    }
                } catch (m) {
                    b.onerror();
                    b.disable()
                }
                return a
            };
            this.unload = function () {
                if (a.readyState !== 0) {
                    a.readyState !== 2 && a.setPosition(0, true);
                    if (a.isHTML5) {
                        e();
                        if (h) {
                            h.pause();
                            h.src = b.nullURL;
                            h.load();
                            h = a._audio = null
                        }
                    } else if (k === 8) b.o._unload(a.sID, b.nullURL);
                    else {
                        a.setAutoPlay(false);
                        b.o._unload(a.sID)
                    }
                    f()
                }
                return a
            };
            this.destruct = function () {
                if (a.isHTML5) {
                    e();
                    if (h) {
                        h.pause();
                        h.src = "about:blank";
                        h.load();
                        h = a._audio = null
                    }
                } else {
                    a._iO.onfailure = null;
                    b.o._destroySound(a.sID)
                }
                b.destroySound(a.sID, true)
            };
            this.start = this.play = function (d) {
                d || (d = {});
                a._iO = q(d, a._iO);
                a._iO = q(a._iO, a.options);
                a.instanceOptions = a._iO;
                if (a._iO.serverURL) if (!a.connected) {
                    a.setAutoPlay(true);
                    return a
                }
                if (U(a._iO)) {
                    a._setup_html5(a._iO);
                    o()
                }
                if (a.playState === 1) if (d = a._iO.multiShot) a.isHTML5 && a.setPosition(a._iO.position);
                else
                return a;
                if (!a.loaded) if (a.readyState === 0) if (a.isHTML5) {
                    a.load(a._iO);
                    a.readyState = 1
                } else {
                    if (!a._iO.serverURL) {
                        a._iO.autoPlay = true;
                        a.load(a._iO)
                    }
                } else if (a.readyState === 2) return a;
                if (a.paused && a.position !== null) a.resume();
                else {
                    a.playState = 1;
                    a.paused = false;
                    if (!a.instanceCount || k > 8 && !a.isHTML5) a.instanceCount++;
                    a.position = typeof a._iO.position !== "undefined" && !isNaN(a._iO.position) ? a._iO.position : 0;
                    a._iO = S(a._iO);
                    a._iO.onplay && a._iO.onplay.apply(a);
                    a.setVolume(a._iO.volume, true);
                    a.setPan(a._iO.pan, true);
                    if (a.isHTML5) {
                        o();
                        a._setup_html5().play()
                    } else {
                        k === 9 && a._iO.serverURL && a.setAutoPlay(true);
                        b.o._start(a.sID, a._iO.loops || 1, k === 9 ? a.position : a.position / 1E3)
                    }
                }
                return a
            };
            this.stop = function (d) {
                if (a.playState === 1) {
                    a._onbufferchange(0);
                    a.resetOnPosition(0);
                    if (!a.isHTML5) a.playState = 0;
                    a.paused = false;
                    a._iO.onstop && a._iO.onstop.apply(a);
                    if (a.isHTML5) {
                        if (h) {
                            a.setPosition(0);
                            h.pause();
                            a.playState = 0;
                            a._onTimer();
                            e();
                            a.unload()
                        }
                    } else {
                        b.o._stop(a.sID, d);
                        a._iO.serverURL && a.unload()
                    }
                    a.instanceCount = 0;
                    a._iO = {}
                }
                return a
            };
            this.setAutoPlay = function (d) {
                a._iO.autoPlay = d;
                b.o._setAutoPlay(a.sID, d);
                if (d) a.instanceCount || a.instanceCount++
            };
            this.setPosition = function (d) {
                if (typeof d === "undefined") d = 0;
                a._iO.position = a.isHTML5 ? Math.max(d, 0) : Math.min(a.duration, Math.max(d, 0));
                a.resetOnPosition(a._iO.position);
                if (a.isHTML5) {
                    if (h) {
                        if (a.playState) try {
                            h.currentTime = a._iO.position / 1E3
                        } catch (i) {}
                        if (a.paused) {
                            a._onTimer(true);
                            a._iO.useMovieStar && a.resume()
                        }
                    }
                } else b.o._setPosition(a.sID, k === 9 ? a._iO.position : a._iO.position / 1E3, a.paused || !a.playState);
                return a
            };
            this.pause = function (d) {
                if (a.paused || a.playState === 0 && a.readyState !== 1) return a;
                a.paused = true;
                if (a.isHTML5) {
                    a._setup_html5().pause();
                    e()
                } else if (d || d === undefined) b.o._pause(a.sID);
                a._iO.onpause && a._iO.onpause.apply(a);
                return a
            };
            this.resume = function () {
                if (!a.paused || a.playState === 0) return a;
                a.paused = false;
                a.playState = 1;
                if (a.isHTML5) {
                    a._setup_html5().play();
                    o()
                } else b.o._pause(a.sID);
                a._iO.onresume && a._iO.onresume.apply(a);
                return a
            };
            this.togglePause = function () {
                if (a.playState === 0) {
                    a.play({
                        position: k === 9 && !a.isHTML5 ? a.position : a.position / 1E3
                    });
                    return a
                }
                a.paused ? a.resume() : a.pause();
                return a
            };
            this.setPan = function (d, i) {
                if (typeof d === "undefined") d = 0;
                if (typeof i === "undefined") i = false;
                a.isHTML5 || b.o._setPan(a.sID, d);
                a._iO.pan = d;
                if (!i) a.pan = d;
                return a
            };
            this.setVolume = function (d, i) {
                if (typeof d === "undefined") d = 100;
                if (typeof i === "undefined") i = false;
                if (a.isHTML5) {
                    if (h) h.volume = d / 100
                } else b.o._setVolume(a.sID, b.muted && !a.muted || a.muted ? 0 : d);
                a._iO.volume = d;
                if (!i) a.volume = d;
                return a
            };
            this.mute = function () {
                a.muted = true;
                if (a.isHTML5) {
                    if (h) h.muted = true
                } else b.o._setVolume(a.sID, 0);
                return a
            };
            this.unmute = function () {
                a.muted = false;
                var d = typeof a._iO.volume !== "undefined";
                if (a.isHTML5) {
                    if (h) h.muted = false
                } else b.o._setVolume(a.sID, d ? a._iO.volume : a.options.volume);
                return a
            };
            this.toggleMute = function () {
                return a.muted ? a.unmute() : a.mute()
            };
            this.onposition = function (d, i, m) {
                a._onPositionItems.push({
                    position: d,
                    method: i,
                    scope: typeof m !== "undefined" ? m : a,
                    fired: false
                });
                return a
            };
            this.processOnPosition = function () {
                var d, i;
                d = a._onPositionItems.length;
                if (!d || !a.playState || a._onPositionFired >= d) return false;
                for (d = d; d--;) {
                    i = a._onPositionItems[d];
                    if (!i.fired && a.position >= i.position) {
                        i.method.apply(i.scope, [i.position]);
                        i.fired = true;
                        b._onPositionFired++
                    }
                }
            };
            this.resetOnPosition = function (d) {
                var i, m;
                i = a._onPositionItems.length;
                if (!i) return false;
                for (i = i; i--;) {
                    m = a._onPositionItems[i];
                    if (m.fired && d <= m.position) {
                        m.fired = false;
                        b._onPositionFired--
                    }
                }
            };
            this._onTimer = function (d) {
                if (a._hasTimer || d) if (h && (d || (a.playState > 0 || a.readyState === 1) && !a.paused)) {
                    a.duration = l();
                    a.durationEstimate = a.duration;
                    d = h.currentTime ? h.currentTime * 1E3 : 0;
                    a._whileplaying(d, {}, {}, {}, {});
                    return true
                } else
                return false
            };
            l = function () {
                var d = h ? h.duration * 1E3 : undefined;
                if (d) return !isNaN(d) ? d : null
            };
            o = function () {
                a.isHTML5 && ra(a)
            };
            e = function () {
                a.isHTML5 && sa(a)
            };
            f = function () {
                a._onPositionItems = [];
                a._onPositionFired = 0;
                a._hasTimer = null;
                a._added_events = null;
                h = a._audio = null;
                a.bytesLoaded = null;
                a.bytesTotal = null;
                a.position = null;
                a.duration = null;
                a.durationEstimate = null;
                a.failures = 0;
                a.loaded = false;
                a.playState = 0;
                a.paused = false;
                a.readyState = 0;
                a.muted = false;
                a.didBeforeFinish = false;
                a.didJustBeforeFinish = false;
                a.isBuffering = false;
                a.instanceOptions = {};
                a.instanceCount = 0;
                a.peakData = {
                    left: 0,
                    right: 0
                };
                a.waveformData = {
                    left: [],
                    right: []
                };
                a.eqData = [];
                a.eqData.left = [];
                a.eqData.right = []
            };
            f();
            this._setup_html5 = function (d) {
                d = q(a._iO, d);
                if (h) {
                    if (a.url !== d.url) h.src = d.url
                } else {
                    a._audio = new Audio(d.url);
                    h = a._audio;
                    a.isHTML5 = true;
                    g()
                }
                h.loop = d.loops > 1 ? "loop" : "";
                return a._audio
            };
            g = function () {
                function d(i, m, r) {
                    return h ? h.addEventListener(i, m, r || false) : null
                }
                if (a._added_events) return false;
                a._added_events = true;
                d("load", function () {
                    if (h) {
                        a._onbufferchange(0);
                        a._whileloading(a.bytesTotal, a.bytesTotal, l());
                        a._onload(1)
                    }
                }, false);
                d("canplay", function () {
                    a._onbufferchange(0)
                }, false);
                d("waiting", function () {
                    a._onbufferchange(1)
                }, false);
                d("progress", function (i) {
                    if (!a.loaded && h) {
                        a._onbufferchange(0);
                        a._whileloading(i.loaded || 0, i.total || 1, l())
                    }
                }, false);
                d("error", function () {
                    h && a._onload(0)
                }, false);
                d("loadstart", function () {
                    a._onbufferchange(1)
                }, false);
                d("play", function () {
                    a._onbufferchange(0)
                }, false);
                d("playing", function () {
                    a._onbufferchange(0)
                }, false);
                d("timeupdate", function () {
                    a._onTimer()
                }, false);
                setTimeout(function () {
                    a && h && d("ended", function () {
                        a._onfinish()
                    }, false)
                }, 250)
            };
            this._whileloading = function (d, i, m, r) {
                a.bytesLoaded = d;
                a.bytesTotal = i;
                a.duration = Math.floor(m);
                if (a._iO.isMovieStar) {
                    a.durationEstimate = a.duration;
                    a.readyState !== 3 && a._iO.whileloading && a._iO.whileloading.apply(a)
                } else {
                    a.durationEstimate = parseInt(a.bytesTotal / a.bytesLoaded * a.duration, 10);
                    if (a.durationEstimate === undefined) a.durationEstimate = a.duration;
                    a.bufferLength = r;
                    if ((a._iO.isMovieStar || a.readyState !== 3) && a._iO.whileloading) a._iO.whileloading.apply(a)
                }
            };
            this._onid3 = function (d, i) {
                var m = [],
                    r, s;
                r = 0;
                for (s = d.length; r < s; r++) m[d[r]] = i[r];
                a.id3 = q(a.id3, m);
                a._iO.onid3 && a._iO.onid3.apply(a)
            };
            this._whileplaying = function (d, i, m, r, s) {
                if (isNaN(d) || d === null) return false;
                if (a.playState === 0 && d > 0) d = 0;
                a.position = d;
                a.processOnPosition();
                if (k > 8 && !a.isHTML5) {
                    if (a._iO.usePeakData && typeof i !== "undefined" && i) a.peakData = {
                        left: i.leftPeak,
                        right: i.rightPeak
                    };
                    if (a._iO.useWaveformData && typeof m !== "undefined" && m) a.waveformData = {
                        left: m.split(","),
                        right: r.split(",")
                    };
                    if (a._iO.useEQData) if (typeof s !== "undefined" && s && s.leftEQ) {
                        d = s.leftEQ.split(",");
                        a.eqData = d;
                        a.eqData.left = d;
                        if (typeof s.rightEQ !== "undefined" && s.rightEQ) a.eqData.right = s.rightEQ.split(",")
                    }
                }
                if (a.playState === 1) {
                    !a.isHTML5 && a.isBuffering && a._onbufferchange(0);
                    a._iO.whileplaying && a._iO.whileplaying.apply(a);
                    if ((a.loaded || !a.loaded && a._iO.isMovieStar) && a._iO.onbeforefinish && a._iO.onbeforefinishtime && !a.didBeforeFinish && a.duration - a.position <= a._iO.onbeforefinishtime) a._onbeforefinish()
                }
            };
            this._onconnect = function (d) {
                d = d === 1;
                if (a.connected = d) {
                    a.failures = 0;
                    if (a._iO.autoLoad || a._iO.autoPlay) a.load(a._iO);
                    a._iO.autoPlay && a.play();
                    a._iO.onconnect && a._iO.onconnect.apply(a, [d])
                }
            };
            this._onload = function (d) {
                d = d === 1 ? true : false;
                a.loaded = d;
                a.readyState = d ? 3 : 2;
                a._iO.onload && a._iO.onload.apply(a)
            };
            this._onfailure = function (d) {
                a.failures++;
                a._iO.onfailure && a.failures === 1 && a._iO.onfailure(a, d)
            };
            this._onbeforefinish = function () {
                if (!a.didBeforeFinish) {
                    a.didBeforeFinish = true;
                    a._iO.onbeforefinish && a._iO.onbeforefinish.apply(a)
                }
            };
            this._onjustbeforefinish = function () {
                if (!a.didJustBeforeFinish) {
                    a.didJustBeforeFinish = true;
                    a._iO.onjustbeforefinish && a._iO.onjustbeforefinish.apply(a)
                }
            };
            this._onfinish = function () {
                a._onbufferchange(0);
                a.resetOnPosition(0);
                a._iO.onbeforefinishcomplete && a._iO.onbeforefinishcomplete.apply(a);
                a.didBeforeFinish = false;
                a.didJustBeforeFinish = false;
                if (a.instanceCount) {
                    a.instanceCount--;
                    if (!a.instanceCount) {
                        a.playState = 0;
                        a.paused = false;
                        a.instanceCount = 0;
                        a.instanceOptions = {};
                        e()
                    }
                    if (!a.instanceCount || a._iO.multiShotEvents) if (a._iO.onfinish) a._iO.onfinish.apply(a);
                    else a.isHTML5 && a.unload()
                }
            };
            this._onmetadata = function (d) {
                if (!d.width && !d.height) {
                    d.width = 320;
                    d.height = 240
                }
                a.metadata = d;
                a.width = d.width;
                a.height = d.height;
                a._iO.onmetadata && a._iO.onmetadata.apply(a)
            };
            this._onbufferchange = function (d) {
                if (a.playState === 0) return false;
                if (d && a.isBuffering || !d && !a.isBuffering) return false;
                a.isBuffering = d === 1 ? true : false;
                a._iO.onbufferchange && a._iO.onbufferchange.apply(a)
            };
            this._ondataerror = function () {
                a.playState > 0 && a._iO.ondataerror && a._iO.ondataerror.apply(a)
            }
        };
        if (!b.hasHTML5 || C) if (j.addEventListener) {
            j.addEventListener("focus", w, false);
            j.addEventListener("load", b.beginDelayedInit, false);
            j.addEventListener("unload", b.destruct, false);
            D && j.addEventListener("mousemove", w, false)
        } else if (j.attachEvent) {
            j.attachEvent("onfocus", w);
            j.attachEvent("onload", b.beginDelayedInit);
            j.attachEvent("unload", b.destruct)
        } else {
            V.onerror();
            V.disable()
        }
        ea = function () {
            if (document.readyState === "complete") {
                H();
                document.detachEvent("onreadystatechange", ea)
            }
        };
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", H, false);
        else document.attachEvent && document.attachEvent("onreadystatechange", ea);
        document.readyState === "complete" && setTimeout(H, 100)
    }
    var V = null;
    if (typeof SM2_DEFER === "undefined" || !SM2_DEFER) V = new ga;
    j.SoundManager = ga;
    j.soundManager = V
})(window);
var favicon = {
    defaultPause: 2000,
    change: function (iconURL, optionalDocTitle) {
        clearTimeout(this.loopTimer);
        if (optionalDocTitle) {
            document.title = optionalDocTitle;
        }
        this.addLink(iconURL, true);
    },
    animate: function (iconSequence, optionalDelay) {
        this.preloadIcons(iconSequence);
        this.iconSequence = iconSequence;
        this.sequencePause = (optionalDelay) ? optionalDelay : this.defaultPause;
        favicon.index = 0;
        favicon.change(iconSequence[0]);
        this.loopTimer = setInterval(function () {
            favicon.index = (favicon.index + 1) % favicon.iconSequence.length;
            favicon.addLink(favicon.iconSequence[favicon.index], false);
        }, favicon.sequencePause);
    },
    loopTimer: null,
    preloadIcons: function (iconSequence) {
        var dummyImageForPreloading = document.createElement("img");
        for (var i = 0; i < iconSequence.length; i++) {
            dummyImageForPreloading.src = iconSequence[i];
        }
    },
    addLink: function (iconURL) {
        var link = document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = iconURL;
        this.removeLinkIfExists();
        this.docHead.appendChild(link);
    },
    removeLinkIfExists: function () {
        var links = this.docHead.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.type == "image/x-icon" && link.rel == "shortcut icon") {
                this.docHead.removeChild(link);
                return;
            }
        }
    },
    docHead: document.getElementsByTagName("head")[0]
}
var convoreState = {};
var convoreStateCallbacks = [];

function convoreStateCallback(func) {
    convoreStateCallbacks.push(func);
}

function convoreStateInitialized() {
    for (var i = 0; i < convoreStateCallbacks.length; ++i) {
        convoreStateCallbacks[i]();
    }
}
try {
    console.log('init console in convore.global.js... done');
} catch (e) {
    console = {
        log: function () {}
    };
}
$.ajaxSetup({
    cache: false
});
var isiOS = navigator.userAgent.match(/(ipad|iphone|ipod)/i) ? true : false;
var isAndroid = navigator.userAgent.match(/(android)/i) ? true : false;

function deleteConfirm(itemType) {
    return confirm('Are you sure you want to delete this ' + itemType + '?');
}

function markAsReadConfirm(middle) {
    if (!middle) {
        middle = ' ';
    }
    return confirm('Are you sure you want to mark' + middle + 'as read?');
}

function leaveGroupConfirm() {
    return confirm('Are you sure you want to leave this group?');
}

function createSelection(field, start, end) {
    if (field.createTextRange) {
        var selRange = field.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end - start);
        selRange.select();
    } else if (field.setSelectionRange) {
        field.setSelectionRange(start, end);
    } else if (field.selectionStart) {
        field.selectionStart = start;
        field.selectionEnd = end;
    }
    field.focus();
}

function getClearDefaultFormFocusHandler(originalVal) {
    return function (e) {
        var elt = $(this);
        if (elt.val() == originalVal) {
            elt.removeClass('has-default-value');
            elt.val('');
        }
    };
}

function getClearDefaultFormBlurHandler(originalVal) {
    return function (e) {
        var elt = $(this);
        if (!elt.val()) {
            elt.addClass('has-default-value');
            elt.val(originalVal);
        }
    };
}

function clearDefaults(e) {
    $('.clear-default', this).each(function (i, elt) {
        if ($(elt).data('default') === $(elt).val()) {
            $(elt).val('');
        }
    });
}

function setupClearDefaultForms() {
    var alreadyAttached = {};
    var attachHandlers = function (e) {
        if (alreadyAttached[$(this).attr('id')]) {
            return;
        }
        var elt = $(this);
        var val = elt.val();
        if (!elt.hasClass('has-default-value')) {
            elt.addClass('has-default-value');
        }
        elt.data('default', val);
        elt.focus(getClearDefaultFormFocusHandler(val));
        elt.blur(getClearDefaultFormBlurHandler(val));
        alreadyAttached[$(this).attr('id')] = true;
    };
    $('input.clear-default').live('focus', attachHandlers);
    $('textarea.clear-default').live('focus', attachHandlers);
    $('form').submit(clearDefaults);
}

function adjustMain(triggerEvent) {
    var main = $('#main > .box');
    if ($('#topic-detail').length) {
        var offset = main.offset();
        var minHeight = ($(window).height() - offset.top - 86);
        main.css('min-height', minHeight);
    }
    if (triggerEvent) {
        window.addReadClass();
    }
}

function disableDisabledButtons() {
    var throwAway = function (e) {
        return false;
    };
    $('a.blue-btn.disabled').live('click', throwAway);
    $('form.disabled input[type="submit"]').live('click', throwAway);
}

function doubleClickStopper(e) {
    $('input[type="submit"]', this).attr('disabled', 'disabled');
    return true;
}

function setupDoubleClickStopper() {
    $('form.stop-double-clicks').submit(doubleClickStopper);
}
$(function () {
    adjustMain(true);
    $(window).resize(function () {
        adjustMain(false);
    });
});

function showOnlineFacebox() {
    var data = $($(this).next('ul').clone().wrap('<div></div>').parent().html());
    data.children().show().parent().prepend('<h2 class="title">Members online now</h2><br />');
    $.facebox(data);
    return false;
}

function handleSystemMessages() {
    $('.system-messages').each(function (i, elt) {
        $(elt).click(function () {
            $(elt).slideUp();
        });
        setTimeout(function () {
            $(elt).slideUp();
        }, 5000);
    });
}

function setupGroupJoinRequestButton() {
    $('.group-join-request').live('click', function (e) {
        $(this).prev().submit();
        return false;
    });
}
$(window).load(function () {
    setupClearDefaultForms();
    disableDisabledButtons();
    setupDoubleClickStopper();
    handleSystemMessages();
    setupGroupJoinRequestButton();
    $('.facebox-show-online').bind('click', showOnlineFacebox);
    if ((isiOS || isAndroid) && $('#topic-detail').length) {
        $('#footer').css('position', 'static').css('bottom', '60px');
    }
});
$(document).ready(function () {
    $('a[rel*=facebox]').facebox();
});
(function () {
    var timer = null;
    var lastFetch = null;
    var delay = null;
    var isFocused = true;
    var whileUnfocused = [];
    var currentRequest = null;
    var dispatcher = {};

    function supportsLocalStorage() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    }
    var localStorageSupported = supportsLocalStorage();

    function loadCursor() {
        var loadedCursor = localStorage.getItem('cursor');
        if (!loadedCursor) {
            return null;
        }
        if ((new Date().getTime() - loadedCursor.timestamp) > 20) {
            return null;
        }
        return loadedCursor.cursor;
    }
    cursor = loadCursor();

    function setCursor(newCursor) {
        cursor = newCursor;
        if (localStorageSupported) {
            localStorage.setItem('cursor', {
                'cursor': newCursor,
                'timestamp': new Date().getTime()
            });
        }
    }

    function fetchMessages() {
        var data = {
            'topic_id': convoreState.topicId,
            'group_id': convoreState.groupId,
            'cursor': cursor
        };
        currentRequest = $.ajax({
            url: '/live/',
            data: data,
            dataType: 'json',
            success: gotMessages,
            error: scheduleFetch
        });
    }

    function scheduleFetch() {
        try {
            currentRequest.abort();
        } catch (e) {}
        if (timer) {
            clearTimeout(timer);
        }
        delay = (delay ? delay * 2 : 50);
        if (delay > 60000) {
            window.location.reload();
        }
        var now = new Date().getTime();
        if (lastFetch && ((now - lastFetch) > 90000)) {
            window.location.reload();
        }
        lastFetch = now;
        timer = setTimeout(fetchMessages, delay);
    }

    function updateRecentTopics(topic, unreadCount) {
        if ($('#recent-topic-' + topic.id).length) {
            return;
        }
        if (!convoreState.groupId || convoreState.groupId !== topic.group) {
            return;
        }
        unreadCount = unreadCount || 0;
        var hidePart = unreadCount ? '' : 'hide ';
        var escapedTopicName = $('<div/>').text(topic.name).html();
        var recentTopicHtml = ('<li id="recent-topic-' + topic.id + '"><a href="' + topic.url + '" title="' + escapedTopicName + '">' + escapedTopicName + '</a><span class="' + hidePart + 'topic-unread-count-' + topic.id + ' unread-count">' + unreadCount + '</span></li>');
        var recentTopics = $('#recent-topics');
        if (recentTopics.length) {
            recentTopics.prepend(recentTopicHtml);
        }
        if ($('#recent-topics li').length > 8) {
            $('#recent-topics li:gt(7)').remove();
        }
    }

    function updateMenuTopics(topic, unreadCount) {
        if ($('#menu-topic-' + topic.id).length) {
            return;
        }
        unreadCount = unreadCount || 0;
        var hidePart = unreadCount ? '' : 'hide ';
        var escapedTopicName = $('<div/>').text(topic.name).html();
        var menuTopicHtml = ('<li id="menu-topic-' + topic.id + '"><a href="' + topic.url + '">' + escapedTopicName + '</a><span class="' + hidePart + 'topic-unread-count-' + topic.id + ' unread-count">' + unreadCount + '</span></li>');
        var menuTopicsSelector = '#menu-topics-' + topic.group;
        $(menuTopicsSelector).prepend(menuTopicHtml);
        if ($(menuTopicsSelector + ' li').length > 8) {
            $(menuTopicsSelector + ' li:gt(7)').remove();
        }
        $('#menu-topics-holder-' + topic.group).show();
    }

    function showMessageNotification(msg) {
        var img = msg.user.img;
        var title = msg.user.username + ' on ' + msg.topic.name;
        var message = $('<div/>').text(msg.message).html();
        var message_a = '<a href="' + msg.topic.url + '">' + message + '</a>';
        var title_a = '<a href="' + msg.topic.url + '">' + title + '</a>';
        $.gritter.add({
            title: title_a,
            text: message_a,
            image: img
        });
    }

    function gotMessage(msg) {
        if (convoreState.userId === msg.user.id) {
            return;
        }
        if (convoreState.username && msg.message.indexOf('@' + convoreState.username) !== -1) {
            showMessageNotification(msg);
        }
        if (msg.topic.id !== convoreState.topicId) {
            if (msg.kind === 'message' && convoreState.userId !== msg.user.id) {
                incrementCounts('topic', msg.topic.id);
                incrementCounts('group', msg.group);
                incrementGlobalCounts();
                msg.topic.group = msg.group;
                updateRecentTopics(msg.topic, 1);
                updateMenuTopics(msg.topic, 1);
            }
            return;
        }
        if (!isFocused) {
            AudioPlayer.playAlert();
            favicon.change('/media/images/favicons/favicon-unread.ico');
            whileUnfocused.push(msg);
            if (msg.kind === 'message' && convoreState.userId !== msg.user.id) {
                incrementCounts('topic', msg.topic.id);
                incrementCounts('group', msg.group);
                incrementGlobalCounts();
            }
        }
        var rendered = $(msg.rendered);
        $('#message-list').append(rendered);
        $('abbr.timeago', rendered).timeago();
        if (convoreState.groupAdmin || msg.user.id == convoreState.userId) {
            $('.star', rendered).after('<a href="#" class="delete-message">x</a>');
        }
        if (whileUnfocused.length < 3) {
            adjustPageScroll();
        }
    }
    dispatcher.message = gotMessage;

    function gotMention(mention) {
        if (mention.mentioned_user.id !== convoreState.userId) {
            return;
        }
        if (mention.topic_id === convoreState.topicId) {
            return;
        }
        if ($('#mentions').length) {
            var rendered = $(mention.rendered);
            $('#message-list').prepend(rendered);
            $('abbr.timeago', rendered).timeago();
        } else {
            var countElt = $('#mention-count');
            var count = (parseInt($(countElt[0]).text(), 10) || 0) + 1;
            $(countElt[0]).text(count).removeClass('hide');
        }
    }
    dispatcher.mention = gotMention;

    function updateOnlineNowCounts() {
        $('.online-now-count').each(function (i, elt) {
            var numOnline = $('li', $(elt).parent().next()).length;
            $(elt).text(numOnline);
            if (numOnline === 1) {
                $(elt).siblings('.member-plural').hide();
            } else {
                $(elt).siblings('.member-plural').show();
            }
        });
    }

    function gotLogin(msg) {
        if (msg.user.id === convoreState.userId) {
            return;
        }
        var numOnline = null;
        for (var i = 0; i < msg.group_ids.length; ++i) {
            var msgGroupId = msg.group_ids[i];
            var elt = $('.online-now-group-' + msgGroupId + ' .online-now-' + msg.user.id);
            if (!elt.length) {
                $('.online-now-group-' + msgGroupId).append(msg.user.rendered);
            }
            if ($('.online-now-group-' + msgGroupId + ' li').length >= convoreState.maxOnline) {
                $('.online-now-group-' + msgGroupId + ' li:gt(' + (convoreState.maxOnline - 1) + ')').hide();
                $('.show-online-group-' + msgGroupId).show();
            }
        }
        $('.online-now').each(function (i, elt) {
            if (!$('.online-now-' + msg.user.id, elt).length) {
                $(elt).append(msg.user.rendered);
            }
        });
        numOnline = $('.online-now li').length;
        if (numOnline >= convoreState.maxOnline) {
            $('.online-now li:gt(' + (convoreState.maxOnline - 1) + ')').hide();
            $('.show-online').show();
        }
        updateOnlineNowCounts();
    }
    dispatcher.login = gotLogin;

    function gotLogout(msg) {
        if (msg.user.id === convoreState.userId) {
            return;
        }
        var elt = $('.online-now-' + msg.user.id);
        if (elt.length) {
            var parent = elt.parent();
            elt.remove();
            $('li:lt(' + convoreState.maxOnline + ')', parent).show();
            if ($('li', parent).length < convoreState.maxOnline) {
                var parentClasses = parent.attr('class').split(' ');
                for (var i = 0; i < parentClasses.length; ++i) {
                    var cls = parentClasses[i];
                    if (cls.indexOf('online-now') !== -1) {
                        $('.' + cls.replace('online-now', 'show-online')).hide();
                        break;
                    }
                }
            }
        }
        updateOnlineNowCounts();
    }
    dispatcher.logout = gotLogout;

    function gotMessageDelete(msg) {
        var eltId = 'message-' + msg.message_id;
        var elt = $('#' + eltId);
        if (elt.length) {
            elt.remove();
        }
    }
    dispatcher['message-delete'] = gotMessageDelete;

    function showStarNotification(msg) {
        var title = msg.user.username + ' starred your message';
        var message = $('<div />').text(msg.star.message.message).html();
        var message_a = '<a href="' + msg.star.message_url + '">' + message + '</a>';
        var title_a = '<a href="' + msg.star.message_url + '">' + title + '</a>';
        $.gritter.add({
            title: title_a,
            text: message_a,
            image: msg.user.img
        });
    }

    function gotStarred(msg) {
        if (msg.user.id == convoreState.userId) {
            return;
        }
        var message = $('#message-' + msg.star.message.id);
        addStar(message, msg.user.username);
        if (msg.star.message.user.id === ('' + convoreState.userId)) {
            showStarNotification(msg);
        }
    }
    dispatcher.star = gotStarred;

    function gotUnstarred(msg) {
        if (msg.user.id == convoreState.userId) {
            return;
        }
        var message = $('#message-' + msg.star.message.id);
        removeStar(message, msg.user.username);
    }
    dispatcher.unstar = gotUnstarred;

    function gotTopic(topic) {
        var groupTopicList = $('#group-topic-list-' + topic.group);
        if (groupTopicList.length) {
            groupTopicList.prepend(topic.rendered);
        }
        var globalTopicList = $('#global-topic-list');
        if (globalTopicList.length) {
            globalTopicList.prepend(topic.rendered);
        }
        updateRecentTopics(topic);
        updateMenuTopics(topic);
    }
    dispatcher.topic = gotTopic;

    function gotGroupRename(renameInfo) {
        var loc = '' + document.location;
        if (loc.indexOf(renameInfo.pre_group_slug) === -1) {
            return;
        }
        document.location = loc.replace(renameInfo.pre_group_slug, renameInfo.post_group_slug);
    }
    dispatcher['group-rename'] = gotGroupRename;

    function gotMessages(data) {
        if (data === null || !(data.messages)) {
            return scheduleFetch();
        }
        delay = null;
        for (var i = 0; i < data.messages.length; ++i) {
            var msg = data.messages[i];
            setCursor(msg._id);
            dispatcher[msg.kind](msg);
        }
        scheduleFetch();
    }

    function setTitle(num) {
        var prefix = (num && num != '0' ? '(' + num + ') ' : '');
        if (document.title.substring(0, 6) == '(300+)') {
            return;
        }
        document.title = prefix + document.title.replace(/^\(\d+\)/, '');
        Fluid.addDockBadge((num ? '' + num : ''));
    }

    function getGlobalCountText() {
        if (convoreState.globalUnreadCount > 300) {
            return '300+';
        } else {
            return '' + convoreState.globalUnreadCount;
        }
    }

    function incrementGlobalCounts() {
        convoreState.globalUnreadCount += 1;
        var countText = getGlobalCountText();
        $('.global-unread-count').text(countText).removeClass('hide');
        setTitle(countText);
        $('.mark-all-as-read').removeClass('disabled');
    }

    function incrementCounts(kind, kindId) {
        var countElts = $('.' + kind + '-unread-count-' + kindId);
        var currentCountText = $(countElts[0]).text().replace(/^\s+|\s+$/g, '');
        if (currentCountText == '300+') {
            return;
        }
        var count = (parseInt(currentCountText.replace(/[^0-9]/g, ''), 10) || 0) + 1;
        countElts.each(function (i, val) {
            $(val).text(count).removeClass('hide').parent().removeClass('hide');
        });
        $('.mark-as-read-' + kind + '-' + kindId).removeClass('disabled');
    }

    function decrementGlobalCounts() {
        var globalCountElts = $('.global-unread-count');
        convoreState.globalUnreadCount -= 1;
        var countText = getGlobalCountText();
        setTitle(countText);
        if (convoreState.globalUnreadCount) {
            globalCountElts.text(countText).removeClass('hide');
        } else {
            globalCountElts.text(countText).addClass('hide');
            $('.mark-all-as-read').addClass('disabled');
        }
    }

    function decrementCounts(kind, kindId) {
        var countElts = $('.' + kind + '-unread-count-' + kindId);
        var currentCountText = $(countElts[0]).text().replace(/^\s+|\s+$/g, '');
        if (currentCountText == '300+') {
            return;
        }
        var count = (parseInt(currentCountText, 10) || 0) - 1;
        countElts.each(function (i, val) {
            var elt = $(val).text(count);
            if (!count) {
                elt.addClass('hide');
            }
            if (kind === 'topic' && elt.closest('#megadropdown').length) {
                elt.closest('li').remove();
            }
        });
        if (!count) {
            $('.mark-as-read-' + kind + '-' + kindId).addClass('disabled');
        }
    }

    function adjustPageScroll() {
        var elt = $('#message-list li:last');
        var lastElementInViewport = $.inviewport(elt, {
            threshold: 0
        });
        if (lastElementInViewport) {
            $(window).scrollTop($('body').height());
        }
    }
    window.adjustPageScroll = adjustPageScroll;

    function scrollToElement(elt, offsetX, offsetY) {
        var selectedPosX = offsetX || 0;
        var selectedPosY = offsetY || 0;
        while (elt !== null) {
            selectedPosX += elt.offsetLeft;
            selectedPosY += elt.offsetTop;
            elt = elt.offsetParent;
        }
        window.scrollTo(selectedPosX, selectedPosY);
    }

    function addReadClass() {
        if (!$('#topic-detail').length) {
            return;
        }
        var splitHref = window.location.href.split('/');
        var messages = $('#message-list li.message');
        var scrolled = false;
        for (var i = 0; i < messages.length; ++i) {
            if ((messages.length - 1 - i) >= convoreState.initialUnreadCount) {
                $(messages[i]).addClass('read');
            } else if (!scrolled) {
                $(messages[i - 1]).addClass('last').after('<li class="unread-break">Newest messages</li>');
                scrolled = true;
                if (splitHref.length !== 7) {
                    scrollToElement(messages[i], 0, -200);
                    return;
                } else {
                    break;
                }
            }
        }
        if (!scrolled && splitHref.length !== 7) {
            $(window).scrollTop($(document).height());
        }
        if (splitHref.length === 7) {
            $(window).load(function () {
                scrollToElement($('#message-' + splitHref[5])[0], 0, -200);
            });
        }
    }
    window.addReadClass = addReadClass;

    function windowFocused(e) {
        isFocused = true;
        favicon.change('/media/images/favicons/favicon.ico');
        for (var i = 0; i < whileUnfocused.length; ++i) {
            var msg = whileUnfocused[i];
            decrementCounts('topic', msg.topic.id);
            decrementCounts('group', msg.group);
            decrementGlobalCounts();
        }
        whileUnfocused.length = 0;
    }

    function windowBlurred(e) {
        isFocused = false;
    }
    $(function () {
        $('abbr.timeago').timeago();
        $(window).blur(windowBlurred);
        $(window).focus(windowFocused);
    });
    $(window).load(function () {
        if (convoreState.loggedIn || (convoreState.groupId && !convoreState.groupPrivate)) {
            setTimeout(scheduleFetch, 200);
        }
    });
})();
(function () {
    var AT_REPLY_REGEX = /@[a-zA-Z0-9_\-]*$/;
    var completeCache = {};
    var delay = null;
    var buffer = [];
    var inFlight = false;

    function toISODate(d) {
        function pad(n) {
            return n < 10 ? '0' + n : n;
        }
        return (d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z');
    }

    function confirmClick(e) {
        return confirm('You still have outgoing messages being processed. ' + 'Leaving this page may cause them to be discarded. ' + 'Would you like to continue away from this page?');
    }

    function getPostSuccess(item) {
        return function (data) {
            if (!data) {
                return getPostFailure(item)();
            }
            delay = null;
            var rendered = $(data.message.rendered);
            $('#' + item.tempId).after(rendered);
            $('#' + item.tempId).remove();
            $('abbr.timeago', rendered).timeago();
            window.adjustPageScroll();
            sendNextMessage(true);
        };
    }

    function getPostFailure(item) {
        return function () {
            buffer.push(item);
            delay = (delay ? delay * 2 : 50);
            setTimeout(function () {
                sendNextMessage(true);
            }, delay);
        };
    }

    function sendNextMessage(force) {
        if (inFlight && !force) {
            return;
        }
        inFlight = true;
        var item = buffer.pop();
        if (!item) {
            inFlight = false;
            $('a').unbind('click', confirmClick);
            return;
        }
        $.ajax({
            type: 'POST',
            url: $('#post-message').attr('action'),
            data: item.data,
            dataType: 'json',
            success: getPostSuccess(item),
            failure: getPostFailure(item)
        });
    }

    function postMessage(e) {
        if (!convoreState.userId) {
            document.location = '/login/';
            return false;
        }
        var msg = $('#id-message').val();
        if (!msg) {
            return false;
        }
        var data = $('#post-message').serialize();
        var tempId = 'tmpmsg-' + Math.floor(Math.random() * 1000);
        $('a').unbind('click', confirmClick).bind('click', confirmClick);
        buffer.unshift({
            data: data,
            tempId: tempId
        });
        sendNextMessage();
        $('#id-message').val('');
        instaPost(msg, tempId);
        return false;
    }

    function instaPost(msg, tempId) {
        AudioPlayer.playAlert();
        var fragment = $($('#message-tmpl').html());
        var formattedDate = toISODate(new Date());
        $('.timeago', fragment).attr('title', formattedDate).text(formattedDate).timeago();
        msg = $('<div/>').text(msg).html();
        $('.message-body', fragment).html(msg);
        $('#message-list').append(fragment);
        fragment = fragment.attr('id', tempId).addClass('in-transit');
        $(window).scrollTop($('body').height());
    }

    function inputKeyDownBehavior(e) {
        if (e.keyCode == 13 && !(e.shiftKey || e.altKey)) {
            $('#post-message').submit();
            return false;
        }
        return true;
    }

    function inputKeyUpBehavior(e) {
        return true;
    }

    function autocomplete(e) {
        if (e.keyCode !== 9 && e.keyCode !== 13 && e.keyCode !== 32 && e.keyCode !== 39) {
            return true;
        }
        var idMessage = $('#id-message');
        var selection = idMessage.getSelection();
        var start = selection.start;
        var end = selection.end;
        var totalMessage = null,
            splitString = null,
            current = null,
            prefix = null,
            m = null;
        var getAutocompleteState = function () {
            totalMessage = idMessage.val();
            splitString = totalMessage.substring(0, start).split(' ');
            current = splitString.pop();
            prefix = splitString.join(' ') + (splitString.length ? ' ' : '');
            m = AT_REPLY_REGEX.exec(current);
        };
        getAutocompleteState();
        if (!m) {
            return true;
        }
        if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 39) {
            if (start === end) {
                return true;
            }
            createSelection(idMessage[0], end + 1, end + 1);
            return false;
        }
        var completeResults = function (data) {
            if (!data.usernames.length) {
                return false;
            }
            getAutocompleteState();
            var currentUsername = (('' + m).substring(1) + totalMessage.substring(start, end));
            var usernameIndex = $.inArray(currentUsername, data.usernames);
            usernameIndex = ((usernameIndex + 1) % data.usernames.length);
            var newVal = (prefix + current.replace('' + m, '@' + data.usernames[usernameIndex]));
            var rest = totalMessage.substring(end);
            if (!rest || rest.substring(0, 1) !== ' ') {
                newVal += ' ';
            }
            if (rest) {
                newVal += rest;
            }
            idMessage.val(newVal);
            if (data.usernames.length > 1) {
                var startSelection = prefix.length + current.length;
                var endSelection = (prefix.length + data.usernames[usernameIndex].length - m.length + 2);
                createSelection(idMessage[0], startSelection, endSelection);
            }
        };
        var queryString = {
            'user_prefix': ('' + m).substring(1),
            'group_slug': convoreState.groupSlug
        };
        var cacheKey = queryString.user_prefix + ':' + queryString.group_slug;
        var cachedData = completeCache[cacheKey];
        if (cachedData) {
            completeResults(cachedData);
        } else {
            $.getJSON('/username/', queryString, function (data) {
                completeCache[cacheKey] = data;
                completeResults(data);
            });
        }
        return false;
    }

    function deleteMessage(e) {
        if (!deleteConfirm('message')) {
            return false;
        }
        var messageID = $(e.target).closest('.message').attr('id').replace('message-', '');
        $.post('/message/' + messageID + '/delete/', function (data) {
            $('#message-' + messageID).fadeOut();
        });
        return false;
    }

    function postAsNewTopic(e) {
        var url = $(this).attr('href');
        if (!$.trim($('#id-message').val())) {
            $.facebox({
                ajax: url
            });
            return false;
        }
        $('#id-message').attr('name', 'name');
        $('#post-message').attr('action', url).unbind().submit();
        return false;
    }
    $(function () {
        $('.message a.delete-message').live('click', deleteMessage);
        if ($('#post-message').length) {
            $('#post-message').submit(postMessage).keydown(inputKeyDownBehavior).keydown(autocomplete).keyup(inputKeyUpBehavior);
            $('#post-as-new-topic').click(postAsNewTopic);
        }
    });
})();
(function () {
    function getMoreMessages(e) {
        var url = $('#get-more-messages a').attr('href');
        $.ajax({
            url: url,
            data: {
                'more_message': convoreState.moreMessage
            },
            dataType: 'json',
            success: gotMoreMessages
        });
        return false;
    }

    function gotMoreMessages(resp) {
        var messages = resp.messages.reverse();
        for (var i = 0; i < messages.length; ++i) {
            var msg = messages[i];
            var rendered = $(msg.rendered).addClass('read');
            $('#get-more-messages').after(rendered);
            $('abbr.timeago', rendered).timeago();
        }
        if (resp.more) {
            convoreState.moreMessage = resp.more.id;
            $('#get-more-messages').show();
        } else {
            $('#get-more-messages').hide();
        }
    }

    function attachPaginationHandlers() {
        if ($('#get-more-messages a').length) {
            $('#get-more-messages a').click(getMoreMessages);
        }
    }
    $(function () {
        attachPaginationHandlers();
    });
})();
(function () {
    var droppedDown = null;
    var droppedDownTarget = null;
    var timer = null;
    var intentTimer = null;
    var isiOS = navigator.userAgent.match(/(ipad|iphone|ipod)/i) ? true : false;
    var isAndroid = navigator.userAgent.match(/(android)/i) ? true : false;

    function getElementForDropdown(elt) {
        var forDropdownEltId = null;
        var classes = $(elt).attr('class').split(' ');
        for (var i = 0; i < classes.length; ++i) {
            var cls = classes[i];
            if (cls.substr(0, 3) == 'for') {
                forDropdownEltId = cls.substr(4);
            }
        }
        if (!forDropdownEltId) {
            return;
        }
        return $('#' + forDropdownEltId)[0];
    }

    function buildDropdownClickHandler(target, down, secondary) {
        return function (e) {
            if (intentTimer) {
                clearTimeout(intentTimer);
            }
            intentTimer = setTimeout(function () {
                var elt = $(e.target);
                var alt = elt.attr('alt');
                if (alt) {
                    elt.attr('alt', elt.val() || elt.text()).text(alt).val(alt);
                }
                if (down) {
                    if (droppedDown && droppedDown !== target) {
                        $(droppedDown).slideUp(80);
                        droppedDownTarget.removeClass('is-hovering');
                    }
                    elt.addClass('is-hovering');
                    $(target).slideDown(80, function () {
                        droppedDown = target;
                        droppedDownTarget = elt;
                    });
                } else if (down === false) {
                    $(secondary).removeClass('is-hovering');
                    $(target).slideUp(80, function () {
                        if (droppedDown === target) {
                            droppedDown = null;
                            droppedDownTarget = null;
                        }
                    });
                } else {
                    elt.toggleClass('is-hovering');
                    $(target).slideToggle(80);
                }
            }, 150);
            return false;
        };
    }

    function buildStartCloseTimerCallback(target) {
        return function (e) {
            if (intentTimer) {
                clearTimeout(intentTimer);
            }
            var elt = $(e.target);
            timer = setTimeout(function () {
                elt.removeClass('is-hovering');
                $(target).slideUp(80);
            }, 350);
        };
    }

    function stopCloseTimer(e) {
        clearTimeout(timer);
    }

    function setupDropdown(elt) {
        var target = getElementForDropdown(elt);
        if (!target) {
            return;
        }
        if ($(elt).hasClass('hover')) {
            $(elt).mouseleave(buildStartCloseTimerCallback(target)).mouseenter(buildDropdownClickHandler(target, true));
            $(target).mouseenter(stopCloseTimer).mouseleave(buildDropdownClickHandler(target, false, elt));
            if (isiOS || isAndroid) {
                $(elt).click(function (e) {
                    return false;
                });
            }
        } else {
            $(elt).click(buildDropdownClickHandler(target));
        }
    }

    function setupAllDropdowns() {
        $('.dropdown').each(function (i, elt) {
            setupDropdown(elt);
        });
    }
    $(function () {
        setupAllDropdowns();
    });
})();

function addStar(message, username) {
    message.find('.star-message:first').addClass('starred');
    var names = message.find('.users-starred:first');
    if ($.trim(names.text())) {
        names.append(', ');
    }
    names.append(username);
}

function removeStar(message, username) {
    var names = message.find('.users-starred:first');
    var usernames = names.text().split(', ');
    usernames.splice($.inArray(username, usernames), 1);
    names.text(usernames.join(', '));
    if (usernames.length === 0) {
        message.find('.star-message:first').removeClass('starred');
    }
}(function () {
    function starMessage(e) {
        var message = $(e.target).closest('.message');
        var messageID = message.attr('id').replace('message-', '');
        var messageStar = message.find('.star-message:first');
        if (messageStar.hasClass('self-starred')) {
            removeStar(message, convoreState.username);
            messageStar.removeClass('self-starred');
        } else {
            addStar(message, convoreState.username);
            messageStar.addClass('self-starred');
        }
        $.post('/message/' + messageID + '/star/', function (data) {});
        return false;
    }

    function replyMessage(e) {
        var username = $(e.target).attr('data-username');
        var val = $('#id-message').val();
        if (val) {
            val = val + ' ';
        }
        var newVal = val + '@' + username + ' ';
        var field = $('#id-message').val(newVal)[0];
        createSelection(field, newVal.length, newVal.length);
        return false;
    }
    $(function () {
        $('.message a.star-message').live('click', starMessage);
        $('.message a.reply-message').live('click', replyMessage);
    });
})();
var AudioPlayer = {
    soundOn: true,
    alert: null,
    soundToggleLink: '#id-sound-toggle',
    soundToggleURL: '/settings/sound/',
    playAlert: function () {
        if (!this.soundOn) {
            return;
        }
        if (isiOS) {
            return;
        }
        if (this.alert) {
            this.alert.play();
        }
    },
    initAlert: function () {
        this.alert = soundManager.createSound({
            id: 'alert',
            url: '/media/audio/bell.mp3'
        });
    },
    updateSoundIcon: function () {
        if (this.soundOn) {
            $(this.soundToggleLink).html('<img src="/media/images/btn/sound-on.png" alt="turn sound off" title="turn sound off">');
            this.playAlert();
        } else {
            $(this.soundToggleLink).html('<img src="/media/images/btn/sound-off.png" alt="turn sound on" title="turn sound on">');
        }
    },
    toggleSound: function () {
        this.soundOn = !this.soundOn;
        this.updateSoundIcon();
        $.ajax({
            url: this.soundToggleURL,
            type: 'POST',
            data: {
                soundOn: this.soundOn
            },
            dataType: 'json'
        });
    }
};
soundManager.url = '/media/swf/';
soundManager.debugMode = false;
soundManager.onready(function () {
    if (soundManager.supported() && !isiOS) {
        $(AudioPlayer.soundToggleLink).live('click', function () {
            AudioPlayer.toggleSound();
            return false;
        });
        AudioPlayer.soundOn = (convoreState.userPrefSoundOn);
        AudioPlayer.updateSoundIcon();
        AudioPlayer.initAlert();
    }
});
var Fluid = {
    addDockBadge: function (badgeText) {
        if (!window.fluid) {
            return;
        }
        window.fluid.dockBadge = badgeText;
    },
    showGrowlNotification: function (id, title, description, icon, url) {
        if (!window.fluid) {
            return;
        }
        window.fluid.showGrowlNotification({
            title: title,
            description: description,
            priority: 1,
            sticky: false,
            identifier: id,
            onclick: function () {
                window.location = url;
            },
            icon: icon
        });
    }
};
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-19615926-1']);
_gaq.push(['_trackPageview']);
(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
