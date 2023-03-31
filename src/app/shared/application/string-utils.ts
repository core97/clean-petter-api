export class StringUtils {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static capitalizeWords(str: string): string {
    return str
      .split(' ')
      .map(word => StringUtils.capitalize(word))
      .join(' ');
  }

  static toCamelCase(str: string) {
    return str.replace(/[-_.]\w/g, match => match.charAt(1).toUpperCase());
  }
}
