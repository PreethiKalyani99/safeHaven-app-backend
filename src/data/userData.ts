import { Users } from "../entity/Users";
import { compare } from "bcrypt";

interface GetProp {
    email: string
    password: string
    queryRunner:any
}

interface InsertProp extends GetProp{
    firstName: string
    lastName: string
    dob: Date
    phoneNumber: string
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

export async function insertUser({email, password, firstName, lastName, dob, phoneNumber, queryRunner}: InsertProp){
    const user = await isUserExists({ email, queryRunner })
    
    if(user){
        throw new Error(`User ${email.toLowerCase()} already exists`)
    }

    const newUser = new Users()
    
    newUser.email = email.toLowerCase()
    newUser.password = password
    newUser.firstName = firstName.toLowerCase()
    newUser.lastName = lastName ? lastName.toLowerCase() : null
    newUser.dob = dob
    newUser.phoneNumber = phoneNumber

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