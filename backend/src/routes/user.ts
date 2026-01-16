import { Hono } from "hono";
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { sign } from 'hono/jwt'
import { signUpInput, signInInput } from "@rishikonar/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    try {
        console.log("Signup request received");
        const body = await c.req.json();
        console.log("Body parsed:", body);
        const result = signUpInput.safeParse(body);
        if (!result.success) {
            console.log("Input validation failed:", JSON.stringify(result.error));
            c.status(400); // Changed to 400
            return c.json({
                message: "Inputs not correct",
                errors: result.error
            })
        }
        console.log("Initializing Prisma with URL length:", c.env.DATABASE_URL?.length);
        const pool = new Pool({ connectionString: c.env.DATABASE_URL })
        const adapter = new PrismaPg(pool)
        const prisma = new PrismaClient({ adapter })

        console.log("Prisma initialized, creating user...");
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        console.log("User created:", user.id);
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        return c.text(jwt)
    } catch (e) {
        console.log("Critical Error during signup:", e);
        c.status(500); 
        return c.json({
            error: "Internal Server Error",
            message: e instanceof Error ? e.message : String(e)
        })
    }
})


userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const pool = new Pool({ connectionString: c.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
            }
        })
        if (!user) {
            c.status(403);
            return c.json({
                message: "Incorrect creds"
            })
        }
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        return c.text(jwt)
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
})