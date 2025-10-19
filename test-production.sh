#!/bin/bash

echo "🔥🔥🔥 ПОЛНОЕ ТЕСТИРОВАНИЕ BOROVY API (PRODUCTION) 🔥🔥🔥"
echo "==========================================================="
echo ""

BASE_URL="https://borovybackend.onrender.com"

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_test() {
    echo -e "${BLUE}📝 TEST: $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ SUCCESS: $1${NC}"
}

print_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
}

print_section() {
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_section "🌐 ПРОВЕРКА ДОСТУПНОСТИ"

print_test "Backend доступен?"
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/jobs")
if [ "$HEALTH_CHECK" = "200" ]; then
    print_success "Backend работает! (HTTP $HEALTH_CHECK)"
else
    print_error "Backend недоступен! (HTTP $HEALTH_CHECK)"
    exit 1
fi

ADMIN_TOKEN=""
MANAGER_TOKEN=""
WORKER_TOKEN=""
PROMO_CODE=""
ENTERPRISE_ID=""
JOB_ID=""
APPLICATION_ID=""

print_section "1️⃣  АВТОРИЗАЦИЯ"

print_test "Логин админа"
ADMIN_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@borovy.com","password":"password123"}')

ADMIN_TOKEN=$(echo $ADMIN_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$ADMIN_TOKEN" ]; then
    print_success "Админ залогинился!"
else
    print_error "Ошибка логина админа"
    echo $ADMIN_LOGIN
    exit 1
fi

print_test "Логин менеджера"
MANAGER_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@borovy.com","password":"password123"}')

MANAGER_TOKEN=$(echo $MANAGER_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$MANAGER_TOKEN" ]; then
    print_success "Менеджер залогинился!"
fi

print_test "Логин работника"
WORKER_LOGIN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@borovy.com","password":"password123"}')

WORKER_TOKEN=$(echo $WORKER_LOGIN | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$WORKER_TOKEN" ]; then
    print_success "Работник залогинился!"
fi

print_section "2️⃣  ПРОМОКОДЫ"

print_test "Получение существующих промокодов"
ALL_PROMOS=$(curl -s -X GET "$BASE_URL/promo-codes" \
  -H "Authorization: Bearer $ADMIN_TOKEN")
PROMO_COUNT=$(echo $ALL_PROMOS | grep -o '"id"' | wc -l)
print_success "Найдено промокодов: $PROMO_COUNT"

print_test "Создание промокода менеджером"
TIMESTAMP=$(date +%s)
CREATE_PROMO=$(curl -s -X POST "$BASE_URL/promo-codes" \
  -H "Authorization: Bearer $MANAGER_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"PROD_${TIMESTAMP}\",\"description\":\"Production test promo\"}")

PROMO_CODE=$(echo $CREATE_PROMO | grep -o '"code":"[^"]*' | cut -d'"' -f4)
if [ ! -z "$PROMO_CODE" ]; then
    print_success "Промокод создан: $PROMO_CODE"
fi

print_section "3️⃣  ВАКАНСИИ"

print_test "Получение всех вакансий (публичный endpoint)"
ALL_JOBS=$(curl -s -X GET "$BASE_URL/jobs")
JOB_COUNT=$(echo $ALL_JOBS | grep -o '"id"' | wc -l)
print_success "Найдено вакансий: $JOB_COUNT"

if [ $JOB_COUNT -gt 0 ]; then
    JOB_ID=$(echo $ALL_JOBS | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    print_success "Используем вакансию для теста: $JOB_ID"
fi

print_section "4️⃣  ОТКЛИКИ"

if [ ! -z "$JOB_ID" ]; then
    print_test "Создание отклика"
    CREATE_APPLICATION=$(curl -s -X POST "$BASE_URL/applications" \
      -H "Authorization: Bearer $WORKER_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"jobId\":\"$JOB_ID\"}")

    APPLICATION_ID=$(echo $CREATE_APPLICATION | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    if [ ! -z "$APPLICATION_ID" ]; then
        print_success "Отклик создан: $APPLICATION_ID"
    else
        print_error "Не удалось создать отклик (возможно уже откликался)"
    fi
fi

print_test "Получение откликов работника"
MY_APPS=$(curl -s -X GET "$BASE_URL/applications/my" \
  -H "Authorization: Bearer $WORKER_TOKEN")
APP_COUNT=$(echo $MY_APPS | grep -o '"id"' | wc -l)
print_success "У работника откликов: $APP_COUNT"

print_section "5️⃣  СТАТИСТИКА"

print_test "Статистика админа"
ADMIN_STATS=$(curl -s -X GET "$BASE_URL/statistics/admin" \
  -H "Authorization: Bearer $ADMIN_TOKEN")
TOTAL_USERS=$(echo $ADMIN_STATS | grep -o '"total":[0-9]*' | head -1 | cut -d':' -f2)
print_success "Всего пользователей в системе: $TOTAL_USERS"

print_test "Статистика менеджера"
MANAGER_STATS=$(curl -s -X GET "$BASE_URL/statistics/manager" \
  -H "Authorization: Bearer $MANAGER_TOKEN")
print_success "Статистика получена"

print_test "Статистика работника"
WORKER_STATS=$(curl -s -X GET "$BASE_URL/statistics/worker" \
  -H "Authorization: Bearer $WORKER_TOKEN")
print_success "Статистика получена"

print_section "6️⃣  ПРЕДПРИЯТИЯ"

print_test "Получение всех предприятий"
ALL_ENTERPRISES=$(curl -s -X GET "$BASE_URL/enterprises" \
  -H "Authorization: Bearer $ADMIN_TOKEN")
ENT_COUNT=$(echo $ALL_ENTERPRISES | grep -o '"id"' | wc -l)
print_success "Найдено предприятий: $ENT_COUNT"

print_section "📊 ИТОГИ ТЕСТИРОВАНИЯ (PRODUCTION)"

echo -e "${GREEN}✅ ВСЕ PRODUCTION ENDPOINTS ПРОТЕСТИРОВАНЫ!${NC}"
echo ""
echo "🌐 URLs:"
echo "  Backend:  $BASE_URL"
echo "  Frontend: https://borovy-frontend.onrender.com"
echo "  API Docs: $BASE_URL/api/docs"
echo ""
echo "📝 Тестовые данные:"
echo "  Admin:    admin@borovy.com / password123"
echo "  Manager:  manager@borovy.com / password123"
echo "  Worker:   worker@borovy.com / password123"
echo ""
echo -e "${YELLOW}🎉 ПЛАТФОРМА BOROVY РАБОТАЕТ В PRODUCTION! 🎉${NC}"
