import express from 'express';
import path from 'node:path';
//import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import { fileURLToPath } from 'url';
//import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

//app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server as any,
  {
    context: authenticateToken as any
  }
));

// app.use(
//   '/graphql',
//   expressMiddleware(server, {
//     context: async ({ req }) => {
//       const token = req.headers.authorization?.split(' ')[1] || '';
//       const user = authenticateToken(token);
//       return { user };
//     },
//   })
// );

// Serve static assets in production
if (process.env.NODE_ENV === 'production') { console.log('running in production mode');
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

//db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Server running at http://localhost:${PORT}`));
//});
