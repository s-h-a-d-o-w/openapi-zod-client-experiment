import { z } from "zod";

const Category = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
const Tag = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
const Pet = z
  .object({
    id: z.number().int().optional(),
    name: z.string(),
    category: Category.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(Tag).optional(),
    status: z.enum(["available", "pending", "sold"]).optional(),
  })
  .passthrough();
const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .passthrough();
const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(["placed", "approved", "delivered"]),
    complete: z.boolean(),
  })
  .partial()
  .passthrough();
const User = z
  .object({
    id: z.number().int(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    userStatus: z.number().int(),
  })
  .partial()
  .passthrough();

export const petstoreParams = {
  "put /pet": {
    body: Pet,
  },
  "post /pet": {
    body: Pet,
  },
  "get /pet/:petId": {
    petId: z.number().int(),
  },
  "post /pet/:petId": {
    petId: z.number().int(),
    name: z.string().optional(),
    status: z.string().optional(),
  },
  "delete /pet/:petId": {
    api_key: z.string().optional(),
    petId: z.number().int(),
  },
  "post /pet/:petId/uploadImage": {
    body: z.instanceof(File),
    petId: z.number().int(),
    additionalMetadata: z.string().optional(),
  },
  "get /pet/findByStatus": {
    status: z
      .enum(["available", "pending", "sold"])
      .optional()
      .default("available"),
  },
  "get /pet/findByTags": {
    tags: z.array(z.string()).optional(),
  },
  "get /store/inventory": {},
  "post /store/order": {
    body: Order,
  },
  "get /store/order/:orderId": {
    orderId: z.number().int(),
  },
  "delete /store/order/:orderId": {
    orderId: z.number().int(),
  },
  "post /user": {
    body: User,
  },
  "get /user/:username": {
    username: z.string(),
  },
  "put /user/:username": {
    body: User,
    username: z.string(),
  },
  "delete /user/:username": {
    username: z.string(),
  },
  "post /user/createWithList": {
    body: z.array(User),
  },
  "get /user/login": {
    username: z.string().optional(),
    password: z.string().optional(),
  },
  "get /user/logout": {},
};

export type PetstoreParams = {
  "put /pet": {
    body: z.infer<(typeof petstoreParams)["put /pet"]["body"]>;
  };
  "post /pet": {
    body: z.infer<(typeof petstoreParams)["post /pet"]["body"]>;
  };
  "get /pet/:petId": {
    petId: z.infer<(typeof petstoreParams)["get /pet/:petId"]["petId"]>;
  };
  "post /pet/:petId": {
    petId: z.infer<(typeof petstoreParams)["post /pet/:petId"]["petId"]>;
    name: z.infer<(typeof petstoreParams)["post /pet/:petId"]["name"]>;
    status: z.infer<(typeof petstoreParams)["post /pet/:petId"]["status"]>;
  };
  "delete /pet/:petId": {
    api_key: z.infer<(typeof petstoreParams)["delete /pet/:petId"]["api_key"]>;
    petId: z.infer<(typeof petstoreParams)["delete /pet/:petId"]["petId"]>;
  };
  "post /pet/:petId/uploadImage": {
    body: z.infer<
      (typeof petstoreParams)["post /pet/:petId/uploadImage"]["body"]
    >;
    petId: z.infer<
      (typeof petstoreParams)["post /pet/:petId/uploadImage"]["petId"]
    >;
    additionalMetadata: z.infer<
      (typeof petstoreParams)["post /pet/:petId/uploadImage"]["additionalMetadata"]
    >;
  };
  "get /pet/findByStatus": {
    status: z.infer<(typeof petstoreParams)["get /pet/findByStatus"]["status"]>;
  };
  "get /pet/findByTags": {
    tags: z.infer<(typeof petstoreParams)["get /pet/findByTags"]["tags"]>;
  };
  "get /store/inventory": {};
  "post /store/order": {
    body: z.infer<(typeof petstoreParams)["post /store/order"]["body"]>;
  };
  "get /store/order/:orderId": {
    orderId: z.infer<
      (typeof petstoreParams)["get /store/order/:orderId"]["orderId"]
    >;
  };
  "delete /store/order/:orderId": {
    orderId: z.infer<
      (typeof petstoreParams)["delete /store/order/:orderId"]["orderId"]
    >;
  };
  "post /user": {
    body: z.infer<(typeof petstoreParams)["post /user"]["body"]>;
  };
  "get /user/:username": {
    username: z.infer<
      (typeof petstoreParams)["get /user/:username"]["username"]
    >;
  };
  "put /user/:username": {
    body: z.infer<(typeof petstoreParams)["put /user/:username"]["body"]>;
    username: z.infer<
      (typeof petstoreParams)["put /user/:username"]["username"]
    >;
  };
  "delete /user/:username": {
    username: z.infer<
      (typeof petstoreParams)["delete /user/:username"]["username"]
    >;
  };
  "post /user/createWithList": {
    body: z.infer<(typeof petstoreParams)["post /user/createWithList"]["body"]>;
  };
  "get /user/login": {
    username: z.infer<(typeof petstoreParams)["get /user/login"]["username"]>;
    password: z.infer<(typeof petstoreParams)["get /user/login"]["password"]>;
  };
  "get /user/logout": {};
};

// See https://github.com/colinhacks/zod#type-inference
export type Petstore = {
  Category: z.infer<typeof Category>;
  Tag: z.infer<typeof Tag>;
  Pet: z.infer<typeof Pet>;
  ApiResponse: z.infer<typeof ApiResponse>;
  Order: z.infer<typeof Order>;
  User: z.infer<typeof User>;
};

export const petstore = {
  Category,
  Tag,
  Pet,
  ApiResponse,
  Order,
  User,
};
