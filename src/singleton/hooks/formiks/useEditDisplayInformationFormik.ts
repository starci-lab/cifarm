import { useSingletonHook } from "@/singleton/core"
import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import {
    GRAPHQL_MUTATION_CREATE_SIGNED_URL_SWR_MUTATION,
    GRAPHQL_MUTATION_UPDATE_DISPLAY_INFORMATION_SWR_MUTATION,
} from "../../keys"
import {
    useGraphQLMutationCreateSignedUrlSwrMutation,
    useGraphQLMutationUpdateDisplayInformationSwrMutation,
} from "../swrs/graphql/mutations"
import { addErrorToast } from "@/components"

export interface EditDisplayInformationFormikValues {
  username: string;
  avatarUrl: string;
  // the image file
  imageFile?: File;
  isImageUrlValid?: boolean;
}

export const useEditDisplayInformationFormik =
  (): FormikProps<EditDisplayInformationFormikValues> => {
      const { swrMutation: updateDisplayInformationMutation } = useSingletonHook<
      ReturnType<typeof useGraphQLMutationUpdateDisplayInformationSwrMutation>
    >(GRAPHQL_MUTATION_UPDATE_DISPLAY_INFORMATION_SWR_MUTATION)

      const { swrMutation: createSignedUrlMutation } = useSingletonHook<
      ReturnType<typeof useGraphQLMutationCreateSignedUrlSwrMutation>
    >(GRAPHQL_MUTATION_CREATE_SIGNED_URL_SWR_MUTATION)

      return useFormik<EditDisplayInformationFormikValues>({
          initialValues: {
              username: "",
              avatarUrl: "",
              isImageUrlValid: false,
          },
          validationSchema: Yup.object().shape({
              // validate username only number, letters and underscores
              username: Yup.string()
                  .required("Username is required")
                  .matches(
                      /^[a-zA-Z0-9_]+$/,
                      "Username can only contain letters, numbers and underscores"
                  ),
              avatarUrl: Yup.string().required("Avatar URL is required"),
              // is image url must be valid if file is not selected
              isImageUrlValid: Yup.boolean().when("imageFile", {
                  is: (imageFile: File | undefined) => !imageFile,
                  then: (schema) => schema.oneOf([true], "Image URL is not valid"),
                  otherwise: (schema) => schema.notRequired(),
              }),
          }),
          onSubmit: async (values) => {
              try {
                  const { imageFile } = values
                  if (imageFile) {
                      const { data } = await createSignedUrlMutation.trigger({
                          request: {
                              key: imageFile.name,
                          },
                      })
                      if (!data) {
                          throw new Error(
                              "No data returned from create signed url mutation"
                          )
                      }
                      alert(data.signedUrl)
                      // console.log(data.signedUrl)
                  }
              } catch (error) {
                  console.error(error)
                  addErrorToast({
                      errorMessage: (error as Error).message,
                  })
              }
          },
      })
  }
