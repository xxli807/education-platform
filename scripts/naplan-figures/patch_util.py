"""Tiny helpers for exact-text edits to src/data/testsContent.ts (each edit must match once)."""
import json, os, re
ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
CONTENT = os.path.join(ROOT, "src", "data", "testsContent.ts")
LEGACY = os.path.join(ROOT, "src", "data", "testsLegacyIds.ts")


def J(v):
    return json.dumps(v, ensure_ascii=False)


def q(type, n, prompt, options=None, figure=None, alt=None, width=None, **extra):
    """A question object as TS source."""
    parts = [f"type: '{type}'", f"n: '{n}'", f"prompt: {J(prompt)}"]
    if options is not None:
        parts.append(f"options: {J(options)}")
    for k, v in extra.items():
        parts.append(f"{k}: {J(v)}")
    if figure:
        parts.append(f"figure: 'tests/{figure}.svg'")
        if alt:
            parts.append(f"figureAlt: {J(alt)}")
        if width:
            parts.append(f"figureWidth: {width}")
    return "{ " + ", ".join(parts) + " }"


def block(heading, questions, instructions=None, image=None, numeric=None, image_width=None):
    out = [f"heading: {J(heading)}"]
    if instructions:
        out.append(f"instructions: {J(instructions)}")
    if numeric:
        out.append("numeric: true")
    if image:
        out.append(f"image: 'tests/{image}.svg'")
        if image_width:
            out.append(f"imageWidth: {image_width}")
    out.append("questions: [\n" + ",\n".join(questions) + ",\n]")
    return "{\n" + ",\n".join(out) + ",\n}"


class Content:
    def __init__(self):
        self.s = open(CONTENT).read()

    def day_span(self, week, day):
        """(start, end) character span of `day: 'Day N'` inside `label: 'Week W'`."""
        w = self.s.index(f"label: 'Week {week}'")
        d = self.s.index(f"day: 'Day {day}'", w)
        nxt = self.s.find("day: 'Day ", d + 10)
        wk_next = self.s.find("label: 'Week ", w + 10)
        ends = [x for x in (nxt, wk_next) if x != -1]
        return d, min(ends) if ends else len(self.s)

    def replace_in_day(self, week, day, old, new):
        a, b = self.day_span(week, day)
        seg = self.s[a:b]
        assert seg.count(old) == 1, (week, day, old[:80], seg.count(old))
        self.s = self.s[:a] + seg.replace(old, new) + self.s[b:]

    def save(self):
        open(CONTENT, "w").write(self.s)


def relink_legacy(old_stable, new_stable):
    """An existing question was renumbered: point its old saved answer at the new id."""
    s = open(LEGACY).read()
    assert s.count(J(old_stable)) == 1, old_stable
    s = s.replace(J(old_stable), J(new_stable))
    open(LEGACY, "w").write(s)


def _match_brace(s, i):
    """Index just past the `}` matching the `{` at s[i] (ignores braces inside strings)."""
    depth, j, quote = 0, i, None
    while j < len(s):
        c = s[j]
        if quote:
            if c == "\\":
                j += 2; continue
            if c == quote:
                quote = None
        elif c in "'\"`":
            quote = c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return j + 1
        j += 1
    raise ValueError("unbalanced")


def _blocks_array(c, week, day):
    a, b = c.day_span(week, day)
    k = c.s.index("blocks: [", a)
    assert k < b
    start = k + len("blocks: [")
    # walk top-level block objects
    items, j = [], start
    while True:
        while c.s[j] in " \n\t,":
            j += 1
        if c.s[j] == "]":
            return start, j, items
        if c.s.startswith("//", j):
            j = c.s.index("\n", j); continue
        end = _match_brace(c.s, j)
        items.append(c.s[j:end]); j = end


def heading_of(block_src):
    m = re.search(r"heading:\s*(['\"])(.*?)\1", block_src, re.S)
    return m.group(2)


def set_blocks(c, week, day, order):
    """Rebuild a day's blocks: `order` lists existing headings (str) or new block source (dict {'src': ...})."""
    start, end, items = _blocks_array(c, week, day)
    by_heading = {}
    for it in items:
        h = heading_of(it)
        assert h not in by_heading, ("duplicate heading in day", h)
        by_heading[h] = it
    used, out = set(), []
    for o in order:
        if isinstance(o, dict):
            out.append(o["src"])
        else:
            out.append(by_heading[o]); used.add(o)
    missing = set(by_heading) - used
    assert not missing, ("blocks dropped", missing)
    c.s = c.s[:start] + "\n" + ",\n".join(out) + ",\n" + c.s[end:]


def list_headings(c, week, day):
    return [heading_of(it) for it in _blocks_array(c, week, day)[2]]


def add_fig(c, week, day, prompt_snippet, figure, alt, width=None):
    """Give the question whose source contains `prompt_snippet` (once in the day) a picture."""
    a, b = c.day_span(week, day)
    seg = c.s[a:b]
    assert seg.count(prompt_snippet) == 1, (prompt_snippet, seg.count(prompt_snippet))
    i = seg.index(prompt_snippet)
    start = seg.rindex("{", 0, i)
    end = start + _match_brace(seg[start:], 0)
    extra = f"figure: 'tests/{figure}.svg', figureAlt: {J(alt)}" + (f", figureWidth: {width}" if width else "")
    new = seg[start:end][:-1].rstrip().rstrip(",") + ", " + extra + " }"
    c.s = c.s[:a] + seg[:start] + new + seg[end:] + c.s[b:]


def insert_after(c, week, day, prompt_snippet, new_src):
    """Insert question source right after the question containing `prompt_snippet`."""
    a, b = c.day_span(week, day)
    seg = c.s[a:b]
    assert seg.count(prompt_snippet) == 1, prompt_snippet
    i = seg.index(prompt_snippet)
    start = seg.rindex("{", 0, i)
    end = start + _match_brace(seg[start:], 0)
    c.s = c.s[:a] + seg[:end] + ",\n" + new_src + seg[end:] + c.s[b:]


def remap(prefix, mapping):
    """Renumber several saved answers at once (two passes, so swaps and chains are safe).
    `prefix` is e.g. 'Week 3/Day 3/Spelling — x/'; `mapping` is {old_n: new_n or 'retired'}."""
    for o in mapping:
        relink_legacy(f"{prefix}{o}", f"tmp-remap/{prefix}{o}")
    for o, n in mapping.items():
        relink_legacy(f"tmp-remap/{prefix}{o}", f"retired/{prefix}{o}" if n == "retired" else f"{prefix}{n}")
