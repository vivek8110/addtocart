"use client";

// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// const GRAPHQL_ENDPOINT = "/api/graphql";

// // Create an HTTP link
// const httpLink = createHttpLink({
//   uri: GRAPHQL_ENDPOINT,
// });

// // Middleware to set the authorization header if needed
// const authLink = setContext((_, { headers }) => {
//   // Add your authorization logic here, if applicable
//   // const token = localStorage.getItem('accessToken') || '';
//   return {
//     headers: {
//       ...headers,
//       // Authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// // Create the Apollo Client
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
// export default client;
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken") || "";
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };

  // let decodedToken = null;
  //   if (token) {
  //     try {
  //       decodedToken = jwt.verify(
  //         token,
  //         process.env.ACCESS_TOKEN_SECRET,
  //         (err, decodedToken) => {
  //           if (err) {
  //             console.log(
  //               "🚀 ~ errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr:",
  //               err
  //             );
  //             throw new ApolloError(
  //               "Invalid or expired token.",
  //               "UNAUTHENTICATED"
  //             );
  //           }
  //           return { token: decodedToken || null };
  //         }
  //       );

  //       // console.log("🚀 ~ decodedToken:", decodedToken);
  //       return decodedToken;
  //     } catch (error) {
  //       console.log("🚀 ~ error 123:", error);
  //       // Handle token verification errors
  //       throw new ApolloError("Invalid or expired token.", "UNAUTHENTICATED");
  //     }
  //   } else {
  //     return;
  //   }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      // Check if extensions exist and if there is a code
      if (extensions && extensions.code) {
        console.log(
          `[GraphQL error]: Code: ${extensions.code}, Message: ${message}`
        );
      }
      // Additional logging of GraphQL error details
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      // Handle specific error codes if needed
      if (extensions && extensions.code === "UNAUTHENTICATED") {
        // Redirect to login or perform other actions
        localStorage.clear();
        window.location.replace("/login");
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});
export default client;
