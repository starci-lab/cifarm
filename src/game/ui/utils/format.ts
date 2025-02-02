export const adjustTextMinLength = (text: string, minLength = 20) => {
    let adjustedText = text.trim()

    // Add spaces to both sides if the text is shorter than the minLength
    if (adjustedText.length < minLength) {
        const paddingLength = minLength - adjustedText.length
        const paddingLeft = Math.floor(paddingLength / 2)  // spaces on the left
        let paddingRight = paddingLength - paddingLeft   // spaces on the right

        // If paddingLeft and paddingRight aren't equal, add 1 more space to the right
        if (paddingLeft !== paddingRight) {
            paddingRight += 1
        }

        adjustedText = " ".repeat(paddingLeft) + adjustedText + " ".repeat(paddingRight)
    }

    return adjustedText
}
