# Usage: python3 -I scripts/brand/extract_calligraphy.py "<Target Brand Guidelines 2024 (official).pdf>" <out-dir>
# Needs PyMuPDF (pip install pymupdf) in a private venv. Output is then optimised with `npm run svg`.
# Extract the guideline's calligraphy as exact vector SVGs (no redrawing).
# Paths are copied point-for-point from the PDF; repeated copies of a mark are
# written as <use> of one master path with the exact affine transform found
# by least squares (checked to < 0.05 pt error). Colours normalised to the
# guideline palette (BUILD-BRIEF 2.6).
import sys, pymupdf
sys.path.insert(0, sys.argv[0].rsplit("/", 1)[0])
from topaths import path_d, hx, f
G, OUT = sys.argv[1], sys.argv[2]
doc = pymupdf.open(G)
NORM = {"#0261a7": "#0161a6", "#0361a6": "#0161a6", "#2bba9e": "#2ab99d", "#38bba2": "#2ab99d"}
def col(c): h = hx(c); return NORM.get(h, h)

def pts(d):
    out = []
    for it in d["items"]:
        out += [p for p in it[1:] if isinstance(p, pymupdf.Point)]
    return out

def affine(src, dst):
    # solve dst = [a c e; b d f] * [x y 1]
    import itertools
    n = len(src); Sxx=Sxy=Syy=Sx=Sy=0.0
    for p in src: Sxx+=p.x*p.x; Sxy+=p.x*p.y; Syy+=p.y*p.y; Sx+=p.x; Sy+=p.y
    M = [[Sxx,Sxy,Sx],[Sxy,Syy,Sy],[Sx,Sy,n]]
    def solve(rhs):
        A = [row[:] + [rhs[i]] for i, row in enumerate(M)]
        for i in range(3):
            piv = max(range(i,3), key=lambda r: abs(A[r][i])); A[i], A[piv] = A[piv], A[i]
            for r in range(3):
                if r != i:
                    k = A[r][i]/A[i][i]; A[r] = [a-k*b for a,b in zip(A[r],A[i])]
        return [A[i][3]/A[i][i] for i in range(3)]
    bx = [sum(p.x*q.x for p,q in zip(src,dst)), sum(p.y*q.x for p,q in zip(src,dst)), sum(q.x for q in dst)]
    by = [sum(p.x*q.y for p,q in zip(src,dst)), sum(p.y*q.y for p,q in zip(src,dst)), sum(q.y for q in dst)]
    a, c, e = solve(bx); b, d, f_ = solve(by)
    err = max(abs(a*p.x+c*p.y+e-q.x)+abs(b*p.x+d*p.y+f_-q.y) for p,q in zip(src,dst))
    return (a,b,c,d,e,f_), err

def norm_d(d, ox, oy):
    # path data translated so the mark's bbox starts at 0,0
    m = pymupdf.Matrix(1,0,0,1,-ox,-oy)
    dd = dict(d); dd["items"] = [tuple(x * m if isinstance(x, pymupdf.Point) else (x * m if isinstance(x,(pymupdf.Rect,pymupdf.Quad)) else x) for x in it) for it in d["items"]]
    return path_d(dd)

def write(name, w, h, body):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {f(w)} {f(h)}">{body}</svg>'
    open(f"{OUT}/{name}", "w").write(s); print(name, len(s), "bytes")

# --- mark A: page 1, path 19 (ring with the fa/qaf letter forms)
A = doc[0].get_drawings()[19]; ra = A["rect"]
write("mark-a.svg", ra.width, ra.height, f'<path fill="currentColor" d="{norm_d(A, ra.x0, ra.y0)}"/>')
srcA = pts(A)

# --- mark B: page 40 blue set (ring + five separate strokes), one group
p40 = doc[39].get_drawings(); B = [p40[i] for i in (2, 1, 3, 4, 5, 6)]
rb = B[0]["rect"]
for d in B[1:]: rb = rb | d["rect"]
write("mark-b.svg", rb.width, rb.height, "".join(f'<path fill="currentColor" d="{norm_d(d, rb.x0, rb.y0)}"/>' for d in B))

# --- tiles: page 13 colour-combination grid (12 tiles), exact clips + colours
ds = doc[12].get_drawings(extended=True)
defs = f'<path id="a" d="{norm_d(A, ra.x0, ra.y0)}"/>'
body, tile, clip_n, worst = [], None, 0, 0
for d in ds:
    if d["type"] == "f" and d["level"] == 0 and len(d["items"]) == 1:
        r = d["rect"]; tile = r
        body.append(f'<rect x="{f(r.x0)}" y="{f(r.y0)}" width="{f(r.width)}" height="{f(r.height)}" fill="{col(d["fill"])}"/>')
    elif d["type"] == "clip" and tile is not None and d["scissor"].width < 200:
        clip_n += 1; r = d["scissor"]
        defs += f'<clipPath id="c{clip_n}"><rect x="{f(r.x0)}" y="{f(r.y0)}" width="{f(r.width)}" height="{f(r.height)}"/></clipPath>'
    elif d["type"] == "f" and d["level"] == 1 and len(d["items"]) == 79:
        src = [pymupdf.Point(p.x-ra.x0, p.y-ra.y0) for p in srcA]
        m, err = affine(src, pts(d)); worst = max(worst, err)
        body.append(f'<g clip-path="url(#c{clip_n})"><use href="#a" xlink:href="#a" fill="{col(d["fill"])}" transform="matrix({" ".join(f(v) for v in m)})"/></g>')
print("tiles: max transform error (pt)", round(worst, 4))
write("tiles.svg", 366.1, 595.3, f"<defs>{defs}</defs>" + "".join(body))

# --- welcome composition: page 2 (white mark A + blue circle), on a blue page
p2 = doc[1].get_drawings(); W2, H2 = doc[1].rect.width, doc[1].rect.height
m, err = affine([pymupdf.Point(p.x-ra.x0, p.y-ra.y0) for p in srcA], pts(p2[1]))
print("welcome: transform error", round(err, 4))
body = (f'<rect width="{f(W2)}" height="{f(H2)}" fill="#0161a6"/>'
        f'<use href="#a" xlink:href="#a" fill="#ffffff" transform="matrix({" ".join(f(v) for v in m)})"/>'
        f'<path d="{path_d(p2[2])}" fill="#0161a6"/>')
write("compose-welcome.svg", W2, H2, f"<defs>{defs.split('<clipPath')[0]}</defs>" + body)

# --- thank-you composition: page 40, every vector path (no text), exact order
p40 = doc[39]; W4, H4 = p40.rect.width, p40.rect.height
body = "".join(f'<path d="{path_d(d)}" fill="{col(d["fill"])}"/>' for d in p40.get_drawings())
write("compose-thankyou.svg", W4, H4, body)
