---
title: "Week 01: Portfolio Foundations"
date: "2026-02-07"
summary: "Defined the local data model, mapped internship activities, and set the architecture rules for a maintainable portfolio."
tags: ["Next.js", "TypeScript", "Architecture"]
---

The first week focused on turning internship output into a structured product instead of a loose collection of screenshots and notes. I defined the required project fields, grouped the activities by category, and planned the portfolio around local JSON and Markdown content.

The biggest technical decision was to keep content separate from presentation. Projects live in a typed JSON file, while longer reflections live as Markdown entries. That split keeps the UI stable while still making weekly updates fast.

## What I Practiced

- Translating a PRD into routes, data contracts, and components.
- Designing TypeScript interfaces before building UI.
- Separating filtering logic from display components.

## Outcome

The portfolio now has a content-first foundation where adding a new activity does not require touching the page layout.
