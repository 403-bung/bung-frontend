export default function summaryText(text: string, textLength: number) {
  return text.length > textLength ? text.slice(0, textLength) + "..." : text;
}
