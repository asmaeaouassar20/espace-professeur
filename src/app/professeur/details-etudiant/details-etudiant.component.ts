import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { DepotRapportStage, Student } from '../../model/model';
import { DatePipe, NgStyle } from '@angular/common';
import { StatutRapport } from '../../model/enums';

@Component({
  selector: 'app-details-etudiant',
  imports: [NgStyle,DatePipe],
  templateUrl: './details-etudiant.component.html',
  styleUrl: './details-etudiant.component.css'
})
export class DetailsEtudiantComponent implements OnInit{

  idDepotRapoortStageSelectionne!:string;

  route=inject(ActivatedRoute);
  service=inject(ServiceService);

  depotRapportStageSelectionne!:DepotRapportStage | null;
  etudiants:Student[] | undefined=[];

  ngOnInit(): void {
      this.idDepotRapoortStageSelectionne=this.route.snapshot.paramMap.get('id')!;
      console.log('id de dépot de rapport de stage selectionné est : '+this.idDepotRapoortStageSelectionne);

      // Récupérer de dépot du rapport de stage par son id
     this.depotRapportStageSelectionne=this.service.getDepotById(Number(this.idDepotRapoortStageSelectionne)) ;
      console.log(this.depotRapportStageSelectionne)

      // Récupérer les étuidants qui ont fait ce stage
      this.etudiants=this.depotRapportStageSelectionne?.etudiants;
  }


  getColorSelonStatut(statut:StatutRapport | undefined){
    switch(statut){
      case StatutRapport.V:
        return 'rgb(68, 193, 68)';
      case StatutRapport.NV:
        return 'rgb(255, 70, 70)';
      default:
        return 'rgb(255, 70, 70)';
    }
  }

}






