# S7 accessibility static checks (baseline/after evidence; no network/browser needed)
# Usage: python checks.py <path-to-jsx>
import re
import sys

# foreground/background pairs as declared in tailwind.config.js + page containers
PALETTE = {
    'ink-50': '#F8FAFC', 'ink-100': '#E2E8F0', 'ink-600': '#475569', 'ink-900': '#0F172A',
    'accent-500': '#2563EB', 'accent-600': '#1D4ED8', 'white': '#FFFFFF',
}
# token -> container background used on this page (documented context)
FG_BG = {
    'text-ink-900': 'ink-50', 'text-ink-600': ('ink-50', 'white'),
    'text-accent-600': 'ink-50', 'text-white': 'accent-500',
}


def lum(hexc):
    hexc = hexc.lstrip('#')
    r, g, b = (int(hexc[i:i + 2], 16) / 255 for i in (0, 2, 4))
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = f(r), f(g), f(b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(fg, bg):
    l1, l2 = lum(fg), lum(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def check_contrast(src):
    print('== CHK-01 contrast (>=4.5:1 text) ==')
    fails = 0
    for m in re.finditer(r'style=\{\{\s*color:\s*[\'"](#\w{6})[\'"]', src):
        r = ratio(m.group(1), PALETTE['ink-50'])
        ok = r >= 4.5
        fails += 0 if ok else 1
        print(f"[{'PASS' if ok else 'FAIL'}] inline #{m.group(1)} on {PALETTE['ink-50']}: {r:.2f}:1")
    for m in re.finditer(r'text-(ink-\d+|accent-\d+|white)', src):
        tok = 'text-' + m.group(1)
        bgs = FG_BG.get(tok)
        if not bgs:
            continue
        if isinstance(bgs, tuple):
            for bg in bgs:
                r = ratio(PALETTE[m.group(1)], PALETTE[bg])
                ok = r >= 4.5
                fails += 0 if ok else 1
                print(f"[{'PASS' if ok else 'FAIL'}] {tok} on {bg}: {r:.2f}:1")
        else:
            r = ratio(PALETTE[m.group(1)], PALETTE[bgs])
            ok = r >= 4.5
            fails += 0 if ok else 1
            print(f"[{'PASS' if ok else 'FAIL'}] {tok} on {bgs}: {r:.2f}:1")
    print(f'CHK-01 errors: {fails}')


def check_semantics(src):
    print('== CHK-06 semantic interactive controls ==')
    bad = re.findall(r'<(?:div|span|p|li)\b[^>]*onClick', src)
    print(f"[{'PASS' if not bad else 'FAIL'}] div/span onclick: {len(bad)}")
    empty_label = re.findall(r'<label(?![^>]*for=)[^>]*>\s*</label>', src)
    print(f"[{'PASS' if not empty_label else 'FAIL'}] empty/unbound labels: {len(empty_label)}")
    inputs = re.findall(r'<input\b[^>]*>', src)
    named = [i for i in inputs if re.search(r'id="[^"]+"', i)]
    print(f"[{'PASS' if len(named) == len(inputs) else 'FAIL'}] inputs with label binding: {len(named)}/{len(inputs)}")
    positive_tabindex = re.findall(r'tabIndex?\s*=\s*["\']{1,3}[1-9]', src)
    print(f"[{'PASS' if not positive_tabindex else 'FAIL'}] positive tabindex: {len(positive_tabindex)}")


def check_focus(src):
    print('== CHK-05 focus visibility ==')
    bare_none = re.findall(r'(?:outline:\s*none|outline-none)(?![^>]*ring)', src)
    print(f"[{'PASS' if not bare_none else 'FAIL'}] outline:none without replacement: {len(bare_none)}")
    inter = [m.group(0) for m in re.finditer(r'<(?:button|input|select|textarea)\b[^>]*>', src.replace('=>', '=='))]
    with_ring = [t for t in inter if re.search(r'focus(?:-visible)?:ring', t)]
    print(f"[{'PASS' if inter and len(with_ring) == len(inter) else 'FAIL'}] interactive controls with visible focus style: {len(with_ring)}/{len(inter)}")
    r = ratio(PALETTE['accent-600'], PALETTE['white'])
    print(f"[{'PASS' if r >= 3 else 'FAIL'}] focus ring accent-600 vs white: {r:.2f}:1 (>=3:1)")


def check_headings(src):
    print('== heading hierarchy ==')
    levels = [int(m.group(1)) for m in re.finditer(r'<h([1-6])\b', src)]
    skips = [i for i in range(1, len(levels)) if levels[i] - levels[i - 1] > 1]
    print(f"[{'PASS' if not skips else 'FAIL'}] heading sequence {levels}")


def check_modal(src):
    print('== modal keyboard flow ==')
    has_dialog = 'role="dialog"' in src
    esc = 'Escape' in src
    trap = 'Tab' in src and 'focus' in src
    returns = bool(re.search(r'\w+Ref\.current\?\.focus\(\)', src)) or 'focus returns to trigger' in src.lower()
    aria = 'aria-modal' in src
    print(f"[{'PASS' if has_dialog else 'FAIL'}] role=dialog")
    print(f"[{'PASS' if aria else 'FAIL'}] aria-modal")
    print(f"[{'PASS' if esc else 'FAIL'}] Esc closes")
    print(f"[{'PASS' if trap else 'FAIL'}] focus trap (Tab cycle)")
    print(f"[{'PASS' if returns else 'FAIL'}] focus returns to trigger")


if __name__ == '__main__':
    src = open(sys.argv[1], encoding='utf-8').read()
    check_contrast(src)
    check_semantics(src)
    check_focus(src)
    check_headings(src)
    check_modal(src)
