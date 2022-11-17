
export function parseHTMLTags (comment: string) {
   const div = document.createElement("div");
   div.innerHTML = comment;
   return div.textContent || div.innerText || "";
}