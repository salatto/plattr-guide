# Задачи и SEO улучшения

## 🔍 SEO - Анализ страницы 404

### ✅ Текущая реализация
**Расположение:** `/src/app/not-found.tsx` - ✅ Правильно для Next.js App Router

**Текущий дизайн:**
- Центрированный layout с `min-h-screen`
- Большой заголовок "404" зеленого цвета
- Объяснительный текст
- Кнопка "Go back home" с hover эффектом

### 🎯 Что хорошо
1. ✅ Правильное расположение файла для Next.js
2. ✅ Ссылка для возврата на главную
3. ✅ Понятное сообщение об ошибке

### 🚀 Необходимые SEO улучшения

#### 1. **Meta теги**
- [ ] Добавить правильные meta title/description
- [ ] Установить корректный HTTP статус код (404)
- [ ] Добавить обработку canonical URL

#### 2. **Schema.org разметка**
- [ ] Добавить структурированные данные для 404 страницы
- [ ] Реализовать WebPage schema со статусом ошибки

#### 3. **Интернационализация**
- [ ] Поддержка многоязычности для 404 сообщений
- [ ] Локализованные объяснения ошибок

#### 4. **Улучшенная навигация**
- [ ] Ссылки на популярные рестораны
- [ ] Хлебные крошки
- [ ] Ссылки на карту сайта
- [ ] Навигация по категориям

#### 5. **Функциональность поиска**
- [ ] Добавить форму поиска на 404 страницу
- [ ] Предлагать похожие страницы
- [ ] Функция "Возможно, вы имели в виду?"

#### 6. **Аналитика и отслеживание**
- [ ] Отслеживать 404 ошибки для SEO инсайтов
- [ ] Мониторинг битых ссылок
- [ ] Аналитика поведения пользователей на 404

#### 7. **Пользовательский опыт**
- [ ] Состояния загрузки
- [ ] Механизм сообщения об ошибках
- [ ] Полезные предложения на основе URL

### 📋 Вопросы для обсуждения
- Добавить ли поиск по сайту на 404 страницу?
- Какие ссылки на популярные рестораны включить?
- Какую аналитику собирать с 404 страниц?
- Как обрабатывать разные типы 404 ошибок (ресторан не найден vs страница не найдена)?

---

## 🔄 SEO - 301 Редирект с www на без www

### 📖 Что это такое?
**301 редирект** - это постоянное перенаправление с одного URL на другой. Когда пользователь заходит на `www.plattr.guide`, его автоматически перенаправляет на `plattr.guide`.

### 🎯 Зачем нужно для SEO?

#### 1. **Избежание дублированного контента**
- `www.plattr.guide/restaurants` и `plattr.guide/restaurants` - Google видит как разные страницы
- Это разделяет SEO вес между двумя версиями сайта
- Поисковики могут не понимать какая версия основная

#### 2. **Консолидация ссылочной массы**
- Все внешние ссылки будут указывать на одну версию домена
- Увеличивается авторитет и траст домена
- Улучшается позиция в поисковой выдаче

#### 3. **Улучшение пользовательского опыта**
- Единообразные URL в поисковой выдаче
- Нет путаницы у пользователей
- Профессиональный вид сайта

### 💡 Примеры редиректов:
```
www.plattr.guide → 301 → plattr.guide
www.plattr.guide/restaurants → 301 → plattr.guide/restaurants  
www.plattr.guide/restaurants/123 → 301 → plattr.guide/restaurants/123
```

### 🚀 Задачи для реализации:
- [ ] Настроить 301 редирект на уровне сервера (Nginx/Apache)
- [ ] Проверить редирект в Next.js middleware
- [ ] Добавить проверку в `next.config.ts`
- [ ] Протестировать все основные страницы
- [ ] Обновить canonical URL во всех страницах
- [ ] Проверить через Google Search Console

### 🔧 Варианты реализации:
1. **На уровне DNS/CDN** (рекомендуется)
2. **В Next.js middleware**
3. **В next.config.ts через redirects**
4. **На уровне веб-сервера**

