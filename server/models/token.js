// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
// const secret = process.env.JWT_SECRET;

// // Middleware to extract userId from token
// async function extractUserId(ctx, next) {
//     const token = ctx.headers.authorization;
//     if (!token) {
//         ctx.status = 401;
//         ctx.body = 'Authorization token is required';
//         return;
//     }
//     try {
//         const decodedToken = jwt.verify(token, secret); // Replace 'your_secret_key' with your actual secret key
//         ctx.state.userId = decodedToken.userId;
//         await next();
//     } catch (error) {
//         ctx.status = 401;
//         ctx.body = 'Invalid token';
//     }
// }

// JwtToken.extractUserId = extractUserId;

// export default JwtToken;
