import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { insertUser } from "../data/userData";
import { userCreateSchema } from "../validationSchema";
import passport from "passport";
import Joi from "joi";

const router = Router()

const createUser = async(req: Request, res: Response, schema: Joi.ObjectSchema ) => {
    const { error, value } = schema.validate(req.body)
    
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    
    await queryRunner.startTransaction()
    
    try{
        if(error){
            throw new Error(`${error}`)
        }
        const { email, password } = value
        const result = await insertUser({ email: email, password: password, queryRunner: queryRunner })
        await queryRunner.commitTransaction()
        res.status(201).json(result)
    }
    catch(error){
        await queryRunner.rollbackTransaction()
        console.error('Error:', error.message)
        res.status(404).json({ error: error.message })
    }
    finally{
        await queryRunner.release()
    }
}

router.post('/sign-up', async (req: Request, res: Response) => {
    createUser(req, res, userCreateSchema)
})

router.post('/login', passport.authenticate('local', { session: false }),  
    async (req: Request, res: Response) => {
        const { token } = req.user as { token: string }
        res.status(200).json({ token: token })
    }
)

export default router