### 📋 Вопросы для обсуждения:
- Какой хостинг используется для продакшена?
- Есть ли доступ к настройке веб-сервера?
- Нужно ли также настроить HTTPS редирект?

---

## 🔒 SEO - 301 Редирект с HTTP на HTTPS

### 📖 Что это такое?
**301 редирект HTTP → HTTPS** - это постоянное перенаправление с незащищенного протокола на защищенный. Когда пользователь заходит на `http://plattr.guide`, его автоматически перенаправляет на `https://plattr.guide`.

### 🎯 Зачем нужно для SEO?

#### 1. **Требование Google**
- Google считает HTTPS фактором ранжирования с 2014 года
- Сайты без HTTPS теряют позиции в поисковой выдаче
- Chrome показывает "Не защищено" для HTTP сайтов

#### 2. **Избежание дублированного контента**
- `http://plattr.guide/restaurants` и `https://plattr.guide/restaurants` - разные страницы для Google
- Это разделяет SEO вес между HTTP и HTTPS версиями
- Поисковики могут индексировать обе версии

#### 3. **Безопасность и доверие**
- SSL сертификат повышает доверие пользователей
- Защищает данные пользователей (формы, логины)
- Улучшает конверсию и поведенческие факторы

#### 4. **Современные веб-стандарты**
- PWA требует HTTPS
- HTTP/2 работает только по HTTPS
- Современные API браузера требуют HTTPS

### 💡 Примеры редиректов:
```
http://plattr.guide → 301 → https://plattr.guide
http://plattr.guide/restaurants → 301 → https://plattr.guide/restaurants  
http://www.plattr.guide → 301 → https://plattr.guide (двойной редирект)
```

