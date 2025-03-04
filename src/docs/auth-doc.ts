export const authDocs = {
  paths: {
    '/api/v1/auth/user/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Authenticate - User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    example: 'john.doe@example.com',
                  },
                  password: {
                    type: 'string',
                    example: 'strongpassword123',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description:
              'Registration successful. Please verify your email with the OTP sent.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      example: 201,
                    },
                    message: {
                      type: 'string',
                      example:
                        'Registration initiated. Please verify your email with the OTP sent.',
                    },
                    user: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          example: 'John Doe',
                        },
                        email: {
                          type: 'string',
                          example: 'john.doe@example.com',
                        },
                        isEmailVerified: {
                          type: 'boolean',
                          example: false,
                        },
                      },
                    },
                    verificationToken: {
                      type: 'string',
                      example: 'jwt-verification-token',
                    },
                  },
                },
              },
            },
          },
          409: { description: 'Email already registered' },
          500: { description: 'Server error' },
        },
      },
    },
    '/api/v1/auth/user/login': {
      post: {
        summary: 'Login with email and password',
        tags: ['Authenticate - User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'john.doe@example.com',
                  },
                  password: {
                    type: 'string',
                    example: 'strongpassword123',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      example: 200,
                    },
                    message: {
                      type: 'string',
                      example: 'Login successful.',
                    },
                    user: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          example: 'John Doe',
                        },
                        email: {
                          type: 'string',
                          example: 'john.doe@example.com',
                        },
                        isEmailVerified: {
                          type: 'boolean',
                          example: true,
                        },
                      },
                    },
                    token: {
                      type: 'string',
                      example: 'jwt-auth-token',
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid email or password' },
          403: { description: 'Email not verified' },
          500: { description: 'Server error' },
        },
      },
    },
  },
};

export const allAuthDocs = {
  paths: {
    ...authDocs.paths,
  },
};
