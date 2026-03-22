# Mobile menu backup — solid black version

To revert to the original solid black mobile menu, replace the mobile overlay `style` in `Nav.tsx` with:

**Overlay div styles:**
- `background: "var(--near-black)"` (instead of `rgba(17, 16, 16, 0.5)` + blur)
- Remove `backdropFilter` and `WebkitBackdropFilter`

**Link styles:**
- `color: "white"` (instead of `rgba(255,255,255,0.95)`)
- Remove `textShadow`
