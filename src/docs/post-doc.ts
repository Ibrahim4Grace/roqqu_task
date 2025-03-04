export const postDocs = {
  paths: {
    '/api/v1/posts': {
      get: {
        summary: 'Get user posts',
        tags: ['User - Posts'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '12345' },
                      title: { type: 'string', example: 'My First Post' },
                      body: {
                        type: 'string',
                        example: 'This is the body of the post.',
                      },
                      userId: { type: 'string', example: '67890' },
                      createdAt: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          500: { description: 'Server error' },
        },
      },
      post: {
        summary: 'Create a new post',
        tags: ['Posts'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', example: 'New Post' },
                  body: { type: 'string', example: 'Post body here.' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Post created successfully',
            body: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '12345' },
                    title: { type: 'string', example: 'New Post' },
                    body: { type: 'string', example: 'Post body here.' },
                    userId: { type: 'string', example: '67890' },
                    createdAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          400: { description: 'Validation error' },
          401: { description: 'Unauthorized' },
          500: { description: 'Server error' },
        },
      },
    },
    '/api/v1/posts/{postId}': {
      delete: {
        summary: 'Delete a post',
        tags: ['User - Posts'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'postId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: '12345',
          },
        ],
        responses: {
          200: { description: 'Post deleted successfully' },
          404: { description: 'Post not found' },
          401: { description: 'Unauthorized' },
          500: { description: 'Server error' },
        },
      },
    },
  },
};

export const allPostDocs = {
  paths: {
    ...postDocs.paths,
  },
};
