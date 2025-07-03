const { hello } = require('../controllers/hello');

test('hello function returns correct greeting', () => {
	expect(hello()).toBe('Hello, World!');
});