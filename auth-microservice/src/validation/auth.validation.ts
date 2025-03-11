import {z} from 'zod'

const signupSchema= z.object({
    email:z.string().email(),
    username:z.string().min(7),
    password:z.string().min(8)
})

const loginSchema=z.object({
    email:z.string().email(),
    password:z.string()

})

export{
    signupSchema,
    loginSchema
}