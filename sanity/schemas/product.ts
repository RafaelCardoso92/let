import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produtos",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Pratos", value: "plates" },
          { title: "Talheres", value: "cutlery" },
          { title: "Copos", value: "glassware" },
          { title: "Mobiliário", value: "furniture" },
          { title: "Atoalhados", value: "linens" },
          { title: "Utensílios", value: "utensils" },
          { title: "Lounge", value: "lounge" },
          { title: "Decoração", value: "decoration" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
        },
      ],
    }),
    defineField({
      name: "basePrice",
      title: "Preço Base (Estimativa)",
      type: "number",
      description: "Preço estimado por unidade (usado para dar ideia ao cliente)",
    }),
    defineField({
      name: "unit",
      title: "Unidade",
      type: "string",
      description: "Ex: por unidade, por conjunto, por dia",
      options: {
        list: [
          { title: "Por Unidade", value: "unit" },
          { title: "Por Conjunto", value: "set" },
          { title: "Por Dia", value: "day" },
          { title: "Por Evento", value: "event" },
        ],
      },
      initialValue: "unit",
    }),
    defineField({
      name: "minQuantity",
      title: "Quantidade Mínima",
      type: "number",
      description: "Quantidade mínima por pedido",
      initialValue: 1,
    }),
    defineField({
      name: "available",
      title: "Disponível",
      type: "boolean",
      description: "Produto disponível para aluguer",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Produto Destacado",
      type: "boolean",
      description: "Mostrar na página inicial",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Ordem de exibição (menor número aparece primeiro)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
