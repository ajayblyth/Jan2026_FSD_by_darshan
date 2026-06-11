// // annotations -> let name: type = value
// let userName: string = "Aarav"
// // userName =123
// let age: number =23
// let isActive: boolean = true

// console.log(userName, age, isActive)

// let score =90
// // score ="abs"

// let marks: number[] = [85, 90, 76]
// marks =[12, 34]
// // marks =[12, "34"]
// let names: string[] =["neha", "arya"]

// let data: any = 8
// let data1: any = "Sam"
// data="hello"
// // data1.toUpperCase()

// let value: unknown = 123.3456
// // value.toUpperCase();

// if (typeof value === 'string'){
//     console.log(value.toUpperCase())
// } else if (typeof value === 'number'){
//     console.log(value.toFixed(2))
// }else{
//     console.log("Some other type")
// }

// let id: number | string;
// id = 111
// id='A111'
// // id=true

// let status: 'idle' | 'loading' | 'completed' | 'error' 
// status= 'completed'
// status= 'not'


// function add(a:number, b:number):number{
//     return a+b
// }

// console.log(add(1, 2))
// console.log(add(1, 3))

// function logMsg(msg:string): void{
//     console.log(msg)
//     // return msg
// }
// logMsg("Hello")

// const multiply = (a:number, b:number):number => a*b
// console.log(multiply(4, 5))

// function greet(name:string, title?:string):string{
//     return title ? `${title} ${name}` :name
// }
// console.log(greet("Sam"))
// console.log(greet("Sam", "Dr."))

// function powerExp(base:number, exp:number=2):number{
//     return base ** exp
// }
// console.log(powerExp(5))
// console.log(powerExp(5, 3))

// let user:{name:string, age:number} = {name:'Sam', age:25}
// let user2:{name:string, age:number} = {name:'Sam'}

// interface User {
//     name: string;
//     age: number;
//     email?: string;
//     readonly id: number
// }

// const u:User ={name:'Sam', age:25, id:1}
// u.name="Sam2"

// interface Admin extends User{
//     role:string
// }

// const a:Admin ={name:"neha", age:30, id:2, role:"lead"}

// type ID =  number|string
// let myId: ID ="A111"
// myId =111

// type Person = {name:string}
// type Emp = Person & {salary:number}
// const e : Emp ={name:'Raj', salary:70000}

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