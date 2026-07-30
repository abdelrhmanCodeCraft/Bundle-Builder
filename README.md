Bundle Builder
A four-step builder for putting together a home security system, with a summary panel that updates live as you configure it.

npm install
npm run dev
Runs on http://localhost:5173. npm run build for a production build, npm run preview to serve that build, npm run lint for eslint.

Stack
React 19, TypeScript, Vite. Redux Toolkit for state, Tailwind v4 for styling. Nothing else at runtime.

Where things live
src/
  data/products.json   all product, plan and copy data
  store/               slice, selectors, localStorage
  features/
    accordion/         the 4-step shell
    products/          product cards, variant chips, quantity stepper
    plans/             step 2
    review/            the summary panel, in two layouts
Everything renders from products.json. There's no per-product markup anywhere, so adding a camera to the JSON gets you a card with the right badge, chips and pricing without touching a component.

How the variant tracking works
This was the part worth getting right, so it's worth a paragraph.

Quantities are keyed by productId-variantId, and the active variant per product is kept separately:

quantities:     { "wyze-cam-v4-white": 1, "wyze-cam-v4-grey": 2 }
activeVariants: { "wyze-cam-v4": "grey" }
The card's stepper reads whichever variant is active, so switching from Grey to White swaps what the stepper shows without touching Grey's count. The review panel walks the same map and lists every variant above zero, which is why you can legitimately end up with two "Wyze Cam v4" lines. Both steppers dispatch the same two actions, so they can't drift apart. There's no second source of truth to keep in step.

Persistence
"Save my system for later" writes to localStorage and the link tells you whether it actually worked. The store also saves on every change, so a configuration survives a reload even if you never click it. That was deliberate. The brief only asks for the link, but quietly losing someone's work because they didn't press a button seemed worse than the alternative.

Two notes on it:

What comes out of storage is validated, not trusted. preloadedState replaces a slice's initial state rather than merging into it, so a saved blob with the wrong shape leaves a map undefined and takes the render down with it. Anything unreadable is discarded and the defaults load instead.
The key is versioned (bundle-builder:v1), so a save written by an older build is ignored rather than misread.
Responsive
Desktop matches the Figma. The builder and the panel sit side by side from 1680px up; below that the page stacks and the summary switches to a wider two-column layout. That breakpoint is custom (--breakpoint-desktop) rather than a Tailwind default, because the desktop columns are fixed at 768px + 399px.

Product cards are a wrapping flex row that stays centered when it wraps: five across on a wide screen, down to one on a phone. Their sizing lives in plain media queries in globals.css instead of Tailwind variants, for two reasons I found the hard way. A custom breakpoint doesn't reliably outrank a built-in one like sm:, and complementary max-/min- variants leave a sub-pixel gap at the boundary where neither matches and the cards collapse to content width.

Decisions and tradeoffs
Two review panel components. Desktop and tablet differ enough (content moves between columns, the shipping row relocates, prices switch from unit to line totals) that responsive classes on a single tree stopped being readable. Both render and one is hidden by CSS, which does mean duplicate steppers in the DOM. I'd revisit that if this were shipping.

Plans aren't products. No variants, no quantity, no stock, so PlanCard is its own component rather than a branch inside ProductCard. The selection is a single id in the store, which makes "only one at a time" structural instead of a rule to enforce.

The plan price is not in the total. A monthly subscription and a one-time hardware total felt like different numbers. Arguable either way; it's a small change in selectors.ts.

A few buttons set their border and background inline. There's a button { border: none; background: transparent } reset in globals.css that outranks Tailwind's utilities, so bg-primary silently does nothing on a button. Inline was the smaller of the two fixes.

No backend. The JSON is a static import. The bonus wasn't worth the setup for a prototype this size.

Not finished
The stepper's minus button is styled as disabled at quantity 1 to match the design, but still works, so appearance and behavior disagree.
Nothing signals that you've hit a product's stock limit. The reducer just stops incrementing.
src/App.css is left over from the Vite template and isn't imported.
Checkout is a placeholder, as the brief allows.
