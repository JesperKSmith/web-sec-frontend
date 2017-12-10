import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from "../../services/posts.service";
import { AccountService } from "../../services/account.service";
import { AlertService } from "../../services/alert-service.service";

import { Post } from './../../models/postModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    PostsService,
    AccountService,
    AlertService
  ]
})
export class UserComponent implements OnInit {

  isMe: boolean;
  showSettings: boolean;
  username: string;
  user_id: number;
  user_avatar: string;
  user_posts: Post[];
  user_friends: any[];
  user_details: any;
  user_picture_preferences: any;
  possiblePreferences: any[];

  /*
    1.0 MB (1024 Kilobyte) = 1048576
    0.5 MB (512 Kilobyte)  = 524288
  */
  AVATAR_MAX_SIZE = 1048576;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _postService: PostsService,
    private _accountService: AccountService,
    private _alert: AlertService,
  ) {

    this.possiblePreferences = this._getPossiblePreferences();
    this.user_picture_preferences;
  }

  ngOnInit() {
    this.user_avatar = "assets/images/user-default.png";
    // GET USER NAME FROM URL PARAMS
    this._route.params
      .map(params => params['user_id'])
      .subscribe(user_id_url_param => {

        // IF Invalid user_id format, stop & show error
        if (!this._isValidUserIdFormat(user_id_url_param)) {
          this._alert.error("User Doesn't Exist ", `👻There is no user '${user_id_url_param}'`);
          this._resetComponentValuesToDefaul();
          return;
        }

        this.user_id = user_id_url_param;
        this.isMe = user_id_url_param === 'me';
        this._loadUserData();
      });
  }


  //----------------------------------------------------------------------------

  // goToFriendProfle(username: string) {
  //   this._router.navigate([`user/${username}`]);
  // }
  //----------------------------------------------------------------------------

  updateUserSettings(): void {
    /*
    *!MPROTANT*
    @TODO:
      make setings update dinamyc.
      NOW it is hardcoded and assumes that we have only Picture preferences
  */
    // SETTING preference type to Picture
    this.user_picture_preferences.type_id = 1;

    this._accountService.updateUserPreferences(this.user_picture_preferences)
      .then((response) => {
        this._alert.success("Success", "Settings are updated! \n👨‍💻");
        this.showSettings = false;
      })
      .catch((err) => {
        this._alert.error("💩 happens....", "Unfortunately you settings are not updated! \nPlease try again!");
        this.showSettings = false;
      });
  }

  //----------------------------------------------------------------------------

  pictureUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let fileInfo = event.target.files[0];

      // CHECK IMAGE SIZE
      if (fileInfo.size > this.AVATAR_MAX_SIZE) {
        this._alert.error("ATTENTION !", "THE SELECTED IMAGE IS TOOOO BIG....\nMAX ALLOWED SIZE IS 1 MB!");
        return;
      }

      // CHECK FILE TYPE
      if (!fileInfo.type.includes('image')) {
        this._alert.error("NOT AN IMAGE!", "Ai ai ai.....");
        return;
      }

      reader.onload = (event: any) => {
        let imageAsBase64 = event.target.result;

        // IF NOT IMAGE => RETURN && DO NOT UPLOAD
        if (!this._checkIfImage(imageAsBase64)) { return; };

        // IMAGE UPLOAD
        this._accountService.uploadProfilePicture(imageAsBase64)
          .then(() => {
            this.user_avatar = imageAsBase64;
            this._alert.alertWithImage("Success", "Wow your avatar looks great! \nThe Picture is successfully saved!", imageAsBase64);
          })
          .catch((err) => {
            this._alert.error("What a sad, sad day 😢", "Unfortunately you picture is not saved! \nPlease try again!");
          });

      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  //----------------------------------------------------------------------------
  showUserSettings(): void {
    this.showSettings = !this.showSettings;
  }

  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  // PRIVATE FUNCTION ----------------------------------------------------------
  //----------------------------------------------------------------------------


  _loadUserData() {

    if (this.isMe) {
      console.log('LOADING MY DATA !');
      this.username = "Me";
      this._getMyPicture();
      this._getMyPosts();
      this._getMyPreferences();
      this._getPreferenceTypes();
    }
    else {
      // GET USER PICTURE
      this._getUserPicture(this.user_id);
      // GET USER POSTS
      this._getUserPosts(this.user_id);
    }
  }
  //============================================================================
  // [ GET MY DATA START ]

  //----------------------------------------------------------------------------
  // GET MY PICTURE
  _getMyPicture() {
    this._accountService.getMyPicture()
      .then((response) => {
        let myPicture = response[0].picture;
        let isBase64Image = myPicture.includes("data:image") && myPicture.includes("base64");

        if (myPicture != null && isBase64Image) {
          this.user_avatar = myPicture;
        }
      });
  }
  //----------------------------------------------------------------------------
  // GET MY POSTS
  _getMyPosts() {
    this._postService.getMyPosts()
      .then((postResponse) => {
        this.user_posts = postResponse;
      });
  }
  //----------------------------------------------------------------------------
  // GET MY PREFERENCES
  /*
    *!MPROTANT*
    @TODO:
      for now we assume that we have only one preference - see picture
      that is why I'm taking [0] element from array with preferences
      later when we will have more preferences
      we need to loop through them and display on the UI
  */

  _getMyPreferences() {
    this._accountService.getMyPreferences()
      .then((preferenceResponse) => {
        console.log('preferenceResponse');
        console.log(preferenceResponse);

        let picture_preference = this._getUserPicturePreference(preferenceResponse[0]);
        this.user_picture_preferences = picture_preference;
      });
  }

  //----------------------------------------------------------------------------
  // GET PREFERENCE TYPES
  _getPreferenceTypes() {
    this._accountService.getPreferenceTypes()
      .then((PreferenceTypes) => {
        console.log('PreferenceTypes');
        console.log(PreferenceTypes);
      });
  }

  // [ GET MY DATA END ]
  //============================================================================


  //============================================================================
  // [ GET USER DATA START ]
  //----------------------------------------------------------------------------
  _getUserPosts(user_id: number): any {
    this._postService.getUserPosts(user_id)
      .then((postResponse) => {
        this.user_posts = postResponse;
        // update displayed username
        this.username = postResponse[0].username;
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  //----------------------------------------------------------------------------
  _getUserPicture(user_id: number): void {
    this._accountService.getUserPicture(user_id)
      .then((response) => {
        let userPicture = response[0].picture;
        if (userPicture != null) {
          this.user_avatar = userPicture;
        }
      });
  }

  // [ GET USER DATA START ]
  //============================================================================


  //----------------------------------------------------------------------------
  _checkIfImage(imageAsBase64): boolean {
    return imageAsBase64.includes("data:image");
  }
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  _getPossiblePreferences() {
    return [{
      level_id: 1,
      name: "Public",
    },
    {
      level_id: 2,
      name: "Friends Only"
    },
    {
      level_id: 3,
      name: "Private"
    }
    ];
  }
  //----------------------------------------------------------------------------
  _getUserPicturePreference(picturePreference) {
    let preferenceIndex = parseInt(picturePreference.level_id) - 1;
    return this.possiblePreferences[(preferenceIndex)];
  }
  //----------------------------------------------------------------------------
  _isValidUserIdFormat(user_id: any): boolean {
    return !isNaN(user_id) || user_id.toLowerCase() == 'me';
  }
  //----------------------------------------------------------------------------
  _resetComponentValuesToDefaul(){
    this.user_avatar = "assets/images/user-default.png";
    this.username = "";
    this.isMe = false;
    this.showSettings = false;
    this.user_posts = undefined;
  }
  //----------------------------------------------------------------------------
}
