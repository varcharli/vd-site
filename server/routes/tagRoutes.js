// routes/tagRoutes.js
import Router from 'koa-router';
import {
    createTag,
    getTagsByUserId,
    getTagById,
    updateTag,
    deleteTag,
    setTagsForMovie,
    getTagsForMovie,
} from '../controllers/tagController.js';

const router = new Router({
    prefix: '/api/tags',
});

const getUserId = (ctx) => {
    if (!ctx.state.user) {
        ctx.status = 401;
        ctx.body = 'Authorization token is required';
        return null;
    }
    return ctx.state.user.id;
}


// Create a new tag
router.post('/', async (ctx) => {
    try {
        const uid=getUserId(ctx);
        ctx.request.body.userId=uid;
        const newTag = await createTag(ctx.request.body);
        ctx.status = 201;
        ctx.body = newTag;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Retrieve all tags
router.get('/', async (ctx) => {
    try {
        const uid=getUserId(ctx);
        const tags = await getTagsByUserId(uid);
        ctx.body = tags;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Retrieve a tag by ID
router.get('/:id', async (ctx) => {
    try {
        const tag = await getTagById(ctx.params.id);
        ctx.body = tag;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Update a tag by ID
router.put('/:id', async (ctx) => {
    try {
        const updatedTag = await updateTag(ctx.params.id, ctx.request.body);
        ctx.body = updatedTag;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Delete a tag by ID
router.delete('/:id', async (ctx) => {
    try {
        await deleteTag(ctx.params.id);
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Set tags for a movie
router.post('/movies/:movieId', async (ctx) => {
    try {
        await setTagsForMovie(ctx.params.movieId, ctx.request.body.tagIds);
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Get tags for a movie
router.get('/movies/:movieId', async (ctx) => {
    try {
        const tags = await getTagsForMovie(ctx.params.movieId);
        ctx.body = tags;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Add a tag to a movie
router.post('/movies/:movieId/add', async (ctx) => {
    try {
        await addTagToMovie(ctx.params.movieId, ctx.request.body.tagId);
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});

// Remove a tag from a movie
router.post('/movies/:movieId/remove', async (ctx) => {
    try {
        await removeTagFromMovie(ctx.params.movieId, ctx.request.body.tagId);
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error.message;
    }
});


export default router;