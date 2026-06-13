# SETUP — Typed Express Server

## 1. Install

```powershell
npm init -y
npm install express
npm install --save-dev typescript ts-node nodemon @types/express @types/node
npx tsc --init
```

**Why `@types/*`?** Express ships without TypeScript types. The `@types/*`
packages (from DefinitelyTyped) add them on top — `@types/express` types
`Request`/`Response`, `@types/node` types `process`/`console`/`__dirname`.
Rule of thumb: install `@types/<lib>` alongside any plain-JS library.

---

## 2. package.json scripts

```jsonc
"main": "dist/server.js",
"scripts": {
  "build":    "tsc",                                  // compile src/*.ts → dist/*.js
  "start":    "node dist/server.js",                  // run the compiled server
  "dev":      "ts-node src/server.ts",                // run the .ts once, no build
  "watch":    "nodemon --exec ts-node src/server.ts", // auto-restart on save (TS)
  "watch:js": "nodemon dist/server.js"                // auto-restart compiled JS
}
```

**Why `nodemon`?** It watches your files and auto-restarts the server on every
save — no manual Ctrl+C and re-run. `watch` re-runs the TS source via ts-node
(use this while developing); `watch:js` watches the compiled JS.

---

## 3. tsconfig.json changes

`tsc --init` generates a strict ESM config; these settings clash with
CommonJS-style Express code:

| Setting | Change | Why |
|---|---|---|
| `module` | `"nodenext"` → `"commonjs"` | `nodenext` treats the file as ESM and errors *"ECMAScript imports cannot be written in a CommonJS file."* `commonjs` is what Node runs natively. |
| `verbatimModuleSyntax` | `true` → `false` | `true` forbids mixing a value import (`express`) and type imports (`Request`, `Response`) on one line. `false` lets the single import work. |
| `esModuleInterop` | add `true` | Lets `import express from "express"` (default import) work with a CommonJS package. |
| `types` | `[]` → `["node"]` | `[]` strips Node typings; `["node"]` pulls in `@types/node` so `process`/`console` are typed. |

Keep: `"rootDir": "./src"`, `"outDir": "./dist"`, `"strict": true`.

---

## 4. Run

```powershell
npm run watch      # dev loop (recommended) — re-runs .ts on every save
npm run dev        # run .ts once, no auto-restart
npm run build      # tsc → dist/server.js
npm start          # node dist/server.js
```

Expect: `Server on 3000`

---

## 5. Test the routes

Leave the server running; open a second terminal.

```powershell
curl http://localhost:3000/
# → Hello from server

curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{ "name": "Aarav", "age": 25 }'
# → {"message":"Created Aarav, age 25"}
```
