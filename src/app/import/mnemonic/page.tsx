"use client"
import { IMPORT_ACCOUNT_FORMIK } from "@/app/constants"
import { Container, ExtendedButton, ExtendedTextarea, Header, Spacer } from "@/components"
import { useImportAccountFormik } from "@/hooks"
import { useSingletonHook2 } from "@/modules/singleton-hook"
import React, { FC } from "react"

const Page: FC = () => {
    const formik = useSingletonHook2<ReturnType<typeof useImportAccountFormik>>(IMPORT_ACCOUNT_FORMIK)
    console.log(formik.touched)
    return (
        <Container hasPadding>
            <form className="h-full flex flex-col gap-6 justify-between" onSubmit={formik.handleSubmit}>
                <div>
                    <Header title="Import from mnemonic" description="Import your account from existing mnemonic that were exported from other CiFarm wallet." />
                    <Spacer y={6} />
                    <ExtendedTextarea
                        id="mnemonic"
                        classNames={{
                            textarea: "h-28",
                        }} placeholder="Enter your mnemonic" 
                        value={formik.values.mnemonic}
                        onBlur={formik.handleBlur} // Trigger touched on blur
                        onValueChange={(value) => formik.setFieldValue("mnemonic", value)}
                        isInvalid={
                            !!(formik.touched.mnemonic && formik.errors.mnemonic)
                        }
                        errorMessage={
                            (formik.touched.mnemonic && formik.errors.mnemonic) ||
                            undefined
                        }
                    />
                </div>
                <ExtendedButton className="w-full" onClick={() => formik.submitForm()}>Import</ExtendedButton>
            </form>
        </Container>
    )
}

export default Page
