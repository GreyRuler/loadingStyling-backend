import koaBody from 'koa-body';
import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import { faker } from '@faker-js/faker';

const server = new Koa();
const router = new Router();

server.use(cors());
// Подключаем middleware для парсинга тела запроса
server.use(koaBody({
	multipart: true,
}));

function delay(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// Обработчик GET-запросов
router.get('/news', async (ctx, next) => {
	ctx.body = {
		news: [
			{
				title: faker.lorem.lines(2),
				preview: '#15a4f1',
				content: faker.lorem.paragraphs(),
			},
			{
				title: faker.lorem.lines(2),
				preview: '#15a4f1',
				content: faker.lorem.paragraphs(),
			},
			{
				title: faker.lorem.lines(2),
				preview: '#15a4f1',
				content: faker.lorem.paragraphs(),
			},
		],
	};
	await delay(2000);
	next();
});

// Подключаем роутер к приложению
server.use(router.routes());
server.use(router.allowedMethods());

// Запускаем сервер
server.listen(3000, () => {
	// eslint-disable-next-line no-console
	console.log('Server started on port 3000');
});
