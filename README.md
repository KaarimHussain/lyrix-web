# Lyrix

**Lyrix** is a Developer Focused and Friendly CMS tool where devs can create websites or apps using Lyrix Features.

Unlike other CMS platforms where you fight with abstractions, Lyrix lets you own your content as much as you own your code! You define blocks directly in JavaScript or TypeScript, and pages are composed visually using those blocks, while remaining fully owned, versioned, and rendered inside your Next.js application.

Lyrix is inspired by the idea of Gutenberg, but designed specifically for modern Next.js workflows and developer-first teams.

---

## Why Lyrix?

Other CMS platforms introduce:
- Complex schemas
- Vendor lock-in
- Indirection between code and content
- A nightmare when creating plugins

Lyrix takes a different approach, where creating a plugin is as easy as creating a TS or JS Function!

- **Blocks are code**
- **Pages are data**
- **Rendering is native to Next.js**

A true Developer Friendly CMS. No proprietary pipelines.

---

## Core Concepts

### Code-First Blocks
Blocks are simple JavaScript or TypeScript definitions:

- Written and versioned in Git
- Typed and reusable
- Rendered using real React components

### Visual Composition
Pages are built visually by arranging blocks, without losing control over code or structure.

### Framework-Native Rendering
Lyrix renders directly inside Next.js:
- App Router–friendly
- No iframe previews
- No runtime hacks

---

## What Lyrix Is Not

- Not a traditional, restrictive CMS
- Not a low-code website builder
- Not a hosted platform (by default)

Lyrix is a **developer tool**, first and foremost.

---

## Project Status

🚧 **Early development**

Lyrix is currently in active development. APIs and internal structures may change as the project evolves.

---

## Planned Features

- Block registry and runtime renderer
- Visual editor for composing pages
- JSON-based page serialization
- Next.js App Router support
- Optional plugin system
- Playground and examples

---

## Repository Structure (Planned)

```text
lyrix/
 ├─ packages/
 │   ├─ core        # block definitions, schemas, shared types
 │   ├─ renderer    # Next.js runtime renderer
 │   └─ editor      # visual editor (React)
 ├─ apps/
 │   └─ playground  # demo Next.js app
 ├─ docs/
 └─ examples/

```
## Philosophy

Lyrix is built around a core philosophy:
> You own your content as much as you own your code!

In other CMS platforms, creating a plugin is a nightmare. In Lyrix, creating a plugin is as easy as creating a TS or JS Function! If you believe a CMS should be developer-focused and friendly, Lyrix is for you.

## License

MIT

## Contributing

Contributions, ideas, and discussions are welcome.
More details coming soon.