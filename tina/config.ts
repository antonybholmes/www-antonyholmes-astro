import { defineConfig, Form, TinaCMS } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",
        defaultItem: () => {
          return {
            // When a new post is created the title field will be set to "New post"
            title: "New Post",
            added: new Date(),
            authors: ["Antony Holmes"],
            draft: true,
          };
        },
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: false,
            // Example of using a custom slugify function
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
              return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
            },
          },
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            return {
              ...values,
              slug:
                values.slug ??
                values.title
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, ""),
              added: values.added ?? new Date().toLocaleString(),
              updated: new Date().toLocaleString(),
            };
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: "Slug",
            name: "slug",
            type: "string",
            //required: true,
          },
          {
            type: "image",
            label: "Hero image",
            name: "hero",
          },
          {
            label: "Authors",
            name: "authors",
            type: "string",
            list: true,
          },
          {
            label: "Added",
            name: "added",
            type: "datetime",
            // ui: {
            //   dateFormat: "MMM DD YYYY",
            //   parse: (value) => value && value.format("YYYY-MM-DD"),
            // },
            //required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
          },
          {
            name: "draft",
            label: "Draft",
            type: "boolean",
            //required: true,
            description: "If this is checked the post will not be published",
          },
          {
            label: "Updated",
            name: "updated",
            type: "datetime",
            // ui: {
            //   dateFormat: "MMM DD YYYY",
            //   parse: (value) => value && value.format("YYYY-MM-DD"),
            // },
            //required: true,
          },
        ],
      },
    ],
  },
});
