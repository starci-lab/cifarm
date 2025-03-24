/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash"

export const mergeObjects = <TObject extends object>(
    object1: Record<string, any>,
    object2: Record<string, any>
): TObject => {
    // track the keys of the objects 2, if object 2
    Object.keys(object2).forEach((key) => {
        // If the key exists in object1
        if (object2[key]) {
            // if object2[key] is a plain object, recurse
            if (_.isPlainObject(object2[key]) && _.isPlainObject(object1[key])) {
                object1[key] = mergeObjects(object1[key], object2[key])
            } else {
                // else, manually set the value
                object1[key] = object2[key]
            }   
        }
        // if object 2 key is null, delete the key from object 1
        if (object2[key] === null) {
            delete object1[key]
        }
    })
    return object1 as TObject
}
