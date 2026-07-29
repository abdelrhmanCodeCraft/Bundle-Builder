# Bundle Builder

A two-column, data-driven bundle builder: a 4-step accordion for assembling a
home security system on the left, with a live order-review panel on the right
that stays in sync as selections change.

## Stack

- React 19 + TypeScript, built with Vite
- Redux Toolkit for bundle state (selected variants and quantities)
- Tailwind CSS for styling

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

Other scripts:

```bash
npm run build    # type-check and produce a production build in dist/
npm run preview  # serve the production build locally
npm run lint     # run eslint
```

## Data

All products, steps, and pricing live in `src/data/products.json` — nothing
is hardcoded per-product in the components. Each step lists its products;
each product optionally carries a discount badge and a list of variants
(color/label/price/stock). The plan shown in the review panel is described
by the top-level `plan` entry in the same file.

## How selections work

- `src/store/bundleSlice.ts` tracks the active variant per product and a
  quantity per `productId-variantId` pair, so two variants of the same
  product (e.g. Red vs. Blue) keep independent counts.
- The product card's stepper always reflects the *currently active* variant
  for that product; switching variants swaps which count the stepper shows,
  without touching the other variant's quantity.
- The review panel (`src/store/selectors.ts`) reads from the same state, so
  it lists every variant with a quantity above zero as its own line, and
  both quantity steppers (card and review line) update each other since
  they dispatch the same actions.

## Persistence

Clicking "Save my system for later" writes the current bundle state to
`localStorage` (`src/store/persist.ts`). On load, the store checks
`localStorage` first and hydrates from it if a saved system exists, so a
reload or return visit restores exactly what was saved. Regular browsing
without hitting Save does not persist — the save is an explicit action, not
autosave.

## Known gaps / tradeoffs

- The "Choose your plan" step currently has no selectable product cards —
  the plan itself only appears as a fixed line in the review panel, sourced
  from `products.json`. Building out an actual plan-selection card was left
  out rather than guessed at without the Figma reference in hand.
- The review panel doesn't yet include the satisfaction-guarantee badge or
  the financing line shown in the design; skipped for the same reason
  (didn't want to invent copy/iconography that might not match the source
  design).
- No backend — `products.json` is served as a static local file, which the
  brief calls out as an acceptable option.
