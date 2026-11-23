## О проекте

**AnixApi** — неофициальная имплементация REST API приложения [Anixart](https://anixart.ru). 

---

> [!WARNING]
> **Дисклеймер.** Проект создан в **ознакомительных и исследовательских целях**. Автор **не поддерживает и осуждает** использование библиотеки для авторегистрации, спам-ботов, накрутки, обхода ограничений сервиса и любого злоупотребления API Anixart. Вы используете библиотеку **на свой страх и риск** и несёте ответственность за соблюдение правил Anixart и применимого законодательства.

## AnixApi

TypeScript-обёртка над API Anixart 11.x для Node.js.  
Эндпоинты · OAuth · редактор статей · `HttpError` / `AnixartError`

Документация · [Лицензия GPL-2.0](LICENSE)

`anixapi@0.4.3` · Node.js ≥ 18 · актуально под **Anixart 11 BETA 3** (build 26111702)

---



## Быстрый старт

```bash
npm install anixapi
```

```javascript
const { Anixart, DefaultResult } = require("anixapi");

const client = new Anixart();
const code = await client.login("username", "password");

if (code === DefaultResult.Ok) {
    const raw = await client.endpoints.release.release(789, { extended_mode: true });
    console.log(raw.release);
}
```

Токен можно задать сразу или позже: `new Anixart({ token })`, `client.setToken(...)`.

### OAuth (VK / Google / Telegram / Yandex)

```javascript
const { Anixart, DefaultResult, OAuthAuthResult } = require("anixapi");

const client = new Anixart();

const res = await client.endpoints.auth.signInWithYandex({
    yandexAccessToken: "...",
});

if (res.code === DefaultResult.Ok && res.profileToken) {
    client.setToken(res.profileToken.token);
} else if (res.code === OAuthAuthResult.NotRegistered) {
    await client.endpoints.auth.signUpWithYandex({
        login: "newuser",
        email: res.email || "user@example.com",
        yandexAccessToken: "...",
    });
}
```


| Провайдер | Sign-in              | Поле токена         |
| --------- | -------------------- | ------------------- |
| VK        | `signInWithVk`       | `vkAccessToken`     |
| Google    | `signInWithGoogle`   | `googleIdToken`     |
| Telegram  | `signInWithTelegram` | `telegramIdToken`   |
| Yandex    | `signInWithYandex`   | `yandexAccessToken` |


Флаги доступности: `GET config/urls` → `vk_auth_available`, `google_auth_available`, `telegram_auth_available`, `yandex_auth_available`.

### Новое в 0.4.2–0.4.3 (Anixart 11 BETA 3)

```javascript
// Все блоки страницы «Обзор» одним запросом
const hub = await client.endpoints.discover.hub({
    recommendations_previous_page: 0,
    collections_previous_page: 0,
});
console.log(hub.interesting, hub.watching, hub.collections);

// Хаб коллекций: неделя, рекомендованные, свои
const collections = await client.endpoints.collection.hub();

// Синхронизация просмотренного и ссылка на скачивание эпизода
const watched = await client.endpoints.episode.watched([1, 2, 3]);
const file = await client.endpoints.episode.downloadTarget(1, 2, 3);

// Убрать релиз из своей коллекции
await client.endpoints.collectionMy.releaseRemove(collectionId, releaseId);

// Облегчённый релиз для карточек
await client.endpoints.release.releaseWithoutDetails(1);
```

`Collection` в списках теперь содержит `releaseCount`, `watchedCount`, `hasRelease`, `releasesPreview`;
`Release` — `restrictionNote`. Методы удалённых в BETA 3 эндпоинтов (`discover/comments`,
`discover/discussing`, `discover/interesting`, `release/{id}/continue`) помечены `@deprecated` и
оставлены для совместимости со старыми сборками.

---



## Возможности

- Эндпоинты через `client.endpoints.*` (релизы, профиль, каналы, лента, поиск, уведомления, жалобы, …)
- **Хабы** — `discover.hub()`, `collection.hub()` (Anixart 11 BETA 3)
- **Эпизоды** — `episode.watched()`, `episode.downloadTarget()`, `episode.watch()` / `unwatch()`
- **OAuth** — VK, Google, Telegram, Yandex (sign-in / sign-up / bind / unbind)
- **Редактор статей** — `uploadArticleImage`, `generateEmbedData`, `ArticleBuilder`
- **Запросы** — `timeoutMs`, `AbortSignal`, `apiVersion`, свой `userAgent`
- **TypeScript** — типы запросов, ответов и enum-кодов
- **Доменные классы** — `Article`, `Channel`, `Release`, `FullProfile`, `Collection`
- **Ошибки** — `HttpError`, `AnixartError` (`AnixApiError`), `describeResultCode()`, `throwOnApiError`

Подробности — в **[документации](docs/DOCUMENTATION.md)**.

---



## Ошибки

```javascript
const { Anixart, AnixartError, HttpError } = require("anixapi");

const client = new Anixart({ throwOnApiError: true });

try {
    await client.endpoints.auth.signIn({ login: "...", password: "..." });
} catch (error) {
    if (error instanceof AnixartError) {
        console.error(error.code, error.codeName, error.path);
    } else if (error instanceof HttpError) {
        console.error(error.status, error.path);
    }
}
```

По умолчанию автоброс при `code !== 0` **выключен**. `TimeoutError` и `AbortError` пробрасываются как есть.

---



## TODO

- [x] Эндпоинты API 10.5
- [x] Эндпоинты API 11 BETA 3 (хабы, синхронизация эпизодов, офлайн-скачивание)
- [x] OAuth: VK / Google / Telegram / Yandex
- [x] Редактор статей (upload / embed)
- [x] `HttpError` / `AnixartError`, таймаут и отмена
- [x] Типы и документация
- [ ] Возможность использовать библиотеку в браузере полностью

---



## Лицензия

Проект распространяется под **[GPL-2.0](LICENSE)** — как и [оригинальный AnixartJS](https://github.com/theDesConnet/AnixartJS).

---



## Связь

Вопросы и баги — через Issues в [репозитории AnixApi](https://github.com/Maks1mio/anixapi).

Оригинальная библиотека: [theDesConnet/AnixartJS](https://github.com/theDesConnet/AnixartJS).
