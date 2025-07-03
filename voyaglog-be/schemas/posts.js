import {z} from 'zod'

export const postSchema = {
    POST: z.object(
        {
            title: z.string().min(1).max(200),
            content: z.string().min(1).max(5000),
        }
    ),
    PUT: z.object(
        {
            title: z.string().min(1).max(200).optional(),
            content: z.string().min(1).max(5000).optional(),
        }   

    )
};