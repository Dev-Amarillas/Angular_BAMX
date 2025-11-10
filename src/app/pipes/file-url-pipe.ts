import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileUrl',
  standalone: true
})
export class FileUrlPipe implements PipeTransform {
  transform(file: File | null): string {
    return file ? URL.createObjectURL(file) : '';
  }
}

//Aqui utilice pipe para que se previsualizara la imagen al momento que la cargan en el front de momento solo 
// a los voluntarios