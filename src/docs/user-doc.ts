// export const userDocs = {
//   paths: {
//     '/api/v1/user': {
//       get: {
//         summary: 'Retrieve current user profile',
//         tags: ['User - Profile'],
//         security: [{ BearerAuth: [] }],
//         responses: {
//           '200': {
//             description: 'User profile retrieved successfully.',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     status: {
//                       type: 'number',
//                       example: 200,
//                     },
//                     message: {
//                       type: 'string',
//                       example: 'User profile retrieved successfully.',
//                     },
//                     data: {
//                       type: 'object',
//                       properties: {
//                         name: {
//                           type: 'string',
//                           example: 'John Doe',
//                         },
//                         email: {
//                           type: 'string',
//                           example: 'john.doe@example.com',
//                         },
//                         isEmailVerified: {
//                           type: 'boolean',
//                           example: true,
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           '401': {
//             description: 'Unauthorized. Bearer token is missing or invalid.',
//           },
//           '500': {
//             description: 'Server error',
//           },
//         },
//       },
//       put: {
//         summary: 'Update current user profile',
//         tags: ['User - Profile'],
//         security: [
//           {
//             BearerAuth: [],
//           },
//         ],
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 properties: {
//                   name: {
//                     type: 'string',
//                     example: 'Jane Doe',
//                   },
//                   email: {
//                     type: 'string',
//                     example: 'jane.doe@example.com',
//                   },
//                   phone: {
//                     type: 'string',
//                     example: '+1234567890',
//                   },
//                   addresses: {
//                     type: 'object',
//                     properties: {
//                       street: {
//                         type: 'string',
//                         example: '123 Main St',
//                       },
//                       city: {
//                         type: 'string',
//                         example: 'New York',
//                       },
//                       state: {
//                         type: 'string',
//                         example: 'NY',
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           '200': {
//             description: 'User profile updated successfully.',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     status: {
//                       type: 'number',
//                       example: 200,
//                     },
//                     message: {
//                       type: 'string',
//                       example: 'User profile updated successfully.',
//                     },
//                     data: {
//                       type: 'object',
//                       properties: {
//                         name: {
//                           type: 'string',
//                           example: 'Jane Doe',
//                         },
//                         email: {
//                           type: 'string',
//                           example: 'jane.doe@example.com',
//                         },
//                         phone: {
//                           type: 'string',
//                           example: '+1234567890',
//                         },
//                         addresses: {
//                           type: 'object',
//                           properties: {
//                             street: {
//                               type: 'string',
//                               example: '123 Main St',
//                             },
//                             city: {
//                               type: 'string',
//                               example: 'New York',
//                             },
//                             state: {
//                               type: 'string',
//                               example: 'NY',
//                             },
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           '400': {
//             description:
//               'Bad request. Validation failed for one or more fields.',
//           },
//           '401': {
//             description: 'Unauthorized. Bearer token is missing or invalid.',
//           },
//           '404': {
//             description: 'User not found.',
//           },
//           '500': {
//             description: 'Server error',
//           },
//         },
//       },
//     },
//   },
// };

export const userDocs = {
  paths: {
    '/api/v1/user': {
      get: {
        summary: 'Fetch current user details',
        tags: ['User'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'User details retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: { type: 'object' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'User not found' },
        },
      },
    },
    '/api/v1/users': {
      get: {
        summary: 'Fetch users with pagination',
        tags: ['User'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            schema: { type: 'integer', example: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of users per page',
            schema: { type: 'integer', example: 10 },
          },
        ],
        responses: {
          200: {
            description: 'Users retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    users: { type: 'array', items: { type: 'object' } },
                    total: { type: 'integer', example: 100 },
                    page: { type: 'integer', example: 1 },
                    limit: { type: 'integer', example: 10 },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
      post: {
        summary: 'Create a new user',
        tags: ['User'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  full_name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', example: 'john.doe@example.com' },
                  password: { type: 'string', example: 'securepassword' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/v1/user/{userId}': {
      put: {
        summary: 'Update user details',
        tags: ['User'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  full_name: { type: 'string', example: 'Jane Doe' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'User updated successfully' },
          400: { description: 'Validation error' },
          404: { description: 'User not found' },
        },
      },
    },
    '/api/v1/users/count': {
      get: {
        summary: 'Get total user count',
        tags: ['User'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Total user count retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    count: { type: 'integer', example: 500 },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const allUserDocs = {
  paths: {
    ...userDocs.paths,
  },
};
