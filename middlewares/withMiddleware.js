// middlewares/withMiddleware.js
import { sessionMiddleware } from "./session"; // Adjust the path accordingly

export default function withMiddleware(handler) {
  return (req, res) => {
    return new Promise((resolve, reject) => {
      // You can include additional middleware logic here if needed
      sessionMiddleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }

        // Perform any additional middleware steps before handling the request
        // ...

        // Resolve with the actual request handler
        return resolve(handler(req, res));
      });
    });
  };
}
