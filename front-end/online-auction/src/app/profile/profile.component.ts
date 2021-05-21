import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API, BASE_URL} from '../_services/lot.service';
import {ErrorHandler} from '../_shared/error-handler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandler) {

  }

  retrievedImage: any;

  submitted = false;
  loading = true;
  private selectedFile: any;
  contentLoading = true;
  showChangeProfileImage = false;

  id: number;
  username: string;

  ngOnInit(): void {
    this.http.get<any>(BASE_API + '/profile').subscribe(
      (data) => {
        if (data.profileImage) {
          this.retrievedImage = BASE_URL + '/images/' + data.profileImage.name;
        }
        this.id = data.id;
        this.username = data.username;
        setTimeout(() => {
          this.contentLoading = false;
        }, 500);
      },
      (err) => {
        this.errorHandler.handleError(err);
      }
    );
    this.loading = false;
  }

  // Gets called when the user clicks on submit to upload the image
  onUpload(): void {
    this.submitted = true;
    this.loading = true;

    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    // Make a call to the Spring Boot Application to save the image
    this.http.post(BASE_API + '/profile/upload-profile-image', uploadImageData)
      .subscribe((response) => {
          console.log(response);
          this.showChangeProfileImage = false;
          this.loadProfileImage();
          this.loading = false;
        },
        (err) => {
          console.error(err);
          this.loading = false;
        });
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[ 0 ];
  }

  private loadProfileImage(): void {
    this.http.get<any>(BASE_API + '/profile').subscribe(
      (data) => {
        this.retrievedImage = BASE_URL + '/images/' + data.profileImage.name;

      });
  }
}
