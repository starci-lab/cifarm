import { useSingletonHook } from "@/singleton"
import { FormikProps, useFormik } from "formik"
import * as Yup from "yup"
import {
    GRAPHQL_MUTATION_CREATE_SIGNED_URL_SWR_MUTATION,
    GRAPHQL_MUTATION_UPDATE_DISPLAY_INFORMATION_SWR_MUTATION,
    GRAPHQL_QUERY_USER_SWR,
} from "../../keys"
import {
    useGraphQLMutationCreateSignedUrlSwrMutation,
    useGraphQLMutationUpdateDisplayInformationSwrMutation,
    useGraphQLQueryUserSwr,
} from "../swrs"
import { addErrorToast, addSuccessToast } from "@/components"
import axios from "axios"
import { ObjectCannedACL } from "@/modules/apollo"
import { v4 as uuidv4 } from "uuid"

const AVATARS = "avatars"
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

      const { swr: userSwr } = useSingletonHook<
      ReturnType<typeof useGraphQLQueryUserSwr>
    >(GRAPHQL_QUERY_USER_SWR)

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
                  let avatarUrl = values.avatarUrl
                  const { imageFile } = values
                  if (imageFile) {
                      const key = `${AVATARS}/${uuidv4()}`
                      const { data } = await createSignedUrlMutation.trigger({
                          request: {
                              key,
                              acl: ObjectCannedACL.PublicRead,
                              contentType: imageFile.type,
                          },
                      })
                      if (!data) {
                          throw new Error(
                              "No data returned from create signed url mutation"
                          )
                      }
                      //alert(data.signedUrl)
                      // console.log(data.signedUrl)
                      // update file to the signed url
                      await axios.put(data.signedUrl, imageFile, {
                          headers: {
                              "Content-Type": "image/png",
                              "x-amz-acl": "public-read",
                          },
                      })
                      avatarUrl = data.signedUrl.split("?").at(0) ?? ""
                  }
                  // update display information
                  const { message } = await updateDisplayInformationMutation.trigger({
                      request: {
                          // update avatar url and username
                          // if avatar url is not valid, do not update it
                          avatarUrl,
                          // if username is not valid, do not update it
                          // || is used to check if the value is undefined
                          username: values.username,
                      },
                  })
                  // update user swr
                  await userSwr.mutate()
                  addSuccessToast({
                      successMessage: message,
                  })
              } catch (error) {
                  console.log(error)
                  addErrorToast({
                      errorMessage: (error as Error).message,
                  })
              }
          },
      })
  }
