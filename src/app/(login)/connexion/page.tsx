"use client"
import {TextInput, Group, PasswordInput} from '@mantine/core';
import { useForm ,zodResolver} from '@mantine/form';
import z from 'zod';
import Link from 'next/link'
import {Button, NoticeMessage, useZodI18n} from "tp-kit/components";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {useState} from "react";


export default function page(){

    type FormValues = z.infer<typeof schema>;

    const router = useRouter()
    const supabase = createClientComponentClient()
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    const [created, setCreated] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");

    useZodI18n(z);

    const form = useForm(
        {
            validate: zodResolver(schema),
        initialValues: {
            email: '',
            password:''

        },


    });
    const handleSubmit = async (values: FormValues) => {
        console.log(values);
        const {error} = await supabase.auth.signUp(
            {
                email: values.email,
                password: values.password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/api/auth/callback',
                    data: {}
                }
            }
        )
    }


        return <>

            <p>CONNEXION</p>
            {
                created &&
                <NoticeMessage
                    className="w-full"
                    type={isValid ? "success" : "error"}
                    message={message}
                />
            }
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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