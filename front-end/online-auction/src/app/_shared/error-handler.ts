import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import Swal from 'sweetalert2';


@Injectable()
export class ErrorHandler {
  constructor(private router: Router) {
  }

  handleError(error: any): void {
    if (error.status === 401) {
      localStorage.clear();
      if (!Swal.isVisible()) {
        Swal.fire({
          title: 'Sorry',
          icon: 'warning',
          html: 'Your current session got expired! Please login again.',
          showCancelButton: true,
          confirmButtonText: `Login`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate([ '/login' ]);
          }
        });
      }
    } else if (error.status === 500) {
      if (!Swal.isVisible()) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        });
      }
    } else if (error.status === 0) {
      if (!Swal.isVisible()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: 'Something went wrong! <br> ' + '<hr><small>Unable to connect to the server. <br> ' +
              'Your connection maybe responding slowly <br>' +
              'or maybe the the back-end server is not available.</small>',
          }
        );
      }
    } else {
      if (!Swal.isVisible()) {
        Swal.fire('Error', 'An error has occurred, please try later.<br>' + error.message, 'error');
      }
    }

    if (!environment.production) {
      console.log(error);
    }

  }

}
