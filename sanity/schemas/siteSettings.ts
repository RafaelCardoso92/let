import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do Site",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroTitle",
      title: "Título Principal (Hero)",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtítulo (Hero)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "contactEmail",
      title: "Email de Contacto",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Telefones",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialMedia",
      title: "Redes Sociais",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
