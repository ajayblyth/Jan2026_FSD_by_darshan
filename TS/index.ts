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
interface Std {
    name: string;
    marks: number;
    address: {          // nested object — its own shape inside Std
        city: string,
        pin: string,
    };
    subjects: string[]  // array of strings
}

// Std[] means "an array of Std objects"
// Every object in the array must match the Std shape exactly:
// all fields present, correct types, and the nested address filled in.
const students: Std[] = [
    {
        name: 'Sam',
        marks: 85,
        address: {
            city: 'Blore', pin: '123456'
        },
        subjects: ["Math", "Sci"]
    },
    {
        name: 'Priya',
        marks: 85,
        address: {
            city: 'Blore', pin: '123456'
        },
        subjects: ["Math", "Sci"]
    }
]

// Access nested fields with dot notation; loop over the array as usual.
students.forEach((s) => {
    console.log(`${s.name} (${s.address.city}) studies ${s.subjects.join(", ")}`)
})