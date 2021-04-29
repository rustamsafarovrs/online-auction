import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_API, BASE_URL} from '../_services/lot.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit {
  retrievedImage: any;
  imageName: any;

  submitted = false;
  loading = true;
  private selectedFile: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

  }

  // Gets called when the user clicks on submit to upload the image
  onUpload(): void {
    this.submitted = true;

    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    // Make a call to the Spring Boot Application to save the image
    this.http.post(BASE_API + '/image/upload', uploadImageData)
      .subscribe((response) => {
          console.log(response);
        },
        (err) => {
          console.error(err);
        });
  }

  // Gets called when the user clicks on retieve image button to get the image from back end
  getImage(): void {
    // Make a call to Sprinf Boot to get the Image Bytes.
    this.retrievedImage = BASE_URL + '/images/' + this.imageName;
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[ 0 ];
  }
}