### 🚀 Задачи для реализации:
- [ ] Получить SSL сертификат (Let's Encrypt/платный)
- [ ] Настроить 301 редирект HTTP → HTTPS на сервере
- [ ] Проверить редирект в Next.js middleware (backup)
- [ ] Добавить HSTS заголовки для безопасности
- [ ] Протестировать все основные страницы
- [ ] Обновить все внутренние ссылки на HTTPS
- [ ] Проверить через SSL Labs тест
- [ ] Обновить canonical URL на HTTPS

### 🔧 Варианты реализации:
1. **На уровне CDN/хостинга** (рекомендуется)
2. **На уровне веб-сервера (Nginx/Apache)**
3. **В Next.js middleware**
4. **Force HTTPS в next.config.ts**

### ⚠️ Важные моменты:
- Сначала настроить HTTPS, потом редирект
- Проверить что SSL сертификат валидный
- Не забыть про HSTS заголовки
- Обновить robots.txt и sitemap на HTTPS

### 📋 Вопросы для обсуждения:
- Есть ли уже SSL сертификат?
- Какой хостинг используется?
- Нужно ли настроить HSTS?
- Как обрабатывать смешанный контент (mixed content)?

### ✅ Решение:
**Эти редиректы будут настроены на уровне сервера (вне кода приложения)**

---

## 🔗 SEO - Canonical URL для всех страниц

### 📖 Что это такое?
**Canonical URL** - это способ сказать поисковым системам "это основная версия этой страницы". Тег `<link rel="canonical">` указывает поисковикам какую версию страницы считать главной.

### 🎯 Зачем нужно для SEO?

#### 1. **Избежание дублированного контента**
Одна страница может быть доступна по разным URL:
```
plattr.guide/restaurants/1
plattr.guide/restaurants/1?page=1
plattr.guide/restaurants/1?utm_source=google
plattr.guide/restaurants/1?sort=name
```

#### 2. **Консолидация SEO веса**
- ❌ Без canonical: SEO вес распыляется между версиями
- ✅ С canonical: весь вес идет к основной странице

#### 3. **Контроль индексации**
Вы сами решаете какую версию показывать в поисковой выдаче

### 💡 Примеры для Plattr:
```html
<!-- Страница ресторана с параметрами -->
URL: plattr.guide/restaurants/123?page=2&sort=rating
Canonical: <link rel="canonical" href="https://plattr.guide/restaurants/123" />

<!-- Главная с UTM метками -->
URL: plattr.guide/?utm_source=google&utm_campaign=ads
Canonical: <link rel="canonical" href="https://plattr.guide/" />

<!-- Список ресторанов с фильтрами -->
URL: plattr.guide/restaurants?city=berlin&type=italian
Canonical: <link rel="canonical" href="https://plattr.guide/restaurants" />
```

### 🚀 Задачи для реализации:
- [ ] Создать утилиту для генерации canonical URL
- [ ] Добавить canonical в layout.tsx
- [ ] Настроить для главной страницы
- [ ] Настроить для страниц ресторанов (/restaurants/[id])
- [ ] Настроить для списка ресторанов (/restaurants)
- [ ] Настроить для 404 страницы
- [ ] Тестирование всех страниц

### 🔧 Реализация:
Будет использован Next.js Metadata API для автоматической генерации canonical URL для каждой страницы

---

## 🔄 SEO - Устранение циклических ссылок

### 📖 Что такое циклические ссылки?
**Циклические ссылки** - это когда страница A ссылается на страницу B, а страница B ссылается обратно на A, создавая бесконечный цикл для поисковых роботов.

### 🎯 Примеры циклических ссылок:

#### 1. **Самоссылающиеся ссылки**
```html
<!-- ПЛОХО: страница ссылается сама на себя -->
<a href="/restaurants/123">Ресторан XYZ</a> <!-- находясь на /restaurants/123 -->
```

#### 2. **Циклы в навигации**
```
Главная → Рестораны → Главная → Рестораны → ...
/     →  /restaurants  →  /     →  /restaurants
```

#### 3. **Дублированные ссылки**
```html
<!-- ПЛОХО: несколько ссылок на одну страницу -->
<a href="/restaurants">Рестораны</a>
<a href="/restaurants">Посмотреть рестораны</a>
<a href="/restaurants">Все рестораны</a>
```

#### 4. **Параметры создающие циклы**
```
/restaurants/123?ref=homepage
/restaurants/123?ref=search  
/restaurants/123?ref=category
```

### 🚨 Проблемы для SEO:

#### 1. **Расход краулингового бюджета**
- Поисковые роботы тратят время на одни и те же страницы
- Меньше времени на индексацию нового контента
- Снижение эффективности сканирования

#### 2. **Дублированный контент**
- Одна страница доступна по разным путям
- Разбавление SEO веса
- Путаница для поисковых систем

#### 3. **Плохой пользовательский опыт**
- Пользователи могут заблудиться в навигации
- Неудобная навигация снижает поведенческие факторы

### 🔍 Где искать циклические ссылки в Plattr:

#### 1. **Хлебные крошки**
```jsx
// Проверить в Breadcrumbs компоненте
<Breadcrumbs items={[
  { label: "Main", href: "/" },
  { label: "Berlin", href: "/" }, // ← циклическая ссылка на главную
]} />
```

#### 2. **Навигация (Header/Footer)**
```jsx
// Проверить HeaderPlattr компонент
<Link href="/">Главная</Link> // на главной странице
```

#### 3. **Карточки ресторанов**
```jsx
// RestaurantCard - проверить ссылки
<Link href={`/restaurants/${id}`}>
  // не должно быть на странице того же ресторана
</Link>
```

#### 4. **Списки "Похожие рестораны"**
```jsx
// На странице ресторана не должно быть ссылки на себя
{similarRestaurants.map(r => 
  <Link href={`/restaurants/${r.id}`} /> 
)}
```

### 🚀 Задачи для исправления:

#### 1. **Аудит существующих ссылок**
- [ ] Проверить все компоненты навигации
- [ ] Найти самоссылающиеся ссылки
- [ ] Проверить хлебные крошки
- [ ] Аудит ссылок в карточках ресторанов

#### 2. **Создать утилиты предотвращения**
- [ ] Функция проверки текущей страницы
- [ ] Условная отрисовка ссылок
- [ ] Замена ссылок на обычный текст

#### 3. **Исправить найденные проблемы**
- [ ] Убрать самоссылающиеся ссылки в хлебных крошках
- [ ] Исправить навигацию в Header
- [ ] Проверить Footer ссылки
- [ ] Исправить списки ресторанов

#### 4. **Добавить автоматические проверки**
- [ ] ESLint правило против циклических ссылок
- [ ] Тесты на отсутствие самоссылок
- [ ] CI проверки ссылок

### 🔧 Методы решения:

#### 1. **Условная отрисовка ссылок**
```jsx
// Вместо всегда ссылки
<Link href="/restaurants">Рестораны</Link>

// Условная ссылка
{pathname !== '/restaurants' ? (
  <Link href="/restaurants">Рестораны</Link>
) : (
  <span>Рестораны</span>
)}
```

#### 2. **Фильтрация в списках**
```jsx
// Убрать текущий ресторан из "похожих"
const filteredRestaurants = similarRestaurants.filter(r => r.id !== currentId);
```

#### 3. **Умные хлебные крошки**
```jsx
// Последний элемент не должен быть ссылкой
const breadcrumbItems = items.map((item, index) => 
  index === items.length - 1 ? { ...item, href: undefined } : item
);
```

### 📋 Инструменты для поиска:
- **Screaming Frog** - поиск циклических ссылок
- **Chrome DevTools** - анализ ссылок на странице  
- **Sitemap анализаторы** - проверка структуры сайта
- **Кастомные скрипты** - автоматическая проверка

### 🎯 Результат:
- ✅ Эффективный краулинг поисковыми роботами
- ✅ Лучшая навигация для пользователей  
- ✅ Отсутствие дублированного контента
- ✅ Улучшение SEO показателей

---

## 📐 SEO - Статичная структура URL

### 📖 Что это значит?
**Статичная структура URL** означает, что адреса веб-страниц должны быть постоянными и не содержать дополнительных параметров, которые могут изменяться или создавать дублированный контент.

### 🎯 Примеры правильных статичных URL:

#### ✅ Статичные URL (правильно):
```
https://plattr.guide/
https://plattr.guide/restaurants/
https://plattr.guide/restaurants/123/
https://plattr.guide/search/
```

#### ❌ Динамические URL с параметрами (неправильно):
```
https://plattr.guide/restaurants?page=1&count=10&search_str=pizza
https://plattr.guide/search?query=italian&sort=rating&page=2
https://plattr.guide/restaurants/123?ref=homepage&utm_source=google
```

### 🚨 Проблемы динамических URL для SEO:

#### 1. **Дублированный контент**
```
/restaurants?page=1  ← одинаковый контент
/restaurants         ← одинаковый контент  
/restaurants?count=10 ← одинаковый контент
```

#### 2. **Краулинговый бюджет**
- Поисковые роботы тратят время на параметризованные URL
- Меньше времени на индексацию важного контента
- Неэффективное сканирование сайта

#### 3. **Плохие URL в поисковой выдаче**
```
❌ https://plattr.guide/restaurants?page=1&count=10&search_str=
✅ https://plattr.guide/restaurants/
```

#### 4. **Проблемы с внешними ссылками**
- Сложно получить ссылки на URL с параметрами
- Пользователи делятся некрасивыми ссылками
- Снижение virality контента

### 🚀 Решения для Plattr:

#### 1. **✅ Страница ресторанов**
- **Было:** `/api/restaurants?count=12&page_num=1&search_str=`
- **Стало:** `/restaurants/` (статичная страница)
- **Реализация:** Pagination через client-side состояние

#### 2. **✅ Страница поиска**
- **Было:** `/api/restaurants/search?search_str=query`
- **Стало:** `/search/` (статичная страница)
- **Реализация:** Поиск через форму на странице

#### 3. **✅ Детальные страницы**
- **Сохранено:** `/restaurants/123/` (это правильная статичная структура)
- **Убрано:** параметры вроде `?ref=...&utm_...`

### 🔧 Техническая реализация:

#### 1. **Созданы статичные страницы:**
```typescript
// /src/app/restaurants/page.tsx - список ресторанов
// /src/app/search/page.tsx - страница поиска
// /src/app/restaurants/[id]/page.tsx - детальная страница
```

#### 2. **Параметры обрабатываются в компонентах:**
```typescript
// Вместо URL параметров используем React state
const [page, setPage] = useState(1);
const [searchQuery, setSearchQuery] = useState("");
```

#### 3. **API остается с параметрами:**
```typescript
// Параметры только для внутреннего API
const { data } = useGetRestaurantsQuery({
  count: 12,
  page_num: page,
  search_str: ""
});
```

### 📊 Результат:

#### ✅ Что улучшилось:
1. **Чистые URL:** `/restaurants/`, `/search/`, `/restaurants/123/`
2. **Canonical URL:** правильные канонические ссылки
3. **SEO дружелюбность:** статичные URL лучше индексируются
4. **Пользовательский опыт:** красивые ссылки легко делить
5. **Навигация:** четкая иерархия страниц

#### 📈 SEO преимущества:
- Лучшая индексация страниц
- Нет дублированного контента
- Эффективный краулинг
- Профессиональный вид URL
- Улучшение в поисковой выдаче

### ✅ Статус: **ВЫПОЛНЕНО**
- ✅ Создана страница `/restaurants/` 
- ✅ Создана страница `/search/`
- ✅ Добавлены canonical URL
- ✅ Убраны динамические параметры из пользовательских URL
- ✅ API работает с параметрами только внутренне

---

## 📄 SEO - Пагинация с rel="prev/next"

### 📖 Что это такое?
**rel="prev/next"** - это специальные HTML теги, которые указывают поисковым системам на связь между страницами в серии (пагинации). Они помогают Google понимать, что страницы являются частью одной последовательности.

### 🎯 Зачем нужно для SEO?

#### 1. **Избежание дублированного контента**
- Google понимает что страницы связаны
- Не считает их отдельными независимыми страницами  
- Объединяет SEO сигналы всей серии

#### 2. **Правильная индексация**
- Поисковики лучше понимают структуру контента
- Могут показывать в выдаче самую релевантную страницу
- Улучшается краулинг всей серии страниц

#### 3. **Консолидация ссылочного веса**
- SEO вес распределяется по всей серии
- Увеличивается авторитет всего раздела
- Лучшие позиции в поисковой выдаче

### 💡 Примеры для Plattr:

#### ✅ Реализованная структура URL:
```
https://plattr.guide/restaurants/           ← страница 1
https://plattr.guide/restaurants/page/2/    ← страница 2  
https://plattr.guide/restaurants/page/3/    ← страница 3
https://plattr.guide/restaurants/page/4/    ← страница 4
```

#### ✅ Правильные rel теги:
```html
<!-- Страница 1 (/restaurants/) -->
<link rel="canonical" href="https://plattr.guide/restaurants/" />
<link rel="next" href="https://plattr.guide/restaurants/page/2/" />

<!-- Страница 2 (/restaurants/page/2/) -->
<link rel="canonical" href="https://plattr.guide/restaurants/page/2/" />
<link rel="prev" href="https://plattr.guide/restaurants/" />
<link rel="next" href="https://plattr.guide/restaurants/page/3/" />

<!-- Страница 3 (/restaurants/page/3/) -->
<link rel="canonical" href="https://plattr.guide/restaurants/page/3/" />
<link rel="prev" href="https://plattr.guide/restaurants/page/2/" />
<link rel="next" href="https://plattr.guide/restaurants/page/4/" />

<!-- Последняя страница -->
<link rel="canonical" href="https://plattr.guide/restaurants/page/N/" />
<link rel="prev" href="https://plattr.guide/restaurants/page/N-1/" />
```

### 🔧 Техническая реализация:

#### 1. **✅ Созданы динамические страницы:**
```typescript
// /src/app/restaurants/page.tsx - страница 1 (основная)
// /src/app/restaurants/page/[page]/page.tsx - страницы 2+
```

#### 2. **✅ Metadata с rel тегами:**
```typescript
// /src/lib/metadata/pagination.ts
export const paginationMetadata = {
    restaurants: (page: number, totalPages?: number): Metadata => {
        const prevUrl = page > 2 
            ? `${baseUrl}/restaurants/page/${page - 1}/`
            : page === 2 ? `${baseUrl}/restaurants/` : undefined;
        
        const nextUrl = (!totalPages || page < totalPages)
            ? `${baseUrl}/restaurants/page/${page + 1}/`
            : undefined;

        return {
            alternates: {
                canonical: currentUrl,
                ...(prevUrl && { prev: prevUrl }),
                ...(nextUrl && { next: nextUrl }),
            },
        };
    },
};
```

#### 3. **✅ URL-based пагинация:**
```tsx
// Вместо React state используем реальные URL
const getPrevPageUrl = () => {
    return initialPage === 2 ? '/restaurants/' : `/restaurants/page/${initialPage - 1}/`;
};

const getNextPageUrl = () => {
    return `/restaurants/page/${initialPage + 1}/`;
};
```

#### 4. **✅ Next.js routing структура:**
```
/restaurants/           → RestaurantsClient с initialPage={1}
/restaurants/page/2/    → RestaurantsClient с initialPage={2}  
/restaurants/page/3/    → RestaurantsClient с initialPage={3}
/restaurants/page/[N]/  → RestaurantsClient с initialPage={N}
```

### 📊 Результат:

#### ✅ Что улучшилось:
1. **SEO дружелюбные URL:** каждая страница имеет уникальный URL
2. **Canonical URL:** правильные канонические ссылки для каждой страницы
3. **rel="prev/next":** Google понимает связь между страницами
4. **Навигация браузера:** кнопки назад/вперед работают корректно
5. **Ссылки:** пользователи могут делиться конкретными страницами
6. **Закладки:** можно сохранить закладку на любую страницу

#### 📈 SEO преимущества:
- ✅ Правильная индексация всех страниц с ресторанами
- ✅ Нет дублированного контента между страницами
- ✅ Google понимает структуру пагинации  
- ✅ Эффективный краулинг поисковыми роботами
- ✅ Консолидация SEO веса по всей серии страниц
- ✅ Улучшение позиций в поисковой выдаче

#### 🔍 Пример сгенерированных meta тегов:
```html
<!-- На странице /restaurants/page/2/ -->
<title>Рестораны - Страница 2 - Plattr</title>
<meta name="description" content="Каталог ресторанов на Plattr - страница 2" />
<link rel="canonical" href="https://plattr.guide/restaurants/page/2/" />
<link rel="prev" href="https://plattr.guide/restaurants/" />
<link rel="next" href="https://plattr.guide/restaurants/page/3/" />
```

### ✅ Статус: **ВЫПОЛНЕНО**
- ✅ Создана динамическая структура URL для пагинации
- ✅ Добавлены rel="prev/next" meta теги в metadata
- ✅ Реализована URL-based навигация (вместо client state)
- ✅ Canonical URL работают для каждой страницы
- ✅ Протестировано: билд проходит успешно
- ✅ Поддержка браузерной навигации и закладок

---

## 🔒 Server Configuration Required

### URL Canonicalization (www vs non-www)
**Status**: Pending - requires server-level configuration

**Issue**: https://plattr.guide/ and https://www.plattr.guide/ should resolve to the same URL but currently don't.

**Solution needed**: Configure 301 redirect at server level to canonicalize www vs non-www versions.

**Implementation options**:

1. **Apache (.htaccess)**:
```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.plattr\.guide$ [NC]
RewriteRule ^(.*)$ https://plattr.guide/$1 [L,R=301]
```

2. **Nginx**:
```nginx
server {
    server_name www.plattr.guide;
    return 301 https://plattr.guide$request_uri;
}
```

3. **Hosting Provider (Vercel/Netlify)**: Configure redirects in hosting panel

4. **Next.js fallback** (less efficient):
```ts
// next.config.ts
async redirects() {
  return [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.plattr.guide' }],
      destination: 'https://plattr.guide/:path*',
      permanent: true,
    },
  ]
}
```

**Priority**: Medium - affects SEO and canonical URL structure
**Test**: 93% of top 100 sites pass this canonicalization test

---

## 🚀 Другие SEO задачи (будут добавлены)
- [ ] Оптимизация meta тегов
- [ ] Генерация sitemap
- [ ] Настройка robots.txt
- [ ] Реализация Open Graph
- [ ] Настройка Twitter Card
- [ ] JSON-LD структурированные данные
- [ ] Оптимизация Core Web Vitals