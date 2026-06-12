// ============================================================
// 1) TYPE ANNOTATIONS & INFERENCE
// ------------------------------------------------------------
// Syntax:  let name: type = value
// Annotate when the type isn't obvious; otherwise let TS INFER it.
// ============================================================
// // explicit annotations
// let userName: string = "Aarav"
// // userName = 123            // Error: number not assignable to string
// let age: number = 23
// let isActive: boolean = true
// console.log(userName, age, isActive)

// // inference — TS figures out the type from the value
// let score = 90               // inferred as number
// // score = "abs"             // Error: string not assignable to number

// // arrays — all-one-type, any length
// let marks: number[] = [85, 90, 76]
// marks = [12, 34]
// // marks = [12, "34"]        // Error: "34" is not a number
// let names: string[] = ["neha", "arya"]


// ============================================================
// 2) any  vs  unknown
// ------------------------------------------------------------
// any     -> turns OFF type checking. Escape hatch. Unsafe.
// unknown -> safe "we don't know yet"; MUST narrow before use.
// ============================================================
// let data: any = 8
// let data1: any = "Sam"
// data = "hello"
// // data1.toUpperCase()       // no error... may crash at runtime

// let value: unknown = 123.3456
// // value.toUpperCase();      // Error: 'value' is of type 'unknown'

// // narrowing with typeof — TS only lets you use it once proven
// if (typeof value === 'string'){
//     console.log(value.toUpperCase())   // OK — narrowed to string
// } else if (typeof value === 'number'){
//     console.log(value.toFixed(2))      // OK — narrowed to number
// }else{
//     console.log("Some other type")
// }


// ============================================================
// 3) UNION  &  LITERAL TYPES
// ------------------------------------------------------------
// Union (|)  -> value can be one of several types.
// Literal    -> value must be one of these EXACT values.
// ============================================================
// let id: number | string;
// id = 111                     // OK
// id = 'A111'                  // OK
// // id = true                 // Error: boolean not allowed

// let status: 'idle' | 'loading' | 'completed' | 'error'
// status = 'completed'         // OK
// // status = 'not'            // Error: not one of the allowed values


// ============================================================
// 4) FUNCTIONS — typed params + return type
// ------------------------------------------------------------
// Syntax:  function f(p: type): returnType { }
// Returns nothing -> use 'void'.
// ============================================================
// function add(a:number, b:number):number{
//     return a+b
// }
// console.log(add(1, 2))
// console.log(add(1, 3))

// // void = returns nothing
// function logMsg(msg:string): void{
//     console.log(msg)
//     // return msg             // Error: can't return a value from void
// }
// logMsg("Hello")

// // arrow function — same typing rules
// const multiply = (a:number, b:number):number => a*b
// console.log(multiply(4, 5))


// ============================================================
// 5) OPTIONAL  &  DEFAULT PARAMETERS
// ------------------------------------------------------------
// name?: type   -> optional, caller may leave it out
// param = value -> default value, optional automatically
// Rule: optional params must come AFTER required ones.
// ============================================================
// function greet(name:string, title?:string):string{
//     return title ? `${title} ${name}` : name    // must check optional before use
// }
// console.log(greet("Sam"))            // "Sam"
// console.log(greet("Sam", "Dr."))     // "Dr. Sam"

// function powerExp(base:number, exp:number=2):number{
//     return base ** exp
// }
// console.log(powerExp(5))             // 25  (exp defaults to 2)
// console.log(powerExp(5, 3))          // 125


// ============================================================
// 6) OBJECT TYPES (inline)
// ------------------------------------------------------------
// Describe an object's shape by listing fields and their types.
// ============================================================
// let user:{name:string, age:number} = {name:'Sam', age:25}
// // let user2:{name:string, age:number} = {name:'Sam'}   // Error: 'age' is missing


// ============================================================
// 7) INTERFACE  (name a reusable object shape)
// ------------------------------------------------------------
// ?  -> optional field
// readonly -> can't be changed after creation
// extends  -> build a new interface on top of another
// ============================================================
// interface User {
//     name: string;
//     age: number;
//     email?: string;          // optional
//     readonly id: number      // can't reassign later
// }
// const u:User = {name:'Sam', age:25, id:1}
// u.name = "Sam2"              // OK
// // u.id = 9                  // Error: id is readonly

