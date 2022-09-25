const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express')
const express = require('express')
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core')

const { createServer } = require('http')
const mongoose = require('mongoose')
const Book = require('./models_ej/book')
const Author = require('./models_ej/author')
const jwt = require('jsonwebtoken')
const User = require('./models_ej/user')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { PubSub } = require('graphql-subscriptions')
const { $where } = require('./models_ej/book')
const { count } = require('console')
const book = require('./models_ej/book')
const MONGODB_URI =
  'mongodb+srv://ajts1995:Perro11..@cluster0.lvmt4ca.mongodb.net/book-app?retryWrites=true&w=majority'
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const pubsub = new PubSub()
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to DB'))
  .catch((e) => console.log('connect error', e))

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
    authorAdded: Author!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Author {
    born: Int
    name: String!
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let temp = await Book.find({}).populate('author')

      if (args.genre) {
        temp = temp.filter((book) => book.genres.includes(args.genre))
      }

      return temp
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      let t = new mongoose.Types.ObjectId(root.id)
      return book.collection.countDocuments({ author: t })
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_ADDED']),
    },
  },
  Mutation: {
    addBook: async (root, { author, ...args }, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new AuthenticationError('we need login')
        }
        let tempAuthor = await Author.findOne({ name: author })
        if (!tempAuthor) {
          const newAuthor = new Author({ name: author })
          await newAuthor.save()
          pubsub.publish('AUTHOR_ADDED', { authorAdded: newAuthor })

          tempAuthor = newAuthor
        }
        const temp = new Book({ ...args, author: tempAuthor })

        await temp.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: temp })
        return temp
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      const { name, setBornTo: born } = args
      try {
        if (currentUser) {
          let tempAuthor = await Author.findOneAndUpdate(
            { name },
            { born },
            {
              new: true,
            }
          )
          if (!tempAuthor) {
            return new UserInputError('incorret name', {
              invalidArgs: name,
            })
          }
          pubsub.publish('AUTHOR_ADDED', { authorAdded: tempAuthor })

          return tempAuthor
        } else {
          throw new AuthenticationError('we need login')
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        await user.save()
        return user
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username })

        if (user && args.password === 'secret') {
          const token = jwt.sign(
            { username: user.username, id: user._id },
            JWT_SECRET
          )
          return { value: token }
        } else {
          throw new UserInputError('no Auth', {
            invalidArgs: args,
          })
        }
        return user
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()

const httpServer = createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})
const serverCleanup = useServer({ schema }, wsServer)
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
})
const start = async () => {
  await server.start()
  server.applyMiddleware({ app })
  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
  })
}

start()
