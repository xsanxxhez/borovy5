#!/bin/bash

BACKEND_URL="https://borovybackend.onrender.com"

echo "🔥 Инициализация Production базы данных..."
echo ""

# Регистрация админа
echo "📝 Создание админа..."
curl -X POST "$BACKEND_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@borovy.com",
    "password": "password123",
    "fullName": "Главный Администратор",
    "phone": "+7 999 000 00 00",
    "agreedToTerms": true,
    "agreedToPrivacy": true
  }'

echo ""
echo ""

# Регистрация менеджера  
echo "📝 Создание менеджера..."
curl -X POST "$BACKEND_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manager@borovy.com",
    "password": "password123",
    "fullName": "Главный Менеджер",
    "phone": "+7 999 111 11 11",
    "agreedToTerms": true,
    "agreedToPrivacy": true
  }'

echo ""
echo ""

# Регистрация работника
echo "📝 Создание работника..."
curl -X POST "$BACKEND_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "worker@borovy.com",
    "password": "password123",
    "fullName": "Тестовый Работник",
    "phone": "+7 999 222 22 22",
    "agreedToTerms": true,
    "agreedToPrivacy": true
  }'

echo ""
echo ""
echo "✅ Пользователи созданы!"
echo ""
echo "Теперь нужно вручную в БД изменить роли:"
echo "  admin@borovy.com -> ADMIN"
echo "  manager@borovy.com -> MANAGER"
echo ""