// interface Admin extends User{
//     role:string              // Admin = everything in User + role
// }
// const a:Admin = {name:"neha", age:30, id:2, role:"lead"}


// ============================================================
// 8) TYPE ALIAS  (type)
// ------------------------------------------------------------
// Use 'type' for unions, primitives, tuples, or combining shapes.
// '&' (intersection) merges two shapes into one.
// ============================================================
// type ID = number | string    // a union
// let myId: ID = "A111"
// myId = 111

// type Person = {name:string}
// type Emp = Person & {salary:number}     // Emp = Person + salary
// const e: Emp = {name:'Raj', salary:70000}

// ---- Nested objects & arrays of objects ----
// An interface can contain a nested object type and arrays.
// interface Std {
//     name: string;
//     marks: number;
//     address: {          // nested object — its own shape inside Std
//         city: string,
//         pin: string,
//     };
//     subjects: string[]  // array of strings
// }

// // Std[] means "an array of Std objects"
// // Every object in the array must match the Std shape exactly:
// // all fields present, correct types, and the nested address filled in.
// const students: Std[] = [
//     {
//         name: 'Sam',
//         marks: 85,
//         address: {
//             city: 'Blore', pin: '123456'
//         },
//         subjects: ["Math", "Sci"]
//     },
//     {
//         name: 'Priya',
//         marks: 85,
//         address: {
//             city: 'Blore', pin: '123456'
//         },
//         subjects: ["Math", "Sci"]
//     }
// ]

// // Access nested fields with dot notation; loop over the array as usual.
// students.forEach((s) => {
//     console.log(`${s.name} (${s.address.city}) studies ${s.subjects.join(", ")}`)
// })

// ============================================================
// 9) TUPLES
// ------------------------------------------------------------
// A tuple is an array with a FIXED length and a known type at
// each position (order matters).
// ============================================================
// let point: [number,number] = [10, 20]
// console.log(point)

// let person: [string, number] = ["Sam", 25]
// // person = [25, "Sam"]      // Error: wrong order/types
// console.log(person)

// // common use: return a pair from a function
// function minMax(nums:number[]):[number,number]{
//     return [Math.min(...nums), Math.max(...nums)]
// }
// const [low, high] = minMax([5,1,9,3])
// console.log(`min=${low}, max=${high}`)

// Array vs Tuple:
//   known order & number of elements -> Tuple
//   same type, unknown length        -> Array


// ============================================================
// 10) null, undefined & NARROWING
// ------------------------------------------------------------
// In strict mode null/undefined are their own types. You can't
// use a maybe-null value until you've CHECKED it (narrowing).
// ============================================================
// function getLength(text:string|null):number{
//     // text.length here would Error — text might be null
//     if (text===null) return 0;
//     return text.length          // OK — narrowed to string
// }
// console.log(getLength("Hello"))
// console.log(getLength(null))

// // narrowing with typeof
// function format(x:string|number):string{
//     if (typeof x === "string") return x.toLocaleUpperCase()
//     return x.toFixed(2)
// }
// console.log(format("hi"), format(3.1453))

// Other narrowing techniques:
//   in operator     -> if ("email" in user)
//   truthiness      -> if (value) { }   removes null/undefined/falsy
//   === literal     -> if (status === "active")


// ============================================================
// 11) OPTIONAL CHAINING ?.  &  NULLISH ??
// ------------------------------------------------------------
// ?.  safely access a property that might not exist (-> undefined)
// ??  fallback ONLY when the value is null/undefined
// ============================================================
// type User ={
//     name:string,
//     address?:{
//         city?:string
//     }
// }
// const user1: User ={name:"Sam", address:{city:"Blore"}}
// const user2: User ={name:"Arya", address:{}}      // no city
// const user3: User ={name:"Sam"}                    // no address

// // ?. — undefined if any link is missing (no crash)
// console.log(user1?.address?.city)     // "Blore"
// console.log(user2?.address?.city)     // undefined
// console.log(user3?.address?.city)     // undefined

// // ?? — provide a fallback for null/undefined
// console.log(user1?.address?.city ?? 'Unknown')   // "Blore"
// console.log(user2?.address?.city ?? 'Unknown')   // "Unknown"
// console.log(user3?.address?.city ?? 'Unknown')   // "Unknown"

