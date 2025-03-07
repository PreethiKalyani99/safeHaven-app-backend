import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { hash } from "bcrypt"

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column({ nullable: true })
    lastName: string | null

    @Column({ type: "date", nullable: true })
    dob: Date | null

    @Column()
    phoneNumber: string

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await hash(this.password, 10)
            } 
            catch (error) {
                console.error('Error hashing password:', error)
                throw new Error('Password hashing failed')
            }
        }
    }
}
