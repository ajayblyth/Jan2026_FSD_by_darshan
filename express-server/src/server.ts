// ============================================================
// Typed Express Server
// ------------------------------------------------------------
// express        -> the web framework (default import, a value)
// Request, Response -> TYPES from @types/express used to type the
//                   handler arguments (req, res)
// ============================================================
import express, { Request, Response } from "express"

const app = express()

// Middleware: parse incoming JSON request bodies into req.body.
// Without this, req.body would be undefined on POST requests.
app.use(express.json())

// Shape of the JSON body we expect on POST /users.
interface CreateUserBody {
    name: string;
    age: number
}

// GET / — typed req/res. res.send() returns plain text.
app.get("/", (req: Request, res: Response) => {
    res.send("Hello from server")
})

// POST /users
// Request<Params, ResBody, ReqBody> — the 3rd generic types req.body.
// Here {} params, {} response, CreateUserBody body -> req.body is typed.
app.post("/users", (req: Request<{}, {}, CreateUserBody>, res: Response) => {
    const { name, age } = req.body

    // Runtime check: TS types describe COMPILE time only. A real HTTP
    // client can still send anything, so validate the actual values too.
    if (typeof name !== "string" || typeof age !== "number") {
        return res.status(400).json({ error: "name must be a str and age must be a number" })
    }

    res.json({ message: `Created ${name}, age ${age}` })
})

// Start listening. Callback runs once the server is up.
app.listen(3000, () => console.log("Server on 3000"))

// ------------------------------------------------------------
// Next step: zod for runtime validation
// ------------------------------------------------------------
// An interface vanishes after compile, so it can't validate real input.
// zod defines a schema that checks values at RUNTIME and infers the type.
//   import { z } from "zod";
//   const CreateUserBody = z.object({
//       name: z.string(),
//       age:  z.number()
//   })
//   const result = CreateUserBody.safeParse(req.body)  // validates at runtime
