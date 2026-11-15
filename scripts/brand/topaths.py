# Convert PDF vector drawings (exact coordinates, nothing redrawn) to SVG path data.
import pymupdf
def hx(c):
    return None if c is None else "#%02x%02x%02x" % tuple(round(v*255) for v in c)
def f(v): return ("%.2f" % v).rstrip("0").rstrip(".")
def pt(p): return f(p.x) + " " + f(p.y)
def path_d(d):
    out, last = [], None
    for it in d["items"]:
        k = it[0]
        if k == "re":
            r = it[1]; out.append(f"M{pt(r.tl)}H{f(r.x1)}V{f(r.y1)}H{f(r.x0)}Z"); last = None; continue
        if k == "qu":
            q = it[1]; out.append(f"M{pt(q.ul)}L{pt(q.ur)}L{pt(q.lr)}L{pt(q.ll)}Z"); last = None; continue
        start = it[1]
        if last is None or abs(start.x-last.x) > 0.01 or abs(start.y-last.y) > 0.01:
            if out and d.get("closePath"): out.append("Z")
            out.append("M" + pt(start))
        if k == "l": out.append("L" + pt(it[2])); last = it[2]
        elif k == "c": out.append("C" + pt(it[2]) + " " + pt(it[3]) + " " + pt(it[4])); last = it[4]
    if d.get("closePath"): out.append("Z")
    return "".join(out)
def svg_el(d):
    attrs = []
    fill = hx(d.get("fill"))
    attrs.append(f'fill="{fill}"' if fill else 'fill="none"')
    if d.get("even_odd"): attrs.append('fill-rule="evenodd"')
    if d.get("color") is not None and d.get("width"):
        attrs.append(f'stroke="{hx(d["color"])}" stroke-width="{f(d["width"])}"')
        if d.get("lineCap"): attrs.append('stroke-linecap="round"' if max(d["lineCap"]) == 1 else "")
        if d.get("lineJoin") == 1: attrs.append('stroke-linejoin="round"')
    return f'<path d="{path_d(d)}" {" ".join(a for a in attrs if a)}/>'