// // ?? vs ||  (Gotcha)
// const score = 0
// console.log(score ?? 10)   // 0   — only null/undefined -> 10
// console.log(score || 10)   // 10  — 0 is falsy, so || replaces it


// ============================================================
// 12) TYPE ASSERTIONS  ->  value as Type
// ------------------------------------------------------------
// "Trust me, treat this as that type." Does NOT convert/validate
// at runtime — if you're wrong, TS won't save you.
// (DOM example -> refer index.html & dom-demo.ts)
// ============================================================
// // Parsing JSON into a known shape
// type User ={
//     name:string,
//     address?:{
//         city?:string
//     }
// }
// const user1 = '{"name":"Sam", "address":{"city":"Blore"}}';
// const data = JSON.parse(user1) as User    // JSON.parse returns 'any' -> assert the shape
// console.log(data.address, data.name)


// ============================================================
// 13) CLASSES — access modifiers
// ------------------------------------------------------------
// public    -> accessible anywhere (default)
// private   -> only inside this class
// protected -> this class + subclasses
// readonly  -> set once (in constructor), can't reassign
// ============================================================
class Emp{
    public name : string;
    private salary : number;
    readonly id : number;

    constructor(name:string, salary:number, id:number){
        this.name=name;
        this.salary=salary;
        this.id=id
    }

    getSalary(): number{
        return this.salary
    }
}

const e = new Emp("Sam", 7654, 1)
console.log(e.name)        // OK — public
// console.log(e.salary)   // Error — salary is private
console.log(e.getSalary()) // OK — read private salary via a public method
console.log(e.id)          // OK — readonly is still readable
// e.id=2                  // Error — id is readonly


// ---- Shorthand: parameter properties ----
// Putting an access modifier on a constructor parameter declares
// AND assigns the field automatically — no need for this.x = x.
// Emp2 below is identical to Emp above, just shorter.
class Emp2{
    constructor(
    public name : string,
    private salary : number,
    readonly id : number
    ){
        // empty — TS creates & assigns the fields for you
    }
        getSalary(): number{
        return this.salary
    }
}

const e2 = new Emp2("Sam", 7654, 1)
console.log(e2.name)
// console.log(e2.salary)
console.log(e2.getSalary())
console.log(e2.id)


// ---- Inheritance & protected ----
// private  -> NOT visible to subclasses
// protected-> visible inside subclasses (but not from outside)
class Person {
    constructor( private ssn: string, protected age: number){
    }
}

class Std extends Person{
    describe():string{
        return `${this.age}`     // OK — age is protected, reachable in subclass
        // this.ssn -> Error: ssn is private to Person
    }
}

const s = new Std("134w545", 20)
console.log(s.describe())
// console.log(s.age)            // Error — protected, not accessible from outside


// ============================================================
// 14) tsconfig.json — the TypeScript compiler settings
// ------------------------------------------------------------
// Created with `tsc --init`. Running `tsc` (no filename) reads this
// file and compiles the whole project with these rules.
//
// Key options in this project's tsconfig:
//   "target": "esnext"      -> JS version to compile down to
//   "module": "nodenext"    -> module system (import/export style)
//   "strict": true          -> turns on all strict type checks
//                              (null safety, no implicit any, etc.)
//   "sourceMap": true       -> .js.map files so the debugger maps
//                              compiled JS back to your .ts lines
//   "declaration": true     -> emits .d.ts type-definition files
//   "declarationMap": true  -> maps those .d.ts back to source
//
//   Extra-strict checks enabled here:
//   "noUncheckedIndexedAccess"   -> arr[i] is T | undefined (forces a check)
//   "exactOptionalPropertyTypes" -> optional ≠ explicitly set to undefined
//
//   Tooling / React:
//   "jsx": "react-jsx"      -> compile JSX for React (used in the Vite part)
//   "skipLibCheck": true    -> don't type-check node_modules .d.ts (faster)
//   "isolatedModules" / "verbatimModuleSyntax" -> safe single-file transpile
//
// Note: "outDir"/"rootDir" are commented out, so compiled .js files
// land next to the .ts files. Uncomment them to separate src/ and dist/.
// ============================================================