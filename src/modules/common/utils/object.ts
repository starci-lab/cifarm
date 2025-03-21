/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractSchema } from "@/modules/entities"
import { DeepPartial } from "react-hook-form"
import _ from "lodash"
export const mergeChangesToObjects = <TObject extends AbstractSchema>(
    object: TObject,
    changes: DeepPartial<TObject>,
) => {
    // use any to avoid type errors
    const anyObject = object as any
    const anyChanges = changes as any
    // iterate over the changes
    Object.keys(anyChanges).forEach((key) => {
        // if the value is null, delete the key
        if (anyChanges[key] === null) {
            delete anyObject[key]
            return
        }
        // if both are objects, recursively merge the objects
        if (
            _.isPlainObject(anyChanges[key]) &&
            _.isPlainObject(anyObject[key])
        ) {
            anyObject[key] = mergeChangesToObjects(anyObject[key], anyChanges[key])  
            return
        }
        // if object current is undefined and changes is an object, set the object
        if (anyObject[key] === undefined && _.isPlainObject(anyChanges[key])) {
            anyObject[key] = anyChanges[key]
            return
        }
        // the rest of the cases, just set the value
        anyObject[key] = anyChanges[key]
    })
    return object
}

export const mergeChangesToObjectsArray = <TObject extends AbstractSchema>(
    objects: Array<TObject>,
    changes: Array<DeepPartial<TObject>>,
) => {
    return objects.map((object) => {
        const change = changes.find((change) => change.id === object.id)
        if (change) {
            return mergeChangesToObjects(object, change)
        }
        return object
    })
}

