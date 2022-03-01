const { Router } = require('express');

const authController = require('../controllers/user.controller');

const router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth managing API
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth managing API
 */

/**
 * @swagger
 * /api/user/signup:
 *  post:
 *      summary: Return registered user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          '201':
 *              description: User created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *
 * /api/user/signin:
 *  post:
 *      summary: Return token and user id
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          '200':
 *              description: 'User logged in'
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                              userId:
 *                                  type: string
 *
 */

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
