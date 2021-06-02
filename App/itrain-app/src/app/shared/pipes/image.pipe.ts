import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

const URL = environment.url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, userId: string): string {

    return `${URL}/posts/image/${userId}/${img}`;
  }

}
