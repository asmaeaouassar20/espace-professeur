import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../model/model';
import { ServiceService } from '../../service/service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-espace-professeur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './espace-professeur.component.html',
  styleUrl: './espace-professeur.component.css'
})
export class EspaceProfesseurComponent {

  isDropdownOpen = false;

  searchStudent : string ='';

  filtreEtudiants:any[]=[]; //1

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //********************************** 
  listEtudiantsEncadre:Student[]=[];
  constructor(private service:ServiceService){
    this.listEtudiantsEncadre=this.service.getStudents();
    this.filtreEtudiants=[...this.listEtudiantsEncadre]; //2
  }



// 3 
  filtrerEtudiants(){
    this.filtreEtudiants=this.listEtudiantsEncadre.filter(
      etudiant=> (etudiant.prenom+' '+etudiant.nom).toLowerCase().includes(this.searchStudent.toLowerCase())
    );

    for(let e of this.filtreEtudiants){
      console.log(e.nom+' '+e.prenom);
    }
  }


}
