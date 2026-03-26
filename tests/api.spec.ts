import { test, expect } from '@playwright/test';

test('Отримання списку постів через GET', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response).toBeOK();
  
  const body = await response.json();
  
  expect(body).toMatchObject({
    id: 1,
    userId: 1
  });
  
  expect(typeof body.title).toBe('string');
});

test('Створення нового поста через POST', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Мій тестовий пост',
      body: 'Це зміст мого запиту',
      userId: 1
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  
  expect(body.title).toBe('Мій тестовий пост');
  expect(body).toHaveProperty('id');
});

test('Отримання повного переліку публікацій', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  
  expect(response).toBeOK(); 
  
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy(); 
  expect(body.length).toBeGreaterThan(0);   
});

test('Створення ресурсу та перевірка обробки даних', async ({ request }) => {
  const newPost = {
    title: 'Автоматизація API',
    body: 'Тестування через Playwright',
    userId: 15
  };

  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: newPost,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });

  expect(response.status()).toBe(201); 
  
  const body = await response.json();
  expect(body).toMatchObject(newPost);
  expect(body).toHaveProperty('id');
});

test('Отримання неіснуючої публікації', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999');
  
  expect(response.status()).toBe(404); 
  expect(response.ok()).toBeFalsy();   
});

test('Видалення ресурсу  та ідемпотентність', async ({ request }) => {

  const response1 = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
  expect(response1.status()).toBe(200); 
  
  const body1 = await response1.json();
  expect(Object.keys(body1).length).toBe(0); 

  const response2 = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
  expect(response2.status()).toBe(200); 
  
  const body2 = await response2.json();
  expect(Object.keys(body2).length).toBe(0); 
});