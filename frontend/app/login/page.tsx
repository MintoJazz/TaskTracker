'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/hooks/use-login"
import { cn } from "@/lib/utils"
import { LoginFormType } from "@/schemas/login"
import { Controller, ControllerProps } from "react-hook-form"

export default function Page() {
    const { form, onSubmit } = useLogin()

    const emailProps: ControllerProps<LoginFormType> = {
        name: 'email',
        control: form.control,
        render: ({ field, fieldState }) => <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="email" placeholder="m@example.com" />
            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
        </Field>
    }

    const passwordProps: ControllerProps<LoginFormType> = {
        name: 'password',
        control: form.control,
        render: ({ field, fieldState }) => <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input {...field} id={field.name} aria-invalid={fieldState.invalid} type="password" />
            {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
        </Field>
    }

    return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className={cn("flex flex-col gap-6 w-75")}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller {...emailProps} />
                            <Controller {...passwordProps} />
                            <Button type="submit">Login</Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
}
