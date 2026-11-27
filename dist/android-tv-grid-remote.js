/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, gt = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = At.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && At.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Gt = (i) => new Ht(typeof i == "string" ? i : i + "", void 0, bt), E = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[n + 1], i[0]);
  return new Ht(e, i, bt);
}, Jt = (i, t) => {
  if (gt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), o = Q.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = e.cssText, i.appendChild(s);
  }
}, Et = gt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Gt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xt, defineProperty: Yt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: Qt, getOwnPropertySymbols: te, getPrototypeOf: ee } = Object, _ = globalThis, Ct = _.trustedTypes, ie = Ct ? Ct.emptyScript : "", lt = _.reactiveElementPolyfillSupport, W = (i, t) => i, tt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? ie : null;
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
} }, vt = (i, t) => !Xt(i, t), kt = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = kt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), o = this.getPropertyDescriptor(t, s, e);
      o !== void 0 && Yt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: o, set: n } = Kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const l = o == null ? void 0 : o.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = ee(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const e = this.properties, s = [...Qt(e), ...te(e)];
      for (const o of s) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, o] of e) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const o = this._$Eu(e, s);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) e.unshift(Et(o));
    } else t !== void 0 && e.push(Et(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Jt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : tt).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const l = s.getPropertyOptions(o), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : tt;
      this._$Em = o;
      const c = a.fromAttribute(e, l.type);
      this[o] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, o = !1, n) {
    var r;
    if (t !== void 0) {
      const l = this.constructor;
      if (o === !1 && (n = this[t]), s ?? (s = l.getPropertyOptions(t)), !((s.hasChanged ?? vt)(n, e) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(l._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, r] of o) {
        const { wrapped: l } = r, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
      }), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var o;
      return (o = s.hostUpdated) == null ? void 0 : o.call(s);
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[W("elementProperties")] = /* @__PURE__ */ new Map(), z[W("finalized")] = /* @__PURE__ */ new Map(), lt == null || lt({ ReactiveElement: z }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, Tt = (i) => i, et = F.trustedTypes, St = et ? et.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Nt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Lt = "?" + $, se = `<${Lt}>`, D = document, q = () => D.createComment(""), G = (i) => i === null || typeof i != "object" && typeof i != "function", yt = Array.isArray, oe = (i) => yt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", ct = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Ot = />/g, T = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Dt = /'/g, Mt = /"/g, Vt = /^(?:script|style|textarea|title)$/i, re = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), d = re(1), M = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), It = /* @__PURE__ */ new WeakMap(), P = D.createTreeWalker(D, 129);
function Zt(i, t) {
  if (!yt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return St !== void 0 ? St.createHTML(t) : t;
}
const ne = (i, t) => {
  const e = i.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Z;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let c, p, h = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, p = r.exec(a), p !== null); ) f = r.lastIndex, r === Z ? p[1] === "!--" ? r = Pt : p[1] !== void 0 ? r = Ot : p[2] !== void 0 ? (Vt.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = T) : p[3] !== void 0 && (r = T) : r === T ? p[0] === ">" ? (r = o ?? Z, h = -1) : p[1] === void 0 ? h = -2 : (h = r.lastIndex - p[2].length, c = p[1], r = p[3] === void 0 ? T : p[3] === '"' ? Mt : Dt) : r === Mt || r === Dt ? r = T : r === Pt || r === Ot ? r = Z : (r = T, o = void 0);
    const v = r === T && i[l + 1].startsWith("/>") ? " " : "";
    n += r === Z ? a + se : h >= 0 ? (s.push(c), a.slice(0, h) + Nt + a.slice(h) + $ + v) : a + $ + (h === -2 ? l : v);
  }
  return [Zt(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class J {
  constructor({ strings: t, _$litType$: e }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [c, p] = ne(t, e);
    if (this.el = J.createElement(c, s), P.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = P.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Nt)) {
          const f = p[r++], v = o.getAttribute(h).split($), k = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: k[2], strings: v, ctor: k[1] === "." ? le : k[1] === "?" ? ce : k[1] === "@" ? de : ot }), o.removeAttribute(h);
        } else h.startsWith($) && (a.push({ type: 6, index: n }), o.removeAttribute(h));
        if (Vt.test(o.tagName)) {
          const h = o.textContent.split($), f = h.length - 1;
          if (f > 0) {
            o.textContent = et ? et.emptyScript : "";
            for (let v = 0; v < f; v++) o.append(h[v], q()), P.nextNode(), a.push({ type: 2, index: ++n });
            o.append(h[f], q());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Lt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf($, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += $.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = D.createElement("template");
    return s.innerHTML = t, s;
  }
}
function R(i, t, e = i, s) {
  var r, l;
  if (t === M) return t;
  let o = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = G(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((l = o == null ? void 0 : o._$AO) == null || l.call(o, !1), n === void 0 ? o = void 0 : (o = new n(i), o._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = o : e._$Cl = o), o !== void 0 && (t = R(i, o._$AS(i, t.values), o, s)), t;
}
class ae {
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
    const { el: { content: e }, parts: s } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? D).importNode(e, !0);
    P.currentNode = o;
    let n = P.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new Y(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new ue(n, this, t)), this._$AV.push(c), a = s[++l];
      }
      r !== (a == null ? void 0 : a.index) && (n = P.nextNode(), r++);
    }
    return P.currentNode = D, o;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Y {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, o) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = R(this, t, e), G(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== M && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : oe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && G(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = J.createElement(Zt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(e);
    else {
      const r = new ae(o, this), l = r.u(this.options);
      r.p(e), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = It.get(t.strings);
    return e === void 0 && It.set(t.strings, e = new J(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, o = 0;
    for (const n of t) o === e.length ? e.push(s = new Y(this.O(q()), this.O(q()), this, this.options)) : s = e[o], s._$AI(n), o++;
    o < e.length && (this._$AR(s && s._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const o = Tt(t).nextSibling;
      Tt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, o, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = R(this, t, e, 0), r = !G(t) || t !== this._$AH && t !== M, r && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = R(this, l[s + a], e, a), c === M && (c = this._$AH[a]), r || (r = !G(c) || c !== this._$AH[a]), c === u ? t = u : t !== u && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class le extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ce extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class de extends ot {
  constructor(t, e, s, o, n) {
    super(t, e, s, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? u) === M) return;
    const s = this._$AH, o = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== u && (s === u || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ue {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const dt = F.litHtmlPolyfillSupport;
dt == null || dt(J, Y), (F.litHtmlVersions ?? (F.litHtmlVersions = [])).push("3.3.3");
const he = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = o = new Y(t.insertBefore(q(), n), n, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
let g = class extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = he(e, this.renderRoot, this.renderOptions);
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
    return M;
  }
};
var jt;
g._$litElement$ = !0, g.finalized = !0, (jt = O.litElementHydrateSupport) == null || jt.call(O, { LitElement: g });
const ut = O.litElementPolyfillSupport;
ut == null || ut({ LitElement: g });
(O.litElementVersions ?? (O.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: vt }, me = (i = pe, t, e) => {
  const { kind: s, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), n.set(e.name, i), s === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function m(i) {
  return (t, e) => typeof e == "object" ? me(i, t, e) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(i) {
  return m({ ...i, state: !0, attribute: !1 });
}
const Wt = "android-tv-grid-remote", Ft = "android-tv-grid-remote-editor", zt = {
  VOLUME_SET: 4,
  VOLUME_MUTE: 8
}, B = {
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
    icon: "mdi:movie-open",
    appActivity: "https://www.disneyplus.com",
    defaultColor: "#113ccf"
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
}, S = {
  columns: 4,
  align: "top",
  elements: [
    { id: "now_playing", columns: 4 },
    { id: "touch_pad", columns: 2 },
    { id: "power", columns: 1 },
    { id: "home", columns: 1 },
    { id: "back", columns: 1 },
    { id: "keyboard", columns: 1 },
    { id: "volume", columns: 4 },
    { id: "media_controls", columns: 4 }
  ]
}, fe = /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/;
function ge(i) {
  return typeof i == "string" && fe.test(i);
}
async function be(i, t, e) {
  return new Promise((s, o) => {
    let n = !1, r;
    const l = () => {
      if (r) {
        const c = r;
        r = void 0, Promise.resolve(c()).catch(() => {
        });
      }
    }, a = window.setTimeout(() => {
      n || (n = !0, l(), o(new Error(`Template render timed out: ${t}`)));
    }, 5e3);
    i.connection.subscribeMessage(
      (c) => {
        n || (n = !0, window.clearTimeout(a), l(), c.error ? o(new Error(c.error)) : s(c.result));
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
      n || (n = !0, window.clearTimeout(a), o(c));
    });
  });
}
async function it(i, t, e) {
  if (ge(t))
    return be(i, t, e);
  if (Array.isArray(t))
    return Promise.all(t.map((s) => it(i, s, e)));
  if (t !== null && typeof t == "object") {
    const s = await Promise.all(
      Object.entries(t).map(async ([o, n]) => [
        o,
        await it(i, n, e)
      ])
    );
    return Object.fromEntries(s);
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
async function st(i, t, e) {
  t && await i.callService(
    "remote",
    "send_command",
    { command: e },
    { entity_id: t }
  );
}
async function qt(i, t, e) {
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
async function K(i, t, e, s) {
  if (!e || e.action === "none") return;
  const o = s.entity || s.remoteEntity, n = {
    remote_entity: s.remoteEntity,
    entity: s.entity,
    volume_entity: s.volumeEntity || s.entity
  };
  switch (e.action) {
    case "perform-action":
    case "call-service": {
      const r = e.perform_action || e.service;
      if (!r || !r.includes(".")) return;
      const [l, a] = r.split(".", 2), c = e.data ?? e.service_data, p = c ? await it(t, c, n) : void 0, h = e.target ? await it(t, e.target, n) : void 0;
      await t.callService(l, a, p, h);
      break;
    }
    case "more-info": {
      const r = e.entity || o;
      r && mt(i, "hass-more-info", { entityId: r });
      break;
    }
    case "toggle": {
      const r = e.entity || o;
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
const ve = { CHILD: 2 }, ye = (i) => (...t) => ({ _$litDirective$: i, values: t });
class $e {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
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
class ft extends $e {
  constructor(t) {
    if (super(t), this.it = u, t.type !== ve.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === u || t == null) return this._t = void 0, this.it = t;
    if (t === M) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
ft.directiveName = "unsafeHTML", ft.resultType = 1;
const _e = ye(ft), xe = /* @__PURE__ */ new Set([
  "script",
  "foreignobject",
  "iframe",
  "object",
  "embed",
  "audio",
  "video"
]);
function we(i) {
  try {
    const e = new DOMParser().parseFromString(i.trim(), "image/svg+xml");
    if (e.querySelector("parsererror")) return null;
    const o = e.documentElement;
    if (!o || o.tagName.toLowerCase() !== "svg") return null;
    const n = (r) => {
      const l = Array.from(r.children);
      for (const a of l) {
        if (xe.has(a.tagName.toLowerCase())) {
          a.remove();
          continue;
        }
        n(a);
      }
      for (const a of Array.from(r.attributes)) {
        const c = a.name.toLowerCase(), p = a.value.trim().toLowerCase();
        (c.startsWith("on") || (c === "href" || c === "xlink:href") && p.startsWith("javascript:")) && r.removeAttribute(a.name);
      }
    };
    return n(o), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.hasAttribute("fill") || o.setAttribute("fill", "currentColor"), new XMLSerializer().serializeToString(o);
  } catch {
    return null;
  }
}
function Bt(i) {
  if (!i) return u;
  const t = i.trim();
  if (!t) return u;
  if (t.toLowerCase().startsWith("<svg")) {
    const e = we(t);
    return e ? d`<span class="atgr-svg-icon">${_e(e)}</span>` : u;
  }
  return t.startsWith("data:image/") || t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/local/") || t.startsWith("/api/") || t.startsWith("./") || t.startsWith("../") ? d`<img class="atgr-img-icon" src=${t} draggable="false" alt="" />` : d`<ha-icon .icon=${t}></ha-icon>`;
}
function Rt(i, t) {
  const e = Math.max(1, Math.round(t || 4)), s = [];
  let o = [], n = 0, r = 1;
  for (const l of i) {
    if (!l || !l.id) continue;
    const a = B[l.id], c = l.columns ?? (a == null ? void 0 : a.defaultColumns) ?? 1, p = Math.max(1, Math.min(e, Math.round(c))), h = (a == null ? void 0 : a.isHorizontalBar) ?? !1, f = h ? 1 : p;
    o.length > 0 && n + p > e && (s.push({
      items: o,
      maxRowUnits: r
    }), o = [], n = 0, r = 1), o.push({
      config: l,
      colSpan: p,
      rowUnits: f,
      isHorizontalBar: h
    }), n += p, f > r && (r = f);
  }
  return o.length > 0 && s.push({
    items: o,
    maxRowUnits: r
  }), s;
}
var Ae = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, $t = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Ee(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && Ae(t, e, o), o;
};
const Ut = {
  up: "DPAD_UP",
  down: "DPAD_DOWN",
  left: "DPAD_LEFT",
  right: "DPAD_RIGHT",
  center: "DPAD_CENTER"
}, Ce = 24, ke = 400, Te = 150;
let X = class extends g {
  constructor() {
    super(...arguments), this.disabled = !1, this.activeZone = null, this.pointerId = null, this.startX = 0, this.startY = 0, this.pressedZone = null, this.swiped = !1, this.holdRepeated = !1, this.holdDelayTimer = null, this.holdRepeatTimer = null, this.onPointerDown = (i) => {
      var e;
      if (this.disabled || i.pointerType === "mouse" && i.button !== 0) return;
      this.clearTimers();
      const t = i.currentTarget;
      if ((e = t.setPointerCapture) == null || e.call(t, i.pointerId), this.pointerId = i.pointerId, this.startX = i.clientX, this.startY = i.clientY, this.swiped = !1, this.holdRepeated = !1, this.pressedZone = this.detectZoneFromEvent(i), this.activeZone = this.pressedZone, this.pressedZone !== "center") {
        const s = this.pressedZone;
        this.holdDelayTimer = window.setTimeout(() => {
          this.swiped || (this.holdRepeated = !0, this.emitCommand(s), this.holdRepeatTimer = window.setInterval(() => {
            this.emitCommand(s);
          }, Te));
        }, ke);
      }
    }, this.onPointerMove = (i) => {
      if (this.pointerId !== i.pointerId || this.swiped) return;
      const t = i.clientX - this.startX, e = i.clientY - this.startY;
      if (Math.hypot(t, e) >= Ce) {
        this.swiped = !0, this.clearTimers();
        const o = Math.abs(t) > Math.abs(e) ? t > 0 ? "right" : "left" : e > 0 ? "down" : "up";
        this.activeZone = o, this.emitCommand(o);
      }
    }, this.onPointerUp = (i) => {
      this.pointerId === i.pointerId && (this.clearTimers(), !this.swiped && !this.holdRepeated && this.pressedZone && this.emitCommand(this.pressedZone), this.resetPointerState());
    }, this.onPointerCancel = (i) => {
      this.pointerId === i.pointerId && (this.clearTimers(), this.resetPointerState());
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearTimers();
  }
  clearTimers() {
    this.holdDelayTimer !== null && (window.clearTimeout(this.holdDelayTimer), this.holdDelayTimer = null), this.holdRepeatTimer !== null && (window.clearInterval(this.holdRepeatTimer), this.holdRepeatTimer = null);
  }
  emitCommand(i) {
    this.disabled || this.dispatchEvent(
      new CustomEvent("atgr-command", {
        bubbles: !0,
        composed: !0,
        detail: { command: Ut[i] }
      })
    );
  }
  detectZoneFromEvent(i) {
    var s;
    const t = i.target, e = (s = t == null ? void 0 : t.closest("[data-zone]")) == null ? void 0 : s.getAttribute("data-zone");
    return e && e in Ut ? e : "center";
  }
  resetPointerState() {
    this.pointerId = null, this.pressedZone = null, this.swiped = !1, this.holdRepeated = !1, this.activeZone = null;
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
X.styles = E`
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

    .sector:hover {
      fill: rgba(128, 128, 128, 0.12);
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

    .center-btn:hover {
      filter: brightness(1.08);
    }

    .center-btn.active,
    .center-btn:active {
      transform: scale(0.94);
      box-shadow:
        inset 0 2px 6px rgba(0, 0, 0, 0.35);
    }
  `;
$t([
  m({ type: Boolean })
], X.prototype, "disabled", 2);
$t([
  b()
], X.prototype, "activeZone", 2);
X = $t([
  C("atgr-touch-pad")
], X);
var Se = Object.defineProperty, Pe = Object.getOwnPropertyDescriptor, rt = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Pe(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && Se(t, e, o), o;
};
let U = class extends g {
  constructor() {
    super(...arguments), this.entityId = "", this.draggingValue = null, this.lastThrottleTs = 0, this.onSliderInput = (i) => {
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
    return i.attributes.is_volume_muted !== void 0 || (t & zt.VOLUME_MUTE) !== 0;
  }
  get supportsVolumeSet() {
    const i = this.entityState;
    if (!i) return !1;
    const t = i.attributes.supported_features ?? 0;
    return typeof i.attributes.volume_level == "number" || (t & zt.VOLUME_SET) !== 0;
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
    if (!this.supportsVolumeSet)
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
U.styles = E`
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
rt([
  m({ attribute: !1 })
], U.prototype, "hass", 2);
rt([
  m({ type: String })
], U.prototype, "entityId", 2);
rt([
  b()
], U.prototype, "draggingValue", 2);
U = rt([
  C("atgr-volume-bar")
], U);
var Oe = Object.defineProperty, De = Object.getOwnPropertyDescriptor, nt = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? De(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && Oe(t, e, o), o;
};
let j = class extends g {
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
      this.remoteEntity && await st(this.hass, this.remoteEntity, t);
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
j.styles = E`
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
  m({ attribute: !1 })
], j.prototype, "hass", 2);
nt([
  m({ type: String })
], j.prototype, "entityId", 2);
nt([
  m({ type: String })
], j.prototype, "remoteEntity", 2);
j = nt([
  C("atgr-media-controls")
], j);
var Me = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, at = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Ie(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && Me(t, e, o), o;
};
let H = class extends g {
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
    const i = this.targetEntity, t = (i == null ? void 0 : i.attributes) ?? {}, e = t.media_title || t.app_name || t.source || t.activity || t.friendly_name || "Android TV", s = t.media_title && (t.app_name || t.source) ? `${t.app_name || t.source} · ${(i == null ? void 0 : i.state) ?? ""}` : (i == null ? void 0 : i.state) ?? "unavailable", o = t.entity_picture;
    return d`
      <button
        type="button"
        class="now-playing"
        @click=${() => this.openMoreInfo()}
      >
        <div class="thumb">
          ${o ? d`<img src=${o} alt="" draggable="false" />` : d`<ha-icon icon="mdi:television"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${e}</div>
          <div class="subtitle">${s}</div>
        </div>
        <div class="state-dot ${(i == null ? void 0 : i.state) === "playing" || (i == null ? void 0 : i.state) === "on" ? "active" : ""}"></div>
      </button>
    `;
  }
};
H.styles = E`
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
  m({ attribute: !1 })
], H.prototype, "hass", 2);
at([
  m({ type: String })
], H.prototype, "entityId", 2);
at([
  m({ type: String })
], H.prototype, "remoteEntity", 2);
H = at([
  C("atgr-now-playing")
], H);
var ze = Object.defineProperty, Be = Object.getOwnPropertyDescriptor, y = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Be(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && ze(t, e, o), o;
};
let x = class extends g {
  constructor() {
    super(...arguments), this.remoteEntity = "", this.open = !1, this.text = "", this.mode = "activity";
  }
  close() {
    this.dispatchEvent(new CustomEvent("atgr-close", { bubbles: !0, composed: !0 }));
  }
  async submit(i) {
    i == null || i.preventDefault();
    const t = this.text.trim();
    !t || !this.hass || !this.remoteEntity || (this.mode === "activity" ? await qt(this.hass, this.remoteEntity, t) : await st(this.hass, this.remoteEntity, t), this.text = "", this.close());
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
x.styles = E`
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
y([
  m({ attribute: !1 })
], x.prototype, "hass", 2);
y([
  m({ type: String })
], x.prototype, "remoteEntity", 2);
y([
  m({ type: Boolean })
], x.prototype, "open", 2);
y([
  b()
], x.prototype, "text", 2);
y([
  b()
], x.prototype, "mode", 2);
x = y([
  C("atgr-keyboard-dialog")
], x);
let N = class extends g {
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
        <div class="dialog" @click=${(s) => s.stopPropagation()}>
          <div class="header">
            <span>Select Source / App</span>
            <button type="button" class="close-btn" @click=${this.close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="list">
            ${t.length === 0 ? d`<div class="empty">No sources available on ${this.entityId || "entity"}</div>` : t.map(
      (s) => d`
                    <button
                      type="button"
                      class="source-item ${s === e ? "active" : ""}"
                      @click=${() => this.selectSource(s)}
                    >
                      <span>${s}</span>
                      ${s === e ? d`<ha-icon icon="mdi:check"></ha-icon>` : u}
                    </button>
                  `
    )}
          </div>
        </div>
      </div>
    `;
  }
};
N.styles = E`
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
y([
  m({ attribute: !1 })
], N.prototype, "hass", 2);
y([
  m({ type: String })
], N.prototype, "entityId", 2);
y([
  m({ type: Boolean })
], N.prototype, "open", 2);
N = y([
  C("atgr-source-dialog")
], N);
var Re = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, L = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? Ue(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && Re(t, e, o), o;
};
const pt = 10;
let w = class extends g {
  constructor() {
    super(...arguments), this.cellSize = 64, this.keyboardOpen = !1, this.sourceOpen = !1, this.holdTimer = null, this.holdTriggered = !1, this.lastTapTs = 0, this.tapTimer = null;
  }
  static getConfigElement() {
    return document.createElement(Ft);
  }
  static getStubConfig(i) {
    const t = i != null && i.states ? Object.keys(i.states) : [], e = t.find((o) => o.startsWith("remote.")) ?? "remote.living_room_tv", s = t.find((o) => o.startsWith("media_player.")) ?? "media_player.living_room_tv";
    return {
      remote_entity: e,
      entity: s,
      columns: S.columns,
      align: S.align,
      elements: S.elements
    };
  }
  setConfig(i) {
    if (!i.remote_entity || !i.remote_entity.trim())
      throw new Error('Please configure a required "remote_entity" (e.g. remote.living_room_tv).');
    this.config = {
      ...S,
      ...i,
      columns: Math.max(1, Math.round(i.columns ?? S.columns ?? 4)),
      align: i.align ?? S.align ?? "top",
      elements: i.elements ?? S.elements ?? [],
      custom_buttons: i.custom_buttons ?? []
    };
  }
  getCardSize() {
    if (!this.config) return 4;
    const i = Rt(
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
    i && ((e = this.resizeObserver) == null || e.disconnect(), this.resizeObserver = new ResizeObserver((s) => {
      var o;
      for (const n of s) {
        const r = n.contentRect.width;
        if (r > 0) {
          const l = ((o = this.config) == null ? void 0 : o.columns) ?? 4, a = (r - pt * (l - 1)) / l;
          a > 0 && Math.abs(a - this.cellSize) > 0.5 && (this.cellSize = a);
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
    const t = B[i];
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
        st(this.hass, this.config.remote_entity, t.remoteCommand);
        return;
      }
      t.appActivity && qt(this.hass, this.config.remote_entity, t.appActivity);
    }
  }
  handleCustomButtonPointerDown(i) {
    this.holdTriggered = !1, this.holdTimer !== null && window.clearTimeout(this.holdTimer);
    const t = ht(i, "hold");
    t && (this.holdTimer = window.setTimeout(() => {
      this.holdTriggered = !0, this.hass && this.config && K(this, this.hass, t, {
        remoteEntity: this.config.remote_entity,
        entity: this.config.entity,
        volumeEntity: this.config.volume_entity
      });
    }, 450));
  }
  handleCustomButtonPointerUp(i) {
    if (this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null), this.holdTriggered || !this.hass || !this.config) return;
    const t = ht(i, "double_tap"), e = ht(i, "tap"), s = {
      remoteEntity: this.config.remote_entity,
      entity: this.config.entity,
      volumeEntity: this.config.volume_entity
    };
    if (t) {
      const o = Date.now();
      if (o - this.lastTapTs < 260) {
        this.tapTimer !== null && (window.clearTimeout(this.tapTimer), this.tapTimer = null), this.lastTapTs = 0, K(this, this.hass, t, s);
        return;
      }
      this.lastTapTs = o, this.tapTimer = window.setTimeout(() => {
        this.tapTimer = null, this.hass && e && K(this, this.hass, e, s);
      }, 260);
      return;
    }
    e && K(this, this.hass, e, s);
  }
  renderElementItem(i, t) {
    var p, h, f, v, k, _t, xt, wt;
    const { config: e, colSpan: s, rowUnits: o } = i, n = B[e.id], r = t.get(e.id), l = e.color ?? (r == null ? void 0 : r.color) ?? (n == null ? void 0 : n.defaultColor) ?? ((p = this.config) == null ? void 0 : p.color) ?? "var(--primary-text-color, #ffffff)", a = e.background ?? (r == null ? void 0 : r.background) ?? (n == null ? void 0 : n.defaultBackground) ?? ((h = this.config) == null ? void 0 : h.background) ?? "var(--secondary-background-color, #2a2a2a)", c = `
      grid-column: span ${s};
      height: calc(${this.cellSize}px * ${o} + ${pt}px * ${o - 1});
      --atgr-el-color: ${l};
      --atgr-el-bg: ${a};
    `;
    if (e.id === "spacer")
      return d`<div class="grid-item spacer" style=${c} aria-hidden="true"></div>`;
    if (e.id === "touch_pad")
      return d`
        <div class="grid-item" style=${c}>
          <atgr-touch-pad
            @atgr-command=${(I) => {
        this.hass && this.config && st(this.hass, this.config.remote_entity, I.detail.command);
      }}
          ></atgr-touch-pad>
        </div>
      `;
    if (e.id === "volume") {
      const I = ((f = this.config) == null ? void 0 : f.volume_entity) || ((v = this.config) == null ? void 0 : v.entity) || "";
      return d`
        <div class="grid-item" style=${c}>
          <atgr-volume-bar .hass=${this.hass} .entityId=${I}></atgr-volume-bar>
        </div>
      `;
    }
    if (e.id === "media_controls")
      return d`
        <div class="grid-item" style=${c}>
          <atgr-media-controls
            .hass=${this.hass}
            .entityId=${((k = this.config) == null ? void 0 : k.entity) ?? ""}
            .remoteEntity=${((_t = this.config) == null ? void 0 : _t.remote_entity) ?? ""}
          ></atgr-media-controls>
        </div>
      `;
    if (e.id === "now_playing")
      return d`
        <div class="grid-item" style=${c}>
          <atgr-now-playing
            .hass=${this.hass}
            .entityId=${((xt = this.config) == null ? void 0 : xt.entity) ?? ""}
            .remoteEntity=${((wt = this.config) == null ? void 0 : wt.remote_entity) ?? ""}
          ></atgr-now-playing>
        </div>
      `;
    if (r) {
      const I = Bt(r.icon);
      return d`
        <div class="grid-item" style=${c}>
          <button
            type="button"
            class="circle-btn"
            title=${r.friendly_name || r.id}
            aria-label=${r.friendly_name || r.id}
            @pointerdown=${() => this.handleCustomButtonPointerDown(r)}
            @pointerup=${() => this.handleCustomButtonPointerUp(r)}
            @pointercancel=${() => this.clearActionTimers()}
          >
            ${I !== u ? I : d`<span class="btn-label">${r.friendly_name || r.id}</span>`}
          </button>
        </div>
      `;
    }
    return n ? d`
        <div class="grid-item" style=${c}>
          <button
            type="button"
            class="circle-btn"
            title=${n.label}
            aria-label=${n.label}
            @click=${() => this.handleBuiltInButtonClick(e.id)}
          >
            ${Bt(n.icon)}
          </button>
        </div>
      ` : d`
      <div class="grid-item" style=${c}>
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
    const i = this.config.columns ?? 4, t = Rt(this.config.elements ?? [], i), e = this.customButtonsMap, s = this.mapAlign(this.config.align), o = `
      --atgr-cols: ${i};
      --atgr-cell-size: ${this.cellSize}px;
      --atgr-gap: ${pt}px;
      --atgr-align: ${s};
      ${this.config.color ? `color: ${this.config.color};` : ""}
    `;
    return d`
      <ha-card style=${o}>
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
w.styles = E`
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

    .circle-btn:hover {
      filter: brightness(1.08);
    }

    .circle-btn:active {
      transform: scale(0.92);
    }

    .circle-btn ha-icon {
      --mdc-icon-size: 42%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .atgr-img-icon {
      width: 54%;
      height: 54%;
      object-fit: contain;
      pointer-events: none;
    }

    .atgr-svg-icon {
      width: 48%;
      height: 48%;
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
  m({ attribute: !1 })
], w.prototype, "hass", 2);
L([
  b()
], w.prototype, "config", 2);
L([
  b()
], w.prototype, "cellSize", 2);
L([
  b()
], w.prototype, "keyboardOpen", 2);
L([
  b()
], w.prototype, "sourceOpen", 2);
w = L([
  C(Wt)
], w);
window.customCards = window.customCards || [];
window.customCards.push({
  type: Wt,
  name: "Android TV Grid Remote",
  description: "Modular grid-based Android TV & universal remote card with touch pad, volume slider, and custom buttons.",
  preview: !0
});
var je = Object.defineProperty, He = Object.getOwnPropertyDescriptor, V = (i, t, e, s) => {
  for (var o = s > 1 ? void 0 : s ? He(t, e) : t, n = i.length - 1, r; n >= 0; n--)
    (r = i[n]) && (o = (s ? r(t, e, o) : r(o)) || o);
  return s && o && je(t, e, o), o;
};
let A = class extends g {
  constructor() {
    super(...arguments), this.activeTab = "general", this.dragIndex = null, this.jsonErrorByBtn = {};
  }
  setConfig(i) {
    this.config = {
      ...i,
      columns: i.columns ?? 4,
      align: i.align ?? "top",
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
    const i = Object.values(B).map((s) => ({
      id: s.id,
      label: `${s.label} [${s.id}]`
    })), t = (((e = this.config) == null ? void 0 : e.custom_buttons) ?? []).filter((s) => !!s.id).map((s) => ({
      id: s.id,
      label: `Custom: ${s.friendly_name || s.id} [${s.id}]`
    }));
    return [...i, ...t];
  }
  // --- Elements CRUD & Reorder ---
  updateElement(i, t) {
    if (!this.config) return;
    const e = [...this.config.elements ?? []], s = { ...e[i], ...t };
    s.color === "" && delete s.color, s.background === "" && delete s.background, e[i] = s, this.emitConfig({ ...this.config, elements: e });
  }
  addElement(i = "home") {
    if (!this.config) return;
    const t = B[i], e = [
      ...this.config.elements ?? [],
      { id: i, columns: (t == null ? void 0 : t.defaultColumns) ?? 1 }
    ];
    this.emitConfig({ ...this.config, elements: e });
  }
  removeElement(i) {
    if (!this.config) return;
    const t = (this.config.elements ?? []).filter((e, s) => s !== i);
    this.emitConfig({ ...this.config, elements: t });
  }
  moveElement(i, t) {
    if (!this.config) return;
    const e = [...this.config.elements ?? []];
    if (t < 0 || t >= e.length || i === t) return;
    const [s] = e.splice(i, 1);
    e.splice(t, 0, s), this.emitConfig({ ...this.config, elements: e });
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
    const e = [...this.config.custom_buttons ?? []], s = { ...e[i], ...t };
    s.color === "" && delete s.color, s.background === "" && delete s.background, e[i] = s, this.emitConfig({ ...this.config, custom_buttons: e });
  }
  updateCustomButtonAction(i, t) {
    if (!this.config) return;
    const e = [...this.config.custom_buttons ?? []], s = e[i].tap_action ?? {
      action: "perform-action"
    };
    e[i] = {
      ...e[i],
      tap_action: { ...s, ...t }
    }, this.emitConfig({ ...this.config, custom_buttons: e });
  }
  removeCustomButton(i) {
    if (!this.config) return;
    const t = (this.config.custom_buttons ?? []).filter((e, s) => s !== i);
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
      (e, s) => {
        var o, n;
        return d`
              <div
                class="item-card"
                draggable="true"
                @dragstart=${() => {
          this.dragIndex = s;
        }}
                @dragover=${(r) => r.preventDefault()}
                @drop=${(r) => {
          r.preventDefault(), this.dragIndex !== null && (this.moveElement(this.dragIndex, s), this.dragIndex = null);
        }}
              >
                <div class="item-header">
                  <span class="drag-handle" title="Drag to reorder">⋮⋮ #${s + 1}</span>
                  <div class="item-actions">
                    <button
                      type="button"
                      class="mini-btn"
                      ?disabled=${s === 0}
                      @click=${() => this.moveElement(s, s - 1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      class="mini-btn"
                      ?disabled=${s === i.length - 1}
                      @click=${() => this.moveElement(s, s + 1)}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      class="mini-btn danger"
                      @click=${() => this.removeElement(s)}
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
                      @change=${(r) => this.updateElement(s, {
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
                      max=${((o = this.config) == null ? void 0 : o.columns) ?? 4}
                      .value=${String(
          e.columns ?? ((n = B[e.id]) == null ? void 0 : n.defaultColumns) ?? 1
        )}
                      @input=${(r) => this.updateElement(s, {
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
                      @input=${(r) => this.updateElement(s, {
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
                      @input=${(r) => this.updateElement(s, {
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
      const s = t.tap_action ?? {}, o = s.data ? JSON.stringify(s.data, null, 2) : "", n = typeof ((r = s.target) == null ? void 0 : r.entity_id) == "string" ? s.target.entity_id : "";
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
                      @input=${(l) => this.updateCustomButton(e, {
        id: l.target.value.trim()
      })}
                    />
                  </div>

                  <div class="field">
                    <label>Friendly Name</label>
                    <input
                      type="text"
                      .value=${t.friendly_name ?? ""}
                      @input=${(l) => this.updateCustomButton(e, {
        friendly_name: l.target.value
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
                    @input=${(l) => this.updateCustomButton(e, {
        icon: l.target.value
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
                      @input=${(l) => this.updateCustomButton(e, {
        color: l.target.value
      })}
                    />
                  </div>

                  <div class="field">
                    <label>Background</label>
                    <input
                      type="text"
                      .value=${t.background ?? ""}
                      placeholder="Inherit default"
                      @input=${(l) => this.updateCustomButton(e, {
        background: l.target.value
      })}
                    />
                  </div>
                </div>

                <div class="row-2">
                  <div class="field">
                    <label>Tap Action (Service)</label>
                    <input
                      type="text"
                      .value=${s.perform_action ?? s.service ?? ""}
                      placeholder="remote.send_command"
                      @input=${(l) => this.updateCustomButtonAction(e, {
        action: "perform-action",
        perform_action: l.target.value
      })}
                    />
                  </div>

                  <div class="field">
                    <label>Target Entity ID</label>
                    <input
                      type="text"
                      .value=${n}
                      placeholder="remote.living_room_tv"
                      @input=${(l) => {
        const a = l.target.value.trim();
        this.updateCustomButtonAction(e, {
          target: a ? { entity_id: a } : void 0
        });
      }}
                    />
                  </div>
                </div>

                <div class="field">
                  <label>Action Data (JSON, supports Jinja2 templates)</label>
                  <textarea
                    rows="3"
                    .value=${o}
                    placeholder='{"command": "HOME"}'
                    @change=${(l) => {
        const a = l.target.value.trim();
        if (!a) {
          this.jsonErrorByBtn = { ...this.jsonErrorByBtn, [e]: "" }, this.updateCustomButtonAction(e, { data: void 0 });
          return;
        }
        try {
          const c = JSON.parse(a);
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
A.styles = E`
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
  m({ attribute: !1 })
], A.prototype, "hass", 2);
V([
  b()
], A.prototype, "config", 2);
V([
  b()
], A.prototype, "activeTab", 2);
V([
  b()
], A.prototype, "dragIndex", 2);
V([
  b()
], A.prototype, "jsonErrorByBtn", 2);
A = V([
  C(Ft)
], A);
