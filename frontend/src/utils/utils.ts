
// Thanks ChatGPT
// https://chat.openai.com/share/8f7002e5-c1b2-4416-89a9-571de68d6877
function categoryToTitle(category:string){

    // Replace underscores with spaces
    let stringWithSpaces = category.replace(/_/g, ' ');

    // Capitalize the first letter of each word
    let capitalizedString = stringWithSpaces.replace(/\b\w/g, (match) => match.toUpperCase());

    return capitalizedString;

}

export {categoryToTitle}