"use client"
import {TextInput, Group, PasswordInput} from '@mantine/core';
import { useForm ,zodResolver} from '@mantine/form';
import z from 'zod';
import Link from 'next/link'
import { Button } from "tp-kit/components";


export default function page(){

    const schema = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(6,"password must contain at least 6 carateres")
    });

    const form = useForm(
        {
            validate: zodResolver(schema),
        initialValues: {
            email: '',
            password:''

        },


    });

    return <>
            <p>CONNEXION</p>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    withAsterisk
                    mt="md"
                    label="Password"
                    {...form.getInputProps('password' )}
                />

                <Group  className="flex-columns justify-center" p={'lg'}  >
                    <Button
                        fullWidth={true}
                        type="submit"
                    >
                        Connexion
                    </Button>
                    <Link href={"/inscription"}>Créer un compte</Link>
                </Group>

            </form>


    </>
}