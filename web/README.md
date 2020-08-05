# Nadji auto website

## This is web frontend for nadji-auto

---

## Structure

### modules

This folder holds components and assets needed for those components.
This project uses DDD (domain driven development) as much as it can.
Pages must be in special directory, everything else related to some
domain should be here.

### core

This folder holds core functionality that should be universal.
It should not be specific for any domain, and can be used troughout the app.

### pages

This folder contains pages for NextJs.

### state

App Redux state. It uses Redux Toolkit to minimize code.

### types

Types are used in whole project, so there are keps in root for easier access.
In the future types might be moved to components for better DDD.

---

### Casing

For React components use pascal case, for everything else kebab-case `(some-module.ts)`. Pages should be in kebab, in the future switch React to also use kebab.
