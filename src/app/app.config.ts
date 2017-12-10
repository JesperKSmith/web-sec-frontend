import { environment } from "../environments/environment";

const apiBaseUrl = environment.apiUrl;

export var Config =  {
  apiPostsUrl : `${apiBaseUrl}/PostController.php`,
  apiUserPostsUrl : (user_id:number) => {
    return `${apiBaseUrl}/PostController.php?user_id=${user_id}`;
  },
  apiCommentsUrl : `${apiBaseUrl}/CommentController.php`,
  apiLoginUrl : `${apiBaseUrl}/UserController.php/Login`,
  apiRegisterUrl : `${apiBaseUrl}/UserController.php/Register`,
  apiPictureUrl: `${apiBaseUrl}/UserController.php/Picture`,
  apiAccountPreferencesUrl: `${apiBaseUrl}/PreferenceController.php/User`,
  apiAccountPreferenceTypesUrl: `${apiBaseUrl}/PreferenceController.php/Types`,
}
