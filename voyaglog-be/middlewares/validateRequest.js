import { userSchema } from '../schemas/users.js';
import { postSchema } from '../schemas/posts.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const middlewareFactory = (model) => (req, res, next) => {
  const { method } = req;

  let schema;
  if (model === 'users') {
    schema = userSchema[method];
  } else if (model === 'posts') {
    schema = postSchema[method];
  } else {
    return next(new ErrorResponse('Invalid model specified', 404));
  }

  if (!schema) {
    return next(new ErrorResponse(`No schema defined for method ${method} on ${model}`, 400));
  }

  const parseResult = schema.safeParse(req.body);
  console.log('Validation result:', parseResult);

  if (!parseResult.success) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(parseResult.error.format());
    }
    return res.status(400).json({
      message: 'Validation failed',
      errors: parseResult.error.flatten().fieldErrors,
    });
  }

  req.body = parseResult.data;
  next();
};

export default middlewareFactory;
