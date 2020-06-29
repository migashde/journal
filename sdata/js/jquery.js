var LANG={},CONF={};
(function(e, undefined){
    var t, n, r = typeof undefined,
        i = e.location,
        o = e.document,
        s = o.documentElement,
        a = e.jQuery,
        u = e.$,
        l = {},
        c = [],
        p = "2.0.3",
        f = c.concat,
        h = c.push,
        d = c.slice,
        g = c.indexOf,
        m = l.toString,
        y = l.hasOwnProperty,
        v = p.trim,
        x = function(e, n) {
            return new x.fn.init(e, n, t)
        },
        b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        w = /\S+/g,
        T = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        k = /^-ms-/,
        N = /-([\da-z])/gi,
        E = function(e, t) {
            return t.toUpperCase()
        },
        S = function() {
            o.removeEventListener("DOMContentLoaded", S, !1), e.removeEventListener("load", S, !1), x.ready()
        };
    x.fn = x.prototype = {
        jquery: p,
        constructor: x,
        init: function(e, t, n) {
            var r, i;
            if (!e) return this;
            if ("string" == typeof e) {
                if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), C.test(r[1]) && x.isPlainObject(t))
                        for (r in t) x.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = o.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = o, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e) {
            var t = x.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return x.each(this, e, t)
        },
        ready: function(e) {
            return x.ready.promise().done(e), this
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        map: function(e) {
            return this.pushStack(x.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: h,
        sort: [].sort,
        splice: [].splice
    }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function() {
        var e, t, n, r, i, o, s = arguments[0] || {},
            a = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, a = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === a && (s = this, --a); u > a; a++)
            if (null != (e = arguments[a]))
                for (t in e) n = s[t], r = e[t], s !== r && (l && r && (x.isPlainObject(r) || (i = x.isArray(r))) ? (i ? (i = !1, o = n && x.isArray(n) ? n : []) : o = n && x.isPlainObject(n) ? n : {}, s[t] = x.extend(l, o, r)) : r !== undefined && (s[t] = r));
        return s
    }, x.extend({
        expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""),
        noConflict: function(t) {
            return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = a), x
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? x.readyWait++ : x.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --x.readyWait : x.isReady) || (x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(o, [x]), x.fn.trigger && x(o).trigger("ready").off("ready")))
        },
        isFunction: function(e) {
            return "function" === x.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e
        },
        isPlainObject: function(e) {
            if ("object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1;
            try {
                if (e.constructor && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            return !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw Error(e)
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || o;
            var r = C.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes))
        },
        parseJSON: JSON.parse,
        parseXML: function(e) {
            var t, n;
            if (!e || "string" != typeof e) return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (r) {
                t = undefined
            }
            return (!t || t.getElementsByTagName("parsererror").length) && x.error("Invalid XML: " + e), t
        },
        noop: function() {},
        globalEval: function(e) {
            var t, n = eval;
            e = x.trim(e), e && (1 === e.indexOf("use strict") ? (t = o.createElement("script"), t.text = e, o.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(k, "ms-").replace(N, E)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, n) {
            var r, i = 0,
                o = e.length,
                s = j(e);
            if (n) {
                if (s) {
                    for (; o > i; i++)
                        if (r = t.apply(e[i], n), r === !1) break
                } else
                    for (i in e)
                        if (r = t.apply(e[i], n), r === !1) break
            } else if (s) {
                for (; o > i; i++)
                    if (r = t.call(e[i], i, e[i]), r === !1) break
            } else
                for (i in e)
                    if (r = t.call(e[i], i, e[i]), r === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : v.call(e)
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (j(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : g.call(t, e, n)
        },
        merge: function(e, t) {
            var n = t.length,
                r = e.length,
                i = 0;
            if ("number" == typeof n)
                for (; n > i; i++) e[r++] = t[i];
            else
                while (t[i] !== undefined) e[r++] = t[i++];
            return e.length = r, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                o = 0,
                s = e.length;
            for (n = !!n; s > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var r, i = 0,
                o = e.length,
                s = j(e),
                a = [];
            if (s)
                for (; o > i; i++) r = t(e[i], i, n), null != r && (a[a.length] = r);
            else
                for (i in e) r = t(e[i], i, n), null != r && (a[a.length] = r);
            return f.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), x.isFunction(e) ? (r = d.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(d.call(arguments)))
            }, i.guid = e.guid = e.guid || x.guid++, i) : undefined
        },
        access: function(e, t, n, r, i, o, s) {
            var a = 0,
                u = e.length,
                l = null == n;
            if ("object" === x.type(n)) {
                i = !0;
                for (a in n) x.access(e, t, a, n[a], !0, o, s)
            } else if (r !== undefined && (i = !0, x.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(x(e), n)
                })), t))
                for (; u > a; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        now: Date.now,
        swap: function(e, t, n, r) {
            var i, o, s = {};
            for (o in t) s[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = s[o];
            return i
        }
    }), x.ready.promise = function(t) {
        return n || (n = x.Deferred(), "complete" === o.readyState ? setTimeout(x.ready) : (o.addEventListener("DOMContentLoaded", S, !1), e.addEventListener("load", S, !1))), n.promise(t)
    }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    });
    function j(e) {
        var t = e.length,
            n = x.type(e);
        return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    t = x(o),
        function(e, undefined) {
            var t, n, r, i, o, s, a, u, l, c, p, f, h, d, g, m, y, v = "sizzle" + -new Date,
                b = e.document,
                w = 0,
                T = 0,
                C = st(),
                k = st(),
                N = st(),
                E = !1,
                S = function(e, t) {
                    return e === t ? (E = !0, 0) : 0
                },
                j = typeof undefined,
                D = 1 << 31,
                A = {}.hasOwnProperty,
                L = [],
                q = L.pop,
                H = L.push,
                O = L.push,
                F = L.slice,
                P = L.indexOf || function(e) {
                    var t = 0,
                        n = this.length;
                    for (; n > t; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                M = "[\\x20\\t\\r\\n\\f]",
                W = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                $ = W.replace("w", "w#"),
                B = "\\[" + M + "*(" + W + ")" + M + "*(?:([*^$|!~]?=)" + M + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + $ + ")|)|)" + M + "*\\]",
                I = ":(" + W + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + B.replace(3, 8) + ")*)|.*)\\)|)",
                z = RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
                _ = RegExp("^" + M + "*," + M + "*"),
                X = RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
                U = RegExp(M + "*[+~]"),
                Y = RegExp("=" + M + "*([^\\]'\"]*)" + M + "*\\]", "g"),
                V = RegExp(I),
                G = RegExp("^" + $ + "$"),
                J = {
                    ID: RegExp("^#(" + W + ")"),
                    CLASS: RegExp("^\\.(" + W + ")"),
                    TAG: RegExp("^(" + W.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + B),
                    PSEUDO: RegExp("^" + I),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + R + ")$", "i"),
                    needsContext: RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
                },
                Q = /^[^{]+\{\s*\[native \w/,
                K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Z = /^(?:input|select|textarea|button)$/i,
                et = /^h\d$/i,
                tt = /'|\\/g,
                nt = RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
                rt = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
                };
            try {
                O.apply(L = F.call(b.childNodes), b.childNodes), L[b.childNodes.length].nodeType
            } catch (it) {
                O = {
                    apply: L.length ? function(e, t) {
                        H.apply(e, F.call(t))
                    } : function(e, t) {
                        var n = e.length,
                            r = 0;
                        while (e[n++] = t[r++]);
                        e.length = n - 1
                    }
                }
            }
            function ot(e, t, r, i) {
                var o, s, a, u, l, f, g, m, x, w;
                if ((t ? t.ownerDocument || t : b) !== p && c(t), t = t || p, r = r || [], !e || "string" != typeof e) return r;
                if (1 !== (u = t.nodeType) && 9 !== u) return [];
                if (h && !i) {
                    if (o = K.exec(e))
                        if (a = o[1]) {
                            if (9 === u) {
                                if (s = t.getElementById(a), !s || !s.parentNode) return r;
                                if (s.id === a) return r.push(s), r
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && y(t, s) && s.id === a) return r.push(s), r
                        } else {
                            if (o[2]) return O.apply(r, t.getElementsByTagName(e)), r;
                            if ((a = o[3]) && n.getElementsByClassName && t.getElementsByClassName) return O.apply(r, t.getElementsByClassName(a)), r
                        }
                    if (n.qsa && (!d || !d.test(e))) {
                        if (m = g = v, x = t, w = 9 === u && e, 1 === u && "object" !== t.nodeName.toLowerCase()) {
                            f = gt(e), (g = t.getAttribute("id")) ? m = g.replace(tt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", l = f.length;
                            while (l--) f[l] = m + mt(f[l]);
                            x = U.test(e) && t.parentNode || t, w = f.join(",")
                        }
                        if (w) try {
                            return O.apply(r, x.querySelectorAll(w)), r
                        } catch (T) {} finally {
                            g || t.removeAttribute("id")
                        }
                    }
                }
                return kt(e.replace(z, "$1"), t, r, i)
            }
            function st() {
                var e = [];
                function t(n, r) {
                    return e.push(n += " ") > i.cacheLength && delete t[e.shift()], t[n] = r
                }
                return t
            }
            function at(e) {
                return e[v] = !0, e
            }
            function ut(e) {
                var t = p.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }
            function lt(e, t) {
                var n = e.split("|"),
                    r = e.length;
                while (r--) i.attrHandle[n[r]] = t
            }
            function ct(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
                if (r) return r;
                if (n)
                    while (n = n.nextSibling)
                        if (n === t) return -1;
                return e ? 1 : -1
            }
            function pt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }
            function ft(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }
            function ht(e) {
                return at(function(t) {
                    return t = +t, at(function(n, r) {
                        var i, o = e([], n.length, t),
                            s = o.length;
                        while (s--) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }
            s = ot.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, n = ot.support = {}, c = ot.setDocument = function(e) {
                var t = e ? e.ownerDocument || e : b,
                    r = t.defaultView;
                return t !== p && 9 === t.nodeType && t.documentElement ? (p = t, f = t.documentElement, h = !s(t), r && r.attachEvent && r !== r.top && r.attachEvent("onbeforeunload", function() {
                    c()
                }), n.attributes = ut(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), n.getElementsByTagName = ut(function(e) {
                    return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
                }), n.getElementsByClassName = ut(function(e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), n.getById = ut(function(e) {
                    return f.appendChild(e).id = v, !t.getElementsByName || !t.getElementsByName(v).length
                }), n.getById ? (i.find.ID = function(e, t) {
                    if (typeof t.getElementById !== j && h) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, i.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete i.find.ID, i.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), i.find.TAG = n.getElementsByTagName ? function(e, t) {
                    return typeof t.getElementsByTagName !== j ? t.getElementsByTagName(e) : undefined
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = o[i++]) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, i.find.CLASS = n.getElementsByClassName && function(e, t) {
                    return typeof t.getElementsByClassName !== j && h ? t.getElementsByClassName(e) : undefined
                }, g = [], d = [], (n.qsa = Q.test(t.querySelectorAll)) && (ut(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll(":checked").length || d.push(":checked")
                }), ut(function(e) {
                    var n = t.createElement("input");
                    n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && d.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:")
                })), (n.matchesSelector = Q.test(m = f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && ut(function(e) {
                    n.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", I)
                }), d = d.length && RegExp(d.join("|")), g = g.length && RegExp(g.join("|")), y = Q.test(f.contains) || f.compareDocumentPosition ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function(e, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === e) return !0;
                    return !1
                }, S = f.compareDocumentPosition ? function(e, r) {
                    if (e === r) return E = !0, 0;
                    var i = r.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(r);
                    return i ? 1 & i || !n.sortDetached && r.compareDocumentPosition(e) === i ? e === t || y(b, e) ? -1 : r === t || y(b, r) ? 1 : l ? P.call(l, e) - P.call(l, r) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function(e, n) {
                    var r, i = 0,
                        o = e.parentNode,
                        s = n.parentNode,
                        a = [e],
                        u = [n];
                    if (e === n) return E = !0, 0;
                    if (!o || !s) return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : l ? P.call(l, e) - P.call(l, n) : 0;
                    if (o === s) return ct(e, n);
                    r = e;
                    while (r = r.parentNode) a.unshift(r);
                    r = n;
                    while (r = r.parentNode) u.unshift(r);
                    while (a[i] === u[i]) i++;
                    return i ? ct(a[i], u[i]) : a[i] === b ? -1 : u[i] === b ? 1 : 0
                }, t) : p
            }, ot.matches = function(e, t) {
                return ot(e, null, null, t)
            }, ot.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Y, "='$1']"), !(!n.matchesSelector || !h || g && g.test(t) || d && d.test(t))) try {
                    var r = m.call(e, t);
                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                } catch (i) {}
                return ot(t, p, null, [e]).length > 0
            }, ot.contains = function(e, t) {
                return (e.ownerDocument || e) !== p && c(e), y(e, t)
            }, ot.attr = function(e, t) {
                (e.ownerDocument || e) !== p && c(e);
                var r = i.attrHandle[t.toLowerCase()],
                    o = r && A.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !h) : undefined;
                return o === undefined ? n.attributes || !h ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null : o
            }, ot.error = function(e) {
                throw Error("Syntax error, unrecognized expression: " + e)
            }, ot.uniqueSort = function(e) {
                var t, r = [],
                    i = 0,
                    o = 0;
                if (E = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(S), E) {
                    while (t = e[o++]) t === e[o] && (i = r.push(o));
                    while (i--) e.splice(r[i], 1)
                }
                return e
            }, o = ot.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += o(t);
                return n
            }, i = ot.selectors = {
                cacheLength: 50,
                createPseudo: at,
                match: J,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(nt, rt), e[3] = (e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[5] && e[2];
                        return J.CHILD.test(e[0]) ? null : (e[3] && e[4] !== undefined ? e[2] = e[4] : n && V.test(n) && (t = gt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(nt, rt).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = C[e + " "];
                        return t || (t = RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && C(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var i = ot.attr(r, e);
                            return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3),
                            s = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === r && 0 === i ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var l, c, p, f, h, d, g = o !== s ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                y = a && t.nodeName.toLowerCase(),
                                x = !u && !a;
                            if (m) {
                                if (o) {
                                    while (g) {
                                        p = t;
                                        while (p = p[g])
                                            if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                        d = g = "only" === e && !d && "nextSibling"
                                    }
                                    return !0
                                }
                                if (d = [s ? m.firstChild : m.lastChild], s && x) {
                                    c = m[v] || (m[v] = {}), l = c[e] || [], h = l[0] === w && l[1], f = l[0] === w && l[2], p = h && m.childNodes[h];
                                    while (p = ++h && p && p[g] || (f = h = 0) || d.pop())
                                        if (1 === p.nodeType && ++f && p === t) {
                                            c[e] = [w, h, f];
                                            break
                                        }
                                } else if (x && (l = (t[v] || (t[v] = {}))[e]) && l[0] === w) f = l[1];
                                else
                                    while (p = ++h && p && p[g] || (f = h = 0) || d.pop())
                                        if ((a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (x && ((p[v] || (p[v] = {}))[e] = [w, f]), p === t)) break; return f -= i, f === r || 0 === f % r && f / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                        return r[v] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function(e, n) {
                            var i, o = r(e, t),
                                s = o.length;
                            while (s--) i = P.call(e, o[s]), e[i] = !(n[i] = o[s])
                        }) : function(e) {
                            return r(e, 0, n)
                        }) : r
                    }
                },
                pseudos: {
                    not: at(function(e) {
                        var t = [],
                            n = [],
                            r = a(e.replace(z, "$1"));
                        return r[v] ? at(function(e, t, n, i) {
                            var o, s = r(e, null, i, []),
                                a = e.length;
                            while (a--)(o = s[a]) && (e[a] = !(t[a] = o))
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), !n.pop()
                        }
                    }),
                    has: at(function(e) {
                        return function(t) {
                            return ot(e, t).length > 0
                        }
                    }),
                    contains: at(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || o(t)).toLowerCase().indexOf(e.toLowerCase()) > -1
                        }
                    }),
                    lang: at(function(e) {
                        return G.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === f
                    },
                    focus: function(e) {
                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !i.pseudos.empty(e)
                    },
                    header: function(e) {
                        return et.test(e.nodeName)
                    },
                    input: function(e) {
                        return Z.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                    },
                    first: ht(function() {
                        return [0]
                    }),
                    last: ht(function(e, t) {
                        return [t - 1]
                    }),
                    eq: ht(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: ht(function(e, t) {
                        var n = 0;
                        for (; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: ht(function(e, t) {
                        var n = 1;
                        for (; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: ht(function(e, t, n) {
                        var r = 0 > n ? n + t : n;
                        for (; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: ht(function(e, t, n) {
                        var r = 0 > n ? n + t : n;
                        for (; t > ++r;) e.push(r);
                        return e
                    })
                }
            }, i.pseudos.nth = i.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) i.pseudos[t] = pt(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) i.pseudos[t] = ft(t);
            function dt() {}
            dt.prototype = i.filters = i.pseudos, i.setFilters = new dt;
            function gt(e, t) {
                var n, r, o, s, a, u, l, c = k[e + " "];
                if (c) return t ? 0 : c.slice(0);
                a = e, u = [], l = i.preFilter;
                while (a) {
                    (!n || (r = _.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(o = [])), n = !1, (r = X.exec(a)) && (n = r.shift(), o.push({
                        value: n,
                        type: r[0].replace(z, " ")
                    }), a = a.slice(n.length));
                    for (s in i.filter) !(r = J[s].exec(a)) || l[s] && !(r = l[s](r)) || (n = r.shift(), o.push({
                        value: n,
                        type: s,
                        matches: r
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return t ? a.length : a ? ot.error(e) : k(e, u).slice(0)
            }
            function mt(e) {
                var t = 0,
                    n = e.length,
                    r = "";
                for (; n > t; t++) r += e[t].value;
                return r
            }
            function yt(e, t, n) {
                var i = t.dir,
                    o = n && "parentNode" === i,
                    s = T++;
                return t.first ? function(t, n, r) {
                    while (t = t[i])
                        if (1 === t.nodeType || o) return e(t, n, r)
                } : function(t, n, a) {
                    var u, l, c, p = w + " " + s;
                    if (a) {
                        while (t = t[i])
                            if ((1 === t.nodeType || o) && e(t, n, a)) return !0
                    } else
                        while (t = t[i])
                            if (1 === t.nodeType || o)
                                if (c = t[v] || (t[v] = {}), (l = c[i]) && l[0] === p) {
                                    if ((u = l[1]) === !0 || u === r) return u === !0
                                } else if (l = c[i] = [p], l[1] = e(t, n, a) || r, l[1] === !0) return !0
                }
            }
            function vt(e) {
                return e.length > 1 ? function(t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }
            function xt(e, t, n, r, i) {
                var o, s = [],
                    a = 0,
                    u = e.length,
                    l = null != t;
                for (; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
                return s
            }
            function bt(e, t, n, r, i, o) {
                return r && !r[v] && (r = bt(r)), i && !i[v] && (i = bt(i, o)), at(function(o, s, a, u) {
                    var l, c, p, f = [],
                        h = [],
                        d = s.length,
                        g = o || Ct(t || "*", a.nodeType ? [a] : a, []),
                        m = !e || !o && t ? g : xt(g, f, e, a, u),
                        y = n ? i || (o ? e : d || r) ? [] : s : m;
                    if (n && n(m, y, a, u), r) {
                        l = xt(y, h), r(l, [], a, u), c = l.length;
                        while (c--)(p = l[c]) && (y[h[c]] = !(m[h[c]] = p))
                    }
                    if (o) {
                        if (i || e) {
                            if (i) {
                                l = [], c = y.length;
                                while (c--)(p = y[c]) && l.push(m[c] = p);
                                i(null, y = [], l, u)
                            }
                            c = y.length;
                            while (c--)(p = y[c]) && (l = i ? P.call(o, p) : f[c]) > -1 && (o[l] = !(s[l] = p))
                        }
                    } else y = xt(y === s ? y.splice(d, y.length) : y), i ? i(null, s, y, u) : O.apply(s, y)
                })
            }
            function wt(e) {
                var t, n, r, o = e.length,
                    s = i.relative[e[0].type],
                    a = s || i.relative[" "],
                    l = s ? 1 : 0,
                    c = yt(function(e) {
                        return e === t
                    }, a, !0),
                    p = yt(function(e) {
                        return P.call(t, e) > -1
                    }, a, !0),
                    f = [function(e, n, r) {
                        return !s && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r))
                    }];
                for (; o > l; l++)
                    if (n = i.relative[e[l].type]) f = [yt(vt(f), n)];
                    else {
                        if (n = i.filter[e[l].type].apply(null, e[l].matches), n[v]) {
                            for (r = ++l; o > r; r++)
                                if (i.relative[e[r].type]) break;
                            return bt(l > 1 && vt(f), l > 1 && mt(e.slice(0, l - 1).concat({
                                value: " " === e[l - 2].type ? "*" : ""
                            })).replace(z, "$1"), n, r > l && wt(e.slice(l, r)), o > r && wt(e = e.slice(r)), o > r && mt(e))
                        }
                        f.push(n)
                    }
                return vt(f)
            }
            function Tt(e, t) {
                var n = 0,
                    o = t.length > 0,
                    s = e.length > 0,
                    a = function(a, l, c, f, h) {
                        var d, g, m, y = [],
                            v = 0,
                            x = "0",
                            b = a && [],
                            T = null != h,
                            C = u,
                            k = a || s && i.find.TAG("*", h && l.parentNode || l),
                            N = w += null == C ? 1 : Math.random() || .1;
                        for (T && (u = l !== p && l, r = n); null != (d = k[x]); x++) {
                            if (s && d) {
                                g = 0;
                                while (m = e[g++])
                                    if (m(d, l, c)) {
                                        f.push(d);
                                        break
                                    }
                                T && (w = N, r = ++n)
                            }
                            o && ((d = !m && d) && v--, a && b.push(d))
                        }
                        if (v += x, o && x !== v) {
                            g = 0;
                            while (m = t[g++]) m(b, y, l, c);
                            if (a) {
                                if (v > 0)
                                    while (x--) b[x] || y[x] || (y[x] = q.call(f));
                                y = xt(y)
                            }
                            O.apply(f, y), T && !a && y.length > 0 && v + t.length > 1 && ot.uniqueSort(f)
                        }
                        return T && (w = N, u = C), b
                    };
                return o ? at(a) : a
            }
            a = ot.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    o = N[e + " "];
                if (!o) {
                    t || (t = gt(e)), n = t.length;
                    while (n--) o = wt(t[n]), o[v] ? r.push(o) : i.push(o);
                    o = N(e, Tt(i, r))
                }
                return o
            };
            function Ct(e, t, n) {
                var r = 0,
                    i = t.length;
                for (; i > r; r++) ot(e, t[r], n);
                return n
            }
            function kt(e, t, r, o) {
                var s, u, l, c, p, f = gt(e);
                if (!o && 1 === f.length) {
                    if (u = f[0] = f[0].slice(0), u.length > 2 && "ID" === (l = u[0]).type && n.getById && 9 === t.nodeType && h && i.relative[u[1].type]) {
                        if (t = (i.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t) return r;
                        e = e.slice(u.shift().value.length)
                    }
                    s = J.needsContext.test(e) ? 0 : u.length;
                    while (s--) {
                        if (l = u[s], i.relative[c = l.type]) break;
                        if ((p = i.find[c]) && (o = p(l.matches[0].replace(nt, rt), U.test(u[0].type) && t.parentNode || t))) {
                            if (u.splice(s, 1), e = o.length && mt(u), !e) return O.apply(r, o), r;
                            break
                        }
                    }
                }
                return a(e, f)(o, t, !h, r, U.test(e)), r
            }
            n.sortStable = v.split("").sort(S).join("") === v, n.detectDuplicates = E, c(), n.sortDetached = ut(function(e) {
                return 1 & e.compareDocumentPosition(p.createElement("div"))
            }), ut(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || lt("type|href|height|width", function(e, t, n) {
                return n ? undefined : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), n.attributes && ut(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || lt("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? undefined : e.defaultValue
            }), ut(function(e) {
                return null == e.getAttribute("disabled")
            }) || lt(R, function(e, t, n) {
                var r;
                return n ? undefined : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
            }), x.find = ot, x.expr = ot.selectors, x.expr[":"] = x.expr.pseudos, x.unique = ot.uniqueSort, x.text = ot.getText, x.isXMLDoc = ot.isXML, x.contains = ot.contains
        }(e);
    var D = {};
    function A(e) {
        var t = D[e] = {};
        return x.each(e.match(w) || [], function(e, n) {
            t[n] = !0
        }), t
    }
    x.Callbacks = function(e) {
        e = "string" == typeof e ? D[e] || A(e) : x.extend({}, e);
        var t, n, r, i, o, s, a = [],
            u = !e.once && [],
            l = function(p) {
                for (t = e.memory && p, n = !0, s = i || 0, i = 0, o = a.length, r = !0; a && o > s; s++)
                    if (a[s].apply(p[0], p[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                r = !1, a && (u ? u.length && l(u.shift()) : t ? a = [] : c.disable())
            },
            c = {
                add: function() {
                    if (a) {
                        var n = a.length;
                        (function s(t) {
                            x.each(t, function(t, n) {
                                var r = x.type(n);
                                "function" === r ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== r && s(n)
                            })
                        })(arguments), r ? o = a.length : t && (i = n, l(t))
                    }
                    return this
                },
                remove: function() {
                    return a && x.each(arguments, function(e, t) {
                        var n;
                        while ((n = x.inArray(t, a, n)) > -1) a.splice(n, 1), r && (o >= n && o--, s >= n && s--)
                    }), this
                },
                has: function(e) {
                    return e ? x.inArray(e, a) > -1 : !(!a || !a.length)
                },
                empty: function() {
                    return a = [], o = 0, this
                },
                disable: function() {
                    return a = u = t = undefined, this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return u = undefined, t || c.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, t) {
                    return !a || n && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? u.push(t) : l(t)), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return c
    }, x.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", x.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", x.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", x.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return x.Deferred(function(n) {
                            x.each(t, function(t, o) {
                                var s = o[0],
                                    a = x.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? x.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, x.each(t, function(e, o) {
                var s = o[2],
                    a = o[3];
                r[o[1]] = s.add, a && s.add(function() {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = s.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = d.call(arguments),
                r = n.length,
                i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
                o = 1 === i ? e : x.Deferred(),
                s = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
                    }
                },
                a, u, l;
            if (r > 1)
                for (a = Array(r), u = Array(r), l = Array(r); r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(s(t, l, n)).fail(o.reject).progress(s(t, u, a)) : --i;
            return i || o.resolveWith(l, n), o.promise()
        }
    }), x.support = function(t) {
        var n = o.createElement("input"),
            r = o.createDocumentFragment(),
            i = o.createElement("div"),
            s = o.createElement("select"),
            a = s.appendChild(o.createElement("option"));
        return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled, n = o.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, x(function() {
            var n, r, s = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                a = o.getElementsByTagName("body")[0];
            a && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", x.swap(a, null != a.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === i.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
                width: "4px"
            }).width, r = i.appendChild(o.createElement("div")), r.style.cssText = i.style.cssText = s, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n))
        }), t) : t
    }({});
    var L, q, H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        O = /([A-Z])/g;
    function F() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = x.expando + Math.random()
    }
    F.uid = 1, F.accepts = function(e) {
        return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
    }, F.prototype = {
        key: function(e) {
            if (!F.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = F.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, x.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
                o = this.cache[i];
            if ("string" == typeof t) o[t] = n;
            else if (x.isEmptyObject(o)) x.extend(this.cache[i], t);
            else
                for (r in t) o[r] = t[r];
            return o
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t]
        },
        access: function(e, t, n) {
            var r;
            return t === undefined || t && "string" == typeof t && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, x.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function(e, t) {
            var n, r, i, o = this.key(e),
                s = this.cache[o];
            if (t === undefined) this.cache[o] = {};
            else {
                x.isArray(t) ? r = t.concat(t.map(x.camelCase)) : (i = x.camelCase(t), t in s ? r = [t, i] : (r = i, r = r in s ? [r] : r.match(w) || [])), n = r.length;
                while (n--) delete s[r[n]]
            }
        },
        hasData: function(e) {
            return !x.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    }, L = new F, q = new F, x.extend({
        acceptData: F.accepts,
        hasData: function(e) {
            return L.hasData(e) || q.hasData(e)
        },
        data: function(e, t, n) {
            return L.access(e, t, n)
        },
        removeData: function(e, t) {
            L.remove(e, t)
        },
        _data: function(e, t, n) {
            return q.access(e, t, n)
        },
        _removeData: function(e, t) {
            q.remove(e, t)
        }
    }), x.fn.extend({
        data: function(e, t) {
            var n, r, i = this[0],
                o = 0,
                s = null;
            if (e === undefined) {
                if (this.length && (s = L.get(i), 1 === i.nodeType && !q.get(i, "hasDataAttrs"))) {
                    for (n = i.attributes; n.length > o; o++) r = n[o].name, 0 === r.indexOf("data-") && (r = x.camelCase(r.slice(5)), P(i, r, s[r]));
                    q.set(i, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function() {
                L.set(this, e)
            }) : x.access(this, function(t) {
                var n, r = x.camelCase(e);
                if (i && t === undefined) {
                    if (n = L.get(i, e), n !== undefined) return n;
                    if (n = L.get(i, r), n !== undefined) return n;
                    if (n = P(i, r, undefined), n !== undefined) return n
                } else this.each(function() {
                    var n = L.get(this, r);
                    L.set(this, r, t), -1 !== e.indexOf("-") && n !== undefined && L.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                L.remove(this, e)
            })
        }
    });
    function P(e, t, n) {
        var r;
        if (n === undefined && 1 === e.nodeType)
            if (r = "data-" + t.replace(O, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : H.test(n) ? JSON.parse(n) : n
                } catch (i) {}
                L.set(e, t, n)
            } else n = undefined;
        return n
    }
    x.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = q.get(e, t), n && (!r || x.isArray(n) ? r = q.access(e, t, x.makeArray(n)) : r.push(n)), r || []) : undefined
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = x.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = x._queueHooks(e, t),
                s = function() {
                    x.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return q.get(e, n) || q.access(e, n, {
                empty: x.Callbacks("once memory").add(function() {
                    q.remove(e, [t + "queue", n])
                })
            })
        }
    }), x.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? x.queue(this[0], e) : t === undefined ? this : this.each(function() {
                var n = x.queue(this, e, t);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                x.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = x.Deferred(),
                o = this,
                s = this.length,
                a = function() {
                    --r || i.resolveWith(o, [o])
                };
            "string" != typeof e && (t = e, e = undefined), e = e || "fx";
            while (s--) n = q.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
            return a(), i.promise(t)
        }
    });
    var R, M, W = /[\t\r\n\f]/g,
        $ = /\r/g,
        B = /^(?:input|select|textarea|button)$/i;
    x.fn.extend({
        attr: function(e, t) {
            return x.access(this, x.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                x.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return x.access(this, x.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[x.propFix[e] || e]
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, s = 0,
                a = this.length,
                u = "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).addClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(w) || []; a > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : " ")) {
                        o = 0;
                        while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
                        n.className = x.trim(r)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, s = 0,
                a = this.length,
                u = 0 === arguments.length || "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).removeClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(w) || []; a > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : "")) {
                        o = 0;
                        while (i = t[o++])
                            while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                        n.className = e ? x.trim(r) : ""
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function(n) {
                x(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if ("string" === n) {
                    var t, i = 0,
                        o = x(this),
                        s = e.match(w) || [];
                    while (t = s[i++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t)
                } else(n === r || "boolean" === n) && (this.className && q.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : q.get(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(W, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = x.isFunction(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, x(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : x.isArray(i) && (i = x.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, i, "value") !== undefined || (this.value = i))
                });
                if (i) return t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, "string" == typeof n ? n.replace($, "") : null == n ? "" : n)
            }
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        o = "select-one" === e.type || 0 > i,
                        s = o ? null : [],
                        a = o ? i + 1 : r.length,
                        u = 0 > i ? a : o ? i : 0;
                    for (; a > u; u++)
                        if (n = r[u], !(!n.selected && u !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
                            if (t = x(n).val(), o) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        o = x.makeArray(t),
                        s = i.length;
                    while (s--) r = i[s], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        },
        attr: function(e, t, n) {
            var i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === r ? x.prop(e, t, n) : (1 === s && x.isXMLDoc(e) || (t = t.toLowerCase(), i = x.attrHooks[t] || (x.expr.match.bool.test(t) ? M : R)), n === undefined ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = x.find.attr(e, t), null == o ? undefined : o) : null !== n ? i && "set" in i && (o = i.set(e, n, t)) !== undefined ? o : (e.setAttribute(t, n + ""), n) : (x.removeAttr(e, t), undefined))
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(w);
            if (o && 1 === e.nodeType)
                while (n = o[i++]) r = x.propFix[n] || n, x.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return o = 1 !== s || !x.isXMLDoc(e), o && (t = x.propFix[t] || t, i = x.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || B.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), M = {
        set: function(e, t, n) {
            return t === !1 ? x.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = x.expr.attrHandle[t] || x.find.attr;
        x.expr.attrHandle[t] = function(e, t, r) {
            var i = x.expr.attrHandle[t],
                o = r ? undefined : (x.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            return x.expr.attrHandle[t] = i, o
        }
    }), x.support.optSelected || (x.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        x.propFix[this.toLowerCase()] = this
    }), x.each(["radio", "checkbox"], function() {
        x.valHooks[this] = {
            set: function(e, t) {
                return x.isArray(t) ? e.checked = x.inArray(x(e).val(), t) >= 0 : undefined
            }
        }, x.support.checkOn || (x.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var I = /^key/,
        z = /^(?:mouse|contextmenu)|click/,
        _ = /^(?:focusinfocus|focusoutblur)$/,
        X = /^([^.]*)(?:\.(.+)|)$/;
    function U() {
        return !0
    }
    function Y() {
        return !1
    }
    function V() {
        try {
            return o.activeElement
        } catch (e) {}
    }
    x.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var s, a, u, l, c, p, f, h, d, g, m, y = q.get(e);
            if (y) {
                n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = x.guid++), (l = y.events) || (l = y.events = {}), (a = y.handle) || (a = y.handle = function(e) {
                    return typeof x === r || e && x.event.triggered === e.type ? undefined : x.event.dispatch.apply(a.elem, arguments)
                }, a.elem = e), t = (t || "").match(w) || [""], c = t.length;
                while (c--) u = X.exec(t[c]) || [], d = m = u[1], g = (u[2] || "").split(".").sort(), d && (f = x.event.special[d] || {}, d = (o ? f.delegateType : f.bindType) || d, f = x.event.special[d] || {}, p = x.extend({
                    type: d,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && x.expr.match.needsContext.test(o),
                    namespace: g.join(".")
                }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, f.setup && f.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, p) : h.push(p), x.event.global[d] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, s, a, u, l, c, p, f, h, d, g, m = q.hasData(e) && q.get(e);
            if (m && (u = m.events)) {
                t = (t || "").match(w) || [""], l = t.length;
                while (l--)
                    if (a = X.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
                        p = x.event.special[h] || {}, h = (r ? p.delegateType : p.bindType) || h, f = u[h] || [], a = a[2] && RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = f.length;
                        while (o--) c = f[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, p.remove && p.remove.call(e, c));
                        s && !f.length && (p.teardown && p.teardown.call(e, d, m.handle) !== !1 || x.removeEvent(e, h, m.handle), delete u[h])
                    } else
                        for (h in u) x.event.remove(e, h + t[l], n, r, !0);
                x.isEmptyObject(u) && (delete m.handle, q.remove(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var s, a, u, l, c, p, f, h = [r || o],
                d = y.call(t, "type") ? t.type : t,
                g = y.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !_.test(d + x.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = 0 > d.indexOf(":") && "on" + d, t = t[x.expando] ? t : new x.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), f = x.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !x.isWindow(r)) {
                    for (l = f.delegateType || d, _.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), u = a;
                    u === (r.ownerDocument || o) && h.push(u.defaultView || u.parentWindow || e)
                }
                s = 0;
                while ((a = h[s++]) && !t.isPropagationStopped()) t.type = s > 1 ? l : f.bindType || d, p = (q.get(a, "events") || {})[t.type] && q.get(a, "handle"), p && p.apply(a, n), p = c && a[c], p && x.acceptData(a) && p.apply && p.apply(a, n) === !1 && t.preventDefault();
                return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(h.pop(), n) !== !1 || !x.acceptData(r) || c && x.isFunction(r[d]) && !x.isWindow(r) && (u = r[c], u && (r[c] = null), x.event.triggered = d, r[d](), x.event.triggered = undefined, u && (r[c] = u)), t.result
            }
        },
        dispatch: function(e) {
            e = x.event.fix(e);
            var t, n, r, i, o, s = [],
                a = d.call(arguments),
                u = (q.get(this, "events") || {})[e.type] || [],
                l = x.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                s = x.event.handlers.call(this, e, u), t = 0;
                while ((i = s[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = i.elem, n = 0;
                    while ((o = i.handlers[n++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
                }
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, s = [],
                a = t.delegateCount,
                u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type))
                for (; u !== this; u = u.parentNode || this)
                    if (u.disabled !== !0 || "click" !== e.type) {
                        for (r = [], n = 0; a > n; n++) o = t[n], i = o.selector + " ", r[i] === undefined && (r[i] = o.needsContext ? x(i, this).index(u) >= 0 : x.find(i, this, null, [u]).length), r[i] && r.push(o);
                        r.length && s.push({
                            elem: u,
                            handlers: r
                        })
                    }
            return t.length > a && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, s = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || o, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || s === undefined || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[x.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                a = this.fixHooks[i];
            a || (this.fixHooks[i] = a = z.test(i) ? this.mouseHooks : I.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new x.Event(s), t = r.length;
            while (t--) n = r[t], e[n] = s[n];
            return e.target || (e.target = o), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== V() && this.focus ? (this.focus(), !1) : undefined
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === V() && this.blur ? (this.blur(), !1) : undefined
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && x.nodeName(this, "input") ? (this.click(), !1) : undefined
                },
                _default: function(e) {
                    return x.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== undefined && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = x.extend(new x.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, x.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, x.Event = function(e, t) {
        return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? U : Y) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, undefined) : new x.Event(e, t)
    }, x.Event.prototype = {
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = U, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = U, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = U, this.stopPropagation()
        }
    }, x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), x.support.focusinBubbles || x.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                x.event.simulate(t, e.target, x.event.fix(e), !0)
            };
        x.event.special[t] = {
            setup: function() {
                0 === n++ && o.addEventListener(e, r, !0)
            },
            teardown: function() {
                0 === --n && o.removeEventListener(e, r, !0)
            }
        }
    }), x.fn.extend({
        on: function(e, t, n, r, i) {
            var o, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = undefined);
                for (s in e) this.on(s, t, n, e[s], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = undefined) : null == r && ("string" == typeof t ? (r = n, n = undefined) : (r = n, n = t, t = undefined)), r === !1) r = Y;
            else if (!r) return this;
            return 1 === i && (o = r, r = function(e) {
                return x().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = x.guid++)), this.each(function() {
                x.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = undefined), n === !1 && (n = Y), this.each(function() {
                x.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                x.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? x.event.trigger(e, t, n, !0) : undefined
        }
    });
    var G = /^.[^:#\[\.,]*$/,
        J = /^(?:parents|prev(?:Until|All))/,
        Q = x.expr.match.needsContext,
        K = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    x.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(x(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (x.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) x.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        has: function(e) {
            var t = x(e, this),
                n = t.length;
            return this.filter(function() {
                var e = 0;
                for (; n > e; e++)
                    if (x.contains(this, t[e])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(et(this, e || [], !0))
        },
        filter: function(e) {
            return this.pushStack(et(this, e || [], !1))
        },
        is: function(e) {
            return !!et(this, "string" == typeof e && Q.test(e) ? x(e) : e || [], !1).length
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                s = Q.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
            for (; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                        n = o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? x.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? g.call(x(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
                r = x.merge(this.get(), n);
            return this.pushStack(x.unique(r))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });
    function Z(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }
    x.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return x.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return x.dir(e, "parentNode", n)
        },
        next: function(e) {
            return Z(e, "nextSibling")
        },
        prev: function(e) {
            return Z(e, "previousSibling")
        },
        nextAll: function(e) {
            return x.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return x.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return x.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return x.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return x.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return x.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || x.merge([], e.childNodes)
        }
    }, function(e, t) {
        x.fn[e] = function(n, r) {
            var i = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (K[e] || x.unique(i), J.test(e) && i.reverse()), this.pushStack(i)
        }
    }), x.extend({
        filter: function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
        dir: function(e, t, n) {
            var r = [],
                i = n !== undefined;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && x(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    function et(e, t, n) {
        if (x.isFunction(t)) return x.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return x.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (G.test(t)) return x.filter(t, e, n);
            t = x.filter(t, e)
        }
        return x.grep(e, function(e) {
            return g.call(t, e) >= 0 !== n
        })
    }
    var tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        nt = /<([\w:]+)/,
        rt = /<|&#?\w+;/,
        it = /<(?:script|style|link)/i,
        ot = /^(?:checkbox|radio)$/i,
        st = /checked\s*(?:[^=]|=\s*.checked.)/i,
        at = /^$|\/(?:java|ecma)script/i,
        ut = /^true\/(.*)/,
        lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ct = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ct.optgroup = ct.option, ct.tbody = ct.tfoot = ct.colgroup = ct.caption = ct.thead, ct.th = ct.td, x.fn.extend({
        text: function(e) {
            return x.access(this, function(e) {
                return e === undefined ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            var n, r = e ? x.filter(e, this) : this,
                i = 0;
            for (; null != (n = r[i]); i++) t || 1 !== n.nodeType || x.cleanData(mt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && dt(mt(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            var e, t = 0;
            for (; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(mt(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return x.clone(this, e, t)
            })
        },
        html: function(e) {
            return x.access(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !it.test(e) && !ct[(nt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(tt, "<$1></$2>");
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (x.cleanData(mt(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = x.map(this, function(e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++],
                    i = e[t++];
                i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = f.apply([], e);
            var r, i, o, s, a, u, l = 0,
                c = this.length,
                p = this,
                h = c - 1,
                d = e[0],
                g = x.isFunction(d);
            if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && st.test(d)) return this.each(function(r) {
                var i = p.eq(r);
                g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (o = x.map(mt(r, "script"), ft), s = o.length; c > l; l++) a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, mt(a, "script"))), t.call(this[l], a, l);
                if (s)
                    for (u = o[o.length - 1].ownerDocument, x.map(o, ht), l = 0; s > l; l++) a = o[l], at.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(lt, "")))
            }
            return this
        }
    }), x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        x.fn[e] = function(e) {
            var n, r = [],
                i = x(e),
                o = i.length - 1,
                s = 0;
            for (; o >= s; s++) n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
            return this.pushStack(r)
        }
    }), x.extend({
        clone: function(e, t, n) {
            var r, i, o, s, a = e.cloneNode(!0),
                u = x.contains(e.ownerDocument, e);
            if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
                for (s = mt(a), o = mt(e), r = 0, i = o.length; i > r; r++) yt(o[r], s[r]);
            if (t)
                if (n)
                    for (o = o || mt(e), s = s || mt(a), r = 0, i = o.length; i > r; r++) gt(o[r], s[r]);
                else gt(e, a);
            return s = mt(a, "script"), s.length > 0 && dt(s, !u && mt(e, "script")), a
        },
        buildFragment: function(e, t, n, r) {
            var i, o, s, a, u, l, c = 0,
                p = e.length,
                f = t.createDocumentFragment(),
                h = [];
            for (; p > c; c++)
                if (i = e[c], i || 0 === i)
                    if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);
                    else if (rt.test(i)) {
                o = o || f.appendChild(t.createElement("div")), s = (nt.exec(i) || ["", ""])[1].toLowerCase(), a = ct[s] || ct._default, o.innerHTML = a[1] + i.replace(tt, "<$1></$2>") + a[2], l = a[0];
                while (l--) o = o.lastChild;
                x.merge(h, o.childNodes), o = f.firstChild, o.textContent = ""
            } else h.push(t.createTextNode(i));
            f.textContent = "", c = 0;
            while (i = h[c++])
                if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = mt(f.appendChild(i), "script"), u && dt(o), n)) {
                    l = 0;
                    while (i = o[l++]) at.test(i.type || "") && n.push(i)
                }
            return f
        },
        cleanData: function(e) {
            var t, n, r, i, o, s, a = x.event.special,
                u = 0;
            for (;
                (n = e[u]) !== undefined; u++) {
                if (F.accepts(n) && (o = n[q.expando], o && (t = q.cache[o]))) {
                    if (r = Object.keys(t.events || {}), r.length)
                        for (s = 0;
                            (i = r[s]) !== undefined; s++) a[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
                    q.cache[o] && delete q.cache[o]
                }
                delete L.cache[n[L.expando]]
            }
        },
        _evalUrl: function(e) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    });
    function pt(e, t) {
        return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function ft(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }
    function ht(e) {
        var t = ut.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }
    function dt(e, t) {
        var n = e.length,
            r = 0;
        for (; n > r; r++) q.set(e[r], "globalEval", !t || q.get(t[r], "globalEval"))
    }
    function gt(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (q.hasData(e) && (o = q.access(e), s = q.set(t, o), l = o.events)) {
                delete s.handle, s.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; r > n; n++) x.event.add(t, i, l[i][n])
            }
            L.hasData(e) && (a = L.access(e), u = x.extend({}, a), L.set(t, u))
        }
    }
    function mt(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && x.nodeName(e, t) ? x.merge([e], n) : n
    }
    function yt(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && ot.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }
    x.fn.extend({
        wrapAll: function(e) {
            var t;
            return x.isFunction(e) ? this.each(function(t) {
                x(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return x.isFunction(e) ? this.each(function(t) {
                x(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = x(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = x.isFunction(e);
            return this.each(function(n) {
                x(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                x.nodeName(this, "body") || x(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var vt, xt, bt = /^(none|table(?!-c[ea]).+)/,
        wt = /^margin/,
        Tt = RegExp("^(" + b + ")(.*)$", "i"),
        Ct = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
        kt = RegExp("^([+-])=(" + b + ")", "i"),
        Nt = {
            BODY: "block"
        },
        Et = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        St = {
            letterSpacing: 0,
            fontWeight: 400
        },
        jt = ["Top", "Right", "Bottom", "Left"],
        Dt = ["Webkit", "O", "Moz", "ms"];
    function At(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Dt.length;
        while (i--)
            if (t = Dt[i] + n, t in e) return t;
        return r
    }
    function Lt(e, t) {
        return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e)
    }
    function qt(t) {
        return e.getComputedStyle(t, null)
    }
    function Ht(e, t) {
        var n, r, i, o = [],
            s = 0,
            a = e.length;
        for (; a > s; s++) r = e[s], r.style && (o[s] = q.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Lt(r) && (o[s] = q.access(r, "olddisplay", Rt(r.nodeName)))) : o[s] || (i = Lt(r), (n && "none" !== n || !i) && q.set(r, "olddisplay", i ? n : x.css(r, "display"))));
        for (s = 0; a > s; s++) r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e
    }
    x.fn.extend({
        css: function(e, t) {
            return x.access(this, function(e, t, n) {
                var r, i, o = {},
                    s = 0;
                if (x.isArray(t)) {
                    for (r = qt(e), i = t.length; i > s; s++) o[t[s]] = x.css(e, t[s], !1, r);
                    return o
                }
                return n !== undefined ? x.style(e, t, n) : x.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return Ht(this, !0)
        },
        hide: function() {
            return Ht(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Lt(this) ? x(this).show() : x(this).hide()
            })
        }
    }), x.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = vt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, s, a = x.camelCase(t),
                    u = e.style;
                return t = x.cssProps[a] || (x.cssProps[a] = At(u, a)), s = x.cssHooks[t] || x.cssHooks[a], n === undefined ? s && "get" in s && (i = s.get(e, !1, r)) !== undefined ? i : u[t] : (o = typeof n, "string" === o && (i = kt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(x.css(e, t)), o = "number"), null == n || "number" === o && isNaN(n) || ("number" !== o || x.cssNumber[a] || (n += "px"), x.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === undefined || (u[t] = n)), undefined)
            }
        },
        css: function(e, t, n, r) {
            var i, o, s, a = x.camelCase(t);
            return t = x.cssProps[a] || (x.cssProps[a] = At(e.style, a)), s = x.cssHooks[t] || x.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), i === undefined && (i = vt(e, t, r)), "normal" === i && t in St && (i = St[t]), "" === n || n ? (o = parseFloat(i), n === !0 || x.isNumeric(o) ? o || 0 : i) : i
        }
    }), vt = function(e, t, n) {
        var r, i, o, s = n || qt(e),
            a = s ? s.getPropertyValue(t) || s[t] : undefined,
            u = e.style;
        return s && ("" !== a || x.contains(e.ownerDocument, e) || (a = x.style(e, t)), Ct.test(a) && wt.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = s.width, u.width = r, u.minWidth = i, u.maxWidth = o)), a
    };
    function Ot(e, t, n) {
        var r = Tt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function Ft(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
            s = 0;
        for (; 4 > o; o += 2) "margin" === n && (s += x.css(e, n + jt[o], !0, i)), r ? ("content" === n && (s -= x.css(e, "padding" + jt[o], !0, i)), "margin" !== n && (s -= x.css(e, "border" + jt[o] + "Width", !0, i))) : (s += x.css(e, "padding" + jt[o], !0, i), "padding" !== n && (s += x.css(e, "border" + jt[o] + "Width", !0, i)));
        return s
    }
    function Pt(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = qt(e),
            s = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = vt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ct.test(i)) return i;
            r = s && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + Ft(e, t, n || (s ? "border" : "content"), r, o) + "px"
    }
    function Rt(e) {
        var t = o,
            n = Nt[e];
        return n || (n = Mt(e, t), "none" !== n && n || (xt = (xt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (xt[0].contentWindow || xt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = Mt(e, t), xt.detach()), Nt[e] = n), n
    }
    function Mt(e, t) {
        var n = x(t.createElement(e)).appendTo(t.body),
            r = x.css(n[0], "display");
        return n.remove(), r
    }
    x.each(["height", "width"], function(e, t) {
        x.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? 0 === e.offsetWidth && bt.test(x.css(e, "display")) ? x.swap(e, Et, function() {
                    return Pt(e, t, r)
                }) : Pt(e, t, r) : undefined
            },
            set: function(e, n, r) {
                var i = r && qt(e);
                return Ot(e, n, r ? Ft(e, t, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), x(function() {
        x.support.reliableMarginRight || (x.cssHooks.marginRight = {
            get: function(e, t) {
                return t ? x.swap(e, {
                    display: "inline-block"
                }, vt, [e, "marginRight"]) : undefined
            }
        }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function(e, t) {
            x.cssHooks[t] = {
                get: function(e, n) {
                    return n ? (n = vt(e, t), Ct.test(n) ? x(e).position()[t] + "px" : n) : undefined
                }
            }
        })
    }), x.expr && x.expr.filters && (x.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight
    }, x.expr.filters.visible = function(e) {
        return !x.expr.filters.hidden(e)
    }), x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        x.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0,
                    i = {},
                    o = "string" == typeof n ? n.split(" ") : [n];
                for (; 4 > r; r++) i[e + jt[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, wt.test(e) || (x.cssHooks[e + t].set = Ot)
    });
    var Wt = /%20/g,
        $t = /\[\]$/,
        Bt = /\r?\n/g,
        It = /^(?:submit|button|image|reset|file)$/i,
        zt = /^(?:input|select|textarea|keygen)/i;
    x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && zt.test(this.nodeName) && !It.test(e) && (this.checked || !ot.test(e))
            }).map(function(e, t) {
                var n = x(this).val();
                return null == n ? null : x.isArray(n) ? x.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Bt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Bt, "\r\n")
                }
            }).get()
        }
    }), x.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = x.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (t === undefined && (t = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) _t(n, e[n], t, i);
        return r.join("&").replace(Wt, "+")
    };
    function _t(e, t, n, r) {
        var i;
        if (x.isArray(t)) x.each(t, function(t, i) {
            n || $t.test(e) ? r(e, i) : _t(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== x.type(t)) r(e, t);
        else
            for (i in t) _t(e + "[" + i + "]", t[i], n, r)
    }
    x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        x.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), x.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Xt, Ut, Yt = x.now(),
        Vt = /\?/,
        Gt = /#.*$/,
        Jt = /([?&])_=[^&]*/,
        Qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Kt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Zt = /^(?:GET|HEAD)$/,
        en = /^\/\//,
        tn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        nn = x.fn.load,
        rn = {},
        on = {},
        sn = "*/".concat("*");
    try {
        Ut = i.href
    } catch (an) {
        Ut = o.createElement("a"), Ut.href = "", Ut = Ut.href
    }
    Xt = tn.exec(Ut.toLowerCase()) || [];
    function un(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(w) || [];
            if (x.isFunction(n))
                while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function ln(e, t, n, r) {
        var i = {},
            o = e === on;
        function s(a) {
            var u;
            return i[a] = !0, x.each(e[a] || [], function(e, a) {
                var l = a(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : undefined : (t.dataTypes.unshift(l), s(l), !1)
            }), u
        }
        return s(t.dataTypes[0]) || !i["*"] && s("*")
    }
    function cn(e, t) {
        var n, r, i = x.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && x.extend(!0, e, r), e
    }
    x.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var r, i, o, s = this,
            a = e.indexOf(" ");
        return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), x.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (i = "POST"), s.length > 0 && x.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, s.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            s.each(n, o || [e.responseText, t, e])
        }), this
    }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        x.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ut,
            type: "GET",
            isLocal: Kt.test(Xt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": sn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": x.parseJSON,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? cn(cn(e, x.ajaxSettings), t) : cn(x.ajaxSettings, e)
        },
        ajaxPrefilter: un(rn),
        ajaxTransport: un(on),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = undefined), t = t || {};
            var n, r, i, o, s, a, u, l, c = x.ajaxSetup({}, t),
                p = c.context || c,
                f = c.context && (p.nodeType || p.jquery) ? x(p) : x.event,
                h = x.Deferred(),
                d = x.Callbacks("once memory"),
                g = c.statusCode || {},
                m = {},
                y = {},
                v = 0,
                b = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === v) {
                            if (!o) {
                                o = {};
                                while (t = Qt.exec(i)) o[t[1].toLowerCase()] = t[2]
                            }
                            t = o[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === v ? i : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return v || (e = y[n] = y[n] || e, m[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return v || (c.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > v)
                                for (t in e) g[t] = [g[t], e[t]];
                            else T.always(e[T.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || b;
                        return n && n.abort(t), k(0, t), this
                    }
                };
            if (h.promise(T).complete = d.add, T.success = T.done, T.error = T.fail, c.url = ((e || c.url || Ut) + "").replace(Gt, "").replace(en, Xt[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = x.trim(c.dataType || "*").toLowerCase().match(w) || [""], null == c.crossDomain && (a = tn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === Xt[1] && a[2] === Xt[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (Xt[3] || ("http:" === Xt[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = x.param(c.data, c.traditional)), ln(rn, c, t, T), 2 === v) return T;
            u = c.global, u && 0 === x.active++ && x.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Zt.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (Vt.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Jt.test(r) ? r.replace(Jt, "$1_=" + Yt++) : r + (Vt.test(r) ? "&" : "?") + "_=" + Yt++)), c.ifModified && (x.lastModified[r] && T.setRequestHeader("If-Modified-Since", x.lastModified[r]), x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", c.contentType), T.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + sn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) T.setRequestHeader(l, c.headers[l]);
            if (c.beforeSend && (c.beforeSend.call(p, T, c) === !1 || 2 === v)) return T.abort();
            b = "abort";
            for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) T[l](c[l]);
            if (n = ln(on, c, t, T)) {
                T.readyState = 1, u && f.trigger("ajaxSend", [T, c]), c.async && c.timeout > 0 && (s = setTimeout(function() {
                    T.abort("timeout")
                }, c.timeout));
                try {
                    v = 1, n.send(m, k)
                } catch (C) {
                    if (!(2 > v)) throw C;
                    k(-1, C)
                }
            } else k(-1, "No Transport");
            function k(e, t, o, a) {
                var l, m, y, b, w, C = t;
                2 !== v && (v = 2, s && clearTimeout(s), n = undefined, i = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (b = pn(c, T, o)), b = fn(c, b, T, l), l ? (c.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (x.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (x.etag[r] = w)), 204 === e || "HEAD" === c.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, m = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (t || C) + "", l ? h.resolveWith(p, [m, C, T]) : h.rejectWith(p, [T, C, y]), T.statusCode(g), g = undefined, u && f.trigger(l ? "ajaxSuccess" : "ajaxError", [T, c, l ? m : y]), d.fireWith(p, [T, C]), u && (f.trigger("ajaxComplete", [T, c]), --x.active || x.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return x.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return x.get(e, undefined, t, "script")
        }
    }), x.each(["get", "post"], function(e, t) {
        x[t] = function(e, n, r, i) {
            return x.isFunction(n) && (i = i || r, r = n, n = undefined), x.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    });
    function pn(e, t, n) {
        var r, i, o, s, a = e.contents,
            u = e.dataTypes;
        while ("*" === u[0]) u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in a)
                if (a[i] && a[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                s || (s = i)
            }
            o = o || s
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : undefined
    }
    function fn(e, t, n, r) {
        var i, o, s, a, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
        o = c.shift();
        while (o)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (s = l[u + " " + o] || l["* " + o], !s)
                for (i in l)
                    if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                        s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && e["throws"]) t = s(t);
                else try {
                    t = s(t)
                } catch (p) {
                    return {
                        state: "parsererror",
                        error: s ? p : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return x.globalEval(e), e
            }
        }
    }), x.ajaxPrefilter("script", function(e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), x.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = x("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), o.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var hn = [],
        dn = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = hn.pop() || x.expando + "_" + Yt++;
            return this[e] = !0, e
        }
    }), x.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, s, a = t.jsonp !== !1 && (dn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(dn, "$1" + i) : t.jsonp !== !1 && (t.url += (Vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return s || x.error(i + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            s = arguments
        }, r.always(function() {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, hn.push(i)), s && x.isFunction(o) && o(s[0]), s = o = undefined
        }), "script") : undefined
    }), x.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var gn = x.ajaxSettings.xhr(),
        mn = {
            0: 200,
            1223: 204
        },
        yn = 0,
        vn = {};
    e.ActiveXObject && x(e).on("unload", function() {
        for (var e in vn) vn[e]();
        vn = undefined
    }), x.support.cors = !!gn && "withCredentials" in gn, x.support.ajax = gn = !!gn, x.ajaxTransport(function(e) {
        var t;
        return x.support.cors || gn && !e.crossDomain ? {
            send: function(n, r) {
                var i, o, s = e.xhr();
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (i in e.xhrFields) s[i] = e.xhrFields[i];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) s.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete vn[o], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status || 404, s.statusText) : r(mn[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                            text: s.responseText
                        } : undefined, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = vn[o = yn++] = t("abort"), s.send(e.hasContent && e.data || null)
            },
            abort: function() {
                t && t()
            }
        } : undefined
    });
    var xn, bn, wn = /^(?:toggle|show|hide)$/,
        Tn = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
        Cn = /queueHooks$/,
        kn = [An],
        Nn = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = Tn.exec(t),
                    o = i && i[3] || (x.cssNumber[e] ? "" : "px"),
                    s = (x.cssNumber[e] || "px" !== o && +r) && Tn.exec(x.css(n.elem, e)),
                    a = 1,
                    u = 20;
                if (s && s[3] !== o) {
                    o = o || s[3], i = i || [], s = +r || 1;
                    do a = a || ".5", s /= a, x.style(n.elem, e, s + o); while (a !== (a = n.cur() / r) && 1 !== a && --u)
                }
                return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    function En() {
        return setTimeout(function() {
            xn = undefined
        }), xn = x.now()
    }
    function Sn(e, t, n) {
        var r, i = (Nn[t] || []).concat(Nn["*"]),
            o = 0,
            s = i.length;
        for (; s > o; o++)
            if (r = i[o].call(n, t, e)) return r
    }
    function jn(e, t, n) {
        var r, i, o = 0,
            s = kn.length,
            a = x.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                var t = xn || En(),
                    n = Math.max(0, l.startTime + l.duration - t),
                    r = n / l.duration || 0,
                    o = 1 - r,
                    s = 0,
                    u = l.tweens.length;
                for (; u > s; s++) l.tweens[s].run(o);
                return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1)
            },
            l = a.promise({
                elem: e,
                props: x.extend({}, t),
                opts: x.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: xn || En(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = x.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (Dn(c, l.opts.specialEasing); s > o; o++)
            if (r = kn[o].call(l, e, c, l.opts)) return r;
        return x.map(c, Sn, l), x.isFunction(l.opts.start) && l.opts.start.call(e, l), x.fx.timer(x.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    function Dn(e, t) {
        var n, r, i, o, s;
        for (n in e)
            if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = x.cssHooks[r], s && "expand" in s) {
                o = s.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }
    x.Animation = x.extend(jn, {
        tweener: function(e, t) {
            x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; i > r; r++) n = e[r], Nn[n] = Nn[n] || [], Nn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? kn.unshift(e) : kn.push(e)
        }
    });
    function An(e, t, n) {
        var r, i, o, s, a, u, l = this,
            c = {},
            p = e.style,
            f = e.nodeType && Lt(e),
            h = q.get(e, "fxshow");
        n.queue || (a = x._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function() {
            a.unqueued || u()
        }), a.unqueued++, l.always(function() {
            l.always(function() {
                a.unqueued--, x.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", l.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], wn.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
                    if ("show" !== i || !h || h[r] === undefined) continue;
                    f = !0
                }
                c[r] = h && h[r] || x.style(e, r)
            }
        if (!x.isEmptyObject(c)) {
            h ? "hidden" in h && (f = h.hidden) : h = q.access(e, "fxshow", {}), o && (h.hidden = !f), f ? x(e).show() : l.done(function() {
                x(e).hide()
            }), l.done(function() {
                var t;
                q.remove(e, "fxshow");
                for (t in c) x.style(e, t, c[t])
            });
            for (r in c) s = Sn(f ? h[r] : 0, r, l), r in h || (h[r] = s.start, f && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function Ln(e, t, n, r, i) {
        return new Ln.prototype.init(e, t, n, r, i)
    }
    x.Tween = Ln, Ln.prototype = {
        constructor: Ln,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Ln.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ln.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Ln.propHooks[this.prop];
            return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ln.propHooks._default.set(this), this
        }
    }, Ln.prototype.init.prototype = Ln.prototype, Ln.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Ln.propHooks.scrollTop = Ln.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, x.each(["toggle", "show", "hide"], function(e, t) {
        var n = x.fn[t];
        x.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(qn(t, !0), e, r, i)
        }
    }), x.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Lt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = x.isEmptyObject(e),
                o = x.speed(t, n, r),
                s = function() {
                    var t = jn(this, x.extend({}, e), o);
                    (i || q.get(this, "finish")) && t.stop(!0)
                };
            return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    o = x.timers,
                    s = q.get(this);
                if (i) s[i] && s[i].stop && r(s[i]);
                else
                    for (i in s) s[i] && s[i].stop && Cn.test(i) && r(s[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                (t || !n) && x.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = q.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = x.timers,
                    s = r ? r.length : 0;
                for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    });
    function qn(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = jt[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }
    x.each({
        slideDown: qn("show"),
        slideUp: qn("hide"),
        slideToggle: qn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        x.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), x.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? x.extend({}, e) : {
            complete: n || !n && t || x.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !x.isFunction(t) && t
        };
        return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue)
        }, r
    }, x.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, x.timers = [], x.fx = Ln.prototype.init, x.fx.tick = function() {
        var e, t = x.timers,
            n = 0;
        for (xn = x.now(); t.length > n; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || x.fx.stop(), xn = undefined
    }, x.fx.timer = function(e) {
        e() && x.timers.push(e) && x.fx.start()
    }, x.fx.interval = 13, x.fx.start = function() {
        bn || (bn = setInterval(x.fx.tick, x.fx.interval))
    }, x.fx.stop = function() {
        clearInterval(bn), bn = null
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function(e) {
        return x.grep(x.timers, function(t) {
            return e === t.elem
        }).length
    }), x.fn.offset = function(e) {
        if (arguments.length) return e === undefined ? this : this.each(function(t) {
            x.offset.setOffset(this, e, t)
        });
        var t, n, i = this[0],
            o = {
                top: 0,
                left: 0
            },
            s = i && i.ownerDocument;
        if (s) return t = s.documentElement, x.contains(t, i) ? (typeof i.getBoundingClientRect !== r && (o = i.getBoundingClientRect()), n = Hn(s), {
            top: o.top + n.pageYOffset - t.clientTop,
            left: o.left + n.pageXOffset - t.clientLeft
        }) : o
    }, x.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, s, a, u, l, c = x.css(e, "position"),
                p = x(e),
                f = {};
            "static" === c && (e.style.position = "relative"), a = p.offset(), o = x.css(e, "top"), u = x.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = p.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), x.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + i), "using" in t ? t.using.call(e, f) : p.css(f)
        }
    }, x.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === x.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (r = e.offset()), r.top += x.css(e[0], "borderTopWidth", !0), r.left += x.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - x.css(n, "marginTop", !0),
                    left: t.left - r.left - x.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || s;
                while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) e = e.offsetParent;
                return e || s
            })
        }
    }), x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var r = "pageYOffset" === n;
        x.fn[t] = function(i) {
            return x.access(this, function(t, i, o) {
                var s = Hn(t);
                return o === undefined ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, undefined)
            }, t, i, arguments.length, null)
        }
    });
	x.type=function(m){var a=typeof m;return "object"===a?!m?"null":m instanceof Array?"array":a:a};
	x.size=function(m){
		var c=0;
		if(x.isObj(m)){
			if(Object.keys) c=Object.keys(m).length;
			else if(x.map) c=x.map(m,function(){return 1}).length;
			else for(var k in m) if(m.hasOwnProperty(k)) c++;
		}
		else c=m.length;
		return c;
	};
	x.intval=function(m){m=parseInt(m);return isNaN(m)?0:m};
	x.floatval=function(m){m=parseFloat(m);return isNaN(m)?0:m};
	x.isset=function(m){return x.type(m)!='undefined'};
	x.isStr=function(m){return x.type(m)=='string'};
	x.isInt=function(m){var t=parseInt(m,10);if(isNaN(t)) t=0;return t.length==m.length&&t==m};
	x.isArr=function(m){return x.type(m)=='array'};
	x.isObj=function(m){return x.type(m)=='object'};
	x.isFunc=function(m){return x.type(m)=='function'};
	x.isBool=function(m){return m===true||m===false};
	x.lang=function(s){var a={},b;if(typeof LANG!='undefined') a=LANG;if(!s) return a;b=s.toString().split('.');while(b.length&&(a=a[b.shift()]||arguments[1]||s));return a};
	x.conf=function(s){var a={},b;if(typeof CONF!='undefined') a=CONF;if(!s) return a;b=s.toString().split('.');while(b.length&&(a=a[b.shift()]));return a||arguments[1]||''};
	x.log={
		o:null,
		t:'log',
		s:'group',
		a:{l:'log',i:'info',e:'error',w:'warn',t:'table',d:'dir',g:'group',p:'profile',m:'time'},
		b:['log','error','info','warn','table','dir'],
		c:['group','time','profile'],
		d:[],
		x:false,
		clr:function(){this.check().o.clear();return this},
		out:function(){this.check().o[this.t].apply(null,arguments);return this},
		type:function(t){this.t=t.length==1&&this.a[t]?this.a[t]:t;if(!this.b.indexOf(this.t)===-1) this.t='log';return this},
		start:function(n){this.check();this.d.push(this.s+':'+n);if(!this.x) return this;this.o[this.s](n);return this},
		end:function(){this.check();if(!this.d.length)return this;var a=this.d.pop().split(':');if(!this.x) return this;this.o[a[0]+'End'](a[1]);return this},
		set:function(t){this.s=t.length==1&&this.a[t]?this.a[t]:t;if(!this.c.indexOf(this.s)===-1) this.s='time';return this},
		check:function(){if(this.o===null){this.x=x.conf('coding');if(this.x) this.o=console;else{var F=function(){};this.o={clear:F,log:F,info:F,error:F,warn:F,table:F,dir:F,group:F,groupEnd:F,time:F,timeEnd:F,profile:F,profileEnd:F}}}return this}
	};
	x.log.set('m').start('mainload');
	x.w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
	x.h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
	x.speeds={fade:300,popAnim:0.6};
	x.fn.loaderAnim=function(o){
		o=x.extend(d,o);this.cp=0;
		var d={lineWidth:20,color:"#000000",glowColor:"#00aeff",radius:40,font:"normal 14px Arial",onComplete:null},c=x(this),t=this,w=x(window),PI=Math.PI,sa=1.5*PI,ea=0,cv=!!document.createElement('canvas').getContext,cw=w.width(),ch=w.height(),C,fh,ctx,fb=function(){fh.text((t.cp|0)+"%")},clr=function(){if(cv) ctx.clearRect(0,0,cw,ch);return true},dr=function(){
			var x=cw/2,y=ch/2;ea=((2/100)*t.cp*PI)+sa;
			clr();ctx.restore();ctx.beginPath();ctx.font=o.font;ctx.fillStyle=o.color;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText((t.cp|0)+"%",x,y);
			ctx.lineWidth=o.lineWidth;ctx.strokeStyle=o.color;if(o.glowColor){ctx.shadowOffsetX=0;ctx.shadowOffsetY=0;ctx.shadowBlur=20;ctx.shadowColor=o.glowColor;}
			ctx.arc(x,y,o.radius,sa,ea,false);ctx.stroke();ctx.save();
		},oae=function(){if(t.cp===100){c.delay(1000).fadeOut(function(){c.remove();if(typeof o.onComplete==="function") o.onComplete();});w.off("resize.preloader");}},cl=function(){cw=w.width(),ch=w.height(),(cv&&(C[0].width=cw,C[0].height=ch)),c.width(cw),c.height(ch)};
		t.init=function(){if(cv){C=x("<canvas>");c.append(C);ctx=C[0].getContext('2d');}else{fh=x("<i class='fallback'></i>");c.append(fh);}cl();w.on("resize.preloader",cl);};
		t.update=function(p){x.Animation(t,{cp:p},{duration:3000}).stop(true,false).progress(function(){if(cv) dr();else fb();}).done(oae);};this.init();return this;
	};
	x.loader={
		el: null,
		cls: 'main-loader anim',
		mk: function(){
			this.el=x('<div/>').cls(this.cls).appendTo(x('body'));
		},
		start: function(){
			if(!this.el) this.mk();
			this.el.cls(this.cls+' fadeInUp').show();
		},
		end: function(){
			var el=this.el.cls(this.cls+' fadeOutDown'),o=this;
			setTimeout(function(){el.cls(o.cls).hide();},1000);
		}
    };
	x.overlay={
		el: null,
		opacity: 0.7,
		mk: function(){
			this.el=x('<div/>',{id:'overlay'}).hide().appendTo(x('body'));
			return this;
		},
		show: function(cb){
			if(!this.el) this.mk();
			this.el.fadeTo(x.speeds.fade,this.opacity,function(){x('body').cls('oh'+(x(document).height()>x(window).height()?' pr':''),'+');if(cb&&x.type(cb)=='function') cb()});
			return this;
		},
		hide: function(cb){
			if(!this.el) return;
			this.el.fadeOut(x.speeds.fade,function(){x('body').cls('oh','-').cls('pr','-');if(cb&&x.type(cb)=='function') cb()});
			return this;
		}
	};
	x.gps={
		map:null,
		lat:47.918838924953,
		lng:106.917623654008,
		cpos:{},
		loaded:false,
		included:false,
		markers:[],
		markerImg:x.conf('gp.map.marker'),
		picker:null,
		pickerImg:x.conf('gp.map.picker')||this.markerImg,
		loadLib:function(){if(this.included) return this;var k=x.conf('gp.map.APIkey');this.included=true,x.inc('//maps.google.com/maps/api/js?callback=$.gps.callback'+(k?'&key='+k:''),'gmap');return this;},
		callback:function(){this.loaded=true},
		init:function(o){
			if(!o) o={};
			if(!this.loaded){
				if(!this.included) this.loadLib();
				setTimeout(function(){x.gps.init(o)},50);
				return this;
			}
			var p=o.pos||o.center||null,c=new google.maps.LatLng(o.lat||(p&&p.lat)||this.lat,o.lng||(p&&p.lng)||this.lng),el=x(o.elem||o.handler||o.el||'#map');
			if(!el.length){
				el=x('<div/>').cls('map').html('<div id="map"></div>').css({position:'fixed',left:0,top:0,width:x.w,height:x.h,zIndex:99999}).appendTo(x('body')).find('#map');
				el.css({left:0,top:0,width:x.w,height:x.h});
			}
			this.map=new google.maps.Map(el.get(0),{center:c,zoom:x.url('zoom','int')||o.zoom||12,mapTypeId:o.type?(o.type===true?"hybrid":o.type):"roadmap",scrollwheel:true,minZoom:o.minZoom||6,streetViewControl:o.street||true});
			this.iw=new google.maps.InfoWindow();
			if(o.callback&&x.isFunc(o.callback)) o.callback();
			if(o.pick){
				var O=this,fpc=function(p){O.picker.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){O.picker.setAnimation(null)},300);if(x.isFunc(o.pick)) o.pick(p);else if(x.isStr(o.pick)) x(o.pick).val(p.lat()+'|'+p.lng());else if(o.pick===true){x('#lat').val(p.lat()),x('#lng').val(p.lng())}};
				O.picker=new google.maps.Marker({map:O.map,draggable:true,animation:google.maps.Animation.DROP,position:new google.maps.LatLng(O.lat,O.lng),icon:x.url({},'img')+'/'+O.pickerImg+'.png'});
				google.maps.event.addListener(O.picker,'dragend',function(e){fpc(e.latLng)});
				O.map.addListener('click',function(e){
					O.picker.setPosition(e.latLng),fpc(e.latLng),o.cntr&&setTimeout(function(){O.map.panTo(e.latLng)},1000)
				});
			}
			return this
		},
		unset:function(){x(this.map.__gm.V).html(''),this.map=null},
		clientPos:function(b){
			var o=this;
			if(!o.map){o.init({callback:function(){o.clientPos(b)}});return o}
			navigator.geolocation.getCurrentPosition(function(p){o.cpos={lat:p.coords.latitude,lng:p.coords.longitude},o.map.panTo(new google.maps.LatLng(p.coords.latitude,p.coords.longitude)),(b&&o.marker(o.cpos))});
			return o
		},
		marker:function(o){var O=this,m;if(!O.map){O.init({callback:function(){O.marker(o)}});return O}o.marker=o.marker||O.markerImg||'marker',m=new google.maps.Marker({map:O.map,position:new google.maps.LatLng(o.lat,o.lng),icon:x.url(null,'img')+o.marker+'.png'}),O.markers.push(m);if(o.content){if(o.by) google.maps.event.addListener(m,o.by,(function(o){return function(){O.info(o.content,m);o.callback&&x.isFunc(o.callback)&&o.callback(o.data||{})}})(o));else O.info(o.content,m);}return O},
		clrMarkers:function(){while(this.markers.length) this.markers.pop().setMap(null);},
		rmMarker:function(index){
			if(!this.markers.length) return this;
			var a=[],i=0;if(x.isInt(index)) index=[index];else if(index=='last') index=[this.markers.length-1];
			for(;i<this.markers.length;i++){
				if(index.indexOf(i)!==-1) this.markers[i].setMap(null);
				else a.push(this.markers[i]);
			}
			this.markers=a;
			return this
		},
		info:function(s,m){
			if(!this.map){var o=this;this.init({callback:function(){o.info(s,m)}});return this}
			this.iw.setContent(s);
			this.iw.open(this.map,x.isObj(m)&&m.lat&&m.lng?new google.maps.LatLng(m.lat,m.lng):(x.isInt(m)?this.markers[m]:m));
			return this
		},
		zoom:function(z){
			if(!this.map){var o=this;this.init({callback:function(){o.zoom(z)}});return this}
			if(z){this.map.setZoom(z);return this}
			else return this.map.getZoom();
		},
		center:function(p){
			if(!this.map){var o=this;this.init({callback:function(){o.center(p)}});return this}
			if(p){this.map.setCenter(p);return this}
			else return this.map.getCenter();
		},
		event:function(s,fn){
			if(!this.map){var o=this;this.init({callback:function(){o.event(s,fn)}});return this}
			this.map.addListener(s,fn);
			return this
		},
		type:function(s){
			if(!s) return this.map.mapTypeId;
			if(s=='toggle') s=this.map.mapTypeId==google.maps.MapTypeId.ROADMAP?google.maps.MapTypeId.HYBRID:google.maps.MapTypeId.ROADMAP
			this.map.setMapTypeId(s);
			return this
		}
	};
	x.pop={
    	obj: null,
    	tit: null,
    	body: null,
    	foot: null,
    	pushLive: 15,
    	opt:{},
    	dirs:['up','dw','r','l','upl','upr','dwl','dwr','no'],
    	isPush:false,
    	ok: function(){},
    	cancel: function(){},
    	init: function(o){
    		o.tit=o.tit||o.name||o.title||o.caption||'';
			o.msg=o.msg||o.message||o.data||o.text||o.txt||o.desc||o.content||'';
			o.img=o.img||o.image||o.pic||o.logo||o.avatar||'';
			if(o.img){
				var a;
				if(o.img.indexOf(':')>0) a=o.img.split(':',2);
				else a=['img',o.img];
				o.img=x.url(null,a[0])+a[1];
			}
			o.dir=o.dir||'up';
			o.pos=o.pos||o.position||'ct';
			if(o.dir=='random') o.dir=this.dirs[Math.round(Math.random()*200)%this.dirs.length];
			if(o.pos=='random'){var a='lcrtcb';o.pos=a[Math.round(Math.random()*200)%3]+a[Math.round(Math.random()*200)%3+3];}
			o.offsety=o.offsety||o.offset||50;
			o.offsetx=o.offsetx||o.offset||50;
			o.easein=o.easein||o.ease||o.easing||'';
			o.easeout=o.easeout||o.ease||o.easing||'';
			o.cls=o.exrta||o.cls||o.class||o.btype||'';
			o.effect=o.effect||o.anim||o.animation||'';
    		o.type=x.type(o.type)=='undefined'?'msg':o.type;
    		o.speed=x.floatval(o.speed||o.animspeed||o.duration||x.speeds.popAnim);
    		if(o.rotate){
    			if(o.rotate==1) o.rotate='360';
    			o.rotate=o.rotate.replace(new RegExp('deg','g'),'');
   			}
    		if(o.skew){
    			if(o.skew==1) o.skew='240';
    			o.skew=o.skew.replace(new RegExp('deg','g'),'');
   			}    		
    		if(o.speed<100) o.speed*=1000;
    		this.opt=o;o=this;
    		if('_lognotifballobubblpush'.indexOf(this.opt.type.substr(0,5))>0){this.isPush=true,this.push()}
    		else this.make().change().show();
    		return this;
    	},
    	show: function(){
    		var o=this;
    		if(!o.obj||!o.obj.length) return this;
    		x.overlay.show();
    		o.obj.animate(o.css(false),o.opt.speed,o.opt.easein);
    		return o;
    	},
    	css: function(b){
			var o=this.opt,css={},tr=[];
			if(!this.isPush) var w=this.obj.outerWidth(),h=this.obj.outerHeight(),ww=x.w,hh=x.h,of=10,l=function(s,o){switch(s.substr(0,1)){case 'l':return o;case 'c':return ww/2-w/2;case 'r':return ww-w-o}},t=function(s,o){switch(s.substr(1,1)){case 't':return o;case 'c':return hh/2-h/2;case 'b':return hh-h-o}},def=function(){return {left:l(o.pos,o.offsetx),top:t(o.pos,o.offsety)}};
			else tr.push('translate(0,0)');
			if(b){
    			if(o.dir!=='no'){
    				if(this.isPush){
    					var l=o.dir.indexOf('l')>-1,t=o.dir.indexOf('up')>-1,ox=o.offsetx||80,oy=o.offsety||arguments[1]||50;
	    				tr[0]='translate('+(l||o.dir.indexOf('r')>-1?(l?'-':'')+ox+'px':'0')+','+(t||o.dir.indexOf('dw')>-1?(t?'-':'')+oy+'px':'0')+')';
    				}
    				else{
    					css.left=o.dir.indexOf('l')>-1?-(w+of):(o.dir.indexOf('r')>-1?ww+of:l(o.pos,o.offsetx));
	    				css.top=o.dir.indexOf('up')>-1?-(h+of):(o.dir.indexOf('dw')>-1?hh+of:t(o.pos,o.offsety));
    				}
				}
				else if(!this.isPush) css=def();
    			if(o.zoom&&o.zoom!=0) tr.push('scale(0.0001,0.0001)');
    			if(o.rotate&&o.rotate!=0) tr.push('rotate('+o.rotate.replace(new RegExp(',','g'),'deg,')+'deg)');
    			if(o.skew&&o.skew!=0) tr.push('skew('+o.skew.replace(new RegExp(',','g'),'deg,')+'deg)');
    		}
    		else{
    			if(!this.isPush) css=def();
    			if(o.zoom&&o.zoom!=0) tr.push('scale(1,1)');
    			if(o.rotate&&o.rotate!=0) tr.push('rotate(0)');
    			if(o.skew&&o.skew!=0) tr.push('skew(0)');
    		}
    		css.opacity=b?0:1;
    		if(tr) css.transform=tr.join(' ');
    		return css;
    	},
    	hide: function(){
    		var o=this;
    		if(!o.obj||!o.obj.length) return this;
    		x.overlay.hide();
    		o.obj.animate(o.css(true),o.opt.speed,o.opt.easeout,function(){o.obj.remove()});
    		return o;
    	},
    	fix: function(){
    		if(!this.obj||!this.obj.length) return this;
    		var w=260,h;
			w=Math.max(w,this.body.outerWidth());
			if(this.tit) w=Math.max(w,this.tit.outerWidth());
			if(this.foot) w=Math.max(w,this.foot.outerWidth());
			w=Math.min(w,500);
    		this.obj.width(w);
    		h=this.body.outerHeight();
			if(this.tit) h+=this.tit.outerHeight();
			if(this.foot) h+=this.foot.outerHeight();
    		this.obj.height(h).css(this.css(true));
    		return this;
    	},
    	make: function(){
    		var o=this;
    		o.obj=x('#pop');
    		if(o.obj.length) o.obj.remove();
    		o.obj=x('<div/>',{id:'pop'}).cls('pop').appendTo(x('body'));
    		o.tit=x('<h3/>').appendTo(o.obj);
    		o.body=x('<div/>').appendTo(o.obj);
    		x('<span/>',{title:LANG.close}).cls('icon-cancel-circled-outline').click(function(){o.hide().cancel();}).appendTo(o.obj);
    		o.obj.draggable({handle:'h3',containment:'#overlay'});
    		return o;
    	},
    	change: function(){
    		if(!this.obj||!this.obj.length) return this;
    		this.obj.cls(this.opt.type,'+');
    		this.tit.html(this.opt.tit);
    		if(!x.isObj(this.opt.msg)) this.body.html(this.opt.msg);
    		else this.opt.msg.appendTo(this.body.html(''));
    		this.ok=this.opt.ok?(x.type(this.opt.ok)=='function'?this.opt.ok:(function(s){return function(){eval(s)}})(this.opt.ok)):function(){};
    		this.cancel=this.opt.close?(x.type(this.opt.close)=='function'?this.opt.close:(function(s){return function(){eval(s)}})(this.opt.close)):function(){};
    		this.btns().fix();
    		return this;
    	},
    	btns: function(){
    		var o=this,btn=function(s){return x('<input/>',{type:'button'}).val(LANG[s.ucfirst()]||s).appendTo(o.foot)};
    		if(o.foot) o.foot.remove();
			o.foot=x('<footer/>').appendTo(o.obj);
    		switch(this.opt.type){
    			case 'msg':
    			case 'alert':
    			case 'notice':
    			case 'info':
				case 'warning':
				case 'error':{btn(this.opt.val||'Ok').click(function(){o.hide().ok();});break;}
				case 'confirm':
    			case 'prompt':{
					if(this.opt.type=='prompt') x('<input/>',{type:'text',placeholder:(this.opt.pholder||'...')}).cls('prompt').appendTo(o.body);
					btn('ok').click(function(){o.hide().ok();});
					btn('cancel').click(function(){o.hide().cancel();});
					break;
				}
				case 'yesno':{
					btn('yes').click(function(){o.hide().ok(true);});
					btn('no').click(function(){o.hide().ok(false);});
					btn('cancel').click(function(){o.hide().cancel();});
					break;
				}
    		}    		
    		return this;
    	},
    	push: function(){
			var O=this,o=O.opt,ps=o.pos||'rb',el,pr=x('.mpush.f'+ps),to,n=o.tit,s=o.msg,i=o.img,ws=o.wait||O.pushLive,as=o.speed,cl=['show',o.type],fn=function(el){
				if(to) clearTimeout(to);
				el.animate(O.css(true,el.height()),o.speed,o.easeout,function(){el.remove()});
			};
			o.effect&&(cl.push('anim'),cl.push(o.effect)),o.cls&&cl.push(o.cls),i&&cl.push('withimg');
			if(ws<100) ws*=1000;
    		if(o.type.substr(0,5)=='notif'&&!x.stat.focused){if(x.notify.is&&x.notify.lvl()==x.notify.grnt){x.notify.make(n||'',{icon:i||'',body:(s&&x.isObj(s)?s.text():s)||'',tag:o.tag||''});return}else x.notify.rqst();}
			if(!pr.length) pr=x('<div/>').cls('mpush f'+ps).appendTo(x('body'));
			el=x('<div/>').cls(cl.join(' ')).html((i?'<img src="'+i+'" />':'')+(n?'<b>'+n+'</b>':'')+'<p>'+(x.isObj(s)?s.get(0).outerHTML:s)+(i?'<div class="clear"></div>':'')).prependTo(pr);
			el.css(O.css(true,el.height()));
			if(o.autohide||o.wait) to=setTimeout((function(el,to){return function(){fn(el)}})(el,to),as+ws);
			else el.click(function(e){if(['input','select','textarea','button','a'].indexOf(e.target.tagName.toLowerCase())===-1) fn(x(this))});
			x('<span/>').cls('close').text('x').click((function(el){return function(){fn(el)}})(el)).appendTo(el);
			el.animate(O.css(),o.speed,o.easein);
		}
    };
    x.fn.slider=function(o){
    	var cp='slider-',c=['holder','container'],el=x(this).data('pos',1).data('option',o).css({position:'relative'}),p=x('<div/>').cls(cp+c[0]).css({overflow:'hidden'}),pr=x('<div/>').cls(cp+c[1]),a=[],def={type:'h'};
    	o=x.extend(def,o||{});
    	x(el).wrapInner(pr).wrapInner(p);
    	pr=x('.'+cp+c[1],el);
    	if(o.type=='h'||o.type=='horizontal') pr.css({whiteSpace:'nowrap'});
    	p=x('.'+cp+c[0],el).width(el.width()).height(el.height());
		pr.children().each(function(){a.push({w:x(this).width(),h:x(this).height()});}); 
    	x.each(['prev','next'],function(k,c){
    		var e=x('<span/>').text(c).cls(c).click((function(i){return function(){
    			var p=el.data('pos');
    			p+=i;
    			el.data('pos',p);
    		}})(k?k:-1)).appendTo(el);
    	});
    };
    x.fullscr=function(){
		var D=document,de=D.documentElement,stat=arguments[0]===true;
		if(!D.fullscreenElement&&!D.mozFullScreenElement&&!D.webkitFullscreenElement&&!D.msFullscreenElement){
			if(stat) return false;
			if(de.requestFullscreen) de.requestFullscreen();
			else if(de.msRequestFullscreen) de.msRequestFullscreen();
			else if(de.mozRequestFullScreen) de.mozRequestFullScreen();
			else if(de.webkitRequestFullscreen) de.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			return true;
		}
		else{
			if(stat) return true;
			if(D.exitFullscreen) D.exitFullscreen();
			else if(D.msExitFullscreen) D.msExitFullscreen();
			else if(D.mozCancelFullScreen) D.mozCancelFullScreen();
			else if(D.webkitExitFullscreen) D.webkitExitFullscreen();
			return false;
		}
	};
	(function(){var n=function(){var t;if(v)return e.Notification&&e.Notification.permissionLevel?t=e.Notification.permissionLevel():e.webkitNotifications&&e.webkitNotifications.checkPermission?t=d[e.webkitNotifications.checkPermission()]:e.Notification&&e.Notification.permission?t=e.Notification.permission:navigator.mozNotification?t=f:e.external&&void 0!==e.external.msIsSiteMode()&&(t=e.external.msIsSiteMode()?f:s),t},t=function(t,o){var n;return e.Notification?n=new e.Notification(t,{icon:w(o.icon)?o.icon:o.icon.x32,body:o.body||N,tag:o.tag||N}):e.webkitNotifications?(n=e.webkitNotifications.createNotification(o.icon,t,o.body),n.show()):navigator.mozNotification?(n=navigator.mozNotification.createNotification(t,o.body,o.icon),n.show()):e.external&&e.external.msIsSiteMode()&&(e.external.msSiteModeClearIconOverlay(),e.external.msSiteModeSetIconOverlay(w(o.icon)?o.icon:o.icon.x16,t),e.external.msSiteModeActivate(),n={ieVerification:b+1}),n},o=function(t){return{close:function(){t&&(t.close?t.close():e.external&&e.external.msIsSiteMode()&&t.ieVerification===b&&e.external.msSiteModeClearIconOverlay())}}},r=function(){return k.pageVisibility?document.hidden||document.msHidden||document.mozHidden||document.webkitHidden:!0},s="default",f="granted",u="denied",d=[f,s,u],l={pageVisibility:!1,autoClose:0},m={},N="",v=function(){var t=!1;try{t=!!(e.Notification||e.webkitNotifications||navigator.mozNotification||e.external&&void 0!==e.external.msIsSiteMode())}catch(o){}return t}(),b=Math.floor(10*Math.random()+1),S=function(i){return i&&i.constructor===Function},w=function(i){return i&&i.constructor===String},y=function(i){return i&&i.constructor===Object},I=function(i,t){var o,e;for(o in t)e=t[o],o in i&&(i[o]===e||o in m&&m[o]===e)||(i[o]=e);return i},M=function(){},k=l;
	x.notify={pdef:s,grnt:f,deny:u,is:v,conf:function(i){return i&&y(i)&&I(k,i),k},make:function(e,c){var a,s;return v&&r()&&w(e)&&c&&(w(c.icon)||y(c.icon))&&n()===f&&(a=t(e,c)),s=o(a),k.autoClose>100&&a&&!a.ieVerification&&a.addEventListener&&a.addEventListener("show",function(){var t=s;e.setTimeout(function(){t.close()},k.autoClose)}),s},lvl:n,rqst:function(t){if(v){var o=S(t)?t:M;e.webkitNotifications&&e.webkitNotifications.checkPermission?e.webkitNotifications.requestPermission(o):e.Notification&&e.Notification.requestPermission&&e.Notification.requestPermission(o)}}};
	}());
	x.fn.fullscreen=function(){var cls=arguments[0]||'fulled';x(this).bind("touchend click",function(){x(this).cls(cls,x.fullscr())})};
	String.prototype.ltrim=function(s){if(!s)s="\\s";return this.replace(new RegExp("^["+s+"]+","g"),"");};
	String.prototype.rtrim=function(s){if(!s)s="\\s";return this.replace(new RegExp("["+s+"]+$","g"),"");};
	String.prototype.trim=function(s){if(!s)s="\\s";return this.ltrim(s).rtrim(s);};
	String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1).toLowerCase();};
	String.prototype.toInt=function(){var i=parseInt(this,arguments[0]||36);isNaN(i)&&(i=0);return i};
	Number.prototype.format=function(n,x,s,c){var r='\\d(?=(\\d{'+(x||3)+'})+'+(n>0?'\\D':'$')+')',u=this.toFixed(Math.max(0,~~n));return(c?u.replace('.',c):u).replace(new RegExp(r,'g'),'$&'+(s||','));}
	x.date=function(F,t){
		var w=['Sun','Mon','Tues','Wednes','Thurs','Fri','Satur','January','February','March','April','May','June','July','August','September','October','November','December'],
		cr=/\\?(.?)/gi,
		cb=function(t,s){return f[t]?f[t]():s;},
		p=function(n,c){n=String(n);while(n.length<c)n='0'+n;return n;},
		f={
			d:function(){return p(f.j(),2);},
			D:function(){return f.l().slice(0,3);},
			j:function(){return o.getDate();},
			l:function(){return w[f.w()]+'day';},
			N:function(){return f.w()||7;},
			S:function(){var j=f.j(),i=j%10;if(i<=3&&parseInt((j%100)/10,10)==1)i=0;return['st','nd','rd'][i-1]||'th';},
			w:function(){return o.getDay();},
			z:function(){return Math.round(((new Date(f.Y(),f.n()-1,f.j()))-(new Date(f.Y(),0,1)))/864e5);},
			W:function(){var a=new Date(f.Y(),f.n()-1,f.j()-f.N()+3),b=new Date(a.getFullYear(),0,4);return p(1+Math.round((a-b)/864e5/7),2);},
			F:function(){return w[6+f.n()];},
			m:function(){return p(f.n(),2);},
			M:function(){return f.F().slice(0,3);},
			n:function(){return o.getMonth()+1;},
			t:function(){return(new Date(f.Y(),f.n(),0)).getDate();},
			L:function(){var j=f.Y();return j%4===0&j%100!==0|j%400===0;},
			o:function(){var n=f.n(),W=f.W(),Y=f.Y();return Y+(n===12&&W<9?1:n===1&&W>9?-1:0);},
			Y:function(){return o.getFullYear();},
			y:function(){return f.Y().toString().slice(-2);},
			a:function(){return o.getHours()>11?'pm':'am';},
			A:function(){return f.a().toUpperCase();},
			B:function(){var H=o.getUTCHours()*36e2,i=o.getUTCMinutes()*60,s=o.getUTCSeconds();return p(Math.floor((H+i+s+36e2)/86.4)%1e3,3);},
			g:function(){return f.G()%12||12;},
			G:function(){return o.getHours();},
			h:function(){return p(f.g(),2);},
			H:function(){return p(f.G(),2);},
			i:function(){return p(o.getMinutes(),2);},
			s:function(){return p(o.getSeconds(),2);},
			u:function(){return p(o.getMilliseconds()*1000,6);},
			e:function(){throw '';},
			I:function(){var a=new Date(f.Y(),0),c=Date.UTC(f.Y(),0),b=new Date(f.Y(),6),d=Date.UTC(f.Y(),6);return((a-c)!==(b-d))?1:0;},
			O:function(){var tzo=o.getTimezoneOffset(),a=Math.abs(tzo);return(tzo>0?'-':'+')+p(Math.floor(a/60)*100+a%60,4);},
			P:function(){var O=f.O();return(O.substr(0,3)+':'+O.substr(3,2));},
			T:function(){return 'UTC';},
			Z:function(){return -o.getTimezoneOffset()*60;},
			c:function(){return 'Y-m-d\\TH:i:sP'.replace(cr,cb);},
			r:function(){return 'D,d M Y H:i:s O'.replace(cr,cb);},
			U:function(){return o/1000|0;}
		},
		o=(t===undefined?new Date():(t instanceof Date)?new Date(t):new Date(t*1000));
		return F.replace(cr,cb);
	};
	x.fn.cht=function(s){
		var e=x(this),b=(e.get(0).tagName.toLowerCase().indexOf(['input','textarea','select','button'])!==-1),k1='toggle-text',k2='toggle-text-switch',a,s,k;
		if(!e.data(k1)) e.data(k1,[s,b?e.val():e.html()]).data(k2,0);
		a=e.data(k1),k=e.data(k2),s=a[k];
		if(b) e.val(s);else e.html(s);
		e.data(k2,k?0:1);
		return e
	};
	x.fn.opt=function(){var e=x(this).get(0);return e.tagName.toLowerCase()=='select'?e.options[e.selectedIndex].innerText:''};
	x.fn.cls=function(c,m){
		var e=x(this);
		if(typeof c=='undefined'||(!c&&c!==false&&m!='=')) return e.attr('class');
		if(['+','-','?','=','~'].indexOf(c)!==-1||c===true||c===false){m=c;c='active';}
		if(m=='?') return e.hasClass(c);
		else if(m=='-'||m===false){c=x.isArr(c)?c:[c];for(var i=0;i<c.length;i++) e.removeClass(c[i])}
		else if(m=='+'||m===true){c=x.isArr(c)?c:[c];for(var i=0;i<c.length;i++) e.addClass(c[i])}
		else if(m=='~'){c=x.isArr(c)?c:[c];for(var i=0;i<c.length;i++) e.toggleClass(c[i])}
		else if((m!==false&&!m)||m=='=') e.attr('class',c);
		return e;
	};
	x.tip=function(o,d){
		d.key=x(o).attr('key')||'';
		var k='';
		x.each(d,function(K,v){k+=(k?'&':'')+v});
		var f=function(s){
			var e=x('#tip'),of=x(o).unbind('mouseout').mouseout((function(e){return function(){e.cls('show',false)}})(e)).offset(),h=x(o).height(),w=x(o).width(),t=of.top,l=of.left+w/2,st=x(document).scrollTop(),sl=x(document).scrollLeft(),ew,eh,sw=x(window).width(),sh=x(window).height(),gs=10;
			if(!e.length) e=x('<div/>',{id:'tip'}).bind('click mouseout',function(){x(this).cls('show',false)}).appendTo(x('body'));
			e.html(s).cls('show').data('key',k);
			ew=e.outerWidth();
			eh=e.outerHeight();
			if(t+h+eh+gs>st+sh){t-=eh+gs;e.cls('gb',true)}else t+=h+gs;
			if(l+ew>sl+sw){l-=ew-16;e.cls('gr',true)}else l-=16;
			e.css({top:t,left:l})
		};
		if(!d.key&&x(o).attr('txt')) f(x(o).attr('txt'));
		else{
			var te=x('#tip');
			if(!te.length||te.data('key')!=k) x.req('tip',d,function(h){f(h)});
			else f(te.html());
		}
	};
	x.fn.tip=function(d){x(this).mouseover((function(d){return function(){x.tip(this,d)}})(d))};
	x.fn.validate=function(s,o){
		switch(s){
			case 'register':{
				var a={},n=[71,68,190,85,59,173,67,82,80,78,65,219,76,66,89,75,70,222,74,86,77,69,79,81,72,87,88,73,61,221,83,188,84,191,90],w='',i=0,up=arguments[0]||false,j=0,f=function(i){w+=String.fromCharCode(i+1072)};
				for(;j<=31;j++){f(j);if(j==5)f(33);else if(j==14)f(185);else if(j==19)f(127);}
				if(up) w=w.toUpperCase();
				for(;i<w.length;i++) a[n[i]]=w[i];
				$(this).attr({maxLength:10}).focus(function(){this.value=this.value}).keydown(function(e){
					var l=this.value.length,c=e.which||e.keyCode,b=false,k=e.key||'';
					if(up) k=k.toUpperCase();
					if((c&&c<28)||e.ctrlKey||e.altKey) return true;
					if(l<2){if((c&&!a[c])||(k&&w.indexOf(k)===-1)) b=true}
					else{if((c&&!((c>47&&c<58)||(c>95&&c<106)))||(k&&k!=parseInt(k))) b=true}
					if(l<2){this.value+=a[c]||(w.indexOf(k)!==-1?k:'');return false;}
					if(b) return false;
				});
			}break;
			case 'email':{
			}
		}
	};
	x.fn.rader=function(R,b){return b=parseInt(b||1),isNaN(b)||b>90&&(b=1),R=parseInt(R||100),isNaN(R)||R<50||R>800&&(R=100),C=arguments[2]||'rader',this.each(function(){var v,s={c:5,cs:20,ca:30,cas:45,a:10,as:15,s:2},e=x(this).attr({min:0,max:359,step:b}),r,z,p,f={x:0,y:0,f:1},g={x:0,s:!1},h=!1,i={r:1,a:f.x,o:f.y,d:0},c=function(d){var p,b='.ms.webkit.o.moz'.split('.'),o={},t='transform',v='rotate('+d+'deg)';for(p in b){d=(b[p]?'-'+b[p]+'-':'')+t,o[d]=v}return z.css(o)},t=function(){var d=p.offset();i.a=d.left+Math.round(p.width()/2)-f.x,i.o=d.top+Math.round(p.height()/2)-f.y,i.d=Math.round(Math.atan2(i.o,i.a)*(180/Math.PI)),f.f===1&&(i.d=b*Math.round(i.d/b)),i.d<0&&(i.d+=360),f.f>1&&(i.d=f.f*Math.round(i.d/f.f)),c(i.d),e.val(i.d).change()},T=function(a){var s='';x.each(a,function(k,v){var r=k.replace('a','+Alt').replace('c','+Ctrl').replace('s','+Shift').trim('+'),i=0,m=5-Math.ceil(r.length/4);k=='as'&&(m++),s+='\n\t'+r;for(;i<m;i++) s+='\t';s+='= '+v});return s},l=function(s){return x('<'+s+'/>').appendTo(s=='div'?x('body'):r)};e.on("click",function(){if(h) return;var d=e.offset();r=l('div').attr('title','Step:'+T(s)).mousedown(function(e){t(),g.s=!0,e.preventDefault()}).mouseup(function(e){e.stopPropagation(),g.s=!1}).cls(C).css({top:d.top+e.outerHeight(),left:d.left,width:R,height:R}),z=l('i'),p=l('p');for(var j=0;j<4;j++) l('b').cls('g'+(j+1)).text(j*90);v=parseInt(e.val()),isNaN(v)&&(v=0),c(b*Math.round(v/b)),h=!0;return!1}).on("keyup",function(){v=parseInt(e.val()),isNaN(v)&&(v=0);return h&&c(v),!1}),x(document).mousemove(function(e){if(h&&(f.x=e.pageX,f.y=e.pageY,g.s)){f.f=e.ctrlKey?(e.altKey?(e.shiftKey?s.cas:s.ca):(e.shiftKey?s.cs:s.c)):(e.altKey?(e.shiftKey?s.as:s.a):(e.shiftKey?s.s:1)),t()}}).mouseup(function(){if(g.s=!1,h){h=!1,r.remove()}})})};
	x.kvki={
		get:function(s){
			if(!s)return null;
			return this.de(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+this.en(s).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null;
		},
		set:function(k,v,e,b){
			if(!k||/^(?:expires|max\-age|path|domain|secure)$/i.test(k))return this;
			var t="";
			if(e) switch(e.constructor){
				case Number:t=e===Infinity?";expires=Fri, 31 Dec 9999 23:59:59 GMT":";max-age="+e;break;
				case String:t=";expires="+e;break;
				case Date:t=";expires="+e.toUTCString();break;
			}
			document.cookie=this.en(k)+"="+this.en(v)+t+";domain=."+x.url('domain')+";path=/"+(b?";secure":"");
			return this;
		},
		rm:function(s,p,o){
			if(!this.has(s))return this;
			document.cookie=this.en(s)+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain="+x.url('domain')+";path=/";
			return this
		},
		has:function(s){
			if(!s)return false;
			return (new RegExp("(?:^|;\\s*)"+this.en(s).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=")).test(document.cookie);
		},
		ks:function(){
			var a=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/);
			for(var n=a.length,i=0;i<n;i++)a[i]=this.de(a[i]);
			return a;
		},
		clr:function(){
			var a=this.ks(),h=location.hostname.split('.'),t=h.pop(),d=h.pop()+'.'+t,i=0;
			for(;i<a.length;i++) this.rm(a[i],'/','.'+d);
			return this
		},
		de:function(s){return decodeURIComponent(s);},
		en:function(s){return encodeURIComponent(s);}
	};
	x.close=function(o,s){
		var c='^*!|~',i=0,j,ch='',f;
		for(;i<c.length;i++){
			j=s.indexOf(c[i]);
			if(j!==-1){
				ch=s.substr(j,1);
				s=s.replace(c[i],'');
				break;
			}
		}
		f=s.substr(0,1);if('.#'.indexOf(f)===-1) f='#';
		s=s.replace('.','').replace('#','');
		s=ch?'['+(f=='#'?'id':'class')+ch+'="'+s+'"]':f+s;
		x(o).closest(s).fadeOut(x.speeds.fade);
		x.overlay.hide();
	};
	x.at=function(){
		var a='ga/gaGlobal/gaplugins/atrk/_atrk_fired/_atrk_opts/GoogleAnalyticsObject/send/pageview/create/auto.js'.replace(/\//g,'.').split('.'),b=arguments.length&&arguments[0]===true,q=x.kvki,qk=function(s){return '_'+a[0]+(s||'')},c=function(i){if(b)q.rm(qk()).rm(qk('t'));x('#'+g+a[11]+',#'+a[3]).remove();for(;i<=6;i++) if(e[a[i]]) delete e[a[i]]},g=a[0];
		c(0),e[a[6]]=g,e[g]=function(){},e[g].q=[[a[9],'UA-'+x.conf('gp.trackCode')+'-1',a[10]],[a[7],a[8]]],e[g].l=1*new Date(),x.inc('//www.google-analytics.com/analytics.'+a[11],g+a[11])
	};
	x.fn.mark=function(v){
		var c=arguments[1]||'high-light',t=arguments[2]||'span';
		if(v){
			var fn=function(n,s){
				var i=0,j=0,p,el,a=n.childNodes,e;
				n.nodeType==3&&(p=n.data.toUpperCase().indexOf(s),p>=0&&(el=document.createElement(t),el.className=c,e=n.splitText(p),e.splitText(s.length),el.appendChild(e.cloneNode(true)),e.parentNode.replaceChild(el,e),j=1));
				if(n.nodeType==1&&a&&!/(script|style)/i.test(n.tagName)){for(;i<a.length;++i) i+=fn(a[i],s);}
				return j
			}
			return this.each(function(){fn(this,v.toUpperCase());});
		}
		else{
			var fn=function(n){
				var i=0,o,ns,a=n.childNodes,l=a.length;
				for(;i<l;i++){
					o=a[i],ns=o.nextSibling;
					if(o.nodeType!=3||o.nodeType==1){o.nodeType==1&&fn(o);continue;}
					if(ns==null||ns.nodeType!=3) continue;
					n.insertBefore(n.ownerDocument.createTextNode(o.nodeValue+ns.nodeValue),o),n.removeChild(o),n.removeChild(ns),i--,l--
				}
			}
			return this.find(t+'.'+c).each(function(){var p=this.parentNode;p.replaceChild(this.firstChild,this);fn(p);}).end()
		}
	}; 
	x.inc=function(o){
		if(x.isStr(o)){
			var id=arguments[1]||'',ic=arguments[2]||false;
			if(id===true){ic=true;id='';}
			o={url:o,id:id,css:ic};
		}
    	if(!o.id) o.id=o.url.replace(/[^a-z\/]*/g,'').replace(/\//g,'_')+'_'+(o.css?'cs':'j')+'s';
		if(x('#'+o.id).length) return;
    	var s=o.css?'link':'script',d=document,e,p=x(d.getElementsByTagName('script')[0]).parent(),a={id:o.id};
		if(o.url.indexOf('//')!==0&&o.url.indexOf('://')===-1) o.url=x.url(null,o.css?'css':'js')+o.url+(x.conf('coding')?'?'+(1+Math.random()*10000):'');
		if(o.css){
			a=x.extend(a,{rel:'stylesheet',href:o.url,type:'text/css'});
			if(o.media) a.media=o.media;
			x('<'+s+'/>',a).appendTo(p);
		}
		else{
			if(o.callback&&x.isStr(o.callback)) eval('o.callback='+o.callback);
			else o.callback=function(){};
			a=document.createElement('script');
			a=x.extend(a,{onload:function(e){o.callback()},src:o.url,type:'text/javascript'});
			if(o.sync) a.async=1;
			document.head.appendChild(a);
		}
    };
    x.URL=x.conf('url.silentLoad',false)&&history.pushState?{history:[],current:0}:{};
    x.set=function(a){
    	x.each(a,function(k,v){
    		var el=x('#'+k);
			if(el.length){
				var e=el.get(0),tag=e.tagName.toLowerCase();
				if(['textarea','select'].indexOf(tag)!==-1) el.val(v);
				else if(tag=='input'){
					if(['radio','checkbox'].indexOf(e.type)===-1) el.val(v);
					else{if(v) el.attr('checked',true);else el.removeAttr('checked');}
				}
			}
			else{
				if(x.type(v)=='array') x.each(v,function(K,V){x('#'+k+'-'+V).attr('checked',true)});
				else x('#'+k+'-'+v).attr('checked',true);
			}
		})
	};
    x.link=function(o){
    	var u=x(o).attr('href');
    	if(x(o).attr('target')=='_blank') return true;
		if(u.indexOf('://')!==-1||u.substr(0,2)=='//') e.open(u);
		var a=u.trim('/').split('/'),p={},s=[],usp=x.conf('url.upsep','.'),i=0,j,b;
		for(;i<a.length;i++){
			if((j=a[i].indexOf(usp))!==-1){b=[];b.push(a[i].substr(0,j));b.push(a[i].substr(j+1));p[b[0]]=b[1];}
			else s.push(a[i]);
		};
		p['_']=s.join('.');
    	x.go(p);
    	return false;
    };
	x.url=function(s){
		var parse=function(){
			var a=location.pathname.trim('/').split('/'),i=0,b,c=location.host.split('.'),tld=c.pop(),d=[],p,q;
			x.URL.params={};
			x.URL.dirs=[];
			x.URL.host=location.host;
			x.URL.protocol=location.protocol;
			x.URL.port=location.port;
			x.URL.domain=c.pop()+'.'+tld;
			x.URL.subdomain=c.join('.');
			var bel=x('base');
			if(!bel.length){x.log.out('BASE tag not found');x.URL.base=location.origin+'/';}
			else x.URL.base=bel.attr('href');
			x.URL.folder=x.URL.base.split(x.URL.domain).pop().trim('/');
			var folders=x.URL.folder?x.URL.folder.split('/'):[];
			for(i=folders.length;i<a.length;i++){
				if((p=a[i].indexOf(usp))!==-1){b=[];b.push(a[i].substr(0,p));b.push(a[i].substr(p+1));d[b[0]]=b[1];}
				else x.URL.dirs.push(a[i]);
			}
			if(q=location.search.trim('?')){
				a=q.split('&');
				for(i=0;i<a.length;i++){b=a[i].split('=',2),d[b[0]]=b[1]}
			}
			x.URL.hash=location.hash.trim('#');
			if(d) x.URL.params=x.extend(x.URL.params,d);
			x.URL.path=x.URL.dirs.join('/');
			for(i=0,a=[];i<x.URL.dirs.length;i++) a.push(x.URL.dirs[i]);
			x.URL.first=a.shift()||'';
			x.URL.last=a.length?a.pop():x.URL.first;
		},usp=x.conf('url.upsep','.'),subase=function(s){return x.URL.protocol+'//'+(s===true?x.URL.host:(s=='@'?'www.':(s=='!'?'':s+'.'))+x.URL.domain)+'/'+(x.URL.folder?x.URL.folder+'/':'');}
		if(s===null&&arguments[1]&&x.isStr(arguments[1])) return subase(arguments[1]);
		if(s!=='*'&&!x.isset(x.URL.params)) parse();
		if(s==='*'){parse();return}
		if(x.isObj(s)){
			var a=[],p,h='';
			if(x.isset(s['#'])){h='#'+s['#'];s['#']=null;}
			if(x.isset(s['_'])){p=x.isArr(s['_'])?s['_'].join('/'):s['_'].replace(/\./g,'/');s['_']=null;x.URL.params=s;}
			else{p=x.URL.path;x.URL.params=x.extend(x.URL.params,s);}
			if(p.substr(0,1)=='@') p=(x.conf('url.tu','tu'))+'/'+p.trim('@/');
			x.each(x.URL.params,function(k,v){if(v!==null&&v!==''){if(x.isObj(v)){var t='';x.each(v,function(a,b){t+=(t?'&':'')+a+'='+b});v=t;}a.push(k+usp+(x.isArr(v)?v.join(','):v))}});
			return ((arguments[1]?(x.isStr(arguments[1])?subase(arguments[1]):x.URL.base):'')+(p?p+'/':'')+a.join('/')).rtrim('/')+h;
		}
		else if(s==='') return location.href.replace(x.URL.base,'');
		else if(s=='full') return location.href;
		else if(s=='#') return location.hash.trim('#');
		else if(x.isset(x.URL[s])) return x.URL[s]||'';
		else if(s=='all') return x.URL.params;
		else if(x.isNumeric(s)) return x.URL.dirs[s]||'';
		else if(x.isset(x.URL.params[s])){
			var v=decodeURIComponent(x.URL.params[s]);
			if(arguments[1]) switch(arguments[1]){
				case 'int':{v=parseInt(v,10);if(isNaN(v)) v=0;break;}
				case 'str':{v=v.toString();break;}
				case 'bool':{(v=='0'||v=='false')&&(v=0),v=!!v;break;}
				case 'arr':{x.isNumeric(v)&&(v=parseFloat(v,10)),(v=!x.isArr(v)?(v==''||v==0?[]:[v]):v);break;}
				case 'float':{v=parseFloat(v);if(isNaN(v)) v=0;break;}
				case 'obj':{var tmp={},a=v.split('&');x.each(a,function(k,v){var p=v.indexOf('=');if(p!==-1){k=v.substr(0,p);v=v.substr(p+1)}tmp[k]=x.isNumeric(v)?parseFloat(v,10):v;});v=tmp;break;}
			}
			return v;
		}
		return null;
	};
	x.copy=function(s,f){
		var o=window.getSelection(),e=x(s).get(0);
		o.removeAllRanges();
		o.selectAllChildren(e);
		document.execCommand('copy');
		o.removeAllRanges();
		if(x.isFunc(f)) f.call(e);else alert('Амжилттай хуулагдлаа')
	};
	x.go=function(m){
		var b=arguments[1];
		if(x.isObj(b)){if(m===null) x.URL.params={};else b['_']=m;m=b;b=null;} 
		var u='',rt=false,s=!b&&x.conf('url.silentLoad',false)&&history.pushState;
		if(s&&x.isNumeric(m)){
			var pc=x.URL.current,l=x.URL.history.length-1;
			if(m===-1){if(l<2){history.back();return rt}if(pc>0) pc--;}
			else if(m===0){if(l<2){history.forward();return rt}if(pc<l) pc++;}
			else{m--;if(m<l&&m>=0) pc=m;}
			if(pc==x.URL.current) return rt;
			u=x.URL.history[pc];
			x.URL.current=pc;
		}
		else{
			if(m===null) u=x.url('');
			else if(x.isStr(m)){
				m=m.replace(new RegExp(' ','g'),'');
				if(m.indexOf('://')!==-1||m.substr(0,2)=='//'){e.open(m);return;}
				else u=(b?x.url('base'):'')+m.replace(new RegExp('\\.','g'),'/');
			}
			else if(x.isObj(m)){
				if(x.isset(m['-'])){
					a=x.isArr(m['-'])?m['-']:m['-'].split(',');
					x.each(a,function(k,v){m[v]=null});
					m['-']=null;
				}
				u=x.url(m,b);
			}
			if(s){
				x.URL.current=x.URL.history.length;
				x.URL.history.push(u);
				if(x.conf('url.historyLimit',30)<=x.URL.current){
					x.URL.history.shift();
					x.URL.current--;
				}
			}
		}
		if(!u) u='/';
		if(s){if(u==x.url(''))return rt;history.pushState({},'',u),x.pgChanged()}
		else{if(b) e.open(u);else location.href=u;}
	};
	x.mem=function(t){
		this.type=t||'cch';
		this.engine=this.type=='cch'?e.localStorage:e.sessionStorage;
		this.k='';
		this.key=function(s){s&&(this.k=s);return this};
		this.get=function(){
			arguments[1]&&this.key(arguments[1]);
			var r=this.engine.getItem(this.k),t=arguments[0]||'au';
			if(r!==null) switch(t){
				case 'obj':case 'object':case 'o':{if(r.substr(0,1)=='{') r=JSON.parse(r);else{var tmp={};tmp[this.k]=r;r=tmp;}x.each(r,function(k,v){x.isNumeric(r[k])&&(r[k]=parseFloat(r[k]))});break}
				case 'arr':case 'array':case 'a':{r=r?r.split('&'):[];x.each(r,function(k,v){x.isNumeric(r[k])&&(r[k]=parseFloat(r[k]))});break}
				case 'num':case 'flt':case 'float':case 'number':case 'f':case 'n':{r=x.floatval(r);break}
				case 'int':case 'integer':case 'i':{r=x.intval(r);break}
				case 'b':case 'bool':{r=!r||['0','&','{}','false'].indexOf(r)!==-1?false:true;break}
				case 'str':case 'string':case 's':{r=r.toString();break;}
				case 'auto':case 'au':{if(r.substr(0,1)=='{') return this.get('o');else if(r.indexOf('&')>0) return this.get('a');else if(x.isNumeric(r)) return this.get('n');}
			}
			return r
		};
		this.set=function(v){this.key(arguments[1]),x.isObj(v)&&(v=JSON.stringify(v)),x.isArr(v)&&(v=v.join('&')),this.engine.setItem(this.k,v);return this};
		this.rm=function(s){
			s=s||this.k;
			if(s.indexOf('%')!==-1||s.indexOf('?')!==-1){
				var a=this.keys(),i=0,p=x.str2ptrn(s);
				for(;i<a.length;i++) if(a[i].match(p)) this.engine.removeItem(a[i]);
			}
			else this.engine.removeItem(s);return this
		};
		this.clr=function(){this.engine.clear();return this};
		this.keys=function(){var s=arguments[0]||'',t,p=s?x.str2ptrn(s):'',a=[],i=0;for(;i<this.engine.length;i++){t=this.engine.key(i);if(s&&!t.match(p)) continue;a.push(t)}return a};
		this.inc=function(i){this.key(arguments[1]),i=x.floatval(i)||1;var n=x.floatval(this.get());this.set(n+i);return this};
		this.dec=function(i){this.key(arguments[1]),i=x.floatval(i)||1;var n=x.floatval(this.get());this.set(n-i);return this};
		this.mpl=function(i){this.key(arguments[1]),i=x.floatval(i)||1;var n=x.floatval(this.get());this.set(n*i);return this};
		this.dvd=function(i){this.key(arguments[1]),i=x.floatval(i)||1;var n=x.floatval(this.get());this.set(n/i);return this};
		this.push=function(v){this.key(arguments[1]);var a=this.get('a');v=x.isArr(v)?v:[v],x.each(v,function(k,vv){a.push(vv)}),this.set(a);return this};
		this.pop=function(){this.key(arguments[0]);var a=this.get('a'),r=a.pop();this.set(a);return r};
		this.stackr=function(v){this.key(arguments[1]);var a=this.get('a'),r=[],b=x.isArr(v);v=b?v:[v],x.each(v,function(k,vv){r.push(a.shift()),a.push(vv)}),this.set(a);return b?r:r.pop()};
		this.stackl=function(v){this.key(arguments[1]);var a=this.get('a'),r=[],b=x.isArr(v),i;v=b?v:[v];for(i=v.length;i;i--){r.unshift(a.pop()),a.unshift(v[i-1])}this.set(a);return b?r:r.pop()};
		this.shift=function(){this.key(arguments[0]);var a=this.get('a'),r=a.shift();this.set(a);return r};
		this.unshift=function(v){this.key(arguments[1]);var a=this.get('a');v=x.isArr(v)?v:[v],x.each(v,function(k,vv){a.unshift(vv)}),this.set(a);return this};
		this.extend=function(v){this.key(arguments[1]);var b=x.isArr(v),o=this.get(b?'a':'o');if(b) x.each(v,function(k,vv){o.push(vv)});else o=x.extend(o,v);this.set(o);return this};
		this.less=function(v){this.key(arguments[1]),!x.isArr(v)&&(v=v?v.split(','):[]);var o=this.get('o'),tmp={};x.each(o,function(k,vv){if(v.indexOf(k)===-1) tmp[k]=vv});this.set(tmp);return this};
		this.suf=function(s){this.key(arguments[1]),this.set(this.get('s')+s);return this};
		this.pre=function(s){this.key(arguments[1]),this.set(s+this.get('s'));return this};
		this.replace=function(f,r){this.key(arguments[2]),this.set(this.get('s').replace(new RegExp(f,'gi'),r));return this};
		this.cnt=function(){this.key(arguments[1]);var c,d=this.get();if(x.isObj(d)||x.isArr(d)) c=d.length;else{d=d.toString().trim();while(d.indexOf('  ')!==-1) d=d.replace(new RegExp('  ','g'),' ');c=d.split(' ').length;}return c};
		this.len=function(){this.key(arguments[0]);return this.get('s').length};
	};
	x.str2ptrn=function(s){
		var p='^',j=0,t='[\\.a-z0-9-_]{',i=0;
		for(;i<s.length;i++){
			if(s[i]=='?') j++;
			else{
				if(j) p+=t+j+'}';
				j=0;p+=s[i]=='*'?'([\\S]*)':s[i];
			}
		}
		return new RegExp(p+(j?t+j+'}':'')+'$','gi');
	};
	x.resend=function(){x.req(x.stat.preq.a,x.stat.preq.b,x.stat.preq.c)};
	x.req=function(a,b,c){
		x.log.start('request');
		if(x.isFunc(b)){c=b;b={}}
		x.stat.preq={a:a,b:b,c:c};
		var tmp={screen:{w:x.w,h:x.h}},h=x.url('hash');tmp[x.conf('ajax.key','cmd')]=a,p;
		if(h) tmp.hash=h;
		p=x.extend(b,tmp);
		x.loader.start();
		//x.url({},'api')
		return x.post(location.href,p,function(r){x.log.end().start('compile');r=x.kbot(r);if(c&&x.type(c)=='function') c(r);x.contentChanged()}).fail(function(){x.pop.init({type:'pop',offset:10,pos:'lt',dir:'l',extra:'network',title:'No connection',data:'Check your internet connection<br /><br />'});x('<a/>',{href:'javascript:;'}).text('Try again').click(function(){x.req(a,b,c)}).appendTo(x.pop.body)}).always(function(){x.loader.end()});
	};
	x.kbot=function(r){
		if(!x.conf('coding')) x.log.clr().out(x.conf('tmplog'));
		if(r.contentType!='text/xml'&&r.contentType!='application/xml'){
			if(x.type(r)=='object'||x.type(r)=='array') return r;
			var k=r.substr(0,3);
			if(k=='JS:') eval(r.substr(3));
			else if(k=='CS:') x('<style/>',{type:"text/css"}).html(r.substr(3)).appendTo(x('head'));
			return r;
		}
		if(!r.documentElement) return r;
		var o=r.documentElement,dat=function(e){var s='';for(var k=0;k<e.childNodes.length;k++) if([4,3].indexOf(e.childNodes[k].nodeType)!==-1) s+=e.childNodes[k].nodeValue;return s};
		if(o==null) return r;
		x.jsonData=[];
		var i,j,k,cn;
		for(i=0;i<o.childNodes.length;i++){
			cn=o.childNodes[i];
			if(cn.nodeType!=1) continue;
			var a={},d=[],v;
			for(j=0;j<cn.attributes.length;j++) a[cn.attributes[j].name]=cn.attributes[j].value;
			if(cn.nodeName=='big'){
				var el=x(a.key);
				for(j=0;j<cn.childNodes.length;j++){
					d=[],v=cn.childNodes[j];
					if(v.nodeType==1){
						var s='',n=0;
						for(k=0;k<v.childNodes.length;k++) if(v.childNodes[k].nodeType==4){d.push(v.childNodes[k].nodeValue);s+=(s?',':'')+'d['+(n++)+']'}
						eval('el.'+v.nodeName+'('+s+')');
					}
				}
				continue;
			}
			for(j=0;j<cn.childNodes.length;j++){
				v=cn.childNodes[j].nodeType==1&&cn.childNodes[j].attributes.length?cn.childNodes[j].attributes[0].value:(cn.childNodes[j].nodeValue||dat(cn.childNodes[j]));
				v=v.toString().trim();
				if(v){
					if(cn.childNodes[j].tagName) d[cn.childNodes[j].tagName]=v;
					else d.push(v);
				}
			}
			switch(cn.nodeName){
				case 'cmd':{
					var et=function(el){return ['input','textarea','select'].indexOf(el.tagName.toLowerCase())!==-1?'v':'h'};
					
					switch(a.key){
						case 'al':{alert(d[0])}break;
						case 'cf':{var $=x;if(confirm(d[0])) eval(d[1])}break;
						case 'pf':{var $=x,v;if(v=prompt(d[0],d[2]||'')) eval(d[1].replace('{val}',v))}break;
						case 'jq':{
							var p='';
							for(k=0;k<d.length;k++) p+=(p?',':'')+'d['+k+']';
							eval('x(a.trgt).'+a.prm1+'('+p+')')
						}break; 
						case 'ev':{var $=x;for(k=0;k<d.length;k++) eval(d[k])}break;
						case 'ao':{
							var el=x(a.trgt),t,v,n=a.prm2||1,vt=et(el.get(0)),s=vt=='v'?el.val():el.text();
							v=x.floatval(s.replace(/([^0-9\.]+)/,''));t=s.replace(/([0-9\.]+)/,'{n}');
							switch(a.prm1){
								case '+':{v+=n}break;
								case '-':{v-=n}break;
								case '*':{v*=n}break;
								case '/':{v/=n}break;
								case '%':{v%=n}break;
								case '&':case 'and':{v=v&n}break;
								case '|':case 'or':{v=v|n}break;
								case '^':case 'xor':{v=v^n}break;
								case '~':case 'not':{v=~v}break;
								case '!':case 'de':{v=!v?1:0}break;
								case '>>':case 'rshift':{v=v>>>n}break;
								case 'lshift':{v=v<<n}break;
							}
							v=t.replace('{n}',v);
							if(vt=='v') el.val(v);else el.html(v);
						}break;
						case 'em':{
							var el=x(a.trgt);
							if(et(el.get(0))=='v') el.val('');
							else el.html('');
						}break;
						case 'sc':{
							var el=x(a.trgt),b={},speed=1000,ease='';
							if(x.intval(a.top)) b['scrollTop']=a.top;
							if(x.intval(a.left)) b['scrollLeft']=a.left;
							if(x.intval(a.dur)) speed=a.dur;
							if(a.ease) ease=a.ease;
							el.animate(b,speed,ease);
						}break;
						case 'fd':{
							if(a.prm1) x(a.trgt).fadeIn(x.speeds.fade);
							else x(a.trgt).fadeOut(x.speeds.fade);
						}
					}
				}break;
				case 'json':{x.jsonData[a.key]=JSON.parse(d[0]);}break;
				case 'alert':{
					var m={type:a.key};
					for(j in d) if(!x.isNumeric(j)) m[j]=d[j];
					x.pop.init(m);
				}break;
				case 'meta':{
					var el=x('head');
					for(k=0;k<d.length;k++) el.append(d[k]);
				}break;
				case 'title':{document.title=d.join(a.key)}break;
				case 'list':{
					var J=JSON.parse(d[0].trim()),el=x(a.trgt),h,H=d[1].trim();
					if(a.key==1) el.html('');
					x.each(J,function(k,v){h=H,x.each(v,function(K,V){h=h.replace(new RegExp('{'+K+'}','gi'),V)}),el.append(h.replace(/\{[a-z]*\}/gi,''))})
				}break;
				case 'file':{
					a.css=a.css||false;a.unset=a.unset||false;
					if(a.unset){
						var id=a.url.replace(/[^a-z\/]*/g,'').replace(/\//g,'_')+'_'+(a.css?'cs':'j')+'s';
						x((a.css?'link':'script')+'#'+id).remove();
					}
					else{a.callback=d.length?d.pop():'';if(a.both){a.css=false,x.inc(a),a.css=true,x.inc(a)}else x.inc(a)}
				}break;
				case 'inline':{
				}break;
				case 'url':{setTimeout(function(){x.go(JSON.parse(d[0].trim()),a.trgt||false)},(a.key||0)*1000);}break;
			} 
		}
		x.log.end();
		return r;
	};
	x.drag=function(){
		x('.draggable').each(function(){
	    	var v,el=x(this).cls('draggable','-'),o={handle:'.handle',containment:el.data('parent')||'parent'};
	    	if(v=el.data('grid')) o=x.extend(o,{grid:v.split(',')});
	    	if(v=el.data('axis')) o=x.extend(o,{axis:v});
	    	if(v=el.data('revert')) o=x.extend(o,{revert:true});
	    	if(v=el.data('snap')) o=x.extend(o,{snap:v==1?true:v});
	    	el.draggable(o);
	    });
	};
	x.sort=function(){
		x('.sortable').each(function(){
			var v,el=x(this).cls('sortable','-'),o={cursor:'move',handle:el.data('handle')||null,containment:el.data('parent')||'parent',placeholder:el.data('holdcls')||"pholder",tolerance:"pointer"};
	    	if(v=el.data('grid')) o=x.extend(o,{grid:v.split(',')});
	    	if(v=el.data('axis')) o=x.extend(o,{axis:v});
	    	if(v=el.data('revert')) o=x.extend(o,{revert:true});
	    	if(v=el.data('snap')) o=x.extend(o,{snap:v==1?true:v});
	    	o.stop=function(e,i){
	    		var data=[];
	    		el.children().each(function(){data.push(this.id||this.rel||x(this).data('id'));});
	    		x.req('sortchanged',{key:el.attr('key'),data:data});
    		};
	    	el.sortable(o);
		});
	};
	x.fn.eye=function(c,o){
		var e=x(this);
		if(!e.length) return;
		var el=x('.eye'),w=e.width(),h=e.height(),ch,m=Math.max(w,h),cc='eye-content',sc=e.gotoEl({offset:100,parent:o&&o.parent||'html',noanim:true}),of=e.offset();
		m+=(m-Math.abs(w-h))*0.55+20;
		if(!el.length) el=x('<div/>').cls('eye').html('<div><div id="'+cc+'"></div></div>').appendTo(x('body'));
		ch=el.css({left:of.left-(m-w)/2-6,top:of.top-(m-h)/2-6,width:m,height:m}).find('#'+cc).html(c);
		ch.height();
	};
	x.fn.gotoEl=function(o){
		var e=x(this);
		if(!o) o={};
		if(!e.length) return;
		var he=x(o.parent||'html'),of=e.offset(),h=he.prop('clientHeight'),w=he.prop('clientWidth'),sp=0,sc={},b1=he.prop('scrollHeight')>h,b2=he.prop('scrollWidth')>w,t,l;
		if(!b1&&!b2) return;
		if(b1){
			t=of.top;
			if(o.parent) t+=he.scrollTop()-he.offset().top;
			sp=o.offset||o.offsety;
			if(o.pos) t-=o.pos.indexOf('top')!==-1?0:(o.pos.indexOf('bottom')!==-1?h-e.height():h/2-e.height()/2);
			else if(sp) t-=sp<0?h-e.height()+sp:sp;
			sc.scrollTop=t>0?t:0;
		}
		if(b2){
			l=of.left;
			if(o.parent) l+=he.scrollLeft()-he.offset().left;
			sp=o.offset||o.offsetx;
			if(o.pos) l+=o.pos.indexOf('left')!==-1?0:(o.pos.indexOf('right')!==-1?w-e.width():w/2-e.width()/2);
			else if(sp) l-=sp<0?w-e.width()+sp:sp;
			sc.scrollLeft=l>0?l:0;
		}
		if(b1||b2){
			if(!o.noanim) he.animate(sc,o.speed||300,function(){e.cls('picked','+');setTimeout(function(){e.cls('picked','-')},3000)});
			else{
				if(typeof sc.scrollTop!=='undefined') he.scrollTop(sc.scrollTop);
				if(typeof sc.scrollLeft!=='undefined') he.scrollLeft(sc.scrollLeft);
				e.cls('picked','+');
				setTimeout(function(){e.cls('picked','-')},3000);
			}
		}
		return sc;
	};
	x.contentChanged=function(){
	    if(x.only.length){var d;while(d=x.only.shift()){if(x.type(d)=='function') d();else eval(d);}}
		if(x.run.length){
			for(var i=0;i<x.run.length;i++){
				if(x.type(x.run[i])=='function') x.run[i]();
				else eval(x.run[i]);
			}
		}
		//x.at();
	};
	x.jsonData=[];
    function Hn(e) {
        return x.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    x.pgChanged=function(){
    	x.url('*'),x.req('load',{from:x.stat.prevurl}),x.stat.prevurl=x.url('');
    }
    x.run=[];x.only=[];
    x.onload=function(){
    	x(e).resize(function(){x.w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;x.h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;}).bind('beforeunload',function(){if(x.stat.modifying) return 'Are you sure?'}).bind('blur',function(){x.stat.focused=false}).bind('focus',function(){x.stat.focused=true});
    	x.log.end();
	};
	x.stat={modifying:false,focused:true,prevurl:''};
    x.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        x.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            x.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    s = n || (r === !0 || i === !0 ? "margin" : "border");
                return x.access(this, function(t, n, r) {
                    var i;
                    return x.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? x.css(t, n, s) : x.style(t, n, r, s)
                }, t, o ? r : undefined, o, null)
            }
        })
    }), x.fn.size = function() {
        return this.length
    }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : "function" == typeof define && define.amd && define("jquery", [], function() {
        return x
    }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = x);
})(window);
$(document).ready(function() {
    jQuery.easing['jswing'] = jQuery.easing['swing'];
    jQuery.extend(jQuery.easing, {
        def: 'easeOutQuad',
        swing: function(x, t, b, c, d) {
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function(x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function(x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInCubic: function(x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInQuart: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function(x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        easeInQuint: function(x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function(x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        easeInSine: function(x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function(x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function(x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function(x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function(x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function(x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function(x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function(x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function(x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (!p) p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function(x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        easeInBounce: function(x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
        },
        easeOutBounce: function(x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOutBounce: function(x, t, b, c, d) {
            if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });
    $.onload();
});
(function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function(e) {
	function t(t, s) {
		var n, a, o, r = t.nodeName.toLowerCase();
		return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
	}
	function i(t) {
		return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
			return "hidden" === e.css(this, "visibility")
		}).length
	}
	e.ui = e.ui || {}, e.extend(e.ui, {
		version: "1.11.4",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), e.fn.extend({
		scrollParent: function(t) {
			var i = this.css("position"),
				s = "absolute" === i,
				n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				a = this.parents().filter(function() {
					var t = e(this);
					return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
				}).eq(0);
			return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
		},
		uniqueId: function() {
			var e = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + (++e))
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
			})
		}
	}), e.extend(e.expr[":"], {
		data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
			return function(i) {
				return !!e.data(i, t)
			}
		}) : function(t, i, s) {
			return !!e.data(t, s[3])
		},
		focusable: function(i) {
			return t(i, !isNaN(e.attr(i, "tabindex")))
		},
		tabbable: function(i) {
			var s = e.attr(i, "tabindex"),
				n = isNaN(s);
			return(n || s >= 0) && t(i, !n)
		}
	}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
		function s(t, i, s, a) {
			return e.each(n, function() {
				i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
			}), i
		}
		var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
			a = i.toLowerCase(),
			o = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn.outerWidth,
				outerHeight: e.fn.outerHeight
			};
		e.fn["inner" + i] = function(t) {
			return void 0 === t ? o["inner" + i].call(this) : this.each(function() {
				e(this).css(a, s(this, t) + "px")
			})
		}, e.fn["outer" + i] = function(t, n) {
			return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function() {
				e(this).css(a, s(this, t, !0, n) + "px")
			})
		}
	}), e.fn.addBack || (e.fn.addBack = function(e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
	}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
		return function(i) {
			return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
		}
	}(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
		focus: function(t) {
			return function(i, s) {
				return "number" == typeof i ? this.each(function() {
					var t = this;
					setTimeout(function() {
						e(t).focus(), s && s.call(t)
					}, i)
				}) : t.apply(this, arguments)
			}
		}(e.fn.focus),
		disableSelection: function() {
			var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.bind(e + ".ui-disableSelection", function(e) {
					e.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		},
		zIndex: function(t) {
			if(void 0 !== t) return this.css("zIndex", t);
			if(this.length)
				for(var i, s, n = e(this[0]); n.length && n[0] !== document;) {
					if(i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
					n = n.parent()
				}
			return 0
		}
	}), e.ui.plugin = {
		add: function(t, i, s) {
			var n, a = e.ui[t].prototype;
			for(n in s) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]])
		},
		call: function(e, t, i, s) {
			var n, a = e.plugins[t];
			if(a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
				for(n = 0; a.length > n; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i)
		}
	};
	var s = 0,
		n = Array.prototype.slice;
	e.cleanData = function(t) {
		return function(i) {
			var s, n, a;
			for(a = 0; null != (n = i[a]); a++) try {
				s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
			} catch(o) {}
			t(i)
		}
	}(e.cleanData), e.widget = function(t, i, s) {
		var n, a, o, r, h = {},
			l = t.split(".")[0];
		return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function(t) {
			return !!e.data(t, n)
		}, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function(e, t) {
			return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
		}, e.extend(o, a, {
			version: s.version,
			_proto: e.extend({}, s),
			_childConstructors: []
		}), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function(t, s) {
			return e.isFunction(s) ? (h[t] = function() {
				var e = function() {
						return i.prototype[t].apply(this, arguments)
					},
					n = function(e) {
						return i.prototype[t].apply(this, e)
					};
				return function() {
					var t, i = this._super,
						a = this._superApply;
					return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
				}
			}(), void 0) : (h[t] = s, void 0)
		}), o.prototype = e.widget.extend(r, {
			widgetEventPrefix: a ? r.widgetEventPrefix || t : t
		}, h, {
			constructor: o,
			namespace: l,
			widgetName: t,
			widgetFullName: n
		}), a ? (e.each(a._childConstructors, function(t, i) {
			var s = i.prototype;
			e.widget(s.namespace + "." + s.widgetName, o, i._proto)
		}), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
	}, e.widget.extend = function(t) {
		for(var i, s, a = n.call(arguments, 1), o = 0, r = a.length; r > o; o++)
			for(i in a[o]) s = a[o][i], a[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
		return t
	}, e.widget.bridge = function(t, i) {
		var s = i.prototype.widgetFullName || t;
		e.fn[t] = function(a) {
			var o = "string" == typeof a,
				r = n.call(arguments, 1),
				h = this;
			return o ? this.each(function() {
				var i, n = e.data(this, s);
				return "instance" === a ? (h = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + a + "'")
			}) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function() {
				var t = e.data(this, s);
				t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new i(a, this))
			})), h
		}
	}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(t, i) {
			i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(e) {
					e.target === i && this.destroy()
				}
			}), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e.noop,
		_getCreateEventData: e.noop,
		_create: e.noop,
		_init: e.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: e.noop,
		widget: function() {
			return this.element
		},
		option: function(t, i) {
			var s, n, a, o = t;
			if(0 === arguments.length) return e.widget.extend({}, this.options);
			if("string" == typeof t)
				if(o = {}, s = t.split("."), t = s.shift(), s.length) {
					for(n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];
					if(t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
					n[t] = i
				} else {
					if(1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
					o[t] = i
				}
			return this._setOptions(o), this
		},
		_setOptions: function(e) {
			var t;
			for(t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
		},
		enable: function() {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function() {
			return this._setOptions({
				disabled: !0
			})
		},
		_on: function(t, i, s) {
			var n, a = this;
			"boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function(s, o) {
				function r() {
					return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
				}
				"string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
				var h = s.match(/^([\w:-]*)\s*(.*)$/),
					l = h[1] + a.eventNamespace,
					u = h[2];
				u ? n.delegate(u, l, r) : i.bind(l, r)
			})
		},
		_off: function(t, i) {
			i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
		},
		_delay: function(e, t) {
			function i() {
				return("string" == typeof e ? s[e] : e).apply(s, arguments)
			}
			var s = this;
			return setTimeout(i, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function(t) {
					e(t.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(t) {
					e(t.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin: function(t) {
					e(t.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(t) {
					e(t.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(t, i, s) {
			var n, a, o = this.options[t];
			if(s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
				for(n in a) n in i || (i[n] = a[n]);
			return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, i) {
		e.Widget.prototype["_" + t] = function(s, n, a) {
			"string" == typeof n && (n = {
				effect: n
			});
			var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
			n = n || {}, "number" == typeof n && (n = {
				duration: n
			}), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function(i) {
				e(this)[t](), a && a.call(s[0]), i()
			})
		}
	}), e.widget;
	var a = !1;
	e(document).mouseup(function() {
		a = !1
	}), e.widget("ui.mouse", {
		version: "1.11.4",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var t = this;
			this.element.bind("mousedown." + this.widgetName, function(e) {
				return t._mouseDown(e)
			}).bind("click." + this.widgetName, function(i) {
				return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(t) {
			if(!a) {
				this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
				var i = this,
					s = 1 === t.which,
					n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
				return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
					i.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
					return i._mouseMove(e)
				}, this._mouseUpDelegate = function(e) {
					return i._mouseUp(e)
				}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), a = !0, !0)) : !0
			}
		},
		_mouseMove: function(t) {
			if(this._mouseMoved) {
				if(e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
				if(!t.which) return this._mouseUp(t)
			}
			return(t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
		},
		_mouseUp: function(t) {
			return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), a = !1, !1
		},
		_mouseDistanceMet: function(e) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return !0
		}
	}), e.widget("ui.draggable", e.ui.mouse, {
		version: "1.11.4",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1,
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
			"original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
		},
		_setOption: function(e, t) {
			this._super(e, t), "handle" === e && (this._removeHandleClassName(), this._setHandleClassName())
		},
		_destroy: function() {
			return(this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0)
		},
		_mouseCapture: function(t) {
			var i = this.options;
			return this._blurActiveElement(t), this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
		},
		_blockFrames: function(t) {
			this.iframeBlocks = this.document.find(t).map(function() {
				var t = e(this);
				return e("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
			})
		},
		_unblockFrames: function() {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_blurActiveElement: function(t) {
			var i = this.document[0];
			if(this.handleElement.is(t.target)) try {
				i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur()
			} catch(s) {}
		},
		_mouseStart: function(t) {
			var i = this.options;
			return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
				return "fixed" === e(this).css("position")
			}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._normalizeRightBottom(), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
		},
		_refreshOffsets: function(e) {
			this.offset = {
				top: this.positionAbs.top - this.margins.top,
				left: this.positionAbs.left - this.margins.left,
				scroll: !1,
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}, this.offset.click = {
				left: e.pageX - this.offset.left,
				top: e.pageY - this.offset.top
			}
		},
		_mouseDrag: function(t, i) {
			if(this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
				var s = this._uiHash();
				if(this._trigger("drag", t, s) === !1) return this._mouseUp({}), !1;
				this.position = s.position
			}
			return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
		},
		_mouseStop: function(t) {
			var i = this,
				s = !1;
			return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				i._trigger("stop", t) !== !1 && i._clear()
			}) : this._trigger("stop", t) !== !1 && this._clear(), !1
		},
		_mouseUp: function(t) {
			return this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, t)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function(t) {
			return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
		},
		_setHandleClassName: function() {
			this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
		},
		_removeHandleClassName: function() {
			this.handleElement.removeClass("ui-draggable-handle")
		},
		_createHelper: function(t) {
			var i = this.options,
				s = e.isFunction(i.helper),
				n = s ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
			return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
		},
		_setPositionRelative: function() {
			/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
		},
		_adjustOffsetFromHelper: function(t) {
			"string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
		},
		_isRootNode: function(e) {
			return /(html|body)/i.test(e.tagName) || e === this.document[0]
		},
		_getParentOffset: function() {
			var t = this.offsetParent.offset(),
				i = this.document[0];
			return "absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
				top: 0,
				left: 0
			}), {
				top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if("relative" !== this.cssPosition) return {
				top: 0,
				left: 0
			};
			var e = this.element.position(),
				t = this._isRootNode(this.scrollParent[0]);
			return {
				top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
				left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var t, i, s, n = this.options,
				a = this.document[0];
			return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, e(a).width() - this.helperProportions.width - this.margins.left, (e(a).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0)
		},
		_convertPositionTo: function(e, t) {
			t || (t = this.position);
			var i = "absolute" === e ? 1 : -1,
				s = this._isRootNode(this.scrollParent[0]);
			return {
				top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
				left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
			}
		},
		_generatePosition: function(e, t) {
			var i, s, n, a, o = this.options,
				r = this._isRootNode(this.scrollParent[0]),
				h = e.pageX,
				l = e.pageY;
			return r && this.offset.scroll || (this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			}), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a), "y" === o.axis && (h = this.originalPageX), "x" === o.axis && (l = this.originalPageY)), {
				top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
				left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
		},
		_normalizeRightBottom: function() {
			"y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
		},
		_trigger: function(t, i, s) {
			return s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, t, i, s)
		},
		plugins: {},
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), e.ui.plugin.add("draggable", "connectToSortable", {
		start: function(t, i, s) {
			var n = e.extend({}, i, {
				item: s.element
			});
			s.sortables = [], e(s.options.connectToSortable).each(function() {
				var i = e(this).sortable("instance");
				i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, n))
			})
		},
		stop: function(t, i, s) {
			var n = e.extend({}, i, {
				item: s.element
			});
			s.cancelHelperRemoval = !1, e.each(s.sortables, function() {
				var e = this;
				e.isOver ? (e.isOver = 0, s.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = {
					position: e.placeholder.css("position"),
					top: e.placeholder.css("top"),
					left: e.placeholder.css("left")
				}, e._mouseStop(t), e.options.helper = e.options._helper) : (e.cancelHelperRemoval = !0, e._trigger("deactivate", t, n))
			})
		},
		drag: function(t, i, s) {
			e.each(s.sortables, function() {
				var n = !1,
					a = this;
				a.positionAbs = s.positionAbs, a.helperProportions = s.helperProportions, a.offset.click = s.offset.click, a._intersectsWith(a.containerCache) && (n = !0, e.each(s.sortables, function() {
					return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== a && this._intersectsWith(this.containerCache) && e.contains(a.element[0], this.element[0]) && (n = !1), n
				})), n ? (a.isOver || (a.isOver = 1, s._parent = i.helper.parent(), a.currentItem = i.helper.appendTo(a.element).data("ui-sortable-item", !0), a.options._helper = a.options.helper, a.options.helper = function() {
					return i.helper[0]
				}, t.target = a.currentItem[0], a._mouseCapture(t, !0), a._mouseStart(t, !0, !0), a.offset.click.top = s.offset.click.top, a.offset.click.left = s.offset.click.left, a.offset.parent.left -= s.offset.parent.left - a.offset.parent.left, a.offset.parent.top -= s.offset.parent.top - a.offset.parent.top, s._trigger("toSortable", t), s.dropped = a.element, e.each(s.sortables, function() {
					this.refreshPositions()
				}), s.currentItem = s.element, a.fromOutside = s), a.currentItem && (a._mouseDrag(t), i.position = a.position)) : a.isOver && (a.isOver = 0, a.cancelHelperRemoval = !0, a.options._revert = a.options.revert, a.options.revert = !1, a._trigger("out", t, a._uiHash(a)), a._mouseStop(t, !0), a.options.revert = a.options._revert, a.options.helper = a.options._helper, a.placeholder && a.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(t), i.position = s._generatePosition(t, !0), s._trigger("fromSortable", t), s.dropped = !1, e.each(s.sortables, function() {
					this.refreshPositions()
				}))
			})
		}
	}), e.ui.plugin.add("draggable", "cursor", {
		start: function(t, i, s) {
			var n = e("body"),
				a = s.options;
			n.css("cursor") && (a._cursor = n.css("cursor")), n.css("cursor", a.cursor)
		},
		stop: function(t, i, s) {
			var n = s.options;
			n._cursor && e("body").css("cursor", n._cursor)
		}
	}), e.ui.plugin.add("draggable", "opacity", {
		start: function(t, i, s) {
			var n = e(i.helper),
				a = s.options;
			n.css("opacity") && (a._opacity = n.css("opacity")), n.css("opacity", a.opacity)
		},
		stop: function(t, i, s) {
			var n = s.options;
			n._opacity && e(i.helper).css("opacity", n._opacity)
		}
	}), e.ui.plugin.add("draggable", "scroll", {
		start: function(e, t, i) {
			i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
		},
		drag: function(t, i, s) {
			var n = s.options,
				a = !1,
				o = s.scrollParentNotHidden[0],
				r = s.document[0];
			o !== r && "HTML" !== o.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + o.offsetHeight - t.pageY < n.scrollSensitivity ? o.scrollTop = a = o.scrollTop + n.scrollSpeed : t.pageY - s.overflowOffset.top < n.scrollSensitivity && (o.scrollTop = a = o.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + o.offsetWidth - t.pageX < n.scrollSensitivity ? o.scrollLeft = a = o.scrollLeft + n.scrollSpeed : t.pageX - s.overflowOffset.left < n.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (t.pageY - e(r).scrollTop() < n.scrollSensitivity ? a = e(r).scrollTop(e(r).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(r).scrollTop()) < n.scrollSensitivity && (a = e(r).scrollTop(e(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (t.pageX - e(r).scrollLeft() < n.scrollSensitivity ? a = e(r).scrollLeft(e(r).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(r).scrollLeft()) < n.scrollSensitivity && (a = e(r).scrollLeft(e(r).scrollLeft() + n.scrollSpeed)))), a !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t)
		}
	}), e.ui.plugin.add("draggable", "snap", {
		start: function(t, i, s) {
			var n = s.options;
			s.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
				var t = e(this),
					i = t.offset();
				this !== s.element[0] && s.snapElements.push({
					item: this,
					width: t.outerWidth(),
					height: t.outerHeight(),
					top: i.top,
					left: i.left
				})
			})
		},
		drag: function(t, i, s) {
			var n, a, o, r, h, l, u, d, c, p, f = s.options,
				m = f.snapTolerance,
				g = i.offset.left,
				v = g + s.helperProportions.width,
				y = i.offset.top,
				b = y + s.helperProportions.height;
			for(c = s.snapElements.length - 1; c >= 0; c--) h = s.snapElements[c].left - s.margins.left, l = h + s.snapElements[c].width, u = s.snapElements[c].top - s.margins.top, d = u + s.snapElements[c].height, h - m > v || g > l + m || u - m > b || y > d + m || !e.contains(s.snapElements[c].item.ownerDocument, s.snapElements[c].item) ? (s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), {
				snapItem: s.snapElements[c].item
			})), s.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (n = m >= Math.abs(u - b), a = m >= Math.abs(d - y), o = m >= Math.abs(h - v), r = m >= Math.abs(l - g), n && (i.position.top = s._convertPositionTo("relative", {
				top: u - s.helperProportions.height,
				left: 0
			}).top), a && (i.position.top = s._convertPositionTo("relative", {
				top: d,
				left: 0
			}).top), o && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: h - s.helperProportions.width
			}).left), r && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: l
			}).left)), p = n || a || o || r, "outer" !== f.snapMode && (n = m >= Math.abs(u - y), a = m >= Math.abs(d - b), o = m >= Math.abs(h - g), r = m >= Math.abs(l - v), n && (i.position.top = s._convertPositionTo("relative", {
				top: u,
				left: 0
			}).top), a && (i.position.top = s._convertPositionTo("relative", {
				top: d - s.helperProportions.height,
				left: 0
			}).top), o && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: h
			}).left), r && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: l - s.helperProportions.width
			}).left)), !s.snapElements[c].snapping && (n || a || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), {
				snapItem: s.snapElements[c].item
			})), s.snapElements[c].snapping = n || a || o || r || p)
		}
	}), e.ui.plugin.add("draggable", "stack", {
		start: function(t, i, s) {
			var n, a = s.options,
				o = e.makeArray(e(a.stack)).sort(function(t, i) {
					return(parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
				});
			o.length && (n = parseInt(e(o[0]).css("zIndex"), 10) || 0, e(o).each(function(t) {
				e(this).css("zIndex", n + t)
			}), this.css("zIndex", n + o.length))
		}
	}), e.ui.plugin.add("draggable", "zIndex", {
		start: function(t, i, s) {
			var n = e(i.helper),
				a = s.options;
			n.css("zIndex") && (a._zIndex = n.css("zIndex")), n.css("zIndex", a.zIndex)
		},
		stop: function(t, i, s) {
			var n = s.options;
			n._zIndex && e(i.helper).css("zIndex", n._zIndex)
		}
	}), e.ui.draggable, e.widget("ui.droppable", {
		version: "1.11.4",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: !1,
			addClasses: !0,
			greedy: !1,
			hoverClass: !1,
			scope: "default",
			tolerance: "intersect",
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {
			var t, i = this.options,
				s = i.accept;
			this.isover = !1, this.isout = !0, this.accept = e.isFunction(s) ? s : function(e) {
				return e.is(s)
			}, this.proportions = function() {
				return arguments.length ? (t = arguments[0], void 0) : t ? t : t = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				}
			}, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable")
		},
		_addToManager: function(t) {
			e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [], e.ui.ddmanager.droppables[t].push(this)
		},
		_splice: function(e) {
			for(var t = 0; e.length > t; t++) e[t] === this && e.splice(t, 1)
		},
		_destroy: function() {
			var t = e.ui.ddmanager.droppables[this.options.scope];
			this._splice(t), this.element.removeClass("ui-droppable ui-droppable-disabled")
		},
		_setOption: function(t, i) {
			if("accept" === t) this.accept = e.isFunction(i) ? i : function(e) {
				return e.is(i)
			};
			else if("scope" === t) {
				var s = e.ui.ddmanager.droppables[this.options.scope];
				this._splice(s), this._addToManager(i)
			}
			this._super(t, i)
		},
		_activate: function(t) {
			var i = e.ui.ddmanager.current;
			this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i))
		},
		_deactivate: function(t) {
			var i = e.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i))
		},
		_over: function(t) {
			var i = e.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
		},
		_out: function(t) {
			var i = e.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
		},
		_drop: function(t, i) {
			var s = i || e.ui.ddmanager.current,
				n = !1;
			return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
				var i = e(this).droppable("instance");
				return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(i, {
					offset: i.element.offset()
				}), i.options.tolerance, t) ? (n = !0, !1) : void 0
			}), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(s)), this.element) : !1) : !1
		},
		ui: function(e) {
			return {
				draggable: e.currentItem || e.element,
				helper: e.helper,
				position: e.position,
				offset: e.positionAbs
			}
		}
	}), e.ui.intersect = function() {
		function e(e, t, i) {
			return e >= t && t + i > e
		}
		return function(t, i, s, n) {
			if(!i.offset) return !1;
			var a = (t.positionAbs || t.position.absolute).left + t.margins.left,
				o = (t.positionAbs || t.position.absolute).top + t.margins.top,
				r = a + t.helperProportions.width,
				h = o + t.helperProportions.height,
				l = i.offset.left,
				u = i.offset.top,
				d = l + i.proportions().width,
				c = u + i.proportions().height;
			switch(s) {
				case "fit":
					return a >= l && d >= r && o >= u && c >= h;
				case "intersect":
					return a + t.helperProportions.width / 2 > l && d > r - t.helperProportions.width / 2 && o + t.helperProportions.height / 2 > u && c > h - t.helperProportions.height / 2;
				case "pointer":
					return e(n.pageY, u, i.proportions().height) && e(n.pageX, l, i.proportions().width);
				case "touch":
					return(o >= u && c >= o || h >= u && c >= h || u > o && h > c) && (a >= l && d >= a || r >= l && d >= r || l > a && r > d);
				default:
					return !1
			}
		}
	}(), e.ui.ddmanager = {
		current: null,
		droppables: {
			"default": []
		},
		prepareOffsets: function(t, i) {
			var s, n, a = e.ui.ddmanager.droppables[t.options.scope] || [],
				o = i ? i.type : null,
				r = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
			e: for(s = 0; a.length > s; s++)
				if(!(a[s].options.disabled || t && !a[s].accept.call(a[s].element[0], t.currentItem || t.element))) {
					for(n = 0; r.length > n; n++)
						if(r[n] === a[s].element[0]) {
							a[s].proportions().height = 0;
							continue e
						}
					a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions({
						width: a[s].element[0].offsetWidth,
						height: a[s].element[0].offsetHeight
					}))
				}
		},
		drop: function(t, i) {
			var s = !1;
			return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
				this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
			}), s
		},
		dragStart: function(t, i) {
			t.element.parentsUntil("body").bind("scroll.droppable", function() {
				t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
			})
		},
		drag: function(t, i) {
			t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
				if(!this.options.disabled && !this.greedyChild && this.visible) {
					var s, n, a, o = e.ui.intersect(t, this, this.options.tolerance, i),
						r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
					r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function() {
						return e(this).droppable("instance").options.scope === n
					}), a.length && (s = e(a[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
				}
			})
		},
		dragStop: function(t, i) {
			t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
		}
	}, e.ui.droppable, e.widget("ui.resizable", e.ui.mouse, {
		version: "1.11.4",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_num: function(e) {
			return parseInt(e, 10) || 0
		},
		_isNumber: function(e) {
			return !isNaN(parseInt(e, 10))
		},
		_hasScroll: function(t, i) {
			if("hidden" === e(t).css("overflow")) return !1;
			var s = i && "left" === i ? "scrollLeft" : "scrollTop",
				n = !1;
			return t[s] > 0 ? !0 : (t[s] = 1, n = t[s] > 0, t[s] = 0, n)
		},
		_create: function() {
			var t, i, s, n, a, o = this,
				r = this.options;
			if(this.element.addClass("ui-resizable"), e.extend(this, {
					_aspectRatio: !!r.aspectRatio,
					aspectRatio: r.aspectRatio,
					originalElement: this.element,
					_proportionallyResizeElements: [],
					_helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
				}), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
					marginLeft: this.originalElement.css("marginLeft"),
					marginTop: this.originalElement.css("marginTop"),
					marginRight: this.originalElement.css("marginRight"),
					marginBottom: this.originalElement.css("marginBottom")
				}), this.originalElement.css({
					marginLeft: 0,
					marginTop: 0,
					marginRight: 0,
					marginBottom: 0
				}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
					position: "static",
					zoom: 1,
					display: "block"
				})), this.originalElement.css({
					margin: this.originalElement.css("margin")
				}), this._proportionallyResize()), this.handles = r.handles || (e(".ui-resizable-handle", this.element).length ? {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} : "e,s,se"), this._handles = e(), this.handles.constructor === String)
				for("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, i = 0; t.length > i; i++) s = e.trim(t[i]), a = "ui-resizable-" + s, n = e("<div class='ui-resizable-handle " + a + "'></div>"), n.css({
					zIndex: r.zIndex
				}), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
			this._renderAxis = function(t) {
				var i, s, n, a;
				t = t || this.element;
				for(i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = e(this.handles[i]), this._on(this.handles[i], {
					mousedown: o._mouseDown
				})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = e(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(n, a), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
			}, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function() {
				o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : "se")
			}), r.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
				r.disabled || (e(this).removeClass("ui-resizable-autohide"), o._handles.show())
			}).mouseleave(function() {
				r.disabled || o.resizing || (e(this).addClass("ui-resizable-autohide"), o._handles.hide())
			})), this._mouseInit()
		},
		_destroy: function() {
			this._mouseDestroy();
			var t, i = function(t) {
				e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
				position: t.css("position"),
				width: t.outerWidth(),
				height: t.outerHeight(),
				top: t.css("top"),
				left: t.css("left")
			}).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
		},
		_mouseCapture: function(t) {
			var i, s, n = !1;
			for(i in this.handles) s = e(this.handles[i])[0], (s === t.target || e.contains(s, t.target)) && (n = !0);
			return !this.options.disabled && n
		},
		_mouseStart: function(t) {
			var i, s, n, a = this.options,
				o = this.element;
			return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), a.containment && (i += e(a.containment).scrollLeft() || 0, s += e(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: i,
				top: s
			}, this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: o.width(),
				height: o.height()
			}, this.originalSize = this._helper ? {
				width: o.outerWidth(),
				height: o.outerHeight()
			} : {
				width: o.width(),
				height: o.height()
			}, this.sizeDiff = {
				width: o.outerWidth() - o.width(),
				height: o.outerHeight() - o.height()
			}, this.originalPosition = {
				left: i,
				top: s
			}, this.originalMousePosition = {
				left: t.pageX,
				top: t.pageY
			}, this.aspectRatio = "number" == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), o.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
		},
		_mouseDrag: function(t) {
			var i, s, n = this.originalMousePosition,
				a = this.axis,
				o = t.pageX - n.left || 0,
				r = t.pageY - n.top || 0,
				h = this._change[a];
			return this._updatePrevProperties(), h ? (i = h.apply(this, [t, o, r]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1) : !1
		},
		_mouseStop: function(t) {
			this.resizing = !1;
			var i, s, n, a, o, r, h, l = this.options,
				u = this;
			return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, a = s ? 0 : u.sizeDiff.width, o = {
				width: u.helper.width() - a,
				height: u.helper.height() - n
			}, r = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, l.animate || this.element.css(e.extend(o, {
				top: h,
				left: r
			})), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !l.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
		},
		_updatePrevProperties: function() {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			}, this.prevSize = {
				width: this.size.width,
				height: this.size.height
			}
		},
		_applyChanges: function() {
			var e = {};
			return this.position.top !== this.prevPosition.top && (e.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (e.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (e.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (e.height = this.size.height + "px"), this.helper.css(e), e
		},
		_updateVirtualBoundaries: function(e) {
			var t, i, s, n, a, o = this.options;
			a = {
				minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
				maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
				minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
				maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
			}, (this._aspectRatio || e) && (t = a.minHeight * this.aspectRatio, s = a.minWidth / this.aspectRatio, i = a.maxHeight * this.aspectRatio, n = a.maxWidth / this.aspectRatio, t > a.minWidth && (a.minWidth = t), s > a.minHeight && (a.minHeight = s), a.maxWidth > i && (a.maxWidth = i), a.maxHeight > n && (a.maxHeight = n)), this._vBoundaries = a
		},
		_updateCache: function(e) {
			this.offset = this.helper.offset(), this._isNumber(e.left) && (this.position.left = e.left), this._isNumber(e.top) && (this.position.top = e.top), this._isNumber(e.height) && (this.size.height = e.height), this._isNumber(e.width) && (this.size.width = e.width)
		},
		_updateRatio: function(e) {
			var t = this.position,
				i = this.size,
				s = this.axis;
			return this._isNumber(e.height) ? e.width = e.height * this.aspectRatio : this._isNumber(e.width) && (e.height = e.width / this.aspectRatio), "sw" === s && (e.left = t.left + (i.width - e.width), e.top = null), "nw" === s && (e.top = t.top + (i.height - e.height), e.left = t.left + (i.width - e.width)), e
		},
		_respectSize: function(e) {
			var t = this._vBoundaries,
				i = this.axis,
				s = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width,
				n = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height,
				a = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width,
				o = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height,
				r = this.originalPosition.left + this.originalSize.width,
				h = this.position.top + this.size.height,
				l = /sw|nw|w/.test(i),
				u = /nw|ne|n/.test(i);
			return a && (e.width = t.minWidth), o && (e.height = t.minHeight), s && (e.width = t.maxWidth), n && (e.height = t.maxHeight), a && l && (e.left = r - t.minWidth), s && l && (e.left = r - t.maxWidth), o && u && (e.top = h - t.minHeight), n && u && (e.top = h - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e
		},
		_getPaddingPlusBorderDimensions: function(e) {
			for(var t = 0, i = [], s = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], n = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")]; 4 > t; t++) i[t] = parseInt(s[t], 10) || 0, i[t] += parseInt(n[t], 10) || 0;
			return {
				height: i[0] + i[2],
				width: i[1] + i[3]
			}
		},
		_proportionallyResize: function() {
			if(this._proportionallyResizeElements.length)
				for(var e, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) e = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(e)), e.css({
					height: i.height() - this.outerDimensions.height || 0,
					width: i.width() - this.outerDimensions.width || 0
				})
		},
		_renderProxy: function() {
			var t = this.element,
				i = this.options;
			this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++i.zIndex
			}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
		},
		_change: {
			e: function(e, t) {
				return {
					width: this.originalSize.width + t
				}
			},
			w: function(e, t) {
				var i = this.originalSize,
					s = this.originalPosition;
				return {
					left: s.left + t,
					width: i.width - t
				}
			},
			n: function(e, t, i) {
				var s = this.originalSize,
					n = this.originalPosition;
				return {
					top: n.top + i,
					height: s.height - i
				}
			},
			s: function(e, t, i) {
				return {
					height: this.originalSize.height + i
				}
			},
			se: function(t, i, s) {
				return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
			},
			sw: function(t, i, s) {
				return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
			},
			ne: function(t, i, s) {
				return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
			},
			nw: function(t, i, s) {
				return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
			}
		},
		_propagate: function(t, i) {
			e.ui.plugin.call(this, t, [i, this.ui()]), "resize" !== t && this._trigger(t, i, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), e.ui.plugin.add("resizable", "animate", {
		stop: function(t) {
			var i = e(this).resizable("instance"),
				s = i.options,
				n = i._proportionallyResizeElements,
				a = n.length && /textarea/i.test(n[0].nodeName),
				o = a && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
				r = a ? 0 : i.sizeDiff.width,
				h = {
					width: i.size.width - r,
					height: i.size.height - o
				},
				l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
				u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
			i.element.animate(e.extend(h, u && l ? {
				top: u,
				left: l
			} : {}), {
				duration: s.animateDuration,
				easing: s.animateEasing,
				step: function() {
					var s = {
						width: parseInt(i.element.css("width"), 10),
						height: parseInt(i.element.css("height"), 10),
						top: parseInt(i.element.css("top"), 10),
						left: parseInt(i.element.css("left"), 10)
					};
					n && n.length && e(n[0]).css({
						width: s.width,
						height: s.height
					}), i._updateCache(s), i._propagate("resize", t)
				}
			})
		}
	}), e.ui.plugin.add("resizable", "containment", {
		start: function() {
			var t, i, s, n, a, o, r, h = e(this).resizable("instance"),
				l = h.options,
				u = h.element,
				d = l.containment,
				c = d instanceof e ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
			c && (h.containerElement = e(c), /document/.test(d) || d === document ? (h.containerOffset = {
				left: 0,
				top: 0
			}, h.containerPosition = {
				left: 0,
				top: 0
			}, h.parentData = {
				element: e(document),
				left: 0,
				top: 0,
				width: e(document).width(),
				height: e(document).height() || document.body.parentNode.scrollHeight
			}) : (t = e(c), i = [], e(["Top", "Right", "Left", "Bottom"]).each(function(e, s) {
				i[e] = h._num(t.css("padding" + s))
			}), h.containerOffset = t.offset(), h.containerPosition = t.position(), h.containerSize = {
				height: t.innerHeight() - i[3],
				width: t.innerWidth() - i[1]
			}, s = h.containerOffset, n = h.containerSize.height, a = h.containerSize.width, o = h._hasScroll(c, "left") ? c.scrollWidth : a, r = h._hasScroll(c) ? c.scrollHeight : n, h.parentData = {
				element: c,
				left: s.left,
				top: s.top,
				width: o,
				height: r
			}))
		},
		resize: function(t) {
			var i, s, n, a, o = e(this).resizable("instance"),
				r = o.options,
				h = o.containerOffset,
				l = o.position,
				u = o._aspectRatio || t.shiftKey,
				d = {
					top: 0,
					left: 0
				},
				c = o.containerElement,
				p = !0;
			c[0] !== document && /static/.test(c.css("position")) && (d = h), l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - d.left), u && (o.size.height = o.size.width / o.aspectRatio, p = !1), o.position.left = r.helper ? h.left : 0), l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), u && (o.size.width = o.size.height * o.aspectRatio, p = !1), o.position.top = o._helper ? h.top : 0), n = o.containerElement.get(0) === o.element.parent().get(0), a = /relative|absolute/.test(o.containerElement.css("position")), n && a ? (o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top) : (o.offset.left = o.element.offset().left, o.offset.top = o.element.offset().top), i = Math.abs(o.sizeDiff.width + (o._helper ? o.offset.left - d.left : o.offset.left - h.left)), s = Math.abs(o.sizeDiff.height + (o._helper ? o.offset.top - d.top : o.offset.top - h.top)), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, u && (o.size.height = o.size.width / o.aspectRatio, p = !1)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, u && (o.size.width = o.size.height * o.aspectRatio, p = !1)), p || (o.position.left = o.prevPosition.left, o.position.top = o.prevPosition.top, o.size.width = o.prevSize.width, o.size.height = o.prevSize.height)
		},
		stop: function() {
			var t = e(this).resizable("instance"),
				i = t.options,
				s = t.containerOffset,
				n = t.containerPosition,
				a = t.containerElement,
				o = e(t.helper),
				r = o.offset(),
				h = o.outerWidth() - t.sizeDiff.width,
				l = o.outerHeight() - t.sizeDiff.height;
			t._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({
				left: r.left - n.left - s.left,
				width: h,
				height: l
			}), t._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({
				left: r.left - n.left - s.left,
				width: h,
				height: l
			})
		}
	}), e.ui.plugin.add("resizable", "alsoResize", {
		start: function() {
			var t = e(this).resizable("instance"),
				i = t.options;
			e(i.alsoResize).each(function() {
				var t = e(this);
				t.data("ui-resizable-alsoresize", {
					width: parseInt(t.width(), 10),
					height: parseInt(t.height(), 10),
					left: parseInt(t.css("left"), 10),
					top: parseInt(t.css("top"), 10)
				})
			})
		},
		resize: function(t, i) {
			var s = e(this).resizable("instance"),
				n = s.options,
				a = s.originalSize,
				o = s.originalPosition,
				r = {
					height: s.size.height - a.height || 0,
					width: s.size.width - a.width || 0,
					top: s.position.top - o.top || 0,
					left: s.position.left - o.left || 0
				};
			e(n.alsoResize).each(function() {
				var t = e(this),
					s = e(this).data("ui-resizable-alsoresize"),
					n = {},
					a = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
				e.each(a, function(e, t) {
					var i = (s[t] || 0) + (r[t] || 0);
					i && i >= 0 && (n[t] = i || null)
				}), t.css(n)
			})
		},
		stop: function() {
			e(this).removeData("resizable-alsoresize")
		}
	}), e.ui.plugin.add("resizable", "ghost", {
		start: function() {
			var t = e(this).resizable("instance"),
				i = t.options,
				s = t.size;
			t.ghost = t.originalElement.clone(), t.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: s.height,
				width: s.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), t.ghost.appendTo(t.helper)
		},
		resize: function() {
			var t = e(this).resizable("instance");
			t.ghost && t.ghost.css({
				position: "relative",
				height: t.size.height,
				width: t.size.width
			})
		},
		stop: function() {
			var t = e(this).resizable("instance");
			t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
		}
	}), e.ui.plugin.add("resizable", "grid", {
		resize: function() {
			var t, i = e(this).resizable("instance"),
				s = i.options,
				n = i.size,
				a = i.originalSize,
				o = i.originalPosition,
				r = i.axis,
				h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
				l = h[0] || 1,
				u = h[1] || 1,
				d = Math.round((n.width - a.width) / l) * l,
				c = Math.round((n.height - a.height) / u) * u,
				p = a.width + d,
				f = a.height + c,
				m = s.maxWidth && p > s.maxWidth,
				g = s.maxHeight && f > s.maxHeight,
				v = s.minWidth && s.minWidth > p,
				y = s.minHeight && s.minHeight > f;
			s.grid = h, v && (p += l), y && (f += u), m && (p -= l), g && (f -= u), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = o.top - c) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = o.left - d) : ((0 >= f - u || 0 >= p - l) && (t = i._getPaddingPlusBorderDimensions(this)), f - u > 0 ? (i.size.height = f, i.position.top = o.top - c) : (f = u - t.height, i.size.height = f, i.position.top = o.top + a.height - f), p - l > 0 ? (i.size.width = p, i.position.left = o.left - d) : (p = l - t.width, i.size.width = p, i.position.left = o.left + a.width - p))
		}
	}), e.ui.resizable, e.widget("ui.selectable", e.ui.mouse, {
		version: "1.11.4",
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch",
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function() {
			var t, i = this;
			this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
				t = e(i.options.filter, i.element[0]), t.addClass("ui-selectee"), t.each(function() {
					var t = e(this),
						i = t.offset();
					e.data(this, "selectable-item", {
						element: this,
						$element: t,
						left: i.left,
						top: i.top,
						right: i.left + t.outerWidth(),
						bottom: i.top + t.outerHeight(),
						startselected: !1,
						selected: t.hasClass("ui-selected"),
						selecting: t.hasClass("ui-selecting"),
						unselecting: t.hasClass("ui-unselecting")
					})
				})
			}, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>")
		},
		_destroy: function() {
			this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
		},
		_mouseStart: function(t) {
			var i = this,
				s = this.options;
			this.opos = [t.pageX, t.pageY], this.options.disabled || (this.selectees = e(s.filter, this.element[0]), this._trigger("start", t), e(s.appendTo).append(this.helper), this.helper.css({
				left: t.pageX,
				top: t.pageY,
				width: 0,
				height: 0
			}), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
				var s = e.data(this, "selectable-item");
				s.startselected = !0, t.metaKey || t.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", t, {
					unselecting: s.element
				}))
			}), e(t.target).parents().addBack().each(function() {
				var s, n = e.data(this, "selectable-item");
				return n ? (s = !t.metaKey && !t.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", t, {
					selecting: n.element
				}) : i._trigger("unselecting", t, {
					unselecting: n.element
				}), !1) : void 0
			}))
		},
		_mouseDrag: function(t) {
			if(this.dragged = !0, !this.options.disabled) {
				var i, s = this,
					n = this.options,
					a = this.opos[0],
					o = this.opos[1],
					r = t.pageX,
					h = t.pageY;
				return a > r && (i = r, r = a, a = i), o > h && (i = h, h = o, o = i), this.helper.css({
					left: a,
					top: o,
					width: r - a,
					height: h - o
				}), this.selectees.each(function() {
					var i = e.data(this, "selectable-item"),
						l = !1;
					i && i.element !== s.element[0] && ("touch" === n.tolerance ? l = !(i.left > r || a > i.right || i.top > h || o > i.bottom) : "fit" === n.tolerance && (l = i.left > a && r > i.right && i.top > o && h > i.bottom), l ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", t, {
						selecting: i.element
					}))) : (i.selecting && ((t.metaKey || t.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", t, {
						unselecting: i.element
					}))), i.selected && (t.metaKey || t.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", t, {
						unselecting: i.element
					})))))
				}), !1
			}
		},
		_mouseStop: function(t) {
			var i = this;
			return this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function() {
				var s = e.data(this, "selectable-item");
				s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", t, {
					unselected: s.element
				})
			}), e(".ui-selecting", this.element[0]).each(function() {
				var s = e.data(this, "selectable-item");
				s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", t, {
					selected: s.element
				})
			}), this._trigger("stop", t), this.helper.remove(), !1
		}
	});
	var d = "ui-effects-",
		c = e;
	e.effects = {
			effect: {}
		},
		function(e, t) {
			function i(e, t, i) {
				var s = d[t.type] || {};
				return null == e ? i || !t.def ? null : t.def : (e = s.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : s.mod ? (e + s.mod) % s.mod : 0 > e ? 0 : e > s.max ? s.max : e)
			}
			function s(i) {
				var s = l(),
					n = s._rgba = [];
				return i = i.toLowerCase(), f(h, function(e, a) {
					var o, r = a.re.exec(i),
						h = r && a.parse(r),
						l = a.space || "rgba";
					return h ? (o = s[l](h), s[u[l].cache] = o[u[l].cache], n = s._rgba = o._rgba, !1) : t
				}), n.length ? ("0,0,0,0" === n.join() && e.extend(n, a.transparent), s) : a[i]
			}
			function n(e, t, i) {
				return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
			}
			var a, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
				r = /^([\-+])=\s*(\d+\.?\d*)/,
				h = [{
					re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function(e) {
						return [e[1], e[2], e[3], e[4]]
					}
				}, {
					re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function(e) {
						return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
					}
				}, {
					re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
					parse: function(e) {
						return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
					}
				}, {
					re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
					parse: function(e) {
						return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
					}
				}, {
					re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					space: "hsla",
					parse: function(e) {
						return [e[1], e[2] / 100, e[3] / 100, e[4]]
					}
				}],
				l = e.Color = function(t, i, s, n) {
					return new e.Color.fn.parse(t, i, s, n)
				},
				u = {
					rgba: {
						props: {
							red: {
								idx: 0,
								type: "byte"
							},
							green: {
								idx: 1,
								type: "byte"
							},
							blue: {
								idx: 2,
								type: "byte"
							}
						}
					},
					hsla: {
						props: {
							hue: {
								idx: 0,
								type: "degrees"
							},
							saturation: {
								idx: 1,
								type: "percent"
							},
							lightness: {
								idx: 2,
								type: "percent"
							}
						}
					}
				},
				d = {
					"byte": {
						floor: !0,
						max: 255
					},
					percent: {
						max: 1
					},
					degrees: {
						mod: 360,
						floor: !0
					}
				},
				c = l.support = {},
				p = e("<p>")[0],
				f = e.each;
			p.style.cssText = "background-color:rgba(1,1,1,.5)", c.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(e, t) {
				t.cache = "_" + e, t.props.alpha = {
					idx: 3,
					type: "percent",
					def: 1
				}
			}), l.fn = e.extend(l.prototype, {
				parse: function(n, o, r, h) {
					if(n === t) return this._rgba = [null, null, null, null], this;
					(n.jquery || n.nodeType) && (n = e(n).css(o), o = t);
					var d = this,
						c = e.type(n),
						p = this._rgba = [];
					return o !== t && (n = [n, o, r, h], c = "array"), "string" === c ? this.parse(s(n) || a._default) : "array" === c ? (f(u.rgba.props, function(e, t) {
						p[t.idx] = i(n[t.idx], t)
					}), this) : "object" === c ? (n instanceof l ? f(u, function(e, t) {
						n[t.cache] && (d[t.cache] = n[t.cache].slice())
					}) : f(u, function(t, s) {
						var a = s.cache;
						f(s.props, function(e, t) {
							if(!d[a] && s.to) {
								if("alpha" === e || null == n[e]) return;
								d[a] = s.to(d._rgba)
							}
							d[a][t.idx] = i(n[e], t, !0)
						}), d[a] && 0 > e.inArray(null, d[a].slice(0, 3)) && (d[a][3] = 1, s.from && (d._rgba = s.from(d[a])))
					}), this) : t
				},
				is: function(e) {
					var i = l(e),
						s = !0,
						n = this;
					return f(u, function(e, a) {
						var o, r = i[a.cache];
						return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function(e, i) {
							return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : t
						})), s
					}), s
				},
				_space: function() {
					var e = [],
						t = this;
					return f(u, function(i, s) {
						t[s.cache] && e.push(i)
					}), e.pop()
				},
				transition: function(e, t) {
					var s = l(e),
						n = s._space(),
						a = u[n],
						o = 0 === this.alpha() ? l("transparent") : this,
						r = o[a.cache] || a.to(o._rgba),
						h = r.slice();
					return s = s[a.cache], f(a.props, function(e, n) {
						var a = n.idx,
							o = r[a],
							l = s[a],
							u = d[n.type] || {};
						null !== l && (null === o ? h[a] = l : (u.mod && (l - o > u.mod / 2 ? o += u.mod : o - l > u.mod / 2 && (o -= u.mod)), h[a] = i((l - o) * t + o, n)))
					}), this[n](h)
				},
				blend: function(t) {
					if(1 === this._rgba[3]) return this;
					var i = this._rgba.slice(),
						s = i.pop(),
						n = l(t)._rgba;
					return l(e.map(i, function(e, t) {
						return(1 - s) * n[t] + s * e
					}))
				},
				toRgbaString: function() {
					var t = "rgba(",
						i = e.map(this._rgba, function(e, t) {
							return null == e ? t > 2 ? 1 : 0 : e
						});
					return 1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")"
				},
				toHslaString: function() {
					var t = "hsla(",
						i = e.map(this.hsla(), function(e, t) {
							return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
						});
					return 1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")"
				},
				toHexString: function(t) {
					var i = this._rgba.slice(),
						s = i.pop();
					return t && i.push(~~(255 * s)), "#" + e.map(i, function(e) {
						return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
					}).join("")
				},
				toString: function() {
					return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
				}
			}), l.fn.parse.prototype = l.fn, u.hsla.to = function(e) {
				if(null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
				var t, i, s = e[0] / 255,
					n = e[1] / 255,
					a = e[2] / 255,
					o = e[3],
					r = Math.max(s, n, a),
					h = Math.min(s, n, a),
					l = r - h,
					u = r + h,
					d = .5 * u;
				return t = h === r ? 0 : s === r ? 60 * (n - a) / l + 360 : n === r ? 60 * (a - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= d ? l / u : l / (2 - u), [Math.round(t) % 360, i, d, null == o ? 1 : o]
			}, u.hsla.from = function(e) {
				if(null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
				var t = e[0] / 360,
					i = e[1],
					s = e[2],
					a = e[3],
					o = .5 >= s ? s * (1 + i) : s + i - s * i,
					r = 2 * s - o;
				return [Math.round(255 * n(r, o, t + 1 / 3)), Math.round(255 * n(r, o, t)), Math.round(255 * n(r, o, t - 1 / 3)), a]
			}, f(u, function(s, n) {
				var a = n.props,
					o = n.cache,
					h = n.to,
					u = n.from;
				l.fn[s] = function(s) {
					if(h && !this[o] && (this[o] = h(this._rgba)), s === t) return this[o].slice();
					var n, r = e.type(s),
						d = "array" === r || "object" === r ? s : arguments,
						c = this[o].slice();
					return f(a, function(e, t) {
						var s = d["object" === r ? e : t.idx];
						null == s && (s = c[t.idx]), c[t.idx] = i(s, t)
					}), u ? (n = l(u(c)), n[o] = c, n) : l(c)
				}, f(a, function(t, i) {
					l.fn[t] || (l.fn[t] = function(n) {
						var a, o = e.type(n),
							h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : s,
							l = this[h](),
							u = l[i.idx];
						return "undefined" === o ? u : ("function" === o && (n = n.call(this, u), o = e.type(n)), null == n && i.empty ? this : ("string" === o && (a = r.exec(n), a && (n = u + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
					})
				})
			}), l.hook = function(t) {
				var i = t.split(" ");
				f(i, function(t, i) {
					e.cssHooks[i] = {
						set: function(t, n) {
							var a, o, r = "";
							if("transparent" !== n && ("string" !== e.type(n) || (a = s(n)))) {
								if(n = l(a || n), !c.rgba && 1 !== n._rgba[3]) {
									for(o = "backgroundColor" === i ? t.parentNode : t;
										("" === r || "transparent" === r) && o && o.style;) try {
										r = e.css(o, "backgroundColor"), o = o.parentNode
									} catch(h) {}
									n = n.blend(r && "transparent" !== r ? r : "_default")
								}
								n = n.toRgbaString()
							}
							try {
								t.style[i] = n
							} catch(h) {}
						}
					}, e.fx.step[i] = function(t) {
						t.colorInit || (t.start = l(t.elem, i), t.end = l(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos))
					}
				})
			}, l.hook(o), e.cssHooks.borderColor = {
				expand: function(e) {
					var t = {};
					return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
						t["border" + s + "Color"] = e
					}), t
				}
			}, a = e.Color.names = {
				aqua: "#00ffff",
				black: "#000000",
				blue: "#0000ff",
				fuchsia: "#ff00ff",
				gray: "#808080",
				green: "#008000",
				lime: "#00ff00",
				maroon: "#800000",
				navy: "#000080",
				olive: "#808000",
				purple: "#800080",
				red: "#ff0000",
				silver: "#c0c0c0",
				teal: "#008080",
				white: "#ffffff",
				yellow: "#ffff00",
				transparent: [null, null, null, 0],
				_default: "#ffffff"
			}
		}(c),
		function() {
			function t(t) {
				var i, s, n = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
					a = {};
				if(n && n.length && n[0] && n[n[0]]) for(s = n.length; s--;) i = n[s], "string" == typeof n[i] && (a[e.camelCase(i)] = n[i]);
				else for(i in n) "string" == typeof n[i] && (a[i] = n[i]);
				return a
			}
			function i(t, i) {
				var s, a, o = {};
				for(s in i) a = i[s], t[s] !== a && (n[s] || (e.fx.step[s] || !isNaN(parseFloat(a))) && (o[s] = a));
				return o
			}
			var s = ["add", "remove", "toggle"],
				n = {
					border: 1,
					borderBottom: 1,
					borderColor: 1,
					borderLeft: 1,
					borderRight: 1,
					borderTop: 1,
					borderWidth: 1,
					margin: 1,
					padding: 1
				};
			e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
				e.fx.step[i] = function(e) {
					("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (c.style(e.elem, i, e.end), e.setAttr = !0)
				}
			}), e.fn.addBack || (e.fn.addBack = function(e) {
				return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
			}), e.effects.animateClass = function(n, a, o, r) {
				var h = e.speed(a, o, r);
				return this.queue(function() {
					var a, o = e(this),
						r = o.attr("class") || "",
						l = h.children ? o.find("*").addBack() : o;
					l = l.map(function() {
						var i = e(this);
						return {
							el: i,
							start: t(this)
						}
					}), a = function() {
						e.each(s, function(e, t) {
							n[t] && o[t + "Class"](n[t])
						})
					}, a(), l = l.map(function() {
						return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
					}), o.attr("class", r), l = l.map(function() {
						var t = this,
							i = e.Deferred(),
							s = e.extend({}, h, {
								queue: !1,
								complete: function() {
									i.resolve(t)
								}
							});
						return this.el.animate(this.diff, s), i.promise()
					}), e.when.apply(e, l.get()).done(function() {
						a(), e.each(arguments, function() {
							var t = this.el;
							e.each(this.diff, function(e) {
								t.css(e, "")
							})
						}), h.complete.call(o[0])
					})
				})
			}, e.fn.extend({
				addClass: function(t) {
					return function(i, s, n, a) {
						return s ? e.effects.animateClass.call(this, {
							add: i
						}, s, n, a) : t.apply(this, arguments)
					}
				}(e.fn.addClass),
				removeClass: function(t) {
					return function(i, s, n, a) {
						return arguments.length > 1 ? e.effects.animateClass.call(this, {
							remove: i
						}, s, n, a) : t.apply(this, arguments)
					}
				}(e.fn.removeClass),
				toggleClass: function(t) {
					return function(i, s, n, a, o) {
						return "boolean" == typeof s || void 0 === s ? n ? e.effects.animateClass.call(this, s ? {
							add: i
						} : {
							remove: i
						}, n, a, o) : t.apply(this, arguments) : e.effects.animateClass.call(this, {
							toggle: i
						}, s, n, a)
					}
				}(e.fn.toggleClass),
				switchClass: function(t, i, s, n, a) {
					return e.effects.animateClass.call(this, {
						add: i,
						remove: t
					}, s, n, a)
				}
			})
		}(),
		function() {
			function t(t, i, s, n) {
				return e.isPlainObject(t) && (i = t, t = t.effect), t = {
					effect: t
				}, null == i && (i = {}), e.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (n = s, s = i, i = {}), e.isFunction(s) && (n = s, s = null), i && e.extend(t, i), s = s || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof s ? s : s in e.fx.speeds ? e.fx.speeds[s] : e.fx.speeds._default, t.complete = n || i.complete, t
			}
			function i(t) {
				return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
			}
			e.extend(e.effects, {
				version: "1.11.4",
				save: function(e, t) {
					for(var i = 0; t.length > i; i++) null !== t[i] && e.data(d + t[i], e[0].style[t[i]])
				},
				restore: function(e, t) {
					var i, s;
					for(s = 0; t.length > s; s++) null !== t[s] && (i = e.data(d + t[s]), void 0 === i && (i = ""), e.css(t[s], i))
				},
				setMode: function(e, t) {
					return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
				},
				getBaseline: function(e, t) {
					var i, s;
					switch(e[0]) {
						case "top":
							i = 0;
							break;
						case "middle":
							i = .5;
							break;
						case "bottom":
							i = 1;
							break;
						default:
							i = e[0] / t.height
					}
					switch(e[1]) {
						case "left":
							s = 0;
							break;
						case "center":
							s = .5;
							break;
						case "right":
							s = 1;
							break;
						default:
							s = e[1] / t.width
					}
					return {
						x: s,
						y: i
					}
				},
				createWrapper: function(t) {
					if(t.parent().is(".ui-effects-wrapper")) return t.parent();
					var i = {
							width: t.outerWidth(!0),
							height: t.outerHeight(!0),
							"float": t.css("float")
						},
						s = e("<div></div>").addClass("ui-effects-wrapper").css({
							fontSize: "100%",
							background: "transparent",
							border: "none",
							margin: 0,
							padding: 0
						}),
						n = {
							width: t.width(),
							height: t.height()
						},
						a = document.activeElement;
					try {
						a.id
					} catch(o) {
						a = document.body
					}
					return t.wrap(s), (t[0] === a || e.contains(t[0], a)) && e(a).focus(), s = t.parent(), "static" === t.css("position") ? (s.css({
						position: "relative"
					}), t.css({
						position: "relative"
					})) : (e.extend(i, {
						position: t.css("position"),
						zIndex: t.css("z-index")
					}), e.each(["top", "left", "bottom", "right"], function(e, s) {
						i[s] = t.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
					}), t.css({
						position: "relative",
						top: 0,
						left: 0,
						right: "auto",
						bottom: "auto"
					})), t.css(n), s.css(i).show()
				},
				removeWrapper: function(t) {
					var i = document.activeElement;
					return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
				},
				setTransition: function(t, i, s, n) {
					return n = n || {}, e.each(i, function(e, i) {
						var a = t.cssUnit(i);
						a[0] > 0 && (n[i] = a[0] * s + a[1])
					}), n
				}
			}), e.fn.extend({
				effect: function() {
					function i(t) {
						function i() {
							e.isFunction(a) && a.call(n[0]), e.isFunction(t) && t()
						}
						var n = e(this),
							a = s.complete,
							r = s.mode;
						(n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), i()) : o.call(n[0], s, i)
					}
					var s = t.apply(this, arguments),
						n = s.mode,
						a = s.queue,
						o = e.effects.effect[s.effect];
					return e.fx.off || !o ? n ? this[n](s.duration, s.complete) : this.each(function() {
						s.complete && s.complete.call(this)
					}) : a === !1 ? this.each(i) : this.queue(a || "fx", i)
				},
				show: function(e) {
					return function(s) {
						if(i(s)) return e.apply(this, arguments);
						var n = t.apply(this, arguments);
						return n.mode = "show", this.effect.call(this, n)
					}
				}(e.fn.show),
				hide: function(e) {
					return function(s) {
						if(i(s)) return e.apply(this, arguments);
						var n = t.apply(this, arguments);
						return n.mode = "hide", this.effect.call(this, n)
					}
				}(e.fn.hide),
				toggle: function(e) {
					return function(s) {
						if(i(s) || "boolean" == typeof s) return e.apply(this, arguments);
						var n = t.apply(this, arguments);
						return n.mode = "toggle", this.effect.call(this, n)
					}
				}(e.fn.toggle),
				cssUnit: function(t) {
					var i = this.css(t),
						s = [];
					return e.each(["em", "px", "%", "pt"], function(e, t) {
						i.indexOf(t) > 0 && (s = [parseFloat(i), t])
					}), s
				}
			})
		}(),
		function() {
			var t = {};
			e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i) {
				t[i] = function(t) {
					return Math.pow(t, e + 2)
				}
			}), e.extend(t, {
				Sine: function(e) {
					return 1 - Math.cos(e * Math.PI / 2)
				},
				Circ: function(e) {
					return 1 - Math.sqrt(1 - e * e)
				},
				Elastic: function(e) {
					return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
				},
				Back: function(e) {
					return e * e * (3 * e - 2)
				},
				Bounce: function(e) {
					for(var t, i = 4;
						((t = Math.pow(2, --i)) - 1) / 11 > e;);
					return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
				}
			}), e.each(t, function(t, i) {
				e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function(e) {
					return 1 - i(1 - e)
				}, e.easing["easeInOut" + t] = function(e) {
					return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
				}
			})
		}(), e.effects, e.effects.effect.blind = function(t, i) {
			var s, n, a, o = e(this),
				r = /up|down|vertical/,
				h = /up|left|vertical|horizontal/,
				l = ["position", "top", "bottom", "left", "right", "height", "width"],
				u = e.effects.setMode(o, t.mode || "hide"),
				d = t.direction || "up",
				c = r.test(d),
				p = c ? "height" : "width",
				f = c ? "top" : "left",
				m = h.test(d),
				g = {},
				v = "show" === u;
			o.parent().is(".ui-effects-wrapper") ? e.effects.save(o.parent(), l) : e.effects.save(o, l), o.show(), s = e.effects.createWrapper(o).css({
				overflow: "hidden"
			}), n = s[p](), a = parseFloat(s.css(f)) || 0, g[p] = v ? n : 0, m || (o.css(c ? "bottom" : "right", 0).css(c ? "top" : "left", "auto").css({
				position: "absolute"
			}), g[f] = v ? a : n + a), v && (s.css(p, 0), m || s.css(f, a + n)), s.animate(g, {
				duration: t.duration,
				easing: t.easing,
				queue: !1,
				complete: function() {
					"hide" === u && o.hide(), e.effects.restore(o, l), e.effects.removeWrapper(o), i()
				}
			})
		}, e.effects.effect.bounce = function(t, i) {
			var s, n, a, o = e(this),
				r = ["position", "top", "bottom", "left", "right", "height", "width"],
				h = e.effects.setMode(o, t.mode || "effect"),
				l = "hide" === h,
				u = "show" === h,
				d = t.direction || "up",
				c = t.distance,
				p = t.times || 5,
				f = 2 * p + (u || l ? 1 : 0),
				m = t.duration / f,
				g = t.easing,
				v = "up" === d || "down" === d ? "top" : "left",
				y = "up" === d || "left" === d,
				b = o.queue(),
				_ = b.length;
			for((u || l) && r.push("opacity"), e.effects.save(o, r), o.show(), e.effects.createWrapper(o), c || (c = o["top" === v ? "outerHeight" : "outerWidth"]() / 3), u && (a = {
					opacity: 1
				}, a[v] = 0, o.css("opacity", 0).css(v, y ? 2 * -c : 2 * c).animate(a, m, g)), l && (c /= Math.pow(2, p - 1)), a = {}, a[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (y ? "-=" : "+=") + c, o.animate(n, m, g).animate(a, m, g), c = l ? 2 * c : c / 2;
			l && (n = {
				opacity: 0
			}, n[v] = (y ? "-=" : "+=") + c, o.animate(n, m, g)), o.queue(function() {
				l && o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i()
			}), _ > 1 && b.splice.apply(b, [1, 0].concat(b.splice(_, f + 1))), o.dequeue()
		}, e.effects.effect.clip = function(t, i) {
			var s, n, a, o = e(this),
				r = ["position", "top", "bottom", "left", "right", "height", "width"],
				h = e.effects.setMode(o, t.mode || "hide"),
				l = "show" === h,
				u = t.direction || "vertical",
				d = "vertical" === u,
				c = d ? "height" : "width",
				p = d ? "top" : "left",
				f = {};
			e.effects.save(o, r), o.show(), s = e.effects.createWrapper(o).css({
				overflow: "hidden"
			}), n = "IMG" === o[0].tagName ? s : o, a = n[c](), l && (n.css(c, 0), n.css(p, a / 2)), f[c] = l ? a : 0, f[p] = l ? 0 : a / 2, n.animate(f, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function() {
					l || o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i()
				}
			})
		}, e.effects.effect.drop = function(t, i) {
			var s, n = e(this),
				a = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
				o = e.effects.setMode(n, t.mode || "hide"),
				r = "show" === o,
				h = t.direction || "left",
				l = "up" === h || "down" === h ? "top" : "left",
				u = "up" === h || "left" === h ? "pos" : "neg",
				d = {
					opacity: r ? 1 : 0
				};
			e.effects.save(n, a), n.show(), e.effects.createWrapper(n), s = t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === u ? -s : s), d[l] = (r ? "pos" === u ? "+=" : "-=" : "pos" === u ? "-=" : "+=") + s, n.animate(d, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function() {
					"hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
				}
			})
		}, e.effects.effect.explode = function(t, i) {
			function s() {
				b.push(this), b.length === d * c && n()
			}
			function n() {
				p.css({
					visibility: "visible"
				}), e(b).remove(), m || p.hide(), i()
			}
			var a, o, r, h, l, u, d = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
				c = d,
				p = e(this),
				f = e.effects.setMode(p, t.mode || "hide"),
				m = "show" === f,
				g = p.show().css("visibility", "hidden").offset(),
				v = Math.ceil(p.outerWidth() / c),
				y = Math.ceil(p.outerHeight() / d),
				b = [];
			for(a = 0; d > a; a++)
				for(h = g.top + a * y, u = a - (d - 1) / 2, o = 0; c > o; o++) r = g.left + o * v, l = o - (c - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
					position: "absolute",
					visibility: "visible",
					left: -o * v,
					top: -a * y
				}).parent().addClass("ui-effects-explode").css({
					position: "absolute",
					overflow: "hidden",
					width: v,
					height: y,
					left: r + (m ? l * v : 0),
					top: h + (m ? u * y : 0),
					opacity: m ? 0 : 1
				}).animate({
					left: r + (m ? 0 : l * v),
					top: h + (m ? 0 : u * y),
					opacity: m ? 1 : 0
				}, t.duration || 500, t.easing, s)
		}, e.effects.effect.fade = function(t, i) {
			var s = e(this),
				n = e.effects.setMode(s, t.mode || "toggle");
			s.animate({
				opacity: n
			}, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: i
			})
		}, e.effects.effect.fold = function(t, i) {
			var s, n, a = e(this),
				o = ["position", "top", "bottom", "left", "right", "height", "width"],
				r = e.effects.setMode(a, t.mode || "hide"),
				h = "show" === r,
				l = "hide" === r,
				u = t.size || 15,
				d = /([0-9]+)%/.exec(u),
				c = !!t.horizFirst,
				p = h !== c,
				f = p ? ["width", "height"] : ["height", "width"],
				m = t.duration / 2,
				g = {},
				v = {};
			e.effects.save(a, o), a.show(), s = e.effects.createWrapper(a).css({
				overflow: "hidden"
			}), n = p ? [s.width(), s.height()] : [s.height(), s.width()], d && (u = parseInt(d[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(c ? {
				height: 0,
				width: u
			} : {
				height: u,
				width: 0
			}), g[f[0]] = h ? n[0] : u, v[f[1]] = h ? n[1] : 0, s.animate(g, m, t.easing).animate(v, m, t.easing, function() {
				l && a.hide(), e.effects.restore(a, o), e.effects.removeWrapper(a), i()
			})
		}, e.effects.effect.highlight = function(t, i) {
			var s = e(this),
				n = ["backgroundImage", "backgroundColor", "opacity"],
				a = e.effects.setMode(s, t.mode || "show"),
				o = {
					backgroundColor: s.css("backgroundColor")
				};
			"hide" === a && (o.opacity = 0), e.effects.save(s, n), s.show().css({
				backgroundImage: "none",
				backgroundColor: t.color || "#ffff99"
			}).animate(o, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function() {
					"hide" === a && s.hide(), e.effects.restore(s, n), i()
				}
			})
		}, e.effects.effect.size = function(t, i) {
			var s, n, a, o = e(this),
				r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
				h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
				l = ["width", "height", "overflow"],
				u = ["fontSize"],
				d = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
				c = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
				p = e.effects.setMode(o, t.mode || "effect"),
				f = t.restore || "effect" !== p,
				m = t.scale || "both",
				g = t.origin || ["middle", "center"],
				v = o.css("position"),
				y = f ? r : h,
				b = {
					height: 0,
					width: 0,
					outerHeight: 0,
					outerWidth: 0
				};
			"show" === p && o.show(), s = {
				height: o.height(),
				width: o.width(),
				outerHeight: o.outerHeight(),
				outerWidth: o.outerWidth()
			}, "toggle" === t.mode && "show" === p ? (o.from = t.to || b, o.to = t.from || s) : (o.from = t.from || ("show" === p ? b : s), o.to = t.to || ("hide" === p ? b : s)), a = {
				from: {
					y: o.from.height / s.height,
					x: o.from.width / s.width
				},
				to: {
					y: o.to.height / s.height,
					x: o.to.width / s.width
				}
			}, ("box" === m || "both" === m) && (a.from.y !== a.to.y && (y = y.concat(d), o.from = e.effects.setTransition(o, d, a.from.y, o.from), o.to = e.effects.setTransition(o, d, a.to.y, o.to)), a.from.x !== a.to.x && (y = y.concat(c), o.from = e.effects.setTransition(o, c, a.from.x, o.from), o.to = e.effects.setTransition(o, c, a.to.x, o.to))), ("content" === m || "both" === m) && a.from.y !== a.to.y && (y = y.concat(u).concat(l), o.from = e.effects.setTransition(o, u, a.from.y, o.from), o.to = e.effects.setTransition(o, u, a.to.y, o.to)), e.effects.save(o, y), o.show(), e.effects.createWrapper(o), o.css("overflow", "hidden").css(o.from), g && (n = e.effects.getBaseline(g, s), o.from.top = (s.outerHeight - o.outerHeight()) * n.y, o.from.left = (s.outerWidth - o.outerWidth()) * n.x, o.to.top = (s.outerHeight - o.to.outerHeight) * n.y, o.to.left = (s.outerWidth - o.to.outerWidth) * n.x), o.css(o.from), ("content" === m || "both" === m) && (d = d.concat(["marginTop", "marginBottom"]).concat(u), c = c.concat(["marginLeft", "marginRight"]), l = r.concat(d).concat(c), o.find("*[width]").each(function() {
				var i = e(this),
					s = {
						height: i.height(),
						width: i.width(),
						outerHeight: i.outerHeight(),
						outerWidth: i.outerWidth()
					};
				f && e.effects.save(i, l), i.from = {
					height: s.height * a.from.y,
					width: s.width * a.from.x,
					outerHeight: s.outerHeight * a.from.y,
					outerWidth: s.outerWidth * a.from.x
				}, i.to = {
					height: s.height * a.to.y,
					width: s.width * a.to.x,
					outerHeight: s.height * a.to.y,
					outerWidth: s.width * a.to.x
				}, a.from.y !== a.to.y && (i.from = e.effects.setTransition(i, d, a.from.y, i.from), i.to = e.effects.setTransition(i, d, a.to.y, i.to)), a.from.x !== a.to.x && (i.from = e.effects.setTransition(i, c, a.from.x, i.from), i.to = e.effects.setTransition(i, c, a.to.x, i.to)), i.css(i.from), i.animate(i.to, t.duration, t.easing, function() {
					f && e.effects.restore(i, l)
				})
			})), o.animate(o.to, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function() {
					0 === o.to.opacity && o.css("opacity", o.from.opacity), "hide" === p && o.hide(), e.effects.restore(o, y), f || ("static" === v ? o.css({
						position: "relative",
						top: o.to.top,
						left: o.to.left
					}) : e.each(["top", "left"], function(e, t) {
						o.css(t, function(t, i) {
							var s = parseInt(i, 10),
								n = e ? o.to.left : o.to.top;
							return "auto" === i ? n + "px" : s + n + "px"
						})
					})), e.effects.removeWrapper(o), i()
				}
			})
		}, e.effects.effect.scale = function(t, i) {
			var s = e(this),
				n = e.extend(!0, {}, t),
				a = e.effects.setMode(s, t.mode || "effect"),
				o = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === a ? 0 : 100),
				r = t.direction || "both",
				h = t.origin,
				l = {
					height: s.height(),
					width: s.width(),
					outerHeight: s.outerHeight(),
					outerWidth: s.outerWidth()
				},
				u = {
					y: "horizontal" !== r ? o / 100 : 1,
					x: "vertical" !== r ? o / 100 : 1
				};
			n.effect = "size", n.queue = !1, n.complete = i, "effect" !== a && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = t.from || ("show" === a ? {
				height: 0,
				width: 0,
				outerHeight: 0,
				outerWidth: 0
			} : l), n.to = {
				height: l.height * u.y,
				width: l.width * u.x,
				outerHeight: l.outerHeight * u.y,
				outerWidth: l.outerWidth * u.x
			}, n.fade && ("show" === a && (n.from.opacity = 0, n.to.opacity = 1), "hide" === a && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
		}, e.effects.effect.puff = function(t, i) {
			var s = e(this),
				n = e.effects.setMode(s, t.mode || "hide"),
				a = "hide" === n,
				o = parseInt(t.percent, 10) || 150,
				r = o / 100,
				h = {
					height: s.height(),
					width: s.width(),
					outerHeight: s.outerHeight(),
					outerWidth: s.outerWidth()
				};
			e.extend(t, {
				effect: "scale",
				queue: !1,
				fade: !0,
				mode: n,
				complete: i,
				percent: a ? o : 100,
				from: a ? h : {
					height: h.height * r,
					width: h.width * r,
					outerHeight: h.outerHeight * r,
					outerWidth: h.outerWidth * r
				}
			}), s.effect(t)
		}, e.effects.effect.pulsate = function(t, i) {
			var s, n = e(this),
				a = e.effects.setMode(n, t.mode || "show"),
				o = "show" === a,
				r = "hide" === a,
				h = o || "hide" === a,
				l = 2 * (t.times || 5) + (h ? 1 : 0),
				u = t.duration / l,
				d = 0,
				c = n.queue(),
				p = c.length;
			for((o || !n.is(":visible")) && (n.css("opacity", 0).show(), d = 1), s = 1; l > s; s++) n.animate({
				opacity: d
			}, u, t.easing), d = 1 - d;
			n.animate({
				opacity: d
			}, u, t.easing), n.queue(function() {
				r && n.hide(), i()
			}), p > 1 && c.splice.apply(c, [1, 0].concat(c.splice(p, l + 1))), n.dequeue()
		}, e.effects.effect.shake = function(t, i) {
			var s, n = e(this),
				a = ["position", "top", "bottom", "left", "right", "height", "width"],
				o = e.effects.setMode(n, t.mode || "effect"),
				r = t.direction || "left",
				h = t.distance || 20,
				l = t.times || 3,
				u = 2 * l + 1,
				d = Math.round(t.duration / u),
				c = "up" === r || "down" === r ? "top" : "left",
				p = "up" === r || "left" === r,
				f = {},
				m = {},
				g = {},
				v = n.queue(),
				y = v.length;
			for(e.effects.save(n, a), n.show(), e.effects.createWrapper(n), f[c] = (p ? "-=" : "+=") + h, m[c] = (p ? "+=" : "-=") + 2 * h, g[c] = (p ? "-=" : "+=") + 2 * h, n.animate(f, d, t.easing), s = 1; l > s; s++) n.animate(m, d, t.easing).animate(g, d, t.easing);
			n.animate(m, d, t.easing).animate(f, d / 2, t.easing).queue(function() {
				"hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
			}), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))), n.dequeue()
		}, e.effects.effect.slide = function(t, i) {
			var s, n = e(this),
				a = ["position", "top", "bottom", "left", "right", "width", "height"],
				o = e.effects.setMode(n, t.mode || "show"),
				r = "show" === o,
				h = t.direction || "left",
				l = "up" === h || "down" === h ? "top" : "left",
				u = "up" === h || "left" === h,
				d = {};
			e.effects.save(n, a), n.show(), s = t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(n).css({
				overflow: "hidden"
			}), r && n.css(l, u ? isNaN(s) ? "-" + s : -s : s), d[l] = (r ? u ? "+=" : "-=" : u ? "-=" : "+=") + s, n.animate(d, {
				queue: !1,
				duration: t.duration,
				easing: t.easing,
				complete: function() {
					"hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
				}
			})
		}, e.effects.effect.transfer = function(t, i) {
			var s = e(this),
				n = e(t.to),
				a = "fixed" === n.css("position"),
				o = e("body"),
				r = a ? o.scrollTop() : 0,
				h = a ? o.scrollLeft() : 0,
				l = n.offset(),
				u = {
					top: l.top - r,
					left: l.left - h,
					height: n.innerHeight(),
					width: n.innerWidth()
				},
				d = s.offset(),
				c = e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({
					top: d.top - r,
					left: d.left - h,
					height: s.innerHeight(),
					width: s.innerWidth(),
					position: a ? "fixed" : "absolute"
				}).animate(u, t.duration, t.easing, function() {
					c.remove(), i()
				})
		}
});
(function($) {
    var h = $.scrollTo = function(a, b, c) {
        $(window).scrollTo(a, b, c)
    };
    h.defaults = {
        axis: 'xy',
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    h.window = function(a) {
        return $(window)._scrollable()
    };
    $.fn._scrollable = function() {
        return this.map(function() {
            var a = this,
                isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!isWin) return a;
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
        })
    };
    $.fn.scrollTo = function(e, f, g) {
        if (typeof f == 'object') {
            g = f;
            f = 0
        }
        if (typeof g == 'function') g = {
            onAfter: g
        };
        if (e == 'max') e = 9e9;
        g = $.extend({}, h.defaults, g);
        f = f || g.duration;
        g.queue = g.queue && g.axis.length > 1;
        if (g.queue) f /= 2;
        g.offset = both(g.offset);
        g.over = both(g.over);
        return this._scrollable().each(function() {
            if (e == null) return;
            var d = this,
                $elem = $(d),
                targ = e,
                toff, attr = {},
                win = $elem.is('html,body');
            switch (typeof targ) {
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break
                    }
                    targ = $(targ, this);
                    if (!targ.length) return;
                case 'object':
                    if (targ.is || targ.style) toff = (targ = $(targ)).offset()
            }
            $.each(g.axis.split(''), function(i, a) {
                var b = a == 'x' ? 'Left' : 'Top',
                    pos = b.toLowerCase(),
                    key = 'scroll' + b,
                    old = d[key],
                    max = h.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (g.margin) {
                        attr[key] -= parseInt(targ.css('margin' + b)) || 0;
                        attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
                    }
                    attr[key] += g.offset[pos] || 0;
                    if (g.over[pos]) attr[key] += targ[a == 'x' ? 'width' : 'height']() * g.over[pos]
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c
                }
                if (g.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                if (!i && g.queue) {
                    if (old != attr[key]) animate(g.onAfterFirst);
                    delete attr[key]
                }
            });
            animate(g.onAfter);
            function animate(a) {
                $elem.animate(attr, f, g.easing, a && function() {
                    a.call(this, e, g)
                })
            }
        }).end()
    };
    h.max = function(a, b) {
        var c = b == 'x' ? 'Width' : 'Height',
            scroll = 'scroll' + c;
        if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()]();
        var d = 'client' + c,
            html = a.ownerDocument.documentElement,
            body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
    };
    function both(a) {
        return typeof a == 'object' ? a : {
            top: a,
            left: a
        }
    }
})(jQuery);;
if (window.jQuery)(function($) {
    $.extend({
        xml2json: function(xml, extended) {
            if (!xml) return {};
            function parseXML(node, simple) {
                if (!node) return null;
                var txt = '',
                    obj = null,
                    att = null;
                var nt = node.nodeType,
                    nn = jsVar(node.localName || node.nodeName);
                var nv = node.text || node.nodeValue || '';
                if (node.childNodes) {
                    if (node.childNodes.length > 0) {
                        $.each(node.childNodes, function(n, cn) {
                            var cnt = cn.nodeType,
                                cnn = jsVar(cn.localName || cn.nodeName);
                            var cnv = cn.text || cn.nodeValue || '';
                            if (cnt == 8) return;
                            else if (cnt == 3 || cnt == 4 || !cnn) {
                                if (cnv.match(/^\s+$/)) return;
                                txt += cnv.replace(/^\s+/, '').replace(/\s+$/, '');
                            } else {
                                obj = obj || {};
                                if (obj[cnn]) {
                                    if (!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
                                    obj[cnn] = myArr(obj[cnn]);
                                    obj[cnn][obj[cnn].length] = parseXML(cn, true);
                                    obj[cnn].length = obj[cnn].length;
                                } else obj[cnn] = parseXML(cn);
                            };
                        });
                    };
                };
                if (node.attributes) {
                    if (node.attributes.length > 0) {
                        att = {};
                        obj = obj || {};
                        $.each(node.attributes, function(a, at) {
                            var atn = jsVar(at.name),
                                atv = at.value;
                            att[atn] = atv;
                            if (obj[atn]) {
                                obj[cnn] = myArr(obj[cnn]);
                                obj[atn][obj[atn].length] = atv;
                                obj[atn].length = obj[atn].length;
                            } else obj[atn] = atv;
                        });
                    };
                };
                if (obj) {
                    obj = $.extend((txt != '' ? new String(txt) : {}), obj || {});
                    txt = (obj.text) ? ([obj.text || '']).concat([txt]) : txt;
                    if (txt) obj.text = txt;
                    txt = '';
                };
                var out = obj || txt;
                if (extended) {
                    if (txt) out = {};
                    txt = out.text || txt || '';
                    if (txt) out.text = txt;
                    if (!simple) out = myArr(out);
                };
                return out;
            };
            var jsVar = function(s) {
                return String(s || '').replace(/-/g, "_");
            };
            function isNum(s) {
                var regexp = /^((-)?([0-9]+)(([\.\,]{0,1})([0-9]+))?$)/;
                return (typeof s == "number") || regexp.test(String((s && typeof s == "string") ? jQuery.trim(s) : ''));
            };
            var myArr = function(o) {
                if (!$.isArray(o)) o = [o];
                o.length = o.length;
                return o;
            };
            if (typeof xml == 'string') xml = $.text2xml(xml);
            if (!xml.nodeType) return;
            if (xml.nodeType == 3 || xml.nodeType == 4) return xml.nodeValue;
            var root = (xml.nodeType == 9) ? xml.documentElement : xml;
            var out = parseXML(root, true);
            xml = null;
            root = null;
            return out;
        },
        text2xml: function(str) {
            return $.parseXML(str);
        }
    });
})(jQuery);
(function(a) {
    function d(b) {
        var c = b || window.event,
            d = [].slice.call(arguments, 1),
            e = 0,
            f = !0,
            g = 0,
            h = 0;
        return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), h = e, c.axis !== undefined && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e), c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120), c.wheelDeltaX !== undefined && (g = -1 * c.wheelDeltaX / 120), d.unshift(b, e, g, h), (a.event.dispatch || a.event.handle).apply(this, d)
    }
    var b = ["DOMMouseScroll", "mousewheel"];
    if (a.event.fixHooks)
        for (var c = b.length; c;) a.event.fixHooks[b[--c]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var a = b.length; a;) this.addEventListener(b[--a], d, !1);
            else this.onmousewheel = d
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var a = b.length; a;) this.removeEventListener(b[--a], d, !1);
            else this.onmousewheel = null
        }
    }, a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
})(jQuery);
(function($,window,document,Math,undefined){
	var div=document.createElement("div"),divStyle=div.style,suffix="Transform",testProperties=["O"+suffix,"ms"+suffix,"Webkit"+suffix,"Moz"+suffix],i=testProperties.length,supportProperty,supportMatrixFilter,supportFloat32Array="Float32Array" in window,propertyHook,propertyGet,rMatrix=/Matrix([^)]*)/,rAffine=/^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,_transform="transform",_transformOrigin="transformOrigin",_translate="translate",_rotate="rotate",_scale="scale",_skew="skew",_matrix="matrix";
	while(i--){if(testProperties[i] in divStyle){$.support[_transform]=supportProperty=testProperties[i];$.support[_transformOrigin]=supportProperty+"Origin";continue;}}
	if(!supportProperty) $.support.matrixFilter=supportMatrixFilter=divStyle.filter==="";
	$.cssNumber[_transform]=$.cssNumber[_transformOrigin]=true;
	if(supportProperty&&supportProperty !=_transform){
		$.cssProps[_transform]=supportProperty;
		$.cssProps[_transformOrigin]=supportProperty+"Origin";
		if(supportProperty=="Moz"+suffix){
			propertyHook={
				get:function(elem,computed){return(computed?$.css(elem,supportProperty).split("px").join(""):elem.style[supportProperty])},
				set:function(elem,value){elem.style[supportProperty]=/matrix\([^)p]*\)/.test(value)?value.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,_matrix+"$1$2px,$3px"):value}
			};
		}
		else if(/^1\.[0-5](?:\.|$)/.test($.fn.jquery)) propertyHook={get:function(elem,computed){return(computed?$.css(elem,supportProperty.replace(/^ms/,"Ms")):elem.style[supportProperty]);}};
	}
	else if(supportMatrixFilter){
		propertyHook={
			get:function(elem,computed,asArray){
				var elemStyle=(computed&&elem.currentStyle?elem.currentStyle:elem.style),matrix,data;
				if(elemStyle&&rMatrix.test(elemStyle.filter)){
					matrix=RegExp.$1.split(",");
					matrix=[matrix[0].split("=")[1],matrix[2].split("=")[1],matrix[1].split("=")[1],matrix[3].split("=")[1]];
				}
				else matrix=[1,0,0,1];
				if(!$.cssHooks[_transformOrigin]){matrix[4]=elemStyle?parseInt(elemStyle.left,10)||0:0;matrix[5]=elemStyle?parseInt(elemStyle.top,10)||0:0;}
				else{data=$._data(elem,"transformTranslate",undefined);matrix[4]=data?data[0]:0;matrix[5]=data?data[1]:0;}
				return asArray?matrix:_matrix+"("+matrix+")";
			},
			set:function(elem,value,animate){
				var elemStyle=elem.style,currentStyle,Matrix,filter,centerOrigin;
				if(!animate) elemStyle.zoom=1;
				value=matrix(value);
				Matrix=["Matrix("+"M11="+value[0],"M12="+value[2],"M21="+value[1],"M22="+value[3],"SizingMethod='auto expand'"].join();
				filter=(currentStyle=elem.currentStyle)&&currentStyle.filter||elemStyle.filter||"";
				elemStyle.filter=rMatrix.test(filter)?filter.replace(rMatrix,Matrix):filter+" progid:DXImageTransform.Microsoft."+Matrix+")";
				if(!$.cssHooks[_transformOrigin]){
					if((centerOrigin=$.transform.centerOrigin)){
						elemStyle[centerOrigin=="margin"?"marginLeft":"left"]=-(elem.offsetWidth/2)+(elem.clientWidth/2)+"px";
						elemStyle[centerOrigin=="margin"?"marginTop":"top"]=-(elem.offsetHeight/2)+(elem.clientHeight/2)+"px";
					}
					elemStyle.left=value[4]+"px";
					elemStyle.top=value[5]+"px";
				}
				else $.cssHooks[_transformOrigin].set(elem,value);
			}
		};
	}
	if(propertyHook) $.cssHooks[_transform]=propertyHook;
	propertyGet=propertyHook&&propertyHook.get||$.css;
	$.fx.step.transform=function(fx){
		var elem=fx.elem,start=fx.start,end=fx.end,pos=fx.pos,transform="",precision=1E5,i,startVal,endVal,unit;
		if(!start||typeof start==="string"){
			if(!start) start=propertyGet(elem,supportProperty);
			if(supportMatrixFilter) elem.style.zoom=1;
			end=end.split("+=").join(start);
			$.extend(fx,interpolationList(start,end));
			start=fx.start;
			end=fx.end;
		}
		i=start.length;
		while(i--){
			startVal=start[i];
			endVal=end[i];
			unit=+false;
			switch(startVal[0]){
				case _translate:unit="px";
				case _scale:unit||(unit="");transform=startVal[0]+"("+Math.round((startVal[1][0]+(endVal[1][0]-startVal[1][0])*pos)*precision)/precision+unit+","+Math.round((startVal[1][1]+(endVal[1][1]-startVal[1][1])*pos)*precision)/precision+unit+")"+transform;break;
				case _skew+"X":case _skew+"Y":case _rotate:transform=startVal[0]+"("+Math.round((startVal[1]+(endVal[1]-startVal[1])*pos)*precision)/precision+"rad)"+transform;break;
			}
		}
		fx.origin&&(transform=fx.origin+transform);
		propertyHook&&propertyHook.set?propertyHook.set(elem,transform,+true):elem.style[supportProperty]=transform;
	};
	function matrix(transform){
		transform=transform.split(")");
		var trim=$.trim,i=-1,l=transform.length-1,split,prop,val,prev=supportFloat32Array?new Float32Array(6):[],curr=supportFloat32Array?new Float32Array(6):[],rslt=supportFloat32Array?new Float32Array(6):[1,0,0,1,0,0];
		prev[0]=prev[3]=rslt[0]=rslt[3]=1;
		prev[1]=prev[2]=prev[4]=prev[5]=0;
		while(++i<l){
			split=transform[i].split("(");
			prop=trim(split[0]);
			val=split[1];
			curr[0]=curr[3]=1;
			curr[1]=curr[2]=curr[4]=curr[5]=0;
			switch(prop){
				case _translate+"X":curr[4]=parseInt(val,10);break;
				case _translate+"Y":curr[5]=parseInt(val,10);break;
				case _translate:val=val.split(",");curr[4]=parseInt(val[0],10);curr[5]=parseInt(val[1]||0,10);break;
				case _rotate:val=toRadian(val);curr[0]=Math.cos(val);curr[1]=Math.sin(val);curr[2]=-Math.sin(val);curr[3]=Math.cos(val);break;
				case _scale+"X":curr[0]=+val;break;
				case _scale+"Y":curr[3]=val;break;
				case _scale:val=val.split(",");curr[0]=val[0];curr[3]=val.length>1?val[1]:val[0];break;
				case _skew+"X":curr[2]=Math.tan(toRadian(val));break;
				case _skew+"Y":curr[1]=Math.tan(toRadian(val));break;
				case _matrix:val=val.split(",");curr[0]=val[0];curr[1]=val[1];curr[2]=val[2];curr[3]=val[3];curr[4]=parseInt(val[4],10);curr[5]=parseInt(val[5],10);break;
			}
			rslt[0]=prev[0]*curr[0]+prev[2]*curr[1];
			rslt[1]=prev[1]*curr[0]+prev[3]*curr[1];
			rslt[2]=prev[0]*curr[2]+prev[2]*curr[3];
			rslt[3]=prev[1]*curr[2]+prev[3]*curr[3];
			rslt[4]=prev[0]*curr[4]+prev[2]*curr[5]+prev[4];
			rslt[5]=prev[1]*curr[4]+prev[3]*curr[5]+prev[5];
			prev=[rslt[0],rslt[1],rslt[2],rslt[3],rslt[4],rslt[5]];
		}
		return rslt;
	}
	function unmatrix(matrix){
		var scaleX,scaleY,skew,A=matrix[0],B=matrix[1],C=matrix[2],D=matrix[3];
		if(A*D-B*C){
			scaleX=Math.sqrt(A*A+B*B);A/=scaleX;B/=scaleX;
			skew=A*C+B*D;C-=A*skew;D-=B*skew;
			scaleY=Math.sqrt(C*C+D*D);C/=scaleY;D/=scaleY;
			skew/=scaleY;
			if(A*D<B*C){A=-A;B=-B;skew=-skew;scaleX=-scaleX;}
		}
		else scaleX=scaleY=skew=0;
		return[[_translate,[+matrix[4],+matrix[5]]],[_rotate,Math.atan2(B,A)],[_skew+"X",Math.atan(skew)],[_scale,[scaleX,scaleY]]];
	}
	function interpolationList(start,end){
		var list={start:[],end:[]},i=-1,l,currStart,currEnd,currType;
		(start=="none"||isAffine(start))&&(start="");
		(end=="none"||isAffine(end))&&(end="");
		if(start&&end&&!end.indexOf("matrix")&&toArray(start).join()==toArray(end.split(")")[0]).join()){
			list.origin=start;
			start="";
			end=end.slice(end.indexOf(")")+1);
		}
		if(!start&&!end) return;
		if(!start||!end||functionList(start)==functionList(end)){
			start&&(start=start.split(")"))&&(l=start.length);
			end&&(end=end.split(")"))&&(l=end.length);
			while(++i<l-1){
				start[i]&&(currStart=start[i].split("("));
				end[i]&&(currEnd=end[i].split("("));
				currType=$.trim((currStart||currEnd)[0]);
				append(list.start,parseFunction(currType,currStart?currStart[1]:0));
				append(list.end,parseFunction(currType,currEnd?currEnd[1]:0));
			}
		}
		else{
			list.start=unmatrix(matrix(start));
			list.end=unmatrix(matrix(end))
		}
		return list;
	}
	function parseFunction(type,value){
		var defaultValue=+(!type.indexOf(_scale)),scaleX,cat=type.replace(/e[XY]/,"e");
		switch(type){
			case _translate+"Y":case _scale+"Y":value=[defaultValue,value?parseFloat(value):defaultValue];break;
			case _translate+"X":case _translate:case _scale+"X":scaleX=1;
			case _scale:value=value?(value=value.split(","))&&[parseFloat(value[0]),parseFloat(value.length>1?value[1]:type==_scale?scaleX||value[0]:defaultValue+"")]:[defaultValue,defaultValue];break;
			case _skew+"X":case _skew+"Y":case _rotate:value=value?toRadian(value):0;break;
			case _matrix:return unmatrix(value?toArray(value):[1,0,0,1,0,0]);break;
		}
		return[[cat,value ]];
	}
	function isAffine(matrix){return rAffine.test(matrix);}
	function functionList(transform){return transform.replace(/(?:\([^)]*\))|\s/g,"");}
	function append(arr1,arr2,value){while(value=arr2.shift()) arr1.push(value);}
	function toRadian(value){return ~value.indexOf("deg")?parseInt(value,10)*(Math.PI*2/360):~value.indexOf("grad")?parseInt(value,10)*(Math.PI/200):parseFloat(value);}
	function toArray(matrix){matrix=/([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(matrix);return[matrix[1],matrix[2],matrix[3],matrix[4],matrix[5],matrix[6]];}
	var d=document.createElement("div"),ds=d.style,ap=["O","ms","Webkit","Moz"],p,i=ap.length,b=["transform","transformOrigin","transformStyle","perspective","perspectiveOrigin","backfaceVisibility"],r,j=ap.length;
	while(i--){if(ap[i]+b[0].ucfirst() in ds){p=ap[i];continue;}}
	if(!p) return;
	while(j--){
		r=p+b[j].ucfirst();
		if(r in ds){
			$.cssNumber[b[j]]=true;
			$.cssProps[b[j]]=r;
			r==="MozTransform"&&($.cssHooks[b[j]]={
				get:function(e,b){return b?$.css(e,r).split("px").join(""):e.style[r]},
				set:function(e,v){/matrix\([^)p]*\)/.test(v)&&(v=v.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,"matrix$1$2px,$3px"));e.style[r]=v}
			});
		}
	}
	$.transform={centerOrigin:"margin"};
})(jQuery,window,document,Math);
(function(e, t) {
    e.widget("ui.progressbar", {
        version: "1.10.4",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove()
        },
        value: function(e) {
            if (e === t) {
                return this.options.value
            }
            this.options.value = this._constrainedValue(e);
            this._refreshValue()
        },
        _constrainedValue: function(e) {
            if (e === t) {
                e = this.options.value
            }
            this.indeterminate = e === false;
            if (typeof e !== "number") {
                e = 0
            }
            return this.indeterminate ? false : Math.min(this.options.max, Math.max(this.min, e))
        },
        _setOptions: function(e) {
            var t = e.value;
            delete e.value;
            this._super(e);
            this.options.value = this._constrainedValue(t);
            this._refreshValue()
        },
        _setOption: function(e, t) {
            if (e === "max") {
                t = Math.max(this.min, t)
            }
            this._super(e, t)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var t = this.options.value,
                n = this._percentage();
            this.valueDiv.toggle(this.indeterminate || t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(n.toFixed(0) + "%");
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
            if (this.indeterminate) {
                this.element.removeAttr("aria-valuenow");
                if (!this.overlayDiv) {
                    this.overlayDiv = e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv)
                }
            } else {
                this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": t
                });
                if (this.overlayDiv) {
                    this.overlayDiv.remove();
                    this.overlayDiv = null
                }
            }
            if (this.oldValue !== t) {
                this.oldValue = t;
                this._trigger("change")
            }
            if (t === this.options.max) {
                this._trigger("complete")
            }
        }
    })
})(jQuery);
(function(e, t) {
    function n(e) {
        return parseInt(e, 10) || 0
    }
    function r(e) {
        return !isNaN(parseInt(e, 10))
    }
    e.widget("ui.resizable", e.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var t, n, r, i, s, o = this,
                u = this.options;
            this.element.addClass("ui-resizable");
            e.extend(this, {
                _aspectRatio: !!u.aspectRatio,
                aspectRatio: u.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: u.helper || u.ghost || u.animate ? u.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = u.handles || (!e(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                t = this.handles.split(",");
                this.handles = {};
                for (n = 0; n < t.length; n++) {
                    r = e.trim(t[n]);
                    s = "ui-resizable-" + r;
                    i = e("<div class='ui-resizable-handle " + s + "'></div>");
                    i.css({
                        zIndex: u.zIndex
                    });
                    if ("se" === r) {
                        i.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[r] = ".ui-resizable-" + r;
                    this.element.append(i)
                }
            }
            this._renderAxis = function(t) {
                var n, r, i, s;
                t = t || this.element;
                for (n in this.handles) {
                    if (this.handles[n].constructor === String) {
                        this.handles[n] = e(this.handles[n], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        r = e(this.handles[n], this.element);
                        s = /sw|ne|nw|se|n|s/.test(n) ? r.outerHeight() : r.outerWidth();
                        i = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
                        t.css(i, s);
                        this._proportionallyResize()
                    }
                    if (!e(this.handles[n]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = e(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!o.resizing) {
                    if (this.className) {
                        i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    o.axis = i && i[1] ? i[1] : "se"
                }
            });
            if (u.autoHide) {
                this._handles.hide();
                e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    if (u.disabled) {
                        return
                    }
                    e(this).removeClass("ui-resizable-autohide");
                    o._handles.show()
                }).mouseleave(function() {
                    if (u.disabled) {
                        return
                    }
                    if (!o.resizing) {
                        e(this).addClass("ui-resizable-autohide");
                        o._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var t, n = function(t) {
                e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                n(this.element);
                t = this.element;
                this.originalElement.css({
                    position: t.css("position"),
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: t.css("top"),
                    left: t.css("left")
                }).insertAfter(t);
                t.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            n(this.originalElement);
            return this
        },
        _mouseCapture: function(t) {
            var n, r, i = false;
            for (n in this.handles) {
                r = e(this.handles[n])[0];
                if (r === t.target || e.contains(r, t.target)) {
                    i = true
                }
            }
            return !this.options.disabled && i
        },
        _mouseStart: function(t) {
            var r, i, s, o = this.options,
                u = this.element.position(),
                a = this.element;
            this.resizing = true;
            if (/absolute/.test(a.css("position"))) {
                a.css({
                    position: "absolute",
                    top: a.css("top"),
                    left: a.css("left")
                })
            } else if (a.is(".ui-draggable")) {
                a.css({
                    position: "absolute",
                    top: u.top,
                    left: u.left
                })
            }
            this._renderProxy();
            r = n(this.helper.css("left"));
            i = n(this.helper.css("top"));
            if (o.containment) {
                r += e(o.containment).scrollLeft() || 0;
                i += e(o.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: r,
                top: i
            };
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: a.width(),
                height: a.height()
            };
            this.originalSize = this._helper ? {
                width: a.outerWidth(),
                height: a.outerHeight()
            } : {
                width: a.width(),
                height: a.height()
            };
            this.originalPosition = {
                left: r,
                top: i
            };
            this.sizeDiff = {
                width: a.outerWidth() - a.width(),
                height: a.outerHeight() - a.height()
            };
            this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            };
            this.aspectRatio = typeof o.aspectRatio === "number" ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            s = e(".ui-resizable-" + this.axis).css("cursor");
            e("body").css("cursor", s === "auto" ? this.axis + "-resize" : s);
            a.addClass("ui-resizable-resizing");
            this._propagate("start", t);
            return true
        },
        _mouseDrag: function(t) {
            var n, r = this.helper,
                i = {},
                s = this.originalMousePosition,
                o = this.axis,
                u = this.position.top,
                a = this.position.left,
                f = this.size.width,
                l = this.size.height,
                c = t.pageX - s.left || 0,
                h = t.pageY - s.top || 0,
                p = this._change[o];
            if (!p) {
                return false
            }
            n = p.apply(this, [t, c, h]);
            this._updateVirtualBoundaries(t.shiftKey);
            if (this._aspectRatio || t.shiftKey) {
                n = this._updateRatio(n, t)
            }
            n = this._respectSize(n, t);
            this._updateCache(n);
            this._propagate("resize", t);
            if (this.position.top !== u) {
                i.top = this.position.top + "px"
            }
            if (this.position.left !== a) {
                i.left = this.position.left + "px"
            }
            if (this.size.width !== f) {
                i.width = this.size.width + "px"
            }
            if (this.size.height !== l) {
                i.height = this.size.height + "px"
            }
            r.css(i);
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!e.isEmptyObject(i)) {
                this._trigger("resize", t, this.ui())
            }
            return false
        },
        _mouseStop: function(t) {
            this.resizing = false;
            var n, r, i, s, o, u, a, f = this.options,
                l = this;
            if (this._helper) {
                n = this._proportionallyResizeElements;
                r = n.length && /textarea/i.test(n[0].nodeName);
                i = r && e.ui.hasScroll(n[0], "left") ? 0 : l.sizeDiff.height;
                s = r ? 0 : l.sizeDiff.width;
                o = {
                    width: l.helper.width() - s,
                    height: l.helper.height() - i
                };
                u = parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left) || null;
                a = parseInt(l.element.css("top"), 10) + (l.position.top - l.originalPosition.top) || null;
                if (!f.animate) {
                    this.element.css(e.extend(o, {
                        top: a,
                        left: u
                    }))
                }
                l.helper.height(l.size.height);
                l.helper.width(l.size.width);
                if (this._helper && !f.animate) {
                    this._proportionallyResize()
                }
            }
            e("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", t);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updateVirtualBoundaries: function(e) {
            var t, n, i, s, o, u = this.options;
            o = {
                minWidth: r(u.minWidth) ? u.minWidth : 0,
                maxWidth: r(u.maxWidth) ? u.maxWidth : Infinity,
                minHeight: r(u.minHeight) ? u.minHeight : 0,
                maxHeight: r(u.maxHeight) ? u.maxHeight : Infinity
            };
            if (this._aspectRatio || e) {
                t = o.minHeight * this.aspectRatio;
                i = o.minWidth / this.aspectRatio;
                n = o.maxHeight * this.aspectRatio;
                s = o.maxWidth / this.aspectRatio;
                if (t > o.minWidth) {
                    o.minWidth = t
                }
                if (i > o.minHeight) {
                    o.minHeight = i
                }
                if (n < o.maxWidth) {
                    o.maxWidth = n
                }
                if (s < o.maxHeight) {
                    o.maxHeight = s
                }
            }
            this._vBoundaries = o
        },
        _updateCache: function(e) {
            this.offset = this.helper.offset();
            if (r(e.left)) {
                this.position.left = e.left
            }
            if (r(e.top)) {
                this.position.top = e.top
            }
            if (r(e.height)) {
                this.size.height = e.height
            }
            if (r(e.width)) {
                this.size.width = e.width
            }
        },
        _updateRatio: function(e) {
            var t = this.position,
                n = this.size,
                i = this.axis;
            if (r(e.height)) {
                e.width = e.height * this.aspectRatio
            } else if (r(e.width)) {
                e.height = e.width / this.aspectRatio
            }
            if (i === "sw") {
                e.left = t.left + (n.width - e.width);
                e.top = null
            }
            if (i === "nw") {
                e.top = t.top + (n.height - e.height);
                e.left = t.left + (n.width - e.width)
            }
            return e
        },
        _respectSize: function(e) {
            var t = this._vBoundaries,
                n = this.axis,
                i = r(e.width) && t.maxWidth && t.maxWidth < e.width,
                s = r(e.height) && t.maxHeight && t.maxHeight < e.height,
                o = r(e.width) && t.minWidth && t.minWidth > e.width,
                u = r(e.height) && t.minHeight && t.minHeight > e.height,
                a = this.originalPosition.left + this.originalSize.width,
                f = this.position.top + this.size.height,
                l = /sw|nw|w/.test(n),
                c = /nw|ne|n/.test(n);
            if (o) {
                e.width = t.minWidth
            }
            if (u) {
                e.height = t.minHeight
            }
            if (i) {
                e.width = t.maxWidth
            }
            if (s) {
                e.height = t.maxHeight
            }
            if (o && l) {
                e.left = a - t.minWidth
            }
            if (i && l) {
                e.left = a - t.maxWidth
            }
            if (u && c) {
                e.top = f - t.minHeight
            }
            if (s && c) {
                e.top = f - t.maxHeight
            }
            if (!e.width && !e.height && !e.left && e.top) {
                e.top = null
            } else if (!e.width && !e.height && !e.top && e.left) {
                e.left = null
            }
            return e
        },
        _proportionallyResize: function() {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var e, t, n, r, i, s = this.helper || this.element;
            for (e = 0; e < this._proportionallyResizeElements.length; e++) {
                i = this._proportionallyResizeElements[e];
                if (!this.borderDif) {
                    this.borderDif = [];
                    n = [i.css("borderTopWidth"), i.css("borderRightWidth"), i.css("borderBottomWidth"), i.css("borderLeftWidth")];
                    r = [i.css("paddingTop"), i.css("paddingRight"), i.css("paddingBottom"), i.css("paddingLeft")];
                    for (t = 0; t < n.length; t++) {
                        this.borderDif[t] = (parseInt(n[t], 10) || 0) + (parseInt(r[t], 10) || 0)
                    }
                }
                i.css({
                    height: s.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: s.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function() {
            var t = this.element,
                n = this.options;
            this.elementOffset = t.offset();
            if (this._helper) {
                this.helper = this.helper || e("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++n.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(e, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function(e, t) {
                var n = this.originalSize,
                    r = this.originalPosition;
                return {
                    left: r.left + t,
                    width: n.width - t
                }
            },
            n: function(e, t, n) {
                var r = this.originalSize,
                    i = this.originalPosition;
                return {
                    top: i.top + n,
                    height: r.height - n
                }
            },
            s: function(e, t, n) {
                return {
                    height: this.originalSize.height + n
                }
            },
            se: function(t, n, r) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
            },
            sw: function(t, n, r) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
            },
            ne: function(t, n, r) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
            },
            nw: function(t, n, r) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
            }
        },
        _propagate: function(t, n) {
            e.ui.plugin.call(this, t, [n, this.ui()]);
            t !== "resize" && this._trigger(t, n, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    e.ui.plugin.add("resizable", "animate", {
        stop: function(t) {
            var n = e(this).data("ui-resizable"),
                r = n.options,
                i = n._proportionallyResizeElements,
                s = i.length && /textarea/i.test(i[0].nodeName),
                o = s && e.ui.hasScroll(i[0], "left") ? 0 : n.sizeDiff.height,
                u = s ? 0 : n.sizeDiff.width,
                a = {
                    width: n.size.width - u,
                    height: n.size.height - o
                },
                f = parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left) || null,
                l = parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top) || null;
            n.element.animate(e.extend(a, l && f ? {
                top: l,
                left: f
            } : {}), {
                duration: r.animateDuration,
                easing: r.animateEasing,
                step: function() {
                    var r = {
                        width: parseInt(n.element.css("width"), 10),
                        height: parseInt(n.element.css("height"), 10),
                        top: parseInt(n.element.css("top"), 10),
                        left: parseInt(n.element.css("left"), 10)
                    };
                    if (i && i.length) {
                        e(i[0]).css({
                            width: r.width,
                            height: r.height
                        })
                    }
                    n._updateCache(r);
                    n._propagate("resize", t)
                }
            })
        }
    });
    e.ui.plugin.add("resizable", "containment", {
        start: function() {
            var t, r, i, s, o, u, a, f = e(this).data("ui-resizable"),
                l = f.options,
                c = f.element,
                h = l.containment,
                p = h instanceof e ? h.get(0) : /parent/.test(h) ? c.parent().get(0) : h;
            if (!p) {
                return
            }
            f.containerElement = e(p);
            if (/document/.test(h) || h === document) {
                f.containerOffset = {
                    left: 0,
                    top: 0
                };
                f.containerPosition = {
                    left: 0,
                    top: 0
                };
                f.parentData = {
                    element: e(document),
                    left: 0,
                    top: 0,
                    width: e(document).width(),
                    height: e(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                t = e(p);
                r = [];
                e(["Top", "Right", "Left", "Bottom"]).each(function(e, i) {
                    r[e] = n(t.css("padding" + i))
                });
                f.containerOffset = t.offset();
                f.containerPosition = t.position();
                f.containerSize = {
                    height: t.innerHeight() - r[3],
                    width: t.innerWidth() - r[1]
                };
                i = f.containerOffset;
                s = f.containerSize.height;
                o = f.containerSize.width;
                u = e.ui.hasScroll(p, "left") ? p.scrollWidth : o;
                a = e.ui.hasScroll(p) ? p.scrollHeight : s;
                f.parentData = {
                    element: p,
                    left: i.left,
                    top: i.top,
                    width: u,
                    height: a
                }
            }
        },
        resize: function(t) {
            var n, r, i, s, o = e(this).data("ui-resizable"),
                u = o.options,
                a = o.containerOffset,
                f = o.position,
                l = o._aspectRatio || t.shiftKey,
                c = {
                    top: 0,
                    left: 0
                },
                h = o.containerElement;
            if (h[0] !== document && /static/.test(h.css("position"))) {
                c = a
            }
            if (f.left < (o._helper ? a.left : 0)) {
                o.size.width = o.size.width + (o._helper ? o.position.left - a.left : o.position.left - c.left);
                if (l) {
                    o.size.height = o.size.width / o.aspectRatio
                }
                o.position.left = u.helper ? a.left : 0
            }
            if (f.top < (o._helper ? a.top : 0)) {
                o.size.height = o.size.height + (o._helper ? o.position.top - a.top : o.position.top);
                if (l) {
                    o.size.width = o.size.height * o.aspectRatio
                }
                o.position.top = o._helper ? a.top : 0
            }
            o.offset.left = o.parentData.left + o.position.left;
            o.offset.top = o.parentData.top + o.position.top;
            n = Math.abs((o._helper ? o.offset.left - c.left : o.offset.left - c.left) + o.sizeDiff.width);
            r = Math.abs((o._helper ? o.offset.top - c.top : o.offset.top - a.top) + o.sizeDiff.height);
            i = o.containerElement.get(0) === o.element.parent().get(0);
            s = /relative|absolute/.test(o.containerElement.css("position"));
            if (i && s) {
                n -= Math.abs(o.parentData.left)
            }
            if (n + o.size.width >= o.parentData.width) {
                o.size.width = o.parentData.width - n;
                if (l) {
                    o.size.height = o.size.width / o.aspectRatio
                }
            }
            if (r + o.size.height >= o.parentData.height) {
                o.size.height = o.parentData.height - r;
                if (l) {
                    o.size.width = o.size.height * o.aspectRatio
                }
            }
        },
        stop: function() {
            var t = e(this).data("ui-resizable"),
                n = t.options,
                r = t.containerOffset,
                i = t.containerPosition,
                s = t.containerElement,
                o = e(t.helper),
                u = o.offset(),
                a = o.outerWidth() - t.sizeDiff.width,
                f = o.outerHeight() - t.sizeDiff.height;
            if (t._helper && !n.animate && /relative/.test(s.css("position"))) {
                e(this).css({
                    left: u.left - i.left - r.left,
                    width: a,
                    height: f
                })
            }
            if (t._helper && !n.animate && /static/.test(s.css("position"))) {
                e(this).css({
                    left: u.left - i.left - r.left,
                    width: a,
                    height: f
                })
            }
        }
    });
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = e(this).data("ui-resizable"),
                n = t.options,
                r = function(t) {
                    e(t).each(function() {
                        var t = e(this);
                        t.data("ui-resizable-alsoresize", {
                            width: parseInt(t.width(), 10),
                            height: parseInt(t.height(), 10),
                            left: parseInt(t.css("left"), 10),
                            top: parseInt(t.css("top"), 10)
                        })
                    })
                };
            if (typeof n.alsoResize === "object" && !n.alsoResize.parentNode) {
                if (n.alsoResize.length) {
                    n.alsoResize = n.alsoResize[0];
                    r(n.alsoResize)
                } else {
                    e.each(n.alsoResize, function(e) {
                        r(e)
                    })
                }
            } else {
                r(n.alsoResize)
            }
        },
        resize: function(t, n) {
            var r = e(this).data("ui-resizable"),
                i = r.options,
                s = r.originalSize,
                o = r.originalPosition,
                u = {
                    height: r.size.height - s.height || 0,
                    width: r.size.width - s.width || 0,
                    top: r.position.top - o.top || 0,
                    left: r.position.left - o.left || 0
                },
                a = function(t, r) {
                    e(t).each(function() {
                        var t = e(this),
                            i = e(this).data("ui-resizable-alsoresize"),
                            s = {},
                            o = r && r.length ? r : t.parents(n.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        e.each(o, function(e, t) {
                            var n = (i[t] || 0) + (u[t] || 0);
                            if (n && n >= 0) {
                                s[t] = n || null
                            }
                        });
                        t.css(s)
                    })
                };
            if (typeof i.alsoResize === "object" && !i.alsoResize.nodeType) {
                e.each(i.alsoResize, function(e, t) {
                    a(e, t)
                })
            } else {
                a(i.alsoResize)
            }
        },
        stop: function() {
            e(this).removeData("resizable-alsoresize")
        }
    });
    e.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = e(this).data("ui-resizable"),
                n = t.options,
                r = t.size;
            t.ghost = t.originalElement.clone();
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: r.height,
                width: r.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof n.ghost === "string" ? n.ghost : "");
            t.ghost.appendTo(t.helper)
        },
        resize: function() {
            var t = e(this).data("ui-resizable");
            if (t.ghost) {
                t.ghost.css({
                    position: "relative",
                    height: t.size.height,
                    width: t.size.width
                })
            }
        },
        stop: function() {
            var t = e(this).data("ui-resizable");
            if (t.ghost && t.helper) {
                t.helper.get(0).removeChild(t.ghost.get(0))
            }
        }
    });
    e.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var t = e(this).data("ui-resizable"),
                n = t.options,
                r = t.size,
                i = t.originalSize,
                s = t.originalPosition,
                o = t.axis,
                u = typeof n.grid === "number" ? [n.grid, n.grid] : n.grid,
                a = u[0] || 1,
                f = u[1] || 1,
                l = Math.round((r.width - i.width) / a) * a,
                c = Math.round((r.height - i.height) / f) * f,
                h = i.width + l,
                p = i.height + c,
                d = n.maxWidth && n.maxWidth < h,
                v = n.maxHeight && n.maxHeight < p,
                m = n.minWidth && n.minWidth > h,
                g = n.minHeight && n.minHeight > p;
            n.grid = u;
            if (m) {
                h = h + a
            }
            if (g) {
                p = p + f
            }
            if (d) {
                h = h - a
            }
            if (v) {
                p = p - f
            }
            if (/^(se|s|e)$/.test(o)) {
                t.size.width = h;
                t.size.height = p
            } else if (/^(ne)$/.test(o)) {
                t.size.width = h;
                t.size.height = p;
                t.position.top = s.top - c
            } else if (/^(sw)$/.test(o)) {
                t.size.width = h;
                t.size.height = p;
                t.position.left = s.left - l
            } else {
                if (p - f > 0) {
                    t.size.height = p;
                    t.position.top = s.top - c
                } else {
                    t.size.height = f;
                    t.position.top = s.top + i.height - f
                }
                if (h - a > 0) {
                    t.size.width = h;
                    t.position.left = s.left - l
                } else {
                    t.size.width = a;
                    t.position.left = s.left + i.width - a
                }
            }
        }
    })
})(jQuery);
(function(e, t) {
    function n(e, t, n) {
        return e > t && e < t + n
    }
    function r(e) {
        return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"))
    }
    e.widget("ui.sortable", e.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var e = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? e.axis === "x" || r(this.items[0].item) : false;
            this.offset = this.element.offset();
            this._mouseInit();
            this.ready = true
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled");
            this._mouseDestroy();
            for (var e = this.items.length - 1; e >= 0; e--) {
                this.items[e].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _setOption: function(t, n) {
            if (t === "disabled") {
                this.options[t] = n;
                this.widget().toggleClass("ui-sortable-disabled", !!n)
            } else {
                e.Widget.prototype._setOption.apply(this, arguments)
            }
        },
        _mouseCapture: function(t, n) {
            var r = null,
                i = false,
                s = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type === "static") {
                return false
            }
            this._refreshItems(t);
            e(t.target).parents().each(function() {
                if (e.data(this, s.widgetName + "-item") === s) {
                    r = e(this);
                    return false
                }
            });
            if (e.data(t.target, s.widgetName + "-item") === s) {
                r = e(t.target)
            }
            if (!r) {
                return false
            }
            if (this.options.handle && !n) {
                e(this.options.handle, r).find("*").addBack().each(function() {
                    if (this === t.target) {
                        i = true
                    }
                });
                if (!i) {
                    return false
                }
            }
            this.currentItem = r;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(t, n, r) {
            var i, s, o = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(t);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(t);
            this.originalPageX = t.pageX;
            this.originalPageY = t.pageY;
            o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] !== this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (o.containment) {
                this._setContainment()
            }
            if (o.cursor && o.cursor !== "auto") {
                s = this.document.find("body");
                this.storedCursor = s.css("cursor");
                s.css("cursor", o.cursor);
                this.storedStylesheet = e("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(s)
            }
            if (o.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", o.opacity)
            }
            if (o.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", o.zIndex)
            }
            if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", t, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!r) {
                for (i = this.containers.length - 1; i >= 0; i--) {
                    this.containers[i]._trigger("activate", t, this._uiHash(this))
                }
            }
            if (e.ui.ddmanager) {
                e.ui.ddmanager.current = this
            }
            if (e.ui.ddmanager && !o.dropBehaviour) {
                e.ui.ddmanager.prepareOffsets(this, t)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(t);
            return true
        },
        _mouseDrag: function(t) {
            var n, r, i, s, o = this.options,
                u = false;
            this.position = this._generatePosition(t);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = u = this.scrollParent[0].scrollTop + o.scrollSpeed
                    } else if (t.pageY - this.overflowOffset.top < o.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = u = this.scrollParent[0].scrollTop - o.scrollSpeed
                    }
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = u = this.scrollParent[0].scrollLeft + o.scrollSpeed
                    } else if (t.pageX - this.overflowOffset.left < o.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = u = this.scrollParent[0].scrollLeft - o.scrollSpeed
                    }
                } else {
                    if (t.pageY - e(document).scrollTop() < o.scrollSensitivity) {
                        u = e(document).scrollTop(e(document).scrollTop() - o.scrollSpeed)
                    } else if (e(window).height() - (t.pageY - e(document).scrollTop()) < o.scrollSensitivity) {
                        u = e(document).scrollTop(e(document).scrollTop() + o.scrollSpeed)
                    }
                    if (t.pageX - e(document).scrollLeft() < o.scrollSensitivity) {
                        u = e(document).scrollLeft(e(document).scrollLeft() - o.scrollSpeed)
                    } else if (e(window).width() - (t.pageX - e(document).scrollLeft()) < o.scrollSensitivity) {
                        u = e(document).scrollLeft(e(document).scrollLeft() + o.scrollSpeed)
                    }
                }
                if (u !== false && e.ui.ddmanager && !o.dropBehaviour) {
                    e.ui.ddmanager.prepareOffsets(this, t)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (n = this.items.length - 1; n >= 0; n--) {
                r = this.items[n];
                i = r.item[0];
                s = this._intersectsWithPointer(r);
                if (!s) {
                    continue
                }
                if (r.instance !== this.currentContainer) {
                    continue
                }
                if (i !== this.currentItem[0] && this.placeholder[s === 1 ? "next" : "prev"]()[0] !== i && !e.contains(this.placeholder[0], i) && (this.options.type === "semi-dynamic" ? !e.contains(this.element[0], i) : true)) {
                    this.direction = s === 1 ? "down" : "up";
                    if (this.options.tolerance === "pointer" || this._intersectsWithSides(r)) {
                        this._rearrange(t, r)
                    } else {
                        break
                    }
                    this._trigger("change", t, this._uiHash());
                    break
                }
            }
            this._contactContainers(t);
            if (e.ui.ddmanager) {
                e.ui.ddmanager.drag(this, t)
            }
            this._trigger("sort", t, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(t, n) {
            if (!t) {
                return
            }
            if (e.ui.ddmanager && !this.options.dropBehaviour) {
                e.ui.ddmanager.drop(this, t)
            }
            if (this.options.revert) {
                var r = this,
                    i = this.placeholder.offset(),
                    s = this.options.axis,
                    o = {};
                if (!s || s === "x") {
                    o.left = i.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)
                }
                if (!s || s === "y") {
                    o.top = i.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)
                }
                this.reverting = true;
                e(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                    r._clear(t)
                })
            } else {
                this._clear(t, n)
            }
            return false
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper === "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var t = this.containers.length - 1; t >= 0; t--) {
                    this.containers[t]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[t].containerCache.over) {
                        this.containers[t]._trigger("out", null, this._uiHash(this));
                        this.containers[t].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                e.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    e(this.domPosition.prev).after(this.currentItem)
                } else {
                    e(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function(t) {
            var n = this._getItemsAsjQuery(t && t.connected),
                r = [];
            t = t || {};
            e(n).each(function() {
                var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                if (n) {
                    r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
                }
            });
            if (!r.length && t.key) {
                r.push(t.key + "=")
            }
            return r.join("&")
        },
        toArray: function(t) {
            var n = this._getItemsAsjQuery(t && t.connected),
                r = [];
            t = t || {};
            n.each(function() {
                r.push(e(t.item || this).attr(t.attribute || "id") || "")
            });
            return r
        },
        _intersectsWith: function(e) {
            var t = this.positionAbs.left,
                n = t + this.helperProportions.width,
                r = this.positionAbs.top,
                i = r + this.helperProportions.height,
                s = e.left,
                o = s + e.width,
                u = e.top,
                a = u + e.height,
                f = this.offset.click.top,
                l = this.offset.click.left,
                c = this.options.axis === "x" || r + f > u && r + f < a,
                h = this.options.axis === "y" || t + l > s && t + l < o,
                p = c && h;
            if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"]) {
                return p
            } else {
                return s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
            }
        },
        _intersectsWithPointer: function(e) {
            var t = this.options.axis === "x" || n(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                r = this.options.axis === "y" || n(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                i = t && r,
                s = this._getDragVerticalDirection(),
                o = this._getDragHorizontalDirection();
            if (!i) {
                return false
            }
            return this.floating ? o && o === "right" || s === "down" ? 2 : 1 : s && (s === "down" ? 2 : 1)
        },
        _intersectsWithSides: function(e) {
            var t = n(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                r = n(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                i = this._getDragVerticalDirection(),
                s = this._getDragHorizontalDirection();
            if (this.floating && s) {
                return s === "right" && r || s === "left" && !r
            } else {
                return i && (i === "down" && t || i === "up" && !t)
            }
        },
        _getDragVerticalDirection: function() {
            var e = this.positionAbs.top - this.lastPositionAbs.top;
            return e !== 0 && (e > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var e = this.positionAbs.left - this.lastPositionAbs.left;
            return e !== 0 && (e > 0 ? "right" : "left")
        },
        refresh: function(e) {
            this._refreshItems(e);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var e = this.options;
            return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith
        },
        _getItemsAsjQuery: function(t) {
            function f() {
                o.push(this)
            }
            var n, r, i, s, o = [],
                u = [],
                a = this._connectWith();
            if (a && t) {
                for (n = a.length - 1; n >= 0; n--) {
                    i = e(a[n]);
                    for (r = i.length - 1; r >= 0; r--) {
                        s = e.data(i[r], this.widgetFullName);
                        if (s && s !== this && !s.options.disabled) {
                            u.push([e.isFunction(s.options.items) ? s.options.items.call(s.element) : e(s.options.items, s.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), s])
                        }
                    }
                }
            }
            u.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (n = u.length - 1; n >= 0; n--) {
                u[n][0].each(f)
            }
            return e(o)
        },
        _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = e.grep(this.items, function(e) {
                for (var n = 0; n < t.length; n++) {
                    if (t[n] === e.item[0]) {
                        return false
                    }
                }
                return true
            })
        },
        _refreshItems: function(t) {
            this.items = [];
            this.containers = [this];
            var n, r, i, s, o, u, a, f, l = this.items,
                c = [
                    [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                        item: this.currentItem
                    }) : e(this.options.items, this.element), this]
                ],
                h = this._connectWith();
            if (h && this.ready) {
                for (n = h.length - 1; n >= 0; n--) {
                    i = e(h[n]);
                    for (r = i.length - 1; r >= 0; r--) {
                        s = e.data(i[r], this.widgetFullName);
                        if (s && s !== this && !s.options.disabled) {
                            c.push([e.isFunction(s.options.items) ? s.options.items.call(s.element[0], t, {
                                item: this.currentItem
                            }) : e(s.options.items, s.element), s]);
                            this.containers.push(s)
                        }
                    }
                }
            }
            for (n = c.length - 1; n >= 0; n--) {
                o = c[n][1];
                u = c[n][0];
                for (r = 0, f = u.length; r < f; r++) {
                    a = e(u[r]);
                    a.data(this.widgetName + "-item", o);
                    l.push({
                        item: a,
                        instance: o,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(t) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            var n, r, i, s;
            for (n = this.items.length - 1; n >= 0; n--) {
                r = this.items[n];
                if (r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0]) {
                    continue
                }
                i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item;
                if (!t) {
                    r.width = i.outerWidth();
                    r.height = i.outerHeight()
                }
                s = i.offset();
                r.left = s.left;
                r.top = s.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (n = this.containers.length - 1; n >= 0; n--) {
                    s = this.containers[n].element.offset();
                    this.containers[n].containerCache.left = s.left;
                    this.containers[n].containerCache.top = s.top;
                    this.containers[n].containerCache.width = this.containers[n].element.outerWidth();
                    this.containers[n].containerCache.height = this.containers[n].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function(t) {
            t = t || this;
            var n, r = t.options;
            if (!r.placeholder || r.placeholder.constructor === String) {
                n = r.placeholder;
                r.placeholder = {
                    element: function() {
                        var r = t.currentItem[0].nodeName.toLowerCase(),
                            i = e("<" + r + ">", t.document[0]).addClass(n || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        if (r === "tr") {
                            t.currentItem.children().each(function() {
                                e("<td>&#160;</td>", t.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(i)
                            })
                        } else if (r === "img") {
                            i.attr("src", t.currentItem.attr("src"))
                        }
                        if (!n) {
                            i.css("visibility", "hidden")
                        }
                        return i
                    },
                    update: function(e, i) {
                        if (n && !r.forcePlaceholderSize) {
                            return
                        }
                        if (!i.height()) {
                            i.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!i.width()) {
                            i.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            t.placeholder = e(r.placeholder.element.call(t.element, t.currentItem));
            t.currentItem.after(t.placeholder);
            r.placeholder.update(t, t.placeholder)
        },
        _contactContainers: function(t) {
            var i, s, o, u, a, f, l, c, h, p, d = null,
                v = null;
            for (i = this.containers.length - 1; i >= 0; i--) {
                if (e.contains(this.currentItem[0], this.containers[i].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[i].containerCache)) {
                    if (d && e.contains(this.containers[i].element[0], d.element[0])) {
                        continue
                    }
                    d = this.containers[i];
                    v = i
                } else {
                    if (this.containers[i].containerCache.over) {
                        this.containers[i]._trigger("out", t, this._uiHash(this));
                        this.containers[i].containerCache.over = 0
                    }
                }
            }
            if (!d) {
                return
            }
            if (this.containers.length === 1) {
                if (!this.containers[v].containerCache.over) {
                    this.containers[v]._trigger("over", t, this._uiHash(this));
                    this.containers[v].containerCache.over = 1
                }
            } else {
                o = 1e4;
                u = null;
                p = d.floating || r(this.currentItem);
                a = p ? "left" : "top";
                f = p ? "width" : "height";
                l = this.positionAbs[a] + this.offset.click[a];
                for (s = this.items.length - 1; s >= 0; s--) {
                    if (!e.contains(this.containers[v].element[0], this.items[s].item[0])) {
                        continue
                    }
                    if (this.items[s].item[0] === this.currentItem[0]) {
                        continue
                    }
                    if (p && !n(this.positionAbs.top + this.offset.click.top, this.items[s].top, this.items[s].height)) {
                        continue
                    }
                    c = this.items[s].item.offset()[a];
                    h = false;
                    if (Math.abs(c - l) > Math.abs(c + this.items[s][f] - l)) {
                        h = true;
                        c += this.items[s][f]
                    }
                    if (Math.abs(c - l) < o) {
                        o = Math.abs(c - l);
                        u = this.items[s];
                        this.direction = h ? "up" : "down"
                    }
                }
                if (!u && !this.options.dropOnEmpty) {
                    return
                }
                if (this.currentContainer === this.containers[v]) {
                    return
                }
                u ? this._rearrange(t, u, null, true) : this._rearrange(t, null, this.containers[v].element, true);
                this._trigger("change", t, this._uiHash());
                this.containers[v]._trigger("change", t, this._uiHash(this));
                this.currentContainer = this.containers[v];
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[v]._trigger("over", t, this._uiHash(this));
                this.containers[v].containerCache.over = 1
            }
        },
        _createHelper: function(t) {
            var n = this.options,
                r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper === "clone" ? this.currentItem.clone() : this.currentItem;
            if (!r.parents("body").length) {
                e(n.appendTo !== "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(r[0])
            }
            if (r[0] === this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (!r[0].style.width || n.forceHelperSize) {
                r.width(this.currentItem.width())
            }
            if (!r[0].style.height || n.forceHelperSize) {
                r.height(this.currentItem.height())
            }
            return r
        },
        _adjustOffsetFromHelper: function(t) {
            if (typeof t === "string") {
                t = t.split(" ")
            }
            if (e.isArray(t)) {
                t = {
                    left: +t[0],
                    top: +t[1] || 0
                }
            }
            if ("left" in t) {
                this.offset.click.left = t.left + this.margins.left
            }
            if ("right" in t) {
                this.offset.click.left = this.helperProportions.width - t.right + this.margins.left
            }
            if ("top" in t) {
                this.offset.click.top = t.top + this.margins.top
            }
            if ("bottom" in t) {
                this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0])) {
                t.left += this.scrollParent.scrollLeft();
                t.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && e.ui.ie) {
                t = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var e = this.currentItem.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, n, r, i = this.options;
            if (i.containment === "parent") {
                i.containment = this.helper[0].parentNode
            }
            if (i.containment === "document" || i.containment === "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(i.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(i.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!/^(document|window|parent)$/.test(i.containment)) {
                t = e(i.containment)[0];
                n = e(i.containment).offset();
                r = e(t).css("overflow") !== "hidden";
                this.containment = [n.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, n.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, n.left + (r ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, n.top + (r ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(t, n) {
            if (!n) {
                n = this.position
            }
            var r = t === "absolute" ? 1 : -1,
                i = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                s = /(html|body)/i.test(i[0].tagName);
            return {
                top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : i.scrollTop()) * r,
                left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : i.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var n, r, i = this.options,
                s = t.pageX,
                o = t.pageY,
                u = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                a = /(html|body)/i.test(u[0].tagName);
            if (this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            if (this.originalPosition) {
                if (this.containment) {
                    if (t.pageX - this.offset.click.left < this.containment[0]) {
                        s = this.containment[0] + this.offset.click.left
                    }
                    if (t.pageY - this.offset.click.top < this.containment[1]) {
                        o = this.containment[1] + this.offset.click.top
                    }
                    if (t.pageX - this.offset.click.left > this.containment[2]) {
                        s = this.containment[2] + this.offset.click.left
                    }
                    if (t.pageY - this.offset.click.top > this.containment[3]) {
                        o = this.containment[3] + this.offset.click.top
                    }
                }
                if (i.grid) {
                    n = this.originalPageY + Math.round((o - this.originalPageY) / i.grid[1]) * i.grid[1];
                    o = this.containment ? n - this.offset.click.top >= this.containment[1] && n - this.offset.click.top <= this.containment[3] ? n : n - this.offset.click.top >= this.containment[1] ? n - i.grid[1] : n + i.grid[1] : n;
                    r = this.originalPageX + Math.round((s - this.originalPageX) / i.grid[0]) * i.grid[0];
                    s = this.containment ? r - this.offset.click.left >= this.containment[0] && r - this.offset.click.left <= this.containment[2] ? r : r - this.offset.click.left >= this.containment[0] ? r - i.grid[0] : r + i.grid[0] : r
                }
            }
            return {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : a ? 0 : u.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : a ? 0 : u.scrollLeft())
            }
        },
        _rearrange: function(e, t, n, r) {
            n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? t.item[0] : t.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var i = this.counter;
            this._delay(function() {
                if (i === this.counter) {
                    this.refreshPositions(!r)
                }
            })
        },
        _clear: function(e, t) {
            function i(e, t, n) {
                return function(r) {
                    n._trigger(e, r, t._uiHash(t))
                }
            }
            this.reverting = false;
            var n, r = [];
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (n in this._storedCSS) {
                    if (this._storedCSS[n] === "auto" || this._storedCSS[n] === "static") {
                        this._storedCSS[n] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !t) {
                r.push(function(e) {
                    this._trigger("receive", e, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !t) {
                r.push(function(e) {
                    this._trigger("update", e, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!t) {
                    r.push(function(e) {
                        this._trigger("remove", e, this._uiHash())
                    });
                    r.push(function(e) {
                        return function(t) {
                            e._trigger("receive", t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer));
                    r.push(function(e) {
                        return function(t) {
                            e._trigger("update", t, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer))
                }
            }
            for (n = this.containers.length - 1; n >= 0; n--) {
                if (!t) {
                    r.push(i("deactivate", this, this.containers[n]))
                }
                if (this.containers[n].containerCache.over) {
                    r.push(i("out", this, this.containers[n]));
                    this.containers[n].containerCache.over = 0
                }
            }
            if (this.storedCursor) {
                this.document.find("body").css("cursor", this.storedCursor);
                this.storedStylesheet.remove()
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!t) {
                    this._trigger("beforeStop", e, this._uiHash());
                    for (n = 0; n < r.length; n++) {
                        r[n].call(this, e)
                    }
                    this._trigger("stop", e, this._uiHash())
                }
                this.fromOutside = false;
                return false
            }
            if (!t) {
                this._trigger("beforeStop", e, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] !== this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!t) {
                for (n = 0; n < r.length; n++) {
                    r[n].call(this, e)
                }
                this._trigger("stop", e, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            if (e.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function(t) {
            var n = t || this;
            return {
                helper: n.helper,
                placeholder: n.placeholder || e([]),
                position: n.position,
                originalPosition: n.originalPosition,
                offset: n.positionAbs,
                item: n.currentItem,
                sender: t ? t.element : null
            }
        }
    })
})(jQuery);
(function(b){
	function c(b){b=f.match(b);if(null==b||0==b.length) return 0;b=b[0];var c=b.indexOf("/");b=b.substring(c+1,b.length);return ""==b?0:parseInt(b)}
	function d(b){b=f.match(b);if(null==b||0==b.length) return 0;b=b[0].replace("_",".").match(/\d+\.?\d?/);if(null==b||0==b.length) return 0;b=b[0];return ""==b?0:parseFloat(b)}
	var f=navigator.userAgent.toLowerCase();
	b.browser={};
	b.browser.webkit=/webkit/.test(f);
	b.browser.mozilla=/firefox/.test(f);
	b.browser.firefox=b.browser.mozilla;
	b.browser.msie=/msie/.test(f)||/trident/.test(f);
	b.browser.opera=/opera/.test(f)||/opr/.test(f);
	b.browser.chrome=/chrome/.test(f)&&!b.browser.opera;
	b.browser.uc=/ucbrowser/.test(f);
	b.browser.safari=/safari/.test(f)&&!b.browser.chrome&&!b.browser.uc;
	b.browser.version=0;
	b.browser.firefox&&(b.browser.version=c(/firefox\/\d+/));
	if(b.browser.msie){
		var g=f.match(/msie\s?\d+\.0/);
		null==g?(g=f.match(/trident\/\d+\.0/),null!=g&&0<g.length&&(g=parseInt(g[0].replace("trident/","")),b.browser.version=g+4)):(g=parseInt(g[0].replace("msie","")),b.browser.version=g)
	}
	b.browser.opera&&(b.browser.version=c(/opera\/\d+/)||c(/opr\/\d+/));
	b.browser.chrome&&(b.browser.version=c(/chrome\/\d+/));
	b.browser.uc&&(b.browser.version=c(/ucbrowser\/\d+/));
	b.browser.safari&&(b.browser.version=c(/safari\/\d+/));
	if(void 0==b.browser.device){
		b.browser.DEVICE_PC=0;
		b.browser.DEVICE_PAD=1;
		b.browser.DEVICE_PHONE=2;
		var g=/pad/.test(f)||/ipod/.test(f),
			h=/iphone/.test(f),
			k=/wpdesktop/.test(f)||/windows phone/.test(f),
			l=/blackberry/.test(f),
			m=/mobile/.test(f)||/phone/.test(f);
		b.browser.device=b.browser.DEVICE_PC;
		if(g) b.browser.device=b.browser.DEVICE_PAD;
		else if(h||k||l||m) b.browser.device=b.browser.DEVICE_PHONE
	}
	void 0==b.browser.prefix&&(b.browser.prefix="",!0==b.browser.webkit&&(b.browser.prefix="-webkit-"),!0==b.browser.mozilla&&(b.browser.prefix="-moz-"),!0==b.browser.opera&&(b.browser.prefix="-webkit-"),!0==b.browser.uc&&(b.browser.prefix="-webkit-"),!0==b.browser.msie&&(b.browser.prefix="-ms-"));
	if(void 0==b.system){
		b.system={name:"",version:0};
		b.system.WINDOWS="Windows";
		b.system.WP="WinPhone";
		b.system.WP_DESKTOP="WinPhoneDesktop";
		b.system.MAC="Mac OS";
		b.system.IOS="iPhone OS";
		b.system.LINUX="Linux";
		b.system.ANDROID="Android";
		b.system.BLACKBERRY="BlackBerry";
		/windows/.test(f)&&(b.system.name=b.system.WINDOWS,b.system.version=d(/windows nt\s?\d+\.?\d?/));
		/windows phone/.test(f)&&(b.system.name=b.system.WP,b.system.version=d(/windows phone\s?\d+\.?\d?/));
		/wpdesktop/.test(f)&&(b.system.name=b.system.WP_DESKTOP,b.system.version=d(/wpdesktop\s?\d+\.?\d?/));
		if(b.system.name!=b.system.WP){if(/iphone/.test(f)||/ipad/.test(f)) b.system.name=b.system.IOS,b.system.version=d(/os\s?\d+_?\d?/);/android/.test(f)&&(b.system.name=b.system.ANDROID,b.system.version=d(/android\s?\d+\.?\d?/))}
		/mac/.test(f)&&b.browser.system!=b.browser.IOS&&(b.system.name=b.system.MAC,b.system.version=d(/os x\s?\d+\.?\d?/));
		/linux/.test(f)&&!/android/.test(f)&&(b.system.name=b.system.LINUX);
		/blackberry/.test(f)&&(b.system.name=b.system.BLACKBERRY,b.system.version=d(/blackberry\s?\d+/))
	}
})(jQuery);
function pkn(b){if(void 0==b||""==b) return window;var c=window;b=b.split(".");for(var d=0;d<b.length;d++){var f=b[d];c[f]||(c[f]={pObj:!0});c=c[f]} return c}function cln(b){if(b.indexOf(".")==-1) return window[b];var c=b.split(".");b=c.pop();c=c.join(".");return pkn(c)[b]}function classof(b,c){if(!b) return "";c||(c=window);"string"==typeof c&&(c=pkn(c));for(var d in c)if(c[d] instanceof Function) try{if(b instanceof c[d]) return d} catch(f){}for(d in c)if("object"==typeof c[d]&&c[d].pObj){var g=classof(b,c[d]);if(""!=g) return d+"."+g}return ""}function Class(b,c){if("string"===typeof b){var d=c,f=pkn(d.Package);f[b]=Class(d);return f[b]}d=function(){if(this.Import){"string"==typeof this.Import&&(this.Import=[this.Import]);for(var b=0;b<this.Import.length;b++){var c=this.Import[b],d=pkn(c);if(d instanceof Function) this[c.split(".").pop()]=d;else for(var f in d) d[f] instanceof Function&&(this[f]=d[f])}}d=pkn(this.Package);if(d!=window) for(f in d) this.cls()!=f&&d[f] instanceof Function&&(this[f]=d[f]);this.create&&this.create instanceof Function&&this.create.apply(this,arguments)};d.prototype=b||{};d.prototype.cls=function(){return classof(this,this.Package)};d.prototype.getClass=function(){var b=this.cls();return pkn(this.Package)[b]};f=d.prototype.statics;if(void 0!=f){for(var g in f) void 0==d[g]&&(d[g]=f[g]);delete d.prototype.statics}return d};Function.prototype.extend=function(b){if(!b) return this;if("string"==typeof b){if(-1<b.indexOf(".")){if(b=cln(b),!b) return this}else{var c=this.prototype.Package,d=b,f=b;c&&""!=c&&(f=c+"."+d);if(c=cln(f)) b=c;else if(c=cln(d)) b=c;else return this}}if(b instanceof Function){for(var g in b) void 0==this[g]&&(this[g]=b[g]);for(g in b.prototype) void 0==this.prototype[g]?b.prototype[g]==fn?console&&console.error&&console.error("virtual function [%s] must be override.",g):this.prototype[g]=b.prototype[g]:(d=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/,this.prototype[g] instanceof Function&&b.prototype[g] instanceof Function&&d.test(this.prototype[g])&&(this.prototype[g]=function(c,d){return function(){var f=this._super;this._super=b.prototype[c];var g=d.apply(this,arguments);this._super=f;return g}}(g,this.prototype[g])));if(b.prototype.Import) for(this.prototype.Import||(this.prototype.Import=[]),g=b.prototype.Import,d=0;d<g.length;d++) this.prototype.Import.push(g[d]);b.prototype.Package&&this.prototype.Package!=b.prototype.Package&&(this.prototype.Import||(this.prototype.Import=[]),this.prototype.Import.push(b.prototype.Package));return this}return "object"!==typeof b?this:this.extend(Class(b))};Function.prototype.expand=function(b,c){if("object"===typeof b) if(void 0==c&&(c=!1),c!==0) for(var d in b) this.prototype[d]=b[d];else this.extend(Class(b))};var Instance={copy:function(b){if(!b) return null;var c={};b instanceof Array&&(c=[]);for(p in b) c[p]="object"==typeof b[p]?Instance.copy(b[p]):b[p];return c},create:function(b,c){c||(c=[]);var d=b;"string"==typeof b&&(d=cln(d));if(!d) return null;var f=d.prototype.create;d.prototype.create=function(){};var g=new d;d.prototype.create=f;g.create&&g.create instanceof Function&&g.create.apply(g,c);return g},JSON:function(b){if(void 0==b||null==b) return b;if(b instanceof Array){for(var c="[",d=0;d<b.length;d++) c=c+Instance.JSON(b[d])+",";1<c.length&&(c=c.substr(0,c.length-2));return c+"]"}if(b instanceof Function) return b;if("string"===typeof b) return '"'+b.toString()+'"';if("number"===typeof b) return Number(b).toString();if("boolean"===typeof b) return Boolean(b).toString();if("object"===typeof b){c="{";for(d in b) s='"'+d+'":'+Instance.JSON(b[d])+",",c+=s;1<c.length&&(c=c.substr(0,c.length-2));return c+="}"}},parse:function(b,c){return b&&"undefined"!=b&&"null"!=b&&""!=b?eval("("+b+")"):c}};Object.create=Object.create||function(){function b(){}return function(c){if(1!=arguments.length) throw Error("");b.prototype=c;return new b}}();Object.keys=Object.keys||function(b){if(b!==Object(b)) throw new TypeError("");var c=[],d;for(d in b) Object.prototype.hasOwnProperty.call(b,d)&&c.push(d);return c};(function(){for(var b=0,c=["webkit","moz"],d=0;d<c.length&&!window.requestAnimationFrame;++d) window.requestAnimationFrame=window[c[d]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[c[d]+"CancelAnimationFrame"]||window[c[d]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(c){var d=(new Date).getTime(),h=Math.max(0,16.7-(d-b)),k=window.setTimeout(function(){c(d+h)},h);b=d+h;return k});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(b){clearTimeout(b)});var b={supportsFullScreen:!1,isFullScreen:function(){return!1},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"-",pre:""},c=["webkit","moz","o","ms"];if("undefined"!=typeof document.exitFullscreen) b.supportsFullScreen=!0;else if("undefined"!=typeof document.cancelFullScreen) b.supportsFullScreen=!0;else for(var d=0,f=c.length;d<f;d++) if(b.pre=c[d],"undefined"!=typeof document[b.pre+"CancelFullScreen"]){b.supportsFullScreen=!0;break}b.supportsFullScreen&&(b.fullScreenEventName=b.pre+"fullscreenchange",b.isFullScreen=function(){switch(this.pre){case "":return document.fullScreen;case "webkit":return document.webkitIsFullScreen;default:return document[this.pre+"FullScreen"]}},b.requestFullScreen=function(b){b[this.pre+"RequestFullScreen"]()},b.cancelFullScreen=function(b){return ""===this.pre?document.cancelFullScreen():document[this.pre+"CancelFullScreen"]()});window.fsfn=b})();Function.expand({bind:function(b){var c=this;return function(){return c.apply(b,arguments)}},delay:function(b,c,d){"object"!==typeof b&&(d=c,c=b,b={});c=c||1;d=d||[];return setTimeout(function(){this.apply(b,d)}.bind(this),c)},interval:function(b,c,d){"object"!==typeof b&&(d=c,c=b,b={});c=c||1;d=d||[];var f=this;return{intervalId:setInterval(function(){this.apply(b,d)}.bind(this),c),stop:function(){clearInterval(this.intervalId);this.intervalId=void 0},isRunning:function(){return void 0!=this.intervalId},start:function(){this.intervalId=setInterval(function(){f.apply(b,d)},c)}}},runInAnimate:function(b,c){"object"!==typeof b&&(c=b,b={});var d={stopFlag:!1,stop:function(){this.stopFlag=!0}},f=this,g=0,h=Math.ceil(c/16.7),k=function(){g++;!1!==f.apply(b,[g,h])&&!0!==d.stopFlag&&(g<h||void 0==c)&&window.requestAnimationFrame(k)};k();return d},executeOnce:function(){this.executed||(this.executed=!1);this.executed||(this(),this.executed=!0)}});