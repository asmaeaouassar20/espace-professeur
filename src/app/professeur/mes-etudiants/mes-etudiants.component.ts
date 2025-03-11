import { Component } from '@angular/core';
import { Student } from '../../model/model';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-mes-etudiants',
  imports: [],
  templateUrl: './mes-etudiants.component.html',
  styleUrl: './mes-etudiants.component.css'
})
export class MesEtudiantsComponent {
  mesEtudiants:Student[]=[];
  constructor(private service:ServiceService){
    this.mesEtudiants=service.getStudents();
  }

  deleteStudent(id:number){
    const response=confirm("êtes vous sûr de supprimer cet étudiant §")
    if(response){
      this.service.deleteStudentById(id);
      this.mesEtudiants=this.service.getStudents();
    }
  }

}
