import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@borovy.com' },
    update: {},
    create: {
      email: 'admin@borovy.com',
      password: hashedPassword,
      fullName: 'Главный Администратор',
      phone: '+375291234567',
      role: Role.ADMIN,
      agreedToTerms: true,
      agreedToPrivacy: true,
    },
  });

  console.log('✅ Создан администратор:', admin.email);

  const manager = await prisma.user.upsert({
    where: { email: 'manager@borovy.com' },
    update: {},
    create: {
      email: 'manager@borovy.com',
      password: hashedPassword,
      fullName: 'Тестовый Менеджер',
      phone: '+375291234568',
      role: Role.MANAGER,
      agreedToTerms: true,
      agreedToPrivacy: true,
    },
  });

  console.log('✅ Создан менеджер:', manager.email);

  const promoCode = await prisma.promoCode.upsert({
    where: { code: 'VAHTA2025' },
    update: {},
    create: {
      code: 'VAHTA2025',
      description: 'Тестовый промокод для вахты 2025',
      createdBy: manager.id,
      isActive: true,
    },
  });

  console.log('✅ Создан промокод:', promoCode.code);

  const worker = await prisma.user.upsert({
    where: { email: 'worker@borovy.com' },
    update: {},
    create: {
      email: 'worker@borovy.com',
      password: hashedPassword,
      fullName: 'Тестовый Работник',
      phone: '+375291234569',
      role: Role.WORKER,
      agreedToTerms: true,
      agreedToPrivacy: true,
    },
  });

  console.log('✅ Создан работник:', worker.email);

  await prisma.promoRegistration.upsert({
    where: { userId: worker.id },
    update: {},
    create: {
      userId: worker.id,
      promoCodeId: promoCode.id,
    },
  });

  console.log('✅ Работник связан с промокодом');

  const enterprise = await prisma.enterprise.create({
    data: {
      name: 'Северные Рудники',
      description: 'Добыча полезных ископаемых на Севере',
      location: 'Норильск, Красноярский край',
      contactInfo: {
        phone: '+73919234567',
        email: 'hr@rudniki.ru',
      },
      isActive: true,
    },
  });

  console.log('✅ Создано предприятие:', enterprise.name);

  const jobs = await prisma.job.createMany({
    data: [
      {
        enterpriseId: enterprise.id,
        title: 'Горнорабочий',
        description: 'Работа в шахте по добыче руды',
        requirements: 'Опыт работы от 1 года, медицинская книжка',
        salaryMin: 80000,
        salaryMax: 120000,
        workConditions: 'Вахта 30/30, проживание и питание за счет работодателя',
        location: 'Норильск',
        isActive: true,
      },
      {
        enterpriseId: enterprise.id,
        title: 'Машинист экскаватора',
        description: 'Управление экскаватором на открытых разработках',
        requirements: 'Права категории С, опыт от 2 лет',
        salaryMin: 100000,
        salaryMax: 150000,
        workConditions: 'Вахта 45/45, северные надбавки',
        location: 'Норильск',
        isActive: true,
      },
      {
        enterpriseId: enterprise.id,
        title: 'Электромонтер',
        description: 'Обслуживание электрооборудования',
        requirements: 'Группа допуска не ниже 4, опыт от 3 лет',
        salaryMin: 90000,
        salaryMax: 130000,
        workConditions: 'Вахта 60/30, полный соцпакет',
        location: 'Норильск',
        isActive: true,
      },
    ],
  });

  console.log('✅ Создано работ:', jobs.count);

  console.log('🎉 Заполнение базы данных завершено!');
  console.log('\n📝 Тестовые данные для входа:');
  console.log('Администратор: admin@borovy.com / password123');
  console.log('Менеджер: manager@borovy.com / password123');
  console.log('Работник: worker@borovy.com / password123');
  console.log('Промокод: VAHTA2025');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
