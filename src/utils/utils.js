export const stringCount = (string) => string.split(' ').filter( e => e ).length;

export const selectText = (text) => text[Math.floor(Math.random() * text.length)].replace(/(\r\n|\n|\r)/gm,"");
