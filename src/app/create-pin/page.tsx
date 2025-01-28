"use client"
import { Container } from "@/components"
import { useCreatePinForm, useRouterWithSearchParams } from "@/hooks"
import { Spacer, Link, InputOtp, Button } from "@heroui/react"
import React, { FC } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { CREATE_PIN_FORM } from "../constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Controller } from "react-hook-form"

const Page: FC = () => {
    const {
        form: {
            handleSubmit,
            control,
            reset,
            formState: { isValid, isSubmitting },
        },
        onSubmit,
    } = useSingletonHook<ReturnType<typeof useCreatePinForm>>(CREATE_PIN_FORM)
    const router = useRouterWithSearchParams()

    return (
        <Container hasPadding>
            <form
                className="h-full flex flex-col justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <Link
                                as="button"
                                onPress={() => router.back()}
                                color="foreground"
                            >
                                <ArrowLeftIcon className="w-6 h-6" />
                            </Link>
                            <div className="text-2xl font-bold">Create PIN</div>
                        </div>
                        <Spacer y={4} />
                        <div className="text-xs text-foreground-400">
              Please enter your 6-digit PIN to create your account. Make sure to
              store the PIN securely, as it will be needed to access your
              account. If you enter the wrong PIN five times, your account will be removed
              to protect your wallet.
                        </div>
                    </div>
                    <Spacer y={9} />
                    <div>
                        <Controller
                            control={control}
                            name="pin"
                            render={({ field }) => (
                                <InputOtp
                                    {...field}
                                    className="w-full"
                                    size="lg"
                                    variant="flat"
                                    length={6}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        onPress={() =>
                            reset({
                                pin: "",
                            })
                        }
                        fullWidth
                        color="primary"
                        className="flex-1"
                        variant="flat"
                    >
            Reset
                    </Button>
                    <Button
                        type="submit"
                        isDisabled={!isValid}
                        isLoading={isSubmitting}
                        fullWidth
                        color="primary"
                        className="flex-1"
                    >
            Continue
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default Page
