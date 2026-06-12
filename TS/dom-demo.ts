const input = document.getElementById('email') as HTMLInputElement
const button = document.getElementById('go') as HTMLButtonElement
const output = document.getElementById('output') as HTMLParagraphElement


button?.addEventListener("click", ()=>{
    output.textContent = `Typed :${input.value}`
})