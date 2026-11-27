/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, gt = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), Bt = /* @__PURE__ */ new WeakMap();
let Xt = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Bt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Bt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const se = (i) => new Xt(typeof i == "string" ? i : i + "", void 0, bt), k = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((o, s, n) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[n + 1], i[0]);
  return new Xt(e, i, bt);
}, re = (i, t) => {
  if (gt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), s = et.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = e.cssText, i.appendChild(o);
  }
}, Dt = gt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return se(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ne, defineProperty: ae, getOwnPropertyDescriptor: le, getOwnPropertyNames: ce, getOwnPropertySymbols: de, getPrototypeOf: ue } = Object, x = globalThis, zt = x.trustedTypes, he = zt ? zt.emptyScript : "", lt = x.reactiveElementPolyfillSupport, W = (i, t) => i, it = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? he : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, vt = (i, t) => !ne(i, t), Ht = { attribute: !0, type: String, converter: it, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(t, o, e);
      s !== void 0 && ae(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: s, set: n } = le(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = ue(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const e = this.properties, o = [...ce(e), ...de(e)];
      for (const s of o) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, s] of e) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const s = this._$Eu(e, o);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const s of o) e.unshift(Dt(s));
    } else t !== void 0 && e.push(Dt(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return re(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostConnected) == null ? void 0 : o.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostDisconnected) == null ? void 0 : o.call(e);
    });
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$ET(t, e) {
    var n;
    const o = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, o);
    if (s !== void 0 && o.reflect === !0) {
      const r = (((n = o.converter) == null ? void 0 : n.toAttribute) !== void 0 ? o.converter : it).toAttribute(e, o.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const o = this.constructor, s = o._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = o.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : it;
      this._$Em = s;
      const c = l.fromAttribute(e, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, s = !1, n) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (n = this[t]), o ?? (o = a.getPropertyOptions(t)), !((o.hasChanged ?? vt)(n, e) || o.useDefault && o.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: s, wrapped: n }, r) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: a } = r, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (o = this._$EO) == null || o.forEach((s) => {
        var n;
        return (n = s.hostUpdate) == null ? void 0 : n.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((o) => {
      var s;
      return (s = o.hostUpdated) == null ? void 0 : s.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[W("elementProperties")] = /* @__PURE__ */ new Map(), H[W("finalized")] = /* @__PURE__ */ new Map(), lt == null || lt({ ReactiveElement: H }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, Rt = (i) => i, ot = Z.trustedTypes, Ut = ot ? ot.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Yt = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Kt = "?" + w, pe = `<${Kt}>`, B = document, G = () => B.createComment(""), J = (i) => i === null || typeof i != "object" && typeof i != "function", yt = Array.isArray, me = (i) => yt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", ct = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jt = /-->/g, Nt = />/g, P = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, Vt = /"/g, Qt = /^(?:script|style|textarea|title)$/i, fe = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), d = fe(1), D = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Ft = /* @__PURE__ */ new WeakMap(), O = B.createTreeWalker(B, 129);
function te(i, t) {
  if (!yt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ut !== void 0 ? Ut.createHTML(t) : t;
}
const ge = (i, t) => {
  const e = i.length - 1, o = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = F;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let c, p, h = -1, m = 0;
    for (; m < l.length && (r.lastIndex = m, p = r.exec(l), p !== null); ) m = r.lastIndex, r === F ? p[1] === "!--" ? r = jt : p[1] !== void 0 ? r = Nt : p[2] !== void 0 ? (Qt.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = P) : p[3] !== void 0 && (r = P) : r === P ? p[0] === ">" ? (r = s ?? F, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? P : p[3] === '"' ? Vt : Lt) : r === Vt || r === Lt ? r = P : r === jt || r === Nt ? r = F : (r = P, s = void 0);
    const y = r === P && i[a + 1].startsWith("/>") ? " " : "";
    n += r === F ? l + pe : h >= 0 ? (o.push(c), l.slice(0, h) + Yt + l.slice(h) + w + y) : l + w + (h === -2 ? a : y);
  }
  return [te(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class X {
  constructor({ strings: t, _$litType$: e }, o) {
    let s;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, p] = ge(t, e);
    if (this.el = X.createElement(c, o), O.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = O.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Yt)) {
          const m = p[r++], y = s.getAttribute(h).split(w), S = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: S[2], strings: y, ctor: S[1] === "." ? ve : S[1] === "?" ? ye : S[1] === "@" ? $e : rt }), s.removeAttribute(h);
        } else h.startsWith(w) && (l.push({ type: 6, index: n }), s.removeAttribute(h));
        if (Qt.test(s.tagName)) {
          const h = s.textContent.split(w), m = h.length - 1;
          if (m > 0) {
            s.textContent = ot ? ot.emptyScript : "";
            for (let y = 0; y < m; y++) s.append(h[y], G()), O.nextNode(), l.push({ type: 2, index: ++n });
            s.append(h[m], G());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Kt) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(w, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += w.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const o = B.createElement("template");
    return o.innerHTML = t, o;
  }
}
function R(i, t, e = i, o) {
  var r, a;
  if (t === D) return t;
  let s = o !== void 0 ? (r = e._$Co) == null ? void 0 : r[o] : e._$Cl;
  const n = J(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== n && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), n === void 0 ? s = void 0 : (s = new n(i), s._$AT(i, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = s : e._$Cl = s), s !== void 0 && (t = R(i, s._$AS(i, t.values), s, o)), t;
}
class be {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: o } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? B).importNode(e, !0);
    O.currentNode = s;
    let n = O.nextNode(), r = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new K(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new _e(n, this, t)), this._$AV.push(c), l = o[++a];
      }
      r !== (l == null ? void 0 : l.index) && (n = O.nextNode(), r++);
    }
    return O.currentNode = B, s;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class K {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, o, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = R(this, t, e), J(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== D && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : me(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(B.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: o } = t, s = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = X.createElement(te(o.h, o.h[0]), this.options)), o);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === s) this._$AH.p(e);
    else {
      const r = new be(s, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ft.get(t.strings);
    return e === void 0 && Ft.set(t.strings, e = new X(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, s = 0;
    for (const n of t) s === e.length ? e.push(o = new K(this.O(G()), this.O(G()), this, this.options)) : o = e[s], o._$AI(n), s++;
    s < e.length && (this._$AR(o && o._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = Rt(t).nextSibling;
      Rt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, s, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = u;
  }
  _$AI(t, e = this, o, s) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = R(this, t, e, 0), r = !J(t) || t !== this._$AH && t !== D, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = R(this, a[o + l], e, l), c === D && (c = this._$AH[l]), r || (r = !J(c) || c !== this._$AH[l]), c === u ? t = u : t !== u && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ve extends rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ye extends rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class $e extends rt {
  constructor(t, e, o, s, n) {
    super(t, e, o, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? u) === D) return;
    const o = this._$AH, s = t === u && o !== u || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== u && (o === u || s);
    s && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _e {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const dt = Z.litHtmlPolyfillSupport;
dt == null || dt(X, K), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.3");
const we = (i, t, e) => {
  const o = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = o._$litPart$;
  if (s === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    o._$litPart$ = s = new K(t.insertBefore(G(), n), n, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis;
let b = class extends H {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = we(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return D;
  }
};
var Jt;
b._$litElement$ = !0, b.finalized = !0, (Jt = M.litElementHydrateSupport) == null || Jt.call(M, { LitElement: b });
const ut = M.litElementPolyfillSupport;
ut == null || ut({ LitElement: b });
(M.litElementVersions ?? (M.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = { attribute: !0, type: String, converter: it, reflect: !1, hasChanged: vt }, Ae = (i = xe, t, e) => {
  const { kind: o, metadata: s } = e;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), o === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), o === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, i, a), a;
    } };
  }
  if (o === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function f(i) {
  return (t, e) => typeof e == "object" ? Ae(i, t, e) : ((o, s, n) => {
    const r = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, o), r ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(i) {
  return f({ ...i, state: !0, attribute: !1 });
}
const ee = "android-tv-grid-remote", ie = "android-tv-grid-remote-editor", Wt = {
  VOLUME_SET: 4,
  VOLUME_MUTE: 8
}, I = {
  touch_pad: {
    id: "touch_pad",
    label: "Touch Pad",
    kind: "widget",
    defaultColumns: 2,
    isHorizontalBar: !1,
    icon: "mdi:gamepad-circle"
  },
  volume: {
    id: "volume",
    label: "Volume Control",
    kind: "widget",
    defaultColumns: 4,
    isHorizontalBar: !0,
    icon: "mdi:volume-high"
  },
  media_controls: {
    id: "media_controls",
    label: "Media Controls",
    kind: "widget",
    defaultColumns: 4,
    isHorizontalBar: !0,
    icon: "mdi:play-pause"
  },
  now_playing: {
    id: "now_playing",
    label: "Now Playing",
    kind: "widget",
    defaultColumns: 4,
    isHorizontalBar: !0,
    icon: "mdi:television-play"
  },
  power: {
    id: "power",
    label: "Power",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:power",
    remoteCommand: "POWER"
  },
  home: {
    id: "home",
    label: "Home",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:home",
    remoteCommand: "HOME"
  },
  back: {
    id: "back",
    label: "Back",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:arrow-left",
    remoteCommand: "BACK"
  },
  menu: {
    id: "menu",
    label: "Menu",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:menu",
    remoteCommand: "MENU"
  },
  up: {
    id: "up",
    label: "D-Pad Up",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:chevron-up",
    remoteCommand: "DPAD_UP"
  },
  down: {
    id: "down",
    label: "D-Pad Down",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:chevron-down",
    remoteCommand: "DPAD_DOWN"
  },
  left: {
    id: "left",
    label: "D-Pad Left",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:chevron-left",
    remoteCommand: "DPAD_LEFT"
  },
  right: {
    id: "right",
    label: "D-Pad Right",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:chevron-right",
    remoteCommand: "DPAD_RIGHT"
  },
  center: {
    id: "center",
    label: "D-Pad OK",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:circle-outline",
    remoteCommand: "DPAD_CENTER"
  },
  keyboard: {
    id: "keyboard",
    label: "Keyboard Input",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:keyboard"
  },
  source_select: {
    id: "source_select",
    label: "Source / App Selector",
    kind: "button",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:import"
  },
  spacer: {
    id: "spacer",
    label: "Spacer (Transparent)",
    kind: "spacer",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:border-none-variant"
  },
  // Streaming app presets (launch via remote.turn_on activity by default)
  youtube: {
    id: "youtube",
    label: "YouTube",
    kind: "app",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:youtube",
    appActivity: "https://www.youtube.com",
    defaultColor: "#ff0000"
  },
  netflix: {
    id: "netflix",
    label: "Netflix",
    kind: "app",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:netflix",
    appActivity: "https://www.netflix.com/title",
    defaultColor: "#e50914"
  },
  disney_plus: {
    id: "disney_plus",
    label: "Disney+",
    kind: "app",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M9 21.5C15.5 13 27 11.5 34.5 16.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M11 26.5h6.2c4.4 0 7.3 2.5 7.3 6.2 0 3.8-2.9 6.3-7.3 6.3H11V26.5zm3.4 2.8v6.9h2.7c2.5 0 4-1.3 4-3.4 0-2.2-1.5-3.5-4-3.5h-2.7z" fill="currentColor"/><path d="M31.5 27.5v3.6H28v2.7h3.5v3.6h2.8v-3.6h3.5v-2.7h-3.5v-3.6h-2.8z" fill="currentColor"/></svg>',
    appActivity: "https://www.disneyplus.com",
    defaultColor: "#0072d2"
  },
  prime_video: {
    id: "prime_video",
    label: "Prime Video",
    kind: "app",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><text x="24" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="13" fill="currentColor">prime</text><path d="M11 31c7.5 4.8 18.5 4.8 26 0" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M33.5 29.2l4.2 1.2-1.5 4.1" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    appActivity: "https://app.primevideo.com",
    defaultColor: "#00a8e1"
  },
  plex: {
    id: "plex",
    label: "Plex",
    kind: "app",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:plex",
    appActivity: "plex://",
    defaultColor: "#e5a00d"
  },
  spotify: {
    id: "spotify",
    label: "Spotify",
    kind: "app",
    defaultColumns: 1,
    isHorizontalBar: !1,
    icon: "mdi:spotify",
    appActivity: "spotify://",
    defaultColor: "#1db954"
  }
}, $ = {
  columns: 3,
  align: "top",
  volume_mode: "auto",
  elements: [
    { id: "spacer", columns: 1 },
    { id: "spacer", columns: 1 },
    { id: "power", columns: 1 },
    { id: "touch_pad", columns: 3 },
    { id: "volume", columns: 3 },
    { id: "back", columns: 1 },
    { id: "home", columns: 1 },
    { id: "source_select", columns: 1 },
    { id: "youtube", columns: 1 },
    { id: "netflix", columns: 1 },
    { id: "disney_plus", columns: 1 }
  ],
  custom_buttons: []
}, Ee = /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/;
function Ce(i) {
  return typeof i == "string" && Ee.test(i);
}
async function ke(i, t, e) {
  return new Promise((o, s) => {
    let n = !1, r;
    const a = () => {
      if (r) {
        const c = r;
        r = void 0, Promise.resolve(c()).catch(() => {
        });
      }
    }, l = window.setTimeout(() => {
      n || (n = !0, a(), s(new Error(`Template render timed out: ${t}`)));
    }, 5e3);
    i.connection.subscribeMessage(
      (c) => {
        n || (n = !0, window.clearTimeout(l), a(), c.error ? s(new Error(c.error)) : o(c.result));
      },
      {
        type: "render_template",
        template: t,
        ...e ? { variables: e } : {}
      }
    ).then((c) => {
      n ? Promise.resolve(c()).catch(() => {
      }) : r = c;
    }).catch((c) => {
      n || (n = !0, window.clearTimeout(l), s(c));
    });
  });
}
async function st(i, t, e) {
  if (Ce(t))
    return ke(i, t, e);
  if (Array.isArray(t))
    return Promise.all(t.map((o) => st(i, o, e)));
  if (t !== null && typeof t == "object") {
    const o = await Promise.all(
      Object.entries(t).map(async ([s, n]) => [
        s,
        await st(i, n, e)
      ])
    );
    return Object.fromEntries(o);
  }
  return t;
}
function mt(i, t, e) {
  i.dispatchEvent(
    new CustomEvent(t, {
      bubbles: !0,
      composed: !0,
      detail: e
    })
  );
}
async function q(i, t, e, o) {
  if (!t) return;
  const s = { command: e };
  o !== void 0 && o > 0 && (s.hold_secs = o), await i.callService(
    "remote",
    "send_command",
    s,
    { entity_id: t }
  );
}
async function oe(i, t, e) {
  t && await i.callService(
    "remote",
    "turn_on",
    { activity: e },
    { entity_id: t }
  );
}
function ht(i, t) {
  if (t === "tap" && i.tap_action) return i.tap_action;
  if (t === "hold" && i.hold_action) return i.hold_action;
  if (t === "double_tap" && i.double_tap_action) return i.double_tap_action;
  if (t === "tap" && i.action)
    return {
      action: "perform-action",
      perform_action: i.action,
      target: i.target,
      data: i.data
    };
}
async function tt(i, t, e, o) {
  if (!e || e.action === "none") return;
  const s = o.entity || o.remoteEntity, n = {
    remote_entity: o.remoteEntity,
    entity: o.entity,
    volume_entity: o.volumeEntity || o.entity
  };
  switch (e.action) {
    case "perform-action":
    case "call-service": {
      const r = e.perform_action || e.service;
      if (!r || !r.includes(".")) return;
      const [a, l] = r.split(".", 2), c = e.data ?? e.service_data, p = c ? await st(t, c, n) : void 0, h = e.target ? await st(t, e.target, n) : void 0;
      await t.callService(a, l, p, h);
      break;
    }
    case "more-info": {
      const r = e.entity || s;
      r && mt(i, "hass-more-info", { entityId: r });
      break;
    }
    case "toggle": {
      const r = e.entity || s;
      r && await t.callService("homeassistant", "toggle", void 0, {
        entity_id: r
      });
      break;
    }
    case "navigate": {
      e.navigation_path && (history.pushState(null, "", e.navigation_path), mt(window, "location-changed", {
        replace: !1
      }));
      break;
    }
    case "url": {
      e.url_path && window.open(e.url_path, "_blank", "noopener,noreferrer");
      break;
    }
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { CHILD: 2 }, Se = (i) => (...t) => ({ _$litDirective$: i, values: t });
class Pe {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, o) {
    this._$Ct = t, this._$AM = e, this._$Ci = o;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ft extends Pe {
  constructor(t) {
    if (super(t), this.it = u, t.type !== Te.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === u || t == null) return this._t = void 0, this.it = t;
    if (t === D) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
ft.directiveName = "unsafeHTML", ft.resultType = 1;
const Oe = Se(ft), Me = /* @__PURE__ */ new Set([
  "script",
  "foreignobject",
  "iframe",
  "object",
  "embed",
  "audio",
  "video"
]);
function Ie(i) {
  try {
    const e = new DOMParser().parseFromString(i.trim(), "image/svg+xml");
    if (e.querySelector("parsererror")) return null;
    const s = e.documentElement;
    if (!s || s.tagName.toLowerCase() !== "svg") return null;
    const n = (r) => {
      const a = Array.from(r.children);
      for (const l of a) {
        if (Me.has(l.tagName.toLowerCase())) {
          l.remove();
          continue;
        }
        n(l);
      }
      for (const l of Array.from(r.attributes)) {
        const c = l.name.toLowerCase(), p = l.value.trim().toLowerCase();
        (c.startsWith("on") || (c === "href" || c === "xlink:href") && p.startsWith("javascript:")) && r.removeAttribute(l.name);
      }
    };
    return n(s), s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.hasAttribute("fill") || s.setAttribute("fill", "currentColor"), new XMLSerializer().serializeToString(s);
  } catch {
    return null;
  }
}
function Zt(i) {
  if (!i) return u;
  const t = i.trim();
  if (!t) return u;
  if (t.toLowerCase().startsWith("<svg")) {
    const e = Ie(t);
    return e ? d`<span class="atgr-svg-icon">${Oe(e)}</span>` : u;
  }
  return t.startsWith("data:image/") || t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/local/") || t.startsWith("/api/") || t.startsWith("./") || t.startsWith("../") ? d`<img class="atgr-img-icon" src=${t} draggable="false" alt="" />` : d`<ha-icon .icon=${t}></ha-icon>`;
}
function qt(i, t) {
  const e = Math.max(1, Math.round(t || 4)), o = [];
  let s = [], n = 0, r = 1;
  for (const a of i) {
    if (!a || !a.id) continue;
    const l = I[a.id], c = a.columns ?? (l == null ? void 0 : l.defaultColumns) ?? 1, p = Math.max(1, Math.min(e, Math.round(c))), h = (l == null ? void 0 : l.isHorizontalBar) ?? !1, m = h ? 1 : p;
    s.length > 0 && n + p > e && (o.push({
      items: s,
      maxRowUnits: r
    }), s = [], n = 0, r = 1), s.push({
      config: a,
      colSpan: p,
      rowUnits: m,
      isHorizontalBar: h
    }), n += p, m > r && (r = m);
  }
  return s.length > 0 && o.push({
    items: s,
    maxRowUnits: r
  }), o;
}
var Be = Object.defineProperty, De = Object.getOwnPropertyDescriptor, $t = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? De(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && Be(t, e, s), s;
};
const Gt = {
  up: "DPAD_UP",
  down: "DPAD_DOWN",
  left: "DPAD_LEFT",
  right: "DPAD_RIGHT",
  center: "DPAD_CENTER"
}, ze = 24, He = 450, Re = 0.5;
let Y = class extends b {
  constructor() {
    super(...arguments), this.disabled = !1, this.activeZone = null, this.pointerId = null, this.startX = 0, this.startY = 0, this.pressedZone = null, this.swiped = !1, this.holdTriggered = !1, this.holdTimer = null, this.onPointerDown = (i) => {
      var o;
      if (this.disabled || i.pointerType === "mouse" && i.button !== 0) return;
      this.clearHoldTimer();
      const t = i.currentTarget;
      (o = t.setPointerCapture) == null || o.call(t, i.pointerId), this.pointerId = i.pointerId, this.startX = i.clientX, this.startY = i.clientY, this.swiped = !1, this.holdTriggered = !1, this.pressedZone = this.detectZoneFromEvent(i), this.activeZone = this.pressedZone;
      const e = this.pressedZone;
      this.holdTimer = window.setTimeout(() => {
        this.swiped || (this.holdTriggered = !0, this.emitCommand(e, Re));
      }, He);
    }, this.onPointerMove = (i) => {
      if (this.pointerId !== i.pointerId || this.swiped) return;
      const t = i.clientX - this.startX, e = i.clientY - this.startY;
      if (Math.hypot(t, e) >= ze) {
        this.swiped = !0, this.clearHoldTimer();
        const s = Math.abs(t) > Math.abs(e) ? t > 0 ? "right" : "left" : e > 0 ? "down" : "up";
        this.activeZone = s, this.emitCommand(s);
      }
    }, this.onPointerUp = (i) => {
      this.pointerId === i.pointerId && (this.clearHoldTimer(), this.releaseCapture(i), !this.swiped && !this.holdTriggered && this.pressedZone && this.emitCommand(this.pressedZone), this.resetPointerState());
    }, this.onPointerCancel = (i) => {
      this.pointerId === i.pointerId && (this.clearHoldTimer(), this.releaseCapture(i), this.resetPointerState());
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHoldTimer();
  }
  clearHoldTimer() {
    this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null);
  }
  emitCommand(i, t) {
    this.disabled || this.dispatchEvent(
      new CustomEvent("atgr-command", {
        bubbles: !0,
        composed: !0,
        detail: { command: Gt[i], holdSecs: t }
      })
    );
  }
  detectZoneFromEvent(i) {
    var o;
    const t = i.target, e = (o = t == null ? void 0 : t.closest("[data-zone]")) == null ? void 0 : o.getAttribute("data-zone");
    return e && e in Gt ? e : "center";
  }
  releaseCapture(i) {
    var e;
    const t = i.currentTarget;
    (e = t == null ? void 0 : t.hasPointerCapture) != null && e.call(t, i.pointerId) && t.releasePointerCapture(i.pointerId);
  }
  resetPointerState() {
    this.pointerId = null, this.pressedZone = null, this.swiped = !1, this.holdTriggered = !1, this.activeZone = null;
  }
  render() {
    return d`
      <div
        class="pad-root"
        role="group"
        aria-label="Directional Touch Pad"
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerCancel}
        @lostpointercapture=${this.onPointerCancel}
      >
        <svg class="pad-ring" viewBox="0 0 200 200" aria-hidden="true">
          <!-- Outer base circle -->
          <circle class="ring-bg" cx="100" cy="100" r="96" />

          <!-- Up sector (-135deg to -45deg) -->
          <path
            data-zone="up"
            class="sector ${this.activeZone === "up" ? "active" : ""}"
            d="M 100 100 L 32.12 32.12 A 96 96 0 0 1 167.88 32.12 Z"
          />
          <!-- Right sector (-45deg to 45deg) -->
          <path
            data-zone="right"
            class="sector ${this.activeZone === "right" ? "active" : ""}"
            d="M 100 100 L 167.88 32.12 A 96 96 0 0 1 167.88 167.88 Z"
          />
          <!-- Down sector (45deg to 135deg) -->
          <path
            data-zone="down"
            class="sector ${this.activeZone === "down" ? "active" : ""}"
            d="M 100 100 L 167.88 167.88 A 96 96 0 0 1 32.12 167.88 Z"
          />
          <!-- Left sector (135deg to 225deg) -->
          <path
            data-zone="left"
            class="sector ${this.activeZone === "left" ? "active" : ""}"
            d="M 100 100 L 32.12 167.88 A 96 96 0 0 1 32.12 32.12 Z"
          />

          <!-- Diagonal divider lines -->
          <line class="divider" x1="32.12" y1="32.12" x2="167.88" y2="167.88" />
          <line class="divider" x1="167.88" y1="32.12" x2="32.12" y2="167.88" />

          <!-- Subtle directional chevrons -->
          <polyline class="chevron" points="93,30 100,23 107,30" />
          <polyline class="chevron" points="170,93 177,100 170,107" />
          <polyline class="chevron" points="93,170 100,177 107,170" />
          <polyline class="chevron" points="30,93 23,100 30,107" />
        </svg>

        <button
          type="button"
          class="center-btn ${this.activeZone === "center" ? "active" : ""}"
          data-zone="center"
          aria-label="OK"
          tabindex="0"
          @keydown=${(i) => {
      (i.key === "Enter" || i.key === " ") && (i.preventDefault(), this.emitCommand("center"));
    }}
        ></button>
      </div>
    `;
  }
};
Y.styles = k`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
    }

    .pad-root {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      touch-action: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.22),
        inset 0 1px 1px rgba(255, 255, 255, 0.08);
      overflow: hidden;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .pad-ring {
      width: 100%;
      height: 100%;
      display: block;
    }

    .ring-bg {
      fill: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      stroke: rgba(128, 128, 128, 0.25);
      stroke-width: 1.5;
    }

    .sector {
      fill: transparent;
      transition: fill 0.12s ease;
    }

    @media (hover: hover) {
      .sector:hover {
        fill: rgba(128, 128, 128, 0.12);
      }

      .center-btn:hover {
        filter: brightness(1.08);
      }
    }

    .sector.active {
      fill: rgba(128, 128, 128, 0.28);
    }

    .divider {
      stroke: rgba(128, 128, 128, 0.22);
      stroke-width: 1.5;
      pointer-events: none;
    }

    .chevron {
      fill: none;
      stroke: var(--atgr-el-color, var(--primary-text-color, #ffffff));
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0.45;
      pointer-events: none;
    }

    .center-btn {
      position: absolute;
      width: 36%;
      height: 36%;
      border-radius: 50%;
      border: 1px solid rgba(128, 128, 128, 0.28);
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.28),
        inset 0 2px 4px rgba(255, 255, 255, 0.08);
      cursor: pointer;
      padding: 0;
      outline: none;
      transition: transform 0.1s ease, filter 0.12s ease, box-shadow 0.12s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .center-btn.active {
      transform: scale(0.94);
      box-shadow:
        inset 0 2px 6px rgba(0, 0, 0, 0.35);
    }
  `;
$t([
  f({ type: Boolean })
], Y.prototype, "disabled", 2);
$t([
  v()
], Y.prototype, "activeZone", 2);
Y = $t([
  T("atgr-touch-pad")
], Y);
var Ue = Object.defineProperty, je = Object.getOwnPropertyDescriptor, Q = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? je(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && Ue(t, e, s), s;
};
let z = class extends b {
  constructor() {
    super(...arguments), this.entityId = "", this.volumeMode = "auto", this.draggingValue = null, this.lastThrottleTs = 0, this.onSliderInput = (i) => {
      const t = Number(i.target.value);
      this.draggingValue = t;
      const e = Date.now();
      e - this.lastThrottleTs >= 80 && (this.lastThrottleTs = e, this.setVolumePercent(t));
    }, this.onSliderChange = (i) => {
      const t = Number(i.target.value);
      this.draggingValue = null, this.setVolumePercent(t);
    };
  }
  get entityState() {
    if (!(!this.hass || !this.entityId))
      return this.hass.states[this.entityId];
  }
  get supportsMute() {
    const i = this.entityState;
    if (!i) return !1;
    const t = i.attributes.supported_features ?? 0;
    return i.attributes.is_volume_muted !== void 0 || (t & Wt.VOLUME_MUTE) !== 0;
  }
  get supportsVolumeSet() {
    const i = this.entityState;
    if (!i) return !1;
    const t = i.attributes.supported_features ?? 0;
    return typeof i.attributes.volume_level == "number" || (t & Wt.VOLUME_SET) !== 0;
  }
  get isMuted() {
    var i;
    return !!((i = this.entityState) != null && i.attributes.is_volume_muted);
  }
  get currentPercent() {
    var t;
    if (this.draggingValue !== null)
      return this.draggingValue;
    const i = (t = this.entityState) == null ? void 0 : t.attributes.volume_level;
    return typeof i != "number" || Number.isNaN(i) ? 0 : Math.round(Math.max(0, Math.min(1, i)) * 100);
  }
  toggleMute() {
    !this.hass || !this.entityId || this.hass.callService(
      "media_player",
      "volume_mute",
      { is_volume_muted: !this.isMuted },
      { entity_id: this.entityId }
    );
  }
  stepVolume(i) {
    !this.hass || !this.entityId || this.hass.callService(
      "media_player",
      i === "up" ? "volume_up" : "volume_down",
      void 0,
      { entity_id: this.entityId }
    );
  }
  setVolumePercent(i) {
    if (!this.hass || !this.entityId) return;
    const t = Math.max(0, Math.min(100, i));
    this.hass.callService(
      "media_player",
      "volume_set",
      { volume_level: Number((t / 100).toFixed(2)) },
      { entity_id: this.entityId }
    );
  }
  render() {
    const i = !!(this.entityId && this.entityState), t = this.currentPercent, e = this.isMuted ? "mdi:volume-off" : "mdi:volume-high";
    if (!i)
      return d`
        <div class="volume-bar disabled">
          <ha-icon icon="mdi:volume-off"></ha-icon>
          <span class="empty-label">No volume entity</span>
        </div>
      `;
    if (this.volumeMode === "buttons" || this.volumeMode === "auto" && !this.supportsVolumeSet)
      return d`
        <div class="volume-bar fallback">
          ${this.supportsMute ? d`
                <button
                  type="button"
                  class="icon-btn ${this.isMuted ? "muted" : ""}"
                  aria-label="Toggle Mute"
                  @click=${() => this.toggleMute()}
                >
                  <ha-icon .icon=${e}></ha-icon>
                </button>
              ` : u}
          <div class="step-controls">
            <button
              type="button"
              class="step-btn"
              aria-label="Volume Down"
              @click=${() => this.stepVolume("down")}
            >
              <ha-icon icon="mdi:volume-minus"></ha-icon>
            </button>
            <button
              type="button"
              class="step-btn"
              aria-label="Volume Up"
              @click=${() => this.stepVolume("up")}
            >
              <ha-icon icon="mdi:volume-plus"></ha-icon>
            </button>
          </div>
        </div>
      `;
    const s = t > 75 ? "#1d4ed8" : t > 40 ? "#0284c7" : "#06b6d4";
    return d`
      <div class="volume-bar">
        ${this.supportsMute ? d`
              <button
                type="button"
                class="icon-btn ${this.isMuted ? "muted" : ""}"
                aria-label="Toggle Mute"
                @click=${() => this.toggleMute()}
              >
                <ha-icon .icon=${e}></ha-icon>
              </button>
            ` : u}

        <div class="slider-wrap" style="--vol-pct: ${t}%; --thumb-color: ${s};">
          <div class="slider-track">
            <div class="slider-fill"></div>
          </div>
          <input
            type="range"
            class="slider-input"
            min="0"
            max="100"
            step="1"
            .value=${String(t)}
            aria-label="Volume"
            @input=${this.onSliderInput}
            @change=${this.onSliderChange}
          />
          <div class="slider-thumb" aria-hidden="true"></div>
        </div>

        <span class="volume-value">${t}</span>
      </div>
    `;
  }
};
z.styles = k`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .volume-bar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 14px;
      box-sizing: border-box;
      border-radius: 18px;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      color: var(--atgr-el-color, var(--primary-text-color, #ffffff));
      user-select: none;
      -webkit-user-select: none;
    }

    .volume-bar.disabled {
      opacity: 0.55;
      justify-content: center;
    }

    .empty-label {
      font-size: 13px;
    }

    .icon-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      padding: 6px;
      margin: -6px;
      border-radius: 50%;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background-color 0.15s ease, transform 0.1s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .icon-btn:hover {
      background: rgba(128, 128, 128, 0.16);
    }

    .icon-btn:active {
      transform: scale(0.92);
    }

    .icon-btn.muted {
      opacity: 0.65;
    }

    .slider-wrap {
      position: relative;
      flex: 1;
      height: 28px;
      display: flex;
      align-items: center;
    }

    .slider-track {
      position: relative;
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: rgba(128, 128, 128, 0.28);
      overflow: hidden;
    }

    .slider-fill {
      height: 100%;
      width: var(--vol-pct, 0%);
      border-radius: 999px;
      background: linear-gradient(90deg, #22d3ee 0%, #0284c7 60%, #1d4ed8 100%);
      transition: width 0.05s linear;
    }

    .slider-thumb {
      position: absolute;
      left: var(--vol-pct, 0%);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--thumb-color, #0284c7);
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
      transform: translateX(-50%);
      pointer-events: none;
      transition: transform 0.1s ease, background-color 0.15s ease;
    }

    .slider-input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      touch-action: pan-y;
    }

    .slider-input:active + .slider-thumb {
      transform: translateX(-50%) scale(1.18);
    }

    .volume-value {
      min-width: 26px;
      text-align: right;
      font-size: 14px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: inherit;
      flex-shrink: 0;
    }

    .volume-bar.fallback {
      justify-content: space-between;
    }

    .step-controls {
      display: flex;
      flex: 1;
      gap: 10px;
      justify-content: flex-end;
    }

    .step-btn {
      appearance: none;
      border: none;
      border-radius: 12px;
      background: rgba(128, 128, 128, 0.16);
      color: inherit;
      height: 36px;
      min-width: 48px;
      flex: 1;
      max-width: 96px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    .step-btn:hover {
      background: rgba(128, 128, 128, 0.26);
    }

    .step-btn:active {
      transform: scale(0.95);
    }
  `;
Q([
  f({ attribute: !1 })
], z.prototype, "hass", 2);
Q([
  f({ type: String })
], z.prototype, "entityId", 2);
Q([
  f({ type: String })
], z.prototype, "volumeMode", 2);
Q([
  v()
], z.prototype, "draggingValue", 2);
z = Q([
  T("atgr-volume-bar")
], z);
var Ne = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, nt = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? Le(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && Ne(t, e, s), s;
};
let U = class extends b {
  constructor() {
    super(...arguments), this.entityId = "", this.remoteEntity = "";
  }
  get isPlaying() {
    var i;
    return !this.hass || !this.entityId ? !1 : ((i = this.hass.states[this.entityId]) == null ? void 0 : i.state) === "playing";
  }
  async triggerControl(i, t) {
    if (this.hass) {
      if (this.entityId && this.hass.states[this.entityId]) {
        await this.hass.callService(
          "media_player",
          i,
          void 0,
          { entity_id: this.entityId }
        );
        return;
      }
      this.remoteEntity && await q(this.hass, this.remoteEntity, t);
    }
  }
  render() {
    const i = this.isPlaying ? "mdi:pause" : "mdi:play";
    return d`
      <div class="media-bar" role="group" aria-label="Media Controls">
        <button
          type="button"
          class="ctrl-btn"
          aria-label="Previous / Rewind"
          @click=${() => this.triggerControl("media_previous_track", "MEDIA_REWIND")}
        >
          <ha-icon icon="mdi:skip-previous"></ha-icon>
        </button>

        <button
          type="button"
          class="ctrl-btn primary"
          aria-label="Play / Pause"
          @click=${() => this.triggerControl("media_play_pause", "MEDIA_PLAY_PAUSE")}
        >
          <ha-icon .icon=${i}></ha-icon>
        </button>

        <button
          type="button"
          class="ctrl-btn"
          aria-label="Next / Fast Forward"
          @click=${() => this.triggerControl("media_next_track", "MEDIA_FAST_FORWARD")}
        >
          <ha-icon icon="mdi:skip-next"></ha-icon>
        </button>
      </div>
    `;
  }
};
U.styles = k`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .media-bar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: 8px;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 18px;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      color: var(--atgr-el-color, var(--primary-text-color, #ffffff));
    }

    .ctrl-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      flex: 1;
      height: 76%;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.1s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .ctrl-btn:hover {
      background: rgba(128, 128, 128, 0.16);
    }

    .ctrl-btn:active {
      transform: scale(0.92);
    }

    .ctrl-btn.primary {
      background: rgba(128, 128, 128, 0.14);
    }

    .ctrl-btn.primary:hover {
      background: rgba(128, 128, 128, 0.24);
    }
  `;
nt([
  f({ attribute: !1 })
], U.prototype, "hass", 2);
nt([
  f({ type: String })
], U.prototype, "entityId", 2);
nt([
  f({ type: String })
], U.prototype, "remoteEntity", 2);
U = nt([
  T("atgr-media-controls")
], U);
var Ve = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, at = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? Fe(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && Ve(t, e, s), s;
};
let j = class extends b {
  constructor() {
    super(...arguments), this.entityId = "", this.remoteEntity = "";
  }
  get targetEntity() {
    if (this.hass) {
      if (this.entityId && this.hass.states[this.entityId])
        return this.hass.states[this.entityId];
      if (this.remoteEntity && this.hass.states[this.remoteEntity])
        return this.hass.states[this.remoteEntity];
    }
  }
  openMoreInfo() {
    const i = this.targetEntity;
    i && mt(this, "hass-more-info", { entityId: i.entity_id });
  }
  render() {
    const i = this.targetEntity, t = (i == null ? void 0 : i.attributes) ?? {}, e = t.media_title || t.app_name || t.source || t.activity || t.friendly_name || "Android TV", o = t.media_title && (t.app_name || t.source) ? `${t.app_name || t.source} · ${(i == null ? void 0 : i.state) ?? ""}` : (i == null ? void 0 : i.state) ?? "unavailable", s = t.entity_picture;
    return d`
      <button
        type="button"
        class="now-playing"
        @click=${() => this.openMoreInfo()}
      >
        <div class="thumb">
          ${s ? d`<img src=${s} alt="" draggable="false" />` : d`<ha-icon icon="mdi:television"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${e}</div>
          <div class="subtitle">${o}</div>
        </div>
        <div class="state-dot ${(i == null ? void 0 : i.state) === "playing" || (i == null ? void 0 : i.state) === "on" ? "active" : ""}"></div>
      </button>
    `;
  }
};
j.styles = k`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .now-playing {
      appearance: none;
      border: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 14px;
      box-sizing: border-box;
      border-radius: 18px;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      color: var(--atgr-el-color, var(--primary-text-color, #ffffff));
      text-align: left;
      cursor: pointer;
      transition: filter 0.15s ease;
      -webkit-tap-highlight-color: transparent;
    }

    .now-playing:hover {
      filter: brightness(1.06);
    }

    .thumb {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      overflow: hidden;
      background: rgba(128, 128, 128, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .meta {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtitle {
      font-size: 12px;
      opacity: 0.7;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: capitalize;
    }

    .state-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.45);
      flex-shrink: 0;
    }

    .state-dot.active {
      background: #22c55e;
      box-shadow: 0 0 8px rgba(34, 197, 94, 0.65);
    }
  `;
at([
  f({ attribute: !1 })
], j.prototype, "hass", 2);
at([
  f({ type: String })
], j.prototype, "entityId", 2);
at([
  f({ type: String })
], j.prototype, "remoteEntity", 2);
j = at([
  T("atgr-now-playing")
], j);
var We = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, _ = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? Ze(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && We(t, e, s), s;
};
let A = class extends b {
  constructor() {
    super(...arguments), this.remoteEntity = "", this.open = !1, this.text = "", this.mode = "activity";
  }
  close() {
    this.dispatchEvent(new CustomEvent("atgr-close", { bubbles: !0, composed: !0 }));
  }
  async submit(i) {
    i == null || i.preventDefault();
    const t = this.text.trim();
    !t || !this.hass || !this.remoteEntity || (this.mode === "activity" ? await oe(this.hass, this.remoteEntity, t) : await q(this.hass, this.remoteEntity, t), this.text = "", this.close());
  }
  render() {
    return this.open ? d`
      <div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(i) => i.stopPropagation()}>
          <div class="header">
            <span>Remote Input / Activity</span>
            <button type="button" class="close-btn" @click=${this.close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <form @submit=${this.submit}>
            <div class="mode-tabs">
              <button
                type="button"
                class="tab ${this.mode === "activity" ? "active" : ""}"
                @click=${() => this.mode = "activity"}
              >
                Activity / URI
              </button>
              <button
                type="button"
                class="tab ${this.mode === "command" ? "active" : ""}"
                @click=${() => this.mode = "command"}
              >
                Command
              </button>
            </div>

            <input
              type="text"
              class="text-input"
              .value=${this.text}
              placeholder=${this.mode === "activity" ? "e.g. https://www.youtube.com or app package" : "e.g. HOME, DPAD_CENTER"}
              @input=${(i) => {
      this.text = i.target.value;
    }}
            />

            <div class="actions">
              <button type="button" class="btn secondary" @click=${this.close}>
                Cancel
              </button>
              <button type="submit" class="btn primary" ?disabled=${!this.text.trim()}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    ` : u;
  }
};
A.styles = k`
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .dialog {
      width: 100%;
      max-width: 380px;
      border-radius: 18px;
      padding: 18px;
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #ffffff);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 14px;
    }

    .close-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
    }

    .mode-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .tab {
      flex: 1;
      padding: 6px 10px;
      border-radius: 10px;
      border: 1px solid rgba(128, 128, 128, 0.3);
      background: transparent;
      color: inherit;
      font-size: 13px;
      cursor: pointer;
    }

    .tab.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .text-input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(128, 128, 128, 0.35);
      background: var(--secondary-background-color, #2a2a2a);
      color: inherit;
      font-size: 14px;
      outline: none;
      margin-bottom: 14px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .btn {
      padding: 8px 16px;
      border-radius: 10px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    .btn.secondary {
      background: rgba(128, 128, 128, 0.2);
      color: inherit;
    }

    .btn.primary {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  `;
_([
  f({ attribute: !1 })
], A.prototype, "hass", 2);
_([
  f({ type: String })
], A.prototype, "remoteEntity", 2);
_([
  f({ type: Boolean })
], A.prototype, "open", 2);
_([
  v()
], A.prototype, "text", 2);
_([
  v()
], A.prototype, "mode", 2);
A = _([
  T("atgr-keyboard-dialog")
], A);
let N = class extends b {
  constructor() {
    super(...arguments), this.entityId = "", this.open = !1;
  }
  close() {
    this.dispatchEvent(new CustomEvent("atgr-close", { bubbles: !0, composed: !0 }));
  }
  async selectSource(i) {
    !this.hass || !this.entityId || (await this.hass.callService(
      "media_player",
      "select_source",
      { source: i },
      { entity_id: this.entityId }
    ), this.close());
  }
  render() {
    if (!this.open) return u;
    const i = this.hass && this.entityId ? this.hass.states[this.entityId] : void 0, t = (i == null ? void 0 : i.attributes.source_list) ?? [], e = i == null ? void 0 : i.attributes.source;
    return d`
      <div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(o) => o.stopPropagation()}>
          <div class="header">
            <span>Select Source / App</span>
            <button type="button" class="close-btn" @click=${this.close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="list">
            ${t.length === 0 ? d`<div class="empty">No sources available on ${this.entityId || "entity"}</div>` : t.map(
      (o) => d`
                    <button
                      type="button"
                      class="source-item ${o === e ? "active" : ""}"
                      @click=${() => this.selectSource(o)}
                    >
                      <span>${o}</span>
                      ${o === e ? d`<ha-icon icon="mdi:check"></ha-icon>` : u}
                    </button>
                  `
    )}
          </div>
        </div>
      </div>
    `;
  }
};
N.styles = k`
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .dialog {
      width: 100%;
      max-width: 360px;
      max-height: 75vh;
      display: flex;
      flex-direction: column;
      border-radius: 18px;
      padding: 18px;
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #ffffff);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .close-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
    }

    .list {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .source-item {
      appearance: none;
      border: none;
      border-radius: 12px;
      padding: 10px 14px;
      background: var(--secondary-background-color, #2a2a2a);
      color: inherit;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      text-align: left;
    }

    .source-item.active {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .empty {
      padding: 20px 0;
      text-align: center;
      opacity: 0.65;
      font-size: 14px;
    }
  `;
_([
  f({ attribute: !1 })
], N.prototype, "hass", 2);
_([
  f({ type: String })
], N.prototype, "entityId", 2);
_([
  f({ type: Boolean })
], N.prototype, "open", 2);
N = _([
  T("atgr-source-dialog")
], N);
var qe = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, L = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? Ge(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && qe(t, e, s), s;
};
const pt = 10;
let E = class extends b {
  constructor() {
    super(...arguments), this.cellSize = 64, this.keyboardOpen = !1, this.sourceOpen = !1, this.holdTimer = null, this.holdTriggered = !1, this.lastTapTs = 0, this.tapTimer = null;
  }
  static getConfigElement() {
    return document.createElement(ie);
  }
  static getStubConfig(i) {
    const t = i != null && i.states ? Object.keys(i.states) : [], e = t.find((s) => s.startsWith("remote.")) ?? "remote.living_room_tv", o = t.find((s) => s.startsWith("media_player.")) ?? "media_player.living_room_tv";
    return {
      remote_entity: e,
      entity: o,
      columns: $.columns,
      align: $.align,
      volume_mode: $.volume_mode,
      elements: $.elements,
      custom_buttons: $.custom_buttons
    };
  }
  setConfig(i) {
    if (!i.remote_entity || !i.remote_entity.trim())
      throw new Error('Please configure a required "remote_entity" (e.g. remote.living_room_tv).');
    this.config = {
      ...$,
      ...i,
      columns: Math.max(1, Math.round(i.columns ?? $.columns ?? 3)),
      align: i.align ?? $.align ?? "top",
      volume_mode: i.volume_mode ?? $.volume_mode ?? "auto",
      elements: i.elements ?? $.elements ?? [],
      custom_buttons: i.custom_buttons ?? []
    };
  }
  getCardSize() {
    if (!this.config) return 4;
    const i = qt(
      this.config.elements ?? [],
      this.config.columns ?? 4
    );
    return Math.max(2, i.reduce((t, e) => t + e.maxRowUnits, 0));
  }
  connectedCallback() {
    super.connectedCallback(), this.setupResizeObserver();
  }
  disconnectedCallback() {
    var i;
    super.disconnectedCallback(), (i = this.resizeObserver) == null || i.disconnect(), this.clearActionTimers();
  }
  firstUpdated() {
    this.setupResizeObserver();
  }
  setupResizeObserver() {
    var t, e;
    const i = (t = this.renderRoot) == null ? void 0 : t.querySelector(".grid-root");
    i && ((e = this.resizeObserver) == null || e.disconnect(), this.resizeObserver = new ResizeObserver((o) => {
      var s;
      for (const n of o) {
        const r = n.contentRect.width;
        if (r > 0) {
          const a = ((s = this.config) == null ? void 0 : s.columns) ?? 4, l = (r - pt * (a - 1)) / a;
          l > 0 && Math.abs(l - this.cellSize) > 0.5 && (this.cellSize = l);
        }
      }
    }), this.resizeObserver.observe(i));
  }
  clearActionTimers() {
    this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null), this.tapTimer !== null && (window.clearTimeout(this.tapTimer), this.tapTimer = null);
  }
  get customButtonsMap() {
    var t;
    const i = /* @__PURE__ */ new Map();
    for (const e of ((t = this.config) == null ? void 0 : t.custom_buttons) ?? [])
      e.id && i.set(e.id, e);
    return i;
  }
  handleBuiltInButtonClick(i) {
    if (!this.hass || !this.config) return;
    const t = I[i];
    if (t) {
      if (i === "keyboard") {
        this.keyboardOpen = !0;
        return;
      }
      if (i === "source_select") {
        this.sourceOpen = !0;
        return;
      }
      if (t.remoteCommand) {
        q(this.hass, this.config.remote_entity, t.remoteCommand);
        return;
      }
      t.appActivity && oe(this.hass, this.config.remote_entity, t.appActivity);
    }
  }
  handleBuiltInPointerDown(i) {
    this.holdTriggered = !1, this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null);
    const t = I[i];
    if (t != null && t.remoteCommand && this.hass && this.config) {
      const e = t.remoteCommand;
      this.holdTimer = window.setTimeout(() => {
        this.holdTriggered = !0, this.hass && this.config && q(this.hass, this.config.remote_entity, e, 0.5);
      }, 450);
    }
  }
  handleBuiltInPointerUp(i) {
    this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null), !this.holdTriggered && this.handleBuiltInButtonClick(i);
  }
  handleCustomButtonPointerDown(i) {
    this.holdTriggered = !1, this.holdTimer !== null && window.clearTimeout(this.holdTimer);
    const t = ht(i, "hold");
    t && (this.holdTimer = window.setTimeout(() => {
      this.holdTriggered = !0, this.hass && this.config && tt(this, this.hass, t, {
        remoteEntity: this.config.remote_entity,
        entity: this.config.entity,
        volumeEntity: this.config.volume_entity
      });
    }, 450));
  }
  handleCustomButtonPointerUp(i) {
    if (this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null), this.holdTriggered || !this.hass || !this.config) return;
    const t = ht(i, "double_tap"), e = ht(i, "tap"), o = {
      remoteEntity: this.config.remote_entity,
      entity: this.config.entity,
      volumeEntity: this.config.volume_entity
    };
    if (t) {
      const s = Date.now();
      if (s - this.lastTapTs < 260) {
        this.tapTimer !== null && (window.clearTimeout(this.tapTimer), this.tapTimer = null), this.lastTapTs = 0, tt(this, this.hass, t, o);
        return;
      }
      this.lastTapTs = s, this.tapTimer = window.setTimeout(() => {
        this.tapTimer = null, this.hass && e && tt(this, this.hass, e, o);
      }, 260);
      return;
    }
    e && tt(this, this.hass, e, o);
  }
  renderElementItem(i, t) {
    var y, S, _t, wt, xt, At, Et, Ct, kt, Tt, St, Pt, Ot, Mt, It;
    const { config: e, colSpan: o, rowUnits: s } = i, n = I[e.id], r = t.get(e.id), a = ((_t = (S = this.hass) == null ? void 0 : S.states[((y = this.config) == null ? void 0 : y.remote_entity) ?? ""]) == null ? void 0 : _t.state) ?? ((At = (xt = this.hass) == null ? void 0 : xt.states[((wt = this.config) == null ? void 0 : wt.entity) ?? ""]) == null ? void 0 : At.state), l = a === "on" || a === "playing" || a === "paused" || a === "idle" || a === "buffering", c = e.id === "power" ? l ? "#22c55e" : "#ef4444" : void 0, p = e.color ?? c ?? (r == null ? void 0 : r.color) ?? (n == null ? void 0 : n.defaultColor) ?? ((Et = this.config) == null ? void 0 : Et.color) ?? "var(--primary-text-color, #ffffff)", h = e.background ?? (r == null ? void 0 : r.background) ?? (n == null ? void 0 : n.defaultBackground) ?? ((Ct = this.config) == null ? void 0 : Ct.background) ?? "var(--secondary-background-color, #2a2a2a)", m = `
      grid-column: span ${o};
      height: calc(${this.cellSize}px * ${s} + ${pt}px * ${s - 1});
      --atgr-el-color: ${p};
      --atgr-el-bg: ${h};
    `;
    if (e.id === "spacer")
      return d`<div class="grid-item spacer" style=${m} aria-hidden="true"></div>`;
    if (e.id === "touch_pad")
      return d`
        <div class="grid-item" style=${m}>
          <atgr-touch-pad
            @atgr-command=${(g) => {
        this.hass && this.config && q(
          this.hass,
          this.config.remote_entity,
          g.detail.command,
          g.detail.holdSecs
        );
      }}
          ></atgr-touch-pad>
        </div>
      `;
    if (e.id === "volume") {
      const g = ((kt = this.config) == null ? void 0 : kt.volume_entity) || ((Tt = this.config) == null ? void 0 : Tt.entity) || "";
      return d`
        <div class="grid-item" style=${m}>
          <atgr-volume-bar
            .hass=${this.hass}
            .entityId=${g}
            .volumeMode=${((St = this.config) == null ? void 0 : St.volume_mode) ?? "auto"}
          ></atgr-volume-bar>
        </div>
      `;
    }
    if (e.id === "media_controls")
      return d`
        <div class="grid-item" style=${m}>
          <atgr-media-controls
            .hass=${this.hass}
            .entityId=${((Pt = this.config) == null ? void 0 : Pt.entity) ?? ""}
            .remoteEntity=${((Ot = this.config) == null ? void 0 : Ot.remote_entity) ?? ""}
          ></atgr-media-controls>
        </div>
      `;
    if (e.id === "now_playing")
      return d`
        <div class="grid-item" style=${m}>
          <atgr-now-playing
            .hass=${this.hass}
            .entityId=${((Mt = this.config) == null ? void 0 : Mt.entity) ?? ""}
            .remoteEntity=${((It = this.config) == null ? void 0 : It.remote_entity) ?? ""}
          ></atgr-now-playing>
        </div>
      `;
    if (r) {
      const g = Zt(r.icon);
      return d`
        <div class="grid-item" style=${m}>
          <button
            type="button"
            class="circle-btn"
            title=${r.friendly_name || r.id}
            aria-label=${r.friendly_name || r.id}
            @pointerdown=${() => this.handleCustomButtonPointerDown(r)}
            @pointerup=${() => this.handleCustomButtonPointerUp(r)}
            @pointercancel=${() => this.clearActionTimers()}
          >
            ${g !== u ? g : d`<span class="btn-label">${r.friendly_name || r.id}</span>`}
          </button>
        </div>
      `;
    }
    return n ? d`
        <div class="grid-item" style=${m}>
          <button
            type="button"
            class="circle-btn"
            title=${n.label}
            aria-label=${n.label}
            @pointerdown=${(g) => {
      g.pointerType === "mouse" && g.button !== 0 || this.handleBuiltInPointerDown(e.id);
    }}
            @pointerup=${(g) => {
      g.pointerType === "mouse" && g.button !== 0 || this.handleBuiltInPointerUp(e.id);
    }}
            @pointercancel=${() => this.clearActionTimers()}
          >
            ${Zt(n.icon)}
          </button>
        </div>
      ` : d`
      <div class="grid-item" style=${m}>
        <div class="unknown-btn" title="Unknown element: ${e.id}">?</div>
      </div>
    `;
  }
  mapAlign(i) {
    switch (i) {
      case "center":
        return "center";
      case "bottom":
        return "end";
      case "top":
      default:
        return "start";
    }
  }
  render() {
    if (!this.config) return u;
    const i = this.config.columns ?? 4, t = qt(this.config.elements ?? [], i), e = this.customButtonsMap, o = this.mapAlign(this.config.align), s = `
      --atgr-cols: ${i};
      --atgr-cell-size: ${this.cellSize}px;
      --atgr-gap: ${pt}px;
      --atgr-align: ${o};
      ${this.config.color ? `color: ${this.config.color};` : ""}
    `;
    return d`
      <ha-card style=${s}>
        <div class="grid-root">
          ${t.map(
      (n) => d`
              <div class="grid-row">
                ${n.items.map((r) => this.renderElementItem(r, e))}
              </div>
            `
    )}
        </div>
      </ha-card>

      <atgr-keyboard-dialog
        .hass=${this.hass}
        .remoteEntity=${this.config.remote_entity}
        .open=${this.keyboardOpen}
        @atgr-close=${() => {
      this.keyboardOpen = !1;
    }}
      ></atgr-keyboard-dialog>

      <atgr-source-dialog
        .hass=${this.hass}
        .entityId=${this.config.entity ?? ""}
        .open=${this.sourceOpen}
        @atgr-close=${() => {
      this.sourceOpen = !1;
    }}
      ></atgr-source-dialog>
    `;
  }
};
E.styles = k`
    :host {
      display: block;
    }

    ha-card {
      padding: 16px;
      border-radius: var(--ha-card-border-radius, 22px);
      background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
      overflow: hidden;
      box-sizing: border-box;
    }

    .grid-root {
      display: flex;
      flex-direction: column;
      gap: var(--atgr-gap, 10px);
      width: 100%;
    }

    .grid-row {
      display: grid;
      grid-template-columns: repeat(var(--atgr-cols, 4), minmax(0, 1fr));
      gap: var(--atgr-gap, 10px);
      align-items: var(--atgr-align, start);
      width: 100%;
    }

    .grid-item {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .grid-item.spacer {
      background: transparent;
      pointer-events: none;
    }

    .circle-btn {
      appearance: none;
      border: none;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--atgr-el-bg, var(--secondary-background-color, #2a2a2a));
      color: var(--atgr-el-color, var(--primary-text-color, #ffffff));
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 1px rgba(255, 255, 255, 0.06);
      transition: transform 0.1s ease, filter 0.15s ease;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }

    @media (hover: hover) {
      .circle-btn:hover {
        filter: brightness(1.08);
      }
    }

    .circle-btn:active {
      transform: scale(0.92);
    }

    .circle-btn ha-icon {
      width: 56%;
      height: 56%;
      --mdc-icon-size: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .atgr-img-icon {
      width: 62%;
      height: 62%;
      object-fit: contain;
      pointer-events: none;
    }

    .atgr-svg-icon {
      width: 62%;
      height: 62%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-label {
      font-size: 12px;
      font-weight: 600;
      padding: 0 6px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 90%;
    }

    .unknown-btn {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px dashed rgba(128, 128, 128, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      font-weight: 600;
    }
  `;
L([
  f({ attribute: !1 })
], E.prototype, "hass", 2);
L([
  v()
], E.prototype, "config", 2);
L([
  v()
], E.prototype, "cellSize", 2);
L([
  v()
], E.prototype, "keyboardOpen", 2);
L([
  v()
], E.prototype, "sourceOpen", 2);
E = L([
  T(ee)
], E);
window.customCards = window.customCards || [];
window.customCards.push({
  type: ee,
  name: "Android TV Grid Remote",
  description: "Modular grid-based Android TV & universal remote card with touch pad, volume slider, and custom buttons.",
  preview: !0
});
var Je = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, V = (i, t, e, o) => {
  for (var s = o > 1 ? void 0 : o ? Xe(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (s = (o ? r(t, e, s) : r(s)) || s);
  return o && s && Je(t, e, s), s;
};
let C = class extends b {
  constructor() {
    super(...arguments), this.activeTab = "general", this.dragIndex = null, this.jsonErrorByBtn = {};
  }
  setConfig(i) {
    this.config = {
      ...i,
      columns: i.columns ?? 3,
      align: i.align ?? "top",
      volume_mode: i.volume_mode ?? "auto",
      elements: i.elements ?? [],
      custom_buttons: i.custom_buttons ?? []
    };
  }
  emitConfig(i) {
    this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: !0,
        composed: !0,
        detail: { config: i }
      })
    );
  }
  updateRootField(i, t) {
    if (!this.config) return;
    const e = { ...this.config };
    t === "" || t === void 0 ? delete e[i] : e[i] = t, this.emitConfig(e);
  }
  getEntitiesByDomain(i) {
    var t;
    return (t = this.hass) != null && t.states ? Object.keys(this.hass.states).filter((e) => e.startsWith(`${i}.`)).sort() : [];
  }
  get mergedElementOptions() {
    var e;
    const i = Object.values(I).map((o) => ({
      id: o.id,
      label: `${o.label} [${o.id}]`
    })), t = (((e = this.config) == null ? void 0 : e.custom_buttons) ?? []).filter((o) => !!o.id).map((o) => ({
      id: o.id,
      label: `Custom: ${o.friendly_name || o.id} [${o.id}]`
    }));
    return [...i, ...t];
  }
  // --- Elements CRUD & Reorder ---
  updateElement(i, t) {
    if (!this.config) return;
    const e = [...this.config.elements ?? []], o = { ...e[i], ...t };
    o.color === "" && delete o.color, o.background === "" && delete o.background, e[i] = o, this.emitConfig({ ...this.config, elements: e });
  }
  addElement(i = "home") {
    if (!this.config) return;
    const t = I[i], e = [
      ...this.config.elements ?? [],
      { id: i, columns: (t == null ? void 0 : t.defaultColumns) ?? 1 }
    ];
    this.emitConfig({ ...this.config, elements: e });
  }
  removeElement(i) {
    if (!this.config) return;
    const t = (this.config.elements ?? []).filter((e, o) => o !== i);
    this.emitConfig({ ...this.config, elements: t });
  }
  moveElement(i, t) {
    if (!this.config) return;
    const e = [...this.config.elements ?? []];
    if (t < 0 || t >= e.length || i === t) return;
    const [o] = e.splice(i, 1);
    e.splice(t, 0, o), this.emitConfig({ ...this.config, elements: e });
  }
  // --- Custom Buttons CRUD ---
  addCustomButton() {
    if (!this.config) return;
    const i = this.config.custom_buttons ?? [], e = {
      id: `custom_btn_${i.length + 1}`,
      friendly_name: `Button ${i.length + 1}`,
      icon: "mdi:star",
      tap_action: {
        action: "perform-action",
        perform_action: "remote.send_command",
        target: { entity_id: this.config.remote_entity },
        data: { command: "HOME" }
      }
    };
    this.emitConfig({
      ...this.config,
      custom_buttons: [...i, e]
    });
  }
  updateCustomButton(i, t) {
    if (!this.config) return;
    const e = [...this.config.custom_buttons ?? []], o = { ...e[i], ...t };
    o.color === "" && delete o.color, o.background === "" && delete o.background, e[i] = o, this.emitConfig({ ...this.config, custom_buttons: e });
  }
  updateCustomButtonAction(i, t) {
    if (!this.config) return;
    const e = [...this.config.custom_buttons ?? []], o = e[i].tap_action ?? {
      action: "perform-action"
    };
    e[i] = {
      ...e[i],
      tap_action: { ...o, ...t }
    }, this.emitConfig({ ...this.config, custom_buttons: e });
  }
  removeCustomButton(i) {
    if (!this.config) return;
    const t = (this.config.custom_buttons ?? []).filter((e, o) => o !== i);
    this.emitConfig({ ...this.config, custom_buttons: t });
  }
  renderGeneralTab() {
    if (!this.config) return u;
    const i = this.getEntitiesByDomain("remote"), t = this.getEntitiesByDomain("media_player");
    return d`
      <div class="section">
        <div class="field">
          <label>Remote Entity (Required)*</label>
          <input
            type="text"
            list="atgr-remote-list"
            .value=${this.config.remote_entity ?? ""}
            placeholder="remote.living_room_tv"
            @input=${(e) => this.updateRootField("remote_entity", e.target.value)}
          />
          <datalist id="atgr-remote-list">
            ${i.map((e) => d`<option value=${e}></option>`)}
          </datalist>
        </div>

        <div class="field">
          <label>Media Player Entity (Optional)</label>
          <input
            type="text"
            list="atgr-media-list"
            .value=${this.config.entity ?? ""}
            placeholder="media_player.living_room_tv"
            @input=${(e) => this.updateRootField("entity", e.target.value)}
          />
          <datalist id="atgr-media-list">
            ${t.map((e) => d`<option value=${e}></option>`)}
          </datalist>
        </div>

        <div class="field">
          <label>Volume Entity (Optional, falls back to Entity)</label>
          <input
            type="text"
            list="atgr-media-list"
            .value=${this.config.volume_entity ?? ""}
            placeholder="media_player.sonos_beam"
            @input=${(e) => this.updateRootField("volume_entity", e.target.value)}
          />
        </div>

        <div class="row-2">
          <div class="field">
            <label>Columns (Max columns per row)</label>
            <input
              type="number"
              min="1"
              max="8"
              .value=${String(this.config.columns ?? 4)}
              @input=${(e) => this.updateRootField(
      "columns",
      Math.max(1, Number(e.target.value) || 4)
    )}
            />
          </div>

          <div class="field">
            <label>Row Align (Vertical alignment)</label>
            <select
              .value=${this.config.align ?? "top"}
              @change=${(e) => this.updateRootField(
      "align",
      e.target.value
    )}
            >
              <option value="top">Top</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label>Volume Control Mode</label>
          <select
            .value=${this.config.volume_mode ?? "auto"}
            @change=${(e) => this.updateRootField(
      "volume_mode",
      e.target.value
    )}
          >
            <option value="auto">Auto (Slider if supported, else Buttons)</option>
            <option value="slider">Slider (Force)</option>
            <option value="buttons">Buttons (Force - / +)</option>
          </select>
        </div>

        <div class="row-2">
          <div class="field">
            <label>Default Color</label>
            <input
              type="text"
              .value=${this.config.color ?? ""}
              placeholder="#ffffff (or leave empty for theme)"
              @input=${(e) => this.updateRootField("color", e.target.value)}
            />
          </div>

          <div class="field">
            <label>Default Background</label>
            <input
              type="text"
              .value=${this.config.background ?? ""}
              placeholder="#2a2a2a (or leave empty for theme)"
              @input=${(e) => this.updateRootField("background", e.target.value)}
            />
          </div>
        </div>
      </div>
    `;
  }
  renderElementsTab() {
    if (!this.config) return u;
    const i = this.config.elements ?? [], t = this.mergedElementOptions;
    return d`
      <div class="section">
        <div class="toolbar">
          <button type="button" class="btn primary" @click=${() => this.addElement("home")}>
            + Add Element
          </button>
          <button type="button" class="btn secondary" @click=${() => this.addElement("spacer")}>
            + Add Spacer
          </button>
        </div>

        <div class="item-list">
          ${i.map(
      (e, o) => {
        var s, n;
        return d`
              <div
                class="item-card"
                draggable="true"
                @dragstart=${() => {
          this.dragIndex = o;
        }}
                @dragover=${(r) => r.preventDefault()}
                @drop=${(r) => {
          r.preventDefault(), this.dragIndex !== null && (this.moveElement(this.dragIndex, o), this.dragIndex = null);
        }}
              >
                <div class="item-header">
                  <span class="drag-handle" title="Drag to reorder">⋮⋮ #${o + 1}</span>
                  <div class="item-actions">
                    <button
                      type="button"
                      class="mini-btn"
                      ?disabled=${o === 0}
                      @click=${() => this.moveElement(o, o - 1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      class="mini-btn"
                      ?disabled=${o === i.length - 1}
                      @click=${() => this.moveElement(o, o + 1)}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      class="mini-btn danger"
                      @click=${() => this.removeElement(o)}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Element ID</label>
                    <select
                      .value=${e.id}
                      @change=${(r) => this.updateElement(o, {
          id: r.target.value
        })}
                    >
                      ${t.map(
          (r) => d`
                          <option value=${r.id} ?selected=${r.id === e.id}>
                            ${r.label}
                          </option>
                        `
        )}
                      ${t.some((r) => r.id === e.id) ? u : d`<option value=${e.id} selected>${e.id}</option>`}
                    </select>
                  </div>

                  <div class="field">
                    <label>Columns</label>
                    <input
                      type="number"
                      min="1"
                      max=${((s = this.config) == null ? void 0 : s.columns) ?? 4}
                      .value=${String(
          e.columns ?? ((n = I[e.id]) == null ? void 0 : n.defaultColumns) ?? 1
        )}
                      @input=${(r) => this.updateElement(o, {
          columns: Math.max(
            1,
            Number(r.target.value) || 1
          )
        })}
                    />
                  </div>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Color Override</label>
                    <input
                      type="text"
                      .value=${e.color ?? ""}
                      placeholder="Inherit default"
                      @input=${(r) => this.updateElement(o, {
          color: r.target.value
        })}
                    />
                  </div>

                  <div class="field">
                    <label>Background Override</label>
                    <input
                      type="text"
                      .value=${e.background ?? ""}
                      placeholder="Inherit default"
                      @input=${(r) => this.updateElement(o, {
          background: r.target.value
        })}
                    />
                  </div>
                </div>
              </div>
            `;
      }
    )}
        </div>
      </div>
    `;
  }
  renderCustomButtonsTab() {
    if (!this.config) return u;
    const i = this.config.custom_buttons ?? [];
    return d`
      <div class="section">
        <div class="toolbar">
          <button type="button" class="btn primary" @click=${() => this.addCustomButton()}>
            + Add Custom Button
          </button>
        </div>

        ${i.length === 0 ? d`<div class="empty-hint">No custom buttons yet. Add one above to select it in Elements.</div>` : u}

        <div class="item-list">
          ${i.map((t, e) => {
      var r;
      const o = t.tap_action ?? {}, s = o.data ? JSON.stringify(o.data, null, 2) : "", n = typeof ((r = o.target) == null ? void 0 : r.entity_id) == "string" ? o.target.entity_id : "";
      return d`
              <div class="item-card">
                <div class="item-header">
                  <strong>${t.friendly_name || t.id}</strong>
                  <button
                    type="button"
                    class="mini-btn danger"
                    @click=${() => this.removeCustomButton(e)}
                  >
                    ✕
                  </button>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>ID (Unique)</label>
                    <input
                      type="text"
                      .value=${t.id}
                      @input=${(a) => this.updateCustomButton(e, {
        id: a.target.value.trim()
      })}
                    />
                  </div>

                  <div class="field">
                    <label>Friendly Name</label>
                    <input
                      type="text"
                      .value=${t.friendly_name ?? ""}
                      @input=${(a) => this.updateCustomButton(e, {
        friendly_name: a.target.value
      })}
                    />
                  </div>
                </div>

                <div class="field">
                  <label>Icon (mdi: / Image URL / Base64 / &lt;svg&gt;)</label>
                  <input
                    type="text"
                    .value=${t.icon ?? ""}
                    placeholder="mdi:netflix, https://..., or <svg>..."
                    @input=${(a) => this.updateCustomButton(e, {
        icon: a.target.value
      })}
                  />
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Color</label>
                    <input
                      type="text"
                      .value=${t.color ?? ""}
                      placeholder="Inherit default"
                      @input=${(a) => this.updateCustomButton(e, {
        color: a.target.value
      })}
                    />
                  </div>

                  <div class="field">
                    <label>Background</label>
                    <input
                      type="text"
                      .value=${t.background ?? ""}
                      placeholder="Inherit default"
                      @input=${(a) => this.updateCustomButton(e, {
        background: a.target.value
      })}
                    />
                  </div>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Tap Action (Service)</label>
                    <input
                      type="text"
                      .value=${o.perform_action ?? o.service ?? ""}
                      placeholder="remote.send_command"
                      @input=${(a) => this.updateCustomButtonAction(e, {
        action: "perform-action",
        perform_action: a.target.value
      })}
                    />
                  </div>

                  <div class="field">
                    <label>Target Entity ID</label>
                    <input
                      type="text"
                      .value=${n}
                      placeholder="remote.living_room_tv"
                      @input=${(a) => {
        const l = a.target.value.trim();
        this.updateCustomButtonAction(e, {
          target: l ? { entity_id: l } : void 0
        });
      }}
                    />
                  </div>
                </div>

                <div class="field">
                  <label>Action Data (JSON, supports Jinja2 templates)</label>
                  <textarea
                    rows="3"
                    .value=${s}
                    placeholder='{"command": "HOME"}'
                    @change=${(a) => {
        const l = a.target.value.trim();
        if (!l) {
          this.jsonErrorByBtn = { ...this.jsonErrorByBtn, [e]: "" }, this.updateCustomButtonAction(e, { data: void 0 });
          return;
        }
        try {
          const c = JSON.parse(l);
          this.jsonErrorByBtn = { ...this.jsonErrorByBtn, [e]: "" }, this.updateCustomButtonAction(e, { data: c });
        } catch {
          this.jsonErrorByBtn = {
            ...this.jsonErrorByBtn,
            [e]: "Invalid JSON format. Please check quotes and braces."
          };
        }
      }}
                  ></textarea>
                  ${this.jsonErrorByBtn[e] ? d`<span class="error-text">${this.jsonErrorByBtn[e]}</span>` : u}
                </div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
  render() {
    return d`
      <div class="editor-root">
        <div class="tabs">
          <button
            type="button"
            class="tab ${this.activeTab === "general" ? "active" : ""}"
            @click=${() => this.activeTab = "general"}
          >
            Entities & Style
          </button>
          <button
            type="button"
            class="tab ${this.activeTab === "elements" ? "active" : ""}"
            @click=${() => this.activeTab = "elements"}
          >
            Elements
          </button>
          <button
            type="button"
            class="tab ${this.activeTab === "custom_buttons" ? "active" : ""}"
            @click=${() => this.activeTab = "custom_buttons"}
          >
            Custom Buttons
          </button>
        </div>

        ${this.activeTab === "general" ? this.renderGeneralTab() : this.activeTab === "elements" ? this.renderElementsTab() : this.renderCustomButtonsTab()}
      </div>
    `;
  }
};
C.styles = k`
    .editor-root {
      display: flex;
      flex-direction: column;
      gap: 14px;
      color: var(--primary-text-color);
    }

    .tabs {
      display: flex;
      gap: 6px;
      border-bottom: 1px solid rgba(128, 128, 128, 0.25);
      padding-bottom: 8px;
    }

    .tab {
      flex: 1;
      padding: 8px 10px;
      border-radius: 8px;
      border: none;
      background: rgba(128, 128, 128, 0.12);
      color: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }

    .tab.active {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field label {
      font-size: 12px;
      opacity: 0.8;
    }

    .field input,
    .field select,
    .field textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid rgba(128, 128, 128, 0.35);
      background: var(--secondary-background-color, rgba(128, 128, 128, 0.1));
      color: inherit;
      font-size: 13px;
      font-family: inherit;
    }

    .row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .toolbar {
      display: flex;
      gap: 8px;
    }

    .btn {
      padding: 8px 12px;
      border-radius: 8px;
      border: none;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    }

    .btn.primary {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .btn.secondary {
      background: rgba(128, 128, 128, 0.2);
      color: inherit;
    }

    .item-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .item-card {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(128, 128, 128, 0.25);
      background: rgba(128, 128, 128, 0.06);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drag-handle {
      cursor: grab;
      font-size: 12px;
      font-weight: 600;
      opacity: 0.75;
    }

    .item-actions {
      display: flex;
      gap: 4px;
    }

    .mini-btn {
      padding: 3px 8px;
      border-radius: 6px;
      border: none;
      background: rgba(128, 128, 128, 0.2);
      color: inherit;
      cursor: pointer;
      font-size: 12px;
    }

    .mini-btn.danger {
      background: rgba(239, 68, 68, 0.22);
      color: #ef4444;
    }

    .mini-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .empty-hint {
      font-size: 13px;
      opacity: 0.65;
      padding: 12px 0;
      text-align: center;
    }

    .error-text {
      font-size: 12px;
      color: #ef4444;
    }
  `;
V([
  f({ attribute: !1 })
], C.prototype, "hass", 2);
V([
  v()
], C.prototype, "config", 2);
V([
  v()
], C.prototype, "activeTab", 2);
V([
  v()
], C.prototype, "dragIndex", 2);
V([
  v()
], C.prototype, "jsonErrorByBtn", 2);
C = V([
  T(ie)
], C);
