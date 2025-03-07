import { Users } from "../entity/Users";
import { compare } from "bcrypt";

interface GetProp {
    email: string
    password: string
    queryRunner:any
}

interface UserExistProp {
    queryRunner:any
    id?: number
    email?: string
}

async function isUserExists({ id, email, queryRunner }: UserExistProp){
    if(email){
        const lowerCaseEmail = email.toLowerCase()
        return await queryRunner.manager.findOne(Users, { where: { email: lowerCaseEmail }})
    }
    if(id){
        return await queryRunner.manager.findOne(Users, { where: { user_id: id }}) 
    }
}

export async function insertUser({email, password, queryRunner}: GetProp){
    const user = await isUserExists({ email, queryRunner })
    
    if(user){
        throw new Error(`User ${email.toLowerCase()} already exists`)
    }

    const newUser = new Users()
    
    newUser.email = email.toLowerCase()
    newUser.password = password

    await queryRunner.manager.save(newUser)
    return newUser
}

export async function getUser({ email, password, queryRunner }: GetProp) {
    const user = await isUserExists({ email, queryRunner })

    if(!user){
        throw new Error(`User with email ${email} does not exist`) 
    }

    const isPasswordMatch = await compare(password, user.password)

    if(!isPasswordMatch){
        throw new Error(`Incorrect Password`)
    }
    return user
}