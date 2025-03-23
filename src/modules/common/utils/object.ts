/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash"

export const mergeObjects = <TObject extends object>(
    object1: Record<string, any>,
    object2: Record<string, any>
): TObject => {
    // track the keys of the objects 2, if object 2
    Object.keys(object1).forEach((key) => {
    // If the key exists in object2, and both is an object, recurse
        if (_.has(object2, key)) {
            if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
                object1[key] = mergeObjects(object1[key], object2[key])
            }
            // else, manually set the value
            object1[key] = object2[key]
        }
        // if object 2 key is null, delete the key from object 1
        if (object2[key] === null) {
            delete object1[key]
        }
    })
    return object1 as TObject
}
