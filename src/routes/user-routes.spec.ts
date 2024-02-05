import app from '@/app'
import request from 'supertest'

import { describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  it('should be able to authenticate', async () => {
    const responseCreateUser = await request(app).post('/users/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'T@123456',
    })
    console.log(responseCreateUser)
    const response = await request(app).post('/users/session').send({
      email: 'johndoe@example.com',
      password: 'T@123456',
    })

    console.log(response)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
