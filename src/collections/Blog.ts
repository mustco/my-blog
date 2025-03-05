import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Blog: CollectionConfig = {
  slug: "blog",
  access: { read: () => true, create: () => true, update: () => true },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor(),
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
