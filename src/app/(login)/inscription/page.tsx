"use client"
import {TextInput, Group, PasswordInput} from '@mantine/core';
import { useForm ,zodResolver} from '@mantine/form';
import z from 'zod';
import Link from 'next/link'
import {Button, ZodI18nProvider, NoticeMessage, useZodI18n} from "tp-kit/components";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useState} from "react";

export default function page(){

    type FormValues = z.infer<typeof schema>;

    const router = useRouter()
    const supabase = createClientComponentClient()

    const schema = z.object({
        name : z.string().nonempty(),
        email: z.string().email(),
        password: z.string().min(6,)
    });
    const handleSubmit = async (values: FormValues) => {
        console.log(values);
        const { error } = await supabase.auth.signUp(
            {
                email: values.email,
                password: values.password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/api/auth/callback',
                    data: {
                        name: values.name
                    }
                }
            }
        )

        console.log(error)
        setCreated(true);
        setMessage((error) ? error.message : "Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter")
        setIsValid((!error))
    }
        const [created, setCreated] = useState(false);
        const [isValid, setIsValid] = useState(false);
        const [message, setMessage] = useState("");


        useZodI18n(z);
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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            {
                created &&
                <NoticeMessage
                    className="w-full"
                    type={isValid ? "success" : "error"}
                    message={message}
                />
            }
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
                <a onClick={() => router.push('/connexion')} className="">Déjà un compte ? Se connecter</a>
            </Group>

        </form>



    </>
}