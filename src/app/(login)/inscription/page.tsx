"use client"
import {TextInput, Group, PasswordInput} from '@mantine/core';
import { useForm ,zodResolver} from '@mantine/form';
import z from 'zod';
import Link from 'next/link'
import {Button, NoticeMessage} from "tp-kit/components";


export default function page(){

    const schema = z.object({
        name : z.string().nonempty('Le nom ne peut pas être vide'),
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(6,"password must contain at least 6 carateres")
    });

    const form = useForm(
        {
            validate: zodResolver(schema),
            initialValues: {
                name:'',
                email: '',
                password:''

            },


        });

    return <>
        <p>INSCRIPTION</p>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <NoticeMessage message={"Erreur"}></NoticeMessage>
            <TextInput
                withAsterisk
                description={"Le nom qui sera utilisé pour vos commandes"}
                label="name"
                placeholder="Your name"
                {...form.getInputProps('name')}
            />
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
                <Link href={"/connexion"}>Déjà un compte ? Se connecter</Link>
            </Group>

        </form>


    </>
}