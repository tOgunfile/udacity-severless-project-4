import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { createLogger } from "../../utils/logger";
import { getUserId } from "../utils";
import { createTodo } from "../../businessLogic/todos";
import "source-map-support/register";
const logger = createLogger("createTodo");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info("Processing createTodo event");
  const userId = getUserId(event);
  const newTodo: CreateTodoRequest = JSON.parse(event.body);
  // TODO: Implement creating a new TODO item
  // const authorization = event.headers.Authorization
  const item = await createTodo(userId, newTodo);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ item }),
  };
};
