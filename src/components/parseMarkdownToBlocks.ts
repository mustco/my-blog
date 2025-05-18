import { marked } from "marked";

export function parseMarkdownToBlocks(markdown: string, postId: number) {
  const tokens = marked.lexer(markdown);
  const blocks = [];
  let level = 1;
  console.log(postId);
  for (const token of tokens) {
    switch (token.type) {
      case "heading":
        blocks.push({
          level: level++,
          post_id: postId,
          element: `h${token.depth}`,
          content: token.text,
          alt: null,
        });
        break;

      case "paragraph":
        // Cek jika paragraph hanya berisi image (atau inline tokens tanpa text)
        const hasOnlyImage =
          token.tokens &&
          token.tokens.length === 1 &&
          token.tokens[0].type === "image";

        // Tangani gambar dari child token
        if (token.tokens) {
          for (const child of token.tokens) {
            if (child.type === "image") {
              blocks.push({
                level: level++,
                post_id: postId,
                element: "img",
                content: child.href,
                alt: child.text,
              });
            }
          }
        }

        // Tambahkan blok paragraf hanya jika bukan cuma gambar
        if (!hasOnlyImage) {
          blocks.push({
            level: level++,
            post_id: postId,
            element: "p",
            content: token.text,
            alt: null,
          });
        }
        break;

      case "image":
        blocks.push({
          level: level++,
          post_id: postId,
          element: "img",
          content: token.href,
          alt: token.text,
        });
        break;

      case "list":
        const items = token.items.map((item: any) => item.text);
        blocks.push({
          level: level++,
          post_id: postId,
          element: token.ordered ? "ol" : "ul",
          content: JSON.stringify(items),
          alt: null,
        });
        break;

      case "blockquote":
        blocks.push({
          level: level++,
          post_id: postId,
          element: "blockquote",
          content: token.text,
          alt: null,
        });
        break;

      case "code":
        blocks.push({
          level: level++,
          post_id: postId,
          element: "code",
          content: token.text,
          alt: token.lang || null,
        });
        break;

      case "hr":
        blocks.push({
          level: level++,
          post_id: postId,
          element: "hr",
          content: null,
          alt: null,
        });
        break;

      case "html":
        blocks.push({
          level: level++,
          post_id: postId,
          element: "html",
          content: token.text,
          alt: null,
        });
        break;

      case "space":
        // Baris kosong, diabaikan saja
        break;

      // Untuk token inline seperti 'link', 'strong', 'em', 'codespan'
      // Biasanya tidak muncul di root lexer karena masuk sebagai children dalam paragraph

      default:
        // Bisa ditambah log untuk token yang tidak ditangani
        console.warn("Token tidak dikenal:", token.type, token);
        break;
    }
  }

  return blocks;
}
