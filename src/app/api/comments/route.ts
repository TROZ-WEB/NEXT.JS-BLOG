import { GraphQLClient, gql } from "graphql-request";
import { NextResponse } from "next/server";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export async function POST(req: Request) {
  const body = await req.json();

  const graphqlClient =
    graphqlAPI &&
    new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphcmsToken}`,
      },
    });

  if (graphqlClient) {
    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            post: { connect: { slug: $slug } }
          }
        ) {
          id
        }
      }
    `;

    try {
      const result = await graphqlClient?.request(query, body);
      return NextResponse.json({ data: result, status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ data: error, status: 500 });
    }
  }
}
