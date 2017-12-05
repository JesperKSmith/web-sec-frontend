import { environment } from "../environments/environment";

const apiBaseUrl = environment.apiUrl;

export var Config =  {
  apiPostsUrl : `${apiBaseUrl}/PostController_v2.php`,
  apiCommentsUrl : `${apiBaseUrl}/CommentController.php`,
  apiLoginUrl : `${apiBaseUrl}/UserController.php/Login`,
  apiRegisterUrl : `${apiBaseUrl}/UserController.php/Register`,
  devApiPostRequestUrl : "http://localhost:7777/api/test"
}
