export class Sha256{
	inst: Object;
	constructor(){
		this.inst = (function (H) {
			function v(c, a, b) {
				var g = 0, d = [], f = 0, e, h, n, l, m, F, r, p = !1, k = !1, q = [], t = [], u, y = !1;
				b = b || {};
				e = b.encoding || "UTF8";
				u = b.numRounds || 1;
				n = z(a, e);
				if (u !== parseInt(u, 10) || 1 > u)throw Error("numRounds must a integer >= 1");
				F = function (a, b) {
					return A(a, b, c)
				};
				r = function (a, b, f, d) {
					var g, e;
					if ("SHA-224" === c || "SHA-256" === c)g = (b + 72 >>> 9 << 4) + 15, e = 16; else throw Error("Unexpected error in SHA-2 implementation");
					for (; a.length <= g;)a.push(0);
					a[b >>> 5] |= 128 << 24 - b % 32;
					a[g] = b + f;
					f = a.length;
					for (b = 0; b < f; b += e)d = A(a.slice(b,
						b + e), d, c);
					if ("SHA-224" === c)a = [d[0], d[1], d[2], d[3], d[4], d[5], d[6]]; else if ("SHA-256" === c)a = d; else throw Error("Unexpected error in SHA-2 implementation");
					return a
				};
				if ("SHA-224" === c)m = 512, l = 224; else if ("SHA-256" === c)m = 512, l = 256; else throw Error("Chosen SHA variant is not supported");
				h = w(c);
				this.setHMACKey = function (a, b, d) {
					var f;
					if (!0 === k)throw Error("HMAC key already set");
					if (!0 === p)throw Error("Cannot set HMAC key after finalizing hash");
					if (!0 === y)throw Error("Cannot set HMAC key after calling update");
					e = (d || {}).encoding || "UTF8";
					b = z(b, e)(a);
					a = b.binLen;
					b = b.value;
					f = m >>> 3;
					d = f / 4 - 1;
					if (f < a / 8) {
						for (b = r(b, a, 0, w(c)); b.length <= d;)b.push(0);
						b[d] &= 4294967040
					} else if (f > a / 8) {
						for (; b.length <= d;)b.push(0);
						b[d] &= 4294967040
					}
					for (a = 0; a <= d; a += 1)q[a] = b[a] ^ 909522486, t[a] = b[a] ^ 1549556828;
					h = F(q, h);
					g = m;
					k = !0
				};
				this.update = function (a) {
					var b, c, e, l = 0, p = m >>> 5;
					b = n(a, d, f);
					a = b.binLen;
					c = b.value;
					b = a >>> 5;
					for (e = 0; e < b; e += p)l + m <= a && (h = F(c.slice(e, e + p), h), l += m);
					g += l;
					d = c.slice(l >>> 5);
					f = a % m;
					y = !0
				};
				this.getHash = function (a, b) {
					var e, m, n;
					if (!0 ===
						k)throw Error("Cannot call getHash after setting HMAC key");
					n = B(b);
					switch (a) {
						case "HEX":
							e = function (a) {
								return C(a, n)
							};
							break;
						case "B64":
							e = function (a) {
								return D(a, n)
							};
							break;
						case "BYTES":
							e = E;
							break;
						default:
							throw Error("format must be HEX, B64, or BYTES");
					}
					if (!1 === p)for (h = r(d, f, g, h), m = 1; m < u; m += 1)h = r(h, l, 0, w(c));
					p = !0;
					return e(h)
				};
				this.getHMAC = function (a, b) {
					var e, n, q;
					if (!1 === k)throw Error("Cannot call getHMAC without first setting HMAC key");
					q = B(b);
					switch (a) {
						case "HEX":
							e = function (a) {
								return C(a, q)
							};
							break;
						case "B64":
							e =
								function (a) {
									return D(a, q)
								};
							break;
						case "BYTES":
							e = E;
							break;
						default:
							throw Error("outputFormat must be HEX, B64, or BYTES");
					}
					!1 === p && (n = r(d, f, g, h), h = F(t, w(c)), h = r(n, l, m, h));
					p = !0;
					return e(h)
				}
			}

			function k() {
			}

			function I(c, a, b) {
				var g = c.length, d, f, e, h, n;
				a = a || [0];
				b = b || 0;
				n = b >>> 3;
				if (0 !== g % 2)throw Error("String of HEX type must be in byte increments");
				for (d = 0; d < g; d += 2) {
					f = parseInt(c.substr(d, 2), 16);
					if (isNaN(f))throw Error("String of HEX type contains invalid characters");
					h = (d >>> 1) + n;
					for (e = h >>> 2; a.length <= e;)a.push(0);
					a[e] |= f << 8 * (3 - h % 4)
				}
				return {value: a, binLen: 4 * g + b}
			}

			function J(c, a, b) {
				var g = [], d, f, e, h, g = a || [0];
				b = b || 0;
				f = b >>> 3;
				for (d = 0; d < c.length; d += 1)a = c.charCodeAt(d), h = d + f, e = h >>> 2, g.length <= e && g.push(0), g[e] |= a << 8 * (3 - h % 4);
				return {value: g, binLen: 8 * c.length + b}
			}

			function K(c, a, b) {
				var g = [], d = 0, f, e, h, n, l, m, g = a || [0];
				b = b || 0;
				a = b >>> 3;
				if (-1 === c.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");
				e = c.indexOf("=");
				c = c.replace(/\=/g, "");
				if (-1 !== e && e < c.length)throw Error("Invalid '=' found in base-64 string");
				for (e = 0; e < c.length; e += 4) {
					l = c.substr(e, 4);
					for (h = n = 0; h < l.length; h += 1)f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(l[h]), n |= f << 18 - 6 * h;
					for (h = 0; h < l.length - 1; h += 1) {
						m = d + a;
						for (f = m >>> 2; g.length <= f;)g.push(0);
						g[f] |= (n >>> 16 - 8 * h & 255) << 8 * (3 - m % 4);
						d += 1
					}
				}
				return {value: g, binLen: 8 * d + b}
			}

			function C(c, a) {
				var b = "", g = 4 * c.length, d, f;
				for (d = 0; d < g; d += 1)f = c[d >>> 2] >>> 8 * (3 - d % 4), b += "0123456789abcdef".charAt(f >>> 4 & 15) + "0123456789abcdef".charAt(f & 15);
				return a.outputUpper ? b.toUpperCase() : b
			}

			function D(c,
			           a) {
				var b = "", g = 4 * c.length, d, f, e;
				for (d = 0; d < g; d += 3)for (e = d + 1 >>> 2, f = c.length <= e ? 0 : c[e], e = d + 2 >>> 2, e = c.length <= e ? 0 : c[e], e = (c[d >>> 2] >>> 8 * (3 - d % 4) & 255) << 16 | (f >>> 8 * (3 - (d + 1) % 4) & 255) << 8 | e >>> 8 * (3 - (d + 2) % 4) & 255, f = 0; 4 > f; f += 1)8 * d + 6 * f <= 32 * c.length ? b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 6 * (3 - f) & 63) : b += a.b64Pad;
				return b
			}

			function E(c) {
				var a = "", b = 4 * c.length, g, d;
				for (g = 0; g < b; g += 1)d = c[g >>> 2] >>> 8 * (3 - g % 4) & 255, a += String.fromCharCode(d);
				return a
			}

			function B(c) {
				var a = {outputUpper: !1, b64Pad: "="};
				c = c || {};
				a.outputUpper = c.outputUpper || !1;
				a.b64Pad = c.b64Pad || "=";
				if ("boolean" !== typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");
				if ("string" !== typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");
				return a
			}

			function z(c, a) {
				var b;
				switch (a) {
					case "UTF8":
					case "UTF16BE":
					case "UTF16LE":
						break;
					default:
						throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
				}
				switch (c) {
					case "HEX":
						b = I;
						break;
					case "TEXT":
						b = function (b, c, f) {
							var e = [], h = [], n = 0, l, m, k, r, p, e = c || [0];
							c = f || 0;
							k = c >>> 3;
							if ("UTF8" ===
								a)for (l = 0; l < b.length; l += 1)for (f = b.charCodeAt(l), h = [], 128 > f ? h.push(f) : 2048 > f ? (h.push(192 | f >>> 6), h.push(128 | f & 63)) : 55296 > f || 57344 <= f ? h.push(224 | f >>> 12, 128 | f >>> 6 & 63, 128 | f & 63) : (l += 1, f = 65536 + ((f & 1023) << 10 | b.charCodeAt(l) & 1023), h.push(240 | f >>> 18, 128 | f >>> 12 & 63, 128 | f >>> 6 & 63, 128 | f & 63)), m = 0; m < h.length; m += 1) {
								p = n + k;
								for (r = p >>> 2; e.length <= r;)e.push(0);
								e[r] |= h[m] << 8 * (3 - p % 4);
								n += 1
							} else if ("UTF16BE" === a || "UTF16LE" === a)for (l = 0; l < b.length; l += 1) {
								f = b.charCodeAt(l);
								"UTF16LE" === a && (m = f & 255, f = m << 8 | f >>> 8);
								p = n + k;
								for (r = p >>>
									2; e.length <= r;)e.push(0);
								e[r] |= f << 8 * (2 - p % 4);
								n += 2
							}
							return {value: e, binLen: 8 * n + c}
						};
						break;
					case "B64":
						b = K;
						break;
					case "BYTES":
						b = J;
						break;
					default:
						throw Error("format must be HEX, TEXT, B64, or BYTES");
				}
				return b
			}

			function t(c, a) {
				return c >>> a | c << 32 - a
			}

			function L(c, a, b) {
				return c & a ^ ~c & b
			}

			function M(c, a, b) {
				return c & a ^ c & b ^ a & b
			}

			function N(c) {
				return t(c, 2) ^ t(c, 13) ^ t(c, 22)
			}

			function O(c) {
				return t(c, 6) ^ t(c, 11) ^ t(c, 25)
			}

			function P(c) {
				return t(c, 7) ^ t(c, 18) ^ c >>> 3
			}

			function Q(c) {
				return t(c, 17) ^ t(c, 19) ^ c >>> 10
			}

			function R(c, a) {
				var b =
					(c & 65535) + (a & 65535);
				return ((c >>> 16) + (a >>> 16) + (b >>> 16) & 65535) << 16 | b & 65535
			}

			function S(c, a, b, g) {
				var d = (c & 65535) + (a & 65535) + (b & 65535) + (g & 65535);
				return ((c >>> 16) + (a >>> 16) + (b >>> 16) + (g >>> 16) + (d >>> 16) & 65535) << 16 | d & 65535
			}

			function T(c, a, b, g, d) {
				var f = (c & 65535) + (a & 65535) + (b & 65535) + (g & 65535) + (d & 65535);
				return ((c >>> 16) + (a >>> 16) + (b >>> 16) + (g >>> 16) + (d >>> 16) + (f >>> 16) & 65535) << 16 | f & 65535
			}

			function w(c) {
				var a, b;
				a = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
				b = [1779033703, 3144134277,
					1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
				switch (c) {
					case "SHA-224":
						c = a;
						break;
					case "SHA-256":
						c = b;
						break;
					case "SHA-384":
						c = [new k, new k, new k, new k, new k, new k, new k, new k];
						break;
					case "SHA-512":
						c = [new k, new k, new k, new k, new k, new k, new k, new k];
						break;
					default:
						throw Error("Unknown SHA variant");
				}
				return c
			}

			function A(c, a, b) {
				var g, d, f, e, h, n, l, m, k, r, p, t, q, v, u, y, w, z, A, B, C, D, x = [], E;
				if ("SHA-224" === b || "SHA-256" === b)r = 64, t = 1, D = Number, q = R, v = S, u = T, y = P, w = Q, z = N, A = O, C = M, B = L, E = G; else throw Error("Unexpected error in SHA-2 implementation");
				b = a[0];
				g = a[1];
				d = a[2];
				f = a[3];
				e = a[4];
				h = a[5];
				n = a[6];
				l = a[7];
				for (p = 0; p < r; p += 1)16 > p ? (k = p * t, m = c.length <= k ? 0 : c[k], k = c.length <= k + 1 ? 0 : c[k + 1], x[p] = new D(m, k)) : x[p] = v(w(x[p - 2]), x[p - 7], y(x[p - 15]), x[p - 16]), m = u(l, A(e), B(e, h, n), E[p], x[p]), k = q(z(b), C(b, g, d)), l = n, n = h, h = e, e = q(f, m), f = d, d = g, g = b, b = q(m, k);
				a[0] = q(b, a[0]);
				a[1] = q(g, a[1]);
				a[2] = q(d, a[2]);
				a[3] = q(f, a[3]);
				a[4] = q(e, a[4]);
				a[5] = q(h, a[5]);
				a[6] = q(n, a[6]);
				a[7] = q(l, a[7]);
				return a
			}

			var G;
			G = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
				3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063,
				1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
			"function" === typeof define && define.amd ? define(function () {
				return v
			}) : "undefined" !== typeof exports ? "undefined" !== typeof module && module.exports ? module.exports = exports = v : exports = v : H.jsSHA = v
		})(this);
	}
}
