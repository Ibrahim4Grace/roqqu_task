export const addressDocs = {
  paths: {
    '/api/v1/address': {
      get: {
        summary: 'Get user address',
        tags: ['User - Address'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Address retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '1234' },
                    street: { type: 'string', example: '123 Main St' },
                    city: { type: 'string', example: 'New York' },
                    state: { type: 'string', example: 'NY' },
                  },
                },
              },
            },
          },
          404: { description: 'Address not found' },
          500: { description: 'Server error' },
        },
      },
      post: {
        summary: 'Create a new address',
        tags: ['User - Address'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  street: { type: 'string', example: '123 Main St' },
                  city: { type: 'string', example: 'New York' },
                  state: { type: 'string', example: 'NY' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Address created successfully',
          },
          400: { description: 'Invalid request data' },
          500: { description: 'Server error' },
        },
      },
    },
    '/api/v1/address/{userId}': {
      patch: {
        summary: 'Update user address',
        tags: ['Address'],
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
                  street: { type: 'string', example: '456 New St' },
                  city: { type: 'string', example: 'Los Angeles' },
                  state: { type: 'string', example: 'CA' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Address updated successfully',
          },
          404: { description: 'Address not found' },
          500: { description: 'Server error' },
        },
      },
    },
  },
};

export const allAddressDocs = {
  paths: {
    ...addressDocs.paths,
  },
};
