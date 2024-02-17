
// Thanks ChatGPT
// https://chat.openai.com/share/8f7002e5-c1b2-4416-89a9-571de68d6877
export function categoryToTitle(category:string){

    // Replace underscores with spaces
    let stringWithSpaces = category.replace(/_/g, ' ');

    // Capitalize the first letter of each word
    let capitalizedString = stringWithSpaces.replace(/\b\w/g, (match) => match.toUpperCase());

    return capitalizedString;

}

export function escape(text:any) {
    if (text){
        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

export function numberic(num:any) {
    if (!num) return null;
    if (num === 1000) return '1k';
    if (num < 1000) return num;
    num = num / 1000;
    if (num > 10) return parseInt(num, 10) + 'k';
    return num.toFixed(1) + 'k';
  }